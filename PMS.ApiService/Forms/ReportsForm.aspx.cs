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
using System.Web.Configuration;
using PMS.ApiService.Tools;
using System.Data.Entity.Core.EntityClient;
using System.Diagnostics;
using QRCoder;

namespace PMS.ApiService.Forms
{
    public partial class ReportsForm : System.Web.UI.Page
    {
        SessionRecord CurrentSession;
        ReportParameters CurrentReportParameters;
        // PMSEntities db = new PMSEntities();
        
        PMSEntities db = new PMSEntities(Shared.BuildConnectionString());
        //public static string BuildConnectionString()
        //{
        //    SqlConnectionStringBuilder sqlBuilder = new SqlConnectionStringBuilder();
        //    EntityConnectionStringBuilder entityBuilder = new EntityConnectionStringBuilder();

        //    // Set the properties for the data source.
        //    sqlBuilder.DataSource = WebConfigurationManager.AppSettings["ServerName"];
        //    bool singleDb = Convert.ToBoolean(WebConfigurationManager.AppSettings["singleDb"]);

        //    if (singleDb == false)
        //        sqlBuilder.InitialCatalog = WebConfigurationManager.AppSettings["AbsoluteSysDbName"] + Shared.Session.SelectedYear;
        //    else
        //        sqlBuilder.InitialCatalog = WebConfigurationManager.AppSettings["AbsoluteSysDbName"];

        //    sqlBuilder.UserID = WebConfigurationManager.AppSettings["DbUserName"];
        //    sqlBuilder.Password = WebConfigurationManager.AppSettings["DbPassword"];
        //    sqlBuilder.IntegratedSecurity = Convert.ToBoolean(WebConfigurationManager.AppSettings["UseIntegratedSecurity"]);
        //    sqlBuilder.MultipleActiveResultSets = true;

        //    string providerString = sqlBuilder.ToString();

        //    entityBuilder.ProviderConnectionString = providerString;
        //    entityBuilder.Provider = "System.Data.SqlClient";
        //    entityBuilder.Metadata = @"res://*/Models.SysModel.csdl|res://*/Models.SysModel.ssdl|res://*/Models.SysModel.msl";

        //    return entityBuilder.ConnectionString;
        //}
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                if (Request["rpt"] == null || Request["ses"] == null)
                    return;
                if (Request["par"] != null)
                {
                    CurrentReportParameters = JsonConvert.DeserializeObject<ReportParameters>(Request["par"]);
                }

                reportViewer1.ShowPrintButton = true;

                string ReportName = Request["rpt"];
                string ses = Request["ses"];
                CurrentSession = JsonConvert.DeserializeObject<SessionRecord>(Request["ses"]);
                if (CurrentSession.Language == "ar")
                {
                    reportViewer1.Attributes.Add("style", "direction:rtl;");
                }
                else
                {
                    reportViewer1.Attributes.Add("style", "direction:ltr;");
                }
                if (!IsPostBack)
                {
                    var method = this.GetType().GetMethod(ReportName);
                    
                 method.Invoke(this, null);// this.GetParameters(method.GetParameters()).ToArray());


                }

            }

        }




        #region Bind Reports Functions
        private void BindReport(string reportName, params object[] models)
        {
            var Folder = "";

            //if (CurrentSession.SubSystemCode == "DEF")
            //    Folder = "DefReport/";
            //else
            //    Folder = "SlsReport/";

            switch (CurrentSession.SubSystemCode)
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


            reportViewer1.LocalReport.ReportPath = Server.MapPath("../Reports/" + Folder + reportName + ".rdlc");// reportPath + ReportName + ".rdlc";
          string Catalog = WebConfigurationManager.AppSettings["ReportsPath"] + Folder + reportName + ".rdlc";

            reportViewer1.LocalReport.DataSources.Clear();
            foreach (var model in models)
            {
                ReportDataSource source = new ReportDataSource(reportName, model);

                reportViewer1.LocalReport.DataSources.Add(source);

            }




            reportViewer1.DataBind();
        }
        private void BindReport_(string reportName, int OutputTypeNo, string OutputType, params object[] models)
        {

            var Folder = "";

            //if (CurrentSession.SubSystemCode == "DEF")
            //    Folder = "DefReport/";
            //else
            //    Folder = "SlsReport/";

            switch (CurrentSession.SubSystemCode)
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

            reportViewer1.LocalReport.ReportPath = Server.MapPath("../Reports/" + Folder + reportName + ".rdlc");// reportPath + ReportName + ".rdlc";


            reportViewer1.LocalReport.DataSources.Clear();
            foreach (var model in models)
            {
                ReportDataSource source = new ReportDataSource(reportName, model);

                reportViewer1.LocalReport.DataSources.Add(source);

            }


            if (OutputTypeNo == 1)
            {
                reportViewer1.DataBind();

            }

            else if (OutputTypeNo == 2) { OutputType = "PDF"; }
            else if (OutputTypeNo == 3) { OutputType = "Excel"; }
            
            if (OutputTypeNo == 2 || OutputTypeNo == 3)
            {

                Warning[] warnings;
                string[] streamIds;
                string mimeType = string.Empty;
                string encoding = string.Empty;
                string extension = string.Empty;
                byte[] bytes = reportViewer1.LocalReport.Render(OutputType, null, out mimeType, out encoding, out extension, out streamIds, out warnings);
                Response.Buffer = true;
                Response.Clear();
                Response.ContentType = mimeType;
                Response.AddHeader("content-disposition", "attachment; filename=" + reportName + "." + extension);
                Response.OutputStream.Write(bytes, 0, bytes.Length);
                Response.Flush();
                //Response.End();
            }



        }

        private void BindSSRS(string reportName, List<DataSourceStruct> models)
        {

            reportViewer1.LocalReport.ReportPath = Server.MapPath("../Reports/" + reportName + ".rdlc");// reportPath + ReportName + ".rdlc";
            reportViewer1.LocalReport.DataSources.Clear();
            foreach (var model in models)
            {
                ReportDataSource source = new ReportDataSource(model.Name, model.DataSource);
                reportViewer1.LocalReport.DataSources.Add(source);
            }

            reportViewer1.DataBind();
        }
        #endregion

        #region Calling Reports Function

        protected void btnPrint_Click(object sender, EventArgs e)
        {
            ReportPrintDocument rp = new ReportPrintDocument(reportViewer1.LocalReport);
            rp.Print();
        }

        private ReportInfo OpenReport(string ReportName)
        {
            var SystemCode = CurrentSession.SystemCode;
            var SubSystemCode = CurrentSession.SubSystemCode;
            int compCode = int.Parse(CurrentSession.CompCode);
            int? BranchCode = int.Parse(CurrentSession.BranchCode);
            string USER_CODE = CurrentSession.UserCode;
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
            ReportInfoObj.dataSource = Result != null ? Result.ReportDataSouce : "";
            if (CurrentSession.ScreenLanguage == "ar")
            { ReportInfoObj.reportName = Result != null ? Result.ReportDesignNameAr : ""; }
            else
            { ReportInfoObj.reportName = Result != null ? Result.ReportDesignNameEn : ""; }

            return ReportInfoObj;
        }

        private ReportStandardParameters getStandardParameters()
        {
            ReportStandardParameters StandardParameter = new ReportStandardParameters();

            int CompCode = int.Parse(Request["CompCode"].ToString());
            StandardParameter.spComCode = new SqlParameter("@comp", CompCode);

            string comapnyName = Request["CompNameA"].ToString();
            StandardParameter.spComNameA = new SqlParameter("@CompNameA", comapnyName);

            string CompNameE = Request["CompNameE"].ToString();
            StandardParameter.spComNameE = new SqlParameter("@CompNameE", CompNameE);

            string BraNameA = Request["BraNameA"].ToString();
            StandardParameter.spBraNameA = new SqlParameter("@BraNameA", BraNameA);

            string BraNameE = Request["BraNameE"].ToString();
            StandardParameter.braNameE = new SqlParameter("@BraNameE", BraNameE);

            string LoginUser = Request["LoginUser"].ToString();
            StandardParameter.spLoginUser = new SqlParameter("@LoginUser", LoginUser);

            //int branCode = int.Parse(Request["bra"].ToString());
            //StandardParameter.spbra = new SqlParameter("@bra", branCode);

            return StandardParameter;
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
        #endregion
        #region  Reports Screens

        //Reports Screens For PMS
        public IEnumerable<PProc_Rep_sub_Evaluation_Result> PRep_sub_Evaluation_BYSub()
        {
            ReportStandardParameters StandPar = getStandardParameters();
            SqlParameter spFromDate = null;
            SqlParameter spToDate = null;
            SqlParameter spContrId = null;
            SqlParameter spSubID = null;
            SqlParameter spEngID = null;
            SqlParameter spbra = null;
            SqlParameter spProjectID = null;
            string stBarID = Request["braCode"].ToString();
            int branCode = Convert.ToInt32(stBarID);
            spbra = new SqlParameter("@braCode", branCode);

            int ContrID = 0;
            string stContrID = Request["ContrId"].ToString();
            if (stContrID == "")
            {
                spContrId = new SqlParameter("@ContrId", System.Data.SqlTypes.SqlInt32.Null);
            }
            else
            {
                ContrID = Convert.ToInt32(stContrID);
                spContrId = new SqlParameter("@ContrId", ContrID);
            }



            int EngID = 0;
            string stEngID = Request["EngID"].ToString();
            if (stEngID == "")
            {
                spEngID = new SqlParameter("@EngId", System.Data.SqlTypes.SqlInt32.Null);
            }
            else
            {
                EngID = Convert.ToInt32(stEngID);
                spEngID = new SqlParameter("@EngId", EngID);
            }

            string FromDate = null;
            string stFromDate = Request["FromDate"].ToString();
            if (stFromDate == "")
            {
                spFromDate = new SqlParameter("@FromDate", System.Data.SqlTypes.SqlInt32.Null);
            }

            else
            {
                FromDate = (stFromDate);
                spFromDate = new SqlParameter("@FromDate", FromDate);

            }
            string ToDate = null;
            string stToDate = Request["ToDate"].ToString();
            if (stToDate == "")
            {
                spToDate = new SqlParameter("@ToDate", System.Data.SqlTypes.SqlInt32.Null);
            }
            else
            {
                ToDate = (stToDate);
                spToDate = new SqlParameter("@ToDate", ToDate);
            }





            int SubId = 0;
            string stSubId = Request["SubID"].ToString();
            if (stSubId == "")
            {
                spSubID = new SqlParameter("@SubID", System.Data.SqlTypes.SqlInt32.Null);
            }
            else
            {
                SubId = Convert.ToInt32(stSubId);
                spSubID = new SqlParameter("@SubID", SubId);
            }


            int ProjectId = 0;
            string stProjectId = Request["ProjectID"].ToString();
            if (stProjectId == "")
            {
                spProjectID = new SqlParameter("@ProjectID", System.Data.SqlTypes.SqlInt32.Null);
            }
            else
            {
                ProjectId = Convert.ToInt32(stProjectId);
                spProjectID = new SqlParameter("@ProjectID", ProjectId);
            }






            ReportInfo Rep = OpenReport("PRep_sub_Evaluation_BYSub");
            string _Query = " execute " + Rep.dataSource +
                "  @comp = '" + StandPar.spComCode.Value + "'" +
                ", @CompNameA = '" + StandPar.spComNameA.Value + "'" +
                ", @CompNameE = '" + StandPar.spComNameE.Value + "'" +
                ", @BraNameA = '" + StandPar.spBraNameA.Value + "'" +
                ", @BraNameE = '" + StandPar.braNameE.Value + "'" +
                ", @LoginUser = '" + StandPar.spLoginUser.Value + "'" +
                ", @braCode = '" + spbra.Value + "'" +
                ", @FromDate = '" + spFromDate.Value + "'" +
                ", @ToDate = '" + spToDate.Value + "'" +
                ", @SubID =  " + spSubID.Value + "" + "," +
                "  @ContrId = " + spContrId.Value + "" + "," +
                "  @ProjectID = " + spProjectID.Value + "" + "," +
                "  @EngId =" + spEngID.Value + "";


            var query = db.Database.SqlQuery<PProc_Rep_sub_Evaluation_Result>(_Query).ToList();

            BindReport(Rep.reportName, query);
            return query;


        }
        public IEnumerable<PProc_Rep_sub_Evaluation_Result> PRep_sub_Evaluation_BYENG()
        {
            ReportStandardParameters StandPar = getStandardParameters();
            SqlParameter spFromDate = null;
            SqlParameter spToDate = null;
            SqlParameter spContrId = null;
            SqlParameter spSubID = null;
            SqlParameter spEngID = null;
            SqlParameter spbra = null;
            SqlParameter spProjectID = null;
            string stBarID = Request["braCode"].ToString();
            int branCode = Convert.ToInt32(stBarID);
            spbra = new SqlParameter("@braCode", branCode);

            int ContrID = 0;
            string stContrID = Request["ContrId"].ToString();
            if (stContrID == "")
            {
                spContrId = new SqlParameter("@ContrId", System.Data.SqlTypes.SqlInt32.Null);
            }
            else
            {
                ContrID = Convert.ToInt32(stContrID);
                spContrId = new SqlParameter("@ContrId", ContrID);
            }



            int EngID = 0;
            string stEngID = Request["EngID"].ToString();
            if (stEngID == "")
            {
                spEngID = new SqlParameter("@EngId", System.Data.SqlTypes.SqlInt32.Null);
            }
            else
            {
                EngID = Convert.ToInt32(stEngID);
                spEngID = new SqlParameter("@EngId", EngID);
            }

            string FromDate = null;
            string stFromDate = Request["FromDate"].ToString();
            if (stFromDate == "")
            {
                spFromDate = new SqlParameter("@FromDate", System.Data.SqlTypes.SqlInt32.Null);
            }

            else
            {
                FromDate = (stFromDate);
                spFromDate = new SqlParameter("@FromDate", FromDate);

            }
            string ToDate = null;
            string stToDate = Request["ToDate"].ToString();
            if (stToDate == "")
            {
                spToDate = new SqlParameter("@ToDate", System.Data.SqlTypes.SqlInt32.Null);
            }
            else
            {
                ToDate = (stToDate);
                spToDate = new SqlParameter("@ToDate", ToDate);
            }





            int SubId = 0;
            string stSubId = Request["SubID"].ToString();
            if (stSubId == "")
            {
                spSubID = new SqlParameter("@SubID", System.Data.SqlTypes.SqlInt32.Null);
            }
            else
            {
                SubId = Convert.ToInt32(stSubId);
                spSubID = new SqlParameter("@SubID", SubId);
            }


            int ProjectId = 0;
            string stProjectId = Request["ProjectID"].ToString();
            if (stProjectId == "")
            {
                spProjectID = new SqlParameter("@ProjectID", System.Data.SqlTypes.SqlInt32.Null);
            }
            else
            {
                ProjectId = Convert.ToInt32(stProjectId);
                spProjectID = new SqlParameter("@ProjectID", ProjectId);
            }






            ReportInfo Rep = OpenReport("PRep_sub_Evaluation_BYENG");
            string _Query = " execute " + Rep.dataSource +
                "  @comp = '" + StandPar.spComCode.Value + "'" +
                ", @CompNameA = '" + StandPar.spComNameA.Value + "'" +
                ", @CompNameE = '" + StandPar.spComNameE.Value + "'" +
                ", @BraNameA = '" + StandPar.spBraNameA.Value + "'" +
                ", @BraNameE = '" + StandPar.braNameE.Value + "'" +
                ", @LoginUser = '" + StandPar.spLoginUser.Value + "'" +
                ", @braCode = '" + spbra.Value + "'" +
                ", @FromDate = '" + spFromDate.Value + "'" +
                ", @ToDate = '" + spToDate.Value + "'" +
                ", @SubID =  " + spSubID.Value + "" + "," +
                "  @ContrId = " + spContrId.Value + "" + "," +
                "  @ProjectID = " + spProjectID.Value + "" + "," +
                "  @EngId =" + spEngID.Value + "";


            var query = db.Database.SqlQuery<PProc_Rep_sub_Evaluation_Result>(_Query).ToList();

            BindReport(Rep.reportName, query);
            return query;


        }
        public IEnumerable<PProc_Rep_sub_EvaluationScope_Result> PRep_sub_Evaluation_BYScope()
        {
            ReportStandardParameters StandPar = getStandardParameters();
            SqlParameter spFromDate = null;
            SqlParameter spToDate = null;
            SqlParameter spContrId = null;
            SqlParameter spSubID = null;
            SqlParameter spEngID = null;
            SqlParameter spbra = null;
            SqlParameter spProjectID = null;
            string stBarID = Request["braCode"].ToString();
            int branCode = Convert.ToInt32(stBarID);
            spbra = new SqlParameter("@braCode", branCode);

            int ContrID = 0;
            string stContrID = Request["ContrId"].ToString();
            if (stContrID == "")
            {
                spContrId = new SqlParameter("@ContrId", System.Data.SqlTypes.SqlInt32.Null);
            }
            else
            {
                ContrID = Convert.ToInt32(stContrID);
                spContrId = new SqlParameter("@ContrId", ContrID);
            }



            int EngID = 0;
            string stEngID = Request["EngID"].ToString();
            if (stEngID == "")
            {
                spEngID = new SqlParameter("@EngId", System.Data.SqlTypes.SqlInt32.Null);
            }
            else
            {
                EngID = Convert.ToInt32(stEngID);
                spEngID = new SqlParameter("@EngId", EngID);
            }

            string FromDate = null;
            string stFromDate = Request["FromDate"].ToString();
            if (stFromDate == "")
            {
                spFromDate = new SqlParameter("@FromDate", System.Data.SqlTypes.SqlInt32.Null);
            }

            else
            {
                FromDate = (stFromDate);
                spFromDate = new SqlParameter("@FromDate", FromDate);

            }
            string ToDate = null;
            string stToDate = Request["ToDate"].ToString();
            if (stToDate == "")
            {
                spToDate = new SqlParameter("@ToDate", System.Data.SqlTypes.SqlInt32.Null);
            }
            else
            {
                ToDate = (stToDate);
                spToDate = new SqlParameter("@ToDate", ToDate);
            }





            int SubId = 0;
            string stSubId = Request["SubID"].ToString();
            if (stSubId == "")
            {
                spSubID = new SqlParameter("@SubID", System.Data.SqlTypes.SqlInt32.Null);
            }
            else
            {
                SubId = Convert.ToInt32(stSubId);
                spSubID = new SqlParameter("@SubID", SubId);
            }


            int ProjectId = 0;
            string stProjectId = Request["ProjectID"].ToString();
            if (stProjectId == "")
            {
                spProjectID = new SqlParameter("@ProjectID", System.Data.SqlTypes.SqlInt32.Null);
            }
            else
            {
                ProjectId = Convert.ToInt32(stProjectId);
                spProjectID = new SqlParameter("@ProjectID", ProjectId);
            }






            ReportInfo Rep = OpenReport("PRep_sub_Evaluation_BYScope");
            string _Query = " execute " + Rep.dataSource +
                "  @comp = '" + StandPar.spComCode.Value + "'" +
                ", @CompNameA = '" + StandPar.spComNameA.Value + "'" +
                ", @CompNameE = '" + StandPar.spComNameE.Value + "'" +
                ", @BraNameA = '" + StandPar.spBraNameA.Value + "'" +
                ", @BraNameE = '" + StandPar.braNameE.Value + "'" +
                ", @LoginUser = '" + StandPar.spLoginUser.Value + "'" +
                ", @braCode = '" + spbra.Value + "'" +
                ", @FromDate = '" + spFromDate.Value + "'" +
                ", @ToDate = '" + spToDate.Value + "'" +
                ", @SubID =  " + spSubID.Value + "" + "," +
                "  @ContrId = " + spContrId.Value + "" + "," +
                "  @ProjectID = " + spProjectID.Value + "" + "," +
                "  @EngId =" + spEngID.Value + "";



            var query = db.Database.SqlQuery<PProc_Rep_sub_EvaluationScope_Result>(_Query).ToList();

            BindReport(Rep.reportName, query);
            return query;


        }


        public IEnumerable<PProc_Prnt_def_SiteEngineerCategory_Result> PPrnt_def_siteEngCat()
        {
            ReportStandardParameters StandPar = getStandardParameters();
            ReportInfo Rep = OpenReport("PPrnt_def_siteEngCat");

            var query = db.Database.SqlQuery<PProc_Prnt_def_SiteEngineerCategory_Result>("execute " + Rep.dataSource + "  @comp, @CompNameA, @CompNameE, @BraNameA, @BraNameE, @LoginUser",
                StandPar.spComCode, StandPar.spComNameA, StandPar.spComNameE, StandPar.spBraNameA, StandPar.braNameE, StandPar.spLoginUser).ToList();

            BindReport(Rep.reportName, query);
            return query;
        }
        public IEnumerable<PProc_Prnt_def_SalesEngineerCategory_Result> PPrnt_def_SalesEngCat()
        {
            ReportStandardParameters StandPar = getStandardParameters();




            ReportInfo Rep = OpenReport("PPrnt_def_SalesEngCat");

            var query = db.Database.SqlQuery<PProc_Prnt_def_SalesEngineerCategory_Result>("execute " + Rep.dataSource + "  @comp, @CompNameA, @CompNameE, @BraNameA, @BraNameE, @LoginUser",
                StandPar.spComCode, StandPar.spComNameA, StandPar.spComNameE, StandPar.spBraNameA, StandPar.braNameE, StandPar.spLoginUser).ToList();

            BindReport(Rep.reportName, query);
            return query;
        }
        public IEnumerable<PProc_Prnt_def_LaborClass_Result> PPrnt_def_LobClas()
        {
            ReportStandardParameters StandPar = getStandardParameters();




            ReportInfo Rep = OpenReport("PPrnt_def_LobClas");

            var query = db.Database.SqlQuery<PProc_Prnt_def_LaborClass_Result>("execute " + Rep.dataSource + "  @comp, @CompNameA, @CompNameE, @BraNameA, @BraNameE, @LoginUser",
                StandPar.spComCode, StandPar.spComNameA, StandPar.spComNameE, StandPar.spBraNameA, StandPar.braNameE, StandPar.spLoginUser).ToList();

            BindReport(Rep.reportName, query);
            return query;
        }
        public IEnumerable<PProc_Prnt_def_EquipmentClass_Result> pprnt_def_EuqipClas()
        {
            ReportStandardParameters StandPar = getStandardParameters();




            ReportInfo Rep = OpenReport("PPrnt_def_EuqipClas");

            var query = db.Database.SqlQuery<PProc_Prnt_def_EquipmentClass_Result>("execute " + Rep.dataSource + "  @comp, @CompNameA, @CompNameE, @BraNameA, @BraNameE, @LoginUser",
                StandPar.spComCode, StandPar.spComNameA, StandPar.spComNameE, StandPar.spBraNameA, StandPar.braNameE, StandPar.spLoginUser).ToList();

            BindReport(Rep.reportName, query);
            return query;
        }
        public IEnumerable<PProc_Prnt_def_Scope_Result> PPrnt_def_Scope()
        {
            ReportStandardParameters StandPar = getStandardParameters();




            ReportInfo Rep = OpenReport("PPrnt_def_Scope");

            var query = db.Database.SqlQuery<PProc_Prnt_def_Scope_Result>("execute " + Rep.dataSource + "  @comp, @CompNameA, @CompNameE, @BraNameA, @BraNameE, @LoginUser",
                StandPar.spComCode, StandPar.spComNameA, StandPar.spComNameE, StandPar.spBraNameA, StandPar.braNameE, StandPar.spLoginUser).ToList();

            BindReport(Rep.reportName, query);
            return query;
        }
        public IEnumerable<PProc_Prnt_def_UnProdReason_Result> PPrnt_def_UnPrdReon()
        {
            ReportStandardParameters StandPar = getStandardParameters();




            ReportInfo Rep = OpenReport("PPrnt_def_UnPrdReon");

            var query = db.Database.SqlQuery<PProc_Prnt_def_UnProdReason_Result>("execute " + Rep.dataSource + "  @comp, @CompNameA, @CompNameE, @BraNameA, @BraNameE, @LoginUser",
                StandPar.spComCode, StandPar.spComNameA, StandPar.spComNameE, StandPar.spBraNameA, StandPar.braNameE, StandPar.spLoginUser).ToList();

            BindReport(Rep.reportName, query);
            return query;
        }
        public IEnumerable<PProc_Prnt_def_Location_Result> PPrnt_def_Location()
        {
            ReportStandardParameters StandPar = getStandardParameters();

            int bra = int.Parse(Request["bra"].ToString());
            SqlParameter spTRId = new SqlParameter("@bra", bra);


            ReportInfo Rep = OpenReport("PPrnt_def_Location");

            var query = db.Database.SqlQuery<PProc_Prnt_def_Location_Result>("execute " + Rep.dataSource + "  @comp, @CompNameA, @CompNameE, @BraNameA, @BraNameE, @LoginUser,@bra",
                StandPar.spComCode, StandPar.spComNameA, StandPar.spComNameE, StandPar.spBraNameA, StandPar.braNameE, StandPar.spLoginUser, spTRId).ToList();

            BindReport(Rep.reportName, query);
            return query;
        }
        public IEnumerable<PProc_Prnt_def_Expenses_Result> PPrnt_def_Expenses()
        {
            ReportStandardParameters StandPar = getStandardParameters();




            ReportInfo Rep = OpenReport("PPrnt_def_Expenses");

            //var query = db.Database.SqlQuery<PProc_Prnt_def_Expenses_Result>("execute " + Rep.dataSource + "  @comp, @CompNameA, @CompNameE, @BraNameA, @BraNameE, @LoginUser",
            //    StandPar.spComCode, StandPar.spComNameA, StandPar.spComNameE, StandPar.spBraNameA, StandPar.braNameE, StandPar.spLoginUser).ToList();

            //BindReport(Rep.reportName, query);

            string _Query = "execute PProc_Prnt_def_Expenses " +
              " @comp = " + StandPar.spComCode.Value + "" +
              ", @CompNameA = '" + StandPar.spComNameA.Value + "'" +
              ", @CompNameE = '" + StandPar.spComNameE.Value + "'" +
              ", @BraNameA = '" + StandPar.spBraNameA.Value + "'" +
              ", @BraNameE = '" + StandPar.braNameE.Value + "'" +
              ", @LoginUser = '" + StandPar.spLoginUser.Value + "'";

            var query = db.Database.SqlQuery<PProc_Prnt_def_Expenses_Result>(_Query).ToList();

            BindReport(Rep.reportName, query);

            return query;
        }
        public IEnumerable<PProc_Prnt_def_SalesEngineer_Result> PRpt_def_SalesEng()
        {
            ReportStandardParameters StandPar = getStandardParameters();
            int CatID = 0;

            SqlParameter spCatID = null;
            SqlParameter spbra = null;
            SqlParameter spActive = null;
            string x = Request["CatID"].ToString();
            if (x == "")
            {
                spCatID = new SqlParameter("@CatID", DBNull.Value);
            }

            else
            {
                CatID = Convert.ToInt32(x);
                spCatID = new SqlParameter("@CatID", CatID);

            }
            int bra = 0;
            string b = Request["bra"].ToString();
            if (b == "")
            {
                spbra = new SqlParameter("@bra", DBNull.Value);
            }
            else
            {
                bra = Convert.ToInt32(b);
                spbra = new SqlParameter("@bra", bra);
            }
            int Active = 0;
            string a = Request["Active"].ToString();
            if (a == "")
            {
                spActive = new SqlParameter("@Active", DBNull.Value);
            }
            else
            {
                Active = Convert.ToInt32(a);
                spActive = new SqlParameter("@Active", Active);
            }
            ReportInfo Rep = OpenReport("PRpt_def_SalesEng");
            var query = db.Database.SqlQuery<PProc_Prnt_def_SalesEngineer_Result>("execute " + Rep.dataSource + "  @comp, @CompNameA, @CompNameE, @BraNameA, @BraNameE, @LoginUser,@CatID,@bra,@Active",
                 StandPar.spComCode, StandPar.spComNameA, StandPar.spComNameE, StandPar.spBraNameA, StandPar.braNameE, StandPar.spLoginUser, spCatID, spbra, spActive).ToList();

            BindReport(Rep.reportName, query);
            return query;
        }
        public IEnumerable<PProc_Prnt_def_SiteEngineer_Result> PRpt_def_SiteEng()
        {
            ReportStandardParameters StandPar = getStandardParameters();


            int CatID = 0;

            SqlParameter spCatID = null;
            SqlParameter spbra = null;
            SqlParameter spActive = null;
            string x = Request["CatID"].ToString();
            if (x == "")
            {
                spCatID = new SqlParameter("@CatID", DBNull.Value);
            }

            else
            {
                CatID = Convert.ToInt32(x);
                spCatID = new SqlParameter("@CatID", CatID);

            }
            int bra = 0;
            string b = Request["bra"].ToString();
            if (b == "")
            {
                spbra = new SqlParameter("@bra", DBNull.Value);
            }
            else
            {
                bra = Convert.ToInt32(b);
                spbra = new SqlParameter("@bra", bra);
            }
            int Active = 0;
            string a = Request["Active"].ToString();
            if (a == "")
            {
                spActive = new SqlParameter("@Active", DBNull.Value);
            }
            else
            {
                Active = Convert.ToInt32(a);
                spActive = new SqlParameter("@Active", Active);
            }

            ReportInfo Rep = OpenReport("PRpt_def_SiteEng");

            var query = db.Database.SqlQuery<PProc_Prnt_def_SiteEngineer_Result>("execute " + Rep.dataSource + "  @comp, @CompNameA, @CompNameE, @BraNameA, @BraNameE, @LoginUser,@CatID,@bra,@Active",
                 StandPar.spComCode, StandPar.spComNameA, StandPar.spComNameE, StandPar.spBraNameA, StandPar.braNameE, StandPar.spLoginUser, spCatID, spbra, spActive).ToList();

            BindReport(Rep.reportName, query);
            return query;
        }
        public IEnumerable<PProc_Prnt_def_Activity_Result> PRpt_def_Activity()
        {
            ReportStandardParameters StandPar = getStandardParameters();
            SqlParameter spActive = null;
            int Active = 0;
            string a = Request["ActID"].ToString();
            if (a == "")
            {
                spActive = new SqlParameter("@ActID", DBNull.Value);
            }
            else
            {
                Active = Convert.ToInt32(a);
                spActive = new SqlParameter("@ActID", Active);
            }


            ReportInfo Rep = OpenReport("PRpt_def_Activity");

            var query = db.Database.SqlQuery<PProc_Prnt_def_Activity_Result>("execute " + Rep.dataSource + "  @comp, @CompNameA, @CompNameE, @BraNameA, @BraNameE, @LoginUser,@ActID",
                 StandPar.spComCode, StandPar.spComNameA, StandPar.spComNameE, StandPar.spBraNameA, StandPar.braNameE, StandPar.spLoginUser, spActive).ToList();

            BindReport(Rep.reportName, query);
            return query;
        }
        public IEnumerable<PProc_Prnt_def_Equipment_Result> PRpt_def_Equipment()
        {
            ReportStandardParameters StandPar = getStandardParameters();
            int CatID = 0;

            SqlParameter spCatID = null;
            SqlParameter spbra = null;
            SqlParameter spActive = null;
            string x = Request["CatID"].ToString();
            if (x == "")
            {
                spCatID = new SqlParameter("@CatID", DBNull.Value);
            }

            else
            {
                CatID = Convert.ToInt32(x);
                spCatID = new SqlParameter("@CatID", CatID);

            }
            int bra = 0;
            string b = Request["bra"].ToString();
            if (b == "")
            {
                spbra = new SqlParameter("@bra", DBNull.Value);
            }
            else
            {
                bra = Convert.ToInt32(b);
                spbra = new SqlParameter("@bra", bra);
            }
            int Active = 0;
            string a = Request["Active"].ToString();
            if (a == "")
            {
                spActive = new SqlParameter("@Active", DBNull.Value);
            }
            else
            {
                Active = Convert.ToInt32(a);
                spActive = new SqlParameter("@Active", Active);
            }
            ReportInfo Rep = OpenReport("PRpt_def_Equipment");
            var query = db.Database.SqlQuery<PProc_Prnt_def_Equipment_Result>("execute " + Rep.dataSource + "  @comp, @CompNameA, @CompNameE, @BraNameA, @BraNameE, @LoginUser,@CatID,@bra,@Active",
                 StandPar.spComCode, StandPar.spComNameA, StandPar.spComNameE, StandPar.spBraNameA, StandPar.braNameE, StandPar.spLoginUser, spCatID, spbra, spActive).ToList();

            BindReport(Rep.reportName, query);
            return query;

        }
        public IEnumerable<PProc_Prnt_def_Labor_Result> PRpt_def_Labor()
        {
            ReportStandardParameters StandPar = getStandardParameters();



            SqlParameter spClassID = null;
            SqlParameter spCatID = null;
            SqlParameter spbra = null;
            SqlParameter spActive = null;

            int ClassID = 0;
            string stClass = Request["ClassID"].ToString();
            if (stClass == "")
            {
                spClassID = new SqlParameter("@ClassID", DBNull.Value);
            }

            else
            {
                ClassID = Convert.ToInt32(stClass);
                spClassID = new SqlParameter("@ClassID", ClassID);

            }

            int CatID = 0;
            string stCat = Request["CatID"].ToString();
            if (stCat == "")
            {
                spCatID = new SqlParameter("@CatID", DBNull.Value);
            }

            else
            {
                CatID = Convert.ToInt32(stCat);
                spCatID = new SqlParameter("@CatID", CatID);

            }
            int bra = 0;
            string stbra = Request["bra"].ToString();
            if (stbra == "")
            {
                spbra = new SqlParameter("@bra", DBNull.Value);
            }
            else
            {
                bra = Convert.ToInt32(stbra);
                spbra = new SqlParameter("@bra", bra);
            }
            int Active = 0;
            string stActive = Request["Active"].ToString();
            if (stActive == "")
            {
                spActive = new SqlParameter("@Active", DBNull.Value);
            }
            else
            {
                Active = Convert.ToInt32(stActive);
                spActive = new SqlParameter("@Active", Active);
            }

            ReportInfo Rep = OpenReport("PRpt_def_Labor");

            var query = db.Database.SqlQuery<PProc_Prnt_def_Labor_Result>("execute " + Rep.dataSource + "  @comp, @CompNameA, @CompNameE, @BraNameA, @BraNameE, @LoginUser,@ClassID,@CatID,@bra,@Active",
                 StandPar.spComCode, StandPar.spComNameA, StandPar.spComNameE, StandPar.spBraNameA, StandPar.braNameE, StandPar.spLoginUser, spClassID, spCatID, spbra, spActive).ToList();

            BindReport(Rep.reportName, query);
            return query;
        }
        public IEnumerable<PProc_Prnt_sls_OfferSubmittals_Result> PRep_sls_OfferSubmittals()
        {
            ReportStandardParameters StandPar = getStandardParameters();
            SqlParameter spOfferid = null;

            int Offerid = 0;
            string x = Request["Offerid"].ToString();
            if (x == "")
            {
                spOfferid = new SqlParameter("@Offerid", DBNull.Value);
            }
            else
            {
                Offerid = Convert.ToInt32(x);
                spOfferid = new SqlParameter("@Offerid", Offerid);
            }

            ReportInfo Rep = OpenReport("PRep_sls_OfferSubmittals");
            string _Query = "execute PProc_Prnt_sls_OfferSubmittals " +
                "@comp = '" + StandPar.spComCode.Value + "'" +
                ", @CompNameA = '" + StandPar.spComNameA.Value + "'" +
                ", @CompNameE = '" + StandPar.spComNameE.Value + "'" +
                ", @BraNameA = '" + StandPar.spBraNameA.Value + "'" +
                ", @BraNameE = '" + StandPar.braNameE.Value + "'" +
                ", @LoginUser = '" + StandPar.spLoginUser.Value + "'" +
                ",@Offerid = " + spOfferid.Value;
            var query = db.Database.SqlQuery<PProc_Prnt_sls_OfferSubmittals_Result>(_Query).ToList();

            BindReport(Rep.reportName, query);
            return query;
        }
        public IEnumerable<PProc_Rep_sub_ProductionProject_Result> PRep_sub_ProductionProject()
        {
            ReportStandardParameters StandPar = getStandardParameters();

            
            SqlParameter spFromDate = null;
            SqlParameter spToDate = null;
            SqlParameter spSubID = null;
            SqlParameter spContrId = null;
            SqlParameter spSoId = null;
            SqlParameter spProjectID = null;
            SqlParameter spPhaseid = null;
            SqlParameter spBraCode = null;

            int BraCode = 0;
            string stBraCode = Request["BraCode"].ToString();
            if (stBraCode == "")
            {
                spBraCode = new SqlParameter("@BraCode", DBNull.Value);
            }

            else
            {
                BraCode = Convert.ToInt32(stBraCode);
                spBraCode = new SqlParameter("@BraCode", BraCode);

            }

            string FromDate = null;
            string stFromDate = Request["FromDate"].ToString();
            if (stFromDate == "")
            {
                spFromDate = new SqlParameter("@FromDate", DBNull.Value);
            }

            else
            {
                FromDate = (stFromDate);
                spFromDate = new SqlParameter("@FromDate", FromDate);

            }
            string ToDate = null;
            string stToDate = Request["ToDate"].ToString();
            if (stToDate == "")
            {
                spToDate = new SqlParameter("@ToDate", DBNull.Value);
            }
            else
            {
                ToDate = (stToDate);
                spToDate = new SqlParameter("@ToDate", ToDate);
            }


            int SubID = 0;
            string stSubID = Request["SubID"].ToString();
            if (stSubID == "")
            {
                spSubID = new SqlParameter("@SubID", DBNull.Value);
            }

            else
            {
                SubID = Convert.ToInt32(stSubID);
                spSubID = new SqlParameter("@SubID", SubID);

            }

            int ContrId = 0;
            string stContrId = Request["ContrId"].ToString();
            if (stContrId == "")
            {
                spContrId = new SqlParameter("@ContrId ", DBNull.Value);
            }
            else
            {
                ContrId = Convert.ToInt32(stContrId);
                spContrId = new SqlParameter("@ContrId ", ContrId);
            }

            int SoId = 0;
            string stSoId = Request["SoId"].ToString();
            if (stSoId == "")
            {
                spSoId = new SqlParameter("@SoId", DBNull.Value);
            }
            else
            {
                SoId = Convert.ToInt32(stSoId);
                spSoId = new SqlParameter("@SoId", SoId);
            }


            int ProjectID = 0;
            string stProjectID = Request["ProjectID"].ToString();
            if (stProjectID == "")
            {
                spProjectID = new SqlParameter("@ProjectID", DBNull.Value);
            }
            else
            {
                ProjectID = Convert.ToInt32(stProjectID);
                spProjectID = new SqlParameter("@ProjectID", ProjectID);
            }

            int Phaseid = 0;
            string stPhaseid = Request["Phaseid"].ToString();
            if (stPhaseid == "")
            {
                spPhaseid = new SqlParameter("@Phaseid", DBNull.Value);
            }
            else
            {
                Phaseid = Convert.ToInt32(stPhaseid);
                spPhaseid = new SqlParameter("@Phaseid", Phaseid);
            }


            ReportInfo Rep = OpenReport("PRep_sub_ProductionProject");

            string _Query = @" execute " + Rep.dataSource +
              " @comp = '" + StandPar.spComCode.Value + "', " +
              " @CompNameA = '" + StandPar.spComNameA.Value + "'," +
              " @CompNameE = '" + StandPar.spComNameE.Value + "'," +
              " @BraNameA = '" + StandPar.spBraNameA.Value + "'," +
              " @BraNameE = '" + StandPar.braNameE.Value + "'," +
              " @LoginUser = '" + StandPar.spLoginUser.Value + "'," +
              " @BraCode = '" + spBraCode.Value + "'," +
              " @FromDate = '" + spFromDate.Value + "'," +
              " @ToDate = '" + spToDate.Value + "'," +
              " @SubID = '" + spSubID.Value + "'," +
              " @ContrId = '" + spContrId.Value + "'," +
              " @SoId = '" + spSoId.Value + "'," +
              " @ProjectID = '" + spProjectID.Value + "'," +
              " @Phaseid = '" + spPhaseid.Value + "'";

            var query = db.Database.SqlQuery<PProc_Rep_sub_ProductionProject_Result>(_Query).ToList();

            BindReport(Rep.reportName, query);
            return query;
        }
        public IEnumerable<PProc_Rep_sub_ProductionPhase_Result> Rep_sub_ProductionPhase()
        {
            ReportStandardParameters StandPar = getStandardParameters();



            SqlParameter spBraCode = null;
            SqlParameter spFromDate = null;
            SqlParameter spToDate = null;
            SqlParameter spSubID = null;
            SqlParameter spContrId = null;
            SqlParameter spSoId = null;
            SqlParameter spProjectID = null;
            SqlParameter spPhaseid = null;


            int BraCode = 0;
            string stBraCode = Request["BraCode"].ToString();
            if (stBraCode == "")
            {
                spBraCode = new SqlParameter("@BraCode", DBNull.Value);
            }

            else
            {
                BraCode = Convert.ToInt32(stBraCode);
                spBraCode = new SqlParameter("@BraCode", BraCode);

            }

            string FromDate = null;
            string stFromDate = Request["FromDate"].ToString();
            if (stFromDate == "")
            {
                spFromDate = new SqlParameter("@FromDate", DBNull.Value);
            }

            else
            {
                FromDate = (stFromDate);
                spFromDate = new SqlParameter("@FromDate", FromDate);

            }
            string ToDate = null;
            string stToDate = Request["ToDate"].ToString();
            if (stToDate == "")
            {
                spToDate = new SqlParameter("@ToDate", DBNull.Value);
            }
            else
            {
                ToDate = (stToDate);
                spToDate = new SqlParameter("@ToDate", ToDate);
            }


            int SubID = 0;
            string stSubID = Request["SubID"].ToString();
            if (stSubID == "")
            {
                spSubID = new SqlParameter("@SubID", DBNull.Value);
            }

            else
            {
                SubID = Convert.ToInt32(stSubID);
                spSubID = new SqlParameter("@SubID", SubID);

            }

            int ContrId = 0;
            string stContrId = Request["ContrId"].ToString();
            if (stContrId == "")
            {
                spContrId = new SqlParameter("@ContrId", DBNull.Value);
            }
            else
            {
                ContrId = Convert.ToInt32(stContrId);
                spContrId = new SqlParameter("@ContrId", ContrId);
            }

            int SoId = 0;
            string stSoId = Request["SoId"].ToString();
            if (stSoId == "")
            {
                spSoId = new SqlParameter("@SoId", DBNull.Value);
            }
            else
            {
                SoId = Convert.ToInt32(stSoId);
                spSoId = new SqlParameter("@SoId", SoId);
            }


            int ProjectID = 0;
            string stProjectID = Request["ProjectID"].ToString();
            if (stProjectID == "")
            {
                spProjectID = new SqlParameter("@ProjectID", DBNull.Value);
            }
            else
            {
                ProjectID = Convert.ToInt32(stProjectID);
                spProjectID = new SqlParameter("@ProjectID", ProjectID);
            }

            int Phaseid = 0;
            string stPhaseid = Request["Phaseid"].ToString();
            if (stPhaseid == "")
            {
                spPhaseid = new SqlParameter("@Phaseid", DBNull.Value);
            }
            else
            {
                Phaseid = Convert.ToInt32(stPhaseid);
                spPhaseid = new SqlParameter("@Phaseid", Phaseid);
            }


            ReportInfo Rep = OpenReport("Rep_sub_ProductionPhase");


            string _Query = @" execute " + Rep.dataSource +
              " @comp = '" + StandPar.spComCode.Value + "', " +
              " @CompNameA = '" + StandPar.spComNameA.Value + "'," +
              " @CompNameE = '" + StandPar.spComNameE.Value + "'," +
              " @BraNameA = '" + StandPar.spBraNameA.Value + "'," +
              " @BraNameE = '" + StandPar.braNameE.Value + "'," +
              " @LoginUser = '" + StandPar.spLoginUser.Value + "'," +
              " @BraCode = '" + spBraCode.Value + "'," +
              " @FromDate = '" + spFromDate.Value + "'," +
              " @ToDate = '" + spToDate.Value + "'," +
              " @SubID = '" + spSubID.Value + "'," +
              " @ContrId = '" + spContrId.Value + "'," +
              " @SoId = '" + spSoId.Value + "'," +
              " @ProjectID = '" + spProjectID.Value + "'," +
              " @Phaseid = '" + spPhaseid.Value + "'";

            var query = db.Database.SqlQuery<PProc_Rep_sub_ProductionPhase_Result>(_Query).ToList();

            BindReport(Rep.reportName, query);
            return query;
        }
        public IEnumerable<PProc_Rep_sub_ProductionActivity_Result> Rep_sub_ProductionActivity()
        {
            ReportStandardParameters StandPar = getStandardParameters();



            SqlParameter spBraCode = null;
            SqlParameter spFromDate = null;
            SqlParameter spToDate = null;
            SqlParameter spSubID = null;
            SqlParameter spContrId = null;
            SqlParameter spSoId = null;
            SqlParameter spProjectID = null;
            SqlParameter spPhaseid = null;


            int BraCode = 0;
            string stBraCode = Request["BraCode"].ToString();
            if (stBraCode == "")
            {
                spBraCode = new SqlParameter("@BraCode", DBNull.Value);
            }

            else
            {
                BraCode = Convert.ToInt32(stBraCode);
                spBraCode = new SqlParameter("@BraCode", BraCode);

            }

            string FromDate = null;
            string stFromDate = Request["FromDate"].ToString();
            if (stFromDate == "")
            {
                spFromDate = new SqlParameter("@FromDate", DBNull.Value);
            }

            else
            {
                FromDate = (stFromDate);
                spFromDate = new SqlParameter("@FromDate", FromDate);

            }
            string ToDate = null;
            string stToDate = Request["ToDate"].ToString();
            if (stToDate == "")
            {
                spToDate = new SqlParameter("@ToDate", DBNull.Value);
            }
            else
            {
                ToDate = (stToDate);
                spToDate = new SqlParameter("@ToDate", ToDate);
            }


            int SubID = 0;
            string stSubID = Request["SubID"].ToString();
            if (stSubID == "")
            {
                spSubID = new SqlParameter("@SubID", DBNull.Value);
            }

            else
            {
                SubID = Convert.ToInt32(stSubID);
                spSubID = new SqlParameter("@SubID", SubID);

            }

            int ContrId = 0;
            string stContrId = Request["ContrId"].ToString();
            if (stContrId == "")
            {
                spContrId = new SqlParameter("@ContrId", DBNull.Value);
            }
            else
            {
                ContrId = Convert.ToInt32(stContrId);
                spContrId = new SqlParameter("@ContrId", ContrId);
            }

            int SoId = 0;
            string stSoId = Request["SoId"].ToString();
            if (stSoId == "")
            {
                spSoId = new SqlParameter("@SoId", DBNull.Value);
            }
            else
            {
                SoId = Convert.ToInt32(stSoId);
                spSoId = new SqlParameter("@SoId", SoId);
            }


            int ProjectID = 0;
            string stProjectID = Request["ProjectID"].ToString();
            if (stProjectID == "")
            {
                spProjectID = new SqlParameter("@ProjectID", DBNull.Value);
            }
            else
            {
                ProjectID = Convert.ToInt32(stProjectID);
                spProjectID = new SqlParameter("@ProjectID", ProjectID);
            }

            int Phaseid = 0;
            string stPhaseid = Request["Phaseid"].ToString();
            if (stPhaseid == "")
            {
                spPhaseid = new SqlParameter("@Phaseid", DBNull.Value);
            }
            else
            {
                Phaseid = Convert.ToInt32(stPhaseid);
                spPhaseid = new SqlParameter("@Phaseid", Phaseid);
            }


            ReportInfo Rep = OpenReport("Rep_sub_ProductionActivity");

            string _Query = @" execute " + Rep.dataSource +
               " @comp = '" + StandPar.spComCode.Value + "', " +
               " @CompNameA = '" + StandPar.spComNameA.Value + "'," +
               " @CompNameE = '" + StandPar.spComNameE.Value + "'," +
               " @BraNameA = '" + StandPar.spBraNameA.Value + "'," +
               " @BraNameE = '" + StandPar.braNameE.Value + "'," +
               " @LoginUser = '" + StandPar.spLoginUser.Value + "'," +
               " @BraCode = '" + spBraCode.Value + "'," +
               " @FromDate = '" + spFromDate.Value + "'," +
               " @ToDate = '" + spToDate.Value + "'," +
               " @SubID = '" + spSubID.Value + "'," +
               " @ContrId = '" + spContrId.Value + "'," +
               " @SoId = '" + spSoId.Value + "'," +
               " @ProjectID = '" + spProjectID.Value + "'," +
               " @Phaseid = '" + spPhaseid.Value + "'";

            var query = db.Database.SqlQuery<PProc_Rep_sub_ProductionActivity_Result>(_Query).ToList();

            BindReport(Rep.reportName, query);
            return query;


        }
        public IEnumerable<PProc_Rep_sub_ActivityContract_Result> Rep_sub_ActivityContract()
        {


            ReportStandardParameters StandPar = getStandardParameters();


            SqlParameter spBraCode = null;
            SqlParameter spFromDate = null;
            SqlParameter spToDate = null;
            SqlParameter spSubID = null;
            SqlParameter spContrNo = null;
            SqlParameter spSono = null;
            SqlParameter spProjectID = null;
            SqlParameter spPhaseid = null;

            string stBarID = Request["braCode"].ToString();
            int branCode = Convert.ToInt32(stBarID);
            spBraCode = new SqlParameter("@BraCode", branCode);


            string FromDate = null;
            string stFromDate = Request["FromDate"].ToString();
            if (stFromDate == "")
            {
                spFromDate = new SqlParameter("@FromDate", DBNull.Value);
            }

            else
            {
                FromDate = (stFromDate);
                spFromDate = new SqlParameter("@FromDate", FromDate);

            }
            string ToDate = null;
            string stToDate = Request["ToDate"].ToString();
            if (stToDate == "")
            {
                spToDate = new SqlParameter("@ToDate", DBNull.Value);
            }
            else
            {
                ToDate = (stToDate);
                spToDate = new SqlParameter("@ToDate", ToDate);
            }


            int SubID = 0;
            string stSubID = Request["SubID"].ToString();
            if (stSubID == "")
            {
                spSubID = new SqlParameter("@SubID", DBNull.Value);
            }

            else
            {
                SubID = Convert.ToInt32(stSubID);
                spSubID = new SqlParameter("@SubID", SubID);

            }

            int ContrNo = 0;
            string stContrNo = Request["ContrNo"].ToString();
            if (stContrNo == "")
            {
                spContrNo = new SqlParameter("@ContrNo", DBNull.Value);
            }
            else
            {
                ContrNo = Convert.ToInt32(stContrNo);
                spContrNo = new SqlParameter("@ContrNo", ContrNo);
            }

            string Sono ="";
            string stSono = Request["Sono"].ToString();
            if (stSono == "")
            {
                spSono = new SqlParameter("@Sono","");
            }
            else
            {
                //Sono = Convert.ToInt32(stSono);
                spSono = new SqlParameter("@Sono", Sono);
            }


            int ProjectID = 0;
            string stProjectID = Request["ProjectID"].ToString();
            if (stProjectID == "")
            {
                spProjectID = new SqlParameter("@ProjectID", DBNull.Value);
            }
            else
            {
                ProjectID = Convert.ToInt32(stProjectID);
                spProjectID = new SqlParameter("@ProjectID", ProjectID);
            }

            int Phaseid = 0;
            string stPhaseid = Request["Phaseid"].ToString();
            if (stPhaseid == "")
            {
                spPhaseid = new SqlParameter("@Phaseid", DBNull.Value);
            }
            else
            {
                Phaseid = Convert.ToInt32(stPhaseid);
                spPhaseid = new SqlParameter("@Phaseid", Phaseid);
            }


            ReportInfo Rep = OpenReport("Rep_sub_ActivityContract");

            string _Query = @" execute " + Rep.dataSource +
                " @comp = '" + StandPar.spComCode.Value + "', " +
                " @CompNameA = '" + StandPar.spComNameA.Value + "'," +
                " @CompNameE = '" + StandPar.spComNameE.Value + "'," +
                " @BraNameA = '" + StandPar.spBraNameA.Value + "'," +
                " @BraNameE = '" + StandPar.braNameE.Value + "'," +
                " @LoginUser = '" + StandPar.spLoginUser.Value + "'," +
                " @BraCode = '" + spBraCode.Value + "'," +
                " @FromDate = '" + spFromDate.Value + "'," +
                " @ToDate = '" + spToDate.Value + "'," +
                " @SubID = '" + spSubID.Value + "'," +
                " @ContrNo = '" + spContrNo.Value + "'," +
                " @Sono = '" + stSono + "'," +
                " @ProjectID = '" + spProjectID.Value + "'," +
                " @Phaseid = '" + spPhaseid.Value + "'";


            var query = db.Database.SqlQuery<PProc_Rep_sub_ActivityContract_Result>(_Query).ToList();

            BindReport(Rep.reportName, query);
            return query;
        }
        public IEnumerable<PProc_Rep_sub_ActivityServiceOrder_Result> Rep_sub_ActivityServiceOrder()
        {
            ReportStandardParameters StandPar = getStandardParameters();

            SqlParameter spBraCode = null;
            SqlParameter spFromDate = null;
            SqlParameter spToDate = null;
            SqlParameter spSubID = null;
            SqlParameter spContrNo = null;
            SqlParameter spSono = null;
            SqlParameter spProjectID = null;
            SqlParameter spPhaseid = null;

            string stBarID = Request["braCode"].ToString();
            int branCode = Convert.ToInt32(stBarID);
            spBraCode = new SqlParameter("@BraCode", branCode);


            string FromDate = null;
            string stFromDate = Request["FromDate"].ToString();
            if (stFromDate == "")
            {
                spFromDate = new SqlParameter("@FromDate", DBNull.Value);
            }

            else
            {
                FromDate = (stFromDate);
                spFromDate = new SqlParameter("@FromDate", FromDate);

            }
            string ToDate = null;
            string stToDate = Request["ToDate"].ToString();
            if (stToDate == "")
            {
                spToDate = new SqlParameter("@ToDate", DBNull.Value);
            }
            else
            {
                ToDate = (stToDate);
                spToDate = new SqlParameter("@ToDate", ToDate);
            }


            int SubID = 0;
            string stSubID = Request["SubID"].ToString();
            if (stSubID == "")
            {
                spSubID = new SqlParameter("@SubID", DBNull.Value);
            }

            else
            {
                SubID = Convert.ToInt32(stSubID);
                spSubID = new SqlParameter("@SubID", SubID);

            }

            int ContrNo = 0;
            string stContrNo = Request["ContrNo"].ToString();
            if (stContrNo == "")
            {
                spContrNo = new SqlParameter("@ContrNo", DBNull.Value);
            }
            else
            {
                ContrNo = Convert.ToInt32(stContrNo);
                spContrNo = new SqlParameter("@ContrNo", ContrNo);
            }

            int Sono = 0;
            string stSono = Request["Sono"].ToString();
            if (stSono == "")
            {
                spSono = new SqlParameter("@Sono", DBNull.Value);
            }
            else
            {
                Sono = Convert.ToInt32(stSono);
                spSono = new SqlParameter("@Sono", Sono);
            }


            int ProjectID = 0;
            string stProjectID = Request["ProjectID"].ToString();
            if (stProjectID == "")
            {
                spProjectID = new SqlParameter("@ProjectID", DBNull.Value);
            }
            else
            {
                ProjectID = Convert.ToInt32(stProjectID);
                spProjectID = new SqlParameter("@ProjectID", ProjectID);
            }

            int Phaseid = 0;
            string stPhaseid = Request["Phaseid"].ToString();
            if (stPhaseid == "")
            {
                spPhaseid = new SqlParameter("@Phaseid", DBNull.Value);
            }
            else
            {
                Phaseid = Convert.ToInt32(stPhaseid);
                spPhaseid = new SqlParameter("@Phaseid", Phaseid);
            }


            ReportInfo Rep = OpenReport("Rep_sub_ActivityServiceOrder");

            string _Query = @" execute " + Rep.dataSource +
                " @comp = '" + StandPar.spComCode.Value + "', " +
                " @CompNameA = '" + StandPar.spComNameA.Value + "'," +
                " @CompNameE = '" + StandPar.spComNameE.Value + "'," +
                " @BraNameA = '" + StandPar.spBraNameA.Value + "'," +
                " @BraNameE = '" + StandPar.braNameE.Value + "'," +
                " @LoginUser = '" + StandPar.spLoginUser.Value + "'," +
                " @BraCode = '" + spBraCode.Value + "'," +
                " @FromDate = '" + spFromDate.Value + "'," +
                " @ToDate = '" + spToDate.Value + "'," +
                " @SubID = '" + spSubID.Value + "'," +
                " @ContrNo = '" + spContrNo.Value + "'," +
                " @Sono = '" + stSono + "'," +
                " @ProjectID = '" + spProjectID.Value + "'," +
                " @Phaseid = '" + spPhaseid.Value + "'";



            var query = db.Database.SqlQuery<PProc_Rep_sub_ActivityServiceOrder_Result>(_Query).ToList();

            BindReport(Rep.reportName, query);
            return query;
        }
        public IEnumerable<PProc_Rep_sub_ActivityProduction_Result> Rep_sub_ActivityProduction()
        {
            ReportStandardParameters StandPar = getStandardParameters();



            SqlParameter spBraCode = null;
            SqlParameter spFromDate = null;
            SqlParameter spToDate = null;
            SqlParameter spSubID = null;
            SqlParameter spContrNo = null;
            SqlParameter spSono = null;
            SqlParameter spProjectID = null;
            SqlParameter spPhaseid = null;

            string stBarID = Request["braCode"].ToString();
            int branCode = Convert.ToInt32(stBarID);
            spBraCode = new SqlParameter("@BraCode", branCode);


            string FromDate = null;
            string stFromDate = Request["FromDate"].ToString();
            if (stFromDate == "")
            {
                spFromDate = new SqlParameter("@FromDate", DBNull.Value);
            }

            else
            {
                FromDate = (stFromDate);
                spFromDate = new SqlParameter("@FromDate", FromDate);

            }
            string ToDate = null;
            string stToDate = Request["ToDate"].ToString();
            if (stToDate == "")
            {
                spToDate = new SqlParameter("@ToDate", DBNull.Value);
            }
            else
            {
                ToDate = (stToDate);
                spToDate = new SqlParameter("@ToDate", ToDate);
            }


            int SubID = 0;
            string stSubID = Request["SubID"].ToString();
            if (stSubID == "")
            {
                spSubID = new SqlParameter("@SubID", DBNull.Value);
            }

            else
            {
                SubID = Convert.ToInt32(stSubID);
                spSubID = new SqlParameter("@SubID", SubID);

            }

            int ContrNo = 0;
            string stContrNo = Request["ContrNo"].ToString();
            if (stContrNo == "")
            {
                spContrNo = new SqlParameter("@ContrNo", DBNull.Value);
            }
            else
            {
                ContrNo = Convert.ToInt32(stContrNo);
                spContrNo = new SqlParameter("@ContrNo", ContrNo);
            }

            int Sono = 0;
            string stSono = Request["Sono"].ToString();
            if (stSono == "")
            {
                spSono = new SqlParameter("@Sono", DBNull.Value);
            }
            else
            {
                Sono = Convert.ToInt32(stSono);
                spSono = new SqlParameter("@Sono", Sono);
            }


            int ProjectID = 0;
            string stProjectID = Request["ProjectID"].ToString();
            if (stProjectID == "")
            {
                spProjectID = new SqlParameter("@ProjectID", DBNull.Value);
            }
            else
            {
                ProjectID = Convert.ToInt32(stProjectID);
                spProjectID = new SqlParameter("@ProjectID", ProjectID);
            }

            int Phaseid = 0;
            string stPhaseid = Request["Phaseid"].ToString();
            if (stPhaseid == "")
            {
                spPhaseid = new SqlParameter("@Phaseid", DBNull.Value);
            }
            else
            {
                Phaseid = Convert.ToInt32(stPhaseid);
                spPhaseid = new SqlParameter("@Phaseid", Phaseid);
            }


            ReportInfo Rep = OpenReport("Rep_sub_ActivityProduction");

            string _Query = @" execute " + Rep.dataSource +
                " @comp = '" + StandPar.spComCode.Value + "', " +
                " @CompNameA = '" + StandPar.spComNameA.Value + "'," +
                " @CompNameE = '" + StandPar.spComNameE.Value + "'," +
                " @BraNameA = '" + StandPar.spBraNameA.Value + "'," +
                " @BraNameE = '" + StandPar.braNameE.Value + "'," +
                " @LoginUser = '" + StandPar.spLoginUser.Value + "'," +
                " @BraCode = '" + spBraCode.Value + "'," +
                " @FromDate = '" + spFromDate.Value + "'," +
                " @ToDate = '" + spToDate.Value + "'," +
                " @SubID = '" + spSubID.Value + "'," +
                " @ContrNo = '" + spContrNo.Value + "'," +
                " @Sono = '" + stSono + "'," +
                " @ProjectID = '" + spProjectID.Value + "'," +
                " @Phaseid = '" + spPhaseid.Value + "'";



            var query = db.Database.SqlQuery<PProc_Rep_sub_ActivityProduction_Result>(_Query).ToList();

            BindReport(Rep.reportName, query);
            return query;
        }
        public IEnumerable<PProc_Rep_sub_SubcontractList_Result> Rep_sub_SubcontractList()
        {
            ReportStandardParameters StandPar = getStandardParameters();


            SqlParameter spBraCode = null;
            SqlParameter spFromSubCode = null;
            SqlParameter spToSubCode = null;
            SqlParameter spScopeId = null;
            SqlParameter spFromEval = null;
            SqlParameter sptoEval = null;


            string stBarID = Request["braCode"].ToString();
            int branCode = Convert.ToInt32(1);
            spBraCode = new SqlParameter("@BraCode", branCode);


            string FromSubCode = null;
            string stFromSubCode = Request["FromSubCode"].ToString();
            if (stFromSubCode == "")
            {
                spFromSubCode = new SqlParameter("@FromSubCode", DBNull.Value);
            }

            else
            {
                FromSubCode = (stFromSubCode);
                spFromSubCode = new SqlParameter("@FromSubCode", FromSubCode);
            }
            
            string ToSubCode = null;
            string stToSubCode = Request["ToSubCode"].ToString();
            if (stToSubCode == "")
            {
                spToSubCode = new SqlParameter("@ToSubCode", DBNull.Value);
            }
            else
            {
                ToSubCode = (stToSubCode);
                spToSubCode = new SqlParameter("@ToSubCode", ToSubCode);
            }
            
            int ScopeId = 0;
            string stScopeId = Request["ScopeId"].ToString();
            if (stScopeId == "")
            {
                spScopeId = new SqlParameter("@ScopeId", DBNull.Value);
            }

            else
            {
                ScopeId = Convert.ToInt32(stScopeId);
                spScopeId = new SqlParameter("@ScopeId", ScopeId);

            }




            string FromEval = null;
            string stFromEval = Request["FromEval"].ToString();
            if (stFromEval == "")
            {
                spFromEval = new SqlParameter("@FromEval", DBNull.Value);
            }
            else
            {
                FromEval = (stFromEval);
                spFromEval = new SqlParameter("@FromEval", FromEval);
            }




            string toEval = null;
            string sttoEval = Request["toEval"].ToString();
            if (sttoEval == "")
            {
                sptoEval = new SqlParameter("@toEval", DBNull.Value);
            }
            else
            {
                toEval = (sttoEval);
                sptoEval = new SqlParameter("@toEval", toEval);
            }



            //------------------------------------------------------------------------------------------------


            ReportInfo Rep = OpenReport("Rep_sub_SubcontractList");

            string _Query = @" execute " + Rep.dataSource +
                " @comp = '" + StandPar.spComCode.Value + "', " +
                " @CompNameA = '" + StandPar.spComNameA.Value + "'," +
                " @CompNameE = '" + StandPar.spComNameE.Value + "'," +
                " @BraNameA = '" + StandPar.spBraNameA.Value + "'," +
                " @BraNameE = '" + StandPar.braNameE.Value + "'," +
                " @LoginUser = '" + StandPar.spLoginUser.Value + "'," +
                " @BraCode = '" + spBraCode.Value + "'," +
                " @FromSubCode = '" + spFromSubCode.Value + "'," +
                " @ToSubCode = '" + spToSubCode.Value + "'," +
                " @ScopeId = '" + spScopeId.Value + "'," +
                " @FromEval = '" + spFromEval.Value + "'," +
                " @toEval = '" + sptoEval.Value + "'";



            var query = db.Database.SqlQuery<PProc_Rep_sub_SubcontractList_Result>(_Query).ToList();

            BindReport(Rep.reportName, query);
            return query;
        }

        public IEnumerable<PProc_Rep_Eng_ProjectStatus_Result> PPrnt_Eng_ProjectStatus()
        {
            ReportStandardParameters StandPar = getStandardParameters();

            SqlParameter Bracode = null;
            SqlParameter ToDate = null;           
            SqlParameter FromProjectCode = null;
            SqlParameter ToProjectCode = null;
            SqlParameter EngId = null;
            SqlParameter CatID = null;
            SqlParameter CustId = null;            


            string bracode = Request["braCode"].ToString();
            if (bracode == "")
            { Bracode = new SqlParameter("@BraCode", DBNull.Value); }
            else
            { Bracode = new SqlParameter("@BraCode", Convert.ToInt32(bracode)); }



            string toDate = Request["toDate"];
            if (toDate == "")
            {
                ToDate = new SqlParameter("@ToDate", null);
            }
            else
            {
                ToDate = new SqlParameter("@ToDate", toDate);
            }


                string FromProjCode = Request["FromProjCode"].ToString();
            if (FromProjCode == "")
            {
                FromProjectCode = new SqlParameter("@FromProjectCode", System.Data.SqlTypes.SqlInt32.Null);
            }
            else
            {
                FromProjectCode = new SqlParameter("@FromProjectCode", Convert.ToInt32(FromProjCode));
            }

            string ToProjCode = Request["ToProjCode"].ToString();
            if (ToProjCode == "")
            {
                ToProjectCode = new SqlParameter("@ToProjectCode", System.Data.SqlTypes.SqlInt32.Null);
            }
            else
            {
                ToProjectCode = new SqlParameter("@ToProjectCode", Convert.ToInt32(ToProjCode));
            }
            

            //string stFromProjectCod = Request["FromProjCode"];
            //if (stFromProjectCod == "")
            //{
            //    FromProjectCode = new SqlParameter("@FromProjectCode", DBNull.Value);
            //}

            //else
            //{
            //    FromProjectCode = new SqlParameter("@FromProjectCode", stFromProjectCod);
            //}

            //string stProjectCode = Request["ToProjCode"];
            //if (stProjectCode == "")
            //{
            //    ToProjectCode = new SqlParameter("@ToProjectCode", (object)DBNull.Value);
            //}
            //else
            //{
            //    ToProjectCode = new SqlParameter("@ToProjectCode", stProjectCode);
            //}

            string stEngID = Request["EngID"].ToString();
            if (stEngID == "null")
            {
                EngId = new SqlParameter("@EngId", (object)DBNull.Value);
            }
            else
            {
                int EnID = Convert.ToInt32(stEngID);
                EngId = new SqlParameter("@EngId", EnID);
            }

            string stCatID = Request["CatId"].ToString();
            if (stCatID == "null")
            {
                CatID = new SqlParameter("@CatID", (object)DBNull.Value);
            }
            else
            {
                int CID = int.Parse(stCatID);
                CatID = new SqlParameter("@CatID", CID);
            }

            string stCustid = Request["Custid"].ToString();
            if (stCustid == "null")
            {
                CustId = new SqlParameter("@CustId", (object)DBNull.Value);
            }
            else
            {
                int CusID = Convert.ToInt32(stCustid);
                CustId = new SqlParameter("@CustId", CusID);
            }




            ReportInfo Rep = OpenReport("PPrnt_Eng_ProjectStatus");

            string _Query = @" execute  " + Rep.dataSource +
                " @comp = '" + StandPar.spComCode.Value + "', " +
                " @CompNameA = '" + StandPar.spComNameA.Value + "'," +
                " @CompNameE = '" + StandPar.spComNameE.Value + "'," +
                " @BraNameA = '" + StandPar.spBraNameA.Value + "'," +
                " @BraNameE = '" + StandPar.braNameE.Value + "'," +
                " @LoginUser = '" + StandPar.spLoginUser.Value + "'," +
                " @BraCode = '" + Bracode.Value + "'," +
                " @ToDate = '" + ToDate.Value + "'," +
                " @FromProjectCode = '" + FromProjectCode.Value + "'," +
                " @ToProjectCode = '" + ToProjectCode.Value + "'," +
                " @EngId = " + System.Data.SqlTypes.SqlInt32.Null + "," +
                " @CatID = " + System.Data.SqlTypes.SqlInt32.Null + "," +
                " @CustId = " + System.Data.SqlTypes.SqlInt32.Null + "";




            var query = db.Database.SqlQuery<PProc_Rep_Eng_ProjectStatus_Result>(_Query).ToList();


            // var query = db.Database.SqlQuery<PProc_Rep_Eng_ProjectStatus_Result>

            //("execute " + Rep.dataSource + " @comp, @CompNameA, @CompNameE, @BraNameA, @BraNameE, @LoginUser, @ToDate, @BraCode, @FromProjectCode, @ToProjectCode, @EngId, @CatID, @CustId",
            //StandPar.spComCode, StandPar.spComNameA, StandPar.spComNameE, StandPar.spBraNameA, StandPar.braNameE, StandPar.spLoginUser, ToDate, BraCode, FromProjectCode, ToProjectCode, EngId, CatID, CustId).ToList();


            BindReport(Rep.reportName, query);
            return query;

        }


        #endregion
        #region Slales Reports
        public IEnumerable<PProc_Prnt_sls_OfferSpecification_Result> PPrnt_sls_OfferSpecification()
        {
            ReportStandardParameters StandPar = getStandardParameters();
            SqlParameter spTrID = null;

            int TrID = 0;
            string x = Request["TrID"].ToString();
            if (x == "")
            {
                spTrID = new SqlParameter("@TrID", DBNull.Value);
            }
            else
            {
                TrID = Convert.ToInt32(x);
                spTrID = new SqlParameter("@TrID", TrID);
            }

            ReportInfo Rep = OpenReport("PPrnt_sls_OfferSpecification");
            string _Query = "execute " + Rep.dataSource +
               " @comp = '" + StandPar.spComCode.Value + "'" +
                ", @CompNameA = '" + StandPar.spComNameA.Value + "'" +
                ", @CompNameE = '" + StandPar.spComNameE.Value + "'" +
                ", @BraNameA = '" + StandPar.spBraNameA.Value + "'" +
                ", @BraNameE = '" + StandPar.braNameE.Value + "'" +
                ", @LoginUser = '" + StandPar.spLoginUser.Value + "'" +
                ", @TrID = " + spTrID.Value;
            var query = db.Database.SqlQuery<PProc_Prnt_sls_OfferSpecification_Result>(_Query).ToList();

            BindReport(Rep.reportName, query);
            return query;
        }
        public IEnumerable<PProc_Prnt_sls_Production_Result> PPrnt_sls_Production()
        {
            ReportStandardParameters StandPar = getStandardParameters();
            SqlParameter spTrID = null;

            int TrID = 0;
            string x = Request["TrID"].ToString();
            if (x == "")
            {
                spTrID = new SqlParameter("@TrID", DBNull.Value);
            }
            else
            {
                TrID = Convert.ToInt32(x);
                spTrID = new SqlParameter("@TrID", TrID);
            }

            ReportInfo Rep = OpenReport("PPrnt_sls_Production");
            string _Query = "execute " + Rep.dataSource +
               " @comp = '" + StandPar.spComCode.Value + "'" +
                ", @CompNameA = '" + StandPar.spComNameA.Value + "'" +
                ", @CompNameE = '" + StandPar.spComNameE.Value + "'" +
                ", @BraNameA = '" + StandPar.spBraNameA.Value + "'" +
                ", @BraNameE = '" + StandPar.braNameE.Value + "'" +
                ", @LoginUser = '" + StandPar.spLoginUser.Value + "'" +
                ", @TrID = " + spTrID.Value;
            var query = db.Database.SqlQuery<PProc_Prnt_sls_Production_Result>(_Query).ToList();

            BindReport(Rep.reportName, query);
            return query;
        }
        public IEnumerable<PProc_Prnt_sls_Invoice_Result> PPrnt_sls_Invoice()
        {
            ReportStandardParameters StandPar = getStandardParameters();
            SqlParameter spTrID = null;

            int TrID = 0;
            string x = Request["TrID"].ToString();
            if (x == "")
            {
                spTrID = new SqlParameter("@TrID", DBNull.Value);
            }
            else
            {
                TrID = Convert.ToInt32(x);
                spTrID = new SqlParameter("@TrID", TrID);
            }

            ReportInfo Rep = OpenReport("PPrnt_sls_Invoice");
            string _Query = "execute " + Rep.dataSource +
               " @comp = '" + StandPar.spComCode.Value + "'" +
                ", @CompNameA = '" + StandPar.spComNameA.Value + "'" +
                ", @CompNameE = '" + StandPar.spComNameE.Value + "'" +
                ", @BraNameA = '" + StandPar.spBraNameA.Value + "'" +
                ", @BraNameE = '" + StandPar.braNameE.Value + "'" +
                ", @LoginUser = '" + StandPar.spLoginUser.Value + "'" +
                ", @TrID = " + spTrID.Value;
            var query = db.Database.SqlQuery<PProc_Prnt_sls_Invoice_Result>(_Query).ToList();

            BindReport(Rep.reportName, query);
            return query;
        }

        public IEnumerable<PProc_Prnt_sls_Customercard_Result> PPrnt_Sls_CustomerCard()
        {
            ReportStandardParameters StandPar = getStandardParameters();
            SqlParameter spCustid = null;
            int Custid = 0;
            string a = Request["Custid"].ToString();
            if (a == "")
            {
                spCustid = new SqlParameter("@Custid", DBNull.Value);
            }
            else
            {
                Custid = Convert.ToInt32(a);
                spCustid = new SqlParameter("@Custid", Custid);

            }




            ReportInfo Rep = OpenReport("PPrnt_Sls_CustomerCard");

            var query = db.Database.SqlQuery<PProc_Prnt_sls_Customercard_Result>("execute " + Rep.dataSource + "  @comp, @CompNameA, @CompNameE, @BraNameA, @BraNameE, @LoginUser,@Custid",
                 StandPar.spComCode, StandPar.spComNameA, StandPar.spComNameE, StandPar.spBraNameA, StandPar.braNameE, StandPar.spLoginUser, spCustid).ToList();

            BindReport(Rep.reportName, query);
            return query;
        }
        public IEnumerable<PProc_Prnt_sls_CustomerList_Result> PPrnt_Sls_CustomerList()
        {
            ReportStandardParameters StandPar = getStandardParameters();




            SqlParameter spFromCustNo = null;
            SqlParameter spToCustNo = null;
            SqlParameter spCatID = null;
            SqlParameter spEngID = null;
            SqlParameter spbra = null;
            SqlParameter spActive = null;
            SqlParameter spTemp = null;



            int FromCustNo = 0;
            string stFromCustNo = Request["FromCustNo"].ToString();
            if (stFromCustNo == "")
            {
                spFromCustNo = new SqlParameter("@FromCustNo", DBNull.Value);
            }

            else
            {
                FromCustNo = Convert.ToInt32(stFromCustNo);
                spFromCustNo = new SqlParameter("@FromCustNo", FromCustNo);

            }
            int ToCustNo = 0;
            string stToCustNo = Request["ToCustNo"].ToString();
            if (stToCustNo == "")
            {
                spToCustNo = new SqlParameter("@ToCustNo", DBNull.Value);
            }
            else
            {
                ToCustNo = Convert.ToInt32(stToCustNo);
                spToCustNo = new SqlParameter("@ToCustNo", ToCustNo);
            }


            int CatID = 0;
            string stCatID = Request["CatID"].ToString();
            if (stCatID == "")
            {
                spCatID = new SqlParameter("@CatID", DBNull.Value);
            }
            else
            {
                CatID = Convert.ToInt32(stCatID);
                spCatID = new SqlParameter("@CatID", CatID);
            }


            int EngID = 0;
            string stEngID = Request["EngID"].ToString();
            if (stEngID == "")
            {
                spEngID = new SqlParameter("@EngID", DBNull.Value);
            }
            else
            {
                EngID = Convert.ToInt32(stEngID);
                spEngID = new SqlParameter("@EngID", EngID);
            }


            int Active = 0;
            string stActive = Request["Active"].ToString();
            if (stActive == "")
            {
                spActive = new SqlParameter("@Active", DBNull.Value);
            }
            else
            {
                Active = Convert.ToInt32(stActive);
                spActive = new SqlParameter("@Active", Active);
            }



            int Temp = 0;
            string stTemp = Request["Temp"].ToString();
            if (stTemp == "")
            {
                spTemp = new SqlParameter("@Temp", DBNull.Value);
            }
            else
            {
                Temp = Convert.ToInt32(stTemp);
                spTemp = new SqlParameter("@Temp", Temp);
            }
            int bra = 0;
            string stbra = Request["bra"].ToString();
            if (stbra == "")
            {
                spbra = new SqlParameter("@bra", DBNull.Value);
            }
            else
            {
                bra = Convert.ToInt32(stbra);
                spbra = new SqlParameter("@bra", bra);
            }
            ReportInfo Rep = OpenReport("PPrnt_Sls_CustomerList");

            var query = db.Database.SqlQuery<PProc_Prnt_sls_CustomerList_Result>("execute " + Rep.dataSource + " @comp,@CompNameA,@CompNameE,@BraNameA ,@BraNameE,@LoginUser,@FromCustNo,@ToCustNo,@CatID,@EngID,@bra,@Active,@Temp",
                   StandPar.spComCode, StandPar.spComNameA, StandPar.spComNameE, StandPar.spBraNameA, StandPar.braNameE, StandPar.spLoginUser, spFromCustNo, spToCustNo, spCatID, spEngID, spbra, spActive, spTemp).ToList();

            BindReport(Rep.reportName, query);
            return query;
        }
        public IEnumerable<PProc_Prnt_sls_Itemcard_Result> PPrnt_Sls_ItemCard()
        {
            ReportStandardParameters StandPar = getStandardParameters();
            SqlParameter spItemId = null;
            int ItemId = 0;
            string a = Request["ItemId"].ToString();
            if (a == "")
            {
                spItemId = new SqlParameter("@ItemId", DBNull.Value);
            }
            else
            {
                ItemId = Convert.ToInt32(a);
                spItemId = new SqlParameter("@ItemId", ItemId);

            }




            ReportInfo Rep = OpenReport("PPrnt_Sls_ItemCard");

            var query = db.Database.SqlQuery<PProc_Prnt_sls_Itemcard_Result>("execute " + Rep.dataSource + "  @comp, @CompNameA, @CompNameE, @BraNameA, @BraNameE, @LoginUser,@ItemId",
                 StandPar.spComCode, StandPar.spComNameA, StandPar.spComNameE, StandPar.spBraNameA, StandPar.braNameE, StandPar.spLoginUser, spItemId).ToList();

            BindReport(Rep.reportName, query);
            return query;
        }
        public IEnumerable<PProc_Prnt_sls_ItemList_Result> PPrnt_Sls_ItemList()
        {
            ReportStandardParameters StandPar = getStandardParameters();
            SqlParameter spFromItemNo = null;
            SqlParameter spToItemNo = null;
            SqlParameter spScopeID = null;
            SqlParameter spActive = null;
            SqlParameter spDetail = null;



            string FromItemNo = null;
            string stFromItemNo = Request["FromItemNo"].ToString();
            if (stFromItemNo == "")
            {
                spFromItemNo = new SqlParameter("@FromItemNo", DBNull.Value);
            }

            else
            {
                FromItemNo = (stFromItemNo);
                spFromItemNo = new SqlParameter("@FromItemNo", FromItemNo);

            }
            string ToItemNo = null;
            string stToItemNo = Request["ToItemNo"].ToString();
            if (stToItemNo == "")
            {
                spToItemNo = new SqlParameter("@ToItemNo", DBNull.Value);
            }
            else
            {
                ToItemNo = (stToItemNo);
                spToItemNo = new SqlParameter("@ToItemNo", ToItemNo);
            }


            int ScopeID = 0;
            string stScopeID = Request["ScopeID"].ToString();
            if (stScopeID == "")
            {
                spScopeID = new SqlParameter("@ScopeID", DBNull.Value);
            }
            else
            {
                ScopeID = Convert.ToInt32(stScopeID);
                spScopeID = new SqlParameter("@ScopeID", ScopeID);
            }

            int Active = 0;
            string stActive = Request["Active"].ToString();
            if (stActive == "")
            {
                spActive = new SqlParameter("@Active", DBNull.Value);
            }
            else
            {
                Active = Convert.ToInt32(stActive);
                spActive = new SqlParameter("@Active", Active);
            }



            int Detail = 0;
            string stDetail = Request["Detail"].ToString();
            if (stDetail == "")
            {
                spDetail = new SqlParameter("@Detail", DBNull.Value);
            }
            else
            {
                Detail = Convert.ToInt32(stDetail);
                spDetail = new SqlParameter("@Detail", Detail);
            }
            ReportInfo Rep = OpenReport("PPrnt_Sls_ItemList");

            var query = db.Database.SqlQuery<PProc_Prnt_sls_ItemList_Result>("execute " + Rep.dataSource + " @comp,@CompNameA,@CompNameE,@BraNameA ,@BraNameE,@LoginUser,@FromItemNo,@ToItemNo,@ScopeID,@Active,@Detail",
                   StandPar.spComCode, StandPar.spComNameA, StandPar.spComNameE, StandPar.spBraNameA, StandPar.braNameE, StandPar.spLoginUser, spFromItemNo, spToItemNo, spScopeID, spActive, spDetail).ToList();

            BindReport(Rep.reportName, query);
            return query;
        }
        public IEnumerable<PProc_Rep_sls_Contract_Result> PRep_sls_Contract()
        {
            ReportStandardParameters StandPar = getStandardParameters();
            SqlParameter spFromDate = null;
            SqlParameter spToDate = null;
            SqlParameter spCustId = null;
            SqlParameter spLocId = null;
            SqlParameter spCatID = null;
            SqlParameter spEngID = null;
            SqlParameter Bracode = null;

            string bracode = Request["braCode"].ToString();
            if (bracode == "")
            {
                Bracode = new SqlParameter("@BraCode", DBNull.Value);
            }
            else
            {

                Bracode = new SqlParameter("@BraCode", Convert.ToInt32(bracode));
            }


            int CatID = 0;
            string stCatID = Request["CatID"].ToString();
            if (stCatID == "")
            {
                spCatID = new SqlParameter("@CatID", DBNull.Value);
            }
            else
            {
                CatID = Convert.ToInt32(stCatID);
                spCatID = new SqlParameter("@CatID", CatID);
            }


            int EngID = 0;
            string stEngID = Request["EngID"].ToString();
            if (stEngID == "")
            {
                spEngID = new SqlParameter("@EngID", DBNull.Value);
            }
            else
            {
                EngID = Convert.ToInt32(stEngID);
                spEngID = new SqlParameter("@EngID", EngID);
            }

            string FromDate = null;
            string stFromDate = Request["FromDate"].ToString();
            if (stFromDate == "")
            {
                spFromDate = new SqlParameter("@FromDate", DBNull.Value);
            }

            else
            {
                FromDate = (stFromDate);
                spFromDate = new SqlParameter("@FromDate", FromDate);

            }
            string ToDate = null;
            string stToDate = Request["ToDate"].ToString();
            if (stToDate == "")
            {
                spToDate = new SqlParameter("@ToDate", DBNull.Value);
            }
            else
            {
                ToDate = (stToDate);
                spToDate = new SqlParameter("@ToDate", ToDate);
            }


            int CustId = 0;
            string stCustId = Request["CustId"].ToString();
            if (stCustId == "")
            {
                spCustId = new SqlParameter("@CustId", DBNull.Value);
            }
            else
            {
                CustId = Convert.ToInt32(stCustId);
                spCustId = new SqlParameter("@CustId", CustId);
            }
            int LocId = 0;
            string stLocId = Request["LocId"].ToString();
            if (stLocId == "")
            {
                spLocId = new SqlParameter("@LocId", DBNull.Value);
            }
            else
            {
                LocId = Convert.ToInt32(stLocId);
                spLocId = new SqlParameter("@LocId", LocId);
            }
            ReportInfo Rep = OpenReport("PRep_sls_Contract");

            var query = db.Database.SqlQuery<PProc_Rep_sls_Contract_Result>("execute " + Rep.dataSource + " @comp,@CompNameA,@CompNameE,@BraNameA ,@BraNameE,@LoginUser,@FromDate,@ToDate,@BraCode,@EngId,@CatID,@CustId,@LocId",
                   StandPar.spComCode, StandPar.spComNameA, StandPar.spComNameE, StandPar.spBraNameA, StandPar.braNameE, StandPar.spLoginUser, spFromDate, spToDate, Bracode, spEngID, spCatID, spCustId, spLocId).ToList();

            BindReport(Rep.reportName, query);
            return query;
        }
        public IEnumerable<PProc_Rep_sls_Offer_Result> PRep_sls_Offer()
        {
            ReportStandardParameters StandPar = getStandardParameters();
            SqlParameter spFromDate = null;
            SqlParameter spToDate = null;
            SqlParameter spCustId = null;
            SqlParameter spLocId = null;
            SqlParameter spCatID = null;
            SqlParameter spEngID = null;
            SqlParameter spbra = null;
            SqlParameter spStat = null;
            int branCode = int.Parse(Request["braCode"].ToString());
            spbra = new SqlParameter("@braCode", branCode);
            int CatID = 0;
            string stCatID = Request["CatID"].ToString();
            if (stCatID == "")
            {
                spCatID = new SqlParameter("@CatID", DBNull.Value);
            }
            else
            {
                CatID = Convert.ToInt32(stCatID);
                spCatID = new SqlParameter("@CatID", CatID);
            }


            int EngID = 0;
            string stEngID = Request["EngID"].ToString();
            if (stEngID == "")
            {
                spEngID = new SqlParameter("@EngID", DBNull.Value);
            }
            else
            {
                EngID = Convert.ToInt32(stEngID);
                spEngID = new SqlParameter("@EngID", EngID);
            }

            string FromDate = null;
            string stFromDate = Request["FromDate"].ToString();
            if (stFromDate == "")
            {
                spFromDate = new SqlParameter("@FromDate", DBNull.Value);
            }

            else
            {
                FromDate = (stFromDate);
                spFromDate = new SqlParameter("@FromDate", FromDate);

            }
            string ToDate = null;
            string stToDate = Request["ToDate"].ToString();
            if (stToDate == "")
            {
                spToDate = new SqlParameter("@ToDate", DBNull.Value);
            }
            else
            {
                ToDate = (stToDate);
                spToDate = new SqlParameter("@ToDate", ToDate);
            }


            int CustId = 0;
            string stCustId = Request["CustId"].ToString();
            if (stCustId == "")
            {
                spCustId = new SqlParameter("@CustId", DBNull.Value);
            }
            else
            {
                CustId = Convert.ToInt32(stCustId);
                spCustId = new SqlParameter("@CustId", CustId);
            }
            int LocId = 0;
            string stLocId = Request["LocId"].ToString();
            if (stLocId == "")
            {
                spLocId = new SqlParameter("@LocId", DBNull.Value);
            }
            else
            {
                LocId = Convert.ToInt32(stLocId);
                spLocId = new SqlParameter("@LocId", LocId);
            }
            int Stat = 0;
            string stStat = Request["Stat"].ToString();
            if (stStat == "")
            {
                spStat = new SqlParameter("@Stat", DBNull.Value);
            }
            else
            {
                Stat = Convert.ToInt32(stStat);
                spStat = new SqlParameter("@Stat", Stat);
            }


            ReportInfo Rep = OpenReport("PRep_sls_Offer");

            var query = db.Database.SqlQuery<PProc_Rep_sls_Offer_Result>("execute " + Rep.dataSource + " @comp,@CompNameA,@CompNameE,@BraNameA ,@BraNameE,@LoginUser,@FromDate,@ToDate,@BraCode,@EngId,@CatID,@CustId,@LocId,@Stat",
                   StandPar.spComCode, StandPar.spComNameA, StandPar.spComNameE, StandPar.spBraNameA, StandPar.braNameE, StandPar.spLoginUser, spFromDate, spToDate, spbra, spEngID, spCatID, spCustId, spLocId, spStat).ToList();

            BindReport(Rep.reportName, query);
            return query;
        }
        public IEnumerable<PProc_Rep_sls_BillingByPhase_Result> PRep_sls_BillingListPhase()
        {
            ReportStandardParameters StandPar = getStandardParameters();
            SqlParameter spFromDate = null;
            SqlParameter spToDate = null;
            SqlParameter spCustId = null;
            SqlParameter spLocId = null;
            SqlParameter spCatID = null;
            SqlParameter spEngID = null;
            SqlParameter spbra = null;
            SqlParameter spStat = null;
            int branCode = int.Parse(Request["braCode"].ToString());
            spbra = new SqlParameter("@braCode", branCode);
            int CatID = 0;
            string stCatID = Request["CatID"].ToString();
            if (stCatID == "")
            {
                spCatID = new SqlParameter("@CatID", DBNull.Value);
            }
            else
            {
                CatID = Convert.ToInt32(stCatID);
                spCatID = new SqlParameter("@CatID", CatID);
            }


            int EngID = 0;
            string stEngID = Request["EngID"].ToString();
            if (stEngID == "")
            {
                spEngID = new SqlParameter("@EngID", DBNull.Value);
            }
            else
            {
                EngID = Convert.ToInt32(stEngID);
                spEngID = new SqlParameter("@EngID", EngID);
            }

            string FromDate = null;
            string stFromDate = Request["FromDate"].ToString();
            if (stFromDate == "")
            {
                spFromDate = new SqlParameter("@FromDate", DBNull.Value);
            }

            else
            {
                FromDate = (stFromDate);
                spFromDate = new SqlParameter("@FromDate", FromDate);

            }
            string ToDate = null;
            string stToDate = Request["ToDate"].ToString();
            if (stToDate == "")
            {
                spToDate = new SqlParameter("@ToDate", DBNull.Value);
            }
            else
            {
                ToDate = (stToDate);
                spToDate = new SqlParameter("@ToDate", ToDate);
            }


            int CustId = 0;
            string stCustId = Request["CustId"].ToString();
            if (stCustId == "")
            {
                spCustId = new SqlParameter("@CustId", DBNull.Value);
            }
            else
            {
                CustId = Convert.ToInt32(stCustId);
                spCustId = new SqlParameter("@CustId", CustId);
            }
            int LocId = 0;
            string stLocId = Request["LocId"].ToString();
            if (stLocId == "")
            {
                spLocId = new SqlParameter("@LocId", DBNull.Value);
            }
            else
            {
                LocId = Convert.ToInt32(stLocId);
                spLocId = new SqlParameter("@LocId", LocId);
            }
            int Stat = 0;
            string stStat = Request["Stat"].ToString();
            if (stStat == "")
            {
                spStat = new SqlParameter("@Stat", DBNull.Value);
            }
            else
            {
                Stat = Convert.ToInt32(stStat);
                spStat = new SqlParameter("@Stat", Stat);
            }


            ReportInfo Rep = OpenReport("PRep_sls_BillingListPhase");

            var query = db.Database.SqlQuery<PProc_Rep_sls_BillingByPhase_Result>("execute " + Rep.dataSource + " @comp,@CompNameA,@CompNameE,@BraNameA ,@BraNameE,@LoginUser,@BraCode,@FromDate,@ToDate,@EngId,@CatID,@CustId,@LocId,@Stat",
                   StandPar.spComCode, StandPar.spComNameA, StandPar.spComNameE, StandPar.spBraNameA, StandPar.braNameE, StandPar.spLoginUser, spbra, spFromDate, spToDate,  spEngID, spCatID, spCustId, spLocId, spStat).ToList();

            BindReport(Rep.reportName, query);
            return query;
        }
        public IEnumerable<PProc_Rep_sls_BillingByinvoice_Result> PRep_sls_BillingListInvoice()
        {
            ReportStandardParameters StandPar = getStandardParameters();
            SqlParameter spFromDate = null;
            SqlParameter spToDate = null;
            SqlParameter spCustId = null;
            SqlParameter spLocId = null;
            SqlParameter spCatID = null;
            SqlParameter spEngID = null;
            SqlParameter spbra = null;
            SqlParameter spStat = null;
            int branCode = int.Parse(Request["braCode"].ToString());
            spbra = new SqlParameter("@braCode", branCode);
            int CatID = 0;
            string stCatID = Request["CatID"].ToString();
            if (stCatID == "")
            {
                spCatID = new SqlParameter("@CatID", DBNull.Value);
            }
            else
            {
                CatID = Convert.ToInt32(stCatID);
                spCatID = new SqlParameter("@CatID", CatID);
            }


            int EngID = 0;
            string stEngID = Request["EngID"].ToString();
            if (stEngID == "")
            {
                spEngID = new SqlParameter("@EngID", DBNull.Value);
            }
            else
            {
                EngID = Convert.ToInt32(stEngID);
                spEngID = new SqlParameter("@EngID", EngID);
            }

            string FromDate = null;
            string stFromDate = Request["FromDate"].ToString();
            if (stFromDate == "")
            {
                spFromDate = new SqlParameter("@FromDate", DBNull.Value);
            }

            else
            {
                FromDate = (stFromDate);
                spFromDate = new SqlParameter("@FromDate", FromDate);

            }
            string ToDate = null;
            string stToDate = Request["ToDate"].ToString();
            if (stToDate == "")
            {
                spToDate = new SqlParameter("@ToDate", DBNull.Value);
            }
            else
            {
                ToDate = (stToDate);
                spToDate = new SqlParameter("@ToDate", ToDate);
            }


            int CustId = 0;
            string stCustId = Request["CustId"].ToString();
            if (stCustId == "")
            {
                spCustId = new SqlParameter("@CustId", DBNull.Value);
            }
            else
            {
                CustId = Convert.ToInt32(stCustId);
                spCustId = new SqlParameter("@CustId", CustId);
            }
            int LocId = 0;
            string stLocId = Request["LocId"].ToString();
            if (stLocId == "")
            {
                spLocId = new SqlParameter("@LocId", DBNull.Value);
            }
            else
            {
                LocId = Convert.ToInt32(stLocId);
                spLocId = new SqlParameter("@LocId", LocId);
            }
            int Stat = 0;
            string stStat = Request["Stat"].ToString();
            if (stStat == "")
            {
                spStat = new SqlParameter("@Stat", DBNull.Value);
            }
            else
            {
                Stat = Convert.ToInt32(stStat);
                spStat = new SqlParameter("@Stat", Stat);
            }


            ReportInfo Rep = OpenReport("PRep_sls_BillingListInvoice");

            var query = db.Database.SqlQuery<PProc_Rep_sls_BillingByinvoice_Result>("execute " + Rep.dataSource + " @comp,@CompNameA,@CompNameE,@BraNameA ,@BraNameE,@LoginUser,@BraCode,@FromDate,@ToDate,@EngId,@CatID,@CustId,@LocId,@Stat",
                   StandPar.spComCode, StandPar.spComNameA, StandPar.spComNameE, StandPar.spBraNameA, StandPar.braNameE, StandPar.spLoginUser, spbra, spFromDate, spToDate, spEngID, spCatID, spCustId, spLocId, spStat).ToList();

            BindReport(Rep.reportName, query);
            return query;
        }
        #endregion
        #region
        //public IEnumerable<PProc_Rep_sls_Production_Result> PRep_sls_Production()
        //{
        //    ReportStandardParameters StandPar = getStandardParameters();
        //    SqlParameter spFromDate = null;
        //    SqlParameter spToDate = null;
        //    SqlParameter spCustId = null;
        //    SqlParameter spFromProjCode = null;
        //    SqlParameter spCatID = null;
        //    SqlParameter spEngID = null;
        //    SqlParameter spbra = null;
        //    SqlParameter spToProjCode = null;
        //    string stBarID = Request["braCode"].ToString();
        //    int branCode = Convert.ToInt32(stBarID);
        //    spbra = new SqlParameter("@braCode", branCode);
        //    int CatID = 0;
        //    string stCatID = Request["CatID"].ToString();
        //    if (stCatID == "")
        //    {
        //        spCatID = new SqlParameter("@CatID", DBNull.Value);
        //    }
        //    else
        //    {
        //        CatID = Convert.ToInt32(stCatID);
        //        spCatID = new SqlParameter("@CatID", CatID);
        //    }


        //    int EngID = 0;
        //    string stEngID = Request["EngID"].ToString();
        //    if (stEngID == "")
        //    {
        //        spEngID = new SqlParameter("@EngID", DBNull.Value);
        //    }
        //    else
        //    {
        //        EngID = Convert.ToInt32(stEngID);
        //        spEngID = new SqlParameter("@EngID", EngID);
        //    }

        //    string FromDate = null;
        //    string stFromDate = Request["FromDate"].ToString();
        //    if (stFromDate == "")
        //    {
        //        spFromDate = new SqlParameter("@FromDate", DBNull.Value);
        //    }

        //    else
        //    {
        //        FromDate = (stFromDate);
        //        spFromDate = new SqlParameter("@FromDate", FromDate);

        //    }
        //    string ToDate = null;
        //    string stToDate = Request["ToDate"].ToString();
        //    if (stToDate == "")
        //    {
        //        spToDate = new SqlParameter("@ToDate", DBNull.Value);
        //    }
        //    else
        //    {
        //        ToDate = (stToDate);
        //        spToDate = new SqlParameter("@ToDate", ToDate);
        //    }


        //    int CustId = 0;
        //    string stCustId = Request["CustId"].ToString();
        //    if (stCustId == "")
        //    {
        //        spCustId = new SqlParameter("@CustId", DBNull.Value);
        //    }
        //    else
        //    {
        //        CustId = Convert.ToInt32(stCustId);
        //        spCustId = new SqlParameter("@CustId", CustId);
        //    }
        //    int FromProjCode = 0;
        //    string stFromProjCode = Request["FromProjCode"].ToString();
        //    if (stFromProjCode == "")
        //    {
        //        spFromProjCode = new SqlParameter("@FromProjCode", DBNull.Value);
        //    }
        //    else
        //    {
        //        FromProjCode = Convert.ToInt32(stFromProjCode);
        //        spFromProjCode = new SqlParameter("@FromProjCode", FromProjCode);
        //    }
        //    int ToProjCode = 0;
        //    string stToProjCode = Request["ToProjCode"].ToString();
        //    if (stToProjCode == "")
        //    {
        //        spToProjCode = new SqlParameter("@ToProjCode", DBNull.Value);
        //    }
        //    else
        //    {
        //        ToProjCode = Convert.ToInt32(stToProjCode);
        //        spToProjCode = new SqlParameter("@ToProjCode", ToProjCode);
        //    }


        //    ReportInfo Rep = OpenReport("");
        //    int streportType = Convert.ToInt32(Request["TypeReport"].ToString());
        //    if (streportType == 1)
        //    {
        //        Rep = OpenReport("PRep_sls_Production");

        //    }
        //    else if (streportType == 2)
        //    {
        //        Rep = OpenReport("PRep_sls_ProductionCust");

        //    }
        //    else if (streportType == 3)
        //    {
        //        Rep = OpenReport("PRep_sls_ProductionProj");

        //    }
        //    else if (streportType == 4)
        //    {
        //        Rep = OpenReport("PRep_sls_ProductionEng");

        //    }
        //    var query = db.Database.SqlQuery<PProc_Rep_sls_Production_Result>("execute " + Rep.dataSource + " @comp,@CompNameA,@CompNameE,@BraNameA ,@BraNameE,@LoginUser,@BraCode,@FromDate,@ToDate,@FromProjCode,@ToProjCode,@EngId,@CatID,@CustId",
        //           StandPar.spComCode, StandPar.spComNameA, StandPar.spComNameE, StandPar.spBraNameA, StandPar.braNameE, StandPar.spLoginUser, spbra, spFromDate, spToDate, spFromProjCode, spToProjCode, spEngID, spCatID, spCustId).ToList();

        //    BindReport(Rep.reportName, query);
        //    return query;
        //}
        public IEnumerable<PProc_Rep_sls_ProductionVSBilling_Result> PRep_sls_ProductionBlanc()
        {
            ReportStandardParameters StandPar = getStandardParameters();
            SqlParameter spFromDate = null;
            SqlParameter spToDate = null;
            SqlParameter spCustId = null;
            SqlParameter spFromProjCode = null;
            SqlParameter spCatID = null;
            SqlParameter spEngID = null;
            SqlParameter spbra = null;
            SqlParameter spToProjCode = null;
            string stBarID = Request["braCode"].ToString();
            int branCode = Convert.ToInt32(stBarID);
            spbra = new SqlParameter("@braCode", branCode);
            int CatID = 0;
            string stCatID = Request["CatID"].ToString();
            if (stCatID == "")
            {
                spCatID = new SqlParameter("@CatID", System.Data.SqlTypes.SqlInt32.Null);
            }
            else
            {
                CatID = Convert.ToInt32(stCatID);
                spCatID = new SqlParameter("@CatID", CatID);
            }


            int EngID = 0;
            string stEngID = Request["EngID"].ToString();
            if (stEngID == "")
            {
                spEngID = new SqlParameter("@EngID", System.Data.SqlTypes.SqlInt32.Null);
            }
            else
            {
                EngID = Convert.ToInt32(stEngID);
                spEngID = new SqlParameter("@EngID", EngID);
            }

            string FromDate = null;
            string stFromDate = Request["FromDate"].ToString();
            if (stFromDate == "")
            {
                spFromDate = new SqlParameter("@FromDate", System.Data.SqlTypes.SqlInt32.Null);
            }

            else
            {
                FromDate = (stFromDate);
                spFromDate = new SqlParameter("@FromDate", FromDate);

            }
            string ToDate = null;
            string stToDate = Request["ToDate"].ToString();
            if (stToDate == "")
            {
                spToDate = new SqlParameter("@ToDate", System.Data.SqlTypes.SqlInt32.Null);
            }
            else
            {
                ToDate = (stToDate);
                spToDate = new SqlParameter("@ToDate", ToDate);
            }


            int CustId = 0;
            string stCustId = Request["CustId"].ToString();
            if (stCustId == "")
            {
                spCustId = new SqlParameter("@CustId", System.Data.SqlTypes.SqlInt32.Null);
            }
            else
            {
                CustId = Convert.ToInt32(stCustId);
                spCustId = new SqlParameter("@CustId", CustId);
            }
            int FromProjCode = 0;
            string stFromProjCode = Request["FromProjCode"].ToString();
            if (stFromProjCode == "")
            {
                spFromProjCode = new SqlParameter("@FromProjCode", System.Data.SqlTypes.SqlInt32.Null);
            }
            else
            {
                FromProjCode = Convert.ToInt32(stFromProjCode);
                spFromProjCode = new SqlParameter("@FromProjCode", FromProjCode);
            }
            int ToProjCode = 0;
            string stToProjCode = Request["ToProjCode"].ToString();
            if (stToProjCode == "")
            {
                spToProjCode = new SqlParameter("@ToProjCode", System.Data.SqlTypes.SqlInt32.Null);
            }
            else
            {
                ToProjCode = Convert.ToInt32(stToProjCode);
                spToProjCode = new SqlParameter("@ToProjCode", ToProjCode);
            }



            ReportInfo Rep = OpenReport("PRep_sls_ProductionBlanc");
            string _Query = " execute " + Rep.dataSource +
                "  @comp = '" + StandPar.spComCode.Value + "'" +
                ", @CompNameA = '" + StandPar.spComNameA.Value + "'" +
                ", @CompNameE = '" + StandPar.spComNameE.Value + "'" +
                ", @BraNameA = '" + StandPar.spBraNameA.Value + "'" +
                ", @BraNameE = '" + StandPar.braNameE.Value + "'" +
                ", @LoginUser = '" + StandPar.spLoginUser.Value + "'" +
                ", @braCode = '" + spbra.Value + "'" +
                ", @FromDate = '" + spFromDate.Value + "'" +
                ", @ToDate = '" + spToDate.Value + "'" +
                ", @FromProjCode =  " + spFromProjCode.Value + "" + "," +
                "  @ToProjCode = " + spToProjCode.Value + "" + "," +
                "  @EngId = " + spEngID.Value + "" + "," +
                "  @CatID = " + spCatID.Value + "," +
                "  @CustId =" + spCustId.Value + "";


            var query = db.Database.SqlQuery<PProc_Rep_sls_ProductionVSBilling_Result>(_Query).ToList();

            BindReport(Rep.reportName, query);
            return query;


        }

        public IEnumerable<PProc_Rep_sls_Production_Result> PRep_sls_ProductionList()
        {
            ReportStandardParameters StandPar = getStandardParameters();
            SqlParameter spFromDate = null;
            SqlParameter spToDate = null;
            SqlParameter spCustId = null;
            SqlParameter spFromProjCode = null;
            SqlParameter spCatID = null;
            SqlParameter spEngID = null;
            SqlParameter spbra = null;
            SqlParameter spToProjCode = null;
            string stBarID = Request["braCode"].ToString();
            int branCode = Convert.ToInt32(stBarID);
            spbra = new SqlParameter("@braCode", branCode);
            int CatID = 0;
            string stCatID = Request["CatID"].ToString();
            if (stCatID == "")
            {
                spCatID = new SqlParameter("@CatID", System.Data.SqlTypes.SqlInt32.Null);
            }
            else
            {
                CatID = Convert.ToInt32(stCatID);
                spCatID = new SqlParameter("@CatID", CatID);
            }


            int EngID = 0;
            string stEngID = Request["EngID"].ToString();
            if (stEngID == "")
            {
                spEngID = new SqlParameter("@EngID", System.Data.SqlTypes.SqlInt32.Null);
            }
            else
            {
                EngID = Convert.ToInt32(stEngID);
                spEngID = new SqlParameter("@EngID", EngID);
            }

            string FromDate = null;
            string stFromDate = Request["FromDate"].ToString();
            if (stFromDate == "")
            {
                spFromDate = new SqlParameter("@FromDate", System.Data.SqlTypes.SqlInt32.Null);
            }

            else
            {
                FromDate = (stFromDate);
                spFromDate = new SqlParameter("@FromDate", FromDate);

            }
            string ToDate = null;
            string stToDate = Request["ToDate"].ToString();
            if (stToDate == "")
            {
                spToDate = new SqlParameter("@ToDate", System.Data.SqlTypes.SqlInt32.Null);
            }
            else
            {
                ToDate = (stToDate);
                spToDate = new SqlParameter("@ToDate", ToDate);
            }


            int CustId = 0;
            string stCustId = Request["CustId"].ToString();
            if (stCustId == "")
            {
                spCustId = new SqlParameter("@CustId", System.Data.SqlTypes.SqlInt32.Null);
            }
            else
            {
                CustId = Convert.ToInt32(stCustId);
                spCustId = new SqlParameter("@CustId", CustId);
            }
            int FromProjCode = 0;
            string stFromProjCode = Request["FromProjCode"].ToString();
            if (stFromProjCode == "")
            {
                spFromProjCode = new SqlParameter("@FromProjCode", System.Data.SqlTypes.SqlInt32.Null);
            }
            else
            {
                FromProjCode = Convert.ToInt32(stFromProjCode);
                spFromProjCode = new SqlParameter("@FromProjCode", FromProjCode);
            }
            int ToProjCode = 0;
            string stToProjCode = Request["ToProjCode"].ToString();
            if (stToProjCode == "")
            {
                spToProjCode = new SqlParameter("@ToProjCode", System.Data.SqlTypes.SqlInt32.Null);
            }
            else
            {
                ToProjCode = Convert.ToInt32(stToProjCode);
                spToProjCode = new SqlParameter("@ToProjCode", ToProjCode);
            }



            ReportInfo Rep = OpenReport("PRep_sls_ProductionList");
            string _Query = " execute " + Rep.dataSource +
                "  @comp = '" + StandPar.spComCode.Value + "'" +
                ", @CompNameA = '" + StandPar.spComNameA.Value + "'" +
                ", @CompNameE = '" + StandPar.spComNameE.Value + "'" +
                ", @BraNameA = '" + StandPar.spBraNameA.Value + "'" +
                ", @BraNameE = '" + StandPar.braNameE.Value + "'" +
                ", @LoginUser = '" + StandPar.spLoginUser.Value + "'" +
                ", @braCode = '" + spbra.Value + "'" +
                ", @FromDate = '" + spFromDate.Value + "'" +
                ", @ToDate = '" + spToDate.Value + "'" +
                ", @FromProjCode =  " + spFromProjCode.Value + "" + "," +
                "  @ToProjCode = " + spToProjCode.Value + "" + "," +
                "  @EngId = " + spEngID.Value + "" + "," +
                "  @CatID = " + spCatID.Value + "," +
                "  @CustId =" + spCustId.Value + "";


            var query = db.Database.SqlQuery<PProc_Rep_sls_Production_Result>(_Query).ToList();

            BindReport(Rep.reportName, query);
            return query;


        }

        public IEnumerable<PProc_Rep_sls_ProductionVSBilling_Result> PRep_sls_ProductionBill()
        {
            ReportStandardParameters StandPar = getStandardParameters();
            SqlParameter spFromDate = null;
            SqlParameter spToDate = null;
            SqlParameter spCustId = null;
            SqlParameter spFromProjCode = null;
            SqlParameter spCatID = null;
            SqlParameter spEngID = null;
            SqlParameter spbra = null;
            SqlParameter spToProjCode = null;
            string stBarID = Request["braCode"].ToString();
            int branCode = Convert.ToInt32(stBarID);
            spbra = new SqlParameter("@braCode", branCode);
            int CatID = 0;
            string stCatID = Request["CatID"].ToString();
            if (stCatID == "")
            {
                spCatID = new SqlParameter("@CatID", System.Data.SqlTypes.SqlInt32.Null);
            }
            else
            {
                CatID = Convert.ToInt32(stCatID);
                spCatID = new SqlParameter("@CatID", CatID);
            }


            int EngID = 0;
            string stEngID = Request["EngID"].ToString();
            if (stEngID == "")
            {
                spEngID = new SqlParameter("@EngID", System.Data.SqlTypes.SqlInt32.Null);
            }
            else
            {
                EngID = Convert.ToInt32(stEngID);
                spEngID = new SqlParameter("@EngID", EngID);
            }

            string FromDate = null;
            string stFromDate = Request["FromDate"].ToString();
            if (stFromDate == "")
            {
                spFromDate = new SqlParameter("@FromDate", System.Data.SqlTypes.SqlInt32.Null);
            }

            else
            {
                FromDate = (stFromDate);
                spFromDate = new SqlParameter("@FromDate", FromDate);

            }
            string ToDate = null;
            string stToDate = Request["ToDate"].ToString();
            if (stToDate == "")
            {
                spToDate = new SqlParameter("@ToDate", System.Data.SqlTypes.SqlInt32.Null);
            }
            else
            {
                ToDate = (stToDate);
                spToDate = new SqlParameter("@ToDate", ToDate);
            }


            int CustId = 0;
            string stCustId = Request["CustId"].ToString();
            if (stCustId == "")
            {
                spCustId = new SqlParameter("@CustId", System.Data.SqlTypes.SqlInt32.Null);
            }
            else
            {
                CustId = Convert.ToInt32(stCustId);
                spCustId = new SqlParameter("@CustId", CustId);
            }
            int FromProjCode = 0;
            string stFromProjCode = Request["FromProjCode"].ToString();
            if (stFromProjCode == "")
            {
                spFromProjCode = new SqlParameter("@FromProjCode", System.Data.SqlTypes.SqlInt32.Null);
            }
            else
            {
                FromProjCode = Convert.ToInt32(stFromProjCode);
                spFromProjCode = new SqlParameter("@FromProjCode", FromProjCode);
            }
            int ToProjCode = 0;
            string stToProjCode = Request["ToProjCode"].ToString();
            if (stToProjCode == "")
            {
                spToProjCode = new SqlParameter("@ToProjCode", System.Data.SqlTypes.SqlInt32.Null);
            }
            else
            {
                ToProjCode = Convert.ToInt32(stToProjCode);
                spToProjCode = new SqlParameter("@ToProjCode", ToProjCode);
            }



            ReportInfo Rep = OpenReport("PRep_sls_ProductionBill");
            string _Query = " execute " + Rep.dataSource +
                "  @comp = '" + StandPar.spComCode.Value + "'" +
                ", @CompNameA = '" + StandPar.spComNameA.Value + "'" +
                ", @CompNameE = '" + StandPar.spComNameE.Value + "'" +
                ", @BraNameA = '" + StandPar.spBraNameA.Value + "'" +
                ", @BraNameE = '" + StandPar.braNameE.Value + "'" +
                ", @LoginUser = '" + StandPar.spLoginUser.Value + "'" +
                ", @braCode = '" + spbra.Value + "'" +
                ", @FromDate = '" + spFromDate.Value + "'" +
                ", @ToDate = '" + spToDate.Value + "'" +
                ", @FromProjCode =  " + spFromProjCode.Value + "" + "," +
                "  @ToProjCode = " + spToProjCode.Value + "" + "," +
                "  @EngId = " + spEngID.Value + "" + "," +
                "  @CatID = " + spCatID.Value + "," +
                "  @CustId =" + spCustId.Value + "";


            var query = db.Database.SqlQuery<PProc_Rep_sls_ProductionVSBilling_Result>(_Query).ToList();

            BindReport(Rep.reportName, query);
            return query;


        }


        public IEnumerable<PProc_Rep_sls_invoices_Result> PPrnt_Rep_sls_Production_invoices()
        {
            ReportStandardParameters StandPar = getStandardParameters();
            SqlParameter spFromDate = null;
            SqlParameter spToDate = null;
            SqlParameter spCustId = null;
            SqlParameter spFromProjCode = null;
            SqlParameter spCatID = null;
            SqlParameter spEngID = null;
            SqlParameter spbra = null;
            SqlParameter spToProjCode = null;
            string stBarID = Request["braCode"].ToString();
            int branCode = Convert.ToInt32(stBarID);
            spbra = new SqlParameter("@braCode", branCode);
            int CatID = 0;
            string stCatID = Request["CatID"].ToString();
            if (stCatID == "")
            {
                spCatID = new SqlParameter("@CatID", System.Data.SqlTypes.SqlInt32.Null);
            }
            else
            {
                CatID = Convert.ToInt32(stCatID);
                spCatID = new SqlParameter("@CatID", CatID);
            }


            int EngID = 0;
            string stEngID = Request["EngID"].ToString();
            if (stEngID == "")
            {
                spEngID = new SqlParameter("@EngID", System.Data.SqlTypes.SqlInt32.Null);
            }
            else
            {
                EngID = Convert.ToInt32(stEngID);
                spEngID = new SqlParameter("@EngID", EngID);
            }

            string FromDate = null;
            string stFromDate = Request["FromDate"].ToString();
            if (stFromDate == "")
            {
                spFromDate = new SqlParameter("@FromDate", System.Data.SqlTypes.SqlInt32.Null);
            }

            else
            {
                FromDate = (stFromDate);
                spFromDate = new SqlParameter("@FromDate", FromDate);

            }
            string ToDate = null;
            string stToDate = Request["ToDate"].ToString();
            if (stToDate == "")
            {
                spToDate = new SqlParameter("@ToDate", System.Data.SqlTypes.SqlInt32.Null);
            }
            else
            {
                ToDate = (stToDate);
                spToDate = new SqlParameter("@ToDate", ToDate);
            }


            int CustId = 0;
            string stCustId = Request["CustId"].ToString();
            if (stCustId == "")
            {
                spCustId = new SqlParameter("@CustId", System.Data.SqlTypes.SqlInt32.Null);
            }
            else
            {
                CustId = Convert.ToInt32(stCustId);
                spCustId = new SqlParameter("@CustId", CustId);
            }
            int FromProjCode = 0;
            string stFromProjCode = Request["FromProjCode"].ToString();
            if (stFromProjCode == "")
            {
                spFromProjCode = new SqlParameter("@FromProjCode", System.Data.SqlTypes.SqlInt32.Null);
            }
            else
            {
                FromProjCode = Convert.ToInt32(stFromProjCode);
                spFromProjCode = new SqlParameter("@FromProjCode", FromProjCode);
            }
            int ToProjCode = 0;
            string stToProjCode = Request["ToProjCode"].ToString();
            if (stToProjCode == "")
            {
                spToProjCode = new SqlParameter("@ToProjCode", System.Data.SqlTypes.SqlInt32.Null);
            }
            else
            {
                ToProjCode = Convert.ToInt32(stToProjCode);
                spToProjCode = new SqlParameter("@ToProjCode", ToProjCode);
            }



            ReportInfo Rep = OpenReport("PPrnt_Rep_sls_Production_invoices");
            string _Query = " execute " + Rep.dataSource +
                "  @comp = '" + StandPar.spComCode.Value + "'" +
                ", @CompNameA = '" + StandPar.spComNameA.Value + "'" +
                ", @CompNameE = '" + StandPar.spComNameE.Value + "'" +
                ", @BraNameA = '" + StandPar.spBraNameA.Value + "'" +
                ", @BraNameE = '" + StandPar.braNameE.Value + "'" +
                ", @LoginUser = '" + StandPar.spLoginUser.Value + "'" +
                ", @braCode = '" + spbra.Value + "'" +
                ", @FromDate = '" + spFromDate.Value + "'" +
                ", @ToDate = '" + spToDate.Value + "'" +
                ", @FromProjCode =  " + spFromProjCode.Value + "" + "," +
                "  @ToProjCode = " + spToProjCode.Value + "" + "," +
                "  @EngId = " + spEngID.Value + "" + "," +
                "  @CatID = " + spCatID.Value + "," +
                "  @CustId =" + spCustId.Value + "";


            var query = db.Database.SqlQuery<PProc_Rep_sls_invoices_Result>(_Query).ToList();

            BindReport(Rep.reportName, query);
            return query;


        }
        public IEnumerable<PProc_Rep_sls_ProductionProject_Result> PRep_sls_ProductionProject()
        {
            ReportStandardParameters StandPar = getStandardParameters();
            SqlParameter spFromDate = null;
            SqlParameter spToDate = null;
            SqlParameter spCustId = null;
            SqlParameter spFromProjCode = null;
            SqlParameter spCatID = null;
            SqlParameter spEngID = null;
            SqlParameter spbra = null;
            SqlParameter spToProjCode = null;
            string stBarID = Request["braCode"].ToString();
            int branCode = Convert.ToInt32(stBarID);
            spbra = new SqlParameter("@braCode", branCode);
            int CatID = 0;
            string stCatID = Request["CatID"].ToString();
            if (stCatID == "")
            {
                spCatID = new SqlParameter("@CatID", System.Data.SqlTypes.SqlInt32.Null);
            }
            else
            {
                CatID = Convert.ToInt32(stCatID);
                spCatID = new SqlParameter("@CatID", CatID);
            }


            int EngID = 0;
            string stEngID = Request["EngID"].ToString();
            if (stEngID == "")
            {
                spEngID = new SqlParameter("@EngID", System.Data.SqlTypes.SqlInt32.Null);
            }
            else
            {
                EngID = Convert.ToInt32(stEngID);
                spEngID = new SqlParameter("@EngID", EngID);
            }

            string FromDate = null;
            string stFromDate = Request["FromDate"].ToString();
            if (stFromDate == "")
            {
                spFromDate = new SqlParameter("@FromDate", System.Data.SqlTypes.SqlInt32.Null);
            }

            else
            {
                FromDate = (stFromDate);
                spFromDate = new SqlParameter("@FromDate", FromDate);

            }
            string ToDate = null;
            string stToDate = Request["ToDate"].ToString();
            if (stToDate == "")
            {
                spToDate = new SqlParameter("@ToDate", System.Data.SqlTypes.SqlInt32.Null);
            }
            else
            {
                ToDate = (stToDate);
                spToDate = new SqlParameter("@ToDate", ToDate);
            }


            int CustId = 0;
            string stCustId = Request["CustId"].ToString();
            if (stCustId == "")
            {
                spCustId = new SqlParameter("@CustId", System.Data.SqlTypes.SqlInt32.Null);
            }
            else
            {
                CustId = Convert.ToInt32(stCustId);
                spCustId = new SqlParameter("@CustId", CustId);
            }
            int FromProjCode = 0;
            string stFromProjCode = Request["FromProjCode"].ToString();
            if (stFromProjCode == "")
            {
                spFromProjCode = new SqlParameter("@FromProjCode", System.Data.SqlTypes.SqlInt32.Null);
            }
            else
            {
                FromProjCode = Convert.ToInt32(stFromProjCode);
                spFromProjCode = new SqlParameter("@FromProjCode", FromProjCode);
            }
            int ToProjCode = 0;
            string stToProjCode = Request["ToProjCode"].ToString();
            if (stToProjCode == "")
            {
                spToProjCode = new SqlParameter("@ToProjCode", System.Data.SqlTypes.SqlInt32.Null);
            }
            else
            {
                ToProjCode = Convert.ToInt32(stToProjCode);
                spToProjCode = new SqlParameter("@ToProjCode", ToProjCode);
            }

            

            ReportInfo Rep = OpenReport("PRep_sls_ProductionProject");
            string _Query = " execute " + Rep.dataSource +
                "  @comp = '" + StandPar.spComCode.Value + "'" +
                ", @CompNameA = '" + StandPar.spComNameA.Value + "'" +
                ", @CompNameE = '" + StandPar.spComNameE.Value + "'" +
                ", @BraNameA = '" + StandPar.spBraNameA.Value + "'" +
                ", @BraNameE = '" + StandPar.braNameE.Value + "'" +
                ", @LoginUser = '" + StandPar.spLoginUser.Value + "'" +
                ", @braCode = '" + spbra.Value + "'" +
                ", @FromDate = '" + spFromDate.Value + "'" +
                ", @ToDate = '" + spToDate.Value + "'" +
                ", @FromProjCode =  " + spFromProjCode.Value + "" + "," +
                "  @ToProjCode = " + spToProjCode.Value + "" + "," +
                "  @EngId = " + spEngID.Value + "" + "," +
                "  @CatID = " + spCatID.Value + "," +
                "  @CustId =" + spCustId.Value + "";


            var query = db.Database.SqlQuery<PProc_Rep_sls_ProductionProject_Result>(_Query).ToList();

            BindReport(Rep.reportName, query);
            return query;


        }

        public IEnumerable<PProc_Rep_sls_ProductionCustomer_Result> PRep_sls_ProductionCustomer()
        {
            ReportStandardParameters StandPar = getStandardParameters();
            SqlParameter spFromDate = null;
            SqlParameter spToDate = null;
            SqlParameter spCustId = null;
            SqlParameter spFromProjCode = null;
            SqlParameter spCatID = null;
            SqlParameter spEngID = null;
            SqlParameter spbra = null;
            SqlParameter spToProjCode = null;
            string stBarID = Request["braCode"].ToString();
            int branCode = Convert.ToInt32(stBarID);
            spbra = new SqlParameter("@braCode", branCode);
            int CatID = 0;
            string stCatID = Request["CatID"].ToString();
            if (stCatID == "")
            {
                spCatID = new SqlParameter("@CatID", System.Data.SqlTypes.SqlInt32.Null);
            }
            else
            {
                CatID = Convert.ToInt32(stCatID);
                spCatID = new SqlParameter("@CatID", CatID);
            }


            int EngID = 0;
            string stEngID = Request["EngID"].ToString();
            if (stEngID == "")
            {
                spEngID = new SqlParameter("@EngID", System.Data.SqlTypes.SqlInt32.Null);
            }
            else
            {
                EngID = Convert.ToInt32(stEngID);
                spEngID = new SqlParameter("@EngID", EngID);
            }

            string FromDate = null;
            string stFromDate = Request["FromDate"].ToString();
            if (stFromDate == "")
            {
                spFromDate = new SqlParameter("@FromDate", System.Data.SqlTypes.SqlInt32.Null);
            }

            else
            {
                FromDate = (stFromDate);
                spFromDate = new SqlParameter("@FromDate", FromDate);

            }
            string ToDate = null;
            string stToDate = Request["ToDate"].ToString();
            if (stToDate == "")
            {
                spToDate = new SqlParameter("@ToDate", System.Data.SqlTypes.SqlInt32.Null);
            }
            else
            {
                ToDate = (stToDate);
                spToDate = new SqlParameter("@ToDate", ToDate);
            }


            int CustId = 0;
            string stCustId = Request["CustId"].ToString();
            if (stCustId == "")
            {
                spCustId = new SqlParameter("@CustId", System.Data.SqlTypes.SqlInt32.Null);
            }
            else
            {
                CustId = Convert.ToInt32(stCustId);
                spCustId = new SqlParameter("@CustId", CustId);
            }
            int FromProjCode = 0;
            string stFromProjCode = Request["FromProjCode"].ToString();
            if (stFromProjCode == "")
            {
                spFromProjCode = new SqlParameter("@FromProjCode", System.Data.SqlTypes.SqlInt32.Null);
            }
            else
            {
                FromProjCode = Convert.ToInt32(stFromProjCode);
                spFromProjCode = new SqlParameter("@FromProjCode", FromProjCode);
            }
            int ToProjCode = 0;
            string stToProjCode = Request["ToProjCode"].ToString();
            if (stToProjCode == "")
            {
                spToProjCode = new SqlParameter("@ToProjCode", System.Data.SqlTypes.SqlInt32.Null);
            }
            else
            {
                ToProjCode = Convert.ToInt32(stToProjCode);
                spToProjCode = new SqlParameter("@ToProjCode", ToProjCode);
            }


            ReportInfo Rep = OpenReport("PRep_sls_ProductionCustomer");
            string _Query = " execute " + Rep.dataSource +
                "  @comp = '" + StandPar.spComCode.Value + "'" +
                ", @CompNameA = '" + StandPar.spComNameA.Value + "'" +
                ", @CompNameE = '" + StandPar.spComNameE.Value + "'" +
                ", @BraNameA = '" + StandPar.spBraNameA.Value + "'" +
                ", @BraNameE = '" + StandPar.braNameE.Value + "'" +
                ", @LoginUser = '" + StandPar.spLoginUser.Value + "'" +
                ", @braCode = '" + spbra.Value + "'" +
                ", @FromDate = '" + spFromDate.Value + "'" +
                ", @ToDate = '" + spToDate.Value + "'" +
                ",  @FromProjCode =  " + spFromProjCode.Value + "" + "," +
                "  @ToProjCode = " + spToProjCode.Value + "" + "," +
                "  @EngId = " + spEngID.Value + "" + "," +
                " @CatID = " + spCatID.Value + "," +
                "  @CustId =" + spCustId.Value + "";


            var query = db.Database.SqlQuery<PProc_Rep_sls_ProductionCustomer_Result>(_Query).ToList();

            BindReport(Rep.reportName, query);
            return query;
        }
      
        public IEnumerable<PProc_Rep_sls_EngineerActivity_Result> PRep_sls_EngineerActivity()
        {
            ReportStandardParameters StandPar = getStandardParameters();
            SqlParameter spFromDate = null;
            SqlParameter spToDate = null;
            SqlParameter spCustId = null;

            SqlParameter spCatID = null;
            SqlParameter spEngID = null;
            SqlParameter spbra = null;

            string stBarID = Request["BranchCode"].ToString();
            int branCode = Convert.ToInt32(stBarID);
            spbra = new SqlParameter("@braCode", branCode);
            int CatID = 0;
            string stCatID = Request["CatID"].ToString();
            if (stCatID == "")
            {
                spCatID = new SqlParameter("@CatID", DBNull.Value);
            }
            else
            {
                CatID = Convert.ToInt32(stCatID);
                spCatID = new SqlParameter("@CatID", CatID);
            }


            int EngID = 0;
            string stEngID = Request["EngID"].ToString();
            if (stEngID == "")
            {
                spEngID = new SqlParameter("@EngID", DBNull.Value);
            }
            else
            {
                EngID = Convert.ToInt32(stEngID);
                spEngID = new SqlParameter("@EngID", EngID);
            }

            string FromDate = null;
            string stFromDate = Request["FromDate"].ToString();
            if (stFromDate == "")
            {
                spFromDate = new SqlParameter("@FromDate", DBNull.Value);
            }

            else
            {
                FromDate = (stFromDate);
                spFromDate = new SqlParameter("@FromDate", FromDate);

            }
            string ToDate = null;
            string stToDate = Request["ToDate"].ToString();
            if (stToDate == "")
            {
                spToDate = new SqlParameter("@ToDate", DBNull.Value);
            }
            else
            {
                ToDate = (stToDate);
                spToDate = new SqlParameter("@ToDate", ToDate);
            }


            int CustId = 0;
            string stCustId = Request["CustId"].ToString();
            if (stCustId == "")
            {
                spCustId = new SqlParameter("@CustId", DBNull.Value);
            }
            else
            {
                CustId = Convert.ToInt32(stCustId);
                spCustId = new SqlParameter("@CustId", CustId);
            }

            ReportInfo Rep = OpenReport("PRep_sls_EngineerActivity");

            var query = db.Database.SqlQuery<PProc_Rep_sls_EngineerActivity_Result>("execute " + Rep.dataSource + " @comp,@CompNameA,@CompNameE,@BraNameA ,@BraNameE,@LoginUser,@BraCode,@FromDate,@ToDate,@EngId,@CatID,@CustId",
                   StandPar.spComCode, StandPar.spComNameA, StandPar.spComNameE, StandPar.spBraNameA, StandPar.braNameE, StandPar.spLoginUser, spbra, spFromDate, spToDate, spEngID, spCatID, spCustId).ToList();

            BindReport(Rep.reportName, query);
            return query;
        }
        public IEnumerable<PProc_Prnt_sls_ActivityChangePRice_Result> PPrnt_Sls_ActivityChangePRice()
        {
            ReportStandardParameters StandPar = getStandardParameters();

            int TrID = int.Parse(Request["TrID"].ToString());
            SqlParameter spTRId = new SqlParameter("@TrID", TrID);


            ReportInfo Rep = OpenReport("PPrnt_Sls_ActivityChangePRice");

            var query = db.Database.SqlQuery<PProc_Prnt_sls_ActivityChangePRice_Result>("execute " + Rep.dataSource + "  @comp, @CompNameA, @CompNameE, @BraNameA, @BraNameE, @LoginUser,@TrID",
                StandPar.spComCode, StandPar.spComNameA, StandPar.spComNameE, StandPar.spBraNameA, StandPar.braNameE, StandPar.spLoginUser, spTRId).ToList();

            BindReport(Rep.reportName, query);
            return query;
        }

         public IEnumerable<PProc_Rep_sls_CRM_Result> PRep_sls_CRMReport()
        {
            ReportStandardParameters StandPar = getStandardParameters();
            SqlParameter spFromDate = null;
            SqlParameter spToDate = null;
            SqlParameter spCustId = null;

            SqlParameter spGroupType = null;
            SqlParameter spEngID = null;
            SqlParameter spbra = null;

            string stBarID = Request["BranchCode"].ToString();
            int branCode = Convert.ToInt32(stBarID);
            spbra = new SqlParameter("@braCode", branCode);

            int GroupType = 0;
            string stGroupType = Request["GroupType"].ToString();
            if (stGroupType == "")
            {
                spGroupType = new SqlParameter("@ProdType", DBNull.Value);
            }
            else
            {
                GroupType = Convert.ToInt32(stGroupType);
                spGroupType = new SqlParameter("@ProdType", GroupType);
            }


            int EngID = 0;
            string stEngID = Request["EngID"].ToString();
            if (stEngID == "")
            {
                spEngID = new SqlParameter("@EngID", System.Data.SqlTypes.SqlInt32.Null);
            }
            else
            {
                EngID = Convert.ToInt32(stEngID);
                spEngID = new SqlParameter("@EngID", EngID);
            }

            string FromDate = null;
            string stFromDate = Request["FromDate"].ToString();
            if (stFromDate == "")
            {
                spFromDate = new SqlParameter("@FromDate", DBNull.Value);
            }

            else
            {
                FromDate = (stFromDate);
                spFromDate = new SqlParameter("@FromDate", FromDate);

            }
            string ToDate = null;
            string stToDate = Request["ToDate"].ToString();
            if (stToDate == "")
            {
                spToDate = new SqlParameter("@ToDate", DBNull.Value);
            }
            else
            {
                ToDate = (stToDate);
                spToDate = new SqlParameter("@ToDate", ToDate);
            }


            int CustId = 0;
            string stCustId = Request["CustId"].ToString();
            if (stCustId == "")
            {
                spCustId = new SqlParameter("@CustId", System.Data.SqlTypes.SqlInt32.Null);
            }
            else
            {
                CustId = Convert.ToInt32(stCustId);
                spCustId = new SqlParameter("@CustId", CustId);
            }
             
            ReportInfo Rep = OpenReport("PRep_sls_CRMReport");

            string _Query = " execute " + Rep.dataSource +
                " @comp = '" + StandPar.spComCode.Value + "'" +
                ", @CompNameA = '" + StandPar.spComNameA.Value + "'" +
                ", @CompNameE = '" + StandPar.spComNameE.Value + "'" +
                ", @BraNameA = '" + StandPar.spBraNameA.Value + "'" +
                ", @BraNameE = '" + StandPar.braNameE.Value + "'" +
                ", @LoginUser = '" + StandPar.spLoginUser.Value + "'" +
                ", @BraCode = '" + spbra.Value + "'" +
                ", @FromDate = '" + spFromDate.Value + "'" +
                ", @ToDate = '" + spToDate.Value + "'" +
                ", @engId = " + spEngID.Value + "" +
                ", @CustId = " + spCustId.Value + "" +
                ", @ProdType = " + spGroupType.Value;
            var query = db.Database.SqlQuery<PProc_Rep_sls_CRM_Result>(_Query).ToList();

            BindReport(Rep.reportName, query);
            return query;
        }
        public IEnumerable<PProc_Rep_sls_invoices_Result> PRep_sls_invoicesProgressAndDownpayment()
        {
            ReportStandardParameters StandPar = getStandardParameters();
            SqlParameter spFromDate = null;
            SqlParameter spToDate = null;
            SqlParameter spCustId = null;
            SqlParameter spCatID = null;
            SqlParameter spFromProjCode = null;
            SqlParameter spToProjCode = null;

            SqlParameter spGroupType = null;
            SqlParameter spEngID = null;
            SqlParameter spbra = null;

            string stBarID = Request["BranchCode"].ToString();
            int branCode = Convert.ToInt32(stBarID);
            spbra = new SqlParameter("@braCode", branCode);

            int FromProjCode = 0;
            string stFromProjCode = Request["FromProjCode"].ToString();
            if (stFromProjCode == "")
            {
                spFromProjCode = new SqlParameter("@FromProjCode", DBNull.Value);
            }
            else
            {
                FromProjCode = Convert.ToInt32(stFromProjCode);
                spFromProjCode = new SqlParameter("@FromProjCode", FromProjCode);
            }


            int ToProjCode = 0;
            string stToProjCode = Request["ToProjCode"].ToString();
            if (stToProjCode == "")
            {
                spToProjCode = new SqlParameter("@ToProjCode", DBNull.Value);
            }
            else
            {
                ToProjCode = Convert.ToInt32(stToProjCode);
                spToProjCode = new SqlParameter("@ToProjCode", ToProjCode);
            }


            int GroupType = 0;
            string stGroupType = Request["GroupType"].ToString();
            if (stGroupType == "")
            {
                spGroupType = new SqlParameter("@ProdType", DBNull.Value);
            }
            else
            {
                GroupType = Convert.ToInt32(stGroupType);
                spGroupType = new SqlParameter("@ProdType", GroupType);
            }


            int EngID = 0;
            string stEngID = Request["EngID"].ToString();
            if (stEngID == "")
            {
                spEngID = new SqlParameter("@EngID", System.Data.SqlTypes.SqlInt32.Null);
            }
            else
            {
                EngID = Convert.ToInt32(stEngID);
                spEngID = new SqlParameter("@EngID", EngID);
            }

            string FromDate = null;
            string stFromDate = Request["FromDate"].ToString();
            if (stFromDate == "")
            {
                spFromDate = new SqlParameter("@FromDate", DBNull.Value);
            }

            else
            {
                FromDate = (stFromDate);
                spFromDate = new SqlParameter("@FromDate", FromDate);

            }
            string ToDate = null;
            string stToDate = Request["ToDate"].ToString();
            if (stToDate == "")
            {
                spToDate = new SqlParameter("@ToDate", DBNull.Value);
            }
            else
            {
                ToDate = (stToDate);
                spToDate = new SqlParameter("@ToDate", ToDate);
            }


            int CustId = 0;
            string stCustId = Request["CustId"].ToString();
            if (stCustId == "")
            {
                spCustId = new SqlParameter("@CustId", System.Data.SqlTypes.SqlInt32.Null);
            }
            else
            {
                CustId = Convert.ToInt32(stCustId);
                spCustId = new SqlParameter("@CustId", CustId);
            }

            int CatID = 0;
            string stCatID = Request["CatID"].ToString();
            if (stCatID == "")
            {
                spCatID = new SqlParameter("@CatID", System.Data.SqlTypes.SqlInt32.Null);
            }
            else
            {
                CatID = Convert.ToInt32(stCustId);
                spCatID = new SqlParameter("@CatID", CatID);
            }

            ReportInfo Rep = new ReportInfo();
             if (stGroupType == "1")
            {
                Rep = OpenReport("PRep_sls_invoicesDownPayment");
            }
            else
            {
                Rep = OpenReport("PRep_sls_invoicesProgress");
            }
            string _Query = " execute " + Rep.dataSource +
               " @comp = '" + StandPar.spComCode.Value + "'" +
               ", @CompNameA = '" + StandPar.spComNameA.Value + "'" +
               ", @CompNameE = '" + StandPar.spComNameE.Value + "'" +
               ", @BraNameA = '" + StandPar.spBraNameA.Value + "'" +
               ", @BraNameE = '" + StandPar.braNameE.Value + "'" +
               ", @LoginUser = '" + StandPar.spLoginUser.Value + "'" +
               ", @BraCode = '" + spbra.Value + "'" +
               ", @FromDate = '" + spFromDate.Value + "'" +
               ", @ToDate = '" + spToDate.Value + "'" +
               ", @engId = " + spEngID.Value + "" +
               ", @FromProjCode = '" + spFromProjCode.Value + "'" +
               ", @ToProjCode = '" + spToProjCode.Value + "'" +
               ", @CatID = " + spCatID.Value + "" +
               ", @CustId = " + spCustId.Value + "" +
               ", @InvType = " + spGroupType.Value;
            var query = db.Database.SqlQuery<PProc_Rep_sls_invoices_Result>(_Query).ToList();

            BindReport(Rep.reportName, query);
            return query;
        }


        #endregion
        #region Eng
        public IEnumerable<PProc_Prnt_eng_OpProductionEntry_Result> PPrnt_eng_OpProductionEntry()
        {
            ReportStandardParameters StandPar = getStandardParameters();
            SqlParameter spTrNo = null;

            int TrNo = 0;
            string x = Request["TrNo"].ToString();
            if (x == "")
            {
                spTrNo = new SqlParameter("@TrNo", DBNull.Value);
            }
            else
            {
                TrNo = Convert.ToInt32(x);
                spTrNo = new SqlParameter("@TrNo", TrNo);
            }

            ReportInfo Rep = OpenReport("PPrnt_eng_OpProductionEntry");
            string _Query = "execute PProc_Prnt_eng_OpProductionEntry" +
                " @comp = '" + StandPar.spComCode.Value + "'" +
                ", @CompNameA = '" + StandPar.spComNameA.Value + "'" +
                ", @CompNameE = '" + StandPar.spComNameE.Value + "'" +
                ", @BraNameA = '" + StandPar.spBraNameA.Value + "'" +
                ", @BraNameE = '" + StandPar.braNameE.Value + "'" +
                ", @LoginUser = '" + StandPar.spLoginUser.Value + "'" +
                ", @TrNo = " + spTrNo.Value;
            var query = db.Database.SqlQuery<PProc_Prnt_eng_OpProductionEntry_Result>(_Query).ToList();

            BindReport(Rep.reportName, query);
            return query;
        }
        public IEnumerable<PProc_Prnt_Eng_VariationDet_Result> Prnt_Eng_VariationDet()
        {
            ReportStandardParameters StandPar = getStandardParameters();
            SqlParameter spTrNo = null;

            int TrID = 0;
            string x = Request["TrID"].ToString();
            if (x == "")
            {
                spTrNo = new SqlParameter("@TrID", DBNull.Value);
            }
            else
            {
                TrID = Convert.ToInt32(x);
                spTrNo = new SqlParameter("@TrID", TrID);
            }

            ReportInfo Rep = OpenReport("Prnt_Eng_VariationDet");
            string _Query = "execute PProc_Prnt_Eng_VariationDet" +
                " @comp = '" + StandPar.spComCode.Value + "'" +
                ", @CompNameA = '" + StandPar.spComNameA.Value + "'" +
                ", @CompNameE = '" + StandPar.spComNameE.Value + "'" +
                ", @BraNameA = '" + StandPar.spBraNameA.Value + "'" +
                ", @BraNameE = '" + StandPar.braNameE.Value + "'" +
                ", @LoginUser = '" + StandPar.spLoginUser.Value + "'" +
                ", @TrID = " + spTrNo.Value;
            var query = db.Database.SqlQuery<PProc_Prnt_Eng_VariationDet_Result>(_Query).ToList();

            BindReport(Rep.reportName, query);
            return query;
        }
        public IEnumerable<PProc_Prnt_Eng_VariationSum_Result> Prnt_Eng_VariationSum()
        {
            ReportStandardParameters StandPar = getStandardParameters();
            SqlParameter spTrNo = null;

            int TrID = 0;
            string x = Request["TrID"].ToString();
            if (x == "")
            {
                spTrNo = new SqlParameter("@TrID", DBNull.Value);
            }
            else
            {
                TrID = Convert.ToInt32(x);
                spTrNo = new SqlParameter("@TrID", TrID);
            }

            ReportInfo Rep = OpenReport("Prnt_Eng_VariationSum");
            string _Query = "execute PProc_Prnt_Eng_VariationSum" +
                " @comp = '" + StandPar.spComCode.Value + "'" +
                ", @CompNameA = '" + StandPar.spComNameA.Value + "'" +
                ", @CompNameE = '" + StandPar.spComNameE.Value + "'" +
                ", @BraNameA = '" + StandPar.spBraNameA.Value + "'" +
                ", @BraNameE = '" + StandPar.braNameE.Value + "'" +
                ", @LoginUser = '" + StandPar.spLoginUser.Value + "'" +
                ", @TrID = " + spTrNo.Value;
            var query = db.Database.SqlQuery<PProc_Prnt_Eng_VariationSum_Result>(_Query).ToList();

            BindReport(Rep.reportName, query);
            return query;
        }
        //-----------
        public IEnumerable<PProc_Prnt_eng_ServiceOrder_Result> PPrnt_eng_ServiceOrder()
        {
            ReportStandardParameters StandPar = getStandardParameters();
            SqlParameter spTrNo = null;

            int TrNo = 0;
            string x = Request["TrNo"].ToString();
            if (x == "")
            {
                spTrNo = new SqlParameter("@TrNo", DBNull.Value);
            }
            else
            {
                TrNo = Convert.ToInt32(x);
                spTrNo = new SqlParameter("@TrNo", TrNo);
            }

            ReportInfo Rep = OpenReport("PPrnt_eng_ServiceOrder");
            string _Query = @" execute " + Rep.dataSource +
                " @comp = '" + StandPar.spComCode.Value + "'" +
                ", @CompNameA = '" + StandPar.spComNameA.Value + "'" +
                ", @CompNameE = '" + StandPar.spComNameE.Value + "'" +
                ", @BraNameA = '" + StandPar.spBraNameA.Value + "'" +
                ", @BraNameE = '" + StandPar.braNameE.Value + "'" +
                ", @LoginUser = '" + StandPar.spLoginUser.Value + "'" +
                ", @TrNo = " + spTrNo.Value;
            var query = db.Database.SqlQuery<PProc_Prnt_eng_ServiceOrder_Result>(_Query).ToList();

            BindReport(Rep.reportName, query);
            return query;
        }
        public IEnumerable<PProc_Prnt_eng_SubContContract_Result> PPrnt_eng_SubContContract()
        {
            ReportStandardParameters StandPar = getStandardParameters();
            SqlParameter spTrNo = null;

            int TrNo = 0;
            string x = Request["TrNo"].ToString();
            if (x == "")
            {
                spTrNo = new SqlParameter("@TrNo", DBNull.Value);
            }
            else
            {
                TrNo = Convert.ToInt32(x);
                spTrNo = new SqlParameter("@TrNo", TrNo);
            }

            ReportInfo Rep = OpenReport("PPrnt_eng_SubContContract");
            string _Query = @" execute " + Rep.dataSource +
               " @comp = '" + StandPar.spComCode.Value + "'" +
                ", @CompNameA = '" + StandPar.spComNameA.Value + "'" +
                ", @CompNameE = '" + StandPar.spComNameE.Value + "'" +
                ", @BraNameA = '" + StandPar.spBraNameA.Value + "'" +
                ", @BraNameE = '" + StandPar.braNameE.Value + "'" +
                ", @LoginUser = '" + StandPar.spLoginUser.Value + "'" +
                ", @TrNo = " + spTrNo.Value;
            var query = db.Database.SqlQuery<PProc_Prnt_eng_SubContContract_Result>(_Query).ToList();

            BindReport(Rep.reportName, query);
            return query;
        }
        public IEnumerable<PProc_Prnt_eng_WorkSchedule_Result> PPrnt_eng_WorkSchedule()
        {
            ReportStandardParameters StandPar = getStandardParameters();
            SqlParameter spTrNo = null;

            int TrNo = 0;
            string x = Request["TrNo"].ToString();
            if (x == "")
            {
                spTrNo = new SqlParameter("@TrNo", DBNull.Value);
            }
            else
            {
                TrNo = Convert.ToInt32(x);
                spTrNo = new SqlParameter("@TrNo", TrNo);
            }

            ReportInfo Rep = OpenReport("PPrnt_eng_WorkSchedule");
            string _Query = "execute PProc_Prnt_eng_WorkSchedule" +
                " @comp = '" + StandPar.spComCode.Value + "'" +
                ", @CompNameA = '" + StandPar.spComNameA.Value + "'" +
                ", @CompNameE = '" + StandPar.spComNameE.Value + "'" +
                ", @BraNameA = '" + StandPar.spBraNameA.Value + "'" +
                ", @BraNameE = '" + StandPar.braNameE.Value + "'" +
                ", @LoginUser = '" + StandPar.spLoginUser.Value + "'" +
                ", @TrNo = " + spTrNo.Value;
            var query = db.Database.SqlQuery<PProc_Prnt_eng_WorkSchedule_Result>(_Query).ToList();
            BindReport(Rep.reportName, query);
            return query;
        }
        public IEnumerable<PProc_Prnt_sls_WorkStart_Result> REPPrnt_sls_StartOfWork()
        {
            ReportStandardParameters StandPar = getStandardParameters();

            int TrID = int.Parse(Request["TrID"].ToString());
            SqlParameter spTRId = new SqlParameter("@TrID", TrID);


            ReportInfo Rep = OpenReport("REPPrnt_sls_StartOfWork");

            //var query = db.Database.SqlQuery<PProc_Prnt_sls_WorkStart_Result>("execute " + Rep.dataSource + "  @comp, @CompNameA, @CompNameE, @BraNameA, @BraNameE, @LoginUser,@TrNo",
            //    StandPar.spComCode, StandPar.spComNameA, StandPar.spComNameE, StandPar.spBraNameA, StandPar.braNameE, StandPar.spLoginUser, spTRId).ToList();

            //BindReport(Rep.reportName, query);
            string _Query = @" execute " + "PProc_Prnt_sls_WorkStart" +
                " @comp = 0" +
                ", @CompNameA = '" + StandPar.spComNameA.Value + "'" +
                ", @CompNameE = '" + StandPar.spComNameE.Value + "'" +
                ", @BraNameA = '" + StandPar.spBraNameA.Value + "'" +
                ", @BraNameE = '" + StandPar.braNameE.Value + "'" +
                ", @LoginUser = '" + StandPar.spLoginUser.Value + "'" +
                ", @TrID = " + spTRId.Value;
            var query = db.Database.SqlQuery<PProc_Prnt_sls_WorkStart_Result>(_Query).ToList();

            BindReport(Rep.reportName, query);
            return query;
        }
        public IEnumerable<PProc_Prnt_Eng_Expenses_Result> PPrnt_Eng_Expenses()
        {
            ReportStandardParameters StandPar = getStandardParameters();
            SqlParameter spTrID = null;

            int TrID = 0;
            string x = Request["TrID"].ToString();
            if (x == "")
            {
                spTrID = new SqlParameter("@TrID", DBNull.Value);
            }
            else
            {
                TrID = Convert.ToInt32(x);
                spTrID = new SqlParameter("@TrID", TrID);
            }

            ReportInfo Rep = OpenReport("PPrnt_Eng_Expenses");
            string _Query = "execute " + Rep.dataSource +
               " @comp = '" + StandPar.spComCode.Value + "'" +
                ", @CompNameA = '" + StandPar.spComNameA.Value + "'" +
                ", @CompNameE = '" + StandPar.spComNameE.Value + "'" +
                ", @BraNameA = '" + StandPar.spBraNameA.Value + "'" +
                ", @BraNameE = '" + StandPar.braNameE.Value + "'" +
                ", @LoginUser = '" + StandPar.spLoginUser.Value + "'" +
                ", @TrID = " + spTrID.Value;
            var query = db.Database.SqlQuery<PProc_Prnt_Eng_Expenses_Result>(_Query).ToList();

            BindReport(Rep.reportName, query);
            return query;
        }

        public IEnumerable<PProc_Prnt_sls_Invoice_Result> PRep_sls_Invoice()
        {
            ReportStandardParameters StandPar = getStandardParameters();
            SqlParameter spTrID = null;

            int TrID = 0;
            string x = Request["TrID"].ToString();
            if (x == "")
            {
                spTrID = new SqlParameter("@TrID", DBNull.Value);
            }
            else
            {
                TrID = Convert.ToInt32(x);
                spTrID = new SqlParameter("@TrID", TrID);
            }

            ReportInfo Rep = OpenReport("PRep_sls_Invoice");
            string _Query = "execute " + Rep.dataSource +
               " @comp = '" + StandPar.spComCode.Value + "'" +
                ", @CompNameA = '" + StandPar.spComNameA.Value + "'" +
                ", @CompNameE = '" + StandPar.spComNameE.Value + "'" +
                ", @BraNameA = '" + StandPar.spBraNameA.Value + "'" +
                ", @BraNameE = '" + StandPar.braNameE.Value + "'" +
                ", @LoginUser = '" + StandPar.spLoginUser.Value + "'" +
                ", @TrID = " + spTrID.Value;
            var query = db.Database.SqlQuery<PProc_Prnt_sls_Invoice_Result>(_Query).ToList();

            //BindReport(Rep.reportName, query);
            //return query;


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

            query.FirstOrDefault().QRCode = Convert.ToBase64String(QRcode1);
            //ReportParameter parameter = new ReportParameter("QRCode", query.FirstOrDefault().QRCode);
            reportViewer1.LocalReport.EnableExternalImages = true;
 
            BindReport(Rep.reportName, query);
            return query;
        }


        public IEnumerable<PProc_Prnt_sls_DbCr_Result> PRep_sls_DbCr()
        {
            ReportStandardParameters StandPar = getStandardParameters();
            SqlParameter spTrID = null;

            int TrID = 0;
            string x = Request["TrID"].ToString();
            if (x == "")
            {
                spTrID = new SqlParameter("@TrID", DBNull.Value);
            }
            else
            {
                TrID = Convert.ToInt32(x);
                spTrID = new SqlParameter("@TrID", TrID);
            }

            ReportInfo Rep = OpenReport("PRep_sls_DbCr");
            string _Query = "execute " + Rep.dataSource +
               " @comp = '" + StandPar.spComCode.Value + "'" +
                ", @CompNameA = '" + StandPar.spComNameA.Value + "'" +
                ", @CompNameE = '" + StandPar.spComNameE.Value + "'" +
                ", @BraNameA = '" + StandPar.spBraNameA.Value + "'" +
                ", @BraNameE = '" + StandPar.braNameE.Value + "'" +
                ", @LoginUser = '" + StandPar.spLoginUser.Value + "'" +
                ", @TrID = " + spTrID.Value;
            var query = db.Database.SqlQuery<PProc_Prnt_sls_DbCr_Result>(_Query).ToList();

            //BindReport(Rep.reportName, query);
            //return query;


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

            query.FirstOrDefault().QRStr = Convert.ToBase64String(QRcode1);
            //ReportParameter parameter = new ReportParameter("QRCode", query.FirstOrDefault().QRCode);
            reportViewer1.LocalReport.EnableExternalImages = true;

            BindReport(Rep.reportName, query);
            return query;
        }
        //------  mohamedRagab
        public IEnumerable<PProc_Prnt_eng_SubProduction_Result> PPrnt_eng_SubProduction()
        {
            ReportStandardParameters StandPar = getStandardParameters();
            SqlParameter spTrNo = null;

            int TrNo = 0;
            string x = Request["TrNo"].ToString();
            if (x == "")
            {
                spTrNo = new SqlParameter("@TrNo", DBNull.Value);
            }
            else
            {
                TrNo = Convert.ToInt32(x);
                spTrNo = new SqlParameter("@TrNo", TrNo);
            }

            ReportInfo Rep = OpenReport("PPrnt_eng_SubProduction");
            string _Query = @" execute " + Rep.dataSource +
                " @comp = '" + StandPar.spComCode.Value + "'" +
                ", @CompNameA = '" + StandPar.spComNameA.Value + "'" +
                ", @CompNameE = '" + StandPar.spComNameE.Value + "'" +
                ", @BraNameA = '" + StandPar.spBraNameA.Value + "'" +
                ", @BraNameE = '" + StandPar.braNameE.Value + "'" +
                ", @LoginUser = '" + StandPar.spLoginUser.Value + "'" +
                ", @TrNo = " + spTrNo.Value;
            var query = db.Database.SqlQuery<PProc_Prnt_eng_SubProduction_Result>(_Query).ToList();

            BindReport(Rep.reportName, query);
            return query;
        }



        //-------------------------------------------------------------------------------------------------NEW REPORTS-------------
        public IEnumerable<PProc_Rep_Eng_ExpensesSummary_Result> PPrnt_Eng_ExpensesSummary()
        {
            ReportStandardParameters StandPar = getStandardParameters();

            SqlParameter Bracode = null;
            SqlParameter Projid = null;
            SqlParameter Phaseid = null;

            SqlParameter FromDate = null;
            SqlParameter ToDate = null;
            SqlParameter CatId = null;
            SqlParameter ExpId = null;


            string stFromDate = Request["FromDate"].ToString();
            if (stFromDate == "")
            {
                FromDate = new SqlParameter("@FromDate", DBNull.Value);
            }

            else
            {
                FromDate = new SqlParameter("@FromDate", stFromDate);
            }

            string stDate = Request["ToDate"].ToString();
            if (stDate == "")
            {
                ToDate = new SqlParameter("@ToDate", DBNull.Value);
            }
            else
            {
                ToDate = new SqlParameter("@ToDate", stDate);
            }


            string bracode = Request["braCode"].ToString();
            if (bracode == "")
            {
                Bracode = new SqlParameter("@BraCode", DBNull.Value);
            }
            else
            {

                Bracode = new SqlParameter("@BraCode", Convert.ToInt32(bracode));
            }

            string projid = Request["ProjectID"].ToString();
            if (projid == "")
            {
                Projid = new SqlParameter("@ProjId", System.Data.SqlTypes.SqlInt32.Null);
            }
            else
            {

                Projid = new SqlParameter("@ProjId", Convert.ToInt32(projid));
            }
            string phaseid = Request["Phaseid"].ToString();
            if (phaseid == "")
            {
                Phaseid = new SqlParameter("@PhaseId", System.Data.SqlTypes.SqlInt32.Null);
            }
            else
            {

                Phaseid = new SqlParameter("@PhaseId", Convert.ToInt32(phaseid));
            }
            string catid = Request["CatID"].ToString();
            if (catid == "")
            {
                CatId = new SqlParameter("@CatID", System.Data.SqlTypes.SqlInt32.Null);
            }
            else
            {

                CatId = new SqlParameter("@CatID", Convert.ToInt32(catid));
            }
            string expid = Request["ExpID"].ToString();
            if (expid == "")
            {
                ExpId = new SqlParameter("@ExpId", System.Data.SqlTypes.SqlInt32.Null);
            }
            else
            {

                ExpId = new SqlParameter("@ExpId", Convert.ToInt32(expid));
            }

            ReportInfo Rep = OpenReport("PPrnt_Eng_ExpensesSummary");
            string _Query = "execute " + Rep.dataSource +
               " @comp = '" + StandPar.spComCode.Value + "'" +
                ", @CompNameA = '" + StandPar.spComNameA.Value + "'" +
                ", @CompNameE = '" + StandPar.spComNameE.Value + "'" +
                ", @BraNameA = '" + StandPar.spBraNameA.Value + "'" +
                ", @BraNameE = '" + StandPar.braNameE.Value + "'" +
                ", @LoginUser = '" + StandPar.spLoginUser.Value + "'" +
                ", @FromDate = '" +FromDate.Value+ "'" +
                ", @ToDate = '" +ToDate.Value + "'" +
                ", @Bracode = " + Bracode.Value + "," +
                "  @ProjId= " + Projid.Value + "" + "," +
                "  @PhaseId= " + Phaseid.Value + ","+
                "  @CatId= " + CatId.Value + "," +
                "  @ExpId= " + ExpId.Value + "" ;
         

            var query = db.Database.SqlQuery<PProc_Rep_Eng_ExpensesSummary_Result>(_Query).ToList();

            BindReport(Rep.reportName, query);
            return query;


        }
        public IEnumerable<PProc_Rep_Eng_ExpensesDetail_Result> PPrnt_Eng_ExpensesDetail()
        {
            ReportStandardParameters StandPar = getStandardParameters();

            SqlParameter Bracode = null;
            SqlParameter Projid = null;
            SqlParameter Phaseid = null;

            SqlParameter FromDate = null;
            SqlParameter ToDate = null;
            SqlParameter CatId = null;
            SqlParameter ExpId = null;
            string stFromDate = Request["FromDate"];
            if (stFromDate == "")
            {
                FromDate = new SqlParameter("@FromDate", DBNull.Value);
            }

            else
            {
                FromDate = new SqlParameter("@FromDate", stFromDate);
            }

            string stDate = Request["ToDate"];
            if (stDate == "")
            {
                ToDate = new SqlParameter("@ToDate", (object)DBNull.Value);
            }
            else
            {
                ToDate = new SqlParameter("@ToDate", stDate);
            }


            string bracode = Request["braCode"].ToString();
            if (bracode == "")
            {
                Bracode = new SqlParameter("@BraCode", DBNull.Value);
            }
            else
            {

                Bracode = new SqlParameter("@BraCode", Convert.ToInt32(bracode));
            }

            string projid = Request["ProjectID"].ToString();
            if (projid == "")
            {
                Projid = new SqlParameter("@ProjId", System.Data.SqlTypes.SqlInt32.Null);
            }
            else
            {

                Projid = new SqlParameter("@ProjId", Convert.ToInt32(projid));
            }
            string phaseid = Request["Phaseid"].ToString();
            if (phaseid == "")
            {
                Phaseid = new SqlParameter("@PhaseId", System.Data.SqlTypes.SqlInt32.Null);
            }
            else
            {

                Phaseid = new SqlParameter("@PhaseId", Convert.ToInt32(phaseid));
            }
            string catid = Request["CatID"].ToString();
            if (catid == "")
            {
                CatId = new SqlParameter("@CatID", System.Data.SqlTypes.SqlInt32.Null);
            }
            else
            {

                CatId = new SqlParameter("@CatID", Convert.ToInt32(catid));
            }
            string expid = Request["ExpID"].ToString();
            if (expid == "")
            {
                ExpId = new SqlParameter("@ExpId", System.Data.SqlTypes.SqlInt32.Null);
            }
            else
            {

                ExpId = new SqlParameter("@ExpId", Convert.ToInt32(expid));
            }

            ReportInfo Rep = OpenReport("PPrnt_Eng_ExpensesDetail");
            string _Query = "execute " + Rep.dataSource +
               " @comp = '" + StandPar.spComCode.Value + "'" +
                ", @CompNameA = '" + StandPar.spComNameA.Value + "'" +
                ", @CompNameE = '" + StandPar.spComNameE.Value + "'" +
                ", @BraNameA = '" + StandPar.spBraNameA.Value + "'" +
                ", @BraNameE = '" + StandPar.braNameE.Value + "'" +
                ", @LoginUser = '" + StandPar.spLoginUser.Value + "'" +
                ", @FromDate = '" + FromDate.Value + "'" +
                ", @ToDate = '" + ToDate.Value + "'" +
                ", @Bracode = " + Bracode.Value + "," +
                "  @ProjId= " + Projid.Value + "" + "," +
                "  @PhaseId= " + Phaseid.Value + "," +
                "  @CatId= " + CatId.Value + "," +
                "  @ExpId= " + ExpId.Value + "";


            var query = db.Database.SqlQuery<PProc_Rep_Eng_ExpensesDetail_Result>(_Query).ToList();

            BindReport(Rep.reportName, query);
            return query;


        }
        public IEnumerable<PProc_Rep_Eng_ProgressActivity_Result> PPrnt_Eng_ProgressActivity()
        {
            ReportStandardParameters StandPar = getStandardParameters();
           
            SqlParameter Bracode = null;
            SqlParameter Projid = null;
            SqlParameter Phaseid = null;

            SqlParameter FromDate = null;
            SqlParameter ToDate = null;

            string stFromDate = Request["FromDate"];
            if (stFromDate == "")
            {
                FromDate = new SqlParameter("@FromDate", DBNull.Value);
            }

            else
            {
                FromDate = new SqlParameter("@FromDate", stFromDate);
            }

            string stDate = Request["ToDate"];
            if (stDate == "")
            {
                ToDate = new SqlParameter("@ToDate", (object)DBNull.Value);
            }
            else
            {
                ToDate = new SqlParameter("@ToDate", stDate);
            }


            string bracode = Request["braCode"].ToString();
            if (bracode == "")
            {
                Bracode = new SqlParameter("@BraCode", DBNull.Value);
            }
            else
            {

                Bracode = new SqlParameter("@BraCode", Convert.ToInt32(bracode));
            }

            string projid = Request["ProjectID"].ToString();
            if (projid == "")
            {
                Projid = new SqlParameter("@ProjId", System.Data.SqlTypes.SqlInt32.Null);
            }
            else
            {

                Projid = new SqlParameter("@ProjId", Convert.ToInt32(projid));
            }
            string phaseid = Request["Phaseid"].ToString();
            if (phaseid == "")
            {
                Phaseid = new SqlParameter("@PhaseId", System.Data.SqlTypes.SqlInt32.Null);
            }
            else
            {

                Phaseid = new SqlParameter("@PhaseId", Convert.ToInt32(phaseid));
            }



            ReportInfo Rep = OpenReport("PPrnt_Eng_ProgressActivity");
            string _Query = "execute " + Rep.dataSource +                              
             " @comp = '" + StandPar.spComCode.Value + "'" +                          	
             ", @CompNameA = '" + StandPar.spComNameA.Value + "'" +                  	
             ", @CompNameE = '" + StandPar.spComNameE.Value + "'" +                  	
             ", @BraNameA = '" + StandPar.spBraNameA.Value + "'" +                   	
             ", @BraNameE = '" + StandPar.braNameE.Value + "'" +                     	
             ", @LoginUser = '" + StandPar.spLoginUser.Value + "'" +                 	
             ", @FromDate = '" + FromDate.Value + "'" +                              	
             ", @ToDate = '" + ToDate.Value + "'" +                                  	
             ", @Bracode = " + Bracode.Value + "," +                                 	
             "  @ProjId = " + Projid.Value + "" + "," +
             "  @PhaseId = " + Phaseid.Value + "";                                    	
                                                                                                                                      
            var query = db.Database.SqlQuery<PProc_Rep_Eng_ProgressActivity_Result>(_Query).ToList();

            BindReport(Rep.reportName, query);
            return query;
            
        }
        public IEnumerable<PProc_Rep_Eng_ProgressItem_Result> PPrnt_Eng_ProgressItem()
        {
            ReportStandardParameters StandPar = getStandardParameters();
            SqlParameter Bracode = null;
            SqlParameter Projid = null;
            SqlParameter Phaseid = null;

            SqlParameter FromDate = null;
            SqlParameter ToDate = null;

            string stFromDate= Request["FromDate"];
            if (stFromDate == "")
            {
                FromDate = new SqlParameter("@FromDate", DBNull.Value);
            }

            else
            {
                FromDate = new SqlParameter("@FromDate", stFromDate);
            }

            string stDate = Request["ToDate"];
            if (stDate == "")
            {
                ToDate = new SqlParameter("@ToDate", (object)DBNull.Value);
            }
            else
            {
                ToDate = new SqlParameter("@ToDate", stDate);
            }


            string bracode = Request["bracode"].ToString();
            if (bracode == "")
            {
                Bracode = new SqlParameter("@BraCode", DBNull.Value);
            }
            else
            {
                
                Bracode = new SqlParameter("@BraCode", Convert.ToInt32(bracode));
            }

            string projid = Request["ProjectID"].ToString();
            if (projid == "")
            {
                Projid = new SqlParameter("@ProjId", System.Data.SqlTypes.SqlInt32.Null);
            }
            else
            {

                Projid = new SqlParameter("@ProjId", Convert.ToInt32(projid));
            }
            string phaseid = Request["Phaseid"].ToString();
            if (phaseid == "")
            {
                Phaseid = new SqlParameter("@PhaseId", System.Data.SqlTypes.SqlInt32.Null);
            }
            else
            {

                Phaseid = new SqlParameter("@PhaseId", Convert.ToInt32(phaseid));
            }



            ReportInfo Rep = OpenReport("PPrnt_Eng_ProgressItem");
            string _Query = "execute " + Rep.dataSource +
           " @comp = '" + StandPar.spComCode.Value + "'" +
             ", @CompNameA = '" + StandPar.spComNameA.Value + "'" +
             ", @CompNameE = '" + StandPar.spComNameE.Value + "'" +
             ", @BraNameA = '" + StandPar.spBraNameA.Value + "'" +
             ", @BraNameE = '" + StandPar.braNameE.Value + "'" +
             ", @LoginUser = '" + StandPar.spLoginUser.Value + "'" +
             ", @FromDate = '" + FromDate.Value + "'" +
             ", @ToDate = '" + ToDate.Value + "'" +
             ", @Bracode = " + Bracode.Value + "," +
             "  @ProjId = " + Projid.Value + "" + "," +
             "  @PhaseId = " + Phaseid.Value + "";
            var query = db.Database.SqlQuery<PProc_Rep_Eng_ProgressItem_Result>(_Query).ToList();

            BindReport(Rep.reportName, query);
            return query;
        }
    

        public IEnumerable<PProc_Rep_Eng_BudgetRequirement_Result> Rep_Eng_BudgetRequirement()
        {
            ReportStandardParameters StandPar = getStandardParameters();
          
            SqlParameter spBraCode = null;
            SqlParameter spyearID = null;
            SqlParameter spMonid = null;
            SqlParameter spIsLabor = null;
            SqlParameter spIsEquip = null;
            SqlParameter spIsMat = null;
          
            string stBarID = Request["braCode"].ToString();
            int branCode = Convert.ToInt32(stBarID);
            spBraCode = new SqlParameter("@BraCode", branCode);
          
            int yearID = 0;
            string styearID = Request["yearID"].ToString();
            if (styearID == "")
            {
                spyearID = new SqlParameter("@yearID", DBNull.Value);
            }
            else
            {
                yearID = Convert.ToInt32(styearID);
                spyearID = new SqlParameter("@yearID", yearID);
            }
          
            int Monid = 0;
            string stMonid = Request["Monid"].ToString();
            if (stMonid == "")
            {
                spMonid = new SqlParameter("@Monid", DBNull.Value);
            }
            else
            {
                Monid = Convert.ToInt32(stMonid);
                spMonid = new SqlParameter("@Monid", Monid);
            }
          
            int IsLabor = 0;
            string stIsLabor = Request["IsLabor"].ToString();
            if (stIsLabor == "")
            {
                spIsLabor = new SqlParameter("@IsLabor", DBNull.Value);
            }
            else
            {
                IsLabor = Convert.ToInt32(stIsLabor);
                spIsLabor = new SqlParameter("@IsLabor", IsLabor);
            }
          
            int IsEquip = 0;
            string stIsEquip = Request["IsEquip"].ToString();
            if (stIsEquip == "")
            {
                spIsEquip = new SqlParameter("@IsEquip", DBNull.Value);
            }
            else
            {
                IsEquip = Convert.ToInt32(stIsEquip);
                spIsEquip = new SqlParameter("@IsEquip", IsEquip);
            }
          
            int IsMat = 0;
            string stIsMat = Request["IsMat"].ToString();
            if (stIsMat == "")
            {
                spIsMat = new SqlParameter("@IsMat", DBNull.Value);
            }
            else
            {
                IsMat = Convert.ToInt32(stIsMat);
                spIsMat = new SqlParameter("@IsMat", IsMat);
            }
          
            ReportInfo Rep = OpenReport("Rep_Eng_BudgetRequirement");

            string _Query = @" execute " + Rep.dataSource +
                " @comp = '" + StandPar.spComCode.Value + "', " +
                " @CompNameA = '" + StandPar.spComNameA.Value + "'," +
                " @CompNameE = '" + StandPar.spComNameE.Value + "'," +
                " @BraNameA = '" + StandPar.spBraNameA.Value + "'," +
                " @BraNameE = '" + StandPar.braNameE.Value + "'," +
                " @LoginUser = '" + StandPar.spLoginUser.Value + "'," +
                " @braCode = '" + spBraCode.Value + "'," +
                " @yearID = '" + spyearID.Value + "'," +
                " @Monid = '" + spMonid.Value + "'," +
                " @IsLabor = '" + spIsLabor.Value + "'," +
                " @IsEquip = '" + spIsEquip.Value + "'," +
                " @IsMat = '" + spIsMat.Value + "'";
          
            var query = db.Database.SqlQuery<PProc_Rep_Eng_BudgetRequirement_Result>(_Query).ToList();

            BindReport(Rep.reportName, query);
            return query;
        }

        public IEnumerable<PProc_Rep_Eng_BudgetEngineer_Result> Rep_Eng_BudgetEngineer()
        {
            ReportStandardParameters StandPar = getStandardParameters();

            SqlParameter spBraCode = null;
            SqlParameter spyearID = null;
            SqlParameter spMonid = null;
            SqlParameter spEngId = null;
           
            string stBarID = Request["braCode"].ToString();
            int branCode = Convert.ToInt32(stBarID);
            spBraCode = new SqlParameter("@BraCode", branCode);

            int yearID = 0;
            string styearID = Request["yearID"].ToString();
            if (styearID == "")
            {
                spyearID = new SqlParameter("@yearID", DBNull.Value);
            }
            else
            {
                yearID = Convert.ToInt32(styearID);
                spyearID = new SqlParameter("@yearID", yearID);
            }

            int Monid = 0;
            string stMonid = Request["Monid"].ToString();
            if (stMonid == "")
            {
                spMonid = new SqlParameter("@Monid", DBNull.Value);
            }
            else
            {
                Monid = Convert.ToInt32(stMonid);
                spMonid = new SqlParameter("@Monid", Monid);
            }

            int EngId = 0;
            string stEngId = Request["EngID"].ToString();
            if (stEngId == "")
            {
                spEngId = new SqlParameter("@EngId", DBNull.Value);
            }
            else
            {
                EngId = Convert.ToInt32(stEngId);
                spEngId = new SqlParameter("@EngId", EngId);
            }

        
            ReportInfo Rep = OpenReport("Rep_Eng_BudgetEngineer");

            string _Query = @" execute " + Rep.dataSource +
                " @comp = '" + StandPar.spComCode.Value + "', " +
                " @CompNameA = '" + StandPar.spComNameA.Value + "'," +
                " @CompNameE = '" + StandPar.spComNameE.Value + "'," +
                " @BraNameA = '" + StandPar.spBraNameA.Value + "'," +
                " @BraNameE = '" + StandPar.braNameE.Value + "'," +
                " @LoginUser = '" + StandPar.spLoginUser.Value + "'," +
                " @braCode = '" + spBraCode.Value + "'," +
                " @yearID = '" + spyearID.Value + "'," +
                " @Monid = '" + spMonid.Value + "'," +
                " @EngId = '" + spEngId.Value + "'";

            var query = db.Database.SqlQuery<PProc_Rep_Eng_BudgetEngineer_Result>(_Query).ToList();

            BindReport(Rep.reportName, query);
            return query;
        }
        public IEnumerable<PProc_Rep_Eng_BudgetBranch_Result> Rep_Eng_BudgetBranch()
        {
            ReportStandardParameters StandPar = getStandardParameters();

            SqlParameter spBraCode = null;
            SqlParameter spyearID = null;
            SqlParameter spMonid = null;
     


            string stBarID = Request["braCode"].ToString();
            int branCode = Convert.ToInt32(stBarID);
            spBraCode = new SqlParameter("@braCode", branCode);

            int yearID = 0;
            string styearID = Request["yearID"].ToString();
            if (styearID == "")
            {
                spyearID = new SqlParameter("@yearID", DBNull.Value);
            }
            else
            {
                yearID = Convert.ToInt32(styearID);
                spyearID = new SqlParameter("@yearID", yearID);
            }

            int Monid = 0;
            string stMonid = Request["Monid"].ToString();
            if (stMonid == "")
            {
                spMonid = new SqlParameter("@Monid", DBNull.Value);
            }
            else
            {
                Monid = Convert.ToInt32(stMonid);
                spMonid = new SqlParameter("@Monid", Monid);
            }


            ReportInfo Rep = OpenReport("Rep_Eng_BudgetBranch");

            string _Query = @" execute " + Rep.dataSource +
                " @comp = '" + StandPar.spComCode.Value + "', " +
                " @CompNameA = '" + StandPar.spComNameA.Value + "'," +
                " @CompNameE = '" + StandPar.spComNameE.Value + "'," +
                " @BraNameA = '" + StandPar.spBraNameA.Value + "'," +
                " @BraNameE = '" + StandPar.braNameE.Value + "'," +
                " @LoginUser = '" + StandPar.spLoginUser.Value + "'," +
                " @braCode = '" + spBraCode.Value + "'," +
                " @yearID = '" + spyearID.Value + "'," +
                " @Monid = '" + spMonid.Value + "'";

            var query = db.Database.SqlQuery<PProc_Rep_Eng_BudgetBranch_Result>(_Query).ToList();

            BindReport(Rep.reportName, query);
            return query;
        }

        public IEnumerable<PProc_Rep_eng_ProductionVSPRogress_Result> PProc_Rep_eng_ProductionVSPRogress()
        {
            ReportStandardParameters StandPar = getStandardParameters();

            SqlParameter Bracode = null;
            SqlParameter FromDate = null;
            SqlParameter ToDate = null;
            SqlParameter SiteEngineerId = null;
            SqlParameter SalsEngId = null;
            SqlParameter TypeReport = null;
            SqlParameter GroupType = null;




            string stFromDate = Request["FromDate"];
            if (stFromDate == "")
            {
                FromDate = new SqlParameter("@FromDate", DBNull.Value);
            }

            else
            {
                FromDate = new SqlParameter("@FromDate", stFromDate);
            }

            string stDate = Request["ToDate"];
            if (stDate == "")
            {
                ToDate = new SqlParameter("@ToDate", (object)DBNull.Value);
            }
            else
            {
                ToDate = new SqlParameter("@ToDate", stDate);
            }


            string bracode = Request["braCode"].ToString();
            if (bracode == "")
            {
                Bracode = new SqlParameter("@Bra", DBNull.Value);
            }
            else
            {

                Bracode = new SqlParameter("@Bra", Convert.ToInt32(bracode));
            }






            string stSiteEngineerId = Request["SiteEngineerId"].ToString();
            if (stSiteEngineerId == "" || stSiteEngineerId == "0")
            {
                SiteEngineerId = new SqlParameter("@SiteEngineerId", System.Data.SqlTypes.SqlInt32.Null);
            }
            else
            {

                SiteEngineerId = new SqlParameter("@SiteEngineerId", Convert.ToInt32(stSiteEngineerId));
            }


            string stSalsEngId = Request["SalsEngId"].ToString();
            if (stSalsEngId == ""|| stSalsEngId == "0")
            {
                SalsEngId = new SqlParameter("@SalsEngId", System.Data.SqlTypes.SqlInt32.Null);
            }
            else
            {

                SalsEngId = new SqlParameter("@SalsEngId", Convert.ToInt32(stSalsEngId));
            }



            string stTypeReport = Request["TypeReport"].ToString();
            if (stTypeReport == "")
            {
                TypeReport = new SqlParameter("@TypeReport", System.Data.SqlTypes.SqlInt32.Null);
            }
            else
            {

                TypeReport = new SqlParameter("@CatID", Convert.ToInt32(stTypeReport));
            }

            ReportInfo Rep = new ReportInfo();
            string stGroupType = Request["GroupType"].ToString();
            if (stGroupType == "0")
            {
                Rep = OpenReport("Rep_eng_ProductionVSPRogressBYphase");
            }
            else if (stGroupType == "1")
            {
                Rep = OpenReport("Rep_eng_ProductionVSPRogressBYproj");
            }
            else
            {

                Rep = OpenReport("Rep_eng_ProductionVSPRogressBYitem");
            }

            
            string _Query = "execute " + Rep.dataSource +
               " @comp = '" + StandPar.spComCode.Value + "'" +
                ", @CompNameA = '" + StandPar.spComNameA.Value + "'" +
                ", @CompNameE = '" + StandPar.spComNameE.Value + "'" +
                ", @BraNameA = '" + StandPar.spBraNameA.Value + "'" +
                ", @BraNameE = '" + StandPar.braNameE.Value + "'" +
                ", @LoginUser = '" + StandPar.spLoginUser.Value + "'" +
                ", @Bra = " + Bracode.Value + "" +
                ", @FromDate = '" + FromDate.Value + "'" +
                ", @ToDate = '" + ToDate.Value + "'" +
                ", @EngId= " + SiteEngineerId.Value + "" + 
                ", @SlsEngID= " + SalsEngId.Value + 
                ", @RepType= " + TypeReport.Value + "";


            var query = db.Database.SqlQuery<PProc_Rep_eng_ProductionVSPRogress_Result>(_Query).ToList();

            BindReport(Rep.reportName, query);
            return query;


        }

        //-------------------------------------------------------------------------------------------------END-------------


        public IEnumerable<PProc_Rep_Eng_BudgetCompany_Result> Rep_Eng_BudgetCompany()
        {
            ReportStandardParameters StandPar = getStandardParameters();

            
            SqlParameter spyearID = null;
            SqlParameter spMonid = null;
      
            
            int yearID = 0;
            string styearID = Request["yearID"].ToString();
            if (styearID == "")
            {
                spyearID = new SqlParameter("@yearID", DBNull.Value);
            }
            else
            {
                yearID = Convert.ToInt32(styearID);
                spyearID = new SqlParameter("@yearID", yearID);
            }

            int Monid = 0;
            string stMonid = Request["Monid"].ToString();
            if (stMonid == "")
            {
                spMonid = new SqlParameter("@Monid", DBNull.Value);
            }
            else
            {
                Monid = Convert.ToInt32(stMonid);
                spMonid = new SqlParameter("@Monid", Monid);
            }

       


            ReportInfo Rep = OpenReport("Rep_Eng_BudgetCompany");

            string _Query = @" execute " + Rep.dataSource +
                " @comp = '" + StandPar.spComCode.Value + "', " +
                " @CompNameA = '" + StandPar.spComNameA.Value + "'," +
                " @CompNameE = '" + StandPar.spComNameE.Value + "'," +
                " @BraNameA = '" + StandPar.spBraNameA.Value + "'," +
                " @BraNameE = '" + StandPar.braNameE.Value + "'," +
                " @LoginUser = '" + StandPar.spLoginUser.Value + "'," +
                " @yearID = '" + spyearID.Value + "'," +
                " @Monid = '" + spMonid.Value + "'";

            var query = db.Database.SqlQuery<PProc_Rep_Eng_BudgetCompany_Result>(_Query).ToList();

            BindReport(Rep.reportName, query);
            return query;
        }

        public IEnumerable<PProc_Prnt_Eng_Budget_Result> Prnt_Eng_Budget()
        {
            ReportStandardParameters StandPar = getStandardParameters();

            SqlParameter spBraCode = null;
            SqlParameter spyearID = null;
            SqlParameter spMonid = null;
            SqlParameter spEngId = null;

            string stBarID = Request["braCode"].ToString();
            int branCode = Convert.ToInt32(stBarID);
            spBraCode = new SqlParameter("@Bra", branCode);

            int yearID = 0;
            string styearID = Request["yearID"].ToString();
            if (styearID == "")
            {
                spyearID = new SqlParameter("@Yearid", DBNull.Value);
            }
            else
            {
                yearID = Convert.ToInt32(styearID);
                spyearID = new SqlParameter("@Yearid", yearID);
            }

            int Monid = 0;
            string stMonid = Request["MonthCode"].ToString();
            if (stMonid == "")
            {
                spMonid = new SqlParameter("@MonthCode", DBNull.Value);
            }
            else
            {
                Monid = Convert.ToInt32(stMonid);
                spMonid = new SqlParameter("@MonthCode", Monid);
            }

            int EngId = 0;
            string stEngId = Request["EngID"].ToString();
            if (stEngId == "")
            {
                spEngId = new SqlParameter("@EngId", DBNull.Value);
            }
            else
            {
                EngId = Convert.ToInt32(stEngId);
                spEngId = new SqlParameter("@EngId", EngId);
            }


            ReportInfo Rep = OpenReport("Prnt_Eng_Budget");

            string _Query = @" execute " + Rep.dataSource +
                " @comp = '" +
                StandPar.spComCode.Value + "', " +
                " @CompNameA = '" + StandPar.spComNameA.Value + "'," +
                " @CompNameE = '" + StandPar.spComNameE.Value + "'," +
                " @BraNameA = '" + StandPar.spBraNameA.Value + "'," +
                " @BraNameE = '" + StandPar.braNameE.Value + "'," +
                " @LoginUser = '" + StandPar.spLoginUser.Value + "'," +
                " @Bra = '" + spBraCode.Value + "'," +
                " @Yearid = '" + spyearID.Value + "'," +
                " @MonthCode = '" + spMonid.Value + "'," +
                " @EngId = '" + spEngId.Value + "'";

            var query = db.Database.SqlQuery<PProc_Prnt_Eng_Budget_Result>(_Query).ToList();

            BindReport(Rep.reportName, query);
            return query;
        }
        #endregion

        public IEnumerable<PProc_Rep_GRP_ProjectFollow_Result> PPrnt_GRPBySalesEngineer()
            
        {
            ReportStandardParameters StandPar = getStandardParameters();
            SqlParameter Bracode = null;
            SqlParameter SalesEngineerId = null;
            SqlParameter CustomerCategoryID = null;
            SqlParameter CustomerID = null;
            SqlParameter stuts = null;
            SqlParameter FromDate = null;
            SqlParameter ToDate = null;

            string stFromDate = Request["FromDate"];
            if (stFromDate == "")
            {
                FromDate = new SqlParameter("@FromDate", DBNull.Value);
            }

            else
            {
                FromDate = new SqlParameter("@FromDate", stFromDate);
            }

            string stDate = Request["ToDate"];
            if (stDate == "")
            {
                ToDate = new SqlParameter("@ToDate", (object)DBNull.Value);
            }
            else
            {
                ToDate = new SqlParameter("@ToDate", stDate);
            }
            string bracode = Request["braCode"].ToString();
            if (bracode == "")
            {
                Bracode = new SqlParameter("@BraCode", DBNull.Value);
            }
            else
            {
                Bracode = new SqlParameter("@BraCode", Convert.ToInt32(bracode));
            }

            string SalesEngineer = Request["SalesEngineerId"].ToString();
            if (SalesEngineer == "")
            {
                SalesEngineerId = new SqlParameter("@EngId", System.Data.SqlTypes.SqlInt32.Null);
            }
            else
            {
              SalesEngineerId = new SqlParameter("@EngId", Convert.ToInt32(SalesEngineerId));
            }
            string CustomerCategoryid = Request["CustomerCategoryID"].ToString();
            if (CustomerCategoryid == "")
            {
                CustomerCategoryID = new SqlParameter("@CatID", System.Data.SqlTypes.SqlInt32.Null);
            }
            else
            {
                CustomerCategoryID = new SqlParameter("@CatID", Convert.ToInt32(CustomerCategoryID));
            }

            string Customerid = Request["CustomerID"].ToString();
            if (Customerid == "")
            {
                CustomerID = new SqlParameter("@CustId", System.Data.SqlTypes.SqlInt32.Null);
            }
            else
            {

                CustomerID = new SqlParameter("@CustId", Convert.ToInt32(Customerid));
            }
            int ststt = 0;
            string Stuts = Request["Stat"].ToString();
            ststt = Convert.ToInt32(Stuts);
            if (Stuts == "")
            {
                stuts = new SqlParameter("@Status", System.Data.SqlTypes.SqlInt32.Null);
            }
            else
            {

                stuts = new SqlParameter("@Status", Convert.ToInt32(ststt));
            }



            ReportInfo Rep = OpenReport("PPrnt_GRPBySalesEngineer");                  
            string _Query = " execute " + Rep.dataSource +                            
                "  @comp = '" + StandPar.spComCode.Value + "'" +                      
                ", @CompNameA = '" + StandPar.spComNameA.Value + "'" +                
                ", @CompNameE = '" + StandPar.spComNameE.Value + "'" +                
                ", @BraNameA = '" + StandPar.spBraNameA.Value + "'" +                              
                ", @BraNameE = '" + StandPar.braNameE.Value + "'" +                                
                ", @LoginUser = '" + StandPar.spLoginUser.Value + "'" +
                "  @FromDate = '" + FromDate.Value + "'" +                                                  
                ", @ToDate = '" + ToDate.Value + "'" +
                ", @Bracode = " + Bracode.Value + "," +                               
                "  @EngId= " + SalesEngineerId.Value + "" + "," +
                "  @CatID= " + CustomerCategoryID.Value + "" + "," +                                         
                "  @CustId= " + CustomerCategoryID.Value + "" + "," +
                "  @Status=" + stuts.Value + "";






            var query = db.Database.SqlQuery<PProc_Rep_GRP_ProjectFollow_Result>(_Query).ToList();

            BindReport(Rep.reportName, query);
            return query;

        }

        public IEnumerable<PProc_Rep_GRP_DistributionProject_Result> Rep_GRP_DistributionProject()
        {
            ReportStandardParameters StandPar = getStandardParameters();
            SqlParameter Bracode = null;
            SqlParameter SalesEngineerId = null;
            SqlParameter CustomerCategoryID = null;
            SqlParameter CustomerID = null;
            SqlParameter stuts = null;

            string bracode = Request["braCode"].ToString();
            if (bracode == "")
            {
                Bracode = new SqlParameter("@BraCode", DBNull.Value);
            }
            else
            {
                Bracode = new SqlParameter("@BraCode", Convert.ToInt32(bracode));
            }

            string SalesEngineer = Request["SalesEngineerId"].ToString();
            if (SalesEngineer == "")
            {
                SalesEngineerId = new SqlParameter("@EngId", System.Data.SqlTypes.SqlInt32.Null);
            }
            else
            {
                SalesEngineerId = new SqlParameter("@EngId", Convert.ToInt32(SalesEngineer));
            }
            string CustomerCategoryid = Request["CustomerCategoryID"].ToString();
            if (CustomerCategoryid == "")
            {
                CustomerCategoryID = new SqlParameter("@CatID", System.Data.SqlTypes.SqlInt32.Null);
            }
            else
            {
                CustomerCategoryID = new SqlParameter("@CatID", Convert.ToInt32(CustomerCategoryid));
            }

            string Customerid = Request["CustomerID"].ToString();
            if (Customerid == "")
            {
                CustomerID = new SqlParameter("@CustId", System.Data.SqlTypes.SqlInt32.Null);
            }
            else
            {

                CustomerID = new SqlParameter("@CustId", Convert.ToInt32(Customerid));
            }
            int ststt = 0;
            string Stuts = Request["Stat"].ToString();
            ststt = Convert.ToInt32(Stuts);
            if (Stuts == "")
            {
                stuts = new SqlParameter("@Status", System.Data.SqlTypes.SqlInt32.Null);
            }
            else
            {

                stuts = new SqlParameter("@Status", Convert.ToInt32(ststt));
            }



            ReportInfo Rep = OpenReport("Rep_GRP_DistributionProject");
            string _Query = " execute " + Rep.dataSource +
                "  @comp = '" + StandPar.spComCode.Value + "'" +
                ", @CompNameA = '" + StandPar.spComNameA.Value + "'" +
                ", @CompNameE = '" + StandPar.spComNameE.Value + "'" +
                ", @BraNameA = '" + StandPar.spBraNameA.Value + "'" +
                ", @BraNameE = '" + StandPar.braNameE.Value + "'" +
                ", @LoginUser = '" + StandPar.spLoginUser.Value + "'" +
                ", @Bracode = " + Bracode.Value + "," +
                "  @EngId= " + SalesEngineerId.Value + "" + "," +
                "  @CatID= " + CustomerCategoryID.Value + "" + "," +
                "  @CustId= " + CustomerCategoryID.Value + "" + "," +
                "  @Status=" + stuts.Value + "";





            var query = db.Database.SqlQuery<PProc_Rep_GRP_DistributionProject_Result>(_Query).ToList();

            BindReport(Rep.reportName, query);
            return query;

        }
        public IEnumerable<PProc_Rep_GRP_DistributionArea_Result> Rep_GRP_DistributionArea()
        {
            ReportStandardParameters StandPar = getStandardParameters();
            SqlParameter Bracode = null;
            SqlParameter SalesEngineerId = null;
            SqlParameter CustomerCategoryID = null;
            SqlParameter CustomerID = null;
            SqlParameter stuts = null;

            string bracode = Request["braCode"].ToString();
            if (bracode == "")
            {
                Bracode = new SqlParameter("@BraCode", DBNull.Value);
            }
            else
            {
                Bracode = new SqlParameter("@BraCode", Convert.ToInt32(bracode));
            }

            string SalesEngineer = Request["SalesEngineerId"].ToString();
            if (SalesEngineer == "")
            {
                SalesEngineerId = new SqlParameter("@EngId", System.Data.SqlTypes.SqlInt32.Null);
            }
            else
            {
                SalesEngineerId = new SqlParameter("@EngId", Convert.ToInt32(SalesEngineer));
            }
            string CustomerCategoryid = Request["CustomerCategoryID"].ToString();
            if (CustomerCategoryid == "")
            {
                CustomerCategoryID = new SqlParameter("@CatID", System.Data.SqlTypes.SqlInt32.Null);
            }
            else
            {
                CustomerCategoryID = new SqlParameter("@CatID", Convert.ToInt32(CustomerCategoryid));
            }

            string Customerid = Request["CustomerID"].ToString();
            if (Customerid == "")
            {
                CustomerID = new SqlParameter("@CustId", System.Data.SqlTypes.SqlInt32.Null);
            }
            else
            {

                CustomerID = new SqlParameter("@CustId", Convert.ToInt32(Customerid));
            }
            int ststt = 0;
            string Stuts = Request["Stat"].ToString();
            ststt = Convert.ToInt32(Stuts);
            if (Stuts == "")
            {
                stuts = new SqlParameter("@Status", System.Data.SqlTypes.SqlInt32.Null);
            }
            else
            {

                stuts = new SqlParameter("@Status", Convert.ToInt32(ststt));
            }



            ReportInfo Rep = OpenReport("Rep_GRP_DistributionArea");
            string _Query = " execute " + Rep.dataSource +
                "  @comp = '" + StandPar.spComCode.Value + "'" +
                ", @CompNameA = '" + StandPar.spComNameA.Value + "'" +
                ", @CompNameE = '" + StandPar.spComNameE.Value + "'" +
                ", @BraNameA = '" + StandPar.spBraNameA.Value + "'" +
                ", @BraNameE = '" + StandPar.braNameE.Value + "'" +
                ", @LoginUser = '" + StandPar.spLoginUser.Value + "'" +
                ", @Bracode = " + Bracode.Value + "," +
                "  @EngId= " + SalesEngineerId.Value + "" + "," +
                "  @CatID= " + CustomerCategoryID.Value + "" + "," +
                "  @CustId= " + CustomerCategoryID.Value + "" + "," +
                "  @Status=" + stuts.Value + "";





            var query = db.Database.SqlQuery<PProc_Rep_GRP_DistributionArea_Result>(_Query).ToList();

            BindReport(Rep.reportName, query);
            return query;

        }
        //-------------------------- projectPhase-------------
        public IEnumerable<PProc_Rep_GRP_DistributionPaseByEngineer_Result> Rep_GRP_DistributionPaseByEngineer()
        {
            ReportStandardParameters StandPar = getStandardParameters();
            SqlParameter Bracode = null;
            SqlParameter SiteEngineerId = null;
            SqlParameter SalesEngineerId = null;
            SqlParameter ScopeCategoryID = null;
            SqlParameter ScopeID = null;
            SqlParameter CustomerCategoryID = null;
            SqlParameter CustomerID = null;
            SqlParameter IsRepair = null;
            SqlParameter stuts = null;



            string bracode = Request["braCode"].ToString();
            if (bracode == "")
            { Bracode = new SqlParameter("@BraCode", DBNull.Value); }
            else
            { Bracode = new SqlParameter("@BraCode", Convert.ToInt32(bracode)); }


            string SiteEngineer = Request["SiteEngineerId"].ToString();
            if (SiteEngineer == "")
            { SiteEngineerId = new SqlParameter("@SiteEngid", System.Data.SqlTypes.SqlInt32.Null); }
            else
            { SiteEngineerId = new SqlParameter("@SiteEngid", Convert.ToInt32(SiteEngineer)); }


            string ScopeCategory = Request["ScopeCategoryID"].ToString();
            if (ScopeCategory == "")
            { ScopeCategoryID = new SqlParameter("@ScopeCatID", System.Data.SqlTypes.SqlInt32.Null); }
            else
            { ScopeCategoryID = new SqlParameter("@ScopeCatID", Convert.ToInt32(ScopeCategory)); }


            string Scope = Request["ScopeID"].ToString();
            if (Scope == "")
            { ScopeID = new SqlParameter("@ScopeId", System.Data.SqlTypes.SqlInt32.Null); }
            else
            { ScopeID = new SqlParameter("@ScopeId", Convert.ToInt32(Scope)); }



            //string SalesEngineer = Request["SalesEngineerId"].ToString();
            //if (SalesEngineer == "")
            //{
            //    SalesEngineerId = new SqlParameter("@EngId", System.Data.SqlTypes.SqlInt32.Null);
            //}
            //else
            //{

            //    SalesEngineerId = new SqlParameter("@EngId", SalesEngineerId);
            //}


            string SalesEngineer = Request["SalesEngineerId"].ToString();
            if (SalesEngineer == "")
            { SalesEngineerId = new SqlParameter("@ScopeId", System.Data.SqlTypes.SqlInt32.Null); }
            else
            { SalesEngineerId = new SqlParameter("@ScopeId", Convert.ToInt32(SalesEngineer)); }






            string CustomerCategoryid = Request["custClassID"];
            if (CustomerCategoryid == "")
            {
                CustomerCategoryID = new SqlParameter("@CatID", "null");
            }
            else
            {

                CustomerCategoryID = new SqlParameter("@CatID", Convert.ToInt32(CustomerCategoryid));
            }

            string Customerid = Request["CustomerID"].ToString();
            if (Customerid == "")
            {
                CustomerID = new SqlParameter("@CustId", "null");
            }
            else
            {

                CustomerID = new SqlParameter("@CustId", Convert.ToInt32(Customerid));
            }
            int ststt = 0;
            string Stuts = Request["Stat"].ToString();
            ststt = Convert.ToInt32(Stuts);
            if (Stuts == "")
            {
                stuts = new SqlParameter("@Status", System.Data.SqlTypes.SqlInt32.Null);
            }
            else
            {

                stuts = new SqlParameter("@Status", ststt);
            }


            int Repair = 0;
            string isRepair = Request["IsRepair"].ToString();

            if (isRepair == "" || isRepair == "null")
            {
                IsRepair = new SqlParameter("@ISRepair", System.Data.SqlTypes.SqlInt32.Null);
            }
            else
            {
                Repair = Convert.ToInt32(isRepair);
                IsRepair = new SqlParameter("@ISRepair", Repair);
            }

            ReportInfo Rep = OpenReport("Rep_GRP_DistributionPaseByEngineer");
            string _Query = "execute " + Rep.dataSource +
                "  @comp = '" + StandPar.spComCode.Value + "'" +
                ", @CompNameA = '" + StandPar.spComNameA.Value + "'" +
                ", @CompNameE = '" + StandPar.spComNameE.Value + "'" +
                ", @BraNameA = '" + StandPar.spBraNameA.Value + "'" +
                ", @BraNameE = '" + StandPar.braNameE.Value + "'" +
                ", @LoginUser = '" + StandPar.spLoginUser.Value + "'" +
                ", @Bracode = " + Bracode.Value + "," +
                "  @SiteEngid= " + SiteEngineerId.Value + "" + "," +
                "  @ScopeCatID= " + ScopeCategoryID.Value + "" + "," +
                "  @ScopeId= " + ScopeID.Value + "" + "," +
                "  @EngId= " + SalesEngineerId.Value + "" + "," +
                "  @CatID= " + CustomerID.Value + "" + "," +
                "  @CustId= " + CustomerCategoryID.Value + "" + "," +
                "  @ISRepair= " + IsRepair.Value + "" + "," +
                "  @Status=" + stuts.Value + "";



            var query = db.Database.SqlQuery<PProc_Rep_GRP_DistributionPaseByEngineer_Result>(_Query).ToList();

            BindReport(Rep.reportName, query);
            return query;

        }

        public IEnumerable<PProc_Rep_GRP_DistributionPaseByScope_Result> Rep_GRP_DistributionPaseByScope()
        {
            ReportStandardParameters StandPar = getStandardParameters();
            SqlParameter Bracode = null;
            SqlParameter SiteEngineerId = null;
            SqlParameter SalesEngineerId = null;
            SqlParameter ScopeCategoryID = null;
            SqlParameter ScopeID = null;
            SqlParameter CustomerCategoryID = null;
            SqlParameter CustomerID = null;
            SqlParameter IsRepair = null;
            SqlParameter stuts = null;



            string bracode = Request["braCode"].ToString();
            if (bracode == "")
            {Bracode = new SqlParameter("@BraCode", DBNull.Value);}
            else
            {Bracode = new SqlParameter("@BraCode", Convert.ToInt32(bracode));}


            string SiteEngineer = Request["SiteEngineerId"].ToString();
            if (SiteEngineer == "")
            {SiteEngineerId = new SqlParameter("@SiteEngid", System.Data.SqlTypes.SqlInt32.Null);}
            else
            {SiteEngineerId = new SqlParameter("@SiteEngid", Convert.ToInt32(SiteEngineer));}


            string ScopeCategory = Request["ScopeCategoryID"].ToString();
            if (ScopeCategory == "")
            {ScopeCategoryID = new SqlParameter("@ScopeCatID", System.Data.SqlTypes.SqlInt32.Null);}
            else
            {ScopeCategoryID = new SqlParameter("@ScopeCatID", Convert.ToInt32(ScopeCategory));}


            string Scope = Request["ScopeID"].ToString();
            if (Scope == "")
            {ScopeID = new SqlParameter("@ScopeId", System.Data.SqlTypes.SqlInt32.Null);}
            else
            {ScopeID = new SqlParameter("@ScopeId", Convert.ToInt32(Scope));}



            //string SalesEngineer = Request["SalesEngineerId"].ToString();
            //if (SalesEngineer == "")
            //{
            //    SalesEngineerId = new SqlParameter("@EngId", System.Data.SqlTypes.SqlInt32.Null);
            //}
            //else
            //{

            //    SalesEngineerId = new SqlParameter("@EngId", SalesEngineerId);
            //}


            string SalesEngineer = Request["SalesEngineerId"].ToString();
            if (SalesEngineer == "")
            { SalesEngineerId = new SqlParameter("@ScopeId", System.Data.SqlTypes.SqlInt32.Null); }
            else
            { SalesEngineerId = new SqlParameter("@ScopeId", Convert.ToInt32(SalesEngineer)); }






            string CustomerCategoryid = Request["custClassID"];
            if (CustomerCategoryid == "")
            {
                CustomerCategoryID = new SqlParameter("@CatID","null");
            }
            else
            {

                CustomerCategoryID = new SqlParameter("@CatID", Convert.ToInt32(CustomerCategoryid));
            }

            string Customerid = Request["CustomerID"].ToString();
            if (Customerid == "")
            {
                CustomerID = new SqlParameter("@CustId", "null");
            }
            else
            {

                CustomerID = new SqlParameter("@CustId", Convert.ToInt32(Customerid));
            }
            int ststt = 0;
            string Stuts = Request["Stat"].ToString();
            ststt = Convert.ToInt32(Stuts);
            if (Stuts == "")
            {
                stuts = new SqlParameter("@Status", System.Data.SqlTypes.SqlInt32.Null);
            }
            else
            {

                stuts = new SqlParameter("@Status", ststt);
            }


            int Repair = 0;
            string isRepair = Request["IsRepair"].ToString();
           
            if (isRepair == "" || isRepair == "null")
            {
                IsRepair = new SqlParameter("@ISRepair", System.Data.SqlTypes.SqlInt32.Null);
            }
            else
            {
                Repair = Convert.ToInt32(isRepair);
                IsRepair = new SqlParameter("@ISRepair",Repair);
            }


            ReportInfo Rep = OpenReport("Rep_GRP_DistributionPaseByScope");
            string _Query = "execute " + Rep.dataSource +
                "  @comp = '" + StandPar.spComCode.Value + "'" +
                ", @CompNameA = '" + StandPar.spComNameA.Value + "'" +
                ", @CompNameE = '" + StandPar.spComNameE.Value + "'" +
                ", @BraNameA = '" + StandPar.spBraNameA.Value + "'" +
                ", @BraNameE = '" + StandPar.braNameE.Value + "'" +
                ", @LoginUser = '" + StandPar.spLoginUser.Value + "'" +
                ", @Bracode = " + Bracode.Value + "," +
                "  @SiteEngid= " + SiteEngineerId.Value + "" + "," +
                "  @ScopeCatID= " + ScopeCategoryID.Value + "" + "," +
                "  @ScopeId= " + ScopeID.Value + "" + "," +
                "  @EngId= " + SalesEngineerId.Value + "" + "," +
                "  @CatID= " + CustomerID.Value + "" + "," +
                "  @CustId= " + CustomerCategoryID.Value + "" + "," +
                "  @ISRepair= " + IsRepair.Value + "" + "," +
                "  @Status=" + stuts.Value + "";




            var query = db.Database.SqlQuery<PProc_Rep_GRP_DistributionPaseByScope_Result>(_Query).ToList();

            BindReport(Rep.reportName, query);
            return query;

        }
        //--------------------------PPrnt_ProjectWorking-------
        public IEnumerable<PProc_Rep_GRP_ProjectWork_Result> PPrnt_ProjectWorking()
        {
            ReportStandardParameters StandPar = getStandardParameters();
            SqlParameter Bracode = null;
            SqlParameter SiteEngineerId = null;
            SqlParameter SalesEngineerId = null;
            SqlParameter ScopeCategoryID = null;
            SqlParameter ScopeID = null;
            SqlParameter CustomerCategoryID = null;
            SqlParameter CustomerID = null;
            SqlParameter IsRepair = null;
            SqlParameter stuts = null;
            SqlParameter fromProjCode = null;
            SqlParameter toProjCode = null;
            SqlParameter FromDate = null;
            SqlParameter TODate = null;

            string bracode = Request["braCode"].ToString();
            if (bracode == "")
            {
                Bracode = new SqlParameter("@BraCode", DBNull.Value);
            }
            else
            {
                Bracode = new SqlParameter("@BraCode", Convert.ToInt32(bracode));
            }
            
            string FromProjCode = Request["FromProjCode"].ToString();
            if (FromProjCode == "")
            {
                fromProjCode = new SqlParameter("@Fromproj", System.Data.SqlTypes.SqlInt32.Null);
            }
            else
            {
                fromProjCode = new SqlParameter("@Fromproj", Convert.ToInt32(FromProjCode));
            }

            string ToProjCode = Request["ToProjCode"].ToString();
            if (ToProjCode == "")
            {
                toProjCode = new SqlParameter("@Toproj", System.Data.SqlTypes.SqlInt32.Null);
            }
            else
            {
                toProjCode = new SqlParameter("@Toproj", Convert.ToInt32(ToProjCode));
            }

            string fromDate = Request["fromDate"];
            if (fromDate == "")
            {
                FromDate = new SqlParameter("@FromDate", null);
            }
            else
            {
                FromDate = new SqlParameter("@FromDate", (fromDate));
            }

            string toDate = Request["toDate"];
            if (toDate == "")
            {
                TODate = new SqlParameter("@ToDate", null);
            }
            else
            {
                TODate = new SqlParameter("@ToDate", toDate);
            }
            
            string SiteEngineer = Request["SiteEngineerId"].ToString();
            if (SiteEngineer == "")
            {
                SiteEngineerId = new SqlParameter("@SiteEngid", System.Data.SqlTypes.SqlInt32.Null);
            }
            else
            {
                SiteEngineerId = new SqlParameter("@SiteEngid", Convert.ToInt32(SiteEngineer));
            }

            string ScopeCategory = Request["ScopeCategoryID"].ToString();
            if (ScopeCategory == "")
            {
                ScopeCategoryID = new SqlParameter("@ScopeCatID", System.Data.SqlTypes.SqlInt32.Null);
            }
            else
            {
                ScopeCategoryID = new SqlParameter("@ScopeCatID", Convert.ToInt32(ScopeCategory));
            }
            
            string Scope = Request["ScopeID"].ToString();
            if (Scope == "")
            {
                ScopeID = new SqlParameter("@ScopeId", System.Data.SqlTypes.SqlInt32.Null);
            }
            else
            {
                ScopeID = new SqlParameter("@ScopeId", Convert.ToInt32(Scope));
            }
            string SalesEngineer = Request["SalesEngineerId"].ToString();
            if (SalesEngineer == "")
            {
                SalesEngineerId = new SqlParameter("@EngId", System.Data.SqlTypes.SqlInt32.Null);
            }
            else
            {
                SalesEngineerId = new SqlParameter("@EngId", Convert.ToInt32(SalesEngineer));
            }
            string CustomerCategoryid = Request["CustomerCategoryID"];
            if (CustomerCategoryid == "")
            {
                CustomerCategoryID = new SqlParameter("@CatID", System.Data.SqlTypes.SqlInt32.Null);
            }
            else
            {
                CustomerCategoryID = new SqlParameter("@CatID", Convert.ToInt32(CustomerCategoryid));
            }

            string Customerid = Request["CustomerID"].ToString();
            if (Customerid == "")
            {
                CustomerID = new SqlParameter("@CustId", System.Data.SqlTypes.SqlInt32.Null);
            }
            else
            {
                CustomerID = new SqlParameter("@CustId", Convert.ToInt32(Customerid));
            }
            int ststt = 0;
            string Stuts = Request["Stat"].ToString();
            ststt = Convert.ToInt32(Stuts);
            if (Stuts == "")
            {
                stuts = new SqlParameter("@Status", System.Data.SqlTypes.SqlInt32.Null);
            }
            else
            {

                stuts = new SqlParameter("@Status", ststt);
            }


            string isRepair = Request["IsRepair"].ToString();
            if (isRepair == "null")
            {
                IsRepair = new SqlParameter("@ISRepair", System.Data.SqlTypes.SqlInt32.Null);
            }
            else
            {
                IsRepair = new SqlParameter("@ISRepair", Convert.ToInt32(isRepair));
            }


            ReportInfo Rep = OpenReport("PPrnt_ProjectWorking");
            string _Query = "execute " + Rep.dataSource +
                "  @comp = '" + StandPar.spComCode.Value + "'" +
                ", @CompNameA = '" + StandPar.spComNameA.Value + "'" +
                ", @CompNameE = '" + StandPar.spComNameE.Value + "'" +
                ", @BraNameA = '" + StandPar.spBraNameA.Value + "'" +
                ", @BraNameE = '" + StandPar.braNameE.Value + "'" +
                ", @LoginUser = '" + StandPar.spLoginUser.Value + "'" +
                 ", @FromDate ='" + FromDate.Value + "'" +
                ", @ToDate = '" + TODate.Value + "'" +
                ", @Fromproj = '" + fromProjCode.Value + "'" +
                ", @Toproj = '" + toProjCode.Value + "'" +
                ", @Bracode = " + Bracode.Value + "," +
                "  @EngId= " + SalesEngineerId.Value + "" + "," +
                "  @SiteEngid= " + SiteEngineerId.Value + "" + "," +
                "  @ScopeCatID= " + ScopeCategoryID.Value + "" + "," +
                "  @ScopeId= " + ScopeID.Value + "" + "," +
                "  @CatID= " + CustomerCategoryID.Value + "" + "," +
                "  @ISRepair= " + IsRepair.Value + "" + "," +
                "  @CustId= " + CustomerID.Value + "" + "," +
                "  @Status=" + stuts.Value + "";




            var query = db.Database.SqlQuery<PProc_Rep_GRP_ProjectWork_Result>(_Query).ToList();

            BindReport(Rep.reportName, query);
            return query;

        }
        //-----------------------   PPrnt_ProjectBandFollow----
        public IEnumerable<PProc_Rep_GRP_ProjectBandFollow_Result> PPrnt_ProjectBandFollow()
        {
            ReportStandardParameters StandPar = getStandardParameters();
           
            SqlParameter Bracode = null;
            SqlParameter Projid = null;


            SqlParameter FromDate = null;
            SqlParameter ToDate = null;

            string stFromDate = Request["FromDate"];
            if (stFromDate == "")
            {
                FromDate = new SqlParameter("@FromDate", DBNull.Value);
            }

            else
            {
                FromDate = new SqlParameter("@FromDate", stFromDate);
            }

            string stDate = Request["ToDate"];
            if (stDate == "")
            {
                ToDate = new SqlParameter("@ToDate", (object)DBNull.Value);
            }
            else
            {
                ToDate = new SqlParameter("@ToDate", stDate);
            }


            string bracode = Request["bracode"].ToString();
            if (bracode == "")
            {
                Bracode = new SqlParameter("@BraCode", DBNull.Value);
            }
            else
            {

                Bracode = new SqlParameter("@BraCode", Convert.ToInt32(bracode));
            }

            string projid = Request["ProjectID"].ToString();
            if (projid == "")
            {
                Projid = new SqlParameter("@ProjId", System.Data.SqlTypes.SqlInt32.Null);
            }
            else
            {

                Projid = new SqlParameter("@ProjId", Convert.ToInt32(projid));
            }
            



            ReportInfo Rep = OpenReport("PPrnt_ProjectBandFollow");
            string _Query = "execute " + Rep.dataSource +
                "  @comp = '" + StandPar.spComCode.Value + "'" +
                ", @CompNameA = '" + StandPar.spComNameA.Value + "'" +
                ", @CompNameE = '" + StandPar.spComNameE.Value + "'" +
                ", @BraNameA = '" + StandPar.spBraNameA.Value + "'" +
                ", @BraNameE = '" + StandPar.braNameE.Value + "'" +
                ", @LoginUser = '" + StandPar.spLoginUser.Value + "'" +
                ", @FromDate = '" + FromDate.Value + "'" +
                ", @ToDate = '" + ToDate.Value + "'" +
                ", @ProjId= " + Projid.Value + "";
               


            var query = db.Database.SqlQuery<PProc_Rep_GRP_ProjectBandFollow_Result>(_Query).ToList();

            BindReport(Rep.reportName, query);
            return query;
        }
        //--------------------------UP salasEng----------------
        public IEnumerable<PProc_Rep_GRP_ProjectFollow_Result> PPrnt_GRPBySalesEng()
        {
            ReportStandardParameters StandPar = getStandardParameters();
            SqlParameter Bracode = null;
            SqlParameter SalesEngineerId = null;
            SqlParameter CustomerCategoryID = null;
            SqlParameter CustomerID = null;
            SqlParameter stuts = null;
            SqlParameter fromProjCode = null;
            SqlParameter toProjCode = null;
            SqlParameter FromDate = null;
            SqlParameter TODate = null;


            int braa = 0;
            string bracode = Request["braCode"].ToString();
            if (bracode == "")
            {
                Bracode = new SqlParameter("@BraCode", DBNull.Value);
            }
            else
            {
                braa = Convert.ToInt32(bracode);
                Bracode = new SqlParameter("@BraCode",braa );
            }

            string SalesEngineer = Request["SalesEngineerId"].ToString();
            if (SalesEngineer == "")
            {
                SalesEngineerId = new SqlParameter("@EngId", System.Data.SqlTypes.SqlInt32.Null);
            }
            else
            {

                SalesEngineerId = new SqlParameter("@EngId", Convert.ToInt32(SalesEngineer));
            }

            string FromProjCode = Request["FromProjCode"].ToString();
            if (FromProjCode == "")
            {
                fromProjCode = new SqlParameter("@Fromproj", System.Data.SqlTypes.SqlInt32.Null);
            }
            else
            {

                fromProjCode = new SqlParameter("@Fromproj", Convert.ToInt32(FromProjCode));
            }
            

            string ToProjCode = Request["ToProjCode"].ToString();
            if (ToProjCode == "")
            {
                toProjCode = new SqlParameter("@Toproj", System.Data.SqlTypes.SqlInt32.Null);
            }
            else
            {

                toProjCode = new SqlParameter("@Toproj", Convert.ToInt32(ToProjCode));
            }



            string fromDate = Request["fromDate"];
            if (fromDate == "")
            {
                FromDate = new SqlParameter("@FromDate",null);
            }
            else
            {

                FromDate = new SqlParameter("@FromDate",(fromDate));
            }




            string toDate = Request["toDate"];
            if (toDate == "")
            {
                TODate = new SqlParameter("@ToDate", null);
            }
            else
            {

                TODate = new SqlParameter("@ToDate",toDate);
            }





            string CustomerCategoryid = Request["CustomerCategoryID"];
            if (CustomerCategoryid == "")
            {
                CustomerCategoryID = new SqlParameter("@CatID", System.Data.SqlTypes.SqlInt32.Null);
            }
            else
            {

                CustomerCategoryID = new SqlParameter("@CatID", Convert.ToInt32(CustomerCategoryid));
            }

            string Customerid = Request["CustomerID"].ToString();
            if (Customerid == "")
            {
                CustomerID = new SqlParameter("@CustId", System.Data.SqlTypes.SqlInt32.Null);
            }
            else
            {

                CustomerID = new SqlParameter("@CustId", Convert.ToInt32(Customerid));
            }

            string Stuts = Request["Stat"];
            if (Stuts == "")
            {
                stuts = new SqlParameter("@Status", System.Data.SqlTypes.SqlInt32.Null);
            }
            else
            {

                stuts = new SqlParameter("@Status", Convert.ToInt32(Stuts));
            }

            
            ReportInfo Rep = OpenReport("PPrnt_GRPBySalesEng");
            string _Query = "execute " + Rep.dataSource +
                "  @comp = '" + StandPar.spComCode.Value + "'" +
                ", @CompNameA = '" + StandPar.spComNameA.Value + "'" +
                ", @CompNameE = '" + StandPar.spComNameE.Value + "'" +
                ", @BraNameA = '" + StandPar.spBraNameA.Value + "'" +
                ", @BraNameE = '" + StandPar.braNameE.Value + "'" +
                ", @LoginUser = '" + StandPar.spLoginUser.Value + "'" +
                ", @Fromproj = '" + fromProjCode.Value + "'" +
                ", @Toproj = '" + toProjCode.Value + "'" +
                ", @FromDate ='" + FromDate.Value + "'" +
                ", @ToDate = '" + TODate.Value + "'" +
                ", @Bracode =" + Bracode.Value + "" +
                ", @EngId=" + SalesEngineerId.Value + "" + "," +
                "  @CatID= " + CustomerCategoryID.Value + "" + "," +
                "  @CustId= " + CustomerID.Value + "" + "," +
                "  @Status=" + stuts.Value+"";


            

            var query = db.Database.SqlQuery<PProc_Rep_GRP_ProjectFollow_Result>(_Query).ToList();

            BindReport(Rep.reportName, query);
            return query;

        }
        //------------------------- UP customer----------------
        public IEnumerable<PProc_Rep_GRP_ProjectFollow_Result> PPrnt_GRPByCustomer()
        {
            ReportStandardParameters StandPar = getStandardParameters();
            SqlParameter Bracode = null;
            SqlParameter SalesEngineerId = null;
            SqlParameter CustomerCategoryID = null;
            SqlParameter CustomerID = null;
            SqlParameter stuts = null;
            SqlParameter fromProjCode = null;
            SqlParameter toProjCode = null;
            SqlParameter FromDate = null;
            SqlParameter TODate = null;


            int braa = 0;
            string bracode = Request["braCode"].ToString();
            if (bracode == "")
            {
                Bracode = new SqlParameter("@BraCode", DBNull.Value);
            }
            else
            {
                braa = Convert.ToInt32(bracode);
                Bracode = new SqlParameter("@BraCode", braa);
            }

            string SalesEngineer = Request["SalesEngineerId"].ToString();
            if (SalesEngineer == "")
            {
                SalesEngineerId = new SqlParameter("@EngId", System.Data.SqlTypes.SqlInt32.Null);
            }
            else
            {

                SalesEngineerId = new SqlParameter("@EngId", Convert.ToInt32(SalesEngineer));
            }

            string FromProjCode = Request["FromProjCode"].ToString();
            if (FromProjCode == "")
            {
                fromProjCode = new SqlParameter("@Fromproj", System.Data.SqlTypes.SqlInt32.Null);
            }
            else
            {

                fromProjCode = new SqlParameter("@Fromproj", Convert.ToInt32(FromProjCode));
            }


            string ToProjCode = Request["ToProjCode"].ToString();
            if (ToProjCode == "")
            {
                toProjCode = new SqlParameter("@Toproj", System.Data.SqlTypes.SqlInt32.Null);
            }
            else
            {

                toProjCode = new SqlParameter("@Toproj", Convert.ToInt32(ToProjCode));
            }



            string fromDate = Request["fromDate"];
            if (fromDate == "")
            {
                FromDate = new SqlParameter("@FromDate", null);
            }
            else
            {

                FromDate = new SqlParameter("@FromDate", (fromDate));
            }




            string toDate = Request["toDate"];
            if (toDate == "")
            {
                TODate = new SqlParameter("@ToDate", null);
            }
            else
            {

                TODate = new SqlParameter("@ToDate", toDate);
            }





            string CustomerCategoryid = Request["CustomerCategoryID"];
            if (CustomerCategoryid == "")
            {
                CustomerCategoryID = new SqlParameter("@CatID", System.Data.SqlTypes.SqlInt32.Null);
            }
            else
            {

                CustomerCategoryID = new SqlParameter("@CatID", Convert.ToInt32(CustomerCategoryid));
            }

            string Customerid = Request["CustomerID"].ToString();
            if (Customerid == "")
            {
                CustomerID = new SqlParameter("@CustId", System.Data.SqlTypes.SqlInt32.Null);
            }
            else
            {

                CustomerID = new SqlParameter("@CustId", Convert.ToInt32(Customerid));
            }

            string Stuts = Request["Stat"];
            if (Stuts == "")
            {
                stuts = new SqlParameter("@Status", System.Data.SqlTypes.SqlInt32.Null);
            }
            else
            {

                stuts = new SqlParameter("@Status", Convert.ToInt32(Stuts));
            }


            ReportInfo Rep = OpenReport("PPrnt_GRPByCustomer");
            string _Query = "execute " + Rep.dataSource +
                "  @comp = '" + StandPar.spComCode.Value + "'" +
                ", @CompNameA = '" + StandPar.spComNameA.Value + "'" +
                ", @CompNameE = '" + StandPar.spComNameE.Value + "'" +
                ", @BraNameA = '" + StandPar.spBraNameA.Value + "'" +
                ", @BraNameE = '" + StandPar.braNameE.Value + "'" +
                ", @LoginUser = '" + StandPar.spLoginUser.Value + "'" +
                ", @Fromproj = '" + fromProjCode.Value + "'" +
                ", @Toproj = '" + toProjCode.Value + "'" +
                ", @FromDate ='" + FromDate.Value + "'" +
                ", @ToDate = '" + TODate.Value + "'" +
                ", @Bracode =" + Bracode.Value + "" +
                ", @EngId=" + SalesEngineerId.Value + "" + "," +
                "  @CatID= " + CustomerCategoryID.Value + "" + "," +
                "  @CustId= " + CustomerID.Value + "" + "," +
                "  @Status=" + stuts.Value + "";




            var query = db.Database.SqlQuery<PProc_Rep_GRP_ProjectFollow_Result>(_Query).ToList();

            BindReport(Rep.reportName, query);
            return query;

        }
        //-------------------------PPrnt_SiteEngineerBonus-
        public IEnumerable<PProc_Rep_GRP_SiteEngineerBonus_Result> PPrnt_SiteEngineerBonus()
        {
            ReportStandardParameters StandPar = getStandardParameters();

            SqlParameter Bracode = null;
            SqlParameter YearId = null;


            SqlParameter PeriodID = null;
            SqlParameter SiteEngCatID = null;

            string  styearid = Request["yearID"];
            if (styearid == "")
            {
                YearId = new SqlParameter("@YearNo", DBNull.Value);
            }

            else
            {
                YearId = new SqlParameter("@YearNo", Convert.ToInt32(styearid));
            }
            string stprdid = Request["ProjectID"];
            if (stprdid == "")
            {
                PeriodID = new SqlParameter("@MonthNo", DBNull.Value);
            }

            else
            {
                PeriodID = new SqlParameter("@MonthNo", Convert.ToInt32(stprdid));
            }


            string bracode = Request["bracode"].ToString();
            if (bracode == "")
            {
                Bracode = new SqlParameter("@BraCode", DBNull.Value);
            }
            else
            {

                Bracode = new SqlParameter("@BraCode", Convert.ToInt32(bracode));
            }

            string stSiteEng = Request["CatID"].ToString();
            if (stSiteEng == "")
            {
                SiteEngCatID = new SqlParameter("@SiteEngCatid", System.Data.SqlTypes.SqlInt32.Null);
            }
            else
            {

                SiteEngCatID = new SqlParameter("@SiteEngCatid", Convert.ToInt32(stSiteEng));
            }

            
            ReportInfo Rep = OpenReport("PPrnt_SiteEngineerBonus");
            string _Query = "execute " + Rep.dataSource +
                "  @comp = '" + StandPar.spComCode.Value + "'" +
                ", @CompNameA = '" + StandPar.spComNameA.Value + "'" +
                ", @CompNameE = '" + StandPar.spComNameE.Value + "'" +
                ", @BraNameA = '" + StandPar.spBraNameA.Value + "'" +
                ", @BraNameE = '" + StandPar.braNameE.Value + "'" +
                ", @LoginUser = '" + StandPar.spLoginUser.Value + "'" +
                ", @BraCode = '" + Bracode.Value + "'" +
                ", @YearNo = '" + YearId.Value + "'" +
                ", @SiteEngCatid = '" + SiteEngCatID.Value + "'" +
                ", @MonthNo= " + PeriodID.Value + "";



            var query = db.Database.SqlQuery<PProc_Rep_GRP_SiteEngineerBonus_Result>(_Query).ToList();

            BindReport(Rep.reportName, query);
            return query;
        }
        //-------------------------PPrnt_SiteEngineerBonus-
        public IEnumerable<PProc_Rep_GRP_SalesEngineerBonus_Result> PPrnt_SalesEngineerBonus()
        {
            ReportStandardParameters StandPar = getStandardParameters();

            SqlParameter Bracode = null;
            SqlParameter YearId = null;


            SqlParameter PeriodID = null;
            SqlParameter ToPeriodID = null;
            SqlParameter SiteEngCatID = null;

            string styearid = Request["yearID"];
            if (styearid == "")
            {
                YearId = new SqlParameter("@YearNo", DBNull.Value);
            }

            else
            {
                YearId = new SqlParameter("@YearNo", Convert.ToInt32(styearid));
            }
            string stprdid = Request["ProjectID"];
            if (stprdid == "")
            {
                PeriodID = new SqlParameter("@MonthNo", DBNull.Value);
            }

            else
            {
                PeriodID = new SqlParameter("@MonthNo", Convert.ToInt32(stprdid));
            }
            string sttoprdid = Request["Engid"];
            if (sttoprdid == "")
            {
                ToPeriodID = new SqlParameter("@toMonthNo", DBNull.Value);
            }

            else
            {
                ToPeriodID = new SqlParameter("@toMonthNo", Convert.ToInt32(sttoprdid));
            }


            string bracode = Request["bracode"].ToString();
            if (bracode == "")
            {
                Bracode = new SqlParameter("@BraCode", DBNull.Value);
            }
            else
            {

                Bracode = new SqlParameter("@BraCode", Convert.ToInt32(bracode));
            }

            string stSiteEng = Request["CatID"].ToString();
            if (stSiteEng == "")
            {
                SiteEngCatID = new SqlParameter("@SiteEngCatid", System.Data.SqlTypes.SqlInt32.Null);
            }
            else
            {

                SiteEngCatID = new SqlParameter("@SiteEngCatid", Convert.ToInt32(stSiteEng));
            }


            ReportInfo Rep = OpenReport("PPrnt_SalesEngineerBonus");
            string _Query = "execute " + Rep.dataSource +
                "  @comp = '" + StandPar.spComCode.Value + "'" +
                ", @CompNameA = '" + StandPar.spComNameA.Value + "'" +
                ", @CompNameE = '" + StandPar.spComNameE.Value + "'" +
                ", @BraNameA = '" + StandPar.spBraNameA.Value + "'" +
                ", @BraNameE = '" + StandPar.braNameE.Value + "'" +
                ", @LoginUser = '" + StandPar.spLoginUser.Value + "'" +
                ", @BraCode = " + Bracode.Value + "" +
                ", @YearNo = " + YearId.Value + "" +
                ", @SiteEngCatid = " + SiteEngCatID.Value + "" +
                ", @MonthNo= " + PeriodID.Value + ""+
                ", @toMonthNo= " + ToPeriodID.Value + ""; ;



            var query = db.Database.SqlQuery<PProc_Rep_GRP_SalesEngineerBonus_Result>(_Query).ToList();

            BindReport(Rep.reportName, query);
            return query;
        }
        public IEnumerable<PProc_Rep_GRP_ProjectEvaluationByPhase_Result> PPrnt_ProjectEvaluationByphase()
        {

            ReportStandardParameters StandPar = getStandardParameters();
            SqlParameter Bracode = null;
            SqlParameter SiteEngineerId = null;
            SqlParameter ScopeCategoryID = null;
            SqlParameter ScopeID = null;
            SqlParameter CustclassID = null;
            SqlParameter CustID = null;
            SqlParameter IsRepair = null;
            SqlParameter stuts = null;
            SqlParameter fromProjCode = null;
            SqlParameter toProjCode = null;
            SqlParameter FromDate = null;
            SqlParameter TODate = null;
            SqlParameter IsExecludeZero = null;
            SqlParameter ProdType = null;
            string bracode = Request["braCode"].ToString();
            if (bracode == "")
            {
                Bracode = new SqlParameter("@BraCode", DBNull.Value);
            }
            else
            {
                Bracode = new SqlParameter("@BraCode", Convert.ToInt32(bracode));
            }

            string FromProjCode = Request["FromProjCode"].ToString();
            if (FromProjCode == "")
            {
                fromProjCode = new SqlParameter("@Fromproj", System.Data.SqlTypes.SqlInt32.Null);
            }
            else
            {
                fromProjCode = new SqlParameter("@Fromproj", Convert.ToInt32(FromProjCode));
            }

            string ToProjCode = Request["ToProjCode"].ToString();
            if (ToProjCode == "")
            {
                toProjCode = new SqlParameter("@Toproj", System.Data.SqlTypes.SqlInt32.Null);
            }
            else
            {
                toProjCode = new SqlParameter("@Toproj", Convert.ToInt32(ToProjCode));
            }

            string fromDate = Request["fromDate"];
            if (fromDate == "")
            {
                FromDate = new SqlParameter("@FromDate", null);
            }
            else
            {
                FromDate = new SqlParameter("@FromDate", (fromDate));
            }

            string toDate = Request["toDate"];
            if (toDate == "")
            {
                TODate = new SqlParameter("@ToDate", null);
            }
            else
            {
                TODate = new SqlParameter("@ToDate", toDate);
            }

            string SiteEngineer = Request["SiteEngineerId"].ToString(); ;
            if (SiteEngineer == "")
            {
                SiteEngineerId = new SqlParameter("@SiteEngid", System.Data.SqlTypes.SqlInt32.Null);
            }
            else
            {
                SiteEngineerId = new SqlParameter("@SiteEngid", Convert.ToInt32(SiteEngineer));
            }

            string ScopeCategory = Request["scopeClassId"].ToString();
            if (ScopeCategory == "")
            {
                ScopeCategoryID = new SqlParameter("@ScopeCatID", System.Data.SqlTypes.SqlInt32.Null);
            }
            else
            {
                ScopeCategoryID = new SqlParameter("@ScopeCatID", Convert.ToInt32(ScopeCategory));
            }

            string Scope = Request["ScopeID"].ToString();
            if (Scope == "")
            {
                ScopeID = new SqlParameter("@ScopeId", System.Data.SqlTypes.SqlInt32.Null);
            }
            else
            {
                ScopeID = new SqlParameter("@ScopeId", Convert.ToInt32(Scope));
            }

            string Custclassid = Request["custClassID"];
            if (Custclassid == "")
            {
                CustclassID = new SqlParameter("@CatID", System.Data.SqlTypes.SqlInt32.Null);
            }
            else
            {
                CustclassID = new SqlParameter("@CatID", Convert.ToInt32(CustclassID));
            }

            string Custid = Request["CustomerID"].ToString();
            if (Custid == "")
            {
                CustID = new SqlParameter("@CustId", System.Data.SqlTypes.SqlInt32.Null);
            }
            else
            {
                CustID = new SqlParameter("@CustId", Convert.ToInt32(CustID));
            }

            string Stuts = Request["Stat"].ToString();
            int statt = 0;
            statt = Convert.ToInt32(Stuts);

            if (Stuts == "")
            {
                stuts = new SqlParameter("@Status", System.Data.SqlTypes.SqlInt32.Null);
            }
            else
            {
                stuts = new SqlParameter("@Status", Convert.ToInt32(statt));
            }

            

            string isRepair = Request["IsRepair"].ToString();
            if (isRepair == "")
            {
                IsRepair = new SqlParameter("@ISRepair", System.Data.SqlTypes.SqlInt32.Null);
            }
            else
            {
                IsRepair = new SqlParameter("@ISRepair", Convert.ToInt32(IsRepair));
            }

            string isExecludeZero = Request["IsExecludeZero"];
            if (isExecludeZero == "")
            {
                IsExecludeZero = new SqlParameter("@IsExecludeZero", System.Data.SqlTypes.SqlInt32.Null);
            }
            else
            {
                IsExecludeZero = new SqlParameter("@IsExecludeZero", Convert.ToInt32(isExecludeZero));
            }
            string prodType = Request["ProdType"];
            if (prodType == "")
            {
                ProdType = new SqlParameter("@ProdType", System.Data.SqlTypes.SqlInt32.Null);
            }
            else
            {
                ProdType = new SqlParameter("@ProdType", Convert.ToInt32(prodType));
            }


            ReportInfo Rep = OpenReport("PPrnt_ProjectEvaluationByphase");
            string _Query = "execute " + Rep.dataSource +
                "  @comp = '" + StandPar.spComCode.Value + "'" +
                ", @CompNameA = '" + StandPar.spComNameA.Value + "'" +
                ", @CompNameE = '" + StandPar.spComNameE.Value + "'" +
                ", @BraNameA = '" + StandPar.spBraNameA.Value + "'" +
                ", @BraNameE = '" + StandPar.braNameE.Value + "'" +
                ", @LoginUser = '" + StandPar.spLoginUser.Value + "'" +
                ", @Bracode = '" + Bracode.Value + "'" +
                ", @FromDate = '" + FromDate.Value + "'" +
                ", @ToDate = '" + TODate.Value + "'" +
                ", @Fromproj = " + fromProjCode.Value + "" +
                ", @Toproj = " + toProjCode.Value + "" +
                ", @SiteEngid = " + SiteEngineerId.Value + ""+
                ", @ScopeCatID = " + ScopeCategoryID.Value + "" + 
                ", @ScopeId = " + ScopeID.Value + ""+
                ", @CatID = " + CustclassID.Value + ""+
                ", @CustId = " + CustID.Value + "" +
                ", @Status = " + stuts.Value + "" +
                ", @IsExecludeZero = " + IsExecludeZero.Value + ""+
                ", @ISRepair=" + IsRepair.Value + "" +
                ", @ProdType=" + ProdType.Value + "";





            var query = db.Database.SqlQuery<PProc_Rep_GRP_ProjectEvaluationByPhase_Result>(_Query).ToList();

            BindReport(Rep.reportName, query);
            return query;


        }       
        //-------------------------PPrnt_ProjectEvaluationByProject-----

        public IEnumerable<PProc_Rep_GRP_ProjectEvaluationByProject_Result> PPrnt_ProjectEvaluationByProject()
        {

            ReportStandardParameters StandPar = getStandardParameters();
            SqlParameter Bracode = null;
            SqlParameter SiteEngineerId = null;
            SqlParameter ScopeCategoryID = null;
            SqlParameter ScopeID = null;
            SqlParameter CustclassID = null;
            SqlParameter CustID = null;
            SqlParameter IsRepair = null;
            SqlParameter stuts = null;
            SqlParameter fromProjCode = null;
            SqlParameter toProjCode = null;
            SqlParameter FromDate = null;
            SqlParameter TODate = null;
            SqlParameter IsExecludeZero = null;
            SqlParameter ProdType = null;
            string bracode = Request["braCode"].ToString();
            if (bracode == "")
            {
                Bracode = new SqlParameter("@BraCode", DBNull.Value);
            }
            else
            {
                Bracode = new SqlParameter("@BraCode", Convert.ToInt32(bracode));
            }

            string FromProjCode = Request["FromProjCode"].ToString();
            if (FromProjCode == "")
            {
                fromProjCode = new SqlParameter("@Fromproj", System.Data.SqlTypes.SqlInt32.Null);
            }
            else
            {
                fromProjCode = new SqlParameter("@Fromproj", Convert.ToInt32(FromProjCode));
            }

            string ToProjCode = Request["ToProjCode"].ToString();
            if (ToProjCode == "")
            {
                toProjCode = new SqlParameter("@Toproj", System.Data.SqlTypes.SqlInt32.Null);
            }
            else
            {
                toProjCode = new SqlParameter("@Toproj", Convert.ToInt32(ToProjCode));
            }

            string fromDate = Request["fromDate"];
            if (fromDate == "")
            {
                FromDate = new SqlParameter("@FromDate", null);
            }
            else
            {
                FromDate = new SqlParameter("@FromDate", (fromDate));
            }

            string toDate = Request["toDate"];
            if (toDate == "")
            {
                TODate = new SqlParameter("@ToDate", null);
            }
            else
            {
                TODate = new SqlParameter("@ToDate", toDate);
            }

            string SiteEngineer = Request["SiteEngineerId"].ToString(); ;
            if (SiteEngineer == "")
            {
                SiteEngineerId = new SqlParameter("@SiteEngid", System.Data.SqlTypes.SqlInt32.Null);
            }
            else
            {
                SiteEngineerId = new SqlParameter("@SiteEngid", Convert.ToInt32(SiteEngineer));
            }

            string ScopeCategory = Request["scopeClassId"].ToString();
            if (ScopeCategory == "")
            {
                ScopeCategoryID = new SqlParameter("@ScopeCatID", System.Data.SqlTypes.SqlInt32.Null);
            }
            else
            {
                ScopeCategoryID = new SqlParameter("@ScopeCatID", Convert.ToInt32(ScopeCategory));
            }

            string Scope = Request["ScopeID"].ToString();
            if (Scope == "")
            {
                ScopeID = new SqlParameter("@ScopeId", System.Data.SqlTypes.SqlInt32.Null);
            }
            else
            {
                ScopeID = new SqlParameter("@ScopeId", Convert.ToInt32(Scope));
            }

            string Custclassid = Request["custClassID"];
            if (Custclassid == "")
            {
                CustclassID = new SqlParameter("@CatID", System.Data.SqlTypes.SqlInt32.Null);
            }
            else
            {
                CustclassID = new SqlParameter("@CatID", Convert.ToInt32(CustclassID));
            }

            string Custid = Request["CustomerID"].ToString();
            if (Custid == "")
            {
                CustID = new SqlParameter("@CustId", System.Data.SqlTypes.SqlInt32.Null);
            }
            else
            {
                CustID = new SqlParameter("@CustId", Convert.ToInt32(CustID));
            }

            string Stuts = Request["Stat"].ToString();
            int statt = 0;
            statt = Convert.ToInt32(Stuts);

            if (Stuts == "")
            {
                stuts = new SqlParameter("@Status", System.Data.SqlTypes.SqlInt32.Null);
            }
            else
            {
                stuts = new SqlParameter("@Status", Convert.ToInt32(statt));
            }


            string isRepair = Request["IsRepair"].ToString();
            if (isRepair == "")
            {
                IsRepair = new SqlParameter("@ISRepair", System.Data.SqlTypes.SqlInt32.Null);
            }
            else
            {
                IsRepair = new SqlParameter("@ISRepair", Convert.ToInt32(IsRepair));
            }

            string isExecludeZero = Request["IsExecludeZero"];
            if (isExecludeZero == "")
            {
                IsExecludeZero = new SqlParameter("@IsExecludeZero", System.Data.SqlTypes.SqlInt32.Null);
            }
            else
            {
                IsExecludeZero = new SqlParameter("@IsExecludeZero", Convert.ToInt32(isExecludeZero));
            }

            string prodType = Request["ProdType"];
            if (prodType == "")
            {
                ProdType = new SqlParameter("@ProdType", System.Data.SqlTypes.SqlInt32.Null);
            }
            else
            {
                ProdType = new SqlParameter("@ProdType", Convert.ToInt32(prodType));
            }
            ReportInfo Rep = OpenReport("PPrnt_ProjectEvaluationByProject");
            string _Query = "execute " + Rep.dataSource +
                "  @comp = '" + StandPar.spComCode.Value + "'" +
                ", @CompNameA = '" + StandPar.spComNameA.Value + "'" +
                ", @CompNameE = '" + StandPar.spComNameE.Value + "'" +
                ", @BraNameA = '" + StandPar.spBraNameA.Value + "'" +
                ", @BraNameE = '" + StandPar.braNameE.Value + "'" +
                ", @LoginUser = '" + StandPar.spLoginUser.Value + "'" +
                ", @Bracode = '" + Bracode.Value + "'" +
                ", @FromDate = '" + FromDate.Value + "'" +
                ", @ToDate = '" + TODate.Value + "'" +
                ", @Fromproj = " + fromProjCode.Value + "" +
                ", @Toproj = " + toProjCode.Value + "" +
                ", @SiteEngid = " + SiteEngineerId.Value + "" +
                ", @ScopeCatID = " + ScopeCategoryID.Value + "" +
                ", @ScopeId = " + ScopeID.Value + "" +
                ", @CatID = " + CustclassID.Value + "" +
                ", @CustId = " + CustID.Value + "" +
                ", @Status = " + stuts.Value + "" +
                ", @IsExecludeZero = " + IsExecludeZero.Value + "" +
                ", @ISRepair= " + IsRepair.Value + "" +
                ", @ProdType=" + ProdType.Value + "";




            var query = db.Database.SqlQuery<PProc_Rep_GRP_ProjectEvaluationByProject_Result>(_Query).ToList();

            BindReport(Rep.reportName, query);
            return query;


        }    
        //---------------------------------PPrnt_rep_ProjectCostphase---------------
        public IEnumerable<PProc_Rep_GRP_ProjectCostByPhase_Result> PPrnt_rep_ProjectCostphase()
        {

            ReportStandardParameters StandPar = getStandardParameters();
            SqlParameter Bracode = null;
            SqlParameter SiteEngineerId = null;
            SqlParameter ScopeCategoryID = null;
            SqlParameter ScopeID = null;
            SqlParameter CustclassID = null;
            SqlParameter CustID = null;
            SqlParameter stuts = null;
            SqlParameter fromProjCode = null;
            SqlParameter toProjCode = null;
            SqlParameter FromDate = null;
            SqlParameter TODate = null;
            SqlParameter IsExecludeZero = null;

            string bracode = Request["braCode"].ToString();
            if (bracode == "")
            {
                Bracode = new SqlParameter("@BraCode", DBNull.Value);
            }
            else
            {
                Bracode = new SqlParameter("@BraCode", Convert.ToInt32(bracode));
            }

            string FromProjCode = Request["FromProjCode"].ToString();
            if (FromProjCode == "")
            {
                fromProjCode = new SqlParameter("@Fromproj", System.Data.SqlTypes.SqlInt32.Null);
            }
            else
            {
                fromProjCode = new SqlParameter("@Fromproj", Convert.ToInt32(FromProjCode));
            }

            string ToProjCode = Request["ToProjCode"].ToString();
            if (ToProjCode == "")
            {
                toProjCode = new SqlParameter("@Toproj", System.Data.SqlTypes.SqlInt32.Null);
            }
            else
            {
                toProjCode = new SqlParameter("@Toproj", Convert.ToInt32(ToProjCode));
            }

            string fromDate = Request["fromDate"];
            if (fromDate == "")
            {
                FromDate = new SqlParameter("@FromDate", null);
            }
            else
            {
                FromDate = new SqlParameter("@FromDate", (fromDate));
            }

            string toDate = Request["toDate"];
            if (toDate == "")
            {
                TODate = new SqlParameter("@ToDate", null);
            }
            else
            {
                TODate = new SqlParameter("@ToDate", toDate);
            }

            string SiteEngineer = Request["SiteEngineerId"].ToString(); ;
            if (SiteEngineer == "")
            {
                SiteEngineerId = new SqlParameter("@SiteEngid", System.Data.SqlTypes.SqlInt32.Null);
            }
            else
            {
                SiteEngineerId = new SqlParameter("@SiteEngid", Convert.ToInt32(SiteEngineer));
            }

            string ScopeCategory = Request["ScopeCategoryID"].ToString();
            if (ScopeCategory == "")
            {
                ScopeCategoryID = new SqlParameter("@ScopeCatID", System.Data.SqlTypes.SqlInt32.Null);
            }
            else
            {
                ScopeCategoryID = new SqlParameter("@ScopeCatID", Convert.ToInt32(ScopeCategory));
            }

            string Scope = Request["ScopeID"].ToString();
            if (Scope == "")
            {
                ScopeID = new SqlParameter("@ScopeId", System.Data.SqlTypes.SqlInt32.Null);
            }
            else
            {
                ScopeID = new SqlParameter("@ScopeId", Convert.ToInt32(ScopeID));
            }

            string Custclsaaid = Request["CustclassID"];
            if (Custclsaaid == "")
            {
                CustclassID = new SqlParameter("@CatID", System.Data.SqlTypes.SqlInt32.Null);
            }
            else
            {
                CustclassID = new SqlParameter("@CatID", Convert.ToInt32(CustclassID));
            }

            string Custid = Request["CustomerID"].ToString();
            if (Custid == "")
            {
                CustID = new SqlParameter("@CustId", System.Data.SqlTypes.SqlInt32.Null);
            }
            else
            {
                CustID = new SqlParameter("@CustId", Convert.ToInt32(CustID));
            }
            string Stuts = Request["Stat"].ToString();
            int statt = 0;
            statt = Convert.ToInt32(Stuts);

            if (Stuts == "")
            {
                stuts = new SqlParameter("@Status", System.Data.SqlTypes.SqlInt32.Null);
            }
            else
            {
                stuts = new SqlParameter("@Status", Convert.ToInt32(statt));
            }


            string isExecludeZero = Request["IsExecludeZero"];
            if (isExecludeZero == "")
            {
                IsExecludeZero = new SqlParameter("@IsExecludeZero", System.Data.SqlTypes.SqlInt32.Null);
            }
            else
            {
                IsExecludeZero = new SqlParameter("@IsExecludeZero", Convert.ToInt32(isExecludeZero));
            }


            ReportInfo Rep = OpenReport("PPrnt_rep_ProjectCostphase");
            string _Query = "execute " + Rep.dataSource +
                "  @comp = '" + StandPar.spComCode.Value + "'" +
                ", @CompNameA = '" + StandPar.spComNameA.Value + "'" +
                ", @CompNameE = '" + StandPar.spComNameE.Value + "'" +
                ", @BraNameA = '" + StandPar.spBraNameA.Value + "'" +
                ", @BraNameE = '" + StandPar.braNameE.Value + "'" +
                ", @LoginUser = '" + StandPar.spLoginUser.Value + "'" +
                ", @Bracode = '" + Bracode.Value + "'" +
                ", @FromDate = '" + FromDate.Value + "'" +
                ", @ToDate = '" + TODate.Value + "'" +
                ", @Fromproj = " + fromProjCode.Value + "" +
                ", @Toproj = " + toProjCode.Value + "" +
                ", @SiteEngid = " + SiteEngineerId.Value + "" +
                ", @ScopeCatID = " + ScopeCategoryID.Value + "" +
                ", @ScopeId = " + ScopeID.Value + "" +
                ", @CatID = " + CustclassID.Value + "" +
                ", @CustId = " + CustID.Value + "" +
                ", @Status = " + stuts.Value + "" +
                ", @IsExecludeZero = " + IsExecludeZero.Value + ""; 
                
        



            var query = db.Database.SqlQuery<PProc_Rep_GRP_ProjectCostByPhase_Result>(_Query).ToList();

            BindReport(Rep.reportName, query);
            return query;


        }
        //-----------------PPrnt_rep_ProjectCostProject------------------
        public IEnumerable<PProc_Rep_GRP_ProjectCostByProject_Result> PPrnt_rep_ProjectCostProject()
            
        {
            ReportStandardParameters StandPar = getStandardParameters();
            SqlParameter Bracode = null;
            SqlParameter SiteEngineerId = null;
            SqlParameter ScopeCategoryID = null;
            SqlParameter ScopeID = null;
            SqlParameter CustclassID = null;
            SqlParameter CustID = null;
            SqlParameter stuts = null;
            SqlParameter fromProjCode = null;
            SqlParameter toProjCode = null;
            SqlParameter FromDate = null;
            SqlParameter TODate = null;
            SqlParameter IsExecludeZero = null;

            string bracode = Request["braCode"].ToString();
            if (bracode == "")
            {
                Bracode = new SqlParameter("@BraCode", DBNull.Value);
            }
            else
            {
                Bracode = new SqlParameter("@BraCode", Convert.ToInt32(bracode));
            }

            string FromProjCode = Request["FromProjCode"].ToString();
            if (FromProjCode == "")
            {
                fromProjCode = new SqlParameter("@Fromproj", System.Data.SqlTypes.SqlInt32.Null);
            }
            else
            {
                fromProjCode = new SqlParameter("@Fromproj", Convert.ToInt32(FromProjCode));
            }

            string ToProjCode = Request["ToProjCode"].ToString();
            if (ToProjCode == "")
            {
                toProjCode = new SqlParameter("@Toproj", System.Data.SqlTypes.SqlInt32.Null);
            }
            else
            {
                toProjCode = new SqlParameter("@Toproj", Convert.ToInt32(ToProjCode));
            }

            string fromDate = Request["fromDate"];
            if (fromDate == "")
            {
                FromDate = new SqlParameter("@FromDate", null);
            }
            else
            {
                FromDate = new SqlParameter("@FromDate", (fromDate));
            }

            string toDate = Request["toDate"];
            if (toDate == "")
            {
                TODate = new SqlParameter("@ToDate", null);
            }
            else
            {
                TODate = new SqlParameter("@ToDate", toDate);
            }

            string SiteEngineer = Request["SiteEngineerId"].ToString(); ;
            if (SiteEngineer == "")
            {
                SiteEngineerId = new SqlParameter("@SiteEngid", System.Data.SqlTypes.SqlInt32.Null);
            }
            else
            {
                SiteEngineerId = new SqlParameter("@SiteEngid", Convert.ToInt32(SiteEngineer));
            }

            string ScopeCategory = Request["ScopeCategoryID"].ToString();
            if (ScopeCategory == "")
            {
                ScopeCategoryID = new SqlParameter("@ScopeCatID", System.Data.SqlTypes.SqlInt32.Null);
            }
            else
            {
                ScopeCategoryID = new SqlParameter("@ScopeCatID", Convert.ToInt32(ScopeCategory));
            }

            string Scope = Request["ScopeID"].ToString();
            if (Scope == "")
            {
                ScopeID = new SqlParameter("@ScopeId", System.Data.SqlTypes.SqlInt32.Null);
            }
            else
            {
                ScopeID = new SqlParameter("@ScopeId", Convert.ToInt32(ScopeID));
            }

            string Custclsaaid = Request["CustclassID"];
            if (Custclsaaid == "")
            {
                CustclassID = new SqlParameter("@CatID", System.Data.SqlTypes.SqlInt32.Null);
            }
            else
            {
                CustclassID = new SqlParameter("@CatID", Convert.ToInt32(CustclassID));
            }

            string Custid = Request["CustomerID"].ToString();
            if (Custid == "")
            {
                CustID = new SqlParameter("@CustId", System.Data.SqlTypes.SqlInt32.Null);
            }
            else
            {
                CustID = new SqlParameter("@CustId", Convert.ToInt32(CustID));
            }
            string Stuts = Request["Stat"].ToString();
            int statt = 0;
            statt = Convert.ToInt32(Stuts);

            if (Stuts == "")
            {
                stuts = new SqlParameter("@Status", System.Data.SqlTypes.SqlInt32.Null);
            }
            else
            {
                stuts = new SqlParameter("@Status", Convert.ToInt32(statt));
            }


            string isExecludeZero = Request["IsExecludeZero"];
            if (isExecludeZero == "")
            {
                IsExecludeZero = new SqlParameter("@IsExecludeZero", System.Data.SqlTypes.SqlInt32.Null);
            }
            else
            {
                IsExecludeZero = new SqlParameter("@IsExecludeZero", Convert.ToInt32(isExecludeZero));
            }



            ReportInfo Rep = OpenReport("PPrnt_rep_ProjectCostProject");
            string _Query = "execute " + Rep.dataSource +
                "  @comp = '" + StandPar.spComCode.Value + "'" +
                ", @CompNameA = '" + StandPar.spComNameA.Value + "'" +
                ", @CompNameE = '" + StandPar.spComNameE.Value + "'" +
                ", @BraNameA = '" + StandPar.spBraNameA.Value + "'" +
                ", @BraNameE = '" + StandPar.braNameE.Value + "'" +
                ", @LoginUser = '" + StandPar.spLoginUser.Value + "'" +
                ", @Bracode = '" + Bracode.Value + "'" +
                ", @FromDate = '" + FromDate.Value + "'" +
                ", @ToDate = '" + TODate.Value + "'" +
                ", @Fromproj = " + fromProjCode.Value + "" +
                ", @Toproj = " + toProjCode.Value + "" +
                ", @SiteEngid = " + SiteEngineerId.Value + "" +
                ", @ScopeCatID = " + ScopeCategoryID.Value + "" +
                ", @ScopeId = " + ScopeID.Value + "" +
                 ", @CatID = " + CustclassID.Value + "" +
                ", @CustId = " + CustID.Value + "" +
                ", @Status = " + stuts.Value + "" +
                ", @IsExecludeZero = " + IsExecludeZero.Value + "";

            

            var query = db.Database.SqlQuery<PProc_Rep_GRP_ProjectCostByProject_Result>(_Query).ToList();

            BindReport(Rep.reportName, query);
            return query;


        }
        //----------------------------------Print_GRP_MaterialCoverageByproject----
        public IEnumerable<PProc_Rep_GRP_MeterialCoveragePhase_Result> Print_GRP_MaterialCoverageByPhase()

        {

            ReportStandardParameters StandPar = getStandardParameters();
            SqlParameter Bracode = null;
            SqlParameter SiteEngineerId = null;
            SqlParameter ScopeCategoryID = null;
            SqlParameter ScopeID = null;
            SqlParameter CustclassID = null;
            SqlParameter CustID = null;
            SqlParameter stuts = null;
            SqlParameter fromProjCode = null;
            SqlParameter toProjCode = null;
            SqlParameter FromDate = null;
            SqlParameter TODate = null;
            SqlParameter fromItemNo = null;
            SqlParameter toItemNo = null;


            string bracode = Request["braCode"].ToString();
            if (bracode == "")
            {
                Bracode = new SqlParameter("@BraCode", DBNull.Value);
            }
            else
            {
                Bracode = new SqlParameter("@BraCode", Convert.ToInt32(bracode));
            }

            string FromProjCode = Request["FromProjCode"].ToString();
            if (FromProjCode == "")
            {
                fromProjCode = new SqlParameter("@Fromproj", System.Data.SqlTypes.SqlInt32.Null);
            }
            else
            {
                fromProjCode = new SqlParameter("@Fromproj", Convert.ToInt32(FromProjCode));
            }

            string ToProjCode = Request["ToProjCode"].ToString();
            if (ToProjCode == "")
            {
                toProjCode = new SqlParameter("@Toproj", System.Data.SqlTypes.SqlInt32.Null);
            }
            else
            {
                toProjCode = new SqlParameter("@Toproj", Convert.ToInt32(ToProjCode));
            }
            
            string FromItem = Request["FromItemNo"].ToString();
            if (FromItem == "")
            {
                fromItemNo = new SqlParameter("@FromItem", "");
            }
            else
            {
                fromItemNo = new SqlParameter("@FromItem", FromItem);
            }

            string ToItemNo = Request["ToItemNo"].ToString();
            if (ToItemNo == "" )
            {
                toItemNo = new SqlParameter("@ToItem", "");
            }
            else
            {
                toItemNo = new SqlParameter("@ToItem", ToItemNo);
            }

           string fromDate = Request["fromDate"];
            if (fromDate == "")
            {
                FromDate = new SqlParameter("@FromDate", null);
            }
            else
            {
                FromDate = new SqlParameter("@FromDate", (fromDate));
            }

            string toDate = Request["toDate"];
            if (toDate == "")
            {
                TODate = new SqlParameter("@ToDate", null);
            }
            else
            {
                TODate = new SqlParameter("@ToDate", toDate);
            }

            string SiteEngineer = Request["SiteEngineerId"].ToString(); ;
            if (SiteEngineer == "")
            {
                SiteEngineerId = new SqlParameter("@SiteEngid", System.Data.SqlTypes.SqlInt32.Null);
            }
            else
            {
                SiteEngineerId = new SqlParameter("@SiteEngid", Convert.ToInt32(SiteEngineer));
            }

            string ScopeCategory = Request["ScopeCategoryID"].ToString();
            if (ScopeCategory == "")
            {
                ScopeCategoryID = new SqlParameter("@ScopeCatID", System.Data.SqlTypes.SqlInt32.Null);
            }
            else
            {
                ScopeCategoryID = new SqlParameter("@ScopeCatID", Convert.ToInt32(ScopeCategory));
            }

            string Scope = Request["ScopeID"].ToString();
            if (Scope == "")
            {
                ScopeID = new SqlParameter("@ScopeId", System.Data.SqlTypes.SqlInt32.Null);
            }
            else
            {
                ScopeID = new SqlParameter("@ScopeId", Convert.ToInt32(Scope));
            }

            string Custclassid = Request["CustClassID"];
            if (Custclassid == "")
            {
                CustclassID = new SqlParameter("@CatID", System.Data.SqlTypes.SqlInt32.Null);
            }
            else
            {
                CustclassID = new SqlParameter("@CatID", Convert.ToInt32(Custclassid));
            }

            string Custid = Request["CustomerID"].ToString();
            if (Custid == "")
            {
                CustID = new SqlParameter("@CustId", System.Data.SqlTypes.SqlInt32.Null);
            }
            else
            {
                CustID = new SqlParameter("@CustId", Convert.ToInt32(Custid));
            }

            string Stuts = Request["Stat"].ToString();
            int statt = 0;
            statt = Convert.ToInt32(Stuts);

            //if (statt == "")
            //{
            //    stuts = new SqlParameter("@Status", System.Data.SqlTypes.SqlInt32.Null);
            //}
            //else
            //{
                stuts = new SqlParameter("@Status", Convert.ToInt32(statt));
            //}


            ReportInfo Rep = OpenReport("Print_GRP_MaterialCoverageByPhase");
            string _Query = "execute " + Rep.dataSource +
                "  @comp = '" + StandPar.spComCode.Value + "'" +
                ", @CompNameA = '" + StandPar.spComNameA.Value + "'" +
                ", @CompNameE = '" + StandPar.spComNameE.Value + "'" +
                ", @BraNameA = '" + StandPar.spBraNameA.Value + "'" +
                ", @BraNameE = '" + StandPar.braNameE.Value + "'" +
                ", @LoginUser = '" + StandPar.spLoginUser.Value + "'" +
                ", @Bracode = '" + Bracode.Value + "'" +
                ", @FromDate = '" + FromDate.Value + "'" +
                ", @ToDate = '" + TODate.Value + "'" +
                ", @FromItem = '" + fromItemNo.Value + "'" +
                ", @ToItem = '" + toItemNo.Value + "'" +
                ", @Fromproj = " + fromProjCode.Value + "" +                       
                ", @Toproj = " + toProjCode.Value + "" +                           
                ", @SiteEngid = " + SiteEngineerId.Value + "" +
                ", @ScopeCatID = " + ScopeCategoryID.Value + "" +
                ", @ScopeId = " + ScopeID.Value + "" +
                ", @CatID = " + CustclassID.Value + "" +
                ", @CustId = " + CustID.Value + "" +
                ", @Status = " + stuts.Value + "";
                        
           var query = db.Database.SqlQuery<PProc_Rep_GRP_MeterialCoveragePhase_Result>(_Query).ToList();

            BindReport(Rep.reportName, query);
            return query;


        }
        //----------
        public IEnumerable<PProc_Rep_GRP_MeterialCoverageItem_Result> Print_GRP_MaterialCoverageByitem()

        {

            ReportStandardParameters StandPar = getStandardParameters();
            SqlParameter Bracode = null;
            SqlParameter SiteEngineerId = null;
            SqlParameter ScopeCategoryID = null;
            SqlParameter ScopeID = null;                     
            SqlParameter CustclassID = null;                 
            SqlParameter CustID = null;                                            
            SqlParameter stuts = null;
            SqlParameter fromProjCode = null;
            SqlParameter toProjCode = null;
            SqlParameter FromDate = null;
            SqlParameter TODate = null;
            SqlParameter fromItemNo = null;
            SqlParameter toItemNo = null;


            string bracode = Request["braCode"].ToString();
            if (bracode == "")
            {
                Bracode = new SqlParameter("@BraCode", DBNull.Value);
            }
            else
            {
                Bracode = new SqlParameter("@BraCode", Convert.ToInt32(bracode));
            }

            string FromProjCode = Request["FromProjCode"].ToString();
            if (FromProjCode == "")
            {
                fromProjCode = new SqlParameter("@Fromproj", System.Data.SqlTypes.SqlInt32.Null);
            }
            else
            {
                fromProjCode = new SqlParameter("@Fromproj", Convert.ToInt32(FromProjCode));
            }

            string ToProjCode = Request["ToProjCode"].ToString();
            if (ToProjCode == "")
            {
                toProjCode = new SqlParameter("@Toproj", System.Data.SqlTypes.SqlInt32.Null);
            }
            else
            {
                toProjCode = new SqlParameter("@Toproj", Convert.ToInt32(ToProjCode));
            }

            string FromItem = Request["FromItemNo"].ToString();
            if (FromItem == "")
            {
                fromItemNo = new SqlParameter("@FromItem", "");
            }
            else
            {
                fromItemNo = new SqlParameter("@FromItem", FromItem);
            }

            string ToItemNo = Request["ToItemNo"].ToString();
            if (ToItemNo == "")
            {
                toItemNo = new SqlParameter("@ToItem", "");
            }
            else
            {
                toItemNo = new SqlParameter("@ToItem", ToItemNo);
            }

            string fromDate = Request["fromDate"];
            if (fromDate == "")
            {
                FromDate = new SqlParameter("@FromDate", null);
            }
            else
            {
                FromDate = new SqlParameter("@FromDate", (fromDate));
            }

            string toDate = Request["toDate"];
            if (toDate == "")
            {
                TODate = new SqlParameter("@ToDate", null);
            }
            else
            {
                TODate = new SqlParameter("@ToDate", toDate);
            }

            string SiteEngineer = Request["SiteEngineerId"].ToString(); ;
            if (SiteEngineer == "")
            {
                SiteEngineerId = new SqlParameter("@SiteEngid", System.Data.SqlTypes.SqlInt32.Null);
            }
            else
            {
                SiteEngineerId = new SqlParameter("@SiteEngid", Convert.ToInt32(SiteEngineer));
            }

            string ScopeCategory = Request["ScopeCategoryID"].ToString();
            if (ScopeCategory == "")
            {
                ScopeCategoryID = new SqlParameter("@ScopeCatID", System.Data.SqlTypes.SqlInt32.Null);
            }
            else
            {
                ScopeCategoryID = new SqlParameter("@ScopeCatID", Convert.ToInt32(ScopeCategory));
            }

            string Scope = Request["ScopeID"].ToString();
            if (Scope == "")
            {
                ScopeID = new SqlParameter("@ScopeId", System.Data.SqlTypes.SqlInt32.Null);
            }
            else
            {
                ScopeID = new SqlParameter("@ScopeId", Convert.ToInt32(Scope));
            }

            string CustomerCategoryid = Request["custClassID"];
            if (CustomerCategoryid == "")
            {
                 CustclassID = new SqlParameter("@CatID", System.Data.SqlTypes.SqlInt32.Null);
            }
            else
            {
                CustclassID = new SqlParameter("@CatID", Convert.ToInt32(CustomerCategoryid));
            }

            string Custid = Request["CustomerID"].ToString();
            if (Custid == "")
            {
                CustID = new SqlParameter("@CustId", System.Data.SqlTypes.SqlInt32.Null);
            }
            else
            {
                CustID = new SqlParameter("@CustId", Convert.ToInt32(Custid));
            }

            string Stuts = Request["Stat"].ToString();
            int statt = 0;
            statt = Convert.ToInt32(Stuts);

            //if (statt == "")
            //{
            //    stuts = new SqlParameter("@Status", System.Data.SqlTypes.SqlInt32.Null);
            //}
            //else
            //{
                stuts = new SqlParameter("@Status", Convert.ToInt32(statt));
            //}


            ReportInfo Rep = OpenReport("Print_GRP_MaterialCoverageByitem");
            string _Query = "execute " + Rep.dataSource +
                "  @comp = '" + StandPar.spComCode.Value + "'" +
                ", @CompNameA = '" + StandPar.spComNameA.Value + "'" +
                ", @CompNameE = '" + StandPar.spComNameE.Value + "'" +
                ", @BraNameA = '" + StandPar.spBraNameA.Value + "'" +                                                     
                ", @BraNameE = '" + StandPar.braNameE.Value + "'" +                                                            
                ", @LoginUser = '" + StandPar.spLoginUser.Value + "'" +
                ", @Bracode = '" + Bracode.Value + "'" +
                ", @FromDate = '" + FromDate.Value + "'" +
                ", @ToDate = '" + TODate.Value + "'" +
                ", @FromItem = '" + fromItemNo.Value + "'" +
                ", @ToItem = '" + toItemNo.Value + "'" +
                ", @Fromproj = " + fromProjCode.Value + "" +
                ", @Toproj = " + toProjCode.Value + "" +
                ", @SiteEngid = " + SiteEngineerId.Value + "" +
                ", @ScopeCatID = " + ScopeCategoryID.Value + "" +
                ", @ScopeId = " + ScopeID.Value + "" +
                ", @CatID = " + CustclassID.Value + "" +
                ", @CustId = " + CustID.Value + "" +
                ", @Status = " + stuts.Value + "";

            var query = db.Database.SqlQuery<PProc_Rep_GRP_MeterialCoverageItem_Result>(_Query).ToList();

            BindReport(Rep.reportName, query);
            return query;


        }



        public IEnumerable<PProc_Rep_GRP_ProjectCostVarianceByProject_Result> Rep_ProjectCostVarianceByProject()
        {
            ReportStandardParameters StandPar = getStandardParameters();
            SqlParameter Bracode = null;
            SqlParameter FromDate = null;
            SqlParameter TODate = null;
            SqlParameter fromProjCode = null;
            SqlParameter toProjCode = null;
            SqlParameter SiteEngineerId = null;             
            SqlParameter ScopeCategoryID = null;
            SqlParameter ScopeID = null;
            SqlParameter CustomerCategoryID = null;
            SqlParameter CustomerID = null;             
            SqlParameter stuts = null;
            SqlParameter IsExecludeZero = null;


            string bracode = Request["braCode"].ToString();
            if (bracode == "")
            {
                Bracode = new SqlParameter("@BraCode", DBNull.Value);
            }
            else
            {
                Bracode = new SqlParameter("@BraCode", Convert.ToInt32(bracode));
            }

            string fromDate = Request["fromDate"];
            if (fromDate == "")
            {
                FromDate = new SqlParameter("@FromDate", null);
            }
            else
            {
                FromDate = new SqlParameter("@FromDate", (fromDate));
            }

            string toDate = Request["toDate"];
            if (toDate == "")
            {
                TODate = new SqlParameter("@ToDate", null);
            }
            else
            {
                TODate = new SqlParameter("@ToDate", toDate);
            }


            
            string FromProjCode = Request["FromProjCode"].ToString();
            if (FromProjCode == "")
            {
                fromProjCode = new SqlParameter("@Fromproj", System.Data.SqlTypes.SqlInt32.Null);
            }
            else
            {
                fromProjCode = new SqlParameter("@Fromproj", Convert.ToInt32(FromProjCode));
            }

            string ToProjCode = Request["ToProjCode"].ToString();
            if (ToProjCode == "")
            {
                toProjCode = new SqlParameter("@Toproj", System.Data.SqlTypes.SqlInt32.Null);
            }
            else
            {
                toProjCode = new SqlParameter("@Toproj", Convert.ToInt32(ToProjCode));
            }

                      

            string SiteEngineer = Request["SiteEngineerId"].ToString();
            if (SiteEngineer == "")
            {
                SiteEngineerId = new SqlParameter("@SiteEngid", System.Data.SqlTypes.SqlInt32.Null);
            }
            else
            {
                SiteEngineerId = new SqlParameter("@SiteEngid", Convert.ToInt32(SiteEngineer));
            }



            string ScopeCategory = Request["ScopeCategoryID"].ToString();
            if (ScopeCategory == "")
            {
                ScopeCategoryID = new SqlParameter("@ScopeCatID", System.Data.SqlTypes.SqlInt32.Null);
            }
            else
            {
                ScopeCategoryID = new SqlParameter("@ScopeCatID", Convert.ToInt32(ScopeCategory));
            }

            string Scope = Request["ScopeID"].ToString();
            if (Scope == "")
            {
                ScopeID = new SqlParameter("@ScopeId", System.Data.SqlTypes.SqlInt32.Null);
            }
            else
            {
                ScopeID = new SqlParameter("@ScopeId", Convert.ToInt32(Scope));
            }
           

            string CustomerCategoryid = Request["CatID"];
            if (CustomerCategoryid == "")
            {
                CustomerCategoryID = new SqlParameter("@CatID", System.Data.SqlTypes.SqlInt32.Null);
            }
            else
            {
                CustomerCategoryID = new SqlParameter("@CatID", Convert.ToInt32(CustomerCategoryid));
            }

            string Customerid = Request["Custid"].ToString();
            if (Customerid == "")
            {
                CustomerID = new SqlParameter("@CustId", System.Data.SqlTypes.SqlInt32.Null);
            }
            else
            {
                CustomerID = new SqlParameter("@CustId", Convert.ToInt32(Customerid));
            }
            int ststt = 0;
            string Stuts = Request["Stat"].ToString();
            ststt = Convert.ToInt32(Stuts);
            if (Stuts == "")
            {
                stuts = new SqlParameter("@Status", System.Data.SqlTypes.SqlInt32.Null);
            }
            else
            {

                stuts = new SqlParameter("@Status", ststt);
            }

            string isExecludeZero = Request["IsExecludeZero"];
            if (isExecludeZero == "")
            {
                IsExecludeZero = new SqlParameter("@IsExecludeZero", System.Data.SqlTypes.SqlInt32.Null);
            }
            else
            {
                IsExecludeZero = new SqlParameter("@IsExecludeZero", Convert.ToInt32(isExecludeZero));
            }


            ReportInfo Rep = OpenReport("Rep_ProjectCostVarianceByProject");
            string _Query = "execute " + Rep.dataSource +                                         
                "  @comp = '" + StandPar.spComCode.Value + "'" +                                  
                ", @CompNameA = '" + StandPar.spComNameA.Value + "'" +                            
                ", @CompNameE = '" + StandPar.spComNameE.Value + "'" +                            
                ", @BraNameA = '" + StandPar.spBraNameA.Value + "'" +                             
                ", @BraNameE = '" + StandPar.braNameE.Value + "'" +                               
                ", @LoginUser = '" + StandPar.spLoginUser.Value + "'" +                           
                ", @Bracode = " + Bracode.Value + "" +                                           
                ", @FromDate ='" + FromDate.Value + "'" +                                         
                ", @ToDate = '" + TODate.Value + "'" +                                            
                ", @Fromproj = '" + fromProjCode.Value + "'" +                                    
                ", @Toproj = '" + toProjCode.Value + "'" +                                        
                ", @SiteEngid= " + SiteEngineerId.Value + "" + "," +
                "  @ScopeCatID= " + ScopeCategoryID.Value + "" + "," +
                "  @ScopeId= " + ScopeID.Value + "" + "," +
                "  @CatID= " + CustomerCategoryID.Value + "" + "," +
                "  @CustId= " + CustomerID.Value + "" + "," +
                "  @Status=" + stuts.Value + "" +
                ", @IsExecludeZero = " + IsExecludeZero.Value + "";




            var query = db.Database.SqlQuery<PProc_Rep_GRP_ProjectCostVarianceByProject_Result>(_Query).ToList();

            BindReport(Rep.reportName, query);
            return query;

        }
        public IEnumerable<PProc_Rep_GRP_ProjectCostVarianceByPhase_Result> Rep_ProjectCostVarianceByPhase()
        {
            ReportStandardParameters StandPar = getStandardParameters();
            SqlParameter Bracode = null;
            SqlParameter FromDate = null;
            SqlParameter TODate = null;
            SqlParameter fromProjCode = null;
            SqlParameter toProjCode = null;
            SqlParameter SiteEngineerId = null;
            SqlParameter ScopeCategoryID = null;
            SqlParameter ScopeID = null;
            SqlParameter CustomerCategoryID = null;
            SqlParameter CustomerID = null;
            SqlParameter stuts = null;
            SqlParameter IsExecludeZero = null;


            string bracode = Request["braCode"].ToString();
            if (bracode == "")
            {
                Bracode = new SqlParameter("@BraCode", DBNull.Value);
            }
            else
            {
                Bracode = new SqlParameter("@BraCode", Convert.ToInt32(bracode));
            }

            string fromDate = Request["fromDate"];
            if (fromDate == "")
            {
                FromDate = new SqlParameter("@FromDate", null);
            }
            else
            {
                FromDate = new SqlParameter("@FromDate", (fromDate));
            }

            string toDate = Request["toDate"];
            if (toDate == "")
            {
                TODate = new SqlParameter("@ToDate", null);
            }
            else
            {
                TODate = new SqlParameter("@ToDate", toDate);
            }



            string FromProjCode = Request["FromProjCode"].ToString();
            if (FromProjCode == "")
            {
                fromProjCode = new SqlParameter("@Fromproj", System.Data.SqlTypes.SqlInt32.Null);
            }
            else
            {
                fromProjCode = new SqlParameter("@Fromproj", Convert.ToInt32(FromProjCode));
            }

            string ToProjCode = Request["ToProjCode"].ToString();
            if (ToProjCode == "")
            {
                toProjCode = new SqlParameter("@Toproj", System.Data.SqlTypes.SqlInt32.Null);
            }
            else
            {
                toProjCode = new SqlParameter("@Toproj", Convert.ToInt32(ToProjCode));
            }



            string SiteEngineer = Request["SiteEngineerId"].ToString();
            if (SiteEngineer == "")
            {
                SiteEngineerId = new SqlParameter("@SiteEngid", System.Data.SqlTypes.SqlInt32.Null);
            }
            else
            {
                SiteEngineerId = new SqlParameter("@SiteEngid", Convert.ToInt32(SiteEngineer));
            }



            string ScopeCategory = Request["ScopeCategoryID"].ToString();
            if (ScopeCategory == "")
            {
                ScopeCategoryID = new SqlParameter("@ScopeCatID", System.Data.SqlTypes.SqlInt32.Null);
            }
            else
            {
                ScopeCategoryID = new SqlParameter("@ScopeCatID", Convert.ToInt32(ScopeCategory));
            }

            string Scope = Request["ScopeID"].ToString();
            if (Scope == "")
            {
                ScopeID = new SqlParameter("@ScopeId", System.Data.SqlTypes.SqlInt32.Null);
            }
            else
            {
                ScopeID = new SqlParameter("@ScopeId", Convert.ToInt32(Scope));
            }


            string CustomerCategoryid = Request["CatID"];
            if (CustomerCategoryid == "")
            {
                CustomerCategoryID = new SqlParameter("@CatID", System.Data.SqlTypes.SqlInt32.Null);
            }
            else
            {
                CustomerCategoryID = new SqlParameter("@CatID", Convert.ToInt32(CustomerCategoryid));
            }

            string Customerid = Request["Custid"].ToString();
            if (Customerid == "")
            {
                CustomerID = new SqlParameter("@CustId", System.Data.SqlTypes.SqlInt32.Null);
            }
            else
            {
                CustomerID = new SqlParameter("@CustId", Convert.ToInt32(Customerid));
            }
            int ststt = 0;
            string Stuts = Request["Stat"].ToString();
            ststt = Convert.ToInt32(Stuts);
            if (Stuts == "")
            {
                stuts = new SqlParameter("@Status", System.Data.SqlTypes.SqlInt32.Null);
            }
            else
            {

                stuts = new SqlParameter("@Status", ststt);
            }
            string isExecludeZero = Request["IsExecludeZero"];
            if (isExecludeZero == "")
            {
                IsExecludeZero = new SqlParameter("@IsExecludeZero", System.Data.SqlTypes.SqlInt32.Null);
            }
            else
            {
                IsExecludeZero = new SqlParameter("@IsExecludeZero", Convert.ToInt32(isExecludeZero));
            }



            ReportInfo Rep = OpenReport("Rep_ProjectCostVarianceByPhase");
            string _Query = "execute " + Rep.dataSource +
                "  @comp = '" + StandPar.spComCode.Value + "'" +
                ", @CompNameA = '" + StandPar.spComNameA.Value + "'" +
                ", @CompNameE = '" + StandPar.spComNameE.Value + "'" +
                ", @BraNameA = '" + StandPar.spBraNameA.Value + "'" +
                ", @BraNameE = '" + StandPar.braNameE.Value + "'" +
                ", @LoginUser = '" + StandPar.spLoginUser.Value + "'" +
                ", @Bracode = " + Bracode.Value + "" +
                ", @FromDate ='" + FromDate.Value + "'" +
                ", @ToDate = '" + TODate.Value + "'" +
                ", @Fromproj = '" + fromProjCode.Value + "'" +
                ", @Toproj = '" + toProjCode.Value + "'" +
                ", @SiteEngid= " + SiteEngineerId.Value + "" + "," +
                "  @ScopeCatID= " + ScopeCategoryID.Value + "" + "," +
                "  @ScopeId= " + ScopeID.Value + "" + "," +
                "  @CatID= " + CustomerCategoryID.Value + "" + "," +
                "  @CustId= " + CustomerID.Value + "" + "," +
                "  @Status=" + stuts.Value + "" +
                ", @IsExecludeZero = " + IsExecludeZero.Value + "";




            var query = db.Database.SqlQuery<PProc_Rep_GRP_ProjectCostVarianceByPhase_Result>(_Query).ToList();

            BindReport(Rep.reportName, query);
            return query;

        }




        public IEnumerable<PProc_Rep_GRP_ProjectLabEquipVarianceByProject_Result> Rep_ProjectLaborVarianceByProject()
        {
            ReportStandardParameters StandPar = getStandardParameters();
            SqlParameter Bracode = null;
            SqlParameter FromDate = null;
            SqlParameter TODate = null;
            SqlParameter fromProjCode = null;
            SqlParameter toProjCode = null;
            SqlParameter SiteEngineerId = null;
            SqlParameter ScopeCategoryID = null;
            SqlParameter ScopeID = null;
            SqlParameter CustomerCategoryID = null;
            SqlParameter CustomerID = null;
            SqlParameter stuts = null;
            SqlParameter IsExecludeZero = null;


            string bracode = Request["braCode"].ToString();
            if (bracode == "")
            {
                Bracode = new SqlParameter("@BraCode", DBNull.Value);
            }
            else
            {
                Bracode = new SqlParameter("@BraCode", Convert.ToInt32(bracode));
            }

            string fromDate = Request["fromDate"];
            if (fromDate == "")
            {
                FromDate = new SqlParameter("@FromDate", null);
            }
            else
            {
                FromDate = new SqlParameter("@FromDate", (fromDate));
            }

            string toDate = Request["toDate"];
            if (toDate == "")
            {
                TODate = new SqlParameter("@ToDate", null);
            }
            else
            {
                TODate = new SqlParameter("@ToDate", toDate);
            }



            string FromProjCode = Request["FromProjCode"].ToString();
            if (FromProjCode == "")
            {
                fromProjCode = new SqlParameter("@Fromproj", System.Data.SqlTypes.SqlInt32.Null);
            }
            else
            {
                fromProjCode = new SqlParameter("@Fromproj", Convert.ToInt32(FromProjCode));
            }

            string ToProjCode = Request["ToProjCode"].ToString();
            if (ToProjCode == "")
            {
                toProjCode = new SqlParameter("@Toproj", System.Data.SqlTypes.SqlInt32.Null);
            }
            else
            {
                toProjCode = new SqlParameter("@Toproj", Convert.ToInt32(ToProjCode));
            }



            string SiteEngineer = Request["SiteEngineerId"].ToString();
            if (SiteEngineer == "")
            {
                SiteEngineerId = new SqlParameter("@SiteEngid", System.Data.SqlTypes.SqlInt32.Null);
            }
            else
            {
                SiteEngineerId = new SqlParameter("@SiteEngid", Convert.ToInt32(SiteEngineer));
            }



            string ScopeCategory = Request["ScopeCategoryID"].ToString();
            if (ScopeCategory == "")
            {
                ScopeCategoryID = new SqlParameter("@ScopeCatID", System.Data.SqlTypes.SqlInt32.Null);
            }
            else
            {
                ScopeCategoryID = new SqlParameter("@ScopeCatID", Convert.ToInt32(ScopeCategory));
            }

            string Scope = Request["ScopeID"].ToString();
            if (Scope == "")
            {
                ScopeID = new SqlParameter("@ScopeId", System.Data.SqlTypes.SqlInt32.Null);
            }
            else
            {
                ScopeID = new SqlParameter("@ScopeId", Convert.ToInt32(Scope));
            }


            string CustomerCategoryid = Request["CatID"];
            if (CustomerCategoryid == "")
            {
                CustomerCategoryID = new SqlParameter("@CatID", System.Data.SqlTypes.SqlInt32.Null);
            }
            else
            {
                CustomerCategoryID = new SqlParameter("@CatID", Convert.ToInt32(CustomerCategoryid));
            }

            string Customerid = Request["Custid"].ToString();
            if (Customerid == "")
            {
                CustomerID = new SqlParameter("@CustId", System.Data.SqlTypes.SqlInt32.Null);
            }
            else
            {
                CustomerID = new SqlParameter("@CustId", Convert.ToInt32(Customerid));
            }
            int ststt = 0;
            string Stuts = Request["Stat"].ToString();
            ststt = Convert.ToInt32(Stuts);
            if (Stuts == "")
            {
                stuts = new SqlParameter("@Status", System.Data.SqlTypes.SqlInt32.Null);
            }
            else
            {

                stuts = new SqlParameter("@Status", ststt);
            }
            string isExecludeZero = Request["IsExecludeZero"];
            if (isExecludeZero == "")
            {
                IsExecludeZero = new SqlParameter("@IsExecludeZero", System.Data.SqlTypes.SqlInt32.Null);
            }
            else
            {
                IsExecludeZero = new SqlParameter("@IsExecludeZero", Convert.ToInt32(isExecludeZero));
            }



            ReportInfo Rep = OpenReport("Rep_ProjectLaborVarianceByProject");
            string _Query = "execute " + Rep.dataSource +
                "  @comp = '" + StandPar.spComCode.Value + "'" +
                ", @CompNameA = '" + StandPar.spComNameA.Value + "'" +
                ", @CompNameE = '" + StandPar.spComNameE.Value + "'" +
                ", @BraNameA = '" + StandPar.spBraNameA.Value + "'" +
                ", @BraNameE = '" + StandPar.braNameE.Value + "'" +
                ", @LoginUser = '" + StandPar.spLoginUser.Value + "'" +
                ", @Bracode = " + Bracode.Value + "" +
                ", @FromDate ='" + FromDate.Value + "'" +
                ", @ToDate = '" + TODate.Value + "'" +
                ", @Fromproj = '" + fromProjCode.Value + "'" +
                ", @Toproj = '" + toProjCode.Value + "'" +
                ", @SiteEngid= " + SiteEngineerId.Value + "" + "," +
                "  @ScopeCatID= " + ScopeCategoryID.Value + "" + "," +
                "  @ScopeId= " + ScopeID.Value + "" + "," +
                "  @CatID= " + CustomerCategoryID.Value + "" + "," +
                "  @CustId= " + CustomerID.Value + "" + "," +
                "  @Status=" + stuts.Value + "" +
                ", @IsExecludeZero = " + IsExecludeZero.Value + "";




            var query = db.Database.SqlQuery<PProc_Rep_GRP_ProjectLabEquipVarianceByProject_Result>(_Query).ToList();

            BindReport(Rep.reportName, query);
            return query;

        }
        public IEnumerable<PProc_Rep_GRP_ProjectLabEquipVarianceByPhase_Result> Rep_ProjectLaborVarianceByPhase()
        {
            ReportStandardParameters StandPar = getStandardParameters();
            SqlParameter Bracode = null;
            SqlParameter FromDate = null;
            SqlParameter TODate = null;
            SqlParameter fromProjCode = null;
            SqlParameter toProjCode = null;
            SqlParameter SiteEngineerId = null;
            SqlParameter ScopeCategoryID = null;
            SqlParameter ScopeID = null;
            SqlParameter CustomerCategoryID = null;
            SqlParameter CustomerID = null;
            SqlParameter stuts = null;
            SqlParameter IsExecludeZero = null;


            string bracode = Request["braCode"].ToString();
            if (bracode == "")
            {
                Bracode = new SqlParameter("@BraCode", DBNull.Value);
            }
            else
            {
                Bracode = new SqlParameter("@BraCode", Convert.ToInt32(bracode));
            }

            string fromDate = Request["fromDate"];
            if (fromDate == "")
            {
                FromDate = new SqlParameter("@FromDate", null);
            }
            else
            {
                FromDate = new SqlParameter("@FromDate", (fromDate));
            }

            string toDate = Request["toDate"];
            if (toDate == "")
            {
                TODate = new SqlParameter("@ToDate", null);
            }
            else
            {
                TODate = new SqlParameter("@ToDate", toDate);
            }



            string FromProjCode = Request["FromProjCode"].ToString();
            if (FromProjCode == "")
            {
                fromProjCode = new SqlParameter("@Fromproj", System.Data.SqlTypes.SqlInt32.Null);
            }
            else
            {
                fromProjCode = new SqlParameter("@Fromproj", Convert.ToInt32(FromProjCode));
            }

            string ToProjCode = Request["ToProjCode"].ToString();
            if (ToProjCode == "")
            {
                toProjCode = new SqlParameter("@Toproj", System.Data.SqlTypes.SqlInt32.Null);
            }
            else
            {
                toProjCode = new SqlParameter("@Toproj", Convert.ToInt32(ToProjCode));
            }



            string SiteEngineer = Request["SiteEngineerId"].ToString();
            if (SiteEngineer == "")
            {
                SiteEngineerId = new SqlParameter("@SiteEngid", System.Data.SqlTypes.SqlInt32.Null);
            }
            else
            {
                SiteEngineerId = new SqlParameter("@SiteEngid", Convert.ToInt32(SiteEngineer));
            }



            string ScopeCategory = Request["ScopeCategoryID"].ToString();
            if (ScopeCategory == "")
            {
                ScopeCategoryID = new SqlParameter("@ScopeCatID", System.Data.SqlTypes.SqlInt32.Null);
            }
            else
            {
                ScopeCategoryID = new SqlParameter("@ScopeCatID", Convert.ToInt32(ScopeCategory));
            }

            string Scope = Request["ScopeID"].ToString();
            if (Scope == "")
            {
                ScopeID = new SqlParameter("@ScopeId", System.Data.SqlTypes.SqlInt32.Null);
            }
            else
            {
                ScopeID = new SqlParameter("@ScopeId", Convert.ToInt32(Scope));
            }


            string CustomerCategoryid = Request["CatID"];
            if (CustomerCategoryid == "")
            {
                CustomerCategoryID = new SqlParameter("@CatID", System.Data.SqlTypes.SqlInt32.Null);
            }
            else
            {
                CustomerCategoryID = new SqlParameter("@CatID", Convert.ToInt32(CustomerCategoryid));
            }

            string Customerid = Request["Custid"].ToString();
            if (Customerid == "")
            {
                CustomerID = new SqlParameter("@CustId", System.Data.SqlTypes.SqlInt32.Null);
            }
            else
            {
                CustomerID = new SqlParameter("@CustId", Convert.ToInt32(Customerid));
            }
            int ststt = 0;
            string Stuts = Request["Stat"].ToString();
            ststt = Convert.ToInt32(Stuts);
            if (Stuts == "")
            {
                stuts = new SqlParameter("@Status", System.Data.SqlTypes.SqlInt32.Null);
            }
            else
            {

                stuts = new SqlParameter("@Status", ststt);
            }

            string isExecludeZero = Request["IsExecludeZero"];
            if (isExecludeZero == "")
            {
                IsExecludeZero = new SqlParameter("@IsExecludeZero", System.Data.SqlTypes.SqlInt32.Null);
            }
            else
            {
                IsExecludeZero = new SqlParameter("@IsExecludeZero", Convert.ToInt32(isExecludeZero));
            }


            ReportInfo Rep = OpenReport("Rep_ProjectLaborVarianceByPhase");
            string _Query = "execute " + Rep.dataSource +
                "  @comp = '" + StandPar.spComCode.Value + "'" +
                ", @CompNameA = '" + StandPar.spComNameA.Value + "'" +
                ", @CompNameE = '" + StandPar.spComNameE.Value + "'" +
                ", @BraNameA = '" + StandPar.spBraNameA.Value + "'" +
                ", @BraNameE = '" + StandPar.braNameE.Value + "'" +
                ", @LoginUser = '" + StandPar.spLoginUser.Value + "'" +
                ", @Bracode = " + Bracode.Value + "" +
                ", @FromDate ='" + FromDate.Value + "'" +
                ", @ToDate = '" + TODate.Value + "'" +
                ", @Fromproj = '" + fromProjCode.Value + "'" +
                ", @Toproj = '" + toProjCode.Value + "'" +
                ", @SiteEngid= " + SiteEngineerId.Value + "" + "," +
                "  @ScopeCatID= " + ScopeCategoryID.Value + "" + "," +
                "  @ScopeId= " + ScopeID.Value + "" + "," +
                "  @CatID= " + CustomerCategoryID.Value + "" + "," +
                "  @CustId= " + CustomerID.Value + "" + "," +
                "  @Status=" + stuts.Value + "" +
                ", @IsExecludeZero = " + IsExecludeZero.Value + "";




            var query = db.Database.SqlQuery<PProc_Rep_GRP_ProjectLabEquipVarianceByPhase_Result>(_Query).ToList();

            BindReport(Rep.reportName, query);
            return query;

        }



        public IEnumerable<PProc_Rep_GRP_ProjectLabEquipVarianceByProject_Result> Rep_ProjectEquipmentVarianceByProject()
        {
            ReportStandardParameters StandPar = getStandardParameters();
            SqlParameter Bracode = null;
            SqlParameter FromDate = null;
            SqlParameter TODate = null;
            SqlParameter fromProjCode = null;
            SqlParameter toProjCode = null;
            SqlParameter SiteEngineerId = null;
            SqlParameter ScopeCategoryID = null;
            SqlParameter ScopeID = null;
            SqlParameter CustomerCategoryID = null;
            SqlParameter CustomerID = null;
            SqlParameter stuts = null;
            SqlParameter IsExecludeZero = null;


            string bracode = Request["braCode"].ToString();
            if (bracode == "")
            {
                Bracode = new SqlParameter("@BraCode", DBNull.Value);
            }
            else
            {
                Bracode = new SqlParameter("@BraCode", Convert.ToInt32(bracode));
            }

            string fromDate = Request["fromDate"];
            if (fromDate == "")
            {
                FromDate = new SqlParameter("@FromDate", null);
            }
            else
            {
                FromDate = new SqlParameter("@FromDate", (fromDate));
            }

            string toDate = Request["toDate"];
            if (toDate == "")
            {
                TODate = new SqlParameter("@ToDate", null);
            }
            else
            {
                TODate = new SqlParameter("@ToDate", toDate);
            }



            string FromProjCode = Request["FromProjCode"].ToString();
            if (FromProjCode == "")
            {
                fromProjCode = new SqlParameter("@Fromproj", System.Data.SqlTypes.SqlInt32.Null);
            }
            else
            {
                fromProjCode = new SqlParameter("@Fromproj", Convert.ToInt32(FromProjCode));
            }

            string ToProjCode = Request["ToProjCode"].ToString();
            if (ToProjCode == "")
            {
                toProjCode = new SqlParameter("@Toproj", System.Data.SqlTypes.SqlInt32.Null);
            }
            else
            {
                toProjCode = new SqlParameter("@Toproj", Convert.ToInt32(ToProjCode));
            }



            string SiteEngineer = Request["SiteEngineerId"].ToString();
            if (SiteEngineer == "")
            {
                SiteEngineerId = new SqlParameter("@SiteEngid", System.Data.SqlTypes.SqlInt32.Null);
            }
            else
            {
                SiteEngineerId = new SqlParameter("@SiteEngid", Convert.ToInt32(SiteEngineer));
            }



            string ScopeCategory = Request["ScopeCategoryID"].ToString();
            if (ScopeCategory == "")
            {
                ScopeCategoryID = new SqlParameter("@ScopeCatID", System.Data.SqlTypes.SqlInt32.Null);
            }
            else
            {
                ScopeCategoryID = new SqlParameter("@ScopeCatID", Convert.ToInt32(ScopeCategory));
            }

            string Scope = Request["ScopeID"].ToString();
            if (Scope == "")
            {
                ScopeID = new SqlParameter("@ScopeId", System.Data.SqlTypes.SqlInt32.Null);
            }
            else
            {
                ScopeID = new SqlParameter("@ScopeId", Convert.ToInt32(Scope));
            }


            string CustomerCategoryid = Request["CatID"];
            if (CustomerCategoryid == "")
            {
                CustomerCategoryID = new SqlParameter("@CatID", System.Data.SqlTypes.SqlInt32.Null);
            }
            else
            {
                CustomerCategoryID = new SqlParameter("@CatID", Convert.ToInt32(CustomerCategoryid));
            }

            string Customerid = Request["Custid"].ToString();
            if (Customerid == "")
            {
                CustomerID = new SqlParameter("@CustId", System.Data.SqlTypes.SqlInt32.Null);
            }
            else
            {
                CustomerID = new SqlParameter("@CustId", Convert.ToInt32(Customerid));
            }
            int ststt = 0;
            string Stuts = Request["Stat"].ToString();
            ststt = Convert.ToInt32(Stuts);
            if (Stuts == "")
            {
                stuts = new SqlParameter("@Status", System.Data.SqlTypes.SqlInt32.Null);
            }
            else
            {

                stuts = new SqlParameter("@Status", ststt);
            }

            string isExecludeZero = Request["IsExecludeZero"];
            if (isExecludeZero == "")
            {
                IsExecludeZero = new SqlParameter("@IsExecludeZero", System.Data.SqlTypes.SqlInt32.Null);
            }
            else
            {
                IsExecludeZero = new SqlParameter("@IsExecludeZero", Convert.ToInt32(isExecludeZero));
            }


            ReportInfo Rep = OpenReport("Rep_ProjectEquipmentVarianceByProject");
            string _Query = "execute " + Rep.dataSource +
                "  @comp = '" + StandPar.spComCode.Value + "'" +
                ", @CompNameA = '" + StandPar.spComNameA.Value + "'" +
                ", @CompNameE = '" + StandPar.spComNameE.Value + "'" +
                ", @BraNameA = '" + StandPar.spBraNameA.Value + "'" +
                ", @BraNameE = '" + StandPar.braNameE.Value + "'" +
                ", @LoginUser = '" + StandPar.spLoginUser.Value + "'" +
                ", @Bracode = " + Bracode.Value + "" +
                ", @FromDate ='" + FromDate.Value + "'" +
                ", @ToDate = '" + TODate.Value + "'" +
                ", @Fromproj = '" + fromProjCode.Value + "'" +
                ", @Toproj = '" + toProjCode.Value + "'" +
                ", @SiteEngid= " + SiteEngineerId.Value + "" + "," +
                "  @ScopeCatID= " + ScopeCategoryID.Value + "" + "," +
                "  @ScopeId= " + ScopeID.Value + "" + "," +
                "  @CatID= " + CustomerCategoryID.Value + "" + "," +
                "  @CustId= " + CustomerID.Value + "" + "," +
                "  @Status=" + stuts.Value + "" +
                ", @IsExecludeZero = " + IsExecludeZero.Value + "";




            var query = db.Database.SqlQuery<PProc_Rep_GRP_ProjectLabEquipVarianceByProject_Result>(_Query).ToList();

            BindReport(Rep.reportName, query);
            return query;

        }
        public IEnumerable<PProc_Rep_GRP_ProjectLabEquipVarianceByPhase_Result> Rep_ProjectEquipmentVarianceByPhase()
        {
            ReportStandardParameters StandPar = getStandardParameters();
            SqlParameter Bracode = null;
            SqlParameter FromDate = null;
            SqlParameter TODate = null;
            SqlParameter fromProjCode = null;
            SqlParameter toProjCode = null;
            SqlParameter SiteEngineerId = null;
            SqlParameter ScopeCategoryID = null;
            SqlParameter ScopeID = null;
            SqlParameter CustomerCategoryID = null;
            SqlParameter CustomerID = null;
            SqlParameter stuts = null;
            SqlParameter IsExecludeZero = null;


            string bracode = Request["braCode"].ToString();
            if (bracode == "")
            {
                Bracode = new SqlParameter("@BraCode", DBNull.Value);
            }
            else
            {
                Bracode = new SqlParameter("@BraCode", Convert.ToInt32(bracode));
            }

            string fromDate = Request["fromDate"];
            if (fromDate == "")
            {
                FromDate = new SqlParameter("@FromDate", null);
            }
            else
            {
                FromDate = new SqlParameter("@FromDate", (fromDate));
            }

            string toDate = Request["toDate"];
            if (toDate == "")
            {
                TODate = new SqlParameter("@ToDate", null);
            }
            else
            {
                TODate = new SqlParameter("@ToDate", toDate);
            }



            string FromProjCode = Request["FromProjCode"].ToString();
            if (FromProjCode == "")
            {
                fromProjCode = new SqlParameter("@Fromproj", System.Data.SqlTypes.SqlInt32.Null);
            }
            else
            {
                fromProjCode = new SqlParameter("@Fromproj", Convert.ToInt32(FromProjCode));
            }

            string ToProjCode = Request["ToProjCode"].ToString();
            if (ToProjCode == "")
            {
                toProjCode = new SqlParameter("@Toproj", System.Data.SqlTypes.SqlInt32.Null);
            }
            else
            {
                toProjCode = new SqlParameter("@Toproj", Convert.ToInt32(ToProjCode));
            }



            string SiteEngineer = Request["SiteEngineerId"].ToString();
            if (SiteEngineer == "")
            {
                SiteEngineerId = new SqlParameter("@SiteEngid", System.Data.SqlTypes.SqlInt32.Null);
            }
            else
            {
                SiteEngineerId = new SqlParameter("@SiteEngid", Convert.ToInt32(SiteEngineer));
            }



            string ScopeCategory = Request["ScopeCategoryID"].ToString();
            if (ScopeCategory == "")
            {
                ScopeCategoryID = new SqlParameter("@ScopeCatID", System.Data.SqlTypes.SqlInt32.Null);
            }
            else
            {
                ScopeCategoryID = new SqlParameter("@ScopeCatID", Convert.ToInt32(ScopeCategory));
            }

            string Scope = Request["ScopeID"].ToString();
            if (Scope == "")
            {
                ScopeID = new SqlParameter("@ScopeId", System.Data.SqlTypes.SqlInt32.Null);
            }
            else
            {
                ScopeID = new SqlParameter("@ScopeId", Convert.ToInt32(Scope));
            }


            string CustomerCategoryid = Request["CatID"];
            if (CustomerCategoryid == "")
            {
                CustomerCategoryID = new SqlParameter("@CatID", System.Data.SqlTypes.SqlInt32.Null);
            }
            else
            {
                CustomerCategoryID = new SqlParameter("@CatID", Convert.ToInt32(CustomerCategoryid));
            }

            string Customerid = Request["Custid"].ToString();
            if (Customerid == "")
            {
                CustomerID = new SqlParameter("@CustId", System.Data.SqlTypes.SqlInt32.Null);
            }
            else
            {
                CustomerID = new SqlParameter("@CustId", Convert.ToInt32(Customerid));
            }
            int ststt = 0;
            string Stuts = Request["Stat"].ToString();
            ststt = Convert.ToInt32(Stuts);
            if (Stuts == "")
            {
                stuts = new SqlParameter("@Status", System.Data.SqlTypes.SqlInt32.Null);
            }
            else
            {

                stuts = new SqlParameter("@Status", ststt);
            }

            string isExecludeZero = Request["IsExecludeZero"];
            if (isExecludeZero == "")
            {
                IsExecludeZero = new SqlParameter("@IsExecludeZero", System.Data.SqlTypes.SqlInt32.Null);
            }
            else
            {
                IsExecludeZero = new SqlParameter("@IsExecludeZero", Convert.ToInt32(isExecludeZero));
            }


            ReportInfo Rep = OpenReport("Rep_ProjectEquipmentVarianceByPhase");
            string _Query = "execute " + Rep.dataSource +
                "  @comp = '" + StandPar.spComCode.Value + "'" +
                ", @CompNameA = '" + StandPar.spComNameA.Value + "'" +
                ", @CompNameE = '" + StandPar.spComNameE.Value + "'" +
                ", @BraNameA = '" + StandPar.spBraNameA.Value + "'" +
                ", @BraNameE = '" + StandPar.braNameE.Value + "'" +
                ", @LoginUser = '" + StandPar.spLoginUser.Value + "'" +
                ", @Bracode = " + Bracode.Value + "" +
                ", @FromDate ='" + FromDate.Value + "'" +
                ", @ToDate = '" + TODate.Value + "'" +
                ", @Fromproj = '" + fromProjCode.Value + "'" +
                ", @Toproj = '" + toProjCode.Value + "'" +
                ", @SiteEngid= " + SiteEngineerId.Value + "" + "," +
                "  @ScopeCatID= " + ScopeCategoryID.Value + "" + "," +
                "  @ScopeId= " + ScopeID.Value + "" + "," +
                "  @CatID= " + CustomerCategoryID.Value + "" + "," +
                "  @CustId= " + CustomerID.Value + "" + "," +
                "  @Status=" + stuts.Value + "" +
                ", @IsExecludeZero = " + IsExecludeZero.Value + "";




            var query = db.Database.SqlQuery<PProc_Rep_GRP_ProjectLabEquipVarianceByPhase_Result>(_Query).ToList();

            BindReport(Rep.reportName, query);
            return query;

        }




        //---------------------DSS---------------
        public IEnumerable<PProc_Rep_DSS_ProjectEvaluation_Result> DSS_ProjectEvaluation()
        {

            ReportStandardParameters StandPar = getStandardParameters();
            SqlParameter RegionCode = null;
            SqlParameter Bracode = null;
            SqlParameter FromDate = null;
            SqlParameter TODate = null;
            SqlParameter ScopeCategoryID = null;
            SqlParameter ScopeID = null;
            SqlParameter CustomerCategoryID = null;
            SqlParameter IsRepair = null;
            SqlParameter GroupType = null;

            string regionCode = Request["REGION_CODE"];
            if (regionCode == "")
            {
                RegionCode = new SqlParameter("@RegionCode", System.Data.SqlTypes.SqlInt32.Null);
            }
            else
            {
                RegionCode = new SqlParameter("@RegionCode", Convert.ToInt32(regionCode));
            }

            string bracode = Request["braCode"].ToString();
            if (bracode == "")
            {
                Bracode = new SqlParameter("@BraCode", System.Data.SqlTypes.SqlInt32.Null);
            }
            else
            {
                Bracode = new SqlParameter("@BraCode", bracode);
            }


             

            string fromDate = Request["fromDate"];
            if (fromDate == "")
            {
                FromDate = new SqlParameter("@FromDate", null);
            }
            else
            {
                FromDate = new SqlParameter("@FromDate", (fromDate));
            }
            string toDate = Request["toDate"];
            if (toDate == "")
            {
                TODate = new SqlParameter("@ToDate", null);
            }
            else
            {
                TODate = new SqlParameter("@ToDate", toDate);
            }
            string ScopeCategory = Request["ScopeCategoryID"].ToString();
            if (ScopeCategory == "")
            {
                ScopeCategoryID = new SqlParameter("@ScopeCatID", System.Data.SqlTypes.SqlInt32.Null);
            }
            else
            {
                ScopeCategoryID = new SqlParameter("@ScopeCatID", Convert.ToInt32(ScopeCategory));
            }
            string Scope = Request["ScopeID"].ToString();
            if (Scope == "")
            {
                ScopeID = new SqlParameter("@ScopeId", System.Data.SqlTypes.SqlInt32.Null);
            }
            else
            {
                ScopeID = new SqlParameter("@ScopeId", Convert.ToInt32(Scope));
            }
            string CustomerCategoryid = Request["CatID"];
            if (CustomerCategoryid == "")
            {
                CustomerCategoryID = new SqlParameter("@CatID", System.Data.SqlTypes.SqlInt32.Null);
            }
            else
            {
                CustomerCategoryID = new SqlParameter("@CatID", Convert.ToInt32(CustomerCategoryid));
            }
            string isRepair = Request["IsRepair"].ToString();
            if (isRepair == "")
            {
                IsRepair = new SqlParameter("@ISRepair", "null");
            }
            else
            {
                IsRepair = new SqlParameter("@ISRepair", Convert.ToInt32(isRepair));
            }
            string groupType = Request["GroupType"].ToString();
            if (groupType == "")
            {
                GroupType = new SqlParameter("@GroupType", System.Data.SqlTypes.SqlInt32.Null);
            }
            else
            {
                GroupType = new SqlParameter("@GroupType", Convert.ToInt32(groupType));
            }
            ReportInfo Rep;
            if (groupType == "3" || groupType == "4" )
                Rep = OpenReport("DSS_ProjectPhaseEvaluation");
            else
                Rep = OpenReport("DSS_ProjectEvaluation");
            string _Query = "execute " + Rep.dataSource +
          "  @comp = '" + StandPar.spComCode.Value + "'" +
          ", @CompNameA = '" + StandPar.spComNameA.Value + "'" +
          ", @CompNameE = '" + StandPar.spComNameE.Value + "'" +
          ", @BraNameA = '" + StandPar.spBraNameA.Value + "'" +
          ", @BraNameE = '" + StandPar.braNameE.Value + "'" +
          ", @LoginUser = '" + StandPar.spLoginUser.Value + "'" +
          ", @RegionCode = " + RegionCode.Value + "" +
          ", @Bracode = " + Bracode.Value + "" +
          ", @FromDate = '" + FromDate.Value + "'" +
          ", @ToDate = '" + TODate.Value + "'" +
          ", @ScopeCatID = " + ScopeCategoryID.Value + "" +
          ", @ScopeId = " + ScopeID.Value + "" +
          ", @CatID = " + CustomerCategoryID.Value + "" +
          ", @ISRepair = " + IsRepair.Value + "" +
          ", @GroupType = " + GroupType.Value + "";
            db.Database.CommandTimeout = 2 * 1000;
            var query = db.Database.SqlQuery<PProc_Rep_DSS_ProjectEvaluation_Result>(_Query).ToList();

            BindReport(Rep.reportName, query);
            return query;


        }

        //--------DSS_CollectiveWorkByBranch---
        public IEnumerable<PProc_Rep_DSS_CollectiveWork_Result> DSS_CollectiveWorkByscope()
        {

            ReportStandardParameters StandPar = getStandardParameters();
            SqlParameter RegionCode = null;
            SqlParameter Bracode = null;
            SqlParameter FromDate = null;
            SqlParameter TODate = null;
            SqlParameter ScopeCategoryID = null;
            SqlParameter CustomerCategoryID = null;
            SqlParameter IsRepair = null;
            SqlParameter GroupType = null;

            string regionCode = Request["REGION_CODE"];
            if (regionCode == null || regionCode == "")
            {
                RegionCode = new SqlParameter("@RegionCode", System.Data.SqlTypes.SqlInt32.Null);
            }
            else
            {
                RegionCode = new SqlParameter("@RegionCode", Convert.ToInt32(regionCode));
            }
            string bracode = Request["braCode"].ToString();
            if (bracode == "")
            {
                Bracode = new SqlParameter("@Bracode", DBNull.Value);
            }
            else
            {
                Bracode = new SqlParameter("@BraCode", Convert.ToInt32(bracode));
            }

            string fromDate = Request["fromDate"];
            if (fromDate == "")
            {
                FromDate = new SqlParameter("@FromDate", null);
            }
            else
            {
                FromDate = new SqlParameter("@FromDate", (fromDate));
            }
            string toDate = Request["toDate"];
            if (toDate == "")
            {
                TODate = new SqlParameter("@ToDate", null);
            }
            else
            {
                TODate = new SqlParameter("@ToDate", toDate);
            }
            string ScopeCategory = Request["ScopeCategoryID"].ToString();
            if (ScopeCategory == "")
            {
                ScopeCategoryID = new SqlParameter("@ScopeCatID", System.Data.SqlTypes.SqlInt32.Null);
            }
            else
            {
                ScopeCategoryID = new SqlParameter("@ScopeCatID", Convert.ToInt32(ScopeCategory));
            }

            string CustomerCategoryid = Request["CustomerCategoryID"];
            if (CustomerCategoryid == "")
            {
                CustomerCategoryID = new SqlParameter("@CatID", System.Data.SqlTypes.SqlInt32.Null);
            }
            else
            {
                CustomerCategoryID = new SqlParameter("@CatID", Convert.ToInt32(CustomerCategoryid));
            }

            string isRepair = Request["IsRepair"].ToString();
            if (isRepair == "")
            {
                IsRepair = new SqlParameter("@ISRepair", System.Data.SqlTypes.SqlInt32.Null);
            }
            else
            {
                IsRepair = new SqlParameter("@ISRepair", Convert.ToInt32(isRepair));
            }
            string groupType = Request["TypeReport"].ToString();
            if (groupType == "")
            {
                GroupType = new SqlParameter("@GroupType", System.Data.SqlTypes.SqlInt32.Null);
            }
            else
            {
                GroupType = new SqlParameter("@GroupType", Convert.ToInt32(groupType));
            }

            ReportInfo Rep = OpenReport("DSS_CollectiveWorkByscope");
            string _Query = "execute " + Rep.dataSource +
          "  @comp = '" + StandPar.spComCode.Value + "'" +
          ", @CompNameA = '" + StandPar.spComNameA.Value + "'" +
          ", @CompNameE = '" + StandPar.spComNameE.Value + "'" +
          ", @BraNameA = '" + StandPar.spBraNameA.Value + "'" +
          ", @BraNameE = '" + StandPar.braNameE.Value + "'" +
          ", @LoginUser = '" + StandPar.spLoginUser.Value + "'" +
          ", @RegionCode = " + RegionCode.Value + "" +
          ", @FromDate = '" + FromDate.Value + "'" +
          ", @ToDate = '" + TODate.Value + "'" +
          ", @ScopeCatID = " + ScopeCategoryID.Value + "" +
          ", @CatID = " + CustomerCategoryID.Value + "" +
          ", @ISRepair = " + IsRepair.Value + "" +
          ", @GroupType = " + GroupType.Value + "";

            var query = db.Database.SqlQuery<PProc_Rep_DSS_CollectiveWork_Result>(_Query).ToList();
            BindReport(Rep.reportName, query);
            return query;


        }
        public IEnumerable<PProc_Rep_DSS_CollectiveWork_Result> DSS_CollectiveWorkByBranch()
        {

            ReportStandardParameters StandPar = getStandardParameters();
            SqlParameter RegionCode = null;
            SqlParameter Bracode = null;
            SqlParameter FromDate = null;
            SqlParameter TODate = null;
            SqlParameter ScopeCategoryID = null;
            SqlParameter custClassID = null;
            SqlParameter IsRepair = null;
            SqlParameter GroupType = null;

            string regionCode = Request["REGION_CODE"];
            if (regionCode == null || regionCode == "")
            {
                RegionCode = new SqlParameter("@RegionCode", System.Data.SqlTypes.SqlInt32.Null);
            }
            else
            {
                RegionCode = new SqlParameter("@RegionCode", Convert.ToInt32(regionCode));
            }
            string bracode = Request["braCode"].ToString();
            if (bracode == "")
            {
                Bracode = new SqlParameter("@Bracode", DBNull.Value);
            }
            else
            {
                Bracode = new SqlParameter("@BraCode", Convert.ToInt32(bracode));
            }

            string fromDate = Request["fromDate"];
            if (fromDate == "")
            {
                FromDate = new SqlParameter("@FromDate", null);
            }
            else
            {
                FromDate = new SqlParameter("@FromDate", (fromDate));
            }
            string toDate = Request["toDate"];
            if (toDate == "")
            {
                TODate = new SqlParameter("@ToDate", null);
            }
            else
            {
                TODate = new SqlParameter("@ToDate", toDate);
            }
            string ScopeCategory = Request["ScopeCategoryID"].ToString();
            if (ScopeCategory == "")
            {
                ScopeCategoryID = new SqlParameter("@ScopeCatID", System.Data.SqlTypes.SqlInt32.Null);
            }
            else
            {
                ScopeCategoryID = new SqlParameter("@ScopeCatID", Convert.ToInt32(ScopeCategory));
            }

            string CustClassID = Request["CustomerCategoryID"];
            if (CustClassID == "")
            {
                custClassID = new SqlParameter("@CatID", System.Data.SqlTypes.SqlInt32.Null);
            }
            else
            {
                custClassID = new SqlParameter("@CatID", Convert.ToInt32(CustClassID));
            }


            string isRepair = Request["IsRepair"].ToString();
            if (isRepair == "")
            {
                IsRepair = new SqlParameter("@ISRepair", System.Data.SqlTypes.SqlInt32.Null);
            }
            else
            {
                IsRepair = new SqlParameter("@ISRepair", Convert.ToInt32(isRepair));
            }
            string groupType = Request["TypeReport"].ToString();
            if (groupType == "")
            {
                GroupType = new SqlParameter("@GroupType", System.Data.SqlTypes.SqlInt32.Null);
            }
            else
            {
                GroupType = new SqlParameter("@GroupType", Convert.ToInt32(groupType));
            }

            ReportInfo Rep = OpenReport("DSS_CollectiveWorkByBranch");
            string _Query = "execute " + Rep.dataSource +
          "  @comp = '" + StandPar.spComCode.Value + "'" +
          ", @CompNameA = '" + StandPar.spComNameA.Value + "'" +
          ", @CompNameE = '" + StandPar.spComNameE.Value + "'" +
          ", @BraNameA = '" + StandPar.spBraNameA.Value + "'" +
          ", @BraNameE = '" + StandPar.braNameE.Value + "'" +
          ", @LoginUser = '" + StandPar.spLoginUser.Value + "'" +
          ", @RegionCode = " + RegionCode.Value + "" +
          ", @FromDate = '" + FromDate.Value + "'" +
          ", @ToDate = '" + TODate.Value + "'" +
          ", @ScopeCatID = " + ScopeCategoryID.Value + "" +
          ", @CatID = " + custClassID.Value + "" +
          ", @ISRepair = " + IsRepair.Value + "" +
          ", @GroupType = " + GroupType.Value + "";

            var query = db.Database.SqlQuery<PProc_Rep_DSS_CollectiveWork_Result>(_Query).ToList();
            BindReport(Rep.reportName, query);
            return query;


        }
        //---------
        public IEnumerable<PProc_Rep_DSS_BillingStatus_Result> DSS_BillingStatus()
        {

            ReportStandardParameters StandPar = getStandardParameters();
            SqlParameter RegionCode = null;
            SqlParameter Bracode = null;
            SqlParameter FromDate = null;
            SqlParameter TODate = null;
             string TypeReport_ = Request["TypeReport"];

            int Type = int.Parse(TypeReport_.ToString());
            SqlParameter spRepType = new SqlParameter("@RepType", Type);
            

            string regionCode = Request["REGION_CODE"];
            if (regionCode == null || regionCode == "")
            {
                RegionCode = new SqlParameter("@RegionCode", System.Data.SqlTypes.SqlInt32.Null);
            }
            else
            {
                RegionCode = new SqlParameter("@RegionCode", Convert.ToInt32(regionCode));
            }
            string bracode = Request["braCode"].ToString();
            if (bracode == "")
            {
                Bracode = new SqlParameter("@Bracode", "NULL");
            }
            else
            {
                Bracode = new SqlParameter("@BraCode", Convert.ToInt32(bracode));
            }

            string fromDate = Request["fromDate"];
            if (fromDate == "")
            {
                FromDate = new SqlParameter("@FromDate", null);
            }
            else
            {
                FromDate = new SqlParameter("@FromDate", (fromDate));
            }
            string toDate = Request["toDate"];
            if (toDate == "")
            {
                TODate = new SqlParameter("@ToDate", null);
            }
            else
            {
                TODate = new SqlParameter("@ToDate", toDate);
            }

            string OutputType = "";

            ReportInfo Rep = OpenReport("DSS_BillingStatus");
            string _Query = "execute " + Rep.dataSource +
          "  @comp = '" + StandPar.spComCode.Value + "'" +
          ", @CompNameA = '" + StandPar.spComNameA.Value + "'" +
          ", @CompNameE = '" + StandPar.spComNameE.Value + "'" +
          ", @BraNameA = '" + StandPar.spBraNameA.Value + "'" +
          ", @BraNameE = '" + StandPar.braNameE.Value + "'" +
          ", @LoginUser = '" + StandPar.spLoginUser.Value + "'" +
          ", @RepType = " + spRepType.Value + "" +
          ", @RegionCode = " + RegionCode.Value + "" +
          ", @BraCode = " + Bracode.Value + "" +
          ", @FromDate = '" + FromDate.Value + "'" +
          ", @ToDate = '" + TODate.Value + "'";
           

            var query = db.Database.SqlQuery<PProc_Rep_DSS_BillingStatus_Result>(_Query).ToList();
            if (Type==1)
            {
                BindReport(Rep.reportName, query);

            }
            else
            {
                BindReport_(Rep.reportName, Type, OutputType, query);
            }
          
            return query;


        }

        public IEnumerable<PProc_Rep_DSS_CollectiveWork_Result> DSS_CollectiveWork_BYScopeCat()
        {

            ReportStandardParameters StandPar = getStandardParameters();
            SqlParameter RegionCode = null;
            SqlParameter Bracode = null;
            SqlParameter FromDate = null;
            SqlParameter TODate = null;
            SqlParameter ScopeCategoryID = null;
            SqlParameter CustomerCategoryID = null;
            SqlParameter IsRepair = null;
            SqlParameter GroupType = null;

            string regionCode = Request["REGION_CODE"];
            if (regionCode == null || regionCode == "")
            {
                RegionCode = new SqlParameter("@RegionCode", System.Data.SqlTypes.SqlInt32.Null);
            }
            else
            {
                RegionCode = new SqlParameter("@RegionCode", Convert.ToInt32(regionCode));
            }
            string bracode = Request["braCode"].ToString();
            if (bracode == "")
            {
                Bracode = new SqlParameter("@Bracode", DBNull.Value);
            }
            else
            {
                Bracode = new SqlParameter("@BraCode", Convert.ToInt32(bracode));
            }

            string fromDate = Request["fromDate"];
            if (fromDate == "")
            {
                FromDate = new SqlParameter("@FromDate", null);
            }
            else
            {
                FromDate = new SqlParameter("@FromDate", (fromDate));
            }
            string toDate = Request["toDate"];
            if (toDate == "")
            {
                TODate = new SqlParameter("@ToDate", null);
            }
            else
            {
                TODate = new SqlParameter("@ToDate", toDate);
            }
            string ScopeCategory = Request["ScopeCategoryID"].ToString();
            if (ScopeCategory == "")
            {
                ScopeCategoryID = new SqlParameter("@ScopeCatID", System.Data.SqlTypes.SqlInt32.Null);
            }
            else
            {
                ScopeCategoryID = new SqlParameter("@ScopeCatID", Convert.ToInt32(ScopeCategory));
            }

            string CustomerCategoryid = Request["CustomerCategoryID"];
            if (CustomerCategoryid == "")
            {
                CustomerCategoryID = new SqlParameter("@CatID", System.Data.SqlTypes.SqlInt32.Null);
            }
            else
            {
                CustomerCategoryID = new SqlParameter("@CatID", Convert.ToInt32(CustomerCategoryid));
            }

            string isRepair = Request["IsRepair"].ToString();
            if (isRepair == "")
            {
                IsRepair = new SqlParameter("@ISRepair", System.Data.SqlTypes.SqlInt32.Null);
            }
            else
            {
                IsRepair = new SqlParameter("@ISRepair", Convert.ToInt32(isRepair));
            }
            string groupType = Request["TypeReport"].ToString();
            if (groupType == "")
            {
                GroupType = new SqlParameter("@GroupType", System.Data.SqlTypes.SqlInt32.Null);
            }
            else
            {
                GroupType = new SqlParameter("@GroupType", Convert.ToInt32(groupType));
            }

            ReportInfo Rep = OpenReport("DSS_CollectiveWork_BYScopeCat");
            string _Query = "execute " + Rep.dataSource +
          "  @comp = '" + StandPar.spComCode.Value + "'" +
          ", @CompNameA = '" + StandPar.spComNameA.Value + "'" +
          ", @CompNameE = '" + StandPar.spComNameE.Value + "'" +
          ", @BraNameA = '" + StandPar.spBraNameA.Value + "'" +
          ", @BraNameE = '" + StandPar.braNameE.Value + "'" +
          ", @LoginUser = '" + StandPar.spLoginUser.Value + "'" +
          ", @RegionCode = " + RegionCode.Value + "" +
          ", @FromDate = '" + FromDate.Value + "'" +
          ", @ToDate = '" + TODate.Value + "'" +
          ", @ScopeCatID = " + ScopeCategoryID.Value + "" +
          ", @CatID = " + CustomerCategoryID.Value + "" +
          ", @ISRepair = " + IsRepair.Value + "" +
          ", @GroupType = " + GroupType.Value + "";
            

            var query = db.Database.SqlQuery<PProc_Rep_DSS_CollectiveWork_Result>(_Query).ToList();
            BindReport(Rep.reportName, query);
            return query;


        }
        public IEnumerable<PProc_Rep_DSS_CollectiveWork_Result> DSS_CollectiveWork_BYScopeCat_ByBranch()
        {

            ReportStandardParameters StandPar = getStandardParameters();
            SqlParameter RegionCode = null;
            SqlParameter Bracode = null;
            SqlParameter FromDate = null;
            SqlParameter TODate = null;
            SqlParameter ScopeCategoryID = null;
            SqlParameter CustomerCategoryID = null;
            SqlParameter IsRepair = null;
            SqlParameter GroupType = null;

            string regionCode = Request["REGION_CODE"];
            if (regionCode == null || regionCode == "")
            {
                RegionCode = new SqlParameter("@RegionCode", System.Data.SqlTypes.SqlInt32.Null);
            }
            else
            {
                RegionCode = new SqlParameter("@RegionCode", Convert.ToInt32(regionCode));
            }
            string bracode = Request["braCode"].ToString();
            if (bracode == "")
            {
                Bracode = new SqlParameter("@Bracode", DBNull.Value);
            }
            else
            {
                Bracode = new SqlParameter("@BraCode", Convert.ToInt32(bracode));
            }

            string fromDate = Request["fromDate"];
            if (fromDate == "")
            {
                FromDate = new SqlParameter("@FromDate", null);
            }
            else
            {
                FromDate = new SqlParameter("@FromDate", (fromDate));
            }
            string toDate = Request["toDate"];
            if (toDate == "")
            {
                TODate = new SqlParameter("@ToDate", null);
            }
            else
            {
                TODate = new SqlParameter("@ToDate", toDate);
            }
            string ScopeCategory = Request["ScopeCategoryID"].ToString();
            if (ScopeCategory == "")
            {
                ScopeCategoryID = new SqlParameter("@ScopeCatID", System.Data.SqlTypes.SqlInt32.Null);
            }
            else
            {
                ScopeCategoryID = new SqlParameter("@ScopeCatID", Convert.ToInt32(ScopeCategory));
            }

            string CustomerCategoryid = Request["CustomerCategoryID"];
            if (CustomerCategoryid == "")
            {
                CustomerCategoryID = new SqlParameter("@CatID", System.Data.SqlTypes.SqlInt32.Null);
            }
            else
            {
                CustomerCategoryID = new SqlParameter("@CatID", Convert.ToInt32(CustomerCategoryid));
            }

            string isRepair = Request["IsRepair"].ToString();
            if (isRepair == "")
            {
                IsRepair = new SqlParameter("@ISRepair", System.Data.SqlTypes.SqlInt32.Null);
            }
            else
            {
                IsRepair = new SqlParameter("@ISRepair", Convert.ToInt32(isRepair));
            }
            string groupType = Request["TypeReport"].ToString();
            if (groupType == "")
            {
                GroupType = new SqlParameter("@GroupType", System.Data.SqlTypes.SqlInt32.Null);
            }
            else
            {
                GroupType = new SqlParameter("@GroupType", Convert.ToInt32(groupType));
            }

            ReportInfo Rep = OpenReport("DSS_CollectiveWork_BYScopeCat_ByBranch");
            string _Query = "execute " + Rep.dataSource +
          "  @comp = '" + StandPar.spComCode.Value + "'" +
          ", @CompNameA = '" + StandPar.spComNameA.Value + "'" +
          ", @CompNameE = '" + StandPar.spComNameE.Value + "'" +
          ", @BraNameA = '" + StandPar.spBraNameA.Value + "'" +
          ", @BraNameE = '" + StandPar.braNameE.Value + "'" +
          ", @LoginUser = '" + StandPar.spLoginUser.Value + "'" +
          ", @RegionCode = " + RegionCode.Value + "" +
          ", @FromDate = '" + FromDate.Value + "'" +
          ", @ToDate = '" + TODate.Value + "'" +
          ", @ScopeCatID = " + ScopeCategoryID.Value + "" +
          ", @CatID = " + CustomerCategoryID.Value + "" +
          ", @ISRepair = " + IsRepair.Value + "" +
          ", @GroupType = " + GroupType.Value + "";


            

            var query = db.Database.SqlQuery<PProc_Rep_DSS_CollectiveWork_Result>(_Query).ToList();
            BindReport(Rep.reportName, query);
            return query;


        }
        //--------
        //--------DSS_CollectiveWorkByBranch---
        public IEnumerable<PProc_Rep_DSS_SubContractorWorkSummary_Result> DSS_SubContractorWorkSummary()
        {

            ReportStandardParameters StandPar = getStandardParameters();
            SqlParameter RegionCode = null;
            SqlParameter Bracode = null;
            SqlParameter FromDate = null;
            SqlParameter TODate = null;
            SqlParameter ScopeCategoryID = null;
            SqlParameter CustomerCategoryID = null;
            SqlParameter IsRepair = null;
            SqlParameter GroupType = null;

            string regionCode = Request["REGION_CODE"];
            if (regionCode == null || regionCode == "")
            {
                RegionCode = new SqlParameter("@RegionCode", System.Data.SqlTypes.SqlInt32.Null);
            }
            else
            {
                RegionCode = new SqlParameter("@RegionCode", Convert.ToInt32(regionCode));
            }
            string bracode = Request["braCode"].ToString();
            if (bracode == "")
            {
                Bracode = new SqlParameter("@Bracode", DBNull.Value);
            }
            else
            {
                Bracode = new SqlParameter("@BraCode", Convert.ToInt32(bracode));
            }

            string fromDate = Request["fromDate"];
            if (fromDate == "")
            {
                FromDate = new SqlParameter("@FromDate", null);
            }
            else
            {
                FromDate = new SqlParameter("@FromDate", (fromDate));
            }
            string toDate = Request["toDate"];
            if (toDate == "")
            {
                TODate = new SqlParameter("@ToDate", null);
            }
            else
            {
                TODate = new SqlParameter("@ToDate", toDate);
            }
            string ScopeCategory = Request["ScopeCategoryID"].ToString();
            if (ScopeCategory == "")
            {
                ScopeCategoryID = new SqlParameter("@ScopeCatID", System.Data.SqlTypes.SqlInt32.Null);
            }
            else
            {
                ScopeCategoryID = new SqlParameter("@ScopeCatID", Convert.ToInt32(ScopeCategory));
            }

            string CustomerCategoryid = Request["CustomerCategoryID"];
            if (CustomerCategoryid == "")
            {
                CustomerCategoryID = new SqlParameter("@CatID", System.Data.SqlTypes.SqlInt32.Null);
            }
            else
            {
                CustomerCategoryID = new SqlParameter("@CatID", Convert.ToInt32(CustomerCategoryid));
            }

            string isRepair = Request["IsRepair"].ToString();
            if (isRepair == "")
            {
                IsRepair = new SqlParameter("@ISRepair", System.Data.SqlTypes.SqlInt32.Null);
            }
            else
            {
                IsRepair = new SqlParameter("@ISRepair", Convert.ToInt32(isRepair));
            }
            string groupType = Request["GroupType"].ToString();
            if (groupType == "")
            {
                GroupType = new SqlParameter("@GroupType", System.Data.SqlTypes.SqlInt32.Null);
            }
            else
            {
                GroupType = new SqlParameter("@GroupType", Convert.ToInt32(groupType));
            }

            ReportInfo Rep = OpenReport("DSS_SubContractorWorkSummary");
            string _Query = "execute " + Rep.dataSource +
          "  @comp = '" + StandPar.spComCode.Value + "'" +
          ", @CompNameA = '" + StandPar.spComNameA.Value + "'" +
          ", @CompNameE = '" + StandPar.spComNameE.Value + "'" +
          ", @BraNameA = '" + StandPar.spBraNameA.Value + "'" +
          ", @BraNameE = '" + StandPar.braNameE.Value + "'" +
          ", @LoginUser = '" + StandPar.spLoginUser.Value + "'" +
          ", @RegionCode = " + RegionCode.Value + "" +
          ", @FromDate = '" + FromDate.Value + "'" +
          ", @ToDate = '" + TODate.Value + "'" +
          ", @ScopeCatID = " + ScopeCategoryID.Value + "" +
          ", @CatID = " + CustomerCategoryID.Value + "" +
          ", @ISRepair = " + IsRepair.Value + "" +
          ", @GroupType = " + GroupType.Value + "";

            var query = db.Database.SqlQuery<PProc_Rep_DSS_SubContractorWorkSummary_Result>(_Query).ToList();
            BindReport(Rep.reportName, query);
            return query;
        }
        public IEnumerable<PProc_Rep_DSS_SubContractorWorkDetail_Result> DSS_SubContractorWorkDetail()
        {

            ReportStandardParameters StandPar = getStandardParameters();
            SqlParameter RegionCode = null;
            SqlParameter Bracode = null;
            SqlParameter FromDate = null;
            SqlParameter TODate = null;
            SqlParameter ScopeCategoryID = null;
            SqlParameter CustomerCategoryID = null;
            SqlParameter IsRepair = null;
            SqlParameter GroupType = null;
            ReportInfo Rep;

            string regionCode = Request["REGION_CODE"];
            if (regionCode == null || regionCode == "")
            {
                RegionCode = new SqlParameter("@RegionCode", System.Data.SqlTypes.SqlInt32.Null);
            }
            else
            {
                RegionCode = new SqlParameter("@RegionCode", Convert.ToInt32(regionCode));
            }
            string bracode = Request["braCode"].ToString();
            if (bracode == "")
            {
                Bracode = new SqlParameter("@Bracode", DBNull.Value);
            }
            else
            {
                Bracode = new SqlParameter("@BraCode", Convert.ToInt32(bracode));
            }

            string fromDate = Request["fromDate"];
            if (fromDate == "")
            {
                FromDate = new SqlParameter("@FromDate", null);
            }
            else
            {
                FromDate = new SqlParameter("@FromDate", (fromDate));
            }
            string toDate = Request["toDate"];
            if (toDate == "")
            {
                TODate = new SqlParameter("@ToDate", null);
            }
            else
            {
                TODate = new SqlParameter("@ToDate", toDate);
            }
            string ScopeCategory = Request["ScopeCategoryID"].ToString();
            if (ScopeCategory == "")
            {
                ScopeCategoryID = new SqlParameter("@ScopeCatID", System.Data.SqlTypes.SqlInt32.Null);
            }
            else
            {
                ScopeCategoryID = new SqlParameter("@ScopeCatID", Convert.ToInt32(ScopeCategory));
            }

            string CustomerCategoryid = Request["CustomerCategoryID"];
            if (CustomerCategoryid == "")
            {
                CustomerCategoryID = new SqlParameter("@CatID", System.Data.SqlTypes.SqlInt32.Null);
            }
            else
            {
                CustomerCategoryID = new SqlParameter("@CatID", Convert.ToInt32(CustomerCategoryid));
            }

            string isRepair = Request["IsRepair"].ToString();
            if (isRepair == "")
            {
                IsRepair = new SqlParameter("@ISRepair", System.Data.SqlTypes.SqlInt32.Null);
            }
            else
            {
                IsRepair = new SqlParameter("@ISRepair", Convert.ToInt32(isRepair));
            }
            string groupType = Request["GroupType"].ToString();
            if (groupType == "")
            {
                GroupType = new SqlParameter("@GroupType", System.Data.SqlTypes.SqlInt32.Null);
            }
            else
            {
                GroupType = new SqlParameter("@GroupType", Convert.ToInt32(groupType));
            }
            if (groupType == "1")  
                 Rep = OpenReport("DSS_SubContractorWorkDetailBranch");
            else
                 Rep = OpenReport("DSS_SubContractorWorkDetailScope");

            string _Query = "execute " + Rep.dataSource +
          "  @comp = '" + StandPar.spComCode.Value + "'" +
          ", @CompNameA = '" + StandPar.spComNameA.Value + "'" +
          ", @CompNameE = '" + StandPar.spComNameE.Value + "'" +
          ", @BraNameA = '" + StandPar.spBraNameA.Value + "'" +
          ", @BraNameE = '" + StandPar.braNameE.Value + "'" +
          ", @LoginUser = '" + StandPar.spLoginUser.Value + "'" +
          ", @RegionCode = " + RegionCode.Value + "" +
          ", @FromDate = '" + FromDate.Value + "'" +
          ", @ToDate = '" + TODate.Value + "'" +
          ", @ScopeCatID = " + ScopeCategoryID.Value + "" +
          ", @CatID = " + CustomerCategoryID.Value + "" +
          ", @ISRepair = " + IsRepair.Value + "" +
          ", @GroupType = " + GroupType.Value + "";

            var query = db.Database.SqlQuery<PProc_Rep_DSS_SubContractorWorkDetail_Result>(_Query).ToList();
            BindReport(Rep.reportName, query);
            return query;
        }
        public IEnumerable<PProc_Rep_DSS_SalesBranch_Result> DSS_SalesBranch()
        {

            ReportStandardParameters StandPar = getStandardParameters();
            SqlParameter RegionCode = null;
            SqlParameter Yearid = null;
            SqlParameter CatId  = null;
            ReportInfo Rep;

            string regionCode = Request["REGION_CODE"];
            if (regionCode == null || regionCode == "")
            {
                RegionCode = new SqlParameter("@RegionCode", System.Data.SqlTypes.SqlInt32.Null);
            }
            else
            {
                RegionCode = new SqlParameter("@RegionCode", Convert.ToInt32(regionCode));
            }
            string yr = Request["YearID"].ToString();
            if (yr == "")
            {
                Yearid = new SqlParameter("@YearID", System.Data.SqlTypes.SqlInt32.Null);
            }
            else
            {
                Yearid = new SqlParameter("@YearID", Convert.ToInt32(yr));
            }
            string cat = Request["CustomerCategoryID"].ToString();
            if (cat == "")
            {
                CatId = new SqlParameter("@CatID", System.Data.SqlTypes.SqlInt32.Null);
            }
            else
            {
                CatId = new SqlParameter("@CatID", Convert.ToInt32(cat));
            }
            Rep = OpenReport("DSS_SalesBranch");
            string _Query = "execute " + Rep.dataSource +
          "  @comp = '" + StandPar.spComCode.Value + "'" +
          ", @CompNameA = '" + StandPar.spComNameA.Value + "'" +
          ", @CompNameE = '" + StandPar.spComNameE.Value + "'" +
          ", @BraNameA = '" + StandPar.spBraNameA.Value + "'" +
          ", @BraNameE = '" + StandPar.braNameE.Value + "'" +
          ", @LoginUser = '" + StandPar.spLoginUser.Value + "'" +
          ", @CatID = " + CatId.Value + "" +
          ", @RegionCode = " + RegionCode.Value + "" +
          ", @YearID = " + Yearid.Value + "" ;

            var query = db.Database.SqlQuery<PProc_Rep_DSS_SalesBranch_Result>(_Query).ToList();
            BindReport(Rep.reportName, query);
            return query;
        }
        public IEnumerable<PProc_Rep_DSS_BillingBranch_Result> DSS_BillingBranch()
        {

            ReportStandardParameters StandPar = getStandardParameters();
            SqlParameter RegionCode = null;
            SqlParameter Yearid = null;
            SqlParameter ScopeCategoryID = null;
            SqlParameter ScopeID = null;
            SqlParameter CustomerCategoryID = null;
            SqlParameter IsRepair = null;

            ReportInfo Rep;

            string regionCode = Request["REGION_CODE"];
            if (regionCode == null || regionCode == "")
            {
                RegionCode = new SqlParameter("@RegionCode", System.Data.SqlTypes.SqlInt32.Null);
            }
            else
            {
                RegionCode = new SqlParameter("@RegionCode", Convert.ToInt32(regionCode));
            }
            string yr = Request["YearID"].ToString();
            if (yr == "")
            {
                Yearid = new SqlParameter("@YearID", DBNull.Value);
            }
            else
            {
                Yearid = new SqlParameter("@YearID", Convert.ToInt32(yr));
            }
            string ScopeCategory = Request["ScopeCategoryID"].ToString();
            if (ScopeCategory == "")
            {
                ScopeCategoryID = new SqlParameter("@ScopeCatID", System.Data.SqlTypes.SqlInt32.Null);
            }
            else
            {
                ScopeCategoryID = new SqlParameter("@ScopeCatID", Convert.ToInt32(ScopeCategory));
            }
            string Scope = Request["ScopeID"].ToString();
            if (Scope == "")
            {
                ScopeID = new SqlParameter("@ScopeID", System.Data.SqlTypes.SqlInt32.Null);
            }
            else
            {
                ScopeID = new SqlParameter("@ScopeID", Convert.ToInt32(Scope));
            }
            string CustomerCategoryid = Request["CustomerCategoryID"];
            if (CustomerCategoryid == "")
            {
                CustomerCategoryID = new SqlParameter("@CatID", System.Data.SqlTypes.SqlInt32.Null);
            }
            else
            {
                CustomerCategoryID = new SqlParameter("@CatID", Convert.ToInt32(CustomerCategoryid));
            }

            string isRepair = Request["IsRepair"].ToString();
            if (isRepair == "")
            {
                IsRepair = new SqlParameter("@ISRepair", System.Data.SqlTypes.SqlInt32.Null);
            }
            else
            {
                IsRepair = new SqlParameter("@ISRepair", Convert.ToInt32(isRepair));
            }
            Rep = OpenReport("DSS_BillingBranch");
            string _Query = "execute " + Rep.dataSource +
          "  @comp = '" + StandPar.spComCode.Value + "'" +
          ", @CompNameA = '" + StandPar.spComNameA.Value + "'" +
          ", @CompNameE = '" + StandPar.spComNameE.Value + "'" +
          ", @BraNameA = '" + StandPar.spBraNameA.Value + "'" +
          ", @BraNameE = '" + StandPar.braNameE.Value + "'" +
          ", @LoginUser = '" + StandPar.spLoginUser.Value + "'" +
          ", @RegionCode = " + RegionCode.Value + "" +
           ", @ScopeCatID = " + ScopeCategoryID.Value + "" +
           ", @ScopeID = " + ScopeID.Value + "" +
          ", @CatID = " + CustomerCategoryID.Value + "" +
          ", @ISRepair = " + IsRepair.Value + "" +
          ", @YearID = " + Yearid.Value + "";

            var query = db.Database.SqlQuery<PProc_Rep_DSS_BillingBranch_Result>(_Query).ToList();
            BindReport(Rep.reportName, query);
            return query;
        }
        public IEnumerable<PProc_Rep_DSS_ProductionBranch_Result> DSS_ProductionBranch()
        {

            ReportStandardParameters StandPar = getStandardParameters();
            SqlParameter RegionCode = null;
            SqlParameter Yearid = null;
            SqlParameter ScopeCategoryID = null;
            SqlParameter ScopeID = null;
            SqlParameter CustomerCategoryID = null;
            SqlParameter IsRepair = null;
            ReportInfo Rep;

            string regionCode = Request["REGION_CODE"];
            if (regionCode == null || regionCode == "")
            {
                RegionCode = new SqlParameter("@RegionCode", System.Data.SqlTypes.SqlInt32.Null);
            }
            else
            {
                RegionCode = new SqlParameter("@RegionCode", Convert.ToInt32(regionCode));
            }
            string yr = Request["YearID"].ToString();
            if (yr == "")
            {
                Yearid = new SqlParameter("@YearID", DBNull.Value);
            }
            else
            {
                Yearid = new SqlParameter("@YearID", Convert.ToInt32(yr));
            }
            string ScopeCategory = Request["ScopeCategoryID"].ToString();
            if (ScopeCategory == "")
            {
                ScopeCategoryID = new SqlParameter("@ScopeCatID", System.Data.SqlTypes.SqlInt32.Null);
            }
            else
            {
                ScopeCategoryID = new SqlParameter("@ScopeCatID", Convert.ToInt32(ScopeCategory));
            }
            string Scope = Request["ScopeID"].ToString();
            if (Scope == "")
            {
                ScopeID = new SqlParameter("@ScopeID", System.Data.SqlTypes.SqlInt32.Null);
            }
            else
            {
                ScopeID = new SqlParameter("@ScopeID", Convert.ToInt32(Scope));
            }
            string CustomerCategoryid = Request["CustomerCategoryID"];
            if (CustomerCategoryid == "")
            {
                CustomerCategoryID = new SqlParameter("@CatID", System.Data.SqlTypes.SqlInt32.Null);
            }
            else
            {
                CustomerCategoryID = new SqlParameter("@CatID", Convert.ToInt32(CustomerCategoryid));
            }

            string isRepair = Request["IsRepair"].ToString();
            if (isRepair == "")
            {
                IsRepair = new SqlParameter("@ISRepair", System.Data.SqlTypes.SqlInt32.Null);
            }
            else
            {
                IsRepair = new SqlParameter("@ISRepair", Convert.ToInt32(isRepair));
            }
            Rep = OpenReport("DSS_ProductionBranch");
            string _Query = "execute " + Rep.dataSource +
          "  @comp = '" + StandPar.spComCode.Value + "'" +
          ", @CompNameA = '" + StandPar.spComNameA.Value + "'" +
          ", @CompNameE = '" + StandPar.spComNameE.Value + "'" +
          ", @BraNameA = '" + StandPar.spBraNameA.Value + "'" +
          ", @BraNameE = '" + StandPar.braNameE.Value + "'" +
          ", @LoginUser = '" + StandPar.spLoginUser.Value + "'" +
          ", @RegionCode = " + RegionCode.Value + "" +
          ", @ScopeCatID = " + ScopeCategoryID.Value + "" +
           ", @ScopeID = " + ScopeID.Value + "" +
          ", @CatID = " + CustomerCategoryID.Value + "" +
          ", @ISRepair = " + IsRepair.Value + "" +
          ", @YearID = " + Yearid.Value + "";

            var query = db.Database.SqlQuery<PProc_Rep_DSS_ProductionBranch_Result>(_Query).ToList();
            BindReport(Rep.reportName, query);
            return query;
        }
        #region RES Reports
        public IEnumerable<PProc_Prnt_Res_MaterialRequest_Result> PPrnt_Res_MaterialRequest()
        {
            ReportStandardParameters StandPar = getStandardParameters();
            SqlParameter spTrID = null;

            int TrID = 0;
            string x = Request["TrID"].ToString();
            if (x == "")
            {
                spTrID = new SqlParameter("@TrID", DBNull.Value);
            }
            else
            {
                TrID = Convert.ToInt32(x);
                spTrID = new SqlParameter("@TrID", TrID);
            }

            ReportInfo Rep = OpenReport("PPrnt_Res_MaterialRequest");
            string _Query = "execute " + Rep.dataSource +
               " @comp = '" + StandPar.spComCode.Value + "'" +
                ", @CompNameA = '" + StandPar.spComNameA.Value + "'" +
                ", @CompNameE = '" + StandPar.spComNameE.Value + "'" +
                ", @BraNameA = '" + StandPar.spBraNameA.Value + "'" +
                ", @BraNameE = '" + StandPar.braNameE.Value + "'" +
                ", @LoginUser = '" + StandPar.spLoginUser.Value + "'" +
                ", @TrID = " + spTrID.Value;
            var query = db.Database.SqlQuery<PProc_Prnt_Res_MaterialRequest_Result>(_Query).ToList();

            BindReport(Rep.reportName, query);
            return query;
        }
        public IEnumerable<PProc_Prnt_Res_Materialissue_Result> PPrnt_Res_Materialissue()
        {
            ReportStandardParameters StandPar = getStandardParameters();
            SqlParameter spTrID = null;

            int TrID = 0;
            string x = Request["TrID"].ToString();
            if (x == "")
            {
                spTrID = new SqlParameter("@TrID", DBNull.Value);
            }
            else
            {
                TrID = Convert.ToInt32(x);
                spTrID = new SqlParameter("@TrID", TrID);
            }

            ReportInfo Rep = OpenReport("PPrnt_Res_Materialissue");
            string _Query = "execute " + Rep.dataSource +
                " @comp = '" + StandPar.spComCode.Value + "'" +
                ", @CompNameA = '" + StandPar.spComNameA.Value + "'" +
                ", @CompNameE = '" + StandPar.spComNameE.Value + "'" +
                ", @BraNameA = '" + StandPar.spBraNameA.Value + "'" +
                ", @BraNameE = '" + StandPar.braNameE.Value + "'" +
                ", @LoginUser = '" + StandPar.spLoginUser.Value + "'" +
                ", @TrID = " + spTrID.Value;
            var query = db.Database.SqlQuery<PProc_Prnt_Res_Materialissue_Result>(_Query).ToList();

            BindReport(Rep.reportName, query);
            return query;
        }
        public IEnumerable<PProc_Prnt_Res_MaterialReturn_Result> PPrnt_Res_MaterialReturn()
        {
            ReportStandardParameters StandPar = getStandardParameters();
            SqlParameter spTrID = null;

            int TrID = 0;
            string x = Request["TrID"].ToString();
            if (x == "")
            {
                spTrID = new SqlParameter("@TrID", DBNull.Value);
            }
            else
            {
                TrID = Convert.ToInt32(x);
                spTrID = new SqlParameter("@TrID", TrID);
            }

            ReportInfo Rep = OpenReport("PPrnt_Res_MaterialReturn");
            string _Query = "execute " + Rep.dataSource +
                " @comp = '" + StandPar.spComCode.Value + "'" +
                ", @CompNameA = '" + StandPar.spComNameA.Value + "'" +
                ", @CompNameE = '" + StandPar.spComNameE.Value + "'" +
                ", @BraNameA = '" + StandPar.spBraNameA.Value + "'" +
                ", @BraNameE = '" + StandPar.braNameE.Value + "'" +
                ", @LoginUser = '" + StandPar.spLoginUser.Value + "'" +
                ", @TrID = " + spTrID.Value;
            var query = db.Database.SqlQuery<PProc_Prnt_Res_MaterialReturn_Result>(_Query).ToList();

            BindReport(Rep.reportName, query);
            return query;
        }
        public IEnumerable<PProc_Prnt_Res_LaborOverTime_Result> PPrnt_Res_LaborOverTime()
        {
            ReportStandardParameters StandPar = getStandardParameters();
            SqlParameter spTrID = null;

            int TrID = 0;
            string x = Request["TrID"].ToString();
            if (x == "")
            {
                spTrID = new SqlParameter("@TrID", DBNull.Value);
            }
            else
            {
                TrID = Convert.ToInt32(x);
                spTrID = new SqlParameter("@TrID", TrID);
            }

            ReportInfo Rep = OpenReport("PPrnt_Res_LaborOverTime");
            string _Query = "execute " + Rep.dataSource +
               " @comp = '" + StandPar.spComCode.Value + "'" +
                ", @CompNameA = '" + StandPar.spComNameA.Value + "'" +
                ", @CompNameE = '" + StandPar.spComNameE.Value + "'" +
                ", @BraNameA = '" + StandPar.spBraNameA.Value + "'" +
                ", @BraNameE = '" + StandPar.braNameE.Value + "'" +
                ", @LoginUser = '" + StandPar.spLoginUser.Value + "'" +
                ", @TrID = " + spTrID.Value;
            var query = db.Database.SqlQuery<PProc_Prnt_Res_LaborOverTime_Result>(_Query).ToList();

            BindReport(Rep.reportName, query);
            return query;
        }
        public IEnumerable<PProc_Prnt_Res_LaborAbsenceLate_Result> PPrnt_Res_LaborAbsenceLate()
        {
            ReportStandardParameters StandPar = getStandardParameters();
            SqlParameter spTrID = null;

            int TrID = 0;
            string x = Request["TrID"].ToString();
            if (x == "")
            {
                spTrID = new SqlParameter("@TrID", DBNull.Value);
            }
            else
            {
                TrID = Convert.ToInt32(x);
                spTrID = new SqlParameter("@TrID", TrID);
            }

            ReportInfo Rep = OpenReport("PPrnt_Res_LaborAbsenceLate");
            string _Query = "execute " + Rep.dataSource +
               " @comp = '" + StandPar.spComCode.Value + "'" +
                ", @CompNameA = '" + StandPar.spComNameA.Value + "'" +
                ", @CompNameE = '" + StandPar.spComNameE.Value + "'" +
                ", @BraNameA = '" + StandPar.spBraNameA.Value + "'" +
                ", @BraNameE = '" + StandPar.braNameE.Value + "'" +
                ", @LoginUser = '" + StandPar.spLoginUser.Value + "'" +
                ", @TrID = " + spTrID.Value;
            var query = db.Database.SqlQuery<PProc_Prnt_Res_LaborAbsenceLate_Result>(_Query).ToList();

            BindReport(Rep.reportName, query);
            return query;
        }
        public IEnumerable<PProc_Prnt_Res_LaborRequest_Result> PPrnt_Res_LaborRequest()
        {
            ReportStandardParameters StandPar = getStandardParameters();
            SqlParameter spTrID = null;

            int TrID = 0;
            string x = Request["TrID"].ToString();
            if (x == "")
            {
                spTrID = new SqlParameter("@TrID", DBNull.Value);
            }
            else
            {
                TrID = Convert.ToInt32(x);
                spTrID = new SqlParameter("@TrID", TrID);
            }

            ReportInfo Rep = OpenReport("PPrnt_Res_LaborRequest");
            string _Query = "execute " + Rep.dataSource +
               " @comp = '" + StandPar.spComCode.Value + "'" +
                ", @CompNameA = '" + StandPar.spComNameA.Value + "'" +
                ", @CompNameE = '" + StandPar.spComNameE.Value + "'" +
                ", @BraNameA = '" + StandPar.spBraNameA.Value + "'" +
                ", @BraNameE = '" + StandPar.braNameE.Value + "'" +
                ", @LoginUser = '" + StandPar.spLoginUser.Value + "'" +
                ", @TrID = " + spTrID.Value;
            var query = db.Database.SqlQuery<PProc_Prnt_Res_LaborRequest_Result>(_Query).ToList();

            BindReport(Rep.reportName, query);
            return query;
        }
        public IEnumerable<PProc_Prnt_Res_EquipmentRequest_Result> PPrnt_Res_EquipmentRequest()
        {
            ReportStandardParameters StandPar = getStandardParameters();
            SqlParameter spTrID = null;

            int TrID = 0;
            string x = Request["TrID"].ToString();
            if (x == "")
            {
                spTrID = new SqlParameter("@TrID", DBNull.Value);
            }
            else
            {
                TrID = Convert.ToInt32(x);
                spTrID = new SqlParameter("@TrID", TrID);
            }

            ReportInfo Rep = OpenReport("PPrnt_Res_EquipmentRequest");
            string _Query = "execute " + Rep.dataSource +
               " @comp = '" + StandPar.spComCode.Value + "'" +
                ", @CompNameA = '" + StandPar.spComNameA.Value + "'" +
                ", @CompNameE = '" + StandPar.spComNameE.Value + "'" +
                ", @BraNameA = '" + StandPar.spBraNameA.Value + "'" +
                ", @BraNameE = '" + StandPar.braNameE.Value + "'" +
                ", @LoginUser = '" + StandPar.spLoginUser.Value + "'" +
                ", @TrID = " + spTrID.Value;
            var query = db.Database.SqlQuery<PProc_Prnt_Res_EquipmentRequest_Result>(_Query).ToList();

            BindReport(Rep.reportName, query);
            return query;
        }
        public IEnumerable<PProc_Prnt_Res_LaborAssign_Result> PPrnt_Res_AssignLabour()
        {
            ReportStandardParameters StandPar = getStandardParameters();
            SqlParameter spTrID = null;

            int TrID = 0;
            string x = Request["TrID"].ToString();
            if (x == "")
            {
                spTrID = new SqlParameter("@TrID", DBNull.Value);
            }
            else
            {
                TrID = Convert.ToInt32(x);
                spTrID = new SqlParameter("@TrID", TrID);
            }


            ReportInfo Rep = OpenReport("PPrnt_Res_AssignLabour");
            string _Query = "execute " + Rep.dataSource +
               " @comp = '" + StandPar.spComCode.Value + "'" +
                ", @CompNameA = '" + StandPar.spComNameA.Value + "'" +
                ", @CompNameE = '" + StandPar.spComNameE.Value + "'" +
                ", @BraNameA = '" + StandPar.spBraNameA.Value + "'" +
                ", @BraNameE = '" + StandPar.braNameE.Value + "'" +
                ", @LoginUser = '" + StandPar.spLoginUser.Value + "'" +
                ", @TrID = " + spTrID.Value;
            var query = db.Database.SqlQuery<PProc_Prnt_Res_LaborAssign_Result>(_Query).ToList();

            BindReport(Rep.reportName, query);
            return query;
        }
        public IEnumerable<PProc_Prnt_Res_EquipmentAssign_Result> PPrnt_Res_AssignEquipment()
        {
            ReportStandardParameters StandPar = getStandardParameters();
            SqlParameter spTrID = null;

            int TrID = 0;
            string x = Request["TrID"].ToString();
            if (x == "")
            {
                spTrID = new SqlParameter("@TrID", DBNull.Value);
            }
            else
            {
                TrID = Convert.ToInt32(x);
                spTrID = new SqlParameter("@TrID", TrID);
            }


            ReportInfo Rep = OpenReport("PPrnt_Res_AssignEquipment");
            string _Query = "execute " + Rep.dataSource +
               " @comp = '" + StandPar.spComCode.Value + "'" +
                ", @CompNameA = '" + StandPar.spComNameA.Value + "'" +
                ", @CompNameE = '" + StandPar.spComNameE.Value + "'" +
                ", @BraNameA = '" + StandPar.spBraNameA.Value + "'" +
                ", @BraNameE = '" + StandPar.braNameE.Value + "'" +
                ", @LoginUser = '" + StandPar.spLoginUser.Value + "'" +
                ", @TrID = " + spTrID.Value;
            var query = db.Database.SqlQuery<PProc_Prnt_Res_EquipmentAssign_Result>(_Query).ToList();

            BindReport(Rep.reportName, query);
            return query;
        }

        public IEnumerable<PProc_Rep_Res_RequirmentItem_Result> Rep_Res_RequirmentItem()
        {
            ReportStandardParameters StandPar = getStandardParameters();


            SqlParameter spBraCode = null;
            SqlParameter spProjectID = null;
            SqlParameter spPhaseid = null;



            string stBarID = Request["braCode"].ToString();
            int branCode = Convert.ToInt32(stBarID);
            spBraCode = new SqlParameter("@BraCode", branCode);



            int ProjectID = 0;
            string stProjectID = Request["ProjectID"].ToString();
            if (stProjectID == "")
            {
                spProjectID = new SqlParameter("@ProjID", DBNull.Value);
            }
            else
            {
                ProjectID = Convert.ToInt32(stProjectID);
                spProjectID = new SqlParameter("@ProjID", ProjectID);
            }



            int Phaseid = 0;
            string stPhaseid = Request["PhaseID"].ToString();
            if (stPhaseid == "")
            {
                spPhaseid = new SqlParameter("@PhaseID", DBNull.Value);
            }
            else
            {
                Phaseid = Convert.ToInt32(stPhaseid);
                spPhaseid = new SqlParameter("@PhaseID", Phaseid);
            }


            ReportInfo Rep = OpenReport("Rep_Res_RequirmentItem");

            string _Query = @" execute " + Rep.dataSource +
                " @comp = '" + StandPar.spComCode.Value + "', " +
                " @CompNameA = '" + StandPar.spComNameA.Value + "'," +
                " @CompNameE = '" + StandPar.spComNameE.Value + "'," +
                " @BraNameA = '" + StandPar.spBraNameA.Value + "'," +
                " @BraNameE = '" + StandPar.braNameE.Value + "'," +
                " @LoginUser = '" + StandPar.spLoginUser.Value + "'," +
                " @BraCode = '" + spBraCode.Value + "'," +
                " @ProjID = '" + spProjectID.Value + "'," +
                " @PhaseID = '" + spPhaseid.Value + "'";


            var query = db.Database.SqlQuery<PProc_Rep_Res_RequirmentItem_Result>(_Query).ToList();

            BindReport(Rep.reportName, query);
            return query;
        }
        public IEnumerable<PProc_Rep_Res_RequirmentPhase_Result> Rep_Res_RequirmentPhase()
        {
            ReportStandardParameters StandPar = getStandardParameters();


            SqlParameter spBraCode = null;
            SqlParameter spProjectID = null;
            SqlParameter spPhaseid = null;



            string stBarID = Request["braCode"].ToString();
            int branCode = Convert.ToInt32(stBarID);
            spBraCode = new SqlParameter("@BraCode", branCode);



            int ProjectID = 0;
            string stProjectID = Request["ProjectID"].ToString();
            if (stProjectID == "")
            {
                spProjectID = new SqlParameter("@ProjID", DBNull.Value);
            }
            else
            {
                ProjectID = Convert.ToInt32(stProjectID);
                spProjectID = new SqlParameter("@ProjID", ProjectID);
            }



            int Phaseid = 0;
            string stPhaseid = Request["PhaseID"].ToString();
            if (stPhaseid == "")
            {
                spPhaseid = new SqlParameter("@PhaseID", DBNull.Value);
            }
            else
            {
                Phaseid = Convert.ToInt32(stPhaseid);
                spPhaseid = new SqlParameter("@PhaseID", Phaseid);
            }


            ReportInfo Rep = OpenReport("Rep_Res_RequirmentPhase");

            string _Query = @" execute " + Rep.dataSource +
                " @comp = '" + StandPar.spComCode.Value + "', " +
                " @CompNameA = '" + StandPar.spComNameA.Value + "'," +
                " @CompNameE = '" + StandPar.spComNameE.Value + "'," +
                " @BraNameA = '" + StandPar.spBraNameA.Value + "'," +
                " @BraNameE = '" + StandPar.braNameE.Value + "'," +
                " @LoginUser = '" + StandPar.spLoginUser.Value + "'," +
                " @BraCode = '" + spBraCode.Value + "'," +
                " @ProjID = '" + spProjectID.Value + "'," +
                " @PhaseID = '" + spPhaseid.Value + "'";


            var query = db.Database.SqlQuery<PProc_Rep_Res_RequirmentPhase_Result>(_Query).ToList();

            BindReport(Rep.reportName, query);
            return query;
        }



        public IEnumerable<PProc_Rep_Res_MaterialUseItemSum_Result> Rep_Res_MaterialUseItemSum()
        {
            ReportStandardParameters StandPar = getStandardParameters();

            SqlParameter spFromDate = null;
            SqlParameter spToDate = null;
            SqlParameter spitemId = null;
            SqlParameter spProjectID = null;
            SqlParameter spcustClassID = null;
            SqlParameter spcustomerID = null;
            SqlParameter spscopeClassId = null;
            SqlParameter spscopeID = null;

            string FromDate = null;
            string stFromDate = Request["FromDate"].ToString();
            if (stFromDate == "")
            {
                spFromDate = new SqlParameter("@FromDate", DBNull.Value);
            }

            else
            {
                FromDate = (stFromDate);
                spFromDate = new SqlParameter("@FromDate", FromDate);

            }
            string ToDate = null;
            string stToDate = Request["ToDate"].ToString();
            if (stToDate == "")
            {
                spToDate = new SqlParameter("@ToDate", DBNull.Value);
            }
            else
            {
                ToDate = (stToDate);
                spToDate = new SqlParameter("@ToDate", ToDate);
            }

            int itemId = 0;
            string stitemId = Request["itemId"].ToString();
            if (stitemId == "")
            {
                spitemId = new SqlParameter("@itemId", DBNull.Value);
            }

            else
            {
                itemId = Convert.ToInt32(stitemId);
                spitemId = new SqlParameter("@itemId", itemId);

            }

            int ProjectID = 0;
            string stProjectID = Request["ProjectID"].ToString();
            if (stProjectID == "")
            {
                spProjectID = new SqlParameter("@ProjID", DBNull.Value);
            }
            else
            {
                ProjectID = Convert.ToInt32(stProjectID);
                spProjectID = new SqlParameter("@ProjID", ProjectID);
            }

            int custClassID = 0;
            string stcustClassID = Request["custClassID"].ToString();
            if (stcustClassID == "")
            {
                spcustClassID = new SqlParameter("@custClassID", DBNull.Value);
            }
            else
            {
                custClassID = Convert.ToInt32(stcustClassID);
                spcustClassID = new SqlParameter("@custClassID", custClassID);
            }

            int customerID = 0;
            string stcustomerID = Request["customerID"].ToString();
            if (stcustomerID == "")
            {
                spcustomerID = new SqlParameter("@customerID", DBNull.Value);
            }
            else
            {
                customerID = Convert.ToInt32(stcustomerID);
                spcustomerID = new SqlParameter("@customerID", customerID);
            }

            int scopeClassId = 0;
            string stscopeClassId = Request["scopeClassId"].ToString();
            if (stscopeClassId == "")
            {
                spscopeClassId = new SqlParameter("@scopeClassId", DBNull.Value);
            }
            else
            {
                scopeClassId = Convert.ToInt32(stscopeClassId);
                spscopeClassId = new SqlParameter("@scopeClassId", scopeClassId);
            }

            int scopeID = 0;
            string stscopeID = Request["ScopeID"].ToString();
            if (stscopeID == "")
            {
                spscopeID = new SqlParameter("@scopeID", DBNull.Value);
            }
            else
            {
                scopeID = Convert.ToInt32(stscopeID);
                spscopeID = new SqlParameter("@scopeID", scopeID);
            }


            ReportInfo Rep = OpenReport("Rep_Res_MaterialUseItemSum");

            string _Query = @" execute " + Rep.dataSource +
                " @comp = '" + StandPar.spComCode.Value + "', " +
                " @CompNameA = '" + StandPar.spComNameA.Value + "'," +
                " @CompNameE = '" + StandPar.spComNameE.Value + "'," +
                " @BraNameA = '" + StandPar.spBraNameA.Value + "'," +
                " @BraNameE = '" + StandPar.braNameE.Value + "'," +
                " @LoginUser = '" + StandPar.spLoginUser.Value + "'," +
                " @FromDate = '" + spFromDate.Value + "'," +
                " @ToDate = '" + spToDate.Value + "'," +
                " @itemId = '" + spitemId.Value + "'," +
                " @ProjID = '" + spProjectID.Value + "'," +
                " @custClassID = '" + spcustClassID.Value + "'," +
                " @customerID = '" + spcustomerID.Value + "'," +
                " @scopeClassId = '" + spscopeClassId.Value + "'," +
                " @scopeID = '" + spscopeID.Value + "'";


            var query = db.Database.SqlQuery<PProc_Rep_Res_MaterialUseItemSum_Result>(_Query).ToList();

            BindReport(Rep.reportName, query);
            return query;
        }
        public IEnumerable<PProc_Rep_Res_MaterialUseItemDet_Result> Rep_Res_MaterialUseItemDet()
        {
            ReportStandardParameters StandPar = getStandardParameters();

            SqlParameter spFromDate = null;
            SqlParameter spToDate = null;
            SqlParameter spitemId = null;
            SqlParameter spProjectID = null;
            SqlParameter spcustClassID = null;
            SqlParameter spcustomerID = null;
            SqlParameter spscopeClassId = null;
            SqlParameter spscopeID = null;

            string FromDate = null;
            string stFromDate = Request["FromDate"].ToString();
            if (stFromDate == "")
            {
                spFromDate = new SqlParameter("@FromDate", DBNull.Value);
            }

            else
            {
                FromDate = (stFromDate);
                spFromDate = new SqlParameter("@FromDate", FromDate);

            }
            string ToDate = null;
            string stToDate = Request["ToDate"].ToString();
            if (stToDate == "")
            {
                spToDate = new SqlParameter("@ToDate", DBNull.Value);
            }
            else
            {
                ToDate = (stToDate);
                spToDate = new SqlParameter("@ToDate", ToDate);
            }

            int itemId = 0;
            string stitemId = Request["itemId"].ToString();
            if (stitemId == "")
            {
                spitemId = new SqlParameter("@itemId", DBNull.Value);
            }

            else
            {
                itemId = Convert.ToInt32(stitemId);
                spitemId = new SqlParameter("@itemId", itemId);

            }

            int ProjectID = 0;
            string stProjectID = Request["ProjectID"].ToString();
            if (stProjectID == "")
            {
                spProjectID = new SqlParameter("@ProjID", DBNull.Value);
            }
            else
            {
                ProjectID = Convert.ToInt32(stProjectID);
                spProjectID = new SqlParameter("@ProjID", ProjectID);
            }

            int custClassID = 0;
            string stcustClassID = Request["custClassID"].ToString();
            if (stcustClassID == "")
            {
                spcustClassID = new SqlParameter("@custClassID", DBNull.Value);
            }
            else
            {
                custClassID = Convert.ToInt32(stcustClassID);
                spcustClassID = new SqlParameter("@custClassID", custClassID);
            }

            int customerID = 0;
            string stcustomerID = Request["customerID"].ToString();
            if (stcustomerID == "")
            {
                spcustomerID = new SqlParameter("@customerID", DBNull.Value);
            }
            else
            {
                customerID = Convert.ToInt32(stcustomerID);
                spcustomerID = new SqlParameter("@customerID", customerID);
            }

            int scopeClassId = 0;
            string stscopeClassId = Request["scopeClassId"].ToString();
            if (stscopeClassId == "")
            {
                spscopeClassId = new SqlParameter("@scopeClassId", DBNull.Value);
            }
            else
            {
                scopeClassId = Convert.ToInt32(stscopeClassId);
                spscopeClassId = new SqlParameter("@scopeClassId", scopeClassId);
            }

            int scopeID = 0;
            string stscopeID = Request["ScopeID"].ToString();
            if (stscopeID == "")
            {
                spscopeID = new SqlParameter("@scopeID", DBNull.Value);
            }
            else
            {
                scopeID = Convert.ToInt32(stscopeID);
                spscopeID = new SqlParameter("@scopeID", scopeID);
            }


            ReportInfo Rep = OpenReport("Rep_Res_MaterialUseItemDet");

            string _Query = @" execute " + Rep.dataSource +
                " @comp = '" + StandPar.spComCode.Value + "', " +
                " @CompNameA = '" + StandPar.spComNameA.Value + "'," +
                " @CompNameE = '" + StandPar.spComNameE.Value + "'," +
                " @BraNameA = '" + StandPar.spBraNameA.Value + "'," +
                " @BraNameE = '" + StandPar.braNameE.Value + "'," +
                " @LoginUser = '" + StandPar.spLoginUser.Value + "'," +
                " @FromDate = '" + spFromDate.Value + "'," +
                " @ToDate = '" + spToDate.Value + "'," +
                " @itemId = '" + spitemId.Value + "'," +
                " @ProjID = '" + spProjectID.Value + "'," +
                " @custClassID = '" + spcustClassID.Value + "'," +
                " @customerID = '" + spcustomerID.Value + "'," +
                " @scopeClassId = '" + spscopeClassId.Value + "'," +
                " @scopeID = '" + spscopeID.Value + "'";


            var query = db.Database.SqlQuery<PProc_Rep_Res_MaterialUseItemDet_Result>(_Query).ToList();

            BindReport(Rep.reportName, query);
            return query;
        }

        public IEnumerable<PProc_Rep_Res_MaterialUseProjectSum_Result> Rep_Res_MaterialUseProjectSum()
        {
            ReportStandardParameters StandPar = getStandardParameters();

            SqlParameter spFromDate = null;
            SqlParameter spToDate = null;
            SqlParameter spitemId = null;
            SqlParameter spitemCatID = null;
            SqlParameter spProjectID = null;



            string FromDate = null;
            string stFromDate = Request["FromDate"].ToString();
            if (stFromDate == "")
            {
                spFromDate = new SqlParameter("@FromDate", DBNull.Value);
            }

            else
            {
                FromDate = (stFromDate);
                spFromDate = new SqlParameter("@FromDate", FromDate);

            }
            string ToDate = null;
            string stToDate = Request["ToDate"].ToString();
            if (stToDate == "")
            {
                spToDate = new SqlParameter("@ToDate", DBNull.Value);
            }
            else
            {
                ToDate = (stToDate);
                spToDate = new SqlParameter("@ToDate", ToDate);
            }

            int itemId = 0;
            string stitemId = Request["ItemId"].ToString();
            if (stitemId == "")
            {
                spitemId = new SqlParameter("@itemId", DBNull.Value);
            }

            else
            {
                itemId = Convert.ToInt32(stitemId);
                spitemId = new SqlParameter("@itemId", itemId);

            }



            int itemCatID = 0;
            string stitemCatID = Request["itemCatID"].ToString();
            if (stitemCatID == "")
            {
                spitemCatID = new SqlParameter("@itemCatID", DBNull.Value);
            }
            else
            {
                itemCatID = Convert.ToInt32(stitemCatID);
                spitemCatID = new SqlParameter("@itemCatID", itemCatID);
            }




            int ProjectID = 0;
            string stProjectID = Request["ProjectID"].ToString();
            if (stProjectID == "")
            {
                spProjectID = new SqlParameter("@ProjID", DBNull.Value);
            }
            else
            {
                ProjectID = Convert.ToInt32(stProjectID);
                spProjectID = new SqlParameter("@ProjID", ProjectID);
            }


            ReportInfo Rep = OpenReport("Rep_Res_MaterialUseProjectSum");

            string _Query = @" execute " + Rep.dataSource +
                " @comp = '" + StandPar.spComCode.Value + "', " +
                " @CompNameA = '" + StandPar.spComNameA.Value + "'," +
                " @CompNameE = '" + StandPar.spComNameE.Value + "'," +
                " @BraNameA = '" + StandPar.spBraNameA.Value + "'," +
                " @BraNameE = '" + StandPar.braNameE.Value + "'," +
                " @LoginUser = '" + StandPar.spLoginUser.Value + "'," +
                " @FromDate = '" + spFromDate.Value + "'," +
                " @ToDate = '" + spToDate.Value + "'," +
                " @itemId = '" + spitemId.Value + "'," +
                " @itemCatID = '" + spitemCatID.Value + "'," +
                " @ProjID = '" + spProjectID.Value + "'";


            var query = db.Database.SqlQuery<PProc_Rep_Res_MaterialUseProjectSum_Result>(_Query).ToList();

            BindReport(Rep.reportName, query);
            return query;
        }
        public IEnumerable<PProc_Rep_Res_MaterialUseProjectDet_Result> Rep_Res_MaterialUseProjectDet()
        {
            ReportStandardParameters StandPar = getStandardParameters();

            SqlParameter spFromDate = null;
            SqlParameter spToDate = null;
            SqlParameter spitemId = null;
            SqlParameter spitemCatID = null;
            SqlParameter spProjectID = null;



            string FromDate = null;
            string stFromDate = Request["FromDate"].ToString();
            if (stFromDate == "")
            {
                spFromDate = new SqlParameter("@FromDate", DBNull.Value);
            }

            else
            {
                FromDate = (stFromDate);
                spFromDate = new SqlParameter("@FromDate", FromDate);

            }
            string ToDate = null;
            string stToDate = Request["ToDate"].ToString();
            if (stToDate == "")
            {
                spToDate = new SqlParameter("@ToDate", DBNull.Value);
            }
            else
            {
                ToDate = (stToDate);
                spToDate = new SqlParameter("@ToDate", ToDate);
            }

            int itemId = 0;
            string stitemId = Request["ItemId"].ToString();
            if (stitemId == "")
            {
                spitemId = new SqlParameter("@itemId", DBNull.Value);
            }

            else
            {
                itemId = Convert.ToInt32(stitemId);
                spitemId = new SqlParameter("@itemId", itemId);

            }



            int itemCatID = 0;
            string stitemCatID = Request["itemCatID"].ToString();
            if (stitemCatID == "")
            {
                spitemCatID = new SqlParameter("@itemCatID", DBNull.Value);
            }
            else
            {
                itemCatID = Convert.ToInt32(stitemCatID);
                spitemCatID = new SqlParameter("@itemCatID", itemCatID);
            }




            int ProjectID = 0;
            string stProjectID = Request["ProjectID"].ToString();
            if (stProjectID == "")
            {
                spProjectID = new SqlParameter("@ProjID", DBNull.Value);
            }
            else
            {
                ProjectID = Convert.ToInt32(stProjectID);
                spProjectID = new SqlParameter("@ProjID", ProjectID);
            }


            ReportInfo Rep = OpenReport("Rep_Res_MaterialUseProjectDet");

            string _Query = @" execute " + Rep.dataSource +
                " @comp = '" + StandPar.spComCode.Value + "', " +
                " @CompNameA = '" + StandPar.spComNameA.Value + "'," +
                " @CompNameE = '" + StandPar.spComNameE.Value + "'," +
                " @BraNameA = '" + StandPar.spBraNameA.Value + "'," +
                " @BraNameE = '" + StandPar.braNameE.Value + "'," +
                " @LoginUser = '" + StandPar.spLoginUser.Value + "'," +
                " @FromDate = '" + spFromDate.Value + "'," +
                " @ToDate = '" + spToDate.Value + "'," +
                " @itemId = '" + spitemId.Value + "'," +
                " @itemCatID = '" + spitemCatID.Value + "'," +
                " @ProjID = '" + spProjectID.Value + "'";


            var query = db.Database.SqlQuery<PProc_Rep_Res_MaterialUseProjectDet_Result>(_Query).ToList();

            BindReport(Rep.reportName, query);
            return query;
        }
        public IEnumerable<PProc_Rep_Res_MaterialUseSumMaterial_Result> PProc_Rep_Res_MaterialUseSumMaterial()
        {
            ReportStandardParameters StandPar = getStandardParameters();

            SqlParameter spFromDate = null;
            SqlParameter spToDate = null;
            SqlParameter spPhaseId = null;
            SqlParameter spEngId = null;
            SqlParameter spProjectID = null;
            SqlParameter spBraCode = null;

            int BraCode = 0;
            string stBraCode = Request["BraCode"].ToString();
            if (stBraCode == "")
            {
                spBraCode = new SqlParameter("@BraCode", DBNull.Value);
            }

            else
            {
                BraCode = Convert.ToInt32(stBraCode);
                spBraCode = new SqlParameter("@BraCode", BraCode);

            }
            string FromDate = null;
            string stFromDate = Request["FromDate"].ToString();
            if (stFromDate == "")
            {
                spFromDate = new SqlParameter("@FromDate", DBNull.Value);
            }
            else
            {
                FromDate = (stFromDate);
                spFromDate = new SqlParameter("@FromDate", FromDate);

            }
            string ToDate = null;
            string stToDate = Request["ToDate"].ToString();
            if (stToDate == "")
            {
                spToDate = new SqlParameter("@ToDate", DBNull.Value);
            }
            else
            {
                ToDate = (stToDate);
                spToDate = new SqlParameter("@ToDate", ToDate);
            }
            int PhaseiD = 0;
            string Phaseid = Request["Phaseid"].ToString();
            if (Phaseid == "")
            {
                spPhaseId = new SqlParameter("@PhaseID", DBNull.Value);
            }
            else
            {
                PhaseiD = Convert.ToInt32(Phaseid);
                spPhaseId = new SqlParameter("@PhaseID", PhaseiD);

            }
           int EngID = 0;
            string stEngId = Request["EngID"].ToString();
            if (stEngId == "")
            {
                spEngId = new SqlParameter("@EngID", DBNull.Value);
            }
            else
            {
                EngID = Convert.ToInt32(stEngId);
                spEngId = new SqlParameter("@EngID", EngID);
            }
            int ProjectID = 0;
            string stProjectID = Request["ProjectID"].ToString();
            if (stProjectID == "")
            {
                spProjectID = new SqlParameter("@ProjID", DBNull.Value);
            }
            else
            {
                ProjectID = Convert.ToInt32(stProjectID);
                spProjectID = new SqlParameter("@ProjID", ProjectID);
            }


            ReportInfo Rep = OpenReport("Rep_Res_MaterialUseSumMaterial");

            string _Query = @" execute " + Rep.dataSource +
                " @comp = '" + StandPar.spComCode.Value + "', " +
                " @CompNameA = '" + StandPar.spComNameA.Value + "'," +
                " @CompNameE = '" + StandPar.spComNameE.Value + "'," +
                " @BraNameA = '" + StandPar.spBraNameA.Value + "'," +
                " @BraNameE = '" + StandPar.braNameE.Value + "'," +
                " @LoginUser = '" + StandPar.spLoginUser.Value + "'," +
                " @FromDate = '" + spFromDate.Value + "'," +
                " @ToDate = '" + spToDate.Value + "'," +
                " @braCode = " + spBraCode.Value + "," +
                " @PhaseID = '" + spPhaseId.Value + "'," +
                " @EngID = '" + spEngId.Value + "'," +
                " @ProjID = '" + spProjectID.Value + "'";


            var query = db.Database.SqlQuery<PProc_Rep_Res_MaterialUseSumMaterial_Result>(_Query).ToList();

            BindReport(Rep.reportName, query);
            return query;
        }
        public IEnumerable<PProc_Rep_Res_MaterialUseSumTrans_Result> PProc_Rep_Res_MaterialUseSumTrans()
        {
            ReportStandardParameters StandPar = getStandardParameters();

            SqlParameter spFromDate = null;
            SqlParameter spToDate = null;
            SqlParameter spPhaseId = null;
            SqlParameter spEngId = null;
            SqlParameter spProjectID = null;
            SqlParameter spBraCode = null;

            int BraCode = 0;
            string stBraCode = Request["BraCode"].ToString();
            if (stBraCode == "")
            {
                spBraCode = new SqlParameter("@BraCode", DBNull.Value);
            }

            else
            {
                BraCode = Convert.ToInt32(stBraCode);
                spBraCode = new SqlParameter("@BraCode", BraCode);

            }
            string FromDate = null;
            string stFromDate = Request["FromDate"].ToString();
            if (stFromDate == "")
            {
                spFromDate = new SqlParameter("@FromDate", DBNull.Value);
            }
            else
            {
                FromDate = (stFromDate);
                spFromDate = new SqlParameter("@FromDate", FromDate);

            }
            string ToDate = null;
            string stToDate = Request["ToDate"].ToString();
            if (stToDate == "")
            {
                spToDate = new SqlParameter("@ToDate", DBNull.Value);
            }
            else
            {
                ToDate = (stToDate);
                spToDate = new SqlParameter("@ToDate", ToDate);
            }
            int PhaseiD = 0;
            string Phaseid = Request["Phaseid"].ToString();
            if (Phaseid == "")
            {
                spPhaseId = new SqlParameter("@PhaseID", DBNull.Value);
            }
            else
            {
                PhaseiD = Convert.ToInt32(Phaseid);
                spPhaseId = new SqlParameter("@PhaseID", PhaseiD);

            }
            int EngID = 0;
            string stEngId = Request["EngID"].ToString();
            if (stEngId == "")
            {
                spEngId = new SqlParameter("@EngID", DBNull.Value);
            }
            else
            {
                EngID = Convert.ToInt32(stEngId);
                spEngId = new SqlParameter("@EngID", EngID);
            }
            int ProjectID = 0;
            string stProjectID = Request["ProjectID"].ToString();
            if (stProjectID == "")
            {
                spProjectID = new SqlParameter("@ProjID", DBNull.Value);
            }
            else
            {
                ProjectID = Convert.ToInt32(stProjectID);
                spProjectID = new SqlParameter("@ProjID", ProjectID);
            }


            ReportInfo Rep = OpenReport("Rep_Res_MaterialUseSumTrans");

            string _Query = @" execute " + Rep.dataSource +
                " @comp = '" + StandPar.spComCode.Value + "', " +
                " @CompNameA = '" + StandPar.spComNameA.Value + "'," +
                " @CompNameE = '" + StandPar.spComNameE.Value + "'," +
                " @BraNameA = '" + StandPar.spBraNameA.Value + "'," +
                " @BraNameE = '" + StandPar.braNameE.Value + "'," +
                " @LoginUser = '" + StandPar.spLoginUser.Value + "'," +
                " @FromDate = '" + spFromDate.Value + "'," +
                " @ToDate = '" + spToDate.Value + "'," +
                " @braCode = " + spBraCode.Value + "," +
                " @PhaseID = '" + spPhaseId.Value + "'," +
                " @EngID = '" + spEngId.Value + "'," +
                " @ProjID = '" + spProjectID.Value + "'";


            var query = db.Database.SqlQuery<PProc_Rep_Res_MaterialUseSumTrans_Result>(_Query).ToList();

            BindReport(Rep.reportName, query);
            return query;
        }
        public IEnumerable<PProc_Rep_Res_LabourMovement_Result> Rep_Res_LabourMovement()
        {
            ReportStandardParameters StandPar = getStandardParameters();

            SqlParameter spFromDate = null;
            SqlParameter spToDate = null;
            SqlParameter spLabClassID = null;
            SqlParameter spLabCatID = null;
            SqlParameter spFromLabCode = null;
            SqlParameter spToLabCode = null;
            SqlParameter spBraCode = null;

            int BraCode = 0;
            string stBraCode = Request["BraCode"].ToString();
            if (stBraCode == "")
            {
                spBraCode = new SqlParameter("@BraCode", DBNull.Value);
            }

            else
            {
                BraCode = Convert.ToInt32(stBraCode);
                spBraCode = new SqlParameter("@BraCode", BraCode);

            }



            string FromDate = null;
            string stFromDate = Request["FromDate"].ToString();
            if (stFromDate == "")
            {
                spFromDate = new SqlParameter("@FromDate", DBNull.Value);
            }

            else
            {
                FromDate = (stFromDate);
                spFromDate = new SqlParameter("@FromDate", FromDate);

            }
            string ToDate = null;
            string stToDate = Request["ToDate"].ToString();
            if (stToDate == "")
            {
                spToDate = new SqlParameter("@ToDate", DBNull.Value);
            }
            else
            {
                ToDate = (stToDate);
                spToDate = new SqlParameter("@ToDate", ToDate);
            }



            int LabClassID = 0;
            string stLabClassID = Request["LabClassID"].ToString();
            if (stLabClassID == "")
            {
                spLabClassID = new SqlParameter("@LabClassID", "null");
            }

            else
            {
                LabClassID = Convert.ToInt32(stLabClassID);
                spLabClassID = new SqlParameter("@LabClassID", LabClassID);

            }




            int LabCatID = 0;
            string stLabCatID = Request["LabCatID"].ToString();
            if (stLabCatID == "")
            {
                spLabCatID = new SqlParameter("@LabCatID", "null");
            }
            else
            {
                LabCatID = Convert.ToInt32(stLabCatID);
                spLabCatID = new SqlParameter("@LabCatID", LabCatID);
            }




            int FromLabCode = 0;
            string stFromLabCode = Request["FromLabCode"].ToString();
            if (stFromLabCode == "")
            {
                spFromLabCode = new SqlParameter("@FromLabCode", "null");
            }
            else
            {
                FromLabCode = Convert.ToInt32(stFromLabCode);
                spFromLabCode = new SqlParameter("@FromLabCode", FromLabCode);
            }




            int ToLabCode = 0;
            string stToLabCode = Request["ToLabCode"].ToString();
            if (stToLabCode == "")
            {
                spToLabCode = new SqlParameter("@ToLabCode", "null");
            }
            else
            {
                ToLabCode = Convert.ToInt32(stToLabCode);
                spToLabCode = new SqlParameter("@ToLabCode", ToLabCode);
            }






            ReportInfo Rep = OpenReport("Rep_Res_LabourMovement");

            string _Query = @" execute " + Rep.dataSource +
                " @comp = '" + StandPar.spComCode.Value + "', " +
                " @CompNameA = '" + StandPar.spComNameA.Value + "'," +
                " @CompNameE = '" + StandPar.spComNameE.Value + "'," +
                " @BraNameA = '" + StandPar.spBraNameA.Value + "'," +
                " @BraNameE = '" + StandPar.braNameE.Value + "'," +
                " @LoginUser = '" + StandPar.spLoginUser.Value + "'," +
                 " @braCode = " + spBraCode.Value + "," +
                " @FromDate = '" + spFromDate.Value + "'," +
                " @ToDate = '" + spToDate.Value + "'," +
                " @LabClassID = " + spLabClassID.Value + "," +
                " @LabCatID = " + spLabCatID.Value + "," +
                " @FromLabCode = " + spFromLabCode.Value + "," +
                " @ToLabCode = " + spToLabCode.Value ;


            var query = db.Database.SqlQuery<PProc_Rep_Res_LabourMovement_Result>(_Query).ToList();

            BindReport(Rep.reportName, query);
            return query;
        }



        public IEnumerable<PProc_Rep_Res_UnprodSum_Result> Rep_Res_UnprodSum()
        {

            ReportStandardParameters StandPar = getStandardParameters();
            SqlParameter spFromDate = null;
            SqlParameter spToDate = null;
            SqlParameter spFromProjCode = null;
            SqlParameter spToProjCode = null;
            SqlParameter spEngID = null;
            SqlParameter spcustClassID = null;
            SqlParameter spcustomerID = null;
            SqlParameter spscopeClassId = null;
            SqlParameter spscopeID = null;
            SqlParameter spUnProdId = null;
            SqlParameter spUnprodCatID = null;
            SqlParameter spBraCode = null;

            int BraCode = 0;
            string stBraCode = Request["BraCode"].ToString();
            if (stBraCode == "")
            {
                spBraCode = new SqlParameter("@BraCode", DBNull.Value);
            }

            else
            {
                BraCode = Convert.ToInt32(stBraCode);
                spBraCode = new SqlParameter("@BraCode", BraCode);

            }

           




            string FromDate = null;
            string stFromDate = Request["FromDate"].ToString();
            if (stFromDate == "")
            {
                spFromDate = new SqlParameter("@FromDate", DBNull.Value);
            }

            else
            {
                FromDate = (stFromDate);
                spFromDate = new SqlParameter("@FromDate", FromDate);

            }
            string ToDate = null;
            string stToDate = Request["ToDate"].ToString();
            if (stToDate == "")
            {
                spToDate = new SqlParameter("@ToDate", DBNull.Value);
            }
            else
            {
                ToDate = (stToDate);
                spToDate = new SqlParameter("@ToDate", ToDate);
            }
            
            string FromProjCode = null;
            string stFromProjCode = Request["FromProjCode"].ToString();
            if (stFromProjCode == "")
            {
                spFromProjCode = new SqlParameter("@FromProjCode", DBNull.Value);
            }
            else
            {
                FromProjCode = (stFromProjCode);
                spFromProjCode = new SqlParameter("@FromProjCode", FromProjCode);
            }


            string ToProjCode = null;
            string stToProjCode = Request["ToProjCode"].ToString();
            if (stToProjCode == "")
            {
                spToProjCode = new SqlParameter("@ToProjCode", DBNull.Value);
            }
            else
            {
                ToProjCode = (stToProjCode);
                spToProjCode = new SqlParameter("@ToProjCode", ToProjCode);
            }


         
            int EngID = 0;
            string stEngID = Request["EngID"].ToString();
            if (stEngID == "")
            {
                spEngID = new SqlParameter("@EngID", DBNull.Value);
            }
            else
            {
                EngID = Convert.ToInt32(stEngID);
                spEngID = new SqlParameter("@EngID", EngID);
            }
            
            int custClassID = 0;
            string stcustClassID = Request["custClassID"].ToString();
            if (stcustClassID == "")
            {
                spcustClassID = new SqlParameter("@custClassID", DBNull.Value);
            }
            else
            {
                custClassID = Convert.ToInt32(stcustClassID);
                spcustClassID = new SqlParameter("@custClassID", custClassID);
            }
            
            int customerID = 0;
            string stcustomerID = Request["customerID"].ToString();
            if (stcustomerID == "")
            {
                spcustomerID = new SqlParameter("@customerID", DBNull.Value);
            }
            else
            {
                customerID = Convert.ToInt32(stcustomerID);
                spcustomerID = new SqlParameter("@customerID", customerID);
            }
            
            int scopeClassId = 0;
            string stscopeClassId = Request["scopeClassId"].ToString();
            if (stscopeClassId == "")
            {
                spscopeClassId = new SqlParameter("@scopeClassId", DBNull.Value);
            }
            else
            {
                scopeClassId = Convert.ToInt32(stscopeClassId);
                spscopeClassId = new SqlParameter("@scopeClassId", scopeClassId);
            }
            
            int scopeID = 0;
            string stscopeID = Request["scopeID"].ToString();
            if (stscopeID == "")
            {
                spscopeID = new SqlParameter("@scopeID", DBNull.Value);
            }
            else
            {
                scopeID = Convert.ToInt32(stscopeID);
                spscopeID = new SqlParameter("@scopeID", scopeID);
            }
            
            int UnProdId = 0;
            string stUnProdId = Request["UnProdId"].ToString();
            if (stUnProdId == "")
            {
                spUnProdId = new SqlParameter("@UnProdId", DBNull.Value);
            }
            else
            {
                UnProdId = Convert.ToInt32(stUnProdId);
                spUnProdId = new SqlParameter("@UnProdId", UnProdId);
            }
            
            int UnprodCatID = 0;
            string stUnprodCatID = Request["UnprodCatID"].ToString();
            if (stUnprodCatID == "")
            {
                spUnprodCatID = new SqlParameter("@UnprodCatID", DBNull.Value);
            }
            else
            {
                UnprodCatID = Convert.ToInt32(stUnprodCatID);
                spUnprodCatID = new SqlParameter("@UnprodCatID", UnprodCatID);
            }

            //------------------------------------------------------------------------------------------------------------


            ReportInfo Rep = OpenReport("Rep_Res_UnprodSum");

            string _Query = @" execute " + Rep.dataSource +
                " @comp = '" + StandPar.spComCode.Value + "', " +
                " @CompNameA = '" + StandPar.spComNameA.Value + "'," +
                " @CompNameE = '" + StandPar.spComNameE.Value + "'," +
                " @BraNameA = '" + StandPar.spBraNameA.Value + "'," +
                " @BraNameE = '" + StandPar.braNameE.Value + "'," +
                " @LoginUser = '" + StandPar.spLoginUser.Value + "'," +
                 " @braCode = " + spBraCode.Value + "," +
                " @FromDate = '" + spFromDate.Value + "'," +
                " @ToDate = '" + spToDate.Value + "'," +
                " @FromProjCode = '" + spFromProjCode.Value + "'," +
                " @ToProjCode = '" + spToProjCode.Value + "'," +
                " @EngID = '" + spEngID.Value + "'," +
                " @custClassID = '" + spcustClassID.Value + "'," +
                " @customerID = '" + spcustomerID.Value + "'," +
                " @scopeClassId = '" + spscopeClassId.Value + "'," +
                " @scopeID = '" + spscopeID.Value + "'," +
                " @UnProdId = '" + spUnProdId.Value + "'," +
                " @UnprodCatID = '" + spUnprodCatID.Value + "'";
            
            var query = db.Database.SqlQuery<PProc_Rep_Res_UnprodSum_Result>(_Query).ToList();

            BindReport(Rep.reportName, query);
            return query;
        }
        public IEnumerable<PProc_Rep_Res_UnprodDetail_Result> Rep_Res_UnprodDetail()
        {

            ReportStandardParameters StandPar = getStandardParameters();
            SqlParameter spFromDate = null;
            SqlParameter spToDate = null;
            SqlParameter spFromProjCode = null;
            SqlParameter spToProjCode = null;
            SqlParameter spEngID = null;
            SqlParameter spcustClassID = null;
            SqlParameter spcustomerID = null;
            SqlParameter spscopeClassId = null;
            SqlParameter spscopeID = null;
            SqlParameter spUnProdId = null;
            SqlParameter spUnprodCatID = null;
            SqlParameter spBraCode = null;

            int BraCode = 0;
            string stBraCode = Request["BraCode"].ToString();
            if (stBraCode == "")
            {
                spBraCode = new SqlParameter("@BraCode", DBNull.Value);
            }

            else
            {
                BraCode = Convert.ToInt32(stBraCode);
                spBraCode = new SqlParameter("@BraCode", BraCode);

            }

           




                       string FromDate = null;
            string stFromDate = Request["FromDate"].ToString();
            if (stFromDate == "")
            {
                spFromDate = new SqlParameter("@FromDate", DBNull.Value);
            }

            else
            {
                FromDate = (stFromDate);
                spFromDate = new SqlParameter("@FromDate", FromDate);

            }
            string ToDate = null;
            string stToDate = Request["ToDate"].ToString();
            if (stToDate == "")
            {
                spToDate = new SqlParameter("@ToDate", DBNull.Value);
            }
            else
            {
                ToDate = (stToDate);
                spToDate = new SqlParameter("@ToDate", ToDate);
            }

            string FromProjCode = null;
            string stFromProjCode = Request["FromProjCode"].ToString();
            if (stFromProjCode == "")
            {
                spFromProjCode = new SqlParameter("@FromProjCode", DBNull.Value);
            }
            else
            {
                FromProjCode = (stFromProjCode);
                spFromProjCode = new SqlParameter("@FromProjCode", FromProjCode);
            }

            string ToProjCode = null;
            string stToProjCode = Request["ToProjCode"].ToString();
            if (stToProjCode == "")
            {
                spToProjCode = new SqlParameter("@ToProjCode", DBNull.Value);
            }
            else
            {
                ToProjCode = (stToProjCode);
                spToProjCode = new SqlParameter("@ToProjCode", ToProjCode);
            }



            int EngID = 0;
            string stEngID = Request["EngID"].ToString();
            if (stEngID == "")
            {
                spEngID = new SqlParameter("@EngID", DBNull.Value);
            }
            else
            {
                EngID = Convert.ToInt32(stEngID);
                spEngID = new SqlParameter("@EngID", EngID);
            }

            int custClassID = 0;
            string stcustClassID = Request["custClassID"].ToString();
            if (stcustClassID == "")
            {
                spcustClassID = new SqlParameter("@custClassID", DBNull.Value);
            }
            else
            {
                custClassID = Convert.ToInt32(stcustClassID);
                spcustClassID = new SqlParameter("@custClassID", custClassID);
            }

            int customerID = 0;
            string stcustomerID = Request["customerID"].ToString();
            if (stcustomerID == "")
            {
                spcustomerID = new SqlParameter("@customerID", DBNull.Value);
            }
            else
            {
                customerID = Convert.ToInt32(stcustomerID);
                spcustomerID = new SqlParameter("@customerID", customerID);
            }

            int scopeClassId = 0;
            string stscopeClassId = Request["scopeClassId"].ToString();
            if (stscopeClassId == "")
            {
                spscopeClassId = new SqlParameter("@scopeClassId", DBNull.Value);
            }
            else
            {
                scopeClassId = Convert.ToInt32(stscopeClassId);
                spscopeClassId = new SqlParameter("@scopeClassId", scopeClassId);
            }

            int scopeID = 0;
            string stscopeID = Request["scopeID"].ToString();
            if (stscopeID == "")
            {
                spscopeID = new SqlParameter("@scopeID", DBNull.Value);
            }
            else
            {
                scopeID = Convert.ToInt32(stscopeID);
                spscopeID = new SqlParameter("@scopeID", scopeID);
            }

            int UnProdId = 0;
            string stUnProdId = Request["UnProdId"].ToString();
            if (stUnProdId == "")
            {
                spUnProdId = new SqlParameter("@UnProdId", DBNull.Value);
            }
            else
            {
                UnProdId = Convert.ToInt32(stUnProdId);
                spUnProdId = new SqlParameter("@UnProdId", UnProdId);
            }

            int UnprodCatID = 0;
            string stUnprodCatID = Request["UnprodCatID"].ToString();
            if (stUnprodCatID == "")
            {
                spUnprodCatID = new SqlParameter("@UnprodCatID", DBNull.Value);
            }
            else
            {
                UnprodCatID = Convert.ToInt32(stUnprodCatID);
                spUnprodCatID = new SqlParameter("@UnprodCatID", UnprodCatID);
            }

            //------------------------------------------------------------------------------------------------------------


            ReportInfo Rep = OpenReport("Rep_Res_UnprodDetail");

            string _Query = @" execute " + Rep.dataSource +
                " @comp = '" + StandPar.spComCode.Value + "', " +
                " @CompNameA = '" + StandPar.spComNameA.Value + "'," +
                " @CompNameE = '" + StandPar.spComNameE.Value + "'," +
                " @BraNameA = '" + StandPar.spBraNameA.Value + "'," +
                " @BraNameE = '" + StandPar.braNameE.Value + "'," +
                " @LoginUser = '" + StandPar.spLoginUser.Value + "'," +
                 " @braCode = " + spBraCode.Value + "," +
                " @FromDate = '" + spFromDate.Value + "'," +
                " @ToDate = '" + spToDate.Value + "'," +
                " @FromProjCode = '" + spFromProjCode.Value + "'," +
                " @ToProjCode = '" + spToProjCode.Value + "'," +
                " @EngID = '" + spEngID.Value + "'," +
                " @custClassID = '" + spcustClassID.Value + "'," +
                " @customerID = '" + spcustomerID.Value + "'," +
                " @scopeClassId = '" + spscopeClassId.Value + "'," +
                " @scopeID = '" + spscopeID.Value + "'," +
                " @UnProdId = '" + spUnProdId.Value + "'," +
                " @UnprodCatID = '" + spUnprodCatID.Value + "'";

            var query = db.Database.SqlQuery<PProc_Rep_Res_UnprodDetail_Result>(_Query).ToList();

            BindReport(Rep.reportName, query);
            return query;
        }



        public IEnumerable<PProc_Rep_Res_Equipmentwork_Result> Rep_Res_Equipmentwork()
        {

            ReportStandardParameters StandPar = getStandardParameters();
            SqlParameter spbra = null;
            SqlParameter spFromDate = null;
            SqlParameter spToDate = null;
            SqlParameter spFromProjCode = null;
            SqlParameter spToProjCode = null;
            SqlParameter spEngID = null;
            SqlParameter spscopeClassId = null;
            SqlParameter spscopeID = null;
            SqlParameter EquipClassID1 = null;
            SqlParameter FromEquipCode = null;
            SqlParameter ToEquipCode = null;






            int bra = 0;
            string stbraID = Request["braCode"].ToString();
            if (stbraID == "")
            {
                spbra = new SqlParameter("@bra", DBNull.Value);
            }
            else
            {
                bra = Convert.ToInt32(stbraID);
                spbra = new SqlParameter("@bra", bra);
            }

            string FromDate = null;
            string stFromDate = Request["FromDate"].ToString();
            if (stFromDate == "")
            {
                spFromDate = new SqlParameter("@FromDate", DBNull.Value);
            }

            else
            {
                FromDate = (stFromDate);
                spFromDate = new SqlParameter("@FromDate", FromDate);

            }
            string ToDate = null;
            string stToDate = Request["ToDate"].ToString();
            if (stToDate == "")
            {
                spToDate = new SqlParameter("@ToDate", DBNull.Value);
            }
            else
            {
                ToDate = (stToDate);
                spToDate = new SqlParameter("@ToDate", ToDate);
            }

            string FromProjCode = null;
            string stFromProjCode = Request["FromProjCode"].ToString();
            if (stFromProjCode == "")
            {
                spFromProjCode = new SqlParameter("@FromProjCode", DBNull.Value);
            }
            else
            {
                FromProjCode = (stFromProjCode);
                spFromProjCode = new SqlParameter("@FromProjCode", FromProjCode);
            }


            string ToProjCode = null;
            string stToProjCode = Request["ToProjCode"].ToString();
            if (stToProjCode == "")
            {
                spToProjCode = new SqlParameter("@ToProjCode", DBNull.Value);
            }
            else
            {
                ToProjCode = (stToProjCode);
                spToProjCode = new SqlParameter("@ToProjCode", ToProjCode);
            }



            int EngID = 0;
            string stEngID = Request["EngID"].ToString();
            if (stEngID == "")
            {
                spEngID = new SqlParameter("@EngID", DBNull.Value);
            }
            else
            {
                EngID = Convert.ToInt32(stEngID);
                spEngID = new SqlParameter("@EngID", EngID);
            }



            int scopeClassId = 0;
            string stscopeClassId = Request["scopeClassId"].ToString();
            if (stscopeClassId == "")
            {
                spscopeClassId = new SqlParameter("@scopeClassId", DBNull.Value);
            }
            else
            {
                scopeClassId = Convert.ToInt32(stscopeClassId);
                spscopeClassId = new SqlParameter("@scopeClassId", scopeClassId);
            }

            int scopeID = 0;
            string stscopeID = Request["ScopeID"].ToString();
            if (stscopeID == "")
            {
                spscopeID = new SqlParameter("@scopeID", DBNull.Value);
            }
            else
            {
                scopeID = Convert.ToInt32(stscopeID);
                spscopeID = new SqlParameter("@scopeID", scopeID);
            }


            int EquipClassID = 0;
            string stitemId = Request["EquipClassID"].ToString();///////
            if (stitemId == "")
            {
                EquipClassID1 = new SqlParameter("@EquipClassID", DBNull.Value);
            }

            else
            {
                EquipClassID = Convert.ToInt32(stitemId);
                EquipClassID1 = new SqlParameter("@EquipClassID", EquipClassID);

            }
            string FromEquip = null;
            string stFromEquipCode = Request["FromEquipCode"].ToString();
            if (stFromEquipCode == "")
            {
                FromEquipCode = new SqlParameter("@FromEquipCode", DBNull.Value);
            }

            else
            {
                FromEquip = (stFromEquipCode);
                FromEquipCode = new SqlParameter("@FromEquipCode", FromEquip);

            }
            string ToEquip = null;
            string stToEquipCode = Request["ToEquipCode"].ToString();
            if (stToEquipCode == "")
            {
                ToEquipCode = new SqlParameter("@ToEquipCode", DBNull.Value);
            }

            else
            {
                ToEquip = (stToEquipCode);
                ToEquipCode = new SqlParameter("@ToEquipCode", ToEquip);

            }
            //------------------------------------------------------------------------------------------------------------


            ReportInfo Rep = OpenReport("Rep_Res_Equipmentwork");

            string _Query = @" execute " + Rep.dataSource +
            " @comp = '" + StandPar.spComCode.Value + "', " +
            " @CompNameA = '" + StandPar.spComNameA.Value + "'," +
            " @CompNameE = '" + StandPar.spComNameE.Value + "'," +
            " @BraNameA = '" + StandPar.spBraNameA.Value + "'," +
            " @BraNameE = '" + StandPar.braNameE.Value + "'," +
            " @LoginUser = '" + StandPar.spLoginUser.Value + "'," +
             " @bra = '" + spbra.Value + "'," +

            " @FromDate = '" + spFromDate.Value + "'," +
            " @ToDate = '" + spToDate.Value + "'," +
            " @FromProjCode = '" + spFromProjCode.Value + "'," +
            " @ToProjCode = '" + spToProjCode.Value + "'," +
            " @EngID = '" + spEngID.Value + "'," +

            " @scopeClassId = '" + spscopeClassId.Value + "'," +
            " @scopeID = '" + spscopeID.Value + "'," +
            " @EquipClassID = '" + EquipClassID1.Value + "'," +

            " @FromEquipCode = '" + FromEquipCode.Value + "'," +
            " @ToEquipCode = '" + ToEquipCode.Value + "'";



            var query = db.Database.SqlQuery<PProc_Rep_Res_Equipmentwork_Result>(_Query).ToList();

            BindReport(Rep.reportName, query);
            return query;
        }




        public IEnumerable<PProc_Rep_Res_Labourwork_Result> Rep_Res_Labourwork()
        {

            ReportStandardParameters StandPar = getStandardParameters();
            SqlParameter spbra = null;
            SqlParameter spFromDate = null;
            SqlParameter spToDate = null;
            SqlParameter spFromProjCode = null;
            SqlParameter spToProjCode = null;
            SqlParameter spEngID = null;


            SqlParameter spscopeClassId = null;
            SqlParameter spscopeID = null;

            SqlParameter LabClassID1 = null;
            SqlParameter LabCatID1 = null;

            SqlParameter FromLabCode = null;
            SqlParameter ToLabCode = null;



            int bra = 0;
            string stbraID = Request["braCode"].ToString();
            if (stbraID == "")
            {
                spbra = new SqlParameter("@bra", DBNull.Value);
            }
            else
            {
                bra = Convert.ToInt32(stbraID);
                spbra = new SqlParameter("@bra", bra);
            }

            string FromDate = null;
            string stFromDate = Request["FromDate"].ToString();
            if (stFromDate == "")
            {
                spFromDate = new SqlParameter("@FromDate", DBNull.Value);
            }

            else
            {
                FromDate = (stFromDate);
                spFromDate = new SqlParameter("@FromDate", FromDate);

            }
            string ToDate = null;
            string stToDate = Request["ToDate"].ToString();
            if (stToDate == "")
            {
                spToDate = new SqlParameter("@ToDate", DBNull.Value);
            }
            else
            {
                ToDate = (stToDate);
                spToDate = new SqlParameter("@ToDate", ToDate);
            }



            string FromProjCode = null;
            string stFromProjCode = Request["FromProjCode"];
            if (stFromProjCode == "")
            {
                spFromProjCode = new SqlParameter("@FromProjCode", "null");
            }
            else
            {
                FromProjCode = (stFromProjCode);
                spFromProjCode = new SqlParameter("@FromProjCode", FromProjCode);
            }


            string ToProjCode = null;
            string stToProjCode = Request["ToProjCode"];
            if (stToProjCode == "")
            {
                spToProjCode = new SqlParameter("@ToProjCode", "null");
            }
            else
            {
                ToProjCode = (stToProjCode);
                spToProjCode = new SqlParameter("@ToProjCode", ToProjCode);
            }



            int EngID = 0;
            string stEngID = Request["EngID"].ToString();
            if (stEngID == "")
            {
                spEngID = new SqlParameter("@EngID", "null");
            }
            else
            {
                EngID = Convert.ToInt32(stEngID);
                spEngID = new SqlParameter("@EngID", EngID);
            }



            int scopeClassId = 0;
            string stscopeClassId = Request["scopeClassId"].ToString();
            if (stscopeClassId == "")
            {
                spscopeClassId = new SqlParameter("@scopeClassId", "null");
            }
            else
            {
                scopeClassId = Convert.ToInt32(stscopeClassId);
                spscopeClassId = new SqlParameter("@scopeClassId", scopeClassId);
            }

            int scopeID = 0;
            string stscopeID = Request["scopeID"].ToString();
            if (stscopeID == "")
            {
                spscopeID = new SqlParameter("@scopeID", "null");
            }
            else
            {
                scopeID = Convert.ToInt32(stscopeID);
                spscopeID = new SqlParameter("@scopeID", scopeID);
            }


            int LabClassID = 0;
            string stitemId = Request["LabClassID"].ToString();///////
            if (stitemId == "")
            {
                LabClassID1 = new SqlParameter("@LabClassID", "null");
            }

            else
            {
                LabClassID = Convert.ToInt32(stitemId);
                LabClassID1 = new SqlParameter("@LabClassID", LabClassID);

            }
            int LabCatID = 0;
            string stLabCatId = Request["LabCatID"].ToString();///////
            if (stLabCatId == "")
            {
                LabCatID1 = new SqlParameter("@LabCatID", "null");
            }

            else
            {
                LabCatID = Convert.ToInt32(stLabCatId);
                LabCatID1 = new SqlParameter("@LabCatID", LabCatID);

            }



            string FromLab = null;
            string stFromLabCode = Request["FromLabCode"];
            if (stFromLabCode == "")
            {
                FromLabCode = new SqlParameter("@FromLabCode", "null");
            }

            else
            {
                FromLab = (stFromLabCode);
                FromLabCode = new SqlParameter("@FromLabCode", FromLab);

            }
            string ToLab = null;
            string stToLabCode = Request["ToLabCode"];
            if (stToLabCode == "")
            {
                ToLabCode = new SqlParameter("@ToLabCode", "null");
            }

            else
            {
                ToLab = (stToLabCode);
                ToLabCode = new SqlParameter("@ToLabCode", ToLab);

            }
            //------------------------------------------------------------------------------------------------------------


            ReportInfo Rep = OpenReport("Rep_Res_Labourwork");

            string _Query = @" execute " + Rep.dataSource +
            " @comp = '" + StandPar.spComCode.Value + "', " +
            " @CompNameA = '" + StandPar.spComNameA.Value + "'," +
            " @CompNameE = '" + StandPar.spComNameE.Value + "'," +
            " @BraNameA = '" + StandPar.spBraNameA.Value + "'," +
            " @BraNameE = '" + StandPar.braNameE.Value + "'," +
            " @LoginUser = '" + StandPar.spLoginUser.Value + "'," +
            " @bra = '" + spbra.Value + "'," +
            " @FromDate = '" + spFromDate.Value + "'," +
            " @ToDate = '" + spToDate.Value + "'," +
            " @FromProjCode = " + spFromProjCode.Value + "," +
            " @ToProjCode = " + spToProjCode.Value + "," +
            " @EngID = " + spEngID.Value + "," +
            " @scopeClassId = " + spscopeClassId.Value + "," +
            " @scopeID = " + spscopeID.Value + "," +
            " @LabClassID  = " + LabClassID1.Value + "," +
            " @LabCatID  = " + LabCatID1.Value + "," +
            " @FromLabCode = " + FromLabCode.Value + "," +
            " @ToLabCode = " + ToLabCode.Value ;

            var query = db.Database.SqlQuery<PProc_Rep_Res_Labourwork_Result>(_Query).ToList();

            BindReport(Rep.reportName, query);
            return query;
        }
        public IEnumerable<PProc_Rep_Res_LabourBounus_Result> Rep_Res_LabourBounus()
        {

            ReportStandardParameters StandPar = getStandardParameters();
            SqlParameter spbra = null;
            SqlParameter spFromDate = null;
            SqlParameter spToDate = null;
            SqlParameter spFromProjCode = null;
            SqlParameter spToProjCode = null;
            SqlParameter spEngID = null;


            SqlParameter spscopeClassId = null;
            SqlParameter spscopeID = null;

            SqlParameter LabClassID1 = null;
            SqlParameter LabCatID1 = null;

            SqlParameter FromLabCode = null;
            SqlParameter ToLabCode = null;



            int bra = 0;
            string stbraID = Request["braCode"].ToString();
            if (stbraID == "")
            {
                spbra = new SqlParameter("@bra", DBNull.Value);
            }
            else
            {
                bra = Convert.ToInt32(stbraID);
                spbra = new SqlParameter("@bra", bra);
            }

            string FromDate = null;
            string stFromDate = Request["FromDate"].ToString();
            if (stFromDate == "")
            {
                spFromDate = new SqlParameter("@FromDate", DBNull.Value);
            }

            else
            {
                FromDate = (stFromDate);
                spFromDate = new SqlParameter("@FromDate", FromDate);

            }
            string ToDate = null;
            string stToDate = Request["ToDate"].ToString();
            if (stToDate == "")
            {
                spToDate = new SqlParameter("@ToDate", DBNull.Value);
            }
            else
            {
                ToDate = (stToDate);
                spToDate = new SqlParameter("@ToDate", ToDate);
            }

            string FromProjCode = null;
            string stFromProjCode = Request["FromProjCode"].ToString();
            if (stFromProjCode == "")
            {
                spFromProjCode = new SqlParameter("@FromProjCode", "null");
            }
            else
            {
                FromProjCode = (stFromProjCode);
                spFromProjCode = new SqlParameter("@FromProjCode", FromProjCode);
            }


            string ToProjCode = null;
            string stToProjCode = Request["ToProjCode"].ToString();
            if (stToProjCode == "")
            {
                spToProjCode = new SqlParameter("@ToProjCode", "null");
            }
            else
            {
                ToProjCode = (stToProjCode);
                spToProjCode = new SqlParameter("@ToProjCode", ToProjCode);
            }



            int EngID = 0;
            string stEngID = Request["EngID"].ToString();
            if (stEngID == "")
            {
                spEngID = new SqlParameter("@EngID", "null");
            }
            else
            {
                EngID = Convert.ToInt32(stEngID);
                spEngID = new SqlParameter("@EngID", EngID);
            }



           
            int scopeClassId = 0;
            string stscopeClassId = Request["scopeClassId"].ToString();
            if (stscopeClassId == "")
            {
                spscopeClassId = new SqlParameter("@scopeClassId", "null");
            }
            else
            {
                scopeClassId = Convert.ToInt32(stscopeClassId);
                spscopeClassId = new SqlParameter("@scopeClassId", scopeClassId);
            }

            int scopeID = 0;
            string stscopeID = Request["scopeID"].ToString();
            if (stscopeID == "")
            {
                spscopeID = new SqlParameter("@scopeID", "null");
            }
            else
            {
                scopeID = Convert.ToInt32(stscopeID);
                spscopeID = new SqlParameter("@scopeID", scopeID);
            }


            int LabClassID = 0;
            string stitemId = Request["LabClassID"].ToString();
            if (stitemId == "")
            {
                LabClassID1 = new SqlParameter("@LabClassID", "null");
            }

            else
            {
                LabClassID = Convert.ToInt32(stitemId);
                LabClassID1 = new SqlParameter("@LabClassID", LabClassID);

            }


            int LabCatID = 0;
            string stLabCatId = Request["LabCatID"].ToString();
            if (stitemId == "")
            {
                LabCatID1 = new SqlParameter("@LabCatID", "null");
            }

            else
            {
                LabCatID = Convert.ToInt32(stitemId);
                LabCatID1 = new SqlParameter("@LabCatID", LabCatID);

            }







            //int LabCatID = 0;
            //string stLabCatId = Request["LabCatID"].ToString(); 
            //if (stLabCatId == "")
            //{
            //    LabClassID1 = new SqlParameter("@LabCatID", "null");
            //}

            //else
            //{
            //    LabCatID = Convert.ToInt32(stLabCatId);
            //    LabCatID1 = new SqlParameter("@LabCatID", LabCatID);

            //}



            string FromLab = null;
            string stFromLabCode = Request["FromLabCode"].ToString();
            if (stFromLabCode == "")
            {
                FromLabCode = new SqlParameter("@FromLabCode", "null");
            }

            else
            {
                FromLab = (stFromLabCode);
                FromLabCode = new SqlParameter("@FromLabCode", FromLab);

            }
            string ToLab = null;
            string stToLabCode = Request["ToLabCode"].ToString();
            if (stToLabCode == "")
            {
                ToLabCode = new SqlParameter("@ToLabCode", "null");
            }

            else
            {
                ToLab = (stToLabCode);
                ToLabCode = new SqlParameter("@ToLabCode", ToLab);

            }
            //------------------------------------------------------------------------------------------------------------


            ReportInfo Rep = OpenReport("Rep_Res_LabourBounus");

            string _Query = @" execute " + Rep.dataSource +
            " @comp = '" + StandPar.spComCode.Value + "', " +
            " @CompNameA = '" + StandPar.spComNameA.Value + "'," +
            " @CompNameE = '" + StandPar.spComNameE.Value + "'," +
            " @BraNameA = '" + StandPar.spBraNameA.Value + "'," +
            " @BraNameE = '" + StandPar.braNameE.Value + "'," +
            " @LoginUser = '" + StandPar.spLoginUser.Value + "'," +
            " @bra = '" + spbra.Value + "'," +
            " @FromDate = '" + spFromDate.Value + "'," +
            " @ToDate = '" + spToDate.Value + "'," +
            " @FromProjCode = " + spFromProjCode.Value + "," +
            " @ToProjCode = " + spToProjCode.Value + "," +
            " @EngID = " + spEngID.Value + "," +
            " @scopeClassId = " + spscopeClassId.Value + "," +
            " @scopeID = " + spscopeID.Value + "," +
            " @LabClassID  = " + LabClassID1.Value + "," +
            " @LabCatID  = " + LabCatID1.Value + "," +
            " @FromLabCode = " + FromLabCode.Value + "," +
            " @ToLabCode = " + ToLabCode.Value ;





            var query = db.Database.SqlQuery<PProc_Rep_Res_LabourBounus_Result>(_Query).ToList();

            BindReport(Rep.reportName, query);
            return query;
        }


        public IEnumerable<PProc_Rep_Res_LabourAttendance_Result> Rep_Res_LabourAttendance()
        {
            ReportStandardParameters StandPar = getStandardParameters();

            SqlParameter spFromDate = null;
            SqlParameter spToDate = null;

            SqlParameter LabClassID1 = null;
            SqlParameter LabCatID1 = null;

            SqlParameter FromLabCode = null;
            SqlParameter ToLabCode = null;
            SqlParameter spBraCode = null;

            int BraCode = 0;
            string stBraCode = Request["BraCode"].ToString();
            if (stBraCode == "")
            {
                spBraCode = new SqlParameter("@BraCode", DBNull.Value);
            }

            else
            {
                BraCode = Convert.ToInt32(stBraCode);
                spBraCode = new SqlParameter("@BraCode", BraCode);

            }

          

                       string FromDate = null;
            string stFromDate = Request["FromDate"].ToString();
            if (stFromDate == "")
            {
                spFromDate = new SqlParameter("@FromDate", DBNull.Value);
            }

            else
            {
                FromDate = (stFromDate);
                spFromDate = new SqlParameter("@FromDate", FromDate);

            }
            string ToDate = null;
            string stToDate = Request["ToDate"].ToString();
            if (stToDate == "")
            {
                spToDate = new SqlParameter("@ToDate", DBNull.Value);
            }
            else
            {
                ToDate = (stToDate);
                spToDate = new SqlParameter("@ToDate", ToDate);
            }

            int LabClassID = 0;
            string stitemId = Request["LabClassID"].ToString();///////
            if (stitemId == "")
            {
                LabClassID1 = new SqlParameter("@LabClassID", DBNull.Value);
            }

            else
            {
                LabClassID = Convert.ToInt32(stitemId);
                LabClassID1 = new SqlParameter("@LabClassID", LabClassID);

            }
            int LabCatID = 0;
            string stLabCatId = Request["LabCatID"].ToString();
            if (stLabCatId == "")
            {
                LabCatID1 = new SqlParameter("@LabCatID", DBNull.Value);
            }

            else
            {
                LabCatID = Convert.ToInt32(stLabCatId);
                LabCatID1 = new SqlParameter("@LabCatID", LabCatID);

            }
            string FromLab = null;
            string stFromLabCode = Request["FromLab"].ToString();
            if (stFromLabCode == "")
            {
                FromLabCode = new SqlParameter("@FromLabCode", DBNull.Value);
            }

            else
            {
                FromLab = (stFromLabCode);
                FromLabCode = new SqlParameter("@FromLabCode", FromLab);

            }
            string ToLab = null;
            string stToLabCode = Request["ToLab"].ToString();
            if (stToLabCode == "")
            {
                ToLabCode = new SqlParameter("@ToLabCode", DBNull.Value);
            }

            else
            {
                ToLab = (stToLabCode);
                ToLabCode = new SqlParameter("@ToLabCode", ToLab);

            }

            ReportInfo Rep = OpenReport("Rep_Res_LabourAttendance");

            string _Query = @" execute " + Rep.dataSource +
            " @comp = '" + StandPar.spComCode.Value + "', " +
            " @CompNameA = '" + StandPar.spComNameA.Value + "'," +
            " @CompNameE = '" + StandPar.spComNameE.Value + "'," +
            " @BraNameA = '" + StandPar.spBraNameA.Value + "'," +
            " @BraNameE = '" + StandPar.braNameE.Value + "'," +
            " @LoginUser = '" + StandPar.spLoginUser.Value + "'," +
            " @braCode = " + spBraCode.Value + "," +
            " @FromDate = '" + spFromDate.Value + "'," +
            " @ToDate = '" + spToDate.Value + "'," +
            " @LabClassID = '" + LabClassID1.Value + "'," +
            " @LabCatID = '" + LabCatID1.Value + "'," +
            " @FromLabCode = '" + FromLabCode.Value + "'," +
            " @ToLabCode = '" + ToLabCode.Value + "'";


            var query = db.Database.SqlQuery<PProc_Rep_Res_LabourAttendance_Result>(_Query).ToList();

            BindReport(Rep.reportName, query);
            return query;
        }


        public IEnumerable<PProc_Rep_Res_EquipmentMovement_Result> Rep_Res_EquipmentMovement()
        {
            ReportStandardParameters StandPar = getStandardParameters();

            SqlParameter spFromDate = null;
            SqlParameter spToDate = null;

            SqlParameter EquipClassID1 = null;


            SqlParameter FromEquipCode = null;
            SqlParameter ToEquipCode = null;
            SqlParameter spBraCode = null;

            int BraCode = 0;
            string stBraCode = Request["BraCode"].ToString();
            if (stBraCode == "")
            {
                spBraCode = new SqlParameter("@BraCode", DBNull.Value);
            }

            else
            {
                BraCode = Convert.ToInt32(stBraCode);
                spBraCode = new SqlParameter("@BraCode", BraCode);

            }
            string FromDate = null;
            string stFromDate = Request["FromDate"].ToString();
            if (stFromDate == "")
            {
                spFromDate = new SqlParameter("@FromDate", DBNull.Value);
            }

            else
            {
                FromDate = (stFromDate);
                spFromDate = new SqlParameter("@FromDate", FromDate);

            }
            string ToDate = null;
            string stToDate = Request["ToDate"].ToString();
            if (stToDate == "")
            {
                spToDate = new SqlParameter("@ToDate", DBNull.Value);
            }
            else
            {
                ToDate = (stToDate);
                spToDate = new SqlParameter("@ToDate", ToDate);
            }

            int EquipClassID = 0;
            string stitemId = Request["EquipClassID"].ToString();///////
            if (stitemId == "")
            {
                EquipClassID1 = new SqlParameter("@EquipClassID", DBNull.Value);
            }

            else
            {
                EquipClassID = Convert.ToInt32(stitemId);
                EquipClassID1 = new SqlParameter("@EquipClassID", EquipClassID);

            }

            string FromEquip = null;
            string stFromEquipCode = Request["FromEquip"].ToString();
            if (stFromEquipCode == "")
            {
                FromEquipCode = new SqlParameter("@FromEquipCode", DBNull.Value);
            }

            else
            {
                FromEquip = (stFromEquipCode);
                FromEquipCode = new SqlParameter("@FromEquipCode", FromEquip);

            }
            string ToEquip = null;
            string stToEquipCode = Request["ToEquip"].ToString();
            if (stToEquipCode == "")
            {
                ToEquipCode = new SqlParameter("@ToEquipCode", DBNull.Value);
            }

            else
            {
                ToEquip = (stToEquipCode);
                ToEquipCode = new SqlParameter("@ToEquipCode", ToEquip);

            }

            ReportInfo Rep = OpenReport("Rep_Res_EquipmentMovement");

            string _Query = @" execute " + Rep.dataSource +
                " @comp = '" + StandPar.spComCode.Value + "', " +
                " @CompNameA = '" + StandPar.spComNameA.Value + "'," +
                " @CompNameE = '" + StandPar.spComNameE.Value + "'," +
                " @BraNameA = '" + StandPar.spBraNameA.Value + "'," +
                " @BraNameE = '" + StandPar.braNameE.Value + "'," +
                " @LoginUser = '" + StandPar.spLoginUser.Value + "'," +
                " @braCode = " + spBraCode.Value + "," +
                " @FromDate = '" + spFromDate.Value + "'," +
                " @ToDate = '" + spToDate.Value + "'," +
                " @EquipClassID = '" + EquipClassID1.Value + "'," +
                " @FromEquipCode = '" + FromEquipCode.Value + "'," +
                " @ToEquipCode = '" + ToEquipCode.Value + "'";


            var query = db.Database.SqlQuery<PProc_Rep_Res_EquipmentMovement_Result>(_Query).ToList();

            BindReport(Rep.reportName, query);
            return query;
        }

        //MohamedRagab
        public IEnumerable<PProc_Rep_Res_LabourFree_Result> Rep_Res_LabourMovementFreeLAbor()
        {
            ReportStandardParameters StandPar = getStandardParameters();

            SqlParameter spFromDate = null;
            SqlParameter spToDate = null;
            SqlParameter spLabClassID = null;
            SqlParameter spLabCatID = null;
            SqlParameter spFromLabCode = null;
            SqlParameter spToLabCode = null;
            SqlParameter spBraCode = null;

            int BraCode = 0;
            string stBraCode = Request["BraCode"].ToString();
            if (stBraCode == "")
            {
                spBraCode = new SqlParameter("@BraCode", DBNull.Value);
            }

            else
            {
                BraCode = Convert.ToInt32(stBraCode);
                spBraCode = new SqlParameter("@BraCode", BraCode);

            }

            string FromDate = null;
            string stFromDate = Request["FromDate"].ToString();
            if (stFromDate == "")
            {
                spFromDate = new SqlParameter("@FromDate", DBNull.Value);
            }

            else
            {
                FromDate = (stFromDate);
                spFromDate = new SqlParameter("@FromDate", FromDate);

            }
            string ToDate = null;
            string stToDate = Request["ToDate"].ToString();
            if (stToDate == "")
            {
                spToDate = new SqlParameter("@ToDate", DBNull.Value);
            }
            else
            {
                ToDate = (stToDate);
                spToDate = new SqlParameter("@ToDate", ToDate);
            }



            int LabClassID = 0;
            string stLabClassID = Request["LabClassID"].ToString();
            if (stLabClassID == "")
            {
                spLabClassID = new SqlParameter("@LabClassID", "null");
            }

            else
            {
                LabClassID = Convert.ToInt32(stLabClassID);
                spLabClassID = new SqlParameter("@LabClassID", LabClassID);

            }




            int LabCatID = 0;
            string stLabCatID = Request["LabCatID"].ToString();
            if (stLabCatID == "")
            {
                spLabCatID = new SqlParameter("@LabCatID", "null");
            }
            else
            {
                LabCatID = Convert.ToInt32(stLabCatID);
                spLabCatID = new SqlParameter("@LabCatID", LabCatID);
            }




            int FromLabCode = 0;
            string stFromLabCode = Request["FromLabCode"].ToString();
            if (stFromLabCode == "")
            {
                spFromLabCode = new SqlParameter("@FromLabCode", "null");
            }
            else
            {
                FromLabCode = Convert.ToInt32(stFromLabCode);
                spFromLabCode = new SqlParameter("@FromLabCode", FromLabCode);
            }




            int ToLabCode = 0;
            string stToLabCode = Request["ToLabCode"].ToString();
            if (stToLabCode == "")
            {
                spToLabCode = new SqlParameter("@ToLabCode", "null");
            }
            else
            {
                ToLabCode = Convert.ToInt32(stToLabCode);
                spToLabCode = new SqlParameter("@ToLabCode", ToLabCode);
            }

            ReportInfo Rep = OpenReport("Rep_Res_LabourMovementFreeLAbor");

            string _Query = @" execute " + Rep.dataSource +
                " @comp = '" + StandPar.spComCode.Value + "', " +
                " @CompNameA = '" + StandPar.spComNameA.Value + "'," +
                " @CompNameE = '" + StandPar.spComNameE.Value + "'," +
                " @BraNameA = '" + StandPar.spBraNameA.Value + "'," +
                " @BraNameE = '" + StandPar.braNameE.Value + "'," +
                " @LoginUser = '" + StandPar.spLoginUser.Value + "'," +
                " @braCode = " + spBraCode.Value + "," +
                " @FromDate = '" + spFromDate.Value + "'," +
                " @ToDate = '" + spToDate.Value + "'," +
                " @LabClassID = " + spLabClassID.Value + "," +
                " @LabCatID = " + spLabCatID.Value + "," +
                " @FromLabCode = " + spFromLabCode.Value + "," +
                " @ToLabCode = " + spToLabCode.Value;

            var query = db.Database.SqlQuery<PProc_Rep_Res_LabourFree_Result>(_Query).ToList();

            BindReport(Rep.reportName, query);
            return query;
        }
        public IEnumerable<PProc_Rep_GRP_LabourEvaluationByProject_Result> Proc_repLaborEvaluation()
        {
            ReportStandardParameters StandPar = getStandardParameters();

            SqlParameter spFromDate = null;
            SqlParameter spToDate = null;
            SqlParameter spLabClassID = null;
            SqlParameter spLabCatID = null;
            SqlParameter spFromLabCode = null;
            SqlParameter spToLabCode = null;
            SqlParameter spFromProjCode = null;
            SqlParameter spToProjCode = null;
            SqlParameter spBraCode = null;
            SqlParameter spEngID = null;
            int BraCode = 0;
            string stBraCode = Request["BraCode"].ToString();
            if (stBraCode == "")
            {
                spBraCode = new SqlParameter("@BraCode", System.Data.SqlTypes.SqlInt32.Null);
            }

            else
            {
                BraCode = Convert.ToInt32(stBraCode);
                spBraCode = new SqlParameter("@BraCode", BraCode);

            }

            string FromDate = null;
            string stFromDate = Request["FromDate"].ToString();
            if (stFromDate == "")
            {
                spFromDate = new SqlParameter("@FromDate", DBNull.Value);
            }

            else
            {
                FromDate = (stFromDate);
                spFromDate = new SqlParameter("@FromDate", FromDate);

            }
            string ToDate = null;
            string stToDate = Request["ToDate"].ToString();
            if (stToDate == "")
            {
                spToDate = new SqlParameter("@ToDate", DBNull.Value);
            }
            else
            {
                ToDate = (stToDate);
                spToDate = new SqlParameter("@ToDate", ToDate);
            }



            int LabClassID = 0;
            string stLabClassID = Request["LabClassID"].ToString();
            if (stLabClassID == "")
            {
                spLabClassID = new SqlParameter("@LabClassID", System.Data.SqlTypes.SqlInt32.Null);
            }

            else
            {
                LabClassID = Convert.ToInt32(stLabClassID);
                spLabClassID = new SqlParameter("@LabClassID", LabClassID);

            }

            int fromproj = 0;
            string stFromProj= Request["FromProjCode"].ToString();
            if (stFromProj == "")
            {
                spFromProjCode = new SqlParameter("@FromProj", System.Data.SqlTypes.SqlInt32.Null);
            }

            else
            {
                fromproj = Convert.ToInt32(stFromProj);
                spFromProjCode = new SqlParameter("@FromProj", fromproj);

            }
            int toproj = 0;
            string sttoProj = Request["ToProjCode"].ToString();
            if (sttoProj == "")
            {
                spToProjCode = new SqlParameter("@ToProj", System.Data.SqlTypes.SqlInt32.Null);
            }

            else
            {
                toproj = Convert.ToInt32(sttoProj);
                spToProjCode = new SqlParameter("@ToProj", toproj);

            }

            int LabCatID = 0;
            string stLabCatID = Request["LabCatID"].ToString();
            if (stLabCatID == "")
            {
                spLabCatID = new SqlParameter("@LabCatID", System.Data.SqlTypes.SqlInt32.Null);
            }
            else
            {
                LabCatID = Convert.ToInt32(stLabCatID);
                spLabCatID = new SqlParameter("@LabCatID", LabCatID);
            }




            string FromLabCode = "";
            string stFromLabCode = Request["FromLabCode"].ToString();
            if (stFromLabCode == "")
            {
                spFromLabCode = new SqlParameter("@FromLabCode" , DBNull.Value);
            }
            else
            {
                
                spFromLabCode = new SqlParameter("@FromLabCode", stFromLabCode);
            }




            string ToLabCode = "";
            string stToLabCode = Request["ToLabCode"].ToString();
            if (stToLabCode == "")
            {
                spToLabCode = new SqlParameter("@ToLabCode",  DBNull.Value);
            }
            else
            {
                
                spToLabCode = new SqlParameter("@ToLabCode", stToLabCode);
            }


            


            int EngID = 0;
            string stEngID = Request["EngID"].ToString();
            if (stEngID == "")
            {
                spEngID = new SqlParameter("@EngID" , System.Data.SqlTypes.SqlInt32.Null);
            }
            else
            {
                EngID = Convert.ToInt32(stEngID);
                spEngID = new SqlParameter("@EngID", EngID);
            }

            ReportInfo Rep = new ReportInfo();
            if (Request["TypeReport"].ToString() == "1")
            {
                 Rep = OpenReport("Proc_repLaborEvaluationByLabor");
            }
            else if (Request["TypeReport"].ToString() == "2")
            {
                Rep = OpenReport("Proc_repLaborEvaluationByProject");
            }
            else if (Request["TypeReport"].ToString() == "3")
            {
                Rep = OpenReport("Proc_repLaborEvaluationSum");
            }
            string _Query = @" execute " + Rep.dataSource +
                " @comp = '" + StandPar.spComCode.Value + "', " +
                " @CompNameA = '" + StandPar.spComNameA.Value + "'," +
                " @CompNameE = '" + StandPar.spComNameE.Value + "'," +
                " @BraNameA = '" + StandPar.spBraNameA.Value + "'," +
                " @BraNameE = '" + StandPar.braNameE.Value + "'," +
                " @LoginUser = '" + StandPar.spLoginUser.Value + "'," +
                " @braCode = " + spBraCode.Value + "," +
                " @FromDate = '" + spFromDate.Value + "'," +
                " @ToDate = '" + spToDate.Value + "'," +
                " @LabClassID = " + spLabClassID.Value + "," +
                " @LabCatID = " + spLabCatID.Value + "," +
                " @FromLabCode = '" + spFromLabCode.Value + "'," +
                " @ToLabCode = '" + spToLabCode.Value + "'," +
                " @FromProj = " + spFromProjCode.Value + "," +
                " @ToProj = " + spToProjCode.Value + "," +
                " @Engid = " + spEngID.Value;


            var query = db.Database.SqlQuery<PProc_Rep_GRP_LabourEvaluationByProject_Result>(_Query).ToList();

            BindReport(Rep.reportName, query);
            return query;
        }
        public IEnumerable<PProc_Rep_Res_LabourMovementByProject_Result> Proc_RepLabourMovementByProject()
        {
            ReportStandardParameters StandPar = getStandardParameters();

            SqlParameter spFromDate = null;
            SqlParameter spToDate = null;
            SqlParameter spLabClassID = null;
            SqlParameter spLabCatID = null;
            SqlParameter spFromLabCode = null;
            SqlParameter spToLabCode = null;
            SqlParameter spBraCode = null;
            SqlParameter spProjectID = null;
            SqlParameter spEngID = null;
            int BraCode = 0;
            string stBraCode = Request["BraCode"].ToString();
            if (stBraCode == "")
            {
                spBraCode = new SqlParameter("@BraCode", DBNull.Value);
            }

            else
            {
                BraCode = Convert.ToInt32(stBraCode);
                spBraCode = new SqlParameter("@BraCode", BraCode);

            }

            string FromDate = null;
            string stFromDate = Request["FromDate"].ToString();
            if (stFromDate == "")
            {
                spFromDate = new SqlParameter("@FromDate", DBNull.Value);
            }

            else
            {
                FromDate = (stFromDate);
                spFromDate = new SqlParameter("@FromDate", FromDate);

            }
            string ToDate = null;
            string stToDate = Request["ToDate"].ToString();
            if (stToDate == "")
            {
                spToDate = new SqlParameter("@ToDate", DBNull.Value);
            }
            else
            {
                ToDate = (stToDate);
                spToDate = new SqlParameter("@ToDate", ToDate);
            }



            int LabClassID = 0;
            string stLabClassID = Request["LabClassID"].ToString();
            if (stLabClassID == "")
            {
                spLabClassID = new SqlParameter("@LabClassID", "null");
            }

            else
            {
                LabClassID = Convert.ToInt32(stLabClassID);
                spLabClassID = new SqlParameter("@LabClassID", LabClassID);

            }




            int LabCatID = 0;
            string stLabCatID = Request["LabCatID"].ToString();
            if (stLabCatID == "")
            {
                spLabCatID = new SqlParameter("@LabCatID", "null");
            }
            else
            {
                LabCatID = Convert.ToInt32(stLabCatID);
                spLabCatID = new SqlParameter("@LabCatID", LabCatID);
            }




            int FromLabCode = 0;
            string stFromLabCode = Request["FromLabCode"].ToString();
            if (stFromLabCode == "")
            {
                spFromLabCode = new SqlParameter("@FromLabCode", "null");
            }
            else
            {
                FromLabCode = Convert.ToInt32(stFromLabCode);
                spFromLabCode = new SqlParameter("@FromLabCode", FromLabCode);
            }




            int ToLabCode = 0;
            string stToLabCode = Request["ToLabCode"].ToString();
            if (stToLabCode == "")
            {
                spToLabCode = new SqlParameter("@ToLabCode", "null");
            }
            else
            {
                ToLabCode = Convert.ToInt32(stToLabCode);
                spToLabCode = new SqlParameter("@ToLabCode", ToLabCode);
            }


            int ProjectID = 0;
            string stProjectID = Request["ProjectID"].ToString();
            if (stProjectID == "")
            {
                spProjectID = new SqlParameter("@ProjectID", "null");
            }
            else
            {
                ProjectID = Convert.ToInt32(stProjectID);
                spProjectID = new SqlParameter("@ProjectID", ProjectID);
            }

            int EngID = 0;
            string stEngID = Request["EngID"].ToString();
            if (stEngID == "")
            {
                spEngID = new SqlParameter("@EngID", "null");
            }
            else
            {
                EngID = Convert.ToInt32(stEngID);
                spEngID = new SqlParameter("@EngID", EngID);
            }

            ReportInfo Rep = OpenReport("Proc_RepLabourMovementByProject");

            string _Query = @" execute " + Rep.dataSource +
                " @comp = '" + StandPar.spComCode.Value + "', " +
                " @CompNameA = '" + StandPar.spComNameA.Value + "'," +
                " @CompNameE = '" + StandPar.spComNameE.Value + "'," +
                " @BraNameA = '" + StandPar.spBraNameA.Value + "'," +
                " @BraNameE = '" + StandPar.braNameE.Value + "'," +
                " @LoginUser = '" + StandPar.spLoginUser.Value + "'," +
                " @braCode = " + spBraCode.Value + "," +
                " @FromDate = '" + spFromDate.Value + "'," +
                " @ToDate = '" + spToDate.Value + "'," +
                " @LabClassID = " + spLabClassID.Value + "," +
                " @LabCatID = " + spLabCatID.Value + "," +
                " @FromLabCode = " + spFromLabCode.Value + "," +
                " @ToLabCode = " + spToLabCode.Value + "," +
                " @Engid = " + spEngID.Value + "," +
                " @ProjID = " + spProjectID.Value;


            var query = db.Database.SqlQuery<PProc_Rep_Res_LabourMovementByProject_Result>(_Query).ToList();

            BindReport(Rep.reportName, query);
            return query;
        }

        public IEnumerable<PProc_Rep_sls_ProjectItemStock_Result> Rep_ProjectItemsInventory()
        {
            ReportStandardParameters StandPar = getStandardParameters();


            SqlParameter spBraCode = null;
            SqlParameter spFromDate = null;
            SqlParameter spToDate = null;
            SqlParameter spProjectID = null;



            string stBarID = Request["braCode"].ToString();
            int branCode = Convert.ToInt32(stBarID);
            spBraCode = new SqlParameter("@BraCode", branCode);


            string FromDate = null;
            string stFromDate = Request["FromDate"].ToString();
            if (stFromDate == "")
            {
                spFromDate = new SqlParameter("@FromDate", DBNull.Value);
            }

            else
            {
                FromDate = (stFromDate);
                spFromDate = new SqlParameter("@FromDate", FromDate);

            }
            string ToDate = null;
            string stToDate = Request["ToDate"].ToString();
            if (stToDate == "")
            {
                spToDate = new SqlParameter("@ToDate", DBNull.Value);
            }
            else
            {
                ToDate = (stToDate);
                spToDate = new SqlParameter("@ToDate", ToDate);
            }



            int ProjectID = 0;
            string stProjectID = Request["ProjectID"].ToString();
            if (stProjectID == "")
            {
                spProjectID = new SqlParameter("@Prjid", DBNull.Value);
            }
            else
            {
                ProjectID = Convert.ToInt32(stProjectID);
                spProjectID = new SqlParameter("@Prjid", ProjectID);
            }






            ReportInfo Rep = OpenReport("Rep_ProjectItemsInventory");

            string _Query = @" execute " + Rep.dataSource +
                " @comp = '" + StandPar.spComCode.Value + "', " +
                " @CompNameA = '" + StandPar.spComNameA.Value + "'," +
                " @CompNameE = '" + StandPar.spComNameE.Value + "'," +
                " @BraNameA = '" + StandPar.spBraNameA.Value + "'," +
                " @BraNameE = '" + StandPar.braNameE.Value + "'," +
                " @LoginUser = '" + StandPar.spLoginUser.Value + "'," +
                " @BraCode = '" + spBraCode.Value + "'," +
                " @FromDate = '" + spFromDate.Value + "'," +
                " @ToDate = '" + spToDate.Value + "'," +
                " @Prjid = " + spProjectID.Value;


            var query = db.Database.SqlQuery<PProc_Rep_sls_ProjectItemStock_Result>(_Query).ToList();

            BindReport(Rep.reportName, query);
            return query;
        }


        #endregion

    }
}
