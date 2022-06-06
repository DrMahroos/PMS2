using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using PMS.ServiceConnector.Models;
using PMS.ServiceConnector.Tools;
using PMS.WebUI.Models.CustomModels;
using PMS.WebUI.Tools;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace PMS.WebUI.Controllers
{
    public class WorkActivitiesController : Controller, IMasterManyDetails<P_D_Activity>
    {
        DbEntities db = new DbEntities();
        int comCode = int.Parse(SessionManager.SessionRecord.CompCode);

        public JsonResult Add()
        {
            throw new NotImplementedException();
        }

        public JsonResult Delete(P_D_Activity entity)
        {
            throw new NotImplementedException();
        }

        public JsonResult DeleteMaterial(P_D_ActivityIMaterial entity)
        {
            var result = db.P_D_ActivityIMaterial.DeleteEntity(entity);
            if (result.ResponseState == true)
            {
                //SessionManager.ModelCount = 0; //db.K_D_ExpCateg.Where(x => x.CompCode == comCode).Count();
                //SessionManager.PageIndex = 0;
            }
            return Shared.JsonObject(result);
        }

        public JsonResult DeleteLabor(P_D_ActivityLaborClass entity)
        {
            var result = db.P_D_ActivityLaborClass.DeleteEntity(entity);
            if (result.ResponseState == true)
            {
                //SessionManager.ModelCount = 0; //db.K_D_ExpCateg.Where(x => x.CompCode == comCode).Count();
                //SessionManager.PageIndex = 0;
            }
            return Shared.JsonObject(result);
        }

        public JsonResult DeleteEquip(P_D_ActivityEquipClass entity)
        {
            var result = db.P_D_ActivityEquipClass.DeleteEntity(entity);
            if (result.ResponseState == true)
            {
                //SessionManager.ModelCount = 0; //db.K_D_ExpCateg.Where(x => x.CompCode == comCode).Count();
                //SessionManager.PageIndex = 0;
            }
            return Shared.JsonObject(result);
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
            var model = db.P_D_Activity.ByIndex(SessionManager.PageIndex);
            return Shared.JsonObject(model);
        }

        public JsonResult GetModelCount()
        {
            throw new NotImplementedException();
        }

        public JsonResult Insert(string JsonData)
        {
            M_D_Activites obj = JsonConvert.DeserializeObject<M_D_Activites>(JsonData);
            M_D_Activites _M_D_Activites = new M_D_Activites();
            _M_D_Activites.P_D_Activity = obj.P_D_Activity;
            _M_D_Activites.P_D_ActivityEquipClass = obj.P_D_ActivityEquipClass as List<P_D_ActivityEquipClass>;
            _M_D_Activites.P_D_ActivityIMaterial = obj.P_D_ActivityIMaterial as List<P_D_ActivityIMaterial>;
            _M_D_Activites.P_D_ActivityLaborClass = obj.P_D_ActivityLaborClass as List<P_D_ActivityLaborClass>;

            var result = db.P_D_Activity.InsertMasterManyDetails(_M_D_Activites.P_D_Activity, _M_D_Activites);
            if (result.ResponseState == true)
            {
                SessionManager.ModelCount = db.P_D_Activity.Where(x => x.CompCode == comCode).Count();
            }
            return Shared.JsonObject(result);
        }

        public JsonResult insertMaterial(P_D_ActivityIMaterial entity)
        {
            //var parent = db.P_D_Activity.Where(x => x.ActivityID == entity.ActivityID).First();
            //if (parent.IsDetail == true)
            //{
            //    parent.IsDetail = false;
            //    db.P_D_Activity.UpdateEntity(parent);
            //}
            var result = db.P_D_ActivityIMaterial.InsertEntity(entity);
            if (result.ResponseState == true)
            {
                //SessionManager.ModelCount = db.P_D_ActivityIMaterial.Count();
                //SessionManager.PageIndex = 0;
            }
            return Shared.JsonObject(result);
        }

        public JsonResult insertLabor(P_D_ActivityLaborClass entity)
        {
            //var parent = db.P_D_Activity.Where(x => x.ActivityID == entity.ActivityID).First();
            //if (parent.IsDetail == true)
            //{
            //    parent.IsDetail = false;
            //    db.P_D_Activity.UpdateEntity(parent);
            //}
            var result = db.P_D_ActivityLaborClass.InsertEntity(entity);
            if (result.ResponseState == true)
            {
                //SessionManager.ModelCount = db.P_D_ActivityIMaterial.Count();
                //SessionManager.PageIndex = 0;
            }
            return Shared.JsonObject(result);
        }

        public JsonResult insertEquip(P_D_ActivityEquipClass entity)
        {
            //var parent = db.P_D_Activity.Where(x => x.ActivityID == entity.ActivityID).First();
            //if (parent.IsDetail == true)
            //{
            //    parent.IsDetail = false;
            //    db.P_D_Activity.UpdateEntity(parent);
            //}
            var result = db.P_D_ActivityEquipClass.InsertEntity(entity);
            if (result.ResponseState == true)
            {
                //SessionManager.ModelCount = db.P_D_ActivityIMaterial.Count();
                //SessionManager.PageIndex = 0;
            }
            return Shared.JsonObject(result);
        }

        public JsonResult InsertAll(P_D_Activity master, string json)
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
            M_D_Activites obj = JsonConvert.DeserializeObject<M_D_Activites>(JsonData);
            M_D_Activites _M_D_Activites = new M_D_Activites();
            _M_D_Activites.P_D_Activity = obj.P_D_Activity;
            _M_D_Activites.P_D_ActivityEquipClass = obj.P_D_ActivityEquipClass as List<P_D_ActivityEquipClass>;
            _M_D_Activites.P_D_ActivityIMaterial = obj.P_D_ActivityIMaterial as List<P_D_ActivityIMaterial>;
            _M_D_Activites.P_D_ActivityLaborClass = obj.P_D_ActivityLaborClass as List<P_D_ActivityLaborClass>;

            var result = db.P_D_Activity.UpdateMasterManyDetails(_M_D_Activites.P_D_Activity, _M_D_Activites);
            if (result.ResponseState == true)
            {
                SessionManager.ModelCount = db.P_D_Activity.Where(x => x.CompCode == comCode).Count();
            }
            return Shared.JsonObject(result);
        }

        public JsonResult UpdateMaterial(P_D_ActivityIMaterial entity)
        {
            var result = db.P_D_ActivityIMaterial.UpdateEntity(entity);
            if (result.ResponseState == true)
            {
                //SessionManager.ModelCount = db.P_D_Activity.Count();
                //SessionManager.PageIndex = 0;
            }
            return Shared.JsonObject(result);
        }

        public JsonResult UpdateLabor(P_D_ActivityLaborClass entity)
        {
            var result = db.P_D_ActivityLaborClass.UpdateEntity(entity);
            if (result.ResponseState == true)
            {
                //SessionManager.ModelCount = db.P_D_Activity.Count();
                //SessionManager.PageIndex = 0;
            }
            return Shared.JsonObject(result);
        }

        public JsonResult UpdateEquip(P_D_ActivityEquipClass entity)
        {
            var result = db.P_D_ActivityEquipClass.UpdateEntity(entity);
            if (result.ResponseState == true)
            {
                //SessionManager.ModelCount = db.P_D_Activity.Count();
                //SessionManager.PageIndex = 0;
            }
            return Shared.JsonObject(result);
        }

        // GET: WorkActivities
        public ActionResult WorkActivitiesIndex()
        {
            SessionManager.PageIndex = 0;
            SessionManager.ModelCount = db.P_D_Activity.Where(x => x.CompCode == comCode).Count();
            return View(Path.WorkActivities);
            
        }

        public JsonResult loadLaborClass()
        {
            var result = db.P_D_LaborClass.Result();
            return Shared.JsonObject(result);
        }

        public JsonResult loadItemsList()
        {
            var result = db.I_Item.Result();
            return Shared.JsonObject(result);
        }

        public JsonResult loadEquipList()
        {
            var result = db.P_D_EquipmentClass.Result();
            return Shared.JsonObject(result);
        }

        public JsonResult UomList(int id)
        {
            var result = db.P_D_UOM.Where(x => x.UomID == id).First();
            return Shared.JsonObject(result);
        }

        public JsonResult activityList(int id)
        {
            var result = db.P_D_Activity.Where(s => s.ActivityID == id).First();
            return Shared.JsonObject(result);
        }

        public JsonResult getParent(int _id)
        {
            var result = db.P_D_Activity.Where(s => s.ActivityID == _id).First();
            return Shared.JsonObject(result);
        }

        public JsonResult getMaterial(int id)
        {
            var res = db.PQ_GetActivityMaterialClass.Where(x=>x.ActivityID == id).Result();
            return Shared.JsonObject(res);
        }

        public JsonResult getLaborClassess(int id)
        {
            var res = db.PQ_GetActivityLaborClass.Where(x=>x.ActivityID == id).Result();
            return Shared.JsonObject(res);
        }

        public JsonResult getEquip(int id)
        {
            var res = db.PQ_GetActivityEquipmentClass.Where(x=>x.ActivityID == id).Result();
            return Shared.JsonObject(res);
        }

        public JsonResult findMaterial(int id)
        {
            var result = db.IQ_SrchItem.Where(x => x.ItemID == id).First();
            return Shared.JsonObject(result);
        }

        public JsonResult findLabor(int id)
        {
            var result = db.P_D_LaborClass.Where(x => x.LaborClassId == id).First();
            return Shared.JsonObject(result);
        }

        public JsonResult findEquip(int id)
        {
            var result = db.P_D_EquipmentClass.Where(x => x.EquipClassId == id).First();
            return Shared.JsonObject(result);
        }

        public JsonResult getWasteValue()
        {
            var result = db.P_Control.Result();
            return Shared.JsonObject(result);
        }
    }
}