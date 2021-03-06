using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PMS.ServiceConnector.Models.Entities
{
    public class PQ_SrcSchdule
    {
        public int ScheduleId { get; set; }
        public Nullable<int> TrNo { get; set; }
        public string WorkDescr { get; set; }
        public Nullable<int> ProjectID { get; set; }
        public string Prj_ProjectCode { get; set; }
        public string Prj_DescE { get; set; }
        public string Prj_DescA { get; set; }
        public Nullable<int> ProjectPhaseId { get; set; }
        public string Phase_ProjectPhaseCode { get; set; }
        public string Phase_DescA { get; set; }
        public string Phase_DescE { get; set; }
        public Nullable<int> SiteEngineerId { get; set; }
        public string Eng_EngCode { get; set; }
        public string Eng_DescA { get; set; }
        public string Eng_DescE { get; set; }
        public Nullable<int> Status { get; set; }
        public Nullable<int> BraCode { get; set; }
        public Nullable<int> CompCode { get; set; }
    }
}
