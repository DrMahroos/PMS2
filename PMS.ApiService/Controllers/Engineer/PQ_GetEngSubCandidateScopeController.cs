using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Newtonsoft.Json.Linq;
using PMS.ApiService.Models;
using PMS.ApiService.Tools;

namespace PMS.ApiService.Controllers.Engineer
{
    public class PQ_GetEngSubCandidateScopeController : BaseController
    {
        [HttpGet]
        public object SelectEntity(string SqlStatement)
        {
            var result = this.Get<PQ_GetEngSubCandidateScope>(SqlStatement);
            return result.ToList();
        }
    }
}
