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
    
    public partial class P_D_Location
    {
        public int LocationId { get; set; }
        public Nullable<int> BraCode { get; set; }
        public string LocCode { get; set; }
        public Nullable<int> SalesEngineerId { get; set; }
        public Nullable<int> ParentLocationId { get; set; }
        public string DescA { get; set; }
        public string DescE { get; set; }
        public string Remarks { get; set; }
        public Nullable<bool> IsDetail { get; set; }
        public Nullable<int> CompCode { get; set; }
    }
}
