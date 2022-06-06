using PMS.ApiService.Tools;
using PMS.ApiService.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Newtonsoft.Json.Linq;
using PMS.ApiService.Models.CustomEntities;
using Newtonsoft.Json;
using System.Data.Entity.Core.Objects;

namespace PMS.ApiService.Controllers.Sales
{
    public class P_TR_SalesOfferController : BaseController, IMasterDetailsController<P_TR_SalesOffer, P_Tr_SalesOfferBilling>
    {
        [HttpGet]
        public object SelectEntity(string SqlStatement)
        {
            var result = this.Get<P_TR_SalesOffer>(SqlStatement);
            return result.ToList();
        }
        [HttpGet]
        public string GetItemsById(int id)
        {
            ResponseResult res = new ResponseResult();
            res.ResponseData = db.PQ_SrchSlsItem.Where(item => item.ItemID == id).FirstOrDefault();
            string ss = JsonSerialize(res.ResponseData);
            return ss;
        }
        [HttpPost, AllowAnonymous]
        public IHttpActionResult Insert([FromBody]M_D_OfferDefDetails _object)
        {
            //Start Details
            P_TR_SalesOffer master = _object.P_TR_SalesOffer;
            List<P_Tr_SalesOfferStage> SalOfferStage = _object.P_Tr_SalesOfferStage;
            List<P_TR_SalesOfferResponsibility> SalOfferRes = _object.P_TR_SalesOfferResponsibility;
            List<P_Tr_SalesOfferPayment> SalOfferPay = _object.P_Tr_SalesOfferPayment;

            //End Details

            using (var dbTrans = db.Database.BeginTransaction())
            {
                try
                {
                    db.P_TR_SalesOffer.Add(master);
                    var _Res = db.SaveChanges();
                    if (_Res > 0)
                    {
                        //01 P_Tr_SalesOfferStage
                        foreach (P_Tr_SalesOfferStage item in SalOfferStage)
                        {
                            item.OfferID = master.OfferID;
                        }
                        db.P_Tr_SalesOfferStage.AddRange(SalOfferStage);
                        db.SaveChanges();

                        //03 P_TR_SalesOfferResponsibility
                        foreach (P_TR_SalesOfferResponsibility item in SalOfferRes)
                        {
                            item.OfferID = master.OfferID;
                        }
                        db.P_TR_SalesOfferResponsibility.AddRange(SalOfferRes);
                        db.SaveChanges();

                        //05 P_Tr_SalesOfferPayment
                        foreach (P_Tr_SalesOfferPayment item in SalOfferPay)
                        {
                            item.OfferID = master.OfferID;
                        }
                        db.P_Tr_SalesOfferPayment.AddRange(SalOfferPay);
                        db.SaveChanges();
                    }

                    ResponseResult res = Shared.TransactionProcess(int.Parse(master.CompCode.ToString()), int.Parse(master.BraCode.ToString()), master.OfferID, "SlsOff", db);
                    if (res.ResponseState == true)
                    {
                        dbTrans.Commit();
                        var dd = db.P_TR_SalesOffer.Where(x => x.OfferID == master.OfferID).FirstOrDefault();
                        return Ok(new BaseResponse(master));
                    }
                    else
                    {
                        dbTrans.Rollback();
                        return Ok(new BaseResponse(HttpStatusCode.ExpectationFailed, res.ResponseMessage));
                    }
                }
                catch (Exception ex)
                {
                    dbTrans.Rollback();
                    return Ok(new BaseResponse(HttpStatusCode.ExpectationFailed, ex.Message));
                }
            }
        }
        [HttpPost, AllowAnonymous]
        public IHttpActionResult Update([FromBody]M_D_OfferDefDetails details)
        {
            P_TR_SalesOffer master = details.P_TR_SalesOffer;

            using (var dbTrans = db.Database.BeginTransaction())
            {
                try
                {
                    db.P_TR_SalesOffer.Attach(master);
                    db.Entry(master).State = System.Data.Entity.EntityState.Modified;
                    db.SaveChanges();
                    //Start M.Elsayed Offer Details
                    if (details.P_Tr_SalesOfferStage != null && details.P_Tr_SalesOfferPayment != null && details.P_TR_SalesOfferResponsibility != null)
                    {
                        //update old and add new records01 P_Tr_SalesOfferStage
                        foreach (P_Tr_SalesOfferStage item in details.P_Tr_SalesOfferStage)
                        {
                            if (item.OfferStageId > 0)
                            {
                                db.P_Tr_SalesOfferStage.Attach(item);
                                db.Entry(item).State = System.Data.Entity.EntityState.Modified;
                            }
                            else
                            {
                                item.OfferID = master.OfferID;
                                db.P_Tr_SalesOfferStage.Add(item);
                            }
                        }
                        //Deleting The Details//03 P_TR_SalesOfferResponsibility
                        int i;
                        var _ItemsOld = db.P_Tr_SalesOfferStage.Where(x => x.OfferID == master.OfferID).ToList();
                        foreach (var itm in _ItemsOld)
                        {
                            i = details.P_Tr_SalesOfferStage.Where(n => n.OfferStageId == itm.OfferStageId).Count();
                            if (i == 0)
                            {
                                db.P_Tr_SalesOfferStage.Remove(itm);
                            }
                        }
                        ///////////////////////////////////////////
                        foreach (P_TR_SalesOfferResponsibility item in details.P_TR_SalesOfferResponsibility)
                        {
                            if (item.OfferResponsibilityId > 0)
                            {
                                db.P_TR_SalesOfferResponsibility.Attach(item);
                                db.Entry(item).State = System.Data.Entity.EntityState.Modified;
                            }
                            else
                            {
                                item.OfferID = master.OfferID;
                                db.P_TR_SalesOfferResponsibility.Add(item);
                            }
                        }
                        //Deleting The Details//03 P_TR_SalesOfferResponsibility
                        var Responsibility = db.P_TR_SalesOfferResponsibility.Where(x => x.OfferID == master.OfferID).ToList();
                        foreach (var itm in Responsibility)
                        {
                            i = details.P_TR_SalesOfferResponsibility.Where(n => n.OfferResponsibilityId == itm.OfferResponsibilityId).Count();
                            if (i == 0)
                            {
                                db.P_TR_SalesOfferResponsibility.Remove(itm);
                            }
                        }
                        ////////////////////////////////////
                        foreach (P_Tr_SalesOfferPayment item in details.P_Tr_SalesOfferPayment)
                        {
                            if (item.OfferPaymentId > 0)
                            {
                                db.P_Tr_SalesOfferPayment.Attach(item);
                                db.Entry(item).State = System.Data.Entity.EntityState.Modified;
                            }
                            else
                            {
                                item.OfferID = master.OfferID;
                                db.P_Tr_SalesOfferPayment.Add(item);
                            }
                        }

                        //Deleting The Details//03 P_Tr_SalesOfferPayment
                        var Payment = db.P_Tr_SalesOfferPayment.Where(x => x.OfferID == master.OfferID).ToList();
                        foreach (var itm in Payment)
                        {
                            i = details.P_Tr_SalesOfferPayment.Where(n => n.OfferPaymentId == itm.OfferPaymentId).Count();
                            if (i == 0)
                            {
                                db.P_Tr_SalesOfferPayment.Remove(itm);
                            }
                        }

                        db.SaveChanges();
                    }
                    //End M.Elsayed Offer Details

                    // Start Billing 
                    if (details.P_Tr_SalesOfferBilling != null)
                    {
                        //update old and add new records01 P_Tr_SalesOfferStage
                        foreach (P_Tr_SalesOfferBilling item in details.P_Tr_SalesOfferBilling)
                        {
                            if (item.OfferBillingId > 0)
                            {
                                db.P_Tr_SalesOfferBilling.Attach(item);
                                db.Entry(item).State = System.Data.Entity.EntityState.Modified;
                            }
                            else
                            {
                                item.OfferID = master.OfferID;
                                db.P_Tr_SalesOfferBilling.Add(item);
                            }
                        }
                        //Deleting The Details//03 P_TR_SalesOfferResponsibility
                        int i;
                        var _ItemsOld = db.P_Tr_SalesOfferBilling.Where(x => x.OfferID == master.OfferID).ToList();
                        foreach (var itm in _ItemsOld)
                        {
                            i = details.P_Tr_SalesOfferBilling.Where(n => n.OfferBillingId == itm.OfferBillingId).Count();
                            if (i == 0)
                            {
                                db.P_Tr_SalesOfferBilling.Remove(itm);
                            }
                        }
                        db.SaveChanges();

                    }

                    // End Billing
                    ResponseResult res = Shared.TransactionProcess(int.Parse(details.P_TR_SalesOffer.CompCode.ToString()), 0, details.P_TR_SalesOffer.OfferID, "SlsOff", db);
                    if (res.ResponseState == true)
                    {
                        dbTrans.Commit();
                        return Ok(new BaseResponse(master));
                    }
                    else
                    {
                        dbTrans.Rollback();
                        return Ok(new BaseResponse(HttpStatusCode.ExpectationFailed, res.ResponseMessage));
                    }
                }
                catch (Exception ex)
                {
                    dbTrans.Rollback();
                    return Ok(new BaseResponse(HttpStatusCode.ExpectationFailed, ex.Message));
                }
            }
        }

        public ResponseResult MasterDetailsValidation(P_TR_SalesOffer Master, M_D_OfferDefDetails Details, SessionRecord Session)
        {
            ResponseResult result = new ResponseResult();
            try
            {
                InitalizeLanguage(Session.Language);

                var obj = new
                {
                    Master = Master,
                    Details = Details,
                    Session = Session
                };

                result.ResponseData = JObject.FromObject(obj);
                result.ResponseState = true;
            }
            catch (Exception ex)
            {
                result.ResponseState = false;
                result.ResponseMessage = ex.Message;
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
                    var obj = JObjectData<P_TR_SalesOffer>(data);
                    result.ResponseData = obj.Entity as P_TR_SalesOffer;
                    data = JObjectToObj<P_TR_SalesOffer>(obj.Entity, obj.Session);
                    result = this.Execute<P_TR_SalesOffer>(data, ActionTypes.Update, this.Process, db, dbTransaction);
                    SessionRecord session = obj.Session;

                    if (result.ResponseState)
                    {
                        var off = JsonDeserialize<P_TR_SalesOffer>(result.ResponseData.ToString());
                        if (obj.Entity.Status == 6)
                        {
                            db.Database.ExecuteSqlCommand("execute PProc_Sales_OfferCostCalculation '" + obj.Entity.OfferID + "'");
                        }


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
        public ResponseResult UpdateMasterDetailsOverLoad(JObject data)
        {
            ResponseResult result = new ResponseResult();
            //var objData = JsonConvert.DeserializeObject(data.);
            var obj = JObjMasterManyDetails<P_TR_SalesOffer, M_D_CostEstimation>(data);
            SessionRecord session = obj.Session;
            P_TR_SalesOffer master = obj.Master;
            M_D_CostEstimation details = obj.Details;

            obj = JObjMasterManyDetails<P_TR_SalesOffer, M_D_CostEstimation>(result.ResponseData as JObject);
            session = obj.Session;
            master = obj.Master;
            master.UpdatedAt = DateTime.Now;
            master.UpdatedBy = session.UserCode.ToString();
            details = obj.Details;

            //Start Details
            //List<P_Tr_SalesOfferStageItem> SlsOfferStageItm = details.P_Tr_SalesOfferStageItem;
            List<P_Tr_SalesOfferStageItemActivity> SlsOfferStageItmActivity = details.P_Tr_SalesOfferStageItemActivity;
            //End Details

            using (var dbTrans = db.Database.BeginTransaction())
            {
                try
                {
                    //Deleting The Details
                    //db.P_Tr_SalesOfferStageItem.RemoveRange(db.P_Tr_SalesOfferStageItem.Where(f => f.OfferID == master.OfferID));

                    db.P_TR_SalesOffer.Attach(master);
                    db.Entry(master).State = System.Data.Entity.EntityState.Modified;
                    db.SaveChanges();

                    //foreach (P_Tr_SalesOfferStageItem item in SlsOfferStageItm)
                    //{
                    //    //item.OfferID = master.OfferID;
                    //}

                    //db.P_Tr_SalesOfferStageItem.AddRange(SlsOfferStageItm);
                    //db.SaveChanges();

                    // Second Details
                    db.P_Tr_SalesOfferStageItemActivity.RemoveRange(db.P_Tr_SalesOfferStageItemActivity.Where(f => f.OfferID == master.OfferID));
                    foreach (P_Tr_SalesOfferStageItemActivity item in SlsOfferStageItmActivity)
                    {
                        item.OfferID = master.OfferID;
                    }

                    db.P_Tr_SalesOfferStageItemActivity.AddRange(SlsOfferStageItmActivity);
                    db.SaveChanges();


                    ResponseResult res = Shared.InvTransactionProcess(session, master.OfferID, "SlsOff", db);
                    if (res.ResponseState == true)
                    {
                        dbTrans.Commit();
                        result.ResponseData = master.OfferID;
                    }
                    else
                    {
                        result.ResponseMessage = res.ResponseMessage;
                        result.ResponseState = false;
                        dbTrans.Rollback();
                    }
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
        public ResponseResult CostCalcolation(int _Id)
        {
            ResponseResult result = new ResponseResult();
            db.Database.ExecuteSqlCommand("PProc_Sales_OfferCostCalculation '" + _Id + '"');
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
        [HttpGet]
        public int BuildOfferActivity(int OfferId)
        {
            var _Result = db.PProc_Sales_OfferBuildActivity(OfferId);
            return 1;
        }
        [HttpGet]
        public ResponseResult UpdateMasterDetailsBilling(JObject data)
        {
            ResponseResult result = new ResponseResult();
            var obj = JObjMasterDetails<P_TR_SalesOffer, P_Tr_SalesOfferBilling>(data);
            SessionRecord session = obj.Session;
            P_TR_SalesOffer master = obj.Master;
            List<P_Tr_SalesOfferBilling> details = obj.Details.ToList();
            //result = MasterDetailsValidation(master, details, session);
            //if (result.ResponseState == false)
            //{
            //    return result;
            //}

            obj = JObjMasterDetails<P_TR_SalesOffer, P_Tr_SalesOfferBilling>(result.ResponseData as JObject);
            session = obj.Session;
            master = obj.Master;
            details = obj.Details.ToList();
            using (var dbTrans = db.Database.BeginTransaction())
            {
                try
                {

                    //Deleting The Details
                    db.P_Tr_SalesOfferBilling.RemoveRange(db.P_Tr_SalesOfferBilling.Where(f => f.OfferID == master.OfferID));

                    db.P_TR_SalesOffer.Attach(master);
                    db.Entry(master).State = System.Data.Entity.EntityState.Modified;
                    db.SaveChanges();

                    foreach (P_Tr_SalesOfferBilling item in details)
                    {
                        item.OfferID = master.OfferID;
                    }

                    db.P_Tr_SalesOfferBilling.AddRange(details);
                    db.SaveChanges();


                    ResponseResult res = Shared.InvTransactionProcess(session, master.OfferID, "SlsOff", db);
                    if (res.ResponseState == true)
                    {

                        dbTrans.Commit();
                        //master.TrNo = int.Parse(res.ResponseData.ToString());
                        result.ResponseData = master.OfferID;
                    }
                    else
                    {
                        result.ResponseMessage = res.ResponseMessage;
                        result.ResponseState = false;
                        dbTrans.Rollback();
                    }
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
        [HttpGet]
        public ResponseResult UpdateOfferSpecification(string Jsondata)
        {
            ResponseResult result = new Models.ResponseResult();
            JObject data = new JObject();
            using (var dbTransaction = db.Database.BeginTransaction())
            {
                try
                {

                    var obj = JObjectData<P_TR_SalesOffer>(data);
                    obj.Entity = result.ResponseData as P_TR_SalesOffer;
                    data = JObjectToObj<P_TR_SalesOffer>(obj.Entity, obj.Session);
                    result = this.Execute<P_TR_SalesOffer>(data, ActionTypes.Update, this.Process, db, dbTransaction);
                    SessionRecord session = obj.Session;

                    if (result.ResponseState)
                    {
                        var labor = JsonDeserialize<P_TR_SalesOffer>(result.ResponseData.ToString());
                        ResponseResult res = Shared.InvTransactionProcess(session, labor.OfferID, "SlsOff", db);
                        if (res.ResponseState == true)
                        {

                            dbTransaction.Commit();
                            labor.OfferID = Convert.ToInt32(res.ResponseData);
                            result.ResponseData = JsonSerialize(labor);
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
        public ResponseResult GetCounter(string comp, string branch)
        {
            int _comp = int.Parse(comp);
            int _branch = int.Parse(branch);
            ResponseResult res = new ResponseResult();
            try
            {
                ObjectParameter TrNo = new ObjectParameter("TrNo", typeof(int));
                db.G_TOL_GetCounter("P", _comp, _branch, "SlsCust", TrNo);
                res.ResponseState = true;
                res.ResponseData = TrNo.Value;
            }
            catch (Exception e)
            {
                res.ResponseState = false;
                res.ResponseMessage = e.Message;
            }
            return res;
        }
        [HttpGet]
        public IHttpActionResult LoadDetails(int id)
        {
            if (ModelState.IsValid)
            {
                M_D_OfferDefDetailsView result = new M_D_OfferDefDetailsView();
                result.PQ_GetSlsOfferStage = db.PQ_GetSlsOfferStage.Where(x => x.OfferID == id).ToList();
                result.PQ_GetSlsOfferResponsibility = db.PQ_GetSlsOfferResponsibility.Where(x => x.OfferID == id && x.IsCustomer == false).ToList();
                result.PQ_GetSlsOfferResponsibility2 = db.PQ_GetSlsOfferResponsibility.Where(x => x.OfferID == id && x.IsCustomer == true).ToList();
                result.PQ_GetSlsOfferPayment = db.PQ_GetSlsOfferPayment.Where(x => x.OfferID == id).ToList();
                return Ok(new BaseResponse(result));
            }
            return BadRequest();

        }
        [HttpGet]
        public IHttpActionResult GetDropdowenData(int CompCode)
        {
            OfferDropdowenData result = new OfferDropdowenData();
            result.P_D_Scope = db.P_D_Scope.Where(X => X.CompCode == CompCode).ToList();
            result.P_D_SalesResponsibility = db.P_D_SalesResponsibility.Where(X => X.CompCode == CompCode).ToList();
            result.P_D_SalesPaymentTerms = db.P_D_SalesPaymentTerms.Where(X => X.CompCode == CompCode).ToList();
            return Ok(new BaseResponse(result));
        }
        //
        [HttpGet, AllowAnonymous]
        public IHttpActionResult GetStageItemByOffer(int OfferId)
        {
            if (ModelState.IsValid)
            {
                var _Result = db.P_Tr_SalesOfferStageItem.Where(x => x.OfferID == OfferId).ToList();
                return Ok(new BaseResponse(_Result));
            }
            return BadRequest(ModelState);
        }
        [HttpGet, AllowAnonymous]
        public IHttpActionResult GetNewOfferId(int id, int typ)
        {
            if (ModelState.IsValid)
            {
                ObjectParameter op = new ObjectParameter("NewOfferId", typeof(int));
                db.PProc_Sales_OfferCopy(id, typ, op);
                int newId = Convert.ToInt32(op.Value);
                BaseResponse response = new BaseResponse
                {
                    IsSuccess = true,
                    StatusCode = 200,
                    Response = newId
                };
                return Ok(response);
            }
            return BadRequest(ModelState);
        }
        [HttpGet, AllowAnonymous]
        public IHttpActionResult GetById(int id)
        {
            if (ModelState.IsValid)
            {
                var result = db.P_TR_SalesOffer.Where(x => x.OfferID == id).FirstOrDefault();
                return Ok(new BaseResponse(result));
            }
            return BadRequest(ModelState);
        }
        [HttpGet, AllowAnonymous]
        public IHttpActionResult GetByCrNo(string CrNo, int? CompCode)
        {
            if (ModelState.IsValid)
            {
                int _Count = db.P_D_SalesCustomer.Where(f => f.CrNo == CrNo && f.CompCode == CompCode).Count();
                return Ok(new BaseResponse(_Count));
            }
            return BadRequest(ModelState);
        }

        [HttpGet, AllowAnonymous]
        public IHttpActionResult GetOfferSpicifactionDetails(int id)
        {
            if (ModelState.IsValid)
            {
                M_D_OfferSpecificationView _View = new M_D_OfferSpecificationView();
                _View.PQ_GetSlsOfferStageItem = db.PQ_GetSlsOfferStageItem.Where(x => x.OfferID == id).OrderBy(x => x.LineCode).ToList();
                _View.PQ_GetSlsOfferActivity = db.PQ_GetSlsOfferActivity.Where(x => x.OfferID == id).ToList();
                return Ok(new BaseResponse(_View));
            }
            return BadRequest(ModelState);
        }

        [HttpGet, AllowAnonymous]
        public IHttpActionResult SearchActivity(int id)
        {
            if (ModelState.IsValid)
            {
                var res = db.PQ_SrchActivity.FirstOrDefault(x => x.ActivityID == id);
                return Ok(new BaseResponse(res));
            }
            return BadRequest(ModelState);
        }

        public ResponseResult InsertMasterDetails(JObject data)
        {
            throw new NotImplementedException();
        }

        public ResponseResult MasterDetailsValidation(P_TR_SalesOffer Master, IEnumerable<P_Tr_SalesOfferBilling> Details, SessionRecord Session)
        {
            throw new NotImplementedException();
        }

        public ResponseResult UpdateMasterDetails(JObject data)
        {
            ResponseResult result = new ResponseResult();
            var obj = JObjMasterDetails<P_TR_SalesOffer, P_Tr_SalesOfferBilling>(data);
            SessionRecord session = obj.Session;
            P_TR_SalesOffer master = obj.Master;
            List<P_Tr_SalesOfferBilling> details = obj.Details.ToList();
            //result = MasterDetailsValidation(master, details, session);
            //if (result.ResponseState == false)
            //{
            //    return result;
            //}

            //obj = JObjMasterDetails<P_TR_SalesOffer, P_Tr_SalesOfferBilling>(result.ResponseData as JObject);
            //session = obj.Session;
            //master = obj.Master;
            //details = obj.Details.ToList();
            using (var dbTrans = db.Database.BeginTransaction())
            {
                try
                {

                    //Deleting The Details
                    db.P_Tr_SalesOfferBilling.RemoveRange(db.P_Tr_SalesOfferBilling.Where(f => f.OfferID == master.OfferID));

                    db.P_TR_SalesOffer.Attach(master);
                    db.Entry(master).State = System.Data.Entity.EntityState.Modified;
                    db.SaveChanges();

                    foreach (P_Tr_SalesOfferBilling item in details)
                    {
                        item.OfferID = master.OfferID;
                    }

                    db.P_Tr_SalesOfferBilling.AddRange(details);
                    db.SaveChanges();


                    ResponseResult res = Shared.InvTransactionProcess(session, master.OfferID, "SlsOff", db);
                    if (res.ResponseState == true)
                    {

                        dbTrans.Commit();
                        result.ResponseState = true;

                        //master.TrNo = int.Parse(res.ResponseData.ToString());
                        result.ResponseData = master.OfferID;
                    }
                    else
                    {
                        result.ResponseMessage = res.ResponseMessage;
                        result.ResponseState = false;
                        dbTrans.Rollback();
                    }
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
    }
}
