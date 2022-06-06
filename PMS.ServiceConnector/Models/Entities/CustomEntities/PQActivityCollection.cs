using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PMS.ServiceConnector.Models.Entities.CustomEntities
{
    public class PQActivityCollection
    {
        // Master
        public int ActivityID { get; set; }
        public string ActivityCode { get; set; }
        public string DescA { get; set; }
        public string DescE { get; set; }
        public Nullable<int> UomID { get; set; }
        public Nullable<decimal> HourProduction { get; set; }
        public Nullable<decimal> LaborProdRate { get; set; }
        public Nullable<decimal> UnitPrice { get; set; }
        public Nullable<int> ParentActivityID { get; set; }
        public Nullable<int> ActivityLevel { get; set; }
        public Nullable<bool> IsDetail { get; set; }
        public string Remarks { get; set; }
        public Nullable<int> CompCode { get; set; }

        // ActivityEquip
        public int ActivityEquipClassID { get; set; }
        public Nullable<int> EquipClassId { get; set; }
        public Nullable<decimal> NoOfEquipments { get; set; }

        // ActivityMaterial
        public int ActivityMaterialID { get; set; }
        public Nullable<int> ItemId { get; set; }
        public Nullable<decimal> ProdQty { get; set; }
        public Nullable<decimal> WastPrc { get; set; }
        public Nullable<decimal> WastQty { get; set; }
        public Nullable<decimal> ReqQty { get; set; }

        // ActivityLabor
        public int ActivityLaborClassID { get; set; }
        public Nullable<int> LaborClassId { get; set; }
        public Nullable<decimal> NoOfLabors { get; set; }

    }
}
