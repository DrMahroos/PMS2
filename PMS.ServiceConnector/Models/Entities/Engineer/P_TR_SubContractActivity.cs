namespace PMS.ServiceConnector.Models
{
    using System;
    using System.Collections.Generic;

    public partial class P_TR_SubContractActivity
    {
        public int SubContractActivityId { get; set; }
        public int SubContractId { get; set; }
        public Nullable<int> ActivityId { get; set; }
        public Nullable<int> ProjectPhaseItemActivId { get; set; }
        public Nullable<decimal> ContractQty { get; set; }
        public Nullable<decimal> SOQty { get; set; }
        public Nullable<decimal> ProdQty { get; set; }
        public Nullable<decimal> UnitPrice { get; set; }
        public string Remarks { get; set; }
        public Nullable<decimal> ProjQty { get; set; }
    }
}
