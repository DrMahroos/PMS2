using System;
using System.Collections.Generic;

namespace PMS.ServiceConnector.Models
{
    public partial class PProc_EngMonitorScheduleLabourClass_Result
    {
        public string LClass_CalssCode { get; set; }
        public string LClass_DescA { get; set; }
        public string LClass_DescE { get; set; }
        public Nullable<decimal> required { get; set; }
        public Nullable<int> assigned { get; set; }
        public Nullable<decimal> Remain { get; set; }
    }
}
