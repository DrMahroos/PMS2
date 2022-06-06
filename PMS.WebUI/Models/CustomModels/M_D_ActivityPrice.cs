using PMS.ServiceConnector.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace PMS.WebUI.Models.CustomModels
{
    public class M_D_ActivityPrice
    {
        public P_Tr_SalesActivtyPrice P_Tr_SalesActivtyPrice { get; set; }
        public IEnumerable<P_Tr_SalesActivtyPriceDetail> P_Tr_SalesActivtyPriceDetail { get; set; }
    }
}