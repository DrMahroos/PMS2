using System;
using System.Collections.Generic;
namespace PMS.ServiceConnector.Models
{
    public partial class PQ_GetEngSubContractorScope
    {
        public int SubContractorScopeId { get; set; }
        public Nullable<int> SubContractorID { get; set; }
        public Nullable<int> ScopeId { get; set; }
        public Nullable<System.DateTime> ApplayDate { get; set; }
        public Nullable<bool> IsApproved { get; set; }
        public Nullable<System.DateTime> ApprovalDate { get; set; }
        public Nullable<decimal> ContractLimit { get; set; }
        public string Remarks { get; set; }
        public string ScopeCode { get; set; }
        public string DescA { get; set; }
        public string DescE { get; set; }
    }
}
