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

namespace PMS.WebUI.Controllers.ResourceManagement._01_Material
{
    public class MaterialRequestController : Controller, IController<P_TR_ResRequestMaterial>
    {
        DbEntities db = new DbEntities();
        int comCode = int.Parse(SessionManager.SessionRecord.CompCode);
        int braCode = int.Parse(SessionManager.SessionRecord.BranchCode);

        // GET: MaterialRequest
        public ActionResult MaterialRequestIndex()
        {
            SessionManager.PageIndex = 0;
            SessionManager.ModelCount = db.PQ_GetResRequestMaterial.Where(x => x.CompCode == comCode && x.BraCode == braCode).Count();
            return View(Path.MaterialRequest);
        }
        public JsonResult GetByIndex(int? index = null)
        {
            var model = db.PQ_GetResRequestMaterial.Where(x => x.CompCode == comCode && x.BraCode == braCode).ByIndex(SessionManager.PageIndex, "RequestMaterialId");
            return Shared.JsonObject(model);
        }

        public JsonResult GetRequestById(int id)
        {
            var res = db.PQ_GetResRequestMaterial.Where(x => x.RequestMaterialId == id).First();
            return Shared.JsonObject(res);
        }
        public JsonResult GetSchduleById(int id)
        {
            var res = db.PQ_SrcSchdule.Where(x => x.ScheduleId == id).First();
            return Shared.JsonObject(res);
        }
        public JsonResult GetServiceOrderById(int id)
        {
            var res = db.PQ_GetEngSubServiceOrder.Where(x => x.SubServiceOrderId == id).First();
            return Shared.JsonObject(res);
        }
        public JsonResult GetMaterialById(int id)
        {
            var res = db.IQ_SrchItem.Where(x => x.ItemID == id).First();
            return Shared.JsonObject(res);
        }
        public JsonResult LoadDetails(int id)
        {
            var result = db.PQ_GetResRequestMaterialDetails.Where(x => x.RequestMaterialId == id).Result();
            return Shared.JsonObject(result);
        }
        public JsonResult GetByID(int id)
        {
            var result = db.PQ_GetResRequestMaterial.Where(x => x.RequestMaterialId == id).First();
            return Shared.JsonObject(result);
        }
        
        public JsonResult InsertMaterial(string JsonData)
        {
            M_D_ReqMaterial obj = JsonConvert.DeserializeObject<M_D_ReqMaterial>(JsonData);
            M_D_ReqMaterial _MasterDetailsEquip = new M_D_ReqMaterial();
            _MasterDetailsEquip.P_TR_ResRequestMaterial = obj.P_TR_ResRequestMaterial;
            _MasterDetailsEquip.P_TR_ResRequestMaterialDetail = obj.P_TR_ResRequestMaterialDetail as List<P_TR_ResRequestMaterialDetail>;

            var result = db.P_TR_ResRequestMaterial.InsertMasterManyDetails(_MasterDetailsEquip.P_TR_ResRequestMaterial, _MasterDetailsEquip.P_TR_ResRequestMaterialDetail);
            if (result.ResponseState == true)
            {
                SessionManager.ModelCount = db.P_TR_ResRequestMaterial.Where(x => x.CompCode == comCode && x.BraCode == braCode).Count();
            }
            return Shared.JsonObject(result);
        }

        public JsonResult UpdateMaterial(string JsonData)
        {
            M_D_ReqMaterial obj = JsonConvert.DeserializeObject<M_D_ReqMaterial>(JsonData);
            M_D_ReqMaterial _MasterDetailsMat = new M_D_ReqMaterial();
            _MasterDetailsMat.P_TR_ResRequestMaterial = obj.P_TR_ResRequestMaterial;
            _MasterDetailsMat.P_TR_ResRequestMaterialDetail = obj.P_TR_ResRequestMaterialDetail as List<P_TR_ResRequestMaterialDetail>;

            var result = db.P_TR_ResRequestMaterial.UpdateMasterManyDetails(_MasterDetailsMat.P_TR_ResRequestMaterial, _MasterDetailsMat.P_TR_ResRequestMaterialDetail);
            if (result.ResponseState == true)
            {
                SessionManager.ModelCount = db.P_TR_ResRequestMaterial.Where(x => x.CompCode == comCode && x.BraCode == braCode).Count();
            }
            return Shared.JsonObject(result);
        }

        public JsonResult PProc_ApproveCloseMaterialRequest(int ReqID, int OldStatus, int NewStatus)
        {
            RestClient rest = new RestClient();
            Dictionary<string, string> dictionary = new Dictionary<string, string>();
            dictionary.Add("ReqID", ReqID.ToString());
            dictionary.Add("OldStatus", OldStatus.ToString());
            dictionary.Add("NewStatus", NewStatus.ToString());
            int _JsonResult = rest.Get<int>("P_TR_ResRequestMaterial", "PProc_ApproveCloseMaterialRequest", dictionary);
            //var _Result = JsonConvert.DeserializeObject<PProc_ResGetFreeEquip_Result>>(_JsonResult);
            return Json(new { result = _JsonResult }, JsonRequestBehavior.AllowGet);
        }

        #region
        public JsonResult GetModelCount()
        {
            throw new NotImplementedException();
        }
        public JsonResult Delete(P_TR_ResRequestMaterial entity)
        {
            throw new NotImplementedException();
        }

        public JsonResult Add()
        {
            throw new NotImplementedException();
        }

        public void Edit()
        {
            throw new NotImplementedException();
        }

        public JsonResult Undo()
        {
            throw new NotImplementedException();
        }

        public JsonResult Find()
        {
            throw new NotImplementedException();
        }

        public JsonResult OnSearchSelect(string id)
        {
            throw new NotImplementedException();
        }

        public JsonResult InsertAll(P_TR_ResRequestMaterial master, string json)
        {
            throw new NotImplementedException();
        }

        public JsonResult DeleteAll(string json)
        {
            throw new NotImplementedException();
        }

        public JsonResult Insert(P_TR_ResRequestMaterial entity)
        {
            throw new NotImplementedException();
        }

        public JsonResult Update(P_TR_ResRequestMaterial entity)
        {
            throw new NotImplementedException();
        }
        #endregion
    }
}