using PMS.ApiService.Tools;
using PMS.ApiService.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Newtonsoft.Json.Linq;

namespace PMS.ApiService.Controllers.Engineer
{
    public class P_TR_EngExpensesEntryDetailController : BaseController, IBaseController
    {
        [HttpGet]
        public object SelectEntity(string SqlStatement)
        {
            var result = this.Get<P_D_Equipment>(SqlStatement);
            return result.ToList();
        }
        public ResponseResult DeleteEntity(JObject data)
        {
            throw new NotImplementedException();
        }

        public ResponseResult InsertCollection(JObject data)
        {
            throw new NotImplementedException();
        }

        public ResponseResult InsertEntity(JObject data)
        {
            throw new NotImplementedException();
        }

        public ResponseResult Process(ActionTypes actionType, JObject data)
        {
            throw new NotImplementedException();
        }
        public ResponseResult UpdateEntity(JObject data)
        {
            throw new NotImplementedException();
        }

        public ResponseResult Validation(ActionTypes actionType, JObject data)
        {
            throw new NotImplementedException();
        }
    }
}
