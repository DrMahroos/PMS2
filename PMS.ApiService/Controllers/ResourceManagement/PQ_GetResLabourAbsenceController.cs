using PMS.ApiService.Tools;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Newtonsoft.Json.Linq;
using PMS.ApiService.Models;
using PMS.ApiService.Models.CustomEntities;

namespace PMS.ApiService.Controllers.ResourceManagement
{
    public class PQ_GetResLabourAbsenceController : BaseController
    {
        [HttpGet]
        public object SelectEntity(string SqlStatement)
        {
            var result = this.Get<PQ_GetResLabourAbsence>(SqlStatement);
            return result.ToList();
        }
    }
}
