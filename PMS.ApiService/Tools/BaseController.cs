using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using PMS.ApiService.Tools;
using PMS.ApiService.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Threading;
using System.Data.Entity.Core.EntityClient;
using System.Web.Configuration;
using System.Net;
using System.Data.Entity;

namespace PMS.ApiService.Tools
{

    public abstract class BaseController : ApiController
    {

        protected PMSEntities db = new PMSEntities(BuildConnectionString());

        public static string BuildConnectionString()
        {
            SqlConnectionStringBuilder sqlBuilder = new SqlConnectionStringBuilder();
            EntityConnectionStringBuilder entityBuilder = new EntityConnectionStringBuilder();
            // Set the properties for the data source.
            sqlBuilder.DataSource = WebConfigurationManager.AppSettings["ServerName"];
            bool singleDb = Convert.ToBoolean(WebConfigurationManager.AppSettings["singleDb"]);

            if (singleDb == false)
                sqlBuilder.InitialCatalog = WebConfigurationManager.AppSettings["AbsoluteSysDbName"] + Shared.Session.SelectedYear;
            else
                sqlBuilder.InitialCatalog = WebConfigurationManager.AppSettings["AbsoluteSysDbName"];

            sqlBuilder.UserID = WebConfigurationManager.AppSettings["DbUserName"];
            sqlBuilder.Password = WebConfigurationManager.AppSettings["DbPassword"];
            sqlBuilder.IntegratedSecurity = Convert.ToBoolean(WebConfigurationManager.AppSettings["UseIntegratedSecurity"]);
            sqlBuilder.MultipleActiveResultSets = true;
            string providerString = sqlBuilder.ToString();
            entityBuilder.ProviderConnectionString = providerString;
            entityBuilder.Provider = "System.Data.SqlClient";
            entityBuilder.Metadata = @"res://*/Models.SysModel.csdl|res://*/Models.SysModel.ssdl|res://*/Models.SysModel.msl";

            return entityBuilder.ConnectionString;
        }

        protected IEnumerable<T> Get<T>(string SqlStatement)
        {
            string connectionString = db.Database.Connection.ConnectionString;
            SqlStatement = StringFormater.TextCoding.Decrypt(SqlStatement);
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

                    var result = JsonConvert.DeserializeObject<IEnumerable<T>>(JsonConvert.SerializeObject(table));
                    return result;
                }
            }
        }

        protected (TMaster Master, TDetails Details, SessionRecord Session) JObjMasterManyDetails<TMaster, TDetails>(JObject data)
        {
            //var entity = data["Entity"].ToObject<JObject>();
            TMaster master = data["Master"].ToObject<TMaster>();
            TDetails details = data["Details"].ToObject<TDetails>();
            SessionRecord session = data["Session"].ToObject<SessionRecord>();

            return (master, details, session);
        }

        protected (TMaster Master, IEnumerable<TDetails> Details, SessionRecord Session) JObjMasterDetails<TMaster, TDetails>(JObject data)
        {
            //var entity = data["Entity"].ToObject<JObject>();
            TMaster master = data["Master"].ToObject<TMaster>();
            IEnumerable<TDetails> details = data["Details"].ToObject<IEnumerable<TDetails>>();
            SessionRecord session = data["Session"].ToObject<SessionRecord>();

            return (master, details, session);
        }
        /// <summary>
        /// Item1: Entity, Item2: SessionRecord
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="data"></param>
        /// <returns></returns>
        protected (T Entity, SessionRecord Session, IEnumerable<T> Collection) JObjectData<T>(JObject data)
        {

            T obj = default(T);
            IEnumerable<T> collection = default(IEnumerable<T>);

            if (data["Entity"] != null)
                obj = data["Entity"].ToObject<T>();
            if (data["Collection"] != null)
            {
                //var col = data["Collection"].ToString();

                collection = data["Collection"].ToObject<List<T>>();
            }
            SessionRecord session = data["Session"].ToObject<SessionRecord>();
            return (obj, session, collection);
        }
        protected JObject JObjectToObj<T>(T entity, SessionRecord session, IEnumerable<T> collection = null)
        {
            var item = new
            {
                Entity = entity,
                Session = session,
                Collection = collection
            };

            var obj = JObject.Parse(JsonConvert.SerializeObject(item));
            return obj;
        }
        public ResponseResult Execute<T>(JObject obj, ActionTypes action, Func<ActionTypes, JObject, ResponseResult> ProcessAction, PMSEntities _db = null, DbContextTransaction dbTransaction = null) where T : class
        {
            T entity = default(T);
            List<T> collection = default(List<T>);


            if (action == ActionTypes.InsertCollection || action == ActionTypes.DeleteCollection)
                collection = JObjectData<T>(obj).Collection.ToList();
            else
                entity = JObjectData<T>(obj).Entity;

            ResponseResult result = new ResponseResult();
            _db = _db == null ? db : _db;
            try
            {

                var model = _db.Set<T>();

                switch (action)
                {
                    case ActionTypes.Insert:
                        model.Add(entity);
                        break;
                    case ActionTypes.Update:
                        model.Attach(entity);
                        db.Entry(entity).State = System.Data.Entity.EntityState.Modified;
                        break;
                    case ActionTypes.Delete:
                        model.Attach(entity);
                        db.Entry(entity).State = System.Data.Entity.EntityState.Deleted;
                        break;

                    case ActionTypes.InsertCollection:
                        model.AddRange(collection);
                        break;

                    case ActionTypes.DeleteCollection:
                        foreach (var item in collection)
                        {
                            model.Attach(item);
                        }
                        model.RemoveRange(collection);
                        break;
                    default:
                        break;
                }




                _db.SaveChanges();
                var Procobj = JObjectToObj<T>(entity, JObjectData<T>(obj).Session, collection);
                var process = ProcessAction?.Invoke(action, Procobj);
                if (process.ResponseState == true)
                {
                    //dbTransaction.Commit();
                    result.ResponseState = true;
                    result.ResponseData = JsonSerialize(entity);
                }
                else
                {
                    result.ResponseMessage = "Process failed";
                    result.ResponseState = false;
                    dbTransaction.Rollback();
                }
            }
            catch (Exception ex)
            {

                if (ex.InnerException == null)
                    result.ResponseMessage = ex.Message;
                else
                    dbTransaction.Rollback();
                result.ResponseMessage = ex.InnerException.Message;
                result.ResponseState = false;

            }

            return result;

        }

        protected void InitalizeLanguage(string lang)
        {
            Thread.CurrentThread.CurrentUICulture = new System.Globalization.CultureInfo(lang);
        }

        protected string JsonSerialize(object obj)
        {
            JsonSerializerSettings settings = new JsonSerializerSettings();
            settings.ReferenceLoopHandling = ReferenceLoopHandling.Ignore;
            string result = JsonConvert.SerializeObject(obj, Formatting.Indented, settings);
            return result;
        }

        protected T JsonDeserialize<T>(string obj)
        {
            JsonSerializerSettings settings = new JsonSerializerSettings();
            settings.ReferenceLoopHandling = ReferenceLoopHandling.Ignore;
            var objResult = (object)obj;// JsonConvert.DeserializeObject<object[]>(obj, settings);
            var result = JsonConvert.DeserializeObject<T>(objResult.ToString(), settings);
            return result;
        }

        public DateTime GetCurrentDate(int comcode)
        {
            var kControl = db.P_Control.Where(x => x.CompCode == comcode).First();
            DateTime utc = DateTime.UtcNow;
            DateTime res = utc.AddHours(int.Parse(kControl.UserTimeZoneUTCDiff.ToString()));
            return res;
        }
    }
}
