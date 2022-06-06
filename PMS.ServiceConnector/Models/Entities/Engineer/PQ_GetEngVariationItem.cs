using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PMS.ServiceConnector.Models
{
    public class PQ_GetEngVariationItem
    {
        public int VariationItemId { get; set; }
        public Nullable<int> VariationId { get; set; }
        public Nullable<bool> IsNew { get; set; }
        public Nullable<int> ProjectPhaseItemId { get; set; }
        public Nullable<int> ItemID { get; set; }
        public Nullable<decimal> UnitPrice { get; set; }
        public Nullable<decimal> OrgItemQty { get; set; }
        public Nullable<decimal> ItemQty { get; set; }
        public string LineCode { get; set; }
        public string DescA { get; set; }
        public string DescE { get; set; }
        public string Remarks { get; set; }
        public Nullable<decimal> EstimatedMaterial { get; set; }
        public Nullable<decimal> EstimatedLabor { get; set; }
        public Nullable<decimal> EstimatedEquip { get; set; }
        public Nullable<decimal> EstimatedProfit { get; set; }
        public string itm_ItemCode { get; set; }
        public string itm_DescA { get; set; }
        public string itm_DescL { get; set; }
        public string itm_TechDescA { get; set; }
        public string itm_TechDescL { get; set; }
        public string uom_UomCode { get; set; }
        public string uom_DescA { get; set; }
        public string uom_DescE { get; set; }
        public Nullable<decimal> BilledQty { get; set; }
        public Nullable<decimal> ProdQty { get; set; }
        public Nullable<decimal> ProgressQty { get; set; }
    }
}
