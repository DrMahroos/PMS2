using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PMS.ServiceConnector.Models
{

        using System;
        using System.Collections.Generic;

    public partial class PQ_GetEngSubCandidateScope
    {
        public int SubCandidateScopeId { get; set; }
        public Nullable<int> CandidateID { get; set; }
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
