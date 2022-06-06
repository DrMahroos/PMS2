using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace PMS.ApiService.Models.CustomEntities
{
    public class M_D_ServiceOrder
    {
        public SessionRecord sessionRecord { get; set; }
        public P_TR_SubServiceOrder P_TR_SubServiceOrder { get; set; }
        public List<P_TR_SubServiceOrderActivity> P_TR_SubServiceOrderActivity { get; set; }
    }
}