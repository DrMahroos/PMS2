using PMS.ServiceConnector.Models;
using PMS.ServiceConnector.Tools;
using PMS.WebUI.Models;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Web;
using System.Web.Mvc;

namespace PMS.WebUI.Controllers
{
    public class SessionController : Controller
    {
        public void SetMe(string value)
        {
            SessionManager.Me = JsonConvert.DeserializeObject<G_USERS>(value);
        }
        public JsonResult GetMe()
        {
            return Shared.JsonObject(SessionManager.Me);
        }

        //public void SetCurrentUserModule(string value)
        //{
        //    SessionManager.CurrentUserModule = JsonConvert.DeserializeObject<PMS.ServiceConnector.Tools.UserPrivilege>(value);
        //}

        //public JsonResult GetCurrentUserModule()
        //{
        //    return Shared.JsonObject(SessionManager.CurrentUserModule);
        //}

        public void SetSessionRecord(string value)
        {
            SessionManager.SessionRecord = JsonConvert.DeserializeObject<SessionRecord>(value);
        }
        public JsonResult GetSessionRecord()
        {
            return Shared.JsonObject(SessionManager.SessionRecord);
        }
        public void SetPageIndex(string value)
        {
            SessionManager.PageIndex = int.Parse(value);
        }
        public JsonResult GetPageIndex()
        {
            return Shared.JsonObject(SessionManager.PageIndex);
        }

        public void SetModelCount(string value)
        {
            SessionManager.ModelCount = int.Parse(value);
        }
        public JsonResult GetModelCount()
        {
            return Shared.JsonObject(SessionManager.ModelCount);
        }
        public void SetP_Control(string value)
        {
            Session["P_Control"] = value.ToJsonObject<P_Control>();
        }
        public JsonResult GetP_Control()
        {
            return Shared.JsonObject(Session["P_Control"] as P_Control);
        }
        public void SetSessionRecordValue(string propertyName, string value)
        {
            if (propertyName == null)
                return;
            PropertyInfo property = typeof(SessionRecord).GetProperty(propertyName);
            property.SetValue(SessionManager.SessionRecord, value);
        }
        public JsonResult GetSessionRecordValue(string propertyName)
        {
            if (propertyName == null)
                return Shared.JsonObject("");
            PropertyInfo property = typeof(SessionRecord).GetProperty(propertyName);
            var value = property.GetValue(SessionManager.SessionRecord);
            return Shared.JsonObject(value);
        }

    }
}