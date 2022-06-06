using Newtonsoft.Json.Linq;
using PMS.ApiService.Models;
using PMS.ApiService.Models.CustomEntities;
using PMS.ApiService.Tools;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace PMS.ApiService.Controllers.Sales
{
    public class P_Tr_SalesActivtyPriceController : BaseController, IMasterDetailsController<P_Tr_SalesActivtyPrice, P_Tr_SalesActivtyPriceDetail>
    {
        [HttpGet]
        public object SelectEntity(string SqlStatement)
        {
            var result = this.Get<P_Tr_SalesActivtyPrice>(SqlStatement);
            return result.ToList();
        }
        [HttpPost, AllowAnonymous]
        public IHttpActionResult InsertMasterDetail([FromBody] M_D_ActivityPrice data  )
        {
            BaseResponse result = new BaseResponse();


            SessionRecord session = data.sessionRecord;
            P_Tr_SalesActivtyPrice master = data.P_Tr_SalesActivtyPrice;
            List<P_Tr_SalesActivtyPriceDetail> details = data.P_Tr_SalesActivtyPriceDetail.ToList();
            //result = MasterDetailsValidation(master, details, session);
            //if (result.ResponseState == false)
            //    return result;
            
            master.CreatedAt = DateTime.Now;
            master.CreatedBy = session.UserCode;
            using (var dbTrans = db.Database.BeginTransaction())
            {
                try
                {
                    db.P_Tr_SalesActivtyPrice.Add(master);
                    db.SaveChanges();

                    foreach (P_Tr_SalesActivtyPriceDetail item in details)
                    {
                        item.ActivityPriceId = master.ActivityPriceId;
                    }

                    db.P_Tr_SalesActivtyPriceDetail.AddRange(details);
                    db.SaveChanges();
                    if (master.Status == true)
                    {
                        db.Database.ExecuteSqlCommand("execute PProc_CalculateActivityprice '" + master.ActivityPriceId + "'");
                    }
                    ResponseResult res = Shared.InvTransactionProcess(session, master.ActivityPriceId, "slsApri", db);
                    if (res.ResponseState == true)
                    {
                        dbTrans.Commit();
                        result.Response = master.ActivityPriceId;
                        result.IsSuccess = true;
                    }
                    else
                    {
                        result.Response = res.ResponseMessage;
                        result.IsSuccess = false;
                        dbTrans.Rollback();
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
        public IHttpActionResult UpdateMasterDetail([FromBody] M_D_ActivityPrice data)
        {
            BaseResponse result = new BaseResponse();


            SessionRecord session = data.sessionRecord;
            P_Tr_SalesActivtyPrice master = data.P_Tr_SalesActivtyPrice;
            List<P_Tr_SalesActivtyPriceDetail> details = data.P_Tr_SalesActivtyPriceDetail.ToList();
            //result = MasterDetailsValidation(master, details, session);
            //if (result.ResponseState == false)
            //    return result;

            master.UpdatedBy = session.UserCode;
            master.UpdatedAt = DateTime.Now;
            using (var dbTrans = db.Database.BeginTransaction())
            {
                try
                {
                   
                    db.P_Tr_SalesActivtyPrice.Attach(master);
                    db.Entry(master).State = System.Data.Entity.EntityState.Modified;
                    db.SaveChanges();

                    foreach (P_Tr_SalesActivtyPriceDetail item in details)
                    {
                        if (item.ActivityPriceDetailId > 0)
                        {
                            db.P_Tr_SalesActivtyPriceDetail.Attach(item);
                            db.Entry(item).State = System.Data.Entity.EntityState.Modified;
                        }
                        else
                        {
                            item.ActivityPriceId = master.ActivityPriceId;
                            db.P_Tr_SalesActivtyPriceDetail.Add(item);
                        }
                    }
                    //Deleting The Details
                    int i;
                    var _ItemsOld = db.P_Tr_SalesActivtyPriceDetail.Where(x => x.ActivityPriceId == master.ActivityPriceId).ToList();
                    foreach (P_Tr_SalesActivtyPriceDetail item in _ItemsOld)
                    {
                        i = details.Where(n => n.ActivityPriceDetailId == item.ActivityPriceDetailId).Count();
                        if (i == 0)
                        {
                            db.P_Tr_SalesActivtyPriceDetail.Remove(item);
                        }
                    }
                    db.SaveChanges();

                   
                    if (master.Status == true)
                    {
                        db.Database.ExecuteSqlCommand("execute PProc_CalculateActivityprice '" + master.ActivityPriceId + "'");
                    }
                    ResponseResult res = Shared.InvTransactionProcess(session, master.ActivityPriceId, "slsApri", db);
                    if (res.ResponseState == true)
                    {
                        dbTrans.Commit();
                        result.Response = master.ActivityPriceId;
                        result.IsSuccess = true;
                    }
                    else
                    {
                        result.Response = res.ResponseMessage;
                        result.IsSuccess = false;
                        dbTrans.Rollback();
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
        public ResponseResult InsertMasterDetails(JObject data)
        {
            ResponseResult result = new ResponseResult();
            var obj = JObjMasterDetails<P_Tr_SalesActivtyPrice, P_Tr_SalesActivtyPriceDetail>(data);
            SessionRecord session = obj.Session;
            P_Tr_SalesActivtyPrice master = obj.Master;
            List<P_Tr_SalesActivtyPriceDetail> details = obj.Details.ToList();
            result = MasterDetailsValidation(master, details, session);
            if (result.ResponseState == false)
                return result;
            obj = JObjMasterDetails<P_Tr_SalesActivtyPrice, P_Tr_SalesActivtyPriceDetail>(result.ResponseData as JObject);
            session = obj.Session;
            master = obj.Master;
            details = obj.Details.ToList();
            master.CreatedAt = DateTime.Now;
            master.CreatedBy = session.UserCode;
            using (var dbTrans = db.Database.BeginTransaction())
            {
                try
                {
                    db.P_Tr_SalesActivtyPrice.Add(master);
                    db.SaveChanges();
                
                    foreach (P_Tr_SalesActivtyPriceDetail item in details)
                    {
                        item.ActivityPriceId = master.ActivityPriceId;
                    }

                    db.P_Tr_SalesActivtyPriceDetail.AddRange(details);
                    db.SaveChanges();
                    if (master.Status == true)
                    {
                        db.Database.ExecuteSqlCommand("execute PProc_CalculateActivityprice '" + master.ActivityPriceId + "'");
                    }
                    ResponseResult res = Shared.InvTransactionProcess(session, master.ActivityPriceId, "slsApri", db);
                    if (res.ResponseState == true)
                    {
                        dbTrans.Commit();
                        result.ResponseData = master.ActivityPriceId;
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

        public ResponseResult MasterDetailsValidation(P_Tr_SalesActivtyPrice Master, IEnumerable<P_Tr_SalesActivtyPriceDetail> Details, SessionRecord Session)
        {
            ResponseResult result = new ResponseResult();
            try
            {
                Master.CompCode = int.Parse(Session.CompCode);
            
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

        public ResponseResult UpdateMasterDetails(JObject data)
        {
            ResponseResult result = new ResponseResult();
            var obj = JObjMasterDetails<P_Tr_SalesActivtyPrice, P_Tr_SalesActivtyPriceDetail>(data);
            SessionRecord session = obj.Session;
            P_Tr_SalesActivtyPrice master = obj.Master;
            List<P_Tr_SalesActivtyPriceDetail> details = obj.Details.ToList();
            result = MasterDetailsValidation(master, details, session);
            if (result.ResponseState == false)
            {
                return result;
            }

            obj = JObjMasterDetails<P_Tr_SalesActivtyPrice, P_Tr_SalesActivtyPriceDetail>(result.ResponseData as JObject);
            session = obj.Session;
            master = obj.Master;
            details = obj.Details.ToList();
            master.UpdatedAt = DateTime.Now;
            master.UpdatedBy = session.UserCode;
            using (var dbTrans = db.Database.BeginTransaction())
            {
                try
                {
                    db.P_Tr_SalesActivtyPriceDetail.RemoveRange(db.P_Tr_SalesActivtyPriceDetail.Where(f => f.ActivityPriceId == master.ActivityPriceId));
                    db.SaveChanges();
                    db.P_Tr_SalesActivtyPrice.Attach(master);
                    db.Entry(master).State = System.Data.Entity.EntityState.Modified;
                    db.SaveChanges();

                    foreach (P_Tr_SalesActivtyPriceDetail item in details)
                    {
                        item.ActivityPriceId = master.ActivityPriceId;
                    }

                    db.P_Tr_SalesActivtyPriceDetail.AddRange(details);
                    db.SaveChanges();
                    if (master.Status == true)
                    {
                        db.Database.ExecuteSqlCommand("execute PProc_CalculateActivityprice '" + master.ActivityPriceId + "'");
                    }
                    ResponseResult res = Shared.InvTransactionProcess(session, master.ActivityPriceId, "slsApri", db);
                    if (res.ResponseState == true)
                    {
                        dbTrans.Commit();
                        result.ResponseData = master.ActivityPriceId;
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
        public ResponseResult CalculatepriceActivity(int _Id)
        {
            ResponseResult result = new ResponseResult();
            db.Database.ExecuteSqlCommand("PProc_CalculateActivityprice '" + _Id + '"');
            return result;
        }
    }
}
