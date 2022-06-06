using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using PMS.ApiService.Tools;
using PMS.ApiService.Models;

namespace PMS.ApiService.Controllers.Engineer
{
    public class PQ_GetEngExpensesController : BaseController
    {
        [HttpGet]
        public object SelectEntity(string SqlStatement)
        {
            var result = this.Get<PQ_GetEngExpenses>(SqlStatement);
            return result.ToList();
        }

    }
}
