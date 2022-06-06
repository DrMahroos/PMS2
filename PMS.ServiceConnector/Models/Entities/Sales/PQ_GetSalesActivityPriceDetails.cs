using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PMS.ServiceConnector.Models.Entities
{
    public class PQ_GetSalesActivityPriceDetails
    {
        public int ActivityPriceDetailId { get; set; }
        public int ActivityPriceId { get; set; }
        public Nullable<int> D_ActivityPriceId { get; set; }
        public int ActivityID { get; set; }
        public Nullable<decimal> OldPrice { get; set; }
        public Nullable<decimal> NewPrice { get; set; }
        public Nullable<decimal> MatCost { get; set; }
        public Nullable<decimal> LaborCost { get; set; }
        public Nullable<decimal> EquipCost { get; set; }
        public Nullable<decimal> POHCost { get; set; }
        public Nullable<decimal> OHCost { get; set; }
        public Nullable<decimal> Profit { get; set; }
        public Nullable<decimal> Calc_TotalCost { get; set; }
        public string D_ActivityCode { get; set; }
        public string D_ActName_ar { get; set; }
        public string D_ActName_en { get; set; }
    }
}
