using Newtonsoft.Json;
using PMS.ServiceConnector.Models;
using PMS.ServiceConnector.Models.Entities;
using PMS.ServiceConnector.Tools;
using PMS.WebUI.Models.CustomModels;
using PMS.WebUI.Tools;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace PMS.WebUI.Controllers.Sales._01_SalesDataLibrary
{
    public class ActivityPriceController : Controller, IController<P_Tr_SalesActivtyPrice>
    {
        DbEntities db = new DbEntities();
        int comCode = int.Parse(SessionManager.SessionRecord.CompCode);
        int BraCode = int.Parse(SessionManager.SessionRecord.BranchCode);

        // GET: ActivityPrice
        public ActionResult ActivityPriceIndex()
        {
            Session["actPrice"] = new List<PQ_GetSalesActivityPriceDetails>();
            SessionManager.PageIndex = 0;
            SessionManager.ModelCount = db.P_Tr_SalesActivtyPrice.Where(x => x.CompCode == comCode).Count();
            return View(Path.ActivityPrice);
        }

        public JsonResult Add()
        {
            throw new NotImplementedException();
        }

        public JsonResult Delete(P_Tr_SalesActivtyPrice entity)
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
            var model = db.PQ_GetSalesActivityPrice.Where(x=>x.CompCode == comCode).ByIndex(SessionManager.PageIndex);
            return Shared.JsonObject(model);
        }

        public JsonResult GetModelCount()
        {
            throw new NotImplementedException();
        }

        public JsonResult Insert(P_Tr_SalesActivtyPrice entity)
        {
            List<PQ_GetSalesActivityPriceDetails> details = Session["actPrice"] as List<PQ_GetSalesActivityPriceDetails>;
            var result = db.P_Tr_SalesActivtyPrice.InsertMasterDetails(entity, details);
            if (result.ResponseState == true)
            {
                SessionManager.ModelCount = db.P_Tr_SalesActivtyPrice.Count();
                SessionManager.PageIndex = 0;
            }
            return Shared.JsonObject(result);
        }

        public JsonResult InsertAll(P_Tr_SalesActivtyPrice master, string json)
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

        public JsonResult InsertPrice(string JsonData)
        {
            M_D_ActivityPrice obj = JsonConvert.DeserializeObject<M_D_ActivityPrice>(JsonData);
            M_D_ActivityPrice _M_D_Price = new M_D_ActivityPrice();
            _M_D_Price.P_Tr_SalesActivtyPrice = obj.P_Tr_SalesActivtyPrice;
            _M_D_Price.P_Tr_SalesActivtyPriceDetail = obj.P_Tr_SalesActivtyPriceDetail as List<P_Tr_SalesActivtyPriceDetail>;
           
            var result = db.P_Tr_SalesActivtyPrice.InsertMasterManyDetails(_M_D_Price.P_Tr_SalesActivtyPrice, _M_D_Price.P_Tr_SalesActivtyPriceDetail);
            if (result.ResponseState == true)
            {
                SessionManager.ModelCount = db.P_Tr_SalesActivtyPrice.Where(x => x.CompCode == comCode).Count();
            }
            return Shared.JsonObject(result);
        }

        public JsonResult UpdatePrice(string JsonData)
        {
            M_D_ActivityPrice obj = JsonConvert.DeserializeObject<M_D_ActivityPrice>(JsonData);
            M_D_ActivityPrice _M_D_Price = new M_D_ActivityPrice();
            _M_D_Price.P_Tr_SalesActivtyPrice = obj.P_Tr_SalesActivtyPrice;
            _M_D_Price.P_Tr_SalesActivtyPriceDetail = obj.P_Tr_SalesActivtyPriceDetail as List<P_Tr_SalesActivtyPriceDetail>;

            var result = db.P_Tr_SalesActivtyPrice.UpdateMasterManyDetails(_M_D_Price.P_Tr_SalesActivtyPrice, _M_D_Price.P_Tr_SalesActivtyPriceDetail);
            if (result.ResponseState == true)
            {
                SessionManager.ModelCount = db.P_Tr_SalesActivtyPrice.Where(x => x.CompCode == comCode).Count();
            }
            return Shared.JsonObject(result);
        }

        public JsonResult Update(P_Tr_SalesActivtyPrice entity)
        {
            List<PQ_GetSalesActivityPriceDetails> details = Session["actPrice"] as List<PQ_GetSalesActivityPriceDetails>;
            var result = db.P_Tr_SalesActivtyPrice.UpdateMasterDetails(entity, details);
            if (result.ResponseState == true)
            {
                SessionManager.ModelCount = db.P_Tr_SalesActivtyPrice.Count();
                SessionManager.PageIndex = 0;
            }
            return Shared.JsonObject(result);
        }

        // Custom Functions
        public JsonResult GetActivityByID()
        {
            var _Result = db.P_D_Activity.Result();
            return Shared.JsonObject(_Result);
        }

        public JsonResult getActivity(int id)
        {
            var _Result = db.P_D_Activity.Where(x=>x.ActivityID == id).First();
            return Shared.JsonObject(_Result);
        }

        public JsonResult SearchActivity(int id)
        {
            var _Result = db.P_D_Activity.Where(x=>x.ActivityID == id).First();
            return Shared.JsonObject(_Result);
        }

        public JsonResult getActivityPrice(int id)
        {
            var _Result = db.PQ_GetSalesActivityPrice.Where(x=>x.ActivityPriceId == id).First();
            return Shared.JsonObject(_Result);
        }

        public void AssignDetails(PQ_GetSalesActivityPriceDetails obj)
        {
            List<PQ_GetSalesActivityPriceDetails> lst = Session["actPrice"] as List<PQ_GetSalesActivityPriceDetails>;
            lst.Add(obj);
            Session["actPrice"] = lst;
        }

        public JsonResult LoadDetails(int id)
        {
            var Result = db.PQ_GetSalesActivityPriceDetails.Where(x => x.ActivityPriceId == id).Result();
            return Shared.JsonObject(Result);
        }

        public JsonResult getfromActName(string fromAct)
        {
            var _Result = db.P_D_Activity.Where(x => x.ActivityCode == fromAct).First();
            return Shared.JsonObject(_Result);
        }

        public JsonResult gettoActName(string toAct)
        {
            var _Result = db.P_D_Activity.Where(x => x.ActivityCode == toAct).First();
            return Shared.JsonObject(_Result);
        }

        public JsonResult getparentActName(int parentAct)
        {
            var _Result = db.P_D_Activity.Where(x => x.ActivityID == parentAct).First();
            return Shared.JsonObject(_Result);
        }

        public JsonResult LoadActivity(int parent)
        {
            //compcode= Session and isdetail=true and ParentActivityID==parent and
            //(actcode >= from ) and (to =="" or actcode <= to )
            var _Result = db.P_D_Activity.Where
                (x => (x.CompCode == comCode) &  (x.IsDetail == true) & 
                (x.ParentActivityID == parent)).Result();
            return Shared.JsonObject(_Result);
        }

        public void CalculateActivityprice(int _Id)
        {
            SystemTools sys = new SystemTools();
            sys.CalculatepriceActivity(_Id); 
        }
    }
}