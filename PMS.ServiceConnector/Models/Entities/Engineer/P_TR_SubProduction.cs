using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PMS.ServiceConnector.Models.Entities
{
    public class P_TR_SubProduction
    {
        public int SubProductionId { get; set; }
        public int SubServiceOrderId { get; set; }
        public Nullable<int> SubContractId { get; set; }
        public Nullable<int> TrNo { get; set; }
        public Nullable<System.DateTime> TrDate { get; set; }
        public string DescA { get; set; }
        public string DescE { get; set; }
        public Nullable<int> SubContractorID { get; set; }
        public Nullable<int> ProjectID { get; set; }
        public Nullable<int> ProjectPhaseId { get; set; }
        public Nullable<decimal> TotalAmount { get; set; }
        public Nullable<System.DateTime> StartDate { get; set; }
        public Nullable<System.DateTime> EndDate { get; set; }
        public Nullable<int> SiteEngineerId { get; set; }
        public Nullable<int> Status { get; set; }
        public string Remarks { get; set; }
        public Nullable<int> BraCode { get; set; }
        public Nullable<int> CompCode { get; set; }
        public string CreatedBy { get; set; }
        public Nullable<System.DateTime> CreatedAt { get; set; }
        public string UpdatedBy { get; set; }
        public Nullable<System.DateTime> UpdatedAt { get; set; }
        public Nullable<int> IsApproved { get; set; }
        public Nullable<decimal> OrgAmount { get; set; }
        public Nullable<decimal> Deduction { get; set; }
        public Nullable<decimal> Downpayment { get; set; }
        public Nullable<decimal> Warranly { get; set; }
        public Nullable<decimal> VatAmount { get; set; }
        public Nullable<decimal> VatPrc { get; set; }
        public Nullable<bool> IsFinal { get; set; }
    }
}
