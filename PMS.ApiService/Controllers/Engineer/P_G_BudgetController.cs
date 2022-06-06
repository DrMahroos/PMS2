using Newtonsoft.Json;
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
using System.Web.Script.Services;
using System.Web.Services;

namespace PMS.ApiService.Controllers.Engineer
{

    public class P_G_BudgetController : BaseController
    {
        [HttpGet]
        public object SelectEntity(string SqlStatement)
        {
            var result = this.Get<P_G_Budget>(SqlStatement);
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
                    result = Validation(ActionTypes.Insert, data);
                    if (result.ResponseState == false)
                        return result;

                    var obj = JObjectData<P_G_Budget>(data);
                    obj.Entity = result.ResponseData as P_G_Budget;
                    data = JObjectToObj<P_G_Budget>(obj.Entity, obj.Session);
                    result = this.Execute<P_G_Budget>(data, ActionTypes.Insert, this.Process, db, dbTransaction);
                    SessionRecord session = obj.Session;

                    if (result.ResponseState)
                    {
                        var SEC = JsonDeserialize<P_G_Budget>(result.ResponseData.ToString());
                        ResponseResult res = Shared.InvTransactionProcess(session, SEC.BudjetID, "Budjet", db);
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

        [HttpGet]
        public HttpResponseMessage GetAll()
        {
            return Request.CreateResponse(HttpStatusCode.OK, db.P_G_Budget.ToList());
        }

        public ResponseResult Update(string JsonData)
        {
            ResponseResult result = new ResponseResult();
            var item = JsonConvert.DeserializeObject(JsonData) as P_G_Budget;

            using (var dbTrans = db.Database.BeginTransaction())
            {
                try
                {
                    if (item.BudjetID > 0)
                    {
                        db.P_G_Budget.Attach(item);
                        db.Entry(item).State = System.Data.Entity.EntityState.Modified;
                    }
                    else
                    {
                        db.P_G_Budget.Add(item);
                    }

                    db.SaveChanges();
                    dbTrans.Commit();

                    result.ResponseState = true;
                    result.ResponseData = item.BudjetID;

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
        public ResponseResult DeleteEntity(JObject data)
        {
            ResponseResult result = new Models.ResponseResult();
            result = Validation(ActionTypes.Delete, data);
            if (result.ResponseState == false)
                return result;

            var obj = JObjectData<P_G_Budget>(data);
            obj.Entity = result.ResponseData as P_G_Budget;
            data = JObjectToObj<P_G_Budget>(obj.Entity, obj.Session);
            result = this.Execute<P_G_Budget>(data, ActionTypes.Delete, this.Process);
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

                    var obj = JObjectData<P_G_Budget>(data);
                    obj.Entity = result.ResponseData as P_G_Budget;
                    data = JObjectToObj<P_G_Budget>(obj.Entity, obj.Session);
                    result = this.Execute<P_G_Budget>(data, ActionTypes.Update, this.Process, db, dbTransaction);
                    SessionRecord session = obj.Session;

                    if (result.ResponseState)
                    {
                        var SEC = JsonDeserialize<P_G_Budget>(result.ResponseData.ToString());
                        ResponseResult res = Shared.InvTransactionProcess(session, SEC.BudjetID, "Budjet", db);
                        if (res.ResponseState == true)
                        {

                            dbTransaction.Commit();
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

        public ResponseResult Validation(ActionTypes actionType, JObject data)
        {
            ResponseResult result = new ResponseResult();
            var obj = JObjectData<P_G_Budget>(data);
            SessionRecord session = obj.Session;
            InitalizeLanguage(obj.Session.Language);

            var entity = obj.Entity;
            int compCode = int.Parse(obj.Session.CompCode);


            switch (actionType)
            {
                case ActionTypes.Insert:
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
        public IHttpActionResult GetEngBudgetEngineer(string Siteengineerid, string BranchCode, string LoginYear, string Month)
        {
            try
            {
                int? _Month = null;
                int? _BranchCode = null;
                int? _Siteengineerid = null;
                if (!string.IsNullOrEmpty(Month))
                {
                    _Month = int.Parse(Month);
                }
                if (!string.IsNullOrEmpty(BranchCode))
                {
                    _BranchCode = int.Parse(BranchCode);
                }
                if (!string.IsNullOrEmpty(Siteengineerid))
                {
                    _Siteengineerid = int.Parse(Siteengineerid);
                }

                List<PProc_Eng_BudgetEngineer_Result> _BudgetEngineer = new List<PProc_Eng_BudgetEngineer_Result>();
                _BudgetEngineer = db.PProc_Eng_BudgetEngineer(_BranchCode, int.Parse(LoginYear), _Month, _Siteengineerid).ToList();
                return Ok(new BaseResponse(_BudgetEngineer));
            }
            catch (Exception ex)
            {
                return Ok(new BaseResponse(HttpStatusCode.ExpectationFailed, ex.Message));
            }

        }

        [HttpGet]
        public IHttpActionResult GetEngBudgetEngineerActiv(string Siteengineerid, string BranchCode, string LoginYear, string Month)
        {
            int? _Month = null;
            int? _BranchCode = null;
            int? _Siteengineerid = null;
            if (!string.IsNullOrEmpty(Month))
            {
                _Month = int.Parse(Month);
            }
            if (!string.IsNullOrEmpty(BranchCode))
            {
                _BranchCode = int.Parse(BranchCode);
            }
            if (!string.IsNullOrEmpty(Siteengineerid))
            {
                _Siteengineerid = int.Parse(Siteengineerid);
            }
            List<PProc_Eng_BudgetEngineerActiv_Result> _BudgetEngineer = new List<PProc_Eng_BudgetEngineerActiv_Result>();
            _BudgetEngineer = db.PProc_Eng_BudgetEngineerActiv(_BranchCode, int.Parse(LoginYear), _Month, _Siteengineerid).ToList();
            return Ok(new BaseResponse(_BudgetEngineer));
        }

    }
}
