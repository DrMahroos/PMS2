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
    
    public partial class PQ_GetEngExpensesDetail
    {
        public int ExpensesEntryDetailId { get; set; }
        public Nullable<int> ExpensesEntryId { get; set; }
        public Nullable<int> SeqNo { get; set; }
        public Nullable<int> ExpencesID { get; set; }
        public Nullable<int> ProjectPhaseId { get; set; }
        public Nullable<decimal> Amount { get; set; }
        public string Benificial { get; set; }
        public string RefNo { get; set; }
        public string Remarks { get; set; }
        public string Exp_ExpCode { get; set; }
        public string Exp_DescA { get; set; }
        public string Exp_DescE { get; set; }
        public string Phase_Code { get; set; }
        public string Phase_DescA { get; set; }
        public string Phase_DescE { get; set; }
    }
}