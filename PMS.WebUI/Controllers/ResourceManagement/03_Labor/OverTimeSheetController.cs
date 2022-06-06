using Newtonsoft.Json;
using PMS.ServiceConnector.Models;
using PMS.WebUI.Models.CustomModels;
using PMS.ServiceConnector.Models.Entities;
using PMS.ServiceConnector.Tools;
using PMS.WebUI.Tools;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace PMS.WebUI.Controllers.ResourceManagement._03_Labor
{
    public class OverTimeSheetController : Controller
    {
        DbEntities db = new DbEntities();
        int comCode = int.Parse(SessionManager.SessionRecord.CompCode);
        int braCode = int.Parse(SessionManager.SessionRecord.BranchCode);
        // GET: OverTimeSheet
        public ActionResult OverTimeSheetIndex()
        {
            SessionManager.PageIndex = 0;
            SessionManager.ModelCount = db.P_TR_ResOverTime.Where(x => x.CompCode == comCode && x.BraCode == braCode).Count();
            return View(Path.OverTimeSheet);
        }
        public JsonResult GetResLabourOverTimeByID(int id)
        {
            var result = db.PQ_GetResLabourOverTime.Where(x => x.OverTimeID == id).First();
            return Shared.JsonObject(result);
        }
        public JsonResult GetByIndex(int? index = null)
        {
            var model = db.PQ_GetResLabourOverTime.Where(x => x.CompCode == comCode && x.BraCode == braCode).ByIndex(SessionManager.PageIndex, "OverTimeID");
            return Shared.JsonObject(model);
        }
        public JsonResult GetLabourOverTimeDetailsList(int id)
        {
            var res = db.PQ_GetResLabourOverTimeDetail.Where(x => x.OverTimeID == id).Result();
            return Shared.JsonObject(res);
        }
        public JsonResult GetLabourOverTime(int id)
        {
            var res = db.PQ_GetResLabourOverTime.Where(x => x.OverTimeID == id).First();
            return Shared.JsonObject(res);
        }
        public JsonResult GetProjectByID(int id)
        {
            var result = db.PQ_GetResLabourOverTime.Where(x => x.OverTimeID == id).First();
            return Shared.JsonObject(result);
        }
        public JsonResult GetSiteEngineerByID(int id)
        {
            var result = db.P_D_SiteEngineer.Where(x => x.SiteEngineerId == id).First();
            return Shared.JsonObject(result);
        }
        public JsonResult GetLaborByID(int id)
        {
            var result = db.PQ_GetEngWorkSchduleLabor.Where(x => x.LaborID == id).First();
            return Shared.JsonObject(result);
        }
        public JsonResult GetOverTimeTypeByID(int id)
        {
            var result = db.P_D_LaborOverTimeType.Where(x => x.LaborOverTimeTypeID == id).First();
            return Shared.JsonObject(result);
        }
        public JsonResult Update(string JsonData)
        {
            M_D_ResOverTime obj = JsonConvert.DeserializeObject<M_D_ResOverTime>(JsonData);
            var result = db.P_TR_ResOverTime.UpdateMasterDetails(obj.P_TR_ResOverTime, obj.P_TR_ResOverTimeLabour);

            if (result.ResponseState == true)
            {
                SessionManager.ModelCount = db.P_TR_ResOverTime.Where(x => x.CompCode == comCode && x.BraCode == braCode).Count();
            }

            return Shared.JsonObject(result);
        }

        public JsonResult Insert(string JsonData)
        {
            //M_D_ResOverTime _M_D_OverTime = new M_D_ResOverTime();
            M_D_ResOverTime obj = JsonConvert.DeserializeObject<M_D_ResOverTime>(JsonData);
            //_M_D_OverTime.P_TR_ResOverTime = obj.P_TR_ResOverTime;
            //_M_D_OverTime.P_TR_ResOverTimeLabour = obj.P_TR_ResOverTimeLabour as List<P_TR_ResOverTimeLabour>;

            var result = db.P_TR_ResOverTime.InsertMasterDetails(obj.P_TR_ResOverTime, obj.P_TR_ResOverTimeLabour);
            if (result.ResponseState == true)
            {
                SessionManager.ModelCount = db.P_TR_ResOverTime.Where(x => x.CompCode == comCode && x.BraCode == braCode).Count();
            }
            return Shared.JsonObject(result);
        }

        public JsonResult getEngSchedule(int id)
        {
            var result = db.PQ_GetEngWorkSchdule.Where(x => x.ScheduleId == id).First();
            return Shared.JsonObject(result);
        }
    }
}