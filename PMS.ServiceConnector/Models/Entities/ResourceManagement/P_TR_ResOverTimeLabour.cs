using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PMS.ServiceConnector.Models
{
    public partial class P_TR_ResOverTimeLabour
    {
        public int OverTimeLabourID { get; set; }
        public Nullable<int> OverTimeID { get; set; }
        public Nullable<int> LaborID { get; set; }
        public Nullable<int> LaborOverTimeTypeID { get; set; }
        public Nullable<System.DateTime> StartDate { get; set; }
        public Nullable<decimal> OverTimeHours { get; set; }
        public Nullable<decimal> OverTimeRate { get; set; }
        public Nullable<decimal> OTHourCost { get; set; }
        public string Remarks { get; set; }
    }
}
