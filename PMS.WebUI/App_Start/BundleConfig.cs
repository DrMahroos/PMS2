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
        }
    }
}


