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
    public class EquipmentDefinitionController : Controller, IController<P_D_Equipment>
    {
        DbEntities db = new DbEntities();
        int comCode = int.Parse(SessionManager.SessionRecord.CompCode);
        int BraCode = int.Parse(SessionManager.SessionRecord.BranchCode);
        public ActionResult EquipmentDefinitionIndex()
        {
            SessionManager.PageIndex = 0;
            SessionManager.ModelCount = db.P_D_Equipment.Where(x => x.CompCode == comCode && x.BraCode == BraCode).Count();
            return View(Path.EquipmentDefinition);
        }
        
        public JsonResult GetByID(int? _Id)
        {
            var model = db.P_D_Equipment.Where(f => f.EquimentID == _Id).First();
            return Shared.JsonObject(model);
        }

        public JsonResult Insert(P_D_Equipment entity)
        {
            var result = db.P_D_Equipment.InsertEntity(entity);
            if (result.ResponseState == true)
                SessionManager.ModelCount = db.P_D_Equipment.Where(x => x.CompCode == comCode && x.BraCode == BraCode).Count();
            return Shared.JsonObject(result);
        }

        public JsonResult Update(P_D_Equipment entity)
        {
            var result = db.P_D_Equipment.UpdateEntity(entity);
            return Shared.JsonObject(result);
        }

        public JsonResult Delete(P_D_Equipment entity)
        {
            var result = db.P_D_Equipment.DeleteEntity(entity);
            return Shared.JsonObject(result);
        }

        public JsonResult GetByIndex(int? index = default(int?))
        {
            var model = db.P_D_Equipment.Where(x => x.CompCode == comCode && x.BraCode == BraCode).ByIndex(SessionManager.PageIndex);
            return Shared.JsonObject(model);
        }

        public JsonResult GetEquipmentClassByuseId(int Id)
        {
            var result = db.P_D_EquipmentClass.Where(e => e.EquipClassId == Id).Result();
            return Shared.JsonObject(result);
        }

        public JsonResult GetEquipCode(int id)
        {
            var result = db.P_D_EquipmentClass.Where(e => e.EquipClassId == id).First();
            return Shared.JsonObject(result);
        }

        public JsonResult GetProjectAndPhase(int ProjectId)
        {
            var result = db.PQ_GetEngProjectPhase.Where(x => x.ProjectID == ProjectId).First();
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

        public JsonResult InsertAll(P_D_Equipment master, string json)
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