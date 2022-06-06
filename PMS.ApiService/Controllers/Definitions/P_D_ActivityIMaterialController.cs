using Newtonsoft.Json.Linq;
using PMS.ApiService.Models;
using PMS.ApiService.Tools;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace PMS.ApiService.Controllers
{
    public class P_D_ActivityIMaterialController : BaseController, IBaseController
    {
        [HttpPost]
        public ResponseResult DeleteEntity(JObject data)
        {
            ResponseResult result = new Models.ResponseResult();
            result = Validation(ActionTypes.Delete, data);
            if (result.ResponseState == false)
                return result;

            var obj = JObjectData<P_D_ActivityIMaterial>(data);
            obj.Entity = result.ResponseData as P_D_ActivityIMaterial;
            data = JObjectToObj<P_D_ActivityIMaterial>(obj.Entity, obj.Session);
            result = this.Execute<P_D_ActivityIMaterial>(data, ActionTypes.Delete, this.Process);
            return result;
        }

        public ResponseResult InsertCollection(JObject data)
        {
            throw new NotImplementedException();
        }

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

                    var obj = JObjectData<P_D_ActivityIMaterial>(data);
                    obj.Entity = result.ResponseData as P_D_ActivityIMaterial;
                    data = JObjectToObj<P_D_ActivityIMaterial>(obj.Entity, obj.Session);
                    result = this.Execute<P_D_ActivityIMaterial>(data, ActionTypes.Insert, this.Process, db, dbTransaction);
                    SessionRecord session = obj.Session;

                    if (result.ResponseState)
                    {
                        var SEC = JsonDeserialize<P_D_ActivityIMaterial>(result.ResponseData.ToString());
                        ResponseResult res = Shared.InvTransactionProcess(session, SEC.ActivityMaterialID, "Mat", db);
                        if (res.ResponseState == true)
                        {

                            dbTransaction.Commit();
                            result.ResponseData = JsonSerialize(SEC);
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

        public ResponseResult Process(ActionTypes actionType, JObject data)
        {
            ResponseResult result = new ResponseResult();
            result.ResponseState = true;
            return result;
        }

        [HttpGet]
        public object SelectEntity(string SqlStatement)
        {
            var result = this.Get<P_D_ActivityIMaterial>(SqlStatement);
            return result.ToList();
        }

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

                    var obj = JObjectData<P_D_ActivityIMaterial>(data);
                    obj.Entity = result.ResponseData as P_D_ActivityIMaterial;
                    data = JObjectToObj<P_D_ActivityIMaterial>(obj.Entity, obj.Session);
                    result = this.Execute<P_D_ActivityIMaterial>(data, ActionTypes.Update, this.Process, db, dbTransaction);
                    SessionRecord session = obj.Session;

                    if (result.ResponseState)
                    {
                        var SEC = JsonDeserialize<P_D_ActivityIMaterial>(result.ResponseData.ToString());
                        ResponseResult res = Shared.InvTransactionProcess(session, SEC.ActivityMaterialID, "Mat", db);
                        if (res.ResponseState == true)
                        {

                            dbTransaction.Commit();
                            result.ResponseData = JsonSerialize(SEC);
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

        public ResponseResult Validation(ActionTypes actionType, JObject data)
        {
            ResponseResult result = new ResponseResult();
            var obj = JObjectData<P_D_ActivityIMaterial>(data);
            InitalizeLanguage(obj.Session.Language);
            var entity = obj.Entity;
            switch (actionType)
            {
                case ActionTypes.Insert:
                    //if (entity.ActivityID != null && entity.ActivityID != 0)
                    //{
                    //    var parent = db.P_D_Activity.Where(f => f.ActivityID == obj.Entity.ActivityID).FirstOrDefault();
                    //    if (parent != null)
                    //    {
                    //        parent.IsDetail = false;

                    //        obj.Entity.ActivityID = parent.ActivityID;
                    //        //entity.IsDetail = true;
                    //        db.P_D_Activity.Attach(parent);
                    //        db.Entry(entity).State = System.Data.Entity.EntityState.Modified;
                    //        db.SaveChanges();
                    //    }
                    //}
                    //else
                    //{

                    //    //parent.IsDetail = true;
                    //    //db.P_D_Location.Attach(entity);
                    //    //db.Entry(entity).State = System.Data.Entity.EntityState.Modified;
                    //    //db.SaveChanges();
                    //}
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
    }
}
