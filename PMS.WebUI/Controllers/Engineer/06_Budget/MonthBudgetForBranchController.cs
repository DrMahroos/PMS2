using System;
using PMS.ServiceConnector.Models;

using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace PMS.WebUI.Controllers.Engineer._06_Budget
{
    public class MonthBudgetForBranchController : Controller
    {
        // GET: MonthBudgetForBranch
        DbEntities db = new DbEntities();

        public ActionResult MonthBudgetForBranch()
        {

            return View(Path.MonthBudgetForBranch);
        }
        public JsonResult GetBranchByID(int id)
        {

            var result = db.G_BRANCH.Where(x => x.BRA_CODE == id).First();
            return Shared.JsonObject(result);
        }
    }
}
