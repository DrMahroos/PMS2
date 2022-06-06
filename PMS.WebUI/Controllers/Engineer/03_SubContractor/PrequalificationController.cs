using Newtonsoft.Json;
using PMS.ServiceConnector.Models;
using PMS.ServiceConnector.Tools;
using PMS.WebUI.Filter;
using PMS.WebUI.Models.CustomModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace PMS.WebUI.Controllers.Engineer._03_SubContractor
{
    [AuthorizeUserAttribute()]
    public class PrequalificationController : Controller
    {
        DbEntities db = new DbEntities();
        int comCode = int.Parse(SessionManager.SessionRecord.CompCode);
        int braCode = int.Parse(SessionManager.SessionRecord.BranchCode);
        // GET: Prequalification
        public ActionResult PrequalificationIndex()
        {
            Session["ScopeItems"] = new List<P_D_SubCandidateScope>();
            if (SessionManager.Me==null)
            {
                return RedirectToAction("LoginIndex", "login");
            }
            SessionManager.PageIndex = 0;
            SessionManager.ModelCount = db.P_D_SubCandidate.Where(x => x.CompCode == comCode).Count();
            return View(Path.Prequalification);
        }

        public void AssignDetails(P_D_SubCandidateScope obj)
        {
            List<P_D_SubCandidateScope> lst = Session["ScopeItems"] as List<P_D_SubCandidateScope>;
            lst.Add(obj);
            Session["ScopeItems"] = lst;
        }
        public JsonResult SubCandidateList(int id)
        {
            var result = db.P_D_SubCandidate.Where(x => x.SubContractorID == id).First();
            return Shared.JsonObject(result);
        }

        public JsonResult getSubCandidateScopeList(int id)
        {
            var res = db.PQ_GetEngSubCandidateScope.Where(x => x.CandidateID == id).Result();
            return Shared.JsonObject(res);
        }

        public JsonResult getAllSubCandidate()
        {
            var result = db.P_D_SubCandidate.Result();
            return Shared.JsonObject(result);
        }

        public JsonResult getArea(int id)
        {
            var result = db.G_BRANCH.Where(x => x.BRA_CODE == id).First();
            return Shared.JsonObject(result);
        }

        public JsonResult GetByIndex(int? index = null)
        {
            var model = db.P_D_SubCandidate.Where(x => x.CompCode == comCode).ByIndex(SessionManager.PageIndex);
            return Shared.JsonObject(model);
        }

        public JsonResult findScope(int id)
        {
            var result = db.P_D_Scope.Where(x => x.ScopeID == id).First();
            return Shared.JsonObject(result);
        }
        public JsonResult Update(string JsonData)
        {
            M_D_SubCandidate obj = JsonConvert.DeserializeObject<M_D_SubCandidate>(JsonData);
            M_D_SubCandidate _MasterDetailSubCandidate = new M_D_SubCandidate();
            _MasterDetailSubCandidate.P_subCandidate = obj.P_subCandidate;
            _MasterDetailSubCandidate.P_D_SubCandidateScope = obj.P_D_SubCandidateScope as List<P_D_SubCandidateScope>;

            var result = db.P_D_SubCandidate.UpdateMasterDetails
               (_MasterDetailSubCandidate.P_subCandidate, _MasterDetailSubCandidate.P_D_SubCandidateScope);

            if (result.ResponseState == true)
            {
                SessionManager.ModelCount = db.P_D_SubCandidate.Where(x => x.CompCode == comCode).Count();
            }

            return Shared.JsonObject(result);
        }

        public JsonResult Insert(string jsonData)
        {
            M_D_SubCandidate obj = JsonConvert.DeserializeObject<M_D_SubCandidate>(jsonData);
            M_D_SubCandidate _MasterDetailSubCandidate = new M_D_SubCandidate();
            _MasterDetailSubCandidate.P_subCandidate = obj.P_subCandidate;
            _MasterDetailSubCandidate.P_D_SubCandidateScope = obj.P_D_SubCandidateScope as List<P_D_SubCandidateScope> ;

            var result = db.P_D_SubCandidate.InsertMasterDetails
                (_MasterDetailSubCandidate.P_subCandidate, _MasterDetailSubCandidate.P_D_SubCandidateScope);

            if (result.ResponseState==true)
            {
                SessionManager.ModelCount= db.P_D_SubCandidate.Where(x => x.CompCode == comCode).Count();
            }

            return Shared.JsonObject(result);
        }

        //public JsonResult Delete(P_D_SubCandidate entity)
        //{
        //    var result = db.P_D_SubCandidate.DeleteEntity(entity);
        //    if (result.ResponseState == true)
        //    {
        //        SessionManager.ModelCount = db.P_D_SubCandidate.Count();
        //        SessionManager.PageIndex = 0;
        //    }
        //    return Shared.JsonObject(result);
        //    //  return Shared.JsonObject(result);
        //}
    }
}