using Newtonsoft.Json;
using CloudBeuty.ServiceConnector.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;

namespace CloudBeuty.ServiceConnector.Tools
{
    public abstract class RestClient
    {
        protected JsonSerializerSettings SerializeSettings
        {
            get
            {
                JsonSerializerSettings settings = new JsonSerializerSettings();
                settings.ReferenceLoopHandling = ReferenceLoopHandling.Ignore;
                settings.NullValueHandling = NullValueHandling.Ignore;
                return settings;
            }
        }
        protected readonly string SelectEntityStatement = "SelectEntity";
        protected readonly string InsertEntityStatement = "InsertEntity";
        protected readonly string DeleteEntityStatement = "DeleteEntity";
        protected readonly string UpdateEntityStatement = "UpdateEntity";
        protected readonly string SystemToolsStatement = "SystemTools";
        protected readonly string SelectByIndexStatement = "SelectByIndex";
        protected readonly string PrintStatement = "Print";
        protected const string WebServiceUrl = "http://localhost:56817/";

        protected IEnumerable<T> GetAsync<T>(string SqlStatemnt)
        {
            var httpClient = new HttpClient();
            string encSqlStatement = StringFormater.TextCoding.Encrypt(SqlStatemnt);

            var json = httpClient.GetStringAsync(WebServiceUrl +typeof(T).Name+"/" + SelectEntityStatement + "?SqlStatement=" + encSqlStatement).Result;

            var taskModels = JsonConvert.DeserializeObject<IEnumerable<T>>(json,SerializeSettings);

            return taskModels;
        }

        protected ResponseResult PostAsync<T>(T t)
        {
            var httpClient = new HttpClient();
            var obj = new
            {
                Entity = t,
                Session=SessionManager.SessionRecord
            };
            var json = JsonConvert.SerializeObject(obj);

            HttpContent httpContent = new StringContent(json);

            httpContent.Headers.ContentType = new MediaTypeHeaderValue("application/json");

            var result = httpClient.PostAsync(WebServiceUrl + typeof(T).Name + "/" + InsertEntityStatement, httpContent).Result;
            var response = JsonConvert.DeserializeObject<ResponseResult>(result.Content.ReadAsStringAsync().Result,SerializeSettings);
            return response;
        }

        protected ResponseResult PostCollectionAsync<T>(IEnumerable<T> t)
        {
            var httpClient = new HttpClient();
            var obj = new
            {
                Entity = t,
                Session = SessionManager.SessionRecord
            };
            var json = JsonConvert.SerializeObject(obj);

            HttpContent httpContent = new StringContent(json);

            httpContent.Headers.ContentType = new MediaTypeHeaderValue("application/json");

            var result = httpClient.PostAsync(WebServiceUrl + typeof(T).Name + "/" + InsertEntityStatement, httpContent).Result;
            var response = JsonConvert.DeserializeObject<ResponseResult>(result.Content.ReadAsStringAsync().Result, SerializeSettings);
            return response;
        }

        protected ResponseResult PutAsync<T>(T t)
        {
            var httpClient = new HttpClient();
            var obj = new
            {
                Entity = t,
                Session = SessionManager.SessionRecord
            };
            var json = JsonConvert.SerializeObject(obj);

            HttpContent httpContent = new StringContent(json);

            httpContent.Headers.ContentType = new MediaTypeHeaderValue("application/json");

            var result = httpClient.PostAsync(WebServiceUrl + typeof(T).Name + "/" + UpdateEntityStatement, httpContent).Result;
            var response = JsonConvert.DeserializeObject<ResponseResult>(result.Content.ReadAsStringAsync().Result, SerializeSettings);
            return response;
        }

        protected ResponseResult DeleteAsync<T>(T t)
        {
            var httpClient = new HttpClient();
            var obj = new
            {
                Entity = t,
                Session = SessionManager.SessionRecord
            };
            var json = JsonConvert.SerializeObject(obj);

            HttpContent httpContent = new StringContent(json);

            httpContent.Headers.ContentType = new MediaTypeHeaderValue("application/json");

            var result =  httpClient.PostAsync(WebServiceUrl + typeof(T).Name + "/" + DeleteEntityStatement, httpContent).Result;
            var response = JsonConvert.DeserializeObject<ResponseResult>(result.Content.ReadAsStringAsync().Result, SerializeSettings);
            return response;
        }

        protected IEnumerable<T> GetTopAsync<T>(string SqlStatment)
        {
            var httpClient = new HttpClient();

            var json = httpClient.GetStringAsync(WebServiceUrl+SystemToolsStatement+ "/ExecuteReader" + "?SqlStatement=" + SqlStatment).Result;

            var obj = JsonConvert.DeserializeObject<object>(json);
            var taskModels = JsonConvert.DeserializeObject<IEnumerable<T>>(obj.ToString(), SerializeSettings);
            return taskModels;
        }

        //protected async Task<T> GetByIndexAsync<T>(int index)
        //{
        //    var httpClient = new HttpClient();

        //    var json = await httpClient.GetStringAsync(WebServiceUrl + typeof(T).Name + "/" + SelectByIndexStatement + "?index=" + index.ToString());
        //    //var obj = JsonConvert.DeserializeObject<object>(json);
        //    var taskModels = JsonConvert.DeserializeObject<T>(json, SerializeSettings);

        //    return taskModels;
        //}
        //
        protected string GetScalarAsync(string SqlStatment)
        {
            var httpClient = new HttpClient();

            var json = httpClient.GetStringAsync(WebServiceUrl + SystemToolsStatement + "/ExecuteScalar" + "?SqlStatement=" + SqlStatment).Result;

            var obj = JsonConvert.DeserializeObject<object>(json);
            var taskModels = JsonConvert.DeserializeObject<string>(obj.ToString(), SerializeSettings);

            return taskModels;
        }


    }
}
