using PMS.ServiceConnector.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace PMS.WebUI.Controllers.Engineer._05_Reports
{
    public class ProjectProgressController : Controller
    {
        // GET: ProjectProgress
        DbEntities db = new DbEntities();

        public ActionResult ProjectProgressIndex()
        {
            return View(Path.ProjectProgress);
        }
        public JsonResult GetProjCodeByID(int id)
        {

            var result = db.P_TR_EngProject.Where(x => x.ProjectID == id).First();
            return Shared.JsonObject(result);
        }
        public JsonResult GetPhaseCodeById(int id)
        {

            var result = db.P_TR_EngProjectPhase.Where(x => x.ProjectPhaseId == id).First();
            return Shared.JsonObject(result);
        }
        public JsonResult getProjectsCode(string code, string comp, string bra)
        {
            var model = db.P_TR_EngProject.Where(f => f.ProjectCode == code && f.CompCode == Convert.ToInt32(comp) && f.BraCode == Convert.ToInt32(bra)).First();
            return Shared.JsonObject(model);
        }
    }
}