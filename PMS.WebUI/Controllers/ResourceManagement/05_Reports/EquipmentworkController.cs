using PMS.ServiceConnector.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace PMS.WebUI.Controllers.Engineer._05_Reports
{
    public class EquipmentworkController : Controller
    {
        DbEntities db = new DbEntities();
        public ActionResult EquipmentworkIndex()
        {
            return View();
        }

        public JsonResult GetEquipmentClass(int id)
        {
            var result = db.P_D_EquipmentClass.Where(x => x.EquipClassId == id).First();
            return Shared.JsonObject(result);
        }

        public JsonResult GetSearchScopCat(int id)
        {

            var result = db.P_D_ScopeCategory.Where(x => x.ScopeCategoryID == id).First();
            return Shared.JsonObject(result);
        }
        public JsonResult GetSrchProjectEng(int id)
        {

            var result = db.P_D_SiteEngineer.Where(x => x.SiteEngineerId == id).First();
            return Shared.JsonObject(result);
        }
      
        public JsonResult GetFromLabor(int id)
        {

            var result = db.P_D_Labor.Where(x => x.LaborID == id).First();
            return Shared.JsonObject(result);
        }
        public JsonResult GetScopeClass(int id)
        {

            var result = db.P_D_Scope.Where(x => x.ScopeID == id).First();
            return Shared.JsonObject(result);
        }
        public JsonResult GetScope(int id)
        {

            var result = db.P_D_Scope.Where(x => x.ScopeID == id).First();
            return Shared.JsonObject(result);
        }
        public JsonResult GetArea(int id)
        {
            var result = db.G_BRANCH.Where(x => x.BRA_CODE == id).First();
            return Shared.JsonObject(result);
        }


    }
}