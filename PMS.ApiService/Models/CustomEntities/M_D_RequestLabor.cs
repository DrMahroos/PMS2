using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace PMS.ApiService.Models.CustomEntities
{
    public class M_D_RequestLabor
    {
        public SessionRecord sessionRecord { get; set; }
        public P_Tr_ResRequestLabour P_Tr_ResRequestLabour { get; set; }
        public List<P_TR_EngScheduleLabor> P_TR_EngScheduleLabor { get; set; }
       
    }
}