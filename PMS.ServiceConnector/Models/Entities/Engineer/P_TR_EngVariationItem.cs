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
    
    public partial class P_TR_EngVariationItem
    {
        public int VariationItemId { get; set; }
        public Nullable<int> VariationId { get; set; }
        public Nullable<bool> IsNew { get; set; }
        public Nullable<int> ProjectPhaseItemId { get; set; }
        public string LineCode { get; set; }
        public Nullable<int> ItemID { get; set; }
        public string DescA { get; set; }
        public string DescE { get; set; }
        public Nullable<decimal> UnitPrice { get; set; }
        public Nullable<decimal> OrgItemQty { get; set; }
        public Nullable<decimal> ItemQty { get; set; }
        public Nullable<decimal> EstimatedMaterial { get; set; }
        public Nullable<decimal> EstimatedLabor { get; set; }
        public Nullable<decimal> EstimatedEquip { get; set; }
        public Nullable<decimal> EstimatedProfit { get; set; }
        public string Remarks { get; set; }
        public Nullable<decimal> BilledQty { get; set; }
        public Nullable<decimal> ProdQty { get; set; }
        public Nullable<decimal> ProgressQty { get; set; }
    }
}
