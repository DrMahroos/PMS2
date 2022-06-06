using PMS.ServiceConnector.Models;
using PMS.ServiceConnector.Models.Entities;
using PMS.ServiceConnector.Tools;
using PMS.WebUI.Tools;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace PMS.WebUI.Controllers.Sales._02_ProductionAndBilling
{
    public class SalesManBonusController : Controller 
    {
        DbEntities db = new DbEntities();

     
        // GET: ContractList
        public ActionResult ContractListIndex()
        {
            return View(Path.SalesManBonus);
        }

    }
}