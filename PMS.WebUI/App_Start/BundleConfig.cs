using PMS.ServiceConnector.Tools;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Optimization;

namespace PMS.WebUI.App_Start
{
    public class BundleConfig
    {
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/Bundles/jquery")//----
                .Include("~/js/jquery3.3.1.min.js",
                         "~/js/my_js.js"
                         ));

            bundles.Add(new ScriptBundle("~/Bundles/ClientApp")//---
                .Include("~/ClientApp/AjaxCaller.js",
                        "~/ClientApp/SystemTools.js",
                        "~/ClientApp/Entities.js",
                        "~/ClientApp/CustomEntities.js",
                        "~/ClientApp/Shared.js",
                        "~/ClientApp/SharedPMS.js"
                ));

            bundles.Add(new ScriptBundle("~/Bundles/ClientAppWithJsGrid")//---Not Used till now
                .Include("~/Scripts/JsGrid/jsgrid.min.js",
                         "~/ClientApp/AjaxCaller.js",
                         "~/ClientApp/SystemTools.js",
                         "~/ClientApp/Entities.js",
                         "~/ClientApp/CustomEntities.js",
                         "~/ClientApp/Shared.js",
                         "~/ClientApp/JsGrid.js"
                ));

               bundles.Add(new ScriptBundle("~/Bundles/ClientApp2").Include(
                //"~/ClientApp/CustomEntities.js",
                "~/ClientApp/MessageBox.js"));

            bundles.Add(new ScriptBundle("~/Bundles/bootstrap").Include(
                "~/js/bootstrap.min.js",
                "~/js/effect.js",
                "~/js/waitMe.js"));

            bundles.Add(new ScriptBundle("~/Bundles/Partial").Include(
                "~/ClientApp/Partial/AppMenu.js",
                "~/ClientApp/Partial/ControlsButtons.js"));

            bundles.Add(new ScriptBundle("~/Bundles/StaticScript").Include(
                "~/Scripts/JsGrid/jsgrid.min.js",
                "~/ClientApp/AjaxCaller.js",
                "~/ClientApp/JsGrid.js",
                "~/ClientApp/SharedPMS.js",
                "~/ClientApp/App.js",
                "~/ClientApp/Entities.js",
                "~/ClientApp/CustomEntities.js",
                "~/ClientApp/Shared.js",
                "~/ClientApp/SystemTools.js",
                "~/ClientApp/MessageBox.js",
                "~/ClientApp/HomeComponent.js"
                ));

            bundles.Add(new StyleBundle("~/Bundles/css")//-------
                   .Include(/*"~/css/bootstrap.min.css",*/
                            "~/css/animation.css",
                            "~/css/hover.css",
                            "~/css/icon.css",
                            "~/css/jquery-ui.css",
                            "~/css/favourite.css",
                            "~/css/jqpagination.css",
                            //StyleNotFound
                            "~/css/font-awesome.min.css",
                            "~/css/magic.css",
                            "~/css/main.css",
                            "~/css/waitMe.css"
                   //"~/Scripts/IgGrid/infragistics.css",//"~/Scripts/IgGrid/theme.css",
                   ));


            bundles.Add(new StyleBundle("~/Bundles/AppStyle2")
               .Include(
                "~/css/select2.min.css",
                "~/Style_design/css/bootstrap.min.css",
                "~/Style_design/css/font-awesome.min.css",
                "~/Style_design/css/adminpro-custon-icon.css",
                "~/Style_design/css/meanmenu.min.css",
                "~/Style_design/css/jquery.mCustomScrollbar.min.css",
                "~/Style_design/css/animate.css",
                "~/Style_design/css/summernote.css",
                "~/Style_design/css/normalize.css",
                "~/Style_design/New_Style.css",
                "~/Style_design/Home_Style.css",
                "~/Style_design/textStyle.css",
                "~/Style_design/buttonStyle.css",
                "~/Style_design/responsive_AR.css",
                "~/Style_design/style.css",

                "~/Scripts/IgGrid/infragistics.css",
                "~/Scripts/jsgrid/jsgrid.min.css",
                "~/Scripts/jsgrid/jsgrid-theme.min.css",
                "~/Scripts/jsgrid/jsgrid-theme.css",
                "~/Content/DataTables/css/jquery.dataTables.min.css"));

            bundles.Add(new ScriptBundle("~/Bundles/AppScript2")
              .Include("~/Style_design/js/vendor/jquery-3.4.1.js",
                "~/Style_design/js/vendor/jquery-1.11.3.min.js",
                "~/js/my_js.js",
                "~/Style_design/js/bootstrap.min.js",
                "~/Style_design/js/jquery.meanmenu.js",
                "~/Style_design/js/jquery.mCustomScrollbar.concat.min.js",
                "~/Style_design/js/jquery.sticky.js",
                "~/Style_design/js/jquery.scrollUp.min.js",
                "~/Style_design/js/counterup/jquery.counterup.min.js",
                "~/Style_design/js/counterup/waypoints.min.js",
                "~/Style_design/js/dropzone.js",
                "~/Style_design/js/multiple-email/multiple-email-active.js",
                "~/Style_design/js/summernote.min.js",
                "~/Style_design/js/summernote-active.js"));

            bundles.Add(new ScriptBundle("~/Bundles/AppScript3")
              .Include("~/Style_design/js/vendor/modernizr-2.8.3.min.js",
                "~/ClientApp/Entities.js",
                "~/ClientApp/Shared.js",
                "~/ClientApp/App.js",
                "~/ClientApp/JsGrid.js",
                "~/Scripts/jsgrid/jsgrid.js",
                "~/ClientApp/SystemTools.js",
                "~/ClientApp/CustomEntities.js",
                "~/ClientApp/MessageBox.js",
                "~/ClientApp/HomeComponent.js"));


            bundles.Add(new ScriptBundle("~/Bundles/AppScript4")
             .Include("~/ClientApp/DataTable.js",
               "~/Scripts/DataTables/dataTables.bootstrap.js",
               "~/js/select2.min.js"));
            bundles.Add(new ScriptBundle("~/Bundles/AppScript3Admin")
             .Include("~/Style_design/js/vendor/modernizr-2.8.3.min.js",
               "~/ClientApp/Entities.js",
               "~/ClientApp/Shared.js",
               "~/ClientApp/App.js",
               "~/ClientApp/JsGrid.js",
               "~/Scripts/jsgrid/jsgrid.js",
               "~/ClientApp/SystemTools.js",
               "~/ClientApp/CustomEntities.js",
               "~/ClientApp/MessageBox.js"));

        }
    }
}


