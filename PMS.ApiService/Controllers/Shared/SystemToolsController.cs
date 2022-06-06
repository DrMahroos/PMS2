using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using PMS.ApiService.Models;
using PMS.ApiService.Tools;
using Security;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading;
using System.Web.Configuration;
using System.Web.Http;
using System.Collections.Specialized;
using System.Reflection;
using System.Data.Entity.Core.EntityClient;
using PMS.ApiService.Models.CustomEntities;
using System.Xml;
using System.Web;
using PMS.ServiceConnector.Models.Entities.CustomEntities;
using System.Data.Entity.Core.Objects;
using System.IO;
using System.Drawing;

namespace PMS.ApiService.Controllers
{
    public enum Status
    {
        NotProcess = 0,
        Process = 1,
        Canceled = 2
    }
    public class SystemToolsController : BaseController
    {
        public string[] InitalizeConnection()
        {
            //int sss = Status.NotProcess;

            string[] s = new string[10];
            s[0] = WebConfigurationManager.AppSettings["ConnectionInfo"];
            s[1] = WebConfigurationManager.AppSettings["ServerName"];
            s[2] = WebConfigurationManager.AppSettings["UseIntegratedSecurity"];
            s[3] = WebConfigurationManager.AppSettings["DbUserName"];
            s[4] = WebConfigurationManager.AppSettings["DbPassword"];
            s[5] = WebConfigurationManager.AppSettings["AbsoluteSysDbName"];
            s[6] = Shared.Session.SelectedYear;//WebConfigurationManager.AppSettings["DefaultYear"];
            s[7] = WebConfigurationManager.AppSettings["Version"];
            s[8] = WebConfigurationManager.AppSettings["Defaultlanguage"];
            //sp.ConnectionDetails = s;
            return s;
        }

        [HttpGet]
        public string GetDesciptionByCode(string tableName, string codeField, string codeValue, string descs, string language)
        {
            string connectionString = db.Database.Connection.ConnectionString;
            string result = string.Empty;
            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                //var results = db1New.Database.SqlQuery<string>("SELECT LOWER(column_name) AS column_name FROM information_schema.columns WHERE table_name = @p0", tableName).ToArray();

                using (SqlCommand command = new SqlCommand())
                {
                    string SqlStatement = String.Format("Select top 1 {0} From {1} Where {2} = {3}", descs, tableName, codeField, codeValue);
                    command.Connection = connection;
                    command.CommandText = SqlStatement;
                    connection.Open();
                    DataTable table = new DataTable();
                    table.Load(command.ExecuteReader());
                    connection.Close();
                    command.Dispose();
                    connection.Dispose();
                    if (table.Rows.Count == 0)
                        return "";
                    string arDesc = table.Rows[0][descs.Split(',')[0]].ToString();
                    string enDesc = table.Rows[0][descs.Split(',')[1]].ToString();

                    if (language == "ar")
                        result = arDesc;
                    else
                        result = enDesc;
                    return result;
                }
            }
        }
        public static string GenerateGuid()
        {
            Guid obj = Guid.NewGuid();

            return obj.ToString();
        }
        //[HttpPost]
        //public string GetPermissions(JObject data)
        //{
        //    SessionRecord session = JObjectData<string>(data).Session;
        //    Security.SecurityService sp = new Security.SecurityService();

        //    var s = InitalizeConnection();

        //    sp.initializeConnectionString(int.Parse(s[6]), ref s);
        //    // Get User Company Prive CompPriv , // Get user Branch Priv BraPriv // Send to module Prv = CompPriv & BraPriv  + db closed
        //    var prv = SecurityAccess.GetUserBranchPrivileges(session.UserCode, session.CompCode, session.BranchCode);
        //    var finalPrv = SecurityAccess.GetUserModulePrivileges(session.UserCode, session.Modulecode, session.SystemCode, session.SubSystemCode, prv, false);

        //    return finalPrv.ToJsonString();
        //}

        [HttpPost]
        public string GetUserPrivilage(JObject data)
        {
            SessionRecord session = JObjectData<string>(data).Session;

            int compCode = int.Parse(session.CompCode);
            int branchCode = int.Parse(session.BranchCode);

            var query = "SELECT * FROM [dbo].[GFunc_GetPrivilage] (" + compCode + "," + branchCode + ",'" + session.UserCode + "', '" + session.SystemCode + "','" + session.SubSystemCode + "','" + session.Modulecode + "')";

            var result = db.Database.SqlQuery<UserPrivilege>(query)
                .FirstOrDefault()
                .ToJsonString();
            return result;
        }

        [HttpPost]
        public string GetAllUserPrivilage(JObject data)
        {
            SessionRecord session = JObjectData<string>(data).Session;

            int compCode = int.Parse(session.CompCode);
            int branchCode = int.Parse(session.BranchCode);

            var query = "SELECT * FROM [dbo].[GFunc_GetPrivilage] (" + compCode + "," + branchCode + ",'" + session.UserCode + "', '" + session.SystemCode + "','" + session.SubSystemCode + "','" + session.Modulecode + "')";

            var result = db.Database.SqlQuery<UserPrivilege>(query)
                .Where(row => row.Access == false || row.AVAILABLE == false)
                .ToList()
                .ToJsonString();

            return result;
        }

        [HttpGet]
        public string ExecuteReader(string SqlStatement)
        {
            string connectionString = db.Database.Connection.ConnectionString;
            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                using (SqlCommand command = new SqlCommand())
                {
                    command.Connection = connection;
                    command.CommandText = SqlStatement;
                    connection.Open();
                    DataTable table = new DataTable();
                    table.Load(command.ExecuteReader());
                    connection.Close();
                    command.Dispose();
                    connection.Dispose();

                    var result = JsonConvert.SerializeObject(table);
                    return result;
                }
            }
        }

        [HttpGet]
        public string ExecuteScalar(string SqlStatement)
        {
            string connectionString = db.Database.Connection.ConnectionString;

            using (SqlConnection connection = new SqlConnection(connectionString))
            {
                using (SqlCommand command = new SqlCommand())
                {
                    command.Connection = connection;
                    command.CommandText = SqlStatement;
                    connection.Open();
                    string result = string.Empty;
                    result = command.ExecuteScalar().ToString();
                    connection.Close();
                    command.Dispose();
                    connection.Dispose();


                    return result;
                }
            }
        }

        [HttpGet]
        public G_USERS Login(string userName, string userPassword)
        {

            //db.Configuration.ProxyCreationEnabled = false;
            //Security.SecurityService sp = new Security.SecurityService();

            //var s = InitalizeConnection();

            //sp.initializeConnectionString(int.Parse(s[6]), ref s);
            //var result = sp.IsValidUser(userName, userPassword);
            //List<G_USERS> users = new List<G_USERS>();
            //if (result.Count > 0)
            //{
            //    users = db.G_USERS.Where(f => f.USER_CODE == userName && f.USER_PASSWORD == userPassword).ToList();
            //}
            //return users.FirstOrDefault();
            db.Configuration.ProxyCreationEnabled = false;
            var users = db.G_USERS
                          .Where(ee => ee.USER_CODE == userName & ee.USER_PASSWORD == userPassword & ee.USER_ACTIVE == true);
            return users.FirstOrDefault();
        }

        public struct CodeDescriptionModel
        {
            public string Code { get; set; }
            public string Description { get; set; }
        }

        [HttpPost]
        public CodeDescriptionModel GetDescription(JObject data)// string tableName, string condition, SessionRecord Session)
        {

            string tableName = data["tableName"].ToString();
            string condition = data["condition"].ToString();
            SessionRecord Session = data["Session"].ToObject<SessionRecord>();
            string code = "'0'";

            Type tableType = Type.GetType("PMS.ApiService.Models." + tableName);

            List<PropertyInfo> props = tableType.GetProperties().Where(f => f.Name.ToLower() == "compcode" || f.Name.ToLower() == "comp_code").ToList();

            string descE = string.Empty;
            string descA = string.Empty;
            string lang = Session.ScreenLanguage;

            string sql = string.Empty;
            string desc = string.Empty;
            if (lang == "ar")
                desc = descA;
            else
                desc = descE;
            string compCond = string.Empty;
            if (props.Count > 0)
            {
                compCond = props[0].Name + "=" + Session.CompCode;
            }
            else
            {
                compCond = "0 = 0";
            }

            sql = String.Format("Select Convert(nvarchar,{0}) as 'Code',{1} as 'Description' From {2} Where 0=0 AND {3} AND {4}",
                /*0*/ code,
                /*1*/ desc,
                /*2*/ tableName,
                /*3*/ compCond,
                /*4*/ condition);
            var query = db.Database.SqlQuery<CodeDescriptionModel>(sql).FirstOrDefault();
            return query;
        }

        #region Just for test
        private void testDesc()
        {
            List<string> tables = db.Database.SqlQuery<string>("Select name from sys.tables").ToList();
            List<string> result = new List<string>();
            foreach (string table in tables)
            {
                Type tableType = Type.GetType("PMS.ApiService.Models." + table);
                if (tableType == null)
                {
                    result.Add("null: " + table);
                    continue;
                }
                result.Add(Desc(tableType, "ar"));
            }
        }

        private string Desc(Type type, string lang)
        {
            if (type == null)
                return "null";
            string result = string.Empty;
            List<PropertyInfo> properties = new List<PropertyInfo>();
            //var type = typeof(T);
            //if (lang == "en")
            //{
            properties = (from p in type.GetProperties()
                          where (p.Name.ToLower().Contains("desc") || p.Name.ToLower().Contains("name"))
                          && (p.Name[p.Name.Length - 1].ToString().ToLower() == "e" || p.Name[p.Name.Length - 1].ToString().ToLower() == "l")
                          select p).ToList();
            if (properties.Count > 0)
            {
                result = type.Name + ": " + properties.First().Name;
            }
            else
            {
                result = type.Name + ": " + "EN\\Undefiend";
            }
            //}
            //else
            //{
            properties = (from p in type.GetProperties()
                          where (p.Name.ToLower().Contains("desc") || p.Name.ToLower().Contains("name"))
                          && (p.Name[p.Name.Length - 1].ToString().ToLower() == "a")
                          select p).ToList();
            if (properties.Count > 0)
            {
                result += ", " + properties.First().Name;
            }
            else
            {
                result += ", AR:Undefiend";
            }
            //}
            return result;
        }
        #endregion

        [HttpPost]
        public string GetAppSettings(JObject data)
        {
            char[] splitChar = { '|' };
            char[] splitQMark = { '?' };
            XmlDocument doc = new XmlDocument();
            List<CompainesData> companyList = new List<CompainesData>();
            List<CompainesData> companyListFinal = new List<CompainesData>();
            List<string> gUserCompanyList = new List<string>();

            string userCode = data["UserCode"].ToString();
            string SystemCode = data["systemCode"].ToString();
            string SubSystemCode = data["subSystemCode"].ToString();

            string Defaultlanguage = ConfigurationManager.AppSettings["Defaultlanguage"];
            string DefaultYear = ConfigurationManager.AppSettings["DefaultYear"];

            doc.LoadXml(SecuritySystem.Decrypt(ConfigurationManager.AppSettings["ConnectionInfo"]).ToString());
            XmlNodeList compines = doc.GetElementsByTagName("Companies");

            string[] all_data = compines[0].FirstChild.Value.Split(splitQMark, StringSplitOptions.RemoveEmptyEntries);
            foreach (var item in all_data)
            {
                CompainesData compaines = new CompainesData();
                string[] myData = item.Split(splitChar, StringSplitOptions.RemoveEmptyEntries);
                compaines.companyCode = Convert.ToInt32(myData[0].ToString());
                compaines.comanyNameAr = myData[1].ToString();
                compaines.comanyNameEn = myData[2].ToString();
                compaines.Code = myData[3].ToString();

                string subSystems = returnSubSystems(compaines.Code, SystemCode + "(", ")");
                if (subSystems != "")
                    if (subSystems.Contains(SubSystemCode.ToUpper()))
                        companyList.Add(compaines);

                companyListFinal = companyList.ToList();
            }

            foreach (var item in companyList)
            {
                int index = companyList.FindIndex(xx => xx.companyCode == item.companyCode);
                var userCompany = db.G_USER_COMPANY
                    .Where(row => (row.COMP_CODE == item.companyCode) &
                        (row.USER_CODE == userCode) & (row.EXECUTE == true))
                    .Select(t => new
                    {
                        t.COMP_CODE,
                        t.EXECUTE,
                        t.USER_CODE,
                    }).ToJsonString();

                if (userCompany == "[]")
                    companyListFinal.RemoveAt(index);
            }

            var obj = new
            {
                Defaultlanguage = Defaultlanguage,
                DefaultYear = DefaultYear,

                CompanyCode = companyListFinal[0].companyCode,
                CompanyArabicDescription = companyListFinal[0].comanyNameAr,
                CompanyEnglishDescription = companyListFinal[0].comanyNameEn,
            };

            var result = JsonConvert.SerializeObject(obj);
            return result;
        }

        string returnSubSystems(string strSource, string strStart, string strEnd)
        {
            int Start, End;
            if (strSource.Contains(strStart) && strSource.Contains(strEnd))
            {
                Start = strSource.IndexOf(strStart, 0) + strStart.Length; // return systemCode included  remove ( + strStart.Length )
                End = strSource.IndexOf(strEnd, Start);
                string data = strSource.Substring(Start, End - Start); // + 1 and puls 1 
                return data;
            }
            else
            {
                return "";
            }

        }

        [HttpPost]
        public string GetUserModules(JObject data)
        {
            SessionRecord session = data[Shared.SessionKey].ToObject<SessionRecord>();

            var module = db.G_USER_MODULE.Where(f => f.USER_CODE == session.UserCode);
            var json = JsonConvert.SerializeObject(module);
            return json;
        }

        [HttpPost, ActionName("Find")]
        public string Find([FromBody] JObject data)// string TableName, [FromUri]string[] Columns,string Condition)
        {
            string TableName = data["TableName"].ToString();
            string Condition = data["Condition"].ToString();
            string Columns = data["Columns"].ToObject<string>();
            string orderBy = data["OrderBy"].ToString();
            SqlConnection connection = new SqlConnection(db.Database.Connection.ConnectionString);
            connection.Open();

            var pageSize = db.G_SearchForm.FirstOrDefault(f => f.DataSourceName == TableName).PageSize;

            string cond = Condition;// == null || Condition == "" ? "" : " Where " + Condition;

            SqlCommand command = new SqlCommand();
            command.Connection = connection;

            //if (pageSize == 0)
            //    command.CommandText = "Select RowIndex," + Columns + " From (Select Row_Number() Over (Order By (Select 0)) As RowIndex, * From " + TableName + ") t2" + cond + " Order By " + orderBy;
            //else
            //    command.CommandText = "Select Top " + pageSize.ToString() + " RowIndex," + Columns + " From (Select Row_Number() Over (Order By (Select 0)) As RowIndex, * From " + TableName + ") t2" + cond + " Order By " + orderBy;


            if (pageSize == 0)
                command.CommandText = "Select " + Columns + " From " + TableName + cond + " Order By " + orderBy;
            else
                command.CommandText = "Select Top " + pageSize.ToString() + " " + Columns + " From " + TableName + cond + " Order By " + orderBy;


            DataTable table = new DataTable();
            table.Load(command.ExecuteReader());
            //SqlDataReader dr = command.ExecuteReader();
            connection.Close();
            connection.Dispose();
            command.Dispose();

            var jsonResult = JsonConvert.SerializeObject(table);
            //Dictionary<string, List<string>> dicResult = new Dictionary<string, List<string>>();

            //foreach (DataColumn column in table.Columns)
            //{
            //    List<string> values = new List<string>();
            //    foreach (DataRow row in table.Rows)
            //    {
            //        values.Add(row[column].ToString());
            //    }
            //    dicResult.Add(column.Caption, values);
            //}
            return jsonResult;// JsonConvert.SerializeObject(dicResult);
            //var table = db.Database.SqlQuery<SearchResult>("Select " + Code + " as 'Code'," + Name + " as 'Name' From " + TableName);
            //return jsonResult;
        }

        [HttpPost]
        public string GetByIndex(JObject data)
        {
            string TableName = data["TableName"].ToString();
            string Index = data["Index"].ToString();
            string condition = data["Condition"].ToString();
            string cond = condition == "" ? "" : " where " + condition;

            SqlConnection connection = new SqlConnection(db.Database.Connection.ConnectionString);// System.Configuration.ConfigurationManager.ConnectionStrings["ConnectionString"].ConnectionString);
            SqlCommand command = new SqlCommand();
            command.Connection = connection;
            command.CommandText = "Select * From (Select Row_Number() Over (Order By (Select 0)) As RowIndex, * From " + TableName + cond + ") t2 where RowIndex = " + Index;// where " + condition; ;
            //command.CommandText = "Select " + columns.Substring(1) + " From " + TableName;
            connection.Open();
            DataTable table = new DataTable();
            table.Load(command.ExecuteReader());
            connection.Close();
            connection.Dispose();
            command.Dispose();
            var jsonResult = JsonConvert.SerializeObject(table);

            return jsonResult;// JsonConvert.SerializeObject(dicResult);
        }

        [HttpGet]
        public G_USERModel LoginUrl(string userName, string userPassword)
        {
            var query = db.G_USERS
                          .Where(ee => ee.USER_CODE == userName & ee.USER_PASSWORD == userPassword & ee.USER_ACTIVE == true);

            return query.Select(x => new G_USERModel
            {
                USER_CODE = x.USER_CODE

            }).FirstOrDefault();
        }

        [HttpPost]
        public object SearchProperties(JObject jobj)
        {
            SessionRecord session = jobj["session"].ToObject<SessionRecord>();
            string moduleCode = jobj["ModuleCode"].ToString();
            string controlName = jobj["ControlName"].ToString();

            var searchFormModule = (from module in db.G_SearchFormModule
                                    where module.SystemCode == session.SystemCode
                                    && module.SubSystemCode == session.SubSystemCode
                                    && module.ModuleCode == moduleCode
                                    && (module.ControlCode == controlName || module.ControlCode == "*")
                                    select module).FirstOrDefault();
            if (searchFormModule == null)
                return new { Columns = new List<G_SearchFormSetting>(), Settings = new G_SearchForm() };

            string SearchFormCode = searchFormModule.SearchFormCode;// db.G_SearchFormModule.Where(f => f.ModuleCode == moduleCode).First().SearchFormCode;

            var columns = from cols in db.G_SearchFormSetting
                          orderby cols.FieldSequence
                          where cols.SearchFormCode == SearchFormCode
                          select cols;

            var settings = from searchForm in db.G_SearchForm
                           where searchForm.SearchFormCode == SearchFormCode
                           select searchForm;

            var obj = new
            {
                Columns = columns,
                Settings = settings.First()
            };


            var jsonObject = Newtonsoft.Json.JsonConvert.SerializeObject(obj, Newtonsoft.Json.Formatting.Indented);
            return jsonObject;
        }

        //⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿
        //⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿
        //⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿
        //⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿⓿

        //GeneralTools
        //_________________
        //GetSubSystemNameA
        //GetSubSystemNameE
        //GetNotAvailableModules

        #region GeneralTools (Temp)
        [HttpPost]
        public string GetSubSystemNameA(JObject data)
        {
            SessionRecord session = JObjectData<SessionRecord>(data).Session;// data["session"].ToObject<SessionRecord>();
            string systemCode = session.SystemCode;
            string subSystemCode = session.SubSystemCode;

            string name = "";
            string sqlString;
            try
            {
                sqlString = @"SELECT dbo.G_SUB_SYSTEMS.SUB_SYSTEM_DESCA
                            FROM dbo.G_SYSTEM INNER JOIN
                            dbo.G_SUB_SYSTEMS ON dbo.G_SYSTEM.SYSTEM_CODE = dbo.G_SUB_SYSTEMS.SYSTEM_CODE
                            WHERE (dbo.G_SUB_SYSTEMS.SUB_SYSTEM_CODE = @SubSystemCode) AND (dbo.G_SUB_SYSTEMS.SYSTEM_CODE = @SystemCode)";
                System.Data.Common.DbCommand comm = GenericDataAccess.CreateTextCommand(sqlString);
                GenericDataAccess.AddStoredProcedureParameter(comm, "@SystemCode", systemCode, DbType.String);
                GenericDataAccess.AddStoredProcedureParameter(comm, "@SubSystemCode", subSystemCode, DbType.String);
                name = GenericDataAccess.ExecuteScalar(comm);
            }
            catch { }
            return name;
        }

        [HttpPost]
        public string GetSubSystemNameE(JObject data)
        {
            SessionRecord session = data["session"].ToObject<SessionRecord>();
            string systemCode = session.SystemCode;
            string subSystemCode = session.SubSystemCode;

            string name = "";
            string sqlString;
            try
            {
                sqlString = @"SELECT dbo.G_SUB_SYSTEMS.SUB_SYSTEM_DESCE
                            FROM dbo.G_SYSTEM INNER JOIN
                            dbo.G_SUB_SYSTEMS ON dbo.G_SYSTEM.SYSTEM_CODE = dbo.G_SUB_SYSTEMS.SYSTEM_CODE
                            WHERE (dbo.G_SUB_SYSTEMS.SUB_SYSTEM_CODE = @SubSystemCode) AND (dbo.G_SUB_SYSTEMS.SYSTEM_CODE = @SystemCode)";
                System.Data.Common.DbCommand comm = GenericDataAccess.CreateTextCommand(sqlString);
                GenericDataAccess.AddStoredProcedureParameter(comm, "@SystemCode", systemCode, DbType.String);
                GenericDataAccess.AddStoredProcedureParameter(comm, "@SubSystemCode", subSystemCode, DbType.String);
                name = GenericDataAccess.ExecuteScalar(comm);
            }
            catch { }
            return name;
        }

        //[HttpGet]
        //public string NumberToWord(double number)
        //{
        //    string word = Security.NumberWriter.WriteNumber(LanguageCulture.Arabic, "E.P", number, "3");
        //    return word;

        //}

        #endregion

        //[HttpGet]
        //public IEnumerable<A_ACCOUNT> SelectAccounts(int CompCode)
        //{
        //    //InvEntities db = new InvEntities();
        //    var model = from acc in db.A_ACCOUNT
        //                where acc.COMP_CODE == CompCode
        //                select acc;
        //    return model;
        //}

        [HttpGet]
        public string GetAppSettings(string key)
        {
            var result =
                System.Configuration.ConfigurationManager.AppSettings[key];

            return result;
        }

        [HttpGet]
        public ResponseResult CalculatepriceAct(int _Id)
        {
            ResponseResult result = new ResponseResult();
            var db = new PMSEntities();
            result.ResponseState = true;
            if (result.ResponseState == true)
            {
                db.PProc_CalculateActivityprice(_Id);
            }
            return result;
        }

        [HttpGet]
        public ResponseResult CostCalcolation(int _Id)
        {
            ResponseResult result = new ResponseResult();
            var db = new PMSEntities();
            result.ResponseState = true;
            if (result.ResponseState == true)
            {
                db.PProc_Sales_OfferCostCalculation(_Id);
            }
            return result;
        }

        [HttpGet]
        public ResponseResult workSchdule_Authorize(int _Id)
        {
            ResponseResult result = new ResponseResult();
            var db = new PMSEntities();
            result.ResponseState = true;
            if (result.ResponseState == true)
            {
                db.PProc_EngWorkSchedualAuthorize(_Id);
            }
            return result;
        }
     
         [HttpGet]
        public ResponseResult EngSubServiceOrderReopen(int _Id)
        {
            ResponseResult result = new ResponseResult();
            var db = new PMSEntities();
            result.ResponseState = true;
            if (result.ResponseState == true)
            {
                db.PProc_Eng_ServiceOrderReopen(_Id);
            }
            return result;
        }
        [HttpGet]
        public ResponseResult workSchdule_Reopen(int _Id)
        {
            ResponseResult result = new ResponseResult();
            var db = new PMSEntities();
            result.ResponseState = true;
            if (result.ResponseState == true)
            {
                db.PProc_EngWorkSchedualReopen(_Id);
            }
            return result;
        }
        [HttpGet]
        public ResponseResult workSchdule_UnAuthorize(int _Id)
        {
            ResponseResult result = new ResponseResult();
            var db = new PMSEntities();
            result.ResponseState = true;
            if (result.ResponseState == true)
            {
                db.PProc_EngWorkSchedualUnAuthorize(_Id);
            }
            return result;
        }

        [HttpGet]
        public ResponseResult workSchdule_Requirements(int _Id)
        {
            ResponseResult result = new ResponseResult();
            var db = new PMSEntities();
            result.ResponseState = true;
            if (result.ResponseState == true)
            {
                db.PProc_BuildWorkSchedulaRequirment(_Id);
            }
            return result;
        }

        [HttpGet]
        public ResponseResult ProcessAuthorize(int _Id)
        {
            ResponseResult result = new ResponseResult();
            var db = new PMSEntities();
            result.ResponseState = true;
            if (result.ResponseState == true)
            {
                db.PProc_Sales_OfferStartWork(_Id);
            }
            return result;
        }

        [HttpGet]
        public string GetSubSystem()
        {
            var query = "SELECT * FROM [dbo].[GetSystemsSubsByUserCode] ('safe') WHERE SYSTEM_CODE = 'P' AND[Access] = 1 ";
            var _Result = db.Database.SqlQuery<GetSystemsSubsByUserCode_Result>(query).ToList<GetSystemsSubsByUserCode_Result>().ToJsonString();
            return _Result;
        }
        [HttpGet]
        public string GetEngMonitorScheduleLabourClass(int? ClasId, int? engId,
          int? ProjId, int? phaseId, int? schId)
        {
            var res = db.PProc_EngMonitorScheduleLabourClass(ClasId,
                engId, ProjId, phaseId, schId).ToList().ToJsonString();
            return res;
        }

        [HttpGet]
        public string GetEngMonitorScheduleLabour(int? ClasId, int? engId,
          int? ProjId, int? phaseId, int? schId, int? catId, int? status)
        {
            var res = db.PProc_EngMonitorScheduleLabour(ClasId,
                engId, ProjId, phaseId, schId, catId, status).ToList().ToJsonString();
            return res;
        }

        [HttpGet]
        public string GetEngMonitorScheduleEquip(int? ClasId, int? engId,
          int? ProjId, int? phaseId, int? schId, int? status)
        {
            var res = db.PProc_EngMonitorScheduleEquip(ClasId,
                engId, ProjId, phaseId, schId, status).ToList().ToJsonString();
            return res;
        }

        [HttpGet]
        public int chechDate(int comCode, int braCode, string date)
        {
            ObjectParameter op = new ObjectParameter("Res", typeof(int));
            db.PPrc_CheckDate(comCode, braCode, date, op);
            return int.Parse(op.Value.ToString());
        }

        [HttpGet]
        public string PPrc_Res_MaterialRequired(int? Projectid, int? phaseID)
        {
            var res = db.PPrc_Res_MaterialRequired(Projectid, phaseID).ToList().ToJsonString();
            return res;
        }

        [HttpGet]
        public string GetMaterialissueReturn(string schaduleId, string SubServiceOrderId)
        {
            Nullable<int> _schaduleId;
            Nullable<int> _SubServiceOrderId;
            if (int.Parse(schaduleId) == 0)
            {
                _schaduleId = null;
            }
            else
            {
                _schaduleId = int.Parse(schaduleId);
            }

            if (int.Parse(SubServiceOrderId) == 0)
            {
                _SubServiceOrderId = null;
            }
            else
            {
                _SubServiceOrderId = int.Parse(SubServiceOrderId);
            }

            var res = db.PProc_ResGetMaterialissueReturn(_schaduleId, _SubServiceOrderId).ToList().ToJsonString();
            return res;
        }


        //[HttpGet]
        //public string GetEngMonitorScheduleLabourClass(int? ClasId, int? engId,
        //    int? ProjId, int? phaseId, int? schId)
        //{
        //    var res = db.PProc_EngMonitorScheduleLabourClass(ClasId,
        //        engId, ProjId, phaseId, schId).ToList().ToJsonString();
        //    return res;
        //}

        //[HttpGet]
        //public string GetEngMonitorScheduleLabour(int? ClasId, int? engId,
        //  int? ProjId, int? phaseId, int? schId, int? catId, int? status)
        //{
        //    var res = db.PProc_EngMonitorScheduleLabour(ClasId,
        //        engId, ProjId, phaseId, schId, catId, status).ToList().ToJsonString();
        //    return res;
        //}

        //Img Functins
        [HttpPost, AllowAnonymous]
        public IHttpActionResult UploadImage()
        {
            if (HttpContext.Current.Request.Files.AllKeys.Any())
            {
                try
                {
                    var httpPostedFile = HttpContext.Current.Request.Files["UploadedImage"];
                    var Comp = HttpContext.Current.Request.Files["Comp"];
                    var Branch = HttpContext.Current.Request.Files["Branch"];
                    var MouleCode = HttpContext.Current.Request.Files["MouleCode"];

                    if (httpPostedFile != null)
                    {
                        string strPath = GetPath(Comp.FileName, Branch.FileName, MouleCode.FileName, httpPostedFile.FileName, null, true);
                        var fileSavePath = GetPath(Comp.FileName, Branch.FileName, MouleCode.FileName, httpPostedFile.FileName, "1", false);

                        if (Directory.Exists(strPath))
                        {
                            DirectoryInfo d = new DirectoryInfo(strPath);
                            FileInfo[] Files = d.GetFiles(httpPostedFile.FileName + "_*.Jpg");
                            if (Files.Count() == 0)
                            {
                                httpPostedFile.SaveAs(fileSavePath);
                            }
                            else
                            {
                                int _NewSerial = GetMax(Files) + 1;
                                string NewImgPath = GetPath(Comp.FileName, Branch.FileName, MouleCode.FileName, httpPostedFile.FileName, _NewSerial.ToString(), false);
                                httpPostedFile.SaveAs(NewImgPath);
                            }
                        }
                        else
                        {
                            DirectoryInfo di = Directory.CreateDirectory(strPath);
                            httpPostedFile.SaveAs(fileSavePath);
                        }
                    }
                }
                catch (Exception ex)
                {
                    return Ok(new BaseResponse(ex.Message));
                }
            }
            return Ok();
        }
        public int GetMax(FileInfo[] Files)
        {
            char[] _ = { '_' };
            char[] _Jpg = { '.' };
            List<int> num = new List<int>();
            foreach (FileInfo file in Files)
            {
                string _Serial = file.Name.Split(_)[1].Split(_Jpg)[0];
                num.Add(int.Parse(_Serial));
            }
            return num.Max();
        }
        public string GetPath(string Comp, string Branch, string ModuleCode, string TrNo, string NewSerial, Boolean PathFolderOnly)
        {
            string result = "";
            string ArchivePath = db.Database.SqlQuery<string>("select ImgPath from P_Control where CompCode = " + Comp + " and BraCode = " + Branch).FirstOrDefault();
            //string ArchivePath = db.P_Control.Where(x => x.CompCode == int.Parse(Comp) && x.BraCode == int.Parse(Branch)).FirstOrDefault().ImgPath;// @"D:/PMSImage/";
            string strPath = ArchivePath + Comp + "/" + Branch + "/" + ModuleCode + "/";
            string strImgName = TrNo + "_" + NewSerial + ".Jpg";
            string _Path = Path.Combine(strPath, strImgName);
            switch (PathFolderOnly)
            {
                case true:
                    result = strPath;
                    break;
                case false:
                    result = _Path;
                    break;
            }
            return result;
        }
        [HttpGet, AllowAnonymous]
        public IHttpActionResult GetImgCountForCurrentTrNo(string Comp, string Branch, string ModuleCode, string TrNo)
        {
            if (ModelState.IsValid)
            {
                string strPath = GetPath(Comp, Branch, ModuleCode, TrNo, null, true);
                DirectoryInfo d = new DirectoryInfo(strPath);
                FileInfo[] Files = d.GetFiles(TrNo + "_*.Jpg");
                return Ok(new BaseResponse(Files.Count().ToString()));
            }
            return BadRequest();
        }
        [HttpGet, AllowAnonymous]
        public IHttpActionResult GetImgListForCurentTrNo(string Comp, string Branch, string ModuleCode, string TrNo)
        {
            if (ModelState.IsValid)
            {
                string strPath = GetPath(Comp, Branch, ModuleCode, TrNo, null, true);
                if (Directory.Exists(strPath))
                {
                    DirectoryInfo d = new DirectoryInfo(strPath);
                    FileInfo[] Files = d.GetFiles(TrNo + "_*.Jpg");
                    char[] _ = { '_' };
                    char[] _Jpg = { '.' };
                    Dictionary<int, string> dic = new Dictionary<int, string>();
                    List<string> str = new List<string>();
                    List<ImgPath> img = new List<ImgPath>();
                    //List<int> num = new List<int>();
                    foreach (FileInfo file in Files)
                    {
                        using (Image image = Image.FromFile(strPath + file.Name))
                        {
                            using (MemoryStream m = new MemoryStream())
                            {
                                image.Save(m, image.RawFormat);
                                byte[] imageBytes = m.ToArray();

                                // Convert byte[] to Base64 String
                                string base64String = Convert.ToBase64String(imageBytes);
                                //return base64String;
                                str.Add("data:image/jpeg;base64," + base64String);
                                img.Add(new ImgPath { ID = 0, Name = strPath + file.Name, IncodeImg = "data:image/jpeg;base64," + base64String });
                            }
                        }

                    }
                    return Ok(new BaseResponse(img));
                }
                else
                {
                    BaseResponse res = new BaseResponse();
                    res.IsSuccess = false;
                    return Ok(res);
                }
            }
            return BadRequest();
        }

        [HttpPost, AllowAnonymous]
        public IHttpActionResult DeleteImg([FromBody]string ImgPath)
        {
            if (File.Exists(ImgPath))
            {
                File.Delete(ImgPath);
                return Ok(new BaseResponse());
            }
            return BadRequest();
        }

        [HttpGet]
        public string GetIndex(int id, string idField, string TableName, string Condition)
        {
            if (!string.IsNullOrEmpty(Condition))
                Condition = "where " + Condition;

            string Columns = string.Empty;
            string cols = string.Empty;
            if (Columns == "")
                cols = "*";
            else
                cols = Columns;
            string cond = " Where " + idField + "  = " + id.ToString();


            var SqlStatment = "Select top 1 RowNum  From (Select Row_Number() Over (Order By (" + idField + ")) As RowNum ," + idField + " From " + TableName + " " + Condition + ") t2" + cond;

            string result = this.ExecuteScalar(SqlStatment);

            return result;
        }

        [HttpGet]
        public object GetIndex(int index, string TableName, string Condition)
        {
            var Columns = string.Empty;

            string cols = string.Empty;
            if (Columns == "")
                cols = "*";
            else
                cols = Columns;
            string cond = String.IsNullOrEmpty(Condition) ? " Where RowNum = " + index.ToString() :
                " where RowNum = " + index.ToString() + " And " + Condition;
            string _Condition = string.IsNullOrEmpty(Condition) ? "" : " where " + Condition;
            var SqlStatment = "Select * From (Select Row_Number() Over (Order By (select 0)) As RowNum, *  From " + TableName + _Condition + ") t2" + cond;

            var result = this.Get<object>(SqlStatment);
            return result.FirstOrDefault();


        }

        [HttpGet]
        public IHttpActionResult GetMaxImagesize(int comp, int bracode)
        {
            if (ModelState.IsValid)
            {
                return Ok(new BaseResponse(db.P_Control.Where(x => x.CompCode == comp && x.BraCode == bracode).FirstOrDefault(). MaxImagesize));
            }
            return BadRequest();
        }
        [HttpGet]
        public IHttpActionResult GetSessiontimeout(int comp, int bracode)
        {
            if (ModelState.IsValid)
            {
                return Ok(new BaseResponse(db.P_Control.Where(x => x.CompCode == comp && x.BraCode == bracode).FirstOrDefault().DashBoardPeriodinSec));
            }
            return BadRequest();
        }
    }

}




