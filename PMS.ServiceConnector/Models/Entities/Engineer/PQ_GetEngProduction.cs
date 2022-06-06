using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PMS.ServiceConnector.Models.Entities
{
    public class PQ_GetEngProduction
    {
        public int ProductionId { get; set; }
        public Nullable<int> ScheduleId { get; set; }
        public Nullable<int> TrNo { get; set; }
        public Nullable<System.DateTime> TrDate { get; set; }
        public Nullable<int> ProjectPhaseId { get; set; }
        public Nullable<int> ProjectID { get; set; }
        public Nullable<System.DateTime> StartDateTime { get; set; }
        public Nullable<System.DateTime> EndDateTime { get; set; }
        public Nullable<int> CalenderId { get; set; }
        public Nullable<decimal> WorkHours { get; set; }
        public string WorkDescr { get; set; }
        public Nullable<int> UnProdReasonId { get; set; }
        public Nullable<decimal> TotalunProdHours { get; set; }
        public Nullable<int> Status { get; set; }
        public Nullable<bool> IsCloseScheduel { get; set; }
        public string Remarks { get; set; }
        public Nullable<int> BraCode { get; set; }
        public Nullable<int> CompCode { get; set; }
        public string CreatedBy { get; set; }
        public Nullable<System.DateTime> CreatedAt { get; set; }
        public string UpdatedBy { get; set; }
        public Nullable<System.DateTime> UpdatedAt { get; set; }
        public string Unp_ReasonCode { get; set; }
        public string Unp_DescA { get; set; }
        public string Unp_DescE { get; set; }
        public string Proj_Code { get; set; }
        public string Proj_DescA { get; set; }
        public string Proj_DescE { get; set; }
        public string Phase_Code { get; set; }
        public string Phase_DescA { get; set; }
        public string Phase_DescE { get; set; }
        public Nullable<int> Sc_Status { get; set; }
    }
}
