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
    
    public partial class I_D_SpecificationValues
    {
        public int SpecsValueID { get; set; }
        public Nullable<int> SpecsID { get; set; }
        public string SpecsValueCode { get; set; }
        public string ValueA { get; set; }
        public string ValueE { get; set; }
        public Nullable<int> CompCode { get; set; }
        public string Remarks { get; set; }
        public Nullable<System.DateTime> CreatedAt { get; set; }
        public string CreatedBy { get; set; }
        public Nullable<System.DateTime> UpdatedAt { get; set; }
        public string UpdatedBy { get; set; }
    }
}
