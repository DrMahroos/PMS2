using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PMS.ServiceConnector.Models.Entities
{
    public class PPrc_Res_MaterialRequired_Result
    {
        public string ItemCode { get; set; }
        public string DescA { get; set; }
        public string DescL { get; set; }
        public Nullable<decimal> NetReqQty { get; set; }
        public Nullable<decimal> ItemCost { get; set; }
        public decimal NetIssQty { get; set; }
        public decimal NetIssCost { get; set; }
        public Nullable<decimal> RemainQty { get; set; }
    }
}
