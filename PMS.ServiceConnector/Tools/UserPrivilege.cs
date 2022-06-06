using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace PMS.ServiceConnector.Tools
{
    public class UserPrivilege
    {
        public string MODULE_CODE { get; set; }
        public string MODULE_DESCE { get; set; }
        public string MODULE_DESCA { get; set; }
        public bool? Access { get; set; }
        public bool AddNew { get; set; }
        public bool Edit { get; set; }
        public bool VIEW { get; set; }
        public bool? Remove { get; set; }
        public bool PrintOut { get; set; }
        public bool CUSTOM1 { get; set; }
        public bool CUSTOM2 { get; set; }
        public bool CUSTOM3 { get; set; }
        public bool? CUSTOM4 { get; set; }
        public bool? CUSTOM5 { get; set; }
        public bool? CUSTOM6 { get; set; }
        public bool? CUSTOM7 { get; set; }
        public bool? CUSTOM8 { get; set; }
        public bool? CUSTOM9 { get; set; }
        public bool? ViewImages { get; set; }
        public bool? EditImages { get; set; }
    }

    //public struct Privileges
    //{
    //    public string MODULE_DESCE { get; set; }
    //    public string MODULE_DESCA { get; set; }
    //    public bool? Images_Enabled { get; set; }
    //    public bool Access;
    //    public string ModuleCode;
    //    public bool Custom9;
    //    public bool Custom8;
    //    public bool Custom7;
    //    public bool Custom6;
    //    public bool Custom5;
    //    public bool Custom4;
    //    public bool Custom3;
    //    public bool Custom2;
    //    public bool Custom1;
    //    public bool Preview;
    //    public bool PrintOut;
    //    public bool Remove;
    //    public bool Edit;
    //    public bool AddNew;
    //    public bool ViewImages;
    //    public bool EditImages;
    //}

}