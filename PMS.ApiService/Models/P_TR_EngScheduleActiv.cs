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
    
    public partial class P_TR_EngScheduleActiv
    {
        public int ScheduleActivId { get; set; }
        public Nullable<int> ScheduleId { get; set; }
        public Nullable<int> ItemId { get; set; }
        public Nullable<int> ActivityID { get; set; }
        public Nullable<int> ProjectPhaseItemActivId { get; set; }
        public Nullable<decimal> AvailQty { get; set; }
        public Nullable<decimal> SchedQty { get; set; }
        public Nullable<decimal> ProdBeforeQty { get; set; }
        public Nullable<decimal> TotSchedQty { get; set; }
        public Nullable<decimal> ActivQty { get; set; }
        public Nullable<decimal> FinishQty { get; set; }
    }
}
