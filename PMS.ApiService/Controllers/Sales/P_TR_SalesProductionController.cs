using Newtonsoft.Json.Linq;
using PMS.ApiService.Models;
using PMS.ApiService.Tools;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Globalization;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace PMS.ApiService.Controllers.Sales
{
    public class P_TR_SalesProductionController : BaseController, IMasterDetailsController<P_TR_SalesProduction, P_TR_SalesProductionDetail>
    {
        [HttpGet]
        public object SelectEntity(string SqlStatement)
        {
            var result = this.Get<P_TR_SalesProduction>(SqlStatement);
            return result.ToList();
        }
       
        public class M_D_IssueProduction
        {
            public SessionRecord sessionRecord { get; set; }
            public P_TR_SalesProduction P_TR_SalesProduction { get; set; }
            public List<P_TR_SalesProductionDetail> P_TR_SalesProductionDetail { get; set; }
          
        }

        [HttpPost, AllowAnonymous]
        public IHttpActionResult InsertMasterDetail([FromBody]M_D_IssueProduction data)
        {
            BaseResponse result = new BaseResponse();
            using (var dbTrans = db.Database.BeginTransaction())
            {
                try
                {
                    SessionRecord session = data.sessionRecord;
                    P_TR_SalesProduction master = data.P_TR_SalesProduction;
                    List<P_TR_SalesProductionDetail> Details = data.P_TR_SalesProductionDetail;
                    master.CreatedBy = session.UserCode;
                    master.CreatedAt = DateTime.Now;
                    db.P_TR_SalesProduction.Add(master);
                    var _Res = db.SaveChanges();
                    if (_Res > 0)
                    {
                        foreach (P_TR_SalesProductionDetail item in Details)
                        {
                            item.ProductionId = master.ProductionId;
                        }
                        db.P_TR_SalesProductionDetail.AddRange(Details);
                        db.SaveChanges();
                    }

                    ResponseResult res = Shared.InvTransactionProcess(session, master.ProductionId, "SlsProd", db);
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
        [HttpPost, AllowAnonymous]
        public IHttpActionResult UpdateMasterDetail([FromBody]M_D_IssueProduction data)
        {
            BaseResponse result = new BaseResponse();

            using (var dbTrans = db.Database.BeginTransaction())
            {
                try
                {
                    SessionRecord session = data.sessionRecord;
                    P_TR_SalesProduction master = data.P_TR_SalesProduction;
                    List<P_TR_SalesProductionDetail> Details = data.P_TR_SalesProductionDetail;
                    master.UpdatedBy = session.UserCode;
                    master.UpdatedAt = DateTime.Now;
                    db.P_TR_SalesProduction.Attach(master);
                    db.Entry(master).State = System.Data.Entity.EntityState.Modified;
                    db.SaveChanges();

                    foreach (P_TR_SalesProductionDetail item in Details)
                    {
                        if (item.ProductionDetailId > 0)
                        {
                            db.P_TR_SalesProductionDetail.Attach(item);
                            db.Entry(item).State = System.Data.Entity.EntityState.Modified;
                        }
                        else
                        {
                            item.ProductionId = master.ProductionId;
                            db.P_TR_SalesProductionDetail.Add(item);
                        }
                    }
                    //Deleting The Details
                    int i;
                    var _ItemsOld = db.P_TR_SalesProductionDetail.Where(x => x.ProductionId == master.ProductionId).ToList();
                    foreach (P_TR_SalesProductionDetail item in _ItemsOld)
                    {
                        i = Details.Where(n => n.ProductionDetailId == item.ProductionDetailId).Count();
                        if (i == 0)
                        {
                            db.P_TR_SalesProductionDetail.Remove(item);
                        }
                    }
                    db.SaveChanges();
                    ResponseResult res = Shared.InvTransactionProcess(session, master.ProductionId, "SlsProd", db);
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
        public ResponseResult InsertMasterDetails(JObject data)
        {
            ResponseResult result = new ResponseResult();
            var obj = JObjMasterDetails<P_TR_SalesProduction, P_TR_SalesProductionDetail>(data);
            SessionRecord session = obj.Session;
            P_TR_SalesProduction master = obj.Master;
            List<P_TR_SalesProductionDetail> details = obj.Details.ToList();
            result = MasterDetailsValidation(master, details, session);
            if (result.ResponseState == false)
                return result;
            obj = JObjMasterDetails<P_TR_SalesProduction, P_TR_SalesProductionDetail>(result.ResponseData as JObject);
            session = obj.Session;
            master = obj.Master;
            master.CreatedAt = DateTime.Now;
            master.CreatedBy = session.UserCode;
            details = obj.Details.ToList();
            using (var dbTrans = db.Database.BeginTransaction())
            {
                try
                {
                    db.P_TR_SalesProduction.Add(master);
                    db.SaveChanges();
                    foreach (P_TR_SalesProductionDetail item in details)
                    {
                        item.ProductionId = master.ProductionId;
                    }

                    db.P_TR_SalesProductionDetail.AddRange(details);
                    db.SaveChanges();

                    ResponseResult res = Shared.InvTransactionProcess(session, master.ProductionId, "SlsProd", db);
                    if (res.ResponseState == true)
                    {
                        dbTrans.Commit();
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

        public ResponseResult MasterDetailsValidation(P_TR_SalesProduction Master, IEnumerable<P_TR_SalesProductionDetail> Details, SessionRecord Session)
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
            var obj = JObjMasterDetails<P_TR_SalesProduction, P_TR_SalesProductionDetail>(data);
            SessionRecord session = obj.Session;
            P_TR_SalesProduction master = obj.Master;
            List<P_TR_SalesProductionDetail> details = obj.Details.ToList();
            result = MasterDetailsValidation(master, details, session);
            if (result.ResponseState == false)
            {
                return result;
            }

            obj = JObjMasterDetails<P_TR_SalesProduction, P_TR_SalesProductionDetail>(result.ResponseData as JObject);
            session = obj.Session;

            master = obj.Master;
            details = obj.Details.ToList();
            master.UpdatedAt = DateTime.Now;
            master.UpdatedBy = session.UserCode;

            using (var dbTrans = db.Database.BeginTransaction())
            {
                try
                {
                    db.P_TR_SalesProductionDetail.RemoveRange(db.P_TR_SalesProductionDetail.Where(f => f.ProductionId == master.ProductionId));
                    db.P_TR_SalesProduction.Attach(master);
                    db.Entry(master).State = System.Data.Entity.EntityState.Modified;
                    db.SaveChanges();

                    foreach (P_TR_SalesProductionDetail item in details)
                    {
                        item.ProductionId = master.ProductionId;
                    }

                    db.P_TR_SalesProductionDetail.AddRange(details);
                    db.SaveChanges();

                    ResponseResult res = Shared.InvTransactionProcess(session, master.ProductionId, "SlsProd", db);
                    if (res.ResponseState == true)
                    {
                        dbTrans.Commit();
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

        public ResponseResult UpdateEntity(JObject data)
        {
            ResponseResult result = new Models.ResponseResult();
            using (var dbTransaction = db.Database.BeginTransaction())
            {
                try
                {
                    //result = Validation(ActionTypes.Update, data);
                    //if (result.ResponseState == false)
                    //    return result;

                    var obj = JObjectData<P_TR_SalesProduction>(data);
                    //obj.Entity = result.ResponseData as P_TR_SalesProduction;
                    data = JObjectToObj<P_TR_SalesProduction>(obj.Entity, obj.Session);
                    result = this.Execute<P_TR_SalesProduction>(data, ActionTypes.Update, this.Process, db, dbTransaction);
                    SessionRecord session = obj.Session;

                    if (result.ResponseState)
                    {
                        var SEC = JsonDeserialize<P_TR_SalesProduction>(result.ResponseData.ToString());
                        ResponseResult res = Shared.InvTransactionProcess(session, SEC.ProductionId, "SlsProd", db);
                        if (res.ResponseState == true)
                        {

                            dbTransaction.Commit();
                            SEC.ProjCode = res.ResponseData.ToString();
                            result.ResponseData = JsonSerialize(SEC);
                        }
                        else
                        {
                            result.ResponseMessage = res.ResponseMessage;
                            result.ResponseState = false;
                            dbTransaction.Rollback();
                        }
                    }
                }
                catch (Exception ex)
                {
                    dbTransaction.Rollback();
                    result.ResponseMessage = ex.Message;
                    result.ResponseState = false;
                }
            }
            return result;
        }
        public ResponseResult Process(ActionTypes actionType, JObject data)
        {
            ResponseResult result = new ResponseResult();
            result.ResponseState = true;
            return result;
        }

        public ResponseResult Validation(ActionTypes actionType, JObject data)
        {
            ResponseResult result = new ResponseResult();
            var obj = JObjectData<P_TR_SalesProduction>(data);

            var entity = obj.Entity;
            if (String.IsNullOrEmpty(entity.WorkDiscription))
            {
                result.ResponseState = false;
                result.ResponseMessage = "";//Resources.SystemResource.Msg_Required;
                return result;
            }
            result.ResponseState = true;
            result.ResponseData = obj.Entity;
            return result;
        }

        [HttpGet]
        public string Sales_Production(string ProjID, string dt)
        {
            DateTime ss = DateTime.Parse(dt);
            var result = db.PProc_Sales_Production(int.Parse(ProjID), ss.ToString("dd/M/yyyy")).ToList().ToJsonString();
            return result;
        }
    }
}
