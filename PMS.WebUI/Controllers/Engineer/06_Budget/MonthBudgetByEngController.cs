using PMS.ServiceConnector.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace PMS.WebUI.Controllers.Engineer._06_Budget
{
    public class MonthBudgetByEngController : Controller
    {
        // GET: MonthBudgetByEng
        DbEntities db = new DbEntities();

        public ActionResult MonthBudgetByEng()
        {

            return View(Path.MonthBudgetByEng);
        }
        public JsonResult GetSrchProjectEng(int id)
        {

            var result = db.P_D_SiteEngineer.Where(x => x.SiteEngineerId == id).First();
            return Shared.JsonObject(result);
        }
    }
}