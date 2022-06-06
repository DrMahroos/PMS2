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

namespace PMS.ApiService.Controllers
{
    public class G_USERSController : BaseController, IBaseController
    {
        /// <summary>
        /// Select entity by Sql Statement
        /// </summary>
        /// <param name="SqlStatement"></param>
        /// <returns></returns>
        [HttpGet]
        public object SelectEntity(string SqlStatement)
        {
            var result = this.Get<G_USERS>(SqlStatement);
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
            result = Validation(ActionTypes.Insert, data);
            if (result.ResponseState == false)
                return result;

            var obj = JObjectData<G_USERS>(data);
            obj.Entity = result.ResponseData as G_USERS;
            data = JObjectToObj<G_USERS>(obj.Entity, obj.Session);
            result = this.Execute<G_USERS>(data, ActionTypes.Insert, this.Process);
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
            result = Validation(ActionTypes.Update, data);
            if (result.ResponseState == false)
                return result;

            var obj = JObjectData<G_USERS>(data);
            obj.Entity = result.ResponseData as G_USERS;
            data = JObjectToObj<G_USERS>(obj.Entity, obj.Session);
            result = this.Execute<G_USERS>(data, ActionTypes.Update, this.Process);
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

            var obj = JObjectData<G_USERS>(data);
            obj.Entity = result.ResponseData as G_USERS;
            data = JObjectToObj<G_USERS>(obj.Entity, obj.Session);
            result = this.Execute<G_USERS>(data, ActionTypes.Delete, this.Process);
            return result;
            
        }
        public ResponseResult InsertCollection(JObject data)
        {
            ResponseResult result = new Models.ResponseResult();
            result = Validation(ActionTypes.InsertCollection, data);
            if (result.ResponseState == false)
                return result;

            var obj = JObjectData<G_USERS>(data);
            obj.Entity = result.ResponseData as G_USERS;
            data = JObjectToObj<G_USERS>(obj.Entity, obj.Session);
            result = this.Execute<G_USERS>(data, ActionTypes.InsertCollection, this.Process);
            return result;
        }
        
        

        public ResponseResult Process(ActionTypes actionType, JObject data)
        {
            ResponseResult result = new ResponseResult();
            result.ResponseState = true;
            return result;
        }

        public ResponseResult Validation(ActionTypes actionType,JObject data)
        {
            ResponseResult result = new ResponseResult();
            var obj = JObjectData<G_USERS>(data);
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

        [HttpGet, AllowAnonymous]
        public IHttpActionResult GetByuserCode(string userCode)
        {
            if (ModelState.IsValid)
            {
                var _Result = db.G_USERS.Where(x => x.USER_CODE == userCode).FirstOrDefault();
                return Ok(new BaseResponse(_Result));
            }
            return BadRequest(ModelState);
        }


        [HttpGet, AllowAnonymous]
        public IHttpActionResult GetAll(string CompCode)
        {
            if (ModelState.IsValid)
            {
                int compcod = Convert.ToInt32(CompCode);
                var documents = db.G_USERS.Where(x => x.CompCode == compcod).ToList();
                return Ok(new BaseResponse(documents));
            }
            return BadRequest(ModelState);
        }

        [HttpPost, AllowAnonymous]
        public IHttpActionResult Insert([FromBody]MasterDetailsUsers data)
        {
            if (ModelState.IsValid)
            {
                var user = data.G_USERS;
                var userModule = data.G_USER_MODULE;
                using (var dbTransaction = db.Database.BeginTransaction())
                {
                    try
                    {
                        db.G_USERS.Add(user);
                        db.SaveChanges();

                        ResponseResult res = Shared.TransactionProcess(Convert.ToInt32(user.CompCode), 0, 0, "USERS", db);
                        if (res.ResponseState == true)
                        {
                            db.Database.ExecuteSqlCommand("execute GProc_CreateUser '" + user.USER_CODE + "', '" + user.ManagedBy + "'");
                            BaseResponse response = new BaseResponse(user);
                            response.Response = user.USER_CODE;
                            dbTransaction.Commit();
                            return Ok(response);
                        }
                        else
                        {
                            dbTransaction.Rollback();
                            return Ok(new BaseResponse(HttpStatusCode.ExpectationFailed, res.ResponseMessage));
                        }
                    }
                    catch (Exception ex)
                    {
                        dbTransaction.Rollback();
                        return Ok(new BaseResponse(HttpStatusCode.ExpectationFailed, ex.Message));
                    }
                }
            }
            return BadRequest(ModelState);
        }

        [HttpPost, AllowAnonymous]
        public IHttpActionResult Update([FromBody]MasterDetailsUsers data)
        {
            if (ModelState.IsValid)
            {
                using (var dbTransaction = db.Database.BeginTransaction())
                {
                    try
                    {
                        var user = data.G_USERS;
                        var userModule = data.G_USER_MODULE;
                        var userBranch = data.G_USER_BRANCH;
                        var userSubSystems = data.G_USER_SUB_SYSTEM;

                        db.Entry(user).State = System.Data.Entity.EntityState.Modified;
                        db.SaveChanges();
                        //db.Database.ExecuteSqlCommand("delete from G_USER_MODULE where user_code ='" + Model.G_USERS.USER_CODE + "' and system_code ='" + Model.G_USERS.SYSTEM_CODE + "'and sub_system_code ='" + Model.G_USERS.SUB_SYSTEM_CODE + "' and module_code not in (select module_code from g_modules where system_code='" + Model.G_USERS.SYSTEM_CODE + "' and sub_system_code= '" + Model.G_USERS.SUB_SYSTEM_CODE + "' and available = 0)");

                        //db.G_USER_MODULE.RemoveRange(db.G_USER_MODULE.Where(f => f.USER_CODE == user.USER_CODE));
                        foreach (var item in userModule)
                        {
                            db.G_USER_MODULE.Attach(item);
                            db.Entry(item).State = System.Data.Entity.EntityState.Modified;
                        }
                        //db.G_USER_MODULE.AddRange(userModule);
                        db.SaveChanges();


                        //db.G_USER_BRANCH.RemoveRange(db.G_USER_BRANCH.Where(f => f.USER_CODE == user.USER_CODE));
                        foreach (var item in userBranch)
                        {
                            db.G_USER_BRANCH.Attach(item);
                            db.Entry(item).State = System.Data.Entity.EntityState.Modified;
                        }
                        //db.G_USER_BRANCH.AddRange(userBranch);
                        db.SaveChanges();

                        //db.G_USER_SUB_SYSTEM.RemoveRange(db.G_USER_SUB_SYSTEM.Where(f => f.USER_CODE == user.USER_CODE));
                        foreach (var item in userSubSystems)
                        {
                            db.G_USER_SUB_SYSTEM.Attach(item);
                            db.Entry(item).State = System.Data.Entity.EntityState.Modified;
                        }
                        //db.G_USER_SUB_SYSTEM.AddRange(userSubSystems);
                        db.SaveChanges();


                        ResponseResult res = Shared.TransactionProcess(Convert.ToInt32(user.CompCode), 0, 0, "USERS", db);
                        if (res.ResponseState == true)
                        {

                            BaseResponse response = new BaseResponse(user);
                            response.Response = user.USER_CODE;
                            dbTransaction.Commit();
                            return Ok(response);
                        }
                        else
                        {
                            dbTransaction.Rollback();
                            return Ok(new BaseResponse(HttpStatusCode.ExpectationFailed, res.ResponseMessage));
                        }


                    }
                    catch (Exception ex)
                    {
                        dbTransaction.Rollback();
                        return Ok(new BaseResponse(HttpStatusCode.ExpectationFailed, ex.Message));
                    }

                }
            }
            return BadRequest(ModelState);

        }

        [HttpGet, AllowAnonymous]
        public IHttpActionResult Delete(string userCode)
        {
            if (ModelState.IsValid)
            {
                var user = db.G_USERS.FirstOrDefault(x => x.USER_CODE == userCode);
                db.G_USERS.Remove(user);
                db.SaveChanges();
                return Ok(new BaseResponse());
            }
            return BadRequest(ModelState);

        }

        [HttpGet, AllowAnonymous]
        public IHttpActionResult GetbyID(string id)
        {
            if (ModelState.IsValid)
            {
                var USER = db.G_USERS.FirstOrDefault(x=>x.USER_CODE == id);

                return Ok(new BaseResponse(USER));
            }
            return BadRequest(ModelState);
        }


        [HttpGet, AllowAnonymous]
        public IHttpActionResult getDetails(string userCode, string systemCode, bool avail)
        {

            if (ModelState.IsValid)
            {
                var model = db.GQ_GetUserModule.Where(x => x.USER_CODE == userCode & x.SYSTEM_CODE == systemCode
                & x.AVAILABLE == avail).ToList().OrderBy(xx => xx.MENU_NO);
                return Ok(new BaseResponse(model));
            }
            return BadRequest(ModelState);
        }
    }
}
