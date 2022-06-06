using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using PMS.ServiceConnector.Models;

namespace PMS.WebUI.Models.CustomModels
{
    public class M_D_SubCandidate
    {
        public P_D_SubCandidate P_subCandidate { get; set; }
        public List<P_D_SubCandidateScope> P_D_SubCandidateScope { get; set; }

    }
}