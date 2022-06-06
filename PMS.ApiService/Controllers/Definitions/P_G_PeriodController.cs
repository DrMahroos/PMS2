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
using Newtonsoft.Json;
using System.Data.SqlClient;
using System.Data;
using System.Data.Entity.Core.Objects;

namespace PMS.ApiService.Controllers
{
    public class P_G_PeriodController : BaseController, IMasterDetailsoBJController<P_G_Period, M_D_Period>
    {
        [HttpGet]
        public object SelectEntity(string SqlStatement)
        {
            var result = this.Get<P_G_Period>(SqlStatement);
            return result.ToList();
        }
        public ResponseResult DeleteEntity(JObject data)
        {
            throw new NotImplementedException();
        }

        public ResponseResult InsertCollection(JObject data)
        {
            throw new NotImplementedException();
        }

        public ResponseResult InsertEntity(JObject data)
        {
            throw new NotImplementedException();
        }

        public ResponseResult Process(ActionTypes actionType, JObject data)
        {
            ResponseResult result = new ResponseResult();
            result.ResponseState = true;
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

                    var obj = JObjectData<P_G_Period>(data);
                    obj.Entity = result.ResponseData as P_G_Period;
                    data = JObjectToObj<P_G_Period>(obj.Entity, obj.Session);
                    result = this.Execute<P_G_Period>(data, ActionTypes.Update, this.Process, db, dbTransaction);
                    SessionRecord session = obj.Session;

                    if (result.ResponseState)
                    {
                        var Period = JsonDeserialize<P_G_Period>(result.ResponseData.ToString());
                        ResponseResult res = Shared.InvTransactionProcess(session, Period.PeriodID, "Period", db);
                        if (res.ResponseState == true)
                        {

                            dbTransaction.Commit();
                            //Period.PeriodCode = (int)res.ResponseData;
                            //result.ResponseData = JsonSerialize(Period);
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

        public ResponseResult Validation(ActionTypes actionType, JObject data)
        {
            ResponseResult result = new ResponseResult();
            var obj = JObjectData<P_G_Period>(data);
            InitalizeLanguage(obj.Session.Language);

            var entity = obj.Entity;
            int compCode = int.Parse(obj.Session.CompCode);
            entity.CompCode = compCode;
            if (String.IsNullOrEmpty(entity.PeriodCode.ToString()))
            {
                result.ResponseState = false;
                result.ResponseMessage = "Required";
                return result;
            }



            if (String.IsNullOrEmpty(entity.DescA) && String.IsNullOrEmpty(entity.DescE))
            {
                result.ResponseState = false;
                result.ResponseMessage = "Required";
                return result;
            }

            if (String.IsNullOrEmpty(entity.DescA))
                entity.DescA = entity.DescE;
            if (String.IsNullOrEmpty(entity.DescE))
                entity.DescE = entity.DescA;
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

        [HttpGet]
        public ResponseResult MonthCalcProdCost(string PeriodId)
        {
            ResponseResult result = new ResponseResult();
            try
            {
                db.PPrc_MonthCalcProdCost(int.Parse(PeriodId));
                result.ResponseState = true;
            }
            catch (Exception e)
            {
                result.ResponseState = false;
                result.ResponseMessage = e.Message;
            }
            return result;
        }
        [HttpGet]
        public ResponseResult MonthClose(int PeriodId)
        {
            ResponseResult result = new ResponseResult();
            try
            {
                 ObjectParameter Tot= new ObjectParameter("Tot", SqlDbType.Int);
                var X  = db.PPrc_MonthClose(PeriodId,Tot);
                result.ResponseData = Tot.Value; 
                result.ResponseState = true;

            }
            catch (Exception e)
            {
                result.ResponseState = false;
                result.ResponseMessage = e.Message;
            }
            return result;
        }

        public ResponseResult InsertMasterDetails(JObject data)
        {
            throw new NotImplementedException();
        }

        public ResponseResult MasterDetailsValidation(P_G_Period Master, M_D_Period DetailsObj, SessionRecord Session)
        {
            ResponseResult result = new ResponseResult();
            try
            {
                Master.CompCode = int.Parse(Session.CompCode);
                InitalizeLanguage(Session.Language);

                var obj = new
                {
                    Master = Master,
                    Details = DetailsObj,
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
            //var obj = JObjMasterManyDetails<P_G_Period, M_D_Period>(data);

            SessionRecord mySession = data["Session"].ToObject<SessionRecord>();

            var ee = JsonConvert.SerializeObject(data);
            var obj = JsonConvert.DeserializeObject<M_D_Period>(ee);

            SessionRecord session = mySession;
            P_G_Period master = data["Master"].ToObject<P_G_Period>();
            List<P_G_Period> details = data["Details"].ToObject<List<P_G_Period>>();

            //result = MasterDetailsValidation(master details, mySession);
            //if (result.ResponseState == false)
            //{
            //    return result;
            //}

            //obj = JObjMasterManyDetails<P_G_Period, M_D_Period>(result.ResponseData as JObject);
            //session = obj.Session;
            //master = obj.Master;
            //details = obj.Details;

            using (var dbTrans = db.Database.BeginTransaction())
            {
                try
                {
                    //db.P_G_Period.Attach(master);
                    //db.Entry(master).State = System.Data.Entity.EntityState.Modified;
                    //db.SaveChanges();

                    if (details != null)
                    {
                        //update old and add new records01 P_D_SalesItemsActivity
                        foreach (P_G_Period item in details)
                        {
                            if (item.PeriodID > 0)
                            {
                                db.P_G_Period.Attach(item);
                                db.Entry(item).State = System.Data.Entity.EntityState.Modified;
                                db.SaveChanges();

                            }
                            else
                            {
                                item.PeriodID = master.PeriodID;
                                db.P_G_Period.Add(item);
                                db.SaveChanges();
                            }
                        }
                        //Deleting The Details//03 P_D_SalesItemsActivity
                        //int i;
                        //var _ItemsOld = db.P_G_Period.Where(x => x.PeriodID == master.PeriodID).ToList();
                        //foreach (var itm in _ItemsOld)
                        //{
                        //    i = details.Where(n => n.PeriodID == itm.PeriodID).Count();
                        //    if (i == 0)
                        //    {
                        //        db.P_G_Period.Remove(itm);
                        //    }
                        //}
                        //db.SaveChanges();
                        ResponseResult res = Shared.InvTransactionProcess(session, master.PeriodID, "Period", db);
                        if (res.ResponseState == true)
                        {
                            dbTrans.Commit();
                            //master.TrNo = int.Parse(res.ResponseData.ToString());
                            result.ResponseState = true;
                            result.ResponseData = master.PeriodID;
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

    }

}
