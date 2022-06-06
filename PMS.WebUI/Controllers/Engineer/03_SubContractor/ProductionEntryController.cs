using Newtonsoft.Json;
using PMS.ServiceConnector.Models;
using PMS.ServiceConnector.Models.Entities;
using PMS.ServiceConnector.Tools;
using PMS.WebUI.Models.CustomModels;
using PMS.WebUI.Tools;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace PMS.WebUI.Controllers.Engineer._03_SubContractor
{
    public class ProductionEntryController : Controller, IMasterManyDetails<P_TR_SubProduction>
    {
        DbEntities db = new DbEntities();
        int comCode = int.Parse(SessionManager.SessionRecord.CompCode);
        int BraCode = int.Parse(SessionManager.SessionRecord.BranchCode);

        // GET: ProductionEntry
        public ActionResult ProductionEntryIndex()
        {
            SessionManager.PageIndex = 0;
            SessionManager.ModelCount = db.PQ_GetEngSubProduction.Where(x => x.CompCode == comCode && x.BraCode == BraCode).Count();
            return View(Path.ProductionEntry);
        }

        public JsonResult GetByIndex(int? index = null)
        {
            var model = db.PQ_GetEngSubProduction.Where(x => x.CompCode == comCode && x.BraCode == BraCode).ByIndex(SessionManager.PageIndex, "SubProductionId");
            return Shared.JsonObject(model);
        }

        public JsonResult Insert(string JsonData)
        {
            M_D_ProductionEntry obj = JsonConvert.DeserializeObject<M_D_ProductionEntry>(JsonData);
            var result = db.P_TR_SubProduction.InsertMasterDetails(obj.P_TR_SubProduction, obj.P_TR_SubProductionActivity);
            if (result.ResponseState == true)
            {
                SessionManager.ModelCount = db.P_TR_SubProduction.Where(x => x.CompCode == comCode && x.BraCode == BraCode).Count();
            }
            return Shared.JsonObject(result);
        }

        public JsonResult Update(string JsonData)
        {
            M_D_ProductionEntry obj = JsonConvert.DeserializeObject<M_D_ProductionEntry>(JsonData);
            var result = db.P_TR_SubProduction.UpdateMasterDetails(obj.P_TR_SubProduction, obj.P_TR_SubProductionActivity);
            if (result.ResponseState == true)
            {
                SessionManager.ModelCount = db.P_TR_SubProduction.Where(x => x.CompCode == comCode && x.BraCode == BraCode).Count();
            }
            return Shared.JsonObject(result);
        }

        public JsonResult getSubContract(int id)
        {
            var result = db.P_TR_SubContract.Where(c => c.SubContractId == id).First();
            return Shared.JsonObject(result);
        }
        public JsonResult getSubContractor(int id)
        {
            var result = db.P_D_SubContractor.Where(c => c.SubContractorID == id).First();
            return Shared.JsonObject(result);
        }
        public JsonResult LoadDetails(int id)
        {
            var result = db.PQ_GetEngServiceOrderActivity.Where(c => c.SubServiceOrderId == id && c.RemainQty > 0).Result();
            return Shared.JsonObject(result);
        }

        public JsonResult DisplayDetails(int id)
        {
            var result = db.PQ_GetEngSubProductionActivity.Where(c => c.SubProductionId == id ).Result();
            return Shared.JsonObject(result);
        }

        public JsonResult GetSubProduction(int id)
        {
            var result = db.PQ_GetEngSubProduction.Where(c => c.SubProductionId == id).First();
            return Shared.JsonObject(result);
        }

        public JsonResult GetService(int id)
        {
            var result = db.PQ_GetEngSubServiceOrder.Where(c => c.SubServiceOrderId == id).First();
            return Shared.JsonObject(result);
        }

        // Call Stored Procedure 
        public JsonResult SubProductionApprove(int id)
        {
            RestClient rest = new RestClient();
            Dictionary<string, string> DicList = new Dictionary<string, string>();
            DicList.Add("id", id.ToString());
            var _result = rest.Get<int>("P_TR_SubProduction", "SubProductionApprove", DicList);
            return Json(new { result = _result }, JsonRequestBehavior.AllowGet);
        }

        #region
        public JsonResult GetModelCount()
        {
            throw new NotImplementedException();
        }
        public JsonResult InsertAll(P_TR_SubProduction master, string json)
        {
            throw new NotImplementedException();
        }

        public JsonResult OnSearchSelect(string id)
        {
            throw new NotImplementedException();
        }
        public JsonResult Undo()
        {
            throw new NotImplementedException();
        }
        public JsonResult Add()
        {
            throw new NotImplementedException();
        }

        public JsonResult Delete(P_TR_SubProduction entity)
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
        #endregion
        public JsonResult EngSubServiceOrderApprove(int id)
        {
            RestClient rest = new RestClient();
            Dictionary<string, string> DicList = new Dictionary<string, string>();
            DicList.Add("id", id.ToString());
            var _result = rest.Get<int>("P_TR_SubServiceOrder", "EngSubServiceOrderApprove", DicList);
            return Json(new { result = _result }, JsonRequestBehavior.AllowGet);
        }
    }


}