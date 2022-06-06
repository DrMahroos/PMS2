using PMS.WebUI.Filter;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using PMS.ServiceConnector.Models;

namespace PMS.WebUI.Controllers.Sales._04_Reports
{
    [AuthorizeUserAttribute()]

    

    public class ContractListController : Controller
    {
        DbEntities db = new DbEntities();
        // GET: ContractList
        public ActionResult ContractListIndex()
        {
            return View(Path.ContractList);
        }

        public JsonResult getLocation(int id)
        {
            var result = db.P_D_Location.Where(x => x.LocationId == id).First();
            return Shared.JsonObject(result);


        }
    }
}