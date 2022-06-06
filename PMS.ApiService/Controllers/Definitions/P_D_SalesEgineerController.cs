using PMS.ApiService.Tools;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Newtonsoft.Json.Linq;
using PMS.ApiService.Models;

namespace PMS.ApiService.Controllers
{
    public class P_D_SalesEgineerController : BaseController, IBaseController
    {
        [HttpGet]
        public object SelectEntity(string SqlStatement)
        {
            var result = this.Get<P_D_SalesEgineer>(SqlStatement);
            return result.ToList();
        }


        /// <summary>
        /// Insert entity, data contains elements like Entity,SessionRecord ... etc
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
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

                    var obj = JObjectData<P_D_SalesEgineer>(data);
                    obj.Entity = result.ResponseData as P_D_SalesEgineer;
                    data = JObjectToObj<P_D_SalesEgineer>(obj.Entity, obj.Session);
                    result = this.Execute<P_D_SalesEgineer>(data, ActionTypes.Insert, this.Process, db, dbTransaction);
                    SessionRecord session = obj.Session;

                    if (result.ResponseState)
                    {
                        var Sales = JsonDeserialize<P_D_SalesEgineer>(result.ResponseData.ToString());
                        ResponseResult res = Shared.InvTransactionProcess(session, Sales.SalesEngineerId, "Sales", db);
                        if (res.ResponseState == true)
                        {

                            dbTransaction.Commit();
                            Sales.EngCode = res.ResponseData.ToString();
                            result.ResponseData = JsonSerialize(Sales);
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

        /// <summary>
        /// Update entity, data contains elements like Entity,SessionRecord ... etc
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
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

                    var obj = JObjectData<P_D_SalesEgineer>(data);
                    obj.Entity = result.ResponseData as P_D_SalesEgineer;
                    data = JObjectToObj<P_D_SalesEgineer>(obj.Entity, obj.Session);
                    result = this.Execute<P_D_SalesEgineer>(data, ActionTypes.Update, this.Process, db, dbTransaction);
                    SessionRecord session = obj.Session;

                    if (result.ResponseState)
                    {
                        var Sales = JsonDeserialize<P_D_SalesEgineer>(result.ResponseData.ToString());
                        ResponseResult res = Shared.InvTransactionProcess(session, Sales.SalesEngineerId, "Sales", db);
                        if (res.ResponseState == true)
                        {

                            dbTransaction.Commit();
                            Sales.EngCode = res.ResponseData.ToString();
                            result.ResponseData = JsonSerialize(Sales);
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

        /// <summary>
        /// Delete entity, data contains elements like Entity,SessionRecord ... etc
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
        [HttpPost]
        public ResponseResult DeleteEntity(JObject data)
        {
            ResponseResult result = new Models.ResponseResult();
            result = Validation(ActionTypes.Delete, data);
            if (result.ResponseState == false)
                return result;

            var obj = JObjectData<P_D_SalesEgineer>(data);
            obj.Entity = result.ResponseData as P_D_SalesEgineer;
            data = JObjectToObj<P_D_SalesEgineer>(obj.Entity, obj.Session);
            result = this.Execute<P_D_SalesEgineer>(data, ActionTypes.Delete, this.Process);
            return result;

        }
        public ResponseResult InsertCollection(JObject data)
        {
            ResponseResult result = new Models.ResponseResult();
            result = Validation(ActionTypes.InsertCollection, data);
            if (result.ResponseState == false)
                return result;

            var obj = JObjectData<P_D_SalesEgineer>(data);
            obj.Entity = result.ResponseData as P_D_SalesEgineer;
            data = JObjectToObj<P_D_SalesEgineer>(obj.Entity, obj.Session);
            result = this.Execute<P_D_SalesEgineer>(data, ActionTypes.InsertCollection, this.Process);
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
            var obj = JObjectData<P_D_SalesEgineer>(data);
            InitalizeLanguage(obj.Session.Language);

            var entity = obj.Entity;
            int compCode = int.Parse(obj.Session.CompCode);
            entity.CompCode = compCode;
            if (String.IsNullOrEmpty(entity.EngCode))
            {
                result.ResponseState = false;
                result.ResponseMessage = "";//Resources.SystemResource.Msg_Required;
                return result;
            }



            if (String.IsNullOrEmpty(entity.DeacA) && String.IsNullOrEmpty(entity.DescE))
            {
                result.ResponseState = false;
                result.ResponseMessage = "";//Resources.SystemResource.Msg_Required;
                return result;
            }

            if (String.IsNullOrEmpty(entity.DeacA))
                entity.DeacA = entity.DescE;
            if (String.IsNullOrEmpty(entity.DescE))
                entity.DescE = entity.DeacA;


            switch (actionType)
            {
                case ActionTypes.Insert:
                    var model = from serv in db.P_D_SalesEgineer
                                where
                                    serv.CompCode == entity.CompCode &&
                                    (
                                        serv.DeacA == entity.DeacA ||
                                        serv.DescE == entity.DescE ||
                                        serv.EngCode == entity.EngCode
                                    )
                                select serv;
                    if (model.Count() > 0)
                    {
                        //result.ResponseState = false;
                        //result.ResponseMessage = Resources.SystemResource.Msg_Unique;
                        //return result;
                    }
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

       
    }
    
}
