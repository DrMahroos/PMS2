using PMS.ApiService.Tools;
using PMS.ApiService.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Newtonsoft.Json.Linq;

namespace PMS.ApiService.Controllers
{
    public class GQ_UserFavoriteController : BaseController
    {
        [HttpGet]
        public object SelectEntity(string SqlStatement)
        {
            var result = this.Get<GQ_UserFavorite>(SqlStatement);
            return result.ToList();
        }
    }
}
