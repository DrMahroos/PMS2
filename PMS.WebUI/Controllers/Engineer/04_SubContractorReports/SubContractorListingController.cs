using Newtonsoft.Json;
using PMS.ServiceConnector.Models;
using PMS.WebUI.Models.CustomModels;
using PMS.ServiceConnector.Models.Entities;
using PMS.ServiceConnector.Tools;
using PMS.WebUI.Tools;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using PMS.WebUI.Filter;

namespace PMS.WebUI.Controllers.Engineer._04_SubContractorReports
{
    [AuthorizeUserAttribute()]
    public class SubContractorListingController : Controller
    {
        // GET: SubContractorListing
        DbEntities db = new DbEntities();

        public ActionResult SubContractorListingIndex()
        {
            return View(Path.SubContractorListing);
        }

        public JsonResult GetSubContractorByID(int id)
        {

            var result = db.P_D_SubContractor.Where(x => x.SubContractorID == id).First();
            return Shared.JsonObject(result);
        }
        public JsonResult GetP_D_SubContractor(int id)
        {

            var result = db.P_D_SubContractor.Where(x => x.SubContractorID == id).First();
            return Shared.JsonObject(result);
        }

        public JsonResult GetEngSubContractorScope(int id)
        {

            var result = db.P_D_Scope.Where(x => x.ScopeID == id).First();
            return Shared.JsonObject(result);
        }

        public JsonResult PrintSubContrList(int OfferID)
        {
            //PRep_sls_OfferSubmittalsAR
            //PRep_sls_OfferSubmittalsEN

            Reports rep = getStandardParameters();
            rep.AddParameter("Offerid", OfferID);
            string url = rep.GetReportUrl("PRep_sls_OfferSubmittals");
            return Shared.JsonObject(url);
        }

        public Reports getStandardParameters()
        {
            SessionRecord sr = PMS.ServiceConnector.Tools.SessionManager.SessionRecord;
            Reports rep = new Reports();

            rep.AddParameter("CompCode", sr.CompCode);
            //rep.AddParameter("bra", sr.BranchCode);
            rep.AddParameter("CompNameA", sr.CompanyNameAr);
            rep.AddParameter("CompNameE", sr.CompanyName);

            if (string.IsNullOrEmpty(sr.BranchName))
            {
                rep.AddParameter("BraNameA", "");
                rep.AddParameter("BraNameE", "");
            }
            else
            {
                rep.AddParameter("BraNameA", sr.BranchName);
                rep.AddParameter("BraNameE", sr.BranchName);
            }
            rep.AddParameter("LoginUser", sr.UserCode);

            return rep;
        }

    }
}