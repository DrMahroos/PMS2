using PMS.ServiceConnector.Models;
using PMS.ServiceConnector.Tools;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace PMS.WebUI.Controllers
{
    public class CalendarDefinitionController : Controller
    {

        DbEntities db = new DbEntities();
        int comCode = int.Parse(SessionManager.SessionRecord.CompCode);
        int BraCode = int.Parse(SessionManager.SessionRecord.BranchCode);

        // GET: CalendarDefinition
        public ActionResult CalendarDefinitionIndex()
        {
            Session["cal"] = new List<P_D_CalenderDays>();
            SessionManager.PageIndex = 0;
            SessionManager.ModelCount = db.P_D_Calender.Where(x => x.CompCode == comCode).Count();
            return View(Path.CalendarDefinition);
        }
        
        public void AssignDetails(P_D_CalenderDays obj)
        {
            List<P_D_CalenderDays> lst = Session["cal"] as List<P_D_CalenderDays>;
            lst.Add(obj);
            Session["cal"] = lst;
        }

        public JsonResult Insert(P_D_Calender entity)
        {
            List<P_D_CalenderDays> details = Session["cal"] as List<P_D_CalenderDays>;
            var result = db.P_D_Calender.InsertMasterDetails(entity, details);
            if (result.ResponseState == true)
            {
                Session["cal"] = new List<P_D_CalenderDays>();
                SessionManager.ModelCount = db.P_D_Calender.Where(x => x.CompCode == comCode).Count();
            }
            return Shared.JsonObject(result);
        }

        public JsonResult Update(P_D_Calender entity)
        {
            List<P_D_CalenderDays> details = Session["cal"] as List<P_D_CalenderDays>;
            var result = db.P_D_Calender.UpdateMasterDetails(entity, details);
            if (result.ResponseState == true)
            {
                Session["cal"] = new List<P_D_CalenderDays>();
                SessionManager.ModelCount = db.P_D_Calender.Where(x => x.CompCode == comCode).Count();
            }
            return Shared.JsonObject(result);
        }

        public JsonResult GetByID(int? catID)
        {
            var model = db.P_D_Calender.Where(f => f.CalenderID == catID).First();
            return Shared.JsonObject(model);
        }

        public JsonResult GetByIndex(int? index = default(int?))
        {
            var model = db.P_D_Calender.Where(x => x.CompCode == comCode).ByIndex(SessionManager.PageIndex);
            return Shared.JsonObject(model);
        }

        public JsonResult LoadDetails(int id)
        {
            var _Result = db.P_D_CalenderDays.Where(x => x.CalenderID == id).Result();
            return Shared.JsonObject(_Result);
        }
    }
}