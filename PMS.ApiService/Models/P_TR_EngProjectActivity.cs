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
    
    public partial class P_TR_EngProjectActivity
    {
        public int ProjectPhaseItemActivId { get; set; }
        public Nullable<int> ProjectPhaseItemId { get; set; }
        public Nullable<int> ProjectPhaseId { get; set; }
        public Nullable<int> ProjectID { get; set; }
        public Nullable<int> ActivityID { get; set; }
        public Nullable<int> Serial { get; set; }
        public Nullable<decimal> ContrQty { get; set; }
        public Nullable<decimal> ActivQty { get; set; }
        public Nullable<decimal> TotalProdQty { get; set; }
        public Nullable<decimal> SchedQty { get; set; }
        public Nullable<decimal> SchedProdQty { get; set; }
        public Nullable<decimal> SCon_Qty { get; set; }
        public Nullable<decimal> SConProdQty { get; set; }
        public Nullable<decimal> UnitPrice { get; set; }
        public Nullable<decimal> StdUnitPrice { get; set; }
        public Nullable<bool> ProductionIncluded { get; set; }
        public Nullable<decimal> ProductionPrc { get; set; }
        public string Remarks { get; set; }
        public Nullable<decimal> EstimatedMaterial { get; set; }
        public Nullable<decimal> EstimatedLabor { get; set; }
        public Nullable<decimal> EstimatedEquip { get; set; }
        public Nullable<decimal> EstimatedProfit { get; set; }
        public Nullable<decimal> EstimatedOH { get; set; }
        public Nullable<decimal> EstimatedPOH { get; set; }
        public Nullable<System.DateTime> StartDate { get; set; }
        public Nullable<System.DateTime> EndDate { get; set; }
        public Nullable<int> RelProjectPhaseItemActivId { get; set; }
        public Nullable<int> RelationType { get; set; }
        public Nullable<int> RelationDelay { get; set; }
    }
}
