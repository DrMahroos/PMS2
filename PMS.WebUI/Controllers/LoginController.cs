using Newtonsoft.Json;
using PMS.ServiceConnector.Models;
using PMS.ServiceConnector.Tools;
using PMS.WebUI.Models.CustomModels;
using PMS.WebUI.Tools;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Configuration;
using System.Web.Mvc;

namespace PMS.WebUI.Controllers
{
    public class LoginController : Controller
    {
        SystemTools sys = new SystemTools();
        DbEntities db = new DbEntities();

        // GET: Login

        public ActionResult LoginIndex()
        {
            SessionRecord ses = new SessionRecord();
            ses.CurrentYear = WebConfigurationManager.AppSettings["DefaultYear"];
            ses.Language = WebConfigurationManager.AppSettings["Defaultlanguage"];
            SessionManager.SessionRecord = ses;

            //SystemEnvironment sysEnv = new SystemEnvironment();
            //sysEnv.CurrentYear = WebConfigurationManager.AppSettings["DefaultYear"];
            //sysEnv.Language = WebConfigurationManager.AppSettings["DefaultYear"];

            return View();

        }

        public JsonResult LoginSubmit(G_USERS User)
        {
            List<G_USERS> data = new List<G_USERS>();
            sys.SetSelectedYear(SessionManager.SessionRecord.CurrentYear);
            try
            {
                var result = sys.Login(User.USER_CODE, User.USER_PASSWORD);
                data.Add(result);

                SessionManager.Me = result;
                SessionManager.SessionRecord.UserCode = result.USER_CODE;

                return Json(new { result = data }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                Exception error = ex.InnerException;
                data = new List<G_USERS>();
                return Json(new { result = data }, JsonRequestBehavior.AllowGet);
            }
        }

        public JsonResult GetBranchsUser(string userCode, int compCode)
        {
            var query = db.GQ_GetUserBranch
                 .Where(brn => brn.COMP_CODE == compCode & brn.USER_CODE == userCode & brn.EXECUTE == true)
                 .Result();
            return Shared.JsonObject(query);
        }

        public JsonResult GetSubSystem(string user, string sys )
        {
            var query = db.GQ_GetUserSubsystem
              .Where(brn => brn.SYSTEM_CODE == sys & brn.USER_CODE == user & brn.EXECUTE == true)
              .Result();
            return Shared.JsonObject(query);

            //RestClient rest = new RestClient();
            //List<GetSystemsSubsByUserCode_Result> _Result = JsonConvert.DeserializeObject<List<GetSystemsSubsByUserCode_Result>>(rest.GetData<string>("SystemTools", "GetSubSystem"));
            //return Json(new { result = _Result }, JsonRequestBehavior.AllowGet);
        }

        public ActionResult UnderConstruction()
        {
            return View();
        }

        //public JsonResult GetBranchs(int compCode)
        //{
        //    string userCode = SessionManager.Me.USER_CODE;
        //    //int compCode = int.Parse(SessionManager.SessionRecord.CompCode);
        //    var myBranches = db.G_USER_BRANCH.Where(f => f.USER_CODE == userCode && f.COMP_CODE == compCode).Result();
        //    var branches = db.G_BRANCH.Where(f => f.COMP_CODE == compCode).Result();

        //    var result = from brn in branches
        //                 join ubrn in myBranches
        //                 on brn.BRA_CODE equals ubrn.BRA_CODE
        //                 select brn;
        //    //var app = sys.GetAppSettings(userCode);
        //    return Json(new { result = result }, JsonRequestBehavior.AllowGet);
        //}

        public JsonResult GetCompanies()
        {
            string userCode = SessionManager.Me.USER_CODE;
            
            string SystemCode = WebConfigurationManager.AppSettings["SystemCode"];
            string SubSystemCode = WebConfigurationManager.AppSettings["SubSystemCode"];

            var app = sys.GetAppSettings(userCode, SystemCode, SubSystemCode);
            SessionManager.SessionRecord.CompanyName = app.CompanyEnglishDescription;
            SessionManager.SessionRecord.CompanyNameAr = app.CompanyArabicDescription;
            List<SystemParameters> data = new List<SystemParameters>
            {
                app
            };
            return Json(new { result = data }, JsonRequestBehavior.AllowGet);
        }

        public JsonResult OnLogged()
        {
            //SessionManager.SessionRecord.Language = session.Language;
            //SessionManager.SessionRecord.ScreenLanguage = SessionManager.SessionRecord.Language;
            //SessionManager.SessionRecord.CompCode = session.CompCode;
            //SessionManager.SessionRecord.BranchCode = session.BranchCode;
            //SessionManager.SessionRecord.CurrentYear = session.CurrentYear;

            var obj = new
            {
                url = Url.Action("HomeIndex", "Home")
                //Session = SessionManager.SessionRecord
            };
            var result = Shared.JsonObject(obj);
            return result;
        }

        public JsonResult GetUserModules()
        {
            var result = db.G_USER_MODULE.Where(f => f.USER_CODE == SessionManager.Me.USER_CODE).Result();
            return Shared.JsonObject(result);
        }


    }
}