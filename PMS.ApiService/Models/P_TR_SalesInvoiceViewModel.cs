﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace PMS.ApiService.Models
{
    public   class P_TR_SalesInvoiceViewModel
    {
        public int InvoiceId { get; set; }
        public Nullable<int> TrNo { get; set; }
        public Nullable<System.DateTime> TrDate { get; set; }
        public Nullable<int> ProjectID { get; set; }
        public string ProjCode { get; set; }
        public Nullable<int> BillCode { get; set; }
        public Nullable<System.DateTime> FromDate { get; set; }
        public Nullable<System.DateTime> ToDate { get; set; }
        public string WorkDiscription { get; set; }
        public Nullable<decimal> TotalAmount { get; set; }
        public Nullable<decimal> DiscountPrc { get; set; }
        public Nullable<decimal> Discount { get; set; }
        public Nullable<decimal> VatAmount { get; set; }
        public Nullable<decimal> NetAmount { get; set; }
        public Nullable<int> CustomerID { get; set; }
        public Nullable<bool> IsFinal { get; set; }
        public string RefCode { get; set; }
        public Nullable<byte> Status { get; set; }
        public string Remarks { get; set; }
        public Nullable<int> BraCode { get; set; }
        public Nullable<int> CompCode { get; set; }
        public string CreatedBy { get; set; }
        public Nullable<System.DateTime> CreatedAt { get; set; }
        public string UpdatedBy { get; set; }
        public Nullable<System.DateTime> UpdatedAt { get; set; }
        public Nullable<bool> IsPosted { get; set; }
        public string PostRef { get; set; }
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
        public Mytime TrTime { get; set; }
        public string DocNo { get; set; }
        public string DocUUID { get; set; }
        public Nullable<int> InvoiceTypeCode { get; set; }
        public Nullable<int> InvoiceTransCode { get; set; }
        public Nullable<int> GlobalInvoiceCounter { get; set; }
        public string PrevInvoiceHash { get; set; }
        public string QRCode { get; set; }
        public string CryptographicStamp { get; set; }
        public Nullable<decimal> AdvanceConsumPrc { get; set; }
    }
}