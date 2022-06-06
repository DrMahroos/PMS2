using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PMS.ServiceConnector.Models.Entities.CustomEntities
{
 public  class P_TR_InvoiceCollection
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
        ////////////////InvoiceDetails///////////////////////////////
        public int InvoiceDetailId { get; set; }
     
        public Nullable<int> Serial { get; set; }
        public Nullable<int> ProjectItemId { get; set; }
        public Nullable<decimal> PrevBillQty { get; set; }
        public Nullable<decimal> BillQty { get; set; }
        public Nullable<decimal> UnitPrice { get; set; }
     
        ////////////////////////InvoiceProd Items//////////////////////////////
        public int InvoiceProdId { get; set; }
     
        public Nullable<int> ProductionDetailId { get; set; }
        public Nullable<decimal> InvQty { get; set; }
      
        public Nullable<decimal> Total { get; set; }
        public Nullable<decimal> BilledQty { get; set; }
     
        public Nullable<decimal> ToBillQty { get; set; }
        /////////////////////Production///////////////////////////
        public int ProductionId { get; set; }
       
        public Nullable<decimal> ProdTotal { get; set; }
      

    }
}
