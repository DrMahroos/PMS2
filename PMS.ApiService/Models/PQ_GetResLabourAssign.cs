//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace PMS.ApiService.Models
{
    using System;
    using System.Collections.Generic;
    
    public partial class PQ_GetResLabourAssign
    {
        public int ScheduleLaborId { get; set; }
        public Nullable<int> ScheduleId { get; set; }
        public Nullable<int> LaborID { get; set; }
        public Nullable<System.DateTime> AssigneDate { get; set; }
        public Nullable<System.DateTime> LeaveDate { get; set; }
        public Nullable<System.DateTime> ExpLeaveDate { get; set; }
        public Nullable<decimal> HourCost { get; set; }
        public Nullable<int> Status { get; set; }
        public string LaborCode { get; set; }
        public string DescA { get; set; }
        public string DescE { get; set; }
        public string LabourClass_ClassCode { get; set; }
        public string LabourClass_DescA { get; set; }
        public string LabourClass_DescE { get; set; }
    }
}
