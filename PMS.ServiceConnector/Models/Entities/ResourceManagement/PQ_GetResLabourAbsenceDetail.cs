using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PMS.ServiceConnector.Models
{
    public partial class PQ_GetResLabourAbsenceDetail
    {
        public int AbsenceLabourID { get; set; }
        public Nullable<int> AbsenceID { get; set; }
        public Nullable<int> LaborID { get; set; }
        public Nullable<int> LaborAbsenceTypeID { get; set; }
        public Nullable<System.DateTime> StartDate { get; set; }
        public Nullable<bool> IsAbsence { get; set; }
        public Nullable<decimal> AbsenceDays { get; set; }
        public Nullable<decimal> LateHours { get; set; }
        public Nullable<decimal> LateHourCost { get; set; }
        public Nullable<decimal> AbsDayCost { get; set; }
        public string Remarks { get; set; }
        public string Labor_Code { get; set; }
        public string Labor_DescA { get; set; }
        public string Labor_DescE { get; set; }
        public string AbsenceType_Code { get; set; }
        public string AbsenceType_DescA { get; set; }
        public string AbsenceType_DescE { get; set; }
    }
}
