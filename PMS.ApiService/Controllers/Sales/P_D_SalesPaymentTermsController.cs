using PMS.ApiService.Tools;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Newtonsoft.Json.Linq;
using PMS.ApiService.Models;

namespace PMS.ApiService.Controllers.Sales
{
    public class P_D_SalesPaymentTermsController : BaseController, IBaseController
    {
        [HttpPost]
    public ResponseResult DeleteEntity(JObject data)
    {
        ResponseResult result = new Models.ResponseResult();
        result = Validation(ActionTypes.Delete, data);
        if (result.ResponseState == false)
            return result;

        var obj = JObjectData<P_D_SalesPaymentTerms>(data);
        obj.Entity = result.ResponseData as P_D_SalesPaymentTerms;
        data = JObjectToObj<P_D_SalesPaymentTerms>(obj.Entity, obj.Session);
        result = this.Execute<P_D_SalesPaymentTerms>(data, ActionTypes.Delete, this.Process);
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

                var obj = JObjectData<P_D_SalesPaymentTerms>(data);
                obj.Entity = result.ResponseData as P_D_SalesPaymentTerms;
                data = JObjectToObj<P_D_SalesPaymentTerms>(obj.Entity, obj.Session);
                result = this.Execute<P_D_SalesPaymentTerms>(data, ActionTypes.Insert, this.Process, db, dbTransaction);
                SessionRecord session = obj.Session;

                if (result.ResponseState)
                {
                    var SEC = JsonDeserialize<P_D_SalesPaymentTerms>(result.ResponseData.ToString());
                    ResponseResult res = Shared.InvTransactionProcess(session, SEC.PaymentId, "SLSpayTerm", db);
                    if (res.ResponseState == true)
                    {

                        dbTransaction.Commit();
                        SEC.PaymentCode = res.ResponseData.ToString();
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
        var result = this.Get<P_D_SalesPaymentTerms>(SqlStatement);
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

                var obj = JObjectData<P_D_SalesPaymentTerms>(data);
                obj.Entity = result.ResponseData as P_D_SalesPaymentTerms;
                data = JObjectToObj<P_D_SalesPaymentTerms>(obj.Entity, obj.Session);
                result = this.Execute<P_D_SalesPaymentTerms>(data, ActionTypes.Update, this.Process, db, dbTransaction);
                SessionRecord session = obj.Session;

                if (result.ResponseState)
                {
                    var SEC = JsonDeserialize<P_D_SalesPaymentTerms>(result.ResponseData.ToString());
                    ResponseResult res = Shared.InvTransactionProcess(session, SEC.PaymentId, "SLSpayTerm", db);
                    if (res.ResponseState == true)
                    {

                        dbTransaction.Commit();
                        SEC.PaymentCode = res.ResponseData.ToString();
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
        var obj = JObjectData<P_D_SalesPaymentTerms>(data);
        SessionRecord session = obj.Session;
        InitalizeLanguage(obj.Session.Language);

        var entity = obj.Entity;
        int compCode = int.Parse(obj.Session.CompCode);
        entity.CompCode = compCode;
        if (String.IsNullOrEmpty(entity.PaymentCode))
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

       
    }
}
