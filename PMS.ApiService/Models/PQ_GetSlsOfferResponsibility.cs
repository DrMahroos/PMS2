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
    
    public partial class PQ_GetSlsOfferResponsibility
    {
        public int OfferResponsibilityId { get; set; }
        public Nullable<int> OfferID { get; set; }
        public Nullable<bool> IsCustomer { get; set; }
        public Nullable<int> ReposibilityId { get; set; }
        public string Ras_ResposibilityCode { get; set; }
        public bool Res_IsCustomer { get; set; }
        public string Res_DescA { get; set; }
        public string Res_DescE { get; set; }
    }
}