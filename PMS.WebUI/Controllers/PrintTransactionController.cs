using PMS.ServiceConnector.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace PMS.WebUI.Controllers
{
    public class PrintTransactionController : Controller
    {
        SessionRecord ses = new SessionRecord();
        //PrintUnProd
        public JsonResult PrintUnProd()
        {

            Reports rep = getStandardParameters();
            string url = rep.GetReportUrl("PPrnt_def_UnPrdReon");
            return Shared.JsonObject(url);
        }
        public JsonResult PrintLobClas()
        {

            Reports rep = getStandardParameters();
            string url = rep.GetReportUrl("PPrnt_def_LobClas");
            return Shared.JsonObject(url);
        }
        public JsonResult PrintExpenses()
        {
            Reports rep = getStandardParameters();
            string url = rep.GetReportUrl("PPrnt_def_Expenses");
            return Shared.JsonObject(url);
        }
        //PrintExpenses

        //print offer def
        public JsonResult PrintOffer(int OfferID)
        {
            //PRep_sls_OfferSubmittalsAR
            //PRep_sls_OfferSubmittalsEN

            Reports rep = getStandardParameters();
            rep.AddParameter("Offerid", OfferID);
            string url = rep.GetReportUrl("PRep_sls_OfferSubmittals");
            return Shared.JsonObject(url);
        }
        public JsonResult PrintScope()
        {

            Reports rep = getStandardParameters();
            string url = rep.GetReportUrl("PPrnt_def_Scope");
            return Shared.JsonObject(url);
        }
        public JsonResult PrintCatSiteEng()
        {

            Reports rep = getStandardParameters();
            string url = rep.GetReportUrl("PPrnt_def_siteEngCat");
              return Shared.JsonObject(url);
        }
        public JsonResult PrintCatEng()
        {

            Reports rep = getStandardParameters();
            string url = rep.GetReportUrl("PPrnt_def_SalesEngCat");
            return Shared.JsonObject(url);
        }
        public JsonResult PrintEuqipClas()
        {

            Reports rep = getStandardParameters();
            string url = rep.GetReportUrl("pprnt_def_EuqipClas");
            return Shared.JsonObject(url);
        }
        //PPrnt_def_Location
        public JsonResult PrintDefLocation(int bra)
        {

            Reports rep = getStandardParameters();
            rep.AddParameter("bra", bra);
            string url = rep.GetReportUrl("PPrnt_def_Location");
            return Shared.JsonObject(url);
        }
        public JsonResult PrintSlsActivityChangePRice(int TrID)
        {

            Reports rep = getStandardParameters();
            rep.AddParameter("TrID", TrID);
            string url = rep.GetReportUrl("PPrnt_Sls_ActivityChangePRice");
            return Shared.JsonObject(url);
        }




        public JsonResult PrintMaterialRequest(int TrID)
        {

            Reports rep = getStandardParameters();
            rep.AddParameter("TrID", TrID);
            string url = rep.GetReportUrl("PPrnt_Res_MaterialRequest");
            return Shared.JsonObject(url);
        }

        public JsonResult PrintVariationDet(int TrID)
        {

            Reports rep = getStandardParameters();
            rep.AddParameter("TrID", TrID);
            string url = rep.GetReportUrl("Prnt_Eng_VariationDet");
            return Shared.JsonObject(url);

        }

        public JsonResult PrintVariationSum(int TrID)
        {

            Reports rep = getStandardParameters();
            rep.AddParameter("TrID", TrID);
            string url = rep.GetReportUrl("Prnt_Eng_VariationSum");
            return Shared.JsonObject(url);
        }



        public JsonResult PrintLaborAssign(int TrID)
        {

            Reports rep = getStandardParameters();
            rep.AddParameter("TrID", TrID);
            string url = rep.GetReportUrl("PPrnt_Res_AssignLabour");
            return Shared.JsonObject(url);
        }
        public JsonResult PrintEquipmentAssign(int TrID)
        {

            Reports rep = getStandardParameters();
            rep.AddParameter("TrID", TrID);
            string url = rep.GetReportUrl("PPrnt_Res_AssignEquipment");
            return Shared.JsonObject(url);
        }
        public JsonResult PrintMaterialIssuance(int TrID)
        {

            Reports rep = getStandardParameters();
            rep.AddParameter("TrID", TrID);
            string url = rep.GetReportUrl("PPrnt_Res_Materialissue");
            return Shared.JsonObject(url);
        }


        public JsonResult PrintOfferSpecification(int TrID)
        {

            Reports rep = getStandardParameters();
            rep.AddParameter("TrID", TrID);
            string url = rep.GetReportUrl("PPrnt_sls_OfferSpecification");
            return Shared.JsonObject(url);
        }
        public JsonResult PrintMaterialReturn(int TrID)
        {

            Reports rep = getStandardParameters();
            rep.AddParameter("TrID", TrID);
            string url = rep.GetReportUrl("PPrnt_Res_MaterialReturn");
            return Shared.JsonObject(url);
        }

        public JsonResult PrintOverTime(int TrID)
        {

            Reports rep = getStandardParameters();
            rep.AddParameter("TrID", TrID);
            string url = rep.GetReportUrl("PPrnt_Res_LaborOverTime");
            return Shared.JsonObject(url);
        }

        public JsonResult PrintLateandAbsence(int TrID)
        {

            Reports rep = getStandardParameters();
            rep.AddParameter("TrID", TrID);
            string url = rep.GetReportUrl("PPrnt_Res_LaborAbsenceLate");
            return Shared.JsonObject(url);
        }

        public JsonResult PrintLaborRequest(int TrID)
        {

            Reports rep = getStandardParameters();
            rep.AddParameter("TrID", TrID);
            string url = rep.GetReportUrl("PPrnt_Res_LaborRequest");
            return Shared.JsonObject(url);
        }
        public JsonResult PrintEquipmentRequest(int TrID)
        {

            Reports rep = getStandardParameters();
            rep.AddParameter("TrID", TrID);
            string url = rep.GetReportUrl("PPrnt_Res_EquipmentRequest");
            return Shared.JsonObject(url);
        }
        /**/
        public JsonResult printOpProductionEntry(int TrNo)
        {
            Reports rep = getStandardParameters();
            rep.AddParameter("TrNo", TrNo);
            string url = rep.GetReportUrl("PPrnt_eng_OpProductionEntry");
            return Shared.JsonObject(url);
        }
        public JsonResult printWorkSchedule(int TrNo)
        {
            Reports rep = getStandardParameters();
            rep.AddParameter("TrNo", TrNo);
            string url = rep.GetReportUrl("PPrnt_eng_WorkSchedule");
            return Shared.JsonObject(url);
        }
        public JsonResult printServiceOrder(int TrNo)
        {
            Reports rep = getStandardParameters();
            rep.AddParameter("TrNo", TrNo);
            string url = rep.GetReportUrl("PPrnt_eng_ServiceOrder");
            return Shared.JsonObject(url);
        }

        public JsonResult printSubProduction(int TrNo)
        {
            Reports rep = getStandardParameters();
            rep.AddParameter("TrNo", TrNo);
            string url = rep.GetReportUrl("PPrnt_eng_SubProduction");
            return Shared.JsonObject(url);
        }

        public JsonResult PrintCustomerBilling(int TrID)
        {
            Reports rep = getStandardParameters();
            rep.AddParameter("TrID", TrID);
            string url = rep.GetReportUrl("PRep_sls_Invoice");
            return Shared.JsonObject(url);
        }

        public JsonResult PrintCustomerDC(int TrID)
        {
            Reports rep = getStandardParameters();
            rep.AddParameter("TrID", TrID);
            string url = rep.GetReportUrl("PRep_sls_DbCr");
            return Shared.JsonObject(url);
        }

        public JsonResult printSubContContract(int TrNo)
        {
            Reports rep = getStandardParameters();
            rep.AddParameter("TrNo", TrNo);
            string url = rep.GetReportUrl("PPrnt_eng_SubContContract");
            return Shared.JsonObject(url);
        }
        /**/
        public JsonResult PrintSiteEng(int Active)
        {

            Reports rep = getStandardParameters();
            rep.AddParameter("Active", Active);
            string url = rep.GetReportUrl("PPrnt_def_SiteEng");
            return Shared.JsonObject(url);
        }
        public JsonResult PrintSlsEng(int Active)
        {

            Reports rep = getStandardParameters();
            rep.AddParameter("Active", Active);
            string url = rep.GetReportUrl("PPrnt_def_SEng");
            return Shared.JsonObject(url);
        }
        public JsonResult PrintIssueProduction(int TrID)
        {

            Reports rep = getStandardParameters();
            rep.AddParameter("TrID", TrID);
            string url = rep.GetReportUrl("PPrnt_sls_Production");
            return Shared.JsonObject(url);
        }
        public Reports getStandardParameters()
        {
            SessionRecord sr = PMS.ServiceConnector.Tools.SessionManager.SessionRecord;
            Reports rep = new Reports();

            rep.AddParameter("CompCode", sr.CompCode);
            //rep.AddParameter("bra", sr.BranchCode);
            rep.AddParameter("CompNameA", sr.CompanyNameAr);
            rep.AddParameter("CompNameE", sr.CompanyName);

            if (string.IsNullOrEmpty(sr.BranchName))
            {
                rep.AddParameter("BraNameA", "");
                rep.AddParameter("BraNameE", "");
            }
            else
            {
                rep.AddParameter("BraNameA", sr.BranchName);
                rep.AddParameter("BraNameE", sr.BranchName);
            }
            rep.AddParameter("LoginUser", sr.UserCode);

            return rep;
        }
        
        public JsonResult Printstartofwork(int TrID)
        {
            Reports rep = getStandardParameters();
            rep.AddParameter("TrID", TrID);
            string url = rep.GetReportUrl("REPPrnt_sls_StartOfWork");
            return Shared.JsonObject(url);
        }
        public JsonResult PrintEngExpenses(int TrID)
        {
            Reports rep = getStandardParameters();
            rep.AddParameter("TrID", TrID);
            string url = rep.GetReportUrl("PPrnt_Eng_Expenses");
            return Shared.JsonObject(url);
        }

        public JsonResult PPrnt_Eng_Expenses(int TrID)
        {
            Reports rep = getStandardParameters();
            rep.AddParameter("TrID", TrID);
            string url = rep.GetReportUrl("PPrnt_Eng_Expenses");
            return Shared.JsonObject(url);
        }
        

    }
}