var EntityContext = /** @class */ (function () {
    function EntityContext() {
    }
    return EntityContext;
}());
var FavModules = /** @class */ (function () {
    function FavModules() {
    }
    return FavModules;
}());
var SystemParameters = /** @class */ (function () {
    function SystemParameters() {
    }
    return SystemParameters;
}());
var SessionRecord = /** @class */ (function () {
    function SessionRecord() {
    }
    SessionRecord.prototype.SetClientSession = function (key, value) {
        $.ajax({
            url: Url.Action("SetSessionRecordValue", "Session"),
            data: { propertyName: key, value: value },
            async: false
        });
        //let data: string = value;
        //sessionStorage.setItem(key, value);
    };
    SessionRecord.prototype.GetClientSession = function (key) {
        var value = $.ajax({
            url: Url.Action("GetSessionRecordValue", "Session"),
            data: { propertyName: key },
            async: false
        }).responseJSON.result;
        //value = sessionStorage.getItem(key);
        return value;
    };
    Object.defineProperty(SessionRecord.prototype, "SystemCode", {
        get: function () {
            return this.GetClientSession("SystemCode");
        },
        set: function (value) {
            this.SetClientSession("SystemCode", value);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SessionRecord.prototype, "SubSystemCode", {
        get: function () {
            return this.GetClientSession("SubSystemCode");
        },
        set: function (value) {
            this.SetClientSession("SubSystemCode", value);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SessionRecord.prototype, "Modulecode", {
        get: function () {
            return this.GetClientSession("Modulecode");
        },
        set: function (value) {
            this.SetClientSession("Modulecode", value);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SessionRecord.prototype, "UserCode", {
        get: function () {
            return this.GetClientSession("UserCode");
        },
        set: function (value) {
            this.SetClientSession("UserCode", value);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SessionRecord.prototype, "CompCode", {
        get: function () {
            return this.GetClientSession("CompCode");
        },
        set: function (value) {
            this.SetClientSession("CompCode", value);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SessionRecord.prototype, "BranchCode", {
        get: function () {
            return this.GetClientSession("BranchCode");
        },
        set: function (value) {
            this.SetClientSession("BranchCode", value);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SessionRecord.prototype, "Language", {
        get: function () {
            return this.GetClientSession("Language");
        },
        set: function (value) {
            this.SetClientSession("Language", value);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SessionRecord.prototype, "CurrentYear", {
        get: function () {
            return this.GetClientSession("CurrentYear");
        },
        set: function (value) {
            this.SetClientSession("CurrentYear", value);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SessionRecord.prototype, "CompanyName", {
        get: function () {
            return this.GetClientSession("CompanyName");
        },
        set: function (value) {
            this.SetClientSession("CompanyName", value);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SessionRecord.prototype, "CompanyNameAr", {
        get: function () {
            return this.GetClientSession("CompanyNameAr");
        },
        set: function (value) {
            this.SetClientSession("CompanyNameAr", value);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SessionRecord.prototype, "BranchName", {
        get: function () {
            return this.GetClientSession("BranchName");
        },
        set: function (value) {
            this.SetClientSession("BranchName", value);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SessionRecord.prototype, "ScreenLanguage", {
        get: function () {
            return this.GetClientSession("ScreenLanguage");
        },
        set: function (value) {
            this.SetClientSession("ScreenLanguage", value);
        },
        enumerable: false,
        configurable: true
    });
    return SessionRecord;
}());
var Privileges = /** @class */ (function () {
    function Privileges() {
    }
    return Privileges;
}());
var ResponseResult = /** @class */ (function () {
    function ResponseResult() {
    }
    return ResponseResult;
}());
var A_ACCOUNT = /** @class */ (function () {
    function A_ACCOUNT() {
        this.ACC_CODE = "";
        this.ACC_DESCA = "";
        this.ACC_DESCL = "";
        this.COMP_CODE = 0;
    }
    return A_ACCOUNT;
}());
var ReportParameters = /** @class */ (function () {
    function ReportParameters() {
    }
    return ReportParameters;
}());
var HIJRA_CONVERT = /** @class */ (function () {
    function HIJRA_CONVERT() {
        this.HYEAR = 0;
        this.START_DATE = "";
        this.MONTHSTMAP = "";
    }
    return HIJRA_CONVERT;
}());
var CodeDesciptionModel = /** @class */ (function () {
    function CodeDesciptionModel() {
    }
    return CodeDesciptionModel;
}());
var GQ_GetUserBranch = /** @class */ (function () {
    function GQ_GetUserBranch() {
        this.USER_CODE = "";
        this.COMP_CODE = 0;
        this.BRA_CODE = 0;
        this.BRA_DESCL = "";
        this.BRA_DESCE = "";
        this.BRA_DESC = "";
        this.EXECUTE = false;
        this.CREATE = false;
        this.EDIT = false;
        this.DELETE = false;
        this.PRINT = false;
        this.VIEW = false;
    }
    return GQ_GetUserBranch;
}());
var UserPrivilege = /** @class */ (function () {
    function UserPrivilege() {
    }
    return UserPrivilege;
}());
var SystemEnvironment = /** @class */ (function () {
    function SystemEnvironment() {
    }
    return SystemEnvironment;
}());
var SelectItem = /** @class */ (function () {
    function SelectItem() {
        this.Value = null;
        this.Text = null;
    }
    return SelectItem;
}());
var SessionManager = /** @class */ (function () {
    function SessionManager() {
    }
    return SessionManager;
}());
var BaseResponse = /** @class */ (function () {
    function BaseResponse() {
    }
    return BaseResponse;
}());
//Start General Modules
var G_BRANCH = /** @class */ (function () {
    function G_BRANCH() {
        this.COMP_CODE = 0;
        this.BRA_CODE = 0;
        this.BRA_DESC = "";
        this.BRA_TYPE = 0;
        this.BRA_DESCL = "";
        this.BRA_SHORTA = "";
        this.BRA_SHORTL = "";
        this.REGION_CODE = "";
        this.City = "";
        this.Address = "";
        this.Tel = "";
        this.Fax = "";
        this.Email = "";
        this.WebSite = "";
        this.BranchManager = "";
        this.HRResponsible = "";
        this.FinanceResponsible = "";
        this.SalesManager = "";
        this.CUSTOM1 = "";
        this.CUSTOM2 = "";
        this.CUSTOM3 = "";
        this.CUSTOM4 = "";
        this.CUSTOM5 = "";
        this.CUSTOMFLAG1 = false;
        this.CUSTOMFLAG2 = false;
        this.CUSTOMNUM1 = 0;
        this.CUSTOMNUM2 = 0;
        this.CUSTOMDATE = "";
        this.BRA_DESCE = "";
        this.Address_postal = "";
        this.Address_Province = "";
        this.Address_Street = "";
        this.Address_Str_Additional = "";
        this.Address_BuildingNo = "";
        this.Address_Build_Additional = "";
        this.Address_City = "";
        this.Address_District = "";
        this.VatNo = "";
    }
    return G_BRANCH;
}());
var G_BRANCH_TYPE = /** @class */ (function () {
    function G_BRANCH_TYPE() {
        this.BRA_TYPE = 0;
        this.DESCA = "";
        this.DESCE = "";
    }
    return G_BRANCH_TYPE;
}());
var G_COST_CENTER = /** @class */ (function () {
    function G_COST_CENTER() {
        this.COMP_CODE = 0;
        this.CC_CODE = "";
        this.CC_DESC = "";
        this.CC_PARENT = "";
        this.CC_LEVEL = 0;
        this.CC_LOCATION = "";
        this.CC_TARGET = 0;
        this.ACTIVE = false;
        this.PAYROLL_UPDATE = false;
        this.LEAF = false;
        this.CC_DESCE = "";
    }
    return G_COST_CENTER;
}());
var G_COMPANY = /** @class */ (function () {
    function G_COMPANY() {
        this.COMP_CODE = 0;
        this.MOI_ID;
        this.CRT_NO;
        this.City = "";
        this.Address = "";
        this.Tel = "";
        this.Fax = "";
        this.Email = "";
        this.WebSite = "";
        this.GMName = "";
        this.HRResponsible = "";
        this.FinanceResponsible = "";
        this.SalesManager = "";
        this.CUSTOM1 = "";
        this.CUSTOM2 = "";
        this.CUSTOM3 = "";
        this.CUSTOM4 = "";
        this.CUSTOM5 = "";
        this.CUSTOMFLAG1 = false;
        this.CUSTOMFLAG2 = false;
        this.CUSTOMNUM1 = 0;
        this.CUSTOMNUM2 = 0;
        this.CUSTOMDATE = "";
    }
    return G_COMPANY;
}());
var G_CUSTOM_REPORT = /** @class */ (function () {
    function G_CUSTOM_REPORT() {
        this.ID = 0;
        this.COMP_CODE = 0;
        this.SYSTEM_CODE = "";
        this.USER_CODE = "";
        this.REP_CODE = "";
        this.REP_CUSTOM_NAME = "";
    }
    return G_CUSTOM_REPORT;
}());
var G_MODULES = /** @class */ (function () {
    function G_MODULES() {
        this.SYSTEM_CODE = "";
        this.SUB_SYSTEM_CODE = "";
        this.MODULE_CODE = "";
        this.MENU_NO = "";
        this.MENU_NAME = "";
        this.MODULE_DESCE = "";
        this.MODULE_DESCA = "";
        this.CREATE = false;
        this.EDIT = false;
        this.DELETE = false;
        this.PRINT = false;
        this.VIEW = false;
        this.CUSTOM1 = false;
        this.CUSTOM2 = false;
        this.CUSTOM3 = false;
        this.CUSTOM1_DESC = "";
        this.CUSTOM2_DESC = "";
        this.CUSTOM3_DESC = "";
        this.CUSTOM4 = false;
        this.CUSTOM5 = false;
        this.CUSTOM6 = false;
        this.CUSTOM4_DESC = "";
        this.CUSTOM5_DESC = "";
        this.CUSTOM6_DESC = "";
        this.CUSTOM7 = false;
        this.CUSTOM8 = false;
        this.CUSTOM9 = false;
        this.CUSTOM7_DESC = "";
        this.CUSTOM8_DESC = "";
        this.CUSTOM9_DESC = "";
        this.AVAILABLE = false;
        this.MODULE_TYPE;
        this.Images_Enabled = false;
    }
    return G_MODULES;
}());
var G_CONTROL = /** @class */ (function () {
    function G_CONTROL() {
        this.COMP_CODE = 0;
        this.FIN_YEAR = 0;
        this.GEN_STATUS = 0;
        this.ACC_STATUS = 0;
        this.INV_STATUS = 0;
        this.PER_STATUS = 0;
        this.CLN_STATUS = 0;
        this.PRJ_STATUS = 0;
        this.CLOSE_ACC_PERIOD = false;
        this.BACKUP_DB = "";
        this.BACKUP_COPIES = 0;
        this.SERVER_PATH = "";
        this.SYS_CLOSED = false;
        this.ACC_FINAL_CLOSED = false;
        this.FIRST_DATE = "";
        this.LAST_DATE = "";
    }
    return G_CONTROL;
}());
var G_MODULES_Orginal = /** @class */ (function () {
    function G_MODULES_Orginal() {
        this.SYSTEM_CODE = "";
        this.SUB_SYSTEM_CODE = "";
        this.MODULE_CODE = "";
        this.MENU_NO = "";
        this.MENU_NAME = "";
        this.MODULE_DESCE = "";
        this.MODULE_DESCA = "";
        this.CREATE = false;
        this.EDIT = false;
        this.DELETE = false;
        this.PRINT = false;
        this.VIEW = false;
        this.CUSTOM1 = false;
        this.CUSTOM2 = false;
        this.CUSTOM3 = false;
        this.CUSTOM1_DESC = "";
        this.CUSTOM2_DESC = "";
        this.CUSTOM3_DESC = "";
        this.CUSTOM4 = false;
        this.CUSTOM5 = false;
        this.CUSTOM6 = false;
        this.CUSTOM4_DESC = "";
        this.CUSTOM5_DESC = "";
        this.CUSTOM6_DESC = "";
        this.CUSTOM7 = false;
        this.CUSTOM8 = false;
        this.CUSTOM9 = false;
        this.CUSTOM7_DESC = "";
        this.CUSTOM8_DESC = "";
        this.CUSTOM9_DESC = "";
        this.AVAILABLE = false;
        this.MODULE_TYPE;
        this.Images_Enabled = false;
    }
    return G_MODULES_Orginal;
}());
var G_Nationality = /** @class */ (function () {
    function G_Nationality() {
        this.NationalityID = 0;
        this.COMP_CODE = 0;
        this.NationalityCode = "";
        this.DescA = "";
        this.DescL = "";
        this.Remarks = "";
    }
    return G_Nationality;
}());
var G_REGION = /** @class */ (function () {
    function G_REGION() {
        this.COMP_CODE = 0;
        this.REGION_CODE = "";
        this.DESCA = "";
        this.DESCL = "";
        this.City = "";
        this.Address = "";
        this.Tel = "";
        this.Fax = "";
        this.Email = "";
        this.WebSite = "";
        this.RegionManager = "";
        this.HRResponsible = "";
        this.FinanceResponsible = "";
        this.SalesManager = "";
        this.CUSTOM1 = "";
        this.CUSTOM2 = "";
        this.CUSTOM3 = "";
        this.CUSTOM4 = "";
        this.CUSTOM5 = "";
        this.CUSTOMFLAG1 = false;
        this.CUSTOMFLAG2 = false;
        this.CUSTOMNUM1 = 0;
        this.CUSTOMNUM2 = 0;
        this.CUSTOMDATE = "";
    }
    return G_REGION;
}());
var G_REGION_BRANCH = /** @class */ (function () {
    function G_REGION_BRANCH() {
        this.COMP_CODE = 0;
        this.RGN_CODE = 0;
        this.BRA_CODE = 0;
    }
    return G_REGION_BRANCH;
}());
var G_REPORTS_COLUMN = /** @class */ (function () {
    function G_REPORTS_COLUMN() {
        this.COMP_CODE = 0;
        this.REP_NO = 0;
        this.COL_SERIAL = 0;
        this.COL_CHAR = "";
        this.COL_GRAPH = false;
        this.COL_HEADERA = "";
        this.COL_HEADERE = "";
        this.COL_YEAR = "";
        this.COL_PERIOD = "";
        this.COL_WIDTH = 0;
        this.COL_FONT = "";
        this.COL_FONT_SIZE = 0;
        this.COL_FONT_STYLE = 0;
        this.COL_BKCOLOR;
        this.COL_FCOLOR;
        this.COL_BYDEF = false;
        this.COL_COMP = 0;
        this.COL_CC_CODE = "";
        this.COL_CODE = "";
        this.DESCA = "";
        this.COL_TYPE = "";
        this.COL_SCALE = 0;
        this.COL_OPERATOR = "";
        this.COL_RESTRICT = "";
        this.COL_GROUPING = "";
        this.COL_SORT = "";
    }
    return G_REPORTS_COLUMN;
}());
var G_REPORTS_FIELDS = /** @class */ (function () {
    function G_REPORTS_FIELDS() {
        this.SYSTEM_CODE = "";
        this.TABLE_NAME = "";
        this.FIELD_NAME = "";
        this.FIELD_DESCA = "";
        this.FIELD_DESCE = "";
        this.FIELD_TYPE;
        this.FIELD_WIDTH = 0;
    }
    return G_REPORTS_FIELDS;
}());
var G_REPORTS_GROUP = /** @class */ (function () {
    function G_REPORTS_GROUP() {
        this.COMP_CODE = 0;
        this.GROUP_NO = "";
        this.SYSTEM_CODE = "";
        this.GROUP_DESCA = "";
        this.GROUP_DESCL = "";
        this.GROUP_PARENT = "";
    }
    return G_REPORTS_GROUP;
}());
var G_REPORTS_HEADER = /** @class */ (function () {
    function G_REPORTS_HEADER() {
        this.COMP_CODE = 0;
        this.REP_NO = 0;
        this.SYSTEM_CODE = "";
        this.GROUP_NO = "";
        this.DESCA = "";
        this.DESCL = "";
        this.TITEL1A = "";
        this.TITEL2A = "";
        this.TITEL1E = "";
        this.TITEL2E = "";
        this.NOOFCOLUMNS = 0;
        this.PRINTDIRECTION = 0;
        this.FRACT = false;
        this.LINE_TITELA = "";
        this.LINE_TITELE = "";
        this.COMP_TYPE = 0;
        this.MARG_TOP = 0;
        this.HD_FONT = "";
        this.HD_FONT_SIZE = 0;
        this.HD_FONT_STYLE = 0;
        this.HD_BKCOLOR;
        this.RP_FONT = "";
        this.RP_FONT_SIZE = 0;
        this.RP_FONT_STYLE = 0;
        this.RP_FCOLOR;
        this.COL_FONT = "";
        this.COL_FONT_SIZE = 0;
        this.COL_FONT_STYLE = 0;
        this.COL_BKCOLOR;
        this.COL_FCOLOR;
        this.COL_LINES_NO = 0;
        this.ROW_FONT = "";
        this.ROW_FONT_SIZE = 0;
        this.ROW_FONT_STYLE = 0;
        this.ROW_BKCOLOR;
        this.ROW_FCOLOR;
        this.CREATED_BY = "";
        this.CREATED_AT = "";
        this.UPDATED_BY = "";
        this.UPDATED_AT = "";
        this.REMARKS = "";
        this.FIT_PAGE = false;
        this.WRAP_LINES = false;
        this.NAMES_WIDTH = 0;
        this.GRID_WIDTH = 0;
    }
    return G_REPORTS_HEADER;
}());
var G_ReportSetting = /** @class */ (function () {
    function G_ReportSetting() {
        this.ReportSettingID = 0;
        this.SystemCode = "";
        this.SubSystemCode = "";
        this.ReportID = "";
        this.NameA = "";
        this.NameE = "";
        this.IsDllReport = false;
        this.TableName = "";
        this.DescA = "";
        this.DescE = "";
        this.RightMargin = 0;
        this.LeftMargin = 0;
        this.TopMargin = 0;
        this.BottomMargin = 0;
        this.Orientation = 0;
        this.PageSize = 0;
        this.PrinterName = "";
    }
    return G_ReportSetting;
}());
var G_ReportSettingModule = /** @class */ (function () {
    function G_ReportSettingModule() {
        this.RepModSettingID = 0;
        this.COMP_CODE = 0;
        this.USER_CODE = "";
        this.SYSTEM_CODE = "";
        this.SUB_SYSTEM_CODE = "";
        this.MODULE_CODE = "";
        this.SER = 0;
        this.SETTING_DESC = "";
        this.CONTROL_VALUES;
    }
    return G_ReportSettingModule;
}());
var G_SearchForm = /** @class */ (function () {
    function G_SearchForm() {
        this.SearchFormCode = "";
        this.ReturnDataPropertyName = "";
        this.Description = "";
        this.SerachFormTitle = "";
        this.IsFullScreen = false;
        this.Left = 0;
        this.Top = 0;
        this.Height = 0;
        this.Width = 0;
        this.PageSize = 0;
        this.DataSourceName = "";
        this.SearchInterval = 0;
        this.SerachFormTitleA = "";
    }
    return G_SearchForm;
}());
var G_SearchFormModule = /** @class */ (function () {
    function G_SearchFormModule() {
        this.SystemCode = "";
        this.SubSystemCode = "";
        this.ModuleCode = "";
        this.ControlCode = "";
        this.SearchFormCode = "";
    }
    return G_SearchFormModule;
}());
var G_SearchFormSetting = /** @class */ (function () {
    function G_SearchFormSetting() {
        this.SearchFormSettingID = 0;
        this.SearchFormCode = "";
        this.FieldSequence = 0;
        this.DataMember = "";
        this.AlternateDataMember = "";
        this.FieldTitle = "";
        this.IsReadOnly = false;
        this.Datatype = 0;
        this.FieldWidth = 0;
        this.UseSelectionOperator = false;
        this.Language = 0;
        this.FieldTitleA = "";
    }
    return G_SearchFormSetting;
}());
var G_SMSControl = /** @class */ (function () {
    function G_SMSControl() {
        this.SMSControlId = 0;
        this.ViewName = "";
        this.IDField = "";
        this.Condition = "";
        this.SMSID = 0;
        this.SendToField = "";
    }
    return G_SMSControl;
}());
var G_SMSLog = /** @class */ (function () {
    function G_SMSLog() {
        this.SMSLogID = 0;
        this.SMSControlId = 0;
        this.ViewName = "";
        this.IDField = "";
        this.SMSID = 0;
        this.SendAt = "";
        this.Status = "";
    }
    return G_SMSLog;
}());
var G_SMSSMG = /** @class */ (function () {
    function G_SMSSMG() {
        this.SMSID = 0;
        this.ViewName = "";
        this.MsgField = "";
    }
    return G_SMSSMG;
}());
var G_STANDARD = /** @class */ (function () {
    function G_STANDARD() {
        this.BACKUP_PATH = "";
        this.BACKUP_DB = "";
        this.BACKUP_COPIES = 0;
    }
    return G_STANDARD;
}());
var G_STORE_TARGET = /** @class */ (function () {
    function G_STORE_TARGET() {
        this.COMP_CODE = 0;
        this.BRA_CODE = 0;
        this.STORE_CODE = 0;
        this.MONTH_NO = 0;
        this.SLS_TARGET = 0;
    }
    return G_STORE_TARGET;
}());
var G_STORE_TYPE = /** @class */ (function () {
    function G_STORE_TYPE() {
        this.COMP_CODE = 0;
        this.TYPE_CODE = 0;
        this.DESCA = "";
        this.DESCL = "";
    }
    return G_STORE_TYPE;
}());
var G_SUB_SYSTEMS = /** @class */ (function () {
    function G_SUB_SYSTEMS() {
        this.SYSTEM_CODE = "";
        this.SUB_SYSTEM_CODE = "";
        this.SUB_SYSTEM_DESCA = "";
        this.SUB_SYSTEM_DESCE = "";
        this.ICON_PATH = "";
        this.APPNAME = "";
        this.APPVERSION = "";
    }
    return G_SUB_SYSTEMS;
}());
var G_SYSTEM = /** @class */ (function () {
    function G_SYSTEM() {
        this.SYSTEM_CODE = "";
        this.SYSTEM_DESCE = "";
        this.SYSTEM_DESCA = "";
        this.DB_NAME = "";
        this.ICON_PATH = "";
        this.INIT_ORDER = 0;
        this.VER_PATH = "";
    }
    return G_SYSTEM;
}());
var G_SYSTEM_QUERY = /** @class */ (function () {
    function G_SYSTEM_QUERY() {
        this.SYSTEM_CODE = "";
        this.QUERY_NAME = "";
        this.ALIASE = "";
        this.DESCRIPTION = "";
        this.QRY_TYPE = "";
    }
    return G_SYSTEM_QUERY;
}());
var G_SYSTEM_TABLES = /** @class */ (function () {
    function G_SYSTEM_TABLES() {
        this.SYSTEM_CODE;
        this.TABLE_NAME = "";
        this.TABLE_ALIASE;
        this.TABLE_DESCRIPTION = "";
        this.TABLE_INDEXES = "";
        this.TABLE_TYPE;
        this.TABLE_ORDER = 0;
    }
    return G_SYSTEM_TABLES;
}());
var G_TRANS_TEMP_LINK = /** @class */ (function () {
    function G_TRANS_TEMP_LINK() {
        this.HEADER_ROW_ID = "";
        this.GUIDStamp = "";
        this.COMP_CODE = 0;
        this.SERIAL = 0;
        this.ACC_CODE = "";
        this.DEBIT = 0;
        this.DEBIT_FC = 0;
        this.CREDIT = 0;
        this.CREDIT_FC = 0;
        this.CC_CODE = "";
        this.DET_CC_CODE = "";
        this.LINE_DESCA = "";
        this.LINE_DESCE = "";
        this.VOUCHER_TYPE = 0;
        this.VOUCHER_LINE_DESCA_STRING_FORMAT = "";
        this.VOUCHER_LINE_DESCE_STRING_FORMAT = "";
    }
    return G_TRANS_TEMP_LINK;
}());
var G_TRANS_TEMP2 = /** @class */ (function () {
    function G_TRANS_TEMP2() {
        this.ROW_ID = "";
        this.GUIDStamp = "";
        this.COMP_CODE = 0;
        this.BRA_CODE = 0;
        this.SYSTEM_CODE = "";
        this.SUB_SYSTEM_CODE = "";
        this.TR_CODE = "";
        this.VOUCHER_CODE = 0;
        this.VOUCHER_TYPE = 0;
        this.VOUCHER_SUB_TYPE = 0;
        this.VOUCHER_SOURCE_TYPE = "";
        this.TR_NO = 0;
        this.TR_TYPE = "";
        this.TR_DATE = "";
        this.TR_AMOUNT = 0;
        this.TR_DESCA = "";
        this.TR_DESCE = "";
        this.TR_USER_CODE = "";
        this.TR_ADDITIONAL1 = "";
        this.TR_ADDITIONAL2 = "";
        this.FN_VOUCHER_CODE = "";
        this.FN_VOUCHER_TYPE = "";
        this.BASE_TABLE_NAME = "";
        this.IS_SUMMARY_VOUCHER = false;
        this.VOUCHER_DESCA_STRING_FORMAT = "";
        this.VOUCHER_DESCE_STRING_FORMAT = "";
        this.IsSelected = false;
        this.TR_AMOUNT_FC = 0;
        this.ROW_DATE = "";
        this.FromDate = "";
        this.ToDate = "";
        this.FromTrNo = 0;
        this.ToTrNo = 0;
    }
    return G_TRANS_TEMP2;
}());
var G_TRANS_TEMP3 = /** @class */ (function () {
    function G_TRANS_TEMP3() {
        this.ROW_ID = "";
        this.GUIDStamp = "";
        this.COMP_CODE = 0;
        this.BRA_CODE = 0;
        this.SYSTEM_CODE = "";
        this.SUB_SYSTEM_CODE = "";
        this.TR_CODE = "";
        this.VOUCHER_CODE = 0;
        this.VOUCHER_TYPE = 0;
        this.VOUCHER_SUB_TYPE = 0;
        this.VOUCHER_SOURCE_TYPE = "";
        this.TR_NO = 0;
        this.TR_TYPE = "";
        this.TR_DATE = "";
        this.TR_AMOUNT = 0;
        this.TR_DESCA = "";
        this.TR_DESCE = "";
        this.TR_USER_CODE = "";
        this.TR_ADDITIONAL1 = "";
        this.TR_ADDITIONAL2 = "";
        this.FN_VOUCHER_CODE = "";
        this.FN_VOUCHER_TYPE = "";
        this.BASE_TABLE_NAME = "";
        this.IS_SUMMARY_VOUCHER = false;
        this.VOUCHER_DESCA_STRING_FORMAT = "";
        this.VOUCHER_DESCE_STRING_FORMAT = "";
        this.IsSelected = false;
        this.TR_AMOUNT_FC = 0;
        this.ROW_DATE = "";
        this.FromDate = "";
        this.ToDate = "";
        this.FromTrNo = 0;
        this.ToTrNo = 0;
    }
    return G_TRANS_TEMP3;
}());
var G_USER_BRANCH = /** @class */ (function () {
    function G_USER_BRANCH() {
        this.USER_CODE = "";
        this.COMP_CODE = 0;
        this.BRA_CODE = 0;
        this.EXECUTE = false;
        this.CREATE = false;
        this.EDIT = false;
        this.DELETE = false;
        this.PRINT = false;
        this.VIEW = false;
    }
    return G_USER_BRANCH;
}());
var G_USER_COMPANY = /** @class */ (function () {
    function G_USER_COMPANY() {
        this.USER_CODE = "";
        this.COMP_CODE = 0;
        this.EXECUTE = false;
        this.CREATE = false;
        this.EDIT = false;
        this.DELETE = false;
        this.PRINT = false;
        this.VIEW = false;
    }
    return G_USER_COMPANY;
}());
var G_USER_FAVORITE = /** @class */ (function () {
    function G_USER_FAVORITE() {
        this.ID = 0;
        this.USER_CODE = "";
        this.OPTIONORDER = 0;
        this.SYSTEM_CODE = "";
        this.SUB_SYSTEM_CODE = "";
        this.MODULE_CODE = "";
    }
    return G_USER_FAVORITE;
}());
var G_USER_LOG = /** @class */ (function () {
    function G_USER_LOG() {
        this.USER_CODE = "";
        this.SYSTEM_CODE;
        this.SYSTEM_YEAR = 0;
        this.MODULE_CODE = "";
        this.COMP_CODE = 0;
        this.LOG_DATE = "";
    }
    return G_USER_LOG;
}());
var G_USER_LOG_OLD = /** @class */ (function () {
    function G_USER_LOG_OLD() {
        this.USER_CODE = "";
        this.SYSTEM_CODE = "";
        this.SYSTEM_YEAR = 0;
        this.MODULE_CODE = "";
        this.COMP_CODE = 0;
        this.LOG_DATE = "";
    }
    return G_USER_LOG_OLD;
}());
var G_USER_MODULE = /** @class */ (function () {
    function G_USER_MODULE() {
        this.USER_CODE = "";
        this.SYSTEM_CODE = "";
        this.SUB_SYSTEM_CODE = "";
        this.MODULE_CODE = "";
        this.EXECUTE = false;
        this.CREATE = false;
        this.EDIT = false;
        this.DELETE = false;
        this.PRINT = false;
        this.VIEW = false;
        this.CUSTOM1 = false;
        this.CUSTOM2 = false;
        this.CUSTOM3 = false;
        this.CUSTOM4 = false;
        this.CUSTOM5 = false;
        this.CUSTOM6 = false;
        this.CUSTOM7 = false;
        this.CUSTOM8 = false;
        this.CUSTOM9 = false;
        this.ViewImages = false;
        this.EditImages = false;
    }
    return G_USER_MODULE;
}());
var G_USER_SUB_SYSTEM = /** @class */ (function () {
    function G_USER_SUB_SYSTEM() {
        this.USER_CODE = "";
        this.SYSTEM_CODE = "";
        this.SUB_SYSTEM_CODE = "";
        this.EXECUTE = false;
        this.FILTER_STRING = "";
    }
    return G_USER_SUB_SYSTEM;
}());
var G_USER_SYSTEM = /** @class */ (function () {
    function G_USER_SYSTEM() {
        this.USER_CODE = "";
        this.SYSTEM_CODE = "";
        this.EXECUTE = false;
        this.FILTER_STRING = "";
    }
    return G_USER_SYSTEM;
}());
var G_USERS = /** @class */ (function () {
    function G_USERS() {
        this.USER_CODE = "";
        this.USER_PASSWORD = "";
        this.USER_ACTIVE = false;
        this.USER_NAME = "";
        this.CompCode = 0;
        this.REGION_CODE = "";
        this.GRP_CODE = 0;
        this.USER_PASSWORD2 = "";
        this.USER_PASSWORD3 = "";
        this.CHANGE_PASS_DATE = "";
        this.MANUAL_VC = "";
        this.MASTER_USER_CODE = "";
        this.City = "";
        this.Address = "";
        this.Tel = "";
        this.Fax = "";
        this.Mobile = "";
        this.Email = "";
        this.DepartmentName = "";
        this.JobTitle = "";
        this.USER_TYPE = 0;
        this.ManagedBy = "";
        this.LoginUrl = false;
    }
    return G_USERS;
}());
var G_ModuleHelp = /** @class */ (function () {
    function G_ModuleHelp() {
        this.SYSTEM_CODE = "";
        this.SUB_SYSTEM_CODE = "";
        this.MODULE_CODE = "";
        this.HelpBody_Ar = "";
        this.HelpBody_En = "";
    }
    return G_ModuleHelp;
}());
//End General Modules
//Start I
var I_D_Category = /** @class */ (function () {
    function I_D_Category() {
        this.CatID = 0;
        this.CompCode = 0;
        this.CatCode = "";
        this.DescA = "";
        this.DescL = "";
        this.ParentCatId = 0;
        this.CatLevel = 0;
        this.IsDetail = false;
        this.UnitGrpID = 0;
        this.IsAutoGenerateItem = false;
        this.ItemFormatFix = "";
        this.ItemFormatSerial = "";
        this.ItemTypeID = 0;
        this.CostMethodID = 0;
        this.StockMethodID = 0;
        this.IssueFromCenteralStore = false;
        this.CenteralStoreCode = 0;
        this.IsAdditionalSpecs = false;
        this.AdditionalspcsDescA = "";
        this.AdditionalspcsDescL = "";
        this.ISSales = false;
        this.IsStock = false;
        this.IsProduct = false;
        this.IsIssuetoCC = false;
        this.IsIssueToProd = false;
        this.IsPurchase = false;
        this.Remarks = "";
        this.CreatedAt = "";
        this.CreatedBy = "";
        this.UpdatedAt = "";
        this.UpdatedBy = "";
    }
    return I_D_Category;
}());
var I_D_Specification = /** @class */ (function () {
    function I_D_Specification() {
        this.SpecsID = 0;
        this.SpecsCode = "";
        this.DescA = "";
        this.DescE = "";
        this.CompCode = 0;
        this.Remarks = "";
        this.CreatedAt = "";
        this.CreatedBy = "";
        this.UpdatedAt = "";
        this.UpdatedBy = "";
    }
    return I_D_Specification;
}());
var I_D_SpecificationValues = /** @class */ (function () {
    function I_D_SpecificationValues() {
        this.SpecsValueID = 0;
        this.SpecsID = 0;
        this.SpecsValueCode = "";
        this.ValueA = "";
        this.ValueE = "";
        this.CompCode = 0;
        this.Remarks = "";
        this.CreatedAt = "";
        this.CreatedBy = "";
        this.UpdatedAt = "";
        this.UpdatedBy = "";
    }
    return I_D_SpecificationValues;
}());
var I_D_UnitGroup = /** @class */ (function () {
    function I_D_UnitGroup() {
        this.UnitGrpID = 0;
        this.UnitGrpCode = "";
        this.DescA = "";
        this.DescE = "";
        this.UomID = 0;
        this.CompCode = 0;
        this.Remarks = "";
        this.CreatedAt = "";
        this.CreatedBy = "";
        this.UpdatedAt = "";
        this.UpdatedBy = "";
    }
    return I_D_UnitGroup;
}());
var I_D_UnitGroupUom = /** @class */ (function () {
    function I_D_UnitGroupUom() {
        this.UnitGrpUom = 0;
        this.UnitGrpID = 0;
        this.UomID = 0;
        this.DescA = "";
        this.DescE = "";
        this.Rate = 0;
        this.IsStock = false;
        this.IsSales = false;
        this.IsPurchase = false;
        this.CompCode = 0;
        this.Remarks = "";
        this.CreatedAt = "";
        this.CreatedBy = "";
        this.UpdatedAt = "";
        this.UpdatedBy = "";
    }
    return I_D_UnitGroupUom;
}());
var I_D_UOM = /** @class */ (function () {
    function I_D_UOM() {
        this.UomID = 0;
        this.UomCode = "";
        this.DescA = "";
        this.DescE = "";
        this.CompCode = 0;
        this.Remarks = "";
        this.CreatedAt = "";
        this.CreatedBy = "";
        this.UpdatedAt = "";
        this.UpdatedBy = "";
    }
    return I_D_UOM;
}());
var I_G_CostMethods = /** @class */ (function () {
    function I_G_CostMethods() {
        this.CostMethodID = 0;
        this.DescA = "";
        this.DescL = "";
        this.Remarks = "";
    }
    return I_G_CostMethods;
}());
var I_G_ItemType = /** @class */ (function () {
    function I_G_ItemType() {
        this.CompCode = 0;
        this.ItemTypeID = 0;
        this.DescA = "";
        this.DescL = "";
        this.ISSales = false;
        this.IsStock = false;
        this.IsProduct = false;
        this.IsIssuetoCC = false;
        this.IsIssueToProd = false;
        this.IsPurchase = false;
        this.IsAvailable = false;
    }
    return I_G_ItemType;
}());
var I_G_StockMethods = /** @class */ (function () {
    function I_G_StockMethods() {
        this.StockMethodID = 0;
        this.DescA = "";
        this.DescL = "";
        this.Remarks = "";
    }
    return I_G_StockMethods;
}());
var I_Item = /** @class */ (function () {
    function I_Item() {
        this.ItemID = 0;
        this.ItemCode = "";
        this.CompCode = 0;
        this.DescA = "";
        this.DescL = "";
        this.TechDescA = "";
        this.TechDescL = "";
        this.UnitGrpID = 0;
        this.UomID = 0;
        this.CatID = 0;
        this.ItemTypeID = 0;
        this.MovClassID = 0;
        this.OldItemCode = "";
        this.VndItemCode = "";
        this.BarCode1 = "";
        this.BarCode2 = "";
        this.FirstEntryDate = "";
        this.UnitPrice = 0;
        this.StarGlobalCost = 0;
        this.GlobalCost = 0;
        this.Remarks = "";
        this.CreatedAt = "";
        this.CreatedBy = "";
        this.UpdatedAt = "";
        this.UpdatedBy = "";
        this.LastBarCodeSeq = 0;
        this.BarCodePrefix = "";
    }
    return I_Item;
}());
var I_ItemBatch = /** @class */ (function () {
    function I_ItemBatch() {
        this.ItemBatchId = 0;
        this.BarCode = "";
        this.ItemID = 0;
        this.CompCode = 0;
        this.OnhandQty = 0;
        this.ReceivedQty = 0;
        this.UnitCost = 0;
        this.BatchCode = "";
        this.ProdDate = "";
        this.ExpDate = "";
        this.SerialNo = "";
        this.ExtraSpecCode = "";
        this.IsAddable = false;
        this.IsDeliverable = false;
        this.AddDelRemarks = "";
        this.ProdBatchNo = "";
    }
    return I_ItemBatch;
}());
var I_ItemSpecsValue = /** @class */ (function () {
    function I_ItemSpecsValue() {
        this.ItemSpecsValue = 0;
        this.ItemID = 0;
        this.SpecsValueID = 0;
    }
    return I_ItemSpecsValue;
}());
var I_ItemStore = /** @class */ (function () {
    function I_ItemStore() {
        this.ItemStoreID = 0;
        this.ItemID = 0;
        this.StoreCode = 0;
        this.BraCode = 0;
        this.CompCode = 0;
        this.LOCATION = "";
        this.LOCATION2 = "";
        this.OnhandQty = 0;
        this.BookQty = 0;
        this.OnRoadQty = 0;
        this.OnOrderQty = 0;
        this.ReOrderQty = 0;
        this.MinQty = 0;
        this.MaxQty = 0;
        this.StartQty = 0;
        this.StartLocalCost = 0;
        this.LocalCost = 0;
        this.CreatedAt = "";
        this.CreatedBy = "";
        this.UpdatedAt = "";
        this.UpdatedBy = "";
    }
    return I_ItemStore;
}());
var I_ItemStoreBatch = /** @class */ (function () {
    function I_ItemStoreBatch() {
        this.ItemStoreBatchId = 0;
        this.ItemStoreID = 0;
        this.ItemBatchId = 0;
        this.StoreCode = 0;
        this.BraCode = 0;
        this.CompCode = 0;
        this.OnhandQty = 0;
        this.BookQty = 0;
        this.SerialNo = "";
    }
    return I_ItemStoreBatch;
}());
var I_Pay_Vendor = /** @class */ (function () {
    function I_Pay_Vendor() {
        this.VendorID = 0;
        this.CompCode = 0;
        this.VendorCode = "";
        this.VndCatID = 0;
        this.NAMEA = "";
        this.NAMEL = "";
        this.SHORTNAMEA = "";
        this.SHORTNAMEL = "";
        this.RespPersonName = "";
        this.ADDRESS = "";
        this.TEL = "";
        this.FAX = "";
        this.MOBILE = 0;
        this.EMAIL = "";
        this.CURCODE = "";
        this.PurchaserId = 0;
        this.OnPurchaserAcc = false;
        this.AccVendorID = 0;
        this.PaymentType = 0;
        this.DebitLimit = 0;
        this.DebitLimitFC = 0;
        this.DebitPeriod = 0;
        this.OpenBalanceFC = 0;
        this.Openbalance = 0;
        this.Debit = 0;
        this.DebitFC = 0;
        this.Credit = 0;
        this.CreditFC = 0;
        this.Isactive = false;
        this.FCRate = 0;
        this.REMARKS = "";
        this.STATUS = 0;
        this.CREATED_BY = "";
        this.CREATED_AT = "";
        this.UPDATED_AT = "";
        this.UPDATED_BY = "";
        this.VendorType = 0;
        this.Bank = "";
        this.BankAccountNo = "";
        this.TaxFileNo = "";
        this.TaxIssuePlace = "";
        this.CommRegNo = "";
        this.CommRegIssueDate = "";
        this.CommRegIssueDateH = "";
        this.CommRegIssuePlace = "";
        this.VATType = 0;
        this.AddDedType = 0;
        this.VATFileNo = "";
        this.AddDedFileNo = "";
        this.VATIssPlace = "";
        this.AddDedIssuePlace = "";
        this.IsWebEnabled = false;
        this.WebUserName = "";
        this.WebPassword = "";
    }
    return I_Pay_Vendor;
}());
//End I
var sysobjectrules = /** @class */ (function () {
    function sysobjectrules() {
        this.obj_id;
        this.obj_name;
        this.ref;
    }
    return sysobjectrules;
}());
var sysdiagrams = /** @class */ (function () {
    function sysdiagrams() {
        this.name = "";
        this.principal_id = 0;
        this.diagram_id = 0;
        this.version = 0;
        this.definition;
    }
    return sysdiagrams;
}());
//Start Tables for PMS
var P_Control = /** @class */ (function () {
    function P_Control() {
        this.CompCode = 0;
        this.BraCode = 0;
        this.LinkToAccount = false;
        this.MonthlyClose = false;
        this.ScanPath = "";
        this.MaterialWastPrc = 0;
        this.UserTimeZoneUTCDiff = 0;
        this.ServerTimeZoneUTCDiff = 0;
        this.VATNumberLength = 0;
        this.CrNumberLength = 0;
        this.AverageLaborCost = 0;
        this.StdOHMaterial = 0;
        this.StdOHLabor = 0;
        this.StdOHEquip = 0;
        this.StdOHSubContractor = 0;
        this.StdProdOHMaterial = 0;
        this.StdProdOHLabor = 0;
        this.StdProdOHEquip = 0;
        this.StdProdOHSubContractor = 0;
        this.StdProfitMargin = 0;
        this.MaxImagesize = 0;
        this.DashBoardPeriodinSec = 0;
    }
    return P_Control;
}());
var P_D_Activity = /** @class */ (function () {
    function P_D_Activity() {
        this.ActivityID = 0;
        this.ActivityCode = "";
        this.DescA = "";
        this.DescE = "";
        this.UomID = 0;
        this.HourProduction = 0;
        this.LaborProdRate = 0;
        this.UnitPrice = 0;
        this.ParentActivityID = 0;
        this.ActivityLevel = 0;
        this.IsDetail = 0;
        this.Remarks = "";
        this.CompCode = 0;
        this.CreatedBy = "";
        this.CreatedAt = null;
        this.UpdatedBy = "";
        this.UpdatedAt = null;
    }
    return P_D_Activity;
}());
var P_D_ActivityEquipClass = /** @class */ (function () {
    function P_D_ActivityEquipClass() {
        this.ActivityEquipClassID = 0;
        this.ActivityID = 0;
        this.EquipClassId = 0;
        this.NoOfEquipments = 0;
        this.CreatedBy = "";
        this.CreatedAt = null;
        this.UpdatedBy = "";
        this.UpdatedAt = null;
    }
    return P_D_ActivityEquipClass;
}());
var P_D_ActivityIMaterial = /** @class */ (function () {
    function P_D_ActivityIMaterial() {
        this.ActivityMaterialID = 0;
        this.ActivityID = 0;
        this.ItemID = 0;
        this.ProdQty = 0;
        this.WastPrc = 0;
        this.WastQty = 0;
        this.ReqQty = 0;
        this.CreatedBy = "";
        this.CreatedAt = null;
        this.UpdatedBy = "";
        this.UpdatedAt = null;
    }
    return P_D_ActivityIMaterial;
}());
var P_D_ActivityLaborClass = /** @class */ (function () {
    function P_D_ActivityLaborClass() {
        this.ActivityLaborClassID = 0;
        this.ActivityID = 0;
        this.LaborClassId = 0;
        this.NoOfLabors = 0;
        this.CreatedBy = "";
        this.CreatedAt = null;
        this.UpdatedBy = "";
        this.UpdatedAt = null;
    }
    return P_D_ActivityLaborClass;
}());
var P_D_Calender = /** @class */ (function () {
    function P_D_Calender() {
        this.CalenderID = 0;
        this.Calendercode = "";
        this.DescA = "";
        this.DescE = "";
        this.Remarks = "";
        this.CompCode = 0;
        this.DailyWorkHours = 0;
        this.WeekWorkHours = 0;
        this.StartTime = "";
        this.EndTime = "";
        this.BreakStart = "";
        this.BreakEnd = "";
        this.IsOneShift = false;
    }
    return P_D_Calender;
}());
var P_D_CalenderDays = /** @class */ (function () {
    function P_D_CalenderDays() {
        this.CalenderDaysID = 0;
        this.CalenderID = 0;
        this.DayOfWeek = 0;
        this.WorkingDay = false;
        this.WorkHours = 0;
    }
    return P_D_CalenderDays;
}());
var P_D_Equipment = /** @class */ (function () {
    function P_D_Equipment() {
        this.EquimentID = 0;
        this.EquipClassId = 0;
        this.Equipcode = "";
        this.DescA = "";
        this.DescE = "";
        this.PurchaseCost = 0;
        this.PurchaseDate = "";
        this.Model = "";
        this.Make = "";
        this.MakeType = "";
        this.Waranty = "";
        this.MaintNotes = "";
        this.PlateNo = "";
        this.ChasisNo = "";
        this.IsActive = false;
        this.EffeciencyPrc = 0;
        this.StartServiceDate = "";
        this.OutOFServiceDate = "";
        this.HourDeprCost = 0;
        this.HourOprCost = 0;
        this.HourCost = 0;
        this.BraCode = 0;
        this.Remarks = "";
        this.CompCode = 0;
        this.ProjectID = 0;
        this.PhaseId = 0;
    }
    return P_D_Equipment;
}());
var P_D_EquipmentClass = /** @class */ (function () {
    function P_D_EquipmentClass() {
        this.EquipClassId = 0;
        this.ClassCode = "";
        this.DescA = "";
        this.DescE = "";
        this.DeprRate = 0;
        this.HourDeprCost = 0;
        this.HourOprCost = 0;
        this.HourCost = 0;
        this.IncomeRate = 0;
        this.Remarks = "";
        this.CompCode = 0;
    }
    return P_D_EquipmentClass;
}());
var P_D_Expences = /** @class */ (function () {
    function P_D_Expences() {
        this.ExpencesID = 0;
        this.ExpCatID = 0;
        this.ExpCode = "";
        this.DescA = "";
        this.DescE = "";
        this.AccountNo = "";
        this.Remarks = "";
        this.CompCode = 0;
    }
    return P_D_Expences;
}());
var P_D_ExpencesCategory = /** @class */ (function () {
    function P_D_ExpencesCategory() {
        this.ExpCatID = 0;
        this.ExpCatCode = "";
        this.DescA = "";
        this.DescE = "";
        this.AccountNo = "";
        this.Remarks = "";
        this.CompCode = 0;
    }
    return P_D_ExpencesCategory;
}());
var P_D_Labor = /** @class */ (function () {
    function P_D_Labor() {
        this.LaborID = 0;
        this.LaborClassId = 0;
        this.LaborCategoryId = 0;
        this.LaborCode = "";
        this.DescA = "";
        this.DescE = "";
        this.BasicSalary = 0;
        this.TotalAllow = 0;
        this.Tel1 = "";
        this.Tel2 = "";
        this.Mobile = "";
        this.Email = "";
        this.CarPlateNo = "";
        this.IsActive = false;
        this.NationalityID = 0;
        this.BraCode = 0;
        this.Remarks = "";
        this.CompCode = 0;
        this.ProjectID = 0;
        this.PhaseId = 0;
    }
    return P_D_Labor;
}());
var P_D_LaborAbsenceType = /** @class */ (function () {
    function P_D_LaborAbsenceType() {
        this.LaborAbsenceTypeID = 0;
        this.AbsCode = "";
        this.DescA = "";
        this.DescE = "";
        this.Remarks = "";
        this.CompCode = 0;
    }
    return P_D_LaborAbsenceType;
}());
var P_D_LaborCategory = /** @class */ (function () {
    function P_D_LaborCategory() {
        this.LaborCategoryId = 0;
        this.CategCode = "";
        this.DescA = "";
        this.DescE = "";
        this.Remarks = "";
        this.BonusRate = 0;
        this.CompCode = 0;
    }
    return P_D_LaborCategory;
}());
var P_D_LaborClass = /** @class */ (function () {
    function P_D_LaborClass() {
        this.LaborClassId = 0;
        this.ClassCode = "";
        this.DescA = "";
        this.DescE = "";
        this.HourCost = 0;
        this.IncomeRate = 0;
        this.Remarks = "";
        this.CompCode = 0;
        this.BonusAddFactor = 0;
        this.BonusDedFactor = 0;
    }
    return P_D_LaborClass;
}());
var P_D_LaborLaborClass = /** @class */ (function () {
    function P_D_LaborLaborClass() {
        this.LaborID = 0;
        this.LaborClassId = 0;
        this.Priority = 0;
        this.Remarks = "";
    }
    return P_D_LaborLaborClass;
}());
var P_D_LaborOverTimeType = /** @class */ (function () {
    function P_D_LaborOverTimeType() {
        this.LaborOverTimeTypeID = 0;
        this.OverTimeCode = "";
        this.DescA = "";
        this.DescE = "";
        this.Rate = 0;
        this.Remarks = "";
        this.CompCode = 0;
    }
    return P_D_LaborOverTimeType;
}());
var P_D_Location = /** @class */ (function () {
    function P_D_Location() {
        this.LocationId = 0;
        this.BraCode = 0;
        this.LocCode = "";
        this.SalesEngineerId = 0;
        this.ParentLocationId = 0;
        this.DescA = "";
        this.DescE = "";
        this.Remarks = "";
        this.IsDetail = false;
        this.CompCode = 0;
    }
    return P_D_Location;
}());
var P_D_SalesEgineer = /** @class */ (function () {
    function P_D_SalesEgineer() {
        this.SalesEngineerId = 0;
        this.SalesEngCategoryId = 0;
        this.EngCode = "";
        this.DeacA = "";
        this.DescE = "";
        this.Speciality = "";
        this.BasicSalary = 0;
        this.TotalAllow = 0;
        this.Tel1 = "";
        this.Tel2 = "";
        this.Mobile = "";
        this.Email = "";
        this.IsActive = false;
        this.NationalityID = 0;
        this.CarPlateNo = "";
        this.BraCode = 0;
        this.Remarks = "";
        this.CompCode = 0;
    }
    return P_D_SalesEgineer;
}());
var P_D_SalesEngCateory = /** @class */ (function () {
    function P_D_SalesEngCateory() {
        this.SalesEngCategoryId = 0;
        this.CategCode = "";
        this.DescA = "";
        this.DescE = "";
        this.Remarks = "";
        this.CompCode = 0;
        this.Rate = 0;
    }
    return P_D_SalesEngCateory;
}());
var P_D_Scope = /** @class */ (function () {
    function P_D_Scope() {
        this.ScopeID = 0;
        this.ScopeCategoryID = 0;
        this.ScopeCode = "";
        this.DescA = "";
        this.DescE = "";
        this.Remarks = "";
        this.CompCode = 0;
    }
    return P_D_Scope;
}());
var P_D_SiteEngCategory = /** @class */ (function () {
    function P_D_SiteEngCategory() {
        this.SiteEngCategoryId = 0;
        this.CategCode = "";
        this.DescA = "";
        this.DescE = "";
        this.Remarks = "";
        this.CompCode = 0;
        this.Rate = 0;
    }
    return P_D_SiteEngCategory;
}());
var P_D_ScopeCategory = /** @class */ (function () {
    function P_D_ScopeCategory() {
        this.ScopeCategoryID = 0;
        this.ScopeCategCode = "";
        this.DescA = "";
        this.DescE = "";
        this.Remarks = "";
        this.CompCode = 0;
    }
    return P_D_ScopeCategory;
}());
var P_D_SiteEngineer = /** @class */ (function () {
    function P_D_SiteEngineer() {
        this.SiteEngineerId = 0;
        this.SiteEngCategoryId = 0;
        this.EngCode = "";
        this.DescA = "";
        this.DescE = "";
        this.Speciality = "";
        this.BasicSalary = 0;
        this.TotalAllow = 0;
        this.Tel1 = "";
        this.Tel2 = "";
        this.Mobile = "";
        this.Email = "";
        this.IsActive = false;
        this.NationalityID = 0;
        this.CarPlateNo = "";
        this.BraCode = 0;
        this.Remarks = "";
        this.CompCode = 0;
    }
    return P_D_SiteEngineer;
}());
var P_D_UnProdCategory = /** @class */ (function () {
    function P_D_UnProdCategory() {
        this.UnProdCategoryID = 0;
        this.CategCode = "";
        this.DescA = "";
        this.DescE = "";
        this.Remarks = "";
        this.CompCode = 0;
    }
    return P_D_UnProdCategory;
}());
var P_D_UnProdReason = /** @class */ (function () {
    function P_D_UnProdReason() {
        this.UnProdReasonId = 0;
        this.UnProdCategoryID = 0;
        this.ReasonCode = "";
        this.DescA = "";
        this.DescE = "";
        this.Remarks = "";
        this.CompCode = 0;
    }
    return P_D_UnProdReason;
}());
var P_D_UOM = /** @class */ (function () {
    function P_D_UOM() {
        this.UomID = 0;
        this.UomCode = "";
        this.DescA = "";
        this.DescE = "";
        this.Remarks = "";
        this.CompCode = 0;
    }
    return P_D_UOM;
}());
var P_G_WorkStatus = /** @class */ (function () {
    function P_G_WorkStatus() {
        this.CompCode = 0;
        this.StatusCode = 0;
        this.DescA = "";
        this.DescE = "";
        this.Remarks = "";
    }
    return P_G_WorkStatus;
}());
var P_G_Region = /** @class */ (function () {
    function P_G_Region() {
        this.COMP_CODE = 0;
        this.REGION_CODE = 0;
        this.DESCA = "";
        this.DESCE = "";
        this.REMARKS = "";
    }
    return P_G_Region;
}());
var P_G_Period = /** @class */ (function () {
    function P_G_Period() {
        this.PeriodID = 0;
        this.YearID = 0;
        this.CompCode = 0;
        this.BraCode = 0;
        this.PeriodCode = 0;
        this.DescA = "";
        this.DescE = "";
        this.FromDate = "";
        this.ToDate = "";
        this.Closed = false;
        this.Remarks = "";
        this.CreatedBy = "";
        this.CreatedAt = "";
        this.UpdatedBy = "";
        this.UpDateedAt = "";
        this.ProdBudget = 0;
        this.MaterialCost = 0;
        this.LabourCost = 0;
        this.EquipmentCost = 0;
        this.ExpensesCost = 0;
        this.SubContractorCost = 0;
        this.ProductionOHCost = 0;
        this.OHCost = 0;
        this.ProdOHCost = 0;
        this.StdOHMaterial = 0;
        this.StdOHLabor = 0;
        this.StdOHEquip = 0;
        this.StdOHExpenses = 0;
        this.StdOHSubContractor = 0;
        this.StdProdOHMaterial = 0;
        this.StdProdOHLabor = 0;
        this.StdProdOHEquip = 0;
        this.StdProdOHExpenses = 0;
        this.StdProdOHSubContractor = 0;
        this.StdProfitMargin = 0;
        this.Total = 0;
    }
    return P_G_Period;
}());
var PQActivityCollection = /** @class */ (function () {
    function PQActivityCollection() {
        // Master
        this.ActivityID = 0;
        this.ActivityCode = "";
        this.DescA = "";
        this.DescE = "";
        this.UomID = 0;
        this.HourProduction = 0;
        this.LaborProdRate = 0;
        this.UnitPrice = 0;
        this.ParentActivityID = 0;
        this.ActivityLevel = 0;
        this.IsDetail = false;
        this.Remarks = "";
        this.CompCode = 0;
        this.ActivityMaterialID = 0;
        this.ItemId = 0;
        this.ProdQty = 0;
        this.WastPrc = 0;
        this.WastQty = 0;
        this.ReqQty = 0;
        this.ActivityEquipClassID = 0;
        this.EquipClassId = 0;
        this.NoOfEquipments = 0;
        this.ActivityLaborClassID = 0;
        this.LaborClassId = 0;
        this.NoOfLabors = 0;
    }
    return PQActivityCollection;
}());
//End Tables for PMS
//Start PMS_Sales
var P_D_SalesCustomerCategory = /** @class */ (function () {
    function P_D_SalesCustomerCategory() {
        this.CustomerCategoryID = 0;
        this.CustomerCatCode = "";
        this.DescA = "";
        this.DescE = "";
        this.Remarks = "";
        this.StatusFlag = "";
        this.CompCode = 0;
    }
    return P_D_SalesCustomerCategory;
}());
var P_D_SalesItems = /** @class */ (function () {
    function P_D_SalesItems() {
        this.ItemID = 0;
        this.ItemCode = "";
        this.DescA = "";
        this.DescE = "";
        this.UomID = 0;
        this.MinUnitPrice = 0;
        this.UnitPrice = 0;
        this.ParentItemID = 0;
        this.ScopeID = 0;
        this.ItemLevel = 0;
        this.IsDetail = false;
        this.IsActive = false;
        this.Remarks = "";
        this.CompCode = 0;
        this.CreatedBy = "";
        this.CreatedAt = "";
        this.UpdatedBy = "";
        this.UpdatedAt = "";
    }
    return P_D_SalesItems;
}());
var P_D_SalesItemsSystemActivity = /** @class */ (function () {
    function P_D_SalesItemsSystemActivity() {
        this.ItemsSystemActivityId = 0;
        this.ItemsSystemId = 0;
        this.ItemID = 0;
        this.ActivityID = 0;
        this.ActQty = 0;
        this.IsProdIncluded = 0;
        this.ProdPrc = 0;
    }
    return P_D_SalesItemsSystemActivity;
}());
var P_D_SalesPaymentTerms = /** @class */ (function () {
    function P_D_SalesPaymentTerms() {
        this.PaymentId = 0;
        this.PaymentCode = "";
        this.DescA = "";
        this.DescE = "";
        this.Remarks = "";
        this.CompCode = 0;
    }
    return P_D_SalesPaymentTerms;
}());
var P_D_SalesResponsibility = /** @class */ (function () {
    function P_D_SalesResponsibility() {
        this.ReposibilityId = 0;
        this.ResposibilityCode = "";
        this.IsCustomer = false;
        this.DescA = "";
        this.DescE = "";
        this.Remarks = "";
        this.CompCode = 0;
    }
    return P_D_SalesResponsibility;
}());
var P_TR_SalesInvoice = /** @class */ (function () {
    function P_TR_SalesInvoice() {
        this.InvoiceId = 0;
        this.TrNo = 0;
        this.TrDate = "";
        this.ProjectID = 0;
        this.ProjCode = "";
        this.BillCode = 0;
        this.FromDate = "";
        this.ToDate = "";
        this.WorkDiscription = "";
        this.TotalAmount = 0;
        this.DiscountPrc = 0;
        this.Discount = 0;
        this.VatAmount = 0;
        this.NetAmount = 0;
        this.CustomerID = 0;
        this.IsFinal = false;
        this.RefCode = "";
        this.Status = 0;
        this.Remarks = "";
        this.BraCode = 0;
        this.CompCode = 0;
        this.CreatedBy = "";
        this.CreatedAt = "";
        this.UpdatedBy = "";
        this.UpdatedAt = "";
        this.VatPrc = 0;
        this.RetentionPrc = 0;
        this.RetentionAmount = 0;
        this.AdvDeduction = 0;
        this.AdvVatAmount = 0;
        this.TaxableAmount = 0;
        this.NetTax = 0;
        this.DueAmount = 0;
        this.IsDownpayment = false;
        this.UsedDownpayment = 0;
        this.RemainDownpayment = 0;
        this.TrTime = "";
        this.DocNo = "";
        this.DocUUID = "";
        this.InvoiceTypeCode = 0;
        this.InvoiceTransCode = 0;
        this.GlobalInvoiceCounter = 0;
        this.PrevInvoiceHash;
        this.QRCode;
        this.CryptographicStamp;
        this.AdvanceConsumPrc = 0;
    }
    return P_TR_SalesInvoice;
}());
var P_TR_SalesProductionDetail = /** @class */ (function () {
    function P_TR_SalesProductionDetail() {
        this.ProductionDetailId = 0;
        this.ProductionId = 0;
        this.Serial = 0;
        this.ItemID = 0;
        this.ProjectPhaseItemId = 0;
        this.PrevProdQty = 0;
        this.ProdQty = 0;
        this.UnitPrice = 0;
        this.BilledQty = 0;
        this.RejectedQty = 0;
        this.Remarks = "";
    }
    return P_TR_SalesProductionDetail;
}());
var P_TR_SalesInvoiceDetail = /** @class */ (function () {
    function P_TR_SalesInvoiceDetail() {
        this.InvoiceDetailId = 0;
        this.InvoiceId = 0;
        this.Serial = 0;
        this.ProjectPhaseItemId = 0;
        this.ProdQty = 0;
        this.PrevBillQty = 0;
        this.BillQty = 0;
        this.UnitPrice = 0;
        this.Remarks = "";
        this.ItemDiscountPrc = 0;
        this.ItemDiscountAmt = 0;
        this.NetUnitPrice = 0;
        this.ItemVatPrc = 0;
        this.ItemVatAmount = 0;
        this.ItemTotal = 0;
        this.ItemTotalAVat = 0;
    }
    return P_TR_SalesInvoiceDetail;
}());
var P_TR_SalesInvoiceProd = /** @class */ (function () {
    function P_TR_SalesInvoiceProd() {
        this.InvoiceProdId = 0;
        this.InvoiceDetailId = 0;
        this.InvoiceId = 0;
        this.ProductionDetailId = 0;
        this.ProductionId = 0;
        this.ProjectPhaseItemId = 0;
        this.ItemID = 0;
        this.InvQty = 0;
        this.UnitPrice = 0;
        this.Total = 0;
        this.BilledQty = 0;
        this.Remarks = "";
        this.ToBillQty = 0;
    }
    return P_TR_SalesInvoiceProd;
}());
var P_TR_SalesOffer = /** @class */ (function () {
    function P_TR_SalesOffer() {
        this.OfferID = 0;
        this.TrNo = 0;
        this.TrSerial = 0;
        this.TrDate = "";
        this.RefCode = "";
        this.DescA = "";
        this.DescL = "";
        this.SendDate = "";
        this.IsMaintenanceWork = false;
        this.IsMainCustomerPay = false;
        this.LocationId = 0;
        this.ProjArea = 0;
        this.ProjAddress = "";
        this.ProjTechnicalSpecs = "";
        this.ProjectTermsCond = "";
        this.ProjectPenalties = "";
        this.CustomerPONo = "";
        this.CustomerID = 0;
        this.SalesEngineerId = 0;
        this.Status = 0;
        this.Remarks = "";
        this.BraCode = 0;
        this.CompCode = 0;
        this.CreatedBy = "";
        this.CreatedAt = "";
        this.UpdatedBy = "";
        this.UpdatedAt = "";
        this.WorkStartId = 0;
        this.IsNewProject = false;
        this.ProjectBranch = 0;
        this.ProjectID = 0;
        this.ProjectCode = "";
        this.PhaseID = 0;
        this.PhaseCode = "";
        this.ContractCode = "";
        this.ContractDate = "";
        this.ContractPeriod = 0;
        this.ContractPrice = 0;
        this.ContractNetPrice = 0;
        this.DiscountPrc = 0;
        this.DiscountAmount = 0;
        this.ContractWarantyPrd = "";
        this.PaymentMethod = 0;
        this.DownPaymentPrc = 0;
        this.DownPaymentAmount = 0;
        this.WarrntyPaymentPrc = 0;
        this.WarrntyPaymentAmount = 0;
        this.OHMaterialPrc = 0;
        this.OHLaborPrc = 0;
        this.OHEquipPrc = 0;
        this.ProdOHMaterialPrc = 0;
        this.ProdOHLaborPrc = 0;
        this.ProdOHEquipPrc = 0;
        this.ProfitMarginPrc = 0;
        this.EstimatedMaterial = 0;
        this.EstimatedLabor = 0;
        this.EstimatedEquip = 0;
        this.EstimatedProfit = 0;
        this.EstimatedOH = 0;
        this.EstimatedPOH = 0;
        this.WaranteePrd = 0;
        this.VatPrc = 0;
    }
    return P_TR_SalesOffer;
}());
var P_Tr_SalesOfferBilling = /** @class */ (function () {
    function P_Tr_SalesOfferBilling() {
        this.OfferBillingId = 0;
        this.OfferID = 0;
        this.Serial = 0;
        this.PayDescA = "";
        this.PayDescE = "";
        this.DueDate = "";
        this.Remarks = "";
        this.OfferItemId = 0;
        this.ProductionPrc;
        this.DuePrc = 0;
        this.DueAmount = 0;
    }
    return P_Tr_SalesOfferBilling;
}());
var P_Tr_SalesOfferPayment = /** @class */ (function () {
    function P_Tr_SalesOfferPayment() {
        this.OfferPaymentId = 0;
        this.OfferID = 0;
        this.PaymentId = 0;
    }
    return P_Tr_SalesOfferPayment;
}());
var P_TR_SalesOfferResponsibility = /** @class */ (function () {
    function P_TR_SalesOfferResponsibility() {
        this.OfferResponsibilityId = 0;
        this.OfferID = 0;
        this.IsCustomer = false;
        this.ReposibilityId = 0;
    }
    return P_TR_SalesOfferResponsibility;
}());
var P_Tr_SalesOfferStage = /** @class */ (function () {
    function P_Tr_SalesOfferStage() {
        this.OfferStageId = 0;
        this.OfferID = 0;
        this.StageCode = 0;
        this.StageDescA = "";
        this.StageDescE = "";
        this.ScopeID = 0;
        this.StageTotal = 0;
        this.Remarks = "";
        this.EstimatedMaterial = 0;
        this.EstimatedLabor = 0;
        this.EstimatedEquip = 0;
        this.EstimatedProfit = 0;
        this.EstimatedOH = 0;
        this.EstimatedPOH = 0;
    }
    return P_Tr_SalesOfferStage;
}());
var P_Tr_SalesOfferStageItem = /** @class */ (function () {
    function P_Tr_SalesOfferStageItem() {
        this.OfferItemId = 0;
        this.OfferStageId = 0;
        this.OfferID = 0;
        this.LineCode = "";
        this.ItemID = 0;
        this.ItemCode = "";
        this.DescA = "";
        this.DescE = "";
        this.TechDescA = "";
        this.TechDescE = "";
        this.UomId = 0;
        this.IsFixedSystem = false;
        this.Qty = 0;
        this.UnitPrice = 0;
        this.StdUnitPrice = 0;
        this.MinUnitPrice = 0;
        this.IsOfferItem = false;
        this.ProductionType = 0;
        this.Remarks = "";
        this.EstimatedMaterial = 0;
        this.EstimatedLabor = 0;
        this.EstimatedEquip = 0;
        this.EstimatedProfit = 0;
        this.EstimatedOH = 0;
        this.EstimatedPOH = 0;
    }
    return P_Tr_SalesOfferStageItem;
}());
var P_Tr_SalesOfferStageItemActivity = /** @class */ (function () {
    function P_Tr_SalesOfferStageItemActivity() {
        this.OfferStageItemActivityId = 0;
        this.OfferItemId = 0;
        this.OfferStageId = 0;
        this.OfferID = 0;
        this.ActivityID = 0;
        this.Serial = 0;
        this.Qty = 0;
        this.UnitPrice = 0;
        this.StdUnitPrice = 0;
        this.ProductionIncluded = false;
        this.ProductionPrc = 0;
        this.Remarks = "";
        this.EstimatedMaterial = 0;
        this.EstimatedLabor = 0;
        this.EstimatedEquip = 0;
        this.EstimatedProfit = 0;
    }
    return P_Tr_SalesOfferStageItemActivity;
}());
var P_TR_SalesProduction = /** @class */ (function () {
    function P_TR_SalesProduction() {
        this.ProductionId = 0;
        this.TrNo = 0;
        this.TrDate = "";
        this.ProjectID = 0;
        this.ProjCode = "";
        this.BillCode = 0;
        this.FromDate = "";
        this.ToDate = "";
        this.ProdTotal = 0;
        this.DiscountPrc = 0;
        this.Discount = 0;
        this.NetAmount = 0;
        this.WorkDiscription = "";
        this.CustomerID = 0;
        this.IsFinal = false;
        this.RefCode = "";
        this.Status = 0;
        this.Remarks = "";
        this.BraCode = 0;
        this.CompCode = 0;
        this.CreatedBy = "";
        this.CreatedAt = "";
        this.UpdatedBy = "";
        this.UpdatedAt = "";
    }
    return P_TR_SalesProduction;
}());
var P_Tr_SalesActivtyPriceDetail = /** @class */ (function () {
    function P_Tr_SalesActivtyPriceDetail() {
        this.ActivityPriceDetailId = 0;
        this.ActivityPriceId = 0;
        this.ActivityID = 0;
        this.OldPrice = 0;
        this.NewPrice = 0;
        this.MatCost = 0;
        this.LaborCost = 0;
        this.EquipCost = 0;
        this.POHCost = 0;
        this.OHCost = 0;
        this.Profit = 0;
    }
    return P_Tr_SalesActivtyPriceDetail;
}());
var P_Tr_SalesActivtyPrice = /** @class */ (function () {
    function P_Tr_SalesActivtyPrice() {
        this.ActivityPriceId = 0;
        this.TrNo = 0;
        this.TrDate = "";
        this.FromActivityCode = "";
        this.ToActivityCode = "";
        this.ParentActivityID = 0;
        this.Status = false;
        this.Remarks = "";
        this.CompCode = 0;
        this.CreatedBy = "";
        this.CreatedAt = "";
        this.UpdatedBy = "";
        this.UpdatedAt = "";
    }
    return P_Tr_SalesActivtyPrice;
}());
var P_Tr_SalesBonus = /** @class */ (function () {
    function P_Tr_SalesBonus() {
        this.SalesBonusId = 0;
        this.TrNo = 0;
        this.TrDate = "";
        this.Fyear = 0;
        this.Qrtr = 0;
        this.FromDate = "";
        this.ToDate = "";
        this.Status = 0;
        this.Remarks = "";
        this.BraCode = 0;
        this.CompCode = 0;
        this.CreatedBy = "";
        this.CreatedAt = "";
        this.UpdatedBy = "";
        this.UpdatedAt = "";
    }
    return P_Tr_SalesBonus;
}());
var P_Tr_SalesBonusDetail = /** @class */ (function () {
    function P_Tr_SalesBonusDetail() {
        this.SalesBonusDetailId = 0;
        this.SalesBonusId = 0;
        this.SalesEngineerId = 0;
        this.SalesEngCategoryId = 0;
        this.Salary = 0;
        this.OpenBasket = 0;
        this.OpenSales = 0;
        this.CurrentSales = 0;
        this.AddToBusket = 0;
        this.CurrentBasket = 0;
        this.CurrentInvoices = 0;
        this.BonusAmount = 0;
    }
    return P_Tr_SalesBonusDetail;
}());
var PQ_GETSalesItemSystemAct = /** @class */ (function () {
    function PQ_GETSalesItemSystemAct() {
        this.ItemID = 0;
        this.ItemCode = "";
        this.DescA = "";
        this.DescE = "";
        this.UomID = 0;
        this.MinUnitPrice = 0;
        this.UnitPrice = 0;
        this.ParentItemID = 0;
        this.ScopeID = 0;
        this.ItemLevel = 0;
        this.IsActive = false;
        this.IsDetail = false;
        this.Remarks = "";
        this.CompCode = 0;
        this.CreatedBy = "";
        this.CreatedAt = "";
        this.UpdatedBy = "";
        this.UpdatedAt = "";
        this.SystemCode = "";
        this.SysDescA = "";
        this.SysDescE = "";
        this.VendorID = 0;
        this.CalcUnitPrice = 0;
        this.SysMinUnitPrice = 0;
        this.SysUnitPrice = 0;
        this.ItemsSystemId = 0;
        this.SysItemID = 0;
        this.SysCompCode = 0;
        this.UomCode = "";
        this.UomDescA = "";
        this.UomDescE = "";
        this.ScopeCode = "";
        this.ScopeDescA = "";
        this.ScopeDescE = "";
        this.ItemsSystemActivityId = 0;
        this.SysActItemSystemID = 0;
        this.ActivityID = 0;
        this.ActQty = 0;
        this.IsProdIncluded = "";
        this.ProdPrc = 0;
        this.ActivityCode = "";
        this.ActDescA = "";
        this.ActDescE = "";
        this.NAMEA = "";
        this.puomcode = "";
        this.puomdescA = "";
        this.puomDescE = "";
    }
    return PQ_GETSalesItemSystemAct;
}());
var PQ_GetSalesItem = /** @class */ (function () {
    function PQ_GetSalesItem() {
        this.ItemID = 0;
        this.ItemCode = "";
        this.DescA = "";
        this.DescE = "";
        this.UomID = 0;
        this.MinUnitPrice = 0;
        this.UnitPrice = 0;
        this.ParentItemID = 0;
        this.ScopeID = 0;
        this.ItemLevel = 0;
        this.IsDetail = false;
        this.IsActive = false;
        this.Remarks = "";
        this.CompCode = 0;
        this.CreatedBy = "";
        this.CreatedAt = "";
        this.UpdatedBy = "";
        this.UpdatedAt = "";
        this.UomCode = "";
        this.UomDescA = "";
        this.UomDescE = "";
        this.ScopeCode = "";
        this.ScopeDescA = "";
        this.ScopeDescE = "";
        this.TechDescA = "";
        this.TechDescE = "";
        this.StdPrice = 0;
        this.IsEditable = false;
    }
    return PQ_GetSalesItem;
}());
var PQ_GetSalesActivityPrice = /** @class */ (function () {
    function PQ_GetSalesActivityPrice() {
        this.ActivityPriceId = 0;
        this.TrNo = 0;
        this.TrDate = "";
        this.FromActivityCode = "";
        this.ToActivityCode = "";
        this.ParentActivityID = 0;
        this.Status = false;
        this.Remarks = "";
        this.CompCode = 0;
        this.CreatedBy = "";
        this.CreatedAt = "";
        this.UpdatedBy = "";
        this.UpdatedAt = "";
        this.M_ActivityCode = "";
        this.M_ActName_ar = "";
        this.M_ActName_en = "";
    }
    return PQ_GetSalesActivityPrice;
}());
var PQ_GetSalesActivityPriceDetails = /** @class */ (function () {
    function PQ_GetSalesActivityPriceDetails() {
        this.ActivityPriceDetailId = 0;
        this.ActivityPriceId = 0;
        this.D_ActivityPriceId = 0;
        this.ActivityID = 0;
        this.OldPrice = 0;
        this.NewPrice = 0;
        this.MatCost = 0;
        this.LaborCost = 0;
        this.EquipCost = 0;
        this.POHCost = 0;
        this.OHCost = 0;
        this.Profit = 0;
        this.Calc_TotalCost = 0;
        this.D_ActivityCode = "";
        this.D_ActName_ar = "";
        this.D_ActName_en = "";
    }
    return PQ_GetSalesActivityPriceDetails;
}());
//End PMS_Sales
//Start Views Sales
var PQ_GetSalesManBonus = /** @class */ (function () {
    function PQ_GetSalesManBonus() {
        this.SalesBonusId = 0;
        this.TrNo = 0;
        this.TrDate = "";
        this.Fyear = 0;
        this.Qrtr = 0;
        this.FromDate = "";
        this.ToDate = "";
        this.Status = 0;
        this.Remarks = "";
        this.BraCode = 0;
        this.CompCode = 0;
        this.CreatedBy = "";
        this.CreatedAt = "";
        this.UpdatedBy = "";
        this.UpdatedAt = "";
        this.SalesBonusDetailId = 0;
        this.D_SalesBonusId = 0;
        this.SalesEngineerId = 0;
        this.D_SalesEngCategoryId = 0;
        this.Salary = 0;
        this.OpenBasket = 0;
        this.OpenSales = 0;
        this.CurrentSales = 0;
        this.AddToBusket = 0;
        this.CurrentBasket = 0;
        this.CurrentInvoices = 0;
        this.BonusAmount = 0;
        this.SlsEng_SalesEngineerId = 0;
        this.EngCode = "";
        this.DeacA = "";
        this.SalesEngCategoryId = 0;
        this.CategCode = "";
        this.SlsCat_DescA = "";
        this.SlsCat_DescE = "";
    }
    return PQ_GetSalesManBonus;
}());
var PQ_GetSlsCustomer = /** @class */ (function () {
    function PQ_GetSlsCustomer() {
        this.CustomerID = 0;
        this.CustomerCategoryID = 0;
        this.CustomerCode = 0;
        this.IsTemporary = false;
        this.DescA = "";
        this.DescE = "";
        this.GLAccountCode = "";
        this.ContactPerson = "";
        this.ContactTel = "";
        this.Tel1 = "";
        this.Tel2 = "";
        this.CustomerAddress = "";
        this.Fax = "";
        this.Mobile = "";
        this.Email = "";
        this.IsActive = false;
        this.CrNo = "";
        this.ChamberNo = "";
        this.VatNo = "";
        this.VatType = 0;
        this.SalesEngineerId = 0;
        this.BraCode = 0;
        this.Remarks = "";
        this.CompCode = 0;
        this.CreatedBy = "";
        this.CreatedAt = "";
        this.UpdatedBy = "";
        this.UpdatedAt = "";
        this.custEng_code = "";
        this.custeng_descA = "";
        this.CustEng_descE = "";
        this.CustomerCatCode = "";
        this.CatDescA = "";
        this.CatDescE = "";
        this.ProjectCode = "";
        this.Proj_descA = "";
        this.Proj_descE = "";
        this.CustomerAccCode = "";
        this.CustomerTel = "";
        this.Customermobile = "";
        this.CustomerContact = "";
        this.Proj_remarks = "";
        this.ProjBraCode = 0;
        this.ProjEngCode = "";
    }
    return PQ_GetSlsCustomer;
}());
var PQ_GetSlsOfferBilling = /** @class */ (function () {
    function PQ_GetSlsOfferBilling() {
        this.OfferBillingId = 0;
        this.OfferID = 0;
        this.Serial = 0;
        this.PayDescA = "";
        this.PayDescE = "";
        this.DueDate = "";
        this.Remarks = "";
        this.OfferItemId = 0;
        this.ProductionPrc;
        this.DuePrc = 0;
        this.DueAmount = 0;
        this.OffStage_OfferItemId = 0;
        this.DescA = "";
        this.DescE = "";
        this.ItemCode = "";
    }
    return PQ_GetSlsOfferBilling;
}());
var IQ_SrchItem = /** @class */ (function () {
    function IQ_SrchItem() {
        this.ItemID = 0;
        this.ItemCode = "";
        this.CompCode = 0;
        this.DescA = "";
        this.DescL = "";
        this.GlobalCost = 0;
        this.UomCode = "";
        this.Unit_descA = "";
        this.Unit_descE = "";
        this.CatCode = "";
        this.Cat_DescA = "";
        this.Cat_DescE = "";
    }
    return IQ_SrchItem;
}());
var PQ_GetActivityEquipmentClass = /** @class */ (function () {
    function PQ_GetActivityEquipmentClass() {
        this.ActivityEquipClassID = 0;
        this.ActivityID = 0;
        this.EquipClassId = 0;
        this.NoOfEquipments = 0;
        this.ClassCode = "";
        this.DescA = "";
        this.DescE = "";
        this.HourCost = 0;
        this.CreatedBy = "";
        this.CreatedAt = "";
        this.UpdatedBy = "";
        this.UpdatedAt = "";
    }
    return PQ_GetActivityEquipmentClass;
}());
var PQ_GetActivityLaborClass = /** @class */ (function () {
    function PQ_GetActivityLaborClass() {
        this.ClassCode = "";
        this.DescA = "";
        this.DescE = "";
        this.ActivityLaborClassID = 0;
        this.ActivityID = 0;
        this.LaborClassId = 0;
        this.NoOfLabors = 0;
        this.HourCost = 0;
        this.CreatedBy = "";
        this.CreatedAt = "";
        this.UpdatedBy = "";
        this.UpdatedAt = "";
    }
    return PQ_GetActivityLaborClass;
}());
var PQ_GetActivityMaterialClass = /** @class */ (function () {
    function PQ_GetActivityMaterialClass() {
        this.ActivityMaterialID = 0;
        this.ActivityID = 0;
        this.ItemID = 0;
        this.ProdQty = 0;
        this.WastPrc = 0;
        this.WastQty = 0;
        this.ReqQty = 0;
        this.ItemCode = "";
        this.DescA = "";
        this.DescL = "";
        this.UomCode = "";
        this.Unit_descA = "";
        this.Unit_descE = "";
        this.CreatedBy = "";
        this.CreatedAt = "";
        this.UpdatedBy = "";
        this.UpdatedAt = "";
    }
    return PQ_GetActivityMaterialClass;
}());
var PQ_GetSalesCustomer = /** @class */ (function () {
    function PQ_GetSalesCustomer() {
        this.CustomerID = 0;
        this.CustomerCategoryID = 0;
        this.CustCat_Name_Ar = "";
        this.CustCat_Name_En = "";
        this.CustomerCode = 0;
        this.IsTemporary = false;
        this.DescA = "";
        this.DescE = "";
        this.GLAccountCode = "";
        this.ContactPerson = "";
        this.ContactTel = "";
        this.CustomerAddress = "";
        this.Tel1 = "";
        this.Tel2 = "";
        this.Fax = "";
        this.Mobile = "";
        this.Email = "";
        this.IsActive = false;
        this.CrNo = "";
        this.ChamberNo = "";
        this.VatNo = "";
        this.VatType = 0;
        this.SalesEngineerId = 0;
        this.Eng_Name_Ar = "";
        this.Eng_Name_En = "";
        this.BraCode = 0;
        this.Remarks = "";
        this.CompCode = 0;
        this.CreatedBy = "";
        this.CreatedAt = "";
        this.UpdatedBy = "";
        this.UpdatedAt = "";
        this.RefCode2 = "";
        this.RefCode1 = "";
        this.ISPersonal = false;
        this.Address_postal = "";
        this.Address_Province = "";
        this.Address_Street = "";
        this.Address_Str_Additional = "";
        this.Address_BuildingNo = "";
        this.Address_Build_Additional = "";
        this.Address_City = "";
        this.Address_District = "";
        this.ISVatRegistered = false;
    }
    return PQ_GetSalesCustomer;
}());
var PQ_GetSalesOffer = /** @class */ (function () {
    function PQ_GetSalesOffer() {
        this.OfferID = 0;
        this.TrNo = 0;
        this.TrSerial = 0;
        this.TrDate = "";
        this.RefCode = "";
        this.DescA = "";
        this.DescL = "";
        this.SendDate = "";
        this.IsMaintenanceWork = false;
        this.IsMainCustomerPay = false;
        this.LocationId = 0;
        this.ProjArea = 0;
        this.ProjAddress = "";
        this.ProjTechnicalSpecs = "";
        this.ProjectTermsCond = "";
        this.ProjectPenalties = "";
        this.CustomerID = 0;
        this.CustomerPONo = "";
        this.SalesEngineerId = 0;
        this.Status = 0;
        this.Remarks = "";
        this.BraCode = 0;
        this.CompCode = 0;
        this.CreatedBy = "";
        this.CreatedAt = "";
        this.UpdatedBy = "";
        this.UpdatedAt = "";
        this.WorkStartId = 0;
        this.IsNewProject = false;
        this.ProjectBranch = 0;
        this.ProjectID = 0;
        this.ProjectCode = "";
        this.PhaseID = 0;
        this.PhaseCode = "";
        this.ContractCode = "";
        this.ContractDate = "";
        this.ContractPeriod = 0;
        this.ContractPrice = 0;
        this.ContractNetPrice = 0;
        this.DiscountPrc = 0;
        this.DiscountAmount = 0;
        this.ContractWarantyPrd = "";
        this.PaymentMethod = 0;
        this.DownPaymentPrc = 0;
        this.DownPaymentAmount = 0;
        this.WarrntyPaymentPrc = 0;
        this.WarrntyPaymentAmount = 0;
        this.OHMaterialPrc = 0;
        this.OHLaborPrc = 0;
        this.OHEquipPrc = 0;
        this.ProdOHMaterialPrc = 0;
        this.ProdOHLaborPrc = 0;
        this.ProdOHEquipPrc = 0;
        this.ProfitMarginPrc = 0;
        this.EstimatedMaterial = 0;
        this.EstimatedLabor = 0;
        this.EstimatedEquip = 0;
        this.EstimatedProfit = 0;
        this.WaranteePrd = 0;
        this.Loc_LocCode = "";
        this.Loc_DescA = "";
        this.loc_DescE = "";
        this.eng_EngCode = "";
        this.Eng_DescA = "";
        this.Eng_DescE = "";
        this.cus_CustomerCode = 0;
        this.cus_IsTemporary = false;
        this.cus_DescA = "";
        this.Cus_DescE = "";
        this.EstimatedOH = 0;
        this.EstimatedPOH = 0;
        this.VatPrc = 0;
    }
    return PQ_GetSalesOffer;
}());
var PQ_GetSlsOfferPayment = /** @class */ (function () {
    function PQ_GetSlsOfferPayment() {
        this.OfferPaymentId = 0;
        this.OfferID = 0;
        this.PaymentId = 0;
        this.pay_PaymentCode = "";
        this.Pay_DescA = "";
        this.Pay_DescE = "";
    }
    return PQ_GetSlsOfferPayment;
}());
var PQ_GetSlsOfferResponsibility = /** @class */ (function () {
    function PQ_GetSlsOfferResponsibility() {
        this.OfferResponsibilityId = 0;
        this.OfferID = 0;
        this.IsCustomer = false;
        this.ReposibilityId = 0;
        this.Ras_ResposibilityCode = "";
        this.Res_IsCustomer = false;
        this.Res_DescA = "";
        this.Res_DescE = "";
    }
    return PQ_GetSlsOfferResponsibility;
}());
var PQ_GetSlsOfferStage = /** @class */ (function () {
    function PQ_GetSlsOfferStage() {
        this.OfferStageId = 0;
        this.OfferID = 0;
        this.StageCode = 0;
        this.StageDescA = "";
        this.StageDescE = "";
        this.ScopeID = 0;
        this.StageTotal = 0;
        this.Remarks = "";
        this.EstimatedMaterial = 0;
        this.EstimatedLabor = 0;
        this.EstimatedEquip = 0;
        this.EstimatedProfit = 0;
        this.Scope_ScopeCode = "";
        this.Scope_DESCA = "";
        this.Scope_DESCE = "";
        this.EstimatedOH = 0;
        this.EstimatedPOH = 0;
    }
    return PQ_GetSlsOfferStage;
}());
var PQ_GetOfferCostEstimation = /** @class */ (function () {
    function PQ_GetOfferCostEstimation() {
        this.OfferID = 0;
        this.TrNo = 0;
        this.TrSerial = 0;
        this.TrDate = "";
        this.RefCode = "";
        this.DescA = "";
        this.DescL = "";
        this.CustomerID = 0;
        this.Status = 0;
        this.Remarks = "";
        this.BraCode = 0;
        this.CompCode = 0;
        this.ContractDate = "";
        this.ContractPrice = 0;
        this.EstimatedProfit = 0;
        this.ProfitMarginPrc = 0;
        this.CustomerCode = 0;
        this.SlsCust_DescA = "";
        this.DescE = "";
        this.OfferItemId = 0;
        this.OfferStageId = 0;
        this.stageItm_OfferID = 0;
        this.Serial = 0;
        this.ItemID = 0;
        this.Qty = 0;
        this.UnitPrice = 0;
        this.StdUnitPrice = 0;
        this.IsOfferItem = false;
        this.ProductionType = 0;
        this.stageItm_Remarks = "";
        this.EstimatedMaterial = 0;
        this.EstimatedLabor = 0;
        this.EstimatedEquip = 0;
        this.stageItm_EstimatedProfit = 0;
        this.ItemCode = "";
        this.itm_DescA = "";
        this.itmDescL = "";
        this.OfferStageItemActivityId = 0;
        this.itmAct_OfferItemId = 0;
        this.itmAct_OfferStageId = 0;
        this.itmAct_OfferID = 0;
        this.ActivityID = 0;
        this.itmAct_Serial = 0;
        this.itmAct_Qty = 0;
        this.itmAct_UnitPrice = 0;
        this.itmAct_StdUnitPrice = 0;
        this.ProductionIncluded = false;
        this.ProductionPrc = 0;
        this.itmAct_Remarks = "";
    }
    return PQ_GetOfferCostEstimation;
}());
var PQ_GetSlsOfferStageItem = /** @class */ (function () {
    function PQ_GetSlsOfferStageItem() {
        this.OfferItemId = 0;
        this.OfferStageId = 0;
        this.OfferID = 0;
        this.ItemID = 0;
        this.IsFixedSystem = false;
        this.Qty = 0;
        this.UnitPrice = 0;
        this.StdUnitPrice = 0;
        this.MinUnitPrice = 0;
        this.IsOfferItem = false;
        this.ProductionType = 0;
        this.Remarks = "";
        this.EstimatedMaterial = 0;
        this.EstimatedLabor = 0;
        this.EstimatedProfit = 0;
        this.EstimatedEquip = 0;
        this.calc_total = 0;
        this.Uom_UomCode = "";
        this.UOM_DescA = "";
        this.Uom_DescE = "";
        this.EstimatedOH = 0;
        this.EstimatedPOH = 0;
        this.UnitCost = 0;
        this.LineCode = "";
        this.DescA = "";
        this.DescE = "";
        this.TechDescA = "";
        this.TechDescE = "";
        this.UomId = 0;
        this.ItemCode = "";
    }
    return PQ_GetSlsOfferStageItem;
}());
var PQ_GetSlsOfferActivity = /** @class */ (function () {
    function PQ_GetSlsOfferActivity() {
        this.OfferStageItemActivityId = 0;
        this.OfferItemId = 0;
        this.OfferStageId = 0;
        this.OfferID = 0;
        this.ActivityID = 0;
        this.Serial = 0;
        this.Qty = 0;
        this.UnitPrice = 0;
        this.StdUnitPrice = 0;
        this.ProductionIncluded = false;
        this.ProductionPrc = 0;
        this.Remarks = "";
        this.EstimatedMaterial = 0;
        this.EstimatedLabor = 0;
        this.EstimatedEquip = 0;
        this.EstimatedProfit = 0;
        this.EstimatedOH = 0;
        this.EstimatedPOH = 0;
        this.Act_ActivityCode = "";
        this.Act_DescA = "";
        this.Act_DescE = "";
        this.UnitCost = 0;
        this.Uom_UomCode = "";
        this.UOM_DescA = "";
        this.Uom_DescE = "";
    }
    return PQ_GetSlsOfferActivity;
}());
//End Views Sales
//PMS_Eng Tables
var P_TR_EngExpensesEntry = /** @class */ (function () {
    function P_TR_EngExpensesEntry() {
        this.ExpensesEntryId = 0;
        this.TrNo = 0;
        this.TrDate = "";
        this.ProjectPhaseId = 0;
        this.ProjectID = 0;
        this.TotalAmount = 0;
        this.Status = false;
        this.Remarks = "";
        this.BraCode = 0;
        this.CompCode = 0;
        this.CreatedBy = "";
        this.CreatedAt = "";
        this.UpdatedBy = "";
        this.UpdatedAt = "";
    }
    return P_TR_EngExpensesEntry;
}());
var P_TR_EngExpensesEntryDetail = /** @class */ (function () {
    function P_TR_EngExpensesEntryDetail() {
        this.ExpensesEntryDetailId = 0;
        this.ExpensesEntryId = 0;
        this.SeqNo = 0;
        this.ExpencesID = 0;
        this.ProjectPhaseId = 0;
        this.Amount = "0.00";
        this.Benificial = "";
        this.RefNo = "";
        this.Remarks = "";
    }
    return P_TR_EngExpensesEntryDetail;
}());
var P_Tr_EngProduction = /** @class */ (function () {
    function P_Tr_EngProduction() {
        this.ProductionId = 0;
        this.ScheduleId = 0;
        this.TrNo = 0;
        this.TrDate = "";
        this.ProjectPhaseId = 0;
        this.ProjectID = 0;
        this.StartDateTime = "";
        this.EndDateTime = "";
        this.CalenderId = 0;
        this.WorkHours = 0;
        this.WorkDescr = "";
        this.UnProdReasonId = 0;
        this.TotalunProdHours = 0;
        this.Status = 0;
        this.IsCloseScheduel = false;
        this.Remarks = "";
        this.BraCode = 0;
        this.CompCode = 0;
        this.CreatedBy = "";
        this.CreatedAt = "";
        this.UpdatedBy = "";
        this.UpdatedAt = "";
    }
    return P_Tr_EngProduction;
}());
var P_TR_EngProductionActiv = /** @class */ (function () {
    function P_TR_EngProductionActiv() {
        this.ProductionActivId = 0;
        this.ProductionId = 0;
        this.ScheduleId = 0;
        this.ScheduleActivId = 0;
        this.FinishQty = 0;
        this.ProdBeforeQty = 0;
        this.ActivityID = 0;
        this.ProjectPhaseItemActivId = 0;
        this.ItemId = 0;
    }
    return P_TR_EngProductionActiv;
}());
var P_TR_EngProductionEquip = /** @class */ (function () {
    function P_TR_EngProductionEquip() {
        this.ProductionequipId = 0;
        this.ProductionId = 0;
        this.EquipmentID = 0;
        this.WorkHours = 0;
        this.UnProdHours = 0;
        this.HourCost = 0;
        this.EstHours = 0;
    }
    return P_TR_EngProductionEquip;
}());
var P_TR_EngProductionLabour = /** @class */ (function () {
    function P_TR_EngProductionLabour() {
        this.ProductionLaborId = 0;
        this.ProductionId = 0;
        this.LaborID = 0;
        this.WorkHours = 0;
        this.UnProdHours = 0;
        this.HourCost = 0;
        this.EstHours = 0;
    }
    return P_TR_EngProductionLabour;
}());
var P_TR_EngProject = /** @class */ (function () {
    function P_TR_EngProject() {
        this.ProjectID = 0;
        this.ProjectCode = "";
        this.DescA = "";
        this.DescL = "";
        this.OfferID = 0;
        this.OfferTrNo = 0;
        this.OfferTrSerial = 0;
        this.LocationId = 0;
        this.CustomerID = 0;
        this.SalesEngineerId = 0;
        this.CustomerAccCode = "";
        this.CustomerTel = "";
        this.CustomerMobile = "";
        this.CustomerContact = "";
        this.CC_CODE = 0;
        this.ProjArea = 0;
        this.ProjAddress = "";
        this.ProjTechnicalSpecs = "";
        this.ProjectTermsCond = "";
        this.ContractCode = "";
        this.ContractDate = "";
        this.ContractRefNo = "";
        this.ContractPeriod = 0;
        this.ContractPrice = 0;
        this.ContractDiscountPrc = 0;
        this.ContractDiscountAmount = 0;
        this.ContractAdditions = 0;
        this.ContractDuration = 0;
        this.ContractWarantyPrd = "";
        this.PaymentMethod = 0;
        this.DownPaymentPrc = 0;
        this.DownPaymentAmount = 0;
        this.WarrntyPaymentPrc = 0;
        this.WarrntyPaymentAmount = 0;
        this.Status = 0;
        this.Remarks = "";
        this.BraCode = 0;
        this.CompCode = 0;
        this.CreatedBy = "";
        this.CreatedAt = "";
        this.UpdatedBy = "";
        this.UpdatedAt = "";
        this.OHMaterialPrc = 0;
        this.OHLaborPrc = 0;
        this.OHEquipPrc = 0;
        this.ProdOHMaterialPrc = 0;
        this.ProdOHLaborPrc = 0;
        this.ProdOHEquipPrc = 0;
        this.ProfitMarginPrc = 0;
        this.EstimatedMaterial = 0;
        this.EstimatedLabor = 0;
        this.EstimatedEquip = 0;
        this.EstimatedProfit = 0;
        this.EstimatedOH = 0;
        this.EstimatedPOH = 0;
        this.StartDate = "";
        this.EndDate = "";
        this.ISPosted = false;
        this.VatPrc = 0;
    }
    return P_TR_EngProject;
}());
var P_TR_EngProjectActivity = /** @class */ (function () {
    function P_TR_EngProjectActivity() {
        this.ProjectPhaseItemActivId = 0;
        this.ProjectPhaseItemId = 0;
        this.ProjectPhaseId = 0;
        this.ProjectID = 0;
        this.ActivityID = 0;
        this.Serial = 0;
        this.ContrQty = 0;
        this.ActivQty = 0;
        this.TotalProdQty = 0;
        this.SchedQty = 0;
        this.SchedProdQty = 0;
        this.SCon_Qty = 0;
        this.SConProdQty = 0;
        this.UnitPrice = 0;
        this.StdUnitPrice = 0;
        this.ProductionIncluded = false;
        this.ProductionPrc = 0;
        this.Remarks = "";
        this.EstimatedMaterial = 0;
        this.EstimatedLabor = 0;
        this.EstimatedEquip = 0;
        this.EstimatedProfit = 0;
        this.StartDate = "";
        this.EndDate = "";
        this.RelProjectPhaseItemActivId = 0;
        this.RelationType = 0;
        this.RelationDelay = 0;
    }
    return P_TR_EngProjectActivity;
}());
var P_TR_EngProjectItem = /** @class */ (function () {
    function P_TR_EngProjectItem() {
        this.ProjectPhaseItemId = 0;
        this.ProjectPhaseId = 0;
        this.ProjectID = 0;
        this.OfferItemId = 0;
        this.ItemID = 0;
        this.IsFixedSystem = false;
        this.ContrQty = 0;
        this.ItemQty = 0;
        this.ProdQty = 0;
        this.BilledQty = 0;
        this.UnitPrice = 0;
        this.StdUnitPrice = 0;
        this.IsOfferItem = false;
        this.ProductionType = 0;
        this.Remarks = "";
        this.EstimatedMaterial = 0;
        this.EstimatedLabor = 0;
        this.EstimatedEquip = 0;
        this.EstimatedProfit = 0;
        this.EstimatedOH = 0;
        this.EstimatedPOH = 0;
        this.StartDate = "";
        this.EndDate = "";
        this.RelProjectPhaseItemId = 0;
        this.RelationType = 0;
        this.RelationDelay = 0;
        this.ItemCode = "";
        this.LineCode = "";
    }
    return P_TR_EngProjectItem;
}());
var P_TR_EngProjectPhase = /** @class */ (function () {
    function P_TR_EngProjectPhase() {
        this.ProjectPhaseId = 0;
        this.ProjectID = 0;
        this.ProjectPhaseCode = "";
        this.DescA = "";
        this.DescL = "";
        this.OfferID = 0;
        this.OfferTrNo = 0;
        this.OfferTrSerial = 0;
        this.CC_CODE = "";
        this.SiteEngineerId = 0;
        this.StartDate = "";
        this.EndDate = "";
        this.IsMaintenanceWork = false;
        this.IsBonusIncluded = false;
        this.ToBeInvoiced = false;
        this.ScopeID = 0;
        this.CalenderId = 0;
        this.Status = 0;
        this.Remarks = "";
        this.EstimatedMaterial = 0;
        this.EstimatedLabor = 0;
        this.EstimatedEquip = 0;
        this.EstimatedProfit = 0;
        this.EstimatedOH = 0;
        this.EstimatedPOH = 0;
        this.ISPosted = false;
    }
    return P_TR_EngProjectPhase;
}());
var P_TR_EngSchedule = /** @class */ (function () {
    function P_TR_EngSchedule() {
        this.ScheduleId = 0;
        this.TrNo = 0;
        this.TrDate = "";
        this.ProjectPhaseId = 0;
        this.ProjectID = 0;
        this.StartDateTime = "";
        this.EndDateTime = "";
        this.CalenderId = 0;
        this.WorkHours = 0;
        this.OTHours = 0;
        this.CalHours = 0;
        this.WorkDescr = "";
        this.RequestMaterialId = 0;
        this.RequestLabourId = 0;
        this.RequestEquipmentId = 0;
        this.IsOverTime = false;
        this.Status = 0;
        this.Remarks = "";
        this.BraCode = 0;
        this.CompCode = 0;
        this.CreatedBy = "";
        this.CreatedAt = "";
        this.UpdatedBy = "";
        this.UpdatedAt = "";
    }
    return P_TR_EngSchedule;
}());
var P_TR_EngScheduleActiv = /** @class */ (function () {
    function P_TR_EngScheduleActiv() {
        this.ScheduleActivId = 0;
        this.ScheduleId = 0;
        this.ProjectPhaseItemActivId = 0;
        this.AvailQty = 0;
        this.SchedQty = 0;
        this.ProdBeforeQty = 0;
        this.TotSchedQty = 0;
        this.ActivQty = 0;
        this.FinishQty = 0;
        this.ItemId = 0;
        this.ActivityID = 0;
    }
    return P_TR_EngScheduleActiv;
}());
var P_TR_EngScheduleEquip = /** @class */ (function () {
    function P_TR_EngScheduleEquip() {
        this.ScheduleEquipId = 0;
        this.ScheduleId = 0;
        this.EquimentID = 0;
        this.AssigneDate = "";
        this.LeaveDate = "";
        this.ExpLeaveDate = "";
    }
    return P_TR_EngScheduleEquip;
}());
var P_TR_EngScheduleEquipClass = /** @class */ (function () {
    function P_TR_EngScheduleEquipClass() {
        this.ScheduleEquipClassId = 0;
        this.ScheduleId = 0;
        this.EquipClassId = 0;
        this.RequiredNo = 0;
    }
    return P_TR_EngScheduleEquipClass;
}());
var P_TR_EngScheduleLaborClass = /** @class */ (function () {
    function P_TR_EngScheduleLaborClass() {
        this.ScheduleLaborClassId = 0;
        this.ScheduleId = 0;
        this.LaborCLassID = 0;
        this.RequiredNo = 0;
    }
    return P_TR_EngScheduleLaborClass;
}());
var P_TR_EngScheduleLabor = /** @class */ (function () {
    function P_TR_EngScheduleLabor() {
        this.ScheduleLaborId = 0;
        this.ScheduleId = 0;
        this.LaborID = 0;
        this.AssigneDate = "";
        this.LeaveDate = "";
        this.ExpLeaveDate = "";
        this.HourCost = 0;
        this.Status = 0;
    }
    return P_TR_EngScheduleLabor;
}());
var P_TR_EngVariation = /** @class */ (function () {
    function P_TR_EngVariation() {
        this.VariationId = 0;
        this.TrNo = 0;
        this.TrDate = "";
        this.ProjectPhaseId = 0;
        this.ProjectID = 0;
        this.RefNo = "";
        this.RefDate = "";
        this.VariationValue = 0;
        this.VariationDescr = "";
        this.Status = false;
        this.IsSalesApprove = false;
        this.Remarks = "";
        this.BraCode = 0;
        this.CompCode = 0;
        this.CreatedBy = "";
        this.CreatedAt = "";
        this.UpdatedBy = "";
        this.UpdatedAt = "";
    }
    return P_TR_EngVariation;
}());
//class P_TR_EngVariationActivity {
//    constructor() {
//        this.VariationActivId = 0;
//        this.ProjectPhaseId = 0;
//        this.VariationItemId = 0;
//        this.ProjectPhaseItemActivId = 0;
//        this.ActivityID = 0;
//        this.IsNew = false;
//        this.Old_ActivQty = 0;
//        this.ActivQty = 0;
//        this.UnitPrice = 0;
//        this.StdUnitPrice = 0;
//        this.OldProductionPrc = 0;
//        this.ProductionPrc = 0;
//        this.Remarks = "";
//        this.EstimatedMaterial = 0;
//        this.EstimatedLabor = 0;
//        this.EstimatedEquip = 0;
//        this.EstimatedProfit = 0;
//        this.OldEffItemQty = 0;
//        this.NewEffItemQty = 0;
//        this.TotProdQty = 0;
//        this.UnderProdQty = 0;
//    }
//    public VariationActivId: number;
//    public ProjectPhaseId: number;
//    public VariationItemId: number;
//    public ProjectPhaseItemActivId: number;
//    public ActivityID: number;
//    public IsNew: boolean;
//    public Old_ActivQty: number;
//    public ActivQty: number;
//    public UnitPrice: number;
//    public StdUnitPrice: number;
//    public OldProductionPrc: number;
//    public ProductionPrc: number;
//    public Remarks: string;
//    public EstimatedMaterial: number;
//    public EstimatedLabor: number;
//    public EstimatedEquip: number;
//    public EstimatedProfit: number;
//    public OldEffItemQty: number;
//    public NewEffItemQty: number;
//    public TotProdQty: number;
//    public UnderProdQty: number;
//}
//class P_TR_EngVariationItem {
//    constructor() {
//        this.VariationItemId = 0;
//        this.VariationId = 0;
//        this.IsNew = false;
//        this.ProjectPhaseItemId = 0;
//        this.LineCode = "";
//        this.ItemID = 0;
//        this.DescA = "";
//        this.DescE = "";
//        this.UnitPrice = 0;
//        this.OrgItemQty = 0;
//        this.ItemQty = 0;
//        this.EstimatedMaterial = 0;
//        this.EstimatedLabor = 0;
//        this.EstimatedEquip = 0;
//        this.EstimatedProfit = 0;
//        this.Remarks = "";
//        this.BilledQty = 0;
//        this.ProdQty = 0;
//        this.ProgressQty = 0;
//    }
//    public VariationItemId: number;
//    public VariationId: number;
//    public IsNew: boolean;
//    public ProjectPhaseItemId: number;
//    public LineCode: string;
//    public ItemID: number;
//    public DescA: string;
//    public DescE: string;
//    public UnitPrice: number;
//    public OrgItemQty: number;
//    public ItemQty: number;
//    public EstimatedMaterial: number;
//    public EstimatedLabor: number;
//    public EstimatedEquip: number;
//    public EstimatedProfit: number;
//    public Remarks: string;
//    public BilledQty: number;
//    public ProdQty: number;
//    public ProgressQty: number;
//}
var P_TR_EngVariationActivity = /** @class */ (function () {
    function P_TR_EngVariationActivity() {
        this.VariationActivId = 0;
        this.ProjectPhaseId = 0;
        this.VariationItemId = 0;
        this.VariationId = 0;
        this.ProjectPhaseItemActivId = 0;
        this.ActivityID = 0;
        this.IsNew = false;
        this.Old_ActivQty = 0;
        this.ActivQty = 0;
        this.UnitPrice = 0;
        this.StdUnitPrice = 0;
        this.OldProductionPrc = 0;
        this.ProductionPrc = 0;
        this.Remarks = "";
        this.EstimatedMaterial = 0;
        this.EstimatedLabor = 0;
        this.EstimatedEquip = 0;
        this.EstimatedProfit = 0;
        this.OldEffItemQty = 0;
        this.NewEffItemQty = 0;
        this.TotProdQty = 0;
        this.UnderProdQty = 0;
    }
    return P_TR_EngVariationActivity;
}());
var P_TR_EngVariationItem = /** @class */ (function () {
    function P_TR_EngVariationItem() {
        this.VariationItemId = 0;
        this.VariationId = 0;
        this.IsNew = false;
        this.ProjectPhaseItemId = 0;
        this.LineCode = "";
        this.ItemID = 0;
        this.DescA = "";
        this.DescE = "";
        this.UnitPrice = 0;
        this.OrgItemQty = 0;
        this.ItemQty = 0;
        this.EstimatedMaterial = 0;
        this.EstimatedLabor = 0;
        this.EstimatedEquip = 0;
        this.EstimatedProfit = 0;
        this.Remarks = "";
        this.BilledQty = 0;
        this.ProdQty = 0;
        this.ProgressQty = 0;
    }
    return P_TR_EngVariationItem;
}());
var P_D_SubCandidateScope = /** @class */ (function () {
    function P_D_SubCandidateScope() {
        this.SubCandidateScopeId = 0;
        this.CandidateID = 0;
        this.ScopeId = 0;
        this.ApplayDate = "";
        this.IsApproved = false;
        this.ApprovalDate = "";
        this.ContractLimit = 0;
        this.Remarks = "";
    }
    return P_D_SubCandidateScope;
}());
var P_D_SubCandidate = /** @class */ (function () {
    function P_D_SubCandidate() {
        this.SubContractorID = 0;
        this.CandidateCode = 0;
        this.SubContractorCode = 0;
        this.DescA = "";
        this.DescE = "";
        this.ContactPerson = "";
        this.ContactTel = "";
        this.SubContractorAddress = "";
        this.Specialty = "";
        this.Tel1 = "";
        this.Tel2 = "";
        this.Fax = "";
        this.Mobile = "";
        this.Email = "";
        this.CrNo = "";
        this.ChamberNo = "";
        this.VatNo = "";
        this.VatType = 0;
        this.ContractLimit = 0;
        this.BraCode = 0;
        this.Remarks = "";
        this.CompCode = 0;
        this.CreatedBy = "";
        this.CreatedAt = "";
        this.UpdatedBy = "";
        this.UpdatedAt = "";
    }
    return P_D_SubCandidate;
}());
var P_D_SubContractor = /** @class */ (function () {
    function P_D_SubContractor() {
        this.SubContractorID = 0;
        this.SubContractorCode = 0;
        this.CandidateID = 0;
        this.DescA = "";
        this.DescE = "";
        this.GLAccountCode = "";
        this.ContactPerson = "";
        this.ContactTel = "";
        this.SubContractorAddress = "";
        this.Specialty = "";
        this.Tel1 = "";
        this.Tel2 = "";
        this.Fax = "";
        this.Mobile = "";
        this.Email = "";
        this.IsActive = false;
        this.CrNo = "";
        this.ChamberNo = "";
        this.VatNo = "";
        this.VatType = 0;
        this.ContractLimit = 0;
        this.BraCode = 0;
        this.Remarks = "";
        this.CompCode = 0;
        this.CreatedBy = "";
        this.CreatedAt = "";
        this.UpdatedBy = "";
        this.UpdatedAt = "";
    }
    return P_D_SubContractor;
}());
var P_D_SubContractorScope = /** @class */ (function () {
    function P_D_SubContractorScope() {
        this.SubContractorScopeId = 0;
        this.SubContractorID = 0;
        this.ScopeId = 0;
        this.ApplayDate = "";
        this.IsApproved = false;
        this.ApprovalDate = "";
        this.ContractLimit = 0;
        this.Remarks = "";
    }
    return P_D_SubContractorScope;
}());
var P_TR_SubContract = /** @class */ (function () {
    function P_TR_SubContract() {
        this.SubContractId = 0;
        this.TrNo = 0;
        this.TrDate = "";
        this.DescA = "";
        this.DescE = "";
        this.SubContractorID = 0;
        this.ScopeID = 0;
        this.ProjectID = 0;
        this.ProjectPhaseId = 0;
        this.TotalAmount = "0.00";
        this.ISMaterialIncluded = false;
        this.ISFlexQty = false;
        this.IsBlank = false;
        this.StartDate = "";
        this.EndDate = "";
        this.Status = 0;
        this.Terms = "";
        this.Technical = "";
        this.Penalty = "";
        this.MaterialRemarks = "";
        this.EquipmentRemarks = "";
        this.LaborRemarks = "";
        this.Duration = 0;
        this.WarrantyPeriod = 0;
        this.DownpaymentPrc = 0;
        this.WarranlyPrc = 0;
        this.Remarks = "";
        this.BraCode = 0;
        this.CompCode = 0;
        this.CreatedBy = "";
        this.CreatedAt = "";
        this.UpdatedBy = "";
        this.UpdatedAt = "";
        this.IsApproved = 0;
        this.IsClosed = 0;
    }
    return P_TR_SubContract;
}());
var P_TR_SubContractActivity = /** @class */ (function () {
    function P_TR_SubContractActivity() {
        this.SubContractActivityId = 0;
        this.SubContractId = 0;
        this.ActivityId = 0;
        this.ProjectPhaseItemActivId = 0;
        this.ProjQty = 0;
        this.ContractQty = 0;
        this.SOQty = 0;
        this.ProdQty = 0;
        this.UnitPrice = "0";
        this.Remarks = "";
    }
    return P_TR_SubContractActivity;
}());
var P_TR_SubServiceOrderActivity = /** @class */ (function () {
    function P_TR_SubServiceOrderActivity() {
        this.SubServiceOrderActivityId = 0;
        this.SubServiceOrderId = 0;
        this.SubContractActivityId = 0;
        this.ActivityId = 0;
        this.ProjectPhaseItemActivId = 0;
        this.ContractQty = 0;
        this.ProjectQty = 0;
        this.SOQty = 0;
        this.FinishQty = 0;
        this.AppQty = 0;
        this.UnitPrice = 0;
        this.Total = 0;
        this.RemainQty = 0;
        this.Remarks = "";
    }
    return P_TR_SubServiceOrderActivity;
}());
var P_TR_EngScheduleMaterial = /** @class */ (function () {
    function P_TR_EngScheduleMaterial() {
        this.ScheduleMaterialId = 0;
        this.ScheduleId = 0;
        this.ItemId = 0;
        this.SchedQty = 0;
        this.ReqQty = 0;
        this.IssuedQty = 0;
        this.ReturnQty = 0;
        this.BalanceQty = 0;
    }
    return P_TR_EngScheduleMaterial;
}());
//End PMS_Eng Tables
//Strat Engineer Viwes
var PQ_GetEngSubCandidateScope = /** @class */ (function () {
    function PQ_GetEngSubCandidateScope() {
        this.SubCandidateScopeId = 0;
        this.CandidateID = 0;
        this.ScopeId = 0;
        this.ApplayDate = "";
        this.IsApproved = false;
        this.ApprovalDate = "";
        this.ContractLimit = 0;
        this.Remarks = "";
        this.ScopeCode = "";
        this.DescA = "";
        this.DescE = "";
    }
    return PQ_GetEngSubCandidateScope;
}());
var PQ_GetEngSubContractorScope = /** @class */ (function () {
    function PQ_GetEngSubContractorScope() {
        this.SubContractorScopeId = 0;
        this.SubContractorID = 0;
        this.ScopeId = 0;
        this.ApplayDate = "";
        this.IsApproved = false;
        this.ApprovalDate = "";
        this.ContractLimit = 0;
        this.Remarks = "";
        this.ScopeCode = "";
        this.DescA = "";
        this.DescE = "";
    }
    return PQ_GetEngSubContractorScope;
}());
var PQ_GetEngExpensesDetail = /** @class */ (function () {
    function PQ_GetEngExpensesDetail() {
        this.ExpensesEntryDetailId = 0;
        this.ExpensesEntryId = 0;
        this.SeqNo = 0;
        this.ExpencesID = 0;
        this.ProjectPhaseId = 0;
        this.Amount = "0.00";
        this.Benificial = "";
        this.RefNo = "";
        this.Remarks = "";
        this.Exp_ExpCode = "";
        this.Exp_DescA = "";
        this.Exp_DescE = "";
        this.Phase_Code = "";
        this.Phase_DescA = "";
        this.Phase_DescE = "";
    }
    return PQ_GetEngExpensesDetail;
}());
var PQ_GetEngExpenses = /** @class */ (function () {
    function PQ_GetEngExpenses() {
        this.ExpensesEntryId = 0;
        this.TrNo = 0;
        this.TrDate = "";
        this.ProjectPhaseId = 0;
        this.ProjectID = 0;
        this.TotalAmount = 0;
        this.Status = false;
        this.Remarks = "";
        this.BraCode = 0;
        this.CompCode = 0;
        this.CreatedBy = "";
        this.CreatedAt = "";
        this.UpdatedBy = "";
        this.UpdatedAt = "";
        this.Proj_Code = "";
        this.Proj_DescA = "";
        this.Proj_DescE = "";
        this.Phase_code = "";
        this.Phase_DescA = "";
        this.Phase_DescE = "";
    }
    return PQ_GetEngExpenses;
}());
var PQ_GetEngWorkSchdule = /** @class */ (function () {
    function PQ_GetEngWorkSchdule() {
        this.ScheduleId = 0;
        this.TrNo = 0;
        this.TrDate = "";
        this.ProjectPhaseId = 0;
        this.ProjectID = 0;
        this.EndDateTime = "";
        this.StartDateTime = "";
        this.CalenderId = 0;
        this.WorkDescr = "";
        this.RequestMaterialId = 0;
        this.RequestLabourId = 0;
        this.RequestEquipmentId = 0;
        this.WorkHours = 0;
        this.OTHours = 0;
        this.CalHours = 0;
        this.IsOverTime = false;
        this.Status = 0;
        this.Remarks = "";
        this.BraCode = 0;
        this.CompCode = 0;
        this.CreatedBy = "";
        this.CreatedAt = "";
        this.UpdatedBy = "";
        this.UpdatedAt = "";
        this.Prj_ProjectCode = "";
        this.Prj_DescA = "";
        this.Prj_DescE = "";
        this.Prj_Status = 0;
        this.Phase_ProjectPhaseCode = "";
        this.Phase_DescA = "";
        this.Phase_DescE = "";
        this.Phase_CCCode = "";
        this.Phase_Status = 0;
        this.Cal_calenderCode = "";
        this.Cal_DescA = "";
        this.Cal_DescE = "";
        this.RLab_TrNo = 0;
        this.REq_TrNo = 0;
        this.RMat_TrNo = 0;
    }
    return PQ_GetEngWorkSchdule;
}());
var PQ_GetEngWorkSchduleActivity = /** @class */ (function () {
    function PQ_GetEngWorkSchduleActivity() {
        this.ScheduleActivId = 0;
        this.ScheduleId = 0;
        this.ItemId = 0;
        this.ActivityID = 0;
        this.ProjectPhaseItemActivId = 0;
        this.AvailQty = 0;
        this.SchedQty = 0;
        this.ProdBeforeQty = 0;
        this.TotSchedQty = 0;
        this.ActivQty = 0;
        this.FinishQty = 0;
        this.Itm_ItemCode = "";
        this.Itm_DescA = "";
        this.Itm_DescE = "";
        this.Act_ActivityCode = "";
        this.Act_DescA = "";
        this.Act_DescE = "";
        this.Act_UomCode = "";
        this.DailyProd = 0;
    }
    return PQ_GetEngWorkSchduleActivity;
}());
var PQ_GetEngWorkSchduleEquip = /** @class */ (function () {
    function PQ_GetEngWorkSchduleEquip() {
        this.ScheduleEquipId = 0;
        this.ScheduleId = 0;
        this.EquimentID = 0;
        this.AssigneDate = "";
        this.LeaveDate = "";
        this.ExpLeaveDate = "";
        this.HourCost = 0;
        this.Status = 0;
        this.eq_EquipCode = "";
        this.eq_DescA = "";
        this.Eq_DescE = "";
        this.Eq_HourCost = 0;
    }
    return PQ_GetEngWorkSchduleEquip;
}());
var PQ_GetEngWorkSchduleEquipClass = /** @class */ (function () {
    function PQ_GetEngWorkSchduleEquipClass() {
        this.ScheduleEquipClassId = 0;
        this.ScheduleId = 0;
        this.EquipClassId = 0;
        this.RequiredNo = 0;
        this.HourCost = 0;
        this.Class_ClassCode = "";
        this.Class_DescA = "";
        this.Class_DescE = "";
        this.Class_HourCost = 0;
        this.AssignedEq = 0;
        this.RemainEq = 0;
        this.RequiredHrs = 0;
    }
    return PQ_GetEngWorkSchduleEquipClass;
}());
var PQ_GetEngWorkSchduleLaborClass = /** @class */ (function () {
    function PQ_GetEngWorkSchduleLaborClass() {
        this.ScheduleLaborClassId = 0;
        this.ScheduleId = 0;
        this.LaborCLassID = 0;
        this.RequiredNo = 0;
        this.HourCost = 0;
        this.LClass_CalssCode = "";
        this.LClass_DescA = "";
        this.LClass_DescE = "";
        this.LCass_HourCost = 0;
        this.AssignedLab = 0;
        this.RemainLab = 0;
        this.RequiredHrs = 0;
    }
    return PQ_GetEngWorkSchduleLaborClass;
}());
var PQ_GetEngWorkSchduleLabor = /** @class */ (function () {
    function PQ_GetEngWorkSchduleLabor() {
        this.ScheduleLaborId = 0;
        this.ScheduleId = 0;
        this.LaborID = 0;
        this.AssigneDate = "";
        this.LeaveDate = "";
        this.ExpLeaveDate = "";
        this.HourCost = 0;
        this.Status = 0;
        this.labor_LaborID = 0;
        this.Lab_LabCode = "";
        this.Lab_DescA = "";
        this.Lab_DescE = "";
        this.Lab_BasicSalary = 0;
        this.Lab_TotalAllow = 0;
        this.Lab_HourCost = 0;
    }
    return PQ_GetEngWorkSchduleLabor;
}());
var PQ_SrchEngProjectActivity = /** @class */ (function () {
    function PQ_SrchEngProjectActivity() {
        this.Itm_ItemCode = "";
        this.Itm_DescA = "";
        this.Itm_DescE = "";
        this.Act_ActivityCode = "";
        this.Act_DescA = "";
        this.Act_DescE = "";
        this.ProjectPhaseId = 0;
        this.ProjectID = 0;
        this.ProjectPhaseItemId = 0;
        this.ProjectPhaseItemActivId = 0;
        this.ActivityID = 0;
        this.ItemID = 0;
        this.Serial = 0;
        this.ActivQty = 0;
        this.TotalProdQty = 0;
        this.TotScedQty = 0;
        this.RemainQty = 0;
        this.UomID = 0;
        this.uom_Code = "";
        this.uom_DescA = "";
        this.uom_DescE = "";
        this.LineCode = "";
        this.SchedQty = 0;
        this.SCon_Qty = 0;
        this.AvaL_Qty = 0;
    }
    return PQ_SrchEngProjectActivity;
}());
var PQ_GetEngProductionLabour = /** @class */ (function () {
    function PQ_GetEngProductionLabour() {
        this.ProductionLaborId = 0;
        this.ProductionId = 0;
        this.LaborID = 0;
        this.WorkHours = 0;
        this.UnProdHours = 0;
        this.HourCost = 0;
        this.Lab_Code = "";
        this.Lab_DescA = "";
        this.Lab_DescE = "";
        this.Class_Code = "";
        this.Class_DescA = "";
        this.Class_DescE = "";
        this.EstHours = 0;
    }
    return PQ_GetEngProductionLabour;
}());
var PQ_GetEngProductionEquipment = /** @class */ (function () {
    function PQ_GetEngProductionEquipment() {
        this.ProductionequipId = 0;
        this.ProductionId = 0;
        this.WorkHours = 0;
        this.UnProdHours = 0;
        this.HourCost = 0;
        this.EquipmentID = 0;
        this.Class_Code = "";
        this.Class_DescA = "";
        this.Class_DescE = "";
        this.Equip_Code = "";
        this.Equip_DescA = "";
        this.Equip_DescE = "";
        this.EstHours = 0;
        this.RemainQty = 0;
    }
    return PQ_GetEngProductionEquipment;
}());
var PQ_GetEngproductionActivity = /** @class */ (function () {
    function PQ_GetEngproductionActivity() {
        this.ProductionActivId = 0;
        this.ProductionId = 0;
        this.ScheduleId = 0;
        this.ScheduleActivId = 0;
        this.FinishQty = 0;
        this.ProdBeforeQty = 0;
        this.ActivityID = 0;
        this.ProjectPhaseItemActivId = 0;
        this.ItemId = 0;
        this.Act_Code = "";
        this.Act_DescA = "";
        this.Act_DescE = "";
        this.Itm_Code = "";
        this.Itm_DescA = "";
        this.Itm_DescE = "";
        this.Act_HourProduction = 0;
        this.ProjAct_ActivQty = 0;
        this.ProjAct_ProductionIncluded = false;
        this.ProjAct_ProductionPrc = 0;
        this.schAct_SchedQty = 0;
        this.RemainQty = 0;
    }
    return PQ_GetEngproductionActivity;
}());
var PQ_GetEngProduction = /** @class */ (function () {
    function PQ_GetEngProduction() {
        this.ProductionId = 0;
        this.ScheduleId = 0;
        this.TrNo = 0;
        this.TrDate = "";
        this.ProjectPhaseId = 0;
        this.ProjectID = 0;
        this.StartDateTime = "";
        this.EndDateTime = "";
        this.CalenderId = 0;
        this.WorkHours = 0;
        this.WorkDescr = "";
        this.UnProdReasonId = 0;
        this.TotalunProdHours = 0;
        this.Status = 0;
        this.IsCloseScheduel = false;
        this.Remarks = "";
        this.BraCode = 0;
        this.CompCode = 0;
        this.CreatedBy = "";
        this.CreatedAt = "";
        this.UpdatedBy = "";
        this.UpdatedAt = "";
        this.Unp_ReasonCode = "";
        this.Unp_DescA = "";
        this.Unp_DescE = "";
        this.Proj_Code = "";
        this.Proj_DescA = "";
        this.Proj_DescE = "";
        this.Phase_Code = "";
        this.Phase_DescA = "";
        this.Phase_DescE = "";
        this.Sc_Status = 0;
    }
    return PQ_GetEngProduction;
}());
var PQ_SrchEngProjectPhase = /** @class */ (function () {
    function PQ_SrchEngProjectPhase() {
        this.Proj_Code = "";
        this.Proj_DescA = "";
        this.Proj_DescE = "";
        this.Proj_Status = 0;
        this.Cust_Code = 0;
        this.Cust_DescA = "";
        this.Cust_DescE = "";
        this.ProjectID = 0;
        this.ProjectPhaseId = 0;
        this.Phase_Code = "";
        this.Phase_DescA = "";
        this.Phase_DescE = "";
        this.ScopeID = 0;
        this.Phase_Status = 0;
        this.BraCode = 0;
        this.CompCode = 0;
    }
    return PQ_SrchEngProjectPhase;
}());
var PQ_GetEngSubContractActivity = /** @class */ (function () {
    function PQ_GetEngSubContractActivity() {
        this.SubContractActivityId = 0;
        this.SubContractId = 0;
        this.ActivityId = 0;
        this.ProjectPhaseItemActivId = 0;
        this.ProjQty = 0;
        this.ContractQty = 0;
        this.SOQty = 0;
        this.ProdQty = 0;
        this.UnitPrice = "0";
        this.Remarks = "";
        this.Act_Code = "";
        this.Act_DescA = "";
        this.Act_DescE = "";
        this.Uom_Code = "";
        this.Uom_DescA = "";
        this.Uom_DescE = "";
        this.TotAmount = "0";
    }
    return PQ_GetEngSubContractActivity;
}());
var PQ_GetEngSubContract = /** @class */ (function () {
    function PQ_GetEngSubContract() {
        this.SubContractId = 0;
        this.TrNo = 0;
        this.TrDate = "";
        this.DescA = "";
        this.DescE = "";
        this.SubContractorID = 0;
        this.ScopeID = 0;
        this.ProjectID = 0;
        this.ProjectPhaseId = 0;
        this.TotalAmount = "0.00";
        this.Sc_Limit = "0.00";
        this.ISMaterialIncluded = false;
        this.ISFlexQty = false;
        this.IsBlank = false;
        this.StartDate = "";
        this.EndDate = "";
        this.Status = 0;
        this.Terms = "";
        this.Technical = "";
        this.Penalty = "";
        this.MaterialRemarks = "";
        this.EquipmentRemarks = "";
        this.LaborRemarks = "";
        this.Duration = 0;
        this.WarrantyPeriod = 0;
        this.DownpaymentPrc = 0;
        this.WarranlyPrc = 0;
        this.Remarks = "";
        this.BraCode = 0;
        this.CompCode = 0;
        this.CreatedBy = "";
        this.CreatedAt = "";
        this.UpdatedBy = "";
        this.UpdatedAt = "";
        this.IsApproved = 0;
        this.IsClosed = 0;
        this.Sc_Code = 0;
        this.Sc_DescA = "";
        this.Sc_DescE = "";
        this.Scope_Code = "";
        this.Scope_DescA = "";
        this.Scope_DescE = "";
        this.Phase_Code = "";
        this.Phase_DescA = "";
        this.Phase_DescE = "";
        this.Proj_Code = "";
        this.Proj_DescA = "";
        this.Proj_DescE = "";
        this.Tot_FinishSo = 0;
        this.Tot_IssueSo = 0;
        this.Tot_OpenSo = 0;
        this.SiteEngineerId = 0;
        this.VatType = 0;
    }
    return PQ_GetEngSubContract;
}());
var PQ_GetEngWorkSchduleMaterial = /** @class */ (function () {
    function PQ_GetEngWorkSchduleMaterial() {
        this.ScheduleMaterialId = 0;
        this.ScheduleId = 0;
        this.SubServiceOrderId = 0;
        this.ItemId = 0;
        this.SchedQty = 0;
        this.ReqQty = 0;
        this.IssuedQty = 0;
        this.ReturnQty = 0;
        this.BalanceQty = 0;
        this.Itm_ItemCode = "";
        this.Itm_DescA = "";
        this.Itm_DescE = "";
        this.UomID = 0;
        this.Uom_UomCode = "";
        this.Uom_DescA = "";
        this.Uom_DescE = "";
    }
    return PQ_GetEngWorkSchduleMaterial;
}());
var PQ_SrchActivity = /** @class */ (function () {
    function PQ_SrchActivity() {
        this.ActivityID = 0;
        this.ActivityCode = "";
        this.DescA = "";
        this.DescE = "";
        this.UomID = 0;
        this.HourProduction = 0;
        this.LaborProdRate = 0;
        this.UnitPrice = 0;
        this.ParentActivityID = 0;
        this.ActivityLevel = 0;
        this.IsDetail = false;
        this.Remarks = "";
        this.CompCode = 0;
        this.Uom_Code = "";
        this.Uom_DescA = "";
        this.Uom_DescE = "";
    }
    return PQ_SrchActivity;
}());
var P_TR_SubServiceOrder = /** @class */ (function () {
    function P_TR_SubServiceOrder() {
        this.SubServiceOrderId = 0;
        this.SubContractId = 0;
        this.TrNo = 0;
        this.TrDate = "";
        this.DescA = "";
        this.DescE = "";
        this.SubContractorID = 0;
        this.ProjectID = 0;
        this.ProjectPhaseId = 0;
        this.MaterialRequestID = 0;
        this.TotalAmount = 0;
        this.StartDate = "";
        this.EndDate = "";
        this.SiteEngineerId = 0;
        this.Status = 0;
        this.Remarks = "";
        this.TechnicalMark = 0;
        this.TimeMark = 0;
        this.BraCode = 0;
        this.CompCode = 0;
        this.CreatedBy = "";
        this.CreatedAt = "";
        this.UpdatedBy = "";
        this.UpdatedAt = "";
        this.TotalMark = 0;
        this.IsApproved = 0;
        this.IsClosed = 0;
    }
    return P_TR_SubServiceOrder;
}());
var PQ_GetEngProject = /** @class */ (function () {
    function PQ_GetEngProject() {
        this.OfferID = 0;
        this.ProjectID = 0;
        this.ProjectCode = "";
        this.DescA = "";
        this.DescL = "";
        this.OfferTrNo = 0;
        this.OfferTrSerial = 0;
        this.LocationId = 0;
        this.CustomerID = 0;
        this.SalesEngineerId = 0;
        this.CustomerAccCode = "";
        this.CustomerTel = "";
        this.CustomerMobile = "";
        this.CustomerContact = "";
        this.CC_CODE = 0;
        this.ProjArea = 0;
        this.ProjAddress = "";
        this.ProjTechnicalSpecs = "";
        this.ProjectTermsCond = "";
        this.ContractCode = "";
        this.ContractDate = "";
        this.ContractRefNo = "";
        this.ContractPeriod = 0;
        this.ContractPrice = 0;
        this.ContractWarantyPrd = "";
        this.PaymentMethod = 0;
        this.DownPaymentPrc = 0;
        this.DownPaymentAmount = 0;
        this.WarrntyPaymentPrc = 0;
        this.WarrntyPaymentAmount = 0;
        this.Status = 0;
        this.Remarks = "";
        this.BraCode = 0;
        this.CreatedBy = "";
        this.CompCode = 0;
        this.CreatedAt = "";
        this.UpdatedBy = "";
        this.OHMaterialPrc = 0;
        this.UpdatedAt = "";
        this.OHLaborPrc = 0;
        this.OHEquipPrc = 0;
        this.ProdOHMaterialPrc = 0;
        this.ProdOHLaborPrc = 0;
        this.ProdOHEquipPrc = 0;
        this.ProfitMarginPrc = 0;
        this.EstimatedMaterial = 0;
        this.EstimatedLabor = 0;
        this.EstimatedEquip = 0;
        this.EstimatedProfit = 0;
        this.EstimatedOH = 0;
        this.EstimatedPOH = 0;
        this.cust_CustomerCode = 0;
        this.cust_DescA = "";
        this.cust_DescE = "";
        this.Eng_Code = "";
        this.Eng_DescA = "";
        this.Eng_DescE = "";
        this.Loc_Code = "";
        this.Loc_DescA = "";
        this.Loc_DescE = "";
        this.Status_DescA = "";
        this.Status_DescE = "";
        this.ContractDiscountPrc = 0;
        this.ContractDiscountAmount = 0;
        this.ContractAdditions = 0;
        this.ContractDuration = 0;
        this.StartDate = "";
        this.EndDate = "";
        this.ISPosted = false;
        this.VatPrc = 0;
        this.VatType = 0;
    }
    return PQ_GetEngProject;
}());
var PQ_GetEngProjectItem = /** @class */ (function () {
    function PQ_GetEngProjectItem() {
        this.ProjectPhaseItemId = 0;
        this.ProjectPhaseId = 0;
        this.ProjectID = 0;
        this.OfferItemId = 0;
        this.LineCode = "";
        this.ItemCode = "";
        this.ItemID = 0;
        this.IsFixedSystem = false;
        this.ContrQty = 0;
        this.ItemQty = 0;
        this.ProdQty = 0;
        this.BilledQty = 0;
        this.UnitPrice = 0;
        this.StdUnitPrice = 0;
        this.IsOfferItem = false;
        this.ProductionType = 0;
        this.Remarks = "";
        this.EstimatedMaterial = 0;
        this.EstimatedLabor = 0;
        this.EstimatedEquip = 0;
        this.EstimatedProfit = 0;
        this.EstimatedOH = 0;
        this.EstimatedPOH = 0;
        this.StartDate = "";
        this.EndDate = "";
        this.RelProjectPhaseItemId = 0;
        this.RelationType = 0;
        this.RelationDelay = 0;
        this.Phase_PhaseCode = "";
        this.SlsITm_ItemCode = "";
        this.SlsITm_DescA = "";
        this.SlsITm_DescE = "";
        this.Scp_ScopeCode = "";
        this.Scp_DescA = "";
        this.Scp_DescE = "";
        this.ScopeID = 0;
        this.UomCode = "";
    }
    return PQ_GetEngProjectItem;
}());
var PQ_GetEngProjectPhase = /** @class */ (function () {
    function PQ_GetEngProjectPhase() {
        this.ProjectPhaseId = 0;
        this.ProjectID = 0;
        this.ProjectPhaseCode = "";
        this.DescA = "";
        this.DescL = "";
        this.OfferID = 0;
        this.OfferTrSerial = 0;
        this.CC_CODE = "";
        this.OfferTrNo = 0;
        this.SiteEngineerId = 0;
        this.StartDate = "";
        this.EndDate = "";
        this.IsMaintenanceWork = false;
        this.IsBonusIncluded = false;
        this.ToBeInvoiced = false;
        this.ScopeID = 0;
        this.CalenderId = 0;
        this.Status = 0;
        this.Remarks = "";
        this.EstimatedMaterial = 0;
        this.EstimatedLabor = 0;
        this.EstimatedEquip = 0;
        this.EstimatedProfit = 0;
        this.EstimatedOH = 0;
        this.EstimatedPOH = 0;
        this.Cal_Calendercode = "";
        this.Cal_DescA = "";
        this.Cal_DescE = "";
        this.Cal_DailyWorkHours = 0;
        this.Scop_ScopeCode = "";
        this.Scop_DescA = "";
        this.Scop_DescE = "";
        this.Eng_EngCode = "";
        this.Eng_DescA = "";
        this.Eng_DescE = "";
        this.Status_DesecA = "";
        this.Status_DescE = "";
        this.EngProj_ProjectCode = "";
        this.EngProj_DescA = "";
        this.EngProj_DescL = "";
        this.EngProj_CustomerId = "";
        this.Cust_DescA = "";
        this.Cust_DescE = "";
        this.Cust_CustomerCode = "";
        this.BraCode = 0;
        this.CompCode = 0;
        this.Deuration = 0;
        this.ISPosted = false;
    }
    return PQ_GetEngProjectPhase;
}());
//End Engineer Viwes
//Start Resource Management Table 
var P_TR_ResAbsence = /** @class */ (function () {
    function P_TR_ResAbsence() {
        this.AbsenceID = 0;
        this.TrNo = 0;
        this.TrDate = "";
        this.ProjectID = 0;
        this.SiteEngineerId = 0;
        this.ScheduleId = 0;
        this.Status = 0;
        this.Remarks = "";
        this.BraCode = 0;
        this.CompCode = 0;
        this.CreatedBy = "";
        this.CreatedAt = "";
        this.UpdatedBy = "";
        this.UpdatedAt = "";
    }
    return P_TR_ResAbsence;
}());
var P_TR_ResAbsenceLabour = /** @class */ (function () {
    function P_TR_ResAbsenceLabour() {
        this.AbsenceLabourID = 0;
        this.AbsenceID = 0;
        this.LaborID = 0;
        this.LaborAbsenceTypeID = 0;
        this.StartDate = "";
        this.IsAbsence = false;
        this.AbsenceDays = 0;
        this.LateHours = 0;
        this.LateHourCost = 0;
        this.AbsDayCost = 0;
    }
    return P_TR_ResAbsenceLabour;
}());
var P_TR_ResMaterialIssue = /** @class */ (function () {
    function P_TR_ResMaterialIssue() {
        this.IssueMaterialId = 0;
        this.RequestMaterialId = 0;
        this.ScheduleId = 0;
        this.TrNo = 0;
        this.TrDate = "";
        this.ProjectID = 0;
        this.ProjectPhaseID = 0;
        this.Status = 0;
        this.Remarks = "";
        this.BraCode = 0;
        this.CompCode = 0;
        this.CreatedBy = "";
        this.CreatedAt = "";
        this.UpdatedBy = "";
        this.UpdatedAt = "";
        this.StoreID = 0;
    }
    return P_TR_ResMaterialIssue;
}());
var P_TR_ResMaterialIssueDetail = /** @class */ (function () {
    function P_TR_ResMaterialIssueDetail() {
        this.RequestMaterialDetailId = 0;
        this.IssueMaterialId = 0;
        this.ItemId = 0;
        this.RemainQty = 0;
        this.AvailableQty = 0;
        this.UnitCost = 0;
        this.IssuedQty = 0;
    }
    return P_TR_ResMaterialIssueDetail;
}());
var P_TR_ResMaterialReturn = /** @class */ (function () {
    function P_TR_ResMaterialReturn() {
        this.ReturnMaterialId = 0;
        this.RequestMaterialId = 0;
        this.ScheduleId = 0;
        this.TrNo = 0;
        this.TrDate = "";
        this.ProjectID = 0;
        this.ProjectPhaseID = 0;
        this.Status = 0;
        this.Remarks = "";
        this.BraCode = 0;
        this.CompCode = 0;
        this.CreatedBy = "";
        this.CreatedAt = "";
        this.UpdatedBy = "";
        this.UpdatedAt = "";
        this.StoreID = 0;
    }
    return P_TR_ResMaterialReturn;
}());
var P_TR_ResMaterialReturnDetail = /** @class */ (function () {
    function P_TR_ResMaterialReturnDetail() {
        this.RequestMaterialDetailId = 0;
        this.ReturnMaterialId = 0;
        this.ItemId = 0;
        this.NetIssuedQty = 0;
        this.ReturndQty = 0;
        this.UnitCost = 0;
    }
    return P_TR_ResMaterialReturnDetail;
}());
var P_TR_ResOverTime = /** @class */ (function () {
    function P_TR_ResOverTime() {
        this.OverTimeID = 0;
        this.TrNo = 0;
        this.TrDate = null;
        this.ProjectID = null;
        this.SiteEngineerId = null;
        this.ScheduleId = null;
        this.FromDate = null;
        this.ToDate = null;
        this.Status = null;
        this.Remarks = "";
        this.BraCode = null;
        this.CompCode = null;
        this.CreatedBy = null;
        this.CreatedAt = "";
        this.UpdatedBy = null;
        this.UpdatedAt = "";
    }
    return P_TR_ResOverTime;
}());
var P_TR_ResOverTimeLabour = /** @class */ (function () {
    function P_TR_ResOverTimeLabour() {
        this.OverTimeLabourID = 0;
        this.OverTimeID = 0;
        this.LaborID = 0;
        this.LaborOverTimeTypeID = 0;
        this.StartDate = "";
        this.OverTimeHours = 0;
        this.OverTimeRate = 0;
        this.OTHourCost = 0;
        this.Remarks = "";
    }
    return P_TR_ResOverTimeLabour;
}());
var P_Tr_ResRequestLabour = /** @class */ (function () {
    function P_Tr_ResRequestLabour() {
        this.RequestLabourId = 0;
        this.ScheduleId = 0;
        this.TrNo = 0;
        this.TrDate = "";
        this.Status = 0;
        this.Remarks = "";
        this.BraCode = 0;
        this.CompCode = 0;
        this.CreatedBy = "";
        this.CreatedAt = "";
        this.UpdatedBy = "";
        this.UpdatedAt = "";
    }
    return P_Tr_ResRequestLabour;
}());
var P_TR_ResRequestEquipment = /** @class */ (function () {
    function P_TR_ResRequestEquipment() {
        this.RequestEquipmentId = 0;
        this.ScheduleId = 0;
        this.TrNo = 0;
        this.TrDate = "";
        this.Status = 0;
        this.Remarks = "";
        this.BraCode = 0;
        this.CompCode = 0;
        this.CreatedBy = "";
        this.CreatedAt = "";
        this.UpdatedBy = "";
        this.UpdatedAt = "";
    }
    return P_TR_ResRequestEquipment;
}());
var P_TR_ResRequestMaterial = /** @class */ (function () {
    function P_TR_ResRequestMaterial() {
        this.RequestMaterialId = 0;
        this.ScheduleId = 0;
        this.SubServiceOrderId = 0;
        this.TrNo = 0;
        this.TrDate = "";
        this.Status = 0;
        this.RequestedBy = "";
        this.ApprovedBy = "";
        this.Remarks = "";
        this.BraCode = 0;
        this.CompCode = 0;
        this.CreatedBy = "";
        this.CreatedAt = "";
        this.UpdatedBy = "";
        this.UpdatedAt = "";
    }
    return P_TR_ResRequestMaterial;
}());
var P_TR_ResRequestMaterialDetail = /** @class */ (function () {
    function P_TR_ResRequestMaterialDetail() {
        this.RequestMaterialDetailId = 0;
        this.RequestMaterialId = 0;
        this.ItemId = 0;
        this.SchedQty = 0;
        this.ReqBeforeQty = 0;
        this.RequiredQty = 0;
        this.ReqQty = 0;
        this.IssuedQty = 0;
        this.ReturnQty = 0;
        this.Remarks = "";
        this.BalanceQty = 0;
    }
    return P_TR_ResRequestMaterialDetail;
}());
var PQ_GetEngSubServiceOrder = /** @class */ (function () {
    function PQ_GetEngSubServiceOrder() {
        this.SubServiceOrderId = 0;
        this.SubContractId = 0;
        this.TrNo = 0;
        this.TrDate = "";
        this.DescA = "";
        this.DescE = "";
        this.ProjectID = 0;
        this.SubContractorID = 0;
        this.ProjectPhaseId = 0;
        this.MaterialRequestID = 0;
        this.TotalAmount = 0;
        this.StartDate = "";
        this.EndDate = "";
        this.SiteEngineerId = 0;
        this.Status = 0;
        this.Remarks = "";
        this.TechnicalMark = 0;
        this.TimeMark = 0;
        this.BraCode = 0;
        this.CompCode = 0;
        this.CreatedBy = "";
        this.CreatedAt = "";
        this.UpdatedBy = "";
        this.UpdatedAt = "";
        this.TotalMark = 0;
        this.IsApproved = 0;
        this.IsClosed = 0;
        this.RMat_TrNo = 0;
        this.Phase_ProjectPhaseCode = "";
        this.Phase_DescA = "";
        this.Phase_DescL = "";
        this.Eng_EngCode = "";
        this.Eng_DescA = "";
        this.Eng_DescE = "";
        this.Cont_TrNo = 0;
        this.Sc_Code = 0;
        this.Sc_DescA = "";
        this.Sc_DescE = "";
        this.Proj_ProjectCode = "";
        this.Proj_DescA = "";
        this.Proj_DescE = "";
        this.ISFlexQty = null;
        this.IsBlank = null;
        this.VatType = 0;
    }
    return PQ_GetEngSubServiceOrder;
}());
var PQ_GetEngServiceOrderActivity = /** @class */ (function () {
    function PQ_GetEngServiceOrderActivity() {
        this.SubServiceOrderActivityId = 0;
        this.SubServiceOrderId = 0;
        this.ActivityId = 0;
        this.SubContractActivityId = 0;
        this.ProjectPhaseItemActivId = 0;
        this.ContractQty = 0;
        this.ProjectQty = 0;
        this.SOQty = 0;
        this.FinishQty = 0;
        this.AppQty = 0;
        this.UnitPrice = 0;
        this.Total = 0;
        this.RemainQty = 0;
        this.Remarks = "";
        this.ActivityCode = "";
        this.DescA = "";
        this.DescE = "";
        this.Uom_Code = "";
        this.Uom_DescA = "";
        this.Uom_DescE = "";
    }
    return PQ_GetEngServiceOrderActivity;
}());
var PQ_LoadEngSubSOContractActivity = /** @class */ (function () {
    function PQ_LoadEngSubSOContractActivity() {
        this.SubContractId = 0;
        this.SubServiceOrderId = 0;
        this.ActivityId = 0;
        this.ProjectPhaseItemActivId = 0;
        this.SubContractActivityId = 0;
        this.UnitPrice = 0;
        this.ProjQty = 0;
        this.ContQty = 0;
        this.Qty = 0;
        this.ActivityCode = "";
        this.DescA = "";
        this.DescE = "";
        this.Uom_Code = "";
        this.Uom_DescA = "";
        this.Uom_DescE = "";
    }
    return PQ_LoadEngSubSOContractActivity;
}());
var PQ_GetEngSubProduction = /** @class */ (function () {
    function PQ_GetEngSubProduction() {
        this.SubProductionId = 0;
        this.SubServiceOrderId = 0;
        this.SubContractId = 0;
        this.TrNo = 0;
        this.DescA = "";
        this.TrDate = "";
        this.DescE = "";
        this.SubContractorID = 0;
        this.ProjectID = 0;
        this.ProjectPhaseId = 0;
        this.TotalAmount = 0;
        this.StartDate = "";
        this.EndDate = "";
        this.SiteEngineerId = 0;
        this.Status = 0;
        this.Remarks = "";
        this.BraCode = 0;
        this.CompCode = 0;
        this.CreatedBy = "";
        this.CreatedAt = "";
        this.UpdatedBy = "";
        this.IsApproved = 0;
        this.UpdatedAt = "";
        this.So_TrNo = 0;
        this.So_DescA = "";
        this.So_DescE = "";
        this.Phase_ProjectPhaseCode = "";
        this.Phase_DescA = "";
        this.Phase_DescE = "";
        this.subcon_SubContractorCode = 0;
        this.subcon_DescA = "";
        this.subcon_DescE = "";
        this.Eng_EngCode = "";
        this.Eng_DescA = "";
        this.Eng_DescE = "";
        this.proj_ProjectCode = "";
        this.Proj_DescA = "";
        this.Proj_DescL = "";
        this.So_Status = 0;
        this.DownpaymentPrc = 0;
        this.WarranlyPrc = 0;
        this.OrgAmount = 0;
        this.Deduction = 0;
        this.Downpayment = 0;
        this.Warranly = 0;
        this.VatAmount = 0;
        this.VatPrc = 0;
        this.IsFinal = false;
    }
    return PQ_GetEngSubProduction;
}());
var PQ_GetEngSubProductionActivity = /** @class */ (function () {
    function PQ_GetEngSubProductionActivity() {
        this.SubProductionActivityId = 0;
        this.SubProductionId = 0;
        this.SubServiceOrderActivityId = 0;
        this.SubServiceOrderId = 0;
        this.SubContractActivityId = 0;
        this.ActivityId = 0;
        this.ProjectPhaseItemActivId = 0;
        this.SOQty = 0;
        this.FinishQty = 0;
        this.AppQty = 0;
        this.ProdBeforeQty = 0;
        this.UnitPrice = 0;
        this.Total = 0;
        this.RemainQty = 0;
        this.Remarks = "";
        this.ActivityCode = "";
        this.DescA = "";
        this.DescE = "";
        this.Uom_Code = "";
        this.Uom_DescA = "";
        this.Uom_DescE = "";
    }
    return PQ_GetEngSubProductionActivity;
}());
var P_TR_SubProduction = /** @class */ (function () {
    function P_TR_SubProduction() {
        this.SubProductionId = 0;
        this.SubServiceOrderId = 0;
        this.SubContractId = 0;
        this.TrNo = 0;
        this.TrDate = "";
        this.DescA = "";
        this.DescE = "";
        this.SubContractorID = 0;
        this.ProjectID = 0;
        this.ProjectPhaseId = 0;
        this.TotalAmount = 0;
        this.StartDate = "";
        this.EndDate = "";
        this.SiteEngineerId = 0;
        this.Status = 0;
        this.Remarks = "";
        this.BraCode = 0;
        this.CompCode = 0;
        this.CreatedBy = "";
        this.CreatedAt = "";
        this.UpdatedBy = "";
        this.UpdatedAt = "";
        this.IsApproved = 0;
        this.OrgAmount = 0;
        this.Deduction = 0;
        this.Downpayment = 0;
        this.Warranly = 0;
        this.VatAmount = 0;
        this.VatPrc = 0;
        this.IsFinal = false;
    }
    return P_TR_SubProduction;
}());
var P_TR_SubProductionActivity = /** @class */ (function () {
    function P_TR_SubProductionActivity() {
        this.SubProductionActivityId = 0;
        this.SubProductionId = 0;
        this.SubServiceOrderActivityId = 0;
        this.SubServiceOrderId = 0;
        this.SubContractActivityId = 0;
        this.ActivityId = 0;
        this.ProjectPhaseItemActivId = 0;
        this.SOQty = 0;
        this.FinishQty = 0;
        this.AppQty = 0;
        this.ProdBeforeQty = 0;
        this.UnitPrice = 0;
        this.Total = 0;
        this.RemainQty = 0;
        this.Remarks = "";
    }
    return P_TR_SubProductionActivity;
}());
var IQ_GetItemList = /** @class */ (function () {
    function IQ_GetItemList() {
        this.ItemCode = "";
        this.ItemID = 0;
        this.CompCode = 0;
        this.DescA = "";
        this.DescL = "";
        this.TechDescA = "";
        this.TechDescL = "";
        this.UnitGrpID = 0;
        this.UomID = 0;
        this.CatID = 0;
        this.ItemTypeID = 0;
        this.MovClassID = 0;
        this.OldItemCode = "";
        this.VndItemCode = "";
        this.BarCode1 = "";
        this.BarCode2 = "";
        this.FirstEntryDate = "";
        this.UnitPrice = 0;
        this.StarGlobalCost = 0;
        this.GlobalCost = 0;
        this.Remarks = "";
        this.CreatedAt = "";
        this.CreatedBy = "";
        this.UpdatedAt = "";
        this.UpdatedBy = "";
        this.LastBarCodeSeq = 0;
        this.BarCodePrefix = "";
        this.Uom_Code = "";
        this.Uom_DescA = "";
        this.Uom_DescE = "";
        this.CatCode = "";
    }
    return IQ_GetItemList;
}());
var PQ_GetSalesIssueProduction = /** @class */ (function () {
    function PQ_GetSalesIssueProduction() {
        this.ProductionId = 0;
        this.TrNo = 0;
        this.ProjectID = 0;
        this.TrDate = "";
        this.ProjCode = "";
        this.BillCode = 0;
        this.FromDate = "";
        this.ToDate = "";
        this.ProdTotal = 0;
        this.DiscountPrc = 0;
        this.Discount = 0;
        this.NetAmount = 0;
        this.WorkDiscription = "";
        this.CustomerID = 0;
        this.IsFinal = false;
        this.RefCode = "";
        this.Status = 0;
        this.Remarks = "";
        this.BraCode = 0;
        this.CompCode = 0;
        this.CreatedBy = "";
        this.CreatedAt = "";
        this.UpdatedBy = "";
        this.UpdatedAt = "";
        this.Proj_ProjectCode = "";
        this.Proj_DescA = "";
        this.Proj_DescL = "";
        this.Cust_CustomerCode = 0;
        this.Cust_DescA = "";
        this.Cust_DescE = "";
    }
    return PQ_GetSalesIssueProduction;
}());
var PQ_GetSalesIssueProductionDetails = /** @class */ (function () {
    function PQ_GetSalesIssueProductionDetails() {
        this.ProductionDetailId = 0;
        this.ProductionId = 0;
        this.Serial = 0;
        this.ItemID = 0;
        this.ProjectPhaseItemId = 0;
        this.ItemQty = 0;
        this.PrevProdQty = 0;
        this.ProdQty = 0;
        this.UnitPrice = 0;
        this.BilledQty = 0;
        this.RejectedQty = 0;
        this.Remarks = "";
        this.UnBilledQty = 0;
        this.TotalProdQty = 0;
        this.Total = 0;
        this.Itm_ItemCode = "";
        this.Itm_DescA = "";
        this.Itm_DescE = "";
        this.LineCode = "";
    }
    return PQ_GetSalesIssueProductionDetails;
}());
var PQ_GetResLabourOverTime = /** @class */ (function () {
    function PQ_GetResLabourOverTime() {
        this.OverTimeID = 0;
        this.TrNo = 0;
        this.TrDate = "";
        this.ProjectID = 0;
        this.SiteEngineerId = 0;
        this.Status = 0;
        this.FromDate = "";
        this.ToDate = "";
        this.Remarks = "";
        this.BraCode = 0;
        this.CompCode = 0;
        this.CreatedBy = "";
        this.CreatedAt = "";
        this.UpdatedBy = "";
        this.UpdatedAt = "";
        this.ScheduleId = 0;
        this.schd_TrNo = 0;
        this.schd_TrDate = "";
        this.schd_ProjectPhaseId = 0;
        this.schd_ProjectID = 0;
        this.EndDateTime = "";
        this.StartDateTime = "";
        this.WorkDescr = "";
        this.Prj_ProjectCode = "";
        this.Prj_DescA = "";
        this.Prj_DescE = "";
        this.Phase_ProjectPhaseCode = "";
        this.Phase_DescA = "";
        this.Phase_DescE = "";
    }
    return PQ_GetResLabourOverTime;
}());
var PQ_GetResLabourOverTimeDetail = /** @class */ (function () {
    function PQ_GetResLabourOverTimeDetail() {
        this.OverTimeLabourID = 0;
        this.OverTimeID = 0;
        this.LaborID = 0;
        this.LaborOverTimeTypeID = 0;
        this.StartDate = "";
        this.OverTimeHours = 0;
        this.OverTimeRate = 0;
        this.OTHourCost = 0;
        this.Remarks = "";
        this.Labor_Code = "";
        this.Labor_DescA = "";
        this.Labor_DescE = "";
        this.OTType_Code = "";
        this.OTType_DescA = "";
        this.OTType_DescE = "";
    }
    return PQ_GetResLabourOverTimeDetail;
}());
var PQ_GetResLabourAbsence = /** @class */ (function () {
    function PQ_GetResLabourAbsence() {
        this.AbsenceID = 0;
        this.TrNo = 0;
        this.TrDate = "";
        this.ProjectID = 0;
        this.SiteEngineerId = 0;
        this.FromDate = "";
        this.ToDate = "";
        this.Status = 0;
        this.Remarks = "";
        this.BraCode = 0;
        this.CompCode = 0;
        this.CreatedBy = "";
        this.CreatedAt = "";
        this.UpdatedBy = "";
        this.UpdatedAt = "";
        this.ScheduleId = 0;
        this.WorkDescr = "";
        this.StartDateTime = "";
        this.EndDateTime = "";
        this.Prj_ProjectCode = "";
        this.Prj_DescA = "";
        this.Prj_DescE = "";
        this.Phase_ProjectPhaseCode = "";
        this.Phase_DescA = "";
        this.Phase_DescE = "";
        this.schd_TrNo = 0;
    }
    return PQ_GetResLabourAbsence;
}());
var PQ_GetResLabourAbsenceDetail = /** @class */ (function () {
    function PQ_GetResLabourAbsenceDetail() {
        this.AbsenceLabourID = 0;
        this.AbsenceID = 0;
        this.LaborID = 0;
        this.LaborAbsenceTypeID = 0;
        this.StartDate = "";
        this.IsAbsence = false;
        this.AbsenceDays = 0;
        this.LateHours = 0;
        this.LateHourCost = 0;
        this.AbsDayCost = 0;
        this.Remarks = "";
        this.Labor_Code = "";
        this.Labor_DescA = "";
        this.Labor_DescE = "";
        this.AbsenceType_Code = "";
        this.AbsenceType_DescA = "";
        this.AbsenceType_DescE = "";
    }
    return PQ_GetResLabourAbsenceDetail;
}());
//End Resource Management Table 
//Start View Eng
var PQ_GetEngProjectActivity = /** @class */ (function () {
    function PQ_GetEngProjectActivity() {
        this.ProjectPhaseItemActivId = 0;
        this.ProjectPhaseItemId = 0;
        this.ProjectPhaseId = 0;
        this.ProjectID = 0;
        this.ActivityID = 0;
        this.Serial = 0;
        this.ContrQty = 0;
        this.ActivQty = 0;
        this.TotalProdQty = 0;
        this.SchedQty = 0;
        this.SchedProdQty = 0;
        this.SCon_Qty = 0;
        this.SConProdQty = 0;
        this.UnitPrice = 0;
        this.StdUnitPrice = 0;
        this.ProductionIncluded = false;
        this.Remarks = "";
        this.ProductionPrc = 0;
        this.EstimatedMaterial = 0;
        this.EstimatedLabor = 0;
        this.EstimatedEquip = 0;
        this.EstimatedProfit = 0;
        this.EstimatedOH = 0;
        this.EstimatedPOH = 0;
        this.StartDate = "";
        this.EndDate = "";
        this.RelProjectPhaseItemActivId = 0;
        this.RelationType = 0;
        this.RelationDelay = 0;
        this.act_ActivityCode = "";
        this.act_DescA = "";
        this.act_DescE = "";
        this.UOM_UomCode = "";
        this.UOM_DescA = "";
        this.UOM_DescE = "";
        this.ItemID = 0;
        this.Deuration = 0;
        this.LineCode = "";
        this.DailyProd = 0;
    }
    return PQ_GetEngProjectActivity;
}());
var PQ_GetSalesInvoice = /** @class */ (function () {
    function PQ_GetSalesInvoice() {
        this.InvoiceId = 0;
        this.TrNo = 0;
        this.TrDate = "";
        this.ProjectID = 0;
        this.ProjCode = "";
        this.BillCode = 0;
        this.FromDate = "";
        this.ToDate = "";
        this.WorkDiscription = "";
        this.TotalAmount = 0;
        this.DiscountPrc = 0;
        this.Discount = 0;
        this.VatAmount = 0;
        this.NetAmount = 0;
        this.CustomerID = 0;
        this.IsFinal = false;
        this.RefCode = "";
        this.Status = 0;
        this.Remarks = "";
        this.BraCode = 0;
        this.CompCode = 0;
        this.CreatedBy = "";
        this.CreatedAt = "";
        this.UpdatedBy = "";
        this.UpdatedAt = "";
        this.Proj_ProjectCode = "";
        this.Proj_DescA = "";
        this.Proj_DescL = "";
        this.Cust_CustomerCode = 0;
        this.Cust_DescA = "";
        this.Cust_DescE = "";
        this.VatPrc = 0;
        this.IsPosted = false;
        this.RetentionPrc = 0;
        this.RetentionAmount = 0;
        this.AdvDeduction = 0;
        this.AdvVatAmount = 0;
        this.TaxableAmount = 0;
        this.NetTax = 0;
        this.DueAmount = 0;
        this.IsDownpayment = false;
        this.UsedDownpayment = 0;
        this.RemainDownpayment = 0;
        this.TrTime = "";
        this.DocNo = "";
        this.DocUUID = "";
        this.InvoiceTypeCode = 0;
        this.InvoiceTransCode = 0;
        this.GlobalInvoiceCounter = 0;
        this.PrevInvoiceHash;
        this.QRCode;
        this.CryptographicStamp;
        this.AdvanceConsumPrc = 0;
    }
    return PQ_GetSalesInvoice;
}());
var PQ_GetSalesFillInvoiceProd = /** @class */ (function () {
    function PQ_GetSalesFillInvoiceProd() {
        this.Prod_TrNo = 0;
        this.Prod_TrDate = "";
        this.Prod_ProjectID = 0;
        this.Prod_FromDate = "";
        this.Prod_ToDate = "";
        this.Prod_IsFinal = false;
        this.Prod_RefCode = "";
        this.Prod_WorkDiscription = "";
        this.Itm_ItemCode = "";
        this.Itm_DescA = "";
        this.Itm_DescE = "";
        this.ProdQty = 0;
        this.UnitPrice = 0;
        this.total = 0;
        this.BilledQty = 0;
        this.ToBillQty = 0;
        this.Remarks = "";
        this.Prod_ProductionId = 0;
        this.ProductionDetailId = 0;
        this.ProductionId = 0;
        this.ProjectPhaseItemId = 0;
        this.ItemID = 0;
        this.LineCode = "";
    }
    return PQ_GetSalesFillInvoiceProd;
}());
var PQ_GetSalesInvoiceDetail = /** @class */ (function () {
    function PQ_GetSalesInvoiceDetail() {
        this.InvoiceId = 0;
        this.ProjectPhaseItemId = 0;
        this.UnitPrice = 0;
        this.BillQty = 0;
        this.Total = 0;
        this.Itm_ItemCode = "";
        this.Itm_DescA = "";
        this.Itm_DescE = "";
        this.ProjectPhaseId = 0;
        this.InvoiceDetailId = 0;
        this.LineCode = "";
        this.ItemQty = 0;
        this.PrevBillQty = 0;
        this.Serial = 0;
        this.Remarks = "";
        this.ProdQty = 0;
        this.UomCode = "";
        this.uom_DescA = "";
        this.Uom_DescE = "";
        this.ItemDiscountPrc = 0;
        this.ItemDiscountAmt = 0;
        this.NetUnitPrice = 0;
        this.ItemVatPrc = 0;
        this.ItemVatAmount = 0;
        this.ItemTotal = 0;
        this.ItemTotalAVat = 0;
        this.TotalItemNet = 0;
    }
    return PQ_GetSalesInvoiceDetail;
}());
var P_D_SalesCustomer = /** @class */ (function () {
    function P_D_SalesCustomer() {
        this.CustomerID = 0;
        this.CustomerCategoryID = 0;
        this.CustomerCode = 0;
        this.IsTemporary = false;
        this.DescA = "";
        this.DescE = "";
        this.GLAccountCode = "";
        this.ContactPerson = "";
        this.ContactTel = "";
        this.CustomerAddress = "";
        this.Tel1 = "";
        this.Tel2 = "";
        this.Fax = "";
        this.Mobile = "";
        this.Email = "";
        this.IsActive = false;
        this.CrNo = "";
        this.ChamberNo = "";
        this.VatNo = "";
        this.VatType = 0;
        this.SalesEngineerId = 0;
        this.BraCode = 0;
        this.Remarks = "";
        this.CompCode = 0;
        this.CreatedBy = "";
        this.CreatedAt = "";
        this.UpdatedBy = "";
        this.UpdatedAt = "";
        this.RefCode2 = "";
        this.RefCode1 = "";
        this.ISPersonal = false;
        this.ISVatRegistered = false;
        this.Address_postal = "";
        this.Address_Province = "";
        this.Address_Street = "";
        this.Address_Str_Additional = "";
        this.Address_BuildingNo = "";
        this.Address_Build_Additional = "";
        this.Address_City = "";
        this.Address_District = "";
    }
    return P_D_SalesCustomer;
}());
var PQ_GetSalesInvoiceProd = /** @class */ (function () {
    function PQ_GetSalesInvoiceProd() {
        this.Prod_TrNo = 0;
        this.Prod_TrDate = "";
        this.Prod_ProjectID = 0;
        this.Prod_FromDate = "";
        this.Prod_ToDate = "";
        this.Prod_IsFinal = false;
        this.Prod_RefCode = "";
        this.Prod_WorkDiscription = "";
        this.InvoiceId = 0;
        this.Itm_ItemCode = "";
        this.Itm_DescA = "";
        this.Itm_DescE = "";
        this.InvQty = 0;
        this.UnitPrice = 0;
        this.BilledQty = 0;
        this.ToBillQty = 0;
        this.Remarks = "";
        this.Prod_ProductionId = 0;
        this.InvoiceProdId = 0;
        this.InvoiceDetailId = 0;
        this.ProductionDetailId = 0;
        this.ProductionId = 0;
        this.ProjectPhaseItemId = 0;
        this.ItemID = 0;
        this.Total = 0;
        this.LineCode = "";
    }
    return PQ_GetSalesInvoiceProd;
}());
var PQ_SalesInvoiceDetail = /** @class */ (function () {
    function PQ_SalesInvoiceDetail() {
        this.InvoiceProdId = 0;
        this.InvoiceId = 0;
        this.ProjectPhaseItemId = 0;
        this.UnitPrice = 0;
        this.BillQty = 0;
        this.InvoiceDetailId = 0;
    }
    return PQ_SalesInvoiceDetail;
}());
var PQ_SrcSchdule = /** @class */ (function () {
    function PQ_SrcSchdule() {
        this.ScheduleId = 0;
        this.TrNo = 0;
        this.WorkDescr = "";
        this.ProjectID = 0;
        this.Prj_ProjectCode = "";
        this.Prj_DescE = "";
        this.Prj_DescA = "";
        this.ProjectPhaseId = 0;
        this.Phase_ProjectPhaseCode = "";
        this.Phase_DescA = "";
        this.Phase_DescE = "";
        this.SiteEngineerId = 0;
        this.Eng_EngCode = "";
        this.Eng_DescA = "";
        this.Eng_DescE = "";
        this.Status = 0;
        this.BraCode = 0;
        this.CompCode = 0;
    }
    return PQ_SrcSchdule;
}());
var PQ_GetResReqLabour = /** @class */ (function () {
    function PQ_GetResReqLabour() {
        this.RequestLabourId = 0;
        this.ScheduleId = 0;
        this.TrNo = 0;
        this.TrDate = "";
        this.Status = 0;
        this.Remarks = "";
        this.BraCode = 0;
        this.CompCode = 0;
        this.CreatedBy = "";
        this.CreatedAt = "";
        this.UpdatedBy = "";
        this.UpdatedAt = "";
        this.WorkDescr = "";
        this.ProjectID = 0;
        this.Prj_ProjectCode = "";
        this.Prj_DescE = "";
        this.Prj_DescA = "";
        this.ProjectPhaseId = 0;
        this.Phase_ProjectPhaseCode = "";
        this.Phase_DescA = "";
        this.Phase_DescE = "";
        this.SiteEngineerId = 0;
        this.Eng_EngCode = "";
        this.Eng_DescA = "";
        this.Eng_DescE = "";
    }
    return PQ_GetResReqLabour;
}());
var PQ_GETSalesItemActivity = /** @class */ (function () {
    function PQ_GETSalesItemActivity() {
        this.ItemsActivityId = 0;
        this.ItemID = 0;
        this.ActivityID = 0;
        this.ActQty = 0;
        this.IsProdIncluded = "";
        this.ProdPrc = 0;
        this.ActivityCode = "";
        this.ActDescA = "";
        this.ActDescE = "";
        this.puomcode = "";
        this.puomdescA = "";
        this.puomDescE = "";
        this.Act_StdUunitPrice = 0;
    }
    return PQ_GETSalesItemActivity;
}());
var P_D_SalesItemsActivity = /** @class */ (function () {
    function P_D_SalesItemsActivity() {
        this.ItemsActivityId = 0;
        this.ItemID = 0;
        this.ActivityID = 0;
        this.ActQty = 0;
        this.IsProdIncluded = "";
        this.ProdPrc = 0;
    }
    return P_D_SalesItemsActivity;
}());
var PQ_Sales_SrchOfferItem = /** @class */ (function () {
    function PQ_Sales_SrchOfferItem() {
        this.StageCode = 0;
        this.ItemCode = "";
        this.DescA = "";
        this.DescE = "";
        this.OfferItemId = 0;
        this.OfferID = 0;
    }
    return PQ_Sales_SrchOfferItem;
}());
var PQ_GetResRequestLaborDetails = /** @class */ (function () {
    function PQ_GetResRequestLaborDetails() {
        this.ScheduleLaborClassId = 0;
        this.ScheduleId = 0;
        this.LaborCLassID = 0;
        this.RequiredNo = 0;
        this.RequiredHrs = 0;
        this.HourCost = 0;
        this.ClassCode = "";
        this.DescA = "";
        this.DescE = "";
    }
    return PQ_GetResRequestLaborDetails;
}());
var PQ_GetResRequestLabours = /** @class */ (function () {
    function PQ_GetResRequestLabours() {
        this.RequestLabourId = 0;
        this.ScheduleId = 0;
        this.WorkDescr = "";
        this.StartDateTime = "";
        this.EndDateTime = "";
        this.TrNo = 0;
        this.TrDate = "";
        this.Status = 0;
        this.Remarks = "";
        this.BraCode = 0;
        this.CompCode = 0;
        this.CreatedBy = "";
        this.CreatedAt = "";
        this.UpdatedBy = "";
        this.UpdatedAt = "";
        this.ProjectPhaseId = 0;
        this.ProjectID = 0;
        this.Prj_ProjectCode = "";
        this.Prj_DescA = "";
        this.Prj_DescE = "";
        this.Prj_Status = 0;
        this.Phase_ProjectPhaseCode = "";
        this.Phase_DescA = "";
        this.schd_TrNo = 0;
        this.WorkHours = 0;
        this.OTHours = 0;
        this.CalHours = 0;
    }
    return PQ_GetResRequestLabours;
}());
var PQ_GetResLabourAssign = /** @class */ (function () {
    function PQ_GetResLabourAssign() {
        this.ScheduleLaborId = 0;
        this.ScheduleId = 0;
        this.LaborID = 0;
        this.AssigneDate = "";
        this.LeaveDate = "";
        this.ExpLeaveDate = "";
        this.HourCost = 0;
        this.Status = 0;
        this.LaborCode = "";
        this.DescA = "";
        this.DescE = "";
        this.LabourClass_ClassCode = "";
        this.LabourClass_DescA = "";
        this.LabourClass_DescE = "";
    }
    return PQ_GetResLabourAssign;
}());
var PProc_ResGetFreeLabor_Result = /** @class */ (function () {
    function PProc_ResGetFreeLabor_Result() {
        this.LaborID = 0;
        this.FreeDate = "";
        this.LaborClassId = 0;
        this.LaborCategoryId = 0;
        this.LaborCode = "";
        this.DescA = "";
        this.DescE = "";
        this.IsActive = false;
        this.BraCode = 0;
        this.CompCode = 0;
        this.ClassCode = "";
        this.class_descA = "";
        this.Class_DescE = "";
        this.CategCode = "";
        this.Cat_descA = "";
        this.Cat_DescE = "";
        this.HourCost = 0;
        this.BusyDate = "";
    }
    return PProc_ResGetFreeLabor_Result;
}());
var PQ_GetResRequestEquipment = /** @class */ (function () {
    function PQ_GetResRequestEquipment() {
        this.RequestEquipmentId = 0;
        this.ScheduleId = 0;
        this.TrNo = 0;
        this.TrDate = "";
        this.Status = 0;
        this.Remarks = "";
        this.BraCode = 0;
        this.CompCode = 0;
        this.CreatedBy = "";
        this.CreatedAt = "";
        this.UpdatedBy = "";
        this.UpdatedAt = "";
        this.ProjectPhaseId = 0;
        this.ProjectID = 0;
        this.EndDateTime = "";
        this.StartDateTime = "";
        this.WorkDescr = "";
        this.Prj_ProjectCode = "";
        this.Prj_DescA = "";
        this.Prj_DescE = "";
        this.Phase_ProjectPhaseCode = "";
        this.Phase_DescA = "";
        this.Phase_DescE = "";
    }
    return PQ_GetResRequestEquipment;
}());
var PQ_GetResEquipAssign = /** @class */ (function () {
    function PQ_GetResEquipAssign() {
        this.ScheduleEquipId = 0;
        this.ScheduleId = 0;
        this.EquimentID = 0;
        this.AssigneDate = "";
        this.LeaveDate = "";
        this.ExpLeaveDate = "";
        this.HourCost = 0;
        this.Status = 0;
        this.Equipcode = "";
        this.DescA = "";
        this.DescE = "";
        this.ClassCode = "";
        this.Class_DescA = "";
        this.Class_DescE = "";
    }
    return PQ_GetResEquipAssign;
}());
var PProc_EngMonitorScheduleEquip_Result = /** @class */ (function () {
    function PProc_EngMonitorScheduleEquip_Result() {
        this.eclass_calsscode = "";
        this.eclass_desca = "";
        this.eclass_desce = "";
        this.equipcode = "";
        this.desca = "";
        this.desce = "";
        this.schno = 0;
        this.assignedate = "";
        this.leavedate = "";
        this.expleavedate = "";
        this.status = 0;
        this.projectphasecode = "";
        this.projectcode = "";
        this.stat_desc = "";
    }
    return PProc_EngMonitorScheduleEquip_Result;
}());
var PProc_ResGetFreeEquip_Result = /** @class */ (function () {
    function PProc_ResGetFreeEquip_Result() {
        this.EquimentID = 0;
        this.FreeDate = "";
        this.EquipClassId = 0;
        this.EquipCode = "";
        this.DescA = "";
        this.DescE = "";
        this.IsActive = false;
        this.BraCode = 0;
        this.CompCode = 0;
        this.ClassCode = "";
        this.class_descA = "";
        this.Class_DescE = "";
        this.HourCost = 0;
    }
    return PProc_ResGetFreeEquip_Result;
}());
var PQ_GetResRequestMaterial = /** @class */ (function () {
    function PQ_GetResRequestMaterial() {
        this.RequestMaterialId = 0;
        this.ScheduleId = 0;
        this.SubServiceOrderId = 0;
        this.TrNo = 0;
        this.TrDate = "";
        this.Status = 0;
        this.Remarks = "";
        this.BraCode = 0;
        this.CompCode = 0;
        this.CreatedBy = "";
        this.CreatedAt = "";
        this.UpdatedBy = "";
        this.UpdatedAt = "";
        this.So_TrNo = 0;
        this.So_DescA = "";
        this.So_DescE = "";
        this.WorkDescr = "";
        this.Prj_ProjectCode = "";
        this.Prj_DescE = "";
        this.Prj_DescA = "";
        this.Phase_ProjectPhaseCode = "";
        this.Phase_DescA = "";
        this.Phase_DescE = "";
        this.Eng_EngCode = "";
        this.Eng_DescA = "";
        this.Eng_DescE = "";
        this.RequestedBy = "";
        this.ApprovedBy = "";
        this.SchduleTrNo = 0;
    }
    return PQ_GetResRequestMaterial;
}());
var PQ_GetResRequestMaterialDetails = /** @class */ (function () {
    function PQ_GetResRequestMaterialDetails() {
        this.RequestMaterialDetailId = 0;
        this.RequestMaterialId = 0;
        this.ItemId = 0;
        this.SchedQty = 0;
        this.ReqBeforeQty = 0;
        this.RequiredQty = 0;
        this.ReqQty = 0;
        this.IssuedQty = 0;
        this.ReturnQty = 0;
        this.Remarks = "";
        this.BalanceQty = 0;
        this.itm_ItemCode = "";
        this.itm_DescA = "";
        this.itm_DescL = "";
        this.Uom_UomCode = "";
        this.Uom_DescA = "";
        this.Uom_DescE = "";
    }
    return PQ_GetResRequestMaterialDetails;
}());
var PQ_SearchSchduleMaterial = /** @class */ (function () {
    function PQ_SearchSchduleMaterial() {
        this.ScheduleMaterialId = 0;
        this.ScheduleId = 0;
        this.SubServiceOrderId = 0;
        this.ItemId = 0;
        this.SchedQty = 0;
        this.ReqQty = 0;
        this.IssuedQty = 0;
        this.ReturnQty = 0;
        this.itm_ItemCode = "";
        this.itm_DescA = "";
        this.itm_DescL = "";
        this.uom_UomCode = "";
        this.uom_DescA = "";
        this.uom_DescE = "";
    }
    return PQ_SearchSchduleMaterial;
}());
var PQ_GetResMaterialIssue = /** @class */ (function () {
    function PQ_GetResMaterialIssue() {
        this.IssueMaterialId = 0;
        this.RequestMaterialId = 0;
        this.ScheduleId = 0;
        this.SubServiceOrderId = 0;
        this.TrNo = 0;
        this.TrDate = "";
        this.ProjectID = 0;
        this.ProjectPhaseID = 0;
        this.Status = 0;
        this.Remarks = "";
        this.BraCode = 0;
        this.CompCode = 0;
        this.CreatedBy = "";
        this.CreatedAt = "";
        this.UpdatedBy = "";
        this.UpdatedAt = "";
        this.StoreID = 0;
        this.ReqMat_TrNo = 0;
        this.So_TrNo = 0;
        this.So_DescA = "";
        this.So_DescE = "";
        this.WorkDescr = "";
        this.Prj_ProjectCode = "";
        this.Prj_DescE = "";
        this.Prj_DescA = "";
        this.Phase_ProjectPhaseCode = "";
        this.Phase_DescA = "";
        this.Phase_DescE = "";
        this.SchduleTrNo = 0;
    }
    return PQ_GetResMaterialIssue;
}());
var PQ_GetResMaterialIssueDetails = /** @class */ (function () {
    function PQ_GetResMaterialIssueDetails() {
        this.RequestMaterialDetailId = 0;
        this.IssueMaterialId = 0;
        this.ItemId = 0;
        this.RemainQty = 0;
        this.AvailableQty = 0;
        this.UnitCost = 0;
        this.IssuedQty = 0;
        this.itm_ItemCode = "";
        this.itm_DescA = "";
        this.itm_DescE = "";
        this.uom_UomCode = "";
        this.uom_DescA = "";
        this.uom_DescE = "";
        this.Total = 0;
    }
    return PQ_GetResMaterialIssueDetails;
}());
var PQ_GetResMaterialReturned = /** @class */ (function () {
    function PQ_GetResMaterialReturned() {
        this.ReturnMaterialId = 0;
        this.RequestMaterialId = 0;
        this.ScheduleId = 0;
        this.SubServiceOrderId = 0;
        this.TrNo = 0;
        this.TrDate = "";
        this.ProjectID = 0;
        this.ProjectPhaseID = 0;
        this.Status = 0;
        this.Remarks = "";
        this.BraCode = 0;
        this.CompCode = 0;
        this.CreatedBy = "";
        this.CreatedAt = "";
        this.UpdatedBy = "";
        this.UpdatedAt = "";
        this.StoreID = 0;
        this.ReqMat_TrNo = 0;
        this.Prj_ProjectCode = "";
        this.Prj_DescE = "";
        this.Prj_DescA = "";
        this.Phase_ProjectPhaseCode = "";
        this.Phase_DescA = "";
        this.Phase_DescE = "";
        this.So_TrNo = 0;
        this.SchduleTrNo = 0;
    }
    return PQ_GetResMaterialReturned;
}());
var PQ_GetResMaterialReturnedDetails = /** @class */ (function () {
    function PQ_GetResMaterialReturnedDetails() {
        this.RequestMaterialDetailId = 0;
        this.ReturnMaterialId = 0;
        this.ItemId = 0;
        this.NetIssuedQty = 0;
        this.ReturndQty = 0;
        this.UnitCost = 0;
        this.itm_ItemCode = "";
        this.itm_DescA = "";
        this.itm_DescL = "";
        this.uom_UomCode = "";
        this.uom_DescA = "";
        this.uom_DescE = "";
        this.Total = 0;
    }
    return PQ_GetResMaterialReturnedDetails;
}());
var PPrc_Res_MaterialRequired_Result = /** @class */ (function () {
    function PPrc_Res_MaterialRequired_Result() {
        this.ItemCode = "";
        this.DescA = "";
        this.DescL = "";
        this.NetReqQty = 0;
        this.ItemCost = 0;
        this.NetIssQty = 0;
        this.NetIssCost = 0;
        this.RemainQty = 0;
    }
    return PPrc_Res_MaterialRequired_Result;
}());
var PQ_GetResRequestMaterialMontoring = /** @class */ (function () {
    function PQ_GetResRequestMaterialMontoring() {
        this.RequestMaterialId = 0;
        this.ScheduleId = 0;
        this.SubServiceOrderId = 0;
        this.TrNo = 0;
        this.TrDate = "";
        this.Status = 0;
        this.RequestMaterialDetailId = 0;
        this.ItemId = 0;
        this.SchedQty = 0;
        this.ReqBeforeQty = 0;
        this.RequiredQty = 0;
        this.ReqQty = 0;
        this.IssuedQty = 0;
        this.ReturnQty = 0;
        this.Remarks = "";
        this.BalanceQty = 0;
        this.itm_ItemCode = "";
        this.itm_DescA = "";
        this.itm_DescL = "";
        this.uom_UomCode = "";
        this.uom_DescA = "";
        this.uom_DescE = "";
    }
    return PQ_GetResRequestMaterialMontoring;
}());
//
var PQ_GetEngVariation = /** @class */ (function () {
    function PQ_GetEngVariation() {
        this.VariationId = 0;
        this.TrNo = 0;
        this.TrDate = "";
        this.ProjectPhaseId = 0;
        this.ProjectID = 0;
        this.RefNo = "";
        this.RefDate = "";
        this.VariationValue = 0;
        this.VariationDescr = "";
        this.Status = false;
        this.IsSalesApprove = false;
        this.Remarks = "";
        this.BraCode = 0;
        this.CompCode = 0;
        this.CreatedBy = "";
        this.CreatedAt = "";
        this.UpdatedBy = "";
        this.UpdatedAt = "";
        this.Proj_ProjectCode = "";
        this.Proj_DescA = "";
        this.Proj_DescL = "";
    }
    return PQ_GetEngVariation;
}());
var PQ_GetEngVariationActivity = /** @class */ (function () {
    function PQ_GetEngVariationActivity() {
        this.VariationActivId = 0;
        this.ProjectPhaseId = 0;
        this.VariationItemId = 0;
        this.ProjectPhaseItemActivId = 0;
        this.ActivityID = 0;
        this.IsNew = false;
        this.Old_ActivQty = 0;
        this.ActivQty = 0;
        this.UnitPrice = 0;
        this.StdUnitPrice = 0;
        this.OldProductionPrc = 0;
        this.ProductionPrc = 0;
        this.Remarks = "";
        this.EstimatedMaterial = 0;
        this.EstimatedLabor = 0;
        this.EstimatedEquip = 0;
        this.EstimatedProfit = 0;
        this.Act_ActivityCode = "";
        this.Act_DescA = "";
        this.Act_DescE = "";
        this.uom_UomCode = "";
        this.uom_DescA = "";
        this.uom_DescE = "";
        this.VariationId = 0;
        this.OldEffItemQty = 0;
        this.NewEffItemQty = 0;
        this.TotProdQty = 0;
        this.UnderProdQty = 0;
    }
    return PQ_GetEngVariationActivity;
}());
var PQ_GetEngVariationItem = /** @class */ (function () {
    function PQ_GetEngVariationItem() {
        this.VariationItemId = 0;
        this.VariationId = 0;
        this.IsNew = false;
        this.ProjectPhaseItemId = 0;
        this.ItemID = 0;
        this.UnitPrice = 0;
        this.OrgItemQty = 0;
        this.ItemQty = 0;
        this.LineCode = "";
        this.DescA = "";
        this.DescE = "";
        this.Remarks = "";
        this.EstimatedMaterial = 0;
        this.EstimatedLabor = 0;
        this.EstimatedEquip = 0;
        this.EstimatedProfit = 0;
        this.itm_ItemCode = "";
        this.itm_DescA = "";
        this.itm_DescL = "";
        this.itm_TechDescA = "";
        this.itm_TechDescL = "";
        this.uom_UomCode = "";
        this.uom_DescA = "";
        this.uom_DescE = "";
        this.Diff = 0;
        this.Total = 0;
        this.BilledQty = 0;
        this.ProdQty = 0;
        this.ProgressQty = 0;
    }
    return PQ_GetEngVariationItem;
}());
var PProc_ResGetMaterialissueReturn_Result = /** @class */ (function () {
    function PProc_ResGetMaterialissueReturn_Result() {
        this.ScheduleId = 0;
        this.SubServiceOrderId = 0;
        this.ReqTrNo = 0;
        this.TrDate = "";
        this.req_status = "";
        this.Issue_no = 0;
        this.Ret_No = 0;
        this.Tr_Date = "";
        this.tr_status = "";
    }
    return PProc_ResGetMaterialissueReturn_Result;
}());
var PProc_Eng_BudgetEngineer_Result = /** @class */ (function () {
    function PProc_Eng_BudgetEngineer_Result() {
        this.ProjectCode = "";
        this.ProjectPhaseCode = "";
        this.PhaseValue = 0;
        this.Bud01 = 0;
        this.Bud02 = 0;
        this.Bud03 = 0;
        this.Bud04 = 0;
        this.Bud05 = 0;
        this.Bud06 = 0;
        this.Bud07 = 0;
        this.Bud08 = 0;
        this.Bud09 = 0;
        this.Bud10 = 0;
        this.Bud11 = 0;
        this.Bud12 = 0;
        this.ACT01 = 0;
        this.ACT02 = 0;
        this.ACT03 = 0;
        this.ACT04 = 0;
        this.ACT05 = 0;
        this.ACT06 = 0;
        this.ACT07 = 0;
        this.ACT08 = 0;
        this.ACT09 = 0;
        this.ACT10 = 0;
        this.ACT11 = 0;
        this.ACT12 = 0;
        this.Bud00 = 0;
        this.ACT00 = 0;
        this.ActYTD = 0;
        this.BudYTD = 0;
    }
    return PProc_Eng_BudgetEngineer_Result;
}());
var PProc_Eng_BudgetEngineerActiv_Result = /** @class */ (function () {
    function PProc_Eng_BudgetEngineerActiv_Result() {
        this.ProjectPhaseItemActivId = 0;
        this.ProjectPhaseId = 0;
        this.ProjectID = 0;
        this.ActivityID = 0;
        this.budjetid = 0;
        this.BudVal = 0;
        this.ProjectCode = "";
        this.ActualQty = 0;
        this.BudgetQty = 0;
        this.ActVal = 0;
        this.ActivQty = 0;
        this.ActTotalValue = 0;
        this.ActivityCode = "";
        this.DESCE = "";
        this.DescA = "";
        this.PeriodCode = 0;
        this.projectphasecode = "";
        this.ActYTD = 0;
        this.BudYTD = 0;
        this.PM_ActualQty = 0;
        this.PM_BudgetQty = 0;
    }
    return PProc_Eng_BudgetEngineerActiv_Result;
}());
var P_G_Budget = /** @class */ (function () {
    function P_G_Budget() {
        this.BudjetID = 0;
        this.PeriodID = 0;
        this.YearID = 0;
        this.PeriodCode = 0;
        this.BranchCode = 0;
        this.SiteEngineerId = 0;
        this.ProjectPhaseItemActivId = 0;
        this.BudgetQty = 0;
        this.ActualQty = 0;
    }
    return P_G_Budget;
}());
var GQ_GetUserModule = /** @class */ (function () {
    function GQ_GetUserModule() {
        this.USER_CODE = "";
        this.SYSTEM_CODE = "";
        this.SUB_SYSTEM_CODE = "";
        this.MODULE_CODE = "";
        this.EXECUTE = false;
        this.CREATE = false;
        this.EDIT = false;
        this.DELETE = false;
        this.PRINT = false;
        this.VIEW = false;
        this.CUSTOM1 = false;
        this.CUSTOM2 = false;
        this.CUSTOM3 = false;
        this.CUSTOM4 = false;
        this.CUSTOM5 = false;
        this.CUSTOM6 = false;
        this.CUSTOM7 = false;
        this.CUSTOM8 = false;
        this.CUSTOM9 = false;
        this.ViewImages = false;
        this.EditImages = false;
        this.MENU_NO = "";
        this.MODULE_DESCE = "";
        this.MODULE_DESCA = "";
        this.M_CREATE = false;
        this.M_EDIT = false;
        this.M_DELETE = false;
        this.M_VIEW = false;
        this.M_PRINT = false;
        this.M_CUSTOM1 = false;
        this.M_CUSTOM2 = false;
        this.M_CUSTOM3 = false;
        this.M_CUSTOM4 = false;
        this.M_CUSTOM5 = false;
        this.M_CUSTOM6 = false;
        this.M_CUSTOM7 = false;
        this.M_CUSTOM8 = false;
        this.M_CUSTOM9 = false;
        this.CUSTOM1_DESC = "";
        this.CUSTOM2_DESC = "";
        this.CUSTOM3_DESC = "";
        this.CUSTOM4_DESC = "";
        this.CUSTOM5_DESC = "";
        this.CUSTOM6_DESC = "";
        this.CUSTOM7_DESC = "";
        this.CUSTOM8_DESC = "";
        this.CUSTOM9_DESC = "";
        this.AVAILABLE = false;
        this.M_images_enabled = false;
    }
    return GQ_GetUserModule;
}());
var PProc_EngVariationLoadItem_Result = /** @class */ (function () {
    function PProc_EngVariationLoadItem_Result() {
        this.ProjectID = 0;
        this.ProjectPhaseItemId = 0;
        this.ProjectPhaseId = 0;
        this.ProjectID = 0;
        this.OfferItemId = 0;
        this.LineCode = "";
        this.ItemID = 0;
        this.ContrQty = 0;
        this.ItemQty = 0;
        this.ProdQty = 0;
        this.BilledQty = 0;
        this.UnitPrice = 0;
        this.StdUnitPrice = 0;
        this.IsOfferItem = false;
        this.ProductionType = false;
        this.SlsITm_ItemCode = "";
        this.SlsITm_DescA = "";
        this.SlsITm_DescE = "";
        this.ScopeID = 0;
        this.UomCode = "";
        this.ProgQty = "";
    }
    return PProc_EngVariationLoadItem_Result;
}());
var PQ_GetSalesCustomerDoc = /** @class */ (function () {
    function PQ_GetSalesCustomerDoc() {
        this.CustomerDocID = 0;
        this.CustomerId = 0;
        this.CusIDTypeCode = 0;
        this.IDNo = "";
        this.IDIssuePlace = "";
        this.IDIssueDateH = "";
        this.IDIssueDate = "";
        this.IDExpireDate = "";
        this.IDExpireDateH = "";
        this.Doc_DescA = "";
        this.Doc_DescE = "";
        this.Doc_StdCode = "";
    }
    return PQ_GetSalesCustomerDoc;
}());
var P_D_SalesCustomerDoc = /** @class */ (function () {
    function P_D_SalesCustomerDoc() {
        this.CustomerDocID = 0;
        this.CustomerId = 0;
        this.CusIDTypeCode = 0;
        this.IDNo = "";
        this.IDIssuePlace = "";
        this.IDIssueDate = "";
        this.IDIssueDateH = "";
        this.IDExpireDate = "";
        this.IDExpireDateH = "";
        this.StatusFlag = "";
    }
    return P_D_SalesCustomerDoc;
}());
var Proc_prnt_sls_invoice_results = /** @class */ (function () {
    function Proc_prnt_sls_invoice_results() {
        this.Comp = 0;
        this.CompNameA = "";
        this.CompNameE = "";
        this.BraNameA = "";
        this.BraNameE = "";
        this.LoginUser = "";
        this.PrintDate = "";
        this.QRStr = "";
        this.InvoiceId = 0;
        this.BillCode = 0;
        this.TrNo = 0;
        this.TrDate = "";
        this.TrTime = "";
        this.ProjCode = "";
        this.TotalAmount = 0;
        this.Discount = 0;
        this.DiscountPrc = 0;
        this.VatAmount = 0;
        this.NetAmount = 0;
        this.NetAfterVat = 0;
        this.ProjectCode = "";
        this.Proj_DescA = "";
        this.Proj_DescE = "";
        this.Cust_Code = 0;
        this.Cust_DescA = "";
        this.Cust_DescE = "";
        this.FromDate = "";
        this.ToDate = "";
        this.WorkDiscription = "";
        this.TR_Status = "";
        this.inv_HDE = "";
        this.inv_HDA = "";
        this.RefCode = "";
        this.Remarks = "";
        this.Serial = 0;
        this.LineCode = "";
        this.Itm_ItemCode = "";
        this.ItemQty = 0;
        this.PrevBillQty = 0;
        this.BillQty = 0;
        this.UnitPrice = 0;
        this.ItemDiscountPrc = 0;
        this.ItemDiscountAmt = 0;
        this.NetUnitPrice = 0;
        this.ItemVatPrc = 0;
        this.ItemVatAmount = 0;
        this.Line_Total = 0;
        this.ItemTotalAVat = 0;
        this.Line_Remark = "";
        this.Itm_DescA = "";
        this.Itm_DescE = "";
        this.Cust_Contact = "";
        this.Cust_VatNo = "";
        this.Cust_RefCode2 = "";
        this.Cust_RefCode1 = "";
        this.Cust_ISPersonal = "";
        this.Cust_ISVatRegistered = false;
        this.Cust_Address_postal = "";
        this.Cust_Address_Province = "";
        this.Cust_Address_Street = "";
        this.Cust_Address_Str_Additional = "";
        this.Cust_Address_BuildingNo = "";
        this.Cust_Address_Build_Additional = "";
        this.Cust_Address_City = "";
        this.Cust_Address_District = "";
        this.ContractDate = "";
        this.ContractPrice = 0;
        this.ContractAdditions = 0;
        this.LblVatPRE = "";
        this.LblVatPRA = "";
        this.UomCode = "";
        this.UomDescA = "";
        this.UomDescE = "";
        this.Comp_VatNo = "";
        this.BankAccNo = "";
        this.BNKNameA = "";
        this.BNKNameE = "";
        this.CityNameA = "";
        this.CityNameE = "";
        this.ContractRefNo = "";
        this.EngCode = "";
        this.Eng_nameA = "";
        this.Eng_nameE = "";
        this.VatPrc = 0;
        this.RetentionPrc = 0;
        this.WarnteeAmount = 0;
        this.DownAmount = 0;
        this.AdvVatAmount = 0;
        this.TaxableAmount = 0;
        this.NetTax = 0;
        this.TotalDue = 0;
        this.IsDownpayment = false;
        this.UsedDownpayment = 0;
        this.RemainDownpayment = 0;
        this.BRA_CODE = 0;
        this.BRA_DESC = "";
        this.BRA_DESCL = "";
        this.BRA_Address_postal = "";
        this.BRA_Address_Province = "";
        this.BRA_Address_Street = "";
        this.BRA_Address_Str_Additional = "";
        this.BRA_Address_BuildingNo = "";
        this.BRA_Address_Build_Additional = "";
        this.BRA_Address_City = "";
        this.BRA_Address_District = "";
        this.DocNo = "";
        this.DocUUID = "";
        this.InvoiceTypeCode = 0;
        this.InvoiceTransCode = 0;
        this.GlobalInvoiceCounter = 0;
        this.QRCode = "";
        this.AdvanceConsumPrc = 0;
        this.ContractCode = "";
    }
    return Proc_prnt_sls_invoice_results;
}());
var Mytime = /** @class */ (function () {
    function Mytime() {
        this.Days = 0;
        this.Hours = 0;
        this.Milliseconds = 0;
        this.Minutes = 0;
        this.Seconds = 0;
        this.Tiks = 0;
        this.TotalDays = 0;
        this.TotalHours = 0;
        this.TotalMilliseconds = 0;
        this.TotalMinutes = 0;
        this.TotalSeconds = 0;
    }
    return Mytime;
}());
var P_D_Status = /** @class */ (function () {
    function P_D_Status() {
        this.ID = 0;
        this.StatusType = "";
        this.StatusCode = 0;
        this.DescA = "";
        this.DescE = "";
        this.securityControl = "";
        this.Remarks = "";
    }
    return P_D_Status;
}());
//class PQ_GetSalesDbCr {
//    constructor() {
//        this.invoiceId=0;
//        this.trNo= null;
//        this.trDate="";
//        this.projectID=null;
//        this.projCode="";
//        this.fromDate = "";
//        this.toDate = "";
//        this.workDiscription="";
//        this.totalAmount=0;
//        this.discountPrc= 0;
//        this.discount= 0;
//        this.vatAmount=0;
//        this.netAmount=0;
//        this.customerID=null;
//        this.refCode="";
//        this.status=0;
//        this.remarks="";
//        this.braCode=0;
//        this.compCode=0;
//        this.createdBy="";
//        this.createdAt = "";
//        this.updatedBy="";
//        this.updatedAt = "";
//        this.proj_ProjectCode="";
//        this.proj_DescA="";
//        this.proj_DescL="";
//        this.cust_CustomerCode=null;
//        this.cust_DescA="";
//        this.cust_DescE="";
//        this.vatPrc=0;
//        this.isPosted=false;
//        this.trTime = "";
//        this.docNo="";
//        this.docUUID="";
//        this.invoiceTypeCode= null;
//        this.invoiceTransCode= null;
//        this.globalInvoiceCounter=null;
//        this.prevInvoiceHash="";
//        this.qRCode="";
//        this.cryptographicStamp="";
//        this.trType=null;
//        this.dbReason=null;
//        this.refInvoiceid=null;
//        this.postRef="";
//        this.inv_TrNo=null;
//        this.inv_TrDate="";
//        this.inv_DocNo="";
//    }
//    public invoiceId: number;
//    public trNo: number | null;
//    public trDate: string | null;
//    public projectID: number | null;
//    public projCode: string;
//    public fromDate: string | null;
//    public toDate: string | null;
//    public workDiscription: string;
//    public totalAmount: number | null;
//    public discountPrc: number | null;
//    public discount: number | null;
//    public vatAmount: number | null;
//    public netAmount: number | null;
//    public customerID: number | null;
//    public refCode: string;
//    public status: number | null;
//    public remarks: string;
//    public braCode: number | null;
//    public compCode: number | null;
//    public createdBy: string;
//    public createdAt: string | null;
//    public updatedBy: string;
//    public updatedAt: string | null;
//    public proj_ProjectCode: string;
//    public proj_DescA: string;
//    public proj_DescL: string;
//    public cust_CustomerCode: number | null;
//    public cust_DescA: string;
//    public cust_DescE: string;
//    public vatPrc: number | null;
//    public isPosted: boolean | null;
//    public trTime: string | null;
//    public docNo: string;
//    public docUUID: string;
//    public invoiceTypeCode: number | null;
//    public invoiceTransCode: number | null;
//    public globalInvoiceCounter: number | null;
//    public prevInvoiceHash: string;
//    public qRCode: string;
//    public cryptographicStamp: string;
//    public trType: number | null;
//    public dbReason: number | null;
//    public refInvoiceid: number | null;
//    public postRef: string;
//    public inv_TrNo: number | null;
//    public inv_TrDate: string | null;
//    public inv_DocNo: string;
//}
//class PQ_GetSalesDbCrDetail {
//     public invoiceId: number | null;
//     public projectPhaseItemId: number | null;
//     public unitPrice: number | null;
//     public billQty: number | null;
//     public itm_ItemCode: string;
//     public itm_DescA: string;
//     public itm_DescE: string;
//     public projectPhaseId: number | null;
//     public invoiceDetailId: number;
//     public lineCode: string;
//     public itemQty: number | null;
//     public serial: number | null;
//     public remarks: string;
//     public uomCode: string;
//     public uom_DescA: string;
//     public uom_DescE: string;
//     public itemVatPrc: number | null;
//     public itemVatAmount: number | null;
//     public itemTotal: number | null;
//     public itemTotalAVat: number | null;
//     public invSerial: number | null;
//     public diffQty: number | null;
//     public diffPrice: number | null;
//     public invDiscountPrc: number | null;
//     public invDiscountAmt: number | null;
//     public diffPricePrc: number | null;
//}
//class P_TR_SalesDbCrDetail {
//    public invoiceDetailId: number|0;
//    public invoiceId: number | 0;
//    public serial: number | null;
//    public invSerial: number | null;
//    public projectPhaseItemId: number | null;
//    public billQty: number | 0;
//    public unitPrice: number | 0;
//    public diffQty: number | 0;
//    public diffPrice: number | 0;
//    public remarks: string;
//    public invDiscountPrc: number | 0;
//    public invDiscountAmt: number | 0;
//    public diffPricePrc: number | 0;
//    public itemTotal: number | 0;
//    public itemVatPrc: number | 0;
//    public itemVatAmount: number | 0;
//    public itemTotalAVat: number | 0;
//}
//class P_TR_SalesDbCr {
//    public invoiceId: number|0;
//    public trType: number | null;
//    public dbReason: number | null;
//    public refInvoiceid: number | null;
//    public trNo: number | 0;
//    public trDate: string | "";
//    public projectID: number | null;
//    public projCode: string;
//    public fromDate: string | null;
//    public toDate: string | null;
//    public workDiscription: string;
//    public totalAmount: number | null;
//    public discountPrc: number | null;
//    public discount: number | null;
//    public vatAmount: number | null;
//    public netAmount: number | null;
//    public customerID: number | null;
//    public refCode: string;
//    public status: number | 0;
//    public remarks: string;
//    public braCode: number | null;
//    public compCode: number | null;
//    public createdBy: string;
//    public createdAt: string | null;
//    public updatedBy: string;
//    public updatedAt: string | null;
//    public isPosted: boolean | false;
//    public postRef: string;
//    public vatPrc: number | null;
//    public trTime: string | null;
//    public docNo: string;
//    public docUUID: string;
//    public invoiceTypeCode: number | null;
//    public invoiceTransCode: number | null;
//    public globalInvoiceCounter: number | null;
//    public prevInvoiceHash: string;
//    public qRCode: string;
//    public cryptographicStamp: string;
//}
var P_TR_SalesDbCr = /** @class */ (function () {
    function P_TR_SalesDbCr() {
        this.InvoiceId = 0;
        this.TrType = 0;
        this.DbReason = 0;
        this.RefInvoiceid = 0;
        this.TrNo = 0;
        this.TrDate = "";
        this.ProjectID = 0;
        this.ProjCode = "";
        this.FromDate = "";
        this.ToDate = "";
        this.WorkDiscription = "";
        this.TotalAmount = 0;
        this.DiscountPrc = 0;
        this.Discount = 0;
        this.VatAmount = 0;
        this.NetAmount = 0;
        this.CustomerID = 0;
        this.RefCode = "";
        this.Status = 0;
        this.Remarks = "";
        this.BraCode = 0;
        this.CompCode = 0;
        this.CreatedBy = "";
        this.CreatedAt = "";
        this.UpdatedBy = "";
        this.UpdatedAt = "";
        this.IsPosted = false;
        this.PostRef = "";
        this.VatPrc = 0;
        this.TrTime = "";
        this.DocNo = "";
        this.DocUUID = "";
        this.InvoiceTypeCode = 0;
        this.InvoiceTransCode = 0;
        this.GlobalInvoiceCounter = 0;
        this.PrevInvoiceHash;
        this.QRCode;
        this.CryptographicStamp;
        this.AdvDeduction = 0;
        this.AdvVatAmount = 0;
        this.TaxableAmount = 0;
        this.NetTax = 0;
    }
    return P_TR_SalesDbCr;
}());
var P_TR_SalesDbCrDetail = /** @class */ (function () {
    function P_TR_SalesDbCrDetail() {
        this.InvoiceDetailId = 0;
        this.InvoiceId = 0;
        this.Serial = 0;
        this.InvSerial = 0;
        this.ProjectPhaseItemId = 0;
        this.BillQty = 0;
        this.UnitPrice = 0;
        this.DiffQty = 0;
        this.DiffPrice = 0;
        this.Remarks = "";
        this.InvDiscountPrc = 0;
        this.InvDiscountAmt = 0;
        this.DiffPricePrc = 0;
        this.ItemTotal = 0;
        this.ItemVatPrc = 0;
        this.ItemVatAmount = 0;
        this.ItemTotalAVat = 0;
    }
    return P_TR_SalesDbCrDetail;
}());
var PQ_GetSalesDbCr = /** @class */ (function () {
    function PQ_GetSalesDbCr() {
        this.InvoiceId = 0;
        this.TrNo = 0;
        this.TrDate = "";
        this.ProjectID = 0;
        this.ProjCode = "";
        this.FromDate = "";
        this.ToDate = "";
        this.WorkDiscription = "";
        this.TotalAmount = 0;
        this.DiscountPrc = 0;
        this.Discount = 0;
        this.VatAmount = 0;
        this.NetAmount = 0;
        this.CustomerID = 0;
        this.RefCode = "";
        this.Status = 0;
        this.Remarks = "";
        this.BraCode = 0;
        this.CompCode = 0;
        this.CreatedBy = "";
        this.CreatedAt = "";
        this.UpdatedBy = "";
        this.UpdatedAt = "";
        this.Proj_ProjectCode = "";
        this.Proj_DescA = "";
        this.Proj_DescL = "";
        this.Cust_CustomerCode = 0;
        this.Cust_DescA = "";
        this.Cust_DescE = "";
        this.VatPrc = 0;
        this.IsPosted = false;
        this.TrTime = "";
        this.DocNo = "";
        this.DocUUID = "";
        this.InvoiceTypeCode = 0;
        this.InvoiceTransCode = 0;
        this.GlobalInvoiceCounter = 0;
        this.PrevInvoiceHash;
        this.QRCode;
        this.CryptographicStamp;
        this.TrType = 0;
        this.DbReason = 0;
        this.RefInvoiceid = 0;
        this.PostRef = "";
        this.inv_TrNo = 0;
        this.inv_TrDate = "";
        this.inv_DocNo = "";
        this.AdvDeduction = 0;
        this.AdvVatAmount = 0;
        this.TaxableAmount = 0;
        this.NetTax = 0;
    }
    return PQ_GetSalesDbCr;
}());
var PQ_GetSalesDbCrDetail = /** @class */ (function () {
    function PQ_GetSalesDbCrDetail() {
        this.InvoiceId = 0;
        this.ProjectPhaseItemId = 0;
        this.UnitPrice = 0;
        this.BillQty = 0;
        this.Itm_ItemCode = "";
        this.Itm_DescA = "";
        this.Itm_DescE = "";
        this.ProjectPhaseId = 0;
        this.InvoiceDetailId = 0;
        this.LineCode = "";
        this.ItemQty = 0;
        this.Serial = 0;
        this.Remarks = "";
        this.UomCode = "";
        this.uom_DescA = "";
        this.Uom_DescE = "";
        this.ItemVatPrc = 0;
        this.ItemVatAmount = 0;
        this.ItemTotal = 0;
        this.ItemTotalAVat = 0;
        this.InvSerial = 0;
        this.DiffQty = 0;
        this.DiffPrice = 0;
        this.InvDiscountPrc = 0;
        this.InvDiscountAmt = 0;
        this.DiffPricePrc = 0;
        this.ItemTotalprice = 0;
    }
    return PQ_GetSalesDbCrDetail;
}());
//# sourceMappingURL=Entities.js.map