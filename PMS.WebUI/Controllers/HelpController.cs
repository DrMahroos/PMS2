using PMS.ServiceConnector.Models;
using PMS.ServiceConnector.Models.Entities;
using PMS.ServiceConnector.Tools;
using PMS.WebUI.Tools;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;

namespace PMS.WebUI.Controllers
{
    public class HelpController : Controller
    {
        DbEntities db = new DbEntities();
        public JsonResult GetHelp(string ModuleCode)
        {

            var model = db.G_ModuleHelp.Where(x => x.MODULE_CODE == ModuleCode).First();
            return Shared.JsonObject(model);
        }
    }
}