using PMS.ServiceConnector.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace PMS.WebUI.Controllers.Engineer._05_Reports
{
    public class ProjItemsInventoryController : Controller
    {
        DbEntities db = new DbEntities();
        // GET: ProjectExpenses
        public ActionResult ProjItemsInventoryIndex()
        {
            return View();
        }
        public JsonResult GetBranchByID(int id)
        {

            var result = db.G_BRANCH.Where(x => x.BRA_CODE == id).First();
            return Shared.JsonObject(result);
        }
        public JsonResult GetSrchProjectEng(int id)
        {

            var result = db.P_TR_EngProject.Where(x => x.ProjectID == id).First();
            return Shared.JsonObject(result);
        }

         
        
    }
}