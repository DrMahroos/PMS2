using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace PMS.ApiService.Models.CustomEntities
{
    public class M_D_SubContract
    {
        public SessionRecord sessionRecord { get; set; }
        public P_TR_SubContract P_TR_SubContract { get; set; }
        public List<P_TR_SubContractActivity> P_TR_SubContractActivity { get; set; }
    }
}