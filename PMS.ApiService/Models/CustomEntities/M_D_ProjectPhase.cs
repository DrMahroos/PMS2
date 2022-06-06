using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace PMS.ApiService.Models.CustomEntities
{
    public class M_D_ProjectPhase
    {
        public SessionRecord sessionRecord { get; set; }
        public P_TR_EngProjectPhase P_Tr_EngProjectPhase { get; set; }
 
    }
}