using Newtonsoft.Json.Linq;
using PMS.ApiService.Models;
using PMS.ApiService.Tools;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace PMS.ApiService.Controllers
{
    public class P_D_CalenderController : BaseController, IMasterDetailsController<P_D_Calender, P_D_CalenderDays>
    {
        [HttpGet]
        public object SelectEntity(string SqlStatement)
        {
            var result = this.Get<P_D_Calender>(SqlStatement);
            return result.ToList();
        }

        public ResponseResult InsertMasterDetails(JObject data)
        {
            ResponseResult result = new ResponseResult();
            var obj = JObjMasterDetails<P_D_Calender, P_D_CalenderDays>(data);
            SessionRecord session = obj.Session;
            P_D_Calender master = obj.Master;
            List<P_D_CalenderDays> details = obj.Details.ToList();
            result = MasterDetailsValidation(master, details, session);
            if (result.ResponseState == false)
                return result;
            obj = JObjMasterDetails<P_D_Calender, P_D_CalenderDays>(result.ResponseData as JObject);
            session = obj.Session;
            master = obj.Master;
            details = obj.Details.ToList();
            using (var dbTrans = db.Database.BeginTransaction())
            {
                try
                {
                    db.P_D_Calender.Add(master);
                    db.SaveChanges();
                    foreach (P_D_CalenderDays item in details)
                    {
                        item.CalenderID = master.CalenderID;
                    }

                    db.P_D_CalenderDays.AddRange(details);
                    db.SaveChanges();

                    ResponseResult res = Shared.InvTransactionProcess(session, master.CalenderID, "Cal", db);
                    if (res.ResponseState == true)
                    {
                        dbTrans.Commit();
                        result.ResponseData = master.CalenderID;
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

        public ResponseResult MasterDetailsValidation(P_D_Calender Master, IEnumerable<P_D_CalenderDays> Details, SessionRecord Session)
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
            var obj = JObjMasterDetails<P_D_Calender, P_D_CalenderDays>(data);
            SessionRecord session = obj.Session;
            P_D_Calender master = obj.Master;
            List<P_D_CalenderDays> details = obj.Details.ToList();
            result = MasterDetailsValidation(master, details, session);
            if (result.ResponseState == false)
            {
                return result;
            }


            obj = JObjMasterDetails<P_D_Calender, P_D_CalenderDays>(result.ResponseData as JObject);
            session = obj.Session;
            master = obj.Master;
            details = obj.Details.ToList();
            using (var dbTrans = db.Database.BeginTransaction())
            {
                try
                {

                    //Deleting The Details
                    db.P_D_CalenderDays.RemoveRange(db.P_D_CalenderDays.Where(f => f.CalenderID == master.CalenderID));

                    db.P_D_Calender.Attach(master);
                    db.Entry(master).State = System.Data.Entity.EntityState.Modified;
                    db.SaveChanges();

                    foreach (P_D_CalenderDays item in details)
                    {
                        item.CalenderID = master.CalenderID;
                    }

                    db.P_D_CalenderDays.AddRange(details);
                    db.SaveChanges();


                    ResponseResult res = Shared.InvTransactionProcess(session, master.CalenderID, "Cal", db);
                    if (res.ResponseState == true)
                    {

                        dbTrans.Commit();
                        //master.TrNo = int.Parse(res.ResponseData.ToString());
                        result.ResponseData = master.CalenderID;
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
    }
}
