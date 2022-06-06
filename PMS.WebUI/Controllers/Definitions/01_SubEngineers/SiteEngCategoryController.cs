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
    public class SiteEngCategoryController : Controller, IController<P_D_SiteEngCategory>
    {
        DbEntities db = new DbEntities();
        int comCode = int.Parse(SessionManager.SessionRecord.CompCode);
        //public JsonResult Load()
        //{
        //    var result = db.P_D_SiteEngCategory.Where(x => x.CompCode == comCode).Result();
        //    return Shared.JsonObject(result);
        //}
        public JsonResult Load()
        {
            var model = db.P_D_SiteEngCategory

                .Result();
            return Shared.JsonObject(model);
        }
        public JsonResult GetByID(int id)
        {
            var model = db.P_D_SiteEngCategory
                .Where(f => f.SiteEngCategoryId == id)
                .First();
            return Shared.JsonObject(model);
        }
        public JsonResult Add()
        {
            throw new NotImplementedException();
        }
        public JsonResult Insert(P_D_SiteEngCategory entity)
        {
            entity.CompCode = int.Parse(SessionManager.SessionRecord.CompCode);
            var result = db.P_D_SiteEngCategory.InsertEntity(entity);
            return Shared.JsonObject(result);
        }

        public JsonResult Update(P_D_SiteEngCategory entity)
        {
            entity.CompCode = int.Parse(SessionManager.SessionRecord.CompCode);
            var result = db.P_D_SiteEngCategory.UpdateEntity(entity);
            return Shared.JsonObject(result);
        }

        public JsonResult Delete(P_D_SiteEngCategory entity)
        {
            int count = db.P_D_SiteEngineer.Where(x => x.SiteEngCategoryId == entity.SiteEngCategoryId).Count();
            if (count > 0)
            {
                ResponseResult res = new ResponseResult();
                res.ResponseState = false;
                res.ResponseMessage = "Can't Delete";
                return Json(new { result = res }, JsonRequestBehavior.AllowGet);
            }
            var result = db.P_D_SiteEngCategory.DeleteEntity(entity);
            return Shared.JsonObject(result);
        }
        public JsonResult GetSiteEngById(int Id)
        {
            var result = db.P_D_SiteEngCategory.Where(f => f.SiteEngCategoryId == Id).Result();
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
        }

        public JsonResult GetModelCount()
        {
            throw new NotImplementedException();
        }



        public JsonResult InsertAll(P_D_SiteEngCategory master, string json)
        {
            throw new NotImplementedException();
        }

        public JsonResult OnSearchSelect(string id)
        {
            throw new NotImplementedException();
        }

        // GET: SiteEngCategory
        public ActionResult SiteEngCategoryIndex()
        {
            return View(Path.SiteEngCategory);
        }

        public JsonResult Undo()
        {
            throw new NotImplementedException();
        }


    }
}