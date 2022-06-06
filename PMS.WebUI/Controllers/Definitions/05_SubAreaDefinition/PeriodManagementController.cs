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

namespace PMS.WebUI.Controllers
{
    [AuthorizeUserAttribute()]
    public class PeriodManagementController : Controller, IController
    {
        DbEntities db = new DbEntities();
        int comCode = int.Parse(SessionManager.SessionRecord.CompCode);
        int branch = int.Parse(SessionManager.SessionRecord.BranchCode);
        int CurrentYear = int.Parse(SessionManager.SessionRecord.CurrentYear);

        public JsonResult Add()
        {
            throw new NotImplementedException();
        }

        public JsonResult Delete(P_G_Period entity)
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
            var model = db.P_G_Period.Where(x => x.CompCode == comCode).ByIndex(SessionManager.PageIndex);
            return Shared.JsonObject(model);
        }
        //public JsonResult getBranchName(int Branchname)
        //{
        //    var _Result = db.P_G_Period.Where(x => x.CompCode == comCode).First();
        //    return Shared.JsonObject(_Result);
        //}
        public JsonResult GetByBranchName()
        {
            var model = db.G_BRANCH.Where(x => x.COMP_CODE == comCode);
            return Shared.JsonObject(model);
        }

        public JsonResult GetModelCount()
        {
            throw new NotImplementedException();
        }

        public JsonResult Insert(P_G_Period entity)
        {

            throw new NotImplementedException();
        }

        public JsonResult InsertAll(P_G_Period master, string json)
        {
            throw new NotImplementedException();
        }

        public JsonResult OnSearchSelect(string id)
        {
            throw new NotImplementedException();
        }
        public JsonResult LoadDetails(int yearid, int bracode, int compcode)
        {
            
            var res = db.P_G_Period.Where(x => x.YearID == yearid && x.BraCode == bracode && x.CompCode == compcode).Result();
            return Shared.JsonObject(res);
        }

        // GET: PeriodManagement
        public ActionResult PeriodManagementIndex()
        {
            SessionManager.PageIndex = 1;
            SessionManager.ModelCount = 1;
            if (SessionManager.Me == null)
                return RedirectToAction("LoginIndex", "login");
            SessionManager.ModelCount = db.P_G_Period.Where(x => x.CompCode == comCode && x.BraCode == branch).Count();
            return View(Path.PeriodManagement);
        }

        public JsonResult Undo()
        {
            throw new NotImplementedException();
        }
        public JsonResult Update(string JsonData)
        {
           

            List<P_G_Period> obj = JsonConvert.DeserializeObject<List<P_G_Period>>(JsonData);
            //M_D_Period _M_D_Plan = new /*M_D_Period*/();
            P_G_Period Master = new P_G_Period();

            //_M_D_Plan.P_G_PeriodDetail = obj.P_G_PeriodDetail as List<P_G_Period>;
            Master =obj[0];
            var result = db.P_G_Period.UpdateMasterDetails( Master, obj);
            if (result.ResponseState == true)
            {
                //SessionManager.ModelCount = db.P_G_Period.Where(x => x.CompCode == comCode && x.IsDetail == true).Count();
            }
            return Shared.JsonObject(result);
        }

        public JsonResult Open(P_G_Period entity)
        {
            var result = db.P_G_Period.UpdateEntity(entity);
            if (result.ResponseState == true)
            {
                SessionManager.ModelCount = db.P_G_Period.Count();
                SessionManager.PageIndex = 0;
            }
            return Shared.JsonObject(result);
        }
        //public JsonResult Update(P_G_Period entity)
        //{
        //    switch (entity.Closed)
        //    {
        //        case true:
        //                entity.Closed = false;
        //            break;
        //        case false:
        //            entity.Closed = true;
        //            break;

        //    }

        //    var result = db.P_G_Period.UpdateEntity(entity);

        //    return Shared.JsonObject(result);
        //}
        public JsonResult getPeriod()
        {

            var Res = db.P_G_Period.Result().Where(item => item.CompCode == comCode && item.BraCode == branch && item.FromDate.Value.Year == CurrentYear);

            return Shared.JsonObject(Res);
        }

        public JsonResult getArea(int id)
        {
            var result = db.G_BRANCH.Where(x => x.BRA_CODE == id).First();
            return Shared.JsonObject(result);
        }
        public JsonResult MonthCalcProdCost(int PeriodId)
        {
            RestClient rest = new RestClient();
            Dictionary<string, string> DicList = new Dictionary<string, string>();
            DicList.Add("PeriodId", PeriodId.ToString());
            ResponseResult ResResult = new ResponseResult();
            ResResult = rest.Get<ResponseResult>("P_G_Period", "MonthCalcProdCost", DicList);
            return Json(new { result = ResResult }, JsonRequestBehavior.AllowGet);
        }
        public JsonResult MonthClose(int PeriodId)
        {
            RestClient rest = new RestClient();
            Dictionary<string, string> DicList = new Dictionary<string, string>();
            DicList.Add("PeriodId", PeriodId.ToString());
            ResponseResult ResResult = new ResponseResult();
            ResResult = rest.Get<ResponseResult>("P_G_Period", "MonthClose", DicList);
            return Json(new { result = ResResult }, JsonRequestBehavior.AllowGet);
        }
    }

}