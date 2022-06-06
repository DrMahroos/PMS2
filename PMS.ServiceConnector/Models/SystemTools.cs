using Newtonsoft.Json;
using PMS.ServiceConnector.Tools;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;
using System.Reflection;
using System.Reflection.Emit;
namespace PMS.ServiceConnector.Models
{
    public class SystemTools : Tools.BaseRestClient
    {
        public SystemTools()
        {
            ServiceConnectorUrl = DbEntities.ServiceUrl;
        }

        public void SetSelectedYear(string year)
        {
            var httpClient = new HttpClient();
            httpClient.GetStringAsync(ServiceConnectorUrl + "DatabaseChange/SetSelectedYear" + "?year=" + year).Wait();
        }
        public G_USERS Login(string userName, string userPassword)
        {
            var httpClient = new HttpClient();

            var json = httpClient.GetStringAsync(ServiceConnectorUrl + SystemToolsStatement + "/Login" + "?userName=" + userName + "&userPassword=" + userPassword).Result;

            var taskModels = JsonConvert.DeserializeObject<G_USERS>(json);

            return taskModels;
        }

        //GetAppSettings
        public SystemParameters GetAppSettings(string userCode, string SystemCode, string SubSystemCode)
        {
            var data = new
            {
                UserCode = userCode,
                systemCode = SystemCode,
                subSystemCode = SubSystemCode
            };
            var httpClient = new HttpClient();

            HttpContent httpContent = new StringContent(JsonConvert.SerializeObject(data), Encoding.UTF8, "application/json");

            var json = httpClient.PostAsync(ServiceConnectorUrl + SystemToolsStatement + "/GetAppSettings", httpContent).Result.Content.ReadAsStringAsync().Result;
            var obj = JsonConvert.DeserializeObject<object>(json);
            var taskModels = JsonConvert.DeserializeObject<SystemParameters>(obj.ToString());

            return taskModels;

        }
        
        public IEnumerable Find(string tableName, string condition, string columns, string orderBy)
        {
            var data = new
            {
                TableName = tableName,
                Condition = condition,
                Columns = columns,
                OrderBy = orderBy
            };
            var httpClient = new HttpClient();

            HttpContent httpContent = new StringContent(JsonConvert.SerializeObject(data), Encoding.UTF8, "application/json");

            var json = httpClient.PostAsync(ServiceConnectorUrl + SystemToolsStatement + "/Find", httpContent).Result.Content.ReadAsStringAsync().Result;
            var obj = JsonConvert.DeserializeObject<object>(json);
            var taskModels = JsonConvert.DeserializeObject<IEnumerable>(json);

            return taskModels;
        }

        public object GetByIndex(string TableName, string Condition, int Index)
        {
            var data = new
            {
                TableName = TableName,
                Condition = Condition,
                Index = Index
            };
            var httpClient = new HttpClient();

            HttpContent httpContent = new StringContent(JsonConvert.SerializeObject(data), Encoding.UTF8, "application/json");

            var json = httpClient.PostAsync(ServiceConnectorUrl + SystemToolsStatement + "/GetByIndex", httpContent).Result.Content.ReadAsStringAsync().Result;
            var taskModels = JsonConvert.DeserializeObject<object>(json);

            return taskModels;
        }

        public struct SearchAttruibuts
        {
            public List<G_SearchFormSetting> Columns { get; set; }
            public G_SearchForm Settings { get; set; }
        }

        public SearchAttruibuts SearchProperties(string moduleCode, string controlName)
        {
            var data = new
            {
                session = SessionManager.SessionRecord,
                ModuleCode = moduleCode,
                ControlName = controlName
            };

            var httpClient = new HttpClient();

            HttpContent httpContent = new StringContent(JsonConvert.SerializeObject(data), Encoding.UTF8, "application/json");

            var json = httpClient.PostAsync(ServiceConnectorUrl + SystemToolsStatement + "/SearchProperties", httpContent).Result.Content.ReadAsStringAsync().Result;
            var obj = JsonConvert.DeserializeObject<object>(json);
            var taskModels = JsonConvert.DeserializeObject<SearchAttruibuts>(obj.ToString());

            return taskModels;
        }
        
        public string Print<T>(T entity)
        {
            var httpClient = new HttpClient();
            var obj = new
            {
                Entity = entity,
                Session = SessionManager.SessionRecord
            };
            var json = JsonConvert.SerializeObject(obj);

            HttpContent httpContent = new StringContent(json);

            httpContent.Headers.ContentType = new MediaTypeHeaderValue("application/json");

            var result = httpClient.PostAsync(ServiceConnectorUrl + typeof(T).Name + "/" + PrintStatement, httpContent).Result;
            var response = JsonConvert.DeserializeObject<string>(result.Content.ReadAsStringAsync().Result, SerializeSettings);
            return response;
        }
        
        public IEnumerable<A_ACCOUNT> SelectAccounts(string CompCode)
        {
            HttpClient httpClient = new HttpClient();
            
            var result = httpClient.GetAsync(ServiceConnectorUrl + SystemToolsStatement + "/SelectAccounts?CompCode=" + CompCode).Result;
            var res = result.Content.ReadAsStringAsync().Result;
            var taskModels = JsonConvert.DeserializeObject<IEnumerable<A_ACCOUNT>>(res);
            return taskModels;
        }

        struct CodeDescriptionModel
        {
            public string Code { get; set; }
            public string Description { get; set; }
        }
        public object GetDescription(string tableName, string condition)
        {
            var httpClient = new HttpClient();
            var obj = new
            {
                tableName = tableName,
                condition = condition,
                Session = SessionManager.SessionRecord
            };
            var json = JsonConvert.SerializeObject(obj);

            HttpContent httpContent = new StringContent(json);

            httpContent.Headers.ContentType = new MediaTypeHeaderValue("application/json");

            var result = httpClient.PostAsync(ServiceConnectorUrl + SystemToolsStatement + "/GetDescription", httpContent).Result;
            var response = JsonConvert.DeserializeObject<CodeDescriptionModel>(result.Content.ReadAsStringAsync().Result, SerializeSettings);
            return response;
        }

        public string GetIndexByUseId(int idValue, string BaseTableName, string idFieldName, string condation)
        {
            string SqlStatment = "";
            string cond = " Where " + idFieldName + "  = " + idValue.ToString();
            string con = string.IsNullOrEmpty(condation) ? "" : " Where " + condation ;
            SqlStatment = "Select top 1 RowNum  From (Select Row_Number() Over (Order By (" + idFieldName + ")) As RowNum ," + idFieldName + " From " + BaseTableName + " " + con + ") t2" + cond;
            string result = this.GetScalar(SqlStatment);
            return result;
        }
        public string GetIndexByUseCode(string idValue, string BaseTableName, string idFieldName)
        {
            string SqlStatment = "";
            string cond = " Where " + idFieldName + "  = '" + idValue.ToString() + "'";
            SqlStatment = "Select top 1 RowNum  From (Select Row_Number() Over (Order By (select 0)) As RowNum ," + idFieldName + " From " + BaseTableName + " " + ") t2" + cond;
            string result = this.GetScalar(SqlStatment);
            return result;
        }

        public void CalculatepriceActivity(int _Id)
        {
            var httpClient = new HttpClient();
            httpClient.GetStringAsync(ServiceConnectorUrl + "SystemTools/CalculatepriceAct" + "?_Id=" + _Id);
        }

        public void CostCalcolation(int _Id)
        {
            var httpClient = new HttpClient();
            httpClient.GetStringAsync(ServiceConnectorUrl + "SystemTools/CostCalcolation" + "?_Id=" + _Id);
        }

        public void ProcessAuthorize(int _Id)
        {
            var httpClient = new HttpClient();
            httpClient.GetStringAsync(ServiceConnectorUrl + "SystemTools/ProcessAuthorize" + "?_Id=" + _Id);
        }

        public void workSchdule_Authorize(int _Id)
        {
            var httpClient = new HttpClient();
            httpClient.GetStringAsync(ServiceConnectorUrl + "SystemTools/workSchdule_Authorize" + "?_Id=" + _Id);
        }
        public void workSchdule_Reopen(int _Id)
        {
            var httpClient = new HttpClient();
            httpClient.GetStringAsync(ServiceConnectorUrl + "SystemTools/workSchdule_Reopen" + "?_Id=" + _Id);
        }
        public void workSchdule_UnAuthorize(int _Id)
        {
            var httpClient = new HttpClient();
            httpClient.GetStringAsync(ServiceConnectorUrl + "SystemTools/workSchdule_UnAuthorize" + "?_Id=" + _Id);
        }
        public void workSchdule_Requirements(int _Id)
        {
            var httpClient = new HttpClient();
            httpClient.GetStringAsync(ServiceConnectorUrl + "SystemTools/workSchdule_Requirements" + "?_Id=" + _Id);
        }
        public void EngSubServiceOrderReopen(int _Id)
        {
            var httpClient = new HttpClient();
            httpClient.GetStringAsync(ServiceConnectorUrl + "SystemTools/EngSubServiceOrderReopen" + "?_Id=" + _Id);
        }
        //public int chechDate(int comCode, int braCode, DateTime date)
        //{
        //    var httpClient = new HttpClient();
        //    httpClient.GetStringAsync(ServiceConnectorUrl + "SystemTools/chechDate" + comCode + braCode + date);
        //}
    }
}
