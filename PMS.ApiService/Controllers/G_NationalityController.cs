using PMS.ApiService.Tools;
using PMS.ApiService.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Newtonsoft.Json.Linq;

namespace PMS.ApiService.Controllers
{
    public class G_NationalityController : BaseController, IBaseController
    {
        /// <summary>
        /// Select entity by Sql Statement
        /// </summary>
        /// <param name="SqlStatement"></param>
        /// <returns></returns>
        [HttpGet]
        public object SelectEntity(string SqlStatement)
        {
            var result = this.Get<G_Nationality>(SqlStatement);
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

                    var obj = JObjectData<G_Nationality>(data);
                    obj.Entity = result.ResponseData as G_Nationality;
                    data = JObjectToObj<G_Nationality>(obj.Entity, obj.Session);
                    result = this.Execute<G_Nationality>(data, ActionTypes.Insert, this.Process, db, dbTransaction);
                    SessionRecord session = obj.Session;

                    if (result.ResponseState)
                    {
                        var Nat = JsonDeserialize<G_Nationality>(result.ResponseData.ToString());
                        ResponseResult res = Shared.InvTransactionProcess(session, Nat.NationalityID, "National", db);
                        if (res.ResponseState == true)
                        {

                            dbTransaction.Commit();
                            Nat.NationalityCode = res.ResponseData.ToString();
                            result.ResponseData = JsonSerialize(Nat);
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

                    var obj = JObjectData<G_Nationality>(data);
                    obj.Entity = result.ResponseData as G_Nationality;
                    data = JObjectToObj<G_Nationality>(obj.Entity, obj.Session);
                    result = this.Execute<G_Nationality>(data, ActionTypes.Update, this.Process, db, dbTransaction);
                    SessionRecord session = obj.Session;

                    if (result.ResponseState)
                    {
                        var Nat = JsonDeserialize<G_Nationality>(result.ResponseData.ToString());
                        ResponseResult res = Shared.InvTransactionProcess(session, Nat.NationalityID, "National", db);
                        if (res.ResponseState == true)
                        {

                            dbTransaction.Commit();
                            Nat.NationalityCode = res.ResponseData.ToString();
                            result.ResponseData = JsonSerialize(Nat);
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
        [HttpPost]
        public ResponseResult DeleteEntity(JObject data)
        {
            ResponseResult result = new Models.ResponseResult();
            result = Validation(ActionTypes.Delete, data);
            if (result.ResponseState == false)
                return result;

            var obj = JObjectData<G_Nationality>(data);
            obj.Entity = result.ResponseData as G_Nationality;
            data = JObjectToObj<G_Nationality>(obj.Entity, obj.Session);
            result = this.Execute<G_Nationality>(data, ActionTypes.Delete, this.Process);
            return result;
            
        }
        public ResponseResult InsertCollection(JObject data)
        {
            ResponseResult result = new Models.ResponseResult();
            result = Validation(ActionTypes.InsertCollection, data);
            if (result.ResponseState == false)
                return result;

            var obj = JObjectData<G_Nationality>(data);
            obj.Entity = result.ResponseData as G_Nationality;
            data = JObjectToObj<G_Nationality>(obj.Entity, obj.Session);
            result = this.Execute<G_Nationality>(data, ActionTypes.InsertCollection, this.Process);
            return result;
        }
        
        

        public ResponseResult Process(ActionTypes actionType, JObject data)
        {
            ResponseResult result = new ResponseResult();
            result.ResponseState = true;
            return result;
        }

        public ResponseResult Validation(ActionTypes actionType,JObject data)
        {
            ResponseResult result = new ResponseResult();
            var obj = JObjectData<G_Nationality>(data);
            SessionRecord session = obj.Session;
            InitalizeLanguage(obj.Session.Language);

            if (String.IsNullOrEmpty(obj.Entity.DescA) && String.IsNullOrEmpty(obj.Entity.DescL))
            {
                result.ResponseState = false;
                result.ResponseMessage = "";//Resources.SystemResource.Msg_Required;
                return result;
            }

            switch (actionType)
            {
                case ActionTypes.Insert:
                    if (String.IsNullOrEmpty(obj.Entity.DescA))
                        obj.Entity.DescA = obj.Entity.DescL;
                    if (String.IsNullOrEmpty(obj.Entity.DescL))
                        obj.Entity.DescL = obj.Entity.DescA;


                    obj.Entity.COMP_CODE = int.Parse(session.CompCode);
                    //obj.Entity.CreatedBy = session.UserCode;
                    //obj.Entity.CreatedAt = DateTime.Now;

                    result.ResponseData = obj.Entity;
                    break;
                case ActionTypes.Update:
                    // obj.Entity.UpdatedAt = DateTime.Now;
                    // obj.Entity.UpdatedBy = session.UserCode;
                    result.ResponseData = obj.Entity;
                    break;
                case ActionTypes.Delete:
                    result.ResponseData = obj.Entity;
                    break;
                case ActionTypes.InsertCollection:
                    result.ResponseData = obj.Collection;
                    break;
                default:
                    break;
            }
            result.ResponseState = true;

            return result;
        }
    }
}
