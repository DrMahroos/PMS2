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
    
    public partial class P_TR_EngProjectItem
    {
        public int ProjectPhaseItemId { get; set; }
        public Nullable<int> ProjectPhaseId { get; set; }
        public Nullable<int> ProjectID { get; set; }
        public Nullable<int> OfferItemId { get; set; }
        public string ItemCode { get; set; }
        public string LineCode { get; set; }
        public Nullable<int> ItemID { get; set; }
        public string DescA { get; set; }
        public string DescE { get; set; }
        public Nullable<bool> IsFixedSystem { get; set; }
        public Nullable<decimal> ContrQty { get; set; }
        public Nullable<decimal> ItemQty { get; set; }
        public Nullable<decimal> ProdQty { get; set; }
        public Nullable<decimal> BilledQty { get; set; }
        public Nullable<decimal> UnitPrice { get; set; }
        public Nullable<decimal> StdUnitPrice { get; set; }
        public Nullable<bool> IsOfferItem { get; set; }
        public Nullable<byte> ProductionType { get; set; }
        public string Remarks { get; set; }
        public Nullable<decimal> EstimatedMaterial { get; set; }
        public Nullable<decimal> EstimatedLabor { get; set; }
        public Nullable<decimal> EstimatedEquip { get; set; }
        public Nullable<decimal> EstimatedProfit { get; set; }
        public Nullable<decimal> EstimatedOH { get; set; }
        public Nullable<decimal> EstimatedPOH { get; set; }
        public Nullable<System.DateTime> StartDate { get; set; }
        public Nullable<System.DateTime> EndDate { get; set; }
        public Nullable<int> RelProjectPhaseItemId { get; set; }
        public Nullable<int> RelationType { get; set; }
        public Nullable<int> RelationDelay { get; set; }
    }
}