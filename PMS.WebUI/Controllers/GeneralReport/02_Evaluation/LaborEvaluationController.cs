using PMS.ServiceConnector.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace PMS.WebUI.Controllers.GeneralReport._02_Evaluation
{
    public class LaborEvaluationController : Controller
    {
        DbEntities db = new DbEntities();
        // GET: LaborEvaluation
        public ActionResult LaborEvaluationIndex()
        {
            return View(Path.RepLaborEvaluation);
        }


        public ActionResult getLaborClassbyid(int id)
        {
            var result = db.P_D_LaborClass.Where(x => x.LaborClassId == id).First();
            return Shared.JsonObject(result);
        }
        public ActionResult getLaborcatbyid(int id)
        {
            var result = db.P_D_LaborCategory.Where(x => x.LaborCategoryId == id).First();
            return Shared.JsonObject(result);
        }

        public ActionResult getEngineerByID(int id)
        {
            var result = db.P_D_SiteEngineer.Where(x => x.SiteEngineerId == id).First();
            return Shared.JsonObject(result);
        }


        public ActionResult getProjectByID(int id)
        {
            var result = db.P_TR_EngProject.Where(x => x.ProjectID == id).First();
            return Shared.JsonObject(result);
        }

    }
}