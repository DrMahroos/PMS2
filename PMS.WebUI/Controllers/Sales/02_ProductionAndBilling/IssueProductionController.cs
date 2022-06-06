using Newtonsoft.Json;
using PMS.ServiceConnector.Models;
using PMS.ServiceConnector.Models.Entities;
using PMS.ServiceConnector.Models.Entities.Sales;
using PMS.ServiceConnector.Tools;
using PMS.WebUI.Models.CustomModels;
using PMS.WebUI.Tools;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace PMS.WebUI.Controllers.Sales._02_ProductionAndBilling
{
    public class IssueProductionController : Controller, IMasterManyDetails<P_TR_SalesProduction>
    {
        DbEntities db = new DbEntities();
        int compCode = int.Parse(SessionManager.SessionRecord.CompCode);
        int braCode = int.Parse(SessionManager.SessionRecord.BranchCode);

        public JsonResult GetByIndex(int? index = null)
        {
            var model = db.PQ_GetSalesIssueProduction.Where(x=>x.CompCode == compCode && x.BraCode == braCode).ByIndex(SessionManager.PageIndex, "ProductionId");
            return Shared.JsonObject(model);
        }

        public JsonResult Insert(string JsonData)
        {
            M_D_IssueProduction obj = JsonConvert.DeserializeObject<M_D_IssueProduction>(JsonData);
            var result = db.P_TR_SalesProduction.InsertMasterDetails(obj.P_TR_SalesProduction, obj.P_TR_SalesProductionDetail);
            if (result.ResponseState == true)
            {
                SessionManager.ModelCount = db.PQ_GetSalesIssueProduction.Where(x => x.CompCode == compCode && x.BraCode == braCode).Count();
            }
            return Shared.JsonObject(result);
        }

        public JsonResult Update(string JsonData)
        {
            M_D_IssueProduction obj = JsonConvert.DeserializeObject<M_D_IssueProduction>(JsonData);
            var result = db.P_TR_SalesProduction.UpdateMasterDetails(obj.P_TR_SalesProduction, obj.P_TR_SalesProductionDetail);
            if (result.ResponseState == true)
            {
                SessionManager.ModelCount = db.PQ_GetSalesIssueProduction.Where(x => x.CompCode == compCode && x.BraCode == braCode).Count();
            }
            return Shared.JsonObject(result);
        }
        public JsonResult UpdateStatus(P_TR_SalesProduction entity)
        {
             var result = db.P_TR_SalesProduction.UpdateEntity(entity);
            if (result.ResponseState == true)
            {

            }
            return Shared.JsonObject(result);
        }

        // GET: IssueProduction
        public ActionResult IssueProductionIndex()
        {
            SessionManager.PageIndex = 0;
            SessionManager.ModelCount = db.PQ_GetSalesIssueProduction.Where(x => x.CompCode == compCode && x.BraCode == braCode).Count();
            return View(Path.IssueProduction);
        }

        public JsonResult GetProject(int id)
        {
            var result = db.PQ_GetEngProject.Where(c => c.ProjectID == id).First();
            return Shared.JsonObject(result);
        }
        public JsonResult GetProductions()
        {
            var result = db.PQ_GetEngProject.Result();
            return Shared.JsonObject(result);
        }
        public JsonResult LoadDetails(int id)
        {
            var result = db.PQ_GetSalesIssueProductionDetails.Where(s=>s.ProductionId == id).Result();
            return Shared.JsonObject(result);
        }
        public JsonResult GetIssueProduction(int id)
        {
            var result = db.PQ_GetSalesIssueProduction.Where(s=>s.ProductionId == id).First();
            return Shared.JsonObject(result);
        }

        // Call Stored Procedures
        public JsonResult PProc_Sales_Production(int ProjID, string dt)
        {
            RestClient rest = new RestClient();
            Dictionary<string, string> DicList = new Dictionary<string, string>();
            DicList.Add("ProjID", ProjID.ToString());
            DicList.Add("dt", dt);
            string _result = rest.Get<string>("P_TR_SalesProduction", "Sales_Production", DicList);
            var _Result = JsonConvert.DeserializeObject<List<PProc_Sales_Production_Result>>(_result);
            return Json(new { result = _Result }, JsonRequestBehavior.AllowGet);
        }

        #region
        public JsonResult Add()
        {
            throw new NotImplementedException();
        }

        public JsonResult Delete(P_TR_SalesProduction entity)
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
        public JsonResult OnSearchSelect(string id)
        {
            throw new NotImplementedException();
        }

        public JsonResult Undo()
        {
            throw new NotImplementedException();
        }
        public JsonResult InsertAll(P_TR_SalesProduction master, string json)
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