using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PMS.ServiceConnector.Models.Entities.Sales
{
    public partial class PProc_Sales_Production_Result
    {
        public int ProductionDetailId { get; set; }
        public int ProductionId { get; set; }
        public Nullable<long> serial { get; set; }
        public int ItemID { get; set; }
        public int ProjectPhaseItemId { get; set; }
        public Nullable<decimal> ItemQty { get; set; }
        public Nullable<decimal> PrevProdQty { get; set; }
        public Nullable<decimal> ProdQty { get; set; }
        public Nullable<decimal> UnitPrice { get; set; }
        public string Remarks { get; set; }
        public int UnBilledQty { get; set; }
        public int RejectedQty { get; set; }
        public int BilledQty { get; set; }
        public Nullable<decimal> TotalProdQty { get; set; }
        public Nullable<decimal> Total { get; set; }
        public string Itm_ItemCode { get; set; }
        public string Itm_DescA { get; set; }
        public string Itm_DescE { get; set; }
        public string LineCode { get; set; }
    }
}
