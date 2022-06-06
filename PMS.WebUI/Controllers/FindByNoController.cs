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

namespace PMS.WebUI.Controllers
{
    public class FindByNoController : Controller
    {
        DbEntities db = new DbEntities();
        int comCode = int.Parse(SessionManager.SessionRecord.CompCode);
        int BraCode = int.Parse(SessionManager.SessionRecord.BranchCode);

        #region Definition 
        public JsonResult getCustomerByCode(int code)
        {
            var result = db.P_D_SalesCustomer.Where(x => x.CustomerCode == code && x.CompCode == comCode).Result();
            return Shared.JsonObject(result);
        }
        public JsonResult getCustomerCategoryByCode(string code)
        {
            var result = db.P_D_SalesCustomerCategory.Where(x => x.CustomerCatCode == code && x.CompCode == comCode).Result();
            return Shared.JsonObject(result);
        }
        public JsonResult getScopeCatByCode(string code)
        {
            var result = db.P_D_ScopeCategory.Where(x => x.ScopeCategCode == code && x.CompCode == comCode).Result();
            return Shared.JsonObject(result);
        }
        public JsonResult getScopeByCode(string code)
        {
            var result = db.P_D_Scope.Where(x => x.ScopeCode == code && x.CompCode == comCode ).Result();
            return Shared.JsonObject(result);
        }
        public JsonResult getSalesEngineerCategoryByCode(string code)
        {

            var result = db.P_D_SalesEngCateory.Where(x => x.CategCode == code && x.CompCode == comCode ).Result();
            return Shared.JsonObject(result);
        }
        public JsonResult getSiteEngineerCategoryByCode(string code)
        {

            var result = db.P_D_SiteEngCategory.Where(x => x.CategCode == code && x.CompCode == comCode).Result();
            return Shared.JsonObject(result);
        }
        public JsonResult getSalesEngineerByCode(string code)
        {
            var result = db.P_D_SalesEgineer.Where(x => x.EngCode == code && x.CompCode == comCode && x.BraCode == BraCode).Result();
            return Shared.JsonObject(result);
        }
        public JsonResult getSiteEngineerByCode(string code)
        {
            var result = db.P_D_SiteEngineer.Where(x => x.EngCode == code && x.CompCode == comCode && x.BraCode == BraCode).Result();
            return Shared.JsonObject(result);
        }
        public JsonResult getLaborbyCode(string  code)
        {
            var result = db.P_D_Labor.Where(x => x.LaborCode == code && x.CompCode == comCode && x.BraCode == BraCode).Result();
            return Shared.JsonObject(result);
        }
        public JsonResult getSubcontractorbyCode(int code)
        {
            var result = db.P_D_SubContractor.Where(x => x.SubContractorCode == code && x.CompCode == comCode ).Result();
            return Shared.JsonObject(result);
        }
        public JsonResult getSubCandidatebyCode(int code)
        {
            var result = db.P_D_SubCandidate.Where(x => x.SubContractorCode == code && x.CompCode == comCode).Result();
            return Shared.JsonObject(result);
        }
        #endregion Definition
        #region Engineering 
        public JsonResult getProjectViewByno(string Pno)
        {
            var result = db.PQ_GetEngProject.Where(x => x.ProjectCode == Pno && x.CompCode == comCode && x.BraCode == BraCode).Result();
            return Shared.JsonObject(result);
        }
        public JsonResult getProjectTableByno(string Pno)
        {
            var result = db.P_TR_EngProject.Where(x => x.ProjectCode == Pno && x.CompCode == comCode && x.BraCode == BraCode).Result();
            return Shared.JsonObject(result);
        }
        public JsonResult getProjectPhaseViewByno(string ProjectNo, string PhaseNo)
        {
            var result = db.PQ_GetEngProjectPhase.Where(x => x.EngProj_ProjectCode == ProjectNo && x.ProjectPhaseCode == PhaseNo && x.CompCode == comCode && x.BraCode == BraCode).Result();
            return Shared.JsonObject(result);
        }
        public JsonResult getProjectPhaseViewByScopeNo(string ProjectNo, string PhaseNo, int ScopeId)
        {
            var result = db.PQ_GetEngProjectPhase.Where(x => x.EngProj_ProjectCode == ProjectNo && x.ProjectPhaseCode == PhaseNo && x.ScopeID == ScopeId && x.CompCode == comCode && x.BraCode == BraCode).Result();
            return Shared.JsonObject(result);
        }
        public JsonResult getProjectPhasetableByno(int ProjectId, string PhaseNo)
        {
            var result = db.P_TR_EngProjectPhase.Where(x => x.ProjectID == ProjectId && x.ProjectPhaseCode == PhaseNo ).Result();
            return Shared.JsonObject(result);
        }
        
        public JsonResult getEngScheduleTableByNo(int trno)
        {
            var result = db.P_TR_EngSchedule.Where(x => x.TrNo == trno && x.CompCode==comCode && x.BraCode == BraCode).First();
            return Shared.JsonObject(result);
        }
        public JsonResult getEngScheduleViewByNo(int trno)
        {
            var result = db.PQ_GetEngWorkSchdule.Where(x => x.TrNo == trno && x.CompCode == comCode && x.BraCode == BraCode).First();
            return Shared.JsonObject(result);
        }
        public JsonResult getEngProductionTableByNo(int trno)
        {
            var result = db.P_Tr_EngProduction.Where(x => x.TrNo == trno && x.CompCode == comCode && x.BraCode == BraCode).First();
            return Shared.JsonObject(result);
        }
        public JsonResult getEngProductionViewByNo(int trno)
        {
            var result = db.PQ_GetEngProduction.Where(x => x.TrNo == trno && x.CompCode == comCode && x.BraCode == BraCode).First();
            return Shared.JsonObject(result);
        }
        public JsonResult getEngExpensesEntryTableByNo(int trno)
        {
            var result = db.P_TR_EngExpensesEntry.Where(x => x.TrNo == trno && x.CompCode == comCode && x.BraCode == BraCode).First();
            return Shared.JsonObject(result);
        }
        public JsonResult getEngExpensesEntryViewByNo(int trno)
        {
            var result = db.PQ_GetEngExpenses.Where(x => x.TrNo == trno && x.CompCode == comCode && x.BraCode == BraCode).First();
            return Shared.JsonObject(result);
        }
        public JsonResult getSalesProductionTableByNo(int trno)
        {
            var result = db.P_TR_SalesProduction.Where(x => x.TrNo == trno && x.CompCode == comCode && x.BraCode == BraCode).First();
            return Shared.JsonObject(result);
        }
        public JsonResult getSalesProductionViewByNo(int trno)
        {
            var result = db.PQ_GetSalesIssueProduction.Where(x => x.TrNo == trno && x.CompCode == comCode && x.BraCode == BraCode).First();
            return Shared.JsonObject(result);
        }
        public JsonResult getSubContractTableByNo(int trno)
        {
            var result = db.P_TR_SubContract.Where(x => x.TrNo == trno && x.CompCode == comCode && x.BraCode == BraCode).First();
            return Shared.JsonObject(result);
        }
        public JsonResult getSubContractViewByNo(int trno)
        {
            var result = db.PQ_GetEngSubContract.Where(x => x.TrNo == trno && x.CompCode == comCode && x.BraCode == BraCode).First();
            return Shared.JsonObject(result);
        }
        public JsonResult getSubServiceOrderTableByNo(int trno)
        {
            var result = db.P_TR_SubServiceOrder.Where(x => x.TrNo == trno && x.CompCode == comCode && x.BraCode == BraCode).First();
            return Shared.JsonObject(result);
        }
        public JsonResult getSubServiceOrderViewByNo(int trno)
        {
            var result = db.PQ_GetEngSubServiceOrder.Where(x => x.TrNo == trno && x.CompCode == comCode && x.BraCode == BraCode).First();
            return Shared.JsonObject(result);
        }
        public JsonResult getSubProductionTableByNo(int trno)
        {
            var result = db.P_TR_SubProduction.Where(x => x.TrNo == trno && x.CompCode == comCode && x.BraCode == BraCode).First();
            return Shared.JsonObject(result);
        }
        public JsonResult getSubProductionViewByNo(int trno)
        {
            var result = db.PQ_GetEngSubProduction.Where(x => x.TrNo == trno && x.CompCode == comCode && x.BraCode == BraCode).First();
            return Shared.JsonObject(result);
        }
        public JsonResult getRequestLabourTableByNo(int trno)
        {
            var result = db.P_Tr_ResRequestLabour.Where(x => x.TrNo == trno && x.CompCode == comCode && x.BraCode == BraCode).First();
            return Shared.JsonObject(result);
        }
        //eslam
        public JsonResult getRequestLabourViewByNo(int trno)
        {
            var result = db.PQ_GetResRequestLabours.Where(x => x.TrNo == trno && x.CompCode == comCode && x.BraCode == BraCode).First();
            return Shared.JsonObject(result);
        }

        public JsonResult getOverTimeTableByNo(int trno)
        {
            var result = db.P_TR_ResOverTime.Where(x => x.TrNo == trno && x.CompCode == comCode && x.BraCode == BraCode).First();
            return Shared.JsonObject(result);
        }
        public JsonResult getOverTimeViewByNo(int trno)
        {
            var result = db.PQ_GetResLabourOverTime.Where(x => x.TrNo == trno && x.CompCode == comCode && x.BraCode == BraCode).First();
            return Shared.JsonObject(result);
        }
        public JsonResult getAbsenceTableByNo(int trno)
        {
            var result = db.P_TR_ResAbsence.Where(x => x.TrNo == trno && x.CompCode == comCode && x.BraCode == BraCode).First();
            return Shared.JsonObject(result);
        }
        public JsonResult getAbsenceViewByNo(int trno)
        {
            var result = db.PQ_GetResLabourAbsence.Where(x => x.TrNo == trno && x.CompCode == comCode && x.BraCode == BraCode).First();
            return Shared.JsonObject(result);
        }
        public JsonResult getVariationViewByNo(int trno)
        {
            var result = db.PQ_GetEngVariation.Where(x => x.TrNo == trno && x.CompCode == comCode && x.BraCode == BraCode).First();
            return Shared.JsonObject(result);
        }
        public JsonResult getVariationTableByNo(int trno)
        {
            var result = db.P_TR_EngVariation.Where(x => x.TrNo == trno && x.CompCode == comCode && x.BraCode == BraCode).First();
            return Shared.JsonObject(result);
        }
        #endregion Engineering 
    }
}