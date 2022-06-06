using PMS.ServiceConnector.Models;
using PMS.ServiceConnector.Models.Entities;
using PMS.ServiceConnector.Tools;
using PMS.WebUI.Tools;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using PMS.WebUI.Models.CustomModels;

namespace PMS.WebUI.Controllers.Sales._01_SalesDataLibrary
{
    public class SalesItemPlanController : Controller, IController<P_D_SalesItems>
    {
        DbEntities db = new DbEntities();
        int comCode = int.Parse(SessionManager.SessionRecord.CompCode);
        int BraCode = int.Parse(SessionManager.SessionRecord.BranchCode);

        // GET: SalesItemPlan
        public ActionResult SalesItemPlanIndex()
        {
            SessionManager.PageIndex = 0;
            SessionManager.ModelCount = db.PQ_GetSalesItem.Where(x => x.CompCode == comCode && x.IsDetail == true).Count();
            return View(Path.SalesItemPlan);
        }

        public JsonResult GetActivityByID(int id)
        {
            var _Result = db.P_D_Activity.Where(x => x.ActivityID == id).First();
            return Shared.JsonObject(_Result);
        }
        public JsonResult GetUomList()
        {
            var _Result = db.P_D_UOM.Result();
            return Shared.JsonObject(_Result);
        }

        public JsonResult GetByIndex(int? index = null)
        {
            var model = db.PQ_GetSalesItem.Where(x=>x.CompCode == comCode && x.IsDetail == true).ByIndex(SessionManager.PageIndex, "ItemID");
            return Shared.JsonObject(model);
        }

        public JsonResult LoadDetails(int itemIid)
        {
            var Result = db.PQ_GETSalesItemActivity.Where(x => x.ItemID == itemIid).Result();
            return Shared.JsonObject(Result);
        }
        public JsonResult loadData(int itmId)
        {
            var Result = db.PQ_GetSalesItem.First();
            return Shared.JsonObject(Result);
        }

        public JsonResult GetSalesItems(int id)
        {
            var Result = db.PQ_GetSalesItem.Where(x => x.ItemID == id).First();
            return Shared.JsonObject(Result);
        }

        public JsonResult UpdatePlan(string JsonData)
        {
            M_D_ItemPlan obj = JsonConvert.DeserializeObject<M_D_ItemPlan>(JsonData);
            M_D_ItemPlan _M_D_Plan = new M_D_ItemPlan();
            _M_D_Plan.P_D_SalesItems = obj.P_D_SalesItems;
            _M_D_Plan.P_D_SalesItemsActivity = obj.P_D_SalesItemsActivity as List<P_D_SalesItemsActivity>;

            var result = db.P_D_SalesItems.UpdateMasterManyDetails(_M_D_Plan.P_D_SalesItems, _M_D_Plan);
            if (result.ResponseState == true)
            {
                SessionManager.ModelCount = db.PQ_GetSalesItem.Where(x => x.CompCode == comCode && x.IsDetail == true).Count();
            }
            return Shared.JsonObject(result);
        }

        public JsonResult Update(P_D_SalesItems entity)
        {
            List<PQ_GETSalesItemActivity> details = Session["SLsAct"] as List<PQ_GETSalesItemActivity>;
            var result = db.P_D_SalesItems.UpdateMasterDetails(entity, details);
            if (result.ResponseState == true)
            {
                //SessionManager.ModelCount = db.PQ_GetSalesItemSystem.Count();
                //SessionManager.PageIndex = 0;
            }
            return Shared.JsonObject(result);
        }

        #region
        public void Edit()
        {
            throw new NotImplementedException();
        }
        public JsonResult Find()
        {
            throw new NotImplementedException();
        }
        public JsonResult Undo()
        {
            throw new NotImplementedException();
        }
        public JsonResult Add()
        {
            throw new NotImplementedException();
        }
        public JsonResult Delete(P_D_SalesItems entity)
        {
            throw new NotImplementedException();
        }
        public JsonResult DeleteAll(string json)
        {
            throw new NotImplementedException();
        }
        public JsonResult GetModelCount()
        {
            throw new NotImplementedException();
        }
        public JsonResult Insert(P_D_SalesItems entity)
        {
            throw new NotImplementedException();
        }
        public JsonResult InsertAll(P_D_SalesItems master, string json)
        {
            throw new NotImplementedException();
        }
        public JsonResult OnSearchSelect(string id)
        {
            throw new NotImplementedException();
        }
        #endregion
    }
}