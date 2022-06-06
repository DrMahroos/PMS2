using PMS.ServiceConnector.Tools;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;

namespace PMS.ServiceConnector.Models
{
    public class RestClient : Tools.BaseRestClient
    {
        public RestClient()
        {
            ServiceConnectorUrl = DbEntities.ServiceUrl;
        }
        public T Get<T>(string ControllerName, string ActionName, string Parameter)
        {
            var result = httpClient.GetAsync(ServiceConnectorUrl + ControllerName + "/" + ActionName + "?" + Parameter).Result;
            var res = result.Content.ReadAsStringAsync().Result;
            var taskModels = JsonConvert.DeserializeObject<T>(res);
            return taskModels;
        }
        public T GetData<T>(string ControllerName, string ActionName)
        {
            var result = httpClient.GetAsync(ServiceConnectorUrl + ControllerName + "/" + ActionName).Result;
            var res = result.Content.ReadAsStringAsync().Result;
            var taskModels = JsonConvert.DeserializeObject<T>(res);
            return taskModels;
        }
        public T Get<T>(string ControllerName, string ActionName, Dictionary<string, string> Parameters)
        {
            string Parameter = string.Empty;
            foreach (var item in Parameters)
            {
                Parameter += "&" + item.Key + "=" + item.Value;
            }
            Parameter = Parameter.Substring(1);
            var result = httpClient.GetAsync(ServiceConnectorUrl + ControllerName + "/" + ActionName + "?" + Parameter).Result;
            var res = result.Content.ReadAsStringAsync().Result;
            var taskModels = JsonConvert.DeserializeObject<T>(res);
            return taskModels;
        }
        public T Post<T>(string ControllerName, string ActionName, object Content)
        {
            var obj = new
            {
                Entity = Content,
                Session = SessionManager.SessionRecord
            };
            var json = JsonConvert.SerializeObject(obj);
            HttpContent httpContent = new StringContent(json);
            httpContent.Headers.ContentType = new MediaTypeHeaderValue(ContentType);

            var result = httpClient.PostAsync(ServiceConnectorUrl + "/" + ControllerName + "/" + ActionName, httpContent).Result;
            var jsonResult = JsonConvert.DeserializeObject<T>(result.Content.ReadAsStringAsync().Result);
            return jsonResult;
        }

        public T Get<T>(string ActionName, string Parameter)
        {
            var result = httpClient.GetAsync(ServiceConnectorUrl + ServerTransactionsName + "/" + ActionName + "?" + Parameter).Result;
            var res = result.Content.ReadAsStringAsync().Result;
            var taskModels = JsonConvert.DeserializeObject<T>(res);
            return taskModels;
        }
        public T Get<T>(string ActionName, Dictionary<string, string> Parameters)
        {
            string Parameter = string.Empty;
            foreach (var item in Parameters)
            {
                Parameter += "&" + item.Key + "=" + item.Value;
            }
            Parameter = Parameter.Substring(1);
            var result = httpClient.GetAsync(ServiceConnectorUrl + ServerTransactionsName + "/" + ActionName + "?" + Parameter).Result;
            var res = result.Content.ReadAsStringAsync().Result;
            var taskModels = JsonConvert.DeserializeObject<T>(res);
            return taskModels;
        }
        public T Post<T>(string ActionName, object Content)
        {
            var obj = new
            {
                Entity = Content,
                Session = SessionManager.SessionRecord
            };
            var json = JsonConvert.SerializeObject(obj);
            HttpContent httpContent = new StringContent(json);
            httpContent.Headers.ContentType = new MediaTypeHeaderValue(ContentType);

            var result = httpClient.PostAsync(ServiceConnectorUrl + "/" + ServerTransactionsName + ActionName, httpContent).Result;
            var jsonResult = JsonConvert.DeserializeObject<T>(result.Content.ReadAsStringAsync().Result);
            return jsonResult;
        }
        public decimal Get(string ControllerName, string ActionName, string Parameter)
        {
            var result = httpClient.GetAsync(ServiceConnectorUrl + ControllerName + "/" + ActionName + "?" + Parameter).Result;
            decimal res = decimal.Parse(result.Content.ReadAsStringAsync().Result);
            return res;
        }


    }
}
