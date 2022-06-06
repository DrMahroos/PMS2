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
    public class LaborCategoryController : Controller, IController<P_D_LaborCategory>
    {

        DbEntities db = new DbEntities();
        int comCode = int.Parse(SessionManager.SessionRecord.CompCode);

        public JsonResult Add()
        {
            throw new NotImplementedException();
        }

        public JsonResult Delete(P_D_LaborCategory entity)
        {

            int count = db.P_D_Labor.Where(x => x.LaborCategoryId == entity.LaborCategoryId).Count();
            if (count > 0)
            {
                ResponseResult res = new ResponseResult();
                res.ResponseState = false;
                res.ResponseMessage = "Can't Delete";
                return Json(new { result = res }, JsonRequestBehavior.AllowGet);
            }
            var result = db.P_D_LaborCategory.DeleteEntity(entity);
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

        public JsonResult Insert(P_D_LaborCategory entity)
        {
            var result = db.P_D_LaborCategory.InsertEntity(entity);
            if (result.ResponseState == true)
            {
                //SessionManager.ModelCount = db.K_D_Shift.Count();
                //SessionManager.PageIndex = 0;
            }
            return Shared.JsonObject(result);
        }

        public JsonResult InsertAll(P_D_LaborCategory master, string json)
        {
            throw new NotImplementedException();
        }

        // GET: LaborCategory
        public ActionResult LaborCategoryIndex()
        {
            return View(Path.LaborCategory);
        }

        public JsonResult OnSearchSelect(string id)
        {
            throw new NotImplementedException();
        }

        public JsonResult Undo()
        {
            throw new NotImplementedException();
        }

        public JsonResult Update(P_D_LaborCategory entity)
        {
            var result = db.P_D_LaborCategory.UpdateEntity(entity);
            if (result.ResponseState == true)
            {
                //SessionManager.ModelCount = db.B_D_Employee.Count();
                //SessionManager.PageIndex = 0;
            }
            return Shared.JsonObject(result);
        }

        ////////

        // Load Category
        public JsonResult getLaborCategory()
        {
            var result = db.P_D_LaborCategory.Where(x => x.CompCode == comCode).Result();
            return Shared.JsonObject(result);
        }
    }
}