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
    public class P_Tr_SalesOfferStageItemController : BaseController, IBaseController
    {
        [HttpGet]
        public object SelectEntity(string SqlStatement)
        {
            var result = this.Get<P_Tr_SalesOfferStageItem>(SqlStatement);
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
                    var obj = JObjectData<P_Tr_SalesOfferStageItem>(data);
                    var entity = obj.Entity;
                    db.P_Tr_SalesOfferStageItem.Add(entity);
                    var _Res = db.SaveChanges();
                    if (_Res > 0)
                    {
                        result.ResponseState = true;
                        dbTransaction.Commit();
                        var _Data = db.PQ_GetSlsOfferStageItem.Where(x => x.OfferItemId == entity.OfferItemId).FirstOrDefault();
                        result.ResponseData = JsonSerialize(_Data);
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
                    var obj = JObjectData<P_Tr_SalesOfferStageItem>(data);
                    var entity = obj.Entity;
                    db.P_Tr_SalesOfferStageItem.Attach(entity);
                    db.Entry(entity).State = System.Data.Entity.EntityState.Modified;
                    var _Res = db.SaveChanges();
                    if (_Res > 0)
                    {
                        result.ResponseState = true;
                        dbTransaction.Commit();
                        var _Data = db.PQ_GetSlsOfferStageItem.Where(x => x.OfferItemId == entity.OfferItemId).FirstOrDefault();
                        result.ResponseData = JsonSerialize(_Data);
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
            var obj = JObjectData<P_Tr_SalesOfferStageItem>(data);
            var entity = obj.Entity;
            var list = db.P_Tr_SalesOfferStageItemActivity.Where(x => x.OfferItemId == entity.OfferItemId).ToList();
            db.P_Tr_SalesOfferStageItemActivity.RemoveRange(list);
            db.SaveChanges();
            db.P_Tr_SalesOfferStageItem.Remove(db.P_Tr_SalesOfferStageItem.Where(x => x.OfferItemId == entity.OfferItemId).FirstOrDefault());
            var _Res = db.SaveChanges();
            if (_Res > 0)
                result.ResponseState = true;
            return result;

        }
        public ResponseResult InsertCollection(JObject data)
        {
            throw new NotImplementedException();
        }
        public ResponseResult Validation(ActionTypes actionType, JObject data)
        {
            throw new NotImplementedException();
        }
        public ResponseResult Process(ActionTypes actionType, JObject data)
        {
            throw new NotImplementedException();
        }
    }
}
