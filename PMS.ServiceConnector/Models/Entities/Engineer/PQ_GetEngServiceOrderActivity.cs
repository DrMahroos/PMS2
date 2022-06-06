using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PMS.ServiceConnector.Models.Entities
{
    public class PQ_GetEngServiceOrderActivity
    {
        public int SubServiceOrderActivityId { get; set; }
        public Nullable<int> SubServiceOrderId { get; set; }
        public Nullable<int> ActivityId { get; set; }
        public Nullable<int> SubContractActivityId { get; set; }
        public Nullable<int> ProjectPhaseItemActivId { get; set; }
        public Nullable<decimal> ContractQty { get; set; }
        public Nullable<decimal> ProjectQty { get; set; }
        public Nullable<decimal> SOQty { get; set; }
        public Nullable<decimal> FinishQty { get; set; }
        public Nullable<decimal> AppQty { get; set; }
        public Nullable<decimal> UnitPrice { get; set; }
        public Nullable<decimal> Total { get; set; }
        public Nullable<decimal> RemainQty { get; set; }
        public string Remarks { get; set; }
        public string ActivityCode { get; set; }
        public string DescA { get; set; }
        public string DescE { get; set; }
        public string Uom_Code { get; set; }
        public string Uom_DescA { get; set; }
        public string Uom_DescE { get; set; }
    }
}
