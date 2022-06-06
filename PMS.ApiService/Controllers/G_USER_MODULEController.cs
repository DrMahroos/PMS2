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
    public class G_USER_MODULEController : BaseController, IBaseController
    {
        /// <summary>
        /// Select entity by Sql Statement
        /// </summary>
        /// <param name="SqlStatement"></param>
        /// <returns></returns>
        [HttpGet]
        public object SelectEntity(string SqlStatement)
        {
            var result = this.Get<G_USER_MODULE>(SqlStatement);
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
            result = Validation(ActionTypes.Insert, data);
            if (result.ResponseState == false)
                return result;

            var obj = JObjectData<G_USER_MODULE>(data);
            obj.Entity = result.ResponseData as G_USER_MODULE;
            data = JObjectToObj<G_USER_MODULE>(obj.Entity, obj.Session);
            result = this.Execute<G_USER_MODULE>(data, ActionTypes.Insert, this.Process);
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

            var obj = JObjectData<G_USER_MODULE>(data);
            obj.Entity = result.ResponseData as G_USER_MODULE;
            data = JObjectToObj<G_USER_MODULE>(obj.Entity, obj.Session);
            result = this.Execute<G_USER_MODULE>(data, ActionTypes.Update, this.Process);
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

            var obj = JObjectData<G_USER_MODULE>(data);
            obj.Entity = result.ResponseData as G_USER_MODULE;
            data = JObjectToObj<G_USER_MODULE>(obj.Entity, obj.Session);
            result = this.Execute<G_USER_MODULE>(data, ActionTypes.Delete, this.Process);
            return result;
            
        }
        public ResponseResult InsertCollection(JObject data)
        {
            ResponseResult result = new Models.ResponseResult();
            result = Validation(ActionTypes.InsertCollection, data);
            if (result.ResponseState == false)
                return result;

            var obj = JObjectData<G_USER_MODULE>(data);
            obj.Entity = result.ResponseData as G_USER_MODULE;
            data = JObjectToObj<G_USER_MODULE>(obj.Entity, obj.Session);
            result = this.Execute<G_USER_MODULE>(data, ActionTypes.InsertCollection, this.Process);
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
            var obj = JObjectData<G_USER_MODULE>(data);
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
