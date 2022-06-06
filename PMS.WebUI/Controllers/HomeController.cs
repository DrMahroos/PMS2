using Newtonsoft.Json;
using PMS.ServiceConnector.Models;
using PMS.ServiceConnector.Tools;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using PMS.WebUI.Tools;
using PMS.WebUI.Filter;

namespace PMS.WebUI.Controllers
{
    [AuthorizeUserAttribute()]
    public class HomeController : Controller
    {
        SystemTools tool = new SystemTools();
        DbEntities db = new DbEntities();
        // GET: Home
        public ActionResult HomeIndexPackage()
        {
            string _Index = "HomeIndex";
            if (HttpContext.Request.Cookies["PMS_systemProperties"] != null && HttpContext.Request.Cookies["PMS_systemProperties"].Value != "null")
            {
                string systemProperties = HttpContext.Request.Cookies["PMS_systemProperties"].Value.ToString();
                string main = HttpContext.Request.Cookies["main"].Value.ToString();
                SessionRecord _SessionRcord = JsonConvert.DeserializeObject<SessionRecord>(systemProperties);
                SystemEnvironment _SystemEnvironment = JsonConvert.DeserializeObject<SystemEnvironment>(main);

                if (_SessionRcord.SubSystemCode == "DEF")
                {
                    _Index = "HomeIndex";
                }
                else if (_SessionRcord.SubSystemCode == "SLS")
                {
                    _Index = "HomeSalesIndex";
                }
                else if (_SessionRcord.SubSystemCode == "ENG")
                {
                    _Index = "HomeEngineerIndex";
                }
                else if (_SessionRcord.SubSystemCode == "RES")
                {
                    _Index = "HomeResourceIndex";
                }
                else if (_SessionRcord.SubSystemCode == "REP")
                {
                    _Index = "HomeMonitoringIndex";
                }
                else if (_SessionRcord.SubSystemCode == "DSS")
                {
                    _Index = "DecisionSupportIndex";
                }

                SessionManager.SessionRecord = _SessionRcord;
                SessionManager.Me = tool.Login(_SessionRcord.UserCode, _SystemEnvironment.Password);
            }
            Session["ErrorUrl"] = Url.Action("LoginIndex", "Login");
            Session["PMS_systemProperties"] = SessionManager.SessionRecord;
            return View(_Index);
        }

        public ActionResult HomeIndex()
        {
            SessionRecord session = SessionManager.SessionRecord;
            string _Index = "HomeIndex";
            if (session.SubSystemCode == "DEF")
            {
                _Index = "HomeIndex";
            }
            else if (session.SubSystemCode == "SLS")
            {
                _Index = "HomeSalesIndex";
            }
            else if (session.SubSystemCode == "ENG")
            {
                _Index = "HomeEngineerIndex";
            }
            else if (session.SubSystemCode == "RES")
            {
                _Index = "HomeResourceIndex";
            }
            else if (session.SubSystemCode == "REP")
            {
                _Index = "HomeMonitoringIndex";
            }
            else if (session.SubSystemCode == "DSS")
            {
                _Index = "DecisionSupportIndex";
            }

            Session["ErrorUrl"] = Url.Action("LoginIndex", "Login");
            ViewData["lang"] = SessionManager.SessionRecord.ScreenLanguage;

            Session["PMS_systemProperties"] = SessionManager.SessionRecord;

            return View(_Index);
        }

        public ActionResult HomeSalesIndex()
        {
            Session["ErrorUrl"] = Url.Action("LoginIndex", "Login");
            ViewData["lang"] = SessionManager.SessionRecord.ScreenLanguage;

            Session["PMS_systemProperties"] = SessionManager.SessionRecord;

            return View();
        }

        public ActionResult HomeEngineerIndex()
        {
            Session["ErrorUrl"] = Url.Action("LoginIndex", "Login");
            ViewData["lang"] = SessionManager.SessionRecord.ScreenLanguage;

            Session["PMS_systemProperties"] = SessionManager.SessionRecord;

            return View();
        }

        public JsonResult GetSystemProperties()
        {
            SessionRecord jsonObject = (SessionRecord)Session["PMS_systemProperties"];
            string data = Newtonsoft.Json.JsonConvert.SerializeObject(jsonObject, Newtonsoft.Json.Formatting.Indented);
            return Shared.JsonObject(data);
        }

        public ActionResult Logout()
        {
            //SessionManager.CurrentUserModule = null;
            SessionManager.Me = null;
            SessionManager.ModelCount = 0;
            SessionManager.PageIndex = 0;
            SessionManager.SessionRecord = null;

            return RedirectToAction("Loginindex", "Login");
        }

        public ViewResult Help()
        {
            return View();
        }

    }
}