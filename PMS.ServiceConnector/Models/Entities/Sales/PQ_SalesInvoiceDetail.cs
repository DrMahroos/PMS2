using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PMS.ServiceConnector.Models.Entities
{
    public class PQ_SalesInvoiceDetail
    {
        public int InvoiceProdId { get; set; }
        public Nullable<int> InvoiceId { get; set; }
        public Nullable<int> ProjectPhaseItemId { get; set; }
        public Nullable<decimal> UnitPrice { get; set; }
        public Nullable<decimal> BillQty { get; set; }
        public Nullable<int> InvoiceDetailId { get; set; }
    }
}
