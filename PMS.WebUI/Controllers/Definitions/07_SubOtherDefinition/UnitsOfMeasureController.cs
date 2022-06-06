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
    public class UnitsOfMeasureController : Controller, IController<P_D_UOM>
    {
        DbEntities db = new DbEntities();
        int comCode = int.Parse(SessionManager.SessionRecord.CompCode);

        public JsonResult Add()
        {
            throw new NotImplementedException();
        }

        public JsonResult Delete(P_D_UOM entity)
        {
            var result = db.P_D_UOM.DeleteEntity(entity);
            if (result.ResponseState == true)
            {
                //SessionManager.ModelCount = 0; //db.K_D_ExpCateg.Where(x => x.CompCode == comCode).Count();
                //SessionManager.PageIndex = 0;
            }
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

        public JsonResult Insert(P_D_UOM entity)
        {
            var result = db.P_D_UOM.InsertEntity(entity);
            if (result.ResponseState == true)
            {
                //SessionManager.ModelCount = db.K_D_Shift.Count();
                //SessionManager.PageIndex = 0;
            }
            return Shared.JsonObject(result);
        }

        public JsonResult InsertAll(P_D_UOM master, string json)
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

        // GET: UnitsOfMeasure
        public ActionResult UnitsOfMeasureIndex()
        {
            return View(Path.UnitsOfMeasure);
        }

        public JsonResult Update(P_D_UOM entity)
        {
            var result = db.P_D_UOM.UpdateEntity(entity);
            if (result.ResponseState == true)
            {
                //SessionManager.ModelCount = db.B_D_Employee.Count();
                //SessionManager.PageIndex = 0;
            }
            return Shared.JsonObject(result);
        }

        // Load UnitOfMeasure
        public JsonResult getUnitOfMeasure()
        {
            var result = db.P_D_UOM.Where(x => x.CompCode == comCode).Result();
            return Shared.JsonObject(result);
        }
    }
}