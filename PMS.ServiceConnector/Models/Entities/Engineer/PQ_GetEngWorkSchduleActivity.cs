using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PMS.ServiceConnector.Models.Entities
{
    public class PQ_GetEngWorkSchduleActivity
    {
        public int ScheduleActivId { get; set; }
        public Nullable<int> ScheduleId { get; set; }
        public Nullable<int> ItemId { get; set; }
        public Nullable<int> ActivityID { get; set; }
        public Nullable<int> ProjectPhaseItemActivId { get; set; }
        public Nullable<decimal> AvailQty { get; set; }
        public Nullable<decimal> SchedQty { get; set; }
        public Nullable<decimal> ProdBeforeQty { get; set; }
        public Nullable<decimal> TotSchedQty { get; set; }
        public Nullable<decimal> ActivQty { get; set; }
        public Nullable<decimal> FinishQty { get; set; }
        public Nullable<decimal> DailyProd { get; set; }
        public string Itm_ItemCode { get; set; }
        public string Itm_DescA { get; set; }
        public string Itm_DescE { get; set; }
        public string Act_ActivityCode { get; set; }
        public string Act_DescA { get; set; }
        public string Act_DescE { get; set; }
        public string Act_UomCode { get; set; }
    }
}
