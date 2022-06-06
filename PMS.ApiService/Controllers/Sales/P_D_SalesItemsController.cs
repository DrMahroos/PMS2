using PMS.ApiService.Models;
using PMS.ApiService.Tools;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Newtonsoft.Json.Linq;
using PMS.ApiService.Models.CustomEntities;

namespace PMS.ApiService.Controllers.Sales
{
    public class P_D_SalesItemsController : BaseController, IMasterDetailsoBJController<P_D_SalesItems, M_D_ItemPlan>
    {
        [HttpGet]
        public object SelectEntity(string SqlStatement)
        {
            var result = this.Get<P_D_SalesItems>(SqlStatement);
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

                    var obj = JObjectData<P_D_SalesItems>(data);
                    obj.Entity = result.ResponseData as P_D_SalesItems;
                    data = JObjectToObj<P_D_SalesItems>(obj.Entity, obj.Session);
                    result = this.Execute<P_D_SalesItems>(data, ActionTypes.Insert, this.Process, db, dbTransaction);
                    SessionRecord session = obj.Session;
                    obj.Entity.CreatedAt = DateTime.Now;
                    obj.Entity.CreatedBy = session.UserCode;

                    if (result.ResponseState)
                    {
                        var SEC = JsonDeserialize<P_D_SalesItems>(result.ResponseData.ToString());
                        ResponseResult res = Shared.InvTransactionProcess(session, SEC.ItemID, "SalesItem", db);
                        if (res.ResponseState == true)
                        {
                            dbTransaction.Commit();
                            SEC.ItemCode = res.ResponseData.ToString();
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

                    var obj = JObjectData<P_D_SalesItems>(data);
                    obj.Entity = result.ResponseData as P_D_SalesItems;
                    data = JObjectToObj<P_D_SalesItems>(obj.Entity, obj.Session);
                    result = this.Execute<P_D_SalesItems>(data, ActionTypes.Update, this.Process, db, dbTransaction);
                    SessionRecord session = obj.Session;
                    obj.Entity.UpdatedAt = DateTime.Now;
                    obj.Entity.UpdatedBy = session.UserCode;

                    if (result.ResponseState)
                    {
                        var item = JsonDeserialize<P_D_SalesItems>(result.ResponseData.ToString());
                        ResponseResult res = Shared.InvTransactionProcess(session, item.ItemID, "SalesItem", db);
                        if (res.ResponseState == true)
                        {

                            dbTransaction.Commit();
                            item.ItemCode = res.ResponseData.ToString();
                            result.ResponseData = JsonSerialize(item);
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


        public ResponseResult MasterDetailsValidation(P_D_SalesItems Master, M_D_ItemPlan Details, SessionRecord Session)
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

        public ResponseResult Validation(ActionTypes actionType, JObject data)
        {
            ResponseResult result = new ResponseResult();
            var obj = JObjectData<P_D_SalesItems>(data);
            InitalizeLanguage(obj.Session.Language);
            switch (actionType)
            {
                case ActionTypes.Insert:
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

        public ResponseResult Process(ActionTypes actionType, JObject data)
        {
            ResponseResult result = new ResponseResult();
            result.ResponseState = true;
            return result;
        }

        public ResponseResult InsertCollection(JObject data)
        {
            throw new NotImplementedException();
        }

        public ResponseResult DeleteEntity(JObject data)
        {
            throw new NotImplementedException();
        }

        public ResponseResult InsertMasterDetails(JObject data)
        {
            throw new NotImplementedException();
        }

        public ResponseResult UpdateMasterDetails(JObject data)
        {
            ResponseResult result = new ResponseResult();
            var obj = JObjMasterManyDetails<P_D_SalesItems, M_D_ItemPlan>(data);
            SessionRecord session = obj.Session;
            P_D_SalesItems master = obj.Master;
            M_D_ItemPlan details = obj.Details;
            result = MasterDetailsValidation(master, details, session);
            if (result.ResponseState == false)
            {
                return result;
            }

            obj = JObjMasterManyDetails<P_D_SalesItems, M_D_ItemPlan>(result.ResponseData as JObject);
            session = obj.Session;
            master = obj.Master;
            details = obj.Details;
            master.UpdatedAt = DateTime.Now;
            master.UpdatedBy = session.UserCode;

            using (var dbTrans = db.Database.BeginTransaction())
            {
                try
                {
                    db.P_D_SalesItems.Attach(master);
                    db.Entry(master).State = System.Data.Entity.EntityState.Modified;
                    db.SaveChanges();

                    if (details.P_D_SalesItemsActivity != null)
                    {
                        //update old and add new records01 P_D_SalesItemsActivity
                        foreach (P_D_SalesItemsActivity item in details.P_D_SalesItemsActivity)
                        {
                            if (item.ItemsActivityId > 0)
                            {
                                db.P_D_SalesItemsActivity.Attach(item);
                                db.Entry(item).State = System.Data.Entity.EntityState.Modified;
                            }
                            else
                            {
                                item.ItemID = master.ItemID;
                                db.P_D_SalesItemsActivity.Add(item);
                            }
                        }
                        //Deleting The Details//03 P_D_SalesItemsActivity
                        int i;
                        var _ItemsOld = db.P_D_SalesItemsActivity.Where(x => x.ItemID == master.ItemID).ToList();
                        foreach (var itm in _ItemsOld)
                        {
                            i = details.P_D_SalesItemsActivity.Where(n => n.ItemsActivityId == itm.ItemsActivityId).Count();
                            if (i == 0)
                            {
                                db.P_D_SalesItemsActivity.Remove(itm);
                            }
                        }
                        db.SaveChanges();
                    }
                    
                    ResponseResult res = Shared.InvTransactionProcess(session, master.ItemID, "SalesItem", db);
                    if (res.ResponseState == true)
                    {
                        dbTrans.Commit();
                        //master.TrNo = int.Parse(res.ResponseData.ToString());
                        result.ResponseData = master.ItemID;
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



