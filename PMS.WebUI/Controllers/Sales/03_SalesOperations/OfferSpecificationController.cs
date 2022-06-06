using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using PMS.ServiceConnector.Models;
using PMS.ServiceConnector.Tools;
using PMS.WebUI.Filter;
using PMS.WebUI.Models.CustomModels;
using PMS.WebUI.Tools;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Web;
using System.Web.Mvc;


namespace PMS.WebUI.Controllers.Sales._03_SalesOperations
{
    [AuthorizeUserAttribute()]
    public class OfferSpecificationController : Controller, IMasterManyDetails<P_TR_SalesOffer>
    {
        DbEntities db = new DbEntities();
        int comCode = int.Parse(SessionManager.SessionRecord.CompCode);
        int BraCode = int.Parse(SessionManager.SessionRecord.BranchCode);
        // GET: OfferSpecification
        public ActionResult OfferSpecificationIndex()
        {
            SessionManager.PageIndex = 0;
            SessionManager.ModelCount = db.P_TR_SalesOffer.Where(x => x.CompCode == comCode && x.BraCode == BraCode).Count();
            return View(Path.OfferSpecification);
        }
        public JsonResult GetByIndex(int? index = default(int?))
        {
            var model = db.PQ_GetSalesOffer.Where(x => x.CompCode == comCode && x.BraCode == BraCode).ByIndex(SessionManager.PageIndex, "OfferID");
            return Shared.JsonObject(model);

        }
        public JsonResult Insert(string JsonData)
        {
            throw new NotImplementedException();
        }

        public JsonResult UpdateOffer(P_TR_SalesOffer entity)
        {
            var result = db.P_TR_SalesOffer.UpdateEntity(entity);
            if (result.ResponseState == true)
            {
                //SessionManager.ModelCount = db.B_D_Employee.Count();
                //SessionManager.PageIndex = 0;
            }
            return Shared.JsonObject(result);
        }

        public JsonResult Update(string JsonData)
        {
            RestClient rest = new RestClient();
            //M_D_OfferSpecification obj = JsonConvert.DeserializeObject<M_D_OfferSpecification>
            M_D_OfferSpecification obj = JsonConvert.DeserializeObject<M_D_OfferSpecification>(JsonData);
            P_TR_SalesOffer master = obj.P_TR_SalesOffer;
            var res = rest.Get<string>("P_TR_SalesOffer", "UpdateOfferSpecification"+ 1);
            //M_D_OfferSpecification obj = JsonConvert.DeserializeObject<M_D_OfferSpecification>(JsonData);
            ////Set Company Code and branch code
            ////obj.P_TR_SalesOffer.CompCode = comCode;
            ////obj.P_TR_SalesOffer.BraCode = BraCode;
            ////end Set Company Code and branch code
            ////var result = db.P_TR_SalesOffer.UpdateMasterManyDetails(obj.P_TR_SalesOffer, obj);
            ////if (result.ResponseState == true)
            ////    SessionManager.ModelCount = db.P_TR_SalesOffer.Where(x => x.CompCode == comCode && x.BraCode == BraCode).Count();
            return Shared.JsonObject(res);
        }
        public JsonResult Delete(P_TR_SalesOffer entity)
        {
            throw new NotImplementedException();
        }
        public JsonResult LoadDetails(int id)
        {
            M_D_OfferSpecificationView _View = new M_D_OfferSpecificationView();
            _View.PQ_GetSlsOfferStageItem = db.PQ_GetSlsOfferStageItem.Where(x => x.OfferID == id).OrderBy(x=>x.LineCode).Result();
            _View.PQ_GetSlsOfferActivity = db.PQ_GetSlsOfferActivity.Where(x => x.OfferID == id).Result();
            return Json(_View, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetByID(int? id)
        {
            var model = db.P_TR_SalesOffer.Where(f => f.OfferID == id).First();
            return Shared.JsonObject(model);
        }
        public JsonResult GetNewOfferId(int id, int typ)
        {
            RestClient rest = new RestClient();
            Dictionary<string, string> DicList = new Dictionary<string, string>();
            DicList.Add("OfferId", id.ToString());
            DicList.Add("typ", typ.ToString());
            var _result = rest.Get<int>("P_TR_SalesOffer", "GetNewOfferId", DicList);
            return Json(new { result = _result }, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetSalesOfferByCode(int Code)
        {
            var _Result = db.P_TR_SalesOffer.Where(o => o.TrNo == Code).First();
            return Shared.JsonObject(_Result);
        }
        public JsonResult GetResponsibility()
        {
            var _Result = db.P_D_SalesResponsibility.Where(X => X.CompCode == comCode).Result();
            return Shared.JsonObject(_Result);
        }
        public JsonResult GetPaymentTerms()
        {
            var _Result = db.P_D_SalesPaymentTerms.Where(X => X.CompCode == comCode).Result();
            return Shared.JsonObject(_Result);
        }
        public JsonResult GetScope()
        {
            var _Result = db.P_D_Scope.Where(X => X.CompCode == comCode).Result();
            return Json(new { result = _Result }, JsonRequestBehavior.AllowGet);
        }
        public JsonResult Print(int id)
        {
            Reports rep = new Reports();
            rep.AddParameter("IssueToCcReturnID", id);
            string result = rep.GetReportUrl("IssueToCcReturn_Order");
            return Shared.JsonObject(result);
        }
        //public JsonResult GetSalesItemsSystem(int ItemId)
        //{
        //    var _result = db.P_D_SalesItemsSystem.Where(x => x.ItemID == ItemId).Result();
        //    return Json(new { result = _result }, JsonRequestBehavior.AllowGet);
        //}

        //Activity function
        public JsonResult BuildOfferActivity(int OfferId)
        {
            RestClient res = new RestClient();
            var _Result = res.Get<int>("P_TR_SalesOffer", "BuildOfferActivity", "OfferId="+ OfferId.ToJsonString());
            return Json(new {result = _Result} ,JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetItemActivity(int OfferId)
        {
            var _result = db.P_Tr_SalesOfferStageItemActivity.Where(x => x.OfferID == OfferId).Result();
            return Json(new { result = _result }, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetActivity()
        {
            var _result = db.P_D_Activity.Result();
            return Json(new { result = _result }, JsonRequestBehavior.AllowGet);
        }
        public JsonResult InsetrActivity(P_Tr_SalesOfferStageItemActivity entity)
        {
            var _Result = db.P_Tr_SalesOfferStageItemActivity.InsertEntity(entity);
            return Json(new { result = _Result},JsonRequestBehavior.AllowGet);
        }
        public JsonResult UpdateActivity(P_Tr_SalesOfferStageItemActivity entity)
        {
            var _Result = db.P_Tr_SalesOfferStageItemActivity.UpdateEntity(entity);
            return Json(new { result = _Result }, JsonRequestBehavior.AllowGet);
        }
        public JsonResult DeleteActivity(P_Tr_SalesOfferStageItemActivity entity)
        {
            var _Result = db.P_Tr_SalesOfferStageItemActivity.DeleteEntity(entity);
            return Json(new { result = _Result }, JsonRequestBehavior.AllowGet);
        }

        public JsonResult DeleteRow(int id)
        {
            RestClient res = new RestClient();
            var _Result = res.Get<int>("P_Tr_SalesOfferStageItemActivity", "Delete", "id=" + id);
            return Json(new { result = _Result }, JsonRequestBehavior.AllowGet);
        }

        public JsonResult SearchActivity(int id)
        {
            var res = db.PQ_SrchActivity.Where(x=>x.ActivityID == id).First();
            return Shared.JsonObject(res);
        }

        #region Not Used
        public JsonResult Add()
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
        public JsonResult InsertAll(P_TR_SalesOffer master, string json)
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
        #endregion       
    }
}