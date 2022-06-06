using PMS.ServiceConnector.Models;
using PMS.ServiceConnector.Tools;
using PMS.WebUI.Tools;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace PMS.WebUI.Controllers
{
    public class UsersSettingController : Controller, IMasterManyDetails<G_USER_MODULE>
    {
        DbEntities db = new DbEntities();
        int comCode = int.Parse(SessionManager.SessionRecord.CompCode);
        int BraCode = int.Parse(SessionManager.SessionRecord.BranchCode);
        // GET: G_USERS
        public ActionResult UsersSettingIndex()
        {
            SessionManager.PageIndex = 0;
            SessionManager.ModelCount = db.G_USERS.Where(x => x.CompCode == comCode).Count();
            return View(Path.UsersSetting);
        }

        public JsonResult GetByIndex(int? index = null)
        {
            var model = db.G_USERS.ByIndex(SessionManager.PageIndex);
            return Shared.JsonObject(model);
        }

        public JsonResult GetByuserCode(string userCode)
        {
            var model = db.G_USERS.Where(x=>x.USER_CODE == userCode).First();
            return Shared.JsonObject(model);
        }

        public JsonResult LoadDetails(string userCode)
        {
            var result = db.GQ_GetUserModule.Where(f => f.USER_CODE == userCode).Result();
            return Shared.JsonObject(result);
        }

        public JsonResult LoadSubSystemDetails(string userCode)
        {
            var result = db.GQ_GetUserSubsystem.Where(f => f.USER_CODE == userCode).Result();
            return Shared.JsonObject(result);
        }

        public JsonResult LoadUserBranchDetails(string userCode)
        {
            var result = db.GQ_GetUserBranch.Where(f => f.USER_CODE == userCode).Result();
            return Shared.JsonObject(result);
        }

        public JsonResult Insert(string JsonData)
        {
            throw new NotImplementedException();
        }
        
        public JsonResult Update(string JsonData)
        {
            throw new NotImplementedException();
        }
        

        public JsonResult Add()
        {
            throw new NotImplementedException();
        }

        public JsonResult Delete(G_USER_MODULE entity)
        {
            throw new NotImplementedException();
        }

        public JsonResult DeleteAll(string json)
        {
            throw new NotImplementedException();
        }

        public void Edit()
        {
            throw new NotImplementedException();
        }

        public JsonResult Find()
        {
            throw new NotImplementedException();
        }
        public JsonResult GetModelCount()
        {
            throw new NotImplementedException();
        }
        public JsonResult InsertAll(G_USER_MODULE master, string json)
        {
            throw new NotImplementedException();
        }

        public JsonResult OnSearchSelect(string id)
        {
            throw new NotImplementedException();
        }

        public JsonResult Undo()
        {
            throw new NotImplementedException();
        }
    }
}