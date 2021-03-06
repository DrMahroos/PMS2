using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PMS.ServiceConnector.Models.Entities
{
    public class PQ_GetSalesFillInvoiceProd
    {
        public Nullable<int> Prod_TrNo { get; set; }
        public Nullable<System.DateTime> Prod_TrDate { get; set; }
        public Nullable<int> Prod_ProjectID { get; set; }
        public Nullable<System.DateTime> Prod_FromDate { get; set; }
        public Nullable<System.DateTime> Prod_ToDate { get; set; }
        public Nullable<bool> Prod_IsFinal { get; set; }
        public string Prod_RefCode { get; set; }
        public string Prod_WorkDiscription { get; set; }
        public string Itm_ItemCode { get; set; }
        public string Itm_DescA { get; set; }
        public string Itm_DescE { get; set; }
        public Nullable<decimal> ProdQty { get; set; }
        public Nullable<decimal> UnitPrice { get; set; }
        public Nullable<decimal> total { get; set; }
        public Nullable<decimal> BilledQty { get; set; }
        public Nullable<decimal> ToBillQty { get; set; }
        public string Remarks { get; set; }
        public int Prod_ProductionId { get; set; }
        public int ProductionDetailId { get; set; }
        public Nullable<int> ProductionId { get; set; }
        public Nullable<int> ProjectPhaseItemId { get; set; }
        public Nullable<int> ItemID { get; set; }
        public string LineCode { get; set; }
    }
}
