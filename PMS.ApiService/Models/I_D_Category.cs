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
    
    public partial class I_D_Category
    {
        public int CatID { get; set; }
        public Nullable<int> CompCode { get; set; }
        public string CatCode { get; set; }
        public string DescA { get; set; }
        public string DescL { get; set; }
        public Nullable<int> ParentCatId { get; set; }
        public Nullable<int> CatLevel { get; set; }
        public Nullable<bool> IsDetail { get; set; }
        public Nullable<int> UnitGrpID { get; set; }
        public Nullable<bool> IsAutoGenerateItem { get; set; }
        public string ItemFormatFix { get; set; }
        public string ItemFormatSerial { get; set; }
        public Nullable<int> ItemTypeID { get; set; }
        public Nullable<int> CostMethodID { get; set; }
        public Nullable<int> StockMethodID { get; set; }
        public Nullable<bool> IssueFromCenteralStore { get; set; }
        public Nullable<int> CenteralStoreCode { get; set; }
        public Nullable<bool> IsAdditionalSpecs { get; set; }
        public string AdditionalspcsDescA { get; set; }
        public string AdditionalspcsDescL { get; set; }
        public Nullable<bool> ISSales { get; set; }
        public Nullable<bool> IsStock { get; set; }
        public Nullable<bool> IsProduct { get; set; }
        public Nullable<bool> IsIssuetoCC { get; set; }
        public Nullable<bool> IsIssueToProd { get; set; }
        public Nullable<bool> IsPurchase { get; set; }
        public string Remarks { get; set; }
        public Nullable<System.DateTime> CreatedAt { get; set; }
        public string CreatedBy { get; set; }
        public Nullable<System.DateTime> UpdatedAt { get; set; }
        public string UpdatedBy { get; set; }
    }
}
