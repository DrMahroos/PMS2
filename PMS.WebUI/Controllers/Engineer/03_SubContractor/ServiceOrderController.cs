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

namespace PMS.WebUI.Controllers.Engineer._03_SubContractor
{
    public class ServiceOrderController : Controller, IMasterManyDetails<P_TR_SubServiceOrder>
    {
        DbEntities db = new DbEntities();
        int comCode = int.Parse(SessionManager.SessionRecord.CompCode);
        int BraCode = int.Parse(SessionManager.SessionRecord.BranchCode);

        public JsonResult GetByIndex(int? index = null)
        {
            var model = db.PQ_GetEngSubServiceOrder.Where(x => x.CompCode == comCode && x.BraCode == BraCode).ByIndex(SessionManager.PageIndex, "SubServiceOrderId");
            return Shared.JsonObject(model);
        }

        public JsonResult Insert(string JsonData)
        {
            M_D_ServiceOrder obj = JsonConvert.DeserializeObject<M_D_ServiceOrder>(JsonData);
            var result = db.P_TR_SubServiceOrder.InsertMasterDetails(obj.P_TR_SubServiceOrder, obj.P_TR_SubServiceOrderActivity);
            if (result.ResponseState == true)
            {
                SessionManager.ModelCount = db.PQ_GetEngSubServiceOrder.Where(x => x.CompCode == comCode && x.BraCode == BraCode).Count();
            }
            return Shared.JsonObject(result);
        }

        // GET: ServiceOrder
        public ActionResult ServiceOrderIndex()
        {
            SessionManager.PageIndex = 0;
            SessionManager.ModelCount = db.PQ_GetEngSubServiceOrder.Where(x => x.CompCode == comCode && x.BraCode == BraCode).Count();
            return View(Path.ServiceOrder);
        }

        public JsonResult Update(string JsonData)
        {
            M_D_ServiceOrder obj = JsonConvert.DeserializeObject<M_D_ServiceOrder>(JsonData);
            var result = db.P_TR_SubServiceOrder.UpdateMasterDetails(obj.P_TR_SubServiceOrder, obj.P_TR_SubServiceOrderActivity);
            if (result.ResponseState == true)
            {
                SessionManager.ModelCount = db.P_TR_SubServiceOrder.Where(x => x.CompCode == comCode && x.BraCode == BraCode).Count();
            }
            return Shared.JsonObject(result);
        }

        public JsonResult LoadDetails(int id)
        {
            var result = db.PQ_GetEngServiceOrderActivity.Where(c => c.SubServiceOrderId == id).Result();
            return Shared.JsonObject(result);
        }

        public JsonResult LoadNewDetails(int id)
        {
            //var result = db.PQ_LoadEngSubSOContractActivity.Where(c => c.ser == id).Result();
            var result = db.PQ_GetEngSubContractActivity.Where(c => c.SubContractId == id).Result();
            return Shared.JsonObject(result);
        }

        public JsonResult getContract(int id)
        {
            var result = db.PQ_GetEngSubContract.Where(c => c.SubContractId == id).First();
            return Shared.JsonObject(result);
        }
        public JsonResult GetServiceOrder(int id)
        {
            var result = db.PQ_GetEngSubServiceOrder.Where(c => c.SubServiceOrderId == id).First();
            return Shared.JsonObject(result);
        }

        public JsonResult getProject(int id)
        {
            var result = db.PQ_SrchEngProjectPhase.Where(c => c.ProjectID == id).First();
            return Shared.JsonObject(result);
        }

        public JsonResult getProjectPhase(int id)
        {
            var result = db.PQ_GetEngProjectPhase.Where(c => c.ProjectPhaseId == id).First();
            return Shared.JsonObject(result);
        }

        public JsonResult getEngProject(int id)
        {
            var result = db.P_D_SiteEngineer.Where(c => c.SiteEngineerId == id).First();
            return Shared.JsonObject(result);
        }

        public JsonResult getActivity(int id)
        {
            var result = db.PQ_SrchEngProjectActivity.Where(c => c.ActivityID == id).First();
            return Shared.JsonObject(result);
        }

        public JsonResult getSubContract(int id)
        {
            var result = db.P_TR_SubContract.Where(c => c.SubContractId == id).First();
            return Shared.JsonObject(result);
        }

        public JsonResult GetEngineer()
        {
            var eng = db.PQ_GetEngProjectPhase
                .Select(f => new
                {
                    f.SiteEngineerId,
                    f.Eng_EngCode,
                    f.Eng_DescA,
                    f.Eng_DescE
                }).Result();
            return Shared.JsonObject(eng);
        }

        public JsonResult GetSiteEngineerById(int Id)
        {
            var eng = db.P_D_SiteEngineer.Where(s => s.SiteEngineerId == Id).First();
            return Shared.JsonObject(eng);
        }

        // Call Stored Procedure 
        public JsonResult EngSubServiceOrderApprove(int id)
        {
            RestClient rest = new RestClient();
            Dictionary<string, string> DicList = new Dictionary<string, string>();
            DicList.Add("id", id.ToString());
            var _result = rest.Get<int>("P_TR_SubServiceOrder", "EngSubServiceOrderApprove", DicList);
            return Json(new { result = _result }, JsonRequestBehavior.AllowGet);
        }
        public void EngSubServiceOrderReopen(int _Id)
        {
            SystemTools sys = new SystemTools();
            sys.EngSubServiceOrderReopen(_Id);
        }
        public JsonResult EngSubServiceOrderClose(int id)
        {
            RestClient rest = new RestClient();
            Dictionary<string, string> DicList = new Dictionary<string, string>();
            DicList.Add("id", id.ToString());
            var _result = rest.Get<int>("P_TR_SubServiceOrder", "EngSubServiceOrderClose", DicList);
            return Json(new { result = _result }, JsonRequestBehavior.AllowGet);
        }

        #region
        public JsonResult GetModelCount()
        {
            throw new NotImplementedException();
        }
        public JsonResult InsertAll(P_TR_SubServiceOrder master, string json)
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
        public JsonResult Add()
        {
            throw new NotImplementedException();
        }

        public JsonResult Delete(P_TR_SubServiceOrder entity)
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