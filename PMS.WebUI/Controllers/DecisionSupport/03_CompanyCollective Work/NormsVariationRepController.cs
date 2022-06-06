using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using PMS.ServiceConnector.Models;
namespace PMS.WebUI.Controllers.DecisionSupport._03_CompanyCollective_Work
{
    public class NormsVariationRepController : Controller
    {
        DbEntities db = new DbEntities();
        // GET: NormsVariationReport
        public ActionResult NormsVariationRepIndex()
        {
            return View(Path.NormsVariationReport);
        }

        public ActionResult getActvitybyid( int id) {
            var result = db.P_D_Activity.Where(x => x.ActivityID == id).First();
            return (Shared.JsonObject(result));

        }
        
        public JsonResult getRegionByid(int id)
        {
            var result = db.P_G_Region.Where(x => x.REGION_CODE == id).First();
            return Shared.JsonObject(result);
        }

        public ActionResult GetBranchByID(int id ) {
            var result = db.G_BRANCH.Where(x => x.BRA_CODE == id).First();
            return (Shared.JsonObject(result));
        }

    }
}