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
    
    public partial class PFunc_ResProjectPhaseReq_Result
    {
        public int ProjectPhaseId { get; set; }
        public Nullable<int> ProjectID { get; set; }
        public int ResType { get; set; }
        public Nullable<int> ResID { get; set; }
        public string ResCode { get; set; }
        public Nullable<decimal> Unitcost { get; set; }
        public Nullable<decimal> Qty { get; set; }
        public Nullable<decimal> Cost { get; set; }
    }
}
