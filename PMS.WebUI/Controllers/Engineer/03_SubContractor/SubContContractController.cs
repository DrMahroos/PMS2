using Newtonsoft.Json;
using PMS.ServiceConnector.Models;
using PMS.WebUI.Models.CustomModels;
using PMS.ServiceConnector.Models.Entities;
using PMS.ServiceConnector.Tools;
using PMS.WebUI.Tools;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using PMS.WebUI.Filter;

namespace PMS.WebUI.Controllers
{
    [AuthorizeUserAttribute()]
    public class SubContContractController : Controller
    {
        DbEntities db = new DbEntities();
        int comCode = int.Parse(SessionManager.SessionRecord.CompCode);
        int braCode = int.Parse(SessionManager.SessionRecord.BranchCode);
        // GET: SubContContract
        public ActionResult SubContContractIndex()
        {
            if (SessionManager.Me == null)
            {
                return RedirectToAction("LoginIndex", "login");
            }
            SessionManager.PageIndex = 0;
            SessionManager.ModelCount = db.PQ_GetEngSubContract.Where(x => x.CompCode == comCode && x.BraCode == braCode).Count();
            return View(Path.SubContContract);
        }
        public JsonResult GetAllSubContractMaster()
        {
            var result = db.PQ_GetEngSubContract.Result();
            return Shared.JsonObject(result);
        }
        public JsonResult GetSubContractById(int id)
        {
            var result = db.PQ_GetEngSubContract.Where(x => x.SubContractId == id).First();
            return Shared.JsonObject(result);
        }

        public JsonResult GetByIndex(int? index = default(int?))
        {
            var model = db.PQ_GetEngSubContract.Where(x => x.CompCode == comCode && x.BraCode == braCode).ByIndex(SessionManager.PageIndex, "SubContractId");
            return Shared.JsonObject(model);
        }

        public JsonResult GetSubContractDetailsList(int id)
        {
            var res = db.PQ_GetEngSubContractActivity.Where(x => x.SubContractId == id).Result();
            return Shared.JsonObject(res);
        }
        public JsonResult GetSubContractorByID(int id)
        {
            var result = db.P_D_SubContractor.Where(x => x.SubContractorID == id).First();
            return Shared.JsonObject(result);
        }
        public JsonResult GetPQ_GetEngSubContractorScopeByID(int id)
        {
            var result = db.PQ_GetEngSubContractorScope.Where(x => x.SubContractorScopeId == id).First();
            return Shared.JsonObject(result);
        }
        public JsonResult GetPQ_SrchEngProjectPhaseByID(int id)
        {
            var result = db.PQ_SrchEngProjectPhase.Where(x => x.ProjectPhaseId == id).First();
            return Shared.JsonObject(result);
        }
        public JsonResult GetPDActivityByID(int id)
        {
            var result = db.P_D_Activity.Where(x => x.ActivityID == id).First();
            return Shared.JsonObject(result);
        }
        public JsonResult GetPQ_SrchEngProjectActivityByID(int id)
        {
            var result = db.PQ_SrchEngProjectActivity.Where(x => x.ProjectPhaseItemActivId == id).First();
            return Shared.JsonObject(result);
        }
        public JsonResult GetPQ_SrchActivityByID(int id)
        {
            var res = db.PQ_SrchActivity.Where(x => x.ActivityID == id).First();
            return Shared.JsonObject(res);
        }
        public JsonResult Update(string JsonData)
        {
            M_D_SubContract obj = JsonConvert.DeserializeObject<M_D_SubContract>(JsonData);
            //M_D_SubContract _MasterDetailExpenses = new M_D_SubContract();
            //_MasterDetailExpenses.P_TR_SubContract = obj.P_TR_SubContract;
            //_MasterDetailExpenses.P_TR_SubContractActivity = obj.P_TR_SubContractActivity as List<P_TR_SubContractActivity>;

            var result = db.P_TR_SubContract.UpdateMasterDetails(obj.P_TR_SubContract, obj.P_TR_SubContractActivity);

            if (result.ResponseState == true)
            {
                SessionManager.ModelCount = db.P_TR_SubContract.Where(x => x.CompCode == comCode &&x.BraCode == braCode).Count();
            }

            return Shared.JsonObject(result);
        }

        public JsonResult Insert(string JsonData)
        {
            M_D_SubContract obj = JsonConvert.DeserializeObject<M_D_SubContract>(JsonData);
            M_D_SubContract _MasterDetailExpenses = new M_D_SubContract();
            _MasterDetailExpenses.P_TR_SubContract = obj.P_TR_SubContract;
            _MasterDetailExpenses.P_TR_SubContractActivity = obj.P_TR_SubContractActivity as List<P_TR_SubContractActivity>;

            var result = db.P_TR_SubContract.InsertMasterDetails
               (_MasterDetailExpenses.P_TR_SubContract, _MasterDetailExpenses.P_TR_SubContractActivity);

            if (result.ResponseState == true)
            {
                SessionManager.ModelCount = db.P_TR_SubContract.Where(x => x.CompCode == comCode && x.BraCode == braCode).Count();
            }

            return Shared.JsonObject(result);

        }
    }
}