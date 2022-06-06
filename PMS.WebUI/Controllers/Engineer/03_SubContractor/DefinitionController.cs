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

namespace PMS.WebUI.Controllers.Engineer._03_SubContractor
{
    [AuthorizeUserAttribute()]
    public class DefinitionController : Controller //, IController<P_D_SubContractor>
    {
        DbEntities db = new DbEntities();
        int comCode = int.Parse(SessionManager.SessionRecord.CompCode);
        int braCode = int.Parse(SessionManager.SessionRecord.BranchCode);
        // GET: Definition
        public ActionResult DefinitionIndex()
        {
            Session["ScopeItems"] = new List<P_D_SubContractorScope>();
            if (SessionManager.Me == null)
            {
                return RedirectToAction("LoginIndex", "login");
            }
            SessionManager.PageIndex = 0;
            SessionManager.ModelCount = db.P_D_SubContractor.Where(x => x.CompCode == comCode).Count();
            return View(Path.Definition);
        }
        /// <summary>
        /// get SubContractorScopeList by SubContractor id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public JsonResult GetSubContractorScopeList(int id)
        {
            var res = db.PQ_GetEngSubContractorScope.Where(x => x.SubContractorID == id).Result();
            return Shared.JsonObject(res);
        }
   
        public JsonResult getSubContractor(int id)
        {
            var result = db.P_D_SubContractor.Where(x => x.SubContractorID == id).First();
            return Shared.JsonObject(result);
        }
        public JsonResult getAllSubContractor()
        {
            var result = db.P_D_SubContractor.Result();
            return Shared.JsonObject(result);
        }
        public JsonResult getCandidateCode(int CandidateID)
        {
            var result = db.P_D_SubCandidate.Where(x => x.SubContractorID == CandidateID).First();
            return Shared.JsonObject(result);
        }

        public JsonResult getArea(int id)
        {
            var result = db.G_BRANCH.Where(x => x.BRA_CODE == id).First();
            return Shared.JsonObject(result);
        }

        public JsonResult GetByIndex(int? index = default(int?))
        {
            var model = db.P_D_SubContractor.ByIndex(SessionManager.PageIndex);
            return Shared.JsonObject(model);
        }

        public JsonResult GetModelCount()
        {
            throw new NotImplementedException();
        }

        public JsonResult Insert(P_D_SubContractor entity)
        {
            throw new NotImplementedException();
        }

        public JsonResult Update(string JsonData)
        {
            M_D_SubContractor obj = JsonConvert.DeserializeObject<M_D_SubContractor>(JsonData);
            M_D_SubContractor _MasterDetailSubContractor = new M_D_SubContractor();
            _MasterDetailSubContractor.P_D_SubContractor = obj.P_D_SubContractor as P_D_SubContractor;
            _MasterDetailSubContractor.P_D_SubContractorScope = obj.P_D_SubContractorScope as List<P_D_SubContractorScope>;

            var result = db.P_D_SubContractor.UpdateMasterDetails
               (_MasterDetailSubContractor.P_D_SubContractor, _MasterDetailSubContractor.P_D_SubContractorScope);

            if (result.ResponseState == true)
            {
                SessionManager.ModelCount = db.P_D_SubContractor.Where(x => x.CompCode == comCode).Count();
            }

            return Shared.JsonObject(result);
        }

        public JsonResult findScope(int id)
        {
            var result = db.P_D_Scope.Where(x => x.ScopeID == id).First();
            return Shared.JsonObject(result);
        }

        public JsonResult Delete(P_D_SubContractor entity)
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

        public JsonResult InsertAll(P_D_SubContractor master, string json)
        {
            throw new NotImplementedException();
        }

        public JsonResult DeleteAll(string json)
        {
            throw new NotImplementedException();
        }
    }
}