using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PMS.ServiceConnector.Models.Entities
{
    public class PQ_Sales_SrchOfferItem
    {
        public Nullable<int> StageCode { get; set; }
        public string ItemCode { get; set; }
        public string DescA { get; set; }
        public string DescE { get; set; }
        public int OfferItemId { get; set; }
        public Nullable<int> OfferID { get; set; }
    }
}
