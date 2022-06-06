using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PMS.ServiceConnector.Models.Entities
{
    public class PQ_GetResRequestMaterial
    {
        public int RequestMaterialId { get; set; }
        public Nullable<int> ScheduleId { get; set; }
        public Nullable<int> SubServiceOrderId { get; set; }
        public Nullable<int> TrNo { get; set; }
        public Nullable<System.DateTime> TrDate { get; set; }
        public Nullable<int> Status { get; set; }
        public string Remarks { get; set; }
        public Nullable<int> BraCode { get; set; }
        public Nullable<int> CompCode { get; set; }
        public string CreatedBy { get; set; }
        public Nullable<System.DateTime> CreatedAt { get; set; }
        public string UpdatedBy { get; set; }
        public Nullable<System.DateTime> UpdatedAt { get; set; }
        public Nullable<int> So_TrNo { get; set; }
        public string So_DescA { get; set; }
        public string So_DescE { get; set; }
        public string WorkDescr { get; set; }
        public string Prj_ProjectCode { get; set; }
        public string Prj_DescE { get; set; }
        public string Prj_DescA { get; set; }
        public string Phase_ProjectPhaseCode { get; set; }
        public string Phase_DescA { get; set; }
        public string Phase_DescE { get; set; }
        public string Eng_EngCode { get; set; }
        public string Eng_DescA { get; set; }
        public string Eng_DescE { get; set; }
        public string RequestedBy { get; set; }
        public string ApprovedBy { get; set; }
        public Nullable<int> SchduleTrNo { get; set; }
    }
}
