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
    public class P_TR_EngScheduleController : BaseController, IMasterDetailsoBJController<P_TR_EngSchedule, M_D_WorkSchdule>
    {
        [HttpGet]
        public object SelectEntity(string SqlStatement)
        {
            var result = this.Get<P_TR_EngSchedule>(SqlStatement);
            return result.ToList();
        }
        public ResponseResult InsertMasterDetails(JObject data)
        {
            ResponseResult result = new ResponseResult();
            var obj1 = JObjMasterManyDetails<P_TR_EngSchedule, M_D_WorkSchdule>(data);

            var obj = JObjMasterManyDetails<P_TR_EngSchedule, M_D_WorkSchdule>(data);
            SessionRecord session = obj1.Session;
            P_TR_EngSchedule master = obj1.Master;
            M_D_WorkSchdule details = obj1.Details;
            result = MasterDetailsValidation(master, details, session);
            if (result.ResponseState == false)
                return result;
            obj = JObjMasterManyDetails<P_TR_EngSchedule, M_D_WorkSchdule>(result.ResponseData as JObject);
            session = obj.Session;
            master = obj.Master;
            details = obj.Details;
            master.CreatedAt = DateTime.Now;
            master.CreatedBy = session.UserCode;
            //Start Details
            List<P_TR_EngScheduleActiv> EngScheduleActiv = details.P_TR_EngScheduleActiv;
            //End Details

            using (var dbTrans = db.Database.BeginTransaction())
            {
                try
                {
                    db.P_TR_EngSchedule.Add(master);
                    var _Res = db.SaveChanges();
                    if (_Res > 0)
                    {
                        foreach (P_TR_EngScheduleActiv item in EngScheduleActiv)
                        {
                            item.ScheduleId = master.ScheduleId;
                        }
                        db.P_TR_EngScheduleActiv.AddRange(EngScheduleActiv);
                        db.SaveChanges();
                    }

                    ResponseResult res = Shared.InvTransactionProcess(session, master.ScheduleId, "Schdle", db);
                    if (res.ResponseState == true)
                    {
                        dbTrans.Commit();
                        //master.TrNo = int.Parse(res.ResponseData.ToString());
                        result.ResponseData = master.ScheduleId;
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
        public IHttpActionResult InsertMasterDetail([FromBody]M_D_WorkSchdule data)
        {
            BaseResponse result = new BaseResponse();
            using (var dbTrans = db.Database.BeginTransaction())
            {
                try
                {
                    SessionRecord session = data.sessionRecord;
                    P_TR_EngSchedule master = data.P_TR_EngSchedule;
                    List<P_TR_EngScheduleActiv> EngScheduleActiv = data.P_TR_EngScheduleActiv;

                    master.CreatedBy = session.UserCode;
                    master.CreatedAt = DateTime.Now;
                    db.P_TR_EngSchedule.Add(master);
                    var _Res = db.SaveChanges();
                    if (_Res > 0)
                    {
                        foreach (P_TR_EngScheduleActiv item in EngScheduleActiv)
                        {
                            item.ScheduleId = master.ScheduleId;
                        }
                        db.P_TR_EngScheduleActiv.AddRange(EngScheduleActiv);
                        db.SaveChanges();

                    }

                    ResponseResult res = Shared.InvTransactionProcess(session, master.ScheduleId, "Schdle", db);
                    if (res.ResponseState == true)
                    {
                        dbTrans.Commit();
                        //master.TrNo = int.Parse(res.ResponseData.ToString());
                        result.Response = master.ScheduleId;
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
        public IHttpActionResult UpdateMasterDetail([FromBody]M_D_WorkSchdule data)
        {
            BaseResponse result = new BaseResponse();

            using (var dbTrans = db.Database.BeginTransaction())
            {
                try
                {
                    SessionRecord session = data.sessionRecord;
                    P_TR_EngSchedule master = data.P_TR_EngSchedule;
                    List<P_TR_EngScheduleActiv> EngProductionActiv = data.P_TR_EngScheduleActiv;

                    master.UpdatedBy = session.UserCode;
                    master.UpdatedAt = DateTime.Now;
                    db.P_TR_EngSchedule.Attach(master);
                    db.Entry(master).State = System.Data.Entity.EntityState.Modified;
                    db.SaveChanges();

                    //Deleting The Details
                    //db.P_TR_EngScheduleActiv.RemoveRange(db.P_TR_EngScheduleActiv.Where(f => f.ScheduleId == master.ScheduleId));
                    // List<P_TR_EngScheduleActiv> EngScheduleActiv = data.P_TR_EngScheduleActiv;
                    //foreach (P_TR_EngScheduleActiv item in EngProductionActiv)
                    //{
                    //    item.ScheduleId = master.ScheduleId;
                    //}
                    //db.P_TR_EngScheduleActiv.AddRange(EngProductionActiv);
                    //update old and add new records01 P_Tr_SalesOfferStage

                    foreach (P_TR_EngScheduleActiv item in EngProductionActiv)
                    {
                        if (item.ScheduleActivId > 0)
                        {
                            db.P_TR_EngScheduleActiv.Attach(item);
                            db.Entry(item).State = System.Data.Entity.EntityState.Modified;
                        }
                        else
                        {
                            item.ScheduleId = master.ScheduleId;
                            db.P_TR_EngScheduleActiv.Add(item);
                        }
                    }
                    //Deleting The Details
                    int i;
                    var _ItemsOld = db.P_TR_EngScheduleActiv.Where(x => x.ScheduleId == master.ScheduleId).ToList();
                    foreach (P_TR_EngScheduleActiv item in _ItemsOld)
                    {
                        i = EngProductionActiv.Where(n => n.ScheduleActivId == item.ScheduleActivId).Count();
                        if (i == 0)
                        {
                            db.P_TR_EngScheduleActiv.Remove(item);
                        }
                    }


                    db.SaveChanges();

                    

                    ResponseResult res = Shared.InvTransactionProcess(session, master.ScheduleId, "Schdle", db);
                    if (res.ResponseState == true)
                    {
                        dbTrans.Commit();
                        master.TrNo = int.Parse(res.ResponseData.ToString());
                        result.Response = master.ScheduleId;
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

        public ResponseResult UpdateMasterDetails(JObject data)
        {
            ResponseResult result = new ResponseResult();
            var obj = JObjMasterManyDetails<P_TR_EngSchedule, M_D_WorkSchdule>(data);
            SessionRecord session = obj.Session;
            P_TR_EngSchedule master = obj.Master;
            M_D_WorkSchdule details = obj.Details;
            result = MasterDetailsValidation(master, details, session);
            if (result.ResponseState == false)
            {
                return result;
            }

            obj = JObjMasterManyDetails<P_TR_EngSchedule, M_D_WorkSchdule>(result.ResponseData as JObject);
            session = obj.Session;
            master = obj.Master;
            details = obj.Details;
            master.UpdatedAt= DateTime.Now;
            master.UpdatedBy = session.UserCode;

            //Start Details
            List<P_TR_EngScheduleActiv> EngScheduleActiv = details.P_TR_EngScheduleActiv;
            //End Details

            using (var dbTrans = db.Database.BeginTransaction())
            {
                try
                {
                    //Deleting The Details
                    db.P_TR_EngScheduleActiv.RemoveRange(db.P_TR_EngScheduleActiv.Where(f => f.ScheduleId == master.ScheduleId));

                    db.P_TR_EngSchedule.Attach(master);
                    db.Entry(master).State = System.Data.Entity.EntityState.Modified;
                    db.SaveChanges();

                    foreach (P_TR_EngScheduleActiv item in EngScheduleActiv)
                    {
                        item.ScheduleId = master.ScheduleId;
                    }
                    db.P_TR_EngScheduleActiv.AddRange(EngScheduleActiv);
                    db.SaveChanges();

                    ResponseResult res = Shared.InvTransactionProcess(session, master.ScheduleId, "Schdle", db);
                    if (res.ResponseState == true)
                    {
                        dbTrans.Commit();
                        master.TrNo = int.Parse(res.ResponseData.ToString());
                        result.ResponseData = master.ScheduleId;
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

        public ResponseResult MasterDetailsValidation(P_TR_EngSchedule Master, M_D_WorkSchdule Details, SessionRecord Session)
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

     
        public string GetHourProd(string From,string To, string CalcId)
        {
            int newCalcID = int.Parse(CalcId);
            ObjectParameter op = new ObjectParameter("WorkHours", typeof(double));
            db.PProc_CalcWorkHours(From, To, newCalcID, op);
            return op.Value.ToString();
        }
    }
}
