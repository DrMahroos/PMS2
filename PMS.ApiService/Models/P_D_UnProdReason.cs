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
    
    public partial class P_D_UnProdReason
    {
        public int UnProdReasonId { get; set; }
        public int UnProdCategoryID { get; set; }
        public string ReasonCode { get; set; }
        public string DescA { get; set; }
        public string DescE { get; set; }
        public string Remarks { get; set; }
        public Nullable<int> CompCode { get; set; }
    }
}
