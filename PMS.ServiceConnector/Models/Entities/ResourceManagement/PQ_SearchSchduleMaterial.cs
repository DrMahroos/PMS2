using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PMS.ServiceConnector.Models.Entities
{
    public class PQ_SearchSchduleMaterial
    {
        public int ScheduleMaterialId { get; set; }
        public Nullable<int> ScheduleId { get; set; }
        public Nullable<int> SubServiceOrderId { get; set; }
        public Nullable<int> ItemId { get; set; }
        public Nullable<decimal> SchedQty { get; set; }
        public Nullable<decimal> ReqQty { get; set; }
        public Nullable<decimal> IssuedQty { get; set; }
        public Nullable<decimal> ReturnQty { get; set; }
        public string itm_ItemCode { get; set; }
        public string itm_DescA { get; set; }
        public string itm_DescL { get; set; }
        public string uom_UomCode { get; set; }
        public string uom_DescA { get; set; }
        public string uom_DescE { get; set; }
    }
}
