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
    
    public partial class A_D_VAT_TYPE
    {
        public int COMP_CODE { get; set; }
        public short TYPE { get; set; }
        public short CODE { get; set; }
        public string DESCRIPTION { get; set; }
        public Nullable<byte> VatType { get; set; }
        public Nullable<decimal> VatPerc { get; set; }
        public Nullable<int> LineOrder { get; set; }
    }
}