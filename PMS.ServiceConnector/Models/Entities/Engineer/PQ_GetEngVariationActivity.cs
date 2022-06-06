using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PMS.ServiceConnector.Models
{
    public class PQ_GetEngVariationActivity
    {
        public int VariationActivId { get; set; }
        public Nullable<int> ProjectPhaseId { get; set; }
        public Nullable<int> VariationItemId { get; set; }
        public Nullable<int> ProjectPhaseItemActivId { get; set; }
        public Nullable<int> ActivityID { get; set; }
        public Nullable<bool> IsNew { get; set; }
        public Nullable<decimal> Old_ActivQty { get; set; }
        public Nullable<decimal> ActivQty { get; set; }
        public Nullable<decimal> UnitPrice { get; set; }
        public Nullable<decimal> StdUnitPrice { get; set; }
        public Nullable<decimal> OldProductionPrc { get; set; }
        public Nullable<decimal> ProductionPrc { get; set; }
        public string Remarks { get; set; }
        public Nullable<decimal> EstimatedMaterial { get; set; }
        public Nullable<decimal> EstimatedLabor { get; set; }
        public Nullable<decimal> EstimatedEquip { get; set; }
        public Nullable<decimal> EstimatedProfit { get; set; }
        public string Act_ActivityCode { get; set; }
        public string Act_DescA { get; set; }
        public string Act_DescE { get; set; }
        public string uom_UomCode { get; set; }
        public string uom_DescA { get; set; }
        public string uom_DescE { get; set; }
        public Nullable<int> VariationId { get; set; }
        public Nullable<decimal> TotProdQty { get; set; }
        public Nullable<decimal> UnderProdQty { get; set; }
        public Nullable<decimal> OldEffItemQty { get; set; }
        public Nullable<decimal> NewEffItemQty { get; set; }
    }
}
