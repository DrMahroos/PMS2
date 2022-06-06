using PMS.ServiceConnector.Models;
using PMS.ServiceConnector.Models.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace PMS.WebUI.Models.CustomModels
{
    public class M_D_ServiceOrder
    {
        public P_TR_SubServiceOrder P_TR_SubServiceOrder { get; set; }
        public IEnumerable<P_TR_SubServiceOrderActivity> P_TR_SubServiceOrderActivity { get; set; }
    }
}