using PMS.ServiceConnector.Models;
using PMS.ServiceConnector.Models.Entities;
using PMS.ServiceConnector.Tools;
using PMS.WebUI.Tools;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace PMS.WebUI.Controllers.Sales._01_SalesDataLibrary
{
    public class CustomersController : Controller
    {
        DbEntities db = new DbEntities();
        int comCode = int.Parse(SessionManager.SessionRecord.CompCode);
        int BraCode = int.Parse(SessionManager.SessionRecord.BranchCode);
        // GET: Customers
        public ActionResult CustomersIndex()
        {
            SessionManager.PageIndex = 0;
            SessionManager.ModelCount = db.P_D_SalesCustomer.Where(x => x.CompCode == comCode).Count();
            return View(Path.Customers);
        }
        public JsonResult Insert(P_D_SalesCustomer entity)
        {
            var result = db.P_D_SalesCustomer.InsertEntity(entity);
            if (result.ResponseState == true)
            {
                SessionManager.ModelCount = db.P_D_SalesCustomer.Count();
                SessionManager.PageIndex = 0;
            }
            return Shared.JsonObject(result);
        }
        public JsonResult Update(P_D_SalesCustomer entity)
        {
            entity.CompCode = comCode;
            var result = db.P_D_SalesCustomer.UpdateEntity(entity);
            if (result.ResponseState == true)
            {
                SessionManager.ModelCount = db.P_D_SalesCustomer.Count();
                SessionManager.PageIndex = 0;
            }
            return Shared.JsonObject(result);
        }
        public JsonResult Delete(P_D_SalesCustomer entity)
        {
            var result = db.P_D_SalesCustomer.DeleteEntity(entity);
            if (result.ResponseState == true)
            {
                SessionManager.ModelCount = db.P_D_SalesCustomer.Count();
                SessionManager.PageIndex = 0;
            }
            return Shared.JsonObject(result);
        }
        public JsonResult GetByID(int? id)
        {
            var model = db.P_D_SalesCustomer.Where(f => f.CustomerID == id).First();
            return Shared.JsonObject(model);
        }
        public JsonResult GetByIndex(int? index = default(int?))
        {

            var model = db.P_D_SalesCustomer.Where(x => x.CompCode == comCode).ByIndex(SessionManager.PageIndex);


            return Shared.JsonObject(model);
        }
        public JsonResult LoadDetails(int id)
        {
            var _Result = db.PQ_GetEngProject.Where(x => x.CustomerID == id).Result();
            return Shared.JsonObject(_Result);
        }
        //custom functions
        public JsonResult getArea(int id)
        {
            var result = db.G_BRANCH.Where(x => x.BRA_CODE == id).First();
            return Shared.JsonObject(result);
        }
        public JsonResult getDco(int CustomerId)
        {
            var result = db.PQ_GetSalesCustomerDoc.Where(x => x.CustomerId == CustomerId).Result();
            return Shared.JsonObject(result);
        }
        public JsonResult GetCusType(string CusIDType)        {
            var result = db.P_D_Status.Where(x => x.StatusType == CusIDType).Result();
            return Shared.JsonObject(result);
        }
        public JsonResult getSalesEng(int id)
        {
            var result = db.P_D_SalesEgineer.Where(x => x.SalesEngineerId == id).First();
            return Shared.JsonObject(result);
        }
        public JsonResult CustomerCode(int _id)
        {
            var result = db.P_D_SalesCustomerCategory.Where(x => x.CustomerCategoryID == _id).First();
            return Shared.JsonObject(result);
        }
       
        public JsonResult GetVatFromSalesCustomer(string vatno , int custid )
        {
            var model = db.P_D_SalesCustomer.Where(x => x.VatNo == vatno && x.CompCode == comCode && x.CustomerID != custid ).First();
           
            return Shared.JsonObject(model);
        }
        public JsonResult GetCountCrNo(string CrNo)
        {
            var Result = db.P_D_SalesCustomer.Where(x => x.CrNo == CrNo && x.CompCode == comCode).Count();
            return Json(new { result = Result }, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetAllSalesCustomers()
        {
            var res = db.P_D_SalesCustomer.Where(x => x.CompCode == comCode).Result();
            return Shared.JsonObject(res);
        }
        public JsonResult GetByCrNo(string CrNo)
        {
            int _Count = db.P_D_SalesCustomer.Where(f => f.CrNo == CrNo && f.CompCode == comCode).Count();
            return Shared.JsonObject(_Count);
        }
        public JsonResult getNationalty()
        {
            var result = db.G_Nationality.Where(x => x.COMP_CODE == comCode).Result();
            return Shared.JsonObject(result);
        }
        public JsonResult GetByCode(int Code , string vatNo)
        {
            var model = db.P_D_SalesCustomer.Where(f => f.CustomerCode == Code && f.VatNo== vatNo).Result();
            return Shared.JsonObject(model);
        }
    }
}