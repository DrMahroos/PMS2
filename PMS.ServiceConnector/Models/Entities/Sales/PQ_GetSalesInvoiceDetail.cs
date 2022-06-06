using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PMS.ServiceConnector.Models.Entities
{
    public class PQ_GetSalesInvoiceDetail
    {
        public Nullable<int> InvoiceId { get; set; }
        public Nullable<int> ProjectPhaseItemId { get; set; }
        public Nullable<decimal> UnitPrice { get; set; }
        public Nullable<decimal> BillQty { get; set; }
        public Nullable<decimal> Total { get; set; }
        public string Itm_ItemCode { get; set; }
        public string Itm_DescA { get; set; }
        public string Itm_DescE { get; set; }
        public Nullable<int> ProjectPhaseId { get; set; }
        public int InvoiceDetailId { get; set; }
        public string LineCode { get; set; }
        public Nullable<decimal> ItemQty { get; set; }
        public Nullable<decimal> PrevBillQty { get; set; }
        public Nullable<int> Serial { get; set; }
        public string Remarks { get; set; }
        public Nullable<decimal> ProdQty { get; set; }
        public string UomCode { get; set; }
        public string uom_DescA { get; set; }
        public string Uom_DescE { get; set; }
        public Nullable<decimal> ItemDiscountPrc { get; set; }
        public Nullable<decimal> ItemDiscountAmt { get; set; }
        public Nullable<decimal> NetUnitPrice { get; set; }
        public Nullable<decimal> ItemVatPrc { get; set; }
        public Nullable<decimal> ItemVatAmount { get; set; }
        public Nullable<decimal> ItemTotal { get; set; }
        public Nullable<decimal> ItemTotalAVat { get; set; }





    }
}
