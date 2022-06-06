using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
namespace PMS.ServiceConnector.Models.Entities.Engineer
{
 
    public partial class PProc_EngVariationLoadItem_Result
    {
        public int ProjectPhaseItemId { get; set; }
        public Nullable<int> ProjectPhaseId { get; set; }
        public Nullable<int> ProjectID { get; set; }
        public Nullable<int> OfferItemId { get; set; }
        public string LineCode { get; set; }
        public Nullable<int> ItemID { get; set; }
        public Nullable<decimal> ContrQty { get; set; }
        public Nullable<decimal> ItemQty { get; set; }
        public Nullable<decimal> ProdQty { get; set; }
        public Nullable<decimal> BilledQty { get; set; }
        public Nullable<decimal> UnitPrice { get; set; }
        public Nullable<decimal> StdUnitPrice { get; set; }
        public Nullable<bool> IsOfferItem { get; set; }
        public Nullable<byte> ProductionType { get; set; }
        public string SlsITm_ItemCode { get; set; }
        public string SlsITm_DescA { get; set; }
        public string SlsITm_DescE { get; set; }
        public Nullable<int> ScopeID { get; set; }
        public string UomCode { get; set; }
        public Nullable<decimal> ProgQty { get; set; }
    }

}
