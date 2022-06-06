using Newtonsoft.Json.Linq;
using PMS.ApiService.Models;
using PMS.ApiService.Models.CustomEntities;
using PMS.ApiService.Tools;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace PMS.ApiService.Controllers.Sales
{
    public class P_TR_SalesDbCrController : BaseController
    {
        [HttpGet]
        public object SelectEntity(string SqlStatement)
        {
            var result = this.Get<P_TR_SalesDbCr>(SqlStatement);
            return result.ToList();
        }

      
     
        [HttpGet]
        public void LoadProdution(int invId, int projId)
        {
            db.Database.ExecuteSqlCommand("execute PProc_Sales_FillDbCrProd '" + invId + "','" + projId + "'");
            //db.Database.SqlQuery<PProc_EngLoadProductionActivity_Result>("exec PProc_EngLoadProductionLabor @TrID", new SqlParameter("@TrID", id)).ToList().ToJsonString();
            //return res;
        }
         

       
        [HttpGet]
        public void UnAuthorize(int invId)
        {
            db.Database.ExecuteSqlCommand("execute PProc_Sales_DbCrUnAuthorize " + invId );

           
        }

        [HttpPost, AllowAnonymous]
        public IHttpActionResult UpdateMasterDetail([FromBody]M_D_CustomerDbCr data)
        {
            BaseResponse result = new BaseResponse();

            using (var dbTrans = db.Database.BeginTransaction())
            {
                try
                {
                    SessionRecord session = data.sessionRecord;
                    P_TR_SalesDbCr master = data.P_TR_SalesDbCr;
                    List<P_TR_SalesDbCrDetail> SalesDbCrDetail = data.P_TR_SalesDbCrDetail;
                    if (master.Status == 1)
                    {
                         
                        string NM = db.Database.SqlQuery<string>("select NAMEA  FROM G_COMPANY  where COMP_CODE =  " + master.CompCode ).FirstOrDefault();
                        NM = Security.StringEncryptor.Decrypt(NM);
                        string vt = db.Database.SqlQuery<string>("select VatNo from G_BRANCH  where COMP_CODE =  " + master.CompCode + "  AND BRA_CODE = " + master.BraCode).FirstOrDefault();

                        var tstamp = DateTime.Now;

                        QrModel QrRec = new QrModel();
                        QrRec.CompName = NM;
                        QrRec.VatNo =  vt;
                        QrRec.Total = master.NetAmount<0? -master.NetAmount: master.NetAmount;
                        QrRec.Vat = master.VatAmount<0? -master.VatAmount: master.VatAmount;
                        QrRec.TrDate = tstamp;




                        string QrCode = QRGeneratorController.QrGenerator(QrRec);

                        string st = SystemToolsController.GenerateGuid();
                        master.DocUUID = st;
                        master.QRCode = QrCode;
                        master.TrDate = tstamp.Date;
                        master.CreatedAt = tstamp;
                        master.TrTime = tstamp.TimeOfDay;
                    }

                    master.UpdatedBy = session.UserCode;
                    master.UpdatedAt = DateTime.Now;
                    //Deleting The Details

                    db.P_TR_SalesDbCr.Attach(master);
                    db.Entry(master).State = System.Data.Entity.EntityState.Modified;
                    db.SaveChanges();

                    foreach (P_TR_SalesDbCrDetail item in SalesDbCrDetail)
                    {
                        if (item.InvoiceDetailId > 0)
                        {
                            db.P_TR_SalesDbCrDetail.Attach(item);
                            db.Entry(item).State = System.Data.Entity.EntityState.Modified;
                        }
                        else
                        {
                            item.InvoiceId = master.InvoiceId;
                            db.P_TR_SalesDbCrDetail.Add(item);
                        }
                    }
                    //Deleting The Details
                    int i;
                    var _ItemsOld = db.P_TR_SalesDbCrDetail.Where(x => x.InvoiceId == master.InvoiceId).ToList();
                    foreach (P_TR_SalesDbCrDetail item in _ItemsOld)
                    {
                        i = SalesDbCrDetail.Where(n => n.InvoiceDetailId == item.InvoiceDetailId).Count();
                        if (i == 0)
                        {
                            db.P_TR_SalesDbCrDetail.Remove(item);
                        }
                    }
                    db.SaveChanges();

                    ResponseResult res = Shared.InvTransactionProcess(session, master.InvoiceId, "CusBill", db);
                    if (res.ResponseState == true)
                    {
                        dbTrans.Commit();
                        //master.TrNo = int.Parse(res.ResponseData.ToString());
                        result.IsSuccess = true;
                        result.Response = master.InvoiceId;
                    }
                    else
                    {
                        result.Response = res.ResponseMessage;
                        result.IsSuccess = false;
                        dbTrans.Rollback();
                    }
                }
                catch (Exception ex)
                {
                    dbTrans.Rollback();
                    result.Response = ex.Message;
                    result.IsSuccess = false;
                }
            }
            return Ok(result);
        }

        [HttpPost, AllowAnonymous]
        public IHttpActionResult InsertMasterDetail([FromBody]M_D_CustomerDbCr data)
        {
            BaseResponse result = new BaseResponse();
            using (var dbTrans = db.Database.BeginTransaction())
            {
                try
                {
                    SessionRecord session = data.sessionRecord;
                    P_TR_SalesDbCr master = data.P_TR_SalesDbCr;
                    List<P_TR_SalesDbCrDetail> SalesDbCrDetail = data.P_TR_SalesDbCrDetail;
                    if (master.Status == 1)
                    {
                        string NM = db.Database.SqlQuery<string>("select NAMEA  FROM G_COMPANY  where COMP_CODE =  " + master.CompCode).FirstOrDefault();
                        NM = Security.StringEncryptor.Decrypt(NM);
                        string vt = db.Database.SqlQuery<string>("select VatNo from G_BRANCH  where COMP_CODE =  " + master.CompCode + "  AND BRA_CODE = " + master.BraCode).FirstOrDefault();

                        var tstamp = DateTime.Now;

                        QrModel QrRec = new QrModel();
                        QrRec.CompName = session.BranchNameAr;
                        QrRec.VatNo = vt;
                        QrRec.Total = master.NetAmount < 0 ? -master.NetAmount : master.NetAmount;
                        QrRec.Vat = master.VatAmount < 0 ? -master.VatAmount : master.VatAmount;
                        QrRec.TrDate = tstamp;




                        string QrCode = QRGeneratorController.QrGenerator(QrRec);

                        string st = SystemToolsController.GenerateGuid();
                        master.DocUUID = st;
                        master.QRCode = QrCode;
                        master.TrDate = tstamp.Date;
                        master.CreatedAt = tstamp;
                        master.TrTime = tstamp.TimeOfDay;
                    }
                    master.CreatedBy = session.UserCode;
                   
                    db.P_TR_SalesDbCr.Add(master);
                    var _Res = db.SaveChanges();
                     if (_Res > 0)
                    {
                        foreach (P_TR_SalesDbCrDetail item in SalesDbCrDetail)
                        {
                            item.InvoiceId = master.InvoiceId;
                        }
                        db.P_TR_SalesDbCrDetail.AddRange(SalesDbCrDetail);
                        db.SaveChanges();

                     }

                    ResponseResult res = Shared.InvTransactionProcess(session, master.InvoiceId, "CusBill", db);
                    if (res.ResponseState == true)
                    {
                        dbTrans.Commit();
                        //master.TrNo = int.Parse(res.ResponseData.ToString());
                        result.Response = master.InvoiceId;
                        result.IsSuccess = true;
                    }
                    else
                    {
                        result.Response = res.ResponseMessage;
                        result.IsSuccess = false;
                        dbTrans.Rollback();
                    }

                }
                catch (Exception ex)
                {
                    dbTrans.Rollback();
                    result.Response = ex.Message;
                    result.IsSuccess = false;
                }
                return Ok(result);
            }
        }
        [HttpGet]
        public string Proc_prnt_sls_DbCr(int id /*,int CompCode,int LoginUser*/)
        {
            //ResponseResult res = new ResponseResult(); ok
            string res = db.Database.SqlQuery<PProc_Prnt_sls_DbCr_Result>("EXEC	[dbo].[PProc_Prnt_sls_DbCr] 	@comp = 1,@CompNameA = NULL,@CompNameE = NULL,@BraNameA = NULL,@BraNameE = NULL,@LoginUser = 'safe',@TrID = '" + id.ToString() + "'").ToList().ToJsonString();
            //string res = db.Database.SqlQuery<PProc_Prnt_sls_DbCr_Result>("EXEC	[dbo].[PProc_Prnt_sls_DbCr] 	@comp = '" + CompCode.ToString() + "',@CompNameA = NULL,@CompNameE = NULL,@BraNameA = NULL,@BraNameE = NULL,@LoginUser = '" + LoginUser.ToString() + "' safe',@TrID = '" + id.ToString() + "'").ToList().ToJsonString();
            //string _JsonResult= JsonConvert.SerializeObject(res);
            return res;
        }
    }
}


