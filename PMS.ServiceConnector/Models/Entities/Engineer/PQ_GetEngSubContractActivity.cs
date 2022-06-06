using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PMS.ServiceConnector.Models
{
    using System;
    using System.Collections.Generic;

    public partial class PQ_GetEngSubContractActivity
    {
        public int SubContractActivityId { get; set; }
        public int SubContractId { get; set; }
        public Nullable<int> ActivityId { get; set; }
        public Nullable<int> ProjectPhaseItemActivId { get; set; }
        public Nullable<decimal> ProjQty { get; set; }
        public Nullable<decimal> ContractQty { get; set; }
        public Nullable<decimal> SOQty { get; set; }
        public Nullable<decimal> ProdQty { get; set; }
        public Nullable<decimal> UnitPrice { get; set; }
        public string Remarks { get; set; }
        public string Act_Code { get; set; }
        public string Act_DescA { get; set; }
        public string Act_DescE { get; set; }
        public string Uom_Code { get; set; }
        public string Uom_DescA { get; set; }
        public string Uom_DescE { get; set; }
    }
}
