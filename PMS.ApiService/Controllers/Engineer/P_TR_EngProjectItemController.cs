using PMS.ApiService.Tools;
using PMS.ApiService.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Newtonsoft.Json.Linq;

namespace PMS.ApiService.Controllers.Engineer
{
    public class P_TR_EngProjectItemController : BaseController, IBaseController
    {
        [HttpGet]
        public object SelectEntity(string SqlStatement)
        {
            var result = this.Get<P_TR_EngProjectItem>(SqlStatement);
            return result.ToList();
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
                        var ProPhIt = JsonDeserialize<P_TR_EngProjectItem>(result.ResponseData.ToString());
                        ResponseResult res = Shared.InvTransactionProcess(session, ProPhIt.ProjectPhaseItemId, "Equ", db);
                        if (res.ResponseState == true)
                        {

                            dbTransaction.Commit();
                            result.ResponseData = JsonSerialize(ProPhIt);
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
                        var ProPhIt = JsonDeserialize<P_TR_EngProjectItem>(result.ResponseData.ToString());
                        ResponseResult res = Shared.InvTransactionProcess(session, ProPhIt.ProjectPhaseItemId, "Equ", db);
                        if (res.ResponseState == true)
                        {

                            dbTransaction.Commit();
                            result.ResponseData = JsonSerialize(ProPhIt);
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

            var obj = JObjectData<P_TR_EngProjectItem>(data);
            obj.Entity = result.ResponseData as P_TR_EngProjectItem;
            data = JObjectToObj<P_TR_EngProjectItem>(obj.Entity, obj.Session);
            result = this.Execute<P_TR_EngProjectItem>(data, ActionTypes.Delete, this.Process);
            return result;

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
            
            result.ResponseState = true;
            result.ResponseData = obj.Entity;
            return result;
        }
    }
}
