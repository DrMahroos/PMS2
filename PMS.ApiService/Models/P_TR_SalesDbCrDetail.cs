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
    using System.Collections.Generic;
    
    public partial class P_TR_SalesDbCrDetail
    {
        public int InvoiceDetailId { get; set; }
        public Nullable<int> InvoiceId { get; set; }
        public Nullable<int> Serial { get; set; }
        public Nullable<int> InvSerial { get; set; }
        public Nullable<int> ProjectPhaseItemId { get; set; }
        public Nullable<decimal> BillQty { get; set; }
        public Nullable<decimal> UnitPrice { get; set; }
        public Nullable<decimal> DiffQty { get; set; }
        public Nullable<decimal> DiffPrice { get; set; }
        public string Remarks { get; set; }
        public Nullable<decimal> InvDiscountPrc { get; set; }
        public Nullable<decimal> InvDiscountAmt { get; set; }
        public Nullable<decimal> DiffPricePrc { get; set; }
        public Nullable<decimal> ItemTotal { get; set; }
        public Nullable<decimal> ItemVatPrc { get; set; }
        public Nullable<decimal> ItemVatAmount { get; set; }
        public Nullable<decimal> ItemTotalAVat { get; set; }
    }
}