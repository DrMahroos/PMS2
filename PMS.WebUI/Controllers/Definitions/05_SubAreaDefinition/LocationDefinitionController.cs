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
    public class LocationDefinitionController : Controller, IController<P_D_Location>
    {
        DbEntities db = new DbEntities();
        int comCode = int.Parse(SessionManager.SessionRecord.CompCode);
        int BraCode = int.Parse(SessionManager.SessionRecord.BranchCode);
        
        public JsonResult Load()
        {
            var model = db.P_D_Location

                .Result();
            return Shared.JsonObject(model);
        }
        public JsonResult GetByID(int id)
        {
            var model = db.P_D_Location
                .Where(f => f.LocationId == id)
                .First();
            return Shared.JsonObject(model);
        }
        public JsonResult Insert(P_D_Location entity)
        {
            var result = db.P_D_Location.InsertEntity(entity);
            if (result.ResponseState == true)
            {
                SessionManager.ModelCount = db.P_D_Location.Count();
                SessionManager.PageIndex = 0;
            }
            return Shared.JsonObject(result);
        }
        public JsonResult Update(P_D_Location entity)
        {
            var entity1 = db.P_D_Location.Where(e => e.LocationId == entity.LocationId).First();
            var x = db.P_D_Location.Where(i => i.ParentLocationId == entity1.ParentLocationId).Count();
            var parent = db.P_D_Location.Where(f => f.LocationId == entity1.ParentLocationId).First();

            if (x == 1)
            {
                parent.IsDetail = true;
                
            }
            else if (x == 0)
            {
                parent.IsDetail = true;
            }
            else
            {
                parent.IsDetail = false;
            }
            
            var result1 = db.P_D_Location.UpdateEntity(parent);
            var parent2 = db.P_D_Location.Where(f => f.LocationId == entity.ParentLocationId).First();
            parent2.IsDetail = false;

            db.P_D_Location.UpdateEntity(parent2);
            var p = db.P_D_Location.Where(f => f.ParentLocationId == entity.LocationId).Count();
            if (p >= 1)
            {
                entity.IsDetail = false;
            }
            else
            {
                entity.IsDetail = true;

            }
            var result = db.P_D_Location.UpdateEntity(entity);

            if (result.ResponseState == true)
            {
                SessionManager.ModelCount = db.P_D_Location.Count();
                SessionManager.PageIndex = 0;
            }
            return Shared.JsonObject(result);
        }
        public JsonResult Delete(P_D_Location entity)
        {
            var result = db.P_D_Location.DeleteEntity(entity);
            if (result.ResponseState == true)
            {
                SessionManager.ModelCount = db.P_D_Location.Count();
                SessionManager.PageIndex = 0;
            }
            return Shared.JsonObject(result);
        }
        public JsonResult GetSalesEngById(int Id)
        {
            var result = db.P_D_Location.Where(f => f.LocationId == Id)
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
            var model = db.P_D_Location.Where(x => x.CompCode == comCode && x.BraCode == BraCode).ByIndex(SessionManager.PageIndex);
            return Shared.JsonObject(model);
        }
        public JsonResult GetModelCount()
        {
            throw new NotImplementedException();
        }
        public JsonResult InsertAll(P_D_Location master, string json)
        {
            throw new NotImplementedException();
        }
        public JsonResult OnSearchSelect(string id)
        {
            throw new NotImplementedException();
        }
        public ActionResult LocationDefinitionIndex()
        {
            if (SessionManager.Me == null)
                return RedirectToAction("LoginIndex", "login");
            SessionManager.PageIndex = 0;
            SessionManager.ModelCount = db.P_D_Location.Where(x => x.CompCode == comCode && x.BraCode == BraCode).Count();
            return View(Path.LocationDefinition);
        }
        public JsonResult getEngCode(int id)
        {
            var result = db.P_D_SalesEgineer.Where(x => x.SalesEngineerId == id).First();
            return Shared.JsonObject(result);
        }
        public JsonResult GetLoctionById(int id)
        {
            var result = db.P_D_Location.Where(x => x.LocationId == id &&  x.BraCode == int.Parse(SessionManager.SessionRecord.BranchCode)).First();
            return Shared.JsonObject(result);
        }
        public JsonResult GetLocationByCode(int Code)
        {
            var result = db.P_D_Location.Where(x => x.LocationId == Code).First();
            return Shared.JsonObject(result);
        }
        public JsonResult Undo()
        {
            throw new NotImplementedException();
        }

        public JsonResult Getrepet(string code)
        {
            var model = db.P_D_Location.Where(x=>x.CompCode==comCode&&x.LocCode==code)

                .Result().FirstOrDefault();


            if (model == null)
                return null;

            else
            return Shared.JsonObject(model.LocCode);
        }

    }
}