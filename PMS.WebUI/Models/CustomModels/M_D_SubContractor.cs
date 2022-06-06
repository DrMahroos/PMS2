using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using PMS.ServiceConnector.Models;

namespace PMS.WebUI.Models.CustomModels
{
    public class M_D_SubContractor
    {
        public P_D_SubContractor P_D_SubContractor { get; set; }
        public List<P_D_SubContractorScope> P_D_SubContractorScope { get; set; }
    }
}