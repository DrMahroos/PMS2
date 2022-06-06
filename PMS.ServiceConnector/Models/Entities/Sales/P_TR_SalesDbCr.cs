 

namespace PMS.ServiceConnector.Models
{
    using System;
    using System.Collections.Generic;

    public partial class P_TR_SalesDbCr
    {
        public int InvoiceId { get; set; }
        public Nullable<int> TrType { get; set; }
        public Nullable<int> DbReason { get; set; }
        public Nullable<int> RefInvoiceid { get; set; }
        public Nullable<int> TrNo { get; set; }
        public Nullable<System.DateTime> TrDate { get; set; }
        public Nullable<int> ProjectID { get; set; }
        public string ProjCode { get; set; }
        public Nullable<System.DateTime> FromDate { get; set; }
        public Nullable<System.DateTime> ToDate { get; set; }
        public string WorkDiscription { get; set; }
        public Nullable<decimal> TotalAmount { get; set; }
        public Nullable<decimal> DiscountPrc { get; set; }
        public Nullable<decimal> Discount { get; set; }
        public Nullable<decimal> VatAmount { get; set; }
        public Nullable<decimal> NetAmount { get; set; }
        public Nullable<int> CustomerID { get; set; }
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
        public Nullable<System.TimeSpan> TrTime { get; set; }
        public string DocNo { get; set; }
        public string DocUUID { get; set; }
        public Nullable<int> InvoiceTypeCode { get; set; }
        public Nullable<int> InvoiceTransCode { get; set; }
        public Nullable<int> GlobalInvoiceCounter { get; set; }
        public string PrevInvoiceHash { get; set; }
        public string QRCode { get; set; }
        public string CryptographicStamp { get; set; }
    }
}
