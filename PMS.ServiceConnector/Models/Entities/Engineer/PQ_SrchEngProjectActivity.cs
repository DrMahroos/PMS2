using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PMS.ServiceConnector.Models.Entities
{
    public class PQ_SrchEngProjectActivity
    {
        public string Itm_ItemCode { get; set; }
        public string Itm_DescA { get; set; }
        public string Itm_DescE { get; set; }
        public string Act_ActivityCode { get; set; }
        public string Act_DescA { get; set; }
        public string Act_DescE { get; set; }
        public Nullable<int> ProjectPhaseId { get; set; }
        public Nullable<int> ProjectID { get; set; }
        public Nullable<int> ProjectPhaseItemId { get; set; }
        public int ProjectPhaseItemActivId { get; set; }
        public Nullable<int> ActivityID { get; set; }
        public int ItemID { get; set; }
        public Nullable<int> Serial { get; set; }
        public Nullable<decimal> ActivQty { get; set; }
        public Nullable<decimal> TotalProdQty { get; set; }
        public Nullable<decimal> TotScedQty { get; set; }
        public Nullable<decimal> RemainQty { get; set; }
        public Nullable<int> UomID { get; set; }
        public string uom_Code { get; set; }
        public string uom_DescA { get; set; }
        public string uom_DescE { get; set; }
        public string LineCode { get; set; }
        public Nullable<decimal> SchedQty { get; set; }
        public Nullable<decimal> SCon_Qty { get; set; }
        public Nullable<decimal> AvaL_Qty { get; set; }
    }
}
