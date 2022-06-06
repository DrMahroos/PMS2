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
    public class SalesEngineerController : Controller, IController<P_D_SalesEgineer>
    {
        DbEntities db = new DbEntities();
        int comCode = int.Parse(SessionManager.SessionRecord.CompCode);
        // int comCode = int.Parse(SessionManager.SessionRecord.CompCode);
        int BraCode = int.Parse(SessionManager.SessionRecord.BranchCode);
        public JsonResult Load()
        {
            var model = db.P_D_SalesEgineer

                .Result();
            return Shared.JsonObject(model);
        }
        public JsonResult GetByID(int id)
        {
            var model = db.P_D_SalesEgineer
                .Where(f => f.SalesEngineerId == id)
                .First();
            return Shared.JsonObject(model);
        }
        public JsonResult Insert(P_D_SalesEgineer entity)
        {
            var result = db.P_D_SalesEgineer.InsertEntity(entity);
            if (result.ResponseState == true)
            {
                SessionManager.ModelCount = db.P_D_SalesEgineer.Count();
                SessionManager.PageIndex = 0;
            }
            return Shared.JsonObject(result);
        }

        public JsonResult Update(P_D_SalesEgineer entity)
        {
            var result = db.P_D_SalesEgineer.UpdateEntity(entity);
            if (result.ResponseState == true)
            {
                SessionManager.ModelCount = db.P_D_SalesEgineer.Count();
                SessionManager.PageIndex = 0;
            }
            return Shared.JsonObject(result);
        }

        public JsonResult Delete(P_D_SalesEgineer entity)
        {
            var result = db.P_D_SalesEgineer.DeleteEntity(entity);
            if (result.ResponseState == true)
            {
                SessionManager.ModelCount = db.P_D_SalesEgineer.Count();
                SessionManager.PageIndex = 0;
            }
            return Shared.JsonObject(result);
        }
        public JsonResult GetSalesEngById(int Id)
        {
            var result = db.P_D_SalesEgineer.Where(f => f.SalesEngineerId == Id)
                .Result();
            return Shared.JsonObject(result);
        }
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

        public JsonResult GetByIndex(int? index = null)
        {
            var model = db.P_D_SalesEgineer.Where(x => x.CompCode == 1).ByIndex(SessionManager.PageIndex);
            return Shared.JsonObject(model);
        }

        public JsonResult GetModelCount()
        {
            throw new NotImplementedException();
        }

      

        public JsonResult InsertAll(P_D_SalesEgineer master, string json)
        {
            throw new NotImplementedException();
        }

        public JsonResult OnSearchSelect(string id)
        {
            throw new NotImplementedException();
        }

        // GET: SalesEngineer
        public ActionResult SalesEngineerIndex()
        {
            if (SessionManager.Me == null)
                return RedirectToAction("LoginIndex", "login");
            SessionManager.PageIndex = 0;
            SessionManager.ModelCount = db.P_D_SalesEgineer.Where(x => x.CompCode == comCode).Count();
            return View(Path.SalesEngineer);
        }
        public JsonResult getEngCode(int id)
        {
            var result = db.P_D_SalesEgineer.Where(x => x.SalesEngineerId == id).First();
            return Shared.JsonObject(result);
        }
        public JsonResult getCategoryCode(int id)
        {
            var result = db.P_D_SalesEngCateory.Where(x => x.SalesEngCategoryId == id).First();
            return Shared.JsonObject(result);
        }
        public JsonResult getNationalty(int id)
        {
            var result = db.G_Nationality.Where(x => x.NationalityID == id).First();
            return Shared.JsonObject(result);
        }
        public JsonResult getArea(int id)
        {
            var result = db.G_BRANCH.Where(x => x.BRA_CODE == id).First();
            return Shared.JsonObject(result);
        }
        public JsonResult getSalesEngineer()
        {
            var result = db.P_D_SalesEgineer.Result();
            return Shared.JsonObject(result);
        }
        public JsonResult Undo()
        {
            throw new NotImplementedException();
        }

       
    }
}