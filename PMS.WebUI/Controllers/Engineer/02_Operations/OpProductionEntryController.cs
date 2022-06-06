using Newtonsoft.Json;
using PMS.ServiceConnector.Models;
using PMS.ServiceConnector.Models.Entities.Engineer;
using PMS.ServiceConnector.Tools;
using PMS.WebUI.Models.CustomModels;
using PMS.WebUI.Tools;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace PMS.WebUI.Controllers.Engineer._02_Operations
{
    public class OpProductionEntryController : Controller, IMasterManyDetails<P_Tr_EngProduction>
    {
        DbEntities db = new DbEntities();
        int comCode = int.Parse(SessionManager.SessionRecord.CompCode);
        int BraCode = int.Parse(SessionManager.SessionRecord.BranchCode);

        public JsonResult GetByIndex(int? index = null)
        {
            var model = db.PQ_GetEngProduction.Where(c=>c.CompCode == comCode && c.BraCode == BraCode).ByIndex(SessionManager.PageIndex, "ProductionId");
            return Shared.JsonObject(model);
        }

        public JsonResult Insert(string JsonData)
        {
            M_D_Productions obj = JsonConvert.DeserializeObject<M_D_Productions>(JsonData);
            M_D_Productions _MasterDetailsProduction = new M_D_Productions();
            _MasterDetailsProduction.P_Tr_EngProduction = obj.P_Tr_EngProduction;
            _MasterDetailsProduction.P_TR_EngProductionActiv = obj.P_TR_EngProductionActiv as List<P_TR_EngProductionActiv>;
            _MasterDetailsProduction.P_TR_EngProductionEquip = obj.P_TR_EngProductionEquip as List<P_TR_EngProductionEquip>;
            _MasterDetailsProduction.P_TR_EngProductionLabour = obj.P_TR_EngProductionLabour as List<P_TR_EngProductionLabour>;

            var result = db.P_Tr_EngProduction.InsertMasterManyDetails(_MasterDetailsProduction.P_Tr_EngProduction, _MasterDetailsProduction);
            if (result.ResponseState == true)
            {
                SessionManager.ModelCount = db.P_Tr_EngProduction.Where(x => x.CompCode == comCode && x.BraCode == BraCode).Count();
            }
            return Shared.JsonObject(result);
        }

        public JsonResult Update(string JsonData)
        {
            M_D_Productions obj = JsonConvert.DeserializeObject<M_D_Productions>(JsonData);
            M_D_Productions _MasterDetailsProduction = new M_D_Productions();
            _MasterDetailsProduction.P_Tr_EngProduction = obj.P_Tr_EngProduction;
            _MasterDetailsProduction.P_TR_EngProductionActiv = obj.P_TR_EngProductionActiv as List<P_TR_EngProductionActiv>;
            _MasterDetailsProduction.P_TR_EngProductionEquip = obj.P_TR_EngProductionEquip as List<P_TR_EngProductionEquip>;
            _MasterDetailsProduction.P_TR_EngProductionLabour = obj.P_TR_EngProductionLabour as List<P_TR_EngProductionLabour>;

            var result = db.P_Tr_EngProduction.UpdateMasterManyDetails(_MasterDetailsProduction.P_Tr_EngProduction, _MasterDetailsProduction);
            if (result.ResponseState == true)
            {
                SessionManager.ModelCount = db.P_Tr_EngProduction.Where(x => x.CompCode == comCode && x.BraCode == BraCode).Count();
            }
            return Shared.JsonObject(result);
        }
        public JsonResult UpdateMaster(string JsonData)
        {
            P_Tr_EngProduction obj = JsonConvert.DeserializeObject<P_Tr_EngProduction>(JsonData);

            var result = db.P_Tr_EngProduction.UpdateEntity(obj);
            
            if (result.ResponseState == true)
            {
                SessionManager.ModelCount = db.P_Tr_EngProduction.Where(x => x.CompCode == comCode && x.BraCode == BraCode).Count();
            }
            return Shared.JsonObject(result);
        }

        // GET: OpProductionEntry
        public ActionResult OpProductionEntryIndex()
        {
            SessionManager.PageIndex = 0;
            SessionManager.ModelCount = db.PQ_GetEngProduction.Where(x => x.CompCode == comCode && x.BraCode == BraCode).Count();
            return View(Path.OpProductionEntry);
        }

        public JsonResult GetProdActivity(int id)
        {
            var result = db.PQ_GetEngproductionActivity.Where(x => x.ProductionId == id).Result();
            return Shared.JsonObject(result);
        }

        public JsonResult GetProdEquipment(int id)
        {
            var result = db.PQ_GetEngProductionEquipment.Where(x => x.ProductionId == id).Result();
            return Shared.JsonObject(result);
        }

        public JsonResult GetProdLabor(int id)
        {
            var result = db.PQ_GetEngProductionLabour.Where(x => x.ProductionId == id).Result();
            return Shared.JsonObject(result);
        }

        public JsonResult getEngSchedule(int id)
        {
            var result = db.PQ_GetEngWorkSchdule.Where(x => x.ScheduleId == id).First();
            return Shared.JsonObject(result);
        }

        public JsonResult getUnprodReasons(int id)
        {
            var result = db.P_D_UnProdReason.Where(x => x.UnProdReasonId == id).First();
            return Shared.JsonObject(result);
        }

        public JsonResult getProduction(int id)
        {
            var result = db.PQ_GetEngProduction.Where(x => x.ProductionId == id).First();
            return Shared.JsonObject(result);
        }

        public JsonResult GetSchduleTrNo(int id)
        {
            var result = db.P_TR_EngSchedule.Where(x => x.ScheduleId == id).First();
            return Shared.JsonObject(result);
        }

        ////public JsonResult LoadProductionActivity(int id)
        ////{
        ////    RestClient rest = new RestClient();
        ////    Dictionary<string, string> DicList = new Dictionary<string, string>();
        ////    DicList.Add("TrID", id.ToString());
        ////    var _JsonResult = rest.Get<string>("P_Tr_EngProduction", "LoadProductionActivity", DicList);
        ////    var _Result = JsonConvert.DeserializeObject<List<PProc_EngLoadProductionActivity_Result>>(_JsonResult);
        ////    return Json(new { result = _Result }, JsonRequestBehavior.AllowGet);
        ////}

        public JsonResult LoadProductionActivity(int? id)
        {
            RestClient rest = new RestClient();
            Dictionary<string, string> DicList = new Dictionary<string, string>();
            DicList.Add("id", (id == 0) ? null : id.ToString());
            var _JsonResult = rest.Get<string>("P_Tr_EngProduction", "LoadProductionActivity", DicList);
            var _Result = JsonConvert.DeserializeObject<List<PProc_EngLoadProductionActivity_Result>>(_JsonResult);
            return Json(new { result = _Result }, JsonRequestBehavior.AllowGet);
        }

        public JsonResult LoadProductionEquipment(int id, string StartDateTime, string EndDatetime)
        {
            DateTime dtFrom = Convert.ToDateTime(StartDateTime);
            DateTime dtTo = Convert.ToDateTime(EndDatetime);
            RestClient rest = new RestClient();
            Dictionary<string, string> DicList = new Dictionary<string, string>();
            DicList.Add("id", (id == 0) ? null : id.ToString());
            DicList.Add("StartDateTime", dtFrom.ToString());
            DicList.Add("EndDatetime", dtTo.ToString());
            var _JsonResult = rest.Get<string>("P_Tr_EngProduction", "LoadProductionEquipment", DicList);
            var _Result = JsonConvert.DeserializeObject<List<PProc_EngLoadProductionEquipment_Result>>(_JsonResult);
            return Json(new { result = _Result }, JsonRequestBehavior.AllowGet);
        }

        public JsonResult LoadProductionLabor(int id, string StartDateTime, string EndDatetime)
        {
            DateTime dtFrom = Convert.ToDateTime(StartDateTime);
            DateTime dtTo = Convert.ToDateTime(EndDatetime);
            RestClient rest = new RestClient();
            Dictionary<string, string> DicList = new Dictionary<string, string>();
            DicList.Add("id", (id == 0) ? null : id.ToString());
            DicList.Add("StartDateTime", dtFrom.ToString());
            DicList.Add("EndDatetime", dtTo.ToString());
            var _JsonResult = rest.Get<string>("P_Tr_EngProduction", "LoadProductionLabor", DicList);
            var _Result = JsonConvert.DeserializeObject<List<PProc_EngLoadProductionLabor_Result>>(_JsonResult);
            return Json(new { result = _Result }, JsonRequestBehavior.AllowGet);
            
        }


        public JsonResult ProductionAuthorize(int id)
        {
            RestClient rest = new RestClient();
            var _result = rest.Get<int>("P_Tr_EngProduction", "ProductionAuthorize", "id=" + id.ToString());
            return Json(new { result = _result }, JsonRequestBehavior.AllowGet);
        }

        public JsonResult ProductionUnAuthorize(int id)
        {
            RestClient rest = new RestClient();
            var _result = rest.Get<int>("P_Tr_EngProduction", "ProductionUnAuthorize", "id=" + id.ToString());
            return Json(new { result = _result }, JsonRequestBehavior.AllowGet);
            //return Json(new { result = "" }, JsonRequestBehavior.AllowGet);
        }

        #region
        public JsonResult Undo()
        {
            throw new NotImplementedException();
        }
        public JsonResult Add()
        {
            throw new NotImplementedException();
        }
        public JsonResult Delete(P_Tr_EngProduction entity)
        {
            throw new NotImplementedException();
        }
        public JsonResult DeleteAll(string json)
        {
            throw new NotImplementedException();
        }
        public void Edit()
        {
            throw new NotImplementedException();
        }
        public JsonResult Find()
        {
            throw new NotImplementedException();
        }
        public JsonResult GetModelCount()
        {
            throw new NotImplementedException();
        }
        public JsonResult InsertAll(P_Tr_EngProduction master, string json)
        {
            throw new NotImplementedException();
        }
        public JsonResult OnSearchSelect(string id)
        {
            throw new NotImplementedException();
        }
        #endregion
    }
}