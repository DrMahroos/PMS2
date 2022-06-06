using PMS.ServiceConnector.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace PMS.WebUI.Controllers
{
    public class GeneralReportsController : Controller
    {
        DbEntities db = new DbEntities();
        private Reports MakeReport(ReportParameters p)
        {
            Reports rep = new Reports();
            rep.AddParameter<ReportParameters>("par", p);
            return rep;
        }

        public Reports getStandardParameters()
        {
            SessionRecord sr = PMS.ServiceConnector.Tools.SessionManager.SessionRecord;
            Reports rep = new Reports();

            rep.AddParameter("CompCode", sr.CompCode);
            rep.AddParameter("braCode", sr.BranchCode);
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

        public JsonResult rptSalesEng(RepPar rp)
        {
            Reports rep = getStandardParameters();

            if (rp.CatID == 0)
                rep.AddParameter("CatID", "");
            else
                rep.AddParameter("CatID", rp.CatID);
            if (rp.bra == 0)
                rep.AddParameter("bra", "");
            else
                rep.AddParameter("bra", rp.bra);
            if (string.IsNullOrEmpty(rp.Active))
                rep.AddParameter("Active", "");
            else
                rep.AddParameter("Active", rp.Active);


            string url = rep.GetReportUrl("PRpt_def_SalesEng");
            return Shared.JsonObject(url);
        }

        public JsonResult rptSiteEng(RepPar rp)
        {
            Reports rep = getStandardParameters();

            if (rp.CatID == 0)
                rep.AddParameter("CatID", "");
            else
                rep.AddParameter("CatID", rp.CatID);
            if (rp.bra == 0)
                rep.AddParameter("bra", "");
            else
                rep.AddParameter("bra", rp.bra);
            if (string.IsNullOrEmpty(rp.Active))
                rep.AddParameter("Active", "");
            else
                rep.AddParameter("Active", rp.Active);


            string url = rep.GetReportUrl("PRpt_def_SiteEng");
            return Shared.JsonObject(url);
        }

        public JsonResult rptLabor(RepPar rp)
        {
            Reports rep = getStandardParameters();

            if (rp.ClassID == 0)
                rep.AddParameter("ClassID", "");
            else
                rep.AddParameter("ClassID", rp.ClassID);
            if (rp.CatID == 0)
                rep.AddParameter("CatID", "");
            else
                rep.AddParameter("CatID", rp.CatID);
            if (rp.bra == 0)
                rep.AddParameter("bra", "");
            else
                rep.AddParameter("bra", rp.bra);
            if (string.IsNullOrEmpty(rp.Active))
                rep.AddParameter("Active", "");
            else
                rep.AddParameter("Active", rp.Active);


            string url = rep.GetReportUrl("PRpt_def_Labor");
            return Shared.JsonObject(url);
        }

        public JsonResult rptActivity(RepPar rp)
        {
            Reports rep = getStandardParameters();

            if (rp.ActID == 0)
                rep.AddParameter("ActID", "");
            else
                rep.AddParameter("ActID", rp.ActID);


            string url = rep.GetReportUrl("PRpt_def_Activity");
            return Shared.JsonObject(url);
        }

        public JsonResult rptEquipment(RepPar rp)
        {
            Reports rep = getStandardParameters();

            if (rp.CatID == 0)
                rep.AddParameter("CatID", "");
            else
                rep.AddParameter("CatID", rp.CatID);
            if (rp.bra == 0)
                rep.AddParameter("bra", "");
            else
                rep.AddParameter("bra", rp.bra);
            if (string.IsNullOrEmpty(rp.Active))
                rep.AddParameter("Active", "");
            else
                rep.AddParameter("Active", rp.Active);


            string url = rep.GetReportUrl("PRpt_def_Equipment");
            return Shared.JsonObject(url);
        }

        #region
        public JsonResult rptSlsCustCard(RepPar rp)
        {
            Reports rep = getStandardParameters();
            if (rp.Custid == 0)
                rep.AddParameter("Custid", "");
            else
                rep.AddParameter("Custid", rp.Custid);

            string url = rep.GetReportUrl("PPrnt_Sls_CustomerCard");
            return Shared.JsonObject(url);
        }

        public JsonResult rptSlsCustList(RepPar rp)
        {
            Reports rep = getStandardParameters();

            if (rp.FromCustNo == 0)
                rep.AddParameter("FromCustNo", "");
            else
                rep.AddParameter("FromCustNo", rp.FromCustNo);

            if (rp.ToCustNo == 0)
                rep.AddParameter("ToCustNo", "");
            else
                rep.AddParameter("ToCustNo", rp.ToCustNo);


            if (rp.CatID == 0)
                rep.AddParameter("CatID", "");
            else
                rep.AddParameter("CatID", rp.CatID);

            if (rp.EngID == 0)
                rep.AddParameter("EngID", "");
            else
                rep.AddParameter("EngID", rp.EngID);


            if (rp.bra == 0)
                rep.AddParameter("bra", "");
            else
                rep.AddParameter("bra", rp.bra);

            if (string.IsNullOrEmpty(rp.Active))
                rep.AddParameter("Active", "");
            else
                rep.AddParameter("Active", rp.Active);

            if (string.IsNullOrEmpty(rp.Temp))
                rep.AddParameter("Temp", "");
            else
                rep.AddParameter("Temp", rp.Temp);

            string url = rep.GetReportUrl("PPrnt_Sls_CustomerList");
            return Shared.JsonObject(url);
        }

        public JsonResult rptSlsItemCard(RepPar rp)
        {
            Reports rep = getStandardParameters();
            if (rp.ItemId == 0)
                rep.AddParameter("ItemId", "");
            else
                rep.AddParameter("ItemId", rp.ItemId);

            string url = rep.GetReportUrl("PPrnt_Sls_ItemCard");
            return Shared.JsonObject(url);
        }

        public JsonResult rptSlsItemList(RepPar rp)
        {
            Reports rep = getStandardParameters();

            if (string.IsNullOrEmpty(rp.FromItemNo))
                rep.AddParameter("FromItemNo", "");
            else
                rep.AddParameter("FromItemNo", rp.FromItemNo);

            if (string.IsNullOrEmpty(rp.ToItemNo))
                rep.AddParameter("ToItemNo", "");
            else
                rep.AddParameter("ToItemNo", rp.ToItemNo);


            if (rp.ScopeID == 0)
                rep.AddParameter("ScopeID", "");
            else
                rep.AddParameter("ScopeID", rp.ScopeID);

            if (string.IsNullOrEmpty(rp.Active))
                rep.AddParameter("Active", "");
            else
                rep.AddParameter("Active", rp.Active);

            if (rp.Detail == 0)
                rep.AddParameter("Detail", "");
            else
                rep.AddParameter("Detail", rp.Detail);

            string url = rep.GetReportUrl("PPrnt_Sls_ItemList");
            return Shared.JsonObject(url);
        }

        public JsonResult rptSlsContractList(RepPar rp)
        {
            Reports rep = getStandardParameters();
            rep.AddParameter("FromDate", rp.FromDate.ToShortDateString());
            rep.AddParameter("ToDate", rp.ToDate.ToShortDateString());

            if (rp.Custid == 0)
                rep.AddParameter("Custid", "");
            else
                rep.AddParameter("Custid", rp.Custid);

            if (rp.LocId == 0)
                rep.AddParameter("LocId", "");
            else
                rep.AddParameter("LocId", rp.LocId);


            if (rp.CatID == 0)
                rep.AddParameter("CatID", "");
            else
                rep.AddParameter("CatID", rp.CatID);

            if (rp.EngID == 0)
                rep.AddParameter("EngID", "");
            else
                rep.AddParameter("EngID", rp.EngID);
            string url = rep.GetReportUrl("PRep_sls_Contract");
            return Shared.JsonObject(url);
        }

        public JsonResult rptSlsOffer(RepPar rp)
        {
            Reports rep = getStandardParameters();
            rep.AddParameter("FromDate", rp.FromDate.ToShortDateString());
            rep.AddParameter("ToDate", rp.ToDate.ToShortDateString());
            // rep.AddParameter("BraCode",rep.);
            if (rp.Custid == 0)
                rep.AddParameter("Custid", "");
            else
                rep.AddParameter("Custid", rp.Custid);

            if (rp.LocId == 0)
                rep.AddParameter("LocId", "");
            else
                rep.AddParameter("LocId", rp.LocId);


            if (rp.CatID == 0)
                rep.AddParameter("CatID", "");
            else
                rep.AddParameter("CatID", rp.CatID);

            if (rp.EngID == 0)
                rep.AddParameter("EngID", "");
            else
                rep.AddParameter("EngID", rp.EngID);
            if (rp.Stat == 0)
                rep.AddParameter("Stat", rp.Stat);
            else if (rp.Stat > 0)
                rep.AddParameter("Stat", rp.Stat);
            else
                rep.AddParameter("Stat", "");
            string url = rep.GetReportUrl("PRep_sls_Offer");
            return Shared.JsonObject(url);
        }
        public JsonResult p_rptBillingList(RepPar rp)
        {
            Reports rep = getStandardParameters();
            rep.AddParameter("FromDate", rp.FromDate.ToShortDateString());
            rep.AddParameter("ToDate", rp.ToDate.ToShortDateString());
            // rep.AddParameter("BraCode",rep.);
            if (rp.Custid == 0)
                rep.AddParameter("Custid", "");
            else
                rep.AddParameter("Custid", rp.Custid);

            if (rp.LocId == 0)
                rep.AddParameter("LocId", "");
            else
                rep.AddParameter("LocId", rp.LocId);


            if (rp.CatID == 0)
                rep.AddParameter("CatID", "");
            else
                rep.AddParameter("CatID", rp.CatID);

            if (rp.EngID == 0)
                rep.AddParameter("EngID", "");
            else
                rep.AddParameter("EngID", rp.EngID);

            if (rp.Stat >= 0)
                rep.AddParameter("Stat", rp.Stat);
            else
                rep.AddParameter("Stat", "");
            string url = "";
            if (rp.TypeReport == 0 )
               url = rep.GetReportUrl("PRep_sls_BillingListInvoice");
            if (rp.TypeReport == 1)
                url = rep.GetReportUrl("PRep_sls_BillingListPhase");

            return Shared.JsonObject(url);
        }


        #endregion

        #region Reports
        public JsonResult rpt_ENG_Evaluation_BYSub(RepPar rp)
        {
            Reports rep = getStandardParameters();
            rep.AddParameter("FromDate", rp.FromDate.ToShortDateString());
            rep.AddParameter("ToDate", rp.ToDate.ToShortDateString());

            rep.AddParameter("braCode", rp.braCode);


            if (rp.ContrId == 0)
                rep.AddParameter("ContrId", "");
            else
                rep.AddParameter("ContrId", rp.ContrId);

            if (rp.SubID == 0)
                rep.AddParameter("SubID", "");
            else
                rep.AddParameter("SubID", rp.SubID);


            if (rp.EngID == 0)
                rep.AddParameter("EngID", "");
            else
                rep.AddParameter("EngID", rp.EngID);

            if (rp.ProjectID == 0)
                rep.AddParameter("ProjectID", "");
            else
                rep.AddParameter("ProjectID", rp.ProjectID);


            string url = rep.GetReportUrl("PRep_sub_Evaluation_BYSub");
            return Shared.JsonObject(url);
        }
        public JsonResult rpt_ENG_Evaluation_BYENG(RepPar rp)
        {
            Reports rep = getStandardParameters();
            rep.AddParameter("FromDate", rp.FromDate.ToShortDateString());
            rep.AddParameter("ToDate", rp.ToDate.ToShortDateString());

            rep.AddParameter("braCode", rp.braCode);


            if (rp.ContrId == 0)
                rep.AddParameter("ContrId", "");
            else
                rep.AddParameter("ContrId", rp.ContrId);

            if (rp.SubID == 0)
                rep.AddParameter("SubID", "");
            else
                rep.AddParameter("SubID", rp.SubID);


            if (rp.EngID == 0)
                rep.AddParameter("EngID", "");
            else
                rep.AddParameter("EngID", rp.EngID);

            if (rp.ProjectID == 0)
                rep.AddParameter("ProjectID", "");
            else
                rep.AddParameter("ProjectID", rp.ProjectID);


            string url = rep.GetReportUrl("PRep_sub_Evaluation_BYENG");
            return Shared.JsonObject(url);
        }
        public JsonResult rpt_ENG_Evaluation_BYScope(RepPar rp)
        {

            Reports rep = getStandardParameters();
            rep.AddParameter("FromDate", rp.FromDate.ToShortDateString());
            rep.AddParameter("ToDate", rp.ToDate.ToShortDateString());

            rep.AddParameter("braCode", rp.braCode);


            if (rp.ContrId == 0)
                rep.AddParameter("ContrId", "");
            else
                rep.AddParameter("ContrId", rp.ContrId);

            if (rp.SubID == 0)
                rep.AddParameter("SubID", "");
            else
                rep.AddParameter("SubID", rp.SubID);


            if (rp.EngID == 0)
                rep.AddParameter("EngID", "");
            else
                rep.AddParameter("EngID", rp.EngID);

            if (rp.ProjectID == 0)
                rep.AddParameter("ProjectID", "");
            else
                rep.AddParameter("ProjectID", rp.ProjectID);



            string url = rep.GetReportUrl("PRep_sub_Evaluation_BYScope");
            return Shared.JsonObject(url);
        }


        public JsonResult rptSlsProductionBillt(RepPar rp)
        {
            Reports rep = getStandardParameters();
            rep.AddParameter("FromDate", rp.FromDate.ToShortDateString());
            rep.AddParameter("ToDate", rp.ToDate.ToShortDateString());
            // rep.AddParameter("BraCode",rep.);
            rep.AddParameter("braCode", rp.braCode);
            if (rp.Custid == 0)
                rep.AddParameter("Custid", "");
            else
                rep.AddParameter("Custid", rp.Custid);

            if (rp.CatID == 0)
                rep.AddParameter("CatID", "");
            else
                rep.AddParameter("CatID", rp.CatID);

            if (rp.EngID == 0)
                rep.AddParameter("EngID", "");

            else
                rep.AddParameter("EngID", rp.EngID);
            if (string.IsNullOrEmpty(rp.FromProjCode))
                rep.AddParameter("FromProjCode", "");
            else
                rep.AddParameter("FromProjCode", rp.FromProjCode);

            if (string.IsNullOrEmpty(rp.ToProjCode))
                rep.AddParameter("ToProjCode", "");
            else
                rep.AddParameter("ToProjCode", rp.ToProjCode);
            string url = rep.GetReportUrl("PRep_sls_ProductionBill");
            return Shared.JsonObject(url);
        }
        public JsonResult rptSlsProdctionList(RepPar rp)
        {
            Reports rep = getStandardParameters();
            rep.AddParameter("FromDate", rp.FromDate.ToShortDateString());
            rep.AddParameter("ToDate", rp.ToDate.ToShortDateString());
            // rep.AddParameter("BraCode",rep.);
            rep.AddParameter("braCode", rp.braCode);
            if (rp.Custid == 0)
                rep.AddParameter("Custid", "");
            else
                rep.AddParameter("Custid", rp.Custid);

            if (rp.CatID == 0)
                rep.AddParameter("CatID", "");
            else
                rep.AddParameter("CatID", rp.CatID);

            if (rp.EngID == 0)
                rep.AddParameter("EngID", "");

            else
                rep.AddParameter("EngID", rp.EngID);
            if (string.IsNullOrEmpty(rp.FromProjCode))
                rep.AddParameter("FromProjCode", "");
            else
                rep.AddParameter("FromProjCode", rp.FromProjCode);

            if (string.IsNullOrEmpty(rp.ToProjCode))
                rep.AddParameter("ToProjCode", "");
            else
                rep.AddParameter("ToProjCode", rp.ToProjCode);
            string url = rep.GetReportUrl("PRep_sls_ProductionList");
            return Shared.JsonObject(url);
        }

        public JsonResult rptSlsProdctioninvoes(RepPar rp)
        {
            Reports rep = getStandardParameters();
            rep.AddParameter("FromDate", rp.FromDate.ToShortDateString());
            rep.AddParameter("ToDate", rp.ToDate.ToShortDateString());
            // rep.AddParameter("BraCode",rep.);
            rep.AddParameter("braCode", rp.braCode);
            if (rp.Custid == 0)
                rep.AddParameter("Custid", "");
            else
                rep.AddParameter("Custid", rp.Custid);

            if (rp.CatID == 0)
                rep.AddParameter("CatID", "");
            else
                rep.AddParameter("CatID", rp.CatID);

            if (rp.EngID == 0)
                rep.AddParameter("EngID", "");

            else
                rep.AddParameter("EngID", rp.EngID);
            if (string.IsNullOrEmpty(rp.FromProjCode))
                rep.AddParameter("FromProjCode", "");
            else
                rep.AddParameter("FromProjCode", rp.FromProjCode);

            if (string.IsNullOrEmpty(rp.ToProjCode))
                rep.AddParameter("ToProjCode", "");
            else
                rep.AddParameter("ToProjCode", rp.ToProjCode);
            string url = rep.GetReportUrl("PPrnt_Rep_sls_Production_invoices");
            return Shared.JsonObject(url);
        }

        public JsonResult rptEngContracts(RepPar rp)
        {
            Reports rep = getStandardParameters();
            rep.AddParameter("FromDate", rp.FromDate.ToShortDateString());
            rep.AddParameter("ToDate", rp.ToDate.ToShortDateString());
            rep.AddParameter("braCodeRB", rp.braCode);
            if (rp.Custid == 0)
                rep.AddParameter("Custid", "");
            else
                rep.AddParameter("Custid", rp.Custid);

            if (rp.CatID == 0)
                rep.AddParameter("CatID", "");
            else
                rep.AddParameter("CatID", rp.CatID);

            if (rp.EngID == 0)
                rep.AddParameter("EngID", "");
            else
                rep.AddParameter("EngID", rp.EngID);
            if (string.IsNullOrEmpty(rp.FromProjCode))
                rep.AddParameter("FromProjCode", "");
            else
                rep.AddParameter("FromProjCode", rp.FromProjCode);

            if (string.IsNullOrEmpty(rp.ToProjCode))
                rep.AddParameter("ToProjCode", "");
            else
                rep.AddParameter("ToProjCode", rp.ToProjCode);

            rep.AddParameter("TypeReport", rp.TypeReport);
            string url = rep.GetReportUrl("Rep_sub_ProductionActivity");

            return Shared.JsonObject(url);
        }

        public JsonResult rptEngProjectStatus(RepPar rp)
        {
            Reports rep = getStandardParameters();

            rep.AddParameter("ToDate", rp.ToDate.ToShortDateString());

            rep.AddParameter("BarCode", rp.braCode);

            if (rp.Custid == 0)
                rep.AddParameter("Custid", "null");
            else
                rep.AddParameter("Custid", rp.Custid);

            if (rp.CatID == 0)
                rep.AddParameter("CatID", "null");
            else
                rep.AddParameter("CatID", rp.CatID);

            if (rp.EngID == 0)
                rep.AddParameter("EngID", "null");
            else
                rep.AddParameter("EngID", rp.EngID);


            if (string.IsNullOrEmpty(rp.FromProjCode))
                rep.AddParameter("FromProjCode", "");
            else
                rep.AddParameter("FromProjCode", rp.FromProjCode);
            if (string.IsNullOrEmpty(rp.ToProjCode))
                rep.AddParameter("ToProjCode", "");
            else
                rep.AddParameter("ToProjCode", rp.ToProjCode);

            string url = rep.GetReportUrl("PPrnt_Eng_ProjectStatus");
            return Shared.JsonObject(url);

        }

        public JsonResult rptEngProgressItem(RepPar rp)
        {
            Reports rep = getStandardParameters();
            rep.AddParameter("FromDate", rp.FromDate.ToShortDateString());
            rep.AddParameter("ToDate", rp.ToDate.ToShortDateString());

            rep.AddParameter("braCode", rp.braCode);


            if (rp.ProjectID == 0)
                rep.AddParameter("ProjectID", "");
            else
                rep.AddParameter("ProjectID", rp.ProjectID);


            if (rp.Phaseid == 0)
                rep.AddParameter("Phaseid", "");
            else
                rep.AddParameter("Phaseid", rp.Phaseid);

            string url = rep.GetReportUrl("");

            int streportType = Convert.ToInt32(rp.TypeReport);
            // url = rep.GetReportUrl("PPrnt_Eng_ProgressItem");

            if (streportType == 1)
            {
                url = rep.GetReportUrl("PPrnt_Eng_ProgressActivity");


            }
            else if (streportType == 2)
            {
                url = rep.GetReportUrl("PPrnt_Eng_ProgressItem");


            }


            return Shared.JsonObject(url);
        }

        public JsonResult Rep_eng_ProductionVSPRogress(RepPar rp)
        {
            Reports rep = getStandardParameters();

            
                rep.AddParameter("FromDate", rp.FromDate.ToString("dd/MM/yyyy"));
                rep.AddParameter("ToDate", rp.ToDate.ToString("dd/MM/yyyy"));

                rep.AddParameter("SiteEngineerId", rp.SiteEngineerId);
                rep.AddParameter("SalsEngId", rp.SalsEngId);
                rep.AddParameter("TypeReport", rp.TypeReport);
                rep.AddParameter("GroupType", rp.GroupType);
            
            string url = rep.GetReportUrl("PProc_Rep_eng_ProductionVSPRogress");




            return Shared.JsonObject(url);
        }
        public JsonResult rptEngExpensesSummary(RepPar rp)
        {
            Reports rep = getStandardParameters();

            if (rp.FromDate == null)
                rep.AddParameter("FromDate", "");
            else
                rep.AddParameter("FromDate", rp.FromDate.ToString("dd/MM/yyyy"));


            if (rp.ToDate == null)
                rep.AddParameter("ToDate", "");
            else
                rep.AddParameter("ToDate", rp.ToDate.ToString("dd/MM/yyyy"));


            rep.AddParameter("braCode", rp.braCode);


            if (rp.ProjectID == 0)
                rep.AddParameter("ProjectID", "");
            else
                rep.AddParameter("ProjectID", rp.ProjectID);


            if (rp.Phaseid == 0)
                rep.AddParameter("Phaseid", "");
            else
                rep.AddParameter("Phaseid", rp.Phaseid);

            if (rp.CatID == 0)
                rep.AddParameter("CatID", "");
            else
                rep.AddParameter("CatID", rp.CatID);

            if (rp.ExpID == 0)
                rep.AddParameter("ExpID", "");
            else
                rep.AddParameter("ExpID", rp.ExpID);



            string url = rep.GetReportUrl("");

            int streportType = Convert.ToInt32(rp.TypeReport);
            // url = rep.GetReportUrl("PPrnt_Eng_ProgressItem");

            if (streportType == 1)
            {
                url = rep.GetReportUrl("PPrnt_Eng_ExpensesSummary");


            }
            else if (streportType == 2)
            {
                url = rep.GetReportUrl("PPrnt_Eng_ExpensesDetail");


            }


            return Shared.JsonObject(url);
        }
        public JsonResult rptEng_BudgetRequirements(RepPar rp)
        {
            Reports rep = getStandardParameters();

            rep.AddParameter("braCode", rp.braCode);


            // string _Date = DateTime.Parse(rp.Monid.ToString()).ToString("MM");




            if (rp.yearID == 0)
                rep.AddParameter("yearID", "");
            else
                rep.AddParameter("yearID", rp.yearID);

            if (rp.Monid == "")
                rep.AddParameter("Monid", "");
            else
                rep.AddParameter("Monid", rp.Monid/*int.Parse(_Date)*/);

            if (rp.IsLabor == 0)
                rep.AddParameter("IsLabor", "");
            else
                rep.AddParameter("IsLabor", rp.IsLabor);

            if (rp.IsEquip == 0)
                rep.AddParameter("IsEquip", "");
            else
                rep.AddParameter("IsEquip", rp.IsEquip);

            if (rp.IsMat == 0)
                rep.AddParameter("IsMat", "");
            else
                rep.AddParameter("IsMat", rp.IsMat);





            //string ss = rp.Monid;





            string url = rep.GetReportUrl("Rep_Eng_BudgetRequirement");
            return Shared.JsonObject(url);
        }

        public JsonResult rptEng_MonthBudgetByEng(RepPar rp)
        {
            Reports rep = getStandardParameters();

            rep.AddParameter("braCode", rp.braCode);

            //string _Date = DateTime.Parse(rp.Monid.ToString()).ToString("MM");

            if (rp.yearID == 0)
                rep.AddParameter("yearID", "");
            else
                rep.AddParameter("yearID", rp.yearID);

            if (rp.Monid == "")
                rep.AddParameter("Monid", "");
            else
                rep.AddParameter("Monid", rp.Monid/* int.Parse(_Date)*/);

            if (rp.EngID == 0)
                rep.AddParameter("EngID", "");
            else
                rep.AddParameter("EngID", rp.EngID);

            string url = rep.GetReportUrl("Rep_Eng_BudgetEngineer");
            return Shared.JsonObject(url);
        }

        public JsonResult rptEng_MonthBudgetForBranch(RepPar rp)
        {
            Reports rep = getStandardParameters();

            rep.AddParameter("braCode", rp.braCode);


            //string _Date = DateTime.Parse(rp.Monid.ToString()).ToString("MM");

            if (rp.yearID == 0)
                rep.AddParameter("yearID", "");
            else
                rep.AddParameter("yearID", rp.yearID);

            if (rp.Monid == "")
                rep.AddParameter("Monid", "");
            else
                rep.AddParameter("Monid", rp.Monid/*int.Parse(_Date)*/);


            string url = rep.GetReportUrl("Rep_Eng_BudgetBranch");
            return Shared.JsonObject(url);
        }

        public JsonResult rptEng_MonthBudgetCompany(RepPar rp)
        {
            Reports rep = getStandardParameters();



            // string _Date = DateTime.Parse(rp.Monid.ToString()).ToString("MM");

            if (rp.yearID == 0)
                rep.AddParameter("yearID", "");
            else
                rep.AddParameter("yearID", rp.yearID);

            if (rp.Monid == "")
                rep.AddParameter("Monid", "");
            else
                rep.AddParameter("Monid", rp.Monid/*int.Parse(_Date)*/);


            string url = rep.GetReportUrl("Rep_Eng_BudgetCompany");
            return Shared.JsonObject(url);
        }


        public JsonResult rptSlsProdctionCustomer(RepPar rp)
        {
            Reports rep = getStandardParameters();
            rep.AddParameter("FromDate", rp.FromDate.ToShortDateString());
            rep.AddParameter("ToDate", rp.ToDate.ToShortDateString());
            // rep.AddParameter("BraCode",rep.);
            rep.AddParameter("braCode", rp.braCode);
            if (rp.Custid == 0)
                rep.AddParameter("Custid", "");
            else
                rep.AddParameter("Custid", rp.Custid);

            if (rp.CatID == 0)
                rep.AddParameter("CatID", "");
            else
                rep.AddParameter("CatID", rp.CatID);

            if (rp.EngID == 0)
                rep.AddParameter("EngID", "");
            else
                rep.AddParameter("EngID", rp.EngID);
            if (string.IsNullOrEmpty(rp.FromProjCode))
                rep.AddParameter("FromProjCode", "");
            else
                rep.AddParameter("FromProjCode", rp.FromProjCode);

            if (string.IsNullOrEmpty(rp.ToProjCode))
                rep.AddParameter("ToProjCode", "");
            else
                rep.AddParameter("ToProjCode", rp.ToProjCode);
            string url = rep.GetReportUrl("PRep_sls_ProductionCustomer");
            return Shared.JsonObject(url);
        }

        public JsonResult rptSlsProductionProject(RepPar rp)
        {
            Reports rep = getStandardParameters();
            rep.AddParameter("FromDate", rp.FromDate.ToShortDateString());
            rep.AddParameter("ToDate", rp.ToDate.ToShortDateString());
            // rep.AddParameter("BraCode",rep.);
            rep.AddParameter("braCode", rp.braCode);
            if (rp.Custid == 0)
                rep.AddParameter("Custid", "");
            else
                rep.AddParameter("Custid", rp.Custid);

            if (rp.CatID == 0)
                rep.AddParameter("CatID", "");
            else
                rep.AddParameter("CatID", rp.CatID);

            if (rp.EngID == 0)
                rep.AddParameter("EngID", "");

            else
                rep.AddParameter("EngID", rp.EngID);
            if (string.IsNullOrEmpty(rp.FromProjCode))
                rep.AddParameter("FromProjCode", "");
            else
                rep.AddParameter("FromProjCode", rp.FromProjCode);

            if (string.IsNullOrEmpty(rp.ToProjCode))
                rep.AddParameter("ToProjCode", "");
            else
                rep.AddParameter("ToProjCode", rp.ToProjCode);
            string url = rep.GetReportUrl("PRep_sls_ProductionProject");
            return Shared.JsonObject(url);
        }

        public JsonResult rptSlsActivityContract(RepPar rp)
        {
            Reports rep = getStandardParameters();
            rep.AddParameter("FromDate", rp.FromDate.ToShortDateString());
            rep.AddParameter("ToDate", rp.ToDate.ToShortDateString());
            rep.AddParameter("braCode", rp.braCode);

            if (rp.SubID == 0)
                rep.AddParameter("SubID", "");
            else
                rep.AddParameter("SubID", rp.SubID);

            if (rp.ContrNo == 0)
                rep.AddParameter("ContrNo", "");
            else
                rep.AddParameter("ContrNo", rp.ContrNo);

            if (rp.Sono == 0)
                rep.AddParameter("Sono", "");
            else
                rep.AddParameter("Sono", rp.Sono);

            if (rp.ProjectID == 0)
                rep.AddParameter("ProjectID", "");
            else
                rep.AddParameter("ProjectID", rp.ProjectID);


            if (rp.Phaseid == 0)
                rep.AddParameter("Phaseid", "");
            else
                rep.AddParameter("Phaseid", rp.Phaseid);

            string url = rep.GetReportUrl("");

            int streportType = Convert.ToInt32(rp.TypeReport);
            if (streportType == 1)
            {
                url = rep.GetReportUrl("Rep_sub_ActivityContract");


            }
            else if (streportType == 2)
            {
                url = rep.GetReportUrl("Rep_sub_ActivityProduction");


            }
            else if (streportType == 3)
            {
                url = rep.GetReportUrl("Rep_sub_ActivityServiceOrder");


            }

            return Shared.JsonObject(url);
        }



        public JsonResult rptSlsSubContractorListing(RepPar rp)
        {
            Reports rep = getStandardParameters();
            rep.AddParameter("FromDate", rp.FromDate.ToShortDateString());
            rep.AddParameter("ToDate", rp.ToDate.ToShortDateString());

            rep.AddParameter("braCode", rp.braCode);


            if (rp.ScopeID == 0)
                rep.AddParameter("ScopeID", "");
            else
                rep.AddParameter("ScopeID", rp.ScopeID);


            if (string.IsNullOrEmpty(rp.FromSubCode))
                rep.AddParameter("FromSubCode", "");
            else
                rep.AddParameter("FromSubCode", rp.FromSubCode);


            if (string.IsNullOrEmpty(rp.ToSubCode))
                rep.AddParameter("ToSubCode", "");
            else
                rep.AddParameter("ToSubCode", rp.ToSubCode);

            if (string.IsNullOrEmpty(rp.FromEval))
                rep.AddParameter("FromEval", "");
            else
                rep.AddParameter("FromEval", rp.FromEval);

            if (string.IsNullOrEmpty(rp.toEval))
                rep.AddParameter("toEval", "");
            else
                rep.AddParameter("toEval", rp.toEval);








            string url = rep.GetReportUrl("Rep_sub_SubcontractList");

            return Shared.JsonObject(url);




        }


        public JsonResult rptRes_MaterialUsage(RepPar rp)
        {
            Reports rep = getStandardParameters();

            rep.AddParameter("FromDate", rp.FromDate.ToShortDateString());
            rep.AddParameter("ToDate", rp.ToDate.ToShortDateString());


            if (rp.ItemId == 0)
                rep.AddParameter("ItemId", "");
            else
                rep.AddParameter("ItemId", rp.ItemId);


            if (rp.ProjectID == 0)
                rep.AddParameter("ProjectID", "");
            else
                rep.AddParameter("ProjectID", rp.ProjectID);



            if (rp.custClassID == 0)
                rep.AddParameter("custClassID", "");
            else
                rep.AddParameter("custClassID", rp.custClassID);



            if (rp.customerID == 0)
                rep.AddParameter("customerID", "");
            else
                rep.AddParameter("customerID", rp.customerID);



            if (rp.scopeClassId == 0)
                rep.AddParameter("scopeClassId", "");
            else
                rep.AddParameter("scopeClassId", rp.scopeClassId);




            if (rp.ScopeID == 0)
                rep.AddParameter("ScopeID", "");
            else
                rep.AddParameter("ScopeID", rp.ScopeID);




            string url = rep.GetReportUrl("");

            int streportType = Convert.ToInt32(rp.TypeReport);
            if (streportType == 1)
            {
                url = rep.GetReportUrl("Rep_Res_MaterialUseItemSum");


            }
            else if (streportType == 2)
            {
                url = rep.GetReportUrl("Rep_Res_MaterialUseItemDet");


            }

            return Shared.JsonObject(url);
        }

        public JsonResult rptRes_MaterialUsageSummary(RepPar rp)
        {
            Reports rep = getStandardParameters();

            rep.AddParameter("FromDate", rp.FromDate.ToShortDateString());
            rep.AddParameter("ToDate", rp.ToDate.ToShortDateString());
            rep.AddParameter("braCode", rp.braCode);


            if (rp.ProjectID == 0)
                rep.AddParameter("ProjectID", "");
            else
                rep.AddParameter("ProjectID", rp.ProjectID);

            if (rp.Phaseid == 0)
                rep.AddParameter("Phaseid", "");
            else
                rep.AddParameter("Phaseid", rp.Phaseid);



            if (rp.EngID == 0)
                rep.AddParameter("EngID", "");
            else
                rep.AddParameter("EngID", rp.EngID);


            string url = rep.GetReportUrl("");

            int streportType = Convert.ToInt32(rp.TypeReport);
            if (streportType == 1)
            {
                url = rep.GetReportUrl("PProc_Rep_Res_MaterialUseSumMaterial");


            }
            else if (streportType == 2)
            {
                url = rep.GetReportUrl("PProc_Rep_Res_MaterialUseSumTrans");


            }

            return Shared.JsonObject(url);
        }
        public JsonResult rptRes_ProjectRequirements(RepPar rp)
        {
            Reports rep = getStandardParameters();
            rep.AddParameter("braCode", rp.braCode);
            if (rp.ProjectID == 0)
                rep.AddParameter("ProjectID", "");
            else
                rep.AddParameter("ProjectID", rp.ProjectID);

            if (rp.Phaseid == 0)
                rep.AddParameter("Phaseid", "");
            else
                rep.AddParameter("Phaseid", rp.Phaseid);

            string url = rep.GetReportUrl("");

            int streportType = Convert.ToInt32(rp.TypeReport);
            if (streportType == 1)
            {
                url = rep.GetReportUrl("Rep_Res_RequirmentPhase");


            }
            else if (streportType == 2)
            {
                url = rep.GetReportUrl("Rep_Res_RequirmentItem");


            }

            return Shared.JsonObject(url);
        }

        public JsonResult Rep_repLaborEvaluation(RepPar rp)
        {
            Reports rep = getStandardParameters();

            if (rp.braCode == 0)
                rep.AddParameter("braCode", "");
            else
                rep.AddParameter("braCode", rp.braCode);

            rep.AddParameter("FromDate", rp.FromDate.ToShortDateString());

            rep.AddParameter("ToDate", rp.ToDate.ToShortDateString());

            

            if (rp.EngID == 0)
                rep.AddParameter("EngID", "");
            else
                rep.AddParameter("EngID", rp.EngID);

            if (rp.LabClassID == 0)
                rep.AddParameter("LabClassID", "");
            else
                rep.AddParameter("LabClassID", rp.LabClassID);

            if (rp.LabCatID == 0)
                rep.AddParameter("LabCatID", "");
            else
                rep.AddParameter("LabCatID", rp.LabCatID);

            if (rp.FromLabCode == "" || rp.FromLabCode == null)
                rep.AddParameter("FromLabCode", "");
            else
                rep.AddParameter("FromLabCode", rp.FromLabCode);

            if (rp.ToLabCode == "" || rp.ToLabCode == null)
                rep.AddParameter("ToLabCode", "");
            else
                rep.AddParameter("ToLabCode", rp.ToLabCode);

            if (rp.FromProjCode == "" || rp.FromProjCode == null)
                rep.AddParameter("FromProjCode", "");
            else
                rep.AddParameter("FromProjCode", rp.FromProjCode);

            if (rp.ToProjCode == "" || rp.ToProjCode == null)
                rep.AddParameter("ToProjCode", "");
            else
                rep.AddParameter("ToProjCode", rp.ToProjCode);


            rep.AddParameter("TypeReport", rp.TypeReport);

            string url = rep.GetReportUrl("Proc_repLaborEvaluation");



            return Shared.JsonObject(url);

        }

        public JsonResult LabourMovementByProject(RepPar rp)
        {
            Reports rep = getStandardParameters();

            if (rp.braCode == 0)
                rep.AddParameter("braCode", "");
            else
                rep.AddParameter("braCode", rp.braCode);

            rep.AddParameter("FromDate", rp.FromDate.ToShortDateString());

            rep.AddParameter("ToDate", rp.ToDate.ToShortDateString());

            if (rp.ProjectID == 0)
                rep.AddParameter("ProjectID", "");
            else
                rep.AddParameter("ProjectID", rp.ProjectID);

            if (rp.EngID == 0)
                rep.AddParameter("EngID", "");
            else
                rep.AddParameter("EngID", rp.EngID);

            if (rp.LabClassID == 0)
                rep.AddParameter("LabClassID", "");
            else
                rep.AddParameter("LabClassID", rp.LabClassID);

            if (rp.LabCatID == 0)
                rep.AddParameter("LabCatID", "");
            else
                rep.AddParameter("LabCatID", rp.LabCatID);

            if (rp.FromLabCode == "" || rp.FromLabCode == null)
                rep.AddParameter("FromLabCode", "");
            else
                rep.AddParameter("FromLabCode", rp.FromLabCode);

            if (rp.ToLabCode == "" || rp.ToLabCode == null)
                rep.AddParameter("ToLabCode", "");
            else
                rep.AddParameter("ToLabCode", rp.ToLabCode);


            string url = rep.GetReportUrl("Proc_RepLabourMovementByProject");



            return Shared.JsonObject(url);

        }



        public JsonResult rptRes_MaterialUsageproject(RepPar rp)
        {
            Reports rep = getStandardParameters();

            rep.AddParameter("FromDate", rp.FromDate.ToShortDateString());
            rep.AddParameter("ToDate", rp.ToDate.ToShortDateString());



            if (rp.ItemId == 0)
                rep.AddParameter("ItemId", "");
            else
                rep.AddParameter("ItemId", rp.ItemId);

            if (rp.itemCatID == 0)
                rep.AddParameter("itemCatID", "");
            else
                rep.AddParameter("itemCatID", rp.itemCatID);

            if (rp.ProjectID == 0)
                rep.AddParameter("ProjectID", "");
            else
                rep.AddParameter("ProjectID", rp.ProjectID);



            string url = rep.GetReportUrl("");

            int streportType = Convert.ToInt32(rp.TypeReport);
            if (streportType == 1)
            {
                url = rep.GetReportUrl("Rep_Res_MaterialUseProjectSum");


            }
            else if (streportType == 2)
            {
                url = rep.GetReportUrl("Rep_Res_MaterialUseProjectDet");


            }

            return Shared.JsonObject(url);
        }


        public JsonResult rptRes_LaborMovement_print(RepPar rp)
        {//11
            Reports rep = getStandardParameters();

            rep.AddParameter("braCode", rp.braCode);

            rep.AddParameter("FromDate", rp.FromDate.ToShortDateString());
            rep.AddParameter("ToDate", rp.ToDate.ToShortDateString());



            if (rp.LabClassID == 0)
                rep.AddParameter("LabClassID", "");
            else
                rep.AddParameter("LabClassID", rp.LabClassID);



            if (rp.LabCatID == 0)
                rep.AddParameter("LabCatID", "");
            else

                rep.AddParameter("LabCatID", rp.LabCatID);

            if (rp.FromLabCode == "" || rp.FromLabCode == null)
                rep.AddParameter("FromLabCode", "");
            else
                rep.AddParameter("FromLabCode", rp.FromLabCode);




            if (rp.ToLabCode == "" || rp.ToLabCode == null)
                rep.AddParameter("ToLabCode", "");
            else
                rep.AddParameter("ToLabCode", rp.ToLabCode);


            string url = rep.GetReportUrl("");

            int streportType = Convert.ToInt32(rp.TypeReport);
            if (streportType == 1)
            {
                url = rep.GetReportUrl("Rep_Res_LabourMovement");


            }
            else if (streportType == 2)
            {
                url = rep.GetReportUrl("Rep_Res_LabourMovementFreeLAbor");


            }

            return Shared.JsonObject(url);


        }

        public JsonResult rptRes_UnprodHour_print(RepPar rp)
        {
            Reports rep = getStandardParameters();

            rep.AddParameter("braCode", rp.braCode);

            rep.AddParameter("FromDate", rp.FromDate.ToShortDateString());
            rep.AddParameter("ToDate", rp.ToDate.ToShortDateString());

            rep.AddParameter("FromProjCode", rp.FromProjCode);
            rep.AddParameter("ToProjCode", rp.ToProjCode);

            if (rp.EngID == 0)
                rep.AddParameter("EngID", "");
            else
                rep.AddParameter("EngID", rp.EngID);


            if (rp.custClassID == 0)
                rep.AddParameter("custClassID", "");
            else
                rep.AddParameter("custClassID", rp.custClassID);


            if (rp.customerID == 0)
                rep.AddParameter("customerID", "");
            else
                rep.AddParameter("customerID", rp.customerID);


            if (rp.scopeClassId == 0)
                rep.AddParameter("scopeClassId", "");
            else
                rep.AddParameter("scopeClassId", rp.scopeClassId);


            if (rp.ScopeID == 0)
                rep.AddParameter("ScopeID", "");
            else
                rep.AddParameter("ScopeID", rp.ScopeID);



            if (rp.UnProdId == 0)
                rep.AddParameter("UnProdId", "");
            else
                rep.AddParameter("UnProdId", rp.UnProdId);


            if (rp.UnprodCatID == 0)
                rep.AddParameter("UnprodCatID", "");
            else
                rep.AddParameter("UnprodCatID", rp.UnprodCatID);



            string url = rep.GetReportUrl("");

            int streportType = Convert.ToInt32(rp.TypeReport);
            if (streportType == 1)
            {
                url = rep.GetReportUrl("Rep_Res_UnprodSum");


            }
            else if (streportType == 2)
            {
                url = rep.GetReportUrl("Rep_Res_UnprodDetail");


            }

            return Shared.JsonObject(url);

        }

        public JsonResult rptAttendanceSheet(RepPar rp)
        {
            Reports rep = getStandardParameters();
            rep.AddParameter("FromDate", rp.FromDate.ToShortDateString());
            rep.AddParameter("ToDate", rp.ToDate.ToShortDateString());


            rep.AddParameter("braCode", rp.braCode);

            if (rp.LabClassID == 0)
                rep.AddParameter("LabClassID", "");
            else
                rep.AddParameter("LabClassID", rp.LabClassID);

            if (rp.LabCatID == 0)
                rep.AddParameter("LabCatID", "");
            else
                rep.AddParameter("LabCatID", rp.LabCatID);



            if (string.IsNullOrEmpty(rp.FromLabCode))
                rep.AddParameter("FromLab", "");
            else
                rep.AddParameter("FromLab", rp.FromLabCode);
            if (string.IsNullOrEmpty(rp.ToLabCode))
                rep.AddParameter("ToLab", "");
            else
                rep.AddParameter("ToLab", rp.ToLabCode);

            string url;

            // int streportType = Convert.ToInt32(rp.TypeReport);

            url = rep.GetReportUrl("Rep_Res_LabourAttendance");





            return Shared.JsonObject(url); ;

        }

        public JsonResult rptRes_LaborWork_print(RepPar rp)
        {
            Reports rep = getStandardParameters();

            if (rp.braCode == 0)
                rep.AddParameter("braCode", "");
            else
                rep.AddParameter("braCode", rp.braCode);

            rep.AddParameter("FromDate", rp.FromDate.ToShortDateString());

            rep.AddParameter("ToDate", rp.ToDate.ToShortDateString());

            if (rp.FromProjCode == "" || rp.FromProjCode == null)
                rep.AddParameter("FromProjCode", "");
            else
                rep.AddParameter("FromProjCode", rp.FromProjCode);


            
            if (rp.ToProjCode == "" || rp.FromProjCode == null)
                rep.AddParameter("ToProjCode", "");
            else
                rep.AddParameter("ToProjCode", rp.ToProjCode);



            if (rp.EngID == 0)
                rep.AddParameter("EngID", "");
            else
                rep.AddParameter("EngID", rp.EngID);



            if (rp.scopeClassId == 0)
                rep.AddParameter("scopeClassId", "");
            else
                rep.AddParameter("scopeClassId", rp.scopeClassId);


            if (rp.ScopeID == 0)
                rep.AddParameter("ScopeID", "");
            else
                rep.AddParameter("ScopeID", rp.ScopeID);


            if (rp.LabClassID == 0)
                rep.AddParameter("LabClassID", "");
            else
                rep.AddParameter("LabClassID", rp.LabClassID);


            if (rp.LabCatID == 0)
                rep.AddParameter("LabCatID", "");
            else
                rep.AddParameter("LabCatID", rp.LabCatID);

            if (rp.FromLabCode == "" || rp.FromLabCode == null)
                rep.AddParameter("FromLabCode", "");
            else
                rep.AddParameter("FromLabCode", rp.FromLabCode);

            if (rp.ToLabCode == "" || rp.ToLabCode == null)
                rep.AddParameter("ToLabCode", "");
            else
                rep.AddParameter("ToLabCode", rp.ToLabCode);
            

            string url = rep.GetReportUrl("");

            int streportType = Convert.ToInt32(rp.TypeReport);
            if (streportType == 1)
            {
                url = rep.GetReportUrl("Rep_Res_Labourwork");
            }
            else if (streportType == 2)
            {
                url = rep.GetReportUrl("Rep_Res_LabourBounus");
            }

            return Shared.JsonObject(url);

        }

        public JsonResult rptRes_EquipmentWORK_print(RepPar rp)
        {
            Reports rep = getStandardParameters();

            rep.AddParameter("FromDate", rp.FromDate.ToShortDateString());
            rep.AddParameter("ToDate", rp.ToDate.ToShortDateString());

            if (rp.FromProjCode == "" || rp.FromProjCode == null)
                rep.AddParameter("FromProjCode", "");
            else
                rep.AddParameter("FromProjCode", rp.FromProjCode);



            if (rp.ToProjCode == "" || rp.ToProjCode == null)
                rep.AddParameter("ToProjCode", "");
            else
                rep.AddParameter("ToProjCode", rp.ToProjCode);

            //rep.AddParameter("FromProjCode", rp.FromProjCode);
            //rep.AddParameter("ToProjCode", rp.ToProjCode);

            if (rp.braCode == 0)
                rep.AddParameter("braCode", "");
            else
                rep.AddParameter("braCode", rp.braCode);

            if (rp.EngID == 0)
                rep.AddParameter("EngID", "");
            else
                rep.AddParameter("EngID", rp.EngID);

            if (rp.scopeClassId == 0)
                rep.AddParameter("scopeClassId", "");
            else
                rep.AddParameter("scopeClassId", rp.scopeClassId);


            if (rp.ScopeID == 0)
                rep.AddParameter("ScopeID", "");
            else
                rep.AddParameter("ScopeID", rp.ScopeID);


            if (rp.EquipClassID == 0)
                rep.AddParameter("EquipClassID", "");
            else
                rep.AddParameter("EquipClassID", rp.EquipClassID);



            if (rp.FromEquipCode == "" || rp.FromEquipCode == null)
                rep.AddParameter("FromEquipCode", "");
            else
                rep.AddParameter("FromEquipCode", rp.FromEquipCode);



            if (rp.ToEquipCode == "" || rp.ToEquipCode == null)
                rep.AddParameter("ToEquipCode", "");
            else
                rep.AddParameter("ToEquipCode", rp.ToEquipCode);



            //rep.AddParameter("FromEquipCode", rp.FromEquipCode.ToString());
            //rep.AddParameter("ToEquipCode", rp.ToEquipCode.ToString());




            string url = rep.GetReportUrl("Rep_Res_Equipmentwork");
            return Shared.JsonObject(url);

        }

        public JsonResult rptEquipmentmovement(RepPar rp)
        {
            Reports rep = getStandardParameters();
            rep.AddParameter("braCode", rp.braCode);
            rep.AddParameter("FromDate", rp.FromDate.ToShortDateString());
            rep.AddParameter("ToDate", rp.ToDate.ToShortDateString());

            rep.AddParameter("braCodeRB", rp.braCode);

            if (rp.EquipClassID == 0)
                rep.AddParameter("EquipClassID", "");
            else
                rep.AddParameter("EquipClassID", rp.EquipClassID);
            
            if (string.IsNullOrEmpty(rp.FromEquipCode))
                rep.AddParameter("FromEquip", "");
            else
                rep.AddParameter("FromEquip", rp.FromEquipCode);
            if (string.IsNullOrEmpty(rp.ToEquipCode))
                rep.AddParameter("ToEquip", "");
            else
                rep.AddParameter("ToEquip", rp.ToEquipCode);

            string url;

            // int streportType = Convert.ToInt32(rp.TypeReport);

            url = rep.GetReportUrl("Rep_Res_EquipmentMovement");





            return Shared.JsonObject(url); ;

        }

        public JsonResult rptSlsProduction(RepPar rp)
        {
            Reports rep = getStandardParameters();
            rep.AddParameter("FromDate", rp.FromDate.ToShortDateString());
            rep.AddParameter("ToDate", rp.ToDate.ToShortDateString());

            rep.AddParameter("braCode", rp.braCode);


            if (rp.SubID == 0)
                rep.AddParameter("SubID", "");
            else
                rep.AddParameter("SubID", rp.SubID);

            if (rp.ContrId == 0)
                rep.AddParameter("ContrId", "");
            else
                rep.AddParameter("ContrId", rp.ContrId);

            if (rp.SoId == 0)
                rep.AddParameter("SoId", "");
            else
                rep.AddParameter("SoId", rp.SoId);

            if (rp.ProjectID == 0)
                rep.AddParameter("ProjectID", "");
            else
                rep.AddParameter("ProjectID", rp.ProjectID);


            if (rp.Phaseid == 0)
                rep.AddParameter("Phaseid", "");
            else
                rep.AddParameter("Phaseid", rp.Phaseid);




            string url = rep.GetReportUrl("");

            int streportType = Convert.ToInt32(rp.TypeReport);
            if (streportType == 1)
            {

                url = rep.GetReportUrl("PRep_sub_ProductionProject");

            }
            else if (streportType == 2)
            {

                url = rep.GetReportUrl("Rep_sub_ProductionPhase");


            }
            else if (streportType == 3)
            {

                url = rep.GetReportUrl("Rep_sub_ProductionActivity");

            }

            return Shared.JsonObject(url);
        }

        public JsonResult rptSlsEngineerActivity(RepPar rp)
        {
            Reports rep = getStandardParameters();
            rep.AddParameter("FromDate", rp.FromDate.ToShortDateString());
            rep.AddParameter("ToDate", rp.ToDate.ToShortDateString());
            // rep.AddParameter("BraCode",rep.);
            rep.AddParameter("BranchCode", rp.braCode);
            if (rp.Custid == 0)
                rep.AddParameter("Custid", "");
            else
                rep.AddParameter("Custid", rp.Custid);


            if (rp.CatID == 0)
                rep.AddParameter("CatID", "");
            else
                rep.AddParameter("CatID", rp.CatID);

            if (rp.EngID == 0)
                rep.AddParameter("EngID", "");
            else
                rep.AddParameter("EngID", rp.EngID);

            string url = rep.GetReportUrl("PRep_sls_EngineerActivity");
            return Shared.JsonObject(url);
        }
        public JsonResult rptSlsCRMReport(RepPar rp)
        {
            Reports rep = getStandardParameters();
            rep.AddParameter("FromDate", rp.FromDate.ToShortDateString());
            rep.AddParameter("ToDate", rp.ToDate.ToShortDateString());
            // rep.AddParameter("BraCode",rep.);
             rep.AddParameter("BranchCode", rp.braCode);
            if (rp.Custid == 0)
                rep.AddParameter("Custid", "");
            else
                rep.AddParameter("Custid", rp.Custid); 

            if (rp.EngID == 0)
                rep.AddParameter("EngID", "");
            else
                rep.AddParameter("EngID", rp.EngID);

            if (rp.GroupType == 0)
                rep.AddParameter("GroupType", "");
            else
                rep.AddParameter("GroupType", rp.GroupType);

            string url = rep.GetReportUrl("PRep_sls_CRMReport");
            return Shared.JsonObject(url);
        }
        
        public JsonResult rptSlsinvoices(RepPar rp)
        {
            Reports rep = getStandardParameters();
            rep.AddParameter("FromDate", rp.FromDate.ToShortDateString());
            rep.AddParameter("ToDate", rp.ToDate.ToShortDateString());
            // rep.AddParameter("BraCode",rep.);
             rep.AddParameter("BranchCode", rp.braCode);

           

            if (rp.Custid == 0)
                rep.AddParameter("Custid", "");
            else
                rep.AddParameter("Custid", rp.Custid); 
            
            if (rp.CatID == 0)
                rep.AddParameter("CatID", "");
            else
                rep.AddParameter("CatID", rp.CatID); 

            if (rp.EngID == 0)
                rep.AddParameter("EngID", "");
            else
                rep.AddParameter("EngID", rp.EngID);

            if (rp.GroupType == 0)
                rep.AddParameter("GroupType", "");
            else
                rep.AddParameter("GroupType", rp.GroupType);

            if (rp.FromProjCode == null)
                rep.AddParameter("FromProjCode", "");
            else
                rep.AddParameter("FromProjCode", rp.FromProjCode);

            if (rp.ToProjCode == null)
                rep.AddParameter("ToProjCode", "");
            else
                rep.AddParameter("ToProjCode", rp.ToProjCode);
            string url = rep.GetReportUrl("PRep_sls_invoicesProgressAndDownpayment");
            return Shared.JsonObject(url);
        }

        public JsonResult rep_Eng_Budget(RepPar rp)
        {
            Reports rep = getStandardParameters();

            rep.AddParameter("braCode", rp.braCode);

            if (rp.yearID == 0)
            {
                rep.AddParameter("yearID", "");
            }
            else
                rep.AddParameter("yearID", rp.yearID);

            if (rp.MonthCode == 0)

                rep.AddParameter("MonthCode", "");
            else
                rep.AddParameter("MonthCode", rp.MonthCode);

            if (rp.EngID == 0)
                rep.AddParameter("EngID", "");
            else
                rep.AddParameter("EngID", rp.EngID);

            string url = rep.GetReportUrl("Prnt_Eng_Budget");


            return Shared.JsonObject(url);
        }

        public JsonResult rptProjectDistribution(RepPar rp)
        {
            Reports rep = getStandardParameters();

            rep.AddParameter("braCode", rp.braCode);

            if (rp.EngID == 0)
                rep.AddParameter("SalesEngineerId", "");
            else
                rep.AddParameter("SalesEngineerId", rp.EngID);

            if (rp.custClassID == 0)
                rep.AddParameter("CustomerCategoryID", "");
            else
                rep.AddParameter("CustomerCategoryID", rp.custClassID);


            if (rp.customerID == 0)
                rep.AddParameter("CustomerID", "");
            else
                rep.AddParameter("CustomerID", rp.customerID);



            if (rp.Stat == 0)
                rep.AddParameter("Stat", "");
            else
                rep.AddParameter("Stat", rp.Stat);


            string url = rep.GetReportUrl("");

            int streportType = Convert.ToInt32(rp.TypeReport);

            
            if (streportType == 1)
            {
                url = rep.GetReportUrl("Rep_GRP_DistributionArea");


            }
            else if (streportType == 2)
            {
                url = rep.GetReportUrl("Rep_GRP_DistributionProject");


            }


            return Shared.JsonObject(url);

        }
        public JsonResult rptProjectPhaseDistribution(RepPar rp)
        {
            Reports rep = getStandardParameters();

            rep.AddParameter("braCode", rp.braCode);



            if (rp.EngID == 0)
                rep.AddParameter("SalesEngineerId", "");
            else
                rep.AddParameter("SalesEngineerId", rp.EngID);



            if (rp.SiteEngineerId == 0)
                rep.AddParameter("SiteEngineerId", "");
            else
                rep.AddParameter("SiteEngineerId", rp.SiteEngineerId);


            if (rp.ScopeCategoryID == 0)
                rep.AddParameter("ScopeCategoryID", "");
            else
                rep.AddParameter("ScopeCategoryID", rp.ScopeCategoryID);



            if (rp.ScopeID == 0)
                rep.AddParameter("ScopeID", "");
            else
                rep.AddParameter("ScopeID", rp.ScopeID);


            if (rp.customerID == 0)
                rep.AddParameter("CustomerID", "");
            else
                rep.AddParameter("CustomerID", rp.customerID);

            if (rp.custClassID == 0)
                rep.AddParameter("custClassID", "");
            else
                rep.AddParameter("custClassID", rp.custClassID);
            if (rp.IsRepair == null)
                rep.AddParameter("IsRepair", "null");
            else
                rep.AddParameter("IsRepair", rp.IsRepair);

            if (rp.Stat == 0)
                rep.AddParameter("Stat", "");
            else
                rep.AddParameter("Stat", rp.Stat);




            string url = rep.GetReportUrl("");

            int streportType = Convert.ToInt32(rp.TypeReport);


            if (streportType == 1)
            {
                url = rep.GetReportUrl("Rep_GRP_DistributionPaseByScope");


            }
            else if (streportType == 2)
            {
                url = rep.GetReportUrl("Rep_GRP_DistributionPaseByEngineer");


            }


            return Shared.JsonObject(url);

        }

        public JsonResult rptProjectBandFollow(RepPar rp)
        {
            Reports rep = getStandardParameters();
            rep.AddParameter("FromDate", rp.FromDate.ToShortDateString());
            rep.AddParameter("ToDate", rp.ToDate.ToShortDateString());

            //rep.AddParameter("braCode", rp.braCode);


            if (rp.ProjectID == 0)
                rep.AddParameter("ProjectID", "");
            else
                rep.AddParameter("ProjectID", rp.ProjectID);

            string url = rep.GetReportUrl("PPrnt_ProjectBandFollow");


            return Shared.JsonObject(url);
        }
        public JsonResult P_repSiteEngineerBonus(RepPar rp)
        {
            Reports rep = getStandardParameters();
            rep.AddParameter("yearID", rp.yearID );
            rep.AddParameter("ProjectID", rp.ProjectID );

            rep.AddParameter("braCode", rp.braCode);
            rep.AddParameter("CatID", rp.CatID);


            string url = rep.GetReportUrl("PPrnt_SiteEngineerBonus");


            return Shared.JsonObject(url);
        }
        public JsonResult P_repSalesEngineerBonus(RepPar rp)
        {
            Reports rep = getStandardParameters();
            rep.AddParameter("yearID", rp.yearID);
            rep.AddParameter("ProjectID", rp.ProjectID);
            rep.AddParameter("EngId", rp.EngID);
            rep.AddParameter("braCode", rp.braCode);
            rep.AddParameter("CatID", rp.CatID);


            string url = rep.GetReportUrl("PPrnt_SalesEngineerBonus");


            return Shared.JsonObject(url);
        }
        public JsonResult rptProjectWorking(RepPar rp)
        {
            Reports rep = getStandardParameters();

           
            if (rp.braCode==0)
                rep.AddParameter("braCode", "");
            else
                rep.AddParameter("braCode", rp.braCode);


            if (string.IsNullOrEmpty(rp.FromDate.ToString()))
                rep.AddParameter("fromDate", "");
            else
                rep.AddParameter("fromDate", rp.FromDate);

            if (string.IsNullOrEmpty(rp.ToDate.ToString()))
                rep.AddParameter("toDate", "");
            else
                rep.AddParameter("toDate", rp.ToDate);

            if (rp.FromProjCode == "")
                rep.AddParameter("FromProjCode", "");
            else
                rep.AddParameter("FromProjCode", rp.FromProjCode);

            if (rp.ToProjCode == "")
                rep.AddParameter("ToProjCode", "");
            else
                rep.AddParameter("ToProjCode", rp.ToProjCode);

            if (rp.EngID == 0)
                rep.AddParameter("SalesEngineerId", "");
            else
                rep.AddParameter("SalesEngineerId", rp.EngID);

            if (rp.SiteEngineerId == 0)
                rep.AddParameter("SiteEngineerId", "");
            else
                rep.AddParameter("SiteEngineerId", rp.SiteEngineerId);

            if (rp.ScopeCategoryID == 0)
                rep.AddParameter("ScopeCategoryID", "");
            else
                rep.AddParameter("ScopeCategoryID", rp.ScopeCategoryID);

            if (rp.ScopeID == 0)
                rep.AddParameter("ScopeID", "");
            else
                rep.AddParameter("ScopeID", rp.ScopeID);

            if (rp.customerID == 0)
                rep.AddParameter("CustomerID", "");
            else
                rep.AddParameter("CustomerID", rp.customerID);

            if (rp.custClassID == 0)
                rep.AddParameter("CustomerCategoryID", "");
            else
                rep.AddParameter("CustomerCategoryID", rp.custClassID);

            if (rp.IsRepair == 3)
                rep.AddParameter("IsRepair", "null");
            else
                rep.AddParameter("IsRepair", rp.IsRepair);
            //if (rp.IsRepair == null)
            //    rep.AddParameter("IsRepair", "null");
            //else
            //    rep.AddParameter("IsRepair", rp.IsRepair);

            if (rp.Stat == 0)
                rep.AddParameter("Stat", "");
            else
                rep.AddParameter("Stat", rp.Stat);




            string url = rep.GetReportUrl("PPrnt_ProjectWorking");






            return Shared.JsonObject(url);

        }

        public JsonResult rptProjectFollowUp(RepPar rp)
        {
            Reports rep = getStandardParameters();

            rep.AddParameter("braCode", rp.braCode);



            if (rp.FromDate == null)
                rep.AddParameter("FromDate", "");
            else
                rep.AddParameter("FromDate", rp.FromDate.ToString("dd/MM/yyyy"));


            if (rp.ToDate == null)
                rep.AddParameter("ToDate", "");
            else
                rep.AddParameter("ToDate", rp.ToDate.ToString("dd/MM/yyyy"));
            
            if (rp.FromProjCode == "")
                rep.AddParameter("FromProjCode", "");
            else
                rep.AddParameter("FromProjCode", rp.FromProjCode);

            if (rp.ToProjCode == "")
                rep.AddParameter("ToProjCode", "");
            else
                rep.AddParameter("ToProjCode", rp.ToProjCode);

            if (rp.EngID == 0)
                rep.AddParameter("SalesEngineerId", "");
            else
                rep.AddParameter("SalesEngineerId", rp.EngID);

            if (rp.custClassID == 0)
                rep.AddParameter("CustomerCategoryID", "");
            else
                rep.AddParameter("CustomerCategoryID", rp.custClassID);

            if (rp.customerID == 0)
                rep.AddParameter("CustomerID", "");
            else
                rep.AddParameter("CustomerID", rp.customerID);

            if (rp.Stat == 0)
                rep.AddParameter("Stat", "");
            else
                rep.AddParameter("Stat", rp.Stat);

            string url = rep.GetReportUrl("");

            int streportType = Convert.ToInt32(rp.TypeReport);


            if (streportType == 1)
            {
                url = rep.GetReportUrl("PPrnt_GRPBySalesEng");

            }
            else if (streportType == 2)
            {
                url = rep.GetReportUrl("PPrnt_GRPByCustomer");

            }


            return Shared.JsonObject(url);

        }

        public JsonResult P_repProjectEvaluation(RepPar rp)
        {
            Reports rep = getStandardParameters();

            if (string.IsNullOrEmpty(rp.braCode.ToString()))
                rep.AddParameter("braCode", "");
            else
                rep.AddParameter("braCode", rp.braCode);


            if (string.IsNullOrEmpty(rp.FromDate.ToString()))
                rep.AddParameter("fromDate", "");
            else
            rep.AddParameter("fromDate", rp.FromDate.ToString("dd/MM/yyyy"));


            if (string.IsNullOrEmpty(rp.ToDate.ToString()))
                rep.AddParameter("toDate", "");
            else
                rep.AddParameter("toDate", rp.ToDate.ToString("dd/MM/yyyy"));

            if (rp.FromProjCode == "")
                rep.AddParameter("FromProjCode", "");
            else
                rep.AddParameter("FromProjCode", rp.FromProjCode);

            if (rp.ToProjCode == "")
                rep.AddParameter("ToProjCode", "");
            else
                rep.AddParameter("ToProjCode", rp.ToProjCode);

            if (rp.SiteEngineerId == 0)
                rep.AddParameter("SiteEngineerId", "");
            else
                rep.AddParameter("SiteEngineerId", rp.SiteEngineerId);

            if (rp.custClassID == 0)
                rep.AddParameter("CustClassID", "");
            else
                rep.AddParameter("CustClassID", rp.custClassID);

            if (rp.customerID == 0)
                rep.AddParameter("CustomerID", "");
            else
                rep.AddParameter("CustomerID", rp.customerID);

            if (rp.scopeClassId == 0)
                rep.AddParameter("scopeClassId", "");
            else
                rep.AddParameter("scopeClassId", rp.scopeClassId);

            if (rp.ScopeID == 0)
                rep.AddParameter("ScopeID", "");
            else
                rep.AddParameter("ScopeID", rp.ScopeID);

            if (rp.IsRepair == 3)
                rep.AddParameter("IsRepair", "");
            else
                rep.AddParameter("IsRepair", rp.IsRepair);

            if (rp.Stat == 0)
                rep.AddParameter("Stat", "");
            else
                rep.AddParameter("Stat", rp.Stat);

            if (rp.IsExecludeZero == 0)
                rep.AddParameter("IsExecludeZero", 0);
            else
                rep.AddParameter("IsExecludeZero", rp.IsExecludeZero);

            rep.AddParameter("ProdType", rp.ItemId);

            string url = rep.GetReportUrl("");

            int streportType = Convert.ToInt32(rp.TypeReport);


            if (streportType == 1)
            {
                url = rep.GetReportUrl("PPrnt_ProjectEvaluationByphase");

            }
            else if (streportType == 2)
            {
                url = rep.GetReportUrl("PPrnt_ProjectEvaluationByProject");

            }


            return Shared.JsonObject(url);


        }

        public JsonResult P_rep_ProjectCost(RepPar rp)
        {
            Reports rep = getStandardParameters();

            if (string.IsNullOrEmpty(rp.braCode.ToString()))
                rep.AddParameter("braCode", "");
            else
                rep.AddParameter("braCode", rp.braCode);


            if (string.IsNullOrEmpty(rp.FromDate.ToString()))
                rep.AddParameter("fromDate", "");
            else
                rep.AddParameter("fromDate", rp.FromDate.ToString("dd/MM/yyyy"));


            if (string.IsNullOrEmpty(rp.ToDate.ToString()))
                rep.AddParameter("toDate", "");
            else
                rep.AddParameter("toDate", rp.ToDate.ToString("dd/MM/yyyy"));



            if (rp.ToProjCode == "")
                rep.AddParameter("ToProjCode", "");
            else
                rep.AddParameter("ToProjCode", rp.ToProjCode);


            if (rp.FromProjCode == "")
                rep.AddParameter("FromProjCode", "");
            else
                rep.AddParameter("FromProjCode", rp.FromProjCode);


            if (rp.SiteEngineerId == 0)
                rep.AddParameter("SiteEngineerId", "");
            else
                rep.AddParameter("SiteEngineerId", rp.SiteEngineerId);

            if (rp.custClassID == 0)
                rep.AddParameter("CustClassID", "");
            else
                rep.AddParameter("CustClassID", rp.custClassID);

            if (rp.customerID == 0)
                rep.AddParameter("CustomerID", "");
            else
                rep.AddParameter("CustomerID", rp.customerID);

            if (rp.scopeClassId == 0)
                rep.AddParameter("ScopeCategoryID", "");
            else
                rep.AddParameter("ScopeCategoryID", rp.scopeClassId);

            if (rp.ScopeID == 0)
                rep.AddParameter("ScopeID", "");
            else
                rep.AddParameter("ScopeID", rp.ScopeID);

            if (rp.Stat == 0)
                rep.AddParameter("Stat", "");
            else
                rep.AddParameter("Stat", rp.Stat);

            if (rp.IsExecludeZero == 0)
                rep.AddParameter("IsExecludeZero", 0);
            else
                rep.AddParameter("IsExecludeZero", rp.IsExecludeZero);


            string url = rep.GetReportUrl("");

            int streportType = Convert.ToInt32(rp.TypeReport);


            if (streportType == 1)
            {
                url = rep.GetReportUrl("PPrnt_rep_ProjectCostphase");

            }
            else if (streportType == 2)
            {
                url = rep.GetReportUrl("PPrnt_rep_ProjectCostProject");

            }


            return Shared.JsonObject(url);


        }

        public JsonResult P_rep_MaterialCoverage(RepPar rp)
        {
            Reports rep = getStandardParameters();
             
                rep.AddParameter("braCode", rp.braCode);

            if (string.IsNullOrEmpty(rp.FromDate.ToString()))
                rep.AddParameter("fromDate", "");
            else
                rep.AddParameter("fromDate", rp.FromDate.ToString("dd/MM/yyyy"));


            if (string.IsNullOrEmpty(rp.ToDate.ToString()))
                rep.AddParameter("toDate", "");
            else
                rep.AddParameter("toDate", rp.ToDate.ToString("dd/MM/yyyy"));
             
            if (rp.ToProjCode == null)
                rep.AddParameter("ToProjCode", "");
            else
                rep.AddParameter("ToProjCode", rp.ToProjCode);
             
            if (rp.FromProjCode == null)
                rep.AddParameter("FromProjCode", "");
            else
                rep.AddParameter("FromProjCode", rp.FromProjCode);
            

            if (rp.FromItemNo == null)
                rep.AddParameter("FromItemNo", "");
            else
                rep.AddParameter("FromItemNo", rp.FromItemNo);
            

            if (rp.ToItemNo == null)
                rep.AddParameter("ToItemNo","");
            else
                rep.AddParameter("ToItemNo", rp.ToItemNo);
            
            if (rp.SiteEngineerId == 0)
                rep.AddParameter("SiteEngineerId", "");
            else
                rep.AddParameter("SiteEngineerId", rp.SiteEngineerId);

            if (rp.custClassID == 0)
                rep.AddParameter("CustClassID", "");
            else
                rep.AddParameter("CustClassID", rp.custClassID);

            if (rp.customerID == 0)
                rep.AddParameter("CustomerID", "");
            else
                rep.AddParameter("CustomerID", rp.customerID);

            if (rp.scopeClassId == 0)
                rep.AddParameter("ScopeCategoryID", "");
            else
                rep.AddParameter("ScopeCategoryID", rp.ScopeCategoryID);

            if (rp.ScopeID == 0)
                rep.AddParameter("ScopeID", "");
            else
                rep.AddParameter("ScopeID", rp.ScopeID);

            if (rp.Stat == 0)
                rep.AddParameter("Stat", "");
            else
                rep.AddParameter("Stat", rp.Stat);

            string url = rep.GetReportUrl("");

            int streportType = Convert.ToInt32(rp.TypeReport);


            if (streportType == 1)
            {
                url = rep.GetReportUrl("Print_GRP_MaterialCoverageByPhase");

            }
            else if (streportType == 2)
            {
                url = rep.GetReportUrl("Print_GRP_MaterialCoverageByitem");


            }


            return Shared.JsonObject(url);


        }

        public JsonResult Rpt_ProjectItemsInventory(RepPar rp)
        {
            Reports rep = getStandardParameters();
            rep.AddParameter("braCode", rp.braCode);

            if (string.IsNullOrEmpty(rp.FromDate.ToString()))
                rep.AddParameter("FromDate", "");
            else
                rep.AddParameter("FromDate", rp.FromDate.ToString("dd/MM/yyyy"));


            if (string.IsNullOrEmpty(rp.ToDate.ToString()))
                rep.AddParameter("ToDate", "");
            else
                rep.AddParameter("ToDate", rp.ToDate.ToString("dd/MM/yyyy"));

            if (rp.ProjectID == 0)
                rep.AddParameter("ProjectID", "");
            else
                rep.AddParameter("ProjectID", rp.ProjectID);

            string url = rep.GetReportUrl("Rep_ProjectItemsInventory");

            return Shared.JsonObject(url);
        }
        //-------------------- DSS
        public JsonResult Rep_DSS_ProjectEvaluation(RepPar rp)
        {
            Reports rep = getStandardParameters();

            if (rp.REGION_CODE == "" || rp.REGION_CODE == "0")
                rep.AddParameter("REGION_CODE", "");
            else
                rep.AddParameter("REGION_CODE", rp.REGION_CODE);

            if (string.IsNullOrEmpty(rp.braCode.ToString()) || rp.braCode==0)
                rep.AddParameter("braCode", "");
            else
                rep.AddParameter("braCode", rp.braCode);

            if (string.IsNullOrEmpty(rp.FromDate.ToString()))
                rep.AddParameter("fromDate", "");
            else
                rep.AddParameter("fromDate", rp.FromDate.ToString("dd/MM/yyyy"));

            if (string.IsNullOrEmpty(rp.ToDate.ToString()))
                rep.AddParameter("toDate", "");
            else
                rep.AddParameter("toDate", rp.ToDate.ToString("dd/MM/yyyy"));

            if (rp.CatID == 0)
                rep.AddParameter("CatID", "");
            else
                rep.AddParameter("CatID", rp.CatID);

            if (rp.ScopeCategoryID == 0)

                rep.AddParameter("ScopeCategoryID", "");
            else
                rep.AddParameter("ScopeCategoryID", rp.ScopeCategoryID);

            if (rp.ScopeID == 0)
                rep.AddParameter("ScopeID", "");
            else
                rep.AddParameter("ScopeID", rp.ScopeID);

            if (rp.IsRepair == 3)
                rep.AddParameter("IsRepair", "");
            else
                rep.AddParameter("IsRepair", rp.IsRepair);

            if (rp.GroupType == 0)
                rep.AddParameter("GroupType", "");
            else
                rep.AddParameter("GroupType", rp.GroupType);


            string url = rep.GetReportUrl("DSS_ProjectEvaluation");

            return Shared.JsonObject(url);

        }

        //-----------
        public JsonResult Rep_DSS_BillingStatus(RepPar rp)
        {
            Reports rep = getStandardParameters();
                rep.AddParameter("TypeReport", rp.TypeReport);
            if (rp.REGION_CODE == "" || rp.REGION_CODE == "0")
                rep.AddParameter("REGION_CODE", "");
            else
                rep.AddParameter("REGION_CODE", rp.REGION_CODE);

            if (string.IsNullOrEmpty(rp.FromDate.ToString()))
                rep.AddParameter("fromDate", "");
            else
                rep.AddParameter("fromDate", rp.FromDate.ToString("dd/MM/yyyy"));

            if (string.IsNullOrEmpty(rp.ToDate.ToString()))
                rep.AddParameter("toDate", "");
            else
                rep.AddParameter("toDate", rp.ToDate.ToString("dd/MM/yyyy"));

            if (rp.braCode == 0)
                rep.AddParameter("braCode", "");
            else
                rep.AddParameter("braCode", rp.braCode);

            


            string url = url = rep.GetReportUrl("DSS_BillingStatus");






            return Shared.JsonObject(url);

        }

        public JsonResult Rep_DSS_CollectiveWorkBYScope(RepPar rp)
        {
            Reports rep = getStandardParameters();
            if (rp.REGION_CODE == ""|| rp.REGION_CODE =="0" )
                rep.AddParameter("REGION_CODE", "");
            else
                rep.AddParameter("REGION_CODE", rp.REGION_CODE);

            if (string.IsNullOrEmpty(rp.FromDate.ToString()))
                rep.AddParameter("fromDate", "");
            else
                rep.AddParameter("fromDate", rp.FromDate.ToString("dd/MM/yyyy"));

            if (string.IsNullOrEmpty(rp.ToDate.ToString()))
                rep.AddParameter("toDate", "");
            else
                rep.AddParameter("toDate", rp.ToDate.ToString("dd/MM/yyyy"));

            if (rp.custClassID == 0)
                rep.AddParameter("CustomerCategoryID", "");
            else
                rep.AddParameter("CustomerCategoryID", rp.custClassID);

            if (rp.ScopeCategoryID == 0)
                rep.AddParameter("ScopeCategoryID", "");
            else
                rep.AddParameter("ScopeCategoryID", rp.ScopeCategoryID);

            if (rp.IsRepair == 3 )
                rep.AddParameter("IsRepair", "");
            else
                rep.AddParameter("IsRepair", rp.IsRepair);

            //if (rp.IsRepair == 0)
            //    rep.AddParameter("IsRepair", "");
            //else
            //    rep.AddParameter("IsRepair", rp.IsRepair);

            if (rp.GroupType == 0)
                rep.AddParameter("GroupType", "");
            else
                rep.AddParameter("GroupType", rp.GroupType);

            if (rp.TypeReport == 0)
                rep.AddParameter("TypeReport", "");
            else
                rep.AddParameter("TypeReport", rp.TypeReport);


            //int streportType = Convert.ToInt32(rp.TypeReport);

            string url = rep.GetReportUrl("");
            if (rp.GroupType == 2)
            {
                url = rep.GetReportUrl("DSS_CollectiveWorkByscope");
            }
            else if (rp.GroupType == 1)
            {
                url = rep.GetReportUrl("DSS_CollectiveWorkByBranch");
            }



            return Shared.JsonObject(url);

        }
        public JsonResult Rep_DSS_SubContractorWorkDetail(RepPar rp)
        {
            Reports rep = getStandardParameters();
            if (rp.REGION_CODE == "" || rp.REGION_CODE == "0")
                rep.AddParameter("REGION_CODE", "");
            else
                rep.AddParameter("REGION_CODE", rp.REGION_CODE);

            if (string.IsNullOrEmpty(rp.FromDate.ToString()))
                rep.AddParameter("fromDate", "");
            else
                rep.AddParameter("fromDate", rp.FromDate.ToString("dd/MM/yyyy"));

            if (string.IsNullOrEmpty(rp.ToDate.ToString()))
                rep.AddParameter("toDate", "");
            else
                rep.AddParameter("toDate", rp.ToDate.ToString("dd/MM/yyyy"));

            if (rp.custClassID == 0)
                rep.AddParameter("CustomerCategoryID", "");
            else
                rep.AddParameter("CustomerCategoryID", rp.custClassID);

            if (rp.ScopeCategoryID == 0)
                rep.AddParameter("ScopeCategoryID", "");
            else
                rep.AddParameter("ScopeCategoryID", rp.ScopeCategoryID);

            if (rp.IsRepair == 3)
                rep.AddParameter("IsRepair", "");
            else
                rep.AddParameter("IsRepair", rp.IsRepair);

            if (rp.GroupType == 0)
                rep.AddParameter("GroupType", "");
            else
                rep.AddParameter("GroupType", rp.GroupType);
            

            //int streportType = Convert.ToInt32(rp.TypeReport);

            string url = "";
            
                url = rep.GetReportUrl("DSS_SubContractorWorkDetail");
           
            return Shared.JsonObject(url);
        }
        public JsonResult Rep_DSS_SubContractorWorkSummary(RepPar rp)
        {
            Reports rep = getStandardParameters();
            if (rp.REGION_CODE == "" || rp.REGION_CODE == "0")
                rep.AddParameter("REGION_CODE", "");
            else
                rep.AddParameter("REGION_CODE", rp.REGION_CODE);

            if (string.IsNullOrEmpty(rp.FromDate.ToString()))
                rep.AddParameter("fromDate", "");
            else
                rep.AddParameter("fromDate", rp.FromDate.ToString("dd/MM/yyyy"));

            if (string.IsNullOrEmpty(rp.ToDate.ToString()))
                rep.AddParameter("toDate", "");
            else
                rep.AddParameter("toDate", rp.ToDate.ToString("dd/MM/yyyy"));

            if (rp.custClassID == 0)
                rep.AddParameter("CustomerCategoryID", "");
            else
                rep.AddParameter("CustomerCategoryID", rp.custClassID);

            if (rp.ScopeCategoryID == 0)
                rep.AddParameter("ScopeCategoryID", "");
            else
                rep.AddParameter("ScopeCategoryID", rp.ScopeCategoryID);

            if (rp.IsRepair == 3)
                rep.AddParameter("IsRepair", "");
            else
                rep.AddParameter("IsRepair", rp.IsRepair);

            if (rp.GroupType == 0)
                rep.AddParameter("GroupType", "");
            else
                rep.AddParameter("GroupType", rp.GroupType);


            //int streportType = Convert.ToInt32(rp.TypeReport);

            //string url = rep.GetReportUrl("");
            string url = rep.GetReportUrl("DSS_SubContractorWorkSummary");
           
            return Shared.JsonObject(url);
        }
        //---------------
        public JsonResult Rep_DSS_CollectiveWorkBYScopeCat(RepPar rp)
        {
            Reports rep = getStandardParameters();
            if (rp.REGION_CODE == "" || rp.REGION_CODE == "0")
                rep.AddParameter("REGION_CODE", "");
            else
                rep.AddParameter("REGION_CODE", rp.REGION_CODE);

            if (string.IsNullOrEmpty(rp.FromDate.ToString()))
                rep.AddParameter("fromDate", "");
            else
                rep.AddParameter("fromDate", rp.FromDate.ToString("dd/MM/yyyy"));

            if (string.IsNullOrEmpty(rp.ToDate.ToString()))
                rep.AddParameter("toDate", "");
            else
                rep.AddParameter("toDate", rp.ToDate.ToString("dd/MM/yyyy"));

            if (rp.custClassID == 0)
                rep.AddParameter("CustomerCategoryID", "");
            else
                rep.AddParameter("CustomerCategoryID", rp.custClassID);

            if (rp.ScopeCategoryID == 0)
                rep.AddParameter("ScopeCategoryID", "");
            else
                rep.AddParameter("ScopeCategoryID", rp.ScopeCategoryID);

            if (rp.IsRepair == 3)
                rep.AddParameter("IsRepair", "");
            else
                rep.AddParameter("IsRepair", rp.IsRepair);
        
            if (rp.GroupType == 0)
                rep.AddParameter("GroupType", "");
            else
                rep.AddParameter("GroupType", rp.GroupType);

            if (rp.TypeReport == 0)
                rep.AddParameter("TypeReport", "");
            else
                rep.AddParameter("TypeReport", rp.TypeReport);


            //int streportType = Convert.ToInt32(rp.TypeReport);

            string url="" ;
            if (rp.GroupType == 2)
            {
                url = rep.GetReportUrl("DSS_CollectiveWork_BYScopeCat");
            }
            else if (rp.GroupType == 1)
            {
                url = rep.GetReportUrl("DSS_CollectiveWork_BYScopeCat_ByBranch");
            }



            return Shared.JsonObject(url);

        }

        public JsonResult DSS_SalesBranch(RepPar rp)
        {
            Reports rep = getStandardParameters();
            if (rp.REGION_CODE == "" || rp.REGION_CODE == "0")
                rep.AddParameter("REGION_CODE", "");
            else
                rep.AddParameter("REGION_CODE", rp.REGION_CODE);

            if (rp.yearID == 0)
                rep.AddParameter("Yearid", "");
            else
                rep.AddParameter("Yearid", rp.yearID);

            if (rp.custClassID == 0)
                rep.AddParameter("CustomerCategoryID", "");
            else
                rep.AddParameter("CustomerCategoryID", rp.custClassID);

            //if (rp.ScopeCategoryID == 0)
            //    rep.AddParameter("ScopeCategoryID", "");
            //else
            //    rep.AddParameter("ScopeCategoryID", rp.ScopeCategoryID);

            //if (rp.IsRepair == 3)
            //    rep.AddParameter("IsRepair", "");
            //else
            //    rep.AddParameter("IsRepair", rp.IsRepair);

      
            string url = rep.GetReportUrl("DSS_SalesBranch");

            return Shared.JsonObject(url);
        }
        public JsonResult DSS_ProductionBranch(RepPar rp)
        {
            Reports rep = getStandardParameters();
            if (rp.REGION_CODE == "" || rp.REGION_CODE == "0")
                rep.AddParameter("REGION_CODE", "");
            else
                rep.AddParameter("REGION_CODE", rp.REGION_CODE);

            if (rp.yearID == 0)
                rep.AddParameter("Yearid", "");
            else
                rep.AddParameter("Yearid", rp.yearID);

            if (rp.custClassID == 0)
                rep.AddParameter("CustomerCategoryID", "");
            else
                rep.AddParameter("CustomerCategoryID", rp.custClassID);

            if (rp.ScopeCategoryID == 0)
                rep.AddParameter("ScopeCategoryID", "");
            else
                rep.AddParameter("ScopeCategoryID", rp.ScopeCategoryID);

            if (rp.ScopeID == 0)
                rep.AddParameter("ScopeID", "");
            else
                rep.AddParameter("ScopeID", rp.ScopeID); 

            if (rp.IsRepair == 3)
                rep.AddParameter("IsRepair", "");
            else
                rep.AddParameter("IsRepair", rp.IsRepair);


            string url = rep.GetReportUrl("DSS_ProductionBranch");

            return Shared.JsonObject(url);
        }
        public JsonResult DSS_BillingBranch(RepPar rp)
        {
            Reports rep = getStandardParameters();
            if (rp.REGION_CODE == "" || rp.REGION_CODE == "0")
                rep.AddParameter("REGION_CODE", "");
            else
                rep.AddParameter("REGION_CODE", rp.REGION_CODE);

            if (rp.yearID == 0)
                rep.AddParameter("Yearid", "");
            else
                rep.AddParameter("Yearid", rp.yearID);

            if (rp.custClassID == 0)
                rep.AddParameter("CustomerCategoryID", "");
            else
                rep.AddParameter("CustomerCategoryID", rp.custClassID);

            if (rp.ScopeCategoryID == 0)
                rep.AddParameter("ScopeCategoryID", "");
            else
                rep.AddParameter("ScopeCategoryID", rp.ScopeCategoryID);

            if (rp.ScopeID == 0)
                rep.AddParameter("ScopeID", "");
            else
                rep.AddParameter("ScopeID", rp.ScopeID);

            if (rp.IsRepair == 3)
                rep.AddParameter("IsRepair", "");
            else
                rep.AddParameter("IsRepair", rp.IsRepair);


            string url = rep.GetReportUrl("DSS_BillingBranch");

            return Shared.JsonObject(url);
        }
        public JsonResult repProjectCostVariance(RepPar rp)
        {
            Reports rep = getStandardParameters();

            if (string.IsNullOrEmpty(rp.braCode.ToString()))
                rep.AddParameter("braCode", "");
            else
                rep.AddParameter("braCode", rp.braCode);

            //if (string.IsNullOrEmpty(rp.FromDate.ToString()))
                rep.AddParameter("FromDate", "");
            //else
            //    rep.AddParameter("FromDate", rp.FromDate.ToString("dd/MM/yyyy"));

            //if (string.IsNullOrEmpty(rp.ToDate.ToString()))
                rep.AddParameter("ToDate", "");
            //else
            //    rep.AddParameter("ToDate", rp.ToDate.ToString("dd/MM/yyyy"));

            if (string.IsNullOrEmpty(rp.FromProjCode))
                rep.AddParameter("FromProjCode", "");
            else
                rep.AddParameter("FromProjCode", rp.FromProjCode);

            if (string.IsNullOrEmpty(rp.ToProjCode))
                rep.AddParameter("ToProjCode", "");
            else
                rep.AddParameter("ToProjCode", rp.ToProjCode);

            if (rp.SiteEngineerId == 0)
                rep.AddParameter("SiteEngineerId", "");

            else
                rep.AddParameter("SiteEngineerId", rp.SiteEngineerId);

            if (rp.ScopeCategoryID == 0)

                rep.AddParameter("ScopeCategoryID", "");
            else
                rep.AddParameter("ScopeCategoryID", rp.ScopeCategoryID);

            if (rp.ScopeID == 0)
                rep.AddParameter("ScopeID", "");
            else
                rep.AddParameter("ScopeID", rp.ScopeID);


            if (rp.customerID == 0)
                rep.AddParameter("Custid", "");
            else
                rep.AddParameter("Custid", rp.customerID);

            if (rp.CatID == 0)
                rep.AddParameter("CatID", "");
            else
                rep.AddParameter("CatID", rp.CatID);

            if (rp.Stat == 0)
                rep.AddParameter("Stat", "");
            else
                rep.AddParameter("Stat", rp.Stat);

            if (rp.IsExecludeZero == 0)
                rep.AddParameter("IsExecludeZero", 0);
            else
                rep.AddParameter("IsExecludeZero", rp.IsExecludeZero);



            string url = rep.GetReportUrl("");

            int streportType = Convert.ToInt32(rp.TypeReport);


            if (streportType == 1)
            {
                url = rep.GetReportUrl("Rep_ProjectCostVarianceByProject");

            }
            else if (streportType == 2)
            {
                url = rep.GetReportUrl("Rep_ProjectCostVarianceByPhase");


            }


            return Shared.JsonObject(url);
        }
        
        public JsonResult repProjectLaborVariance(RepPar rp)
        {
            Reports rep = getStandardParameters();

            if (string.IsNullOrEmpty(rp.braCode.ToString()))
                rep.AddParameter("braCode", "");
            else
                rep.AddParameter("braCode", rp.braCode);

            //if (string.IsNullOrEmpty(rp.FromDate.ToString()))
                rep.AddParameter("FromDate", "");
            //else
            //    rep.AddParameter("FromDate", rp.FromDate.ToString("dd/MM/yyyy"));

            //if (string.IsNullOrEmpty(rp.ToDate.ToString()))
                rep.AddParameter("ToDate", "");
            //else
            //    rep.AddParameter("ToDate", rp.ToDate.ToString("dd/MM/yyyy"));

            if (string.IsNullOrEmpty(rp.FromProjCode))
                rep.AddParameter("FromProjCode", "");
            else
                rep.AddParameter("FromProjCode", rp.FromProjCode);

            if (string.IsNullOrEmpty(rp.ToProjCode))
                rep.AddParameter("ToProjCode", "");
            else
                rep.AddParameter("ToProjCode", rp.ToProjCode);

            if (rp.SiteEngineerId == 0)
                rep.AddParameter("SiteEngineerId", "");

            else
                rep.AddParameter("SiteEngineerId", rp.SiteEngineerId);

            if (rp.ScopeCategoryID == 0)

                rep.AddParameter("ScopeCategoryID", "");
            else
                rep.AddParameter("ScopeCategoryID", rp.ScopeCategoryID);

            if (rp.ScopeID == 0)
                rep.AddParameter("ScopeID", "");
            else
                rep.AddParameter("ScopeID", rp.ScopeID);


            if (rp.Custid == 0)
                rep.AddParameter("Custid", "");
            else
                rep.AddParameter("Custid", rp.Custid);

            if (rp.CatID == 0)
                rep.AddParameter("CatID", "");
            else
                rep.AddParameter("CatID", rp.CatID);

            if (rp.Stat == 0)
                rep.AddParameter("Stat", "");
            else
                rep.AddParameter("Stat", rp.Stat);

            if (rp.IsExecludeZero == 0)
                rep.AddParameter("IsExecludeZero", 0);
            else
                rep.AddParameter("IsExecludeZero", 1);


            string url = rep.GetReportUrl("");

            int streportType = Convert.ToInt32(rp.TypeReport);


            if (streportType == 1)
            {
                url = rep.GetReportUrl("Rep_ProjectLaborVarianceByProject");

            }
            else if (streportType == 2)
            {
                url = rep.GetReportUrl("Rep_ProjectLaborVarianceByPhase");


            }


            return Shared.JsonObject(url);
        }

        public JsonResult repEquipmentVariance(RepPar rp)
        {
            Reports rep = getStandardParameters();

            if (string.IsNullOrEmpty(rp.braCode.ToString()))
                rep.AddParameter("braCode", "");
            else
                rep.AddParameter("braCode", rp.braCode);

            //if (string.IsNullOrEmpty(rp.FromDate.ToString()))
                rep.AddParameter("FromDate", "");
            //else
            //    rep.AddParameter("FromDate", rp.FromDate.ToString("dd/MM/yyyy"));

            //if (string.IsNullOrEmpty(rp.ToDate.ToString()))
                rep.AddParameter("ToDate", "");
            //else
            //    rep.AddParameter("ToDate", rp.ToDate.ToString("dd/MM/yyyy"));

            if (string.IsNullOrEmpty(rp.FromProjCode))
                rep.AddParameter("FromProjCode", "");
            else
                rep.AddParameter("FromProjCode", rp.FromProjCode);

            if (string.IsNullOrEmpty(rp.ToProjCode))
                rep.AddParameter("ToProjCode", "");
            else
                rep.AddParameter("ToProjCode", rp.ToProjCode);

            if (rp.SiteEngineerId == 0)
                rep.AddParameter("SiteEngineerId", "");

            else
                rep.AddParameter("SiteEngineerId", rp.SiteEngineerId);

            if (rp.ScopeCategoryID == 0)

                rep.AddParameter("ScopeCategoryID", "");
            else
                rep.AddParameter("ScopeCategoryID", rp.ScopeCategoryID);

            if (rp.ScopeID == 0)
                rep.AddParameter("ScopeID", "");
            else
                rep.AddParameter("ScopeID", rp.ScopeID);


            if (rp.Custid == 0)
                rep.AddParameter("Custid", "");
            else
                rep.AddParameter("Custid", rp.Custid);

            if (rp.CatID == 0)
                rep.AddParameter("CatID", "");
            else
                rep.AddParameter("CatID", rp.CatID);

            if (rp.Stat == 0)
                rep.AddParameter("Stat", "");
            else
                rep.AddParameter("Stat", rp.Stat);

            if (rp.IsExecludeZero == 0)
                rep.AddParameter("IsExecludeZero", 0);
            else
                rep.AddParameter("IsExecludeZero", 2);


            string url = rep.GetReportUrl("");

            int streportType = Convert.ToInt32(rp.TypeReport);


            if (streportType == 1)
            {
                url = rep.GetReportUrl("Rep_ProjectEquipmentVarianceByProject");

            }
            else if (streportType == 2)
            {
                url = rep.GetReportUrl("Rep_ProjectEquipmentVarianceByPhase");


            }


            return Shared.JsonObject(url);
        }


        #endregion

        #region Poubup Report
        public PartialViewResult _SlsEngReport()
        {
            return PartialView();
        }
        public PartialViewResult _SiteEngReport()
        {
            return PartialView();
        }
        public PartialViewResult _LaborReport()
        {
            return PartialView();
        }
        public PartialViewResult _ActivityReport()
        {
            return PartialView();
        }
        public PartialViewResult _EquipmentReport()
        {
            return PartialView();
        }
        public PartialViewResult _SLsItemReport()
        {
            return PartialView();
        }
        public PartialViewResult _SLsCustomerCard()
        {
            return PartialView();
        }
        //Sales Popup Reports

        
            public PartialViewResult BillingList()
        {
            return PartialView(Path.BillingList);
        }
        public PartialViewResult ContractList()
        {
            return PartialView(Path.ContractList);
        }
        public PartialViewResult OfferList()
        {
            return PartialView(Path.OfferList);
        }
        public PartialViewResult SalesmanActivity()
        {
            return PartialView(Path.SalesmanActivity);
        }
        public PartialViewResult ProductionVsBilling()
        {
            return PartialView(Path.ProductionVsBilling);
        }
        public PartialViewResult ProjItemsInventory()
        {
            return PartialView(Path.ProjItemsInventory);
        }
        public PartialViewResult CRMReport()
        {
            return PartialView(Path.CRMReport);
        }
        public PartialViewResult TaxInvoicelist()
        {
            return PartialView(Path.TaxInvoicelist);
        }
        //Engineer Popup Reports
        public PartialViewResult SubContractorListing()
        {
            return PartialView(Path.SubContractorListing);
        }
        public PartialViewResult SubContrActivity()
        {

            return PartialView(Path.SubContrActivity);
        }
        public PartialViewResult Production()
        {
            return PartialView(Path.Production);
        }
        public PartialViewResult Evaluation()
        {
            return PartialView(Path.Evaluation);
        }
        //public PartialViewResult LaborSchedule()
        //{
        //    return PartialView(Path.LaborSchedule);
        //}
        public PartialViewResult LaborScheduleUtz()
        {
            return PartialView(Path.LaborScheduleUtz);
        }
        public PartialViewResult ProjectExpensesRep()
        {
            return PartialView(Path.ProjectExpensesRep);
        }
        public PartialViewResult ProjectStatus()
        {
            return PartialView(Path.ProjectStatus);
        }
        public PartialViewResult ProjectProgress()
        {
            return PartialView(Path.ProjectProgress);
        }



        #endregion Poubup Report
        //------ RES 
        public PartialViewResult BillOfMaterial()
        {
            return PartialView(Path.BillOfMaterial);
        }

        public PartialViewResult MaterialMonitoring()
        {
            return PartialView(Path.MaterialMonitoring);
        }

        public PartialViewResult MaterialRequest()
        {
            return PartialView(Path.MaterialRequest);
        }

        public PartialViewResult MaterialIssuance()
        {
            return PartialView(Path.MaterialIssuance);
        }

        public PartialViewResult MaterialReturn()
        {
            return PartialView(Path.MaterialReturn);
        }

        public PartialViewResult MaterialList()
        {
            return PartialView(Path.MaterialList);
        }

        public PartialViewResult EquipmentMonitoring()
        {
            return PartialView(Path.EquipmentMonitoring);
        }

        public PartialViewResult EquipmentRequest()
        {
            return PartialView(Path.EquipmentRequest);
        }

        public PartialViewResult EquipmentAssign()
        {
            return PartialView(Path.EquipmentAssign);
        }

        public PartialViewResult LaborMonitoring()
        {
            return PartialView(Path.LaborMonitoring);
        }

        public PartialViewResult LaborRequest()
        {
            return PartialView(Path.LaborRequest);
        }

        public PartialViewResult OverTimeSheet()
        {
            return PartialView(Path.OverTimeSheet);
        }

        public PartialViewResult LateandAbsence()
        {
            return PartialView(Path.LateandAbsence);
        }

        public PartialViewResult ProjectRequirements()
        {
            return PartialView(Path.ProjectRequirements);
        }

        public PartialViewResult AttendanceSheet()
        {
            return PartialView(Path.AttendanceSheet);
        }

        public PartialViewResult Equipmentmovement()
        {
            return PartialView(Path.Equipmentmovement);
        }

        public PartialViewResult Equipmentutilization()
        {
            return PartialView(Path.Equipmentutilization);
        }

        public PartialViewResult LaborMovement()
        {
            return PartialView(Path.LaborMovement);
        }

        public PartialViewResult Laborutilization()
        {
            return PartialView(Path.Laborutilization);
        }

        public PartialViewResult LaborWork()
        {
            return PartialView(Path.LaborWork);
        }

        public PartialViewResult MaterialUsage()
        {
            return PartialView(Path.MaterialUsage);
        }
        public PartialViewResult MaterialUsageSummary()
        {
            return PartialView(Path.MaterialUsageSummary);
        }
        public PartialViewResult MaterialUsageproject()
        {
            return PartialView(Path.MaterialUsageproject);
        }

        public PartialViewResult UnprodHour()
        {
            return PartialView(Path.UnprodHour);
        }

        //------ End RES 
        


        public PartialViewResult LaborSchedule()
        {
            return PartialView(Path.LaborSchedule);
        }
        public PartialViewResult BudgetRequirements()
        {
            return PartialView(Path.BudgetRequirements);
        }

        public PartialViewResult MonthBudgetByEng()
        {
            return PartialView(Path.MonthBudgetByEng);
        }

        public PartialViewResult MonthBudgetForBranch()
        {
            return PartialView(Path.MonthBudgetForBranch);
        }

        public PartialViewResult MonthBudgetForComp()
        {
            return PartialView(Path.MonthBudgetForComp);
        }

        public PartialViewResult GetPartialImg()
        {
            return PartialView(Path.ImagePopup);
        }



        //--
        public PartialViewResult RepLaborEvaluation()
        {
            return PartialView(Path.RepLaborEvaluation);
        }

        public PartialViewResult RepSiteEngineerBonus()
        {
            return PartialView(Path.RepSiteEngineerBonus);
        }
        public PartialViewResult SalesManBonus()
        {
            return PartialView(Path.SalesManBonus);
        }
        public PartialViewResult RepProjectEvaluation()
        {
            return PartialView(Path.RepProjectEvaluation);
        }

        public PartialViewResult RepProjectCost()
        {
            return PartialView(Path.RepProjectCost);
        }

        public PartialViewResult RepProjectCostVarian()
        {
            return PartialView(Path.RepProjectCostVarian);
        }

        public PartialViewResult RepMaterialCoverage()
        {
            return PartialView(Path.RepMaterialCoverage);
        }

        public PartialViewResult RepLaborCostVariance()
        {
            return PartialView(Path.RepLaborCostVariance);
        }

        public PartialViewResult RepEquipCostVariance()
        {
            return PartialView(Path.RepEquipCostVariance);
        }
         public PartialViewResult Prodvsprogress()
        {
            return PartialView(Path.Prodvsprogress);
        }

        //DSS

        public PartialViewResult SalesComparison()
        {
            return PartialView(Path.SalesComparison);
        }

        public PartialViewResult ProductionComparis()
        {
            return PartialView(Path.ProductionComparison);
        }

        public PartialViewResult IncomeComparison()
        {
            return PartialView(Path.IncomeComparison);
        }

        public PartialViewResult DirectCostComparis()
        {
            return PartialView(Path.DirectCostComparison);
        }

        public PartialViewResult ByScopeCategory()
        {
            return PartialView(Path.ByScopeCategory);
        }

        public PartialViewResult EC_ByScope()
        {
            return PartialView(Path.EC_ByScope);
        }

        public PartialViewResult ByCustomerClass()
        {
            return PartialView(Path.ByCustomerClass);
        }

        public PartialViewResult ByBranch()
        {
            return PartialView(Path.ByBranch);
        }

        public PartialViewResult ByProject()
        {
            return PartialView(Path.ByProject);
        }

        public PartialViewResult ByItem()
        {
            return PartialView(Path.ByItem);
        }



        public PartialViewResult CC_ByScope()
        {
            return PartialView(Path.CC_ByScope);
        }

        public PartialViewResult NormsVariationRep()
        {
            return PartialView(Path.NormsVariationReport);
        }

        public PartialViewResult SubContractorWork()
        {
            return PartialView(Path.SubContractorWork);
        }

        public PartialViewResult C_ByScopeCategory()
        {
            return PartialView(Path.C_ByScopeCategory);
        }
        public PartialViewResult ProjectBillingSteaus()
        {
            return PartialView(Path.ProjectBillingSteaus);
        }

        #region GREP
        public ActionResult RepProjectDist()
        {
            return View(Path.ProjectDistribution);
        }
        public ActionResult RepProjectBandFollow()
        {
            return View(Path.ProjectBandFollowUp);
        }
        public ActionResult RepProjectFollowUp()
        {
            return View(Path.ProjectFollowUp);
        }
        public ActionResult RepProjectPhaseDis()
        {
            return View(Path.ProjectPhaseDistribution);
        }
        public ActionResult RepProjectWorking()
        {
            return View(Path.ProjectWorking);
        }
        #endregion
    }
}