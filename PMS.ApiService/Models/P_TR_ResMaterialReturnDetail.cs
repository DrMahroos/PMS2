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
    
    public partial class P_TR_ResMaterialReturnDetail
    {
        public int RequestMaterialDetailId { get; set; }
        public int ReturnMaterialId { get; set; }
        public Nullable<int> ItemId { get; set; }
        public Nullable<decimal> NetIssuedQty { get; set; }
        public Nullable<decimal> ReturndQty { get; set; }
        public Nullable<decimal> UnitCost { get; set; }
    }
}
