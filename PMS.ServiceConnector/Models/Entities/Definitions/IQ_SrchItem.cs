using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PMS.ServiceConnector.Models.Entities.Definitions
{
    public partial class IQ_SrchItem
    {
        public int ItemID { get; set; }
        public string ItemCode { get; set; }
        public Nullable<int> CompCode { get; set; }
        public string DescA { get; set; }
        public string DescL { get; set; }
        public Nullable<decimal> GlobalCost { get; set; }
        public string UomCode { get; set; }
        public string Unit_descA { get; set; }
        public string Unit_descE { get; set; }
        public string CatCode { get; set; }
        public string Cat_DescA { get; set; }
        public string Cat_DescE { get; set; }
    }
}
