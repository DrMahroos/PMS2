using PMS.ServiceConnector.Models;
using PMS.ServiceConnector.Tools;
using PMS.WebUI.Filter;
using PMS.WebUI.Tools;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace PMS.WebUI.Controllers.Sales._01_SalesDataLibrary
{
    [AuthorizeUserAttribute()]
    public class SalesPaymentTermsController : Controller
    {

        DbEntities db = new DbEntities();
        int comCode = int.Parse(SessionManager.SessionRecord.CompCode);

        public JsonResult Add()
        {
            throw new NotImplementedException();
        }

        public JsonResult Delete(P_D_SalesPaymentTerms entity)
        {
            var result = db.P_D_SalesPaymentTerms.DeleteEntity(entity);
            if (result.ResponseState == true)
            {
                SessionManager.ModelCount = 0;
                SessionManager.PageIndex = 0;
            }
            return Shared.JsonObject(result);
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
            throw new NotImplementedException();
        }

        public JsonResult GetModelCount()
        {
            throw new NotImplementedException();
        }

        public JsonResult Insert(P_D_SalesPaymentTerms entity)
        {
            var result = db.P_D_SalesPaymentTerms.InsertEntity(entity);
            if (result.ResponseState == true)
            {
                //SessionManager.ModelCount = db.K_D_Shift.Count();
                //SessionManager.PageIndex = 0;
            }
            return Shared.JsonObject(result);
        }

        public JsonResult InsertAll(P_D_SalesCustomerCategory master, string json)
        {
            throw new NotImplementedException();
        }

        // GET: CustomerRespItems
        public ActionResult SalesPaymentTermsIndex()
        {
            return View(Path.SalesPaymentTerms);
        }

        public JsonResult OnSearchSelect(string id)
        {
            throw new NotImplementedException();
        }

        public JsonResult Undo()
        {
            throw new NotImplementedException();
        }

        public JsonResult Update(P_D_SalesPaymentTerms entity)
        {
            var result = db.P_D_SalesPaymentTerms.UpdateEntity(entity);
            if (result.ResponseState == true)
            {
                //SessionManager.ModelCount = db.B_D_Employee.Count();
                //SessionManager.PageIndex = 0;
            }
            return Shared.JsonObject(result);
        }

        // Load Classes
        public JsonResult getSalesResponsibilities()
        {
            var result = db.P_D_SalesPaymentTerms.Where(x => x.CompCode == comCode ).Result();
            return Shared.JsonObject(result);
        }
    }
}