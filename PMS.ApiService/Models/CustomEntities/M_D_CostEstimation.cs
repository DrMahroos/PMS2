using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace PMS.ApiService.Models.CustomEntities
{
    public class M_D_CostEstimation
    {
        public P_TR_SalesOffer P_TR_SalesOffer { get; set; }
        public List<P_Tr_SalesOfferStageItem> P_Tr_SalesOfferStageItem { get; set; }
        public List<P_Tr_SalesOfferStageItemActivity> P_Tr_SalesOfferStageItemActivity { get; set; }
    }
}