using PMS.ServiceConnector.Models;
using PMS.ServiceConnector.Tools;
using PMS.WebUI.Tools;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace PMS.WebUI.Controllers
{
    public class ScopeDefinitionController : Controller, IController<P_D_Scope>
    {
        DbEntities db = new DbEntities();
        int comCode = int.Parse(SessionManager.SessionRecord.CompCode);

        public JsonResult Add()
        {
            throw new NotImplementedException();
        }

        public JsonResult Delete(P_D_Scope entity)
        {
            int count = db.P_Tr_SalesOfferStage.Where(x => x.ScopeID == entity.ScopeID).Count();
            if (count > 0)
            {
                ResponseResult res = new ResponseResult();
                res.ResponseState = false;
                res.ResponseMessage = "Can't Delete This scope because releted with another data";
                return Json(new { result = res }, JsonRequestBehavior.AllowGet);
            }
            var result = db.P_D_Scope.DeleteEntity(entity);
            if (result.ResponseState == true)
            {
                SessionManager.ModelCount = 0; //db.K_D_ExpCateg.Where(x => x.CompCode == comCode).Count();
                SessionManager.PageIndex = 0;
            }
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
            var model = db.P_D_ScopeCategory.Where(x => x.CompCode == comCode).ByIndex(SessionManager.PageIndex);
            return Shared.JsonObject(model);
        }

        public JsonResult GetModelCount()
        {
            throw new NotImplementedException();
        }

        public JsonResult Insert(P_D_Scope entity)
        {
            var result = db.P_D_Scope.InsertEntity(entity);
            if (result.ResponseState == true)
            {
                SessionManager.ModelCount = db.P_D_ScopeCategory.Count();
                SessionManager.PageIndex = 0;
            }
            return Shared.JsonObject(result);
        }

        public JsonResult InsertAll(P_D_Scope master, string json)
        {
            throw new NotImplementedException();
        }

        public JsonResult OnSearchSelect(string id)
        {
            throw new NotImplementedException();
        }

        // GET: ScopeDefinition
        public ActionResult ScopeDefinitionIndex()
        {
            if (SessionManager.Me == null)
                return RedirectToAction("LoginIndex", "login");
            SessionManager.PageIndex = 0;
            SessionManager.ModelCount = db.P_D_ScopeCategory.Where(x => x.CompCode == comCode).Count();
            return View(Path.ScopeDefinition);
        }

        public JsonResult Undo()
        {
            throw new NotImplementedException();
        }

        public JsonResult Update(P_D_Scope entity)
        {
            //int count = db.P_Tr_SalesOfferStage.Where(x => x.ScopeID == entity.ScopeID).Count();
            //if (count > 0)
            //{
            //    ResponseResult res = new ResponseResult();
            //    res.ResponseState = false;
            //    res.ResponseMessage = "Can't Delete This scope because releted with another data";
            //    return Json(new { result = res }, JsonRequestBehavior.AllowGet);
            //}
            var result = db.P_D_Scope.UpdateEntity(entity);
            //result.ResponseState == true
            
            return Shared.JsonObject(result);
        }

        public JsonResult GetById(int id)
        {
            var result = db.P_D_Scope.Where(x => x.ScopeID == id).First();
            return Shared.JsonObject(result);
        }

        // Load P_D_ScopeCategory
        public JsonResult getScopeCategory(int id)
        {
            var result = db.P_D_ScopeCategory.Where(x => x.ScopeCategoryID == id).First();
            return Shared.JsonObject(result);
        }

        // Load P_D_ScopeCategory
        public JsonResult getScopeCategory_ByCatID(int catID)
        {
            var result = db.P_D_Scope.Where(x => x.CompCode == comCode & x.ScopeCategoryID == catID).Result();
            return Shared.JsonObject(result);
        }
    }
}