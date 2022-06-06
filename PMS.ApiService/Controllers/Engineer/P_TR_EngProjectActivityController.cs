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
    public class P_TR_EngProjectActivityController : BaseController, IBaseController
    {
        [HttpGet]
        public object SelectEntity(string SqlStatement)
        {
            var result = this.Get<P_TR_EngProjectActivity>(SqlStatement);
            return result.ToList();
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

                    var obj = JObjectData<P_TR_EngProjectActivity>(data);
                    obj.Entity = result.ResponseData as P_TR_EngProjectActivity;
                    data = JObjectToObj<P_TR_EngProjectActivity>(obj.Entity, obj.Session);
                    result = this.Execute<P_TR_EngProjectActivity>(data, ActionTypes.Update, this.Process, db, dbTransaction);
                    SessionRecord session = obj.Session;

                    if (result.ResponseState)
                    {
                        var ProPhIt = JsonDeserialize<P_TR_EngProjectActivity>(result.ResponseData.ToString());
                        ResponseResult res = Shared.InvTransactionProcess(session, ProPhIt.ProjectPhaseItemActivId, "Activ", db);
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
        public ResponseResult DeleteEntity(JObject data)
        {
            throw new NotImplementedException();
        }
        public ResponseResult InsertCollection(JObject data)
        {
            throw new NotImplementedException();
        }
        public ResponseResult InsertEntity(JObject data)
        {
            throw new NotImplementedException();
        }
        public ResponseResult Validation(ActionTypes actionType, JObject data)
        {
            ResponseResult result = new ResponseResult();
            var obj = JObjectData<P_TR_EngProjectActivity>(data);
            InitalizeLanguage(obj.Session.Language);

            var entity = obj.Entity;
            int compCode = int.Parse(obj.Session.CompCode);

            result.ResponseState = true;
            result.ResponseData = obj.Entity;
            return result;
        }
        public ResponseResult Process(ActionTypes actionType, JObject data)
        {
            ResponseResult result = new ResponseResult();
            result.ResponseState = true;
            return result;
        }
    }
}
