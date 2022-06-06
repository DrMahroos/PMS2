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
    public class LaborRequestController : Controller, IController<P_Tr_ResRequestLabour>
    {
        DbEntities db = new DbEntities();
        int comCode = int.Parse(SessionManager.SessionRecord.CompCode);
        int braCode = int.Parse(SessionManager.SessionRecord.BranchCode);
        // GET: LaborRequest
        public ActionResult LaborRequestIndex()
        {
            SessionManager.PageIndex = 0;
            SessionManager.ModelCount = db.P_Tr_ResRequestLabour.Where(x => x.CompCode == comCode && x.BraCode == braCode).Count();
            return View(Path.LaborRequest);
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
        public JsonResult GetSiteEngineerByID(int id)
        {
            var result = db.P_D_SiteEngineer.Where(x => x.SiteEngineerId == id).First();
            return Shared.JsonObject(result);
        }
        public JsonResult GetEngScheduleByID(int id)
        {
            var result = db.PQ_SrcSchdule.Where(x => x.ScheduleId == id).First();
            return Shared.JsonObject(result);
        }

        public JsonResult GetByIndex(int? index = null)
        {
            var model = db.PQ_GetResRequestLabours.Where(x => x.CompCode == comCode && x.BraCode == braCode).ByIndex(SessionManager.PageIndex, "RequestLabourId");
            return Shared.JsonObject(model);
        }

        public JsonResult LoadDetails(int id)
        {
            var result = db.PQ_GetEngWorkSchduleLaborClass.Where(x => x.ScheduleId == id).Result();
            return Shared.JsonObject(result);
        }
        public JsonResult GetLaborRequest(int id)
        {
            var result = db.PQ_GetResRequestLabours.Where(x => x.RequestLabourId == id).First();
            return Shared.JsonObject(result);
        }

        public JsonResult GetModelCount()
        {
            throw new NotImplementedException();
        }

        public JsonResult Insert(P_Tr_ResRequestLabour entity)
        {
            var result = db.P_Tr_ResRequestLabour.InsertEntity(entity);
            if (result.ResponseState == true)
            {
                SessionManager.ModelCount = db.P_Tr_ResRequestLabour.Count();
                SessionManager.PageIndex = 0;
            }
            return Shared.JsonObject(result);
        }

        public JsonResult Update(P_Tr_ResRequestLabour entity)
        {
            var result = db.P_Tr_ResRequestLabour.UpdateEntity(entity);
            if (result.ResponseState == true)
            {
                SessionManager.ModelCount = db.P_Tr_ResRequestLabour.Count();
                SessionManager.PageIndex = 0;
            }
            return Shared.JsonObject(result);
        }

        public JsonResult Delete(P_Tr_ResRequestLabour entity)
        {
            throw new NotImplementedException();
        }

        public JsonResult Add()
        {
            throw new NotImplementedException();
        }

        public void Edit()
        {
            throw new NotImplementedException();
        }

        public JsonResult Undo()
        {
            throw new NotImplementedException();
        }

        public JsonResult Find()
        {
            throw new NotImplementedException();
        }

        public JsonResult OnSearchSelect(string id)
        {
            throw new NotImplementedException();
        }

        public JsonResult InsertAll(P_Tr_ResRequestLabour master, string json)
        {
            throw new NotImplementedException();
        }

        public JsonResult DeleteAll(string json)
        {
            throw new NotImplementedException();
        }
    }
}