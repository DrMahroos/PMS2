using Newtonsoft.Json;
using PMS.ServiceConnector.Models;
using PMS.ServiceConnector.Models.Entities;
using PMS.ServiceConnector.Tools;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace PMS.WebUI.Controllers.ResourceManagement._01_Material
{
    public class BillOfMaterialController : Controller
    {
        DbEntities db = new DbEntities();
        int comCode = int.Parse(SessionManager.SessionRecord.CompCode);
        int braCode = int.Parse(SessionManager.SessionRecord.BranchCode);
        // GET: BillOfMaterial
        public ActionResult BillOfMaterialIndex()
        {
            return View(Path.BillOfMaterial);
        }
        public JsonResult GetProjectPhaseByID(int id)
        {
            var result = db.P_TR_EngProjectPhase.Where(x => x.ProjectPhaseId == id).First();
            return Shared.JsonObject(result);
        }
        public JsonResult GetProjectByID(int id)
        {
            var result = db.P_TR_EngProject.Where(x => x.ProjectID == id).First();
            return Shared.JsonObject(result);
        }

        public JsonResult PPrc_Res_MaterialRequired(int? Projectid, int? phaseID)
        {
            RestClient rest = new RestClient();
            Dictionary<string, string> dictionary = new Dictionary<string, string>();
            dictionary.Add("Projectid", Projectid.ToString());
            dictionary.Add("phaseID", phaseID.ToString());
            var _JsonResult = rest.Get<string>("SystemTools", "PPrc_Res_MaterialRequired", dictionary);
            var _Result = JsonConvert.DeserializeObject<List<PPrc_Res_MaterialRequired_Result>>(_JsonResult);
            return Json(new { result = _Result }, JsonRequestBehavior.AllowGet);
        }
    }
}