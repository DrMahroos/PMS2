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
    
    public partial class P_D_Activity
    {
        public int ActivityID { get; set; }
        public string ActivityCode { get; set; }
        public string DescA { get; set; }
        public string DescE { get; set; }
        public Nullable<int> UomID { get; set; }
        public Nullable<decimal> HourProduction { get; set; }
        public Nullable<decimal> LaborProdRate { get; set; }
        public Nullable<decimal> UnitPrice { get; set; }
        public Nullable<int> ParentActivityID { get; set; }
        public Nullable<int> ActivityLevel { get; set; }
        public Nullable<bool> IsDetail { get; set; }
        public string Remarks { get; set; }
        public Nullable<int> CompCode { get; set; }
        public string CreatedBy { get; set; }
        public Nullable<System.DateTime> CreatedAt { get; set; }
        public string UpdatedBy { get; set; }
        public Nullable<System.DateTime> UpdatedAt { get; set; }
    }
}
