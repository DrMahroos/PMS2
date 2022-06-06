using Newtonsoft.Json.Linq;
using PMS.ApiService.Models;
using PMS.ApiService.Tools;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace PMS.ApiService.Controllers.ResourceManagement
{
    public class P_TR_ResRequestMaterialController : BaseController, IMasterDetailsController<P_TR_ResRequestMaterial, P_TR_ResRequestMaterialDetail>
    {
        [HttpGet]
        public object SelectEntity(string SqlStatement)
        {
            var result = this.Get<P_TR_ResRequestMaterial>(SqlStatement);
            return result.ToList();
        }
        public ResponseResult Process(ActionTypes actionType, JObject data)
        {
            ResponseResult result = new ResponseResult();
            result.ResponseState = true;
            return result;
        }
        public ResponseResult InsertMasterDetails(JObject data)
        {
            ResponseResult result = new ResponseResult();
            var obj = JObjMasterDetails<P_TR_ResRequestMaterial, P_TR_ResRequestMaterialDetail>(data);
            SessionRecord session = obj.Session;
            P_TR_ResRequestMaterial master = obj.Master;
            List<P_TR_ResRequestMaterialDetail> details = obj.Details.ToList();
            result = MasterDetailsValidation(master, details, session);
            if (result.ResponseState == false)
            {
                return result;
            }

            obj = JObjMasterDetails<P_TR_ResRequestMaterial, P_TR_ResRequestMaterialDetail>(result.ResponseData as JObject);
            session = obj.Session;
            master = obj.Master;
            details = obj.Details.ToList();
            master.CreatedAt = DateTime.Now;
            master.CreatedBy = session.UserCode;
            using (var dbTrans = db.Database.BeginTransaction())
            {
                try
                {
                    db.P_TR_ResRequestMaterial.Add(master);
                    db.SaveChanges();

                    foreach (P_TR_ResRequestMaterialDetail item in details)
                    {
                        item.RequestMaterialId = master.RequestMaterialId;
                    }
                    db.P_TR_ResRequestMaterialDetail.AddRange(details);
                    db.SaveChanges();

                    ResponseResult res = Shared.InvTransactionProcess(session, master.RequestMaterialId, "ReqMat", db);
                    if (res.ResponseState == true)
                    {
                        dbTrans.Commit();
                        master.TrNo = int.Parse(res.ResponseData.ToString());
                        result.ResponseData = master.RequestMaterialId;
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
            var obj = JObjMasterDetails<P_TR_ResRequestMaterial, P_TR_ResRequestMaterialDetail>(data);
            SessionRecord session = obj.Session;
            P_TR_ResRequestMaterial master = obj.Master;
            List<P_TR_ResRequestMaterialDetail> details = obj.Details.ToList();
            result = MasterDetailsValidation(master, details, session);
            if (result.ResponseState == false)
            {
                return result;
            }

            obj = JObjMasterDetails<P_TR_ResRequestMaterial, P_TR_ResRequestMaterialDetail>(result.ResponseData as JObject);
            session = obj.Session;
            master = obj.Master;
            details = obj.Details.ToList();
            master.UpdatedAt = DateTime.Now;
            master.UpdatedBy = session.UserCode;
            using (var dbTrans = db.Database.BeginTransaction())
            {
                try
                {
                    //Deleting The Details
                    db.P_TR_ResRequestMaterialDetail.RemoveRange(db.P_TR_ResRequestMaterialDetail.Where(f => f.RequestMaterialId == master.RequestMaterialId));

                    db.P_TR_ResRequestMaterial.Attach(master);
                    db.Entry(master).State = System.Data.Entity.EntityState.Modified;
                    db.SaveChanges();

                    foreach (P_TR_ResRequestMaterialDetail item in details)
                    {
                        item.RequestMaterialId = master.RequestMaterialId;
                    }
                    db.P_TR_ResRequestMaterialDetail.AddRange(details);
                    db.SaveChanges();

                    ResponseResult res = Shared.InvTransactionProcess(session, master.RequestMaterialId, "ReqMat", db);
                    if (res.ResponseState == true)
                    {
                        dbTrans.Commit();
                        master.TrNo = int.Parse(res.ResponseData.ToString());
                        result.ResponseData = master.RequestMaterialId;
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

        public ResponseResult MasterDetailsValidation(P_TR_ResRequestMaterial Master, IEnumerable<P_TR_ResRequestMaterialDetail> Details, SessionRecord Session)
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
        public int PProc_ApproveCloseMaterialRequest(int ReqID, int OldStatus, int NewStatus)
        {
            int res = db.PProc_ApproveCloseMaterialRequest(ReqID, OldStatus, NewStatus);
            return res;
            
        }
    }
}
