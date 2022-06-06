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
    public class ProductionController : Controller
    {
        DbEntities db = new DbEntities();
        // GET: Production
        public ActionResult ProductionIndex()
        {
            return View(Path.Production);
        }

        public JsonResult GetSubContractorByID(int id)
        {
            var result = db.P_D_SubContractor.Where(x => x.SubContractorID == id).First();
            return Shared.JsonObject(result);
        }

        public JsonResult GetSrchProject(int id)
        {

            var result = db.P_TR_EngProject.Where(x => x.ProjectID == id).First();
            return Shared.JsonObject(result);
        }


        public JsonResult GetSrchProjectPhase(int id)
        {

            var result = db.P_TR_EngProjectPhase.Where(x => x.ProjectPhaseId == id).First();
            return Shared.JsonObject(result);
        }


        public JsonResult GetSrchContract(int id)
        {

            var result = db.PQ_GetEngSubContract.Where(x => x.SubContractId == id).First();
            return Shared.JsonObject(result);
        }


        public JsonResult GetSrchSubServiceOrder(int id)
        {
            var result = db.PQ_GetEngSubServiceOrder.Where(x => x.SubServiceOrderId == id).First();
            return Shared.JsonObject(result);
        }




    }
}