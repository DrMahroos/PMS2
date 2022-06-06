using Newtonsoft.Json.Linq;
using PMS.ApiService.Models;
using PMS.ApiService.Models.CustomEntities;
using PMS.ApiService.Tools;
using System;
using System.Collections.Generic;
using System.Data.Entity.Core.Objects;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace PMS.ApiService.Controllers.Engineer
{
    public class P_TR_SubProductionController : BaseController, IMasterDetailsController<P_TR_SubProduction, P_TR_SubProductionActivity>
    {
        [HttpGet]
        public object SelectEntity(string SqlStatement)
        {
            var result = this.Get<P_TR_SubProduction>(SqlStatement);
            return result.ToList();
        }
        [HttpPost, AllowAnonymous]
        public IHttpActionResult UpdateMasterDetail([FromBody]M_D_SubProduction data)
        {
            BaseResponse result = new BaseResponse();

            using (var dbTrans = db.Database.BeginTransaction())
            {
                try
                {
                    SessionRecord session = data.sessionRecord;
                    P_TR_SubProduction master = data.P_TR_SubProduction;
                    List<P_TR_SubProductionActivity> Details = data.P_TR_SubProductionActivity;
                    master.UpdatedBy = session.UserCode;
                    master.UpdatedAt = DateTime.Now;

                    db.P_TR_SubProduction.Attach(master);
                    db.Entry(master).State = System.Data.Entity.EntityState.Modified;
                    db.SaveChanges();

                    foreach (P_TR_SubProductionActivity item in Details)
                    {
                        if (item.SubProductionActivityId > 0)
                        {
                            db.P_TR_SubProductionActivity.Attach(item);
                            db.Entry(item).State = System.Data.Entity.EntityState.Modified;
                        }
                        else
                        {
                            item.SubProductionId = master.SubProductionId;
                            db.P_TR_SubProductionActivity.Add(item);
                        }
                    }
                    //Deleting The Details
                    int i;
                    var _ItemsOld = db.P_TR_SubProductionActivity.Where(x => x.SubProductionId == master.SubProductionId).ToList();
                    foreach (P_TR_SubProductionActivity item in _ItemsOld)
                    {
                        i = Details.Where(n => n.SubProductionActivityId == item.SubProductionActivityId).Count();
                        if (i == 0)
                        {
                            db.P_TR_SubProductionActivity.Remove(item);
                        }
                    }
                    db.SaveChanges();

                    ResponseResult res = Shared.InvTransactionProcess(session, master.SubProductionId, "SubProdEn", db);
                    if (res.ResponseState == true)
                    {
                        dbTrans.Commit();
                        master.TrNo = int.Parse(res.ResponseData.ToString());
                        result.Response = master.SubProductionId;
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
            }
            return Ok(result);
        }


        [HttpPost, AllowAnonymous]
        public IHttpActionResult InsertMasterDetail([FromBody]M_D_SubProduction data)
        {
            BaseResponse result = new BaseResponse();
            using (var dbTrans = db.Database.BeginTransaction())
            {
                try
                {
                    SessionRecord session = data.sessionRecord;
                    P_TR_SubProduction master = data.P_TR_SubProduction;
                    List<P_TR_SubProductionActivity > Details = data.P_TR_SubProductionActivity;
                    master.CreatedBy = session.UserCode;
                    master.CreatedAt = DateTime.Now;
                    db.P_TR_SubProduction.Add(master);
                    var _Res = db.SaveChanges();

                    //Deleting The Details
                    db.P_TR_SubProductionActivity.RemoveRange(db.P_TR_SubProductionActivity.Where(f => f.SubProductionId == master.SubProductionId));
                    foreach (P_TR_SubProductionActivity item in Details)
                    {
                        item.SubProductionId = master.SubProductionId;
                    }
                    db.P_TR_SubProductionActivity.AddRange(Details);
                    db.SaveChanges();

                    ResponseResult res = Shared.InvTransactionProcess(session, master.SubProductionId, "SubProdEn", db);
                    if (res.ResponseState == true)
                    {
                        dbTrans.Commit();
                        //master.TrNo = int.Parse(res.ResponseData.ToString());
                        result.Response = master.SubProductionId;
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

        public ResponseResult InsertMasterDetails(JObject data)
        {
            ResponseResult result = new ResponseResult();
            var obj = JObjMasterDetails<P_TR_SubProduction, P_TR_SubProductionActivity>(data);
            SessionRecord session = obj.Session;
            P_TR_SubProduction master = obj.Master;
            List<P_TR_SubProductionActivity> details = obj.Details.ToList();
            result = MasterDetailsValidation(master, details, session);
            if (result.ResponseState == false)
            {
                return result;
            }
            obj = JObjMasterDetails<P_TR_SubProduction, P_TR_SubProductionActivity>(result.ResponseData as JObject);
            session = obj.Session;
            master = obj.Master;
            details = obj.Details.ToList();
            master.CreatedAt = DateTime.Now;
            master.CreatedBy = session.UserCode;
            using (var dbTrans = db.Database.BeginTransaction())
            {
                try
                {
                    db.P_TR_SubProduction.Add(master);
                    db.SaveChanges();
                    foreach (P_TR_SubProductionActivity item in details)
                    {
                        item.SubProductionId = master.SubProductionId;
                    }

                    db.P_TR_SubProductionActivity.AddRange(details);
                    db.SaveChanges();

                    ResponseResult res = Shared.InvTransactionProcess(session, master.SubProductionId, "SubProdEn", db);
                    if (res.ResponseState == true)
                    {

                        dbTrans.Commit();
                        //master.TrNo = int.Parse(res.ResponseData.ToString());
                        result.ResponseData = master.SubProductionId;
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

        public ResponseResult MasterDetailsValidation(P_TR_SubProduction Master, IEnumerable<P_TR_SubProductionActivity> Details, SessionRecord Session)
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
            var obj = JObjMasterDetails<P_TR_SubProduction, P_TR_SubProductionActivity>(data);
            SessionRecord session = obj.Session;
            P_TR_SubProduction master = obj.Master;
            List<P_TR_SubProductionActivity> details = obj.Details.ToList();
            result = MasterDetailsValidation(master, details, session);
            if (result.ResponseState == false)
            {
                return result;
            }

            obj = JObjMasterDetails<P_TR_SubProduction, P_TR_SubProductionActivity>(result.ResponseData as JObject);
            session = obj.Session;
            master = obj.Master;
            details = obj.Details.ToList();

            using (var dbTrans = db.Database.BeginTransaction())
            {
                try
                {
                    //Deleting The Details
                    db.P_TR_SubProductionActivity.RemoveRange(db.P_TR_SubProductionActivity.Where(f => f.SubProductionId == master.SubProductionId));

                    db.P_TR_SubProduction.Attach(master);
                    db.Entry(master).State = System.Data.Entity.EntityState.Modified;
                    db.SaveChanges();

                    foreach (P_TR_SubProductionActivity item in details)
                    {
                        item.SubProductionId = master.SubProductionId;
                    }
                    db.P_TR_SubProductionActivity.AddRange(details);
                    db.SaveChanges();

                    ResponseResult res = Shared.InvTransactionProcess(session, master.SubProductionId, "SubProdEn", db);
                    if (res.ResponseState == true)
                    {
                        dbTrans.Commit();
                        master.TrNo = int.Parse(res.ResponseData.ToString());
                        result.ResponseData = master.SubProductionId;
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

        [HttpGet]
        public string SubProductionApprove(int id)
        {
            ObjectParameter op = new ObjectParameter("id", typeof(int));
            db.PProc_EngSubProductionAuthorize(id);
            return "1";
        }
    }
}
