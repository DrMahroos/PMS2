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
    public class UnProductionreasonsController : Controller, IController<P_D_UnProdReason>
    {
        DbEntities db = new DbEntities();
        int comCode = int.Parse(SessionManager.SessionRecord.CompCode);

        public JsonResult Add()
        {
            throw new NotImplementedException();
        }

        public JsonResult Delete(P_D_UnProdReason entity)
        {
            var result = db.P_D_UnProdReason.DeleteEntity(entity);
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
            var model = db.P_D_UnProdCategory.Where(x => x.CompCode == comCode).ByIndex(SessionManager.PageIndex);
            return Shared.JsonObject(model);
        }

        public JsonResult GetModelCount()
        {
            throw new NotImplementedException();
        }

        public JsonResult Insert(P_D_UnProdReason entity)
        {
            var result = db.P_D_UnProdReason.InsertEntity(entity);
            if (result.ResponseState == true)
            {
                SessionManager.ModelCount = db.P_D_UnProdCategory.Count();
                SessionManager.PageIndex = 0;
            }
            return Shared.JsonObject(result);
        }

        public JsonResult InsertAll(P_D_UnProdReason master, string json)
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

        // GET: UnProductionreasons
        public ActionResult UnProductionreasonsIndex()
        {
            if (SessionManager.Me == null)
                return RedirectToAction("LoginIndex", "login");
            SessionManager.PageIndex = 0;
            SessionManager.ModelCount = db.P_D_UnProdCategory.Where(x => x.CompCode == comCode).Count();
            return View(Path.UnProductionreasons);
        }

        public JsonResult Update(P_D_UnProdReason entity)
        {
            var result = db.P_D_UnProdReason.UpdateEntity(entity);
            if (result.ResponseState == true)
            {
                //SessionManager.ModelCount = db.B_D_Employee.Count();
                //SessionManager.PageIndex = 0;
            }
            return Shared.JsonObject(result);
        }

        // Load P_D_UnProdReason
        public JsonResult getProdReason(int id)
        {
            var result = db.P_D_UnProdCategory.Where(x => x.UnProdCategoryID == id).First();
            return Shared.JsonObject(result);
        }

        // Load P_D_UnProdReason
        public JsonResult getProdReason_ByCatID(int catID)
        {
            var result = db.P_D_UnProdReason.Where(x => x.CompCode == comCode & x.UnProdCategoryID == catID).Result();
            return Shared.JsonObject(result);
        }
    }
}