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
    
    public partial class PQ_GetSlsOfferStage
    {
        public int OfferStageId { get; set; }
        public Nullable<int> OfferID { get; set; }
        public Nullable<int> StageCode { get; set; }
        public string StageDescA { get; set; }
        public string StageDescE { get; set; }
        public Nullable<int> ScopeID { get; set; }
        public Nullable<decimal> StageTotal { get; set; }
        public string Remarks { get; set; }
        public Nullable<decimal> EstimatedMaterial { get; set; }
        public Nullable<decimal> EstimatedLabor { get; set; }
        public Nullable<decimal> EstimatedEquip { get; set; }
        public Nullable<decimal> EstimatedProfit { get; set; }
        public string Scope_ScopeCode { get; set; }
        public string Scope_DESCA { get; set; }
        public string Scope_DESCE { get; set; }
        public Nullable<decimal> EstimatedOH { get; set; }
        public Nullable<decimal> EstimatedPOH { get; set; }
    }
}
