using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PMS.ServiceConnector.Models.Entities
{
    public class PQ_GetSalesIssueProduction
    {
        public int ProductionId { get; set; }
        public int TrNo { get; set; }
        public Nullable<int> ProjectID { get; set; }
        public Nullable<System.DateTime> TrDate { get; set; }
        public string ProjCode { get; set; }
        public Nullable<int> BillCode { get; set; }
        public Nullable<System.DateTime> FromDate { get; set; }
        public Nullable<System.DateTime> ToDate { get; set; }
        public Nullable<decimal> ProdTotal { get; set; }
        public Nullable<decimal> DiscountPrc { get; set; }
        public Nullable<decimal> Discount { get; set; }
        public Nullable<decimal> NetAmount { get; set; }
        public string WorkDiscription { get; set; }
        public Nullable<int> CustomerID { get; set; }
        public Nullable<bool> IsFinal { get; set; }
        public string RefCode { get; set; }
        public Nullable<byte> Status { get; set; }
        public string Remarks { get; set; }
        public Nullable<int> BraCode { get; set; }
        public Nullable<int> CompCode { get; set; }
        public string CreatedBy { get; set; }
        public Nullable<System.DateTime> CreatedAt { get; set; }
        public string UpdatedBy { get; set; }
        public Nullable<System.DateTime> UpdatedAt { get; set; }
        public string Proj_ProjectCode { get; set; }
        public string Proj_DescA { get; set; }
        public string Proj_DescL { get; set; }
        public Nullable<int> Cust_CustomerCode { get; set; }
        public string Cust_DescA { get; set; }
        public string Cust_DescE { get; set; }
    }
}
