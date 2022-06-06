using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using PMS.ServiceConnector.Models;
using PMS.ServiceConnector.Tools;
using PMS.WebUI.Filter;
using PMS.WebUI.Models.CustomModels;
using PMS.WebUI.Tools;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Web;
using System.Web.Mvc;

namespace PMS.WebUI.Controllers.Engineer
{
    [AuthorizeUserAttribute()]
    public class ProjectDefinationController : Controller, IMasterManyDetails<P_TR_EngProject>
    {
        // GET: ProjectDefination
        DbEntities db = new DbEntities();
        int comCode = int.Parse(SessionManager.SessionRecord.CompCode);
        int BraCode = int.Parse(SessionManager.SessionRecord.BranchCode);
        public ActionResult ProjectDefinationIndex()
        {
            SessionManager.PageIndex = 0;
            SessionManager.ModelCount = db.PQ_GetEngProject.Where(x => x.CompCode == comCode && x.BraCode == BraCode).Count();
            return View(Path.ProjectDefination);
        }
        public JsonResult GetByIndex(int? index = default(int?))
        {
            var model = db.PQ_GetEngProject.Where(x => x.CompCode == comCode && x.BraCode == BraCode).ByIndex(SessionManager.PageIndex, "ProjectID");
            return Shared.JsonObject(model);

        }
        public JsonResult Insert(string JsonData)
        {
            M_D_ProjectDefDetails obj = JsonConvert.DeserializeObject<M_D_ProjectDefDetails>(JsonData);
            //Set Company Code and branch code
            obj.P_TR_EngProject.CompCode = comCode;
            obj.P_TR_EngProject.BraCode = BraCode;
            //end Set Company Code and branch code
            var result = db.P_TR_EngProject.InsertMasterManyDetails(obj.P_TR_EngProject, obj);
            if (result.ResponseState == true)
            {
                SessionManager.ModelCount = db.P_TR_EngProject.Where(x => x.CompCode == comCode && x.BraCode == BraCode).Count();
            }
            return Shared.JsonObject(result);
        }
        public JsonResult Update(string JsonData)
        {
            M_D_ProjectDefDetails obj = JsonConvert.DeserializeObject<M_D_ProjectDefDetails>(JsonData);
            //Set Company Code and branch code
            obj.P_TR_EngProject.CompCode = comCode;
            obj.P_TR_EngProject.BraCode = BraCode;
            obj.P_TR_EngProject.UpdatedBy = SessionManager.SessionRecord.UserCode;
            obj.P_TR_EngProject.UpdatedAt = DateTime.Now;
            //end Set Company Code and branch code
            var result = db.P_TR_EngProject.UpdateMasterDetails(obj.P_TR_EngProject, obj.P_TR_EngProjectPhase);
            if (result.ResponseState == true)
            {
                SessionManager.ModelCount = db.PQ_GetEngProject.Where(x => x.CompCode == comCode && x.BraCode == BraCode).Count();
            }
            return Shared.JsonObject(result);
        }
        public JsonResult Delete(P_TR_EngProject entity)
        {
            throw new NotImplementedException();
        }
        public JsonResult LoadDetails(int id)
        {
            M_D_ProjectDefDetailsView _View = new M_D_ProjectDefDetailsView();
            _View.PQ_GetEngProjectPhase = db.PQ_GetEngProjectPhase.Where(x => x.ProjectID == id).OrderBy(x=>x.ProjectPhaseCode).Result().ToList();
            _View.PQ_GetEngProjectItem = db.PQ_GetEngProjectItem.Where(i => i.ProjectID == id).Result().ToList();
            return Json(_View, JsonRequestBehavior.AllowGet);
        }

        public JsonResult LoadPhases(int id)
        {
            M_D_ProjectDefDetailsView _View = new M_D_ProjectDefDetailsView();
            _View.PQ_GetEngProjectPhase = db.PQ_GetEngProjectPhase.Where(x => x.ProjectID == id).OrderBy(x=>x.ProjectPhaseCode).Result().ToList();
            return Json(_View, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetByID(int? id)
        {
            var model = db.PQ_GetEngProject.Where(f => f.ProjectID == id).First();
            return Shared.JsonObject(model);
        }
        public JsonResult Print(int id)
        {
            Reports rep = new Reports();
            rep.AddParameter("IssueToCcReturnID", id);
            string result = rep.GetReportUrl("IssueToCcReturn_Order");
            return Shared.JsonObject(result);
        }
        //custom
        public JsonResult GetSiteEngineer()
        {
            var _Result = db.P_D_SiteEngineer.Where(eng => eng.CompCode == comCode && eng.BraCode == BraCode && eng.IsActive == true).Result();
            return Json(new { result = _Result }, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetScop()
        {
            var _Result = db.P_D_Scope.Result();
            return Json(new { result = _Result }, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetCalender()
        {
            var _Result = db.P_D_Calender.Where(c => c.CompCode == comCode).Result();
            return Json(new { result = _Result }, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetIPhaseItem(int ProjectID, int ProjectPhaseId)
        {
            var _Result = db.PQ_GetEngProjectItem.Where(p => p.ProjectID == ProjectID && p.ProjectPhaseId == ProjectPhaseId).Result();
            return Json(new { result = _Result }, JsonRequestBehavior.AllowGet);
        }

        public JsonResult InsertPhase(P_TR_EngProjectPhase entity)
        {
            var result = db.P_TR_EngProjectPhase.InsertEntity(entity);
            return Shared.JsonObject(result);
        }
        public JsonResult UpdatePhase(P_TR_EngProjectPhase entity)
        {
            var result = db.P_TR_EngProjectPhase.UpdateEntity(entity);
            return Shared.JsonObject(result);
        }
        public JsonResult DeletePhase(P_TR_EngProjectPhase entity)
        {
            int _CountItems = db.P_TR_EngProjectItem.Where(e => e.ProjectPhaseId == entity.ProjectPhaseId).Count();
            if (/*entity.Status == 0 && */_CountItems < 1)
            {
                var result = db.P_TR_EngProjectPhase.DeleteEntity(entity);
                return Shared.JsonObject(result);
            }
            return Shared.JsonObject(false);
        }

        #region Not Used
        public JsonResult Add()
        {
            throw new NotImplementedException();
        }
        public JsonResult DeleteAll(string json)
        {
            throw new NotImplementedException();
        }
        public void Edit()
        {
            throw new NotImplementedException();
        }
        public JsonResult Find()
        {
            throw new NotImplementedException();
        }
        public JsonResult GetModelCount()
        {
            throw new NotImplementedException();
        }
        public JsonResult InsertAll(P_TR_EngProject master, string json)
        {
            throw new NotImplementedException();
        }
        public JsonResult OnSearchSelect(string id)
        {
            throw new NotImplementedException();
        }
        public JsonResult Undo()
        {
            throw new NotImplementedException();
        }
        #endregion       


    }
}