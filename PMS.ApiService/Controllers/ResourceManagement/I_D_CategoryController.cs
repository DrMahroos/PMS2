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

namespace PMS.ApiService.Controllers.ResourceManagement
{
    public class I_D_CategoryController : BaseController, IMasterDetailsController<I_D_Category, I_Item>
    {
        [HttpGet]
        public object SelectEntity(string SqlStatement)
        {
            var result = this.Get<I_D_Category>(SqlStatement);
            return result.ToList();
        }
        public ResponseResult MasterDetailsValidation(I_D_Category Master, IEnumerable<I_Item> Details, SessionRecord Session)
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

        public ResponseResult UpdateMasterDetailsOld(JObject data)
        {
            ResponseResult result = new ResponseResult();
            var obj = JObjMasterDetails<I_D_Category, I_Item>(data);
            SessionRecord session = obj.Session;
            I_D_Category master = obj.Master;
            List<I_Item> details = obj.Details.ToList();
            result = MasterDetailsValidation(master, details, session);
            if (result.ResponseState == false)
            {
                return result;
            }
            obj = JObjMasterDetails<I_D_Category, I_Item>(result.ResponseData as JObject);
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
                    db.I_Item.RemoveRange(db.I_Item.Where(f => f.CatID == master.CatID));

                    db.I_D_Category.Attach(master);
                    db.Entry(master).State = System.Data.Entity.EntityState.Modified;
                    db.SaveChanges();
                    //var originalDetail =   db.I_Item.Where(m => m.CatID == master.CatID).ToList();
                    //for (int i = 0; i < originalDetail.Count; i++)
                    //{
                    //    details[i].ItemID = originalDetail[i].ItemID;
                    //}
                    //db.I_Item.RemoveRange(db.I_Item.Where(f => f.CatID == master.CatID));
                    //db.I_D_Category.Attach(master);
                    //db.Entry(master).State = System.Data.Entity.EntityState.Modified;
                    //db.SaveChanges();

                    foreach (I_Item item in details)
                    {
                        item.CatID = master.CatID;
                        item.ItemTypeID = null;
                    }
                    db.I_Item.AddRange(details);
                    db.SaveChanges();

                    ResponseResult res = new ResponseResult()
                    {
                        ResponseState = true
                    };
                    if (res.ResponseState == true)
                    {

                        dbTrans.Commit();
                        //master.TrNo = int.Parse(res.ResponseData.ToString());
                        result.ResponseData = master.CatID;
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
        public ResponseResult UpdateMasterDetails(JObject data)
        {
            ResponseResult result = new ResponseResult();
            var obj = JObjMasterDetails<I_D_Category, I_Item>(data);
            SessionRecord session = obj.Session;
            I_D_Category master = obj.Master;
            List<I_Item> details = obj.Details.ToList();
            result = MasterDetailsValidation(master, details, session);
            if (result.ResponseState == false)
            {
                return result;
            }
            obj = JObjMasterDetails<I_D_Category, I_Item>(result.ResponseData as JObject);
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
                    //db.I_Item.RemoveRange(db.I_Item.Where(f => f.CatID == master.CatID));

                    //db.I_D_Category.Attach(master);
                    //db.Entry(master).State = System.Data.Entity.EntityState.Modified;
                    //db.SaveChanges();
                    //var originalDetail =   db.I_Item.Where(m => m.CatID == master.CatID).ToList();
                    //for (int i = 0; i < originalDetail.Count; i++)
                    //{
                    //    details[i].ItemID = originalDetail[i].ItemID;
                    //}
                    //db.I_Item.RemoveRange(db.I_Item.Where(f => f.CatID == master.CatID));
                    //db.I_D_Category.Attach(master);
                    //db.Entry(master).State = System.Data.Entity.EntityState.Modified;
                    //db.SaveChanges();

                    foreach (I_Item item in details)
                    {
                        item.ItemTypeID = null;
                        db.I_Item.Attach(item);
                        db.Entry(item).State = System.Data.Entity.EntityState.Modified;
                        
                    }
                  
                    db.SaveChanges();

                    ResponseResult res = new ResponseResult()
                    {
                        ResponseState = true
                    };
                    if (res.ResponseState == true)
                    {

                        dbTrans.Commit();
                        //master.TrNo = int.Parse(res.ResponseData.ToString());
                        result.ResponseData = 1;
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
        public ResponseResult InsertMasterDetails(JObject data)
        {
            ResponseResult result = new ResponseResult();
            var obj = JObjMasterDetails<I_D_Category, I_Item>(data);
            SessionRecord session = obj.Session;
            I_D_Category master = obj.Master;
            List<I_Item> details = obj.Details.ToList();
            result = MasterDetailsValidation(master, details, session);
            if (result.ResponseState == false)
            {
                return result;
            }
            obj = JObjMasterDetails<I_D_Category, I_Item>(result.ResponseData as JObject);
            session = obj.Session;
            master = obj.Master;
            // intialize Forehin Keys
            master.CostMethodID = null;
            master.ItemTypeID = null;
            master.StockMethodID = null;
            master.ParentCatId = null;
            //make initialize of CatID
            //master.CatID = null;
            master.CreatedAt = DateTime.Now;
            master.CreatedBy = session.UserCode;
            details = obj.Details.ToList();

            using (var dbTrans = db.Database.BeginTransaction())
            {
                try
                {
                    db.I_D_Category.Add(master);
                    db.SaveChanges();
                    foreach (I_Item item in details)
                    {
                        item.CatID = master.CatID;
                        item.ItemTypeID = null;
                    }

                    db.I_Item.AddRange(details);
                    db.SaveChanges();

                    ResponseResult res = Shared.InvTransactionProcess(session, master.CatID, "SubCont", db);
                    if (res.ResponseState == true)
                    {

                        dbTrans.Commit();
                        result.ResponseData = master.CatID;
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
