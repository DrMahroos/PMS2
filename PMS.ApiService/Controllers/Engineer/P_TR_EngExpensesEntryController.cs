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

namespace PMS.ApiService.Controllers.Engineer
{
    public class P_TR_EngExpensesEntryController : BaseController, IMasterDetailsController<P_TR_EngExpensesEntry, P_TR_EngExpensesEntryDetail>
    {
        [HttpGet]
        public object SelectEntity(string SqlStatement)
        {
            var result = this.Get<P_TR_EngExpensesEntry>(SqlStatement);
            return result.ToList();
        }
        public ResponseResult InsertMasterDetails(JObject data)
        {
            ResponseResult result = new ResponseResult();
            var obj = JObjMasterDetails<P_TR_EngExpensesEntry, P_TR_EngExpensesEntryDetail>(data);
            SessionRecord session = obj.Session;
            P_TR_EngExpensesEntry master = obj.Master;
            List<P_TR_EngExpensesEntryDetail> details = obj.Details.ToList();
            result = MasterDetailsValidation(master, details, session);
            if (result.ResponseState == false)
            {
                return result;
            }
            obj = JObjMasterDetails<P_TR_EngExpensesEntry, P_TR_EngExpensesEntryDetail>(result.ResponseData as JObject);
            session = obj.Session;
            master = obj.Master;
            master.CreatedAt = DateTime.Now;
            master.CreatedBy = session.UserCode;
            details = obj.Details.ToList();

            using (var dbTrans = db.Database.BeginTransaction())
            {
                try
                {
                    db.P_TR_EngExpensesEntry.Add(master);
                    db.SaveChanges();
                    foreach (P_TR_EngExpensesEntryDetail item in details)
                    {
                        item.ExpensesEntryId = master.ExpensesEntryId;
                    }

                    db.P_TR_EngExpensesEntryDetail.AddRange(details);
                    db.SaveChanges();

                    ResponseResult res = Shared.InvTransactionProcess(session, master.ExpensesEntryId, "ExpEntry", db);
                    if (res.ResponseState == true)
                    {

                        dbTrans.Commit();
                        result.ResponseData = master.ExpensesEntryId;
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

        public ResponseResult MasterDetailsValidation(P_TR_EngExpensesEntry Master,IEnumerable<P_TR_EngExpensesEntryDetail> Details, SessionRecord Session)
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
            var obj = JObjMasterDetails<P_TR_EngExpensesEntry, P_TR_EngExpensesEntryDetail>(data);
            SessionRecord session = obj.Session;
            P_TR_EngExpensesEntry master = obj.Master;
            List<P_TR_EngExpensesEntryDetail> details = obj.Details.ToList();
            result = MasterDetailsValidation(master, details, session);
            if (result.ResponseState == false)
            {
                return result;
            }
            obj = JObjMasterDetails<P_TR_EngExpensesEntry, P_TR_EngExpensesEntryDetail>(result.ResponseData as JObject);
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
                    db.P_TR_EngExpensesEntryDetail.RemoveRange(db.P_TR_EngExpensesEntryDetail.Where(f => f.ExpensesEntryId == master.ExpensesEntryId));

                    db.P_TR_EngExpensesEntry.Attach(master);
                    db.Entry(master).State = System.Data.Entity.EntityState.Modified;
                    db.SaveChanges();

                    foreach (P_TR_EngExpensesEntryDetail item in details)
                    {
                        item.ExpensesEntryId = master.ExpensesEntryId;
                    }
                    db.P_TR_EngExpensesEntryDetail.AddRange(details);
                    db.SaveChanges();

                    ResponseResult res = Shared.InvTransactionProcess(session, master.ExpensesEntryId, "ExpEntry", db);
                    if (res.ResponseState == true)
                    {

                        dbTrans.Commit();
                        //master.TrNo = int.Parse(res.ResponseData.ToString());
                        result.ResponseData = master.ExpensesEntryId;
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
