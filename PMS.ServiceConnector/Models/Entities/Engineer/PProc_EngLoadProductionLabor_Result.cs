using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PMS.ServiceConnector.Models.Entities.Engineer
{
    public class PProc_EngLoadProductionLabor_Result
    {
        public Nullable<int> ProductionLaborId { get; set; }
        public Nullable<int> ProductionId { get; set; }
        public Nullable<int> LaborID { get; set; }
        public Nullable<decimal> WorkHours { get; set; }
        public int UnProdHours { get; set; }
        public Nullable<decimal> HourCost { get; set; }
        public string Lab_Code { get; set; }
        public string Lab_DescA { get; set; }
        public string Lab_DescE { get; set; }
        public string Class_Code { get; set; }
        public string Class_DescA { get; set; }
        public string Class_DescE { get; set; }
        public Nullable<decimal> EstHours { get; set; }
    }
}
