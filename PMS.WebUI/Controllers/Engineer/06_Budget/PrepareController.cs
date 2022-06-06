using Newtonsoft.Json;
using PMS.ServiceConnector.Models;
using PMS.ServiceConnector.Tools;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace PMS.WebUI.Controllers.Engineer._06_Budget
{
    public class PrepareController : Controller
    {
        DbEntities db = new DbEntities();
        int comCode = int.Parse(SessionManager.SessionRecord.CompCode);
        int BraCode = int.Parse(SessionManager.SessionRecord.BranchCode);

        // GET: Prepare
        public ActionResult PrepareIndex()
        {
            return View(Path.Prepare);
        }

        public JsonResult InsertActGrid(P_G_Budget JsonData)
        {
            var result = db.P_G_Budget.InsertEntity(JsonData);
            return Shared.JsonObject(result);
        }
        public JsonResult UpdateActGrid(P_G_Budget JsonData)
        {
            var result = db.P_G_Budget.UpdateEntity(JsonData);
            return Shared.JsonObject(result);
        }
        public JsonResult DeleteActGrid(int id)
        {
            var obj = db.P_G_Budget.Where(x => x.BudjetID == id).First();
            var result = db.P_G_Budget.DeleteEntity(obj);
            return Shared.JsonObject(result);
        }

        public JsonResult GetActivityByID(int id)
        {
            var _result = db.PQ_GetEngProjectActivity.Where(x => x.ProjectPhaseItemActivId == id).First();
            return Json(new { result = _result }, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetProjectPhaseByID(int id)
        {
            var _result = db.PQ_GetEngProjectPhase.Where(x => x.ProjectPhaseId == id).First();
            return Json(new { result = _result }, JsonRequestBehavior.AllowGet);
        }

        public JsonResult GetEngBudgetEngineer(string Siteengineerid, string BranchCode, string LoginYear, string Month)
        {
            RestClient rest = new RestClient();
            Dictionary<string, string> DicList = new Dictionary<string, string>();
            DicList.Add("Siteengineerid", Siteengineerid);
            DicList.Add("BranchCode", BranchCode);
            DicList.Add("LoginYear", LoginYear);
            DicList.Add("Month", Month);
            var _result = rest.Get<List<PProc_Eng_BudgetEngineer_Result>>("P_G_Budget", "GetEngBudgetEngineer", DicList);

            return Json(new { result = _result }, JsonRequestBehavior.AllowGet);

        }
        public JsonResult GetEngBudgetEngineerActiv(string Siteengineerid, string BranchCode, string LoginYear, string Month)
        {
            RestClient rest = new RestClient();
            Dictionary<string, string> DicList = new Dictionary<string, string>();
            DicList.Add("Siteengineerid", Siteengineerid);
            DicList.Add("BranchCode", BranchCode);
            DicList.Add("LoginYear", LoginYear);
            DicList.Add("Month", Month);
            var _result = rest.Get<List<PProc_Eng_BudgetEngineerActiv_Result>>("P_G_Budget", "GetEngBudgetEngineerActiv", DicList);
            return Json(new { result = _result }, JsonRequestBehavior.AllowGet);
        }

    }
}