using System;
using System.Collections.Generic;

namespace PMS.ServiceConnector.Models
{
    public partial class PProc_EngMonitorScheduleLabour_Result
    {
        public string LClass_CalssCode { get; set; }
        public string LClass_DescA { get; set; }
        public string LClass_DescE { get; set; }
        public string Cat_CatCode { get; set; }
        public string Cat_DescA { get; set; }
        public string cat_descE { get; set; }
        public string LaborCode { get; set; }
        public string DescA { get; set; }
        public string DescE { get; set; }
        public Nullable<int> SchNo { get; set; }
        public Nullable<System.DateTime> AssigneDate { get; set; }
        public Nullable<System.DateTime> LeaveDate { get; set; }
        public Nullable<System.DateTime> ExpLeaveDate { get; set; }
        public Nullable<int> Status { get; set; }
        public string ProjectPhaseCode { get; set; }
        public string ProjectCode { get; set; }
        public string Stat_desc { get; set; }
    }
}
