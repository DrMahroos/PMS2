using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace PMS.ApiService.Models.CustomEntities
{
    public class M_D_SalesCustomer
    {
        public SessionRecord sessionRecord { get; set; }
        public P_D_SalesCustomer P_D_SalesCustomer { get; set; }
        public List<P_D_SalesCustomerDocModel> P_D_SalesCustomerDoc { get; set; }
       
    }
    
}