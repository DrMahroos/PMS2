using PMS.ServiceConnector.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace PMS.WebUI.Controllers.Engineer._05_Reports
{
    public class ProjectStatusController : Controller
    {
        // GET: ProjectStatus

        DbEntities db = new DbEntities();

        public ActionResult ProjectStatusIndex()
        {
            return View(Path.ProjectStatus);
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




    }
}