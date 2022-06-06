using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PMS.ServiceConnector.Models.Entities.Engineer
{
    public class PProc_EngLoadProductionActivity_Result
    {
        public Nullable<int> ProductionActivId { get; set; }
        public Nullable<int> ProductionId { get; set; }
        public Nullable<int> ScheduleId { get; set; }
        public int ScheduleActivId { get; set; }
        public Nullable<decimal> FinishQty { get; set; }
        public Nullable<decimal> ProdBeforeQty { get; set; }
        public Nullable<int> ActivityId { get; set; }
        public Nullable<int> ProjectPhaseItemActivId { get; set; }
        public Nullable<int> ItemId { get; set; }
        public string Act_Code { get; set; }
        public string Act_DescA { get; set; }
        public string Act_DescE { get; set; }
        public string Itm_Code { get; set; }
        public string Itm_DescA { get; set; }
        public string Itm_DescE { get; set; }
        public Nullable<decimal> Act_HourProduction { get; set; }
        public Nullable<decimal> ProjAct_ActivQty { get; set; }
        public Nullable<bool> ProjAct_ProductionIncluded { get; set; }
        public Nullable<decimal> ProjAct_ProductionPrc { get; set; }
        public Nullable<decimal> schAct_SchedQty { get; set; }
    }
}
