using Newtonsoft.Json;
using PMS.ServiceConnector.Models;
using PMS.WebUI.Models.CustomModels;
using PMS.ServiceConnector.Models.Entities;
using PMS.ServiceConnector.Tools;
using PMS.WebUI.Tools;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using PMS.WebUI.Filter;

namespace PMS.WebUI.Controllers.Engineer._04_SubContractorReports
{
    [AuthorizeUserAttribute()]
    public class EvaluationController : Controller
    {
        DbEntities db = new DbEntities();
        // GET: Evaluation
        public ActionResult EvaluationIndex()
        {
            return View(Path.Evaluation);
        }


        public JsonResult GetSubContractorByID(int id)
        {

            var result = db.P_D_SubContractor.Where(x => x.SubContractorID == id).First();
            return Shared.JsonObject(result);
        }

        public JsonResult GetSiteEngineer(int id)
        {

            var result = db.P_D_SiteEngineer.Where(x => x.SiteEngineerId == id).First();
            return Shared.JsonObject(result);
        }

        public JsonResult GetEngSubContract(int id)
        {

            var result = db.PQ_GetEngSubContract.Where(x => x.SubContractId == id).First();
            return Shared.JsonObject(result);
        }
        public JsonResult GetSrchProjectEng(int id)
        {

            var result = db.P_TR_EngProject.Where(x => x.ProjectID == id).First();
            return Shared.JsonObject(result);
        }
    }
}