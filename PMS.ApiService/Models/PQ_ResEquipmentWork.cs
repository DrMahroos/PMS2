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
    
    public partial class PQ_ResEquipmentWork
    {
        public int ProductionId { get; set; }
        public Nullable<int> TrNo { get; set; }
        public Nullable<System.DateTime> TrDate { get; set; }
        public Nullable<int> ProjectID { get; set; }
        public Nullable<int> ProjectPhaseId { get; set; }
        public string WorkDescr { get; set; }
        public Nullable<decimal> TotWorkHours { get; set; }
        public Nullable<decimal> TotEstHours { get; set; }
        public Nullable<decimal> WorkHours { get; set; }
        public Nullable<decimal> HourCost { get; set; }
        public Nullable<decimal> BonusHours { get; set; }
        public Nullable<int> EquipmentID { get; set; }
    }
}