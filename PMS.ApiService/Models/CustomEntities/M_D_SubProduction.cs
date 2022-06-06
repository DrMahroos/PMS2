using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace PMS.ApiService.Models.CustomEntities
{
    public class M_D_SubProduction
    {
        public SessionRecord sessionRecord { get; set; }
        public P_TR_SubProduction P_TR_SubProduction { get; set; }
        public List<P_TR_SubProductionActivity> P_TR_SubProductionActivity { get; set; }
      
    }
}