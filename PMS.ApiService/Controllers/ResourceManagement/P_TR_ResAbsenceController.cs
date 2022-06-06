using PMS.ApiService.Tools;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Newtonsoft.Json.Linq;
using PMS.ApiService.Models;

namespace PMS.ApiService.Controllers.ResourceManagement
{
    public class P_TR_ResAbsenceController : BaseController, IMasterDetailsController<P_TR_ResAbsence, P_TR_ResAbsenceLabour>
    {
        public ResponseResult InsertMasterDetails(JObject data)
        {
            ResponseResult result = new ResponseResult();
            var obj = JObjMasterDetails<P_TR_ResAbsence, P_TR_ResAbsenceLabour>(data);
            SessionRecord session = obj.Session;
            P_TR_ResAbsence master = obj.Master;
            List<P_TR_ResAbsenceLabour> details = obj.Details.ToList();
            result = MasterDetailsValidation(master, details, session);
            if (result.ResponseState == false)
            {
                return result;
            }
            obj = JObjMasterDetails<P_TR_ResAbsence, P_TR_ResAbsenceLabour>(result.ResponseData as JObject);
            session = obj.Session;
            master = obj.Master;
            // intialize Forehin Keys
            //master.CostMethodID = null;
            //make initialize of CatID
            //master.CatID = null;
            master.CreatedAt = DateTime.Now;
            master.CreatedBy = session.UserCode;
            details = obj.Details.ToList();

            using (var dbTrans = db.Database.BeginTransaction())
            {
                try
                {
                    db.P_TR_ResAbsence.Add(master);
                    db.SaveChanges();
                    foreach (P_TR_ResAbsenceLabour item in details)
                    {
                        item.AbsenceID = master.AbsenceID;
                    }

                    db.P_TR_ResAbsenceLabour.AddRange(details);
                    db.SaveChanges();

                    ResponseResult res = Shared.InvTransactionProcess(session, master.AbsenceID, "LabAbs", db);
                    if (res.ResponseState == true)
                    {

                        dbTrans.Commit();
                        result.ResponseData = master.AbsenceID;
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

        public ResponseResult MasterDetailsValidation(P_TR_ResAbsence Master, IEnumerable<P_TR_ResAbsenceLabour> Details, SessionRecord Session)
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
        public object SelectEntity(string SqlStatement)
        {
            var result = this.Get<P_TR_ResAbsence>(SqlStatement);
            return result.ToList();
        }

        public ResponseResult UpdateMasterDetails(JObject data)
        {
            ResponseResult result = new ResponseResult();
            var obj = JObjMasterDetails<P_TR_ResAbsence, P_TR_ResAbsenceLabour>(data);
            SessionRecord session = obj.Session;
            P_TR_ResAbsence master = obj.Master;
            List<P_TR_ResAbsenceLabour> details = obj.Details.ToList();
            result = MasterDetailsValidation(master, details, session);
            if (result.ResponseState == false)
            {
                return result;
            }
            obj = JObjMasterDetails<P_TR_ResAbsence, P_TR_ResAbsenceLabour>(result.ResponseData as JObject);
            session = obj.Session;
            master = obj.Master;
            master.UpdatedAt = DateTime.Now;
            master.UpdatedBy = session.UserCode;
            details = obj.Details.ToList();

            using (var dbTrans = db.Database.BeginTransaction())
            {
                try
                {
                    //Deleting The Details
                    db.P_TR_ResAbsenceLabour.RemoveRange(db.P_TR_ResAbsenceLabour.Where(f => f.AbsenceID == master.AbsenceID));

                    db.P_TR_ResAbsence.Attach(master);
                    db.Entry(master).State = System.Data.Entity.EntityState.Modified;
                    db.SaveChanges();
                    foreach (P_TR_ResAbsenceLabour item in details)
                    {
                        item.AbsenceID = master.AbsenceID;
                    }
                    db.P_TR_ResAbsenceLabour.AddRange(details);
                    db.SaveChanges();

                    ResponseResult res = Shared.InvTransactionProcess(session, master.AbsenceID, "LabAbs", db);
                    if (res.ResponseState == true)
                    {
                        dbTrans.Commit();
                        //master.TrNo = int.Parse(res.ResponseData.ToString());
                        result.ResponseData = master.AbsenceID;
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
