using Newtonsoft.Json;
using PMS.ServiceConnector.Models;
using PMS.ServiceConnector.Models.Entities;
using PMS.ServiceConnector.Tools;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace PMS.WebUI.Controllers.ResourceManagement._02_Equipment
{
    public class EquipmentMonitoringController : Controller
    {
        DbEntities db = new DbEntities();
        int comCode = int.Parse(SessionManager.SessionRecord.CompCode);
        int braCode = int.Parse(SessionManager.SessionRecord.BranchCode);

        // GET: EquipmentMonitoring
        public ActionResult EquipmentMonitoringIndex()
        {
            SessionManager.PageIndex = 0;
            SessionManager.ModelCount = db.PQ_GetResLabourAbsence.Where(x => x.CompCode == comCode).Count();
            return View(Path.EquipmentMonitoring);
        }
        public JsonResult GetProjectByID(int id)
        {
            var result = db.P_TR_EngProject.Where(x => x.ProjectID == id).First();
            return Shared.JsonObject(result);
        }
        public JsonResult GetProjectPhaseByID(int id)
        {
            var result = db.P_TR_EngProjectPhase.Where(x => x.ProjectPhaseId == id).First();
            return Shared.JsonObject(result);
        }
        public JsonResult GetEngScheduleByID(int id)
        {
            var result = db.P_TR_EngSchedule.Where(x => x.ScheduleId == id).First();
            return Shared.JsonObject(result);
        }
        public JsonResult GetSiteEngineerByID(int id)
        {
            var result = db.P_D_SiteEngineer.Where(x => x.SiteEngineerId == id).First();
            return Shared.JsonObject(result);
        }
        public JsonResult GetEquipmentClass(int id)
        {
            var result = db.P_D_EquipmentClass.Where(x => x.EquipClassId == id).First();
            return Shared.JsonObject(result);
        }
        public JsonResult getLaborCategoryByID(int id)
        {
            var result = db.P_D_LaborCategory.Where(x => x.LaborCategoryId == id).First();
            return Shared.JsonObject(result);
        }
        public JsonResult GetEngMonitorScheduleEquip(int? ClasId, int? engId,
            int? ProjId, int? phaseId, int? schId, int? catId, int? status)
        {
            RestClient rest = new RestClient();
            Dictionary<string, string> DicList = new Dictionary<string, string>();
            DicList.Add("ClasId", (ClasId == 0) ? null : ClasId.ToString());
            DicList.Add("engId", (engId == 0) ? null : engId.ToString());
            DicList.Add("ProjId", (ProjId == 0) ? null : ProjId.ToString());
            DicList.Add("phaseId", (phaseId == 0) ? null : phaseId.ToString());
            DicList.Add("schId", (schId == 0) ? null : schId.ToString());
            DicList.Add("status", (status == 2) ? null : status.ToString());
            var _JsonResult = rest.Get<string>("SystemTools", "GetEngMonitorScheduleEquip", DicList);
            var _Result = JsonConvert.DeserializeObject<List<PProc_EngMonitorScheduleEquip_Result>>(_JsonResult);
            return Json(new { result = _Result }, JsonRequestBehavior.AllowGet);
        }
    }
}