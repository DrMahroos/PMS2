using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PMS.ServiceConnector.Models.Entities.Definitions
{
    public partial class PQ_GetActivityEquipmentClass
    {
        public int ActivityEquipClassID { get; set; }
        public Nullable<int> ActivityID { get; set; }
        public Nullable<int> EquipClassId { get; set; }
        public Nullable<decimal> NoOfEquipments { get; set; }
        public string ClassCode { get; set; }
        public string DescA { get; set; }
        public string DescE { get; set; }
        public Nullable<decimal> HourCost { get; set; }
    }
}
