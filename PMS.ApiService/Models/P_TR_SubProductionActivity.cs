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
    
    public partial class P_TR_SubProductionActivity
    {
        public int SubProductionActivityId { get; set; }
        public Nullable<int> SubProductionId { get; set; }
        public Nullable<int> SubServiceOrderActivityId { get; set; }
        public Nullable<int> SubServiceOrderId { get; set; }
        public Nullable<int> SubContractActivityId { get; set; }
        public Nullable<int> ActivityId { get; set; }
        public Nullable<int> ProjectPhaseItemActivId { get; set; }
        public Nullable<decimal> SOQty { get; set; }
        public Nullable<decimal> FinishQty { get; set; }
        public Nullable<decimal> AppQty { get; set; }
        public Nullable<decimal> ProdBeforeQty { get; set; }
        public Nullable<decimal> UnitPrice { get; set; }
        public Nullable<decimal> Total { get; set; }
        public Nullable<decimal> RemainQty { get; set; }
        public string Remarks { get; set; }
    }
}
