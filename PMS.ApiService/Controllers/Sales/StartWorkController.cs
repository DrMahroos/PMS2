using Newtonsoft.Json.Linq;
using PMS.ApiService.Models;
using PMS.ApiService.Tools;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace PMS.ApiService.Controllers.Sales
{
    public class StartWorkController : BaseController, IBaseController
    {
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

        public ResponseResult Process(ActionTypes actionType, JObject data)
        {
            ResponseResult result = new ResponseResult();
            result.ResponseState = true;
            return result;
        }

        [HttpGet]
        public object SelectEntity(string SqlStatement)
        {
            var result = this.Get<P_TR_SalesOffer>(SqlStatement);
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

                    var obj = JObjectData<P_TR_SalesOffer>(data);
                    obj.Entity = result.ResponseData as P_TR_SalesOffer;
                    data = JObjectToObj<P_TR_SalesOffer>(obj.Entity, obj.Session);
                    result = this.Execute<P_TR_SalesOffer>(data, ActionTypes.Update, this.Process, db, dbTransaction);
                    SessionRecord session = obj.Session;

                    if (result.ResponseState)
                    {
                        var off = JsonDeserialize<P_TR_SalesOffer>(result.ResponseData.ToString());
                        ResponseResult res = Shared.InvTransactionProcess(session, off.OfferID, "SlsOffWSO", db);
                        if (res.ResponseState == true)
                        {

                            dbTransaction.Commit();
                            result.ResponseData = JsonSerialize(off);
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
            var obj = JObjectData<P_TR_SalesOffer>(data);
            InitalizeLanguage(obj.Session.Language);

            var entity = obj.Entity;
            int compCode = int.Parse(obj.Session.CompCode);
            entity.CompCode = compCode;
            if (String.IsNullOrEmpty(entity.DescA) && String.IsNullOrEmpty(entity.DescL))
            {
                result.ResponseState = false;
                result.ResponseMessage = "";//Resources.SystemResource.Msg_Required;
                return result;
            }

            if (String.IsNullOrEmpty(entity.DescA))
                entity.DescA = entity.DescL;
            if (String.IsNullOrEmpty(entity.DescL))
                entity.DescL = entity.DescA;
            switch (actionType)
            {
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
