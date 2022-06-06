using PMS.ServiceConnector.Models;
using PMS.ServiceConnector.Tools;
using PMS.WebUI.Filter;
using PMS.WebUI.Tools;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace PMS.WebUI.Controllers
{
    [AuthorizeUserAttribute()]
    public class ExpensesCategoryController : Controller, IController<P_D_ExpencesCategory>
    {
        DbEntities db = new DbEntities();
        int comCode = int.Parse(SessionManager.SessionRecord.CompCode);

        public JsonResult Add()
        {
            throw new NotImplementedException();
        }

        public JsonResult Delete(P_D_ExpencesCategory entity)
        {
            int count = db.P_D_Expences.Where(x => x.ExpCatID == entity.ExpCatID).Count();
            if (count > 0)
            {
                ResponseResult res = new ResponseResult();
                res.ResponseState = false;
                res.ResponseMessage = "Can't Delete because this item related another data";
                return Json(new { result = res }, JsonRequestBehavior.AllowGet);
            }
            var result = db.P_D_ExpencesCategory.DeleteEntity(entity);
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

        // GET: ExpensesCategory
        public ActionResult ExpensesCategoryIndex()
        {
            return View(Path.ExpensesCategory);
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

        public JsonResult Insert(P_D_ExpencesCategory entity)
        {
            var result = db.P_D_ExpencesCategory.InsertEntity(entity);
            if (result.ResponseState == true)
            {
                //SessionManager.ModelCount = db.K_D_Shift.Count();
                //SessionManager.PageIndex = 0;
            }
            return Shared.JsonObject(result);
        }

        public JsonResult InsertAll(P_D_ExpencesCategory master, string json)
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

        public JsonResult Update(P_D_ExpencesCategory entity)
        {
            var result = db.P_D_ExpencesCategory.UpdateEntity(entity);
            if (result.ResponseState == true)
            {
                //SessionManager.ModelCount = db.B_D_Employee.Count();
                //SessionManager.PageIndex = 0;
            }
            return Shared.JsonObject(result);
        }

        // Load ExpencesCategory
        public JsonResult getExpencesCategory()
        {
            var result = db.P_D_ExpencesCategory.Where(x => x.CompCode == comCode).Result();
            return Shared.JsonObject(result);
        }
    }
}