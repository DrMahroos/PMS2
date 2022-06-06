using Newtonsoft.Json.Linq;
using PMS.ApiService.Models;
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
    public class P_TR_ResRequestEquipmentController : BaseController, IMasterDetailsController<P_TR_ResRequestEquipment, P_TR_EngScheduleEquip>
    {
        [HttpGet]
        public object SelectEntity(string SqlStatement)
        {
            var result = this.Get<P_TR_ResRequestEquipment>(SqlStatement);
            return result.ToList();
        }
        public ResponseResult Process(ActionTypes actionType, JObject data)
        {
            ResponseResult result = new ResponseResult();
            result.ResponseState = true;
            return result;
        }
        public ResponseResult InsertMasterDetails(JObject data)
        {
            throw new NotImplementedException();
        }

        public ResponseResult MasterDetailsValidation(P_TR_ResRequestEquipment Master, IEnumerable<P_TR_EngScheduleEquip> Details, SessionRecord Session)
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
            var obj = JObjMasterDetails<P_TR_ResRequestEquipment, P_TR_EngScheduleEquip>(data);
            SessionRecord session = obj.Session;
            P_TR_ResRequestEquipment master = obj.Master;
            List<P_TR_EngScheduleEquip> details = obj.Details.ToList();
            result = MasterDetailsValidation(master, details, session);
            if (result.ResponseState == false)
            {
                return result;
            }

            obj = JObjMasterDetails<P_TR_ResRequestEquipment, P_TR_EngScheduleEquip>(result.ResponseData as JObject);
            session = obj.Session;
            master = obj.Master;
            details = obj.Details.ToList();
            master.UpdatedAt = DateTime.Now;
            master.UpdatedBy = session.UserCode;
            using (var dbTrans = db.Database.BeginTransaction())
            {
                try
                {
                    //Deleting The Details
                    db.P_TR_EngScheduleEquip.RemoveRange(db.P_TR_EngScheduleEquip.Where(f => f.ScheduleId == master.ScheduleId));

                    db.P_TR_ResRequestEquipment.Attach(master);
                    db.Entry(master).State = System.Data.Entity.EntityState.Modified;
                    db.SaveChanges();

                    foreach (P_TR_EngScheduleEquip item in details)
                    {
                        item.ScheduleId = master.ScheduleId;
                    }
                    db.P_TR_EngScheduleEquip.AddRange(details);
                    db.SaveChanges();

                    ResponseResult res = Shared.InvTransactionProcess(session, master.RequestEquipmentId, "ReqEquip", db);
                    if (res.ResponseState == true)
                    {
                        dbTrans.Commit();
                        master.TrNo = int.Parse(res.ResponseData.ToString());
                        result.ResponseData = master.RequestEquipmentId;
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
        public string PProc_ResGetFreeEquip(int bra, string FromDate, string ToDate, int? Classid)
        {
            //ResponseResult res = new ResponseResult();
            string res = db.Database.SqlQuery<PProc_ResGetFreeEquip_Result>("exec PProc_ResGetFreeEquip @bra, @FromDate, @ToDate, @Classid",
                new SqlParameter("@bra", bra),
                new SqlParameter("@FromDate", FromDate),
                new SqlParameter("@ToDate", ToDate),
                new SqlParameter("@Classid", Classid ?? SqlInt32.Null)).ToList().ToJsonString();
            //string _JsonResult= JsonConvert.SerializeObject(res);
            return res;
        }
    }
}
