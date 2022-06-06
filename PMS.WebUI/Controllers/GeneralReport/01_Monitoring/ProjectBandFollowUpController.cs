using PMS.ServiceConnector.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace PMS.WebUI.Controllers.GeneralReport._01_Monitoring
{
    public class ProjectBandFollowUpController : Controller
    {
        DbEntities db = new DbEntities();
        // GET: ProjectBandFollowUp
        public ActionResult ProjectBandFollowUpIndex()
        {
            return View(Path.ProjectBandFollowUp);
        }

        public JsonResult GetProjCodeByID(int id)
        {

            var result = db.P_TR_EngProject.Where(x => x.ProjectID == id).First();
            return Shared.JsonObject(result);
        }
        public JsonResult getProjectsCode(string code, string comp, string bra)
        {
            var model = db.P_TR_EngProject.Where(f => f.ProjectCode == code && f.CompCode == Convert.ToInt32(comp) && f.BraCode == Convert.ToInt32(bra)).First();
            return Shared.JsonObject(model);
        }


    }
}