using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using PMS.ServiceConnector.Models;
using PMS.ServiceConnector.Tools;
using PMS.WebUI.Filter;
using PMS.WebUI.Models.CustomModels;
using PMS.WebUI.Tools;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Web;
using System.Web.Mvc;

namespace PMS.WebUI.Controllers.Engineer
{
    [AuthorizeUserAttribute()]
    public class ProjectSpecificationController : Controller, IMasterManyDetails<P_TR_EngProjectPhase>
    {
        DbEntities db = new DbEntities();
        int comCode = int.Parse(SessionManager.SessionRecord.CompCode);
        int BraCode = int.Parse(SessionManager.SessionRecord.BranchCode);
        // GET: ProjectSpecification
        public ActionResult ProjectSpecificationIndex()
        {
            SessionManager.PageIndex = 0;
            SessionManager.ModelCount = db.PQ_GetEngProjectPhase.Where(x => x.CompCode == comCode && x.BraCode == BraCode).Count();
            return View(Path.ProjectSpecification);
        }
        public JsonResult GetByIndex(int? index = default(int?))
        {
            var model = db.PQ_GetEngProjectPhase.Where(x => x.CompCode == comCode && x.BraCode == BraCode).ByIndex(SessionManager.PageIndex, "ProjectPhaseId");
            return Shared.JsonObject(model);

        }
        public JsonResult Insert(string JsonData)
        {
            M_D_EngSpcDetails obj = JsonConvert.DeserializeObject<M_D_EngSpcDetails>(JsonData);
            var result = db.P_TR_EngProjectPhase.InsertMasterDetails(obj.P_TR_EngProjectPhase, obj.P_TR_EngProjectItem);
            if (result.ResponseState == true)
            {
                SessionManager.ModelCount = db.PQ_GetEngProjectPhase.Where(x => x.CompCode == comCode && x.BraCode == BraCode).Count();
            }
            return Shared.JsonObject(result);
        }
        public JsonResult Update(string JsonData)
        {
            M_D_EngSpcDetails obj = JsonConvert.DeserializeObject<M_D_EngSpcDetails>(JsonData);
            var result = db.P_TR_EngProjectPhase.UpdateMasterDetails(obj.P_TR_EngProjectPhase, obj.P_TR_EngProjectItem);
            if (result.ResponseState == true)
            {
                SessionManager.ModelCount = db.PQ_GetEngProjectPhase.Where(x => x.CompCode == comCode && x.BraCode == BraCode).Count();
            }
            return Shared.JsonObject(result);
        }
        public JsonResult Delete(P_TR_EngProjectPhase entity)
        {
            throw new NotImplementedException();
        }
        public JsonResult LoadDetails(int id)
        {
            M_D_EngSpcDetailsView _View = new M_D_EngSpcDetailsView();
            _View.PQ_GetEngProjectItem = db.PQ_GetEngProjectItem.Where(x => x.ProjectPhaseId == id).Result().ToList();
            _View.PQ_GetEngProjectActivity = db.PQ_GetEngProjectActivity.Where(i => i.ProjectPhaseId == id).Result().ToList();
            return Json(_View, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetEngProjectActivity(int id)
        {
            var _Act = db.PQ_GetEngProjectActivity.Where(i => i.ProjectPhaseItemId == id).Result().ToList();
            return Json( new {result = _Act }, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetByID(int? id)
        {
            var model = db.P_TR_EngProjectPhase.Where(f => f.ProjectPhaseId == id).First();
            return Shared.JsonObject(model);
        }

        public JsonResult GetProjectByID(int id)
        {
            var model = db.P_TR_EngProject.Where(f => f.ProjectID == id).First();
            return Shared.JsonObject(model);
        }
        public JsonResult Print(int id)
        {
            Reports rep = new Reports();
            rep.AddParameter("IssueToCcReturnID", id);
            string result = rep.GetReportUrl("IssueToCcReturn_Order");
            return Shared.JsonObject(result);
        }
        //custom
        public JsonResult GetCostCenterByID(string Code)
        {
            var model = db.G_COST_CENTER.Where(c => c.CC_CODE == Code).First();
            return Shared.JsonObject(model);
        }
        public JsonResult InsertItems(P_TR_EngProjectItem entity)
        {
            var result = db.P_TR_EngProjectItem.InsertEntity(entity);
            return Shared.JsonObject(result);
        }
        public JsonResult UpdateItems(P_TR_EngProjectItem entity)
        {
            ResponseResult _ResponseResult = new ResponseResult();
            RestClient res = new RestClient();
            if (entity.ProjectPhaseId == null) // Delete item 
            {
                decimal tot = res.Get("P_TR_EngProjectPhase", "GetTotalFromEngProjectActivity", "id=" + entity.ProjectPhaseItemId);
                if (tot > 0)
                {
                    _ResponseResult.ResponseMessage = "item is used in Billing , Can't change phase";
                    _ResponseResult.ResponseState = false;
                    return Shared.JsonObject(_ResponseResult);
                }

            }
            // update item and activity 

            //var _Act = db.P_T
            var result = db.P_TR_EngProjectItem.UpdateEntity(entity);
            if (result.ResponseState == true)
            {
                var Activity = db.P_TR_EngProjectActivity.Where(x => x.ProjectPhaseItemId == entity.ProjectPhaseItemId).Result();
                foreach (var item in Activity)
                {
                    item.ProjectPhaseItemId = entity.ProjectPhaseItemId;
                    item.ProjectPhaseId = entity.ProjectPhaseId;
                    db.P_TR_EngProjectActivity.UpdateEntity(item);
                }
            }
            //Update P_TR_EngProjectActivity set ProjectPhaseId = entity.ProjectPhaseId  where [ProjectPhaseItemId] = entity.ProjectPhaseItemId
            return Shared.JsonObject(result);
            


        }
        public JsonResult DeleteItems(P_TR_EngProjectItem entity)
        {
            var _CountItems = db.P_TR_EngProjectItem.Where(e => e.ProjectPhaseId == entity.ProjectPhaseId).Count();
            var result = db.P_TR_EngProjectItem.DeleteEntity(entity);
            return Shared.JsonObject(false);
        }

        public JsonResult GetProjectItem(int id)
        {
            var result = db.P_TR_EngProjectItem.Where(i => i.ProjectPhaseItemId == id).Result();
            return Shared.JsonObject(result);
        }
        public JsonResult GetProjectItemFromViwe(int id)
        {
            var result = db.PQ_GetEngProjectItem.Where(i => i.ProjectPhaseItemId == id).Result();
            return Shared.JsonObject(result);
        }

        #region Not Used
        public JsonResult Add()
        {
            throw new NotImplementedException();
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
        public JsonResult GetModelCount()
        {
            throw new NotImplementedException();
        }
        public JsonResult InsertAll(P_TR_EngProjectPhase master, string json)
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
        #endregion   
    }
}