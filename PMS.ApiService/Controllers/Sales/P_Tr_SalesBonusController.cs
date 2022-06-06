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
    public class P_Tr_SalesBonusController : BaseController, IMasterDetailsController<P_Tr_SalesBonus, P_Tr_SalesBonusDetail>
    {
        [HttpGet]
        public object SelectEntity(string SqlStatement)
        {
            var result = this.Get<P_Tr_SalesBonus>(SqlStatement);
            return result.ToList();
        }

        public ResponseResult InsertMasterDetails(JObject data)
        {
            ResponseResult result = new ResponseResult();
            var obj = JObjMasterDetails<P_Tr_SalesBonus, P_Tr_SalesBonusDetail>(data);
            SessionRecord session = obj.Session;
            P_Tr_SalesBonus master = obj.Master;
            List<P_Tr_SalesBonusDetail> details = obj.Details.ToList();
            result = MasterDetailsValidation(master, details, session);
            if (result.ResponseState == false)
                return result;
            obj = JObjMasterDetails<P_Tr_SalesBonus, P_Tr_SalesBonusDetail>(result.ResponseData as JObject);
            session = obj.Session;
            master = obj.Master;
            details = obj.Details.ToList();
            master.CreatedAt = DateTime.Now;
            master.CreatedBy = session.UserCode.ToString();
            using (var dbTrans = db.Database.BeginTransaction())
            {
                try
                {
                    db.P_Tr_SalesBonus.Add(master);
                    db.SaveChanges();
                    foreach (P_Tr_SalesBonusDetail item in details)
                    {
                        item.SalesBonusId = master.SalesBonusId;
                     }

                    db.P_Tr_SalesBonusDetail.AddRange(details);
                    db.SaveChanges();

                    ResponseResult res = Shared.InvTransactionProcess(session, master.SalesBonusId, "SlsBonus", db);
                    if (res.ResponseState == true)
                    {
                        dbTrans.Commit();
                        result.ResponseData = master.SalesBonusId;
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

        public ResponseResult MasterDetailsValidation(P_Tr_SalesBonus Master, IEnumerable<P_Tr_SalesBonusDetail> Details, SessionRecord Session)
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
            var obj = JObjMasterDetails<P_Tr_SalesBonus, P_Tr_SalesBonusDetail>(data);
            SessionRecord session = obj.Session;
            P_Tr_SalesBonus master = obj.Master;
            List<P_Tr_SalesBonusDetail> details = obj.Details.ToList();
            result = MasterDetailsValidation(master, details, session);
            if (result.ResponseState == false)
            {
                return result;
            }

            obj = JObjMasterDetails<P_Tr_SalesBonus, P_Tr_SalesBonusDetail>(result.ResponseData as JObject);
            session = obj.Session;

            master = obj.Master;
            details = obj.Details.ToList();
            master.UpdatedAt = DateTime.Now;
            master.UpdatedBy = session.UserCode;

            using (var dbTrans = db.Database.BeginTransaction())
            {
                try
                {
                    db.P_Tr_SalesBonusDetail.RemoveRange(db.P_Tr_SalesBonusDetail.Where(f => f.SalesBonusId == master.SalesBonusId));

                    db.P_Tr_SalesBonus.Attach(master);
                    db.Entry(master).State = System.Data.Entity.EntityState.Modified;
                    db.SaveChanges();

                    foreach (P_Tr_SalesBonusDetail item in details)
                    {
                        item.SalesBonusId = master.SalesBonusId;
                    }

                    db.P_Tr_SalesBonusDetail.AddRange(details);
                    db.SaveChanges();


                    ResponseResult res = Shared.InvTransactionProcess(session, master.SalesBonusId, "SlsBonus", db);
                    if (res.ResponseState == true)
                    {
                        dbTrans.Commit();
                        result.ResponseData = master.SalesBonusId;
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
