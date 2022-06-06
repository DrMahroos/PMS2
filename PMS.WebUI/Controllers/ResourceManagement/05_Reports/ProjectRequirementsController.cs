using PMS.ServiceConnector.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace PMS.WebUI.Controllers.Engineer._05_Reports
{
    public class ProjectRequirementsController : Controller
    {
        DbEntities db = new DbEntities();
        // GET: ProjectExpenses
        public ActionResult ProjectRequirementsIndex()
        {
            return View();
        }
        public JsonResult GetBranchByID(int id)
        {

            var result = db.G_BRANCH.Where(x => x.BRA_CODE == id).First();
            return Shared.JsonObject(result);
        }
        public JsonResult GetSrchProjectEng(int id)
        {

            var result = db.P_TR_EngProject.Where(x => x.ProjectID == id).First();
            return Shared.JsonObject(result);
        }

        public JsonResult GetSrchPhase(int id)
        {

            var result = db.PQ_GetEngProjectPhase.Where(x => x.ProjectPhaseId == id).First();
            return Shared.JsonObject(result);
        }
        //public JsonResult GetCustomerClass(int id)
        //{

        //    var result = db.P_D_SalesCustomerCategory.Where(x => x.CustomerCategoryID == id).First();
        //    return Shared.JsonObject(result);

        //}
        //public JsonResult GetCustomer(int id)
        //{

        //    var result = db.P_D_SalesCustomer.Where(x => x.CustomerID == id).First();
        //    return Shared.JsonObject(result);
        //}
        //public JsonResult GetScopeClass(int id)
        //{

        //    var result = db.P_D_Scope.Where(x => x.ScopeID == id).First();
        //    return Shared.JsonObject(result);
        //}


        //public JsonResult GetScope(int id)
        //{

        //    var result = db.P_D_Scope.Where(x => x.ScopeID == id).First();
        //    return Shared.JsonObject(result);
        //}

        //public JsonResult GetArea(int id)
        //{
        //    var result = db.G_BRANCH.Where(x => x.BRA_CODE == id).First();
        //    return Shared.JsonObject(result);
        //}

        
    }
}