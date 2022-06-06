using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PMS.ServiceConnector.Models.Entities
{
    public class P_TR_ResMaterialReturnDetail
    {
        public int RequestMaterialDetailId { get; set; }
        public int ReturnMaterialId { get; set; }
        public Nullable<int> ItemId { get; set; }
        public Nullable<decimal> NetIssuedQty { get; set; }
        public Nullable<decimal> ReturndQty { get; set; }
        public Nullable<decimal> UnitCost { get; set; }
    }
}
