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

namespace PMS.WebUI.Controllers.Sales._03_SalesOperations
{
    public class OfferBillingScheduleController : Controller, IController<P_TR_SalesOffer>
    {
        DbEntities db = new DbEntities();
        int compcode = int.Parse(SessionManager.SessionRecord.CompCode);
        int braCode = int.Parse(SessionManager.SessionRecord.BranchCode);

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
            var model = db.PQ_GetSalesOffer.Where(x=> x.CompCode == compcode && x.BraCode == braCode).ByIndex(SessionManager.PageIndex, "OfferID");
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

        // GET: OfferBillingSchedule
        public ActionResult OfferBillingScheduleIndex()
        {
            Session["SlsOffer"] = new List<PQ_GetSlsOfferBilling>();
            SessionManager.PageIndex = 0;
            SessionManager.ModelCount = db.P_TR_SalesOffer.Where(x => x.CompCode == compcode && x.BraCode == braCode).Count();

            return View(Path.OfferBillingSchedule);
        }

        public void AssignDetails(PQ_GetSlsOfferBilling obj)
        {
            List<PQ_GetSlsOfferBilling> lst = Session["SlsOffer"] as List<PQ_GetSlsOfferBilling>;
            lst.Add(obj);
            Session["SlsOffer"] = lst;
        }

        public JsonResult OnSearchSelect(string id)
        {
            throw new NotImplementedException();
        }

        public JsonResult Undo()
        {
            throw new NotImplementedException();
        }

        //public JsonResult Update(P_TR_SalesOffer entity)
        //{
        //    List<PQ_GetSlsOfferBilling> details = Session["SlsOffer"] as List<PQ_GetSlsOfferBilling>;
        //    var result = db.P_TR_SalesOffer.UpdateMasterDetails(entity, details);
        //    if (result.ResponseState == true)
        //    {
        //        SessionManager.ModelCount = db.P_TR_SalesOffer.Count();
        //        SessionManager.PageIndex = 0;
        //    }
        //    return Shared.JsonObject(result);
        //}

        public JsonResult UpdateBilling(string JsonData)
        {
            M_D_OfferDefDetails obj = JsonConvert.DeserializeObject<M_D_OfferDefDetails>(JsonData);
            M_D_OfferDefDetails _M_D_Off = new M_D_OfferDefDetails();
            _M_D_Off.P_TR_SalesOffer = obj.P_TR_SalesOffer;
            _M_D_Off.P_Tr_SalesOfferBilling = obj.P_Tr_SalesOfferBilling as List<P_Tr_SalesOfferBilling>;
       
            var result = db.P_TR_SalesOffer.UpdateMasterManyDetails(_M_D_Off.P_TR_SalesOffer, _M_D_Off.P_Tr_SalesOfferBilling);
            if (result.ResponseState == true)
            {
                SessionManager.ModelCount = db.P_TR_SalesOffer.Where(x => x.CompCode == compcode && x.BraCode == braCode).Count();
            }
            return Shared.JsonObject(result);
        }

        public JsonResult getItems(int offerId)
        {
            var result = db.PQ_Sales_SrchOfferItem.Where(x=>x.OfferID == offerId).Result();
            return Shared.JsonObject(result);
        }

        public JsonResult LoadDetails(int id)
        {
            var result = db.PQ_GetSlsOfferBilling.Where(x => x.OfferID == id).Result();
            return Shared.JsonObject(result);
        }

        public JsonResult LoadData(int id)
        {
            var result = db.PQ_GetSalesOffer.Where(x => x.OfferID == id).First();
            return Shared.JsonObject(result);
        }

        public JsonResult Update(P_TR_SalesOffer entity)
        {
            throw new NotImplementedException();
        }
    }
}