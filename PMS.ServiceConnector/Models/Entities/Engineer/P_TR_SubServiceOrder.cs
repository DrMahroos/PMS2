using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PMS.ServiceConnector.Models.Entities
{
    public class P_TR_SubServiceOrder
    {
        public int SubServiceOrderId { get; set; }
        public Nullable<int> SubContractId { get; set; }
        public Nullable<int> TrNo { get; set; }
        public Nullable<System.DateTime> TrDate { get; set; }
        public string DescA { get; set; }
        public string DescE { get; set; }
        public Nullable<int> SubContractorID { get; set; }
        public Nullable<int> ProjectID { get; set; }
        public Nullable<int> ProjectPhaseId { get; set; }
        public Nullable<int> MaterialRequestID { get; set; }
        public Nullable<decimal> TotalAmount { get; set; }
        public Nullable<System.DateTime> StartDate { get; set; }
        public Nullable<System.DateTime> EndDate { get; set; }
        public Nullable<int> SiteEngineerId { get; set; }
        public Nullable<int> Status { get; set; }
        public string Remarks { get; set; }
        public Nullable<decimal> TechnicalMark { get; set; }
        public Nullable<decimal> TimeMark { get; set; }
        public Nullable<int> BraCode { get; set; }
        public Nullable<int> CompCode { get; set; }
        public string CreatedBy { get; set; }
        public Nullable<System.DateTime> CreatedAt { get; set; }
        public string UpdatedBy { get; set; }
        public Nullable<System.DateTime> UpdatedAt { get; set; }
        public Nullable<decimal> TotalMark { get; set; }
        public Nullable<int> IsApproved { get; set; }
        public Nullable<int> IsClosed { get; set; }
    }
}
