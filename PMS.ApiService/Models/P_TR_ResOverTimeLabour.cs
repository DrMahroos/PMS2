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
