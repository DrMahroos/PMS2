using System;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Newtonsoft.Json.Linq;
using PMS.ApiService.Models;
using PMS.ApiService.Tools;
using System.Collections.Generic;

namespace PMS.ApiService.Controllers
{
    public class P_D_LocationController : BaseController, IBaseController
    {
        [HttpGet]
        public object SelectEntity(string SqlStatement)
        {
            var result = this.Get<P_D_Location>(SqlStatement);
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

                    var obj = JObjectData<P_D_Location>(data);
                    obj.Entity = result.ResponseData as P_D_Location;
                    data = JObjectToObj<P_D_Location>(obj.Entity, obj.Session);
                    result = this.Execute<P_D_Location>(data, ActionTypes.Insert, this.Process, db, dbTransaction);
                    SessionRecord session = obj.Session;

                    if (result.ResponseState)
                    {
                        var Location = JsonDeserialize<P_D_Location>(result.ResponseData.ToString());
                        ResponseResult res = Shared.InvTransactionProcess(session, Location.LocationId, "Location", db);
                        if (res.ResponseState == true)
                        {

                            dbTransaction.Commit();
                            Location.LocCode = res.ResponseData.ToString();
                            result.ResponseData = JsonSerialize(Location);
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

                    var obj = JObjectData<P_D_Location>(data);
                    obj.Entity = result.ResponseData as P_D_Location;
                    data = JObjectToObj<P_D_Location>(obj.Entity, obj.Session);
                    //   var parent2 = db.P_D_Location.Where(f => f.LocationId == obj.Entity.ParentLocationId).FirstOrDefault();
                   
                    result = this.Execute<P_D_Location>(data, ActionTypes.Update, this.Process, db, dbTransaction);
                    SessionRecord session = obj.Session;

                    if (result.ResponseState)
                    {
                        var Location = JsonDeserialize<P_D_Location>(result.ResponseData.ToString());
                        ResponseResult res = Shared.InvTransactionProcess(session, Location.LocationId, "Location", db);
                        if (res.ResponseState == true)
                        {

                            dbTransaction.Commit();
                            Location.LocCode = res.ResponseData.ToString();
                            result.ResponseData = JsonSerialize(Location);
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
          
            var obj = JObjectData<P_D_Location>(data);
            obj.Entity = result.ResponseData as P_D_Location;
          // var c = ;
           
            var y = db.P_D_Location.Where(e=> e.ParentLocationId == obj.Entity.ParentLocationId).Count();
            var parent = db.P_D_Location.Where(f => f.LocationId == obj.Entity.ParentLocationId).FirstOrDefault();
            if (y == 1)
            {
                parent.IsDetail = true;
             //  db.SaveChanges();
            }
            else
            {
              
                parent.IsDetail = false;
             //   db.SaveChanges();
            }
          
          
            data = JObjectToObj<P_D_Location>(obj.Entity, obj.Session);
            
            result = this.Execute<P_D_Location>(data, ActionTypes.Delete, this.Process);

            return result;

        }
        public ResponseResult InsertCollection(JObject data)
        {
            ResponseResult result = new Models.ResponseResult();
            result = Validation(ActionTypes.InsertCollection, data);
            if (result.ResponseState == false)
                return result;

            var obj = JObjectData<P_D_Location>(data);
            obj.Entity = result.ResponseData as P_D_Location;
            data = JObjectToObj<P_D_Location>(obj.Entity, obj.Session);
            result = this.Execute<P_D_Location>(data, ActionTypes.InsertCollection, this.Process);
            return result;
        }

        
        public ResponseResult Process(ActionTypes actionType, JObject data)
        {
            ResponseResult result = new ResponseResult();
            var obj = JObjectData<P_D_Location>(data);
            var entity = db.P_D_Location.Where(x => x.LocationId == obj.Entity.LocationId).FirstOrDefault();
          
            InitalizeLanguage(obj.Session.Language);
            switch (actionType)
            {
                case ActionTypes.Insert:
                    if (entity.ParentLocationId != null && entity.ParentLocationId != 0)
                    {
                     
                        // var parent = db.I_D_Category.Where(f => f.CatID == obj.Entity.ParentCatId).FirstOrDefault();
                        var parent = db.P_D_Location.Where(f => f.LocationId == obj.Entity.ParentLocationId).FirstOrDefault();
                        if (parent != null)
                        {
                            parent.IsDetail = false;

                          
                            entity.IsDetail = true;
                            db.P_D_Location.Attach(entity);
                            db.Entry(entity).State = System.Data.Entity.EntityState.Modified;
                            db.SaveChanges();
                        }
                    }
                    else
                    {

                        entity.IsDetail = true;
                        db.P_D_Location.Attach(entity);
                        db.Entry(entity).State = System.Data.Entity.EntityState.Modified;
                        db.SaveChanges();
                    }
                    break;
                case ActionTypes.Update:
                    //var parent1 = db.P_D_Location.Where(f => f.LocationId == obj.Entity.ParentLocationId).FirstOrDefault();
                    //if (parent1.LocationId ==entity.ParentLocationId && entity.ParentLocationId != 0)
                    //{

                    //    // var parent = db.I_D_Category.Where(f => f.CatID == obj.Entity.ParentCatId).FirstOrDefault();
                      
                    //    var xx = db.P_D_Location.Where(i => i.ParentLocationId == entity.ParentLocationId).Count();
                    //    if (xx == 1)
                    //    {
                    //        parent1.IsDetail = false;


                    //        entity.IsDetail = true;
                    //        db.P_D_Location.Attach(entity);
                    //        db.Entry(entity).State = System.Data.Entity.EntityState.Modified;
                    //        db.SaveChanges();
                    //    }

                    //    else
                    //    {
                    //        parent1.IsDetail = true;
                    //        entity.IsDetail = true;
                    //        db.P_D_Location.Attach(entity);
                    //        db.Entry(entity).State = System.Data.Entity.EntityState.Modified;
                    //        db.SaveChanges();
                    //    }
                    //}
                   
                    break;
                case ActionTypes.Delete:
                 //   var entity1 = db.P_D_Location.FirstOrDefault();
                   
                        //var brothers = db.P_D_Location.Where(f => f.ParentLocationId == obj.Entity.LocationId);
                        //if (brothers.Count() == 0)
                        //{
                        //    var parent = db.P_D_Location.Where(f => f.LocationId == obj.Entity.LocationId).FirstOrDefault();
                        //    parent.IsDetail = true;
                        //    db.SaveChanges();
                        //}
                    
                    break;
                case ActionTypes.InsertCollection:
                    break;
                default:
                    break;
            }

            result.ResponseState = true;
            return result;
        }
        public ResponseResult Validation(ActionTypes actionType, JObject data)
        {
            ResponseResult result = new ResponseResult();
            var obj = JObjectData<P_D_Location>(data);
            InitalizeLanguage(obj.Session.Language);

            var entity = obj.Entity;
            int compCode = int.Parse(obj.Session.CompCode);
            entity.CompCode = compCode;
            if (String.IsNullOrEmpty(entity.LocCode))
            {
                result.ResponseState = false;
                result.ResponseMessage = "";//Resources.SystemResource.Msg_Required;
                return result;
            }



            if (String.IsNullOrEmpty(entity.DescA) && String.IsNullOrEmpty(entity.DescE))
            {
                result.ResponseState = false;
                result.ResponseMessage = "";//Resources.SystemResource.Msg_Required;
                return result;
            }

            if (String.IsNullOrEmpty(entity.DescA))
                entity.DescA = entity.DescE;
            if (String.IsNullOrEmpty(entity.DescE))
                entity.DescE = entity.DescA;


            switch (actionType)
            {
                case ActionTypes.Insert:
                    var model = from serv in db.P_D_Location
                                where
                                    serv.CompCode == entity.CompCode &&
                                    (
                                        serv.DescA == entity.DescA ||
                                        serv.DescE == entity.DescE ||
                                        serv.LocCode == entity.LocCode
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
                    //var modeld = from cat in db.P_D_Location
                    //             where cat.ParentLocationId == obj.Entity.LocationId
                    //             select cat;
                    //if (modeld.Count() > 0)
                    //{
                    //    result.ResponseState = false;
                    //    result.ResponseMessage = Resources.SystemResource.Msg_CantDeleteMainCat;
                    //    return result;
                    //}
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
