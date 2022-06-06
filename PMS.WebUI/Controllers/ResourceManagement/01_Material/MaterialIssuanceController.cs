using PMS.ServiceConnector.Models;
using PMS.ServiceConnector.Models.Entities;
using PMS.ServiceConnector.Tools;
using PMS.WebUI.Tools;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace PMS.WebUI.Controllers.ResourceManagement._01_Material
{
    public class MaterialIssuanceController : Controller, IController<P_TR_ResMaterialIssue>
    {
        DbEntities db = new DbEntities();
        int comCode = int.Parse(SessionManager.SessionRecord.CompCode);
        int braCode = int.Parse(SessionManager.SessionRecord.BranchCode);
        
        public JsonResult GetByIndex(int? index = null)
        {
            var model = db.PQ_GetResMaterialIssue.Where(x => x.CompCode == comCode && x.BraCode == braCode).ByIndex(SessionManager.PageIndex, "IssueMaterialId");
            return Shared.JsonObject(model);
        }
        public JsonResult Insert(P_TR_ResMaterialIssue entity)
        {
            throw new NotImplementedException();
        }
        // GET: MaterialIssuance
        public ActionResult MaterialIssuanceIndex()
        {
            SessionManager.PageIndex = 0;
            SessionManager.ModelCount = db.PQ_GetResMaterialIssue.Where(x => x.CompCode == comCode && x.BraCode == braCode).Count();
            return View(Path.MaterialIssuance);
        }
        public JsonResult Update(P_TR_ResMaterialIssue entity)
        {
            throw new NotImplementedException();
        }
        public JsonResult LoadDetails(int id)
        {
            var res = db.PQ_GetResMaterialIssueDetails.Where(x => x.IssueMaterialId == id).Result();
            return Shared.JsonObject(res);
        }
        public JsonResult GetRequestById(int id)
        {
            var res = db.PQ_GetResMaterialIssue.Where(x => x.IssueMaterialId == id).First();
            return Shared.JsonObject(res);
        }
        #region
        public JsonResult InsertAll(P_TR_ResMaterialIssue master, string json)
        {
            throw new NotImplementedException();
        }
        public JsonResult Add()
        {
            throw new NotImplementedException();
        }
        public JsonResult Delete(P_TR_ResMaterialIssue entity)
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