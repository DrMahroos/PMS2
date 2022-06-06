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
    public class P_ControlController : BaseController, IBaseController
    {
        /// <summary>
        /// Select entity by Sql Statement
        /// </summary>
        /// <param name="SqlStatement"></param>
        /// <returns></returns>
        [HttpGet]
        public object SelectEntity(string SqlStatement)
        {
            var result = this.Get<P_Control>(SqlStatement);
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

                    var obj = JObjectData<P_Control>(data);
                    obj.Entity = result.ResponseData as P_Control;
                    SessionRecord session = obj.Session;

                    data = JObjectToObj<P_Control>(obj.Entity, obj.Session);
                    result = this.Execute<P_Control>(data, ActionTypes.Insert, this.Process, db, dbTransaction);
                    if (result.ResponseState)
                    {
                        var Sett = JsonDeserialize<P_Control>(result.ResponseData.ToString());
                        dbTransaction.Commit();
                        result.ResponseData = JsonSerialize(Sett);
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
            result = Validation(ActionTypes.Update, data);
            if (result.ResponseState == false)
                return result;

            var obj = JObjectData<P_Control>(data);
            obj.Entity = result.ResponseData as P_Control;
            data = JObjectToObj<P_Control>(obj.Entity, obj.Session);
            result = this.Execute<P_Control>(data, ActionTypes.Update, this.Process);
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

            var obj = JObjectData<P_Control>(data);
            obj.Entity = result.ResponseData as P_Control;
            data = JObjectToObj<P_Control>(obj.Entity, obj.Session);
            result = this.Execute<P_Control>(data, ActionTypes.Delete, this.Process);
            return result;
            
        }
        public ResponseResult InsertCollection(JObject data)
        {
            ResponseResult result = new Models.ResponseResult();
            result = Validation(ActionTypes.InsertCollection, data);
            if (result.ResponseState == false)
                return result;

            var obj = JObjectData<P_Control>(data);
            obj.Entity = result.ResponseData as P_Control;
            data = JObjectToObj<P_Control>(obj.Entity, obj.Session);
            result = this.Execute<P_Control>(data, ActionTypes.InsertCollection, this.Process);
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
            var obj = JObjectData<P_Control>(data);
            InitalizeLanguage(obj.Session.Language);
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



    }
}
