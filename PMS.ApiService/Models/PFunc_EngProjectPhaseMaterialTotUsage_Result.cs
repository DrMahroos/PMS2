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
    
    public partial class PFunc_EngProjectPhaseMaterialTotUsage_Result
    {
        public Nullable<int> ProjectID { get; set; }
        public Nullable<int> ProjectPhaseID { get; set; }
        public Nullable<decimal> TotIss_Cost { get; set; }
        public Nullable<decimal> TotIss_Qty { get; set; }
        public Nullable<decimal> totRet_qty { get; set; }
        public Nullable<decimal> TotRet_cost { get; set; }
        public Nullable<decimal> TotNet_Qty { get; set; }
        public Nullable<decimal> TotNet_Cost { get; set; }
    }
}
