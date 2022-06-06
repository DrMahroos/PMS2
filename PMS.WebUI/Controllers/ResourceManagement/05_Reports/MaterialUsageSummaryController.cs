using PMS.ServiceConnector.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace PMS.WebUI.Controllers.Engineer._05_Reports
{
    public class MaterialUsageSummaryController : Controller
    {

        DbEntities db = new DbEntities();
        // GET: LaborScheduleUtilization
        public ActionResult MaterialUsageIndex()
        {
            return View(Path.MaterialUsage);
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

        public JsonResult GetSrchPhase(int id)
        {

            var result = db.P_TR_EngProjectPhase.Where(x => x.ProjectPhaseId == id).First();
            return Shared.JsonObject(result);
        }
        public JsonResult GetSrchProjectEng(int id)
        {

            var result = db.P_D_SiteEngineer.Where(x => x.SiteEngineerId == id).First();
            return Shared.JsonObject(result);

        }
        public JsonResult GetCustomer(int id)
        {

            var result = db.P_D_SalesCustomer.Where(x => x.CustomerID == id).First();
            return Shared.JsonObject(result);
        }
        public JsonResult GetScopeClass(int id)
        {

            var result = db.P_D_ScopeCategory.Where(x => x.ScopeCategoryID == id).First();
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