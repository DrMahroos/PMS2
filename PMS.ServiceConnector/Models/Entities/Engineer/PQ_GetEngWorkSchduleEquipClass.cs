using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PMS.ServiceConnector.Models.Entities
{
    public class PQ_GetEngWorkSchduleEquipClass
    {
        public int ScheduleEquipClassId { get; set; }
        public Nullable<int> ScheduleId { get; set; }
        public Nullable<int> EquipClassId { get; set; }
        public Nullable<decimal> RequiredNo { get; set; }
        public Nullable<decimal> HourCost { get; set; }
        public string Class_ClassCode { get; set; }
        public string Class_DescA { get; set; }
        public string Class_DescE { get; set; }
        public Nullable<decimal> Class_HourCost { get; set; }
        public int AssignedEq { get; set; }
        public Nullable<decimal> RemainEq { get; set; }
        public Nullable<decimal> RequiredHrs { get; set; }
    }
}
