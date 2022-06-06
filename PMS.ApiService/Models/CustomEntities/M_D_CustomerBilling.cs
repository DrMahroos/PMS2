using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace PMS.ApiService.Models.CustomEntities
{
    public class M_D_CustomerBilling
    {
        public SessionRecord sessionRecord { get; set; }
        public P_TR_SalesInvoice P_TR_SalesInvoice { get; set; }
        public List<P_TR_SalesInvoiceDetail> P_TR_SalesInvoiceDetail { get; set; }
       
    }
}