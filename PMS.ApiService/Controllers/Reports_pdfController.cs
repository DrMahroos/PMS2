using PMS.ApiService.Models;
using Microsoft.Reporting.WebForms;
using System;
using System.Collections.Generic;
using System.Linq;
using Newtonsoft.Json;
using System.Data.SqlClient;
using System.Drawing.Printing;
using System.IO;
using System.Drawing.Imaging;
using System.Drawing;
using System.Collections.Specialized;
using System.Globalization;
using System.Text;
using PMS.ApiService.Tools;
using PMS.ServiceConnector.Models;
using PMS.ApiService.Models.CustomEntities;

using System.Web.Configuration;
using System.Data.Entity.Core.EntityClient;
using System.Diagnostics;
using QRCoder;
using System.Web.UI;

namespace PMS.ApiService.Controllers
{
    public class Reports_pdfController : BaseController
    {
        Models.SessionRecord CurrentSession;
        Models.ReportParameters CurrentReportParameters;
        // PMSEntities db = new PMSEntities();

        PMSEntities db = new PMSEntities(Shared.BuildConnectionString());
        string reportName = "";
        string SubSystemCode = "";
        string DocNo = "";
        string VatNo = "";
        #region Calling Reports Function 
        private ReportInfo OpenReport(RepFinancials RepPar, string ReportName)
        {
            var SystemCode = RepPar.SystemCode;
            string SubSystemCode = RepPar.SubSystemCode;
            int compCode = int.Parse(RepPar.CompCode);
            int? BranchCode = int.Parse(RepPar.braCode);
            string USER_CODE = RepPar.UserCode;
            G_ReportWebSetting Result = new G_ReportWebSetting();

            var DefauldReports = db.G_ReportWebSetting.Where(x => x.SystemCode == SystemCode && x.SubSystemCode == SubSystemCode && x.ReportID == ReportName);
            if (DefauldReports.Count() != 0)
            {
                var report = DefauldReports.Where(x => x.COMP_CODE == compCode && x.BRA_Code == BranchCode && x.USER_CODE == USER_CODE);
                if (report.Count() == 0)
                {
                    report = DefauldReports.Where(x => x.COMP_CODE == compCode && x.USER_CODE == USER_CODE);
                }
                if (report.Count() == 0)
                {
                    report = DefauldReports.Where(x => x.COMP_CODE == compCode && x.BRA_Code == BranchCode);
                }
                if (report.Count() == 0)
                {
                    report = DefauldReports.Where(x => x.COMP_CODE == compCode && x.BRA_Code == null);
                }
                if (report.Count() == 0)
                {
                    Result = DefauldReports.FirstOrDefault();
                }
                else
                {
                    Result = report.FirstOrDefault();
                }
            }

            ReportInfo ReportInfoObj = new ReportInfo();
            //CurrentSession.ScreenLanguage = "en";
            ReportInfoObj.dataSource = Result != null ? Result.ReportDataSouce : "";
            //if (CurrentSession.ScreenLanguage == "ar")
            //{ ReportInfoObj.reportName = Result != null ? Result.ReportDesignNameAr : ""; }
            //else
            //{ ReportInfoObj.reportName = Result != null ? Result.ReportDesignNameEn : ""; }
            ReportInfoObj.reportName = Result != null ? Result.ReportDesignNameEn : "";
            return ReportInfoObj;
        }



        struct DataSourceStruct
        {
            public string Name { get; set; }
            public object DataSource { get; set; }
        }
        struct ReportInfo
        {
            public string dataSource { get; set; }
            public string reportName { get; set; }
        }

        struct ReportStandardParameters
        {

            public SqlParameter spComCode { get; set; }

            public SqlParameter spComNameA { get; set; }

            public SqlParameter spComNameE { get; set; }

            public SqlParameter spBraNameA { get; set; }

            public SqlParameter braNameE { get; set; }

            public SqlParameter spLoginUser { get; set; }

            //      public SqlParameter spbra { get; set; }

        }
        public class ReportPrintDocument : PrintDocument
        {
            private PageSettings m_pageSettings;
            private int m_currentPage;
            private List<Stream> m_pages = new List<Stream>();

            public ReportPrintDocument(ServerReport serverReport)
                : this((Report)serverReport)
            {
                RenderAllServerReportPages(serverReport);
            }

            public ReportPrintDocument(LocalReport localReport)
                : this((Report)localReport)
            {
                RenderAllLocalReportPages(localReport);
            }

            private ReportPrintDocument(Report report)
            {
                // Set the page settings to the default defined in the report 
                ReportPageSettings reportPageSettings = report.GetDefaultPageSettings();
                m_pageSettings = new PageSettings();
                m_pageSettings.PaperSize = reportPageSettings.PaperSize;
                m_pageSettings.Margins = reportPageSettings.Margins;
                m_pageSettings.Landscape = true;
            }

            protected override void Dispose(bool disposing)
            {
                base.Dispose(disposing);

                if (disposing)
                {
                    foreach (Stream s in m_pages)
                    {
                        s.Dispose();
                    }

                    m_pages.Clear();
                }
            }

            protected override void OnBeginPrint(PrintEventArgs e)
            {
                base.OnBeginPrint(e);

                m_currentPage = 0;
            }

            protected override void OnPrintPage(PrintPageEventArgs e)
            {
                if (e == null)
                    throw new ArgumentNullException("e");

                base.OnPrintPage(e);

                Stream pageToPrint = m_pages[m_currentPage];
                pageToPrint.Position = 0;

                // Load each page into a Metafile to draw it. 
                using (Metafile pageMetaFile = new Metafile(pageToPrint))
                {
                    Rectangle adjustedRect = new Rectangle(
                            e.PageBounds.Left - (int)e.PageSettings.HardMarginX,
                            e.PageBounds.Top - (int)e.PageSettings.HardMarginY,
                            e.PageBounds.Width,
                            e.PageBounds.Height);

                    // Draw a white background for the report PPrnt_eng_WorkSchedule
                    e.Graphics.FillRectangle(Brushes.White, adjustedRect);

                    // Draw the report content 
                    e.Graphics.DrawImage(pageMetaFile, adjustedRect);

                    // Prepare for next page.  Make sure we haven't hit the end. 
                    m_currentPage++;
                    e.HasMorePages = m_currentPage < m_pages.Count;
                }
            }

            protected override void OnQueryPageSettings(QueryPageSettingsEventArgs e)
            {
                if (e == null)
                    throw new ArgumentNullException("e");

                e.PageSettings = (PageSettings)m_pageSettings.Clone();
            }

            private void RenderAllServerReportPages(ServerReport serverReport)
            {
                string deviceInfo = CreateEMFDeviceInfo();

                // Generating Image renderer pages one at a time can be expensive.  In order 
                // to generate page 2, the server would need to recalculate page 1 and throw it 
                // away.  Using PersistStreams causes the server to generate all the pages in 
                // the background but return as soon as page 1 is complete. 
                NameValueCollection firstPageParameters = new NameValueCollection();
                firstPageParameters.Add("rs:PersistStreams", "True");

                // GetNextStream returns the next page in the sequence from the background process 
                // started by PersistStreams. 
                NameValueCollection nonFirstPageParameters = new NameValueCollection();
                nonFirstPageParameters.Add("rs:GetNextStream", "True");

                string mimeType;
                string fileExtension;
                Stream pageStream = serverReport.Render("IMAGE", deviceInfo, firstPageParameters, out mimeType, out fileExtension);

                // The server returns an empty stream when moving beyond the last page. 
                while (pageStream.Length > 0)
                {
                    m_pages.Add(pageStream);

                    pageStream = serverReport.Render("IMAGE", deviceInfo, nonFirstPageParameters, out mimeType, out fileExtension);
                }
            }

            private void RenderAllLocalReportPages(LocalReport localReport)
            {
                string deviceInfo = CreateEMFDeviceInfo();

                Warning[] warnings;
                localReport.Render("IMAGE", deviceInfo, LocalReportCreateStreamCallback, out warnings);
            }

            private Stream LocalReportCreateStreamCallback(
                string name,
                string extension,
                Encoding encoding,
                string mimeType,
                bool willSeek)
            {
                MemoryStream stream = new MemoryStream();
                m_pages.Add(stream);

                return stream;
            }

            private string CreateEMFDeviceInfo()
            {
                PaperSize paperSize = m_pageSettings.PaperSize;
                Margins margins = m_pageSettings.Margins;

                // The device info string defines the page range to print as well as the size of the page. 
                // A start and end page of 0 means generate all pages. 
                return string.Format(
                    CultureInfo.InvariantCulture,
                    "<DeviceInfo><OutputFormat>emf</OutputFormat><StartPage>0</StartPage><EndPage>0</EndPage><MarginTop>{0}</MarginTop><MarginLeft>{1}</MarginLeft><MarginRight>{2}</MarginRight><MarginBottom>{3}</MarginBottom><PageHeight>{4}</PageHeight><PageWidth>{5}</PageWidth></DeviceInfo>",
                    ToInches(margins.Top),
                    ToInches(margins.Left),
                    ToInches(margins.Right),
                    ToInches(margins.Bottom),
                    "21.5cm",
                    "14cm");
            }

            private static string ToInches(int hundrethsOfInch)
            {
                double inches = hundrethsOfInch / 100.0;
                return inches.ToString(CultureInfo.InvariantCulture) + "in";
            }
        }


        public void buildReport(params object[] models)
        {

            var Folder = "";
            switch (SubSystemCode)
            {
                case "DEF":
                    Folder = "DefReport/";
                    break;
                case "ENG":
                    Folder = "Eng/";
                    break;
                case "SLS":
                    Folder = "SlsReport/";
                    break;
                case "RES":
                    Folder = "ResReport/";
                    break;
                case "REP":
                    Folder = "GRP/";
                    break;
                case "DSS":
                    Folder = "DSS/";
                    break;
            }
            LocalReport localReport = new LocalReport();


            localReport.ReportPath = System.Web.HttpContext.Current.Server.MapPath("../Reports/" + Folder + reportName + ".rdlc");


            localReport.DataSources.Clear();
            foreach (var model in models)
            {
                
   
                ReportDataSource source = new ReportDataSource(reportName, model);
                localReport.DataSources.Add(source);
            }

            try
            {
                byte[] renderdByte;
                localReport.EnableExternalImages = true; 
                renderdByte = localReport.Render("PDF");
                string DocPDFFolder = WebConfigurationManager.AppSettings["ReportsPath"];
                string Name_File = "invo";

                DownloadContract(DocPDFFolder, "" + Name_File + "" + VatNo + "_" + DocNo + "", renderdByte);

            }
            catch (Exception ex)
            {
                throw;
            }

        }
        private void DownloadContract(string DocPDFFolder, string nid, byte[] contractByte)
        {
            try
            {

                string savePath = System.Web.HttpContext.Current.Server.UrlPathEncode(@"" + DocPDFFolder + "") + @"" + nid + "" + ".pdf";
                System.IO.File.WriteAllBytes(savePath, contractByte);
            }
            catch (Exception ex)
            {

            }
        }




        #endregion




        public void rptInvoiceNote(RepFinancials rp)
        { 
            var que = PPrnt_sls_Invoice(rp);

            buildReport(que);

        }

        public IEnumerable<PProc_Prnt_sls_Invoice_Result> PPrnt_sls_Invoice(RepFinancials StandPar)
        {


            SqlParameter spTrID = null;

            int TrID = 0;
            int x = StandPar.TrID;
            if (x == 0)
            {
                spTrID = new SqlParameter("@TrID", DBNull.Value);
            }
            else
            {
                TrID = Convert.ToInt32(x);
                spTrID = new SqlParameter("@TrID", TrID);
            }

            ReportInfo Rep = OpenReport(StandPar, "PRep_sls_Invoice");
            string _Query = "execute " + Rep.dataSource +
               " @comp = '" + StandPar.CompCode + "'" +
                ", @CompNameA = '" + StandPar.CompanyNameAr + "'" +
                ", @CompNameE = '" + StandPar.CompanyName + "'" +
                ", @BraNameA = '" + StandPar.BraNameA + "'" +
                ", @BraNameE = '" + StandPar.BraNameE + "'" +
                ", @LoginUser = '" + StandPar.UserCode + "'" +
                ", @TrID = " + spTrID.Value;
            var query = db.Database.SqlQuery<PProc_Prnt_sls_Invoice_Result>(_Query).ToList();

            reportName = Rep.reportName;
            SubSystemCode = StandPar.SubSystemCode;

            DocNo = query[0].DocNo;
            VatNo = query[0].Cust_VatNo;
            string bar1;
            bar1 = query[0].QRStr;

            QRCodeGenerator qRCodeGenerator1 = new QRCodeGenerator();
            QRCodeData qRCodeData1 = qRCodeGenerator1.CreateQrCode(bar1, QRCoder.QRCodeGenerator.ECCLevel.Q);
            QRCoder.QRCode qRCode1 = new QRCoder.QRCode(qRCodeData1);
            byte[] QRcode1;

            using (Bitmap bitmap = qRCode1.GetGraphic(2))
            {
                using (MemoryStream ms = new MemoryStream())
                {
                    bitmap.Save(ms, System.Drawing.Imaging.ImageFormat.Jpeg);
                    byte[] byteimage = ms.ToArray();
                    QRcode1 = byteimage;
                }
            }

            query[0].QRCode = Convert.ToBase64String(QRcode1);

            return query;


        }

        public void rptInvoiceDbCr(RepFinancials rp)
        {
            var que = PProc_Prnt_sls_DbCr(rp);

            buildReport(que);

        }
        public IEnumerable<PProc_Prnt_sls_DbCr_Result> PProc_Prnt_sls_DbCr(RepFinancials StandPar)
        {


            SqlParameter spTrID = null;

            int TrID = 0;
            int x = StandPar.TrID;
            if (x == 0)
            {
                spTrID = new SqlParameter("@TrID", DBNull.Value);
            }
            else
            {
                TrID = Convert.ToInt32(x);
                spTrID = new SqlParameter("@TrID", TrID);
            }

            ReportInfo Rep = OpenReport(StandPar, "PRep_sls_DbCr");
            string _Query = "execute " + Rep.dataSource +
               " @comp = '" + StandPar.CompCode + "'" +
                ", @CompNameA = '" + StandPar.CompanyNameAr + "'" +
                ", @CompNameE = '" + StandPar.CompanyName + "'" +
                ", @BraNameA = '" + StandPar.BraNameA + "'" +
                ", @BraNameE = '" + StandPar.BraNameE + "'" +
                ", @LoginUser = '" + StandPar.UserCode + "'" +
                ", @TrID = " + spTrID.Value;
            var query = db.Database.SqlQuery<PProc_Prnt_sls_DbCr_Result>(_Query).ToList();

            reportName = Rep.reportName;
            SubSystemCode = StandPar.SubSystemCode;

            DocNo = query[0].DocNo;
            VatNo = query[0].Cust_VatNo;
            string bar1;
            bar1 = query[0].QRStr;

            QRCodeGenerator qRCodeGenerator1 = new QRCodeGenerator();
            QRCodeData qRCodeData1 = qRCodeGenerator1.CreateQrCode(bar1, QRCoder.QRCodeGenerator.ECCLevel.Q);
            QRCoder.QRCode qRCode1 = new QRCoder.QRCode(qRCodeData1);
            byte[] QRcode1;

            using (Bitmap bitmap = qRCode1.GetGraphic(2))
            {
                using (MemoryStream ms = new MemoryStream())
                {
                    bitmap.Save(ms, System.Drawing.Imaging.ImageFormat.Jpeg);
                    byte[] byteimage = ms.ToArray();
                    QRcode1 = byteimage;
                }
            }

            query[0].QRStr = Convert.ToBase64String(QRcode1);
        
            return query;


        }

    }
}
