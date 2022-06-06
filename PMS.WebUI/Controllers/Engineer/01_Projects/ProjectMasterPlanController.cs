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

namespace PMS.WebUI.Controllers.Engineer._01_Projects
{
    [AuthorizeUserAttribute()]
    public class ProjectMasterPlanController : Controller
    {
        DbEntities db = new DbEntities();
        int comCode = int.Parse(SessionManager.SessionRecord.CompCode);
        int BraCode = int.Parse(SessionManager.SessionRecord.BranchCode);

        // GET: ProjectMasterPlan
        public ActionResult ProjectMasterPlanIndex()
        {
            SessionManager.PageIndex = 0;
            SessionManager.ModelCount = db.P_TR_EngProject.Where(x => x.CompCode == comCode && x.BraCode == BraCode).Count();
            return View(Path.ProjectMasterPlan);
        }


        public JsonResult GetByIndex(int? index = default(int?))
        {
            var model = db.PQ_GetEngProject.Where(x => x.CompCode == comCode && x.BraCode == BraCode).ByIndex(SessionManager.PageIndex, "ProjectID");
         
            return Shared.JsonObject(model);
        }
        public JsonResult GetProjCodeByID(int id)
        {

            var result = db.P_TR_EngProject.Where(x => x.ProjectID == id).First();
            return Shared.JsonObject(result);
        }
        public JsonResult GetCalenderById(int id)
        {

            var result = db.P_D_Calender.Where(x => x.CalenderID == id).First();
            return Shared.JsonObject(result);
        }
        public JsonResult LoadDetails(int id/*, string txtStartDate,string txtEndDate*/)
        {

            M_D_EngSpcDetailsView _View = new M_D_EngSpcDetailsView();
            // M_D_ProjectDefDetailsView _View = new M_D_ProjectDefDetailsView();
            //DateTime start = DateTime.Parse(txtStartDate);
            //DateTime end = DateTime.Parse(txtEndDate);
            ////TimeSpan t = end - start;
           // return (int)t.TotalDays;
            _View.PQ_GetEngProjectPhase = db.PQ_GetEngProjectPhase.Where(x => x.ProjectID == id /*&&x.StartDate>=start&&x.EndDate<=end*/).Result().ToList();

            _View.PQ_GetEngProjectItem = db.PQ_GetEngProjectItem.Where(x => x.ProjectID == id /*&& x.StartDate >= start && x.EndDate <= end*/).Result().ToList();
            _View.PQ_GetEngProjectActivity = db.PQ_GetEngProjectActivity.Where(i => i.ProjectID == id /*&& i.StartDate >= start && i.EndDate <= end*/).Result().ToList();
            
            return Json(_View, JsonRequestBehavior.AllowGet);


        }
        public JsonResult GetCustomerById(int id)
        {

            var result = db.P_D_SalesCustomer.Where(x => x.CustomerID == id).First();

            return Shared.JsonObject(result);
        }

        [HttpGet]
        public string MonthCalcDuration(string From, string To, string CalcId)
        {
            RestClient rest = new RestClient();
            Dictionary<string, string> DicList = new Dictionary<string, string>();
            DicList.Add("From", From);
            DicList.Add("To", To);
            DicList.Add("CalcId", CalcId);
            var _result = rest.Get<int>("P_TR_EngProject", "MonthCalcDuration", DicList);
            return _result.ToString();

        }
        public JsonResult GetHourProd(string from, string to, int calcId)
        {
            //var dt1 = from.Substring(8, 2) + '-' + from.Substring(5, 2) + '-' + from.Substring(0, 4) + from.Substring(10, 9);
            //var dt2 = to.Substring(8, 2) + '-' + to.Substring(5, 2) + '-' + to.Substring(0, 4) + to.Substring(10, 9);
            //DateTime dt1 = DateTime.ParseExact(from , "yyyy-dd-MM", System.Globalization.CultureInfo.InvariantCulture);
            //DateTime dt2 = DateTime.ParseExact(to, "yyyy-dd-MM", System.Globalization.CultureInfo.InvariantCulture);

            string dt1 = Convert.ToDateTime(from).ToString("yyyy-dd-MM hh:mm:ss tt");
            string dt2 = Convert.ToDateTime(to).ToString("yyyy-dd-MM hh:mm:ss tt");
            RestClient rest = new RestClient();
            Dictionary<string, string> DicList = new Dictionary<string, string>();
            DicList.Add("From", dt1.ToString());
            DicList.Add("To", dt2.ToString());
            DicList.Add("CalcId", calcId.ToString());
            var _result = rest.Get<double>("P_TR_EngSchedule", "GetHourProd", DicList);
            return Json(new { result = _result }, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetByID(int? id)
        {
            var model = db.PQ_GetEngProject.Where(f => f.ProjectID == id).First();
            return Shared.JsonObject(model);
        }
        public JsonResult Update(string JsonData)
        {
            M_D_ProjectDefDetails obj = JsonConvert.DeserializeObject<M_D_ProjectDefDetails>(JsonData);
            //Set Company Code and branch code
            obj.P_TR_EngProject.CompCode = comCode;
            obj.P_TR_EngProject.BraCode = BraCode;
            obj.P_TR_EngProject.UpdatedBy = SessionManager.SessionRecord.UserCode;
            obj.P_TR_EngProject.UpdatedAt = DateTime.Now;
            //end Set Company Code and branch code
            
            M_D_ProjectDefDetails _ProjectDefDetails = new M_D_ProjectDefDetails();
            _ProjectDefDetails.P_TR_EngProject = obj.P_TR_EngProject;
            _ProjectDefDetails.P_TR_EngProjectPhase = obj.P_TR_EngProjectPhase as List<P_TR_EngProjectPhase>;
            _ProjectDefDetails.P_TR_EngProjectItem = obj.P_TR_EngProjectItem as List<P_TR_EngProjectItem>;
            _ProjectDefDetails.P_TR_EngProjectActivity = obj.P_TR_EngProjectActivity as List<P_TR_EngProjectActivity>;

            var result = db.P_TR_EngProject.UpdateMasterManyDetailsMasterPlan(obj.P_TR_EngProject, obj, "UpdateMasterPlan");
            if (result.ResponseState == true)
            {
                SessionManager.ModelCount = db.P_TR_EngProject.Where(x => x.CompCode == comCode && x.BraCode == BraCode).Count();
            }
            return Shared.JsonObject(result);
        }
    }
}