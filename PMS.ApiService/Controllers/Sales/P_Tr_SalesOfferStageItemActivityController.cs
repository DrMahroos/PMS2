using PMS.ApiService.Tools;
using PMS.ApiService.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Newtonsoft.Json.Linq;

namespace PMS.ApiService.Controllers.Sales
{
    public class P_Tr_SalesOfferStageItemActivityController : BaseController, IBaseController
    {
        /// <summary>
        /// Select entity by Sql Statement
        /// </summary>
        /// <param name="SqlStatement"></param>
        /// <returns></returns>
        [HttpGet]
        public object SelectEntity(string SqlStatement)
        {
            var result = this.Get<P_Tr_SalesOfferStageItemActivity>(SqlStatement);
            return result.ToList();
        }


        /// <summary>
        /// Insert entity, data contains elements like Entity,SessionRecord ... etc
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
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

                    var obj = JObjectData<P_Tr_SalesOfferStageItemActivity>(data);
                    obj.Entity = result.ResponseData as P_Tr_SalesOfferStageItemActivity;
                    data = JObjectToObj<P_Tr_SalesOfferStageItemActivity>(obj.Entity, obj.Session);
                    result = this.Execute<P_Tr_SalesOfferStageItemActivity>(data, ActionTypes.Insert, this.Process, db, dbTransaction);
                    SessionRecord session = obj.Session;

                    if (result.ResponseState)
                    {
                        var ItemAct = JsonDeserialize<P_Tr_SalesOfferStageItemActivity>(result.ResponseData.ToString());
                        ResponseResult res = Shared.InvTransactionProcess(session, ItemAct.OfferStageItemActivityId, "ItemAct", db);
                        if (res.ResponseState == true)
                        {
                            dbTransaction.Commit();
                            result.ResponseData = JsonSerialize(ItemAct);
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

        /// <summary>
        /// Update entity, data contains elements like Entity,SessionRecord ... etc
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
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

                    var obj = JObjectData<P_Tr_SalesOfferStageItemActivity>(data);
                    obj.Entity = result.ResponseData as P_Tr_SalesOfferStageItemActivity;
                    data = JObjectToObj<P_Tr_SalesOfferStageItemActivity>(obj.Entity, obj.Session);
                    result = this.Execute<P_Tr_SalesOfferStageItemActivity>(data, ActionTypes.Update, this.Process, db, dbTransaction);
                    SessionRecord session = obj.Session;

                    if (result.ResponseState)
                    {
                        var ItemAct = JsonDeserialize<P_Tr_SalesOfferStageItemActivity>(result.ResponseData.ToString());
                        ResponseResult res = Shared.InvTransactionProcess(session, ItemAct.OfferStageItemActivityId, "ItemAct", db);
                        if (res.ResponseState == true)
                        {

                            dbTransaction.Commit();
                            result.ResponseData = JsonSerialize(ItemAct);
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

        /// <summary>
        /// Delete entity, data contains elements like Entity,SessionRecord ... etc
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
        /// 
        [HttpGet]
        public HttpResponseMessage Delete(int id)
        {
            var res = db.P_Tr_SalesOfferStageItemActivity.Where(x => x.OfferStageItemActivityId == id).FirstOrDefault();
            if (res != null)
            {
                db.P_Tr_SalesOfferStageItemActivity.Remove(res);
                db.SaveChanges();
                return Request.CreateResponse(HttpStatusCode.OK);
            }
            else
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }

        }

        [HttpPost]
        public ResponseResult DeleteEntity(JObject data)
        {
            ResponseResult result = new Models.ResponseResult();
            result = Validation(ActionTypes.Delete, data);
            if (result.ResponseState == false)
                return result;

            var obj = JObjectData<P_Tr_SalesOfferStageItemActivity>(data);
            obj.Entity = result.ResponseData as P_Tr_SalesOfferStageItemActivity;
            data = JObjectToObj<P_Tr_SalesOfferStageItemActivity>(obj.Entity, obj.Session);
            result = this.Execute<P_Tr_SalesOfferStageItemActivity>(data, ActionTypes.Delete, this.Process);
            return result;

        }
        public ResponseResult InsertCollection(JObject data)
        {
            ResponseResult result = new Models.ResponseResult();
            result = Validation(ActionTypes.InsertCollection, data);
            if (result.ResponseState == false)
                return result;

            var obj = JObjectData<P_Tr_SalesOfferStageItemActivity>(data);
            obj.Entity = result.ResponseData as P_Tr_SalesOfferStageItemActivity;
            data = JObjectToObj<P_Tr_SalesOfferStageItemActivity>(obj.Entity, obj.Session);
            result = this.Execute<P_Tr_SalesOfferStageItemActivity>(data, ActionTypes.InsertCollection, this.Process);
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
            var obj = JObjectData<P_Tr_SalesOfferStageItemActivity>(data);
            result.ResponseState = true;
            result.ResponseData = obj.Entity;
            return result;
        }
    }
}
