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
    
    public partial class P_Tr_SalesOfferStageItemActivity
    {
        public int OfferStageItemActivityId { get; set; }
        public int OfferItemId { get; set; }
        public Nullable<int> OfferStageId { get; set; }
        public Nullable<int> OfferID { get; set; }
        public Nullable<int> ActivityID { get; set; }
        public Nullable<int> Serial { get; set; }
        public Nullable<decimal> Qty { get; set; }
        public Nullable<decimal> UnitPrice { get; set; }
        public Nullable<decimal> StdUnitPrice { get; set; }
        public Nullable<bool> ProductionIncluded { get; set; }
        public Nullable<decimal> ProductionPrc { get; set; }
        public string Remarks { get; set; }
        public Nullable<decimal> EstimatedMaterial { get; set; }
        public Nullable<decimal> EstimatedLabor { get; set; }
        public Nullable<decimal> EstimatedEquip { get; set; }
        public Nullable<decimal> EstimatedProfit { get; set; }
    }
}
