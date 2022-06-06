using PMS.ServiceConnector.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace PMS.WebUI.Controllers.Engineer._05_Reports
{
    public class MaterialUsageprojectController : Controller
    {

        DbEntities db = new DbEntities();
        // GET: LaborScheduleUtilization
        public ActionResult MaterialUsageprojectIndex()
        {
            return View(Path.MaterialUsageproject);
        }

        public JsonResult GetBranchByID(int id)
        {

            var result = db.G_BRANCH.Where(x => x.BRA_CODE == id).First();
            return Shared.JsonObject(result);
        }
        public JsonResult GetSrchProject(int id)
        {

            var result = db.P_TR_EngProject.Where(x => x.ProjectID == id).First();
            return Shared.JsonObject(result);
        }

        public JsonResult GetSrchMatCode(int id)
        {

            var result = db.I_D_Category.Where(x => x.CatID == id).First();
            return Shared.JsonObject(result);
        }
        public JsonResult GetCustomerClass(int id)
        {

            var result = db.P_D_SalesCustomerCategory.Where(x => x.CustomerCategoryID == id).First();
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

        public JsonResult GetItemCodeSearch(int id)
        {
            var result = db.IQ_SrchItem.Where(x => x.ItemID == id).First();
            return Shared.JsonObject(result);
        }


    }
}