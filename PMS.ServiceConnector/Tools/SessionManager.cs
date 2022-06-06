using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using PMS.ServiceConnector.Models;

namespace PMS.ServiceConnector.Tools
{
    public class SessionManager
    {
        public static G_USERS Me
        {
            set
            {
                HttpContext.Current.Session["Me"] = value;
            }
            get
            {
                return HttpContext.Current.Session["Me"] as G_USERS;
            }
        }
        public static int PageIndex
        {
            get
            {
                int result = HttpContext.Current.Session["PageIndex"] == null ? 0 :
                    (int)HttpContext.Current.Session["PageIndex"];
                return result;
            }
            set
            {
                HttpContext.Current.Session["PageIndex"] = value;
            }
        }
        public static int ModelCount
        {
            get
            {
                if (HttpContext.Current.Session["ModelCount"] == null)
                    return 0;
                else
                    return (int)HttpContext.Current.Session["ModelCount"];
            }
            set
            {
                HttpContext.Current.Session["ModelCount"] = value;
            }
        }
        public static SessionRecord SessionRecord
        {
            set
            {
                HttpContext.Current.Session["SessionRecord"] = value;
            }
            get
            {
                return HttpContext.Current.Session["SessionRecord"] as SessionRecord;
            }
        }
        public static List<G_USER_MODULE> MyModules
        {
            get
            {
                return HttpContext.Current.Session["MyModules"] as List<G_USER_MODULE>;
            }
            set
            {
                HttpContext.Current.Session["MyModules"] = value;
            }
        }
        public static List<G_MODULES> Modules
        {
            get { return HttpContext.Current.Session["Modules"] as List<G_MODULES>; }
            set { HttpContext.Current.Session["Modules"] = value; }
        }
        //public static G_USER_MODULE CurrentUserModule
        //{
        //    set { HttpContext.Current.Session["CurrentUserModule"] = value; }
        //    get { return HttpContext.Current.Session["CurrentUserModule"] as G_USER_MODULE; }
        //}

        public static UserPrivilege CurrentUserModule
        {
            set { HttpContext.Current.Session["CurrentUserModule"] = value; }
            get { return HttpContext.Current.Session["CurrentUserModule"] as UserPrivilege; }
        }


        public static G_MODULES CurrentModule
        {
            set { HttpContext.Current.Session["CurrentModule"] = value; }
            get { return HttpContext.Current.Session["CurrentModule"] as G_MODULES; }
        }
        public static P_Control P_Control
        {
            set { HttpContext.Current.Session["P_Control"] = value; }
            get { return HttpContext.Current.Session["P_Control"] as P_Control; }
        }
    }
}