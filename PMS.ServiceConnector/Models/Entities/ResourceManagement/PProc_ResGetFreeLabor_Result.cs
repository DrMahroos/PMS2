using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PMS.ServiceConnector.Models.Entities
{
    public class PProc_ResGetFreeLabor_Result
    {
        public int LaborID { get; set; }
        public Nullable<System.DateTime> FreeDate { get; set; }
        public Nullable<int> LaborClassId { get; set; }
        public Nullable<int> LaborCategoryId { get; set; }
        public string LaborCode { get; set; }
        public string DescA { get; set; }
        public string DescE { get; set; }
        public Nullable<bool> IsActive { get; set; }
        public Nullable<int> BraCode { get; set; }
        public Nullable<int> CompCode { get; set; }
        public string ClassCode { get; set; }
        public string class_descA { get; set; }
        public string Class_DescE { get; set; }
        public string CategCode { get; set; }
        public string Cat_descA { get; set; }
        public string Cat_DescE { get; set; }
        public Nullable<decimal> HourCost { get; set; }
        public Nullable<System.DateTime> BusyDate { get; set; }
    }
}
