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
    
    public partial class PProc_Prnt_sls_OfferSubmittals_Result
    {
        public Nullable<int> Comp { get; set; }
        public string CompNameA { get; set; }
        public string CompNameE { get; set; }
        public string BraNameA { get; set; }
        public string BraNameE { get; set; }
        public string LoginUser { get; set; }
        public Nullable<System.DateTime> PrintDate { get; set; }
        public string Serial { get; set; }
        public Nullable<bool> IsFixedSystem { get; set; }
        public Nullable<decimal> Qty { get; set; }
        public Nullable<decimal> UnitPrice { get; set; }
        public Nullable<decimal> ItemTotal { get; set; }
        public string Item_ItemCode { get; set; }
        public string Item_DescA { get; set; }
        public string Item_DescE { get; set; }
        public string Uom_UomCode { get; set; }
        public string UOM_DescA { get; set; }
        public string Uom_DescE { get; set; }
        public string Sys_SystemCode { get; set; }
        public string Sys_DESCA { get; set; }
        public string Sys_DescE { get; set; }
        public Nullable<int> TrNo { get; set; }
        public Nullable<int> TrSerial { get; set; }
        public Nullable<System.DateTime> TrDate { get; set; }
        public string Offer_DescA { get; set; }
        public string OfferDescE { get; set; }
        public Nullable<int> Stage_Code { get; set; }
        public string Stage_DescA { get; set; }
        public string Stage_DescE { get; set; }
        public Nullable<decimal> Stage_total { get; set; }
        public Nullable<decimal> ContractPrice { get; set; }
        public Nullable<int> CustomerCode { get; set; }
        public string cust_DescA { get; set; }
        public string cust_DescE { get; set; }
    }
}
