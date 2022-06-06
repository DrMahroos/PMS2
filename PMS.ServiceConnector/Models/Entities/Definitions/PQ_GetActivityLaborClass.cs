using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PMS.ServiceConnector.Models.Entities.Definitions
{
    public partial class PQ_GetActivityLaborClass
    {
        public string ClassCode { get; set; }
        public string DescA { get; set; }
        public string DescE { get; set; }
        public int ActivityLaborClassID { get; set; }
        public Nullable<int> ActivityID { get; set; }
        public Nullable<int> LaborClassId { get; set; }
        public Nullable<decimal> NoOfLabors { get; set; }
        public Nullable<decimal> HourCost { get; set; }
    }
}
