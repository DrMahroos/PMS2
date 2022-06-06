using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using PMS.ServiceConnector.Models;
using PMS.ServiceConnector.Tools;
using PMS.WebUI.Tools;
using System.Collections;
using static System.Net.Mime.MediaTypeNames;
using PMS.WebUI.Resources;
using System.Resources;
using System.Globalization;
using Newtonsoft.Json;
using System.Configuration;

namespace PMS.WebUI.Controllers
{

    public class ClientToolsController : Controller
    {
        #region Properties
        DbEntities db = new DbEntities();
        private struct ColumnObjectStruct
        {
            public string headerText { get; set; }
            public bool hidden { get; set; }
            public string key { get; set; }
            public string dataType { get; set; }
            public string width { get; set; }
            public bool filterable { get; set; }
        }

        #endregion

        #region Security region (G_USER_MODULE / G_MODULES )

        public JsonResult GetFavorites()
        {
            SessionRecord session = SessionManager.SessionRecord;

            var query = db.GQ_UserFavorite
                .Where(f => f.SYSTEM_CODE == session.SystemCode & f.SUB_SYSTEM_CODE == session.SubSystemCode & f.USER_CODE == session.UserCode)
                .Result();

            var jsonResult = Shared.JsonObject(query);
            return jsonResult;
        }

        public JsonResult CheckModule(string moduleCode)
        {
            var result = db.G_USER_MODULE
                .Where(f => f.USER_CODE == SessionManager.Me.USER_CODE && f.MODULE_CODE == moduleCode)
                .Result();
            return Shared.JsonObject(result);
        }

        public JsonResult CallFunc_GetPrivilage()
        {
            RestClient rest = new RestClient();
            var result = rest.Post<string>("SystemTools", "GetUserPrivilage", "bse");

            Session["User_Privilege"] = Newtonsoft.Json.JsonConvert.DeserializeObject<UserPrivilege>(result);
            //UserPrivilege myPrivilege = (UserPrivilege)Session["User_Privilege"];
            return Shared.JsonObject(result);
        }

        public JsonResult CallFunc_PrivilageUser()
        {
            RestClient rest = new RestClient();
            var result = rest.Post<string>("SystemTools", "GetAllUserPrivilage", "bse");
            return Shared.JsonObject(result);
        }
        #endregion

        #region For Search
        public JsonResult GetUserControl(int code)
        {
            var result = db.P_Control.Where(f => f.CompCode == code).First();
            if (result == null)
            {
                result = new P_Control()
                {
                    CompCode = code
                };
            }

            return Shared.JsonObject(result);
        }
        public JsonResult GetAccByIndex(int Index)
        {
            int compCode = int.Parse(SessionManager.SessionRecord.CompCode);
            var Row = db.A_ACCOUNT
                .Where(f => f.COMP_CODE == compCode)
                .ByIndex(Index + 1);

            return Shared.JsonObject(Row);
        }
        public JsonResult GetAccountByCode(string AccCode)
        {
            var result = db.A_ACCOUNT.Where(f => f.ACC_CODE == AccCode).First();
            return Shared.JsonObject(result);
        }
        public JsonResult GetResourceByName(string key)
        {
            SystemResource.ResourceManager.IgnoreCase = true;
            string result = SystemResource.ResourceManager.GetString(key);
            return Shared.JsonObject(result);
        }
        public JsonResult GetDescByCode(string tableName, string codeField, string codeValue, string descs)
        {
            RestClient rc = new RestClient();

            string result = rc.Get<string>("SystemTools", "GetDesciptionByCode", String.Format("tableName={0}&codeField={1}&codeValue={2}&descs={3}&language={4}", tableName, codeField, codeValue, descs, SessionManager.SessionRecord.ScreenLanguage));

            return Shared.JsonObject(result);
        }
        public JsonResult FindTree(string moduleCode, string Condition, string controlName)
        {
            SystemTools sys = new SystemTools();
            var obj = sys.SearchProperties(moduleCode, controlName);
            if (obj.Settings.DataSourceName == null)
            {
                return Shared.JsonObject(null);
            }
            string cols = string.Empty;

            List<ColumnObjectStruct> columnsObject = new List<ColumnObjectStruct>();
            columnsObject.Add(new ColumnObjectStruct()
            {
                dataType = "number",
                headerText = "",
                hidden = true,
                key = "RowIndex",
                width = "0"
            });

            string comaa = "";
            foreach (G_SearchFormSetting column in obj.Columns)
            {
                if ((column.Language == 0) ||
                    (SessionManager.SessionRecord.ScreenLanguage == "en" && column.Language == 2) ||
                    (SessionManager.SessionRecord.ScreenLanguage == "ar" && column.Language == 1))
                {
                    cols += comaa + column.DataMember + " as " + column.AlternateDataMember;
                    comaa = ",";

                    ColumnObjectStruct colObj = new Controllers.ClientToolsController.ColumnObjectStruct();
                    colObj.dataType = column.Datatype == 0 ? "string" : "number";

                    if (SessionManager.SessionRecord.ScreenLanguage == "en")
                        colObj.headerText = column.FieldTitle;
                    else
                        colObj.headerText = column.FieldTitleA;

                    colObj.hidden = !column.IsReadOnly;
                    colObj.filterable = false;
                    colObj.key = column.DataMember;
                    colObj.width = column.FieldWidth == 0 ? "100px" : (column.FieldWidth.ToString() + "px");

                    columnsObject.Add(colObj);
                }
            }

            string tableName = obj.Settings.DataSourceName;
            string condition = "";

            if (Condition == null || Condition == "")
                condition = "";
            else
                condition = " Where " + Condition;

            string columns = cols;
            string orderBy = obj.Settings.ReturnDataPropertyName;

            var result = sys.Find(tableName, condition, columns, orderBy);

            var resultObject = new
            {
                TableName = tableName,
                Condition = condition,
                DataResult = result,
                Settings = obj.Settings,
                Columns = columnsObject
            };

            var jsonResult = Shared.JsonObject(resultObject);
            return jsonResult;
        }
        public JsonResult Find(string moduleCode, string Condition, string controlName)
        {
            try
            {
                SystemTools sys = new SystemTools();

                var obj = sys.SearchProperties(moduleCode, controlName);
                if (obj.Settings.DataSourceName == null)
                {
                    return Shared.JsonObject(null);
                }
                string cols = string.Empty;

                List<ColumnObjectStruct> columnsObject = new List<ColumnObjectStruct>();
                columnsObject.Add(new ColumnObjectStruct()
                {
                    dataType = "number",
                    headerText = "",
                    hidden = true,
                    key = "RowIndex",
                    width = "0"
                });
                foreach (G_SearchFormSetting column in obj.Columns)
                {
                    if ((column.Language == 0) || (SessionManager.SessionRecord.ScreenLanguage == "en" && column.Language == 2) || (SessionManager.SessionRecord.ScreenLanguage == "ar" && column.Language == 1))
                    {
                        cols += "," + column.AlternateDataMember + " AS " + column.DataMember;
                        ColumnObjectStruct colObj = new Controllers.ClientToolsController.ColumnObjectStruct();
                        colObj.dataType = column.Datatype == 0 ? "string" : "number";// column.Datatype.ToString();
                        if (SessionManager.SessionRecord.ScreenLanguage == "en")
                            colObj.headerText = column.FieldTitle;
                        else
                            colObj.headerText = column.FieldTitleA;

                        colObj.hidden = !column.IsReadOnly;
                        colObj.filterable = false;
                        colObj.key = column.DataMember;
                        colObj.width = column.FieldWidth == 0 ? "100px" : (column.FieldWidth.ToString() + "px");

                        columnsObject.Add(colObj);
                    }
                }

                string tableName = obj.Settings.DataSourceName;
                string condition = "";

                if (Condition == null || Condition == "")
                    condition = "";// "COMP_CODE = " + SessionManager.SessionRecord.CompCode;
                else
                    condition = " Where " + Condition;// + " And COMP_CODE = " + SessionManager.SessionRecord.CompCode;

                string columns = cols.Substring(1);
                string orderBy = obj.Settings.ReturnDataPropertyName;

                var result = sys.Find(tableName, condition, columns, orderBy);

                var resultObject = new
                {
                    TableName = tableName,
                    Condition = condition,
                    DataResult = result,
                    Settings = obj.Settings,
                    Columns = columnsObject

                };
                var jsonResult = Shared.JsonObject(resultObject);
                return jsonResult;
            }
            catch (Exception)
            {
                return Shared.JsonObject(null);
            }
        }
        public void SetScreenLang(string lang)
        {
            SessionManager.SessionRecord.ScreenLanguage = lang;
        }
        public JsonResult GetByIndex(string tableName, string Condition, int index, bool ChangePageIndex)
        {
            SystemTools sys = new SystemTools();
            var result = sys.GetByIndex(tableName, Condition, index);
            var jsonResult = Shared.JsonObject(result);
            if (ChangePageIndex == true)
                SessionManager.PageIndex = index;
            return jsonResult;
        }
        public JsonResult Refilter(string moduleCode, string Condition, string controllerName)
        {
            var result = this.Find(moduleCode, Condition.Replace("Where", ""), controllerName);
            return result;
        }
        public JsonResult GetActionUrl(string actionName, string controllerName)
        {
            string result = Url.Action(actionName, controllerName);
            return Shared.JsonObject(result);
        }
        public JsonResult GetValueFromSession(string key)
        {
            return Shared.JsonObject(Session[key]);
        }
        public JsonResult GetUserNameByCode(string code)
        {
            if (code == null || code == "")
                return Shared.JsonObject("");
            var user = db.G_USERS
                .Where(f => f.USER_CODE == code)
                .Select(f => new
                {
                    f.USER_NAME
                }).Result().First();
            return Shared.JsonObject(user.USER_NAME);
        }
        public JsonResult GetDescription(string tableName, string condition)
        {
            SystemTools sys = new SystemTools();
            var value = sys.GetDescription(tableName, condition);
            return Shared.JsonObject(value);
        }
        public JsonResult GetIndexByUseId(string idValue, string BaseTableName, string idFieldName, string condation)
        {
            SystemTools sys = new SystemTools();
            string _Result = sys.GetIndexByUseId(int.Parse(idValue), BaseTableName, idFieldName, condation);
            return Shared.JsonObject(_Result);
        }
        public JsonResult GetIndexByUseCode(string idValue, string BaseTableName, string idFieldName)
        {
            SystemTools sys = new SystemTools();
            string _Result = sys.GetIndexByUseCode(idValue, BaseTableName, idFieldName);
            return Shared.JsonObject(_Result);
        }

        #endregion

        public JsonResult IsInSession()
        {
            var session = SessionManager.SessionRecord;
            string url = Url.Action("LoginIndex", "Login");

            if (session == null)
            {
                var obj = new
                {
                    Url = url,
                    State = false
                };
                return Shared.JsonObject(obj);
            }
            else
            {
                var objTrue = new
                {
                    Url = "",
                    Sstate = true
                };
                return Shared.JsonObject(objTrue);
            }


        }
        public void SetSession(SessionRecord session)
        {

        }
        public JsonResult GetSession()
        {
            var obj = new
            {
                SessionRecord = SessionManager.SessionRecord,
                Me = SessionManager.Me,
                PageIndex = SessionManager.PageIndex,
                ModelCount = SessionManager.ModelCount
            };
            return Shared.JsonObject(obj);
        }

        public JsonResult SwitchUserFavorite()
        {

            SessionRecord session = SessionManager.SessionRecord;
            var favorits = db.G_USER_FAVORITE.Where(c =>
            c.SYSTEM_CODE == "P" &
            c.SUB_SYSTEM_CODE == session.SubSystemCode &
            c.USER_CODE == session.UserCode &
            c.MODULE_CODE == session.Modulecode).Result();

            int count = favorits.Count();

            if (count == 0)
            {
                G_USER_FAVORITE fav = new G_USER_FAVORITE();
                fav.MODULE_CODE = session.Modulecode;

                fav.OPTIONORDER = 0;
                fav.SUB_SYSTEM_CODE = session.SubSystemCode;// session.SubSystemCode;
                fav.SYSTEM_CODE = "P";// session.SystemCode;
                fav.USER_CODE = session.UserCode;

                db.G_USER_FAVORITE.InsertEntity(fav);
            }
            else
            {
                db.G_USER_FAVORITE.DeleteEntity(favorits.First());
            }

            return GetFavorites();
        }

        public JsonResult ChangePassword(string OldPassword, string NewPassword)
        {
            JsonResult result = new JsonResult();
            SessionRecord session = SessionManager.SessionRecord;

            var user = db.G_USERS.Where(f => f.USER_CODE == session.UserCode).Result().First();

            if (user.USER_PASSWORD != OldPassword)
            {
                result = Shared.JsonObject(false);
                return result;
            }

            user.USER_PASSWORD = NewPassword;
            var r = db.G_USERS.UpdateEntity(user);

            result = Shared.JsonObject(true);
            return result;
        }

        public JsonResult LogOut()
        {
            Session.Clear();
            var obj = Shared.JsonObject(Url.Action("LoginIndex", "Login"));
            return obj;
        }
        public void SetValueToSession(string key, object value)
        {
            Session[key] = value;
        }

        public JsonResult GetBranchsByUserCode(string userCode)
        {
            int compCode = Convert.ToInt32(SessionManager.SessionRecord.CompCode);
            var result = db.GQ_GetUserBranch
                .Where(user => user.USER_CODE == userCode & user.COMP_CODE == compCode)
                .Result();

            return Shared.JsonObject(result);
        }

        public JsonResult GetResourceNames(string _prefix)
        {
            Dictionary<string, string> dicResources = new Dictionary<string, string>();
            ResourceManager MyResourceClass = new ResourceManager(typeof(PMS.WebUI.Resources.SystemResource));

            ResourceSet resourceSet = MyResourceClass.GetResourceSet(CultureInfo.CurrentUICulture, true, true);
            foreach (DictionaryEntry entry in resourceSet)
            {
                if (entry.Key.ToString().Contains(_prefix))
                {
                    string resourceKey = entry.Key.ToString();
                    string resourceValue = entry.Value.ToString();

                    dicResources.Add(resourceKey, resourceValue);
                }
            }
            return Shared.JsonObject(dicResources);
        }

        public JsonResult chechDate(int comCode, int braCode, string date)
        {
            try
            {
                RestClient rest = new RestClient();
                DateTime newDate = Convert.ToDateTime(date);
                Dictionary<string, string> DicList = new Dictionary<string, string>();
                DicList.Add("comCode", comCode.ToString());
                DicList.Add("braCode", braCode.ToString());
                DicList.Add("date", newDate.ToString());
                int _result = rest.Get<int>("SystemTools", "chechDate", DicList);
                return Shared.JsonObject(_result == 1 ? true : false);
            }
            catch
            {
                throw;
            }
        }

        public JsonResult GetURLForUI()
        {
            string urlForUi = ConfigurationManager.AppSettings["URLForUI"];
            return Shared.JsonObject(urlForUi);
        }
    }
}

