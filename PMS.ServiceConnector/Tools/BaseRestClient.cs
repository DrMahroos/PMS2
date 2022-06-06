using PMS.ServiceConnector.Models;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;
namespace PMS.ServiceConnector.Tools
{
    public abstract class BaseRestClient
    {
        protected string ServiceConnectorUrl = "";// "http://localhost:61388/";
        protected readonly string SelectStatment = "SelectEntity";
        protected readonly string SelectByIndex = "SelectByIndex";
        protected readonly string InsertStatment = "InsertEntity";
        protected readonly string ExcuteProcStatment = "ExcuteProc";
        protected readonly string UpdateStatment = "UpdateEntity";
        protected readonly string DeleteStatment = "DeleteEntity";

        protected readonly string InsertCollectionStatement = "InsertCollection";
        protected readonly string DeleteCollectionStatement = "DeleteCollection";

        protected readonly string ContentType = "application/json";
        protected readonly string SystemToolsStatement = "SystemTools";
        protected readonly string PrintStatement = "Print";

        protected readonly string ServerTransactionsName = "ServerTransactions";
        private string ControllerName<T>()
        {
            return typeof(T).Name + "/";
        }
        protected HttpClient httpClient = new HttpClient();
        protected async Task<List<T>> GetAsync<T>(string SqlStatment)
        {
            SqlStatment = StringFormater.TextCoding.Encrypt(SqlStatment);
            var result = await httpClient.GetAsync(ServiceConnectorUrl + ControllerName<T>() + SelectStatment + "?SqlStatement=" + SqlStatment);
            var res = await result.Content.ReadAsStringAsync();
            var taskModels = JsonConvert.DeserializeObject<List<T>>(res);
            return taskModels;
        }


        protected async Task<ResponseResult> PostAsync<T>(T t)
        {
            var obj = new
            {
                Entity = t,
                Session = SessionManager.SessionRecord
            };
            var json = JsonConvert.SerializeObject(obj);
            HttpContent httpContent = new StringContent(json);
            httpContent.Headers.ContentType = new MediaTypeHeaderValue(ContentType);

            var result = await httpClient.PostAsync(ServiceConnectorUrl + ControllerName<T>() + InsertStatment, httpContent);
            var jsonResult = JsonConvert.DeserializeObject<ResponseResult>(await result.Content.ReadAsStringAsync());
            return jsonResult;
        }
        protected async Task<ResponseResult> PostCollectionAsync<T>(IEnumerable<T> t)
        {
            var obj = new
            {
                Collection = t,
                Session = SessionManager.SessionRecord
            };
            var json = JsonConvert.SerializeObject(obj);
            HttpContent httpContent = new StringContent(json);
            httpContent.Headers.ContentType = new MediaTypeHeaderValue(ContentType);

            var result = await httpClient.PostAsync(ServiceConnectorUrl + ControllerName<T>() + InsertCollectionStatement, httpContent);
            var jsonResult = JsonConvert.DeserializeObject<ResponseResult>(await result.Content.ReadAsStringAsync());
            return jsonResult;
        }
        protected async Task<ResponseResult> PutAsync<T>(T t)
        {
            var obj = new
            {
                Entity = t,
                Session = SessionManager.SessionRecord
            };
            var json = JsonConvert.SerializeObject(obj);
            HttpContent httpContent = new StringContent(json);
            httpContent.Headers.ContentType = new MediaTypeHeaderValue(ContentType);

            var result = await httpClient.PostAsync(ServiceConnectorUrl + ControllerName<T>() + UpdateStatment, httpContent);
            var jsonResult = JsonConvert.DeserializeObject<ResponseResult>(await result.Content.ReadAsStringAsync());
            return jsonResult;
        }
        protected async Task<ResponseResult> DeleteAsync<T>(T t)
        {
            var obj = new
            {
                Entity = t,
                Session = SessionManager.SessionRecord
            };
            var json = JsonConvert.SerializeObject(obj);
            HttpContent httpContent = new StringContent(json);
            httpContent.Headers.ContentType = new MediaTypeHeaderValue(ContentType);

            var result = await httpClient.PostAsync(ServiceConnectorUrl + ControllerName<T>() + DeleteStatment, httpContent);
            var jsonResult = JsonConvert.DeserializeObject<ResponseResult>(await result.Content.ReadAsStringAsync());
            return jsonResult;
        }
        protected async Task<ResponseResult> DeleteCollectionAsync<T>(IEnumerable<T> t)
        {
            var obj = new
            {
                Collection = t,
                Session = SessionManager.SessionRecord
            };
            var json = JsonConvert.SerializeObject(obj);
            HttpContent httpContent = new StringContent(json);
            httpContent.Headers.ContentType = new MediaTypeHeaderValue(ContentType);

            var result = await httpClient.PostAsync(ServiceConnectorUrl + ControllerName<T>() + DeleteCollectionStatement, httpContent);
            var jsonResult = JsonConvert.DeserializeObject<ResponseResult>(await result.Content.ReadAsStringAsync());
            return jsonResult;
        }
        protected async Task<string> GetScalarAsync(string SqlStatment)
        {
            HttpContent httpContent = new StringContent(SqlStatment);
            httpContent.Headers.ContentType = new MediaTypeHeaderValue(ContentType);
            var result = await httpClient.GetAsync(ServiceConnectorUrl + SystemToolsStatement + "/ExecuteScalar" + "?SqlStatement=" + SqlStatment);//, httpContent);
            var res = await result.Content.ReadAsStringAsync();
            var taskModels = JsonConvert.DeserializeObject<string>(res);
            return taskModels;
        }
        protected async Task<T> GetTopAsync<T>(string SqlStatment)
        {
            HttpContent httpContent = new StringContent(SqlStatment);
            httpContent.Headers.ContentType = new MediaTypeHeaderValue(ContentType);
            var result = await httpClient.GetAsync(ServiceConnectorUrl + SystemToolsStatement + "/ExecuteScalar" + "?SqlStatement=" + SqlStatment);//, httpContent);
            var res = await result.Content.ReadAsStringAsync();
            var taskModels = JsonConvert.DeserializeObject<T>(res);
            return taskModels;
        }
        protected async Task<T> GetByIndexAsync<T>(int index)
        {
            HttpContent httpContent = new StringContent(index.ToString());
            httpContent.Headers.ContentType = new MediaTypeHeaderValue(ContentType);
            var result = await httpClient.GetAsync(ServiceConnectorUrl + ControllerName<T>() + SelectByIndex + "?index=" + index.ToString());//, httpContent);
            var res = await result.Content.ReadAsStringAsync();
            var taskModels = JsonConvert.DeserializeObject<T>(res);
            return taskModels;
        }
        protected List<T> Get<T>(string SqlStatment)
        {

            HttpContent httpContent = new StringContent(SqlStatment);
            httpContent.Headers.ContentType = new MediaTypeHeaderValue(ContentType);

            var result = httpClient.GetAsync(ServiceConnectorUrl + ControllerName<T>() + SelectStatment + "?SqlStatement=" + SqlStatment).Result;
            var res = result.Content.ReadAsStringAsync().Result;
            var taskModels = JsonConvert.DeserializeObject<List<T>>(res);
            return taskModels;
        }

        protected ResponseResult PostProc<T>(T t)
        {
            var obj = new
            {

                Entity = t,
                Session = SessionManager.SessionRecord
            };
            var json = JsonConvert.SerializeObject(obj);
            HttpContent httpContent = new StringContent(json);
            httpContent.Headers.ContentType = new MediaTypeHeaderValue(ContentType);

            var result = httpClient.PostAsync(ServiceConnectorUrl + ControllerName<T>() + ExcuteProcStatment, httpContent).Result;
            var jsonResult = JsonConvert.DeserializeObject<ResponseResult>(result.Content.ReadAsStringAsync().Result);
            return jsonResult;
        }

        protected ResponseResult Post<T>(T t)
        {
            var obj = new
            {

                Entity = t,
                Session = SessionManager.SessionRecord
            };
            var json = JsonConvert.SerializeObject(obj);
            HttpContent httpContent = new StringContent(json);
            httpContent.Headers.ContentType = new MediaTypeHeaderValue(ContentType);

            var result = httpClient.PostAsync(ServiceConnectorUrl + ControllerName<T>() + InsertStatment, httpContent).Result;
            var jsonResult = JsonConvert.DeserializeObject<ResponseResult>(result.Content.ReadAsStringAsync().Result);
            return jsonResult;
        }
        protected ResponseResult PostCollection<T>(IEnumerable<T> t)
        {
            var obj = new
            {

                Collection = t,
                Session = SessionManager.SessionRecord
            };
            var json = JsonConvert.SerializeObject(obj);
            HttpContent httpContent = new StringContent(json);
            httpContent.Headers.ContentType = new MediaTypeHeaderValue(ContentType);

            var result = httpClient.PostAsync(ServiceConnectorUrl + ControllerName<T>() + InsertCollectionStatement, httpContent).Result;
            var jsonResult = JsonConvert.DeserializeObject<ResponseResult>(result.Content.ReadAsStringAsync().Result);
            return jsonResult;
        }
        protected ResponseResult Put<T>(T t)
        {
            var obj = new
            {

                Entity = t,
                Session = SessionManager.SessionRecord
            };
            var json = JsonConvert.SerializeObject(obj);
            HttpContent httpContent = new StringContent(json);
            httpContent.Headers.ContentType = new MediaTypeHeaderValue(ContentType);

            var result = httpClient.PostAsync(ServiceConnectorUrl + ControllerName<T>() + UpdateStatment, httpContent).Result;
            var jsonResult = JsonConvert.DeserializeObject<ResponseResult>(result.Content.ReadAsStringAsync().Result);
            return jsonResult;
        }

        protected ResponseResult Delete<T>(T t)
        {
            var obj = new
            {

                Entity = t,
                Session = SessionManager.SessionRecord
            };
            var json = JsonConvert.SerializeObject(obj);
            HttpContent httpContent = new StringContent(json);
            httpContent.Headers.ContentType = new MediaTypeHeaderValue(ContentType);

            var result = httpClient.PostAsync(ServiceConnectorUrl + ControllerName<T>() + DeleteStatment, httpContent).Result;
            var jsonResult = JsonConvert.DeserializeObject<ResponseResult>(result.Content.ReadAsStringAsync().Result);
            return jsonResult;
        }
        protected ResponseResult DeleteCollection<T>(IEnumerable<T> t)
        {
            var obj = new
            {
                Collection = t,
                Session = SessionManager.SessionRecord
            };
            var json = JsonConvert.SerializeObject(obj);
            HttpContent httpContent = new StringContent(json);
            httpContent.Headers.ContentType = new MediaTypeHeaderValue(ContentType);

            var result = httpClient.PostAsync(ServiceConnectorUrl + ControllerName<T>() + DeleteCollectionStatement, httpContent).Result;
            var jsonResult = JsonConvert.DeserializeObject<ResponseResult>(result.Content.ReadAsStringAsync().Result);
            return jsonResult;
        }

        protected string GetScalar(string SqlStatment)
        {

            HttpContent httpContent = new StringContent(SqlStatment);
            httpContent.Headers.ContentType = new MediaTypeHeaderValue(ContentType);

            var result = httpClient.GetAsync(ServiceConnectorUrl + SystemToolsStatement + "/ExecuteScalar" + "?SqlStatement=" + SqlStatment).Result;
            var res = result.Content.ReadAsStringAsync().Result;
            var taskModels = JsonConvert.DeserializeObject<string>(res);
            return taskModels;
        }

        protected T GetTop<T>(string SqlStatment)
        {

            HttpContent httpContent = new StringContent(SqlStatment);
            httpContent.Headers.ContentType = new MediaTypeHeaderValue(ContentType);

            //var result = httpClient.GetAsync(ServiceConnectorUrl + SystemToolsStatement + "/ExecuteScalar" + "?SqlStatement=" + SqlStatment).Result;//, httpContent);
            var result = httpClient.GetAsync(ServiceConnectorUrl + ControllerName<T>() + SelectStatment + "?SqlStatement=" + SqlStatment).Result;//, httpContent);
            var res = result.Content.ReadAsStringAsync().Result;
            var taskModels = JsonConvert.DeserializeObject<List<T>>(res);
            return taskModels.FirstOrDefault();
        }

        protected T GetByIndex<T>(int index)
        {

            HttpContent httpContent = new StringContent(index.ToString());
            httpContent.Headers.ContentType = new MediaTypeHeaderValue(ContentType);

            var result = httpClient.GetAsync(ServiceConnectorUrl + ControllerName<T>() + SelectByIndex + "?index=" + index.ToString()).Result;//, httpContent);
            var res = result.Content.ReadAsStringAsync().Result;
            var taskModels = JsonConvert.DeserializeObject<T>(res);
            return taskModels;
        }


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


        public ResponseResult PostMasterDetails<TMaster, TDetails>(TMaster Master, IEnumerable<TDetails> Details)
        {
            RestClient rest = new RestClient();
            var obj = new
            {
                Master = Master,
                Details = Details,
                Session = SessionManager.SessionRecord
            };

            var json = JsonConvert.SerializeObject(obj);
            HttpContent httpContent = new StringContent(json);
            httpContent.Headers.ContentType = new MediaTypeHeaderValue(ContentType);

            var result = httpClient.PostAsync(ServiceConnectorUrl + ControllerName<TMaster>() + "InsertMasterDetails ", httpContent).Result;
            var jsonResult = JsonConvert.DeserializeObject<ResponseResult>(result.Content.ReadAsStringAsync().Result);
            return jsonResult;
        }
        //testMD
        public ResponseResult PostMasterManyDetails<TMaster, TDetails>(TMaster Master, TDetails Details)
        {
            RestClient rest = new RestClient();
            var obj = new
            {
                Master = Master,
                Details = Details,
                Session = SessionManager.SessionRecord
            };

            var json = JsonConvert.SerializeObject(obj);
            HttpContent httpContent = new StringContent(json);
            httpContent.Headers.ContentType = new MediaTypeHeaderValue(ContentType);

            var result = httpClient.PostAsync(ServiceConnectorUrl + ControllerName<TMaster>() + "InsertMasterDetails ", httpContent).Result;
            var jsonResult = JsonConvert.DeserializeObject<ResponseResult>(result.Content.ReadAsStringAsync().Result);
            return jsonResult;
        }

        public ResponseResult PutMasterDetails<TMaster, TDetails>(TMaster Master, IEnumerable<TDetails> Details)
        {
            RestClient rest = new RestClient();
            var obj = new
            {
                Master = Master,
                Details = Details,
                Session = SessionManager.SessionRecord
            };

            var json = JsonConvert.SerializeObject(obj);
            HttpContent httpContent = new StringContent(json);
            httpContent.Headers.ContentType = new MediaTypeHeaderValue(ContentType);

            var result = httpClient.PostAsync(ServiceConnectorUrl + ControllerName<TMaster>() + "UpdateMasterDetails ", httpContent).Result;
            var jsonResult = JsonConvert.DeserializeObject<ResponseResult>(result.Content.ReadAsStringAsync().Result);
            return jsonResult;
        }

        public ResponseResult PutMasterManyDetails<TMaster, TDetails>(TMaster Master, TDetails Details)
        {
            RestClient rest = new RestClient();
            var obj = new
            {
                Master = Master,
                Details = Details,
                Session = SessionManager.SessionRecord
            };

            var json = JsonConvert.SerializeObject(obj);
            HttpContent httpContent = new StringContent(json);
            httpContent.Headers.ContentType = new MediaTypeHeaderValue(ContentType);

            var result = httpClient.PostAsync(ServiceConnectorUrl + ControllerName<TMaster>() + "UpdateMasterDetails ", httpContent).Result;
            var jsonResult = JsonConvert.DeserializeObject<ResponseResult>(result.Content.ReadAsStringAsync().Result);
            return jsonResult;
        }


        public ResponseResult UpdateMasterManyDetailsMasterPlan<TMaster, TDetails>(TMaster Master, TDetails Details, string ActionName)
        {
            RestClient rest = new RestClient();
            var obj = new
            {
                Master = Master,
                Details = Details,
                Session = SessionManager.SessionRecord
            };

            var json = JsonConvert.SerializeObject(obj);
            HttpContent httpContent = new StringContent(json);
            httpContent.Headers.ContentType = new MediaTypeHeaderValue(ContentType);

            var result = httpClient.PostAsync(ServiceConnectorUrl + ControllerName<TMaster>() + ActionName + " ", httpContent).Result;
            var jsonResult = JsonConvert.DeserializeObject<ResponseResult>(result.Content.ReadAsStringAsync().Result);
            return jsonResult;
        }
    }
}
