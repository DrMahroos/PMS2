using Newtonsoft.Json;
using PMS.ServiceConnector.Models;
using PMS.ServiceConnector.Models.Entities;
using PMS.ServiceConnector.Tools;
using PMS.WebUI.Models.CustomModels;
using PMS.WebUI.Tools;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace PMS.WebUI.Controllers.ResourceManagement._02_Equipment
{
    public class EquipmentAssignController : Controller, IMasterManyDetails<P_TR_ResRequestEquipment>
    {
        DbEntities db = new DbEntities();
        int comCode = int.Parse(SessionManager.SessionRecord.CompCode);
        int braCode = int.Parse(SessionManager.SessionRecord.BranchCode);
        
        // GET: EquipmentAssign
        public ActionResult EquipmentAssignIndex()
        {
            SessionManager.PageIndex = 0;
            SessionManager.ModelCount = db.P_TR_ResRequestEquipment.Where(x => x.CompCode == comCode && x.BraCode == braCode).Count();

            return View(Path.EquipmentAssign);
        }
        public JsonResult GetByIndex(int? index = null)
        {
            var model = db.PQ_GetResRequestEquipment.Where(x => x.CompCode == comCode && x.BraCode == braCode).ByIndex(SessionManager.PageIndex, "RequestEquipmentId");
            return Shared.JsonObject(model);
        }

        public JsonResult GetSchdualeNum(int schduleId)
        {
            var res = db.PQ_GetEngWorkSchdule.Where(x => x.ScheduleId == schduleId).First();
            return Shared.JsonObject(res);
        }

        public JsonResult GetLaborCategory(int id)
        {
            var res = db.P_D_LaborCategory.Where(x => x.LaborCategoryId == id).First();
            return Shared.JsonObject(res);
        }
        public JsonResult Insert(string JsonData)
        {
            throw new NotImplementedException();
        }

        public JsonResult Update(string JsonData)
        {
            M_D_EquipAssign obj = JsonConvert.DeserializeObject<M_D_EquipAssign>(JsonData);
            M_D_EquipAssign _MasterDetailsEquip = new M_D_EquipAssign();
            _MasterDetailsEquip.P_TR_ResRequestEquipment = obj.P_TR_ResRequestEquipment;
            _MasterDetailsEquip.P_TR_EngScheduleEquip = obj.P_TR_EngScheduleEquip as List<P_TR_EngScheduleEquip>;

            var result = db.P_TR_ResRequestEquipment.UpdateMasterManyDetails(_MasterDetailsEquip.P_TR_ResRequestEquipment, _MasterDetailsEquip.P_TR_EngScheduleEquip);
            if (result.ResponseState == true)
            {
                SessionManager.ModelCount = db.P_TR_ResRequestEquipment.Where(x => x.CompCode == comCode && x.BraCode == braCode).Count();
            }
            return Shared.JsonObject(result);
        }

        public JsonResult GetEquipmentRequest(int id)
        {
            var result = db.PQ_GetResRequestEquipment.Where(x => x.RequestEquipmentId == id).First();
            return Shared.JsonObject(result);
        }

        public JsonResult GetEquipList(int id)
        {
            var result = db.PQ_GetResEquipAssign.Where(x => x.ScheduleId == id).Result();
            return Shared.JsonObject(result);
        }

        public JsonResult GetClassesList(int id)
        {
            var result = db.PQ_GetEngWorkSchduleEquipClass.Where(x => x.ScheduleId == id).Result();
            return Shared.JsonObject(result);
        }

        public JsonResult GetEquipClass(int id)
        {
            var result = db.P_D_EquipmentClass.Where(x => x.EquipClassId == id).First();
            return Shared.JsonObject(result);
        }
        public JsonResult UpdateEquipProjectPhase(int id, int? projectid, int? ProjectPhaseId)
        {
            var equip = db.P_D_Equipment.Where(x => x.EquimentID == id).First();
            equip.ProjectID = projectid;
            equip.PhaseId = ProjectPhaseId;
            var result = db.P_D_Equipment.UpdateEntity(equip);
            if (result.ResponseState == true)
            {
                //SessionManager.ModelCount = db.P_D_Labor.Count();
                //SessionManager.PageIndex = 0;
            }
            return Shared.JsonObject(result);
        }

        public JsonResult PProc_ResGetFreeEquip(int bra, string FromDate, string ToDate, int? Classid)
        {
            RestClient rest = new RestClient();
            Dictionary<string, string> dictionary = new Dictionary<string, string>();
            DateTime dtFromDate = Convert.ToDateTime(FromDate);
            DateTime dtToDate = Convert.ToDateTime(ToDate);
            dictionary.Add("bra", braCode.ToString());
            dictionary.Add("FromDate", dtFromDate.ToString());
            dictionary.Add("ToDate", dtToDate.ToString());
            dictionary.Add("Classid", Classid.ToString());
            string _JsonResult = rest.Get<string>("P_TR_ResRequestEquipment", "PProc_ResGetFreeEquip", dictionary);
            var _Result = JsonConvert.DeserializeObject<List<PProc_ResGetFreeEquip_Result>>(_JsonResult);
            return Json(new { result = _Result }, JsonRequestBehavior.AllowGet);
        }
        #region
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

        public JsonResult Find()
        {
            throw new NotImplementedException();
        }
        #endregion
    }
}