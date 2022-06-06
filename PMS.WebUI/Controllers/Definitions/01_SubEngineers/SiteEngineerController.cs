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
    public class SiteEngineerController : Controller, IController<P_D_SiteEngineer>
    {
        DbEntities db = new DbEntities();
        int comCode = int.Parse(SessionManager.SessionRecord.CompCode);
       // int comCode = int.Parse(SessionManager.SessionRecord.CompCode);
        int BraCode = int.Parse(SessionManager.SessionRecord.BranchCode);
        //public JsonResult Load()
        //{
        //    var result = db.P_D_SiteEngineer.Where(x => x.CompCode == comCode).Result();
        //    return Shared.JsonObject(result);
        //}
        public JsonResult Load()
        {
            var model = db.P_D_SiteEngineer

                .Result();
            return Shared.JsonObject(model);
        }
        public JsonResult GetByID(int id)
        {
            var model = db.P_D_SiteEngineer
                .Where(f => f.SiteEngineerId == id)
                .First();
            return Shared.JsonObject(model);
        }
        public JsonResult Add()
        {
            throw new NotImplementedException();
        }
        public JsonResult Insert(P_D_SiteEngineer entity)
        {
            var result = db.P_D_SiteEngineer.InsertEntity(entity);
            if (result.ResponseState == true)
            {
                SessionManager.ModelCount = db.P_D_SiteEngineer.Count();
                SessionManager.PageIndex = 0;
            }
            return Shared.JsonObject(result);
        }

        public JsonResult Update(P_D_SiteEngineer entity)
        {
            var result = db.P_D_SiteEngineer.UpdateEntity(entity);
            if (result.ResponseState == true)
            {
                SessionManager.ModelCount = db.P_D_SiteEngineer.Count();
                SessionManager.PageIndex = 0;
            }
            return Shared.JsonObject(result);
        }

        public JsonResult Delete(P_D_SiteEngineer entity)
        {
            var result = db.P_D_SiteEngineer.DeleteEntity(entity);
            if (result.ResponseState == true)
            {
                SessionManager.ModelCount = db.P_D_SiteEngineer.Count();
                SessionManager.PageIndex = 0;
            }
            return Shared.JsonObject(result);
        }
        public JsonResult GetSiteEngById(int Id)
        {
            var result = db.P_D_SiteEngineer.Where(f => f.SiteEngineerId == Id)
                .Result();
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
            var model = db.P_D_SiteEngineer.Where(x => x.CompCode == comCode).ByIndex(SessionManager.PageIndex);
            return Shared.JsonObject(model);
        }

        public JsonResult GetModelCount()
        {
            throw new NotImplementedException();
        }



        public JsonResult InsertAll(P_D_SiteEngineer master, string json)
        {
            throw new NotImplementedException();
        }

        public JsonResult OnSearchSelect(string id)
        {
            throw new NotImplementedException();
        }

        // GET: SiteEngCategory
        public ActionResult SiteEngineerIndex()
        {
            if (SessionManager.Me == null)
                return RedirectToAction("LoginIndex", "login");
            SessionManager.PageIndex = 0;
            SessionManager.ModelCount = db.P_D_SiteEngineer.Where(x => x.CompCode == comCode).Count(); ;
            return View(Path.SiteEngineer);

        }

        public JsonResult Undo()
        {
            throw new NotImplementedException();
        }
        // Get Eng Code
        public JsonResult getEngCode(int id)
        {
            var result = db.P_D_SiteEngineer.Where(x => x.SiteEngineerId == id).First();
            return Shared.JsonObject(result);
        }
        public JsonResult getCategoryCode(int id)
        {
            var result = db.P_D_SiteEngCategory.Where(x => x.SiteEngCategoryId == id).First();
            return Shared.JsonObject(result);
        }

        public JsonResult getEngCategory(int id)
        {
            var result = db.P_D_SiteEngCategory.Where(x => x.SiteEngCategoryId == id).First();
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
        public JsonResult getSiteEngineer()
        {
            var result = db.P_D_SiteEngineer.Result();
            return Shared.JsonObject(result);
        }
    }
}
//        public ActionResult SiteEngineerIndex()
//        {
//            return View("~/Views/Definitions/01_SubEngineers/SiteEngineer/SiteEngineerIndex.cshtml");
//        }
//    }
//}