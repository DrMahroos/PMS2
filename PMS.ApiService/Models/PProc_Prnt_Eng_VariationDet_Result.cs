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
    
    public partial class PProc_Prnt_Eng_VariationDet_Result
    {
        public Nullable<int> Comp { get; set; }
        public string CompNameA { get; set; }
        public string CompNameE { get; set; }
        public string BraNameA { get; set; }
        public string BraNameE { get; set; }
        public string LoginUser { get; set; }
        public Nullable<System.DateTime> PrintDate { get; set; }
        public int VariationId { get; set; }
        public Nullable<int> TrNo { get; set; }
        public Nullable<System.DateTime> TrDate { get; set; }
        public string RefNo { get; set; }
        public Nullable<System.DateTime> RefDate { get; set; }
        public Nullable<decimal> VariationValue { get; set; }
        public string VariationDescr { get; set; }
        public string Status_Desc { get; set; }
        public string SalesApprove { get; set; }
        public string Remarks { get; set; }
        public string Proj_Code { get; set; }
        public string Proj_DescA { get; set; }
        public string Proj_DescE { get; set; }
        public Nullable<int> Cust_Code { get; set; }
        public string Cust_DescA { get; set; }
        public string Cust_DescE { get; set; }
        public string Eng_Code { get; set; }
        public string Eng_DescA { get; set; }
        public string Eng_DescE { get; set; }
        public Nullable<bool> IsNew { get; set; }
        public string Item_LineCode { get; set; }
        public string Item_DescA { get; set; }
        public string Item_DescE { get; set; }
        public Nullable<decimal> Item_unitPrice { get; set; }
        public Nullable<decimal> Item_oldQty { get; set; }
        public Nullable<decimal> Item_newQty { get; set; }
        public Nullable<decimal> Item_Diff { get; set; }
        public string Act_Code { get; set; }
        public string Act_DescA { get; set; }
        public string Act_DescE { get; set; }
        public Nullable<decimal> act_NewQty { get; set; }
        public Nullable<decimal> Act_OldQty { get; set; }
        public Nullable<decimal> Act_oldProdPrc { get; set; }
        public Nullable<decimal> Act_NewProdPrc { get; set; }
    }
}
