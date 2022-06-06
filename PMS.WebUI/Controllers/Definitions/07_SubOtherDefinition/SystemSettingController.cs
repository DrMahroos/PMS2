using PMS.ServiceConnector.Models;
using PMS.ServiceConnector.Tools;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace PMS.WebUI.Controllers
{
    public class SystemSettingController : Controller
    {

        DbEntities db = new DbEntities();
        int comCode = int.Parse(SessionManager.SessionRecord.CompCode);
        int BraCode = int.Parse(SessionManager.SessionRecord.BranchCode);

        // GET: SystemSetting
        public ActionResult SystemSettingIndex()
        {
            return View(Path.SystemSetting);
        }

        public JsonResult Insert(P_D_Calender entity)
        { 
            var result = db.P_D_Calender.InsertEntity(entity);
            if (result.ResponseState == true)
            {
                SessionManager.ModelCount = db.P_D_Calender.Count();
                SessionManager.PageIndex = 0;
            }
            return Shared.JsonObject(result);
        }
    }
}