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
    public class P_D_SalesCustomerCategoryController : BaseController, IBaseController
    {


        [HttpPost]
        public ResponseResult DeleteEntity(JObject data)
        {
            ResponseResult result = new Models.ResponseResult();
            result = Validation(ActionTypes.Delete, data);
            if (result.ResponseState == false)
                return result;

            var obj = JObjectData<P_D_SalesCustomerCategory>(data);
            obj.Entity = result.ResponseData as P_D_SalesCustomerCategory;
            data = JObjectToObj<P_D_SalesCustomerCategory>(obj.Entity, obj.Session);
            result = this.Execute<P_D_SalesCustomerCategory>(data, ActionTypes.Delete, this.Process);
            return result;
        }

        public ResponseResult InsertCollection(JObject data)
        {
            throw new NotImplementedException();
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

                    var obj = JObjectData<P_D_SalesCustomerCategory>(data);
                    obj.Entity = result.ResponseData as P_D_SalesCustomerCategory;
                    data = JObjectToObj<P_D_SalesCustomerCategory>(obj.Entity, obj.Session);
                    result = this.Execute<P_D_SalesCustomerCategory>(data, ActionTypes.Insert, this.Process, db, dbTransaction);
                    SessionRecord session = obj.Session;

                    if (result.ResponseState)
                    {
                        var SEC = JsonDeserialize<P_D_SalesCustomerCategory>(result.ResponseData.ToString());
                        ResponseResult res = Shared.InvTransactionProcess(session, SEC.CustomerCategoryID, "CustCat", db);
                        if (res.ResponseState == true)
                        {

                            dbTransaction.Commit();
                            SEC.CustomerCatCode = res.ResponseData.ToString();
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
            var result = this.Get<P_D_SalesCustomerCategory>(SqlStatement);
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

                    var obj = JObjectData<P_D_SalesCustomerCategory>(data);
                    obj.Entity = result.ResponseData as P_D_SalesCustomerCategory;
                    data = JObjectToObj<P_D_SalesCustomerCategory>(obj.Entity, obj.Session);
                    result = this.Execute<P_D_SalesCustomerCategory>(data, ActionTypes.Update, this.Process, db, dbTransaction);
                    SessionRecord session = obj.Session;

                    if (result.ResponseState)
                    {
                        var SEC = JsonDeserialize<P_D_SalesCustomerCategory>(result.ResponseData.ToString());
                        ResponseResult res = Shared.InvTransactionProcess(session, SEC.CustomerCategoryID, "CustCat", db);
                        if (res.ResponseState == true)
                        {

                            dbTransaction.Commit();
                            SEC.CustomerCatCode = res.ResponseData.ToString();
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
            var obj = JObjectData<P_D_SalesCustomerCategory>(data);
            SessionRecord session = obj.Session;
            InitalizeLanguage(obj.Session.Language);

            var entity = obj.Entity;
            int compCode = int.Parse(obj.Session.CompCode);
            entity.CompCode = compCode;
            if (String.IsNullOrEmpty(entity.CustomerCatCode))
            {
                result.ResponseState = false;
                return result;
            }



            if (String.IsNullOrEmpty(entity.DescA) && String.IsNullOrEmpty(entity.DescE))
            {
                result.ResponseState = false;
                return result;
            }

            if (String.IsNullOrEmpty(entity.DescA))
                entity.DescA = entity.DescE;
            if (String.IsNullOrEmpty(entity.DescE))
                entity.DescE = entity.DescA;


            switch (actionType)
            {
                case ActionTypes.Insert:
                    if (String.IsNullOrEmpty(obj.Entity.DescA))
                        obj.Entity.DescA = obj.Entity.DescE;
                    if (String.IsNullOrEmpty(obj.Entity.DescE))
                        obj.Entity.DescE = obj.Entity.DescA;

                    obj.Entity.CompCode = int.Parse(session.CompCode);

                    result.ResponseData = obj.Entity;
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
        [HttpGet]
        public List<P_D_SalesCustomerCategory> GetList()
        {
            var res = db.P_D_SalesCustomerCategory.ToList();
            return res;
        }
        [HttpPost, AllowAnonymous]
        public IHttpActionResult UpdateLst([FromBody]List<P_D_SalesCustomerCategory> CategoryList)
        {

            using (var dbTrans = db.Database.BeginTransaction())
            {
                try
                {
                    var inserted = CategoryList.Where(x => x.StatusFlag == "i").ToList();
                    var updated = CategoryList.Where(x => x.StatusFlag == "u").ToList();
                    var deleted = CategoryList.Where(x => x.StatusFlag == "d").ToList();
                    foreach (var item in inserted)
                    {
                        db.P_D_SalesCustomerCategory.Add(item);
                        db.Entry(item).State = System.Data.Entity.EntityState.Added; 
                    }
                    foreach (var item in updated)
                    {
                        db.P_D_SalesCustomerCategory.Attach(item);
                        db.Entry(item).State = System.Data.Entity.EntityState.Modified;
                    }
                    foreach (var item in deleted)
                    {
                    //db.P_D_SalesCustomerCategory.Remove(item);
                        db.Database.ExecuteSqlCommand("DELETE FROM [dbo].[P_D_SalesCustomerCategory] WHERE CustomerCategoryID = " + item.CustomerCategoryID + "");

                    }
                    db.SaveChanges();
                    dbTrans.Commit();
                    return Ok(CategoryList);
                }
                catch (Exception ex)
                {
                    dbTrans.Rollback();
                    return Ok(ex.Message);
                }
            }

        }

    }
}
