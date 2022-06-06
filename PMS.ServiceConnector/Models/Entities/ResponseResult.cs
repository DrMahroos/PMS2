using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace PMS.ServiceConnector.Models
{
    public class ResponseResult
    {
        public string ResponseMessage { get; set; }
        public string OrgFile { get; set; }
        public string NewFile { get; set; }
        public object ResponseData { get; set; }
        public bool ResponseState { get; set; }
    }
}