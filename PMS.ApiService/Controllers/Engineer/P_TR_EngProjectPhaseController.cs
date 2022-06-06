using PMS.ApiService.Tools;
using PMS.ApiService.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Newtonsoft.Json.Linq;
using PMS.ApiService.Models.CustomEntities;

namespace PMS.ApiService.Controllers.Engineer
{
    public class P_TR_EngProjectPhaseController : BaseController, IMasterDetailsController<P_TR_EngProjectPhase, P_TR_EngProjectItem>
    {
        [HttpGet]
        public object SelectEntity(string SqlStatement)
        {
            var result = this.Get<P_TR_EngProjectPhase>(SqlStatement);
            return result.ToList();
        }
        [HttpPost, AllowAnonymous]
        public IHttpActionResult UpdateMasterDetail([FromBody]M_D_ProjectPhase data)
        {
            SessionRecord session = data.sessionRecord;
            P_TR_EngProjectPhase ProjPhase = data.P_Tr_EngProjectPhase;

            BaseResponse result = new BaseResponse();
            using (var dbTrans = db.Database.BeginTransaction())
            {
                try
                {
                    //SessionRecord session = data.sessionRecord;
                   
                   
                    
                    db.P_TR_EngProjectPhase.Attach(ProjPhase);
                    db.Entry(ProjPhase).State = System.Data.Entity.EntityState.Modified;
                    db.SaveChanges();
                    //
                   
                    ResponseResult res = Shared.InvTransactionProcess(session, ProjPhase.ProjectPhaseId, "ProjPhase", db);
                    if (res.ResponseState == true)
                    {
                        dbTrans.Commit();
                        
                        result.Response = ProjPhase.ProjectPhaseId;
                        result.StatusCode = 200;
                    }
                    else
                    {
                        result.Response = res.ResponseMessage;
                        result.IsSuccess = false;
                        dbTrans.Rollback();
                    }
                }
                catch (Exception ex)
                {
                    dbTrans.Rollback();
                    result.Response = ex.Message;
                    result.IsSuccess = false;
                }
                return Ok(result);
            }
        }
            public ResponseResult UpdateMasterDetails(JObject data)
        {
            ResponseResult result = new ResponseResult();
            var obj = JObjMasterDetails<P_TR_EngProjectPhase, P_TR_EngProjectItem>(data);
            SessionRecord session = obj.Session;
            P_TR_EngProjectPhase master = obj.Master;
            List<P_TR_EngProjectItem> details = obj.Details.ToList();
            result = MasterDetailsValidation(master, details, session);
            if (result.ResponseState == false)
                return result;
            obj = JObjMasterDetails<P_TR_EngProjectPhase, P_TR_EngProjectItem>(result.ResponseData as JObject);
            session = obj.Session;
            master = obj.Master;
            details = obj.Details.ToList();
            using (var dbTrans = db.Database.BeginTransaction())
            {
                try
                {
                    db.P_TR_EngProjectPhase.Attach(master);
                    db.Entry(master).State = System.Data.Entity.EntityState.Modified;
                    db.SaveChanges();

                    //int i;
                    //var _ItemsOld = db.P_TR_EngProjectItem.Where(x => x.ProjectPhaseId == master.ProjectPhaseId).ToList();
                    //foreach (var itm in _ItemsOld)
                    //{
                    //    i = details.Where(n => n.ProjectPhaseItemId == itm.ProjectPhaseItemId).Count();
                    //    if (i == 0)
                    //    {
                    //        db.P_TR_EngProjectItem.Remove(itm);
                    //    }
                    //}

                    ResponseResult res = Shared.InvTransactionProcess(session, master.ProjectPhaseId, "ProjPhase", db);
                    if (res.ResponseState == true)
                    {
                        dbTrans.Commit();
                        result.ResponseData = master.ProjectPhaseId;
                    }
                    else
                    {
                        result.ResponseMessage = res.ResponseMessage;
                        result.ResponseState = false;
                        dbTrans.Rollback();
                    }
                }
                catch (Exception ex)
                {
                    dbTrans.Rollback();
                    result.ResponseMessage = ex.Message;
                    result.ResponseState = false;
                }
                return result;
            }
        }
        public ResponseResult MasterDetailsValidation(P_TR_EngProjectPhase Master, IEnumerable<P_TR_EngProjectItem> Details, SessionRecord Session)
        {
            ResponseResult result = new ResponseResult();
            try
            {
                InitalizeLanguage(Session.Language);

                var obj = new
                {
                    Master = Master,
                    Details = Details,
                    Session = Session
                };

                result.ResponseData = JObject.FromObject(obj);
                result.ResponseState = true;
            }
            catch (Exception ex)
            {
                result.ResponseState = false;
                result.ResponseMessage = ex.Message;
            }
            return result;
        }
        public ResponseResult InsertMasterDetails(JObject data)
        {
            throw new NotImplementedException();
        }
        [HttpPost]
        public ResponseResult InsertEntity(JObject data)
        {
            ResponseResult result = new Models.ResponseResult();
            using (var dbTransaction = db.Database.BeginTransaction())
            {
                try
                {
                    result = Validation(ActionTypes.Insert, data);
                    if (result.ResponseState == false)
                        return result;

                    var obj = JObjectData<P_TR_EngProjectItem>(data);
                    obj.Entity = result.ResponseData as P_TR_EngProjectItem;
                    data = JObjectToObj<P_TR_EngProjectItem>(obj.Entity, obj.Session);
                    result = this.Execute<P_TR_EngProjectItem>(data, ActionTypes.Insert, this.Process, db, dbTransaction);
                    SessionRecord session = obj.Session;

                    if (result.ResponseState)
                    {
                        var Eq = JsonDeserialize<P_TR_EngProjectItem>(result.ResponseData.ToString());
                        ResponseResult res = Shared.InvTransactionProcess(session, Eq.ProjectPhaseItemId, "ProjPhase", db);
                        if (res.ResponseState == true)
                        {
                            dbTransaction.Commit();
                            result.ResponseData = JsonSerialize(Eq);
                        }
                        else
                        {
                            result.ResponseMessage = res.ResponseMessage;
                            result.ResponseState = false;
                            dbTransaction.Rollback();
                        }
                    }
                }
                catch (Exception ex)
                {
                    dbTransaction.Rollback();
                    result.ResponseMessage = ex.Message;
                    result.ResponseState = false;
                }
            }
            return result;
        }
        [HttpPost]
        public ResponseResult UpdateEntity(JObject data)
        {
            ResponseResult result = new Models.ResponseResult();
            using (var dbTransaction = db.Database.BeginTransaction())
            {
                try
                {
                    result = Validation(ActionTypes.Update, data);
                    if (result.ResponseState == false)
                        return result;

                    var obj = JObjectData<P_TR_EngProjectItem>(data);
                    obj.Entity = result.ResponseData as P_TR_EngProjectItem;
                    data = JObjectToObj<P_TR_EngProjectItem>(obj.Entity, obj.Session);
                    result = this.Execute<P_TR_EngProjectItem>(data, ActionTypes.Update, this.Process, db, dbTransaction);
                    SessionRecord session = obj.Session;

                    if (result.ResponseState)
                    {
                        var Eq = JsonDeserialize<P_TR_EngProjectItem>(result.ResponseData.ToString());
                        ResponseResult res = Shared.InvTransactionProcess(session, Eq.ProjectPhaseItemId, "ProjPhase", db);
                        if (res.ResponseState == true)
                        {

                            dbTransaction.Commit();
                            result.ResponseData = JsonSerialize(Eq);
                        }
                        else
                        {
                            result.ResponseMessage = res.ResponseMessage;
                            result.ResponseState = false;
                            dbTransaction.Rollback();
                        }
                    }
                }
                catch (Exception ex)
                {
                    dbTransaction.Rollback();
                    result.ResponseMessage = ex.Message;
                    result.ResponseState = false;
                }
            }
            return result;
        }
        [HttpPost]
        public ResponseResult DeleteEntity(JObject data)
        {
            ResponseResult result = new Models.ResponseResult();
            result = Validation(ActionTypes.Delete, data);
            if (result.ResponseState == false)
                return result;

            var obj = JObjectData<P_TR_EngProjectPhase>(data);
            //obj.Entity = result.ResponseData as P_TR_EngProjectPhase;
            data = JObjectToObj<P_TR_EngProjectPhase>(obj.Entity, obj.Session);
            result = this.Execute<P_TR_EngProjectPhase>(data, ActionTypes.Delete, this.Process);
            return result;
            //ResponseResult result = new Models.ResponseResult();
            //result = Validation(ActionTypes.Delete, data);
            //if (result.ResponseState == false)
            //    return result;

            //var obj = JObjectData<P_TR_EngProjectItem>(data);
            //obj.Entity = result.ResponseData as P_TR_EngProjectItem;
            //data = JObjectToObj<P_TR_EngProjectItem>(obj.Entity, obj.Session);
            //result = this.Execute<P_TR_EngProjectItem>(data, ActionTypes.Delete, this.Process);
            //return result;

        }
        public ResponseResult InsertCollection(JObject data)
        {
            ResponseResult result = new Models.ResponseResult();
            result = Validation(ActionTypes.InsertCollection, data);
            if (result.ResponseState == false)
                return result;

            var obj = JObjectData<P_TR_EngProjectItem>(data);
            obj.Entity = result.ResponseData as P_TR_EngProjectItem;
            data = JObjectToObj<P_TR_EngProjectItem>(obj.Entity, obj.Session);
            result = this.Execute<P_TR_EngProjectItem>(data, ActionTypes.InsertCollection, this.Process);
            return result;
        }
        public ResponseResult Process(ActionTypes actionType, JObject data)
        {
            ResponseResult result = new ResponseResult();
            result.ResponseState = true;
            return result;
        }
        public ResponseResult Validation(ActionTypes actionType, JObject data)
        {
            ResponseResult result = new ResponseResult();
            var obj = JObjectData<P_TR_EngProjectItem>(data);
            InitalizeLanguage(obj.Session.Language);

            var entity = obj.Entity;
            int compCode = int.Parse(obj.Session.CompCode);

            switch (actionType)
            {
                case ActionTypes.Insert:
                    break;
                case ActionTypes.Update:
                    break;
                case ActionTypes.Delete:
                    break;
                case ActionTypes.InsertCollection:
                    break;
                default:
                    break;
            }
            result.ResponseState = true;
            result.ResponseData = obj.Entity;
            return result;
        }

        public decimal GetTotalFromEngProjectActivity(string id)
        {
            //string sql = "select sum(isnull(SchedQty, 0) + isnull(SchedQty, 0) + isnull(SchedQty, 0) + isnull(SConProdQty, 0)) from P_TR_EngProjectActivity where[ProjectPhaseItemId] = " + id;
            string sql = "select sum(isnull(BillQty,0)) from P_TR_SalesInvoiceDetail where[ProjectPhaseItemId] = " + id;
            SystemToolsController st = new SystemToolsController();
            string total = st.ExecuteScalar(sql);
            return decimal.Parse(total == "" ? "0" : total);

        }
        //new api
        [HttpGet, AllowAnonymous]
        public IHttpActionResult GetProjectItem(int id)
        {
            if (ModelState.IsValid)
            {
                var result = db.P_TR_EngProjectItem.Where(i => i.ProjectPhaseItemId == id).FirstOrDefault();
                return Ok(new BaseResponse(result));
            }
            return BadRequest();
        }
        [HttpGet, AllowAnonymous]
        public IHttpActionResult GetEngProjectActivity(int id)
        {
            if (ModelState.IsValid)
            {
                var result = db.PQ_GetEngProjectActivity.Where(i => i.ProjectPhaseItemId == id).ToList();
                return Ok(new BaseResponse(result));
            }
            return BadRequest();
        }
        [HttpGet, AllowAnonymous]
        public IHttpActionResult GetSiteEngineerByID(int id)
        {
            if (ModelState.IsValid)
            {
                var model = db.P_D_SiteEngineer.Where(f => f.SiteEngineerId == id).First();
                return Ok(new BaseResponse(model));
            }
            return BadRequest();

        }
        [HttpGet, AllowAnonymous]
        public IHttpActionResult GetScopeDefinitionById(int id)
        {
            if (ModelState.IsValid)
            {
                var result = db.P_D_Scope.Where(x => x.ScopeID == id).First();
                return Ok(new BaseResponse(result));
            }
            return BadRequest();
        }
        [HttpGet, AllowAnonymous]
        public IHttpActionResult GetCalendarDefinitionByID(int? catID)
        {
            if (ModelState.IsValid)
            {
                var model = db.P_D_Calender.Where(f => f.CalenderID == catID).First();
                return Ok(new BaseResponse(model));
            }
            return BadRequest();
        }
        [HttpGet, AllowAnonymous]
        public IHttpActionResult GetProjectSpecificationByID(int? id)
        {
            if (ModelState.IsValid)
            {
                var model = db.P_TR_EngProjectPhase.Where(f => f.ProjectPhaseId == id).First();
                return Ok(new BaseResponse(model));
            }
            return BadRequest();
        }
    }
}
