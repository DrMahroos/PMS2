using PMS.ServiceConnector.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace PMS.WebUI.Controllers.Engineer._05_Reports
{
    public class UnprodHourController : Controller
    {
        DbEntities db = new DbEntities();
        public ActionResult UnprodHourIndex()
        {
            return View(Path.UnprodHour);
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

        public JsonResult GetSrchCustomerCat(int id)
        {

            var result = db.P_D_SalesCustomerCategory.Where(x => x.CustomerCategoryID == id).First();
            return Shared.JsonObject(result);
        }
        public JsonResult GetLaborClass(int id)
        {

            var result = db.P_D_LaborClass.Where(x => x.LaborClassId == id).First();
            return Shared.JsonObject(result);

        }
        public JsonResult GetCustomer(int id)
        {

            var result = db.P_D_SalesCustomer.Where(x => x.CustomerID == id).First();
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

        public JsonResult GetUnProdCategory(int id)
        {

            var result = db.P_D_UnProdCategory.Where(x => x.UnProdCategoryID == id).First();
            return Shared.JsonObject(result);
        }

        public JsonResult GetUnProdReason(int id)
        {

            var result = db.P_D_UnProdReason.Where(x => x.UnProdReasonId == id).First();
            return Shared.JsonObject(result);
        }

    }
}