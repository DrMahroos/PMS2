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
    
    public partial class PQ_GetEngWorkSchduleEquipClass
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
