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
    
    public partial class P_D_SalesCustomerDoc
    {
        public int CustomerDocID { get; set; }
        public Nullable<int> CustomerId { get; set; }
        public Nullable<int> CusIDTypeCode { get; set; }
        public string IDNo { get; set; }
        public string IDIssuePlace { get; set; }
        public Nullable<System.DateTime> IDIssueDate { get; set; }
        public string IDIssueDateH { get; set; }
        public Nullable<System.DateTime> IDExpireDate { get; set; }
        public string IDExpireDateH { get; set; }
    }
}
