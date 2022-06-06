using PMS.ServiceConnector.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace PMS.WebUI.Controllers.Engineer._05_Reports
{
    public class EquipmentmovementController : Controller
    {
        DbEntities db = new DbEntities();
        public ActionResult EquipmentmovementIndex()
        {
            return View(Path.Equipmentmovement);
        }
        public JsonResult GetSearchFromEquipment(int id)
        {

            var result = db.P_D_Equipment.Where(x => x.EquimentID == id).First();
            return Shared.JsonObject(result);
        }
        public JsonResult GetSrchEquipmentClass(int id)
        {

            var result = db.P_D_EquipmentClass.Where(x => x.EquipClassId == id).First();
            return Shared.JsonObject(result);
        }

        public JsonResult GetSrchCustomerCat(int id)
        {

            var result = db.P_D_SalesCustomerCategory.Where(x => x.CustomerCategoryID == id).First();
            return Shared.JsonObject(result);
        }
        public JsonResult GetLaborClass(int id)
        {

            var result = db.P_D_LaborClass.Where(x => x.LaborClassId == id).First();
            return Shared.JsonObject(result);

        }
        public JsonResult GetCustomer(int id)
        {

            var result = db.P_D_SalesCustomer.Where(x => x.CustomerID == id).First();
            return Shared.JsonObject(result);
        }
        public JsonResult GetScopeClass(int id)
        {

            var result = db.P_D_Scope.Where(x => x.ScopeID == id).First();
            return Shared.JsonObject(result);
        }


        public JsonResult GetToEquipment(int id)
        {

            var result = db.P_D_Equipment.Where(x => x.EquimentID == id).First();
            return Shared.JsonObject(result);
        }

        public JsonResult GetEquipmentClass(int id)
        {
            var result = db.P_D_EquipmentClass.Where(x => x.EquipClassId == id).First();
            return Shared.JsonObject(result);
        }
    }
}