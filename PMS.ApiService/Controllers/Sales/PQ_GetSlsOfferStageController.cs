using PMS.ApiService.Models;
using PMS.ApiService.Tools;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace PMS.ApiService.Controllers.Sales
{
    public class PQ_GetSlsOfferStageController : BaseController
    {
        [HttpGet]
        public object SelectEntity(string SqlStatement)
        {
            var result = this.Get<PQ_GetSlsOfferStage>(SqlStatement);
            return result.ToList();
        }
    }
}
