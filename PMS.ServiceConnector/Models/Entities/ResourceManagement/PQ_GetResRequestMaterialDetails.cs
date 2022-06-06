using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PMS.ServiceConnector.Models.Entities
{
    public class PQ_GetResRequestMaterialDetails
    {
        public int RequestMaterialDetailId { get; set; }
        public Nullable<int> RequestMaterialId { get; set; }
        public Nullable<int> ItemId { get; set; }
        public Nullable<decimal> SchedQty { get; set; }
        public Nullable<decimal> ReqBeforeQty { get; set; }
        public Nullable<decimal> RequiredQty { get; set; }
        public Nullable<decimal> ReqQty { get; set; }
        public Nullable<decimal> IssuedQty { get; set; }
        public Nullable<decimal> ReturnQty { get; set; }
        public string Remarks { get; set; }
        public Nullable<decimal> BalanceQty { get; set; }
        public string itm_ItemCode { get; set; }
        public string itm_DescA { get; set; }
        public string itm_DescL { get; set; }
        public string Uom_UomCode { get; set; }
        public string Uom_DescA { get; set; }
        public string Uom_DescE { get; set; }
    }
}
