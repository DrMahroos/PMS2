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
    
    public partial class PProc_Rep_Res_LabourAttendance_Result
    {
        public Nullable<int> Comp { get; set; }
        public string CompNameA { get; set; }
        public string CompNameE { get; set; }
        public string BraNameA { get; set; }
        public string BraNameE { get; set; }
        public string LoginUser { get; set; }
        public Nullable<System.DateTime> PrintDate { get; set; }
        public string Par_FromDate { get; set; }
        public string Par_Todate { get; set; }
        public string Par_FromLAbor { get; set; }
        public string Par_ToLabor { get; set; }
        public string Par_LabclassDsA { get; set; }
        public string Par_LabclassDsE { get; set; }
        public string Par_LabCatDsA { get; set; }
        public string Par_LabCatDsE { get; set; }
        public string LaborCode { get; set; }
        public string DescA { get; set; }
        public string DescE { get; set; }
        public Nullable<int> BraCode { get; set; }
        public Nullable<bool> IsActive { get; set; }
        public Nullable<int> StdHrs { get; set; }
        public Nullable<int> WorkDays { get; set; }
        public decimal WorkHrs { get; set; }
        public decimal UnProdHrs { get; set; }
        public decimal OVTHrs { get; set; }
        public decimal AbsHrs { get; set; }
        public Nullable<decimal> DiffHrs { get; set; }
    }
}