abstract class EntityContext {
    public RowIndex: number;
}
class FavModules {
    public MODULE_DESCA: string;
    public MODULE_CODE: string;
    public MODULE_DESCE: string;
}
class SystemParameters {
    public Defaultlanguage: string;
    public DefaultYear: string;
    public CompanyEnglishDescription: string;
    public CompanyCode: string;
}
class SessionRecord {
    private SetClientSession(key: string, value: string) {
        $.ajax({
            url: Url.Action("SetSessionRecordValue", "Session"),
            data: { propertyName: key, value: value },
            async: false
        });
        //let data: string = value;
        //sessionStorage.setItem(key, value);
    }
    private GetClientSession(key: string): string {

        let value = $.ajax({
            url: Url.Action("GetSessionRecordValue", "Session"),
            data: { propertyName: key },
            async: false
        }).responseJSON.result;
        //value = sessionStorage.getItem(key);
        return value;
    }

    public set SystemCode(value: string) {
        this.SetClientSession("SystemCode", value);
    }
    public get SystemCode(): string {
        return this.GetClientSession("SystemCode");
    }

    public set SubSystemCode(value: string) {
        this.SetClientSession("SubSystemCode", value);
    }
    public get SubSystemCode(): string {
        return this.GetClientSession("SubSystemCode");
    }

    public set Modulecode(value: string) {
        this.SetClientSession("Modulecode", value);
    }
    public get Modulecode(): string {
        return this.GetClientSession("Modulecode");
    }

    public set UserCode(value: string) {
        this.SetClientSession("UserCode", value);
    }
    public get UserCode(): string {
        return this.GetClientSession("UserCode");
    }

    public set CompCode(value: string) {
        this.SetClientSession("CompCode", value);
    }
    public get CompCode(): string {
        return this.GetClientSession("CompCode");
    }

    public set BranchCode(value: string) {
        this.SetClientSession("BranchCode", value);
    }
    public get BranchCode(): string {
        return this.GetClientSession("BranchCode");
    }

    public set Language(value: string) {
        this.SetClientSession("Language", value);
    }
    public get Language(): string {
        return this.GetClientSession("Language");
    }

    public set CurrentYear(value: string) {
        this.SetClientSession("CurrentYear", value);
    }
    public get CurrentYear(): string {
        return this.GetClientSession("CurrentYear");
    }


    public set CompanyName(value: string) {
        this.SetClientSession("CompanyName", value);
    }
    public get CompanyName(): string {
        return this.GetClientSession("CompanyName");
    }

    public set CompanyNameAr(value: string) {
        this.SetClientSession("CompanyNameAr", value);
    }
    public get CompanyNameAr(): string {
        return this.GetClientSession("CompanyNameAr");
    }

    public set BranchName(value: string) {
        this.SetClientSession("BranchName", value);
    }
    public get BranchName(): string {
        return this.GetClientSession("BranchName");
    }

    public set ScreenLanguage(value: string) {
        this.SetClientSession("ScreenLanguage", value);
    }
    public get ScreenLanguage(): string {
        return this.GetClientSession("ScreenLanguage");
    }

}
class Privileges {
    public Access: boolean;
    public ModuleCode: string;
    public Custom9: boolean;
    public Custom8: boolean;
    public Custom7: boolean;
    public Custom6: boolean;
    public Custom5: boolean;
    public Custom4: boolean;
    public Custom3: boolean;
    public Custom2: boolean;
    public Custom1: boolean;
    public Preview: boolean;
    public PrintOut: boolean
    public Remove: boolean;
    public Edit: boolean
    public AddNew: boolean;
    public ViewImages: boolean;
    public EditImages: boolean;
}
class ResponseResult {
    public ResponseState: boolean;
    public ResponseMessage: string;
    public OrgFile: string;
    public NewFile: string;
    public ResponseData: any;
}
class A_ACCOUNT {
    constructor() {
        this.ACC_CODE = "";
        this.ACC_DESCA = "";
        this.ACC_DESCL = "";
        this.COMP_CODE = 0;
    }
    public ACC_CODE: string;
    public ACC_DESCA: string;
    public ACC_DESCL: string;
    public COMP_CODE: number;
}
class ReportParameters {

    public CompCode: string;
    public CompNameA: string;
    public CompNameE: string;
    public BraNameA: string;
    public BraNameE: string;
    public LoginUser: string;
    public braCode: string;
    public CatID: number;// { get; set; }
    public bra: number;// { get; set; }
    public Active: number;
    public MemId: number;
    public ClassID: number;
    public ActID: number;
    public FromCustNo: number;
    public ToCustNo: number;
    public Temp: number;
    public EngID: number;
    public Custid: number;
    public Detail: number;
    public ScopeID: number;
    public FromItemNo: string;
    public ToItemNo: string;
    public ItemId: number;
    public FromDate: string;
    public ToDate: string;
    public LocId: number;
    public Stat: number;
    public FromProjCode: string;
    public ToProjCode: string;
    public TypeReport: number;
    public SubID: number;
    public ContrNo: number;
    public Sono: number;
    public ProjectID: number;
    public Phaseid: number;
    public ContrId: number;
    public SoId: number;
    public FromSubCode: string;
    public ToSubCode: string;
    public FromEval: string;
    public toEval: string;
    public ExpID: number;
    public itemCatID: number;
    public custClassID: number;
    public customerID: number;
    public scopeClassId: number;
    public LabCatID: number;

    public FromLabCode: string;
    public ToLabCode: string;
    public LabClassID: number;
    public UnProdId: number;
    public UnprodCatID: number;

    public EquipClassID: number;
    public FromEquipCode: string;
    public ToEquipCode: string;


    public yearID: number;
    public Monid: string;

    public IsLabor: number;
    public IsEquip: number;
    public IsMat: number;

    public MonthCode: number;

    public RedArea: boolean;
    public RedSalEng: boolean;

    public SiteEngineerId: number;
    public ScopeCategoryID: number;
    public ISRepair: number;
    public REGION_CODE: number;
    public GroupType: number;
    public IsExecludeZero: number;
    public SalsEngId: number;
    public TrID: number;
    public ScopeCategCode: string;   
    public BranchNameEn: string;
    public BranchName: string;
    public CompanyNameAr: string;
    public CompanyName: string;
    public SubSystemCode: string;
    public SystemCode: string;
    public UserCode: string;
}
class HIJRA_CONVERT {
    constructor() {
        this.HYEAR = 0;
        this.START_DATE = "";
        this.MONTHSTMAP = "";
    }
    public HYEAR: number;
    public START_DATE: string;
    public MONTHSTMAP: string;
}
class CodeDesciptionModel {
    public Code: string;
    public Description: string;
}
class GQ_GetUserBranch {
    public USER_CODE: string;
    public COMP_CODE: number;
    public BRA_CODE: number;
    public BRA_DESCL: string;
    public BRA_DESCE: string;
    public BRA_DESC: string;
    public EXECUTE: boolean;
    public CREATE: boolean;
    public EDIT: boolean;
    public DELETE: boolean;
    public PRINT: boolean;
    public VIEW: boolean;

    constructor() {
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
}
class UserPrivilege {
    public MODULE_CODE: string;
    public MODULE_DESCE: string;
    public MODULE_DESCA: string;
    public Access?: boolean;
    public AddNew?: boolean;
    public EDIT: boolean;
    public VIEW: boolean;
    public Remove?: boolean;
    public PrintOut?: boolean;
    public CUSTOM1?: boolean;
    public CUSTOM2: boolean;
    public CUSTOM3?: boolean;
    public CUSTOM4?: boolean;
    public CUSTOM5?: boolean;
    public CUSTOM6?: boolean;
    public CUSTOM7?: boolean;
    public CUSTOM8?: boolean;
    public CUSTOM9?: boolean;
    public ViewImages: boolean;
    public EditImages: boolean;
    public AVAILABLE: boolean;
    public LangPrifx: string;
}
class SystemEnvironment {
    public Me: G_USERS;
    public PageIndex: number;
    public ModelCount: number;
    public P_Control: P_Control;
    public SystemCode: string;
    public SYSTEM_DESCE: string;
    public SYSTEM_DESCA: string;
    public SubSystemCode: string;
    public SUB_SYSTEM_DESCA: string;
    public SUB_SYSTEM_DESCE: string;
    public Language: string;
    public CurrentYear: string;
    public UserCode: string;
    public CompCode: string;
    public CompanyName: string;
    public CompanyNameAr: string;
    public BranchCode: string;
    public BranchName: string;
    public BranchNameEn: string;
    public SingleDatabase: boolean;
    public DatabaseColsed: boolean;
    public ScreenLanguage: string;
    public ModuleCode: string;
}
class SelectItem {
    constructor() {
        this.Value = null;
        this.Text = null;
    }
    public Value: string;
    public Text: string;
}
class SessionManager {
    public Me: G_USERS;
    public PageIndex: number;
    public static ModelCount: Number;
    public SessionRecord: SessionRecord;
}

class BaseResponse {
    public IsSuccess: boolean;
    public ErrorMessage: string;
    public StatusCode: Number;
    public ModelCount: Number;
    public Response: any;
}

//Start General Modules
class G_BRANCH {
    constructor() {
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
    public COMP_CODE: number;
    public BRA_CODE: number;
    public BRA_DESC: string;
    public BRA_TYPE: number;
    public BRA_DESCL: string;
    public BRA_SHORTA: string;
    public BRA_SHORTL: string;
    public REGION_CODE: string;
    public City: string;
    public Address: string;
    public Tel: string;
    public Fax: string;
    public Email: string;
    public WebSite: string;
    public BranchManager: string;
    public HRResponsible: string;
    public FinanceResponsible: string;
    public SalesManager: string;
    public CUSTOM1: string;
    public CUSTOM2: string;
    public CUSTOM3: string;
    public CUSTOM4: string;
    public CUSTOM5: string;
    public CUSTOMFLAG1: boolean;
    public CUSTOMFLAG2: boolean;
    public CUSTOMNUM1: number;
    public CUSTOMNUM2: number;
    public CUSTOMDATE: string;
    public BRA_DESCE: string;
    public Address_postal: string;
    public Address_Province: string;
    public Address_Street: string;
    public Address_Str_Additional: string;
    public Address_BuildingNo: string;
    public Address_Build_Additional: string;
    public Address_City: string;
    public Address_District: string;
    public VatNo: string;
}



class G_BRANCH_TYPE {
    constructor() {
        this.BRA_TYPE = 0;
        this.DESCA = "";
        this.DESCE = "";
    }
    public BRA_TYPE: number;
    public DESCA: string;
    public DESCE: string;
}
class G_COST_CENTER {
    constructor() {
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
    public COMP_CODE: number;
    public CC_CODE: string;
    public CC_DESC: string;
    public CC_PARENT: string;
    public CC_LEVEL: number;
    public CC_LOCATION: string;
    public CC_TARGET: number;
    public ACTIVE: boolean;
    public PAYROLL_UPDATE: boolean;
    public LEAF: boolean;
    public CC_DESCE: string;
}
class G_COMPANY {
    constructor() {
        this.COMP_CODE = 0;
        this.MOI_ID
        this.CRT_NO
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
    public COMP_CODE: number;
    public MOI_ID: any;
    public CRT_NO: any;
    public City: string;
    public Address: string;
    public Tel: string;
    public Fax: string;
    public Email: string;
    public WebSite: string;
    public GMName: string;
    public HRResponsible: string;
    public FinanceResponsible: string;
    public SalesManager: string;
    public CUSTOM1: string;
    public CUSTOM2: string;
    public CUSTOM3: string;
    public CUSTOM4: string;
    public CUSTOM5: string;
    public CUSTOMFLAG1: boolean;
    public CUSTOMFLAG2: boolean;
    public CUSTOMNUM1: number;
    public CUSTOMNUM2: number;
    public CUSTOMDATE: string;
}
class G_CUSTOM_REPORT {
    constructor() {
        this.ID = 0;
        this.COMP_CODE = 0;
        this.SYSTEM_CODE = "";
        this.USER_CODE = "";
        this.REP_CODE = "";
        this.REP_CUSTOM_NAME = "";
    }
    public ID: number;
    public COMP_CODE: number;
    public SYSTEM_CODE: string;
    public USER_CODE: string;
    public REP_CODE: string;
    public REP_CUSTOM_NAME: string;
}
class G_MODULES {
    constructor() {
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
        this.MODULE_TYPE
        this.Images_Enabled = false;
    }
    public SYSTEM_CODE: string;
    public SUB_SYSTEM_CODE: string;
    public MODULE_CODE: string;
    public MENU_NO: string;
    public MENU_NAME: string;
    public MODULE_DESCE: string;
    public MODULE_DESCA: string;
    public CREATE: boolean;
    public EDIT: boolean;
    public DELETE: boolean;
    public PRINT: boolean;
    public VIEW: boolean;
    public CUSTOM1: boolean;
    public CUSTOM2: boolean;
    public CUSTOM3: boolean;
    public CUSTOM1_DESC: string;
    public CUSTOM2_DESC: string;
    public CUSTOM3_DESC: string;
    public CUSTOM4: boolean;
    public CUSTOM5: boolean;
    public CUSTOM6: boolean;
    public CUSTOM4_DESC: string;
    public CUSTOM5_DESC: string;
    public CUSTOM6_DESC: string;
    public CUSTOM7: boolean;
    public CUSTOM8: boolean;
    public CUSTOM9: boolean;
    public CUSTOM7_DESC: string;
    public CUSTOM8_DESC: string;
    public CUSTOM9_DESC: string;
    public AVAILABLE: boolean;
    public MODULE_TYPE: any;
    public Images_Enabled: boolean;
}
class G_CONTROL {
    constructor() {
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
    public COMP_CODE: number;
    public FIN_YEAR: number;
    public GEN_STATUS: number;
    public ACC_STATUS: number;
    public INV_STATUS: number;
    public PER_STATUS: number;
    public CLN_STATUS: number;
    public PRJ_STATUS: number;
    public CLOSE_ACC_PERIOD: boolean;
    public BACKUP_DB: string;
    public BACKUP_COPIES: number;
    public SERVER_PATH: string;
    public SYS_CLOSED: boolean;
    public ACC_FINAL_CLOSED: boolean;
    public FIRST_DATE: string;
    public LAST_DATE: string;
}
class G_MODULES_Orginal {
    constructor() {
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
        this.MODULE_TYPE
        this.Images_Enabled = false;
    }
    public SYSTEM_CODE: string;
    public SUB_SYSTEM_CODE: string;
    public MODULE_CODE: string;
    public MENU_NO: string;
    public MENU_NAME: string;
    public MODULE_DESCE: string;
    public MODULE_DESCA: string;
    public CREATE: boolean;
    public EDIT: boolean;
    public DELETE: boolean;
    public PRINT: boolean;
    public VIEW: boolean;
    public CUSTOM1: boolean;
    public CUSTOM2: boolean;
    public CUSTOM3: boolean;
    public CUSTOM1_DESC: string;
    public CUSTOM2_DESC: string;
    public CUSTOM3_DESC: string;
    public CUSTOM4: boolean;
    public CUSTOM5: boolean;
    public CUSTOM6: boolean;
    public CUSTOM4_DESC: string;
    public CUSTOM5_DESC: string;
    public CUSTOM6_DESC: string;
    public CUSTOM7: boolean;
    public CUSTOM8: boolean;
    public CUSTOM9: boolean;
    public CUSTOM7_DESC: string;
    public CUSTOM8_DESC: string;
    public CUSTOM9_DESC: string;
    public AVAILABLE: boolean;
    public MODULE_TYPE: any;
    public Images_Enabled: boolean;
}
class G_Nationality {
    constructor() {
        this.NationalityID = 0;
        this.COMP_CODE = 0;
        this.NationalityCode = "";
        this.DescA = "";
        this.DescL = "";
        this.Remarks = "";
    }
    public NationalityID: number;
    public COMP_CODE: number;
    public NationalityCode: string;
    public DescA: string;
    public DescL: string;
    public Remarks: string;
}
class G_REGION {
    constructor() {
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
    public COMP_CODE: number;
    public REGION_CODE: string;
    public DESCA: string;
    public DESCL: string;
    public City: string;
    public Address: string;
    public Tel: string;
    public Fax: string;
    public Email: string;
    public WebSite: string;
    public RegionManager: string;
    public HRResponsible: string;
    public FinanceResponsible: string;
    public SalesManager: string;
    public CUSTOM1: string;
    public CUSTOM2: string;
    public CUSTOM3: string;
    public CUSTOM4: string;
    public CUSTOM5: string;
    public CUSTOMFLAG1: boolean;
    public CUSTOMFLAG2: boolean;
    public CUSTOMNUM1: number;
    public CUSTOMNUM2: number;
    public CUSTOMDATE: string;
}
class G_REGION_BRANCH {
    constructor() {
        this.COMP_CODE = 0;
        this.RGN_CODE = 0;
        this.BRA_CODE = 0;
    }
    public COMP_CODE: number;
    public RGN_CODE: number;
    public BRA_CODE: number;
}
class G_REPORTS_COLUMN {
    constructor() {
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
        this.COL_BKCOLOR
        this.COL_FCOLOR
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
    public COMP_CODE: number;
    public REP_NO: number;
    public COL_SERIAL: number;
    public COL_CHAR: string;
    public COL_GRAPH: boolean;
    public COL_HEADERA: string;
    public COL_HEADERE: string;
    public COL_YEAR: string;
    public COL_PERIOD: string;
    public COL_WIDTH: number;
    public COL_FONT: string;
    public COL_FONT_SIZE: number;
    public COL_FONT_STYLE: number;
    public COL_BKCOLOR: any;
    public COL_FCOLOR: any;
    public COL_BYDEF: boolean;
    public COL_COMP: number;
    public COL_CC_CODE: string;
    public COL_CODE: string;
    public DESCA: string;
    public COL_TYPE: string;
    public COL_SCALE: number;
    public COL_OPERATOR: string;
    public COL_RESTRICT: string;
    public COL_GROUPING: string;
    public COL_SORT: string;
}
class G_REPORTS_FIELDS {
    constructor() {
        this.SYSTEM_CODE = "";
        this.TABLE_NAME = "";
        this.FIELD_NAME = "";
        this.FIELD_DESCA = "";
        this.FIELD_DESCE = "";
        this.FIELD_TYPE
        this.FIELD_WIDTH = 0;
    }
    public SYSTEM_CODE: string;
    public TABLE_NAME: string;
    public FIELD_NAME: string;
    public FIELD_DESCA: string;
    public FIELD_DESCE: string;
    public FIELD_TYPE: any;
    public FIELD_WIDTH: number;
}
class G_REPORTS_GROUP {
    constructor() {
        this.COMP_CODE = 0;
        this.GROUP_NO = "";
        this.SYSTEM_CODE = "";
        this.GROUP_DESCA = "";
        this.GROUP_DESCL = "";
        this.GROUP_PARENT = "";
    }
    public COMP_CODE: number;
    public GROUP_NO: string;
    public SYSTEM_CODE: string;
    public GROUP_DESCA: string;
    public GROUP_DESCL: string;
    public GROUP_PARENT: string;
}
class G_REPORTS_HEADER {
    constructor() {
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
        this.HD_BKCOLOR
        this.RP_FONT = "";
        this.RP_FONT_SIZE = 0;
        this.RP_FONT_STYLE = 0;
        this.RP_FCOLOR
        this.COL_FONT = "";
        this.COL_FONT_SIZE = 0;
        this.COL_FONT_STYLE = 0;
        this.COL_BKCOLOR
        this.COL_FCOLOR
        this.COL_LINES_NO = 0;
        this.ROW_FONT = "";
        this.ROW_FONT_SIZE = 0;
        this.ROW_FONT_STYLE = 0;
        this.ROW_BKCOLOR
        this.ROW_FCOLOR
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
    public COMP_CODE: number;
    public REP_NO: number;
    public SYSTEM_CODE: string;
    public GROUP_NO: string;
    public DESCA: string;
    public DESCL: string;
    public TITEL1A: string;
    public TITEL2A: string;
    public TITEL1E: string;
    public TITEL2E: string;
    public NOOFCOLUMNS: number;
    public PRINTDIRECTION: number;
    public FRACT: boolean;
    public LINE_TITELA: string;
    public LINE_TITELE: string;
    public COMP_TYPE: number;
    public MARG_TOP: number;
    public HD_FONT: string;
    public HD_FONT_SIZE: number;
    public HD_FONT_STYLE: number;
    public HD_BKCOLOR: any;
    public RP_FONT: string;
    public RP_FONT_SIZE: number;
    public RP_FONT_STYLE: number;
    public RP_FCOLOR: any;
    public COL_FONT: string;
    public COL_FONT_SIZE: number;
    public COL_FONT_STYLE: number;
    public COL_BKCOLOR: any;
    public COL_FCOLOR: any;
    public COL_LINES_NO: number;
    public ROW_FONT: string;
    public ROW_FONT_SIZE: number;
    public ROW_FONT_STYLE: number;
    public ROW_BKCOLOR: any;
    public ROW_FCOLOR: any;
    public CREATED_BY: string;
    public CREATED_AT: string;
    public UPDATED_BY: string;
    public UPDATED_AT: string;
    public REMARKS: string;
    public FIT_PAGE: boolean;
    public WRAP_LINES: boolean;
    public NAMES_WIDTH: number;
    public GRID_WIDTH: number;
}
class G_ReportSetting {
    constructor() {
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
    public ReportSettingID: number;
    public SystemCode: string;
    public SubSystemCode: string;
    public ReportID: string;
    public NameA: string;
    public NameE: string;
    public IsDllReport: boolean;
    public TableName: string;
    public DescA: string;
    public DescE: string;
    public RightMargin: number;
    public LeftMargin: number;
    public TopMargin: number;
    public BottomMargin: number;
    public Orientation: number;
    public PageSize: number;
    public PrinterName: string;
}
class G_ReportSettingModule {
    constructor() {
        this.RepModSettingID = 0;
        this.COMP_CODE = 0;
        this.USER_CODE = "";
        this.SYSTEM_CODE = "";
        this.SUB_SYSTEM_CODE = "";
        this.MODULE_CODE = "";
        this.SER = 0;
        this.SETTING_DESC = "";
        this.CONTROL_VALUES
    }
    public RepModSettingID: number;
    public COMP_CODE: number;
    public USER_CODE: string;
    public SYSTEM_CODE: string;
    public SUB_SYSTEM_CODE: string;
    public MODULE_CODE: string;
    public SER: number;
    public SETTING_DESC: string;
    public CONTROL_VALUES: any;
}
class G_SearchForm {
    constructor() {
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
    public SearchFormCode: string;
    public ReturnDataPropertyName: string;
    public Description: string;
    public SerachFormTitle: string;
    public IsFullScreen: boolean;
    public Left: number;
    public Top: number;
    public Height: number;
    public Width: number;
    public PageSize: number;
    public DataSourceName: string;
    public SearchInterval: number;
    public SerachFormTitleA: string;
}
class G_SearchFormModule {
    constructor() {
        this.SystemCode = "";
        this.SubSystemCode = "";
        this.ModuleCode = "";
        this.ControlCode = "";
        this.SearchFormCode = "";
    }
    public SystemCode: string;
    public SubSystemCode: string;
    public ModuleCode: string;
    public ControlCode: string;
    public SearchFormCode: string;
}
class G_SearchFormSetting {
    constructor() {
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
    public SearchFormSettingID: number;
    public SearchFormCode: string;
    public FieldSequence: number;
    public DataMember: string;
    public AlternateDataMember: string;
    public FieldTitle: string;
    public IsReadOnly: boolean;
    public Datatype: number;
    public FieldWidth: number;
    public UseSelectionOperator: boolean;
    public Language: number;
    public FieldTitleA: string;
}
class G_SMSControl {
    constructor() {
        this.SMSControlId = 0;
        this.ViewName = "";
        this.IDField = "";
        this.Condition = "";
        this.SMSID = 0;
        this.SendToField = "";
    }
    public SMSControlId: number;
    public ViewName: string;
    public IDField: string;
    public Condition: string;
    public SMSID: number;
    public SendToField: string;
}
class G_SMSLog {
    constructor() {
        this.SMSLogID = 0;
        this.SMSControlId = 0;
        this.ViewName = "";
        this.IDField = "";
        this.SMSID = 0;
        this.SendAt = "";
        this.Status = "";
    }
    public SMSLogID: number;
    public SMSControlId: number;
    public ViewName: string;
    public IDField: string;
    public SMSID: number;
    public SendAt: string;
    public Status: string;
}
class G_SMSSMG {
    constructor() {
        this.SMSID = 0;
        this.ViewName = "";
        this.MsgField = "";
    }
    public SMSID: number;
    public ViewName: string;
    public MsgField: string;
}
class G_STANDARD {
    constructor() {
        this.BACKUP_PATH = "";
        this.BACKUP_DB = "";
        this.BACKUP_COPIES = 0;
    }
    public BACKUP_PATH: string;
    public BACKUP_DB: string;
    public BACKUP_COPIES: number;
}
class G_STORE_TARGET {
    constructor() {
        this.COMP_CODE = 0;
        this.BRA_CODE = 0;
        this.STORE_CODE = 0;
        this.MONTH_NO = 0;
        this.SLS_TARGET = 0;
    }
    public COMP_CODE: number;
    public BRA_CODE: number;
    public STORE_CODE: number;
    public MONTH_NO: number;
    public SLS_TARGET: number;
}
class G_STORE_TYPE {
    constructor() {
        this.COMP_CODE = 0;
        this.TYPE_CODE = 0;
        this.DESCA = "";
        this.DESCL = "";
    }
    public COMP_CODE: number;
    public TYPE_CODE: number;
    public DESCA: string;
    public DESCL: string;
}
class G_SUB_SYSTEMS {
    constructor() {
        this.SYSTEM_CODE = "";
        this.SUB_SYSTEM_CODE = "";
        this.SUB_SYSTEM_DESCA = "";
        this.SUB_SYSTEM_DESCE = "";
        this.ICON_PATH = "";
        this.APPNAME = "";
        this.APPVERSION = "";
    }
    public SYSTEM_CODE: string;
    public SUB_SYSTEM_CODE: string;
    public SUB_SYSTEM_DESCA: string;
    public SUB_SYSTEM_DESCE: string;
    public ICON_PATH: string;
    public APPNAME: string;
    public APPVERSION: string;
}
class G_SYSTEM {
    constructor() {
        this.SYSTEM_CODE = "";
        this.SYSTEM_DESCE = "";
        this.SYSTEM_DESCA = "";
        this.DB_NAME = "";
        this.ICON_PATH = "";
        this.INIT_ORDER = 0;
        this.VER_PATH = "";
    }
    public SYSTEM_CODE: string;
    public SYSTEM_DESCE: string;
    public SYSTEM_DESCA: string;
    public DB_NAME: string;
    public ICON_PATH: string;
    public INIT_ORDER: number;
    public VER_PATH: string;
}
class G_SYSTEM_QUERY {
    constructor() {
        this.SYSTEM_CODE = "";
        this.QUERY_NAME = "";
        this.ALIASE = "";
        this.DESCRIPTION = "";
        this.QRY_TYPE = "";
    }
    public SYSTEM_CODE: string;
    public QUERY_NAME: string;
    public ALIASE: string;
    public DESCRIPTION: string;
    public QRY_TYPE: string;
}
class G_SYSTEM_TABLES {
    constructor() {
        this.SYSTEM_CODE
        this.TABLE_NAME = "";
        this.TABLE_ALIASE
        this.TABLE_DESCRIPTION = "";
        this.TABLE_INDEXES = "";
        this.TABLE_TYPE
        this.TABLE_ORDER = 0;
    }
    public SYSTEM_CODE: any;
    public TABLE_NAME: string;
    public TABLE_ALIASE: any;
    public TABLE_DESCRIPTION: string;
    public TABLE_INDEXES: string;
    public TABLE_TYPE: any;
    public TABLE_ORDER: number;
}
class G_TRANS_TEMP_LINK {
    constructor() {
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
    public HEADER_ROW_ID: string;
    public GUIDStamp: string;
    public COMP_CODE: number;
    public SERIAL: number;
    public ACC_CODE: string;
    public DEBIT: number;
    public DEBIT_FC: number;
    public CREDIT: number;
    public CREDIT_FC: number;
    public CC_CODE: string;
    public DET_CC_CODE: string;
    public LINE_DESCA: string;
    public LINE_DESCE: string;
    public VOUCHER_TYPE: number;
    public VOUCHER_LINE_DESCA_STRING_FORMAT: string;
    public VOUCHER_LINE_DESCE_STRING_FORMAT: string;
}
class G_TRANS_TEMP2 {
    constructor() {
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
    public ROW_ID: string;
    public GUIDStamp: string;
    public COMP_CODE: number;
    public BRA_CODE: number;
    public SYSTEM_CODE: string;
    public SUB_SYSTEM_CODE: string;
    public TR_CODE: string;
    public VOUCHER_CODE: number;
    public VOUCHER_TYPE: number;
    public VOUCHER_SUB_TYPE: number;
    public VOUCHER_SOURCE_TYPE: string;
    public TR_NO: number;
    public TR_TYPE: string;
    public TR_DATE: string;
    public TR_AMOUNT: number;
    public TR_DESCA: string;
    public TR_DESCE: string;
    public TR_USER_CODE: string;
    public TR_ADDITIONAL1: string;
    public TR_ADDITIONAL2: string;
    public FN_VOUCHER_CODE: string;
    public FN_VOUCHER_TYPE: string;
    public BASE_TABLE_NAME: string;
    public IS_SUMMARY_VOUCHER: boolean;
    public VOUCHER_DESCA_STRING_FORMAT: string;
    public VOUCHER_DESCE_STRING_FORMAT: string;
    public IsSelected: boolean;
    public TR_AMOUNT_FC: number;
    public ROW_DATE: string;
    public FromDate: string;
    public ToDate: string;
    public FromTrNo: number;
    public ToTrNo: number;
}
class G_TRANS_TEMP3 {
    constructor() {
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
    public ROW_ID: string;
    public GUIDStamp: string;
    public COMP_CODE: number;
    public BRA_CODE: number;
    public SYSTEM_CODE: string;
    public SUB_SYSTEM_CODE: string;
    public TR_CODE: string;
    public VOUCHER_CODE: number;
    public VOUCHER_TYPE: number;
    public VOUCHER_SUB_TYPE: number;
    public VOUCHER_SOURCE_TYPE: string;
    public TR_NO: number;
    public TR_TYPE: string;
    public TR_DATE: string;
    public TR_AMOUNT: number;
    public TR_DESCA: string;
    public TR_DESCE: string;
    public TR_USER_CODE: string;
    public TR_ADDITIONAL1: string;
    public TR_ADDITIONAL2: string;
    public FN_VOUCHER_CODE: string;
    public FN_VOUCHER_TYPE: string;
    public BASE_TABLE_NAME: string;
    public IS_SUMMARY_VOUCHER: boolean;
    public VOUCHER_DESCA_STRING_FORMAT: string;
    public VOUCHER_DESCE_STRING_FORMAT: string;
    public IsSelected: boolean;
    public TR_AMOUNT_FC: number;
    public ROW_DATE: string;
    public FromDate: string;
    public ToDate: string;
    public FromTrNo: number;
    public ToTrNo: number;
}
class G_USER_BRANCH {
    constructor() {
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
    public USER_CODE: string;
    public COMP_CODE: number;
    public BRA_CODE: number;
    public EXECUTE: boolean;
    public CREATE: boolean;
    public EDIT: boolean;
    public DELETE: boolean;
    public PRINT: boolean;
    public VIEW: boolean;
}
class G_USER_COMPANY {
    constructor() {
        this.USER_CODE = "";
        this.COMP_CODE = 0;
        this.EXECUTE = false;
        this.CREATE = false;
        this.EDIT = false;
        this.DELETE = false;
        this.PRINT = false;
        this.VIEW = false;
    }
    public USER_CODE: string;
    public COMP_CODE: number;
    public EXECUTE: boolean;
    public CREATE: boolean;
    public EDIT: boolean;
    public DELETE: boolean;
    public PRINT: boolean;
    public VIEW: boolean;
}
class G_USER_FAVORITE {
    constructor() {
        this.ID = 0;
        this.USER_CODE = "";
        this.OPTIONORDER = 0;
        this.SYSTEM_CODE = "";
        this.SUB_SYSTEM_CODE = "";
        this.MODULE_CODE = "";
    }
    public ID: number;
    public USER_CODE: string;
    public OPTIONORDER: number;
    public SYSTEM_CODE: string;
    public SUB_SYSTEM_CODE: string;
    public MODULE_CODE: string;
}
class G_USER_LOG {
    constructor() {
        this.USER_CODE = "";
        this.SYSTEM_CODE
        this.SYSTEM_YEAR = 0;
        this.MODULE_CODE = "";
        this.COMP_CODE = 0;
        this.LOG_DATE = "";
    }
    public USER_CODE: string;
    public SYSTEM_CODE: any;
    public SYSTEM_YEAR: number;
    public MODULE_CODE: string;
    public COMP_CODE: number;
    public LOG_DATE: string;
}
class G_USER_LOG_OLD {
    constructor() {
        this.USER_CODE = "";
        this.SYSTEM_CODE = "";
        this.SYSTEM_YEAR = 0;
        this.MODULE_CODE = "";
        this.COMP_CODE = 0;
        this.LOG_DATE = "";
    }
    public USER_CODE: string;
    public SYSTEM_CODE: string;
    public SYSTEM_YEAR: number;
    public MODULE_CODE: string;
    public COMP_CODE: number;
    public LOG_DATE: string;
}
class G_USER_MODULE {
    constructor() {
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
    public USER_CODE: string;
    public SYSTEM_CODE: string;
    public SUB_SYSTEM_CODE: string;
    public MODULE_CODE: string;
    public EXECUTE: boolean;
    public CREATE: boolean;
    public EDIT: boolean;
    public DELETE: boolean;
    public PRINT: boolean;
    public VIEW: boolean;
    public CUSTOM1: boolean;
    public CUSTOM2: boolean;
    public CUSTOM3: boolean;
    public CUSTOM4: boolean;
    public CUSTOM5: boolean;
    public CUSTOM6: boolean;
    public CUSTOM7: boolean;
    public CUSTOM8: boolean;
    public CUSTOM9: boolean;
    public ViewImages: boolean;
    public EditImages: boolean;
}
class G_USER_SUB_SYSTEM {
    constructor() {
        this.USER_CODE = "";
        this.SYSTEM_CODE = "";
        this.SUB_SYSTEM_CODE = "";
        this.EXECUTE = false;
        this.FILTER_STRING = "";
    }
    public USER_CODE: string;
    public SYSTEM_CODE: string;
    public SUB_SYSTEM_CODE: string;
    public EXECUTE: boolean;
    public FILTER_STRING: string;
}
class G_USER_SYSTEM {
    constructor() {
        this.USER_CODE = "";
        this.SYSTEM_CODE = "";
        this.EXECUTE = false;
        this.FILTER_STRING = "";
    }
    public USER_CODE: string;
    public SYSTEM_CODE: string;
    public EXECUTE: boolean;
    public FILTER_STRING: string;
}
class G_USERS {
    constructor() {
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
    public USER_CODE: string;
    public USER_PASSWORD: string;
    public USER_ACTIVE: boolean;
    public USER_NAME: string;
    public CompCode: number;
    public REGION_CODE: string;
    public GRP_CODE: number;
    public USER_PASSWORD2: string;
    public USER_PASSWORD3: string;
    public CHANGE_PASS_DATE: string;
    public MANUAL_VC: string;
    public MASTER_USER_CODE: string;
    public City: string;
    public Address: string;
    public Tel: string;
    public Fax: string;
    public Mobile: string;
    public Email: string;
    public DepartmentName: string;
    public JobTitle: string;
    public USER_TYPE: number;
    public ManagedBy: string;
    public LoginUrl: boolean;
}
class G_ModuleHelp {
    constructor() {
        this.SYSTEM_CODE = "";
        this.SUB_SYSTEM_CODE = "";
        this.MODULE_CODE = "";
        this.HelpBody_Ar = "";
        this.HelpBody_En = "";
    }
    public SYSTEM_CODE: string;
    public SUB_SYSTEM_CODE: string;
    public MODULE_CODE: string;
    public HelpBody_Ar: string;
    public HelpBody_En: string;
}
//End General Modules

//Start I
class I_D_Category {
    constructor() {
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
    public CatID: number;
    public CompCode: number;
    public CatCode: string;
    public DescA: string;
    public DescL: string;
    public ParentCatId: number;
    public CatLevel: number;
    public IsDetail: boolean;
    public UnitGrpID: number;
    public IsAutoGenerateItem: boolean;
    public ItemFormatFix: string;
    public ItemFormatSerial: string;
    public ItemTypeID: number;
    public CostMethodID: number;
    public StockMethodID: number;
    public IssueFromCenteralStore: boolean;
    public CenteralStoreCode: number;
    public IsAdditionalSpecs: boolean;
    public AdditionalspcsDescA: string;
    public AdditionalspcsDescL: string;
    public ISSales: boolean;
    public IsStock: boolean;
    public IsProduct: boolean;
    public IsIssuetoCC: boolean;
    public IsIssueToProd: boolean;
    public IsPurchase: boolean;
    public Remarks: string;
    public CreatedAt: string;
    public CreatedBy: string;
    public UpdatedAt: string;
    public UpdatedBy: string;
}
class I_D_Specification {
    constructor() {
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
    public SpecsID: number;
    public SpecsCode: string;
    public DescA: string;
    public DescE: string;
    public CompCode: number;
    public Remarks: string;
    public CreatedAt: string;
    public CreatedBy: string;
    public UpdatedAt: string;
    public UpdatedBy: string;
}
class I_D_SpecificationValues {
    constructor() {
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
    public SpecsValueID: number;
    public SpecsID: number;
    public SpecsValueCode: string;
    public ValueA: string;
    public ValueE: string;
    public CompCode: number;
    public Remarks: string;
    public CreatedAt: string;
    public CreatedBy: string;
    public UpdatedAt: string;
    public UpdatedBy: string;
}
class I_D_UnitGroup {
    constructor() {
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
    public UnitGrpID: number;
    public UnitGrpCode: string;
    public DescA: string;
    public DescE: string;
    public UomID: number;
    public CompCode: number;
    public Remarks: string;
    public CreatedAt: string;
    public CreatedBy: string;
    public UpdatedAt: string;
    public UpdatedBy: string;
}
class I_D_UnitGroupUom {
    constructor() {
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
    public UnitGrpUom: number;
    public UnitGrpID: number;
    public UomID: number;
    public DescA: string;
    public DescE: string;
    public Rate: number;
    public IsStock: boolean;
    public IsSales: boolean;
    public IsPurchase: boolean;
    public CompCode: number;
    public Remarks: string;
    public CreatedAt: string;
    public CreatedBy: string;
    public UpdatedAt: string;
    public UpdatedBy: string;
}
class I_D_UOM {
    constructor() {
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
    public UomID: number;
    public UomCode: string;
    public DescA: string;
    public DescE: string;
    public CompCode: number;
    public Remarks: string;
    public CreatedAt: string;
    public CreatedBy: string;
    public UpdatedAt: string;
    public UpdatedBy: string;
}
class I_G_CostMethods {
    constructor() {
        this.CostMethodID = 0;
        this.DescA = "";
        this.DescL = "";
        this.Remarks = "";
    }
    public CostMethodID: number;
    public DescA: string;
    public DescL: string;
    public Remarks: string;
}
class I_G_ItemType {
    constructor() {
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
    public CompCode: number;
    public ItemTypeID: number;
    public DescA: string;
    public DescL: string;
    public ISSales: boolean;
    public IsStock: boolean;
    public IsProduct: boolean;
    public IsIssuetoCC: boolean;
    public IsIssueToProd: boolean;
    public IsPurchase: boolean;
    public IsAvailable: boolean;
}
class I_G_StockMethods {
    constructor() {
        this.StockMethodID = 0;
        this.DescA = "";
        this.DescL = "";
        this.Remarks = "";
    }
    public StockMethodID: number;
    public DescA: string;
    public DescL: string;
    public Remarks: string;
}
class I_Item {
    constructor() {
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
    public ItemID: number;
    public ItemCode: string;
    public CompCode: number;
    public DescA: string;
    public DescL: string;
    public TechDescA: string;
    public TechDescL: string;
    public UnitGrpID: number;
    public UomID: number;
    public CatID: number;
    public ItemTypeID: number;
    public MovClassID: number;
    public OldItemCode: string;
    public VndItemCode: string;
    public BarCode1: string;
    public BarCode2: string;
    public FirstEntryDate: string;
    public UnitPrice: number;
    public StarGlobalCost: number;
    public GlobalCost: number;
    public Remarks: string;
    public CreatedAt: string;
    public CreatedBy: string;
    public UpdatedAt: string;
    public UpdatedBy: string;
    public LastBarCodeSeq: number;
    public BarCodePrefix: string;
}
class I_ItemBatch {
    constructor() {
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
    public ItemBatchId: number;
    public BarCode: string;
    public ItemID: number;
    public CompCode: number;
    public OnhandQty: number;
    public ReceivedQty: number;
    public UnitCost: number;
    public BatchCode: string;
    public ProdDate: string;
    public ExpDate: string;
    public SerialNo: string;
    public ExtraSpecCode: string;
    public IsAddable: boolean;
    public IsDeliverable: boolean;
    public AddDelRemarks: string;
    public ProdBatchNo: string;
}
class I_ItemSpecsValue {
    constructor() {
        this.ItemSpecsValue = 0;
        this.ItemID = 0;
        this.SpecsValueID = 0;
    }
    public ItemSpecsValue: number;
    public ItemID: number;
    public SpecsValueID: number;
}
class I_ItemStore {
    constructor() {
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
    public ItemStoreID: number;
    public ItemID: number;
    public StoreCode: number;
    public BraCode: number;
    public CompCode: number;
    public LOCATION: string;
    public LOCATION2: string;
    public OnhandQty: number;
    public BookQty: number;
    public OnRoadQty: number;
    public OnOrderQty: number;
    public ReOrderQty: number;
    public MinQty: number;
    public MaxQty: number;
    public StartQty: number;
    public StartLocalCost: number;
    public LocalCost: number;
    public CreatedAt: string;
    public CreatedBy: string;
    public UpdatedAt: string;
    public UpdatedBy: string;
}
class I_ItemStoreBatch {
    constructor() {
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
    public ItemStoreBatchId: number;
    public ItemStoreID: number;
    public ItemBatchId: number;
    public StoreCode: number;
    public BraCode: number;
    public CompCode: number;
    public OnhandQty: number;
    public BookQty: number;
    public SerialNo: string;
}
class I_Pay_Vendor {
    constructor() {
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
    public VendorID: number;
    public CompCode: number;
    public VendorCode: string;
    public VndCatID: number;
    public NAMEA: string;
    public NAMEL: string;
    public SHORTNAMEA: string;
    public SHORTNAMEL: string;
    public RespPersonName: string;
    public ADDRESS: string;
    public TEL: string;
    public FAX: string;
    public MOBILE: number;
    public EMAIL: string;
    public CURCODE: string;
    public PurchaserId: number;
    public OnPurchaserAcc: boolean;
    public AccVendorID: number;
    public PaymentType: number;
    public DebitLimit: number;
    public DebitLimitFC: number;
    public DebitPeriod: number;
    public OpenBalanceFC: number;
    public Openbalance: number;
    public Debit: number;
    public DebitFC: number;
    public Credit: number;
    public CreditFC: number;
    public Isactive: boolean;
    public FCRate: number;
    public REMARKS: string;
    public STATUS: number;
    public CREATED_BY: string;
    public CREATED_AT: string;
    public UPDATED_AT: string;
    public UPDATED_BY: string;
    public VendorType: number;
    public Bank: string;
    public BankAccountNo: string;
    public TaxFileNo: string;
    public TaxIssuePlace: string;
    public CommRegNo: string;
    public CommRegIssueDate: string;
    public CommRegIssueDateH: string;
    public CommRegIssuePlace: string;
    public VATType: number;
    public AddDedType: number;
    public VATFileNo: string;
    public AddDedFileNo: string;
    public VATIssPlace: string;
    public AddDedIssuePlace: string;
    public IsWebEnabled: boolean;
    public WebUserName: string;
    public WebPassword: string;
}
//End I

class sysobjectrules {
    constructor() {
        this.obj_id
        this.obj_name
        this.ref
    }
    public obj_id: any;
    public obj_name: any;
    public ref: any;
}
class sysdiagrams {
    constructor() {
        this.name = "";
        this.principal_id = 0;
        this.diagram_id = 0;
        this.version = 0;
        this.definition
    }
    public name: string;
    public principal_id: number;
    public diagram_id: number;
    public version: number;
    public definition: any;
}

//Start Tables for PMS
class P_Control {
    constructor() {
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
    public CompCode: number;
    public BraCode: number;
    public LinkToAccount: boolean;
    public MonthlyClose: boolean;
    public ScanPath: string;
    public MaterialWastPrc: number;
    public UserTimeZoneUTCDiff: number;
    public ServerTimeZoneUTCDiff: number;
    public VATNumberLength: number;
    public CrNumberLength: number;
    public AverageLaborCost: number;
    public StdOHMaterial: number;
    public StdOHLabor: number;
    public StdOHEquip: number;
    public StdOHSubContractor: number;
    public StdProdOHMaterial: number;
    public StdProdOHLabor: number;
    public StdProdOHEquip: number;
    public StdProdOHSubContractor: number;
    public StdProfitMargin: number;
    public MaxImagesize: number;
    public DashBoardPeriodinSec: number;
}
class P_D_Activity {
    constructor() {
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
    }
    public ActivityID: number;
    public ActivityCode: string;
    public DescA: string;
    public DescE: string;
    public UomID: number;
    public HourProduction: number;
    public LaborProdRate: number;
    public UnitPrice: number;
    public ParentActivityID: number;
    public ActivityLevel: number;
    public IsDetail: number;
    public Remarks: string;
    public CompCode: number;
}
class P_D_ActivityEquipClass {
    constructor() {
        this.ActivityEquipClassID = 0;
        this.ActivityID = 0;
        this.EquipClassId = 0;
        this.NoOfEquipments = 0;
    }
    public ActivityEquipClassID: number;
    public ActivityID: number;
    public EquipClassId: number;
    public NoOfEquipments: number;
}
class P_D_ActivityIMaterial {
    constructor() {
        this.ActivityMaterialID = 0;
        this.ActivityID = 0;
        this.ItemID = 0;
        this.ProdQty = 0;
        this.WastPrc = 0;
        this.WastQty = 0;
        this.ReqQty = 0;
    }
    public ActivityMaterialID: number;
    public ActivityID: number;
    public ItemID: number;
    public ProdQty: number;
    public WastPrc: number;
    public WastQty: number;
    public ReqQty: number;
}
class P_D_ActivityLaborClass {
    constructor() {
        this.ActivityLaborClassID = 0;
        this.ActivityID = 0;
        this.LaborClassId = 0;
        this.NoOfLabors = 0;
    }
    public ActivityLaborClassID: number;
    public ActivityID: number;
    public LaborClassId: number;
    public NoOfLabors: number;
}
class P_D_Calender {
    constructor() {
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
    public CalenderID: number;
    public Calendercode: string;
    public DescA: string;
    public DescE: string;
    public Remarks: string;
    public CompCode: number;
    public DailyWorkHours: number;
    public WeekWorkHours: number;
    public StartTime: string;
    public EndTime: string;
    public BreakStart: string;
    public BreakEnd: string;
    public IsOneShift: boolean;
}
class P_D_CalenderDays {
    constructor() {
        this.CalenderDaysID = 0;
        this.CalenderID = 0;
        this.DayOfWeek = 0;
        this.WorkingDay = false;
        this.WorkHours = 0;
    }
    public CalenderDaysID: number;
    public CalenderID: number;
    public DayOfWeek: number;
    public WorkingDay: boolean;
    public WorkHours: number;
}
class P_D_Equipment {
    constructor() {
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
    public EquimentID: number;
    public EquipClassId: number;
    public Equipcode: string;
    public DescA: string;
    public DescE: string;
    public PurchaseCost: number;
    public PurchaseDate: string;
    public Model: string;
    public Make: string;
    public MakeType: string;
    public Waranty: string;
    public MaintNotes: string;
    public PlateNo: string;
    public ChasisNo: string;
    public IsActive: boolean;
    public EffeciencyPrc: number;
    public StartServiceDate: string;
    public OutOFServiceDate: string;
    public HourDeprCost: number;
    public HourOprCost: number;
    public HourCost: number;
    public BraCode: number;
    public Remarks: string;
    public CompCode: number;
    public ProjectID: number;
    public PhaseId: number;
}
class P_D_EquipmentClass {
    constructor() {
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
    public EquipClassId: number;
    public ClassCode: string;
    public DescA: string;
    public DescE: string;
    public DeprRate: number;
    public HourDeprCost: number;
    public HourOprCost: number;
    public HourCost: number;
    public IncomeRate: number;
    public Remarks: string;
    public CompCode: number;
}
class P_D_Expences {
    constructor() {
        this.ExpencesID = 0;
        this.ExpCatID = 0;
        this.ExpCode = "";
        this.DescA = "";
        this.DescE = "";
        this.AccountNo = "";
        this.Remarks = "";
        this.CompCode = 0;
    }
    public ExpencesID: number;
    public ExpCatID: number;
    public ExpCode: string;
    public DescA: string;
    public DescE: string;
    public AccountNo: string;
    public Remarks: string;
    public CompCode: number;
}
class P_D_ExpencesCategory {
    constructor() {
        this.ExpCatID = 0;
        this.ExpCatCode = "";
        this.DescA = "";
        this.DescE = "";
        this.AccountNo = "";
        this.Remarks = "";
        this.CompCode = 0;
    }
    public ExpCatID: number;
    public ExpCatCode: string;
    public DescA: string;
    public DescE: string;
    public AccountNo: string;
    public Remarks: string;
    public CompCode: number;
}
class P_D_Labor {
    constructor() {
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
    public LaborID: number;
    public LaborClassId: number;
    public LaborCategoryId: number;
    public LaborCode: string;
    public DescA: string;
    public DescE: string;
    public BasicSalary: number;
    public TotalAllow: number;
    public Tel1: string;
    public Tel2: string;
    public Mobile: string;
    public Email: string;
    public CarPlateNo: string;
    public IsActive: boolean;
    public NationalityID: number;
    public BraCode: number;
    public Remarks: string;
    public CompCode: number;
    public ProjectID: number;
    public PhaseId: number;
}
class P_D_LaborAbsenceType {
    constructor() {
        this.LaborAbsenceTypeID = 0;
        this.AbsCode = "";
        this.DescA = "";
        this.DescE = "";
        this.Remarks = "";
        this.CompCode = 0;
    }
    public LaborAbsenceTypeID: number;
    public AbsCode: string;
    public DescA: string;
    public DescE: string;
    public Remarks: string;
    public CompCode: number;
}
class P_D_LaborCategory {
    constructor() {
        this.LaborCategoryId = 0;
        this.CategCode = "";
        this.DescA = "";
        this.DescE = "";
        this.Remarks = "";
        this.BonusRate = 0;
        this.CompCode = 0;
    }
    public LaborCategoryId: number;
    public CategCode: string;
    public DescA: string;
    public DescE: string;
    public Remarks: string;
    public BonusRate: number;
    public CompCode: number;
}
class P_D_LaborClass {
    constructor() {
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
    public LaborClassId: number;
    public ClassCode: string;
    public DescA: string;
    public DescE: string;
    public HourCost: number;
    public IncomeRate: number;
    public Remarks: string;
    public CompCode: number;
    public BonusAddFactor: number;
    public BonusDedFactor: number;
}
class P_D_LaborLaborClass {
    constructor() {
        this.LaborID = 0;
        this.LaborClassId = 0;
        this.Priority = 0;
        this.Remarks = "";
    }
    public LaborID: number;
    public LaborClassId: number;
    public Priority: number;
    public Remarks: string;
}
class P_D_LaborOverTimeType {
    constructor() {
        this.LaborOverTimeTypeID = 0;
        this.OverTimeCode = "";
        this.DescA = "";
        this.DescE = "";
        this.Rate = 0;
        this.Remarks = "";
        this.CompCode = 0;
    }
    public LaborOverTimeTypeID: number;
    public OverTimeCode: string;
    public DescA: string;
    public DescE: string;
    public Rate: number;
    public Remarks: string;
    public CompCode: number;
}
class P_D_Location {
    constructor() {
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
    public LocationId: number;
    public BraCode: number;
    public LocCode: string;
    public SalesEngineerId: number;
    public ParentLocationId: number;
    public DescA: string;
    public DescE: string;
    public Remarks: string;
    public IsDetail: boolean;
    public CompCode: number;
}
class P_D_SalesEgineer {
    constructor() {
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
    public SalesEngineerId: number;
    public SalesEngCategoryId: number;
    public EngCode: string;
    public DeacA: string;
    public DescE: string;
    public Speciality: string;
    public BasicSalary: number;
    public TotalAllow: number;
    public Tel1: string;
    public Tel2: string;
    public Mobile: string;
    public Email: string;
    public IsActive: boolean;
    public NationalityID: number;
    public CarPlateNo: string;
    public BraCode: number;
    public Remarks: string;
    public CompCode: number;
}
class P_D_SalesEngCateory {
    constructor() {
        this.SalesEngCategoryId = 0;
        this.CategCode = "";
        this.DescA = "";
        this.DescE = "";
        this.Remarks = "";
        this.CompCode = 0;
        this.Rate = 0;
    }
    public SalesEngCategoryId: number;
    public CategCode: string;
    public DescA: string;
    public DescE: string;
    public Remarks: string;
    public CompCode: number;
    public Rate: number;
}
class P_D_Scope {
    constructor() {
        this.ScopeID = 0;
        this.ScopeCategoryID = 0;
        this.ScopeCode = "";
        this.DescA = "";
        this.DescE = "";
        this.Remarks = "";
        this.CompCode = 0;
    }
    public ScopeID: number;
    public ScopeCategoryID: number;
    public ScopeCode: string;
    public DescA: string;
    public DescE: string;
    public Remarks: string;
    public CompCode: number;
}
class P_D_SiteEngCategory {
    constructor() {
        this.SiteEngCategoryId = 0;
        this.CategCode = "";
        this.DescA = "";
        this.DescE = "";
        this.Remarks = "";
        this.CompCode = 0;
        this.Rate = 0;
    }
    public SiteEngCategoryId: number;
    public CategCode: string;
    public DescA: string;
    public DescE: string;
    public Remarks: string;
    public CompCode: number;
    public Rate: number;
}
class P_D_ScopeCategory {
    constructor() {
        this.ScopeCategoryID = 0;
        this.ScopeCategCode = "";
        this.DescA = "";
        this.DescE = "";
        this.Remarks = "";
        this.CompCode = 0;
    }
    public ScopeCategoryID: number;
    public ScopeCategCode: string;
    public DescA: string;
    public DescE: string;
    public Remarks: string;
    public CompCode: number;
}
class P_D_SiteEngineer {
    constructor() {
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
    public SiteEngineerId: number;
    public SiteEngCategoryId: number;
    public EngCode: string;
    public DescA: string;
    public DescE: string;
    public Speciality: string;
    public BasicSalary: number;
    public TotalAllow: number;
    public Tel1: string;
    public Tel2: string;
    public Mobile: string;
    public Email: string;
    public IsActive: boolean;
    public NationalityID: number;
    public CarPlateNo: string;
    public BraCode: number;
    public Remarks: string;
    public CompCode: number;
}

class P_D_UnProdCategory {
    constructor() {
        this.UnProdCategoryID = 0;
        this.CategCode = "";
        this.DescA = "";
        this.DescE = "";
        this.Remarks = "";
        this.CompCode = 0;
    }
    public UnProdCategoryID: number;
    public CategCode: string;
    public DescA: string;
    public DescE: string;
    public Remarks: string;
    public CompCode: number;
}
class P_D_UnProdReason {
    constructor() {
        this.UnProdReasonId = 0;
        this.UnProdCategoryID = 0;
        this.ReasonCode = "";
        this.DescA = "";
        this.DescE = "";
        this.Remarks = "";
        this.CompCode = 0;
    }
    public UnProdReasonId: number;
    public UnProdCategoryID: number;
    public ReasonCode: string;
    public DescA: string;
    public DescE: string;
    public Remarks: string;
    public CompCode: number;
}
class P_D_UOM {
    constructor() {
        this.UomID = 0;
        this.UomCode = "";
        this.DescA = "";
        this.DescE = "";
        this.Remarks = "";
        this.CompCode = 0;
    }
    public UomID: number;
    public UomCode: string;
    public DescA: string;
    public DescE: string;
    public Remarks: string;
    public CompCode: number;
}
class P_G_WorkStatus {
    constructor() {
        this.CompCode = 0;
        this.StatusCode = 0;
        this.DescA = "";
        this.DescE = "";
        this.Remarks = "";
    }
    public CompCode: number;
    public StatusCode: number;
    public DescA: string;
    public DescE: string;
    public Remarks: string;
}
class P_G_Region {
    constructor() {
        this.COMP_CODE = 0;
        this.REGION_CODE = 0;
        this.DESCA = "";
        this.DESCE = "";
        this.REMARKS = "";
    }
    public COMP_CODE: number;
    public REGION_CODE: number;
    public DESCA: string;
    public DESCE: string;
    public REMARKS: string;
}
class P_G_Period {
    constructor() {
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
    public PeriodID: number;
    public YearID: number;
    public CompCode: number;
    public BraCode: number;
    public PeriodCode: number;
    public DescA: string;
    public DescE: string;
    public FromDate: string;
    public ToDate: string;
    public Closed: boolean;
    public Remarks: string;
    public CreatedBy: string;
    public CreatedAt: string;
    public UpdatedBy: string;
    public UpDateedAt: string;
    public ProdBudget: number;
    public MaterialCost: number;
    public LabourCost: number;
    public EquipmentCost: number;
    public ExpensesCost: number;
    public SubContractorCost: number;
    public ProductionOHCost: number;
    public OHCost: number;
    public ProdOHCost: number;
    public StdOHMaterial: number;
    public StdOHLabor: number;
    public StdOHEquip: number;
    public StdOHExpenses: number;
    public StdOHSubContractor: number;
    public StdProdOHMaterial: number;
    public StdProdOHLabor: number;
    public StdProdOHEquip: number;
    public StdProdOHExpenses: number;
    public StdProdOHSubContractor: number;
    public StdProfitMargin: number;
    public Total: number;

}
class PQActivityCollection {
    constructor() {
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
    // Master
    public ActivityID: number;
    public ActivityCode: string;
    public DescA: string;
    public DescE: string;
    public UomID: number;
    public HourProduction: number;
    public LaborProdRate: number;
    public UnitPrice: number;
    public ParentActivityID: number;
    public ActivityLevel: number;
    public IsDetail: boolean;
    public Remarks: string;
    public CompCode: number;

    public ActivityMaterialID: number;
    public ItemId: number;
    public ProdQty: number;
    public WastPrc: number;
    public WastQty: number;
    public ReqQty: number;
    public ActivityEquipClassID: number;
    public EquipClassId: number;
    public NoOfEquipments: number;
    public ActivityLaborClassID: number;
    public LaborClassId: number;
    public NoOfLabors: number;
}
//End Tables for PMS

//Start PMS_Sales
class P_D_SalesCustomerCategory {
    constructor() {
        this.CustomerCategoryID = 0;
        this.CustomerCatCode = "";
        this.DescA = "";
        this.DescE = "";
        this.Remarks = "";
        this.CompCode = 0;
    }
    public CustomerCategoryID: number;
    public CustomerCatCode: string;
    public DescA: string;
    public DescE: string;
    public Remarks: string;
    public CompCode: number;
}
class P_D_SalesItems {
    constructor() {
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
    public ItemID: number;
    public ItemCode: string;
    public DescA: string;
    public DescE: string;
    public UomID: number;
    public MinUnitPrice: number;
    public UnitPrice: number;
    public ParentItemID: number;
    public ScopeID: number;
    public ItemLevel: number;
    public IsDetail: boolean;
    public IsActive: boolean;
    public Remarks: string;
    public CompCode: number;
    public CreatedBy: string;
    public CreatedAt: string;
    public UpdatedBy: string;
    public UpdatedAt: string;
}
class P_D_SalesItemsSystemActivity {
    constructor() {
        this.ItemsSystemActivityId = 0;
        this.ItemsSystemId = 0;
        this.ItemID = 0;
        this.ActivityID = 0;
        this.ActQty = 0;
        this.IsProdIncluded = 0;
        this.ProdPrc = 0;
    }
    public ItemsSystemActivityId: number;
    public ItemsSystemId: number;
    public ItemID: number;
    public ActivityID: number;
    public ActQty: number;
    public IsProdIncluded: number;
    public ProdPrc: number;
}
class P_D_SalesPaymentTerms {
    constructor() {
        this.PaymentId = 0;
        this.PaymentCode = "";
        this.DescA = "";
        this.DescE = "";
        this.Remarks = "";
        this.CompCode = 0;
    }
    public PaymentId: number;
    public PaymentCode: string;
    public DescA: string;
    public DescE: string;
    public Remarks: string;
    public CompCode: number;
}
class P_D_SalesResponsibility {
    constructor() {
        this.ReposibilityId = 0;
        this.ResposibilityCode = "";
        this.IsCustomer = false;
        this.DescA = "";
        this.DescE = "";
        this.Remarks = "";
        this.CompCode = 0;
    }
    public ReposibilityId: number;
    public ResposibilityCode: string;
    public IsCustomer: boolean;
    public DescA: string;
    public DescE: string;
    public Remarks: string;
    public CompCode: number;
}

class P_TR_SalesInvoice {
    constructor() {
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
        this.TrTime ="";
        this.DocNo = "";
        this.DocUUID = "";
        this.InvoiceTypeCode = 0;
        this.InvoiceTransCode = 0;
        this.GlobalInvoiceCounter = 0;
        this.PrevInvoiceHash
        this.QRCode
        this.CryptographicStamp
        this.AdvanceConsumPrc = 0;
    }
    public InvoiceId: number;
    public TrNo: number;
    public TrDate: string;

    public ProjectID: number;
    public ProjCode: string;
    public BillCode: number;
    public FromDate: string;
    public ToDate: string;
    public WorkDiscription: string;
    public TotalAmount: number;
    public DiscountPrc: number;
    public Discount: number;
    public VatAmount: number;
    public NetAmount: number;
    public CustomerID: number;
    public IsFinal: boolean;
    public RefCode: string;
    public Status: number;
    public Remarks: string;
    public BraCode: number;
    public CompCode: number;
    public CreatedBy: string;
    public CreatedAt: string;
    public UpdatedBy: string;
    public UpdatedAt: string;
    public VatPrc: number;
    public RetentionPrc: number;
    public RetentionAmount: number;
    public AdvDeduction: number;
    public AdvVatAmount: number;
    public TaxableAmount: number;
    public NetTax: number;
    public DueAmount: number;
    public IsDownpayment: boolean;
    public UsedDownpayment: number;
    public RemainDownpayment: number;
    public TrTime: string;
    public DocNo: string;
    public DocUUID: string;
    public InvoiceTypeCode: number;
    public InvoiceTransCode: number;
    public GlobalInvoiceCounter: number;
    public PrevInvoiceHash: any;
    public QRCode: any;
    public CryptographicStamp: any;
    public AdvanceConsumPrc: number;
}


class P_TR_SalesProductionDetail {
    constructor() {
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
    public ProductionDetailId: number;
    public ProductionId: number;
    public Serial: number;
    public ItemID: number;
    public ProjectPhaseItemId: number;
    public PrevProdQty: number;
    public ProdQty: number;
    public UnitPrice: number;
    public BilledQty: number;
    public RejectedQty: number;
    public Remarks: string;
}
class P_TR_SalesInvoiceDetail {
    constructor() {
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
    public InvoiceDetailId: number;
    public InvoiceId: number;
    public Serial: number;
    public ProjectPhaseItemId: number;
    public ProdQty: number;
    public PrevBillQty: number;
    public BillQty: number;
    public UnitPrice: number;
    public Remarks: string;
    public ItemDiscountPrc: number;
    public ItemDiscountAmt: number;
    public NetUnitPrice: number;
    public ItemVatPrc: number;
    public ItemVatAmount: number;
    public ItemTotal: number;
    public ItemTotalAVat: number;
}


class P_TR_SalesInvoiceProd {
    constructor() {
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
    public InvoiceProdId: number;
    public InvoiceDetailId: number;
    public InvoiceId: number;
    public ProductionDetailId: number;
    public ProductionId: number;
    public ProjectPhaseItemId: number;
    public ItemID: number;
    public InvQty: number;
    public UnitPrice: number;
    public Total: number;
    public BilledQty: number;
    public Remarks: string;
    public ToBillQty: number;
}
class P_TR_SalesOffer {
    constructor() {
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
    public OfferID: number;
    public TrNo: number;
    public TrSerial: number;
    public TrDate: string;
    public RefCode: string;
    public DescA: string;
    public DescL: string;
    public SendDate: string;
    public IsMaintenanceWork: boolean;
    public IsMainCustomerPay: boolean;
    public LocationId: number;
    public ProjArea: number;
    public ProjAddress: string;
    public ProjTechnicalSpecs: string;
    public ProjectTermsCond: string;
    public ProjectPenalties: string;
    public CustomerPONo: string;
    public CustomerID: number;
    public SalesEngineerId: number;
    public Status: number;
    public Remarks: string;
    public BraCode: number;
    public CompCode: number;
    public CreatedBy: string;
    public CreatedAt: string;
    public UpdatedBy: string;
    public UpdatedAt: string;
    public WorkStartId: number;
    public IsNewProject: boolean;
    public ProjectBranch: number;
    public ProjectID: number;
    public ProjectCode: string;
    public PhaseID: number;
    public PhaseCode: string;
    public ContractCode: string;
    public ContractDate: string;
    public ContractPeriod: number;
    public ContractPrice: number;
    public ContractNetPrice: number;
    public DiscountPrc: number;
    public DiscountAmount: number;
    public ContractWarantyPrd: string;
    public PaymentMethod: number;
    public DownPaymentPrc: number;
    public DownPaymentAmount: number;
    public WarrntyPaymentPrc: number;
    public WarrntyPaymentAmount: number;
    public OHMaterialPrc: number;
    public OHLaborPrc: number;
    public OHEquipPrc: number;
    public ProdOHMaterialPrc: number;
    public ProdOHLaborPrc: number;
    public ProdOHEquipPrc: number;
    public ProfitMarginPrc: number;
    public EstimatedMaterial: number;
    public EstimatedLabor: number;
    public EstimatedEquip: number;
    public EstimatedProfit: number;
    public EstimatedOH: number;
    public EstimatedPOH: number;
    public WaranteePrd: number;
    public VatPrc: number;
}
class P_Tr_SalesOfferBilling {
    constructor() {
        this.OfferBillingId = 0;
        this.OfferID = 0;
        this.Serial = 0;
        this.PayDescA = "";
        this.PayDescE = "";
        this.DueDate = "";
        this.Remarks = "";
        this.OfferItemId = 0;
        this.ProductionPrc
        this.DuePrc = 0;
        this.DueAmount = 0;
    }
    public OfferBillingId: number;
    public OfferID: number;
    public Serial: number;
    public PayDescA: string;
    public PayDescE: string;
    public DueDate: string;
    public Remarks: string;
    public OfferItemId: number;
    public ProductionPrc: any;
    public DuePrc: number;
    public DueAmount: number;
}
class P_Tr_SalesOfferPayment {
    constructor() {
        this.OfferPaymentId = 0;
        this.OfferID = 0;
        this.PaymentId = 0;
    }
    public OfferPaymentId: number;
    public OfferID: number;
    public PaymentId: number;
}
class P_TR_SalesOfferResponsibility {
    constructor() {
        this.OfferResponsibilityId = 0;
        this.OfferID = 0;
        this.IsCustomer = false;
        this.ReposibilityId = 0;
    }
    public OfferResponsibilityId: number;
    public OfferID: number;
    public IsCustomer: boolean;
    public ReposibilityId: number;
}
class P_Tr_SalesOfferStage {
    constructor() {
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
    public OfferStageId: number;
    public OfferID: number;
    public StageCode: number;
    public StageDescA: string;
    public StageDescE: string;
    public ScopeID: number;
    public StageTotal: number;
    public Remarks: string;
    public EstimatedMaterial: number;
    public EstimatedLabor: number;
    public EstimatedEquip: number;
    public EstimatedProfit: number;
    public EstimatedOH: number;
    public EstimatedPOH: number;
}
class P_Tr_SalesOfferStageItem {
    constructor() {
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
    public OfferItemId: number;
    public OfferStageId: number;
    public OfferID: number;
    public LineCode: string;
    public ItemID: number;
    public ItemCode: string;
    public DescA: string;
    public DescE: string;
    public TechDescA: string;
    public TechDescE: string;
    public UomId: number;
    public IsFixedSystem: boolean;
    public Qty: number;
    public UnitPrice: number;
    public StdUnitPrice: number;
    public MinUnitPrice: number;
    public IsOfferItem: boolean;
    public ProductionType: number;
    public Remarks: string;
    public EstimatedMaterial: number;
    public EstimatedLabor: number;
    public EstimatedEquip: number;
    public EstimatedProfit: number;
    public EstimatedOH: number;
    public EstimatedPOH: number;
}
class P_Tr_SalesOfferStageItemActivity {
    constructor() {
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
    public OfferStageItemActivityId: number;
    public OfferItemId: number;
    public OfferStageId: number;
    public OfferID: number;
    public ActivityID: number;
    public Serial: number;
    public Qty: number;
    public UnitPrice: number;
    public StdUnitPrice: number;
    public ProductionIncluded: boolean;
    public ProductionPrc: number;
    public Remarks: string;
    public EstimatedMaterial: number;
    public EstimatedLabor: number;
    public EstimatedEquip: number;
    public EstimatedProfit: number;
}
class P_TR_SalesProduction {
    constructor() {
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
    public ProductionId: number;
    public TrNo: number;
    public TrDate: string;
    public ProjectID: number;
    public ProjCode: string;
    public BillCode: number;
    public FromDate: string;
    public ToDate: string;
    public ProdTotal: number;
    public DiscountPrc: number;
    public Discount: number;
    public NetAmount: number;
    public WorkDiscription: string;
    public CustomerID: number;
    public IsFinal: boolean;
    public RefCode: string;
    public Status: number;
    public Remarks: string;
    public BraCode: number;
    public CompCode: number;
    public CreatedBy: string;
    public CreatedAt: string;
    public UpdatedBy: string;
    public UpdatedAt: string;
}
class P_Tr_SalesActivtyPriceDetail {
    constructor() {
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
    public ActivityPriceDetailId: number;
    public ActivityPriceId: number;
    public ActivityID: number;
    public OldPrice: number;
    public NewPrice: number;
    public MatCost: number;
    public LaborCost: number;
    public EquipCost: number;
    public POHCost: number;
    public OHCost: number;
    public Profit: number;
}
class P_Tr_SalesActivtyPrice {
    constructor() {
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
    public ActivityPriceId: number;
    public TrNo: number;
    public TrDate: string;
    public FromActivityCode: string;
    public ToActivityCode: string;
    public ParentActivityID: number;
    public Status: boolean;
    public Remarks: string;
    public CompCode: number;
    public CreatedBy: string;
    public CreatedAt: string;
    public UpdatedBy: string;
    public UpdatedAt: string;
}
class P_Tr_SalesBonus {
    constructor() {
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
    public SalesBonusId: number;
    public TrNo: number;
    public TrDate: string;
    public Fyear: number;
    public Qrtr: number;
    public FromDate: string;
    public ToDate: string;
    public Status: number;
    public Remarks: string;
    public BraCode: number;
    public CompCode: number;
    public CreatedBy: string;
    public CreatedAt: string;
    public UpdatedBy: string;
    public UpdatedAt: string;
}
class P_Tr_SalesBonusDetail {
    constructor() {
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
    public SalesBonusDetailId: number;
    public SalesBonusId: number;
    public SalesEngineerId: number;
    public SalesEngCategoryId: number;
    public Salary: number;
    public OpenBasket: number;
    public OpenSales: number;
    public CurrentSales: number;
    public AddToBusket: number;
    public CurrentBasket: number;
    public CurrentInvoices: number;
    public BonusAmount: number;
}
class PQ_GETSalesItemSystemAct {
    constructor() {
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
    public ItemID: number;
    public ItemCode: string;
    public DescA: string;
    public DescE: string;
    public UomID: number;
    public MinUnitPrice: number;
    public UnitPrice: number;
    public ParentItemID: number;
    public ScopeID: number;
    public ItemLevel: number;
    public IsActive: boolean;
    public IsDetail: boolean;
    public Remarks: string;
    public CompCode: number;
    public CreatedBy: string;
    public CreatedAt: string;
    public UpdatedBy: string;
    public UpdatedAt: string;
    public SystemCode: string;
    public SysDescA: string;
    public SysDescE: string;
    public VendorID: number;
    public CalcUnitPrice: number;
    public SysMinUnitPrice: number;
    public SysUnitPrice: number;
    public ItemsSystemId: number;
    public SysItemID: number;
    public SysCompCode: number;
    public UomCode: string;
    public UomDescA: string;
    public UomDescE: string;
    public ScopeCode: string;
    public ScopeDescA: string;
    public ScopeDescE: string;
    public ItemsSystemActivityId: number;
    public SysActItemSystemID: number;
    public ActivityID: number;
    public ActQty: number;
    public IsProdIncluded: string;
    public ProdPrc: number;
    public ActivityCode: string;
    public ActDescA: string;
    public ActDescE: string;
    public NAMEA: string;
    public puomcode: string;
    public puomdescA: string;
    public puomDescE: string;
}
class PQ_GetSalesItem {
    constructor() {
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
    public ItemID: number;
    public ItemCode: string;
    public DescA: string;
    public DescE: string;
    public UomID: number;
    public MinUnitPrice: number;
    public UnitPrice: number;
    public ParentItemID: number;
    public ScopeID: number;
    public ItemLevel: number;
    public IsDetail: boolean;
    public IsActive: boolean;
    public Remarks: string;
    public CompCode: number;
    public CreatedBy: string;
    public CreatedAt: string;
    public UpdatedBy: string;
    public UpdatedAt: string;
    public UomCode: string;
    public UomDescA: string;
    public UomDescE: string;
    public ScopeCode: string;
    public ScopeDescA: string;
    public ScopeDescE: string;
    public TechDescA: string;
    public TechDescE: string;
    public StdPrice: number;
    public IsEditable: boolean;
}
class PQ_GetSalesActivityPrice {
    constructor() {
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
    public ActivityPriceId: number;
    public TrNo: number;
    public TrDate: string;
    public FromActivityCode: string;
    public ToActivityCode: string;
    public ParentActivityID: number;
    public Status: boolean;
    public Remarks: string;
    public CompCode: number;
    public CreatedBy: string;
    public CreatedAt: string;
    public UpdatedBy: string;
    public UpdatedAt: string;
    public M_ActivityCode: string;
    public M_ActName_ar: string;
    public M_ActName_en: string;
}
class PQ_GetSalesActivityPriceDetails {
    constructor() {
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
    public ActivityPriceDetailId: number;
    public ActivityPriceId: number;
    public D_ActivityPriceId: number;
    public ActivityID: number;
    public OldPrice: number;
    public NewPrice: number;
    public MatCost: number;
    public LaborCost: number;
    public EquipCost: number;
    public POHCost: number;
    public OHCost: number;
    public Profit: number;
    public Calc_TotalCost: number;
    public D_ActivityCode: string;
    public D_ActName_ar: string;
    public D_ActName_en: string;
}

//End PMS_Sales

//Start Views Sales
class PQ_GetSalesManBonus {
    constructor() {
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
    public SalesBonusId: number;
    public TrNo: number;
    public TrDate: string;
    public Fyear: number;
    public Qrtr: number;
    public FromDate: string;
    public ToDate: string;
    public Status: number;
    public Remarks: string;
    public BraCode: number;
    public CompCode: number;
    public CreatedBy: string;
    public CreatedAt: string;
    public UpdatedBy: string;
    public UpdatedAt: string;
    public SalesBonusDetailId: number;
    public D_SalesBonusId: number;
    public SalesEngineerId: number;
    public D_SalesEngCategoryId: number;
    public Salary: number;
    public OpenBasket: number;
    public OpenSales: number;
    public CurrentSales: number;
    public AddToBusket: number;
    public CurrentBasket: number;
    public CurrentInvoices: number;
    public BonusAmount: number;
    public SlsEng_SalesEngineerId: number;
    public EngCode: string;
    public DeacA: string;
    public SalesEngCategoryId: number;
    public CategCode: string;
    public SlsCat_DescA: string;
    public SlsCat_DescE: string;
}
class PQ_GetSlsCustomer {
    constructor() {
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
    public CustomerID: number;
    public CustomerCategoryID: number;
    public CustomerCode: number;
    public IsTemporary: boolean;
    public DescA: string;
    public DescE: string;
    public GLAccountCode: string;
    public ContactPerson: string;
    public ContactTel: string;
    public Tel1: string;
    public Tel2: string;
    public CustomerAddress: string;
    public Fax: string;
    public Mobile: string;
    public Email: string;
    public IsActive: boolean;
    public CrNo: string;
    public ChamberNo: string;
    public VatNo: string;
    public VatType: number;
    public SalesEngineerId: number;
    public BraCode: number;
    public Remarks: string;
    public CompCode: number;
    public CreatedBy: string;
    public CreatedAt: string;
    public UpdatedBy: string;
    public UpdatedAt: string;
    public custEng_code: string;
    public custeng_descA: string;
    public CustEng_descE: string;
    public CustomerCatCode: string;
    public CatDescA: string;
    public CatDescE: string;
    public ProjectCode: string;
    public Proj_descA: string;
    public Proj_descE: string;
    public CustomerAccCode: string;
    public CustomerTel: string;
    public Customermobile: string;
    public CustomerContact: string;
    public Proj_remarks: string;
    public ProjBraCode: number;
    public ProjEngCode: string;
}
class PQ_GetSlsOfferBilling {
    constructor() {
        this.OfferBillingId = 0;
        this.OfferID = 0;
        this.Serial = 0;
        this.PayDescA = "";
        this.PayDescE = "";
        this.DueDate = "";
        this.Remarks = "";
        this.OfferItemId = 0;
        this.ProductionPrc
        this.DuePrc = 0;
        this.DueAmount = 0;
        this.OffStage_OfferItemId = 0;
        this.DescA = "";
        this.DescE = "";
        this.ItemCode = "";
    }
    public OfferBillingId: number;
    public OfferID: number;
    public Serial: number;
    public PayDescA: string;
    public PayDescE: string;
    public DueDate: string;
    public Remarks: string;
    public OfferItemId: number;
    public ProductionPrc: any;
    public DuePrc: number;
    public DueAmount: number;
    public OffStage_OfferItemId: number;
    public DescA: string;
    public DescE: string;
    public ItemCode: string;
}

class IQ_SrchItem {
    constructor() {
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
    public ItemID: number;
    public ItemCode: string;
    public CompCode: number;
    public DescA: string;
    public DescL: string;
    public GlobalCost: number;
    public UomCode: string;
    public Unit_descA: string;
    public Unit_descE: string;
    public CatCode: string;
    public Cat_DescA: string;
    public Cat_DescE: string;
}
class PQ_GetActivityEquipmentClass {
    constructor() {
        this.ActivityEquipClassID = 0;
        this.ActivityID = 0;
        this.EquipClassId = 0;
        this.NoOfEquipments = 0;
        this.ClassCode = "";
        this.DescA = "";
        this.DescE = "";
        this.HourCost = 0;
    }
    public ActivityEquipClassID: number;
    public ActivityID: number;
    public EquipClassId: number;
    public NoOfEquipments: number;
    public ClassCode: string;
    public DescA: string;
    public DescE: string;
    public HourCost: number;
}
class PQ_GetActivityLaborClass {
    constructor() {
        this.ClassCode = "";
        this.DescA = "";
        this.DescE = "";
        this.ActivityLaborClassID = 0;
        this.ActivityID = 0;
        this.LaborClassId = 0;
        this.NoOfLabors = 0;
        this.HourCost = 0;
    }
    public ClassCode: string;
    public DescA: string;
    public DescE: string;
    public ActivityLaborClassID: number;
    public ActivityID: number;
    public LaborClassId: number;
    public NoOfLabors: number;
    public HourCost: number;
}
class PQ_GetActivityMaterialClass {
    constructor() {
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
    }
    public ActivityMaterialID: number;
    public ActivityID: number;
    public ItemID: number;
    public ProdQty: number;
    public WastPrc: number;
    public WastQty: number;
    public ReqQty: number;
    public ItemCode: string;
    public DescA: string;
    public DescL: string;
    public UomCode: string;
    public Unit_descA: string;
    public Unit_descE: string;
}

class PQ_GetSalesCustomer {
    constructor() {
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
    public CustomerID: number;
    public CustomerCategoryID: number;
    public CustCat_Name_Ar: string;
    public CustCat_Name_En: string;
    public CustomerCode: number;
    public IsTemporary: boolean;
    public DescA: string;
    public DescE: string;
    public GLAccountCode: string;
    public ContactPerson: string;
    public ContactTel: string;
    public CustomerAddress: string;
    public Tel1: string;
    public Tel2: string;
    public Fax: string;
    public Mobile: string;
    public Email: string;
    public IsActive: boolean;
    public CrNo: string;
    public ChamberNo: string;
    public VatNo: string;
    public VatType: number;
    public SalesEngineerId: number;
    public Eng_Name_Ar: string;
    public Eng_Name_En: string;
    public BraCode: number;
    public Remarks: string;
    public CompCode: number;
    public CreatedBy: string;
    public CreatedAt: string;
    public UpdatedBy: string;
    public UpdatedAt: string;
    public RefCode2: string;
    public RefCode1: string;
    public ISPersonal: boolean;
    public Address_postal: string;
    public Address_Province: string;
    public Address_Street: string;
    public Address_Str_Additional: string;
    public Address_BuildingNo: string;
    public Address_Build_Additional: string;
    public Address_City: string;
    public Address_District: string;
    public ISVatRegistered: boolean;
}


class PQ_GetSalesOffer {
    constructor() {
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
    public OfferID: number;
    public TrNo: number;
    public TrSerial: number;
    public TrDate: string;
    public RefCode: string;
    public DescA: string;
    public DescL: string;
    public SendDate: string;
    public IsMaintenanceWork: boolean;
    public IsMainCustomerPay: boolean;
    public LocationId: number;
    public ProjArea: number;
    public ProjAddress: string;
    public ProjTechnicalSpecs: string;
    public ProjectTermsCond: string;
    public ProjectPenalties: string;
    public CustomerID: number;
    public CustomerPONo: string;
    public SalesEngineerId: number;
    public Status: number;
    public Remarks: string;
    public BraCode: number;
    public CompCode: number;
    public CreatedBy: string;
    public CreatedAt: string;
    public UpdatedBy: string;
    public UpdatedAt: string;
    public WorkStartId: number;
    public IsNewProject: boolean;
    public ProjectBranch: number;
    public ProjectID: number;
    public ProjectCode: string;
    public PhaseID: number;
    public PhaseCode: string;
    public ContractCode: string;
    public ContractDate: string;
    public ContractPeriod: number;
    public ContractPrice: number;
    public ContractNetPrice: number;
    public DiscountPrc: number;
    public DiscountAmount: number;
    public ContractWarantyPrd: string;
    public PaymentMethod: number;
    public DownPaymentPrc: number;
    public DownPaymentAmount: number;
    public WarrntyPaymentPrc: number;
    public WarrntyPaymentAmount: number;
    public OHMaterialPrc: number;
    public OHLaborPrc: number;
    public OHEquipPrc: number;
    public ProdOHMaterialPrc: number;
    public ProdOHLaborPrc: number;
    public ProdOHEquipPrc: number;
    public ProfitMarginPrc: number;
    public EstimatedMaterial: number;
    public EstimatedLabor: number;
    public EstimatedEquip: number;
    public EstimatedProfit: number;
    public WaranteePrd: number;
    public Loc_LocCode: string;
    public Loc_DescA: string;
    public loc_DescE: string;
    public eng_EngCode: string;
    public Eng_DescA: string;
    public Eng_DescE: string;
    public cus_CustomerCode: number;
    public cus_IsTemporary: boolean;
    public cus_DescA: string;
    public Cus_DescE: string;
    public EstimatedOH: number;
    public EstimatedPOH: number;
    public VatPrc: number;
}
class PQ_GetSlsOfferPayment {
    constructor() {
        this.OfferPaymentId = 0;
        this.OfferID = 0;
        this.PaymentId = 0;
        this.pay_PaymentCode = "";
        this.Pay_DescA = "";
        this.Pay_DescE = "";
    }
    public OfferPaymentId: number;
    public OfferID: number;
    public PaymentId: number;
    public pay_PaymentCode: string;
    public Pay_DescA: string;
    public Pay_DescE: string;
}
class PQ_GetSlsOfferResponsibility {
    constructor() {
        this.OfferResponsibilityId = 0;
        this.OfferID = 0;
        this.IsCustomer = false;
        this.ReposibilityId = 0;
        this.Ras_ResposibilityCode = "";
        this.Res_IsCustomer = false;
        this.Res_DescA = "";
        this.Res_DescE = "";
    }
    public OfferResponsibilityId: number;
    public OfferID: number;
    public IsCustomer: boolean;
    public ReposibilityId: number;
    public Ras_ResposibilityCode: string;
    public Res_IsCustomer: boolean;
    public Res_DescA: string;
    public Res_DescE: string;
}
class PQ_GetSlsOfferStage {
    constructor() {
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
    public OfferStageId: number;
    public OfferID: number;
    public StageCode: number;
    public StageDescA: string;
    public StageDescE: string;
    public ScopeID: number;
    public StageTotal: number;
    public Remarks: string;
    public EstimatedMaterial: number;
    public EstimatedLabor: number;
    public EstimatedEquip: number;
    public EstimatedProfit: number;
    public Scope_ScopeCode: string;
    public Scope_DESCA: string;
    public Scope_DESCE: string;
    public EstimatedOH: number;
    public EstimatedPOH: number;
}
class PQ_GetOfferCostEstimation {
    constructor() {
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
    public OfferID: number;
    public TrNo: number;
    public TrSerial: number;
    public TrDate: string;
    public RefCode: string;
    public DescA: string;
    public DescL: string;
    public CustomerID: number;
    public Status: number;
    public Remarks: string;
    public BraCode: number;
    public CompCode: number;
    public ContractDate: string;
    public ContractPrice: number;
    public EstimatedProfit: number;
    public ProfitMarginPrc: number;
    public CustomerCode: number;
    public SlsCust_DescA: string;
    public DescE: string;
    public OfferItemId: number;
    public OfferStageId: number;
    public stageItm_OfferID: number;
    public Serial: number;
    public ItemID: number;
    public Qty: number;
    public UnitPrice: number;
    public StdUnitPrice: number;
    public IsOfferItem: boolean;
    public ProductionType: number;
    public stageItm_Remarks: string;
    public EstimatedMaterial: number;
    public EstimatedLabor: number;
    public EstimatedEquip: number;
    public stageItm_EstimatedProfit: number;
    public ItemCode: string;
    public itm_DescA: string;
    public itmDescL: string;
    public OfferStageItemActivityId: number;
    public itmAct_OfferItemId: number;
    public itmAct_OfferStageId: number;
    public itmAct_OfferID: number;
    public ActivityID: number;
    public itmAct_Serial: number;
    public itmAct_Qty: number;
    public itmAct_UnitPrice: number;
    public itmAct_StdUnitPrice: number;
    public ProductionIncluded: boolean;
    public ProductionPrc: number;
    public itmAct_Remarks: string;
}
class PQ_GetSlsOfferStageItem {
    constructor() {
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
    public OfferItemId: number;
    public OfferStageId: number;
    public OfferID: number;
    public ItemID: number;
    public IsFixedSystem: boolean;
    public Qty: number;
    public UnitPrice: number;
    public StdUnitPrice: number;
    public MinUnitPrice: number;
    public IsOfferItem: boolean;
    public ProductionType: number;
    public Remarks: string;
    public EstimatedMaterial: number;
    public EstimatedLabor: number;
    public EstimatedProfit: number;
    public EstimatedEquip: number;
    public calc_total: number;
    public Uom_UomCode: string;
    public UOM_DescA: string;
    public Uom_DescE: string;
    public EstimatedOH: number;
    public EstimatedPOH: number;
    public UnitCost: number;
    public LineCode: string;
    public DescA: string;
    public DescE: string;
    public TechDescA: string;
    public TechDescE: string;
    public UomId: number;
    public ItemCode: string;
}
class PQ_GetSlsOfferActivity {
    constructor() {
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
    public OfferStageItemActivityId: number;
    public OfferItemId: number;
    public OfferStageId: number;
    public OfferID: number;
    public ActivityID: number;
    public Serial: number;
    public Qty: number;
    public UnitPrice: number;
    public StdUnitPrice: number;
    public ProductionIncluded: boolean;
    public ProductionPrc: number;
    public Remarks: string;
    public EstimatedMaterial: number;
    public EstimatedLabor: number;
    public EstimatedEquip: number;
    public EstimatedProfit: number;
    public EstimatedOH: number;
    public EstimatedPOH: number;
    public Act_ActivityCode: string;
    public Act_DescA: string;
    public Act_DescE: string;
    public UnitCost: number;
    public Uom_UomCode: string;
    public UOM_DescA: string;
    public Uom_DescE: string;
}
//End Views Sales

//PMS_Eng Tables
class P_TR_EngExpensesEntry {
    constructor() {
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
    public ExpensesEntryId: number;
    public TrNo: number;
    public TrDate: string;
    public ProjectPhaseId: number;
    public ProjectID: number;
    public TotalAmount: number;
    public Status: boolean;
    public Remarks: string;
    public BraCode: number;
    public CompCode: number;
    public CreatedBy: string;
    public CreatedAt: string;
    public UpdatedBy: string;
    public UpdatedAt: string;
}
class P_TR_EngExpensesEntryDetail {
    constructor() {
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
    public ExpensesEntryDetailId: number;
    public ExpensesEntryId: number;
    public SeqNo: number;
    public ExpencesID: number;
    public ProjectPhaseId: number;
    public Amount: string;
    public Benificial: string;
    public RefNo: string;
    public Remarks: string;
}
class P_Tr_EngProduction {
    constructor() {
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
    public ProductionId: number;
    public ScheduleId: number;
    public TrNo: number;
    public TrDate: string;
    public ProjectPhaseId: number;
    public ProjectID: number;
    public StartDateTime: string;
    public EndDateTime: string;
    public CalenderId: number;
    public WorkHours: number;
    public WorkDescr: string;
    public UnProdReasonId: number;
    public TotalunProdHours: number;
    public Status: number;
    public IsCloseScheduel: boolean;
    public Remarks: string;
    public BraCode: number;
    public CompCode: number;
    public CreatedBy: string;
    public CreatedAt: string;
    public UpdatedBy: string;
    public UpdatedAt: string;
}
class P_TR_EngProductionActiv {
    constructor() {
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
    public ProductionActivId: number;
    public ProductionId: number;
    public ScheduleId: number;
    public ScheduleActivId: number;
    public FinishQty: number;
    public ProdBeforeQty: number;
    public ActivityID: number;
    public ProjectPhaseItemActivId: number;
    public ItemId: number;
}
class P_TR_EngProductionEquip {
    constructor() {
        this.ProductionequipId = 0;
        this.ProductionId = 0;
        this.EquipmentID = 0;
        this.WorkHours = 0;
        this.UnProdHours = 0;
        this.HourCost = 0;
        this.EstHours = 0;
    }
    public ProductionequipId: number;
    public ProductionId: number;
    public EquipmentID: number;
    public WorkHours: number;
    public UnProdHours: number;
    public HourCost: number;
    public EstHours: number;
}
class P_TR_EngProductionLabour {
    constructor() {
        this.ProductionLaborId = 0;
        this.ProductionId = 0;
        this.LaborID = 0;
        this.WorkHours = 0;
        this.UnProdHours = 0;
        this.HourCost = 0;
        this.EstHours = 0;
    }
    public ProductionLaborId: number;
    public ProductionId: number;
    public LaborID: number;
    public WorkHours: number;
    public UnProdHours: number;
    public HourCost: number;
    public EstHours: number;
}
class P_TR_EngProject {
    constructor() {
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
    public ProjectID: number;
    public ProjectCode: string;
    public DescA: string;
    public DescL: string;
    public OfferID: number;
    public OfferTrNo: number;
    public OfferTrSerial: number;
    public LocationId: number;
    public CustomerID: number;
    public SalesEngineerId: number;
    public CustomerAccCode: string;
    public CustomerTel: string;
    public CustomerMobile: string;
    public CustomerContact: string;
    public CC_CODE: number;
    public ProjArea: number;
    public ProjAddress: string;
    public ProjTechnicalSpecs: string;
    public ProjectTermsCond: string;
    public ContractCode: string;
    public ContractDate: string;
    public ContractRefNo: string;
    public ContractPeriod: number;
    public ContractPrice: number;
    public ContractDiscountPrc: number;
    public ContractDiscountAmount: number;
    public ContractAdditions: number;
    public ContractDuration: number;
    public ContractWarantyPrd: string;
    public PaymentMethod: number;
    public DownPaymentPrc: number;
    public DownPaymentAmount: number;
    public WarrntyPaymentPrc: number;
    public WarrntyPaymentAmount: number;
    public Status: number;
    public Remarks: string;
    public BraCode: number;
    public CompCode: number;
    public CreatedBy: string;
    public CreatedAt: string;
    public UpdatedBy: string;
    public UpdatedAt: string;
    public OHMaterialPrc: number;
    public OHLaborPrc: number;
    public OHEquipPrc: number;
    public ProdOHMaterialPrc: number;
    public ProdOHLaborPrc: number;
    public ProdOHEquipPrc: number;
    public ProfitMarginPrc: number;
    public EstimatedMaterial: number;
    public EstimatedLabor: number;
    public EstimatedEquip: number;
    public EstimatedProfit: number;
    public EstimatedOH: number;
    public EstimatedPOH: number;
    public StartDate: string;
    public EndDate: string;
    public ISPosted: boolean;
    public VatPrc: number;
}
class P_TR_EngProjectActivity {
    constructor() {
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
    public ProjectPhaseItemActivId: number;
    public ProjectPhaseItemId: number;
    public ProjectPhaseId: number;
    public ProjectID: number;
    public ActivityID: number;
    public Serial: number;
    public ContrQty: number;
    public ActivQty: number;
    public TotalProdQty: number;
    public SchedQty: number;
    public SchedProdQty: number;
    public SCon_Qty: number;
    public SConProdQty: number;
    public UnitPrice: number;
    public StdUnitPrice: number;
    public ProductionIncluded: boolean;
    public ProductionPrc: number;
    public Remarks: string;
    public EstimatedMaterial: number;
    public EstimatedLabor: number;
    public EstimatedEquip: number;
    public EstimatedProfit: number;
    public StartDate: string;
    public EndDate: string;
    public RelProjectPhaseItemActivId: number;
    public RelationType: number;
    public RelationDelay: number;
}

class P_TR_EngProjectItem {
    constructor() {
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
    public ProjectPhaseItemId: number;
    public ProjectPhaseId: number;
    public ProjectID: number;
    public OfferItemId: number;
    public ItemID: number;
    public IsFixedSystem: boolean;
    public ContrQty: number;
    public ItemQty: number;
    public ProdQty: number;
    public BilledQty: number;
    public UnitPrice: number;
    public StdUnitPrice: number;
    public IsOfferItem: boolean;
    public ProductionType: number;
    public Remarks: string;
    public EstimatedMaterial: number;
    public EstimatedLabor: number;
    public EstimatedEquip: number;
    public EstimatedProfit: number;
    public EstimatedOH: number;
    public EstimatedPOH: number;
    public StartDate: string;
    public EndDate: string;
    public RelProjectPhaseItemId: number;
    public RelationType: number;
    public RelationDelay: number;
    public ItemCode: string;
    public LineCode: string;
}

class P_TR_EngProjectPhase {
    constructor() {
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
    public ProjectPhaseId: number;
    public ProjectID: number;
    public ProjectPhaseCode: string;
    public DescA: string;
    public DescL: string;
    public OfferID: number;
    public OfferTrNo: number;
    public OfferTrSerial: number;
    public CC_CODE: string;
    public SiteEngineerId: number;
    public StartDate: string;
    public EndDate: string;
    public IsMaintenanceWork: boolean;
    public IsBonusIncluded: boolean;
    public ToBeInvoiced: boolean;
    public ScopeID: number;
    public CalenderId: number;
    public Status: number;
    public Remarks: string;
    public EstimatedMaterial: number;
    public EstimatedLabor: number;
    public EstimatedEquip: number;
    public EstimatedProfit: number;
    public EstimatedOH: number;
    public EstimatedPOH: number;
    public ISPosted: boolean;
}

class P_TR_EngSchedule {
    constructor() {
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
    public ScheduleId: number;
    public TrNo: number;
    public TrDate: string;
    public ProjectPhaseId: number;
    public ProjectID: number;
    public StartDateTime: string;
    public EndDateTime: string;
    public CalenderId: number;
    public WorkHours: number;
    public CalHours: number;
    public OTHours: number;
    public WorkDescr: string;
    public RequestMaterialId: number;
    public RequestLabourId: number;
    public RequestEquipmentId: number;
    public IsOverTime: boolean;
    public Status: number;
    public Remarks: string;
    public BraCode: number;
    public CompCode: number;
    public CreatedBy: string;
    public CreatedAt: string;
    public UpdatedBy: string;
    public UpdatedAt: string;
}
class P_TR_EngScheduleActiv {
    constructor() {
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
    public ScheduleActivId: number;
    public ScheduleId: number;
    public ProjectPhaseItemActivId: number;
    public AvailQty: number;
    public SchedQty: number;
    public ProdBeforeQty: number;
    public TotSchedQty: number;
    public ActivQty: number;
    public FinishQty: number;
    public ItemId: number;
    public ActivityID: number;
}
class P_TR_EngScheduleEquip {
    constructor() {
        this.ScheduleEquipId = 0;
        this.ScheduleId = 0;
        this.EquimentID = 0;
        this.AssigneDate = "";
        this.LeaveDate = "";
        this.ExpLeaveDate = "";
    }
    public ScheduleEquipId: number;
    public ScheduleId: number;
    public EquimentID: number;
    public AssigneDate: string;
    public LeaveDate: string;
    public ExpLeaveDate: string;
}
class P_TR_EngScheduleEquipClass {
    constructor() {
        this.ScheduleEquipClassId = 0;
        this.ScheduleId = 0;
        this.EquipClassId = 0;
        this.RequiredNo = 0;
    }
    public ScheduleEquipClassId: number;
    public ScheduleId: number;
    public EquipClassId: number;
    public RequiredNo: number;
}
class P_TR_EngScheduleLaborClass {
    constructor() {
        this.ScheduleLaborClassId = 0;
        this.ScheduleId = 0;
        this.LaborCLassID = 0;
        this.RequiredNo = 0;
    }
    public ScheduleLaborClassId: number;
    public ScheduleId: number;
    public LaborCLassID: number;
    public RequiredNo: number;
}

class P_TR_EngScheduleLabor {
    constructor() {
        this.ScheduleLaborId = 0;
        this.ScheduleId = 0;
        this.LaborID = 0;
        this.AssigneDate = "";
        this.LeaveDate = "";
        this.ExpLeaveDate = "";
        this.HourCost = 0;
        this.Status = 0;
    }
    public ScheduleLaborId: number;
    public ScheduleId: number;
    public LaborID: number;
    public AssigneDate: string;
    public LeaveDate: string;
    public ExpLeaveDate: string;
    public HourCost: number;
    public Status: number;
}

class P_TR_EngVariation {
    constructor() {
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
    public VariationId: number;
    public TrNo: number;
    public TrDate: string;
    public ProjectPhaseId: number;
    public ProjectID: number;
    public RefNo: string;
    public RefDate: string;
    public VariationValue: number;
    public VariationDescr: string;
    public Status: boolean;
    public IsSalesApprove: boolean;
    public Remarks: string;
    public BraCode: number;
    public CompCode: number;
    public CreatedBy: string;
    public CreatedAt: string;
    public UpdatedBy: string;
    public UpdatedAt: string;
}

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
class P_TR_EngVariationActivity {
    constructor() {
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
    public VariationActivId: number;
    public ProjectPhaseId: number;
    public VariationItemId: number;
    public VariationId: number;
    public ProjectPhaseItemActivId: number;
    public ActivityID: number;
    public IsNew: boolean;
    public Old_ActivQty: number;
    public ActivQty: number;
    public UnitPrice: number;
    public StdUnitPrice: number;
    public OldProductionPrc: number;
    public ProductionPrc: number;
    public Remarks: string;
    public EstimatedMaterial: number;
    public EstimatedLabor: number;
    public EstimatedEquip: number;
    public EstimatedProfit: number;
    public OldEffItemQty: number;
    public NewEffItemQty: number;
    public TotProdQty: number;
    public UnderProdQty: number;
}
class P_TR_EngVariationItem {
    constructor() {
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
    public VariationItemId: number;
    public VariationId: number;
    public IsNew: boolean;
    public ProjectPhaseItemId: number;
    public LineCode: string;
    public ItemID: number;
    public DescA: string;
    public DescE: string;
    public UnitPrice: number;
    public OrgItemQty: number;
    public ItemQty: number;
    public EstimatedMaterial: number;
    public EstimatedLabor: number;
    public EstimatedEquip: number;
    public EstimatedProfit: number;
    public Remarks: string;
    public BilledQty: number;
    public ProdQty: number;
    public ProgressQty: number;
}

class P_D_SubCandidateScope {
    constructor() {
        this.SubCandidateScopeId = 0;
        this.CandidateID = 0;
        this.ScopeId = 0;
        this.ApplayDate = "";
        this.IsApproved = false;
        this.ApprovalDate = "";
        this.ContractLimit = 0;
        this.Remarks = "";
    }
    public SubCandidateScopeId: number;
    public CandidateID: number;
    public ScopeId: number;
    public ApplayDate: string;
    public IsApproved: boolean;
    public ApprovalDate: string;
    public ContractLimit: number;
    public Remarks: string;
}
class P_D_SubCandidate {
    constructor() {
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
    public SubContractorID: number;
    public CandidateCode: number;
    public SubContractorCode: number;
    public DescA: string;
    public DescE: string;
    public ContactPerson: string;
    public ContactTel: string;
    public SubContractorAddress: string;
    public Specialty: string;
    public Tel1: string;
    public Tel2: string;
    public Fax: string;
    public Mobile: string;
    public Email: string;
    public CrNo: string;
    public ChamberNo: string;
    public VatNo: string;
    public VatType: number;
    public ContractLimit: number;
    public BraCode: number;
    public Remarks: string;
    public CompCode: number;
    public CreatedBy: string;
    public CreatedAt: string;
    public UpdatedBy: string;
    public UpdatedAt: string;
}
class P_D_SubContractor {
    constructor() {
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
    public SubContractorID: number;
    public SubContractorCode: number;
    public CandidateID: number;
    public DescA: string;
    public DescE: string;
    public GLAccountCode: string;
    public ContactPerson: string;
    public ContactTel: string;
    public SubContractorAddress: string;
    public Specialty: string;
    public Tel1: string;
    public Tel2: string;
    public Fax: string;
    public Mobile: string;
    public Email: string;
    public IsActive: boolean;
    public CrNo: string;
    public ChamberNo: string;
    public VatNo: string;
    public VatType: number;
    public ContractLimit: number;
    public BraCode: number;
    public Remarks: string;
    public CompCode: number;
    public CreatedBy: string;
    public CreatedAt: string;
    public UpdatedBy: string;
    public UpdatedAt: string;
}
class P_D_SubContractorScope {
    constructor() {
        this.SubContractorScopeId = 0;
        this.SubContractorID = 0;
        this.ScopeId = 0;
        this.ApplayDate = "";
        this.IsApproved = false;
        this.ApprovalDate = "";
        this.ContractLimit = 0;
        this.Remarks = "";
    }
    public SubContractorScopeId: number;
    public SubContractorID: number;
    public ScopeId: number;
    public ApplayDate: string;
    public IsApproved: boolean;
    public ApprovalDate: string;
    public ContractLimit: number;
    public Remarks: string;
}
class P_TR_SubContract {
    constructor() {
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
    public SubContractId: number;
    public TrNo: number;
    public TrDate: string;
    public DescA: string;
    public DescE: string;
    public SubContractorID: number;
    public ScopeID: number;
    public ProjectID: number;
    public ProjectPhaseId: number;
    public TotalAmount: string;
    public ISMaterialIncluded: boolean;
    public ISFlexQty: boolean;
    public IsBlank: boolean;
    public StartDate: string;
    public EndDate: string;
    public Status: number;
    public Terms: string;
    public Technical: string;
    public Penalty: string;
    public MaterialRemarks: string;
    public EquipmentRemarks: string;
    public LaborRemarks: string;
    public Duration: number;
    public WarrantyPeriod: number;
    public DownpaymentPrc: number;
    public WarranlyPrc: number;
    public Remarks: string;
    public BraCode: number;
    public CompCode: number;
    public CreatedBy: string;
    public CreatedAt: string;
    public UpdatedBy: string;
    public UpdatedAt: string;
    public IsApproved: number;
    public IsClosed: number;
}
class P_TR_SubContractActivity {
    constructor() {
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
    public SubContractActivityId: number;
    public SubContractId: number;
    public ActivityId: number;
    public ProjectPhaseItemActivId: number;
    public ProjQty: number;
    public ContractQty: number;
    public SOQty: number;
    public ProdQty: number;
    public UnitPrice: string;
    public Remarks: string;
}
class P_TR_SubServiceOrderActivity {
    constructor() {
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
    public SubServiceOrderActivityId: number;
    public SubServiceOrderId: number;
    public SubContractActivityId: number;
    public ActivityId: number;
    public ProjectPhaseItemActivId: number;
    public ContractQty: number;
    public ProjectQty: number;
    public SOQty: number;
    public FinishQty: number;
    public AppQty: number;
    public UnitPrice: number;
    public Total: number;
    public RemainQty: number;
    public Remarks: string;
}
class P_TR_EngScheduleMaterial {
    constructor() {
        this.ScheduleMaterialId = 0;
        this.ScheduleId = 0;
        this.ItemId = 0;
        this.SchedQty = 0;
        this.ReqQty = 0;
        this.IssuedQty = 0;
        this.ReturnQty = 0;
        this.BalanceQty = 0;
    }
    public ScheduleMaterialId: number;
    public ScheduleId: number;
    public ItemId: number;
    public SchedQty: number;
    public ReqQty: number;
    public IssuedQty: number;
    public ReturnQty: number;
    public BalanceQty: number;
}
//End PMS_Eng Tables

//Strat Engineer Viwes
class PQ_GetEngSubCandidateScope {
    constructor() {
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
    public SubCandidateScopeId: number;
    public CandidateID: number;
    public ScopeId: number;
    public ApplayDate: string;
    public IsApproved: boolean;
    public ApprovalDate: string;
    public ContractLimit: number;
    public Remarks: string;
    public ScopeCode: string;
    public DescA: string;
    public DescE: string;
}
class PQ_GetEngSubContractorScope {
    constructor() {
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
    public SubContractorScopeId: number;
    public SubContractorID: number;
    public ScopeId: number;
    public ApplayDate: string;
    public IsApproved: boolean;
    public ApprovalDate: string;
    public ContractLimit: number;
    public Remarks: string;
    public ScopeCode: string;
    public DescA: string;
    public DescE: string;
}
class PQ_GetEngExpensesDetail {
    constructor() {
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
    public ExpensesEntryDetailId: number;
    public ExpensesEntryId: number;
    public SeqNo: number;
    public ExpencesID: number;
    public ProjectPhaseId: number;
    public Amount: string;
    public Benificial: string;
    public RefNo: string;
    public Remarks: string;
    public Exp_ExpCode: string;
    public Exp_DescA: string;
    public Exp_DescE: string;
    public Phase_Code: string;
    public Phase_DescA: string;
    public Phase_DescE: string;
}
class PQ_GetEngExpenses {
    constructor() {
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
    public ExpensesEntryId: number;
    public TrNo: number;
    public TrDate: string;
    public ProjectPhaseId: number;
    public ProjectID: number;
    public TotalAmount: number;
    public Status: boolean;
    public Remarks: string;
    public BraCode: number;
    public CompCode: number;
    public CreatedBy: string;
    public CreatedAt: string;
    public UpdatedBy: string;
    public UpdatedAt: string;
    public Proj_Code: string;
    public Proj_DescA: string;
    public Proj_DescE: string;
    public Phase_code: string;
    public Phase_DescA: string;
    public Phase_DescE: string;
}
class PQ_GetEngWorkSchdule {
    constructor() {
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
    public ScheduleId: number;
    public TrNo: number;
    public TrDate: string;
    public ProjectPhaseId: number;
    public ProjectID: number;
    public EndDateTime: string;
    public StartDateTime: string;
    public CalenderId: number;
    public WorkDescr: string;
    public RequestMaterialId: number;
    public RequestLabourId: number;
    public RequestEquipmentId: number;
    public WorkHours: number;
    public CalHours: number;
    public OTHours: number;
    public IsOverTime: boolean;
    public Status: number;
    public Remarks: string;
    public BraCode: number;
    public CompCode: number;
    public CreatedBy: string;
    public CreatedAt: string;
    public UpdatedBy: string;
    public UpdatedAt: string;
    public Prj_ProjectCode: string;
    public Prj_DescA: string;
    public Prj_DescE: string;
    public Prj_Status: number;
    public Phase_ProjectPhaseCode: string;
    public Phase_DescA: string;
    public Phase_DescE: string;
    public Phase_CCCode: string;
    public Phase_Status: number;
    public Cal_calenderCode: string;
    public Cal_DescA: string;
    public Cal_DescE: string;
    public RLab_TrNo: number;
    public REq_TrNo: number;
    public RMat_TrNo: number;
}
class PQ_GetEngWorkSchduleActivity {
    constructor() {
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
        this.DailyProd = 0
    }
    public ScheduleActivId: number;
    public ScheduleId: number;
    public ItemId: number;
    public ActivityID: number;
    public ProjectPhaseItemActivId: number;
    public AvailQty: number;
    public SchedQty: number;
    public ProdBeforeQty: number;
    public TotSchedQty: number;
    public ActivQty: number;
    public FinishQty: number;
    public Itm_ItemCode: string;
    public Itm_DescA: string;
    public Itm_DescE: string;
    public Act_ActivityCode: string;
    public Act_DescA: string;
    public Act_DescE: string;
    public Act_UomCode: string;
    public DailyProd: number;
}
class PQ_GetEngWorkSchduleEquip {
    constructor() {
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
    public ScheduleEquipId: number;
    public ScheduleId: number;
    public EquimentID: number;
    public AssigneDate: string;
    public LeaveDate: string;
    public ExpLeaveDate: string;
    public HourCost: number;
    public Status: number;
    public eq_EquipCode: string;
    public eq_DescA: string;
    public Eq_DescE: string;
    public Eq_HourCost: number;
}
class PQ_GetEngWorkSchduleEquipClass {
    constructor() {
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
    public ScheduleEquipClassId: number;
    public ScheduleId: number;
    public EquipClassId: number;
    public RequiredNo: number;
    public HourCost: number;
    public Class_ClassCode: string;
    public Class_DescA: string;
    public Class_DescE: string;
    public Class_HourCost: number;
    public AssignedEq: number;
    public RemainEq: number;
    public RequiredHrs: number;
}

class PQ_GetEngWorkSchduleLaborClass {
    constructor() {
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
    public ScheduleLaborClassId: number;
    public ScheduleId: number;
    public LaborCLassID: number;
    public RequiredNo: number;
    public HourCost: number;
    public LClass_CalssCode: string;
    public LClass_DescA: string;
    public LClass_DescE: string;
    public LCass_HourCost: number;
    public AssignedLab: number;
    public RemainLab: number;
    public RequiredHrs: number;
}

class PQ_GetEngWorkSchduleLabor {
    constructor() {
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
    public ScheduleLaborId: number;
    public ScheduleId: number;
    public LaborID: number;
    public AssigneDate: string;
    public LeaveDate: string;
    public ExpLeaveDate: string;
    public HourCost: number;
    public Status: number;
    public labor_LaborID: number;
    public Lab_LabCode: string;
    public Lab_DescA: string;
    public Lab_DescE: string;
    public Lab_BasicSalary: number;
    public Lab_TotalAllow: number;
    public Lab_HourCost: number;
}

class PQ_SrchEngProjectActivity {
    constructor() {
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
    public Itm_ItemCode: string;
    public Itm_DescA: string;
    public Itm_DescE: string;
    public Act_ActivityCode: string;
    public Act_DescA: string;
    public Act_DescE: string;
    public ProjectPhaseId: number;
    public ProjectID: number;
    public ProjectPhaseItemId: number;
    public ProjectPhaseItemActivId: number;
    public ActivityID: number;
    public ItemID: number;
    public Serial: number;
    public ActivQty: number;
    public TotalProdQty: number;
    public TotScedQty: number;
    public RemainQty: number;
    public UomID: number;
    public uom_Code: string;
    public uom_DescA: string;
    public uom_DescE: string;
    public LineCode: string;
    public SchedQty: number;
    public SCon_Qty: number;
    public AvaL_Qty: number;
}
class PQ_GetEngProductionLabour {
    constructor() {
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
    public ProductionLaborId: number;
    public ProductionId: number;
    public LaborID: number;
    public WorkHours: number;
    public UnProdHours: number;
    public HourCost: number;
    public Lab_Code: string;
    public Lab_DescA: string;
    public Lab_DescE: string;
    public Class_Code: string;
    public Class_DescA: string;
    public Class_DescE: string;
    public EstHours: number;
}
class PQ_GetEngProductionEquipment {
    constructor() {
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
    public ProductionequipId: number;
    public ProductionId: number;
    public WorkHours: number;
    public UnProdHours: number;
    public HourCost: number;
    public EquipmentID: number;
    public Class_Code: string;
    public Class_DescA: string;
    public Class_DescE: string;
    public Equip_Code: string;
    public Equip_DescA: string;
    public Equip_DescE: string;
    public EstHours: number;
    public RemainQty: number;
}
class PQ_GetEngproductionActivity {
    constructor() {
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
    public ProductionActivId: number;
    public ProductionId: number;
    public ScheduleId: number;
    public ScheduleActivId: number;
    public FinishQty: number;
    public ProdBeforeQty: number;
    public ActivityID: number;
    public ProjectPhaseItemActivId: number;
    public ItemId: number;
    public Act_Code: string;
    public Act_DescA: string;
    public Act_DescE: string;
    public Itm_Code: string;
    public Itm_DescA: string;
    public Itm_DescE: string;
    public Act_HourProduction: number;
    public ProjAct_ActivQty: number;
    public ProjAct_ProductionIncluded: boolean;
    public ProjAct_ProductionPrc: number;
    public schAct_SchedQty: number;
    public RemainQty: number;
}
class PQ_GetEngProduction {
    constructor() {
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
    public ProductionId: number;
    public ScheduleId: number;
    public TrNo: number;
    public TrDate: string;
    public ProjectPhaseId: number;
    public ProjectID: number;
    public StartDateTime: string;
    public EndDateTime: string;
    public CalenderId: number;
    public WorkHours: number;
    public WorkDescr: string;
    public UnProdReasonId: number;
    public TotalunProdHours: number;
    public Status: number;
    public IsCloseScheduel: boolean;
    public Remarks: string;
    public BraCode: number;
    public CompCode: number;
    public CreatedBy: string;
    public CreatedAt: string;
    public UpdatedBy: string;
    public UpdatedAt: string;
    public Unp_ReasonCode: string;
    public Unp_DescA: string;
    public Unp_DescE: string;
    public Proj_Code: string;
    public Proj_DescA: string;
    public Proj_DescE: string;
    public Phase_Code: string;
    public Phase_DescA: string;
    public Phase_DescE: string;
    public Sc_Status: number;
}
class PQ_SrchEngProjectPhase {
    constructor() {
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
    public Proj_Code: string;
    public Proj_DescA: string;
    public Proj_DescE: string;
    public Proj_Status: number;
    public Cust_Code: number;
    public Cust_DescA: string;
    public Cust_DescE: string;
    public ProjectID: number;
    public ProjectPhaseId: number;
    public Phase_Code: string;
    public Phase_DescA: string;
    public Phase_DescE: string;
    public ScopeID: number;
    public Phase_Status: number;
    public BraCode: number;
    public CompCode: number;
}
class PQ_GetEngSubContractActivity {
    constructor() {
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
    public SubContractActivityId: number;
    public SubContractId: number;
    public ActivityId: number;
    public ProjectPhaseItemActivId: number;
    public ProjQty: number;
    public ContractQty: number;
    public SOQty: number;
    public ProdQty: number;
    public UnitPrice: string;
    public Remarks: string;
    public Act_Code: string;
    public Act_DescA: string;
    public Act_DescE: string;
    public Uom_Code: string;
    public Uom_DescA: string;
    public Uom_DescE: string;
    public TotAmount: string;
}
class PQ_GetEngSubContract {
    constructor() {
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
    public SubContractId: number;
    public TrNo: number;
    public TrDate: string;
    public DescA: string;
    public DescE: string;
    public SubContractorID: number;
    public ScopeID: number;
    public ProjectID: number;
    public ProjectPhaseId: number;
    public TotalAmount: string;
    public Sc_Limit: string;
    public ISMaterialIncluded: boolean;
    public ISFlexQty: boolean;
    public IsBlank: boolean;
    public StartDate: string;
    public EndDate: string;
    public Status: number;
    public Terms: string;
    public Technical: string;
    public Penalty: string;
    public MaterialRemarks: string;
    public EquipmentRemarks: string;
    public LaborRemarks: string;
    public Duration: number;
    public WarrantyPeriod: number;
    public DownpaymentPrc: number;
    public WarranlyPrc: number;
    public Remarks: string;
    public BraCode: number;
    public CompCode: number;
    public CreatedBy: string;
    public CreatedAt: string;
    public UpdatedBy: string;
    public UpdatedAt: string;
    public IsApproved: number;
    public IsClosed: number;
    public Sc_Code: number;
    public Sc_DescA: string;
    public Sc_DescE: string;
    public Scope_Code: string;
    public Scope_DescA: string;
    public Scope_DescE: string;
    public Phase_Code: string;
    public Phase_DescA: string;
    public Phase_DescE: string;
    public Proj_Code: string;
    public Proj_DescA: string;
    public Proj_DescE: string;
    public Tot_FinishSo: number;
    public Tot_IssueSo: number;
    public Tot_OpenSo: number;
    public SiteEngineerId: number;
    public VatType: number;
}

class PQ_GetEngWorkSchduleMaterial {
    constructor() {
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
    public ScheduleMaterialId: number;
    public ScheduleId: number;
    public SubServiceOrderId: number;
    public ItemId: number;
    public SchedQty: number;
    public ReqQty: number;
    public IssuedQty: number;
    public ReturnQty: number;
    public BalanceQty: number;
    public Itm_ItemCode: string;
    public Itm_DescA: string;
    public Itm_DescE: string;
    public UomID: number;
    public Uom_UomCode: string;
    public Uom_DescA: string;
    public Uom_DescE: string;
}
class PQ_SrchActivity {
    constructor() {
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
    public ActivityID: number;
    public ActivityCode: string;
    public DescA: string;
    public DescE: string;
    public UomID: number;
    public HourProduction: number;
    public LaborProdRate: number;
    public UnitPrice: number;
    public ParentActivityID: number;
    public ActivityLevel: number;
    public IsDetail: boolean;
    public Remarks: string;
    public CompCode: number;
    public Uom_Code: string;
    public Uom_DescA: string;
    public Uom_DescE: string;
}
class P_TR_SubServiceOrder {
    constructor() {
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
    public SubServiceOrderId: number;
    public SubContractId: number;
    public TrNo: number;
    public TrDate: string;
    public DescA: string;
    public DescE: string;
    public SubContractorID: number;
    public ProjectID: number;
    public ProjectPhaseId: number;
    public MaterialRequestID: number;
    public TotalAmount: number;
    public StartDate: string;
    public EndDate: string;
    public SiteEngineerId: number;
    public Status: number;
    public Remarks: string;
    public TechnicalMark: number;
    public TimeMark: number;
    public BraCode: number;
    public CompCode: number;
    public CreatedBy: string;
    public CreatedAt: string;
    public UpdatedBy: string;
    public UpdatedAt: string;
    public TotalMark: number;
    public IsApproved: number;
    public IsClosed: number;
}
class PQ_GetEngProject {
    constructor() {
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
    public OfferID: number;
    public ProjectID: number;
    public ProjectCode: string;
    public DescA: string;
    public DescL: string;
    public OfferTrNo: number;
    public OfferTrSerial: number;
    public LocationId: number;
    public CustomerID: number;
    public SalesEngineerId: number;
    public CustomerAccCode: string;
    public CustomerTel: string;
    public CustomerMobile: string;
    public CustomerContact: string;
    public CC_CODE: number;
    public ProjArea: number;
    public ProjAddress: string;
    public ProjTechnicalSpecs: string;
    public ProjectTermsCond: string;
    public ContractCode: string;
    public ContractDate: string;
    public ContractRefNo: string;
    public ContractPeriod: number;
    public ContractPrice: number;
    public ContractWarantyPrd: string;
    public PaymentMethod: number;
    public DownPaymentPrc: number;
    public DownPaymentAmount: number;
    public WarrntyPaymentPrc: number;
    public WarrntyPaymentAmount: number;
    public Status: number;
    public Remarks: string;
    public BraCode: number;
    public CreatedBy: string;
    public CompCode: number;
    public CreatedAt: string;
    public UpdatedBy: string;
    public OHMaterialPrc: number;
    public UpdatedAt: string;
    public OHLaborPrc: number;
    public OHEquipPrc: number;
    public ProdOHMaterialPrc: number;
    public ProdOHLaborPrc: number;
    public ProdOHEquipPrc: number;
    public ProfitMarginPrc: number;
    public EstimatedMaterial: number;
    public EstimatedLabor: number;
    public EstimatedEquip: number;
    public EstimatedProfit: number;
    public EstimatedOH: number;
    public EstimatedPOH: number;
    public cust_CustomerCode: number;
    public cust_DescA: string;
    public cust_DescE: string;
    public Eng_Code: string;
    public Eng_DescA: string;
    public Eng_DescE: string;
    public Loc_Code: string;
    public Loc_DescA: string;
    public Loc_DescE: string;
    public Status_DescA: string;
    public Status_DescE: string;
    public ContractDiscountPrc: number;
    public ContractDiscountAmount: number;
    public ContractAdditions: number;
    public ContractDuration: number;
    public StartDate: string;
    public EndDate: string;
    public ISPosted: boolean;
    public VatPrc: number;
    public VatType : number;
}
class PQ_GetEngProjectItem {
    constructor() {
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
    public ProjectPhaseItemId: number;
    public ProjectPhaseId: number;
    public ProjectID: number;
    public OfferItemId: number;
    public LineCode: string;
    public ItemCode: string;
    public ItemID: number;
    public IsFixedSystem: boolean;
    public ContrQty: number;
    public ItemQty: number;
    public ProdQty: number;
    public BilledQty: number;
    public UnitPrice: number;
    public StdUnitPrice: number;
    public IsOfferItem: boolean;
    public ProductionType: number;
    public Remarks: string;
    public EstimatedMaterial: number;
    public EstimatedLabor: number;
    public EstimatedEquip: number;
    public EstimatedProfit: number;
    public EstimatedOH: number;
    public EstimatedPOH: number;
    public StartDate: string;
    public EndDate: string;
    public RelProjectPhaseItemId: number;
    public RelationType: number;
    public RelationDelay: number;
    public Phase_PhaseCode: string;
    public SlsITm_ItemCode: string;
    public SlsITm_DescA: string;
    public SlsITm_DescE: string;
    public Scp_ScopeCode: string;
    public Scp_DescA: string;
    public Scp_DescE: string;
    public ScopeID: number;
    public UomCode: string;
}

class PQ_GetEngProjectPhase {
    constructor() {
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
    public ProjectPhaseId: number;
    public ProjectID: number;
    public ProjectPhaseCode: string;
    public DescA: string;
    public DescL: string;
    public OfferID: number;
    public OfferTrSerial: number;
    public CC_CODE: string;
    public OfferTrNo: number;
    public SiteEngineerId: number;
    public StartDate: string;
    public EndDate: string;
    public IsMaintenanceWork: boolean;
    public IsBonusIncluded: boolean;
    public ToBeInvoiced: boolean;
    public ScopeID: number;
    public CalenderId: number;
    public Status: number;
    public Remarks: string;
    public EstimatedMaterial: number;
    public EstimatedLabor: number;
    public EstimatedEquip: number;
    public EstimatedProfit: number;
    public EstimatedOH: number;
    public EstimatedPOH: number;
    public Cal_Calendercode: string;
    public Cal_DescA: string;
    public Cal_DescE: string;
    public Cal_DailyWorkHours: number;
    public Scop_ScopeCode: string;
    public Scop_DescA: string;
    public Scop_DescE: string;
    public Eng_EngCode: string;
    public Eng_DescA: string;
    public Eng_DescE: string;
    public Status_DesecA: string;
    public Status_DescE: string;
    public EngProj_ProjectCode: string;
    public EngProj_DescA: string;
    public EngProj_DescL: string;
    public EngProj_CustomerId: string;
    public Cust_DescA: string;
    public Cust_DescE: string;
    public Cust_CustomerCode: string;
    public BraCode: number;
    public CompCode: number;
    public Deuration: number;
    public ISPosted: boolean;
}
//End Engineer Viwes

//Start Resource Management Table 
class P_TR_ResAbsence {
    constructor() {
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
    public AbsenceID: number;
    public TrNo: number;
    public TrDate: string;
    public ProjectID: number;
    public SiteEngineerId: number;
    public ScheduleId: number;
    public Status: number;
    public Remarks: string;
    public BraCode: number;
    public CompCode: number;
    public CreatedBy: string;
    public CreatedAt: string;
    public UpdatedBy: string;
    public UpdatedAt: string;
}
class P_TR_ResAbsenceLabour {
    constructor() {
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
    public AbsenceLabourID: number;
    public AbsenceID: number;
    public LaborID: number;
    public LaborAbsenceTypeID: number;
    public StartDate: string;
    public IsAbsence: boolean;
    public AbsenceDays: number;
    public LateHours: number;
    public LateHourCost: number;
    public AbsDayCost: number;
}
class P_TR_ResMaterialIssue {
    constructor() {
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
    public IssueMaterialId: number;
    public RequestMaterialId: number;
    public ScheduleId: number;
    public TrNo: number;
    public TrDate: string;
    public ProjectID: number;
    public ProjectPhaseID: number;
    public Status: number;
    public Remarks: string;
    public BraCode: number;
    public CompCode: number;
    public CreatedBy: string;
    public CreatedAt: string;
    public UpdatedBy: string;
    public UpdatedAt: string;
    public StoreID: number;
}
class P_TR_ResMaterialIssueDetail {
    constructor() {
        this.RequestMaterialDetailId = 0;
        this.IssueMaterialId = 0;
        this.ItemId = 0;
        this.RemainQty = 0;
        this.AvailableQty = 0;
        this.UnitCost = 0;
        this.IssuedQty = 0;
    }
    public RequestMaterialDetailId: number;
    public IssueMaterialId: number;
    public ItemId: number;
    public RemainQty: number;
    public AvailableQty: number;
    public UnitCost: number;
    public IssuedQty: number;
}
class P_TR_ResMaterialReturn {
    constructor() {
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
    public ReturnMaterialId: number;
    public RequestMaterialId: number;
    public ScheduleId: number;
    public TrNo: number;
    public TrDate: string;
    public ProjectID: number;
    public ProjectPhaseID: number;
    public Status: number;
    public Remarks: string;
    public BraCode: number;
    public CompCode: number;
    public CreatedBy: string;
    public CreatedAt: string;
    public UpdatedBy: string;
    public UpdatedAt: string;
    public StoreID: number;
}
class P_TR_ResMaterialReturnDetail {
    constructor() {
        this.RequestMaterialDetailId = 0;
        this.ReturnMaterialId = 0;
        this.ItemId = 0;
        this.NetIssuedQty = 0;
        this.ReturndQty = 0;
        this.UnitCost = 0;
    }
    public RequestMaterialDetailId: number;
    public ReturnMaterialId: number;
    public ItemId: number;
    public NetIssuedQty: number;
    public ReturndQty: number;
    public UnitCost: number;
}
class P_TR_ResOverTime {
    constructor() {
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
    public OverTimeID: number;
    public TrNo: number;
    public TrDate: string;
    public ProjectID: number;
    public SiteEngineerId: number;
    public ScheduleId: number;
    public FromDate: string;
    public ToDate: string;
    public Status: number;
    public Remarks: string;
    public BraCode: number;
    public CompCode: number;
    public CreatedBy: string;
    public CreatedAt: string;
    public UpdatedBy: string;
    public UpdatedAt: string;
}

class P_TR_ResOverTimeLabour {
    constructor() {
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
    public OverTimeLabourID: number;
    public OverTimeID: number;
    public LaborID: number;
    public LaborOverTimeTypeID: number;
    public StartDate: string;
    public OverTimeHours: number;
    public OverTimeRate: number;
    public OTHourCost: number;
    public Remarks: string;
}
class P_Tr_ResRequestLabour {
    constructor() {
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
    public RequestLabourId: number;
    public ScheduleId: number;
    public TrNo: number;
    public TrDate: string;
    public Status: number;
    public Remarks: string;
    public BraCode: number;
    public CompCode: number;
    public CreatedBy: string;
    public CreatedAt: string;
    public UpdatedBy: string;
    public UpdatedAt: string;
}
class P_TR_ResRequestEquipment {
    constructor() {
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
    public RequestEquipmentId: number;
    public ScheduleId: number;
    public TrNo: number;
    public TrDate: string;
    public Status: number;
    public Remarks: string;
    public BraCode: number;
    public CompCode: number;
    public CreatedBy: string;
    public CreatedAt: string;
    public UpdatedBy: string;
    public UpdatedAt: string;
}
class P_TR_ResRequestMaterial {
    constructor() {
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
    public RequestMaterialId: number;
    public ScheduleId: number;
    public SubServiceOrderId: number;
    public TrNo: number;
    public TrDate: string;
    public Status: number;
    public RequestedBy: string;
    public ApprovedBy: string;
    public Remarks: string;
    public BraCode: number;
    public CompCode: number;
    public CreatedBy: string;
    public CreatedAt: string;
    public UpdatedBy: string;
    public UpdatedAt: string;
}
class P_TR_ResRequestMaterialDetail {
    constructor() {
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
    public RequestMaterialDetailId: number;
    public RequestMaterialId: number;
    public ItemId: number;
    public SchedQty: number;
    public ReqBeforeQty: number;
    public RequiredQty: number;
    public ReqQty: number;
    public IssuedQty: number;
    public ReturnQty: number;
    public Remarks: string;
    public BalanceQty: number;
}

class PQ_GetEngSubServiceOrder {
    constructor() {
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
    public SubServiceOrderId: number;
    public SubContractId: number;
    public TrNo: number;
    public TrDate: string;
    public DescA: string;
    public DescE: string;
    public ProjectID: number;
    public SubContractorID: number;
    public ProjectPhaseId: number;
    public MaterialRequestID: number;
    public TotalAmount: number;
    public StartDate: string;
    public EndDate: string;
    public SiteEngineerId: number;
    public Status: number;
    public Remarks: string;
    public TechnicalMark: number;
    public TimeMark: number;
    public BraCode: number;
    public CompCode: number;
    public CreatedBy: string;
    public CreatedAt: string;
    public UpdatedBy: string;
    public UpdatedAt: string;
    public TotalMark: number;
    public IsApproved: number;
    public IsClosed: number;
    public RMat_TrNo: number;
    public Phase_ProjectPhaseCode: string;
    public Phase_DescA: string;
    public Phase_DescL: string;
    public Eng_EngCode: string;
    public Eng_DescA: string;
    public Eng_DescE: string;
    public Cont_TrNo: number;
    public Sc_Code: number;
    public Sc_DescA: string;
    public Sc_DescE: string;
    public Proj_ProjectCode: string;
    public Proj_DescA: string;
    public Proj_DescE: string;
    public ISFlexQty: boolean;
    public IsBlank: boolean;
    public VatType: number;
}

class PQ_GetEngServiceOrderActivity {
    constructor() {
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
    public SubServiceOrderActivityId: number;
    public SubServiceOrderId: number;
    public ActivityId: number;
    public SubContractActivityId: number;
    public ProjectPhaseItemActivId: number;
    public ContractQty: number;
    public ProjectQty: number;
    public SOQty: number;
    public FinishQty: number;
    public AppQty: number;
    public UnitPrice: number;
    public Total: number;
    public RemainQty: number;
    public Remarks: string;
    public ActivityCode: string;
    public DescA: string;
    public DescE: string;
    public Uom_Code: string;
    public Uom_DescA: string;
    public Uom_DescE: string;
}
class PQ_LoadEngSubSOContractActivity {
    constructor() {
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
    public SubContractId: number;
    public SubServiceOrderId: number;
    public ActivityId: number;
    public ProjectPhaseItemActivId: number;
    public SubContractActivityId: number;
    public UnitPrice: number;
    public ProjQty: number;
    public ContQty: number;
    public Qty: number;
    public ActivityCode: string;
    public DescA: string;
    public DescE: string;
    public Uom_Code: string;
    public Uom_DescA: string;
    public Uom_DescE: string;
}

class PQ_GetEngSubProduction {
    constructor() {
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
    public SubProductionId: number;
    public SubServiceOrderId: number;
    public SubContractId: number;
    public TrNo: number;
    public DescA: string;
    public TrDate: string;
    public DescE: string;
    public SubContractorID: number;
    public ProjectID: number;
    public ProjectPhaseId: number;
    public TotalAmount: number;
    public StartDate: string;
    public EndDate: string;
    public SiteEngineerId: number;
    public Status: number;
    public Remarks: string;
    public BraCode: number;
    public CompCode: number;
    public CreatedBy: string;
    public CreatedAt: string;
    public UpdatedBy: string;
    public IsApproved: number;
    public UpdatedAt: string;
    public So_TrNo: number;
    public So_DescA: string;
    public So_DescE: string;
    public Phase_ProjectPhaseCode: string;
    public Phase_DescA: string;
    public Phase_DescE: string;
    public subcon_SubContractorCode: number;
    public subcon_DescA: string;
    public subcon_DescE: string;
    public Eng_EngCode: string;
    public Eng_DescA: string;
    public Eng_DescE: string;
    public proj_ProjectCode: string;
    public Proj_DescA: string;
    public Proj_DescL: string;
    public So_Status: number;
    public DownpaymentPrc: number;
    public WarranlyPrc: number;
    public OrgAmount: number;
    public Deduction: number;
    public Downpayment: number;
    public Warranly: number;
    public VatAmount: number;
    public VatPrc: number;
    public IsFinal: boolean;
}

class PQ_GetEngSubProductionActivity {
    constructor() {
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
    public SubProductionActivityId: number;
    public SubProductionId: number;
    public SubServiceOrderActivityId: number;
    public SubServiceOrderId: number;
    public SubContractActivityId: number;
    public ActivityId: number;
    public ProjectPhaseItemActivId: number;
    public SOQty: number;
    public FinishQty: number;
    public AppQty: number;
    public ProdBeforeQty: number;
    public UnitPrice: number;
    public Total: number;
    public RemainQty: number;
    public Remarks: string;
    public ActivityCode: string;
    public DescA: string;
    public DescE: string;
    public Uom_Code: string;
    public Uom_DescA: string;
    public Uom_DescE: string;
}

class P_TR_SubProduction {
    constructor() {
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
    public SubProductionId: number;
    public SubServiceOrderId: number;
    public SubContractId: number;
    public TrNo: number;
    public TrDate: string;
    public DescA: string;
    public DescE: string;
    public SubContractorID: number;
    public ProjectID: number;
    public ProjectPhaseId: number;
    public TotalAmount: number;
    public StartDate: string;
    public EndDate: string;
    public SiteEngineerId: number;
    public Status: number;
    public Remarks: string;
    public BraCode: number;
    public CompCode: number;
    public CreatedBy: string;
    public CreatedAt: string;
    public UpdatedBy: string;
    public UpdatedAt: string;
    public IsApproved: number;
    public OrgAmount: number;
    public Deduction: number;
    public Downpayment: number;
    public Warranly: number;
    public VatAmount: number;
    public VatPrc: number;
    public IsFinal: boolean;
}

class P_TR_SubProductionActivity {
    constructor() {
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
    public SubProductionActivityId: number;
    public SubProductionId: number;
    public SubServiceOrderActivityId: number;
    public SubServiceOrderId: number;
    public SubContractActivityId: number;
    public ActivityId: number;
    public ProjectPhaseItemActivId: number;
    public SOQty: number;
    public FinishQty: number;
    public AppQty: number;
    public ProdBeforeQty: number;
    public UnitPrice: number;
    public Total: number;
    public RemainQty: number;
    public Remarks: string;
}

class IQ_GetItemList {
    constructor() {
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
    public ItemCode: string;
    public ItemID: number;
    public CompCode: number;
    public DescA: string;
    public DescL: string;
    public TechDescA: string;
    public TechDescL: string;
    public UnitGrpID: number;
    public UomID: number;
    public CatID: number;
    public ItemTypeID: number;
    public MovClassID: number;
    public OldItemCode: string;
    public VndItemCode: string;
    public BarCode1: string;
    public BarCode2: string;
    public FirstEntryDate: string;
    public UnitPrice: number;
    public StarGlobalCost: number;
    public GlobalCost: number;
    public Remarks: string;
    public CreatedAt: string;
    public CreatedBy: string;
    public UpdatedAt: string;
    public UpdatedBy: string;
    public LastBarCodeSeq: number;
    public BarCodePrefix: string;
    public Uom_Code: string;
    public Uom_DescA: string;
    public Uom_DescE: string;
    public CatCode: string;
}

class PQ_GetSalesIssueProduction {
    constructor() {
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
    public ProductionId: number;
    public TrNo: number;
    public ProjectID: number;
    public TrDate: string;
    public ProjCode: string;
    public BillCode: number;
    public FromDate: string;
    public ToDate: string;
    public ProdTotal: number;
    public DiscountPrc: number;
    public Discount: number;
    public NetAmount: number;
    public WorkDiscription: string;
    public CustomerID: number;
    public IsFinal: boolean;
    public RefCode: string;
    public Status: number;
    public Remarks: string;
    public BraCode: number;
    public CompCode: number;
    public CreatedBy: string;
    public CreatedAt: string;
    public UpdatedBy: string;
    public UpdatedAt: string;
    public Proj_ProjectCode: string;
    public Proj_DescA: string;
    public Proj_DescL: string;
    public Cust_CustomerCode: number;
    public Cust_DescA: string;
    public Cust_DescE: string;
}

class PQ_GetSalesIssueProductionDetails {
    constructor() {
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
    public ProductionDetailId: number;
    public ProductionId: number;
    public Serial: number;
    public ItemID: number;
    public ProjectPhaseItemId: number;
    public ItemQty: number;
    public PrevProdQty: number;
    public ProdQty: number;
    public UnitPrice: number;
    public BilledQty: number;
    public RejectedQty: number;
    public Remarks: string;
    public UnBilledQty: number;
    public TotalProdQty: number;
    public Total: number;
    public Itm_ItemCode: string;
    public Itm_DescA: string;
    public Itm_DescE: string;
    public LineCode: string;
}

class PQ_GetResLabourOverTime {
    constructor() {
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
    public OverTimeID: number;
    public TrNo: number;
    public TrDate: string;
    public ProjectID: number;
    public SiteEngineerId: number;
    public Status: number;
    public FromDate: string;
    public ToDate: string;
    public Remarks: string;
    public BraCode: number;
    public CompCode: number;
    public CreatedBy: string;
    public CreatedAt: string;
    public UpdatedBy: string;
    public UpdatedAt: string;
    public ScheduleId: number;
    public schd_TrNo: number;
    public schd_TrDate: string;
    public schd_ProjectPhaseId: number;
    public schd_ProjectID: number;
    public EndDateTime: string;
    public StartDateTime: string;
    public WorkDescr: string;
    public Prj_ProjectCode: string;
    public Prj_DescA: string;
    public Prj_DescE: string;
    public Phase_ProjectPhaseCode: string;
    public Phase_DescA: string;
    public Phase_DescE: string;
}

class PQ_GetResLabourOverTimeDetail {
    constructor() {
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
    public OverTimeLabourID: number;
    public OverTimeID: number;
    public LaborID: number;
    public LaborOverTimeTypeID: number;
    public StartDate: string;
    public OverTimeHours: number;
    public OverTimeRate: number;
    public OTHourCost: number;
    public Remarks: string;
    public Labor_Code: string;
    public Labor_DescA: string;
    public Labor_DescE: string;
    public OTType_Code: string;
    public OTType_DescA: string;
    public OTType_DescE: string;
}

class PQ_GetResLabourAbsence {
    constructor() {
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
    public AbsenceID: number;
    public TrNo: number;
    public TrDate: string;
    public ProjectID: number;
    public SiteEngineerId: number;
    public FromDate: string;
    public ToDate: string;
    public Status: number;
    public Remarks: string;
    public BraCode: number;
    public CompCode: number;
    public CreatedBy: string;
    public CreatedAt: string;
    public UpdatedBy: string;
    public UpdatedAt: string;
    public ScheduleId: number;
    public WorkDescr: string;
    public StartDateTime: string;
    public EndDateTime: string;
    public Prj_ProjectCode: string;
    public Prj_DescA: string;
    public Prj_DescE: string;
    public Phase_ProjectPhaseCode: string;
    public Phase_DescA: string;
    public Phase_DescE: string;
    public schd_TrNo: number;
}

class PQ_GetResLabourAbsenceDetail {
    constructor() {
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
    public AbsenceLabourID: number;
    public AbsenceID: number;
    public LaborID: number;
    public LaborAbsenceTypeID: number;
    public StartDate: string;
    public IsAbsence: boolean;
    public AbsenceDays: number;
    public LateHours: number;
    public LateHourCost: number;
    public AbsDayCost: number;
    public Remarks: string;
    public Labor_Code: string;
    public Labor_DescA: string;
    public Labor_DescE: string;
    public AbsenceType_Code: string;
    public AbsenceType_DescA: string;
    public AbsenceType_DescE: string;
}

//End Resource Management Table 

//Start View Eng
class PQ_GetEngProjectActivity {
    constructor() {
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
    public ProjectPhaseItemActivId: number;
    public ProjectPhaseItemId: number;
    public ProjectPhaseId: number;
    public ProjectID: number;
    public ActivityID: number;
    public Serial: number;
    public ContrQty: number;
    public ActivQty: number;
    public TotalProdQty: number;
    public SchedQty: number;
    public SchedProdQty: number;
    public SCon_Qty: number;
    public SConProdQty: number;
    public UnitPrice: number;
    public StdUnitPrice: number;
    public ProductionIncluded: boolean;
    public Remarks: string;
    public ProductionPrc: number;
    public EstimatedMaterial: number;
    public EstimatedLabor: number;
    public EstimatedEquip: number;
    public EstimatedProfit: number;
    public EstimatedOH: number;
    public EstimatedPOH: number;
    public StartDate: string;
    public EndDate: string;
    public RelProjectPhaseItemActivId: number;
    public RelationType: number;
    public RelationDelay: number;
    public act_ActivityCode: string;
    public act_DescA: string;
    public act_DescE: string;
    public UOM_UomCode: string;
    public UOM_DescA: string;
    public UOM_DescE: string;
    public ItemID: number;
    public Deuration: number;
    public DailyProd: number;
    public LineCode: string;
}
class PQ_GetSalesInvoice {
    constructor() {
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
        this.PrevInvoiceHash
        this.QRCode
        this.CryptographicStamp
        this.AdvanceConsumPrc = 0;
    }
    public InvoiceId: number;
    public TrNo: number;
    public TrDate: string;
    public ProjectID: number;
    public ProjCode: string;
    public BillCode: number;
    public FromDate: string;
    public ToDate: string;
    public WorkDiscription: string;
    public TotalAmount: number;
    public DiscountPrc: number;
    public Discount: number;
    public VatAmount: number;
    public NetAmount: number;
    public CustomerID: number;
    public IsFinal: boolean;
    public RefCode: string;
    public Status: number;
    public Remarks: string;
    public BraCode: number;
    public CompCode: number;
    public CreatedBy: string;
    public CreatedAt: string;
    public UpdatedBy: string;
    public UpdatedAt: string;
    public Proj_ProjectCode: string;
    public Proj_DescA: string;
    public Proj_DescL: string;
    public Cust_CustomerCode: number;
    public Cust_DescA: string;
    public Cust_DescE: string;
    public VatPrc: number;
    public IsPosted: boolean;
    public RetentionPrc: number;
    public RetentionAmount: number;
    public AdvDeduction: number;
    public AdvVatAmount: number;
    public TaxableAmount: number;
    public NetTax: number;
    public DueAmount: number;
    public IsDownpayment: boolean;
    public UsedDownpayment: number;
    public RemainDownpayment: number;
    public TrTime: string;
    public DocNo: string;
    public DocUUID: string;
    public InvoiceTypeCode: number;
    public InvoiceTransCode: number;
    public GlobalInvoiceCounter: number;
    public PrevInvoiceHash: any;
    public QRCode: any;
    public CryptographicStamp: any;
    public AdvanceConsumPrc: number;
}




class PQ_GetSalesFillInvoiceProd {
    constructor() {
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
    public Prod_TrNo: number;
    public Prod_TrDate: string;
    public Prod_ProjectID: number;
    public Prod_FromDate: string;
    public Prod_ToDate: string;
    public Prod_IsFinal: boolean;
    public Prod_RefCode: string;
    public Prod_WorkDiscription: string;
    public Itm_ItemCode: string;
    public Itm_DescA: string;
    public Itm_DescE: string;
    public ProdQty: number;
    public UnitPrice: number;
    public total: number;
    public BilledQty: number;
    public ToBillQty: number;
    public Remarks: string;
    public Prod_ProductionId: number;
    public ProductionDetailId: number;
    public ProductionId: number;
    public ProjectPhaseItemId: number;
    public ItemID: number;
    public LineCode: string;
}

class PQ_GetSalesInvoiceDetail {
    constructor() {
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
    public InvoiceId: number;
    public ProjectPhaseItemId: number;
    public UnitPrice: number;
    public BillQty: number;
    public Total: number;
    public TotalItemNet: number;
    public Itm_ItemCode: string;
    public Itm_DescA: string;
    public Itm_DescE: string;
    public ProjectPhaseId: number;
    public InvoiceDetailId: number;
    public LineCode: string;
    public ItemQty: number;
    public PrevBillQty: number;
    public Serial: number;
    public Remarks: string;
    public ProdQty: number;
    public UomCode: string;
    public uom_DescA: string;
    public Uom_DescE: string;
    public ItemDiscountPrc: number;
    public ItemDiscountAmt: number;
    public NetUnitPrice: number;
    public ItemVatPrc: number;
    public ItemVatAmount: number;
    public ItemTotal: number;
    public ItemTotalAVat: number;
}

class P_D_SalesCustomer {
    constructor() {
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
    public CustomerID: number;
    public CustomerCategoryID: number;
    public CustomerCode: number;
    public IsTemporary: boolean;
    public DescA: string;
    public DescE: string;
    public GLAccountCode: string;
    public ContactPerson: string;
    public ContactTel: string;
    public CustomerAddress: string;
    public Tel1: string;
    public Tel2: string;
    public Fax: string;
    public Mobile: string;
    public Email: string;
    public IsActive: boolean;
    public CrNo: string;
    public ChamberNo: string;
    public VatNo: string;
    public VatType: number;
    public SalesEngineerId: number;
    public BraCode: number;
    public Remarks: string;
    public CompCode: number;
    public CreatedBy: string;
    public CreatedAt: string;
    public UpdatedBy: string;
    public UpdatedAt: string;
    public RefCode2: string;
    public RefCode1: string;
    public ISPersonal: boolean;
    public ISVatRegistered: boolean;
    public Address_postal: string;
    public Address_Province: string;
    public Address_Street: string;
    public Address_Str_Additional: string;
    public Address_BuildingNo: string;
    public Address_Build_Additional: string;
    public Address_City: string;
    public Address_District: string;
}


class PQ_GetSalesInvoiceProd {
    constructor() {
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
    public Prod_TrNo: number;
    public Prod_TrDate: string;
    public Prod_ProjectID: number;
    public Prod_FromDate: string;
    public Prod_ToDate: string;
    public Prod_IsFinal: boolean;
    public Prod_RefCode: string;
    public Prod_WorkDiscription: string;
    public InvoiceId: number;
    public Itm_ItemCode: string;
    public Itm_DescA: string;
    public Itm_DescE: string;
    public InvQty: number;
    public UnitPrice: number;
    public BilledQty: number;
    public ToBillQty: number;
    public Remarks: string;
    public Prod_ProductionId: number;
    public InvoiceProdId: number;
    public InvoiceDetailId: number;
    public ProductionDetailId: number;
    public ProductionId: number;
    public ProjectPhaseItemId: number;
    public ItemID: number;
    public Total: number;
    public LineCode: string;
}


class PQ_SalesInvoiceDetail {
    constructor() {
        this.InvoiceProdId = 0;
        this.InvoiceId = 0;
        this.ProjectPhaseItemId = 0;
        this.UnitPrice = 0;
        this.BillQty = 0;
        this.InvoiceDetailId = 0;
    }
    public InvoiceProdId: number;
    public InvoiceId: number;
    public ProjectPhaseItemId: number;
    public UnitPrice: number;
    public BillQty: number;
    public InvoiceDetailId: number;
}

class PQ_SrcSchdule {
    constructor() {
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
    public ScheduleId: number;
    public TrNo: number;
    public WorkDescr: string;
    public ProjectID: number;
    public Prj_ProjectCode: string;
    public Prj_DescE: string;
    public Prj_DescA: string;
    public ProjectPhaseId: number;
    public Phase_ProjectPhaseCode: string;
    public Phase_DescA: string;
    public Phase_DescE: string;
    public SiteEngineerId: number;
    public Eng_EngCode: string;
    public Eng_DescA: string;
    public Eng_DescE: string;
    public Status: number;
    public BraCode: number;
    public CompCode: number;
}

class PQ_GetResReqLabour {
    constructor() {
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
    public RequestLabourId: number;
    public ScheduleId: number;
    public TrNo: number;
    public TrDate: string;
    public Status: number;
    public Remarks: string;
    public BraCode: number;
    public CompCode: number;
    public CreatedBy: string;
    public CreatedAt: string;
    public UpdatedBy: string;
    public UpdatedAt: string;
    public WorkDescr: string;
    public ProjectID: number;
    public Prj_ProjectCode: string;
    public Prj_DescE: string;
    public Prj_DescA: string;
    public ProjectPhaseId: number;
    public Phase_ProjectPhaseCode: string;
    public Phase_DescA: string;
    public Phase_DescE: string;
    public SiteEngineerId: number;
    public Eng_EngCode: string;
    public Eng_DescA: string;
    public Eng_DescE: string;
}

class PQ_GETSalesItemActivity {
    constructor() {
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
    public ItemsActivityId: number;
    public ItemID: number;
    public ActivityID: number;
    public ActQty: number;
    public IsProdIncluded: string;
    public ProdPrc: number;
    public ActivityCode: string;
    public ActDescA: string;
    public ActDescE: string;
    public puomcode: string;
    public puomdescA: string;
    public puomDescE: string;
    public Act_StdUunitPrice: number;
}

class P_D_SalesItemsActivity {
    constructor() {
        this.ItemsActivityId = 0;
        this.ItemID = 0;
        this.ActivityID = 0;
        this.ActQty = 0;
        this.IsProdIncluded = "";
        this.ProdPrc = 0;
    }
    public ItemsActivityId: number;
    public ItemID: number;
    public ActivityID: number;
    public ActQty: number;
    public IsProdIncluded: string;
    public ProdPrc: number;
}

class PQ_Sales_SrchOfferItem {
    constructor() {
        this.StageCode = 0;
        this.ItemCode = "";
        this.DescA = "";
        this.DescE = "";
        this.OfferItemId = 0;
        this.OfferID = 0;
    }
    public StageCode: number;
    public ItemCode: string;
    public DescA: string;
    public DescE: string;
    public OfferItemId: number;
    public OfferID: number;
}

class PQ_GetResRequestLaborDetails {
    constructor() {
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
    public ScheduleLaborClassId: number;
    public ScheduleId: number;
    public LaborCLassID: number;
    public RequiredNo: number;
    public RequiredHrs: number;
    public HourCost: number;
    public ClassCode: string;
    public DescA: string;
    public DescE: string;
}

class PQ_GetResRequestLabours {
    constructor() {
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
    public RequestLabourId: number;
    public ScheduleId: number;
    public WorkDescr: string;
    public StartDateTime: string;
    public EndDateTime: string;
    public TrNo: number;
    public TrDate: string;
    public Status: number;
    public Remarks: string;
    public BraCode: number;
    public CompCode: number;
    public CreatedBy: string;
    public CreatedAt: string;
    public UpdatedBy: string;
    public UpdatedAt: string;
    public ProjectPhaseId: number;
    public ProjectID: number;
    public Prj_ProjectCode: string;
    public Prj_DescA: string;
    public Prj_DescE: string;
    public Prj_Status: number;
    public Phase_ProjectPhaseCode: string;
    public Phase_DescA: string;
    public Phase_DescE: string;
    public schd_TrNo: number;
    public WorkHours: number;
    public CalHours: number;
    public OTHours: number;
}

class PQ_GetResLabourAssign {
    constructor() {
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
    public ScheduleLaborId: number;
    public ScheduleId: number;
    public LaborID: number;
    public AssigneDate: string;
    public LeaveDate: string;
    public ExpLeaveDate: string;
    public HourCost: number;
    public Status: number;
    public LaborCode: string;
    public DescA: string;
    public DescE: string;
    public LabourClass_ClassCode: string;
    public LabourClass_DescA: string;
    public LabourClass_DescE: string;
}

class PProc_ResGetFreeLabor_Result {
    constructor() {
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
    public LaborID: number;
    public FreeDate: string;
    public LaborClassId: number;
    public LaborCategoryId: number;
    public LaborCode: string;
    public DescA: string;
    public DescE: string;
    public IsActive: boolean;
    public BraCode: number;
    public CompCode: number;
    public ClassCode: string;
    public class_descA: string;
    public Class_DescE: string;
    public CategCode: string;
    public Cat_descA: string;
    public Cat_DescE: string;
    public HourCost: number;
    public BusyDate: string;
}
class PQ_GetResRequestEquipment {
    constructor() {
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
    public RequestEquipmentId: number;
    public ScheduleId: number;
    public TrNo: number;
    public TrDate: string;
    public Status: number;
    public Remarks: string;
    public BraCode: number;
    public CompCode: number;
    public CreatedBy: string;
    public CreatedAt: string;
    public UpdatedBy: string;
    public UpdatedAt: string;
    public ProjectPhaseId: number;
    public ProjectID: number;
    public EndDateTime: string;
    public StartDateTime: string;
    public WorkDescr: string;
    public Prj_ProjectCode: string;
    public Prj_DescA: string;
    public Prj_DescE: string;
    public Phase_ProjectPhaseCode: string;
    public Phase_DescA: string;
    public Phase_DescE: string;
}
class PQ_GetResEquipAssign {
    constructor() {
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
    public ScheduleEquipId: number;
    public ScheduleId: number;
    public EquimentID: number;
    public AssigneDate: string;
    public LeaveDate: string;
    public ExpLeaveDate: string;
    public HourCost: number;
    public Status: number;
    public Equipcode: string;
    public DescA: string;
    public DescE: string;
    public ClassCode: string;
    public Class_DescA: string;
    public Class_DescE: string;
}
class PProc_EngMonitorScheduleEquip_Result {
    constructor() {
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
    public eclass_calsscode: string;
    public eclass_desca: string;
    public eclass_desce: string;
    public equipcode: string;
    public desca: string;
    public desce: string;
    public schno: number;
    public assignedate: string;
    public leavedate: string;
    public expleavedate: string;
    public status: number;
    public projectphasecode: string;
    public projectcode: string;
    public stat_desc: string;
}

class PProc_ResGetFreeEquip_Result {
    constructor() {
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
    public EquimentID: number;
    public FreeDate: string;
    public EquipClassId: number;
    public EquipCode: string;
    public DescA: string;
    public DescE: string;
    public IsActive: boolean;
    public BraCode: number;
    public CompCode: number;
    public ClassCode: string;
    public class_descA: string;
    public Class_DescE: string;
    public HourCost: number;
}

class PQ_GetResRequestMaterial {
    constructor() {
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
    public RequestMaterialId: number;
    public ScheduleId: number;
    public SubServiceOrderId: number;
    public TrNo: number;
    public TrDate: string;
    public Status: number;
    public Remarks: string;
    public BraCode: number;
    public CompCode: number;
    public CreatedBy: string;
    public CreatedAt: string;
    public UpdatedBy: string;
    public UpdatedAt: string;
    public So_TrNo: number;
    public So_DescA: string;
    public So_DescE: string;
    public WorkDescr: string;
    public Prj_ProjectCode: string;
    public Prj_DescE: string;
    public Prj_DescA: string;
    public Phase_ProjectPhaseCode: string;
    public Phase_DescA: string;
    public Phase_DescE: string;
    public Eng_EngCode: string;
    public Eng_DescA: string;
    public Eng_DescE: string;
    public RequestedBy: string;
    public ApprovedBy: string;
    public SchduleTrNo: number;
}

class PQ_GetResRequestMaterialDetails {
    constructor() {
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
    public RequestMaterialDetailId: number;
    public RequestMaterialId: number;
    public ItemId: number;
    public SchedQty: number;
    public ReqBeforeQty: number;
    public RequiredQty: number;
    public ReqQty: number;
    public IssuedQty: number;
    public ReturnQty: number;
    public Remarks: string;
    public BalanceQty: number;
    public itm_ItemCode: string;
    public itm_DescA: string;
    public itm_DescL: string;
    public Uom_UomCode: string;
    public Uom_DescA: string;
    public Uom_DescE: string;
}
class PQ_SearchSchduleMaterial {
    constructor() {
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
    public ScheduleMaterialId: number;
    public ScheduleId: number;
    public SubServiceOrderId: number;
    public ItemId: number;
    public SchedQty: number;
    public ReqQty: number;
    public IssuedQty: number;
    public ReturnQty: number;
    public itm_ItemCode: string;
    public itm_DescA: string;
    public itm_DescL: string;
    public uom_UomCode: string;
    public uom_DescA: string;
    public uom_DescE: string;
}
class PQ_GetResMaterialIssue {
    constructor() {
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
    public IssueMaterialId: number;
    public RequestMaterialId: number;
    public ScheduleId: number;
    public SubServiceOrderId: number;
    public TrNo: number;
    public TrDate: string;
    public ProjectID: number;
    public ProjectPhaseID: number;
    public Status: number;
    public Remarks: string;
    public BraCode: number;
    public CompCode: number;
    public CreatedBy: string;
    public CreatedAt: string;
    public UpdatedBy: string;
    public UpdatedAt: string;
    public StoreID: number;
    public ReqMat_TrNo: number;
    public So_TrNo: number;
    public So_DescA: string;
    public So_DescE: string;
    public WorkDescr: string;
    public Prj_ProjectCode: string;
    public Prj_DescE: string;
    public Prj_DescA: string;
    public Phase_ProjectPhaseCode: string;
    public Phase_DescA: string;
    public Phase_DescE: string;
    public SchduleTrNo: number;
}

class PQ_GetResMaterialIssueDetails {
    constructor() {
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
    public RequestMaterialDetailId: number;
    public IssueMaterialId: number;
    public ItemId: number;
    public RemainQty: number;
    public AvailableQty: number;
    public UnitCost: number;
    public IssuedQty: number;
    public itm_ItemCode: string;
    public itm_DescA: string;
    public itm_DescE: string;
    public uom_UomCode: string;
    public uom_DescA: string;
    public uom_DescE: string;
    public Total: number;
}
class PQ_GetResMaterialReturned {
    constructor() {
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
    public ReturnMaterialId: number;
    public RequestMaterialId: number;
    public ScheduleId: number;
    public SubServiceOrderId: number;
    public TrNo: number;
    public TrDate: string;
    public ProjectID: number;
    public ProjectPhaseID: number;
    public Status: number;
    public Remarks: string;
    public BraCode: number;
    public CompCode: number;
    public CreatedBy: string;
    public CreatedAt: string;
    public UpdatedBy: string;
    public UpdatedAt: string;
    public StoreID: number;
    public ReqMat_TrNo: number;
    public Prj_ProjectCode: string;
    public Prj_DescE: string;
    public Prj_DescA: string;
    public Phase_ProjectPhaseCode: string;
    public Phase_DescA: string;
    public Phase_DescE: string;
    public So_TrNo: number;
    public SchduleTrNo: number;
}

class PQ_GetResMaterialReturnedDetails {
    constructor() {
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
    public RequestMaterialDetailId: number;
    public ReturnMaterialId: number;
    public ItemId: number;
    public NetIssuedQty: number;
    public ReturndQty: number;
    public UnitCost: number;
    public itm_ItemCode: string;
    public itm_DescA: string;
    public itm_DescL: string;
    public uom_UomCode: string;
    public uom_DescA: string;
    public uom_DescE: string;
    public Total: number;
}

class PPrc_Res_MaterialRequired_Result {
    constructor() {
        this.ItemCode = "";
        this.DescA = "";
        this.DescL = "";
        this.NetReqQty = 0;
        this.ItemCost = 0;
        this.NetIssQty = 0;
        this.NetIssCost = 0;
        this.RemainQty = 0;

    }
    public ItemCode: string;
    public DescA: string;
    public DescL: string;
    public NetReqQty: number;
    public ItemCost: number;
    public NetIssQty: number;
    public NetIssCost: number;
    public RemainQty: number;
}

class PQ_GetResRequestMaterialMontoring {
    constructor() {
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
    public RequestMaterialId: number;
    public ScheduleId: number;
    public SubServiceOrderId: number;
    public TrNo: number;
    public TrDate: string;
    public Status: number;
    public RequestMaterialDetailId: number;
    public ItemId: number;
    public SchedQty: number;
    public ReqBeforeQty: number;
    public RequiredQty: number;
    public ReqQty: number;
    public IssuedQty: number;
    public ReturnQty: number;
    public Remarks: string;
    public BalanceQty: number;
    public itm_ItemCode: string;
    public itm_DescA: string;
    public itm_DescL: string;
    public uom_UomCode: string;
    public uom_DescA: string;
    public uom_DescE: string;
}
//
class PQ_GetEngVariation {
    constructor() {
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
    public VariationId: number;
    public TrNo: number;
    public TrDate: string;
    public ProjectPhaseId: number;
    public ProjectID: number;
    public RefNo: string;
    public RefDate: string;
    public VariationValue: number;
    public VariationDescr: string;
    public Status: boolean;
    public IsSalesApprove: boolean;
    public Remarks: string;
    public BraCode: number;
    public CompCode: number;
    public CreatedBy: string;
    public CreatedAt: string;
    public UpdatedBy: string;
    public UpdatedAt: string;
    public Proj_ProjectCode: string;
    public Proj_DescA: string;
    public Proj_DescL: string;
}

class PQ_GetEngVariationActivity {
    constructor() {
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
    public VariationActivId: number;
    public ProjectPhaseId: number;
    public VariationItemId: number;
    public ProjectPhaseItemActivId: number;
    public ActivityID: number;
    public IsNew: boolean;
    public Old_ActivQty: number;
    public ActivQty: number;
    public UnitPrice: number;
    public StdUnitPrice: number;
    public OldProductionPrc: number;
    public ProductionPrc: number;
    public Remarks: string;
    public EstimatedMaterial: number;
    public EstimatedLabor: number;
    public EstimatedEquip: number;
    public EstimatedProfit: number;
    public Act_ActivityCode: string;
    public Act_DescA: string;
    public Act_DescE: string;
    public uom_UomCode: string;
    public uom_DescA: string;
    public uom_DescE: string;
    public VariationId: number;
    public OldEffItemQty: number;
    public NewEffItemQty: number;
    public TotProdQty: number;
    public UnderProdQty: number;
}
class PQ_GetEngVariationItem {
    [x: string]: any;
    constructor() {
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
    public VariationItemId: number;
    public VariationId: number;
    public IsNew: boolean;
    public ProjectPhaseItemId: number;
    public ItemID: number;
    public UnitPrice: number;
    public OrgItemQty: number;
    public ItemQty: number;
    public LineCode: string;
    public DescA: string;
    public DescE: string;
    public Remarks: string;
    public EstimatedMaterial: number;
    public EstimatedLabor: number;
    public EstimatedEquip: number;
    public EstimatedProfit: number;
    public itm_ItemCode: string;
    public itm_DescA: string;
    public itm_DescL: string;
    public itm_TechDescA: string;
    public itm_TechDescL: string;
    public uom_UomCode: string;
    public uom_DescA: string;
    public uom_DescE: string;
    public Diff: number;
    public Total: number;
    public BilledQty: number;
    public ProdQty: number;
    public ProgressQty: number;
}


class PProc_ResGetMaterialissueReturn_Result {
    constructor() {
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
    public ScheduleId: number;
    public SubServiceOrderId: number;
    public ReqTrNo: number;
    public TrDate: string;
    public req_status: string;
    public Issue_no: number;
    public Ret_No: number;
    public Tr_Date: string;
    public tr_status: string;
}

class PProc_Eng_BudgetEngineer_Result {
    constructor() {
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
    public ProjectCode: string;
    public ProjectPhaseCode: string;
    public PhaseValue: number;
    public Bud01: number;
    public Bud02: number;
    public Bud03: number;
    public Bud04: number;
    public Bud05: number;
    public Bud06: number;
    public Bud07: number;
    public Bud08: number;
    public Bud09: number;
    public Bud10: number;
    public Bud11: number;
    public Bud12: number;
    public ACT01: number;
    public ACT02: number;
    public ACT03: number;
    public ACT04: number;
    public ACT05: number;
    public ACT06: number;
    public ACT07: number;
    public ACT08: number;
    public ACT09: number;
    public ACT10: number;
    public ACT11: number;
    public ACT12: number;
    public Bud00: number;
    public ACT00: number;
    public ActYTD: number;
    public BudYTD: number;
}

class PProc_Eng_BudgetEngineerActiv_Result {
    constructor() {
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
    public ProjectPhaseItemActivId: number;
    public ProjectPhaseId: number;
    public ProjectID: number;
    public ActivityID: number;
    public budjetid: number;
    public BudVal: number;
    public ProjectCode: string;
    public ActualQty: number;
    public BudgetQty: number;
    public ActVal: number;
    public ActivQty: number;
    public ActTotalValue: number;
    public ActivityCode: string;
    public DESCE: string;
    public DescA: string;
    public PeriodCode: number;
    public projectphasecode: string;
    public ActYTD: number;
    public BudYTD: number;
    public PM_ActualQty: number;
    public PM_BudgetQty: number;
}
class P_G_Budget {
    constructor() {
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
    public BudjetID: number;
    public PeriodID: number;
    public YearID: number;
    public PeriodCode: number;
    public BranchCode: number;
    public SiteEngineerId: number;
    public ProjectPhaseItemActivId: number;
    public BudgetQty: number;
    public ActualQty: number;
}
class GQ_GetUserModule {
    constructor() {
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
    public USER_CODE: string;
    public SYSTEM_CODE: string;
    public SUB_SYSTEM_CODE: string;
    public MODULE_CODE: string;
    public EXECUTE: boolean;
    public CREATE: boolean;
    public EDIT: boolean;
    public DELETE: boolean;
    public PRINT: boolean;
    public VIEW: boolean;
    public CUSTOM1: boolean;
    public CUSTOM2: boolean;
    public CUSTOM3: boolean;
    public CUSTOM4: boolean;
    public CUSTOM5: boolean;
    public CUSTOM6: boolean;
    public CUSTOM7: boolean;
    public CUSTOM8: boolean;
    public CUSTOM9: boolean;
    public ViewImages: boolean;
    public EditImages: boolean;
    public MENU_NO: string;
    public MODULE_DESCE: string;
    public MODULE_DESCA: string;
    public M_CREATE: boolean;
    public M_EDIT: boolean;
    public M_DELETE: boolean;
    public M_VIEW: boolean;
    public M_PRINT: boolean;
    public M_CUSTOM1: boolean;
    public M_CUSTOM2: boolean;
    public M_CUSTOM3: boolean;
    public M_CUSTOM4: boolean;
    public M_CUSTOM5: boolean;
    public M_CUSTOM6: boolean;
    public M_CUSTOM7: boolean;
    public M_CUSTOM8: boolean;
    public M_CUSTOM9: boolean;
    public CUSTOM1_DESC: string;
    public CUSTOM2_DESC: string;
    public CUSTOM3_DESC: string;
    public CUSTOM4_DESC: string;
    public CUSTOM5_DESC: string;
    public CUSTOM6_DESC: string;
    public CUSTOM7_DESC: string;
    public CUSTOM8_DESC: string;
    public CUSTOM9_DESC: string;
    public AVAILABLE: boolean;
    public M_images_enabled: boolean;
}


class PProc_EngVariationLoadItem_Result {
    constructor() {
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

    public ProjectPhaseItemId: number;
    public ProjectPhaseId: number;
    public ProjectID = 0;
    public OfferItemId: number;
    public LineCode: string;
    public ItemID: number;
    public ContrQty: number;
    public ItemQty: number;
    public ProdQty: number;
    public BilledQty: number;
    public UnitPrice: number;
    public StdUnitPrice: number;
    public IsOfferItem: boolean;
    public ProductionType: boolean;
    public SlsITm_ItemCode: string;
    public SlsITm_DescA: string;
    public SlsITm_DescE: string;
    public ScopeID: number;
    public UomCode: string;
    public ProgQty: string;
}


class PQ_GetSalesCustomerDoc {
    constructor() {
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
    public CustomerDocID: number;
    public CustomerId: number;
    public CusIDTypeCode: number;
    public IDNo: string;
    public IDIssuePlace: string;
    public IDIssueDateH: string;
    public IDIssueDate: string;
    public IDExpireDate: string;
    public IDExpireDateH: string;
    public Doc_DescA: string;
    public Doc_DescE: string;
    public Doc_StdCode: string;
}

class P_D_SalesCustomerDoc {
    constructor() {
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
    public CustomerDocID: number;
    public CustomerId: number;
    public CusIDTypeCode: number;
    public IDNo: string;
    public IDIssuePlace: string;
    public IDIssueDate: string;
    public IDIssueDateH: string;
    public IDExpireDate: string;
    public IDExpireDateH: string;
    public StatusFlag: string;
}

class Proc_prnt_sls_invoice_results {
    constructor() {
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

    public Comp: number;
    public CompNameA: string;
    public CompNameE: string;
    public BraNameA: string;
    public BraNameE: string;
    public LoginUser: string;
    public PrintDate: string;
    public QRStr: string;
    public InvoiceId: number;
    public BillCode: number;
    public TrNo: number;
    public TrDate: string;
    public TrTime: string;
    public ProjCode: string;
    public TotalAmount: number;
    public Discount: number;
    public DiscountPrc: number;
    public VatAmount: number;
    public NetAmount: number;
    public NetAfterVat: number;
    public ProjectCode: string;
    public Proj_DescA: string;
    public Proj_DescE: string;
    public Cust_Code: number;
    public Cust_DescA: string;
    public Cust_DescE: string;
    public FromDate: string;
    public ToDate: string;
    public WorkDiscription: string;
    public TR_Status: string;
    public inv_HDE: string;
    public inv_HDA: string;
    public RefCode: string;
    public Remarks: string;
    public Serial: number;
    public LineCode: string;
    public Itm_ItemCode: string;
    public ItemQty: number;
    public PrevBillQty: number;
    public BillQty: number;
    public UnitPrice: number;
    public ItemDiscountPrc: number;
    public ItemDiscountAmt: number;
    public NetUnitPrice: number;
    public ItemVatPrc: number;
    public ItemVatAmount: number;
    public Line_Total: number;
    public ItemTotalAVat: number;
    public Line_Remark: string;
    public Itm_DescA: string;
    public Itm_DescE: string;
    public Cust_Contact: string;
    public Cust_VatNo: string;
    public Cust_RefCode2: string;
    public Cust_RefCode1: string;
    public Cust_ISPersonal: string;
    public Cust_ISVatRegistered: boolean;
    public Cust_Address_postal: string;
    public Cust_Address_Province: string;
    public Cust_Address_Street: string;
    public Cust_Address_Str_Additional: string;
    public Cust_Address_BuildingNo: string;
    public Cust_Address_Build_Additional: string;
    public Cust_Address_City: string;
    public Cust_Address_District: string;
    public ContractDate: string;
    public ContractPrice: number;
    public ContractAdditions: number;
    public LblVatPRE: string;
    public LblVatPRA: string;
    public UomCode: string;
    public UomDescA: string;
    public UomDescE: string;
    public Comp_VatNo: string;
    public BankAccNo: string;
    public BNKNameA: string;
    public BNKNameE: string;
    public CityNameA: string;
    public CityNameE: string;
    public ContractRefNo: string;
    public EngCode: string;
    public Eng_nameA: string;
    public Eng_nameE: string;
    public VatPrc: number;
    public RetentionPrc: number;
    public WarnteeAmount: number;
    public DownAmount: number;
    public AdvVatAmount: number;
    public TaxableAmount: number;
    public NetTax: number;
    public TotalDue: number;
    public IsDownpayment : boolean;
    public UsedDownpayment: number;
    public RemainDownpayment: number;
    public BRA_CODE: number;
    public BRA_DESC: string;
    public BRA_DESCL: string;
    public BRA_Address_postal: string;
    public BRA_Address_Province: string;
    public BRA_Address_Street: string;
    public BRA_Address_Str_Additional: string;
    public BRA_Address_BuildingNo: string;
    public BRA_Address_Build_Additional: string;
    public BRA_Address_City: string;
    public BRA_Address_District: string;
    public DocNo: string;
    public DocUUID: string;
    public InvoiceTypeCode: number;
    public InvoiceTransCode: number;
    public GlobalInvoiceCounter: number;
    public QRCode: string;
    public AdvanceConsumPrc: number;
    public ContractCode: string;
}
class Mytime {
    Days: number;
    Hours: number;
    Milliseconds: number;
    Minutes: number;
    Seconds: number;
    Tiks: number;
    TotalDays: number;
    TotalHours: number;
    TotalMilliseconds: number;
    TotalMinutes: number;
    TotalSeconds: number;
    constructor() {
        this.Days = 0;
        this.Hours = 0;
        this.Milliseconds =0;
        this.Minutes = 0;
        this.Seconds = 0;
        this.Tiks = 0;
        this.TotalDays = 0;
        this.TotalHours = 0;
        this.TotalMilliseconds = 0;
        this.TotalMinutes = 0;
        this.TotalSeconds = 0;
    }
}
class P_D_Status {
    constructor() {
        this.ID = 0;
        this.StatusType = "";
        this.StatusCode = 0;
        this.DescA = "";
        this.DescE = "";
        this.securityControl = "";
        this.Remarks = "";
    }
    public ID: number;
    public StatusType: string;
    public StatusCode: number;
    public DescA: string;
    public DescE: string;
    public securityControl: string;
    public Remarks: string;
}
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


class P_TR_SalesDbCr {
    constructor() {
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
        this.PrevInvoiceHash
        this.QRCode
        this.CryptographicStamp
    }
    public InvoiceId: number;
    public TrType: number;
    public DbReason: number;
    public RefInvoiceid: number;
    public TrNo: number;
    public TrDate: string;
    public ProjectID: number;
    public ProjCode: string;
    public FromDate: string;
    public ToDate: string;
    public WorkDiscription: string;
    public TotalAmount: number;
    public DiscountPrc: number;
    public Discount: number;
    public VatAmount: number;
    public NetAmount: number;
    public CustomerID: number;
    public RefCode: string;
    public Status: number;
    public Remarks: string;
    public BraCode: number;
    public CompCode: number;
    public CreatedBy: string;
    public CreatedAt: string;
    public UpdatedBy: string;
    public UpdatedAt: string;
    public IsPosted: boolean;
    public PostRef: string;
    public VatPrc: number;
    public TrTime: string;
    public DocNo: string;
    public DocUUID: string;
    public InvoiceTypeCode: number;
    public InvoiceTransCode: number;
    public GlobalInvoiceCounter: number;
    public PrevInvoiceHash: any;
    public QRCode: any;
    public CryptographicStamp: any;
}

class P_TR_SalesDbCrDetail {
    constructor() {
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
    public InvoiceDetailId: number;
    public InvoiceId: number;
    public Serial: number;
    public InvSerial: number;
    public ProjectPhaseItemId: number;
    public BillQty: number;
    public UnitPrice: number;
    public DiffQty: number;
    public DiffPrice: number;
    public Remarks: string;
    public InvDiscountPrc: number;
    public InvDiscountAmt: number;
    public DiffPricePrc: number;
    public ItemTotal: number;
    public ItemVatPrc: number;
    public ItemVatAmount: number;
    public ItemTotalAVat: number;
}

class PQ_GetSalesDbCr {
    constructor() {
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
        this.PrevInvoiceHash
        this.QRCode
        this.CryptographicStamp
        this.TrType = 0;
        this.DbReason = 0;
        this.RefInvoiceid = 0;
        this.PostRef = "";
        this.inv_TrNo = 0;
        this.inv_TrDate = "";
        this.inv_DocNo = "";
    }
    public InvoiceId: number;
    public TrNo: number;
    public TrDate: string;
    public ProjectID: number;
    public ProjCode: string;
    public FromDate: string;
    public ToDate: string;
    public WorkDiscription: string;
    public TotalAmount: number;
    public DiscountPrc: number;
    public Discount: number;
    public VatAmount: number;
    public NetAmount: number;
    public CustomerID: number;
    public RefCode: string;
    public Status: number;
    public Remarks: string;
    public BraCode: number;
    public CompCode: number;
    public CreatedBy: string;
    public CreatedAt: string;
    public UpdatedBy: string;
    public UpdatedAt: string;
    public Proj_ProjectCode: string;
    public Proj_DescA: string;
    public Proj_DescL: string;
    public Cust_CustomerCode: number;
    public Cust_DescA: string;
    public Cust_DescE: string;
    public VatPrc: number;
    public IsPosted: boolean;
    public TrTime: string;
    public DocNo: string;
    public DocUUID: string;
    public InvoiceTypeCode: number;
    public InvoiceTransCode: number;
    public GlobalInvoiceCounter: number;
    public PrevInvoiceHash: any;
    public QRCode: any;
    public CryptographicStamp: any;
    public TrType: number;
    public DbReason: number;
    public RefInvoiceid: number;
    public PostRef: string;
    public inv_TrNo: number;
    public inv_TrDate: string;
    public inv_DocNo: string;
}

class PQ_GetSalesDbCrDetail {
    constructor() {
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
    public InvoiceId: number;
    public ProjectPhaseItemId: number;
    public UnitPrice: number;
    public BillQty: number;
    public Itm_ItemCode: string;
    public Itm_DescA: string;
    public Itm_DescE: string;
    public ProjectPhaseId: number;
    public InvoiceDetailId: number;
    public LineCode: string;
    public ItemQty: number;
    public Serial: number;
    public Remarks: string;
    public UomCode: string;
    public uom_DescA: string;
    public Uom_DescE: string;
    public ItemVatPrc: number;
    public ItemVatAmount: number;
    public ItemTotal: number;
    public ItemTotalAVat: number;
    public InvSerial: number;
    public DiffQty: number;
    public DiffPrice: number;
    public InvDiscountPrc: number;
    public InvDiscountAmt: number;
    public DiffPricePrc: number;
    public ItemTotalprice: number;
}

