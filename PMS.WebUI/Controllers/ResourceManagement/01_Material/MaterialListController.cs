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

namespace PMS.WebUI.Controllers.ResourceManagement._01_Material
{
    public class MaterialListController : Controller
    {
        DbEntities db = new DbEntities();
        int comCode = int.Parse(SessionManager.SessionRecord.CompCode);
        int braCode = int.Parse(SessionManager.SessionRecord.BranchCode);
        // GET: MaterialList
        public ActionResult MaterialListIndex()
        {
            SessionManager.PageIndex = 0;
            SessionManager.ModelCount = db.I_D_Category.Where(x => x.CompCode == comCode).Count();
            return View(Path.MaterialList);
        }

        public JsonResult GetCategoryByID(int id)
        {
            var result = db.I_D_Category.Where(x => x.CatID == id).First();
            return Shared.JsonObject(result);
        }

        public JsonResult GetByIndex(int? index = default(int?))
        {
            var model = db.I_D_Category.Where(x => x.CompCode == comCode).ByIndex(SessionManager.PageIndex);
            return Shared.JsonObject(model);
        }
        public JsonResult GetItemDetailsList(int id, string itmcode , string itmdscr )
        {
            var res = db.IQ_GetItemList.Result(); //.Where(x =>( x.CatID == id || id ==0  ) && (x.ItemCode.ToLower().Contains(itmcode)  || itmcode == "") && (x.DescL.ToLower().Contains(itmdscr)  || itmdscr == "")).Result();
           // var res = db.IQ_GetItemList.Where(x => (x.CatID == id || id == 0) && (x.ItemCode.ToLower().Contains(itmcode) || itmcode == "") && (x.DescL.ToLower().Contains(itmdscr) || itmdscr == "")).Result();

            return Shared.JsonObject(res);
        }
        public JsonResult GetAllCategryMaster()
        {
            var result = db.I_D_Category.Result();
            return Shared.JsonObject(result);
        }
        public JsonResult GetUnitByID(int id)
        {
            var result = db.I_D_UOM.Where(x => x.UomID == id).First();
            return Shared.JsonObject(result);
        }
        public JsonResult Update(string JsonData)
        {
            M_D_items obj = JsonConvert.DeserializeObject<M_D_items>(JsonData);
            var result = db.I_D_Category.UpdateMasterDetails(obj.I_D_Category, obj.I_Item); 
            if (result.ResponseState == true)
            {
                SessionManager.ModelCount = db.I_D_Category.Where(x => x.CompCode == comCode).Count();
            }

            return Shared.JsonObject(result);
        }

        public JsonResult Insert(string JsonData)
        {
            M_D_items obj = JsonConvert.DeserializeObject<M_D_items>(JsonData);
            var result = db.I_D_Category.InsertMasterDetails(obj.I_D_Category, obj.I_Item);
            if (result.ResponseState == true)
            {
                SessionManager.ModelCount = db.I_D_Category.Where(x => x.CompCode == comCode).Count();
            }
            return Shared.JsonObject(result);
        }
    }
}