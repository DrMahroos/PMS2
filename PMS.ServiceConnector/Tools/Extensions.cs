using PMS.ServiceConnector.Models;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;

namespace PMS.ServiceConnector.Tools
{
    public static class Extensions
    {
        public static string ToJsonString(this object obj)
        {
            JsonSerializerSettings settings = new JsonSerializerSettings();
            settings.ReferenceLoopHandling = ReferenceLoopHandling.Ignore;
            var result = JsonConvert.SerializeObject(obj, Formatting.Indented, settings);
            return result;
        }

        public static T ToJsonObject<T>(this string obj)
        {
            JsonSerializerSettings settings = new JsonSerializerSettings();
            settings.ReferenceLoopHandling = ReferenceLoopHandling.Ignore;
            settings.NullValueHandling = NullValueHandling.Ignore;
            var result = JsonConvert.DeserializeObject<T>(obj);
            return result;
        }



    }
}
