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
    
    public partial class I_ItemStoreBatch
    {
        public int ItemStoreBatchId { get; set; }
        public int ItemStoreID { get; set; }
        public int ItemBatchId { get; set; }
        public Nullable<int> StoreCode { get; set; }
        public Nullable<int> BraCode { get; set; }
        public Nullable<int> CompCode { get; set; }
        public Nullable<decimal> OnhandQty { get; set; }
        public Nullable<decimal> BookQty { get; set; }
        public string SerialNo { get; set; }
        public Nullable<int> StoreID { get; set; }
    }
}
