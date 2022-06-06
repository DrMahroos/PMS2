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
    public class P_TR_SalesInvoiceController : BaseController, IMasterDetailsoBJController<P_TR_SalesInvoice, M_D_CustomerBilling>
    {
        [HttpGet]
        public object SelectEntity(string SqlStatement)
        {
            var result = this.Get<P_TR_SalesInvoice>(SqlStatement);
            return result.ToList();
        }

        public ResponseResult InsertMasterDetails(JObject data)
        {
            ResponseResult result = new ResponseResult();
            var obj1 = JObjMasterManyDetails<P_TR_SalesInvoice, M_D_CustomerBilling>(data);

            var obj = JObjMasterManyDetails<P_TR_SalesInvoice, M_D_CustomerBilling>(data);
            SessionRecord session = obj1.Session;
            P_TR_SalesInvoice master = obj1.Master;
            M_D_CustomerBilling details = obj1.Details;
            result = MasterDetailsValidation(master, details, session);
            if (result.ResponseState == false)
                return result;
            obj = JObjMasterManyDetails<P_TR_SalesInvoice, M_D_CustomerBilling>(result.ResponseData as JObject);
            session = obj.Session;
            master = obj.Master;
            details = obj.Details;
            master.CreatedAt = DateTime.Now;
            master.CreatedBy = session.UserCode;
            //Start Details
            List<P_TR_SalesInvoiceDetail> SalesInvoiceDetail = details.P_TR_SalesInvoiceDetail;
            //List<P_TR_SalesInvoiceProd> SalesInvoiceProd = details.P_TR_SalesInvoiceProd;
            //List<P_TR_SalesProduction> SalesProduction = details.P_TR_SalesProduction;
            //End Details

            using (var dbTrans = db.Database.BeginTransaction())
            {
                try
                {
                    db.P_TR_SalesInvoice.Add(master);
                    var _Res = db.SaveChanges();
                    //db.Database.ExecuteSqlCommand("execute PProc_Sales_FillInvoiceProd '" + master.InvoiceId + "','" + master.ProjectID + "'");
                    if (_Res > 0)
                    {
                        //foreach (P_TR_SalesInvoiceDetail item in SalesInvoiceDetail)
                        //{
                        //    item.InvoiceId = master.InvoiceId;
                        //}
                        //db.P_TR_SalesInvoiceDetail.AddRange(SalesInvoiceDetail);
                        //db.SaveChanges();

                        //foreach (P_TR_SalesInvoiceProd item in SalesInvoiceProd)
                        //{
                        //    item.InvoiceId = master.InvoiceId;
                        //}
                        //db.P_TR_SalesInvoiceProd.AddRange(SalesInvoiceProd);
                        db.SaveChanges();

                        db.Database.ExecuteSqlCommand("execute PProc_Sales_FillInvoiceDetail '" + master.InvoiceId + "'");
                        //foreach (P_TR_SalesProduction item in SalesProduction)
                        //{
                        //    item.CustomerID = master.CustomerID;
                        //}
                        //db.P_TR_SalesProduction.AddRange(SalesProduction);
                        //db.SaveChanges();
                    }

                    ResponseResult res = Shared.InvTransactionProcess(session, master.InvoiceId, "CusBill", db);
                    if (res.ResponseState == true)
                    {
                        dbTrans.Commit();
                        //master.TrNo = int.Parse(res.ResponseData.ToString());
                        result.ResponseData = master.InvoiceId;
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
            var obj = JObjMasterManyDetails<P_TR_SalesInvoice, M_D_CustomerBilling>(data);
            SessionRecord session = obj.Session;
            P_TR_SalesInvoice master = obj.Master;
            M_D_CustomerBilling details = obj.Details;
            result = MasterDetailsValidation(master, details, session);
            if (result.ResponseState == false)
            {
                return result;
            }

            obj = JObjMasterManyDetails<P_TR_SalesInvoice, M_D_CustomerBilling>(result.ResponseData as JObject);
            session = obj.Session;
            master = obj.Master;
            details = obj.Details;
            master.UpdatedAt = DateTime.Now;
            master.UpdatedBy = session.UserCode;
            //Start Details         
            List<P_TR_SalesInvoiceDetail> SalesInvoiceDetail = details.P_TR_SalesInvoiceDetail;
            //List<P_TR_SalesInvoiceProd> SalesInvoiceProd = details.P_TR_SalesInvoiceProd;
            //List<P_TR_SalesProduction> SalesProduction = details.P_TR_SalesProduction;
            //End Details

            using (var dbTrans = db.Database.BeginTransaction())
            {
                try
                {
                    //Deleting The Details

                    db.P_TR_SalesInvoice.Attach(master);
                    db.Entry(master).State = System.Data.Entity.EntityState.Modified;
                    db.SaveChanges();

                    //db.P_TR_SalesInvoiceDetail.RemoveRange(db.P_TR_SalesInvoiceDetail.Where(f => f.InvoiceId == master.InvoiceId));
                    //foreach (P_TR_SalesInvoiceDetail item in SalesInvoiceDetail)
                    //{
                    //    item.InvoiceId = master.InvoiceId;
                    //}
                    //db.P_TR_SalesInvoiceDetail.AddRange(SalesInvoiceDetail);
                    //db.SaveChanges();

                    //db.P_TR_SalesInvoiceProd.RemoveRange(db.P_TR_SalesInvoiceProd.Where(f => f.InvoiceId == master.InvoiceId));
                    //foreach (P_TR_SalesInvoiceProd item in SalesInvoiceProd)
                    //{
                    //    item.InvoiceId = master.InvoiceId;
                    //}
                    //db.P_TR_SalesInvoiceProd.AddRange(SalesInvoiceProd);
                    //db.SaveChanges();

                    db.Database.ExecuteSqlCommand("execute PProc_Sales_FillInvoiceDetail '" + master.InvoiceId + "'");
                    //db.P_TR_SalesProduction.RemoveRange(db.P_TR_SalesProduction.Where(f => f.ProductionId == master.InvoiceId));
                    //foreach (P_TR_SalesProduction item in SalesProduction)
                    //{
                    //    item.ProductionId = master.InvoiceId;
                    //}
                    //db.P_TR_SalesProduction.AddRange(SalesProduction);
                    //db.SaveChanges();

                    ResponseResult res = Shared.InvTransactionProcess(session, master.InvoiceId, "CusBill", db);
                    if (res.ResponseState == true)
                    {
                        dbTrans.Commit();

                        //master.TrNo = int.Parse(res.ResponseData.ToString());
                        result.ResponseData = master.InvoiceId;
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


        public ResponseResult MasterDetailsValidation(P_TR_SalesInvoice Master, M_D_CustomerBilling Details, SessionRecord Session)
        {
            ResponseResult result = new ResponseResult();
            var obj = new
            {
                Master = Master,
                Details = Details,
                Session = Session
            };

            result.ResponseData = JObject.FromObject(obj);
            result.ResponseState = true;
            return result;
        }

        [HttpGet]
        public void LoadProdution(int invId, int projId)
        {
            db.Database.ExecuteSqlCommand("execute PProc_Sales_FillInvoiceProd '" + invId + "','" + projId + "'");
            //db.Database.SqlQuery<PProc_EngLoadProductionActivity_Result>("exec PProc_EngLoadProductionLabor @TrID", new SqlParameter("@TrID", id)).ToList().ToJsonString();
            //return res;
        }
         

        [HttpGet]
        public void Authorize(int invId)
        {
            var res = db.P_TR_SalesInvoiceProd.Where(s => s.InvQty == 0 && s.InvoiceId == invId).ToList();
            db.P_TR_SalesInvoiceProd.RemoveRange(res);
            db.SaveChanges();
        }
        [HttpGet]
        public void UnAuthorize(int invId)
        {
            db.Database.ExecuteSqlCommand("execute PProc_Sales_InvoiceUnAuthorize " + invId );

           
        }

        [HttpPost, AllowAnonymous]
        public IHttpActionResult UpdateMasterDetail([FromBody]M_D_CustomerBilling data)
        {
            BaseResponse result = new BaseResponse();

            using (var dbTrans = db.Database.BeginTransaction())
            {
                try
                {
                    SessionRecord session = data.sessionRecord;
                    P_TR_SalesInvoice master = data.P_TR_SalesInvoice;
                    List<P_TR_SalesInvoiceDetail> SalesInvoiceDetail = data.P_TR_SalesInvoiceDetail;
                    if (master.Status == 1)
                    {
                         
                        string NM = db.Database.SqlQuery<string>("select NAMEA  FROM G_COMPANY  where COMP_CODE =  " + master.CompCode ).FirstOrDefault();
                        NM = Security.StringEncryptor.Decrypt(NM);
                        string vt = db.Database.SqlQuery<string>("select VatNo from G_BRANCH  where COMP_CODE =  " + master.CompCode + "  AND BRA_CODE = " + master.BraCode).FirstOrDefault();

                        var tstamp = DateTime.Now;

                        QrModel QrRec = new QrModel();
                        QrRec.CompName = NM;
                        QrRec.VatNo =  vt;
                        QrRec.Total = master.TaxableAmount;
                        QrRec.Vat = master.NetTax;
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

                    db.P_TR_SalesInvoice.Attach(master);
                    db.Entry(master).State = System.Data.Entity.EntityState.Modified;
                    db.SaveChanges();

                    foreach (P_TR_SalesInvoiceDetail item in SalesInvoiceDetail)
                    {
                        if (item.InvoiceDetailId > 0)
                        {
                            db.P_TR_SalesInvoiceDetail.Attach(item);
                            db.Entry(item).State = System.Data.Entity.EntityState.Modified;
                        }
                        else
                        {
                            item.InvoiceId = master.InvoiceId;
                            db.P_TR_SalesInvoiceDetail.Add(item);
                        }
                    }
                    //Deleting The Details
                    int i;
                    var _ItemsOld = db.P_TR_SalesInvoiceDetail.Where(x => x.InvoiceId == master.InvoiceId).ToList();
                    foreach (P_TR_SalesInvoiceDetail item in _ItemsOld)
                    {
                        i = SalesInvoiceDetail.Where(n => n.InvoiceDetailId == item.InvoiceDetailId).Count();
                        if (i == 0)
                        {
                            db.P_TR_SalesInvoiceDetail.Remove(item);
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
        public IHttpActionResult InsertMasterDetail([FromBody]M_D_CustomerBilling data)
        {
            BaseResponse result = new BaseResponse();
            using (var dbTrans = db.Database.BeginTransaction())
            {
                try
                {
                    SessionRecord session = data.sessionRecord;
                    P_TR_SalesInvoice master = data.P_TR_SalesInvoice;
                    List<P_TR_SalesInvoiceDetail> SalesInvoiceDetail = data.P_TR_SalesInvoiceDetail;
                    if (master.Status == 1)
                    {
                        string NM = db.Database.SqlQuery<string>("select NAMEA  FROM G_COMPANY  where COMP_CODE =  " + master.CompCode).FirstOrDefault();
                        NM = Security.StringEncryptor.Decrypt(NM);
                        string vt = db.Database.SqlQuery<string>("select VatNo from G_BRANCH  where COMP_CODE =  " + master.CompCode + "  AND BRA_CODE = " + master.BraCode).FirstOrDefault();

                        var tstamp = DateTime.Now;

                        QrModel QrRec = new QrModel();
                        QrRec.CompName = session.BranchNameAr;
                        QrRec.VatNo = vt;
                        QrRec.Total = master.TaxableAmount;
                        QrRec.Vat = master.NetTax;
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
                   
                    db.P_TR_SalesInvoice.Add(master);
                    var _Res = db.SaveChanges();
                     if (_Res > 0)
                    {
                        foreach (P_TR_SalesInvoiceDetail item in SalesInvoiceDetail)
                        {
                            item.InvoiceId = master.InvoiceId;
                        }
                        db.P_TR_SalesInvoiceDetail.AddRange(SalesInvoiceDetail);
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
        public string Proc_prnt_sls_invoice(int id /*,int CompCode,int LoginUser*/)
        {
            //ResponseResult res = new ResponseResult(); ok
            string res = db.Database.SqlQuery<PProc_Prnt_sls_Invoice_Result>("EXEC	[dbo].[PProc_Prnt_sls_Invoice] 	@comp = 1,@CompNameA = NULL,@CompNameE = NULL,@BraNameA = NULL,@BraNameE = NULL,@LoginUser = 'safe',@TrID = '" + id.ToString() + "'").ToList().ToJsonString();
            //string res = db.Database.SqlQuery<PProc_Prnt_sls_Invoice_Result>("EXEC	[dbo].[PProc_Prnt_sls_Invoice] 	@comp = '" + CompCode.ToString() + "',@CompNameA = NULL,@CompNameE = NULL,@BraNameA = NULL,@BraNameE = NULL,@LoginUser = '" + LoginUser.ToString() + "' safe',@TrID = '" + id.ToString() + "'").ToList().ToJsonString();
            //string _JsonResult= JsonConvert.SerializeObject(res);
            return res;
        }


        public ResponseResult MasterDetailssDbCrValidation(P_TR_SalesDbCr Master, M_D_CustomerDbCr Details, SessionRecord Session)
        {
            ResponseResult result = new ResponseResult();
            var obj = new
            {
                Master = Master,
                Details = Details,
                Session = Session
            };

            result.ResponseData = JObject.FromObject(obj);
            result.ResponseState = true;
            return result;
        }


        [HttpPost, AllowAnonymous]
        public IHttpActionResult InsertMasterDetailSalesDbCr([FromBody]M_D_CustomerDbCr data)
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
                        QrRec.Total = master.VatPrc;
                        QrRec.Vat = master.VatAmount;
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

                    ResponseResult res = Shared.InvTransactionProcess(session, master.InvoiceId, "CusDbCr", db);
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

        [HttpPost, AllowAnonymous]
        public IHttpActionResult UpdateMasterDetailSalesDbCr([FromBody]M_D_CustomerDbCr data)
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
                        QrRec.CompName = NM;
                        QrRec.VatNo = vt;
                        QrRec.Total = master.TotalAmount;
                        QrRec.Vat = master.VatAmount;
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

                    ResponseResult res = Shared.InvTransactionProcess(session, master.InvoiceId, "CusDbCr", db);
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

    }
}


