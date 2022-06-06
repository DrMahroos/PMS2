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

namespace PMS.WebUI.Controllers.ResourceManagement._03_Labor
{
    public class LaborAssignController : Controller, IMasterManyDetails<P_Tr_ResRequestLabour>
    {
        DbEntities db = new DbEntities();
        int comCode = int.Parse(SessionManager.SessionRecord.CompCode);
        int braCode = int.Parse(SessionManager.SessionRecord.BranchCode);
        // GET: LaborAssign
        public ActionResult LaborAssignIndex()
        {
            SessionManager.PageIndex = 0;
            SessionManager.ModelCount = db.PQ_GetResRequestLabours.Where(x => x.CompCode == comCode && x.BraCode == braCode).Count();
            return View(Path.LaborAssign);
        }
        
        public JsonResult GetByIndex(int? index = null)
        {
            var model = db.PQ_GetResRequestLabours.Where(x => x.CompCode == comCode && x.BraCode == braCode).ByIndex(SessionManager.PageIndex, "RequestLabourId");
            return Shared.JsonObject(model);
        }

        public JsonResult Insert(string JsonData)
        {
            throw new NotImplementedException();
        }

        public JsonResult Update(string JsonData)
        {
            M_D_LaborAssign obj = JsonConvert.DeserializeObject<M_D_LaborAssign>(JsonData);
            M_D_LaborAssign _MasterDetailsLabors = new M_D_LaborAssign();
            _MasterDetailsLabors.P_Tr_ResRequestLabour = obj.P_Tr_ResRequestLabour;
            _MasterDetailsLabors.P_TR_EngScheduleLabor = obj.P_TR_EngScheduleLabor as List<P_TR_EngScheduleLabor>;
            
            var result = db.P_Tr_ResRequestLabour.UpdateMasterManyDetails(_MasterDetailsLabors.P_Tr_ResRequestLabour, _MasterDetailsLabors.P_TR_EngScheduleLabor);
            if (result.ResponseState == true)
            {
                SessionManager.ModelCount = db.P_Tr_ResRequestLabour.Where(x => x.CompCode == comCode && x.BraCode == braCode).Count();
            }
            return Shared.JsonObject(result);
        }

        public JsonResult GetLaborRequest(int id)
        {
            var result = db.PQ_GetResRequestLabours.Where(x => x.RequestLabourId == id).First();
            return Shared.JsonObject(result);
        }

        public JsonResult GetLaborList(int id)
        {
            var result = db.PQ_GetResLabourAssign.Where(x => x.ScheduleId == id).Result();
            return Shared.JsonObject(result);
        }
        public JsonResult GetClassesList(int id)
        {
            var result = db.PQ_GetEngWorkSchduleLaborClass.Where(x => x.ScheduleId == id).Result();
            return Shared.JsonObject(result);
        }
        public JsonResult GetLaborClass(int id)
        {
            var result = db.P_D_LaborClass.Where(x => x.LaborClassId == id).First();
            return Shared.JsonObject(result);
        }
        public JsonResult GetLaborCategory(int id)
        {
            var result = db.P_D_LaborCategory.Where(x => x.LaborCategoryId == id).First();
            return Shared.JsonObject(result);
        }

        public JsonResult PProc_ResGetFreeLabor(int bra, string FromDate, string ToDate, int? Classid, int? Catid)
        {
            RestClient rest = new RestClient();
            Dictionary<string, string> dictionary = new Dictionary<string, string>();
            DateTime dtFromDate = Convert.ToDateTime(FromDate);
            DateTime dtToDate = Convert.ToDateTime(ToDate);
            dictionary.Add("bra", braCode.ToString());
            dictionary.Add("FromDate", dtFromDate.ToString());
            dictionary.Add("ToDate", dtToDate.ToString());
            dictionary.Add("Classid", Classid.ToString());
            dictionary.Add("Catid", Catid.ToString());
            string _JsonResult = rest.Get<string>("P_Tr_ResRequestLabour", "PProc_ResGetFreeLabor", dictionary);
            var _Result = JsonConvert.DeserializeObject<List<PProc_ResGetFreeLabor_Result>>(_JsonResult);
            return Json(new { result = _Result }, JsonRequestBehavior.AllowGet);
        }

        public JsonResult UpdateLabourProjectPhase(int id, int? projectid, int? ProjectPhaseId)
        {
            var labor = db.P_D_Labor.Where(x => x.LaborID == id).First();
            labor.ProjectID = projectid;
            labor.PhaseId = ProjectPhaseId;
            var result = db.P_D_Labor.UpdateEntity(labor);
            if (result.ResponseState == true)
            {
                //SessionManager.ModelCount = db.P_D_Labor.Count();
                //SessionManager.PageIndex = 0;
            }
            return Shared.JsonObject(result);
        }

        #region
        public JsonResult Add()
        {
            throw new NotImplementedException();
        }

        public JsonResult Delete(P_Tr_ResRequestLabour entity)
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
        public JsonResult InsertAll(P_Tr_ResRequestLabour master, string json)
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
        
        #endregion
    }
}