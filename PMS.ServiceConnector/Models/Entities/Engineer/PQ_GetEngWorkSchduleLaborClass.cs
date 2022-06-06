using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PMS.ServiceConnector.Models.Entities
{
    public class PQ_GetEngWorkSchduleLaborClass
    {
        public int ScheduleLaborClassId { get; set; }
        public Nullable<int> ScheduleId { get; set; }
        public Nullable<int> LaborCLassID { get; set; }
        public Nullable<decimal> RequiredNo { get; set; }
        public Nullable<decimal> HourCost { get; set; }
        public string LClass_CalssCode { get; set; }
        public string LClass_DescA { get; set; }
        public string LClass_DescE { get; set; }
        public Nullable<decimal> LCass_HourCost { get; set; }
        public int AssignedLab { get; set; }
        public Nullable<decimal> RemainLab { get; set; }
        public Nullable<decimal> RequiredHrs { get; set; }
    }
}
