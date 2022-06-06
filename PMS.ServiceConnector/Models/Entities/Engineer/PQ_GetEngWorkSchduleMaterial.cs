using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PMS.ServiceConnector.Models
{
    public class PQ_GetEngWorkSchduleMaterial
    {
        public int ScheduleMaterialId { get; set; }
        public Nullable<int> ScheduleId { get; set; }
        public Nullable<int> ItemId { get; set; }
        public Nullable<decimal> SchedQty { get; set; }
        public Nullable<decimal> ReqQty { get; set; }
        public Nullable<decimal> IssuedQty { get; set; }
        public Nullable<decimal> ReturnQty { get; set; }
        public Nullable<decimal> BalanceQty { get; set; }
        public string Itm_ItemCode { get; set; }
        public string Itm_DescA { get; set; }
        public string Itm_DescE { get; set; }
        public Nullable<int> UomID { get; set; }
        public string Uom_UomCode { get; set; }
        public string Uom_DescA { get; set; }
        public string Uom_DescE { get; set; }
        public Nullable<int> SubServiceOrderId { get; set; }
    }
}
