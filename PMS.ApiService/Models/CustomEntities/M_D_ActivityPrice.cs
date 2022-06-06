using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace PMS.ApiService.Models.CustomEntities
{
    public class M_D_ActivityPrice
    {
        public SessionRecord sessionRecord { get; set; }
        public P_Tr_SalesActivtyPrice P_Tr_SalesActivtyPrice { get; set; }
        public List<P_Tr_SalesActivtyPriceDetail> P_Tr_SalesActivtyPriceDetail { get; set; }
       
    }
}