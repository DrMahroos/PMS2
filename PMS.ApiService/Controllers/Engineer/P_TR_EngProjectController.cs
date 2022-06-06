using PMS.ApiService.Tools;
using PMS.ApiService.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Newtonsoft.Json.Linq;
using System.Data.Entity.Core.Objects;
using PMS.ApiService.Models.CustomEntities;
using Newtonsoft.Json;

namespace PMS.ApiService.Controllers.Engineer
{
    public class P_TR_EngProjectController : BaseController, IMasterDetailsController<P_TR_EngProject, P_TR_EngProjectPhase>
    {
        [HttpGet]
        public object SelectEntity(string SqlStatement)
        {
            var result = this.Get<P_TR_EngProject>(SqlStatement);
            return result.ToList();
        }
        public ResponseResult UpdateMasterDetails(JObject data)
        {
            ResponseResult result = new ResponseResult();
            var obj = JObjMasterDetails<P_TR_EngProject, P_TR_EngProjectPhase>(data);
            SessionRecord session = obj.Session;
            P_TR_EngProject master = obj.Master;
            //List<P_TR_EngProjectPhase> details = obj.Details.ToList();
            //result = MasterDetailsValidation(master, details, session);
            //if (result.ResponseState == false)
            //    return result;
            //obj = JObjMasterDetails<P_TR_EngProject, P_TR_EngProjectPhase>(result.ResponseData as JObject);
            //session = obj.Session;
            //master = obj.Master;
            //details = obj.Details.ToList();
            using (var dbTrans = db.Database.BeginTransaction())
            {
                try
                {
                    db.P_TR_EngProject.Attach(master);
                    db.Entry(master).State = System.Data.Entity.EntityState.Modified;
                    db.SaveChanges();

                    //foreach (var item in details)
                    //{
                    //    if (item.ProjectPhaseId == 0)
                    //    {
                    //        item.Status = 0;
                    //        db.P_TR_EngProjectPhase.Add(item);
                    //        //db.Entry(master).State = System.Data.Entity.EntityState.Added;
                    //        db.SaveChanges();
                    //    }
                    //    else
                    //    {
                    //        db.P_TR_EngProjectPhase.Attach(item);
                    //        //db.Entry(item).State = System.Data.Entity.EntityState.Modified;
                    //        db.SaveChanges();
                    //    }
                    //}


                    ResponseResult res = Shared.InvTransactionProcess(session, master.ProjectID, "ProjDef", db);
                    if (res.ResponseState == true)
                    {
                        dbTrans.Commit();
                        result.ResponseData = master.ProjectID;
                        result.ResponseState = true;
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
        public ResponseResult UpdateMasterPlan(JObject data)
        {
            ResponseResult result = new ResponseResult();
            var obj = JObjMasterManyDetails<P_TR_EngProject, M_D_ProjectDefDetails>(data);
            SessionRecord session = obj.Session;
            P_TR_EngProject master = obj.Master;
            M_D_ProjectDefDetails details = obj.Details;
            result.ResponseState = true;// MasterDetailsValidation(master, details, session);
            if (result.ResponseState == false)
            {
                return result;
            }

            //obj = JObjMasterManyDetails<P_TR_EngProject, M_D_ProjectDefDetails>(result.ResponseData as JObject);
            //session = obj.Session;
            master = obj.Master;
            details = obj.Details;
            master.UpdatedAt = DateTime.Now;
            //master.UpdatedBy = session.UserCode;

            //Start Details
            List<P_TR_EngProjectPhase> EngProjectPhase = details.P_TR_EngProjectPhase;
            List<P_TR_EngProjectItem> EngProjectItem = details.P_TR_EngProjectItem;
            List<P_TR_EngProjectActivity> EngProjectActivity = details.P_TR_EngProjectActivity;
            //End Details

            using (var dbTrans = db.Database.BeginTransaction())
            {
                try
                {
                    foreach (var phase in EngProjectPhase)
                    {
                        db.P_TR_EngProjectPhase.Attach(phase);
                        //db.Entry(phase).State = System.Data.Entity.EntityState.Modified;
                        db.SaveChanges();
                    }


                    foreach (var item in EngProjectItem)
                    {
                        db.P_TR_EngProjectItem.Attach(item);
                        //db.Entry(item).State = System.Data.Entity.EntityState.Modified;
                    }
                    db.SaveChanges();

                    foreach (var act in EngProjectActivity)
                    {
                        db.P_TR_EngProjectActivity.Attach(act);
                        //db.Entry(act).State = System.Data.Entity.EntityState.Modified;
                    }
                    db.SaveChanges();

                    ResponseResult res = Shared.InvTransactionProcess(session, master.ProjectID, "ProjDef", db);
                    if (res.ResponseState == true)
                    {
                        dbTrans.Commit();
                        //master.ProjectID = int.Parse(res.ResponseData.ToString());
                        result.ResponseData = master.ProjectID;
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
        public ResponseResult MasterDetailsValidation(P_TR_EngProject Master, IEnumerable<P_TR_EngProjectPhase> Details, SessionRecord Session)
        {
            ResponseResult result = new ResponseResult();
            try
            {
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
        [HttpGet]
        public string MonthCalcDuration(string From, string To, string CalcId)
        {
            int newCalcID = int.Parse(CalcId);
            ObjectParameter op = new ObjectParameter("WorkHours", typeof(double));
            db.PProc_CalcWorkHours(From, To, newCalcID, op);
            return op.Value.ToString();

        }
        public ResponseResult InsertMasterDetails(JObject data)
        {
            throw new NotImplementedException();
        }
        //new api
        [HttpGet, AllowAnonymous]
        public IHttpActionResult GetSiteEngineer(int comCode, int BraCode)
        {
            ProjectDefinationTemp temp = new ProjectDefinationTemp();
            temp.P_D_SiteEngineer = db.P_D_SiteEngineer.Where(eng => eng.CompCode == comCode && eng.BraCode == BraCode && eng.IsActive == true).ToList();
            temp.P_D_Scope = db.P_D_Scope.ToList();
            temp.P_D_Calender = db.P_D_Calender.Where(c => c.CompCode == comCode).ToList();
            return Ok(new BaseResponse(temp));
        }
        [HttpGet, AllowAnonymous]
        public IHttpActionResult LoadDetails(int id)
        {
            if (ModelState.IsValid)
            {
                M_D_ProjectDefDetailsView _View = new M_D_ProjectDefDetailsView();
                _View.PQ_GetEngProjectPhase = db.PQ_GetEngProjectPhase.Where(x => x.ProjectID == id).OrderBy(x => !string.IsNullOrEmpty(x.ProjectPhaseCode)).ToList();
                _View.PQ_GetEngProjectItem = db.PQ_GetEngProjectItem.Where(i => i.ProjectID == id).ToList();
                return Ok(new BaseResponse(_View));
            }
            return BadRequest();
        }

        [HttpPost, AllowAnonymous]
        public IHttpActionResult UpdatePhase([FromBody]P_TR_EngProjectPhase data)
        {
            if (data.ProjectPhaseId > 0)
            {
                db.P_TR_EngProjectPhase.Attach(data);
                db.Entry(data).State = System.Data.Entity.EntityState.Modified;
            }
            else
            {
                db.P_TR_EngProjectPhase.Add(data);
            }
            db.SaveChanges();
            return Ok();
        }
        [HttpPost, AllowAnonymous]
        public IHttpActionResult Delete([FromBody]int data)
        {  
            using (var dbTrans = db.Database.BeginTransaction())
            {
                try
                { 
                    var  Act =   db.P_TR_EngProjectActivity.Where(x => x.ProjectID == data).ToList();
                    db.P_TR_EngProjectActivity.RemoveRange(Act);
                    db.SaveChanges();
                    var it = db.P_TR_EngProjectItem.Where(x => x.ProjectID == data).ToList();
                    db.P_TR_EngProjectItem.RemoveRange(it);
                    db.SaveChanges();
                    var ph = db.P_TR_EngProjectPhase.Where(x => x.ProjectID == data).ToList();
                    db.P_TR_EngProjectPhase.RemoveRange(ph);
                    db.SaveChanges();
                    var p = db.P_TR_EngProject.Where(x => x.ProjectID == data).ToList();
                    db.P_TR_EngProject.RemoveRange(p);
            
                    db.SaveChanges();
            
                  
                    dbTrans.Commit();
                    return Ok(new BaseResponse(true));

                }
                catch (Exception ex)
                {
                    dbTrans.Rollback();

                    return  Ok(new BaseResponse(false));
                }
                 
            }
        }
        [HttpPost, AllowAnonymous]
        public IHttpActionResult DeletePhase([FromBody]P_TR_EngProjectPhase data)
        {
            var phase = db.P_TR_EngProjectPhase.FirstOrDefault(p => p.ProjectPhaseId == data.ProjectPhaseId);
            db.P_TR_EngProjectPhase.Remove(phase);
            db.SaveChanges();
            return Ok(new BaseResponse());
        }
        [HttpGet, AllowAnonymous]
        public IHttpActionResult LoadPhases(int id)
        {
            if (ModelState.IsValid)
            {
                M_D_ProjectDefDetailsView _View = new M_D_ProjectDefDetailsView();
                _View.PQ_GetEngProjectPhase = db.PQ_GetEngProjectPhase.Where(x => x.ProjectID == id).OrderBy(x => x.ProjectPhaseCode).ToList();
                return Ok(new BaseResponse(_View));
            }
            return BadRequest();
        }
    }
}
