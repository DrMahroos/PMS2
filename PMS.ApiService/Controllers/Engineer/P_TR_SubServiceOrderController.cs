using Newtonsoft.Json.Linq;
using PMS.ApiService.Models;
using PMS.ApiService.Models.CustomEntities;
using PMS.ApiService.Tools;
using System;
using System.Collections.Generic;
using System.Data.Entity.Core.Objects;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace PMS.ApiService.Controllers.Engineer
{
    public class P_TR_SubServiceOrderController : BaseController, IMasterDetailsController<P_TR_SubServiceOrder, P_TR_SubServiceOrderActivity>
    {
        [HttpGet]
        public object SelectEntity(string SqlStatement)
        {
            var result = this.Get<P_TR_SubServiceOrder>(SqlStatement);
            return result.ToList();
        }
        [HttpPost, AllowAnonymous]
        public IHttpActionResult UpdateMasterDetail([FromBody]M_D_ServiceOrder data)
        {
            BaseResponse result = new BaseResponse();

            using (var dbTrans = db.Database.BeginTransaction())
            {
                try
                {
                    SessionRecord session = data.sessionRecord;
                    P_TR_SubServiceOrder master = data.P_TR_SubServiceOrder;
                    List<P_TR_SubServiceOrderActivity> SubServiceOrder = data.P_TR_SubServiceOrderActivity;
                    master.UpdatedBy = session.UserCode;
                    master.UpdatedAt = DateTime.Now;

                    db.P_TR_SubServiceOrder.Attach(master);
                    db.Entry(master).State = System.Data.Entity.EntityState.Modified;
                    db.SaveChanges();

                    foreach (P_TR_SubServiceOrderActivity item in SubServiceOrder)
                    {
                        if (item.SubServiceOrderActivityId > 0)
                        {
                            db.P_TR_SubServiceOrderActivity.Attach(item);
                            db.Entry(item).State = System.Data.Entity.EntityState.Modified;
                        }
                        else
                        {
                            item.SubServiceOrderId = master.SubServiceOrderId;
                            db.P_TR_SubServiceOrderActivity.Add(item);
                        }
                    }
                    //Deleting The Details
                    int i;
                    var _ItemsOld = db.P_TR_SubServiceOrderActivity.Where(x => x.SubServiceOrderId == master.SubServiceOrderId).ToList();
                    foreach (P_TR_SubServiceOrderActivity item in _ItemsOld)
                    {
                        i = SubServiceOrder.Where(n => n.SubServiceOrderActivityId == item.SubServiceOrderActivityId).Count();
                        if (i == 0)
                        {
                            db.P_TR_SubServiceOrderActivity.Remove(item);
                        }
                    }
                    db.SaveChanges();

                    ResponseResult res = Shared.InvTransactionProcess(session, master.SubServiceOrderId, "SubSO", db);
                    if (res.ResponseState == true)
                    {
                        dbTrans.Commit();
                        master.TrNo = int.Parse(res.ResponseData.ToString());
                        result.Response = master.SubServiceOrderId;
                        result.StatusCode = 200;
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
            }
            return Ok(result);
        }

        [HttpPost, AllowAnonymous]
        public IHttpActionResult InsertMasterDetail([FromBody]M_D_ServiceOrder data)
        {
            BaseResponse result = new BaseResponse();
            using (var dbTrans = db.Database.BeginTransaction())
            {
                try
                {
                    SessionRecord session = data.sessionRecord;
                    P_TR_SubServiceOrder master = data.P_TR_SubServiceOrder;
                    List<P_TR_SubServiceOrderActivity> SubServiceOrder = data.P_TR_SubServiceOrderActivity;
                    master.CreatedBy = session.UserCode;               
                    master.CreatedAt = DateTime.Now;
                    db.P_TR_SubServiceOrder.Add(master);
                    var _Res = db.SaveChanges();

                    //Deleting The Details
                    db.P_TR_SubServiceOrderActivity.RemoveRange(db.P_TR_SubServiceOrderActivity.Where(f => f.SubServiceOrderId == master.SubServiceOrderId));
                    foreach (P_TR_SubServiceOrderActivity item in SubServiceOrder)
                    {
                        item.SubServiceOrderId = master.SubServiceOrderId;
                    }
                    db.P_TR_SubServiceOrderActivity.AddRange(SubServiceOrder);
                    db.SaveChanges();

                    ResponseResult res = Shared.InvTransactionProcess(session, master.SubServiceOrderId, "SubSO", db);
                    if (res.ResponseState == true)
                    {
                        dbTrans.Commit();
                        //master.TrNo = int.Parse(res.ResponseData.ToString());
                        result.Response = master.SubServiceOrderId;
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
            var obj = JObjMasterDetails<P_TR_SubServiceOrder, P_TR_SubServiceOrderActivity>(data);
            SessionRecord session = obj.Session;
            P_TR_SubServiceOrder master = obj.Master;
            List<P_TR_SubServiceOrderActivity> details = obj.Details.ToList();
            master.CreatedBy = session.UserCode;
            master.CreatedAt = DateTime.Now;
            result = MasterDetailsValidation(master, details, session);
            if (result.ResponseState == false)
            {
                return result;
            }
            obj = JObjMasterDetails<P_TR_SubServiceOrder, P_TR_SubServiceOrderActivity>(result.ResponseData as JObject);
            session = obj.Session;
            master = obj.Master;
            details = obj.Details.ToList();
            master.CreatedAt = DateTime.Now;
            master.CreatedBy = session.UserCode;
            using (var dbTrans = db.Database.BeginTransaction())
            {
                try
                {
                    db.P_TR_SubServiceOrder.Add(master);
                    db.SaveChanges();
                    foreach (P_TR_SubServiceOrderActivity item in details)
                    {
                        item.SubServiceOrderId = master.SubServiceOrderId;
                    }

                    db.P_TR_SubServiceOrderActivity.AddRange(details);
                    db.SaveChanges();

                    ResponseResult res = Shared.InvTransactionProcess(session, master.SubServiceOrderId, "SubSO", db);
                    if (res.ResponseState == true)
                    {

                        dbTrans.Commit();
                        if (master.Status == 2) EngSubServiceOrderApprove(master.SubServiceOrderId);
                        if (master.Status == 2) EngSubServiceOrderClose (master.SubServiceOrderId);
                        //master.TrNo = int.Parse(res.ResponseData.ToString());
                        result.ResponseData = master.SubServiceOrderId;
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


        public ResponseResult UpdateMasterDetails(JObject data)
        {
            ResponseResult result = new ResponseResult();
            var obj = JObjMasterDetails<P_TR_SubServiceOrder, P_TR_SubServiceOrderActivity>(data);
            SessionRecord session = obj.Session;
            P_TR_SubServiceOrder master = obj.Master;
            master.UpdatedBy = session.UserCode;
            master.UpdatedAt = DateTime.Now;
            List<P_TR_SubServiceOrderActivity> details = obj.Details.ToList();
            result = MasterDetailsValidation(master, details, session);
            if (result.ResponseState == false)
            {
                return result;
            }

            obj = JObjMasterDetails<P_TR_SubServiceOrder, P_TR_SubServiceOrderActivity>(result.ResponseData as JObject);
            session = obj.Session;
            master = obj.Master;
            details = obj.Details.ToList();

            using (var dbTrans = db.Database.BeginTransaction())
            {
                try
                {
                    //Deleting The Details
                    db.P_TR_SubServiceOrderActivity.RemoveRange(db.P_TR_SubServiceOrderActivity.Where(f => f.SubServiceOrderId == master.SubServiceOrderId));

                    db.P_TR_SubServiceOrder.Attach(master);
                    db.Entry(master).State = System.Data.Entity.EntityState.Modified;
                    db.SaveChanges();

                    foreach (P_TR_SubServiceOrderActivity item in details)
                    {
                        item.SubServiceOrderId = master.SubServiceOrderId;
                        if (item.SubContractActivityId == 0)
                            item.SubContractActivityId = null;
                        if (item.ActivityId == 0)
                            item.ActivityId = null;
                        if (item.ProjectPhaseItemActivId == 0)
                            item.ProjectPhaseItemActivId = null;
                    }
                    db.P_TR_SubServiceOrderActivity.AddRange(details);
                    db.SaveChanges();

                    ResponseResult res = Shared.InvTransactionProcess(session, master.SubServiceOrderId, "SubSO", db);
                    if (res.ResponseState == true)
                    {
                        dbTrans.Commit();
                        master.TrNo = int.Parse(res.ResponseData.ToString());
                        result.ResponseData = master.SubServiceOrderId;
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

        public ResponseResult MasterDetailsValidation(P_TR_SubServiceOrder Master, IEnumerable<P_TR_SubServiceOrderActivity> Details, SessionRecord Session)
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

        [HttpGet]
        public int EngSubServiceOrderApprove(int id)
        {
            ObjectParameter op = new ObjectParameter("id", typeof(int));
            db.PProc_EngSubServiceOrderApprove(id);
            return Convert.ToInt32(op.Value);
        }

        [HttpGet]
        public int EngSubServiceOrderClose(int id)
        {
            ObjectParameter op = new ObjectParameter("id", typeof(int));
            db.PProc_EngSubServiceOrderClose(id);
            return Convert.ToInt32(op.Value);
        }

        [HttpGet]
        public void PProc_EngSubBuildSODetail(int soId)
        {
            ObjectParameter op = new ObjectParameter("soId", typeof(int));
            db.PProc_EngSubBuildSODetail(soId);
            //return Convert.ToInt32(op.Value);
        }
    }
}
