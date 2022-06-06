using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace PMS.ApiService.Models.CustomEntities
{
    public class M_D_Activites
    {
        public P_D_Activity P_D_Activity { get; set; }
        public List<P_D_ActivityIMaterial> P_D_ActivityIMaterial { get; set; }
        public List<P_D_ActivityLaborClass> P_D_ActivityLaborClass { get; set; }
        public List<P_D_ActivityEquipClass> P_D_ActivityEquipClass { get; set; }
    }
}