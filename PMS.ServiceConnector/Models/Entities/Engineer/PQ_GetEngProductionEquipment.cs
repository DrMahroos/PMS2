using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PMS.ServiceConnector.Models.Entities
{
    public class PQ_GetEngProductionEquipment
    {
        public int ProductionequipId { get; set; }
        public Nullable<int> ProductionId { get; set; }
        public Nullable<decimal> WorkHours { get; set; }
        public Nullable<decimal> UnProdHours { get; set; }
        public Nullable<decimal> HourCost { get; set; }
        public Nullable<int> EquipmentID { get; set; }
        public string Class_Code { get; set; }
        public string Class_DescA { get; set; }
        public string Class_DescE { get; set; }
        public string Equip_Code { get; set; }
        public string Equip_DescA { get; set; }
        public string Equip_DescE { get; set; }
        public Nullable<decimal> EstHours { get; set; }
    }
}
