using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using PMS.ServiceConnector.Models;

namespace PMS.WebUI.Models.CustomModels
{
    public class M_D_SubContract
    {
        public P_TR_SubContract P_TR_SubContract { get; set; }
        public List<P_TR_SubContractActivity> P_TR_SubContractActivity { get; set; }
    }
}