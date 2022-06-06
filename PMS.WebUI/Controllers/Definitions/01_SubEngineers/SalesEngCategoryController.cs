using PMS.ServiceConnector.Models;
using PMS.ServiceConnector.Tools;
using PMS.WebUI.Filter;
using PMS.WebUI.Tools;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace PMS.WebUI.Controllers.Definitions
{
    [AuthorizeUserAttribute()]
    public class SalesEngCategoryController : Controller, IController<P_D_SalesEngCateory>
    {
        DbEntities db = new DbEntities();
        int comCode = int.Parse(SessionManager.SessionRecord.CompCode);
        public JsonResult Add()
        {
            throw new NotImplementedException();
        }

        public JsonResult Delete(P_D_SalesEngCateory entity)
        {
            int count = db.P_D_SalesEgineer.Where(x => x.SalesEngCategoryId == entity.SalesEngCategoryId).Count();
            if (count > 0)
            {
                ResponseResult res = new ResponseResult();
                res.ResponseState = false;
                res.ResponseMessage = "Can't Delete";
                return Json(new { result = res }, JsonRequestBehavior.AllowGet);
            }
            var result = db.P_D_SalesEngCateory.DeleteEntity(entity);
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

        public JsonResult GetByIndex(int? index = default(int?))
        {
            throw new NotImplementedException();
            //var model = db.P_D_SiteEngCategory.Where(x => x.CompCode == comCode).ByIndex(SessionManager.PageIndex);
            //return Shared.JsonObject(model);
        }

        public JsonResult GetModelCount()
        {
            throw new NotImplementedException();
        }

        public JsonResult Insert(P_D_SalesEngCateory entity)
        {
            var result = db.P_D_SalesEngCateory.InsertEntity(entity);
            if (result.ResponseState == true)
            {
                //SessionManager.ModelCount = db.P_D_SiteEngCategory.Count();
                //SessionManager.PageIndex = 0;
            }
            return Shared.JsonObject(result);
        }

        public JsonResult InsertAll(P_D_SalesEngCateory master, string json)
        {
            throw new NotImplementedException();
        }

        public JsonResult OnSearchSelect(string id)
        {
            throw new NotImplementedException();
        }

        // GET: SalesEngCategory
        public ActionResult SalesEngCategoryIndex()
        {
            if (SessionManager.Me == null)
                return RedirectToAction("LoginIndex", "login");
            //SessionManager.PageIndex = 0;
            //SessionManager.ModelCount = db.P_D_SiteEngCategory.Where(x => x.CompCode == comCode).Count(); ;
            return View(Path.SalesEngCategory);
        }

        public JsonResult Undo()
        {
            throw new NotImplementedException();
        }

        public JsonResult Update(P_D_SalesEngCateory entity)
        {
            var result = db.P_D_SalesEngCateory.UpdateEntity(entity);
            //if (result.ResponseState == true)
            //{
            //    //SessionManager.ModelCount = db.P_D_SiteEngCategory.Count();
            //    //SessionManager.PageIndex = 0;
            //}
            return Shared.JsonObject(result);
        }
        public JsonResult getSalesEngCateory()
        {
            var result = db.P_D_SalesEngCateory.Result();
            return Shared.JsonObject(result);
        }
    }
}