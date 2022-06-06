using Newtonsoft.Json.Linq;
using PMS.ApiService.Models;
using PMS.ApiService.Models.CustomEntities;
using PMS.ApiService.Tools;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace PMS.ApiService.Controllers.Engineer
{
    public class P_TR_EngVariationController : BaseController, IMasterDetailsoBJController<P_TR_EngVariation, M_D_EngVariation>
    {
        [HttpGet]
        public object SelectEntity(string SqlStatement)
        {
            var result = this.Get<P_TR_EngVariation>(SqlStatement);
            return result.ToList();
        }

        public ResponseResult InsertMasterDetails(JObject data)
        {
            ResponseResult result = new ResponseResult();
            //var obj1 = JObjMasterManyDetails<P_TR_EngVariation, M_D_EngVariation>(data);

            var obj = JObjMasterManyDetails<P_TR_EngVariation, M_D_EngVariation>(data);
            SessionRecord session = obj.Session;
            P_TR_EngVariation master = obj.Master;
            M_D_EngVariation details = obj.Details;
            result = MasterDetailsValidation(master, details, session);
            if (result.ResponseState == false)
                return result;
            obj = JObjMasterManyDetails<P_TR_EngVariation, M_D_EngVariation>(result.ResponseData as JObject);
            session = obj.Session;
            master = obj.Master;
            details = obj.Details;
            master.CreatedAt = DateTime.Now;
            master.CreatedBy = session.UserCode;
            //Start Details
            List<P_TR_EngVariationItem> EngVariationItem = details.P_TR_EngVariationItemDetail;
            List<P_TR_EngVariationActivity> EngVariationActivity = details.P_TR_EngVariationActivityDetial;
            //End Details

            using (var dbTrans = db.Database.BeginTransaction())
            {
                try
                {
                    db.P_TR_EngVariation.Add(master);
                    var _Res = db.SaveChanges();
                    if (_Res > 0)
                    {
                        foreach (P_TR_EngVariationItem item in EngVariationItem)
                        {
                            item.VariationId = master.VariationId;
                        }
                        db.P_TR_EngVariationItem.AddRange(EngVariationItem);
                        db.SaveChanges();

                        foreach (P_TR_EngVariationActivity item in EngVariationActivity)
                        {
                            item.VariationId = master.VariationId;
                        }
                        db.P_TR_EngVariationActivity.AddRange(EngVariationActivity);
                        db.SaveChanges();
                    }

                    ResponseResult res = Shared.InvTransactionProcess(session, master.VariationId, "EngVarient", db);
                    if (res.ResponseState == true)
                    {
                        dbTrans.Commit();
                        //master.TrNo = int.Parse(res.ResponseData.ToString());
                        result.ResponseData = master.VariationId;
                    }
                    else
                    {
                        result.ResponseMessage = res.ResponseMessage;
                        result.ResponseState = false;
                        dbTrans.Rollback();
                    }
                }
                catch (Exception ex)
                {
                    dbTrans.Rollback();
                    result.ResponseMessage = ex.Message;
                    result.ResponseState = false;
                }
                return result;
            }
        }

        public ResponseResult MasterDetailsValidation(P_TR_EngVariation Master, M_D_EngVariation Details, SessionRecord Session)
        {
            ResponseResult result = new ResponseResult();
            try
            {
                Master.CompCode = int.Parse(Session.CompCode);
                InitalizeLanguage(Session.Language);

                var obj = new
                {
                    Master = Master,
                    Details = Details,
                    Session = Session
                };

                result.ResponseData = JObject.FromObject(obj);
                result.ResponseState = true;
            }
            catch (Exception ex)
            {
                result.ResponseState = false;
                result.ResponseMessage = ex.Message;
            }
            return result;
        }
        public ResponseResult UpdateMasterDetails(JObject data)
        {
            ResponseResult result = new ResponseResult();
            var obj = JObjMasterManyDetails<P_TR_EngVariation, M_D_EngVariation>(data);
            SessionRecord session = obj.Session;
            P_TR_EngVariation master = obj.Master;
            M_D_EngVariation details = obj.Details;
            result = MasterDetailsValidation(master, details, session);
            if (result.ResponseState == false)
            {
                return result;
            }

            obj = JObjMasterManyDetails<P_TR_EngVariation, M_D_EngVariation>(result.ResponseData as JObject);
            session = obj.Session;
            master = obj.Master;
            details = obj.Details;
            master.UpdatedAt = DateTime.Now;
            master.UpdatedBy = session.UserCode;

            //Start Details
            List<P_TR_EngVariationItem> EngVariationItem = details.P_TR_EngVariationItemDetail;
            List<P_TR_EngVariationActivity> EngVariationActivity = details.P_TR_EngVariationActivityDetial;
            //End Details

            using (var dbTrans = db.Database.BeginTransaction())
            {
                try
                {
                    //Deleting The Details
                    //db.P_TR_EngVariationItem.RemoveRange(db.P_TR_EngVariationItem.Where(f => f.VariationId == master.VariationId));

                    db.P_TR_EngVariation.Attach(master);
                    db.Entry(master).State = System.Data.Entity.EntityState.Modified;
                    db.SaveChanges();

                    //Items
                    foreach (P_TR_EngVariationItem item in EngVariationItem)
                    {
                        if (item.VariationItemId > 0)
                        {
                            db.P_TR_EngVariationItem.Attach(item);
                            db.Entry(item).State = System.Data.Entity.EntityState.Modified;
                        }
                        else
                        {
                            item.VariationId = master.VariationId;
                            db.P_TR_EngVariationItem.Add(item);
                        }
                    }
                    //db.P_TR_EngVariationItem.AddRange(EngVariationItem);

                    //Deleting The Details//03 P_TR_EngVariationItem
                    var items = db.P_TR_EngVariationItem.Where(x => x.VariationId == master.VariationId).ToList();
                    foreach (var itm in items)
                    {
                        int i = details.P_TR_EngVariationItemDetail.Where(n => n.VariationItemId == itm.VariationItemId).Count();
                        if (i == 0)
                        {
                            db.P_TR_EngVariationItem.Remove(itm);
                        }
                    }
                    db.SaveChanges();

                    //activity
                    foreach (P_TR_EngVariationActivity item in EngVariationActivity)
                    {
                        if (item.VariationActivId > 0)
                        {
                            db.P_TR_EngVariationActivity.Attach(item);
                            db.Entry(item).State = System.Data.Entity.EntityState.Modified;
                        }
                        else
                        {
                            item.VariationId = master.VariationId;
                            db.P_TR_EngVariationActivity.Add(item);
                        }

                    }
                    //Deleting The Details//03 P_TR_EngVariationActivity
                    var Activity = db.P_TR_EngVariationActivity.Where(x => x.VariationId == master.VariationId).ToList();
                    foreach (var itm in Activity)
                    {
                        int i = details.P_TR_EngVariationActivityDetial.Where(n => n.VariationActivId == itm.VariationActivId).Count();
                        if (i == 0)
                        {
                            db.P_TR_EngVariationActivity.Remove(itm);
                        }
                    }
                    db.SaveChanges();

                    ResponseResult res = Shared.InvTransactionProcess(session, master.VariationId, "EngVarient", db);
                    if (res.ResponseState == true)
                    {
                        dbTrans.Commit();
                        master.TrNo = int.Parse(res.ResponseData.ToString());
                        result.ResponseData = master.VariationId;
                    }
                    else
                    {
                        result.ResponseMessage = res.ResponseMessage;
                        result.ResponseState = false;
                        dbTrans.Rollback();
                    }
                }
                catch (Exception ex)
                {
                    dbTrans.Rollback();
                    result.ResponseMessage = ex.Message;
                    result.ResponseState = false;
                }
                return result;
            }
        }

        [HttpPost, AllowAnonymous]
        public IHttpActionResult UpdateMasterDetail([FromBody]M_D_EngVariation data)
        {
            BaseResponse result = new BaseResponse();

            using (var dbTrans = db.Database.BeginTransaction())
            {
                try
                {
                    SessionRecord session = data.sessionRecord;
                    P_TR_EngVariation master = data.P_TR_EngVariation;
                    List<P_TR_EngVariationItem> EngVariationItem = data.P_TR_EngVariationItemDetail;
                    List<P_TR_EngVariationActivity> EngVariationActivity = data.P_TR_EngVariationActivityDetial;

                    master.UpdatedBy = session.UserCode;
                    master.UpdatedAt = DateTime.Now;
                    db.P_TR_EngVariation.Attach(master);
                    db.Entry(master).State = System.Data.Entity.EntityState.Modified;
                    db.SaveChanges();

                    //Items
                    foreach (P_TR_EngVariationItem item in EngVariationItem)
                    {
                        if (item.VariationItemId > 0)
                        {
                            db.P_TR_EngVariationItem.Attach(item);
                            db.Entry(item).State = System.Data.Entity.EntityState.Modified;
                        }
                        else
                        {
                            item.VariationId = master.VariationId;
                            db.P_TR_EngVariationItem.Add(item);
                        }
                    }
                    //db.P_TR_EngVariationItem.AddRange(EngVariationItem);

                    //Deleting The Details//03 P_TR_EngVariationItem
                    var items = db.P_TR_EngVariationItem.Where(x => x.VariationId == master.VariationId).ToList();
                    foreach (var itm in items)
                    {
                        int i = EngVariationItem.Where(n => n.VariationItemId == itm.VariationItemId).Count();
                        if (i == 0)
                        {
                            db.P_TR_EngVariationItem.Remove(itm);
                        }
                    }
                    db.SaveChanges();

                    //activity
                    foreach (P_TR_EngVariationActivity item in EngVariationActivity)
                    {
                        if (item.VariationActivId > 0)
                        {
                            db.P_TR_EngVariationActivity.Attach(item);
                            db.Entry(item).State = System.Data.Entity.EntityState.Modified;
                        }
                        else
                        {
                            item.VariationId = master.VariationId;
                            db.P_TR_EngVariationActivity.Add(item);
                        }

                    }
                    //Deleting The Details//03 P_TR_EngVariationActivity
                    var Activity = db.P_TR_EngVariationActivity.Where(x => x.VariationId == master.VariationId).ToList();
                    foreach (var itm in Activity)
                    {
                        int i = EngVariationActivity.Where(n => n.VariationActivId == itm.VariationActivId).Count();
                        if (i == 0)
                        {
                            db.P_TR_EngVariationActivity.Remove(itm);
                        }
                    }
                    db.SaveChanges();

                    ResponseResult res = Shared.InvTransactionProcess(session, master.VariationId, "EngVarient", db);
                    if (res.ResponseState == true)
                    {
                        dbTrans.Commit();
                        master.TrNo = int.Parse(res.ResponseData.ToString());

                        result.Response = master.VariationId;
                        result.StatusCode = 200;
                    }
                    else
                    {
                        result.Response = res.ResponseMessage;
                        result.IsSuccess = false;
                        dbTrans.Rollback();
                    }
                }
                catch (Exception ex)
                {
                    dbTrans.Rollback();
                    result.Response = ex.Message;
                    result.IsSuccess = false;
                }
                return Ok(result);
            }
        }
        [HttpPost, AllowAnonymous]
        public IHttpActionResult InsertMasterDetail([FromBody]M_D_EngVariation data)
        {
            BaseResponse result = new BaseResponse();

            using (var dbTrans = db.Database.BeginTransaction())
            {
                try
                {
                    SessionRecord session = data.sessionRecord;
                    P_TR_EngVariation master = data.P_TR_EngVariation;
                    List<P_TR_EngVariationItem> EngVariationItem = data.P_TR_EngVariationItemDetail;
                    List<P_TR_EngVariationActivity> EngVariationActivity = data.P_TR_EngVariationActivityDetial;

                    master.CreatedBy = session.UserCode;
                    master.CreatedAt = DateTime.Now;
                    db.P_TR_EngVariation.Add(master);
                    var _Res = db.SaveChanges();

                    if (_Res > 0)
                    {
                        foreach (P_TR_EngVariationItem item in EngVariationItem)
                        {
                            item.VariationId = master.VariationId;
                        }
                        db.P_TR_EngVariationItem.AddRange(EngVariationItem);
                        db.SaveChanges();

                        foreach (P_TR_EngVariationActivity item in EngVariationActivity)
                        {
                            item.VariationId = master.VariationId;
                        }
                        db.P_TR_EngVariationActivity.AddRange(EngVariationActivity);
                        db.SaveChanges();
                    }

                    ResponseResult res = Shared.InvTransactionProcess(session, master.VariationId, "EngVarient", db);
                    if (res.ResponseState == true)
                    {
                        dbTrans.Commit();
                        //master.TrNo = int.Parse(res.ResponseData.ToString());
                        result.Response = master.VariationId;
                    }
                    else
                    {
                        result.Response = res.ResponseMessage;
                        result.IsSuccess = false;
                        dbTrans.Rollback();
                    }
                }
                catch (Exception ex)
                {
                    dbTrans.Rollback();
                    result.Response = ex.Message;
                    result.IsSuccess = false;
                }
                return Ok(result);
            }
        }
        [HttpGet, AllowAnonymous]
        public IHttpActionResult PProc_EngVariationLoadItem(int TrID)
        {
            BaseResponse result = new BaseResponse();
            var result_ = db.PProc_EngVariationLoadItem(TrID).FirstOrDefault();
              
           result.Response = result_;

            result.StatusCode = 200;
            return Ok(result.Response);
        }



        [HttpPost, AllowAnonymous]
        public IHttpActionResult UpdateMasterDetailAndGenerate([FromBody]M_D_EngVariation data)
        {
            BaseResponse result = new BaseResponse();

            using (var dbTrans = db.Database.BeginTransaction())
            {
                try
                {
                    SessionRecord session = data.sessionRecord;
                    P_TR_EngVariation master = data.P_TR_EngVariation;
                    List<P_TR_EngVariationItem> EngVariationItem = data.P_TR_EngVariationItemDetail;
                    List<P_TR_EngVariationActivity> EngVariationActivity = data.P_TR_EngVariationActivityDetial;

                    master.UpdatedBy = session.UserCode;
                    master.UpdatedAt = DateTime.Now;
                    db.P_TR_EngVariation.Attach(master);
                    db.Entry(master).State = System.Data.Entity.EntityState.Modified;
                    db.SaveChanges();

                    //Items
                    foreach (P_TR_EngVariationItem item in EngVariationItem)
                    {
                        if (item.VariationItemId > 0)
                        {
                            db.P_TR_EngVariationItem.Attach(item);
                            db.Entry(item).State = System.Data.Entity.EntityState.Modified;
                        }
                        else
                        {
                            item.VariationId = master.VariationId;
                            db.P_TR_EngVariationItem.Add(item);
                        }
                    }
                    //db.P_TR_EngVariationItem.AddRange(EngVariationItem);

                    //Deleting The Details//03 P_TR_EngVariationItem
                    var items = db.P_TR_EngVariationItem.Where(x => x.VariationId == master.VariationId).ToList();
                    foreach (var itm in items)
                    {
                        int i = EngVariationItem.Where(n => n.VariationItemId == itm.VariationItemId).Count();
                        if (i == 0)
                        {
                            db.P_TR_EngVariationItem.Remove(itm);
                        }
                    }
                    db.SaveChanges();

                    //activity
                    //foreach (P_TR_EngVariationActivity item in EngVariationActivity)
                    //{
                    //    if (item.VariationActivId > 0)
                    //    {
                    //        db.P_TR_EngVariationActivity.Attach(item);
                    //        db.Entry(item).State = System.Data.Entity.EntityState.Modified;
                    //    }
                    //    else
                    //    {
                    //        item.VariationId = master.VariationId;
                    //        db.P_TR_EngVariationActivity.Add(item);
                    //    }

                    //}
                    ////Deleting The Details//03 P_TR_EngVariationActivity
                    //var Activity = db.P_TR_EngVariationActivity.Where(x => x.VariationId == master.VariationId).ToList();
                    //foreach (var itm in Activity)
                    //{
                    //    int i = EngVariationActivity.Where(n => n.VariationActivId == itm.VariationActivId).Count();
                    //    if (i == 0)
                    //    {
                    //        db.P_TR_EngVariationActivity.Remove(itm);
                    //    }
                    //}
                    //db.SaveChanges();
                    db.PProc_EngBuildVarientActivity(master.VariationId);

                    ResponseResult res = Shared.InvTransactionProcess(session, master.VariationId, "EngVarient", db);
                    if (res.ResponseState == true)
                    {
                        dbTrans.Commit();
                        master.TrNo = int.Parse(res.ResponseData.ToString());

                        result.Response = master.VariationId;
                        result.StatusCode = 200;
                    }
                    else
                    {
                        result.Response = res.ResponseMessage;
                        result.IsSuccess = false;
                        dbTrans.Rollback();
                    }
                }
                catch (Exception ex)
                {
                    dbTrans.Rollback();
                    result.Response = ex.Message;
                    result.IsSuccess = false;
                }
                return Ok(result);
            }
        }
        [HttpPost, AllowAnonymous]
        public IHttpActionResult InsertMasterDetailAndGenerate([FromBody]M_D_EngVariation data)
        {
            BaseResponse result = new BaseResponse();

            using (var dbTrans = db.Database.BeginTransaction())
            {
                try
                {
                    SessionRecord session = data.sessionRecord;
                    P_TR_EngVariation master = data.P_TR_EngVariation;
                    List<P_TR_EngVariationItem> EngVariationItem = data.P_TR_EngVariationItemDetail;
                    List<P_TR_EngVariationActivity> EngVariationActivity = data.P_TR_EngVariationActivityDetial;

                    master.CreatedBy = session.UserCode;
                    master.CreatedAt = DateTime.Now;
                    db.P_TR_EngVariation.Add(master);
                    var _Res = db.SaveChanges();

                    if (_Res > 0)
                    {
                        foreach (P_TR_EngVariationItem item in EngVariationItem)
                        {
                            item.VariationId = master.VariationId;
                        }
                        db.P_TR_EngVariationItem.AddRange(EngVariationItem);
                        db.SaveChanges();

                        foreach (P_TR_EngVariationActivity item in EngVariationActivity)
                        {
                            item.VariationId = master.VariationId;
                        }
                        db.P_TR_EngVariationActivity.AddRange(EngVariationActivity);
                        db.SaveChanges();
                    }

                    db.PProc_EngBuildVarientActivity(master.VariationId);

                    ResponseResult res = Shared.InvTransactionProcess(session, master.VariationId, "EngVarient", db);
                    if (res.ResponseState == true)
                    {
                        dbTrans.Commit();
                        //master.TrNo = int.Parse(res.ResponseData.ToString());
                        result.Response = master.VariationId;
                    }
                    else
                    {
                        result.Response = res.ResponseMessage;
                        result.IsSuccess = false;
                        dbTrans.Rollback();
                    }
                }
                catch (Exception ex)
                {
                    dbTrans.Rollback();
                    result.Response = ex.Message;
                    result.IsSuccess = false;
                }
                return Ok(result);
            }
        }
     


    }
}
