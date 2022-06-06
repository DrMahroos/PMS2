using Newtonsoft.Json;
using PMS.ServiceConnector.Models;
using PMS.ServiceConnector.Tools;
using PMS.WebUI.Filter;
using PMS.WebUI.Models.CustomModels;
using PMS.WebUI.Tools;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace PMS.WebUI.Controllers.Engineer._01_Projects
{
    [AuthorizeUserAttribute()]
    public class ProjectvaliationController : Controller, IMasterManyDetails<P_TR_EngVariation>
    {
        DbEntities db = new DbEntities();
        int comCode = int.Parse(SessionManager.SessionRecord.CompCode);
        int BraCode = int.Parse(SessionManager.SessionRecord.BranchCode);

        // GET: ProjectChange
        public ActionResult ProjectvaliationIndex()
        {
            SessionManager.PageIndex = 0;
            SessionManager.ModelCount = db.PQ_GetEngVariation.Where(x => x.CompCode == comCode && x.BraCode == BraCode).Count();
            return View(Path.Projectvaliation);
        }

        public JsonResult GetByIndex(int? index = null)
        {
            var model = db.PQ_GetEngVariation.Where(x => x.CompCode == comCode && x.BraCode == BraCode).ByIndex(SessionManager.PageIndex, "VariationId");
            return Shared.JsonObject(model);
        }

        public JsonResult Insert(string JsonData)
        {
            M_D_EngVariation obj = JsonConvert.DeserializeObject<M_D_EngVariation>(JsonData);
            M_D_EngVariation _MasterDetailVariation= new M_D_EngVariation();
            _MasterDetailVariation.P_TR_EngVariation = obj.P_TR_EngVariation;
            _MasterDetailVariation.P_TR_EngVariationItemDetail = obj.P_TR_EngVariationItemDetail as List<P_TR_EngVariationItem>;
            _MasterDetailVariation.P_TR_EngVariationActivityDetial = obj.P_TR_EngVariationActivityDetial as List<P_TR_EngVariationActivity>;

            var result = db.P_TR_EngVariation.InsertMasterManyDetails(_MasterDetailVariation.P_TR_EngVariation, _MasterDetailVariation);
            if (result.ResponseState == true)
            {
                SessionManager.ModelCount = db.P_TR_EngVariation.Where(x => x.CompCode == comCode && x.BraCode == BraCode).Count();
            }
            return Shared.JsonObject(result);
        }

        public JsonResult GetPhaseId(int projectId)
        {
            var res = db.P_TR_EngProjectPhase.Where(x => x.ProjectID == projectId).First();
            return Shared.JsonObject(res);
        }

        public JsonResult Update(string JsonData)
        {
            M_D_EngVariation obj = JsonConvert.DeserializeObject<M_D_EngVariation>(JsonData);
            M_D_EngVariation _MasterDetailVariation = new M_D_EngVariation();
            _MasterDetailVariation.P_TR_EngVariation = obj.P_TR_EngVariation;
            _MasterDetailVariation.P_TR_EngVariationItemDetail = obj.P_TR_EngVariationItemDetail as List<P_TR_EngVariationItem>;
            _MasterDetailVariation.P_TR_EngVariationActivityDetial = obj.P_TR_EngVariationActivityDetial as List<P_TR_EngVariationActivity>;

            var result = db.P_TR_EngVariation.UpdateMasterManyDetails(_MasterDetailVariation.P_TR_EngVariation, _MasterDetailVariation);
            if (result.ResponseState == true)
            {
                SessionManager.ModelCount = db.P_TR_EngVariation.Where(x => x.CompCode == comCode && x.BraCode == BraCode).Count();
            }
            return Shared.JsonObject(result);
        }

        public JsonResult GetProjectItem(int id)
        {
            var res = db.PQ_GetEngProjectItem.Where(x => x.ProjectPhaseItemId == id).First();
            return Shared.JsonObject(res);
        }
        public JsonResult GetProjectItem_New(int trID)
        { 
            RestClient rest = new RestClient();
            Dictionary<string, string> DicList = new Dictionary<string, string>();
            DicList.Add("TrID", trID.ToString());
            var _result = rest.Get<PProc_EngVariationLoadItem_Result>("P_TR_EngVariation", "PProc_EngVariationLoadItem", DicList);
            //return Json(new { result = _result }, JsonRequestBehavior.AllowGet);
            var r = Shared.JsonObject(_result);
            return r;

        }

        public JsonResult GetSalesItem(int id)
        {
            var res = db.PQ_GetSalesItem.Where(x => x.ItemID == id).First();
            return Shared.JsonObject(res);
        }

        public JsonResult GetActivity(int id)
        {
            var res = db.PQ_SrchActivity.Where(x => x.ActivityID == id).First();
            return Shared.JsonObject(res);
        }

        public JsonResult GetProject(int id)
        {
            var res = db.PQ_GetEngProject.Where(x => x.ProjectID == id).First();
            return Shared.JsonObject(res);
        }
        public JsonResult GetVariation(int id)
        {
            var res = db.P_TR_EngVariation.Where(x => x.VariationId == id).First();
            return Shared.JsonObject(res);
        }
        public JsonResult LoadVariatedItems(int id)
        {
            var res = db.PQ_GetEngVariationItem.Where(x => x.VariationId == id).Result();
            return Shared.JsonObject(res);
        }
        public JsonResult LoadVariatedActivity(int id)
        {
            var res = db.PQ_GetEngVariationActivity.Where(x => x.VariationId == id).Result();
            return Shared.JsonObject(res);
        }

        public JsonResult PProc_EngBuildVarientActivity(int trID)
        {
            RestClient rest = new RestClient();
            Dictionary<string, string> DicList = new Dictionary<string, string>();
            DicList.Add("TrID", trID.ToString());
            var _result = rest.Get<int>("P_TR_EngVariation", "PProc_EngBuildVarientActivity", DicList);
            return Json(new { result = _result }, JsonRequestBehavior.AllowGet);
        }
       

        #region
        public JsonResult GetModelCount()
        {
            throw new NotImplementedException();
        }

        public JsonResult Delete(P_TR_EngVariation entity)
        {
            throw new NotImplementedException();
        }

        public JsonResult Add()
        {
            throw new NotImplementedException();
        }

        public void Edit()
        {
            throw new NotImplementedException();
        }

        public JsonResult Undo()
        {
            throw new NotImplementedException();
        }

        public JsonResult Find()
        {
            throw new NotImplementedException();
        }

        public JsonResult OnSearchSelect(string id)
        {
            throw new NotImplementedException();
        }

        public JsonResult InsertAll(P_TR_EngVariation master, string json)
        {
            throw new NotImplementedException();
        }

        public JsonResult DeleteAll(string json)
        {
            throw new NotImplementedException();
        }
        #endregion
    }
}