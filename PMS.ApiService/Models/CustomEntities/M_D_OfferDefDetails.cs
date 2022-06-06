using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace PMS.ApiService.Models.CustomEntities
{
    public class M_D_OfferDefDetails
    {
        public P_TR_SalesOffer P_TR_SalesOffer { get; set; }
        public List<P_Tr_SalesOfferStage> P_Tr_SalesOfferStage { get; set; }//PQ_GetSlsOfferStage
        public List<P_TR_SalesOfferResponsibility> P_TR_SalesOfferResponsibility { get; set; }//PQ_GetSlsOfferResponsibility
        public List<P_Tr_SalesOfferPayment> P_Tr_SalesOfferPayment { get; set; }//PQ_GetSlsOfferPayment
        public List<P_Tr_SalesOfferBilling> P_Tr_SalesOfferBilling { get; set; }//PQ_GetSlsOfferBilling
    }
}