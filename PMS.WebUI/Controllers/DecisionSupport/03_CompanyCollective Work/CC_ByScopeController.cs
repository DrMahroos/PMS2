using PMS.ServiceConnector.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace PMS.WebUI.Controllers.DecisionSupport._03_CompanyCollective_Work
{
    public class CC_ByScopeController : Controller
    {
        // GET: Scope
        public ActionResult Index()
        {
            return View();
        }

        DbEntities db = new DbEntities();


        public JsonResult getRegionByid(int id)
        {
            var result = db.P_G_Region.Where(x => x.REGION_CODE == id).First();
            return Shared.JsonObject(result);
        }
        public JsonResult GetVendorByID(int id)
        {
            var result = db.I_Pay_Vendor.Where(x => x.VendorID == id).First();
            return Shared.JsonObject(result);
        }
        public JsonResult GetCustomerClassById(int id)
        {
            var result = db.P_D_SalesCustomerCategory.Where(x => x.CustomerCategoryID == id).First();
            return Shared.JsonObject(result);
        }
        public JsonResult ScopeCategoryById(int id)
        {
            var result = db.P_D_ScopeCategory.Where(x => x.ScopeCategoryID == id).First();
            return Shared.JsonObject(result);
        }
        public JsonResult getScopeCategory(int id)
        {
            var result = db.P_D_ScopeCategory.Where(x => x.ScopeCategoryID == id).First();
            return Shared.JsonObject(result);
        }
        public JsonResult GetEngSubContractorScope(int id)
        {
            var result = db.PQ_GetEngSubContractorScope.Where(x => x.SubContractorScopeId == id).First();
            return Shared.JsonObject(result);
        }

        public JsonResult GetBranchByID(int id)
        {
            var result = db.G_BRANCH.Where(x => x.BRA_CODE == id).First();
            return Shared.JsonObject(result);
        }




    }
}