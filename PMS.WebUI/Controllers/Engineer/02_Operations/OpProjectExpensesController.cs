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

namespace PMS.WebUI.Controllers
{
    [AuthorizeUserAttribute()]
    public class OpProjectExpensesController : Controller
    {
        DbEntities db = new DbEntities();
        int comCode = int.Parse(SessionManager.SessionRecord.CompCode);
        int braCode = int.Parse(SessionManager.SessionRecord.BranchCode);
        // GET: OpProjectExpenses
        public ActionResult OpProjectExpensesIndex()
        {
            if (SessionManager.Me == null)
            {
                return RedirectToAction("LoginIndex", "login");
            }
            SessionManager.PageIndex = 0;
            SessionManager.ModelCount = db.PQ_GetEngExpenses.Where(x => x.CompCode == comCode && x.BraCode == braCode).Count();
            return View(Path.OpProjectExpenses);
        }

        public JsonResult GetExpensesById(int id)
        {
            var result = db.PQ_GetEngExpenses.Where(x => x.ExpensesEntryId == id).First();
            return Shared.JsonObject(result);
        }

        public JsonResult GetProjectByID(int id)
        {
            var result = db.P_TR_EngProject.Where(x => x.ProjectID == id).First();
            return Shared.JsonObject(result);
        }

        public JsonResult GetExpensesDetailsList(int id)
        {
            var res = db.PQ_GetEngExpensesDetail.Where(x => x.ExpensesEntryId == id).Result();
            return Shared.JsonObject(res);
        }

        public JsonResult GetPDExpencesByID(int id )
        {
            var _result = db.P_D_Expences.Where(x=>x.ExpencesID == id).First();
            return Shared.JsonObject(_result);
        }

        public JsonResult GetProjectPhaseByID(int id)
        {
            var _result = db.P_TR_EngProjectPhase.Where(x=>x.ProjectPhaseId == id).First();
            return Shared.JsonObject(_result);
        }

        public JsonResult Add()
        {
            throw new NotImplementedException();
        }

        public JsonResult GetAllExpensesMaster()
        {
            var result = db.PQ_GetEngExpenses.Result();
            return Shared.JsonObject(result);
        }

        public JsonResult Delete(P_TR_EngExpensesEntry entity)
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

        public JsonResult GetByIndex(int? index = default(int?))
        {
            var model = db.PQ_GetEngExpenses.Where(x => x.CompCode == comCode && x.BraCode == braCode).ByIndex(SessionManager.PageIndex, "ExpensesEntryId");
            return Shared.JsonObject(model);
        }

        public JsonResult GetModelCount()
        {
            throw new NotImplementedException();
        }

        public JsonResult Insert(string jsonData)
        {
            M_D_Expenses obj = JsonConvert.DeserializeObject<M_D_Expenses>(jsonData);
            M_D_Expenses _MasterDetailExpenses = new M_D_Expenses();
            _MasterDetailExpenses.P_TR_EngExpensesEntry = obj.P_TR_EngExpensesEntry;
            _MasterDetailExpenses.P_TR_EngExpensesEntryDetail = obj.P_TR_EngExpensesEntryDetail as List<P_TR_EngExpensesEntryDetail>;

            var result = db.P_TR_EngExpensesEntry.InsertMasterDetails
               (_MasterDetailExpenses.P_TR_EngExpensesEntry, _MasterDetailExpenses.P_TR_EngExpensesEntryDetail);

            if (result.ResponseState == true)
            {
                SessionManager.ModelCount = db.P_TR_EngExpensesEntry.Where(x => x.CompCode == comCode && x.BraCode == braCode).Count();
            }

            return Shared.JsonObject(result);
        }

        public JsonResult InsertAll(P_TR_EngExpensesEntry master, string json)
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

        public JsonResult Update(string JsonData)
        {
            M_D_Expenses obj = JsonConvert.DeserializeObject<M_D_Expenses>(JsonData);
            M_D_Expenses _MasterDetailExpenses = new M_D_Expenses();
            _MasterDetailExpenses.P_TR_EngExpensesEntry = obj.P_TR_EngExpensesEntry;
            _MasterDetailExpenses.P_TR_EngExpensesEntryDetail = obj.P_TR_EngExpensesEntryDetail as List<P_TR_EngExpensesEntryDetail>;

            var result = db.P_TR_EngExpensesEntry.UpdateMasterDetails
               (_MasterDetailExpenses.P_TR_EngExpensesEntry, _MasterDetailExpenses.P_TR_EngExpensesEntryDetail);

            if (result.ResponseState == true)
            {
                SessionManager.ModelCount = db.P_TR_EngExpensesEntry.Where(x => x.CompCode == comCode && x.BraCode == braCode).Count();
            }

            return Shared.JsonObject(result);
        }

    }
}