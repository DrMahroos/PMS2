using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;

namespace PMS.WebUI
{
    public class RouteConfig
    {
        public static void RegisterRoutes(RouteCollection routes)
        {
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");
            PMS.ServiceConnector.Models.DbEntities.ServiceUrl = System.Configuration.ConfigurationManager.AppSettings["ServiceUrl"];
            routes.MapRoute(
                name: "Default",
                url: "{controller}/{action}/{id}",
                defaults: new { controller = "Login", action = "LoginIndex", id = UrlParameter.Optional }
            );
        }
    }
}
