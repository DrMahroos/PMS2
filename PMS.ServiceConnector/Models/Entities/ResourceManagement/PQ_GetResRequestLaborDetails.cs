using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PMS.ServiceConnector.Models.Entities
{
    public class PQ_GetResRequestLaborDetails
    {
        public int ScheduleLaborClassId { get; set; }
        public Nullable<int> ScheduleId { get; set; }
        public Nullable<int> LaborCLassID { get; set; }
        public Nullable<decimal> RequiredNo { get; set; }
        public Nullable<decimal> RequiredHrs { get; set; }
        public Nullable<decimal> HourCost { get; set; }
        public string ClassCode { get; set; }
        public string DescA { get; set; }
        public string DescE { get; set; }
    }
}
