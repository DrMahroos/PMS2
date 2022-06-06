using PMS.ServiceConnector.Models;
using PMS.ServiceConnector.Tools;
using PMS.WebUI.Tools;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace PMS.WebUI.Controllers.Sales._03_SalesOperations
{
    public class StartOfWorkController : Controller, IController<P_TR_SalesOffer>
    {
        DbEntities db = new DbEntities();
        int comCode = int.Parse(SessionManager.SessionRecord.CompCode);
        int braCode = int.Parse(SessionManager.SessionRecord.BranchCode);

        public JsonResult Add()
        {
            throw new NotImplementedException();
        }

        public JsonResult Delete(P_TR_SalesOffer entity)
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

        public JsonResult GetByIndex(int? index = null)
        {
            var model = db.PQ_GetSalesOffer.Where(x=>x.CompCode == comCode && x.BraCode == braCode).ByIndex(SessionManager.PageIndex, "OfferID");
            return Shared.JsonObject(model);
        }

        public JsonResult GetModelCount()
        {
            throw new NotImplementedException();
        }

        public JsonResult Insert(P_TR_SalesOffer entity)
        {
            throw new NotImplementedException();
        }

        public JsonResult InsertAll(P_TR_SalesOffer master, string json)
        {
            throw new NotImplementedException();
        }

        public JsonResult OnSearchSelect(string id)
        {
            throw new NotImplementedException();
        }

        // GET: StartOfWork
        public ActionResult StartOfWorkIndex()
        {
            SessionManager.PageIndex = 0;
            SessionManager.ModelCount = db.P_TR_SalesOffer.Where(x => x.CompCode == comCode && x.BraCode == braCode).Count();
            return View(Path.StartOfWork);
        }

        public JsonResult Undo()
        {
            throw new NotImplementedException();
        }

        public JsonResult Update(P_TR_SalesOffer entity)
        {
            var result = db.P_TR_SalesOffer.UpdateEntity(entity);
            if (result.ResponseState == true)
            {
                SessionManager.ModelCount = db.P_TR_SalesOffer.Where(x => x.CompCode == comCode && x.BraCode == braCode).Count();
                SessionManager.PageIndex = 0;
            }
            return Shared.JsonObject(result);
        }

        public JsonResult getBranchName(int id)
        {
            var result = db.G_BRANCH.Where(x => x.BRA_CODE == id).First();
            return Shared.JsonObject(result);
        }

        public JsonResult GetByID(int? _OfferID)
        {
            var model = db.PQ_GetSalesOffer.Where(f => f.OfferID == _OfferID).First();
            return Shared.JsonObject(model);
        }

        public JsonResult getArea(int id)
        {
            var model = db.G_BRANCH.Where(f => f.BRA_CODE== id).First();
            return Shared.JsonObject(model);
        }

        public JsonResult getProjects(int id)
        {
            var model = db.P_TR_EngProject.Where(f => f.ProjectID== id).First();
            return Shared.JsonObject(model);
        }
        public JsonResult getProjectsCode(string code,string comp,string bra)
        {
            var model = db.P_TR_EngProject.Where(f => f.ProjectCode == code && f.CompCode==Convert.ToInt32( comp) && f.BraCode== Convert.ToInt32(bra)).First();
            return Shared.JsonObject(model);
        }
        public JsonResult getProjectphases(int projId)
        {
            var model = db.P_TR_EngProjectPhase.Where(x=>x.ProjectID == projId).Result();
            return Shared.JsonObject(model);
        }

        public JsonResult UpdateStartWork(P_TR_SalesOffer entity)
        {
            var result = db.P_TR_SalesOffer.UpdateEntity(entity);
            if (result.ResponseState == true)
            {
                SessionManager.ModelCount = db.P_TR_SalesOffer.Where(x => x.CompCode == comCode && x.BraCode == braCode).Count();
                SessionManager.PageIndex = 0;
            }
            return Shared.JsonObject(result);
        }

        public void ProcessAuthorize(int _Id)
        {
            SystemTools sys = new SystemTools();
            sys.ProcessAuthorize(_Id);
        }
    }
}