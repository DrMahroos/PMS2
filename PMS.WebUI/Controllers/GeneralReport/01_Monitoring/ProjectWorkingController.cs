using PMS.ServiceConnector.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace PMS.WebUI.Controllers.GeneralReport._01_Monitoring
{
    public class ProjectWorkingController : Controller
    {
        DbEntities db = new DbEntities();

        // GET: ProjectWorking

        public ActionResult ProjectWorkingIndex()
        {
            return View(Path.ProjectWorking);
        }


        public JsonResult getSiteEngByid(int id)
        {
            var result = db.P_D_SiteEngineer.Where(x => x.SiteEngineerId == id).First();
            return Shared.JsonObject(result);
        }


        public JsonResult SiteEng(int id)
        {
            var result = db.P_D_SiteEngCategory.Where(x => x.SiteEngCategoryId == id).First();
            return Shared.JsonObject(result);
        }


        public JsonResult GetSalesCodeByID(int id)
        {

            var result = db.P_D_SalesEgineer.Where(x => x.SalesEngineerId == id).First();
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



    }
}