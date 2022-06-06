using PMS.ApiService.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace PMS.ApiService.Models
{
    public class StdParamters
    {
        public string SystemCode { get; set; }
        public string SubSystemCode { get; set; }
        public string Modulecode { get; set; }
        public string UserCode { get; set; }
        public string CompCode { get; set; }
        public string BranchCode { get; set; }
        public string Language { get; set; }
        public string CurrentYear { get; set; }
        public string ScreenLanguage { get; set; }
        public string SystemName { get; set; }
        public string SubSystemName { get; set; }
        public string CompNameE { get; set; }
        public string CompNameA { get; set; }
        public string BranchName { get; set; }
        public string Tokenid { get; set; }
    }

    public class ReportParameters
    {
        public int DepartmentID { get; set; }
        public string UserCode { get; set; }
        public DateTime FromDate { get; set; }
        public DateTime ToDate { get; set; }
    }

    public class RepFinancials
    {

        public string CompCode { get; set; }
        public string CompNameA { get; set; }
        public string CompNameE { get; set; }
        public string BraNameA { get; set; }
        public string BraNameE { get; set; }
        public string LoginUser { get; set; }
        public string braCode { get; set; }
        public int CatID { get; set; }
        public int bra { get; set; }
        public string Active { get; set; }
        public int ClassID { get; set; }
        public int ActID { get; set; }
        public int FromCustNo { get; set; }
        public int ToCustNo { get; set; }
        public string Temp { get; set; }
        public int EngID { get; set; }
        public int Custid { get; set; }
        public int ItemId { get; set; }
        public string FromItemNo { get; set; }
        public string ToItemNo { get; set; }
        public int ScopeID { get; set; }
        public int Detail { get; set; }
        public DateTime FromDate { get; set; }
        public DateTime ToDate { get; set; }
        public int LocId { get; set; }
        public int? Stat { get; set; }
        public string FromProjCode { get; set; }
        public string ToProjCode { get; set; }
        public int TypeReport { get; set; }
        public int SubID { get; set; }
        public int ContrNo { get; set; }
        public int Sono { get; set; }
        public int ProjectID { get; set; }
        public int Phaseid { get; set; }
        public int ContrId { get; set; }
        public int SoId { get; set; }
        public string FromSubCode { get; set; }
        public string ToSubCode { get; set; }
        public string FromEval { get; set; }
        public string toEval { get; set; }
        public int ExpID { get; set; }
        public int itemCatID { get; set; }
        public int custClassID { get; set; }
        public int customerID { get; set; }
        public int scopeClassId { get; set; }
        public int LabCatID { get; set; }
        public string FromLabCode { get; set; }
        public string ToLabCode { get; set; }
        public int LabClassID { get; set; }
        public int EquipClassID { get; set; }
        public int UnProdId { get; set; }
        public int UnprodCatID { get; set; }
        public string FromEquipCode { get; set; }
        public string ToEquipCode { get; set; }
        public int yearID { get; set; }
        public string Monid { get; set; }
        public int IsLabor { get; set; }
        public int IsEquip { get; set; }
        public int IsMat { get; set; }
        public int MonthCode { get; set; }
        public int RedArea { get; set; }
        public int RedSalEng { get; set; }
        public int? IsRepair { get; set; }
        public int SiteEngineerId { get; set; }
        public int ScopeCategCode { get; set; }
        public int ScopeCategoryID { get; set; }
        public int GroupType { get; set; }
        public int IsExecludeZero { get; set; }
        public int TrID { get; set; }
        public string REGION_CODE { get; set; }
        public string SalsEngId { get; set; }
        public int MemId { get; set; }
        public string BranchNameEn { get; set; }
        public string BranchName { get; set; }
        public string CompanyNameAr { get; set; }
        public string CompanyName { get; set; }
        public string SubSystemCode { get; set; }
        public string SystemCode { get; set; }
        public string UserCode { get; set; }



    }



}