using PMS.ServiceConnector.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace PMS.WebUI.Controllers.GeneralReport._02_Evaluation
{
    public class SiteEngineerBonusController : Controller
    {
        DbEntities db = new DbEntities();
        // GET: SiteEngineerBonus
        public ActionResult SiteEngineerBonusIndex()
        {
            return View(Path.RepSiteEngineerBonus);
        }





    }
}