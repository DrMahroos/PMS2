using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using PMS.ApiService.Models;
using PMS.ApiService.Tools;

namespace PMS.ApiService.Controllers.Engineer
{
    public class PQ_GetEngSubContractorScopeController : BaseController
    {
        [HttpGet]
        public object SelectEntity(string SqlStatement)
        {
            var result = this.Get<PQ_GetEngSubContractorScope>(SqlStatement);
            return result.ToList();
        }

    }
}
