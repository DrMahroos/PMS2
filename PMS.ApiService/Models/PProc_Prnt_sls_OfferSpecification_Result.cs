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
    
    public partial class PProc_Prnt_sls_OfferSpecification_Result
    {
        public Nullable<int> Comp { get; set; }
        public string CompNameA { get; set; }
        public string CompNameE { get; set; }
        public string BraNameA { get; set; }
        public string BraNameE { get; set; }
        public string LoginUser { get; set; }
        public Nullable<System.DateTime> PrintDate { get; set; }
        public Nullable<int> TrNo { get; set; }
        public Nullable<int> TrSerial { get; set; }
        public Nullable<System.DateTime> TrDate { get; set; }
        public string DescA { get; set; }
        public string DescL { get; set; }
        public string CustDescA { get; set; }
        public string CustDescE { get; set; }
        public Nullable<int> CustomerCode { get; set; }
        public string EngCode { get; set; }
        public string EngDescA { get; set; }
        public string EngDescE { get; set; }
        public Nullable<bool> IsMaintenanceWork { get; set; }
        public Nullable<int> stage_code { get; set; }
        public string stage_desca { get; set; }
        public string stage_desce { get; set; }
        public string stage_scopedesca { get; set; }
        public string stage_scopedesce { get; set; }
        public Nullable<decimal> stage_total { get; set; }
        public string itm_lineCode { get; set; }
        public string itm_ItemCode { get; set; }
        public string itm_Desca { get; set; }
        public string itm_DescE { get; set; }
        public Nullable<bool> Itm_Fixed { get; set; }
        public string itm_TechDescA { get; set; }
        public string itm_TechDescE { get; set; }
        public Nullable<decimal> itm_qty { get; set; }
        public Nullable<decimal> Itm_Price { get; set; }
        public Nullable<decimal> Itm_Total { get; set; }
        public Nullable<int> Act_Serial { get; set; }
        public string Act_Code { get; set; }
        public string Act_DescA { get; set; }
        public string Act_DescE { get; set; }
        public Nullable<decimal> Act_Qty { get; set; }
        public Nullable<bool> Act_ProdInc { get; set; }
        public Nullable<decimal> Act_ProcPrc { get; set; }
        public int OfferStageId { get; set; }
        public int OfferItemId { get; set; }
    }
}