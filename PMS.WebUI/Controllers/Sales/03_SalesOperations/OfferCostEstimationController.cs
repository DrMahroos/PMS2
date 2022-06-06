using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using PMS.ServiceConnector.Models;
using PMS.ServiceConnector.Tools;
using PMS.WebUI.Models.CustomModels;
using PMS.WebUI.Tools;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Web;
using System.Web.Mvc;

namespace PMS.WebUI.Controllers.Sales._03_SalesOperations
{
    public class OfferCostEstimationController : Controller, IMasterManyDetails<P_TR_SalesOffer>
    {
        DbEntities db = new DbEntities();
        int comCode = int.Parse(SessionManager.SessionRecord.CompCode);
        int BraCode = int.Parse(SessionManager.SessionRecord.BranchCode);

        public JsonResult Add()
        {
            throw new NotImplementedException();
        }

        public JsonResult Delete(P_TR_SalesOffer entity)
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

        public JsonResult GetByIndex(int? index = null)
        {
            var model = db.PQ_GetSalesOffer.Where(x=>x.CompCode == comCode && x.BraCode == BraCode).ByIndex(SessionManager.PageIndex, "OfferID");
            return Shared.JsonObject(model);
        }

        public JsonResult GetByID(int? _OfferID)
        {
            var model = db.PQ_GetSalesOffer.Where(f => f.OfferID == _OfferID).First();
            return Shared.JsonObject(model);
        }

        public JsonResult GetModelCount()
        {
            throw new NotImplementedException();
        }

        public JsonResult Insert(P_TR_SalesOffer entity)
        {
            throw new NotImplementedException();
        }

        public JsonResult InsertAll(P_TR_SalesOffer master, string json)
        {
            throw new NotImplementedException();
        }

        // GET: OfferCostEstimation
        public ActionResult OfferCostEstimationIndex()
        {
            SessionManager.PageIndex = 0;
            SessionManager.ModelCount = db.P_TR_SalesOffer.Where(x => x.CompCode == comCode && x.BraCode == BraCode).Count();
            return View(Path.OfferCostEstimation);
        }

        public JsonResult OnSearchSelect(string id)
        {
            throw new NotImplementedException();
        }

        public JsonResult Undo()
        {
            throw new NotImplementedException();
        }

        public JsonResult Update(string JsonData)
        {
            M_D_CostEstimation obj = JsonConvert.DeserializeObject<M_D_CostEstimation>(JsonData);
            M_D_CostEstimation _M_D_CostEstimation = new M_D_CostEstimation();
            _M_D_CostEstimation.P_TR_SalesOffer = obj.P_TR_SalesOffer;
            _M_D_CostEstimation.P_Tr_SalesOfferStageItem = obj.P_Tr_SalesOfferStageItem as List<P_Tr_SalesOfferStageItem>;
            _M_D_CostEstimation.P_Tr_SalesOfferStageItemActivity = obj.P_Tr_SalesOfferStageItemActivity as List<P_Tr_SalesOfferStageItemActivity>;

            var result = db.P_TR_SalesOffer.UpdateMasterManyDetails(_M_D_CostEstimation.P_TR_SalesOffer, _M_D_CostEstimation);
            if (result.ResponseState == true)
            {
                SessionManager.ModelCount = db.P_TR_SalesOffer.Where(x => x.CompCode == comCode && x.BraCode == BraCode).Count();
            }
            return Shared.JsonObject(result);
        }
        public JsonResult test()
        {
            var res = db.P_TR_SalesOffer.First();
            return Shared.JsonObject(res);
        }
        public JsonResult UpdateStatus(P_TR_SalesOffer entity)
        {
            var result = db.P_TR_SalesOffer.UpdateEntity(entity);
            if (result.ResponseState == true)
            {
                //SessionManager.ModelCount = db.B_D_Employee.Count();
                //SessionManager.PageIndex = 0;
            }
            return Shared.JsonObject(result);
        }
        private string ControllerName<T>()
        {
            return typeof(T).Name + "/";
        }
        // Custom Actions
        public JsonResult getStandadRatios()
        {
            var result = db.P_Control.First();
            return Shared.JsonObject(result);
        }
        public JsonResult getActivity(int id)
        {
            var result = db.P_D_Activity.Where(x => x.ActivityID ==id).First();
            return Shared.JsonObject(result);
        }

        public JsonResult FindItem(int id)
        {
            var result = db.IQ_SrchItem.Where(x => x.ItemID == id).First();
            return Shared.JsonObject(result);
        }

        public JsonResult Insert(string JsonData)
        {
            throw new NotImplementedException();
        }

        public void CostCalcolation(int _Id)
        {
            SystemTools sys = new SystemTools();
            sys.CostCalcolation(_Id);
         }

        public JsonResult loadSatgeItems(int id)
        {
            var result = db.PQ_GetSlsOfferStageItem.OrderBy(x=>x.LineCode).Where(x => x.OfferID == id).Result();
            return Shared.JsonObject(result);
        }

        public JsonResult loadSatgeItemsActivity(int id)
        {
            var result = db.PQ_GetSlsOfferActivity.Where(x => x.OfferID == id).Result();
            return Shared.JsonObject(result);
        }
    }
}