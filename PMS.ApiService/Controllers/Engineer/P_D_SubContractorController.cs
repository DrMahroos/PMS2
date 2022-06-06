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

namespace PMS.ApiService.Controllers.Engineer
{
    public class P_D_SubContractorController : BaseController, IMasterDetailsController<P_D_SubContractor, P_D_SubContractorScope>
    {
        public ResponseResult InsertMasterDetails(JObject data)
        {
            throw new NotImplementedException();
        }

        public ResponseResult MasterDetailsValidation(P_D_SubContractor Master, IEnumerable<P_D_SubContractorScope> Details, SessionRecord Session)
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

        [HttpGet]
        public object SelectEntity(string SqlStatement)
        {
            var result = this.Get<P_D_SubContractor>(SqlStatement);
            return result.ToList();
        }

        public ResponseResult UpdateMasterDetails(JObject data)
        {
            {
                ResponseResult result = new ResponseResult();
                var obj = JObjMasterDetails<P_D_SubContractor, P_D_SubContractorScope>(data);
                SessionRecord session = obj.Session;
                P_D_SubContractor master = obj.Master;
                List<P_D_SubContractorScope> details = obj.Details.ToList();
                result = MasterDetailsValidation(master, details, session);
                if (result.ResponseState == false)
                {
                    return result;
                }
                obj = JObjMasterDetails<P_D_SubContractor, P_D_SubContractorScope>(result.ResponseData as JObject);
                session = obj.Session;
                master = obj.Master;
                details = obj.Details.ToList();

                using (var dbTrans = db.Database.BeginTransaction())
                {
                    try
                    {
                        //Deleting The Details
                        db.P_D_SubContractorScope.RemoveRange(db.P_D_SubContractorScope.Where(f => f.SubContractorID == master.SubContractorID));


                        db.P_D_SubContractor.Attach(master);
                        db.Entry(master).State = System.Data.Entity.EntityState.Modified;
                        db.SaveChanges();

                       
                        foreach (P_D_SubContractorScope item in details)
                        {
                            item.SubContractorID = master.SubContractorID;
                        }
                        db.P_D_SubContractorScope.AddRange(details);
                        db.SaveChanges();

                        ResponseResult res = Shared.InvTransactionProcess(session, master.SubContractorID, "ScPreq", db);
                        if (res.ResponseState == true)
                        {

                            dbTrans.Commit();
                            //master.TrNo = int.Parse(res.ResponseData.ToString());
                            result.ResponseData = master.SubContractorID;
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
}
