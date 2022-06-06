using Newtonsoft.Json.Linq;
using PMS.ApiService.Models;
using PMS.ApiService.Models.CustomEntities;
using PMS.ApiService.Tools;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace PMS.ApiService.Controllers.Sales
{
    public class P_D_SalesCustomerController : BaseController, IMasterDetailsoBJController<P_D_SalesCustomer, M_D_SalesCustomer>
    {
        [HttpPost]
        public ResponseResult DeleteEntity(JObject data)
        {
            ResponseResult result = new Models.ResponseResult();
            result = Validation(ActionTypes.Delete, data);
            if (result.ResponseState == false)
                return result;

            var obj = JObjectData<P_D_SalesCustomer>(data);
            obj.Entity = result.ResponseData as P_D_SalesCustomer;
            data = JObjectToObj<P_D_SalesCustomer>(obj.Entity, obj.Session);
            result = this.Execute<P_D_SalesCustomer>(data, ActionTypes.Delete, this.Process);
            return result;
        }

       

        public ResponseResult InsertCollection(JObject data)
        {
            throw new NotImplementedException();
        }

        public ResponseResult InsertMasterDetails(JObject data)
        {
            ResponseResult result = new ResponseResult();
            var obj1 = JObjMasterManyDetails<P_D_SalesCustomer, M_D_SalesCustomer>(data);

            var obj = JObjMasterManyDetails<P_D_SalesCustomer, M_D_SalesCustomer>(data);
            SessionRecord session = obj1.Session;
            P_D_SalesCustomer master = obj1.Master;
            M_D_SalesCustomer details = obj1.Details;
            result = MasterDetailsValidation(master, details, session);
            if (result.ResponseState == false)
                return result;
            obj = JObjMasterManyDetails<P_D_SalesCustomer, M_D_SalesCustomer>(result.ResponseData as JObject);
            session = obj.Session;
            master = obj.Master;
            details = obj.Details;
            master.CreatedAt = DateTime.Now;
            master.CreatedBy = session.UserCode;
            //Start Details
            List<P_D_SalesCustomerDocModel> SalesInvoiceDetail = details.P_D_SalesCustomerDoc;

            using (var dbTrans = db.Database.BeginTransaction())
            {
                try
                {
                    db.P_D_SalesCustomer.Add(master);
                    var _Res = db.SaveChanges();
                    dbTrans.Commit();
                    result.ResponseData = master.CustomerID;

                }
                catch (Exception ex)
                {
                    dbTrans.Rollback();
                    result.ResponseMessage = ex.Message;
                    result.ResponseState = false;
                }
                return result;
            }
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

                    var obj = JObjectData<P_D_SalesCustomer>(data);
                    obj.Entity = result.ResponseData as P_D_SalesCustomer;
                    data = JObjectToObj<P_D_SalesCustomer>(obj.Entity, obj.Session);
                    result = this.Execute<P_D_SalesCustomer>(data, ActionTypes.Insert, this.Process, db, dbTransaction);
                    SessionRecord session = obj.Session;

                    if (result.ResponseState)
                    {
                        var SEC = JsonDeserialize<P_D_SalesCustomer>(result.ResponseData.ToString());
                        ResponseResult res = Shared.InvTransactionProcess(session, SEC.CustomerID, "SlsCust", db);
                        if (res.ResponseState == true)
                        {

                            dbTransaction.Commit();
                            //SEC.CustomerCode = (int)res.ResponseData;
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


        public ResponseResult MasterDetailsValidation(P_D_SalesCustomer Master, M_D_SalesCustomer Details, SessionRecord Session)
        {
            ResponseResult result = new ResponseResult();
            var obj = new
            {
                Master = Master,
                Details = Details,
                Session = Session
            };

            result.ResponseData = JObject.FromObject(obj);
            result.ResponseState = true;
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
            var result = this.Get<P_D_SalesCustomer>(SqlStatement);
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

                    var obj = JObjectData<P_D_SalesCustomer>(data);
                    obj.Entity = result.ResponseData as P_D_SalesCustomer;
                    data = JObjectToObj<P_D_SalesCustomer>(obj.Entity, obj.Session);
                    result = this.Execute<P_D_SalesCustomer>(data, ActionTypes.Update, this.Process, db, dbTransaction);
                    SessionRecord session = obj.Session;

                    if (result.ResponseState)
                    {
                        var SEC = JsonDeserialize<P_D_SalesCustomer>(result.ResponseData.ToString());
                        ResponseResult res = Shared.InvTransactionProcess(session, SEC.CustomerID, "SlsCust", db);
                        if (res.ResponseState == true)
                        {

                            dbTransaction.Commit();
                            //SEC.CustomerCode = (int)res.ResponseData;
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

        public ResponseResult UpdateMasterDetails(JObject data)
        {
            throw new NotImplementedException();
        }

        public ResponseResult Validation(ActionTypes actionType, JObject data)
        {
            ResponseResult result = new ResponseResult();
            var obj = JObjectData<P_D_SalesCustomer>(data);
            SessionRecord session = obj.Session;
            InitalizeLanguage(obj.Session.Language);

            var entity = obj.Entity;
            int compCode = int.Parse(obj.Session.CompCode);
            entity.CompCode = compCode;

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



        [HttpPost, AllowAnonymous]
        public IHttpActionResult UpdateMasterDetail([FromBody]M_D_SalesCustomer data)
        {
            BaseResponse result = new BaseResponse();
            P_D_SalesCustomer master = data.P_D_SalesCustomer;
            //if (master.VatType == 1 ) {
            //    var cnt = db.P_D_SalesCustomer.Count(x => (x.VatNo == master.VatNo && x.CompCode == master.CompCode && x.CustomerID != master.CustomerID));
            //    if (cnt > 0)
            //    {

            //        result.ErrorMessage = "Repeated Vat no الرقم الضريبي مكرر";
            //        result.IsSuccess = false;
            //        return Ok(result);
            //    }
            //}
            
            using (var dbTrans = db.Database.BeginTransaction())
            {
                try
                {
                    SessionRecord session = data.sessionRecord;
                    
                    List<P_D_SalesCustomerDocModel> SalesCustomerDoc = data.P_D_SalesCustomerDoc;
                    master.UpdatedBy = session.UserCode;
                    master.UpdatedAt = DateTime.Now;
                    //Deleting The Details

                    db.P_D_SalesCustomer.Attach(master);
                    db.Entry(master).State = System.Data.Entity.EntityState.Modified;
                    db.SaveChanges();
                    var insertedObjects = SalesCustomerDoc.Where(x => x.StatusFlag == "i").ToList();
                    var updatedObjects = SalesCustomerDoc.Where(x => x.StatusFlag == "u").ToList();
                    var deletedObjects = SalesCustomerDoc.Where(x => x.StatusFlag == "d").ToList();

                    foreach (var item in updatedObjects)
                    {
                        P_D_SalesCustomerDoc CustomerDoc = new P_D_SalesCustomerDoc();
                        CustomerDoc.CusIDTypeCode = item.CusIDTypeCode;
                        CustomerDoc.CustomerDocID = item.CustomerDocID;
                        CustomerDoc.CustomerId = item.CustomerId;
                        CustomerDoc.IDExpireDate = item.IDExpireDate;
                        CustomerDoc.IDExpireDateH = item.IDExpireDateH;
                        CustomerDoc.IDIssueDate = item.IDIssueDate;
                        CustomerDoc.IDIssueDateH = item.IDIssueDateH;
                        CustomerDoc.IDIssuePlace = item.IDIssuePlace;
                        CustomerDoc.IDNo = item.IDNo;
                        db.Entry(CustomerDoc).State = System.Data.Entity.EntityState.Modified;
                    }
                    foreach (var item in insertedObjects)
                    {
                        P_D_SalesCustomerDoc CustomerDoc = new P_D_SalesCustomerDoc();
                        CustomerDoc.CusIDTypeCode = item.CusIDTypeCode;
                        CustomerDoc.CustomerDocID = item.CustomerDocID;
                        CustomerDoc.CustomerId = item.CustomerId;
                        CustomerDoc.IDExpireDate = item.IDExpireDate;
                        CustomerDoc.IDExpireDateH = item.IDExpireDateH;
                        CustomerDoc.IDIssueDate = item.IDIssueDate;
                        CustomerDoc.IDIssueDateH = item.IDIssueDateH;
                        CustomerDoc.IDIssuePlace = item.IDIssuePlace;
                        CustomerDoc.IDNo = item.IDNo;
 
                        db.P_D_SalesCustomerDoc.Add(CustomerDoc);

                    }
                    foreach (var item in deletedObjects)
                    {
                       
 
                        db.Database.ExecuteSqlCommand("DELETE  from  P_D_SalesCustomerDoc  where CustomerDocID = " + item.CustomerDocID);

  

                    }
                    db.SaveChanges();


                    ResponseResult res = Shared.InvTransactionProcess(session, master.CustomerID, "SlsCust", db);
                    if (res.ResponseState == true)
                    {

                        dbTrans.Commit();
                        result.Response = master.CustomerID;
                        result.IsSuccess = true;
                    }
                    else

                    {
                        dbTrans.Rollback();
                        result.Response = res.ResponseMessage;
                        result.IsSuccess = false;
                    }
                }
                catch (Exception ex)
                {
                    dbTrans.Rollback();
                    result.Response = ex.Message;
                    result.IsSuccess = false;
                }
            }
            return Ok(result);
        }

        [HttpPost, AllowAnonymous]
        public IHttpActionResult InsertMasterDetail([FromBody]M_D_SalesCustomer data)
        {
            BaseResponse result = new BaseResponse();
            P_D_SalesCustomer master = data.P_D_SalesCustomer;
            if (master.VatType == 1 ) {
                var cnt = db.P_D_SalesCustomer.Count(x => (x.VatNo == master.VatNo && x.CompCode == master.CompCode && x.CustomerID != master.CustomerID));
                if (cnt > 0)
                {

                    result.ErrorMessage = "Repeated Vat no الرقم الضريبي مكرر";
                    result.IsSuccess = false;
                    return Ok(result);
                }
            }
            

            using (var dbTrans = db.Database.BeginTransaction())
            {
                try
                {

                    
                    SessionRecord session = data.sessionRecord;
                    
                    List<P_D_SalesCustomerDocModel> SalesCustomerDoc = data.P_D_SalesCustomerDoc;
                    master.CreatedBy = session.UserCode;
                    master.CreatedAt = DateTime.Now;
                    db.P_D_SalesCustomer.Add(master);
                    var _Res = db.SaveChanges();
                    if (_Res > 0)
                    {
                        foreach (var item in SalesCustomerDoc)
                        {
                            P_D_SalesCustomerDoc CustomerDoc = new P_D_SalesCustomerDoc();
                            CustomerDoc.CusIDTypeCode = item.CusIDTypeCode;
                            CustomerDoc.CustomerDocID = item.CustomerDocID;
                            CustomerDoc.CustomerId = master.CustomerID;
                            CustomerDoc.IDExpireDate = item.IDExpireDate;
                            CustomerDoc.IDExpireDateH = item.IDExpireDateH;
                            CustomerDoc.IDIssueDate = item.IDIssueDate;
                            CustomerDoc.IDIssueDateH = item.IDIssueDateH;
                            CustomerDoc.IDIssuePlace = item.IDIssuePlace;
                            CustomerDoc.IDNo = item.IDNo;
                            db.Entry(CustomerDoc).State = System.Data.Entity.EntityState.Added;
                        }
                        //db.P_D_SalesCustomerDoc.AddRange(SalesCustomerDoc);
                        db.SaveChanges();

                         
                        ResponseResult res = Shared.InvTransactionProcess(session, master.CustomerID, "SlsCust", db);
                        if (res.ResponseState == true)
                        {

                            dbTrans.Commit();
                            result.Response = master.CustomerID;
                            result.IsSuccess = true;
                        }
                        else

                        {
                            dbTrans.Rollback();
                            result.Response = res.ResponseMessage;
                            result.IsSuccess = false;
                        }
                       
                    }

                   
                }


                catch (Exception ex)
                {
                    dbTrans.Rollback();
                    result.Response = ex.Message;
                    result.IsSuccess = false;
                }
                return Ok(result);
            }
        }
        [HttpPost, AllowAnonymous]
        public IHttpActionResult GetVatFromSalesCustomer([FromBody]string vatno, int custid, int comp)
        {
            BaseResponse result = new BaseResponse();
            var cnt = db.P_D_SalesCustomer.Count(x => (x.VatNo == vatno && x.CompCode == comp && x.CustomerID != custid)) ;
            result.IsSuccess = true;
            result.Response = cnt;
            return Ok(result);
        }
    }
    
}
