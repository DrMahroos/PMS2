﻿using PMS.ApiService.Tools;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Newtonsoft.Json.Linq;
using PMS.ApiService.Models;

namespace PMS.ApiService.Controllers
{
    public class I_Pay_VendorController : BaseController, IBaseController
    {
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

        [HttpGet]
        public object SelectEntity(string SqlStatement)
        {
            var result = this.Get<I_Pay_Vendor>(SqlStatement);
            return result.ToList();
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
