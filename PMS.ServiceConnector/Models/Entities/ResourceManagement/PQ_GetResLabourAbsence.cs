using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PMS.ServiceConnector.Models
{
    public partial class PQ_GetResLabourAbsence
    {
        public int AbsenceID { get; set; }
        public Nullable<int> TrNo { get; set; }
        public Nullable<System.DateTime> TrDate { get; set; }
        public Nullable<int> ProjectID { get; set; }
        public Nullable<int> SiteEngineerId { get; set; }
        public Nullable<System.DateTime> FromDate { get; set; }
        public Nullable<System.DateTime> ToDate { get; set; }
        public Nullable<int> Status { get; set; }
        public string Remarks { get; set; }
        public Nullable<int> BraCode { get; set; }
        public Nullable<int> CompCode { get; set; }
        public string CreatedBy { get; set; }
        public Nullable<System.DateTime> CreatedAt { get; set; }
        public string UpdatedBy { get; set; }
        public Nullable<System.DateTime> UpdatedAt { get; set; }
        public Nullable<int> ScheduleId { get; set; }
        public string WorkDescr { get; set; }
        public Nullable<System.DateTime> StartDateTime { get; set; }
        public Nullable<System.DateTime> EndDateTime { get; set; }
        public string Prj_ProjectCode { get; set; }
        public string Prj_DescA { get; set; }
        public string Prj_DescE { get; set; }
        public string Phase_ProjectPhaseCode { get; set; }
        public string Phase_DescA { get; set; }
        public string Phase_DescE { get; set; }
        public Nullable<int> schd_TrNo { get; set; }
    }
}

