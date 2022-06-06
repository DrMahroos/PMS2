using PMS.ServiceConnector.Models;
using PMS.ServiceConnector.Models.Entities;
using PMS.ServiceConnector.Tools;
using PMS.WebUI.Tools;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace PMS.WebUI.Controllers
{
    public class ControlController : Controller, IController<P_Control>
    {
        DbEntities db = new DbEntities();
        int comCode = int.Parse(SessionManager.SessionRecord.CompCode);

        public JsonResult Add()
        {
            throw new NotImplementedException();
        }

        public JsonResult Delete(P_Control entity)
        {
            var result = db.P_Control.DeleteEntity(entity);
            if (result.ResponseState == true)
            {
                SessionManager.ModelCount = db.P_Control.Where(x => x.CompCode == comCode).Count();
                SessionManager.PageIndex = 0;
            }
            return Shared.JsonObject(result);
        }

        public JsonResult DeleteAll(string json)
        {
            throw new NotImplementedException();
        }

        // GET: Department

        public ActionResult ControlIndex()
        {
            if (SessionManager.Me == null)
                return RedirectToAction("LoginIndex", "login");
            SessionManager.PageIndex = 1;
            SessionManager.ModelCount = db.P_Control.Where(x => x.CompCode == comCode).Count();
            return View();
        }

        public void Edit()
        {
            throw new NotImplementedException();
        }

        public JsonResult Find()
        {
            throw new NotImplementedException();
        }

        public JsonResult GetByIndex(int? index = default(int?))
        {
            var model = db.P_Control.Where(x => x.CompCode == comCode).ByIndex(SessionManager.PageIndex);
            return Shared.JsonObject(model);
        }


        public JsonResult GetModelCount()
        {
            throw new NotImplementedException();
        }

        public JsonResult Insert(P_Control entity)
        {
            var result = db.P_Control.InsertEntity(entity);
            if (result.ResponseState == true)
            {
                SessionManager.ModelCount = db.P_Control.Count();
                SessionManager.PageIndex = 0;
            }
            return Shared.JsonObject(result);
        }
        public JsonResult Update(P_Control entity)
        {
            var result = db.P_Control.UpdateEntity(entity);
            if (result.ResponseState == true)
            {
                //SessionManager.ModelCount = db.B_D_Employee.Count();
                //SessionManager.PageIndex = 0;
            }
            return Shared.JsonObject(result);
        }

        public JsonResult InsertAll(P_Control master, string json)
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



        public JsonResult GetData()
        {
            int _comCode = 1;
            var result = db.P_Control.Where(f => f.CompCode == _comCode).First();
            return Shared.JsonObject(result);
        }



    }
}