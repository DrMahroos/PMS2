using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PMS.ServiceConnector.Models.Entities
{
    public class PQ_GetResEquipAssign
    {
        public int ScheduleEquipId { get; set; }
        public Nullable<int> ScheduleId { get; set; }
        public Nullable<int> EquimentID { get; set; }
        public Nullable<System.DateTime> AssigneDate { get; set; }
        public Nullable<System.DateTime> LeaveDate { get; set; }
        public Nullable<System.DateTime> ExpLeaveDate { get; set; }
        public Nullable<decimal> HourCost { get; set; }
        public Nullable<int> Status { get; set; }
        public string Equipcode { get; set; }
        public string DescA { get; set; }
        public string DescE { get; set; }
        public string ClassCode { get; set; }
        public string Class_DescA { get; set; }
        public string Class_DescE { get; set; }
    }
}
