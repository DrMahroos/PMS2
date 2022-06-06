using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PMS.ServiceConnector.Models.Entities
{
    public class P_TR_ResMaterialReturn
    {
        public int ReturnMaterialId { get; set; }
        public Nullable<int> RequestMaterialId { get; set; }
        public Nullable<int> ScheduleId { get; set; }
        public Nullable<int> TrNo { get; set; }
        public Nullable<System.DateTime> TrDate { get; set; }
        public Nullable<int> ProjectID { get; set; }
        public Nullable<int> ProjectPhaseID { get; set; }
        public Nullable<int> Status { get; set; }
        public string Remarks { get; set; }
        public Nullable<int> BraCode { get; set; }
        public Nullable<int> CompCode { get; set; }
        public string CreatedBy { get; set; }
        public Nullable<System.DateTime> CreatedAt { get; set; }
        public string UpdatedBy { get; set; }
        public Nullable<System.DateTime> UpdatedAt { get; set; }
        public Nullable<int> StoreID { get; set; }
        public Nullable<int> SubServiceOrderId { get; set; }
    }
}
