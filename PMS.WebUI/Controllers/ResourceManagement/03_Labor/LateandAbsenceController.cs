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
    public class LateandAbsenceController : Controller
    {
        DbEntities db = new DbEntities();
        int comCode = int.Parse(SessionManager.SessionRecord.CompCode);
        int braCode = int.Parse(SessionManager.SessionRecord.BranchCode);
        // GET: LateandAbsence
        public ActionResult LateandAbsenceIndex()
        {
            SessionManager.PageIndex = 0;
            SessionManager.ModelCount = db.P_TR_ResAbsence.Where(x => x.CompCode == comCode && x.BraCode == braCode).Count();
            return View(Path.LateandAbsence);
        }
        public JsonResult GetResLabourAbsenceByID(int id)
        {
            var result = db.PQ_GetResLabourAbsence.Where(x => x.AbsenceID == id).First();
            return Shared.JsonObject(result);
        }
        public JsonResult GetByIndex(int? index = default(int?))
        {
            var model = db.PQ_GetResLabourAbsence.Where(x => x.CompCode == comCode && x.BraCode == braCode).ByIndex(SessionManager.PageIndex, "AbsenceID");
            return Shared.JsonObject(model);
        }
        public JsonResult GetProjectByID(int id)
        {
            var result = db.P_TR_EngProject.Where(x => x.ProjectID == id).First();
            return Shared.JsonObject(result);
        }
        public JsonResult GetSiteEngineerByID(int id)
        {
            var result = db.P_D_SiteEngineer.Where(x => x.SiteEngineerId == id).First();
            return Shared.JsonObject(result);
        }
        public JsonResult GetLabourAbsenceByID(int id)
        {
            var result = db.PQ_GetResLabourAbsence.Where(x => x.AbsenceID == id).First();
            return Shared.JsonObject(result);
        }
        public JsonResult GetLabourAbsenceDetailsList(int id)
        {
            var res = db.PQ_GetResLabourAbsenceDetail.Where(x => x.AbsenceID == id).Result();
            return Shared.JsonObject(res);
        }

        public JsonResult GetAbsenceTypeByID(int id)
        {
            var result = db.P_D_LaborAbsenceType.Where(x => x.LaborAbsenceTypeID == id).First();
            return Shared.JsonObject(result);
        }
        public JsonResult GetLaborAbsenceByID(int id)
        {
            var result = db.PQ_GetEngWorkSchduleLabor.Where(x => x.LaborID == id).First();
            return Shared.JsonObject(result);
        }

        public JsonResult Insert(string JsonData)
        {
            M_D_LabourAbsenceDetails obj = JsonConvert.DeserializeObject<M_D_LabourAbsenceDetails>(JsonData);
            var result = db.P_TR_ResAbsence.InsertMasterDetails(obj.P_TR_ResAbsence, obj.P_TR_ResAbsenceLabour);
            if (result.ResponseState == true)
            {
                SessionManager.ModelCount = db.P_TR_ResAbsence.Where(x => x.CompCode == comCode && x.BraCode == braCode).Count();
            }
            return Shared.JsonObject(result);
        }

        public JsonResult Update(string JsonData)
        {
            M_D_LabourAbsenceDetails obj = JsonConvert.DeserializeObject<M_D_LabourAbsenceDetails>(JsonData);
            var result = db.P_TR_ResAbsence.UpdateMasterDetails(obj.P_TR_ResAbsence, obj.P_TR_ResAbsenceLabour);
            if (result.ResponseState == true)
            {
                SessionManager.ModelCount = db.P_TR_ResAbsence.Where(x => x.CompCode == comCode && x.BraCode == braCode).Count();
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