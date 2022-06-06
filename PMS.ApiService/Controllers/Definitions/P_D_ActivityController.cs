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

namespace PMS.ApiService.Controllers
{
    public class P_D_ActivityController : BaseController, IMasterDetailsoBJController<P_D_Activity, M_D_Activites>
    {
        [HttpGet]
        public object SelectEntity(string SqlStatement)
        {
            var result = this.Get<P_D_Activity>(SqlStatement);
            return result.ToList();
        }

        public ResponseResult InsertMasterDetails(JObject data)
        {
            ResponseResult result = new ResponseResult();
            var obj1 = JObjMasterManyDetails<P_D_Activity, M_D_Activites>(data);

            var obj = JObjMasterManyDetails<P_D_Activity, M_D_Activites>(data);
            SessionRecord session = obj1.Session;
            P_D_Activity master = obj1.Master;
            M_D_Activites details = obj1.Details;
            result = MasterDetailsValidation(master, details, session);
            if (result.ResponseState == false)
                return result;
            obj = JObjMasterManyDetails<P_D_Activity, M_D_Activites>(result.ResponseData as JObject);
            session = obj.Session;
            master = obj.Master;
            details = obj.Details;

            //Start Details
            List<P_D_ActivityEquipClass> ActivityEquipClass = details.P_D_ActivityEquipClass;
            List<P_D_ActivityIMaterial> ActivityIMaterial = details.P_D_ActivityIMaterial;
            List<P_D_ActivityLaborClass> ActivityLaborClass = details.P_D_ActivityLaborClass;

            //End Details

            using (var dbTrans = db.Database.BeginTransaction())
            {
                try
                {
                    db.P_D_Activity.Add(master);
                    var _Res = db.SaveChanges();
                    if (_Res > 0)
                    {

                        foreach (P_D_ActivityEquipClass item in ActivityEquipClass)
                        {
                            item.ActivityID = master.ActivityID;
                        }
                        db.P_D_ActivityEquipClass.AddRange(ActivityEquipClass);
                        db.SaveChanges();

                        foreach (P_D_ActivityIMaterial item in ActivityIMaterial)
                        {
                            item.ActivityID = master.ActivityID;
                        }
                        db.P_D_ActivityIMaterial.AddRange(ActivityIMaterial);
                        db.SaveChanges();

                        foreach (P_D_ActivityLaborClass item in ActivityLaborClass)
                        {
                            item.ActivityID = master.ActivityID;
                        }
                        db.P_D_ActivityLaborClass.AddRange(ActivityLaborClass);
                        db.SaveChanges();
                    }

                    ResponseResult res = Shared.InvTransactionProcess(session, master.ActivityID, "Act", db);
                    if (res.ResponseState == true)
                    {
                        dbTrans.Commit();
                        //master.TrNo = int.Parse(res.ResponseData.ToString());
                        result.ResponseData = master.ActivityID;
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

        public ResponseResult MasterDetailsValidation(P_D_Activity Master, M_D_Activites Details, SessionRecord Session)
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
            var obj = JObjMasterManyDetails<P_D_Activity, M_D_Activites>(data);
            SessionRecord session = obj.Session;
            P_D_Activity master = obj.Master;
            M_D_Activites details = obj.Details;
            result = MasterDetailsValidation(master, details, session);
            if (result.ResponseState == false)
            {
                return result;
            }

            obj = JObjMasterManyDetails<P_D_Activity, M_D_Activites>(result.ResponseData as JObject);
            session = obj.Session;
            master = obj.Master;
            details = obj.Details;

            //Start Details
            List<P_D_ActivityEquipClass> ActivityEquipClass = details.P_D_ActivityEquipClass;
            List<P_D_ActivityIMaterial> ActivityIMaterial = details.P_D_ActivityIMaterial;
            List<P_D_ActivityLaborClass> ActivityLaborClass = details.P_D_ActivityLaborClass;
            //End Details

            using (var dbTrans = db.Database.BeginTransaction())
            {
                try
                {
                    //Deleting The Details
                    db.P_D_ActivityEquipClass.RemoveRange(db.P_D_ActivityEquipClass.Where(f => f.ActivityID == master.ActivityID));

                    db.P_D_Activity.Attach(master);
                    db.Entry(master).State = System.Data.Entity.EntityState.Modified;
                    db.SaveChanges();

                    foreach (P_D_ActivityEquipClass item in ActivityEquipClass)
                    {
                        item.ActivityID = master.ActivityID;
                    }
                    db.P_D_ActivityEquipClass.AddRange(ActivityEquipClass);
                    db.SaveChanges();


                    db.P_D_ActivityIMaterial.RemoveRange(db.P_D_ActivityIMaterial.Where(f => f.ActivityID == master.ActivityID));
                    foreach (P_D_ActivityIMaterial item in ActivityIMaterial)
                    {
                        item.ActivityID = master.ActivityID;
                    }
                    db.P_D_ActivityIMaterial.AddRange(ActivityIMaterial);
                    db.SaveChanges();


                    db.P_D_ActivityLaborClass.RemoveRange(db.P_D_ActivityLaborClass.Where(f => f.ActivityID == master.ActivityID));
                    foreach (P_D_ActivityLaborClass item in ActivityLaborClass)
                    {
                        item.ActivityID = master.ActivityID;
                    }
                    db.P_D_ActivityLaborClass.AddRange(ActivityLaborClass);
                    db.SaveChanges();

                    ResponseResult res = Shared.InvTransactionProcess(session, master.ActivityID, "Act", db);
                    if (res.ResponseState == true)
                    {
                        dbTrans.Commit();
                        //master.TrNo = int.Parse(res.ResponseData.ToString());
                        result.ResponseData = master.ActivityID;
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
