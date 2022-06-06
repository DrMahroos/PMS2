using PMS.ApiService.Tools;
using PMS.ApiService.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Newtonsoft.Json.Linq;
namespace PMS.ApiService.Controllers
{
    public class P_D_EquipmentController : BaseController, IBaseController
    {
        /// <summary>
        /// Select entity by Sql Statement
        /// </summary>
        /// <param name="SqlStatement"></param>
        /// <returns></returns>
        [HttpGet]
        public object SelectEntity(string SqlStatement)
        {
            var result = this.Get<P_D_Equipment>(SqlStatement);
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

                    var obj = JObjectData<P_D_Equipment>(data);
                    obj.Entity = result.ResponseData as P_D_Equipment;
                    data = JObjectToObj<P_D_Equipment>(obj.Entity, obj.Session);
                    result = this.Execute<P_D_Equipment>(data, ActionTypes.Insert, this.Process, db, dbTransaction);
                    SessionRecord session = obj.Session;

                    if (result.ResponseState)
                    {
                        var Eq = JsonDeserialize<P_D_Equipment>(result.ResponseData.ToString());
                        ResponseResult res = Shared.InvTransactionProcess(session, Eq.EquimentID, "Equ", db);
                        if (res.ResponseState == true)
                        {

                            dbTransaction.Commit();
                            Eq.Equipcode = res.ResponseData.ToString();
                            result.ResponseData = JsonSerialize(Eq);
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

                    var obj = JObjectData<P_D_Equipment>(data);
                    obj.Entity = result.ResponseData as P_D_Equipment;
                    data = JObjectToObj<P_D_Equipment>(obj.Entity, obj.Session);
                    result = this.Execute<P_D_Equipment>(data, ActionTypes.Update, this.Process, db, dbTransaction);
                    SessionRecord session = obj.Session;

                    if (result.ResponseState)
                    {
                        var Eq = JsonDeserialize<P_D_Equipment>(result.ResponseData.ToString());
                        ResponseResult res = Shared.InvTransactionProcess(session, Eq.EquimentID, "Equ", db);
                        if (res.ResponseState == true)
                        {

                            dbTransaction.Commit();
                            Eq.Equipcode = res.ResponseData.ToString();
                            result.ResponseData = JsonSerialize(Eq);
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

            var obj = JObjectData<P_D_Equipment>(data);
            obj.Entity = result.ResponseData as P_D_Equipment;
            data = JObjectToObj<P_D_Equipment>(obj.Entity, obj.Session);
            result = this.Execute<P_D_Equipment>(data, ActionTypes.Delete, this.Process);
            return result;

        }
        public ResponseResult InsertCollection(JObject data)
        {
            ResponseResult result = new Models.ResponseResult();
            result = Validation(ActionTypes.InsertCollection, data);
            if (result.ResponseState == false)
                return result;

            var obj = JObjectData<P_D_Equipment>(data);
            obj.Entity = result.ResponseData as P_D_Equipment;
            data = JObjectToObj<P_D_Equipment>(obj.Entity, obj.Session);
            result = this.Execute<P_D_Equipment>(data, ActionTypes.InsertCollection, this.Process);
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
            var obj = JObjectData<P_D_Equipment>(data);
            InitalizeLanguage(obj.Session.Language);

            var entity = obj.Entity;
            int compCode = int.Parse(obj.Session.CompCode);
            entity.CompCode = compCode;
            entity.BraCode = int.Parse(obj.Session.BranchCode);
            //if (String.IsNullOrEmpty(entity.Equipcode))
            //{
            //    result.ResponseState = false;
            //    result.ResponseMessage = Resources.SystemResource.Msg_Required;
            //    return result;
            //}



            if (String.IsNullOrEmpty(entity.DescA) && String.IsNullOrEmpty(entity.DescE))
            {
                result.ResponseState = false;
                result.ResponseMessage = "";// Resources.SystemResource.Msg_Required;
                return result;
            }

            if (String.IsNullOrEmpty(entity.DescA))
                entity.DescA = entity.DescE;
            if (String.IsNullOrEmpty(entity.DescE))
                entity.DescE = entity.DescA;


            switch (actionType)
            {
                case ActionTypes.Insert:
                    var model = from serv in db.P_D_Equipment
                                where
                                    serv.CompCode == entity.CompCode &&
                                    (
                                        serv.DescA == entity.DescA ||
                                        serv.DescE == entity.DescE ||
                                        serv.Equipcode == entity.Equipcode
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
