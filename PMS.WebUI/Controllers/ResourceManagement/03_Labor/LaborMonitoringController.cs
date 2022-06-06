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
    public class LaborMonitoringController : Controller
    {
        DbEntities db = new DbEntities();
        int comCode = int.Parse(SessionManager.SessionRecord.CompCode);
        int braCode = int.Parse(SessionManager.SessionRecord.BranchCode);
        // GET: LaborMonitoring
        public ActionResult LaborMonitoringIndex()
        {
            SessionManager.PageIndex = 0;
            SessionManager.ModelCount = db.PQ_GetResLabourAbsence.Where(x => x.CompCode == comCode).Count();
            return View(Path.LaborMonitoring);
        }

        public JsonResult GetByIndex(int? index = default(int?))
        {
            var model = db.PQ_GetResLabourAbsence.Where(x => x.CompCode == comCode && x.BraCode == braCode).ByIndex(SessionManager.PageIndex, "ProjectID");
            return Shared.JsonObject(model);

        }

        public JsonResult GetProjectByID(int id)
        {
            var result = db.P_TR_EngProject.Where(x => x.ProjectID == id).First();
            return Shared.JsonObject(result);
        }
        public JsonResult GetLaborClassByID(int id)
        {
            var result = db.P_D_LaborClass.Where(x => x.LaborClassId == id).First();
            return Shared.JsonObject(result);
        }
        public JsonResult GetProjectPhaseByID(int id)
        {
            var result = db.P_TR_EngProjectPhase.Where(x => x.ProjectPhaseId == id).First();
            return Shared.JsonObject(result);
        }

        public JsonResult getLaborCategoryByID(int id)
        {
            var result = db.P_D_LaborCategory.Where(x => x.LaborCategoryId == id).First();
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
        public JsonResult GetEngMonitorScheduleLabour(int? ClasId,int? engId,
            int? ProjId,int? phaseId,int? schId,int? catId,int? status)
        {
            RestClient rest = new RestClient();
            Dictionary<string, string> DicList = new Dictionary<string, string>();
            DicList.Add("ClasId", (ClasId ==0)? null : ClasId.ToString());
            DicList.Add("engId", (engId == 0) ? null : engId.ToString());
            DicList.Add("ProjId", (ProjId == 0) ? null : ProjId.ToString());
            DicList.Add("phaseId", (phaseId == 0) ? null : phaseId.ToString());
            DicList.Add("schId", (schId == 0) ? null : schId.ToString());
            DicList.Add("catId", (catId == 0) ? null : catId.ToString());
            DicList.Add("status", (status == 2) ? null : status.ToString());
            var _JsonResult = rest.Get<string>("SystemTools", "GetEngMonitorScheduleLabour", DicList);
            var _Result = JsonConvert.DeserializeObject<List<PProc_EngMonitorScheduleLabour_Result>>(_JsonResult);
            return Json(new { result = _Result }, JsonRequestBehavior.AllowGet);   
        }

        public JsonResult GetEngMonitorScheduleLabourClass(int? ClasId, int? engId,
            int? ProjId, int? phaseId, int? schId)
        {
            RestClient rest = new RestClient();
            Dictionary<string, string> DicList = new Dictionary<string, string>();
            DicList.Add("ClasId", (ClasId == 0) ? null : ClasId.ToString());
            DicList.Add("engId", (engId == 0) ? null : engId.ToString());
            DicList.Add("ProjId", (ProjId == 0) ? null : ProjId.ToString());
            DicList.Add("phaseId", (phaseId == 0) ? null : phaseId.ToString());
            DicList.Add("schId", (schId == 0) ? null : schId.ToString());
            var _JsonResult = rest.Get<string>("SystemTools", "GetEngMonitorScheduleLabourClass", DicList);
            var _Result = JsonConvert.DeserializeObject<List<PProc_EngMonitorScheduleLabourClass_Result>>(_JsonResult);
            return Json(new { result = _Result }, JsonRequestBehavior.AllowGet);
        }
    }
}