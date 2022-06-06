using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PMS.ServiceConnector.Models.Entities
{
    public partial class PQ_GetSalesIssueProductionDetails
    {
        public int ProductionDetailId { get; set; }
        public Nullable<int> ProductionId { get; set; }
        public Nullable<int> Serial { get; set; }
        public Nullable<int> ItemID { get; set; }
        public Nullable<int> ProjectPhaseItemId { get; set; }
        public Nullable<decimal> ItemQty { get; set; }
        public Nullable<decimal> PrevProdQty { get; set; }
        public Nullable<decimal> ProdQty { get; set; }
        public Nullable<decimal> UnitPrice { get; set; }
        public Nullable<decimal> BilledQty { get; set; }
        public Nullable<decimal> RejectedQty { get; set; }
        public string Remarks { get; set; }
        public Nullable<decimal> UnBilledQty { get; set; }
        public Nullable<decimal> TotalProdQty { get; set; }
        public Nullable<decimal> Total { get; set; }
        public string Itm_ItemCode { get; set; }
        public string Itm_DescA { get; set; }
        public string Itm_DescE { get; set; }
        public string LineCode { get; set; }
    }
}
