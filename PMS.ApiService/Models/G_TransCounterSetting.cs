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
    
    public partial class G_TransCounterSetting
    {
        public int CompCode { get; set; }
        public string SystemCode { get; set; }
        public string TransType { get; set; }
        public Nullable<byte> YearStartValueType { get; set; }
        public Nullable<bool> ISBranchCounter { get; set; }
        public Nullable<int> YearStartFixedValue { get; set; }
        public string Remarks { get; set; }
    }
}
