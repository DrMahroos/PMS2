using Newtonsoft.Json.Linq;
using PMS.ApiService.Models;
using PMS.ApiService.Models.CustomEntities;
using PMS.ApiService.Tools;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Data.SqlTypes;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace PMS.ApiService.Controllers.ResourceManagement
{
    public class P_Tr_ResRequestLabourController : BaseController, IMasterDetailsController<P_Tr_ResRequestLabour, P_TR_EngScheduleLabor>
    {
        [HttpGet]
        public object SelectEntity(string SqlStatement)
        {
            var result = this.Get<P_Tr_ResRequestLabour>(SqlStatement);
            return result.ToList();
        }

        public ResponseResult Process(ActionTypes actionType, JObject data)
        {
            ResponseResult result = new ResponseResult();
            result.ResponseState = true;
            return result;
        }

        [HttpPost]
        public ResponseResult InsertEntity(JObject data)
        {
            ResponseResult result = new Models.ResponseResult();
            using (var dbTransaction = db.Database.BeginTransaction())
            {
                try
                {
                    var obj = JObjectData<P_Tr_ResRequestLabour>(data);
                    //obj.Entity = result.ResponseData as P_Tr_ResRequestLabour;
                    data = JObjectToObj<P_Tr_ResRequestLabour>(obj.Entity, obj.Session);
                    result = this.Execute<P_Tr_ResRequestLabour>(data, ActionTypes.Insert, this.Process, db, dbTransaction);
                    SessionRecord session = obj.Session;
                    obj.Entity.CreatedAt = DateTime.Now;
                    obj.Entity.CreatedBy = session.UserCode;
                    if (result.ResponseState)
                    {
                        var SEC = JsonDeserialize<P_Tr_ResRequestLabour>(result.ResponseData.ToString());
                        ResponseResult res = Shared.InvTransactionProcess(session, SEC.RequestLabourId, "ReqLab", db);
                        if (res.ResponseState == true)
                        {
                            dbTransaction.Commit();
                            //SEC.LaborCode = res.ResponseData.ToString();
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


        public ResponseResult UpdateEntity(JObject data)
        {
            ResponseResult result = new Models.ResponseResult();
            using (var dbTransaction = db.Database.BeginTransaction())
            {
                try
                {

                    var obj = JObjectData<P_Tr_ResRequestLabour>(data);
                    //obj.Entity = result.ResponseData as P_Tr_ResRequestLabour;
                    data = JObjectToObj<P_Tr_ResRequestLabour>(obj.Entity, obj.Session);
                    result = this.Execute<P_Tr_ResRequestLabour>(data, ActionTypes.Update, this.Process, db, dbTransaction);
                    SessionRecord session = obj.Session;
                    obj.Entity.UpdatedAt = DateTime.Now;
                    obj.Entity.UpdatedBy = session.UserCode;
                    if (result.ResponseState)
                    {
                        var labor = JsonDeserialize<P_Tr_ResRequestLabour>(result.ResponseData.ToString());
                        ResponseResult res = Shared.InvTransactionProcess(session, labor.RequestLabourId, "ReqLab", db);
                        if (res.ResponseState == true)
                        {
                            dbTransaction.Commit();
                            //labor.LaborCode = res.ResponseData.ToString();
                            result.ResponseData = JsonSerialize(labor);
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

        public ResponseResult InsertMasterDetails(JObject data)
        {
            ResponseResult result = new ResponseResult();
            var obj = JObjMasterDetails<P_Tr_ResRequestLabour, P_TR_EngScheduleLabor>(data);
            SessionRecord session = obj.Session;
            P_Tr_ResRequestLabour master = obj.Master;
            List<P_TR_EngScheduleLabor> details = obj.Details.ToList();
            result = MasterDetailsValidation(master, details, session);
            if (result.ResponseState == false)
            {
                return result;
            }
            obj = JObjMasterDetails<P_Tr_ResRequestLabour, P_TR_EngScheduleLabor>(result.ResponseData as JObject);
            session = obj.Session;
            master = obj.Master;
            details = obj.Details.ToList();
            master.CreatedAt = DateTime.Now;
            master.CreatedBy = session.UserCode;
            using (var dbTrans = db.Database.BeginTransaction())
            {
                try
                {
                    db.P_Tr_ResRequestLabour.Add(master);
                    db.SaveChanges();
                    foreach (P_TR_EngScheduleLabor item in details)
                    {
                        item.ScheduleId = master.ScheduleId;
                    }

                    db.P_TR_EngScheduleLabor.AddRange(details);
                    db.SaveChanges();

                    ResponseResult res = Shared.InvTransactionProcess(session, master.RequestLabourId, "ReqLab", db);
                    if (res.ResponseState == true)
                    {

                        dbTrans.Commit();
                        //master.TrNo = int.Parse(res.ResponseData.ToString());
                        result.ResponseData = master.RequestLabourId;
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

        public ResponseResult MasterDetailsValidation(P_Tr_ResRequestLabour Master, IEnumerable<P_TR_EngScheduleLabor> Details, SessionRecord Session)
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
        [HttpPost, AllowAnonymous]
        public IHttpActionResult UpdateMasterDetail([FromBody] M_D_RequestLabor data)
        {
            BaseResponse result = new BaseResponse();

            using (var dbTrans = db.Database.BeginTransaction())
            {
                try
                {
                    SessionRecord session = data.sessionRecord;
                    P_Tr_ResRequestLabour master = data.P_Tr_ResRequestLabour;
                    List<P_TR_EngScheduleLabor> EngScheduleLabor = data.P_TR_EngScheduleLabor;
                    //Deleting The Details
                    master.UpdatedBy = session.UserCode;
                    master.UpdatedAt = DateTime.Now;
                    db.P_Tr_ResRequestLabour.Attach(master);
                    db.Entry(master).State = System.Data.Entity.EntityState.Modified;
                    db.SaveChanges();

                    foreach (P_TR_EngScheduleLabor item in EngScheduleLabor)
                    {
                        if (item.ScheduleLaborId > 0)
                        {
                            db.P_TR_EngScheduleLabor.Attach(item);
                            db.Entry(item).State = System.Data.Entity.EntityState.Modified;
                        }
                        else
                        {
                            item.ScheduleId = master.ScheduleId;
                            db.P_TR_EngScheduleLabor.Add(item);
                        }
                    }
                    //Deleting The Details
                    int i;
                    var _ItemsOld = db.P_TR_EngScheduleLabor.Where(x => x.ScheduleId == master.ScheduleId).ToList();
                    foreach (P_TR_EngScheduleLabor item in _ItemsOld)
                    {
                        i = EngScheduleLabor.Where(n => n.ScheduleLaborId == item.ScheduleLaborId).Count();
                        if (i == 0)
                        {
                            db.P_TR_EngScheduleLabor.Remove(item);
                        }
                    }
                    db.SaveChanges();
                    
                    ResponseResult res = Shared.InvTransactionProcess(session,  Convert.ToInt32( master.ScheduleId) , "ReqLab", db);
                    if (res.ResponseState == true)
                    {
                        dbTrans.Commit();
                        //master.TrNo = int.Parse(res.ResponseData.ToString());
                        result.IsSuccess = true;
                        result.Response = master.RequestLabourId;
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

        public ResponseResult UpdateMasterDetails(JObject data)
        {
            ResponseResult result = new ResponseResult();
            var obj = JObjMasterDetails<P_Tr_ResRequestLabour, P_TR_EngScheduleLabor>(data);
            SessionRecord session = obj.Session;
            P_Tr_ResRequestLabour master = obj.Master;
            List<P_TR_EngScheduleLabor> details = obj.Details.ToList();
            result = MasterDetailsValidation(master, details, session);
            if (result.ResponseState == false)
            {
                return result;
            }

            obj = JObjMasterDetails<P_Tr_ResRequestLabour, P_TR_EngScheduleLabor>(result.ResponseData as JObject);
            session = obj.Session;
            master = obj.Master;
            details = obj.Details.ToList();

            using (var dbTrans = db.Database.BeginTransaction())
            {
                try
                {
                    //Deleting The Details
                    db.P_TR_EngScheduleLabor.RemoveRange(db.P_TR_EngScheduleLabor.Where(f => f.ScheduleId == master.ScheduleId));

                    db.P_Tr_ResRequestLabour.Attach(master);
                    db.Entry(master).State = System.Data.Entity.EntityState.Modified;
                    db.SaveChanges();

                    foreach (P_TR_EngScheduleLabor item in details)
                    {
                        item.ScheduleId = master.ScheduleId;
                    }
                    db.P_TR_EngScheduleLabor.AddRange(details);
                    db.SaveChanges();

                    ResponseResult res = Shared.InvTransactionProcess(session, master.RequestLabourId, "ReqLab", db);
                    if (res.ResponseState == true)
                    {
                        dbTrans.Commit();
                        master.TrNo = int.Parse(res.ResponseData.ToString());
                        result.ResponseData = master.RequestLabourId;
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

        //[HttpGet]
        //public string SubProductionApprove(int id)
        //{
        //    ObjectParameter op = new ObjectParameter("id", typeof(int));
        //    db.PProc_EngSubProductionAuthorize(id);
        //}

        [HttpGet]
        public string PProc_ResGetFreeLabor(int bra, string FromDate, string ToDate, int? Classid, int? Catid)
        {
            //ResponseResult res = new ResponseResult();
            string res = db.Database.SqlQuery<PProc_ResGetFreeLabor_Result>("exec PProc_ResGetFreeLabor @bra, @FromDate, @ToDate, @Classid, @Catid",
               new SqlParameter("@bra", bra),
                new SqlParameter("@FromDate", FromDate),
                new SqlParameter("@ToDate", ToDate),
                new SqlParameter("@Classid", Classid ?? SqlInt32.Null),
                new SqlParameter("@Catid", Catid ?? SqlInt32.Null)).ToList().ToJsonString();



           // var res = db.PProc_ResGetFreeLabor(bra, FromDate, ToDate, Classid, Catid).ToList().ToJsonString();

           // string _JsonResult= JsonConvert.SerializeObject(res);
            return res;

            
        }
    }
}
