//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace PMS.ServiceConnector.Models
{
    using System;
    using System.Collections.Generic;
    
    public partial class P_D_Calender
    {
        public int CalenderID { get; set; }
        public string Calendercode { get; set; }
        public string DescA { get; set; }
        public string DescE { get; set; }
        public string Remarks { get; set; }
        public Nullable<int> CompCode { get; set; }
        public Nullable<decimal> DailyWorkHours { get; set; }
        public Nullable<decimal> WeekWorkHours { get; set; }
        public Nullable<System.DateTime> StartTime { get; set; }
        public Nullable<System.DateTime> EndTime { get; set; }
        public Nullable<System.DateTime> BreakStart { get; set; }
        public Nullable<System.DateTime> BreakEnd { get; set; }
    }
}
