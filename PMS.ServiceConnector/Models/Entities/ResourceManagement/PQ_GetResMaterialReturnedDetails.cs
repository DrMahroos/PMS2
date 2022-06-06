using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PMS.ServiceConnector.Models.Entities
{
    public class PQ_GetResMaterialReturnedDetails
    {
        public int RequestMaterialDetailId { get; set; }
        public int ReturnMaterialId { get; set; }
        public Nullable<int> ItemId { get; set; }
        public Nullable<decimal> NetIssuedQty { get; set; }
        public Nullable<decimal> ReturndQty { get; set; }
        public Nullable<decimal> UnitCost { get; set; }
        public string itm_ItemCode { get; set; }
        public string itm_DescA { get; set; }
        public string itm_DescL { get; set; }
        public string uom_UomCode { get; set; }
        public string uom_DescA { get; set; }
        public string uom_DescE { get; set; }
    }
}
