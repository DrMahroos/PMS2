﻿//------------------------------------------------------------------------------
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

    public partial class PQ_GetEngExpenses
    {
        public int ExpensesEntryId { get; set; }
        public Nullable<int> TrNo { get; set; }
        public Nullable<System.DateTime> TrDate { get; set; }
        public Nullable<int> ProjectPhaseId { get; set; }
        public Nullable<int> ProjectID { get; set; }
        public Nullable<decimal> TotalAmount { get; set; }
        public Nullable<bool> Status { get; set; }
        public string Remarks { get; set; }
        public Nullable<int> BraCode { get; set; }
        public Nullable<int> CompCode { get; set; }
        public string CreatedBy { get; set; }
        public Nullable<System.DateTime> CreatedAt { get; set; }
        public string UpdatedBy { get; set; }
        public Nullable<System.DateTime> UpdatedAt { get; set; }
        public string Proj_Code { get; set; }
        public string Proj_DescA { get; set; }
        public string Proj_DescE { get; set; }
        public string Phase_code { get; set; }
        public string Phase_DescA { get; set; }
        public string Phase_DescE { get; set; }
    }
}
