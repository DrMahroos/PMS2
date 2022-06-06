using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace PMS.ApiService.Models
{
    public class ResponseResult
    {
        public string ResponseMessage { get; set; }
        public object ResponseData { get; set; }
        public bool ResponseState { get; set; }
    }
} 