using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace PMS.WebUI.Controllers.Engineer._06_Budget
{
    public class MonthBudgetForCompController : Controller
    {
        // GET: MonthBudgetForComp
        public ActionResult MonthBudgetForComp()
        {

            return View(Path.MonthBudgetForComp);
        }
    }
}

