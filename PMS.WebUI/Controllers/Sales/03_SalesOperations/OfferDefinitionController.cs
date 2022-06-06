using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using PMS.ServiceConnector.Models;
using PMS.ServiceConnector.Tools;
using PMS.WebUI.Filter;
using PMS.WebUI.Models.CustomModels;
using PMS.WebUI.Tools;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Web;
using System.Web.Mvc;
using Xceed.Words.NET;
using System.Diagnostics;
using System.Net;
using System.IO;

namespace PMS.WebUI.Controllers.Sales._03_SalesOperations
{
    [AuthorizeUserAttribute()]
    public class OfferDefinitionController : Controller, IMasterManyDetails<P_TR_SalesOffer>
    {
        // GET: ExpenseStatement
        DbEntities db = new DbEntities();
        int comCode = int.Parse(SessionManager.SessionRecord.CompCode);
        int BraCode = int.Parse(SessionManager.SessionRecord.BranchCode);
        public ActionResult OfferDefinitionIndex()
        {
            //Session["SOS1"] = new List<P_Tr_SalesOfferStage>();
            //TestDonload();
            SessionManager.PageIndex = 0;
            SessionManager.ModelCount = db.P_TR_SalesOffer.Where(x => x.CompCode == comCode && x.BraCode == BraCode).Count();
            return View(Path.OfferDefinition);
        }
        public JsonResult GetByIndex(int? index = default(int?))
        {
            var model = db.PQ_GetSalesOffer.Where(x => x.CompCode == comCode && x.BraCode == BraCode).ByIndex(SessionManager.PageIndex, "OfferID");
            return Shared.JsonObject(model);
        }
        public JsonResult Insert(string JsonData)
        {
            M_D_OfferDefDetails obj = JsonConvert.DeserializeObject<M_D_OfferDefDetails>(JsonData);
            //Set Company Code and branch code
            obj.P_TR_SalesOffer.CompCode = comCode;
            obj.P_TR_SalesOffer.BraCode = BraCode;
            obj.P_TR_SalesOffer.IsNewProject = true;
            //end Set Company Code and branch code
            var result = db.P_TR_SalesOffer.InsertMasterManyDetails(obj.P_TR_SalesOffer, obj);
            if (result.ResponseState == true)
            {
                SessionManager.ModelCount = db.PQ_GetSalesOffer.Where(x => x.CompCode == comCode && x.BraCode == BraCode).Count();
            }
            return Shared.JsonObject(result);
        }
        public JsonResult Update(string JsonData)
        {
            M_D_OfferDefDetails obj = JsonConvert.DeserializeObject<M_D_OfferDefDetails>(JsonData);
            obj.P_TR_SalesOffer.CompCode = comCode;
            obj.P_TR_SalesOffer.BraCode = BraCode;
            var result = db.P_TR_SalesOffer.UpdateMasterManyDetails(obj.P_TR_SalesOffer, obj);
            if (result.ResponseState == true)
                SessionManager.ModelCount = db.P_TR_SalesOffer.Where(x => x.CompCode == comCode && x.BraCode == BraCode).Count();

            return Shared.JsonObject(result);
        }
        public JsonResult Delete(P_TR_SalesOffer entity)
        {
            throw new NotImplementedException();
        }
        public JsonResult LoadDetailsAfterInsert(int id)
        {
            var res = db.PQ_GetSlsOfferStageItem.Where(x => x.OfferID == id).Result();
            return Json(res, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetMaxId()
        {
            var res = db.P_Tr_SalesOfferStageItem.Max();
            return Json(res, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetByID(int? id)
        {
            var model = db.P_TR_SalesOffer.Where(f => f.OfferID == id).First();
            return Shared.JsonObject(model);
        }
        public JsonResult GetNewOfferId(int id, int typ)
        {
            RestClient rest = new RestClient();
            Dictionary<string, string> DicList = new Dictionary<string, string>();
            DicList.Add("OfferId", id.ToString());
            DicList.Add("typ", typ.ToString());
            var _result = rest.Get<int>("P_TR_SalesOffer", "GetNewOfferId", DicList);
            SessionManager.ModelCount = db.P_TR_SalesOffer.Where(x => x.CompCode == comCode && x.BraCode == BraCode).Count();
            return Json(new { result = _result }, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetSalesOfferByCode(int Code)
        {
            var _Result = db.P_TR_SalesOffer.Where(o => o.TrNo == Code).First();
            return Shared.JsonObject(_Result);
        }
        public JsonResult Print(int id)
        {
            Reports rep = new Reports();
            rep.AddParameter("IssueToCcReturnID", id);
            string result = rep.GetReportUrl("IssueToCcReturn_Order");
            return Shared.JsonObject(result);
        }
        public JsonResult InsertCustomers(P_D_SalesCustomer entity)
        {
            entity.CustomerCode = GetCounter();
            var result = db.P_D_SalesCustomer.InsertEntity(entity);
            return Shared.JsonObject(result);
        }
        public int GetCounter()
        {
            RestClient rest = new RestClient();
            Dictionary<string, string> DicList = new Dictionary<string, string>();
            DicList.Add("comp", comCode.ToString());
            DicList.Add("branch", BraCode.ToString());
            ResponseResult Res = new ResponseResult();
            Res = rest.Get<ResponseResult>("P_TR_SalesOffer", "GetCounter", DicList);
            return int.Parse(Res.ResponseData.ToString());
        }
        //Start PobUp Functions
        public JsonResult GetStageItemByOffer(int OfferId)
        {
            var _Result = db.P_Tr_SalesOfferStageItem.Where(x => x.OfferID == OfferId).Result();
            return Json(new { result = _Result }, JsonRequestBehavior.AllowGet);
        }
        public ActionResult GetPartialStageItem(int OfferId, int StageItemId)
        {

            return PartialView("~/Views/Sales/03_SalesOperations/OfferDefinition/_OfferStageItem.cshtml");
        }
        public JsonResult GetOfferStageItemByOfferId(int OfferId, int StageItemId)
        {
            var _Result = db.PQ_GetSlsOfferStageItem.Where(x => x.OfferID == OfferId && x.OfferStageId == StageItemId).Result();
            return Json(new { result = _Result }, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetItemsByOfferId(int OfferId)
        {
            var _Result = db.PQ_GetSlsOfferStageItem.Where(x => x.OfferID == OfferId).Result();
            return Json(new { result = _Result }, JsonRequestBehavior.AllowGet);
        }
        public JsonResult GetItemsById(int id)
        {
            var obj = db.PQ_GetSalesItem.Where(i => i.ItemID == id).First();
            return Json(new { result = obj }, JsonRequestBehavior.AllowGet);
        }
        public JsonResult InsertStageItem(P_Tr_SalesOfferStageItem entity)
        {
            var _Result = db.P_Tr_SalesOfferStageItem.InsertEntity(entity);
            return Json(new { result = _Result }, JsonRequestBehavior.AllowGet);
        }
        public JsonResult UpdateStageItem(P_Tr_SalesOfferStageItem entity)
        {
            if (entity.OfferID == 0 || entity.OfferStageId == 0)
            {
                entity.OfferID = int.Parse(Session["txtOfferId"].ToString());
                entity.OfferStageId = int.Parse(Session["txtStageItemId"].ToString());
            }
            var _Result = db.P_Tr_SalesOfferStageItem.UpdateEntity(entity);
            return Json(new { result = _Result }, JsonRequestBehavior.AllowGet);
        }
        public JsonResult DeleteStageItem(P_Tr_SalesOfferStageItem entity)
        {
            var _Result = db.P_Tr_SalesOfferStageItem.DeleteEntity(entity);
            return Json(new { result = _Result }, JsonRequestBehavior.AllowGet);
        }
        //End PobUp Functions
        //
        public JsonResult GetLoctionById(int id)
        {
            var result = db.P_D_Location.Where(x => x.LocationId == id).First();
            return Shared.JsonObject(result);
        }
        public JsonResult PrintOffer(int OfferId)
        {
            /**
       //author:- Mohamed Elsayed,
       //Date:- 13-03-2019
       //Find the beginning of the right path is not easy
       **/
            //Get Offer and customers and file name
            string _Lang = SessionManager.SessionRecord.ScreenLanguage;
            string _FileName = _Lang == "ar" ? "OfferArabic" : "OfferEnglish";

            var _Master = db.PQ_GetSalesOffer.Where(off => off.OfferID == OfferId).First();
            var _Custmor = db.P_D_SalesCustomer.Where(c => c.CustomerID == _Master.CustomerID).First();
            var _Resp = db.PQ_GetSlsOfferResponsibility.Where(r => r.OfferID == _Master.OfferID).Result();
            var _Pay = db.PQ_GetSlsOfferPayment.Where(r => r.OfferID == _Master.OfferID).Result();
            Dictionary<string, string> DicList = new Dictionary<string, string>();
            var _newfile = _Lang == "ar" ? "OfferAr" : "OfferEn";
            _newfile = _newfile + _Master.TrNo.ToString() + "_" + _Master.TrSerial.ToString();

            //TempData["TrNo"] = _Master.TrNo.ToString() + "_" + _Master.TrSerial.ToString();
            //TempData["EnFile"] = "OfferEnglish";
            //TempData["ArFile"] = "OfferArabic";
            //Master Data
            DicList.Add("Area", _Master.ProjArea.ToString());
            DicList.Add("CustAdd", _Custmor.CustomerAddress);
            //DicList.Add("CustFax", _Custmor.Fax);
            //DicList.Add("CustMob", _Custmor.Mobile);
            DicList.Add("CustName", _Lang == "ar" ? _Custmor.DescA : _Custmor.DescE);
            DicList.Add("DescE", _Lang == "ar" ? _Master.DescA : _Master.DescL);
            DicList.Add("Price", _Master.ContractPrice.ToString());
            //DicList.Add("RefNo", _Master.RefCode);
            string _Date = !string.IsNullOrEmpty(_Master.TrDate.ToString()) ? DateTime.Parse(_Master.TrDate.ToString()).ToString("dd/MM/yyyy") : "";
            DicList.Add("TrDate", _Date);
            DicList.Add("TrNo", _Master.TrNo.ToString());
            DicList.Add("TrDate2", _Date);
            DicList.Add("TrNo2", _Master.TrNo.ToString());
            DicList.Add("ContactPerson", _Custmor.ContactPerson);
            DicList.Add("Waranteeperiod", _Master.ContractWarantyPrd);
            //Details Data
            //Responsibilty Customers
            StringBuilder _CustRespVal = new StringBuilder();
            int i; string st;
            i = 0;
            var _ListRespCust = _Resp.Where(rc => rc.IsCustomer == true);
            foreach (var item in _ListRespCust)
            {
                i++;
                if (_Lang == "ar")
                    st = " -" + i.ToString();
                else
                    st = i.ToString() + "- ";
                st += _Lang == "ar" ? item.Res_DescA : item.Res_DescE;
                _CustRespVal.Append(st);
                _CustRespVal.Append((char)13);
            }
            DicList.Add("CustomerResp", _CustRespVal.ToString());
            //Responsibilty Company
            StringBuilder _CompRespVal = new StringBuilder();
            i = 0;
            var _ListRespComp = _Resp.Where(rc => rc.IsCustomer == false);
            foreach (var item in _ListRespComp)
            {
                i++;
                if (_Lang == "ar")
                    st = " -" + i.ToString();
                else
                    st = i.ToString() + "- ";
                st += _Lang == "ar" ? item.Res_DescA : item.Res_DescE;
                _CompRespVal.Append(st);
                //_CompRespVal.Append(Convert.ToChar(13));
                _CompRespVal.Append(Environment.NewLine);
            }
            DicList.Add("CompRes", _CompRespVal.ToString());
            //Payment
            StringBuilder _PayVal = new StringBuilder();
            i = 0;
            foreach (var item in _Pay)
            {
                i++;
                if (_Lang == "ar")
                    st = " -" + i.ToString();
                else
                    st = i.ToString() + "- ";
                st += _Lang == "ar" ? item.Pay_DescA : item.Pay_DescE;
                _PayVal.Append(st);
                _PayVal.Append((char)13);
            }
            DicList.Add("Payment", _PayVal.ToString());

            ResponseResult Res = new ResponseResult();
            Res = CreateSampleDocument(_FileName, DicList, _newfile);
            Res.NewFile = _newfile;
            Res.OrgFile = _FileName;
            return Json(new { result = Res }, JsonRequestBehavior.AllowGet);

            #region OLd
            ///**
            ////author:- Mohamed Elsayed,
            ////Date:- 13-03-2019
            ////Find the beginning of the right path is not easy
            //**/
            ////Get Offer and customers and file name
            //string _Lang = SessionManager.SessionRecord.ScreenLanguage;
            //string _FileName = _Lang == "ar" ? "OfferArabic" : "OfferEnglish";

            //var _Master = db.PQ_GetSalesOffer.Where(off => off.OfferID == OfferId).First();
            //var _Custmor = db.P_D_SalesCustomer.Where(c => c.CustomerID == _Master.CustomerID).First();
            //var _Resp = db.PQ_GetSlsOfferResponsibility.Where(r => r.OfferID == _Master.OfferID).Result();
            //var _Pay = db.PQ_GetSlsOfferPayment.Where(r => r.OfferID == _Master.OfferID).Result();
            //string _newFile = _Lang == "ar" ? "OfferAr" + _Master.TrNo.ToString() : "OfferEn" + _Master.TrNo.ToString();
            //Dictionary<string, string> DicList = new Dictionary<string, string>();
            ////Master Data
            //DicList.Add("Area", _Master.ProjArea.ToString());
            //DicList.Add("CustAdd", _Custmor.CustomerAddress);
            //DicList.Add("CustFax", _Custmor.Fax);
            //DicList.Add("CustMob", _Custmor.Mobile);
            //DicList.Add("CustName", _Lang == "ar" ? _Custmor.DescA : _Custmor.DescE);
            //DicList.Add("DescE", _Lang == "ar" ? _Master.DescA : _Master.DescL);
            //DicList.Add("Price", _Master.ContractPrice.ToString());
            //DicList.Add("RefNo", _Master.RefCode);
            //string _Date = !string.IsNullOrEmpty(_Master.TrDate.ToString()) ? DateTime.Parse(_Master.TrDate.ToString()).ToString("dd/MM/yyyy") : "";
            //DicList.Add("TrDate", _Date);
            //DicList.Add("TrNo", _Master.TrNo.ToString());
            //DicList.Add("Waranteeperiod", _Master.ContractWarantyPrd);
            ////Details Data
            ////Responsibilty Customers
            //StringBuilder _CustRespVal = new StringBuilder();
            //var _ListRespCust = _Resp.Where(rc => rc.IsCustomer == true);
            //foreach (var item in _ListRespCust)
            //{
            //    _CustRespVal.Append(_Lang == "ar" ? item.Res_DescA : item.Res_DescE);
            //    _CustRespVal.Append((char)13);
            //}
            //DicList.Add("CustomerResp", _CustRespVal.ToString());
            ////Responsibilty Company
            //StringBuilder _CompRespVal = new StringBuilder();
            //var _ListRespComp = _Resp.Where(rc => rc.IsCustomer == false);
            //foreach (var item in _ListRespComp)
            //{
            //    _CompRespVal.Append(_Lang == "ar" ? item.Res_DescA : item.Res_DescE);
            //    _CompRespVal.Append((char)13);
            //}
            //DicList.Add("CompRes", _CompRespVal.ToString());
            ////Payment
            //StringBuilder _PayVal = new StringBuilder();
            //foreach (var item in _Pay)
            //{
            //    _PayVal.Append(_Lang == "ar" ? item.Pay_DescA : item.Pay_DescE);
            //    _PayVal.Append((char)13);
            //}
            //DicList.Add("Payment", _PayVal.ToString());

            //ResponseResult Res = new ResponseResult();
            //Res = CreateSampleDocument(_FileName, DicList, _newFile);
            //return Json(new { result = Res }, JsonRequestBehavior.AllowGet);
            #endregion
        }
        public ResponseResult CreateSampleDocument(string FileName, Dictionary<string, string> DicList,string NewFile)
        {
            ResponseResult Res = new ResponseResult();
            try
            {
                // Modify to suit your machine:
                string filePath = Server.MapPath("../File/" + FileName + ".docx");
                string newfilePath = Server.MapPath("../File/" + NewFile + ".docx");
                // Create a document in memory:
                var doc = DocX.Load(filePath);
                var bm = doc.Bookmarks;
                //Write to Bookmarks in word file
                foreach (var item in DicList)
                {
                    if (!string.IsNullOrEmpty(item.Key))
                    {
                        bm[item.Key].SetText(!string.IsNullOrEmpty(item.Value) ? item.Value : "");
                    }
                }
                doc.SaveAs(newfilePath);
                //Res.ResponseMessage = NewFile;
                Res.ResponseState = true;
            }
            catch (Exception e)
            {
                Res.ResponseState = false;
                Res.ResponseMessage = e.Message;
            }
            return Res;
        }
        public void Download(string Orgfile, string Newfile)
        {
            //string _Lang = SessionManager.SessionRecord.ScreenLanguage;
            //string _FileName = _Lang == "ar" ? "OfferArabic" : "OfferEnglish";
            string Filpath = Server.MapPath("../File/" + Newfile + ".docx");

            System.IO.FileInfo file = new System.IO.FileInfo(Filpath);
            WebClient User = new WebClient();
            Byte[] FileBuffer = User.DownloadData(Filpath);
            if (file.Exists)
            {
                Response.Buffer = true;
                Response.Clear();
                Response.ClearContent();
                Response.ClearHeaders();
                Response.ContentType = "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
                Response.AddHeader("Content-Disposition", "attachment;filename=\"" + Newfile + ".docx\"");
                Response.BinaryWrite(FileBuffer);
                Response.Flush();
                Response.Close();
                Response.End();
                file.Delete();
            }
        }
        // terms 
        public JsonResult PrintTerms(int OfferId, string Type)
        {
            var _Master = db.PQ_GetSalesOffer.Where(off => off.OfferID == OfferId).First();

            string _Lang = SessionManager.SessionRecord.ScreenLanguage;
            string _FileName = _Lang == "ar" ? "ContractTermsArabic" : "ContractTermsEnglish";
            
            var _Pay = db.PQ_GetSlsOfferPayment.Where(r => r.OfferID == _Master.OfferID).Result();
            Dictionary<string, string> DicList = new Dictionary<string, string>();
            var _newfile = _Lang == "ar" ? "ContractTermsAr" : "ContractTermsEn";
            _newfile = _newfile + _Master.ContractCode;

            //Master Data
            //Payment
            StringBuilder _PayVal = new StringBuilder();
            foreach (var item in _Pay)
            {
                _PayVal.Append(_Lang == "ar" ? item.Pay_DescA : item.Pay_DescE);
                _PayVal.Append((char)13);
            }
            DicList.Add("Payterms", _PayVal.ToString());
            ResponseResult Res = new ResponseResult();
            Res = CreateSampleDocument(_FileName, DicList, _newfile);
            Res.NewFile = _newfile;
            Res.OrgFile = _FileName;
            return Json(new { result = Res }, JsonRequestBehavior.AllowGet);
        }
        //contract

        public JsonResult PrintContract(int OfferId, string Type)
        {
            string _Lang = SessionManager.SessionRecord.ScreenLanguage;
            string _FileName = _Lang == "ar" ? "ContractArabic" : "ContractEnglish";

            var _Master = db.PQ_GetSalesOffer.Where(off => off.OfferID == OfferId).First();
            var _Custmor = db.P_D_SalesCustomer.Where(c => c.CustomerID == _Master.CustomerID).First();
            var _Resp = db.PQ_GetSlsOfferResponsibility.Where(r => r.OfferID == _Master.OfferID).Result();
            var _Pay = db.P_Tr_SalesOfferStage.Where(r => r.OfferID == _Master.OfferID).Result();
            Dictionary<string, string> DicList = new Dictionary<string, string>();
            var _newfile = _Lang == "ar" ? "ContractAr" : "ContractEn";
            _newfile = _newfile + _Master.ContractCode;

            //Master Data
            DicList.Add("ContNo", _Master.ContractCode);
            string _Date = !string.IsNullOrEmpty(_Master.ContractDate.ToString()) ? DateTime.Parse(_Master.ContractDate.ToString()).ToString("dd/MM/yyyy") : "";
            DicList.Add("ContDate", _Date);
            DicList.Add("ContDuration", _Master.ContractPeriod.ToString());
            DicList.Add("ContrPrice", _Master.ContractPrice.ToString());
            DicList.Add("CustAddr", _Custmor.CustomerAddress);
            DicList.Add("CustMob", _Custmor.Mobile);
            DicList.Add("CustTel", _Custmor.Tel1);
            DicList.Add("OfferDesc", _Lang == "ar" ? _Master.DescA : _Master.DescL);
            DicList.Add("OfferLoc", _Lang == "ar" ? _Master.Loc_DescA : _Master.loc_DescE);

            DicList.Add("OfferNo", _Master.TrNo.ToString());
            DicList.Add("ContPenality", _Master.ProjectPenalties);
            DicList.Add("WarntyPrd", _Master.ContractWarantyPrd.ToString());
            int i = 0;
            string st = "";

            string Disctxt = "";
            if (_Master.DiscountAmount == 0 || _Master.DiscountAmount == null)
            {
                Disctxt = "";
            }
            else
                if (_Lang == "ar")

            {
                Disctxt = " يمنح الطرف الاول خصم نسبته " + _Master.DiscountPrc.ToString() + " بقيمة " + _Master.DiscountAmount.ToString() + "، ليصبح صافي قيمة العقد  " + _Master.ContractNetPrice.ToString() + " SR.";
            }

            else
            {
                Disctxt = "With discount % of " + _Master.DiscountPrc.ToString() + " Discount amount of " + _Master.DiscountAmount.ToString() + ", The Contract net Value is " + _Master.ContractNetPrice.ToString() + " SR.";
            }


            DicList.Add("Disc_Net", Disctxt);

            DicList.Add("CustName", _Lang == "ar" ? _Custmor.DescA : _Custmor.DescE);
            DicList.Add("CustName1", _Lang == "ar" ? _Custmor.DescA : _Custmor.DescE);

            //Details Data
            //Responsibilty Customers
            StringBuilder _CustRespVal = new StringBuilder();
            var _ListRespCust = _Resp.Where(rc => rc.IsCustomer == true);
            i = 0;
            foreach (var item in _ListRespCust)
            {
                i++;
                if (_Lang == "ar")
                    st = " -" + i.ToString();
                else
                    st = i.ToString() + "- ";
                st += _Lang == "ar" ? item.Res_DescA : item.Res_DescE;
                _CustRespVal.Append(st);
                _CustRespVal.Append((char)13);
            }
            DicList.Add("CustResp", _CustRespVal.ToString());
            //Responsibilty Company
            StringBuilder _CompRespVal = new StringBuilder();
            var _ListRespComp = _Resp.Where(rc => rc.IsCustomer == false);
            i = 0;
            foreach (var item in _ListRespComp)
            {
                i++;
                if (_Lang == "ar")
                    st = " -" + i.ToString();
                else
                    st = i.ToString() + "- ";
                st += _Lang == "ar" ? item.Res_DescA : item.Res_DescE;
                _CompRespVal.Append(st);
                _CompRespVal.Append((char)13);
            }
            DicList.Add("CompResp", _CompRespVal.ToString());
            //Payment
            StringBuilder _Phases = new StringBuilder();
            i = 0;
            foreach (var item in _Pay)
            {
                i++;
                if (_Lang == "ar")
                    st = " -" + i.ToString();
                else
                    st = i.ToString() + "- ";
                st += _Lang == "ar" ? item.StageDescA : item.StageDescE;
                _Phases.Append(st);
                _Phases.Append((char)13);
            }
            DicList.Add("OfferPhases", _Phases.ToString());
            var _Payment = db.PQ_GetSlsOfferPayment.Where(r => r.OfferID == _Master.OfferID).Result();


            //Master Data
            //Payment
            StringBuilder _PayVal = new StringBuilder();
            i = 0;
            foreach (var item in _Payment)
            {
                i++;
                if (_Lang == "ar")
                    st = " -" + i.ToString();
                else
                    st = i.ToString() + "- ";
                st += _Lang == "ar" ? item.Pay_DescA : item.Pay_DescE;
                _PayVal.Append(st);
                _PayVal.Append((char)13);
            }
            DicList.Add("Payterms", _PayVal.ToString());
            ResponseResult Res = new ResponseResult();
            Res = CreateSampleDocument(_FileName, DicList, _newfile);
            Res.NewFile = _newfile;
            Res.OrgFile = _FileName;
            return Json(new { result = Res }, JsonRequestBehavior.AllowGet);
        }
        //public void DownloadContract(string Type)
        //{
        //    string _Lang = SessionManager.SessionRecord.ScreenLanguage;
        //    string _FileName = _Lang == "ar" ? Type + "Arabic" : Type + "English";
        //    string Filpath = Server.MapPath("../File/" + _FileName + ".docx");

        //    System.IO.FileInfo file = new System.IO.FileInfo(Filpath);
        //    WebClient User = new WebClient();
        //    Byte[] FileBuffer = User.DownloadData(Filpath);
        //    if (file.Exists)
        //    {
        //        Response.Buffer = true;
        //        Response.Clear();
        //        Response.ClearContent();
        //        Response.ClearHeaders();
        //        Response.ContentType = "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
        //        Response.AddHeader("Content-Disposition", "attachment;filename=\"" + file.Name + "\"");
        //        Response.BinaryWrite(FileBuffer);
        //        Response.Flush();
        //        Response.Close();
        //        Response.End();
        //    }
        //}
        //
        #region Not Used
        public JsonResult Add()
        {
            throw new NotImplementedException();
        }
        public JsonResult DeleteAll(string json)
        {
            throw new NotImplementedException();
        }
        public void Edit()
        {
            throw new NotImplementedException();
        }
        public JsonResult Find()
        {
            throw new NotImplementedException();
        }
        public JsonResult GetModelCount()
        {
            throw new NotImplementedException();
        }
        public JsonResult InsertAll(P_TR_SalesOffer master, string json)
        {
            throw new NotImplementedException();
        }
        public JsonResult OnSearchSelect(string id)
        {
            throw new NotImplementedException();
        }
        public JsonResult Undo()
        {
            throw new NotImplementedException();
        }
        #endregion
    }
}