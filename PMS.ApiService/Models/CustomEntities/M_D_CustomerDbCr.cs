using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace PMS.ApiService.Models.CustomEntities
{
    public class M_D_CustomerDbCr
    {
        public SessionRecord sessionRecord { get; set; }
        public P_TR_SalesDbCr P_TR_SalesDbCr { get; set; }
        public List<P_TR_SalesDbCrDetail> P_TR_SalesDbCrDetail { get; set; }
       
    }
}