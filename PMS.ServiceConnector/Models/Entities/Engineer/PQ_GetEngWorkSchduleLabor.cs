using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PMS.ServiceConnector.Models.Entities
{
    public class PQ_GetEngWorkSchduleLabor
    {
        public int ScheduleLaborId { get; set; }
        public Nullable<int> ScheduleId { get; set; }
        public Nullable<int> LaborID { get; set; }
        public Nullable<System.DateTime> AssigneDate { get; set; }
        public Nullable<System.DateTime> LeaveDate { get; set; }
        public Nullable<System.DateTime> ExpLeaveDate { get; set; }
        public Nullable<decimal> HourCost { get; set; }
        public Nullable<int> Status { get; set; }
        public int labor_LaborID { get; set; }
        public string Lab_LabCode { get; set; }
        public string Lab_DescA { get; set; }
        public string Lab_DescE { get; set; }
        public Nullable<decimal> Lab_BasicSalary { get; set; }
        public Nullable<decimal> Lab_TotalAllow { get; set; }
        public Nullable<decimal> Lab_HourCost { get; set; }
    }
}
