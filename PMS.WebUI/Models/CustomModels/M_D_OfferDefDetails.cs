using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using PMS.ServiceConnector.Models.Entities;
using PMS.ServiceConnector.Models;

namespace PMS.WebUI.Models.CustomModels
{
    public class M_D_OfferDefDetails
    {
        public P_TR_SalesOffer P_TR_SalesOffer { get; set; }
        public List<P_Tr_SalesOfferStage> P_Tr_SalesOfferStage { get; set; }
        public List<P_TR_SalesOfferResponsibility> P_TR_SalesOfferResponsibility { get; set; }
        public List<P_Tr_SalesOfferPayment> P_Tr_SalesOfferPayment { get; set; }
        public List<P_Tr_SalesOfferBilling> P_Tr_SalesOfferBilling { get; set; }
    }

    public class M_D_OfferDefDetailsView
    {
        public IEnumerable<PQ_GetSlsOfferStage> PQ_GetSlsOfferStage { get; set; }
        public IEnumerable<PQ_GetSlsOfferResponsibility> PQ_GetSlsOfferResponsibility { get; set; }
        public IEnumerable<PQ_GetSlsOfferResponsibility> PQ_GetSlsOfferResponsibility2 { get; set; }
        public IEnumerable<PQ_GetSlsOfferPayment> PQ_GetSlsOfferPayment { get; set; }
    }
}