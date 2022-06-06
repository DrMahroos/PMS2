using PMS.ServiceConnector.Models;
using PMS.ServiceConnector.Tools;
using PMS.WebUI.Tools;
using System.Collections.Generic;
using System.Web.Mvc;
using System;
using PMS.ServiceConnector.Models.Entities.CustomEntities;
using PMS.WebUI.Filter;
using Newtonsoft.Json;
using PMS.WebUI.Models.CustomModels;
using PMS.ServiceConnector.Models.Entities;

namespace PMS.WebUI.Controllers.Sales._02_ProductionAndBilling
{
    [AuthorizeUserAttribute()]
    public class CustomerDbCrController : Controller, IMasterManyDetails<P_TR_SalesDbCr>
    {
        DbEntities db = new DbEntities();
        int comCode = int.Parse(SessionManager.SessionRecord.CompCode);
        int BraCode = int.Parse(SessionManager.SessionRecord.BranchCode);

        // GET: CustomerBilling
        public ActionResult CustomerDbCrIndex()
        {
            SessionManager.PageIndex = 0;
            SessionManager.ModelCount = db.PQ_GetSalesDbCr.Where(x => x.CompCode == comCode && x.BraCode == BraCode).Count();
            return View(Path.CustomerDbCr);
        }

        public JsonResult GetByIndex(int? index = default(int?))
        {
            //var model = db.PQ_GetSalesDbCr.Where(x => x.CompCode == comCode && x.BraCode == BraCode).ByIndex(SessionManager.PageIndex, "invoiceId");
            var model = db.PQ_GetSalesDbCr.Where(x => x.CompCode == comCode && x.BraCode == BraCode).ByIndex(SessionManager.PageIndex, "InvoiceId");

 
             return Shared.JsonObject(model);
        }

        public JsonResult Insert(string JsonData)
        {
        //    M_D_CustomerDbCr obj = JsonConvert.DeserializeObject<M_D_CustomerDbCr>(JsonData);
           //var result = db.P_TR_SalesDbCr.InsertMasterManyDetails(obj.P_TR_SalesDbCr, obj);
        //    if (result.ResponseState == true)
        //    {
        //        SessionManager.ModelCount = db.PQ_GetSalesInvoice.Where(x => x.CompCode == comCode && x.BraCode == BraCode).Count();
        //    }
            return Shared.JsonObject("");
        }

        public JsonResult Update(string JsonData)
        {
        //    M_D_CustomerDbCr obj = JsonConvert.DeserializeObject<M_D_CustomerDbCr>(JsonData);
        //    var result = db.P_TR_SalesDbCr.UpdateMasterManyDetails(obj.P_TR_SalesDbCr, obj);
        //    if (result.ResponseState == true)
        //    {
        //        SessionManager.ModelCount = db.PQ_GetSalesInvoice.Where(x => x.CompCode == comCode && x.BraCode == BraCode).Count();
        //    }
            return Shared.JsonObject("");
        }

        public JsonResult LoadProdDetails(int id)
        {
            var result = db.PQ_GetSalesInvoiceProd.Where(x => x.InvoiceId == id).Result();
            return Shared.JsonObject(result);
        }
        public JsonResult LoadInvoiceDetails(int id)
        {
            var result = db.PQ_GetSalesDbCrDetail.Where(x => x.InvoiceId == id).Result();
            return Shared.JsonObject(result);
        }

        public JsonResult LoadInvoiceDetailsser(int id)
        {
            var result = db.PQ_GetSalesInvoiceDetail.Where(x => x.InvoiceId == id).Result();
            return Shared.JsonObject(result);
        }
        public JsonResult GetProject(int id)
        {
            var result = db.PQ_GetEngProject.Where(c => c.ProjectID == id).First();
            return Shared.JsonObject(result);
        }

        public JsonResult GetVatPrcFromPControl()
        {
            var result = db.P_Control.First().VatPrc;
            return Shared.JsonObject(result);
        }
        public JsonResult GetCustomerBill(int id)
        {
            var result = db.P_TR_SalesDbCr.Where(c => c.InvoiceId == id).First();
            return Shared.JsonObject(result);
        }
        public JsonResult GetP_TR_SalesDbCrTrNo(int TrNo,int CompCode, int BraCode)
        {
            var result = db.PQ_GetSalesDbCr.Where(c => c.TrNo == TrNo &&c.CompCode== CompCode&&c.BraCode== BraCode).First();
            return Shared.JsonObject(result);
        }
        public JsonResult GetProjectbaycode(string ProjCode, int CompCode, int BraCode)
        {
            var result = db.PQ_GetEngProject.Where(c => c.ProjectCode == ProjCode&&c.CompCode== CompCode&&c.BraCode== BraCode).First();
            return Shared.JsonObject(result);
        }
        public JsonResult GetCustomerBillTrNo(int TrNo, int CompCode, int BraCode)
        {
            var result = db.PQ_GetSalesInvoice.Where(c => c.TrNo == TrNo && c.CompCode == CompCode && c.BraCode == BraCode).First();
            return Shared.JsonObject(result);
        }
        public JsonResult Proc_prnt_sls_invoices(int id/*, int CompCode, int LoginUser*/)
        {
 
            RestClient rest = new RestClient();
            Dictionary<string, string> dictionary = new Dictionary<string, string>();
            //dictionary.Add("bra", braCode.ToString());
            //dictionary.Add("bra", CompCode.ToString());
            dictionary.Add("id", id.ToString());
            //dictionary.Add("CompCode", CompCode.ToString());
           /// dictionary.Add("LoginUser", LoginUser.ToString());
            string _JsonResult = rest.Get<string>("P_TR_SalesDbCr", "Proc_prnt_sls_invoice", dictionary);
            var _Result = JsonConvert.DeserializeObject<List<PProc_Prnt_sls_Invoice_Result>>(_JsonResult);
            return Json(new { result = _Result }, JsonRequestBehavior.AllowGet);

        }
        public JsonResult SearchProjectItem(int id)
        {
            var result = db.PQ_GetEngProjectItem.Where(c => c.ProjectPhaseItemId == id).First();
            return Shared.JsonObject(result);
        }
        // Call Stored Procedures

        public JsonResult LoadProdutionList(int projId)
        {
            var res = db.PQ_GetSalesFillInvoiceProd.Where(x => x.Prod_ProjectID == projId).Result();
            return Shared.JsonObject(res);
        }
        public JsonResult LoadInvoiceByProject(int id)
        {
            var result = db.PQ_GetSalesInvoice.Where(x => x.ProjectID == id).Result();
            return Shared.JsonObject(result);
        }
        public void LoadProdution(int invId, int projId)
        {
            RestClient rest = new RestClient();
            Dictionary<string, string> DicList = new Dictionary<string, string>();
            DicList.Add("invId", invId.ToString());
            DicList.Add("projId", projId.ToString());
            rest.Get<string>("P_TR_SalesDbCr", "LoadProdution", DicList);
        }
        public void UnAuthorize(int invId)
        {
            RestClient rest = new RestClient();
            Dictionary<string, string> DicList = new Dictionary<string, string>();
            DicList.Add("invId", invId.ToString());
            rest.Get<string>("P_TR_SalesDbCr", "UnAuthorize", DicList);
        }

        #region
        public JsonResult Add()
        {
            throw new NotImplementedException();
        }
        public JsonResult GetByID(int? id)
        {
            throw new NotImplementedException();
        }
        public JsonResult Delete(P_TR_SalesDbCr entity)
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

        public JsonResult InsertAll(P_TR_SalesDbCr master, string json)
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