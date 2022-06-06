using Newtonsoft.Json;
using PMS.ServiceConnector.Models;
using PMS.ServiceConnector.Tools;
using PMS.WebUI.Models.CustomModels;
using PMS.WebUI.Tools;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace PMS.WebUI.Controllers.Engineer._02_Operations
{
    public class WorkScheduleController : Controller, IMasterManyDetails<P_TR_EngSchedule>
    {
        DbEntities db = new DbEntities();
        int comCode = int.Parse(SessionManager.SessionRecord.CompCode);
        int BraCode = int.Parse(SessionManager.SessionRecord.BranchCode);

        public JsonResult GetByIndex(int? index = null)
        {
            var model = db.PQ_GetEngWorkSchdule.Where(x => x.CompCode == comCode && x.BraCode == BraCode).ByIndex(SessionManager.PageIndex, "ScheduleId");
            return Shared.JsonObject(model);
        }

        public JsonResult Update(string JsonData)
        {
            M_D_WorkSchdule obj = JsonConvert.DeserializeObject<M_D_WorkSchdule>(JsonData);
            M_D_WorkSchdule _MasterDetailsSchdule = new M_D_WorkSchdule();
            _MasterDetailsSchdule.P_TR_EngSchedule = obj.P_TR_EngSchedule;
            _MasterDetailsSchdule.P_TR_EngScheduleActiv = obj.P_TR_EngScheduleActiv as List<P_TR_EngScheduleActiv>;

            var result = db.P_TR_EngSchedule.UpdateMasterManyDetails(_MasterDetailsSchdule.P_TR_EngSchedule, _MasterDetailsSchdule);
            if (result.ResponseState == true)
            {
                SessionManager.ModelCount = db.P_TR_EngSchedule.Where(x => x.CompCode == comCode && x.BraCode == BraCode).Count();
            }
            return Shared.JsonObject(result);
        }

        public JsonResult Insert(string JsonData)
        {
            M_D_WorkSchdule obj = JsonConvert.DeserializeObject<M_D_WorkSchdule>(JsonData);
            M_D_WorkSchdule _MasterDetailsSchdule = new M_D_WorkSchdule();
            _MasterDetailsSchdule.P_TR_EngSchedule = obj.P_TR_EngSchedule;
            _MasterDetailsSchdule.P_TR_EngScheduleActiv = obj.P_TR_EngScheduleActiv as List<P_TR_EngScheduleActiv>;

            var result = db.P_TR_EngSchedule.InsertMasterManyDetails(_MasterDetailsSchdule.P_TR_EngSchedule, _MasterDetailsSchdule);
            if (result.ResponseState == true)
            {
                SessionManager.ModelCount = db.P_TR_EngSchedule.Where(x => x.CompCode == comCode && x.BraCode == BraCode).Count();
            }
            return Shared.JsonObject(result);
        }

        // GET: WorkSchedule
        public ActionResult WorkScheduleIndex()
        {
            SessionManager.PageIndex = 0;
            SessionManager.ModelCount = db.PQ_GetEngWorkSchdule.Where(x => x.CompCode == comCode && x.BraCode == BraCode).Count();
            return View(Path.WorkSchedule);
        }

        public JsonResult getLabors(int id)
        {
            var result = db.PQ_GetEngWorkSchduleLabor.Where(x => x.ScheduleId == id).Result();
            return Shared.JsonObject(result);
        }

        public JsonResult getEngSchedule(int id)
        {
            var result = db.P_TR_EngSchedule.Where(x => x.ScheduleId == id).First();
            return Shared.JsonObject(result);
        }
        public JsonResult getEngSchedulebyno(int trno)
        {
            var result = db.P_TR_EngSchedule.Where(x => x.TrNo == trno && x.CompCode==comCode && x.BraCode == BraCode).First();
            return Shared.JsonObject(result);
        }
        public JsonResult getLaborClasses(int id)
        {
            var result = db.PQ_GetEngWorkSchduleLaborClass.Where(x => x.ScheduleId == id).Result();
            return Shared.JsonObject(result);
        }

        public JsonResult getEquipment(int id)
        {
            var result = db.PQ_GetEngWorkSchduleEquip.Where(x => x.ScheduleId == id).Result();
            return Shared.JsonObject(result);
        }

        public JsonResult getEquipmentClasses(int id)
        {
            var result = db.PQ_GetEngWorkSchduleEquipClass.Where(x => x.ScheduleId == id).Result();
            return Shared.JsonObject(result);
        }
        public JsonResult getMaterial(int id)
        {
            var result = db.PQ_GetEngWorkSchduleMaterial.Where(x => x.ScheduleId == id).Result();
            return Shared.JsonObject(result);
        }

        public JsonResult getActivities(int id)
        {
            var result = db.PQ_GetEngWorkSchduleActivity.Where(x => x.ScheduleId == id).Result();
            return Shared.JsonObject(result);
        }

        public JsonResult getActivity(int id)
        {
            var result = db.PQ_GetEngProjectActivity.Where(x => x.ProjectPhaseItemActivId == id).First();
            return Shared.JsonObject(result);
        }

        public JsonResult getProject(int id)
        {
            var result = db.P_TR_EngProject.Where(x => x.ProjectID == id).First();
            return Shared.JsonObject(result);
        }

        public JsonResult getProjectPhase(int id)
        {
            var result = db.P_TR_EngProjectPhase.Where(x => x.ProjectPhaseId == id).First();
            return Shared.JsonObject(result);
        }

        public JsonResult getProjectCalender(int id)
        {
            var result = db.P_D_Calender.Where(x => x.CalenderID == id).First();
            return Shared.JsonObject(result);
        }

        // Call Stored Prosedurea
        public void workSchdule_Authorize(int _Id)
        {
            SystemTools sys = new SystemTools();
            sys.workSchdule_Authorize(_Id);
        }
        public void workSchdule_Reopen(int _Id)
        {
            SystemTools sys = new SystemTools();
            sys.workSchdule_Reopen(_Id);
        }
        public void workSchdule_UnAuthorize(int _Id)
        {
            SystemTools sys = new SystemTools();
            sys.workSchdule_UnAuthorize(_Id);
        }

        public void workSchdule_Requirements(int _Id)
        {
            SystemTools sys = new SystemTools();
            sys.workSchdule_Requirements(_Id);
        }

        public JsonResult GetHourProd(string from, string to, string calcId)
        {
            //var dt1 = from.Substring(8, 2) + '-' + from.Substring(5, 2) + '-' + from.Substring(0, 4) + from.Substring(10, 9);
            //var dt2 = to.Substring(8, 2) + '-' + to.Substring(5, 2) + '-' + to.Substring(0, 4) + to.Substring(10, 9);
            DateTime dt1=  Convert.ToDateTime(from);
            DateTime dt2=  Convert.ToDateTime(to);
            RestClient rest = new RestClient();
            Dictionary<string, string> DicList = new Dictionary<string, string>();
            DicList.Add("From", dt1.ToString());
            DicList.Add("To", dt2.ToString());
            DicList.Add("CalcId", calcId.ToString());
            var _result = rest.Get<double>("P_TR_EngSchedule", "GetHourProd", DicList);
            return Json(new { result = _result }, JsonRequestBehavior.AllowGet);
        }    

        #region
        public JsonResult OnSearchSelect(string id)
        {
            throw new NotImplementedException();
        }

        public JsonResult Undo()
        {
            throw new NotImplementedException();
        }
        public JsonResult Add()
        {
            throw new NotImplementedException();
        }

        public JsonResult Delete(P_TR_EngSchedule entity)
        {
            throw new NotImplementedException();
        }

        public JsonResult InsertAll(P_TR_EngSchedule master, string json)
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
        public JsonResult GetModelCount()
        {
            throw new NotImplementedException();
        }
        #endregion
    }
}