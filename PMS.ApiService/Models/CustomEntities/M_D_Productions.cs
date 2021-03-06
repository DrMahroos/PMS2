using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace PMS.ApiService.Models.CustomEntities
{
    public class M_D_Productions
    {
        public SessionRecord sessionRecord { get; set; }
        public P_Tr_EngProduction P_Tr_EngProduction { get; set; }
        public List<P_TR_EngProductionActiv> P_TR_EngProductionActiv { get; set; }
        public List<P_TR_EngProductionEquip> P_TR_EngProductionEquip { get; set; }
        public List<P_TR_EngProductionLabour> P_TR_EngProductionLabour { get; set; }
    }
}