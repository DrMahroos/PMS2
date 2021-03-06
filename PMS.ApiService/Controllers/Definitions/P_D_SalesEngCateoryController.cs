using PMS.ApiService.Tools;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Newtonsoft.Json.Linq;
using PMS.ApiService.Models;

namespace PMS.ApiService.Controllers
{
    public class P_D_SalesEngCateoryController : BaseController, IBaseController
    {
        [HttpGet]
        public object SelectEntity(string SqlStatement)
        {
            var result = this.Get<P_D_SalesEngCateory>(SqlStatement);
            return result.ToList();
        }
        [HttpPost]
        public ResponseResult DeleteEntity(JObject data)
        {
            ResponseResult result = new Models.ResponseResult();
            result = Validation(ActionTypes.Delete, data);
            if (result.ResponseState == false)
                return result;

            var obj = JObjectData<P_D_SalesEngCateory>(data);
            obj.Entity = result.ResponseData as P_D_SalesEngCateory;
            data = JObjectToObj<P_D_SalesEngCateory>(obj.Entity, obj.Session);
            result = this.Execute<P_D_SalesEngCateory>(data, ActionTypes.Delete, this.Process);
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

                    var obj = JObjectData<P_D_SalesEngCateory>(data);
                    obj.Entity = result.ResponseData as P_D_SalesEngCateory;
                    data = JObjectToObj<P_D_SalesEngCateory>(obj.Entity, obj.Session);
                    result = this.Execute<P_D_SalesEngCateory>(data, ActionTypes.Insert, this.Process, db, dbTransaction);
                    SessionRecord session = obj.Session;

                    if (result.ResponseState)
                    {
                        var SalesCat = JsonDeserialize<P_D_SalesEngCateory>(result.ResponseData.ToString());
                        ResponseResult res = Shared.InvTransactionProcess(session, SalesCat.SalesEngCategoryId, "SalesCat", db);
                        if (res.ResponseState == true)
                        {

                            dbTransaction.Commit();
                            SalesCat.CategCode = res.ResponseData.ToString();
                            result.ResponseData = JsonSerialize(SalesCat);
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

                    var obj = JObjectData<P_D_SalesEngCateory>(data);
                    obj.Entity = result.ResponseData as P_D_SalesEngCateory;
                    data = JObjectToObj<P_D_SalesEngCateory>(obj.Entity, obj.Session);
                    result = this.Execute<P_D_SalesEngCateory>(data, ActionTypes.Update, this.Process, db, dbTransaction);
                    SessionRecord session = obj.Session;

                    if (result.ResponseState)
                    {
                        var SalesCat = JsonDeserialize<P_D_SalesEngCateory>(result.ResponseData.ToString());
                        ResponseResult res = Shared.InvTransactionProcess(session, SalesCat.SalesEngCategoryId, "SalesCat", db);
                        if (res.ResponseState == true)
                        {

                            dbTransaction.Commit();
                            SalesCat.CategCode = res.ResponseData.ToString();
                            result.ResponseData = JsonSerialize(SalesCat);
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
            var obj = JObjectData<P_D_SalesEngCateory>(data);
            SessionRecord session = obj.Session;
            InitalizeLanguage(obj.Session.Language);

            if (String.IsNullOrEmpty(obj.Entity.DescA) && String.IsNullOrEmpty(obj.Entity.DescE))
            {
                result.ResponseState = false;
                result.ResponseMessage = "";//Resources.SystemResource.Msg_Required;
                return result;
            }

            switch (actionType)
            {
                case ActionTypes.Insert:
                    if (String.IsNullOrEmpty(obj.Entity.DescA))
                        obj.Entity.DescA = obj.Entity.DescE;
                    if (String.IsNullOrEmpty(obj.Entity.DescE))
                        obj.Entity.DescE = obj.Entity.DescA;


                    obj.Entity.CompCode = int.Parse(session.CompCode);
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
