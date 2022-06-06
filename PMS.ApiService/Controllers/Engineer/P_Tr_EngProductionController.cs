using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using PMS.ApiService.Models;
using PMS.ApiService.Models.CustomEntities;
using PMS.ApiService.Tools;
using System;
using System.Collections.Generic;
using System.Data.Entity.Core.Objects;
using System.Data.SqlClient;
using System.Data.SqlTypes;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using System.Web.Http.Results;

namespace PMS.ApiService.Controllers.Engineer
{
    public class P_Tr_EngProductionController : BaseController, IMasterDetailsoBJController<P_Tr_EngProduction, M_D_Productions>
    {
        [HttpGet]
        public object SelectEntity(string SqlStatement)
        {
            var result = this.Get<P_Tr_EngProduction>(SqlStatement);
            return result.ToList();
        }

        public ResponseResult InsertMasterDetails(JObject data)
        {
            ResponseResult result = new ResponseResult();
            var obj1 = JObjMasterManyDetails<P_Tr_EngProduction, M_D_Productions>(data);

            var obj = JObjMasterManyDetails<P_Tr_EngProduction, M_D_Productions>(data);
            SessionRecord session = obj1.Session;
            P_Tr_EngProduction master = obj1.Master;
            M_D_Productions details = obj1.Details;
            result = MasterDetailsValidation(master, details, session);
            if (result.ResponseState == false)
                return result;
            obj = JObjMasterManyDetails<P_Tr_EngProduction, M_D_Productions>(result.ResponseData as JObject);
            session = obj.Session;
            master = obj.Master;
            details = obj.Details;
            master.CreatedAt = DateTime.Now;
            master.CreatedBy = session.UserCode;
            //Start Details
            List<P_TR_EngProductionActiv> EngProductionActiv = details.P_TR_EngProductionActiv;
            List<P_TR_EngProductionEquip> EngProductionEquip = details.P_TR_EngProductionEquip;
            List<P_TR_EngProductionLabour> EngProductionLabour = details.P_TR_EngProductionLabour;
            //End Details

            using (var dbTrans = db.Database.BeginTransaction())
            {
                try
                {
                    db.P_Tr_EngProduction.Add(master);
                    var _Res = db.SaveChanges();
                    if (_Res > 0)
                    {
                        foreach (P_TR_EngProductionActiv item in EngProductionActiv)
                        {
                            item.ProductionId = master.ProductionId;
                        }
                        db.P_TR_EngProductionActiv.AddRange(EngProductionActiv);
                        db.SaveChanges();

                        foreach (P_TR_EngProductionEquip item in EngProductionEquip)
                        {
                            item.ProductionId = master.ProductionId;
                        }
                        db.P_TR_EngProductionEquip.AddRange(EngProductionEquip);
                        db.SaveChanges();

                        foreach (P_TR_EngProductionLabour item in EngProductionLabour)
                        {
                            item.ProductionId = master.ProductionId;
                        }
                        db.P_TR_EngProductionLabour.AddRange(EngProductionLabour);
                        db.SaveChanges();
                    }

                    ResponseResult res = Shared.InvTransactionProcess(session, master.ProductionId, "Prod", db);
                    if (res.ResponseState == true)
                    {
                        dbTrans.Commit();
                        //master.TrNo = int.Parse(res.ResponseData.ToString());
                        result.ResponseData = master.ProductionId;
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

        public ResponseResult UpdateMasterDetails(JObject data)
        {
            ResponseResult result = new ResponseResult();
            var obj = JObjMasterManyDetails<P_Tr_EngProduction, M_D_Productions>(data);
            SessionRecord session = obj.Session;
            P_Tr_EngProduction master = obj.Master;
            M_D_Productions details = obj.Details;
            result = MasterDetailsValidation(master, details, session);
            if (result.ResponseState == false)
            {
                return result;
            }

            obj = JObjMasterManyDetails<P_Tr_EngProduction, M_D_Productions>(result.ResponseData as JObject);
           
            session = obj.Session;
            master = obj.Master;
            details = obj.Details;
            master.UpdatedAt = DateTime.Now;
            master.UpdatedBy = session.UserCode;
            //Start Details
            List<P_TR_EngProductionActiv> EngProductionActiv = details.P_TR_EngProductionActiv;
            List<P_TR_EngProductionEquip> EngProductionEquip = details.P_TR_EngProductionEquip;
            List<P_TR_EngProductionLabour> EngProductionLabour = details.P_TR_EngProductionLabour;
            //End Details

            using (var dbTrans = db.Database.BeginTransaction())
            {
                try
                {
                    db.P_Tr_EngProduction.Attach(master);
                    db.Entry(master).State = System.Data.Entity.EntityState.Modified;
                    db.SaveChanges();

                    //Deleting The Details
                    db.P_TR_EngProductionActiv.RemoveRange(db.P_TR_EngProductionActiv.Where(f => f.ProductionId == master.ProductionId));
                    foreach (P_TR_EngProductionActiv item in EngProductionActiv)
                    {
                        item.ProductionId = master.ProductionId;
                    }
                    db.P_TR_EngProductionActiv.AddRange(EngProductionActiv);
                    db.SaveChanges();

                    db.P_TR_EngProductionEquip.RemoveRange(db.P_TR_EngProductionEquip.Where(f => f.ProductionId == master.ProductionId));
                    foreach (P_TR_EngProductionEquip item in EngProductionEquip)
                    {
                        item.ProductionId = master.ProductionId;
                    }
                    db.P_TR_EngProductionEquip.AddRange(EngProductionEquip);
                    db.SaveChanges();

                    db.P_TR_EngProductionLabour.RemoveRange(db.P_TR_EngProductionLabour.Where(f => f.ProductionId == master.ProductionId));
                    foreach (P_TR_EngProductionLabour item in EngProductionLabour)
                    {
                        item.ProductionId = master.ProductionId;
                    }
                    db.P_TR_EngProductionLabour.AddRange(EngProductionLabour);
                    db.SaveChanges();

                    ResponseResult res = Shared.InvTransactionProcess(session, master.ProductionId, "Prod", db);
                    if (res.ResponseState == true)
                    {
                        dbTrans.Commit();
                        master.TrNo = int.Parse(res.ResponseData.ToString());
                        result.ResponseData = master.ProductionId;
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

        public ResponseResult MasterDetailsValidation(P_Tr_EngProduction Master, M_D_Productions Details, SessionRecord Session)
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

        [HttpGet]
        public string PProc_ResGetFreeLabor(int id)
        {
            //ResponseResult res = new ResponseResult();
            string res = db.Database.SqlQuery<PProc_EngLoadProductionActivity_Result>("exec PProc_EngLoadProductionActivity @TrID", new SqlParameter("@TrID", id)).ToList().ToJsonString();
            //string _JsonResult= JsonConvert.SerializeObject(res);
            return res;
        }

        [HttpGet]
        public string LoadProductionEquipment(int? id, string StartDateTime, string EndDatetime)
        {
            var res = db.PProc_EngLoadProductionEquipment(id, StartDateTime, EndDatetime).ToList().ToJsonString();
            return res;
            //ResponseResult res = new ResponseResult();
            //string res = db.Database.SqlQuery<PProc_EngLoadProductionActivity_Result>("exec PProc_EngLoadProductionEquipment @TrID",
            //    new SqlParameter("@TrID", id ?? SqlInt32.Null),
            //    new SqlParameter("@StartDateTime", StartDateTime),
            //    new SqlParameter("@EndDatetime", EndDatetime))
            //    .ToList().ToJsonString();
            ////string _JsonResult= JsonConvert.SerializeObject(res);
            //return res;
        }

        [HttpGet]
        public string LoadProductionLabor(int? id, string StartDateTime, string EndDatetime)
        {
            var res = db.PProc_EngLoadProductionLabor(id, StartDateTime, EndDatetime).ToList().ToJsonString();
            return res;
            ////ResponseResult res = new ResponseResult();
            //string res = db.Database.SqlQuery<PProc_EngLoadProductionActivity_Result>("exec PProc_EngLoadProductionLabor @TrID", new SqlParameter("@TrID", id)).ToList().ToJsonString();
            ////string _JsonResult= JsonConvert.SerializeObject(res);
            //return res;
        }

        [HttpGet]
        public string ProductionAuthorize(string id)
        {
            int newId = int.Parse(id);
            db.PProc_EngProductionAuthorize(newId);
            return "1";
        }

        [HttpGet]
        public void ProductionUnAuthorize(string id)
        {
            int newId = int.Parse(id);
            db.PProc_EngSubProductionAuthorize(newId);
        }

        [HttpGet]
        public string LoadProductionActivity(int? id)
        {
            var res = db.PProc_EngLoadProductionActivity(id).ToList().ToJsonString();
            return res;
        }


        [HttpPost, AllowAnonymous]
        public IHttpActionResult UpdateMasterDetail([FromBody]M_D_Productions data)
        {
            BaseResponse result = new BaseResponse();

            using (var dbTrans = db.Database.BeginTransaction())
            {
                try
                {
                    SessionRecord session = data.sessionRecord;
                    P_Tr_EngProduction master = data.P_Tr_EngProduction;
                    List<P_TR_EngProductionActiv> EngProductionActiv = data.P_TR_EngProductionActiv;
                    List<P_TR_EngProductionEquip> EngProductionEquip = data.P_TR_EngProductionEquip;
                    List<P_TR_EngProductionLabour> EngProductionLabour = data.P_TR_EngProductionLabour;
                    master.UpdatedBy = session.UserCode;
                    master.UpdatedAt = DateTime.Now;
                    db.P_Tr_EngProduction.Attach(master);
                    db.Entry(master).State = System.Data.Entity.EntityState.Modified;
                    db.SaveChanges();
                    //
                    int i;
                    //labor 
                    foreach (P_TR_EngProductionActiv item in EngProductionActiv)
                    {
                        if (item.ProductionActivId > 0)
                        {
                            db.P_TR_EngProductionActiv.Attach(item);
                            db.Entry(item).State = System.Data.Entity.EntityState.Modified;
                        }
                        else
                        {
                            item.ProductionId = master.ProductionId;
                            db.P_TR_EngProductionActiv.Add(item);
                        }
                    }
                    //Deleting The Details
                    
                    var _ItemsOld = db.P_TR_EngProductionActiv.Where(x => x.ProductionId == master.ProductionId).ToList();
                    foreach (P_TR_EngProductionActiv item in _ItemsOld)
                    {
                        i = EngProductionActiv.Where(n => n.ProductionActivId == item.ProductionActivId).Count();
                        if (i == 0)
                        {
                            db.P_TR_EngProductionActiv.Remove(item);
                        }
                    }
                    ////Deleting The Details
                    //db.P_TR_EngProductionActiv.RemoveRange(db.P_TR_EngProductionActiv.Where(f => f.ProductionId == master.ProductionId));
                    //foreach (P_TR_EngProductionActiv item in EngProductionActiv)
                    //{
                    //    item.ProductionId = master.ProductionId;
                    //}
                    //db.P_TR_EngProductionActiv.AddRange(EngProductionActiv);
                    db.SaveChanges();
                    // equiment 
                    foreach (P_TR_EngProductionEquip item in EngProductionEquip)
                    {
                        if (item.ProductionequipId > 0)
                        {
                            db.P_TR_EngProductionEquip.Attach(item);
                            db.Entry(item).State = System.Data.Entity.EntityState.Modified;
                        }
                        else
                        {
                            item.ProductionId = master.ProductionId;
                            db.P_TR_EngProductionEquip.Add(item);
                        }
                    }
                    //Deleting The Details

                    var _ItemsEqOld = db.P_TR_EngProductionEquip.Where(x => x.ProductionId == master.ProductionId).ToList();
                    foreach (P_TR_EngProductionEquip item in _ItemsEqOld)
                    {
                        i = EngProductionEquip.Where(n => n.ProductionequipId == item.ProductionequipId).Count();
                        if (i == 0)
                        {
                            db.P_TR_EngProductionEquip.Remove(item);
                        }
                    }

                    //db.P_TR_EngProductionEquip.RemoveRange(db.P_TR_EngProductionEquip.Where(f => f.ProductionId == master.ProductionId));
                    //foreach (P_TR_EngProductionEquip item in EngProductionEquip)
                    //{
                    //    item.ProductionId = master.ProductionId;
                    //}
                    //db.P_TR_EngProductionEquip.AddRange(EngProductionEquip);
                    db.SaveChanges();
                    foreach (P_TR_EngProductionLabour item in EngProductionLabour)
                    {
                        if (item.ProductionLaborId > 0)
                        {
                            db.P_TR_EngProductionLabour.Attach(item);
                            db.Entry(item).State = System.Data.Entity.EntityState.Modified;
                        }
                        else
                        {
                            item.ProductionId = master.ProductionId;
                            db.P_TR_EngProductionLabour.Add(item);
                        }
                    }
                    //Deleting The Details

                    var _ItemsLqOld = db.P_TR_EngProductionLabour.Where(x => x.ProductionId == master.ProductionId).ToList();
                    foreach (P_TR_EngProductionLabour item in _ItemsLqOld)
                    {
                        i = EngProductionLabour.Where(n => n.ProductionLaborId == item.ProductionLaborId).Count();
                        if (i == 0)
                        {
                            db.P_TR_EngProductionLabour.Remove(item);
                        }
                    }
                    //db.P_TR_EngProductionLabour.RemoveRange(db.P_TR_EngProductionLabour.Where(f => f.ProductionId == master.ProductionId));
                    //foreach (P_TR_EngProductionLabour item in EngProductionLabour)
                    //{
                    //    item.ProductionId = master.ProductionId;
                    //}
                    //db.P_TR_EngProductionLabour.AddRange(EngProductionLabour);
                    db.SaveChanges();

                    ResponseResult res = Shared.InvTransactionProcess(session, master.ProductionId, "Prod", db);
                    if (res.ResponseState == true)
                    {
                        dbTrans.Commit();
                        master.TrNo = int.Parse(res.ResponseData.ToString());
                        result.Response = master.ProductionId;
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
        public IHttpActionResult InsertMasterDetail([FromBody]M_D_Productions data)
        {
            BaseResponse result = new BaseResponse();
            using (var dbTrans = db.Database.BeginTransaction())
            {
                try
                {
                    SessionRecord session = data.sessionRecord;
                    P_Tr_EngProduction master = data.P_Tr_EngProduction;
                    List<P_TR_EngProductionActiv> EngProductionActiv = data.P_TR_EngProductionActiv;
                    List<P_TR_EngProductionEquip> EngProductionEquip = data.P_TR_EngProductionEquip;
                    List<P_TR_EngProductionLabour> EngProductionLabour = data.P_TR_EngProductionLabour;
                    master.CreatedBy = session.UserCode;
                    master.CreatedAt = DateTime.Now;
                    db.P_Tr_EngProduction.Add(master);
                    var _Res = db.SaveChanges();
                    if (_Res > 0)
                    {
                        foreach (P_TR_EngProductionActiv item in EngProductionActiv)
                        {
                            item.ProductionId = master.ProductionId;
                        }
                        db.P_TR_EngProductionActiv.AddRange(EngProductionActiv);
                        db.SaveChanges();

                        foreach (P_TR_EngProductionEquip item in EngProductionEquip)
                        {
                            item.ProductionId = master.ProductionId;
                        }
                        db.P_TR_EngProductionEquip.AddRange(EngProductionEquip);
                        db.SaveChanges();

                        foreach (P_TR_EngProductionLabour item in EngProductionLabour)
                        {
                            item.ProductionId = master.ProductionId;
                        }
                        db.P_TR_EngProductionLabour.AddRange(EngProductionLabour);
                        db.SaveChanges();
                    }

                    ResponseResult res = Shared.InvTransactionProcess(session, master.ProductionId, "Prod", db);
                    if (res.ResponseState == true)
                    {
                        dbTrans.Commit();
                        //master.TrNo = int.Parse(res.ResponseData.ToString());
                        result.Response = master.ProductionId;
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
