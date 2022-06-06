using PMS.ServiceConnector.Models;
using PMS.ServiceConnector.Models.Entities;
using PMS.ServiceConnector.Tools;
using PMS.WebUI.Tools;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace PMS.WebUI.Controllers.ResourceManagement._02_Equipment
{
    public class EquipmentRequestController : Controller, IController<P_TR_ResRequestEquipment>
    {
        DbEntities db = new DbEntities();
        int comCode = int.Parse(SessionManager.SessionRecord.CompCode);
        int braCode = int.Parse(SessionManager.SessionRecord.BranchCode);
        
        // GET: EquipmentRequest
        public ActionResult EquipmentRequestIndex()
        {
            SessionManager.PageIndex = 0;
            SessionManager.ModelCount = db.P_TR_ResRequestEquipment.Where(x => x.CompCode == comCode && x.BraCode == braCode).Count();
            return View(Path.EquipmentRequest);
        }

        public JsonResult GetByIndex(int? index = null)
        {
            var model = db.PQ_GetResRequestEquipment.Where(x => x.CompCode == comCode && x.BraCode == braCode).ByIndex(SessionManager.PageIndex, "RequestEquipmentId");
            return Shared.JsonObject(model);
        }

        public JsonResult Insert(P_TR_ResRequestEquipment entity)
        {
            throw new NotImplementedException();
        }
        public JsonResult Update(P_TR_ResRequestEquipment entity)
        {
            throw new NotImplementedException();
        }
        public JsonResult GetEquipRequest(int id)
        {
            var result = db.P_TR_ResRequestEquipment.Where(x => x.RequestEquipmentId == id).First();
            return Shared.JsonObject(result);
        }
        public JsonResult GetEngSchedule(int id)
        {
            var result = db.PQ_GetEngWorkSchdule.Where(x => x.ScheduleId == id).First();
            return Shared.JsonObject(result);
        }
        public JsonResult LoadDetails(int id)
        {
            var result = db.PQ_GetEngWorkSchduleEquipClass.Where(x => x.ScheduleId == id).Result();
            return Shared.JsonObject(result);
        }

        #region
        public JsonResult InsertAll(P_TR_ResRequestEquipment master, string json)
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
        public JsonResult GetModelCount()
        {
            throw new NotImplementedException();
        }
        public JsonResult Add()
        {
            throw new NotImplementedException();
        }
        public JsonResult Delete(P_TR_ResRequestEquipment entity)
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
        #endregion
    }
}