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
    
    public partial class P_TR_EngProductionLabour
    {
        public int ProductionLaborId { get; set; }
        public Nullable<int> ProductionId { get; set; }
        public Nullable<int> LaborID { get; set; }
        public Nullable<decimal> WorkHours { get; set; }
        public Nullable<decimal> UnProdHours { get; set; }
        public Nullable<decimal> HourCost { get; set; }
        public Nullable<decimal> EstHours { get; set; }
    }
}
