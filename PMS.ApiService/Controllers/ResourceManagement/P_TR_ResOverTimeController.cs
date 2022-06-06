using PMS.ApiService.Tools;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Newtonsoft.Json.Linq;
using PMS.ApiService.Models;
using PMS.ApiService.Models.CustomEntities;

namespace PMS.ApiService.Controllers.ResourceManagement
{
    public class P_TR_ResOverTimeController : BaseController, IMasterDetailsController<P_TR_ResOverTime, P_TR_ResOverTimeLabour>
    {
        [HttpGet]
        public object SelectEntity(string SqlStatement)
        {
            var result = this.Get<P_TR_ResOverTime>(SqlStatement);
            return result.ToList();
        }
        public ResponseResult InsertMasterDetails(JObject data)
        {
            ResponseResult result = new ResponseResult();

            var obj = JObjMasterDetails<P_TR_ResOverTime, P_TR_ResOverTimeLabour>(data);
            SessionRecord session = obj.Session;
            P_TR_ResOverTime master = obj.Master;
            List<P_TR_ResOverTimeLabour> details = obj.Details.ToList();
            result = MasterDetailsValidation(master, details, session);
            if (result.ResponseState == false)
                return result;
            obj = JObjMasterDetails<P_TR_ResOverTime, P_TR_ResOverTimeLabour>(result.ResponseData as JObject);
            session = obj.Session;
            master = obj.Master;
            details = obj.Details.ToList();
            master.CreatedAt = DateTime.Now;
            master.CreatedBy = session.UserCode;
            //Start Details
            //List<P_TR_ResOverTimeLabour> ResOverTimeLabour = details;
            //End Details

            using (var dbTrans = db.Database.BeginTransaction())
            {
                try
                {
                    db.P_TR_ResOverTime.Add(master);
                    var _Res = db.SaveChanges();
                    if (_Res > 0)
                    {
                        foreach (P_TR_ResOverTimeLabour item in details)
                        {
                            item.OverTimeID = master.OverTimeID;
                        }
                        db.P_TR_ResOverTimeLabour.AddRange(details);
                        db.SaveChanges();

                        //foreach (P_TR_SalesProduction item in SalesProduction)
                        //{
                        //    item.CustomerID = master.CustomerID;
                        //}
                        //db.P_TR_SalesProduction.AddRange(SalesProduction);
                        //db.SaveChanges();
                    }

                    ResponseResult res = Shared.InvTransactionProcess(session, master.OverTimeID, "LabOT", db);
                    if (res.ResponseState == true)
                    {
                        dbTrans.Commit();
                        //master.TrNo = int.Parse(res.ResponseData.ToString());
                        result.ResponseData = master.OverTimeID;
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
            var obj = JObjMasterDetails<P_TR_ResOverTime, P_TR_ResOverTimeLabour>(data);
            SessionRecord session = obj.Session;
            P_TR_ResOverTime master = obj.Master;
            List<P_TR_ResOverTimeLabour> details = obj.Details.ToList();
            result = MasterDetailsValidation(master, details, session);
            if (result.ResponseState == false)
            {
                return result;
            }

            obj = JObjMasterDetails<P_TR_ResOverTime, P_TR_ResOverTimeLabour>(result.ResponseData as JObject);
            session = obj.Session;
            master = obj.Master;
            details = obj.Details.ToList();
            master.UpdatedAt = DateTime.Now;
            master.UpdatedBy = session.UserCode;
            //Start Details         
            //List<P_TR_ResOverTimeLabour> ResOverTimeLabour = details.P_TR_ResOverTimeLabour;
            //End Details

            using (var dbTrans = db.Database.BeginTransaction())
            {
                try
                {
                    //Deleting The Details
                    db.P_TR_ResOverTime.Attach(master);
                    db.Entry(master).State = System.Data.Entity.EntityState.Modified;
                    db.SaveChanges();

                    db.P_TR_ResOverTimeLabour.RemoveRange(db.P_TR_ResOverTimeLabour.Where(f => f.OverTimeID == master.OverTimeID));
                    foreach (P_TR_ResOverTimeLabour item in details)
                    {
                        item.OverTimeID = master.OverTimeID;
                    }
                    db.P_TR_ResOverTimeLabour.AddRange(details);
                    db.SaveChanges();

                    ResponseResult res = Shared.InvTransactionProcess(session, master.OverTimeID, "LabOT", db);
                    if (res.ResponseState == true)
                    {
                        dbTrans.Commit();
                        //master.TrNo = int.Parse(res.ResponseData.ToString());
                        result.ResponseData = master.OverTimeID;
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

        public ResponseResult MasterDetailsValidation(P_TR_ResOverTime Master, IEnumerable<P_TR_ResOverTimeLabour> Details, SessionRecord Session)
        {
            ResponseResult result = new ResponseResult();
            var obj = new
            {
                Master = Master,
                Details = Details,
                Session = Session
            };

            result.ResponseData = JObject.FromObject(obj);
            result.ResponseState = true;
            return result;
        }
    }
}
