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
    public class CustomerCategoryController : Controller
    {

        DbEntities db = new DbEntities();
        int comCode = int.Parse(SessionManager.SessionRecord.CompCode);

        public JsonResult Add()
        {
            throw new NotImplementedException();
        }

        public JsonResult Delete(P_D_SalesCustomerCategory entity)
        {
            var result = db.P_D_SalesCustomerCategory.DeleteEntity(entity);
            if (result.ResponseState == true)
            {
                SessionManager.ModelCount = 0; //db.K_D_ExpCateg.Where(x => x.CompCode == comCode).Count();
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

        public JsonResult Insert(P_D_SalesCustomerCategory entity)
        {
            var result = db.P_D_SalesCustomerCategory.InsertEntity(entity);
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

        // GET: CustomerCategory
        public ActionResult CustomerCategoryIndex()
        {
            return View(Path.CustomerCategory);
        }

        

        public JsonResult OnSearchSelect(string id)
        {
            throw new NotImplementedException();
        }

        public JsonResult Undo()
        {
            throw new NotImplementedException();
        }

        public JsonResult Update(P_D_SalesCustomerCategory entity)
        {
            var result = db.P_D_SalesCustomerCategory.UpdateEntity(entity);
            if (result.ResponseState == true)
            {
                //SessionManager.ModelCount = db.B_D_Employee.Count();
                //SessionManager.PageIndex = 0;
            }
            return Shared.JsonObject(result);
        }

        // Load Classes
        public JsonResult getCustomerCategories()
        {
            var result = db.P_D_SalesCustomerCategory.Where(x => x.CompCode == comCode).Result();
            return Shared.JsonObject(result);
        }

        public ActionResult GetVatFromSalesCustomer(string _ChamberNo)
        {
            var _Result = db.P_D_SalesCustomer.Where(x => x.CompCode == comCode & x.ChamberNo == _ChamberNo).Count();
            return Json(_Result, JsonRequestBehavior.AllowGet);
        }
    }
}