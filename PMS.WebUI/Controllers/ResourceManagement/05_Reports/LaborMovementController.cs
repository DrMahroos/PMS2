using PMS.ServiceConnector.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace PMS.WebUI.Controllers.Engineer._05_Reports
{
    public class LaborMovementController : Controller
    {
        DbEntities db = new DbEntities();
        public ActionResult LaborMovementIndex()
        {
            return View(Path.LaborMovement);
        }
        public JsonResult GetSearchToLabor(int id)
        {
            var result = db.P_D_Labor.Where(x => x.LaborID == id).First();
            return Shared.JsonObject(result);
        }
        public JsonResult GetSrchLaborCategory(int id)
        {

            var result = db.P_D_LaborCategory.Where(x => x.LaborCategoryId == id).First();
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

        public JsonResult GetSrchFromLabor(int id)
        {
            var result = db.P_D_Labor.Where(x => x.LaborID == id).First();
            return Shared.JsonObject(result);
        }
    }
}