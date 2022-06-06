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
    public class P_D_SalesItemsActivityController : BaseController, IMasterDetailsoBJController<P_D_SalesItems, M_D_ItemPlan>
    {
        [HttpGet]
        public object SelectEntity(string SqlStatement)
        {
            var result = this.Get<PQ_GetEngProductionLabour>(SqlStatement);
            return result.ToList();
        }

        public ResponseResult InsertMasterDetails(JObject data)
        {
            throw new NotImplementedException();
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

        public ResponseResult MasterDetailsValidation(P_D_SalesItems Master, P_D_SalesItemsActivity DetailsObj, SessionRecord Session)
        {
            throw new NotImplementedException();
        }
    }
}
