using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PMS.ServiceConnector.Models
{
    public class ItemUnitsModel
    {
        public string UnitDescA { get; set; }
        public string UnitDescE { get; set; }
        public int UnitID { get; set; }

        public string UnitGroupDescA { get; set; }
        public string UnitGroupDescE { get; set; }
        public int UnitGroupID { get; set; }

        public int UnitGrpUom { get; set; }
        public decimal? Rate { get; set; }
        public bool? IsSales { get; set; }
        public bool? IsStock { get; set; }
        public bool? IsPurchase { get; set; }

        public int? DefaultUnitID { get; set; }
    }
}
