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
    
    public partial class P_D_SalesItemsActivity
    {
        public int ItemsActivityId { get; set; }
        public Nullable<int> ItemID { get; set; }
        public Nullable<int> ActivityID { get; set; }
        public Nullable<decimal> ActQty { get; set; }
        public Nullable<bool> IsProdIncluded { get; set; }
        public Nullable<decimal> ProdPrc { get; set; }
        public Nullable<int> ItemSystemID { get; set; }
    }
}
