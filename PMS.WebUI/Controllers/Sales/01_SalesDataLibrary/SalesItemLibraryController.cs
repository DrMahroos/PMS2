using Newtonsoft.Json;
using PMS.ServiceConnector.Models;

using PMS.ServiceConnector.Tools;
using PMS.WebUI.Filter;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace PMS.WebUI.Controllers.Sales._01_SalesDataLibrary
{
    [AuthorizeUserAttribute()]
    public class SalesItemLibraryController : Controller
    {
        DbEntities db = new DbEntities();
        int comCode = int.Parse(SessionManager.SessionRecord.CompCode);
        int BraCode = int.Parse(SessionManager.SessionRecord.BranchCode);
        // GET: SalesItemLibrary 
        public ActionResult SalesItemLibraryIndex()
        {
            SessionManager.PageIndex = 0;
            SessionManager.ModelCount = db.P_D_SalesItems.Where(x => x.CompCode == comCode).Count();
            return View(Path.SalesItemLibrary);
        }

        public JsonResult Insert(P_D_SalesItems entity)
        {
            var result = db.P_D_SalesItems.InsertEntity(entity);
            if (result.ResponseState == true)
            {
                SessionManager.ModelCount = db.P_D_SalesItems.Where(x => x.CompCode == comCode).Count();
                SessionManager.PageIndex = 0;
            }
            return Shared.JsonObject(result);
        }

        public JsonResult Update(P_D_SalesItems entity)
        {
            var result = db.P_D_SalesItems.UpdateEntity(entity);
            if (result.ResponseState == true)
            {
                SessionManager.ModelCount = db.P_D_SalesItems.Where(x => x.CompCode == comCode).Count();
            }
            return Shared.JsonObject(result);
        }

        public JsonResult Delete(P_D_SalesItems entity)
        {
            var result = db.P_D_SalesItems.DeleteEntity(entity);
            if (result.ResponseState == true)
            {
                SessionManager.ModelCount = db.P_D_SalesItems.Count();
                SessionManager.PageIndex = 0;
            }
            return Shared.JsonObject(result);
            //  return Shared.JsonObject(result);
        }
        public JsonResult GetByID(int? id)
        {
            var model = db.P_D_SalesItems.Where(f => f.ItemID == id).First();
            return Shared.JsonObject(model);
        }

        public JsonResult GetByIndex(int? index = default(int?))
        {
            var model = db.PQ_GetSalesItem.Where(x => x.CompCode == comCode).ByIndex(SessionManager.PageIndex, "ItemID");
            return Shared.JsonObject(model);
        }

        public JsonResult UomList(int id)
        {
            var result = db.P_D_UOM.Where(x => x.UomID == id).First();
            return Shared.JsonObject(result);
        }

        public JsonResult GetSalesItems(int id)
        {
            var result = db.PQ_GetSalesItem.Where(x => x.ItemID == id).First();
            return Shared.JsonObject(result);
        }

        public JsonResult ScopeList(int id)
        {
            var result = db.P_D_Scope.Where(x => x.ScopeID == id).First();
            return Shared.JsonObject(result);
        }

        public JsonResult GetParentById(int id)
        {
            var result = db.P_D_SalesItems.Where(x => x.ItemID == id).First();
            return Shared.JsonObject(result);
        }

        public JsonResult GetLevel(int id)
        {
            var result = db.P_D_SalesItems.Where(x => x.ItemID == id).First();
            var item = result.ItemLevel + 1;
            return Shared.JsonObject(item);
        }

        public JsonResult findVendor(int id)
        {
            var result = db.I_Pay_Vendor.Where(x => x.VendorID == id).First();
            return Shared.JsonObject(result);
        }

        public JsonResult UpdateParent(int parentid)
        {
            var parent = db.P_D_SalesItems.Where(x => x.ItemID == parentid).First();
            parent.IsDetail = false;
            var result = db.P_D_SalesItems.UpdateEntity(parent);
            if (result.ResponseState == true)
            {
                //SessionManager.ModelCount = db.P_D_Labor.Count();
                //SessionManager.PageIndex = 0;
            }
            return Shared.JsonObject(result);
        }

        public JsonResult GetCountItemSysByCode(string Code)
        {
            var Result = db.P_D_SalesItems.Where(x => x.ItemCode == Code).Count();
            return Json(new { result = Result }, JsonRequestBehavior.AllowGet);
        }
    }
}
