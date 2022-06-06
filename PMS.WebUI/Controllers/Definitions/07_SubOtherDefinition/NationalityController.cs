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
    public class NationalityController : Controller, IController<G_Nationality>
    {
        DbEntities db = new DbEntities();
        int comCode = int.Parse(SessionManager.SessionRecord.CompCode);

        public JsonResult Add()
        {
            throw new NotImplementedException();
        }

        public JsonResult Delete(G_Nationality entity)
        {
            int count = db.P_D_SiteEngineer.Where(x => x.NationalityID == entity.NationalityID).Count();
            if (count > 0)
            {
                ResponseResult res = new ResponseResult();
                res.ResponseState = false;
                res.ResponseMessage = "Can't Delete because this item related another data";
                return Json(new { result = res }, JsonRequestBehavior.AllowGet);
            }
            var result = db.G_Nationality.DeleteEntity(entity);
            return Shared.JsonObject(result);
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

        public JsonResult GetByIndex(int? index = null)
        {
            throw new NotImplementedException();
        }

        public JsonResult GetModelCount()
        {
            throw new NotImplementedException();
        }

        public JsonResult Insert(G_Nationality entity)
        {
            var result = db.G_Nationality.InsertEntity(entity);
            if (result.ResponseState == true)
            {
                //SessionManager.ModelCount = db.K_D_Shift.Count();
                //SessionManager.PageIndex = 0;
            }
            return Shared.JsonObject(result);
        }

        public JsonResult InsertAll(G_Nationality master, string json)
        {
            throw new NotImplementedException();
        }

        // GET: Nationality
        public ActionResult NationalityIndex()
        {
            return View(Path.Nationality);
        }

        public JsonResult OnSearchSelect(string id)
        {
            throw new NotImplementedException();
        }

        public JsonResult Undo()
        {
            throw new NotImplementedException();
        }

        public JsonResult Update(G_Nationality entity)
        {
            var result = db.G_Nationality.UpdateEntity(entity);
            if (result.ResponseState == true)
            {
                //SessionManager.ModelCount = db.B_D_Employee.Count();
                //SessionManager.PageIndex = 0;
            }
            return Shared.JsonObject(result);
        }

        // Load G_Nationality
        public JsonResult getNationality()
        {
            var result = db.G_Nationality.Where(x => x.COMP_CODE == comCode).Result();
            return Shared.JsonObject(result);
        }
    }
}