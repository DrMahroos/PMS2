using PMS.ServiceConnector.Models;
using PMS.WebUI.Tools;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace System.Web.Mvc
{
    public class Shared : Controller
    {
        static StaticTools tool = new StaticTools();
        public static JsonResult JsonObject(object obj)
        {
            var result = tool.JsonObject(obj);
            return result; 
        }


        public static string AppSettings(string key)
        {
            RestClient rc = new RestClient();
            string result = rc.Get<string>("SystemTools", "GetAppSettings", "Key=" + key);
            return result;
        }
    }
}