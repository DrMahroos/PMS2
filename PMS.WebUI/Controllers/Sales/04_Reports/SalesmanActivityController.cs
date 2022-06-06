using PMS.WebUI.Filter;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace PMS.WebUI.Controllers.Sales._04_Reports
{
    [AuthorizeUserAttribute()]
    public class SalesmanActivityController : Controller
    {
        // GET: SalesmanActivity
        public ActionResult SalesmanActivityIndex()
        {
            return View(Path.SalesmanActivity);
        }
    }
}