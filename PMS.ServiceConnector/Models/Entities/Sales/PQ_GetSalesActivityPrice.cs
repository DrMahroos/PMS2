using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PMS.ServiceConnector.Models.Entities
{
    public class PQ_GetSalesActivityPrice
    {
        public int ActivityPriceId { get; set; }
        public Nullable<int> TrNo { get; set; }
        public Nullable<System.DateTime> TrDate { get; set; }
        public string FromActivityCode { get; set; }
        public string ToActivityCode { get; set; }
        public Nullable<int> ParentActivityID { get; set; }
        public Nullable<bool> Status { get; set; }
        public string Remarks { get; set; }
        public Nullable<int> CompCode { get; set; }
        public string CreatedBy { get; set; }
        public Nullable<System.DateTime> CreatedAt { get; set; }
        public string UpdatedBy { get; set; }
        public Nullable<System.DateTime> UpdatedAt { get; set; }
        public string M_ActivityCode { get; set; }
        public string M_ActName_ar { get; set; }
        public string M_ActName_en { get; set; }
    }
}
