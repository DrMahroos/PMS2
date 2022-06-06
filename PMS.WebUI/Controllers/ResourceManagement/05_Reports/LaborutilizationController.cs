using PMS.ServiceConnector.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace PMS.WebUI.Controllers.Engineer._05_Reports
{
    public class LaborutilizationController : Controller
    {
        DbEntities db = new DbEntities();
        public ActionResult LaborutilizationIndex()
        {
            return View(Path.Laborutilization);
        }

        public JsonResult GetLaborClass(int id)
        {

            var result = db.P_D_LaborClass.Where(x => x.LaborClassId == id).First();
            return Shared.JsonObject(result);

        }
        public JsonResult GetLaborCategory(int id)
        {

            var result = db.P_D_LaborCategory.Where(x => x.LaborCategoryId == id).First();
            return Shared.JsonObject(result);
        }
    }
}