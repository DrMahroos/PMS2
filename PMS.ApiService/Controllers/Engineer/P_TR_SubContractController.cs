using PMS.ApiService.Tools;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Newtonsoft.Json.Linq;
using PMS.ApiService.Models;
using PMS.ApiService.Models.CustomEntities;

namespace PMS.ApiService.Controllers.Engineer
{
    public class P_TR_SubContractController : BaseController, IMasterDetailsController<P_TR_SubContract, P_TR_SubContractActivity>
    {
        [HttpGet]
        public object SelectEntity(string SqlStatement)
        {
            var result = this.Get<P_TR_SubContract>(SqlStatement);
            return result.ToList();
        }
        public ResponseResult InsertMasterDetails(JObject data)
        {
            ResponseResult result = new ResponseResult();
            var obj = JObjMasterDetails<P_TR_SubContract, P_TR_SubContractActivity>(data);
            SessionRecord session = obj.Session;
            P_TR_SubContract master = obj.Master;
            List<P_TR_SubContractActivity> details = obj.Details.ToList();
            result = MasterDetailsValidation(master, details, session);
            if (result.ResponseState == false)
            {
                return result;
            }
            obj = JObjMasterDetails<P_TR_SubContract, P_TR_SubContractActivity>(result.ResponseData as JObject);
            session = obj.Session;
            master = obj.Master;
            master.CreatedAt = DateTime.Now;
            master.CreatedBy = session.UserCode;
            details = obj.Details.ToList();

            using (var dbTrans = db.Database.BeginTransaction())
            {
                try
                {
                    db.P_TR_SubContract.Add(master);
                    db.SaveChanges();
                    foreach (P_TR_SubContractActivity item in details)
                    {
                        item.SubContractId = master.SubContractId;
                        if (item.ProjectPhaseItemActivId == 0)
                        {
                            item.ProjectPhaseItemActivId = null;
                        }
                    }

                    db.P_TR_SubContractActivity.AddRange(details);
                    db.SaveChanges();

                    ResponseResult res = Shared.InvTransactionProcess(session, master.SubContractId, "SubCont", db);
                    if (res.ResponseState == true)
                    {

                        dbTrans.Commit();
                        result.ResponseData = master.SubContractId;
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

        public ResponseResult MasterDetailsValidation(P_TR_SubContract Master, IEnumerable<P_TR_SubContractActivity> Details, SessionRecord Session)
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
            var obj = JObjMasterDetails<P_TR_SubContract, P_TR_SubContractActivity>(data);
            SessionRecord session = obj.Session;
            P_TR_SubContract master = obj.Master;
            List<P_TR_SubContractActivity> details = obj.Details.ToList();
            result = MasterDetailsValidation(master, details, session);
            if (result.ResponseState == false)
            {
                return result;
            }
            obj = JObjMasterDetails<P_TR_SubContract, P_TR_SubContractActivity>(result.ResponseData as JObject);
            session = obj.Session;
            master = obj.Master;
            master.UpdatedAt = DateTime.Now;
            master.UpdatedBy = session.UserCode;
            details = obj.Details.ToList();

            using (var dbTrans = db.Database.BeginTransaction())
            {
                try
                {
                    //Deleting The Details
                    db.P_TR_SubContractActivity.RemoveRange(db.P_TR_SubContractActivity.Where(f => f.SubContractId == master.SubContractId));

                    db.P_TR_SubContract.Attach(master);
                    db.Entry(master).State = System.Data.Entity.EntityState.Modified;
                    db.SaveChanges();

                    foreach (P_TR_SubContractActivity item in details)
                    {
                        item.SubContractId = master.SubContractId;
                        if (item.ProjectPhaseItemActivId == 0)
                        {
                            item.ProjectPhaseItemActivId = null;
                        }
                    }
                    db.P_TR_SubContractActivity.AddRange(details);
                    db.SaveChanges();

                    ResponseResult res = Shared.InvTransactionProcess(session, master.SubContractId, "SubCont", db);
                    if (res.ResponseState == true)
                    {

                        dbTrans.Commit();
                        //master.TrNo = int.Parse(res.ResponseData.ToString());
                        result.ResponseData = master.SubContractId;
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
        [HttpPost, AllowAnonymous]
        public IHttpActionResult UpdateMasterDetail([FromBody]M_D_SubContract data)
        {
            BaseResponse result = new BaseResponse();

            using (var dbTrans = db.Database.BeginTransaction())
            {
                try
                {
                    SessionRecord session = data.sessionRecord; 
                    P_TR_SubContract master = data.P_TR_SubContract;
                    List<P_TR_SubContractActivity> SubContract = data.P_TR_SubContractActivity;
                    master.UpdatedBy = session.UserCode;
                    master.UpdatedAt = DateTime.Now;

                    db.P_TR_SubContract.Attach(master);
                    db.Entry(master).State = System.Data.Entity.EntityState.Modified;
                    db.SaveChanges();

                    foreach (P_TR_SubContractActivity item in SubContract)
                    {
                        if (item.SubContractActivityId > 0)
                        {
                            db.P_TR_SubContractActivity.Attach(item);
                            db.Entry(item).State = System.Data.Entity.EntityState.Modified;
                        }
                        else
                        {
                            item.SubContractId = master.SubContractId;
                            db.P_TR_SubContractActivity.Add(item);
                        }
                    }
                    //Deleting The Details
                    int i;
                    var _ItemsOld = db.P_TR_SubContractActivity.Where(x => x.SubContractId == master.SubContractId).ToList();
                    foreach (P_TR_SubContractActivity item in _ItemsOld)
                    {
                        i = SubContract.Where(n => n.SubContractActivityId == item.SubContractActivityId).Count();
                        if (i == 0)
                        {
                            db.P_TR_SubContractActivity.Remove(item);
                        }
                    }
                    db.SaveChanges();

                    ResponseResult res = Shared.InvTransactionProcess(session, master.SubContractId, "SubCont", db);
                    if (res.ResponseState == true)
                    {
                        dbTrans.Commit();
                        master.TrNo = int.Parse(res.ResponseData.ToString());
                        result.Response = master.SubContractId;
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
        public IHttpActionResult InsertMasterDetail([FromBody]M_D_SubContract data)
        {
            BaseResponse result = new BaseResponse();
            using (var dbTrans = db.Database.BeginTransaction())
            {
                try
                {
                    SessionRecord session = data.sessionRecord;
                    P_TR_SubContract master = data.P_TR_SubContract;
                    List<P_TR_SubContractActivity> SubContract = data.P_TR_SubContractActivity;
                    master.CreatedBy = session.UserCode;
                    master.CreatedAt = DateTime.Now;
                    db.P_TR_SubContract.Add(master);
                    var _Res = db.SaveChanges();

                    //Deleting The Details
                    db.P_TR_SubContractActivity.RemoveRange(db.P_TR_SubContractActivity.Where(f => f.SubContractId == master.SubContractId));
                    foreach (P_TR_SubContractActivity item in SubContract)
                    {
                        item.SubContractId = master.SubContractId;
                    }
                    db.P_TR_SubContractActivity.AddRange(SubContract);
                    db.SaveChanges();

                    ResponseResult res = Shared.InvTransactionProcess(session, master.SubContractId, "SubCont", db);
                    if (res.ResponseState == true)
                    {
                        dbTrans.Commit();
                        //master.TrNo = int.Parse(res.ResponseData.ToString());
                        result.Response = master.SubContractId;
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
    }
}
