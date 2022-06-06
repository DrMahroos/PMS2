using PMS.ServiceConnector.Tools;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;
using System.Web.Security;

namespace PMS.WebUI.Filter
{

    public class AuthorizeUserAttribute : AuthorizeAttribute
    {
       
        protected override bool AuthorizeCore(HttpContextBase httpContext)
        {
            var User= HttpContext.Current.Session["Me"];
            var SessionRecord = SessionManager.SessionRecord;
            if (User != null&& SessionRecord!=null)
            {
                return true;
            }
            else
            {
                return false;
            }

        }



        protected override void HandleUnauthorizedRequest(AuthorizationContext filterContext)
        {
            filterContext.Result = new RedirectToRouteResult(
                        new RouteValueDictionary(
                            new
                            {
                                controller = "Login",
                                action = "LoginIndex"
                            })
                        );
        }


    }
}