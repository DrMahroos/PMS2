//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace PMS.ApiService.Models
{
    using System;
    
    public partial class PProc_Rep_sls_BillingByPhase_Result
    {
        public Nullable<int> Comp { get; set; }
        public string CompNameA { get; set; }
        public string CompNameE { get; set; }
        public string BraNameA { get; set; }
        public string BraNameE { get; set; }
        public string LoginUser { get; set; }
        public Nullable<System.DateTime> PrintDate { get; set; }
        public string Par_FromDate { get; set; }
        public string Par_Todate { get; set; }
        public string Par_CatDescA { get; set; }
        public string Par_CatDescE { get; set; }
        public string Par_locDescA { get; set; }
        public string Par_LocDescE { get; set; }
        public string Par_EngDescA { get; set; }
        public string Par_EngDescE { get; set; }
        public string Par_CustDescA { get; set; }
        public string Par_CustDescE { get; set; }
        public Nullable<int> Par_BraCode { get; set; }
        public string Par_StatusA { get; set; }
        public string Par_StatusE { get; set; }
        public Nullable<int> TrNo { get; set; }
        public Nullable<System.DateTime> TrDate { get; set; }
        public Nullable<decimal> VatPrc { get; set; }
        public string Prod_descr { get; set; }
        public Nullable<decimal> discount { get; set; }
        public Nullable<decimal> amount { get; set; }
        public Nullable<decimal> VatAmount { get; set; }
        public Nullable<decimal> NetAmount { get; set; }
        public Nullable<decimal> NetAfterVat { get; set; }
        public string ProjectCode { get; set; }
        public string Proj_DescA { get; set; }
        public string Proj_DescE { get; set; }
        public string EngCode { get; set; }
        public string Eng_DescA { get; set; }
        public string Eng_DescE { get; set; }
        public Nullable<int> CustomerCode { get; set; }
        public string Cust_DescA { get; set; }
        public string Cust_DescE { get; set; }
        public Nullable<System.DateTime> FromDate { get; set; }
        public Nullable<System.DateTime> ToDate { get; set; }
        public string ProjectPhaseCode { get; set; }
        public string CCCode { get; set; }
    }
}
