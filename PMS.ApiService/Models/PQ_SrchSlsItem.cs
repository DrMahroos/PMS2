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
    
    public partial class PQ_SrchSlsItem
    {
        public int ItemID { get; set; }
        public string ItemCode { get; set; }
        public string DescA { get; set; }
        public string DescE { get; set; }
        public Nullable<decimal> MinUnitPrice { get; set; }
        public Nullable<decimal> UnitPrice { get; set; }
        public Nullable<bool> IsDetail { get; set; }
        public Nullable<bool> IsActive { get; set; }
        public Nullable<int> CompCode { get; set; }
        public string uom_UomCode { get; set; }
        public string uom_DescA { get; set; }
        public string uom_DescE { get; set; }
        public Nullable<int> ScopeID { get; set; }
        public string TechDescA { get; set; }
        public string TechDescE { get; set; }
        public Nullable<decimal> StdPrice { get; set; }
        public Nullable<bool> IsEditable { get; set; }
    }
}