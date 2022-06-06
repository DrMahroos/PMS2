using PMS.ServiceConnector.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace PMS.WebUI.Controllers.GeneralReport._03_Variance
{
    public class MaterialCoverageController : Controller
    {
        DbEntities db = new DbEntities();
        // GET: MaterialCoverage
      
        public ActionResult MaterialCoverageIndex()
        {
            return View(Path.RepMaterialCoverage);
        }
        

        public JsonResult getProjectEngByid(int id)
        {
            var result = db.P_TR_EngProject.Where(x => x.ProjectID == id).First();
            return Shared.JsonObject(result);
        }


        public JsonResult GetBranchByID(int id)
        {
            var result = db.G_BRANCH.Where(x => x.BRA_CODE == id).First();
            return Shared.JsonObject(result);
        }


        public JsonResult GetSiteByID(int id)
        {

            var result = db.P_D_SiteEngineer.Where(x => x.SiteEngineerId == id).First();
            return Shared.JsonObject(result);
        }



        public JsonResult GetCustomerClassById(int id)
        {

            var result = db.P_D_SalesCustomerCategory.Where(x => x.CustomerCategoryID == id).First();
            return Shared.JsonObject(result);
        }


        public JsonResult GetCustomerById(int id)
        {

            var result = db.P_D_SalesCustomer.Where(x => x.CustomerID == id).First();

            return Shared.JsonObject(result);
        }


        public JsonResult ScopeCategoryById(int id)
        {

            var result = db.P_D_ScopeCategory.Where(x => x.ScopeCategoryID == id).First();
            return Shared.JsonObject(result);
        }



        public JsonResult GetScope(int id)
        {

            var result = db.P_D_Scope.Where(x => x.ScopeID == id).First();
            return Shared.JsonObject(result);
        }

        public JsonResult getScopeCategory(int id)
        {
            var result = db.P_D_ScopeCategory.Where(x => x.ScopeCategoryID == id).First();
            return Shared.JsonObject(result);
        }


        public JsonResult GetItemByID(int? id)
        {
            var model = db.P_D_SalesItems.Where(x => x.ItemID == id).First();
            return Shared.JsonObject(model);
        }

    }
}