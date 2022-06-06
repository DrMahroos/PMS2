using PMS.ServiceConnector.Models;
using PMS.ServiceConnector.Tools;
using PMS.WebUI.Filter;
using PMS.WebUI.Tools;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace PMS.WebUI.Controllers
{
    [AuthorizeUserAttribute()]
    public class LaborDefinitionController : Controller, IController<P_D_Labor>
    {
        DbEntities db = new DbEntities();
        int comCode = int.Parse(SessionManager.SessionRecord.CompCode);

        public JsonResult Add()
        {
            throw new NotImplementedException();
        }

        public JsonResult Delete(P_D_Labor entity)
        {
            var result = db.P_D_Labor.DeleteEntity(entity);
            return Shared.JsonObject(result);
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

        public JsonResult GetByIndex(int? index = null)
        {
            var model = db.P_D_Labor.Where(x => x.CompCode == comCode).ByIndex(SessionManager.PageIndex);
            return Shared.JsonObject(model);
        }

        public JsonResult GetModelCount()
        {
            throw new NotImplementedException();
        }

        public JsonResult Insert(P_D_Labor entity)
        {
            var result = db.P_D_Labor.InsertEntity(entity);
            if (result.ResponseState == true)
            {
                SessionManager.ModelCount = db.P_D_Labor.Count();
                SessionManager.PageIndex = 0;
            }
            return Shared.JsonObject(result);
        }

        public JsonResult InsertAll(P_D_Labor master, string json)
        {
            throw new NotImplementedException();
        }

        // GET: LaborDefinition
        public ActionResult LaborDefinitionIndex()
        {
            if (SessionManager.Me == null)
                return RedirectToAction("LoginIndex", "login");
            SessionManager.PageIndex = 0;
            SessionManager.ModelCount = db.P_D_Labor.Where(x => x.CompCode == comCode).Count(); ;
            return View(Path.LaborDefinition);
        }

        public JsonResult OnSearchSelect(string id)
        {
            throw new NotImplementedException();
        }

        public JsonResult Undo()
        {
            throw new NotImplementedException();
        }

        public JsonResult Update(P_D_Labor entity)
        {
            var result = db.P_D_Labor.UpdateEntity(entity);
            if (result.ResponseState == true)
            {
                SessionManager.ModelCount = db.P_D_Labor.Count();
                SessionManager.PageIndex = 0;
            }
            return Shared.JsonObject(result);
        }

        // Get Labor Code
        public JsonResult getLaborCode(int id)
        {
            var result = db.P_D_Labor.Where(x => x.LaborID == id).First();
            return Shared.JsonObject(result);
        }

        // Get Labor Category
        public JsonResult getLaborCategory(int id)
        {
            var result = db.P_D_LaborCategory.Where(x=> x.LaborCategoryId == id).First();
            return Shared.JsonObject(result);
        }

        // Get Labor Class
        public JsonResult getLaborClass(int id)
        {
            var result = db.P_D_LaborClass.Where(x => x.LaborClassId == id).First();
            return Shared.JsonObject(result);
        }

        // Get Nationalty
        public JsonResult getNationalty(int id)
        {
            var result = db.G_Nationality.Where(x => x.NationalityID == id).First();
            return Shared.JsonObject(result);
        }
        
        // Get Area
        public JsonResult getArea(int id)
        {
            var result = db.G_BRANCH.Where(x => x.BRA_CODE == id).First();
            return Shared.JsonObject(result);
        }

        public JsonResult GetProjectAndPhase(int ProjectId)
        {
            var result = db.PQ_GetEngProjectPhase.Where(x => x.ProjectID == ProjectId).First();
            return Shared.JsonObject(result);
        }
    }
}