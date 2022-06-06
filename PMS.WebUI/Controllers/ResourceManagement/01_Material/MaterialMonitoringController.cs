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
    public class MaterialMonitoringController : Controller
    {
        DbEntities db = new DbEntities();
        int comCode = int.Parse(SessionManager.SessionRecord.CompCode);
        int braCode = int.Parse(SessionManager.SessionRecord.BranchCode);

        // GET: MaterialMonitoring
        public ActionResult MaterialMonitoringIndex()
        {
            return View(Path.MaterialMonitoring);
        }

        public JsonResult GetEngSchedule(int id)
        {
            var res = db.PQ_GetEngWorkSchdule.Where(x => x.ScheduleId == id).First();
            return Shared.JsonObject(res);
        }

        public JsonResult GetEngScheduleSearch(int id)
        {
            var res = db.PQ_GetEngWorkSchdule.Where(x => x.ScheduleId == id).First();
            return Shared.JsonObject(res);
        }

        public JsonResult LoadDetailsSchdule(int id)
        {
            var res = db.PQ_GetResRequestMaterialMontoring.Where(x => x.ScheduleId == id).Result();
            return Shared.JsonObject(res);
        }


        public JsonResult GetDetailsSchduleRequest(int schaduleId, int SubServiceOrderId)
        {
            RestClient rest = new RestClient();
            Dictionary<string, string> dictionary = new Dictionary<string, string>();
            dictionary.Add("schaduleId", schaduleId.ToString());
            dictionary.Add("SubServiceOrderId", SubServiceOrderId.ToString());
            var _JsonResult = rest.Get<string>("SystemTools", "GetMaterialissueReturn", dictionary);
            var _Result = JsonConvert.DeserializeObject<List<PProc_ResGetMaterialissueReturn_Result>>(_JsonResult);
            return Json(new { result = _Result }, JsonRequestBehavior.AllowGet);
        }

        public JsonResult LoadDetailsSchduleRequest(int id)
        {
            var res = db.PQ_GetResRequestMaterialMontoring.Where(x => x.ScheduleId == id).Result();
            return Shared.JsonObject(res);
        }

        public JsonResult GetServiceOrder(int id)
        {
            var res = db.PQ_GetEngSubServiceOrder.Where(x => x.SubServiceOrderId == id).First();
            return Shared.JsonObject(res);
        }

        public JsonResult LoadDetailsService(int id)
        {
            var res = db.PQ_GetResRequestMaterialMontoring.Where(x => x.SubServiceOrderId == id).Result();
            return Shared.JsonObject(res);
        }

        public JsonResult LoadDetailsServiceRequest(int id)
        {
            var res = db.PQ_GetResRequestMaterialMontoring.Where(x => x.SubServiceOrderId == id).Result();
            return Shared.JsonObject(res);
        }

        //public JsonResult LoadDetailsSchduleRequest(int schaduleId, int SubServiceOrderId)
        //{
        //    RestClient rest = new RestClient();
        //    Dictionary<string, string> dictionary = new Dictionary<string, string>();
        //    dictionary.Add("schaduleId", schaduleId.ToString());
        //    dictionary.Add("SubServiceOrderId", SubServiceOrderId.ToString());
        //    var _JsonResult = rest.Get<string>("SystemTools", "GetMaterialissueReturn", dictionary);
        //    var _Result = JsonConvert.DeserializeObject<List<PProc_ResGetMaterialissueReturn_Result>>(_JsonResult);
        //    return Json(new { result = _Result }, JsonRequestBehavior.AllowGet);
        //}
    }
}