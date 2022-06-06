using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PMS.ServiceConnector.Models.Entities.Definitions
{
    public partial class PQ_GetActivityMaterialClass
    {
        public int ActivityMaterialID { get; set; }
        public Nullable<int> ActivityID { get; set; }
        public Nullable<int> ItemID { get; set; }
        public Nullable<decimal> ProdQty { get; set; }
        public Nullable<decimal> WastPrc { get; set; }
        public Nullable<decimal> WastQty { get; set; }
        public Nullable<decimal> ReqQty { get; set; }
        public string ItemCode { get; set; }
        public string DescA { get; set; }
        public string DescL { get; set; }
        public string UomCode { get; set; }
        public string Unit_descA { get; set; }
        public string Unit_descE { get; set; }
    }
}
