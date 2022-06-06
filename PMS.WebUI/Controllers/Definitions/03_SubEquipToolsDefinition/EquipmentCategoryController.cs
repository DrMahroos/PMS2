using PMS.ServiceConnector.Models;
using PMS.ServiceConnector.Models.Entities;
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
    public class EquipmentCategoryController : Controller, IController<P_D_EquipmentClass>
    {
        DbEntities db = new DbEntities();
        public ActionResult EquipmentCategoryIndex()
        {
            return View(Path.EquipmentCategory);
        }

        public JsonResult LoadByEquipmentClass(int id)
        {
            var model = db.P_D_EquipmentClass
                .Where(f => f.EquipClassId == id)
                .Result();
            return Shared.JsonObject(model);
        }

        public JsonResult LoadEquipmentClassByCatId(int _Id)
        {
            var model = db.P_D_EquipmentClass.Where(f => f.EquipClassId == _Id).Result();
            return Shared.JsonObject(model);
        }

        public JsonResult GetByID(int id)
        {
            var model = db.P_D_EquipmentClass
                .Where(f => f.EquipClassId == id)
                .First();
            return Shared.JsonObject(model);
        }

        public JsonResult Insert(P_D_EquipmentClass entity)
        {
            entity.CompCode = int.Parse(SessionManager.SessionRecord.CompCode);
            var result = db.P_D_EquipmentClass.InsertEntity(entity);
            return Shared.JsonObject(result);
        }

        public JsonResult Update(P_D_EquipmentClass entity)
        {
            entity.CompCode = int.Parse(SessionManager.SessionRecord.CompCode);
            var result = db.P_D_EquipmentClass.UpdateEntity(entity);
            return Shared.JsonObject(result);
        }

        public JsonResult Delete(P_D_EquipmentClass entity)
        {
            int count1 = db.P_D_Equipment.Where(x => x.EquipClassId == entity.EquipClassId).Count();
            int count = db.P_D_ActivityEquipClass.Where(x => x.EquipClassId == entity.EquipClassId).Count();
            if (count > 0 || count1 > 0)
            {
                ResponseResult res = new ResponseResult();
                res.ResponseState = false;
                res.ResponseMessage = "Can't Delete because this item related another data";
                return Json(new { result = res }, JsonRequestBehavior.AllowGet);
            }
            var result = db.P_D_EquipmentClass.DeleteEntity(entity);
            return Shared.JsonObject(result);
        }
        public JsonResult GetEquipmentClass()
        {
            var result = db.P_D_EquipmentClass.Result();
            return Shared.JsonObject(result);
        }
        #region UnUsed
        public JsonResult Add()
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

        public JsonResult OnSearchSelect(string id)
        {
            throw new NotImplementedException();
        }

        public JsonResult Undo()
        {
            throw new NotImplementedException();
        }

        public JsonResult InsertAll(P_D_EquipmentClass master, string json)
        {
            throw new NotImplementedException();
        }

        public JsonResult DeleteAll(string json)
        {
            throw new NotImplementedException();
        }
        #endregion
    }
}