using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PMS.ServiceConnector.Models
{
    using System;
    using System.Collections.Generic;

    public partial class P_TR_SubContract
    {
        public int SubContractId { get; set; }
        public Nullable<int> TrNo { get; set; }
        public Nullable<System.DateTime> TrDate { get; set; }
        public string DescA { get; set; }
        public string DescE { get; set; }
        public Nullable<int> SubContractorID { get; set; }
        public Nullable<int> ScopeID { get; set; }
        public Nullable<int> ProjectID { get; set; }
        public Nullable<int> ProjectPhaseId { get; set; }
        public Nullable<decimal> TotalAmount { get; set; }
        public Nullable<bool> ISMaterialIncluded { get; set; }
        public Nullable<bool> ISFlexQty { get; set; }
        public Nullable<bool> IsBlank { get; set; }
        public Nullable<System.DateTime> StartDate { get; set; }
        public Nullable<System.DateTime> EndDate { get; set; }
        public Nullable<int> Status { get; set; }
        public string Terms { get; set; }
        public string Technical { get; set; }
        public string Penalty { get; set; }
        public string MaterialRemarks { get; set; }
        public string EquipmentRemarks { get; set; }
        public string LaborRemarks { get; set; }
        public Nullable<int> Duration { get; set; }
        public Nullable<int> WarrantyPeriod { get; set; }
        public Nullable<decimal> DownpaymentPrc { get; set; }
        public Nullable<decimal> WarranlyPrc { get; set; }
        public string Remarks { get; set; }
        public Nullable<int> BraCode { get; set; }
        public Nullable<int> CompCode { get; set; }
        public string CreatedBy { get; set; }
        public Nullable<System.DateTime> CreatedAt { get; set; }
        public string UpdatedBy { get; set; }
        public Nullable<System.DateTime> UpdatedAt { get; set; }
        public Nullable<int> IsApproved { get; set; }
        public Nullable<int> IsClosed { get; set; }
    }
}
