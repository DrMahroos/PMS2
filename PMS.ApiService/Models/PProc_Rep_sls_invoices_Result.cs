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
    
    public partial class PProc_Rep_sls_invoices_Result
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
        public string Par_FromProj { get; set; }
        public string Par_ToProjCode { get; set; }
        public string Par_EngDescA { get; set; }
        public string Par_EngDescE { get; set; }
        public string Par_CustDescA { get; set; }
        public string Par_CustDescE { get; set; }
        public Nullable<int> Par_BraCode { get; set; }
        public Nullable<int> TrNo { get; set; }
        public Nullable<System.DateTime> TrDate { get; set; }
        public Nullable<decimal> Amount { get; set; }
        public string Prod_descr { get; set; }
        public Nullable<decimal> Discount { get; set; }
        public Nullable<decimal> DiscountPrc { get; set; }
        public Nullable<decimal> VatAmount { get; set; }
        public string ProjectCode { get; set; }
        public string Proj_DescA { get; set; }
        public string Proj_DescE { get; set; }
        public string EngCode { get; set; }
        public string Eng_DescA { get; set; }
        public string Eng_DescE { get; set; }
        public Nullable<int> CustomerCode { get; set; }
        public string Cust_DescA { get; set; }
        public string Cust_DescE { get; set; }
        public Nullable<decimal> NetAmount { get; set; }
        public Nullable<bool> IsFinal { get; set; }
        public Nullable<decimal> VatPrc { get; set; }
        public Nullable<decimal> RetentionPrc { get; set; }
        public Nullable<decimal> RetentionAmount { get; set; }
        public Nullable<decimal> AdvDeduction { get; set; }
        public Nullable<decimal> AdvVatAmount { get; set; }
        public Nullable<decimal> TaxableAmount { get; set; }
        public Nullable<decimal> NetTax { get; set; }
        public Nullable<decimal> DueAmount { get; set; }
        public Nullable<bool> IsDownpayment { get; set; }
        public Nullable<decimal> UsedDownpayment { get; set; }
        public Nullable<decimal> RemainDownpayment { get; set; }
        public Nullable<System.TimeSpan> TrTime { get; set; }
        public string DocNo { get; set; }
        public string DocUUID { get; set; }
        public Nullable<int> GlobalInvoiceCounter { get; set; }
        public Nullable<decimal> AdvanceConsumPrc { get; set; }
    }
}
