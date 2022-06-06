using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace PMS.ApiService.Controllers.ResourceManagement
{
    public class PProc_ResGetFreeEquip_Result
    {
        public int EquimentID { get; set; }
        public Nullable<System.DateTime> FreeDate { get; set; }
        public Nullable<int> EquipClassId { get; set; }
        public string EquipCode { get; set; }
        public string DescA { get; set; }
        public string DescE { get; set; }
        public Nullable<bool> IsActive { get; set; }
        public Nullable<int> BraCode { get; set; }
        public Nullable<int> CompCode { get; set; }
        public string ClassCode { get; set; }
        public string class_descA { get; set; }
        public string Class_DescE { get; set; }
    }
}