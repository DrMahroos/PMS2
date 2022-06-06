class ClientSharedWork {
    public static Session: SessionRecord = new SessionRecord();
    public static CurrentMode: ScreenModes; // = ScreenModes.Query;
    public static SharedNavText: HTMLInputElement;
    public static UserFavorits: Array<FavModules> = new Array<FavModules>();
    public static SearchDataGrid: DataTable;
    private static SetClientSession(key: string, value: any) {

        let data: string = typeof value === "string" ? value : JSON.stringify(value);
        $.ajax({
            url: Url.Action("Set" + key, "Session"),
            data: { value: data },
            async: false
        });
    }
    private static GetClientSession<T>(key: string): T {
        let value = $.ajax({
            url: Url.Action("Get" + key, "Session"),
            async: false
        }).responseJSON.result as T;
        return value;
    }
    public static GetDescByCode(model: string, code: string): string {
        let result = Ajax.Call<string>({
            url: Url.Action("GetDescByCode", "ClientTools"),
            data: { typeName: model, code: code }
        });
        return result;
    }
    public static set Me(value: G_USERS) {
        this.SetClientSession("Me", value);
    }
    public static get Me(): G_USERS {
        return this.GetClientSession<G_USERS>("Me");
    }
    public static set PageIndex(value: number) {
        //document.cookie = "pageIndex=" + value;
        this.SetClientSession("PageIndex", value);
    }
    public static get PageIndex(): number {
        //
        //if (document.cookie.length > 0) {
        //    let data = document.cookie.split("pageIndex=");
        //}
        //let value: number = Number(getCookie("pageIndex").toString());
        let value2: number = this.GetClientSession<number>("PageIndex");
        return value2;
    }
    public static set ModelCount(value: number) {
        this.SetClientSession("ModelCount", value);
    }
    public static get ModelCount(): number {
        return this.GetClientSession<number>("ModelCount");
    }
    public static OnNavigate: () => void = null;
    public static OnSwitchModes: () => void = null;
    public static SwitchLanguage: () => void;
    public static Render() {
        let _PageIndex: number = this.PageIndex;
        if (_PageIndex < 1) {
            $("#ModelPreview").val("");
        }
        else {
            $("#ModelPreview").val("1");
        }
        $("#txtNav").val(_PageIndex.toString() + "/" + this.ModelCount.toString());
        //$("#txtCount").val(this.ModelCount.toString());
    }
    public static SwitchModes(mode: ScreenModes) {
        switch (mode) {
            case ScreenModes.Add:

                $("#AddIconSpan").show();
                $("#EditIconSpan").hide();
                $("#QueryIconSpan").hide();

                ControlsButtons.AddButton.disabled = true;
                ControlsButtons.EditButton.disabled = true;
                ControlsButtons.DeleteButton.disabled = true;
                ControlsButtons.SaveButton.disabled = false;
                ControlsButtons.UndoButton.disabled = false;

                $(".xaddable").attr("disabled", "disabled");
                $(".addable").removeAttr("disabled");
                $("[name=nav]").prop('disabled', true);
                break;

            case ScreenModes.Edit:

                $("#AddIconSpan").hide();
                $("#EditIconSpan").show();
                $("#QueryIconSpan").hide();

                ControlsButtons.AddButton.disabled = true;
                ControlsButtons.EditButton.disabled = true;
                ControlsButtons.DeleteButton.disabled = true;
                ControlsButtons.SaveButton.disabled = false;
                ControlsButtons.UndoButton.disabled = false;

                $(".xeditable").attr("disabled", "disabled");
                $(".editable").removeAttr("disabled");
                $("[name=nav]").prop('disabled', true);
                break;

            case ScreenModes.Query:

                $("#AddIconSpan").hide();
                $("#EditIconSpan").hide();
                $("#QueryIconSpan").show();

                ControlsButtons.AddButton.disabled = false;
                ControlsButtons.EditButton.disabled = false;
                ControlsButtons.DeleteButton.disabled = false;
                ControlsButtons.SaveButton.disabled = true;
                ControlsButtons.UndoButton.disabled = true;

                $(".xaddable").removeAttr("disabled");
                $(".xeditable").removeAttr("disabled");

                $(".editable").attr("disabled", "disabled");
                $(".addable").attr("disabled", "disabled");
                $(".addable").val("");
                $(".editable").val("");

                $("[name=nav]").prop('disabled', false);
                break;

            case ScreenModes.DisableMenu:

                $("#AddIconSpan").hide();
                $("#EditIconSpan").hide();
                $("#QueryIconSpan").show();

                ControlsButtons.AddButton.disabled = true;
                ControlsButtons.EditButton.disabled = true;
                ControlsButtons.DeleteButton.disabled = true;
                ControlsButtons.SaveButton.disabled = true;
                ControlsButtons.UndoButton.disabled = true;

                $(".xaddable").removeAttr("disabled");
                $(".xeditable").removeAttr("disabled");

                $(".editable").attr("disabled", "disabled");
                $(".addable").attr("disabled", "disabled");

                $("[name=nav]").prop('disabled', false);
                break;
        }
        ControlsButtons.ModuleEffects();
        ClientSharedWork.CurrentMode = mode;
        if (ClientSharedWork.OnSwitchModes != null)
            ClientSharedWork.OnSwitchModes();
        ClientSharedWork.Render();
    }
}
class SharedSession {
    public static CurrentPrivileges: UserPrivilege;
    public static CurrentEnvironment: SystemEnvironment;
    public static ModuleCode: string;
}
class PropertiesPage {
    public static PageIndex: number;
    public static ModelCount: number;
    public static ScreenLanguage: string;

    public static OnNavigate: () => void = null;

    public static Render() {
        
        if (this.PageIndex < 1) {
            $("#ModelPreview").val("");
        }
        else {
            $("#ModelPreview").val("1");
        }
        $("#txtNav").val(this.PageIndex.toString() + "/" + this.ModelCount.toString());
    }
}

function getCookie(c_name): string {
    if (document.cookie.length > 0) {
        var c_start = document.cookie.indexOf(c_name + "=");
        if (c_start != -1) {
            c_start = c_start + c_name.length + 1;
            var c_end = document.cookie.indexOf(";", c_start);
            if (c_end == -1) {
                c_end = document.cookie.length;
            }
            var data: string = document.cookie.substring(c_start, c_end);
            return data;
        }
    }
    return "";
}
function GetPrivileges(): UserPrivilege {
    if (document.cookie.length > 0) {
        let user: UserPrivilege = JSON.parse(JSON.parse(getCookie("PMS_Privilage"))) as UserPrivilege;
        SharedSession.CurrentPrivileges = user;
        return user;
    }
    else {

    }
}
function GetSystemEnvironment(): SystemEnvironment {
    if (document.cookie.length > 0) {
        let sys: SystemEnvironment = JSON.parse(getCookie("PMS_systemProperties")) as SystemEnvironment;
        SharedSession.CurrentEnvironment = sys
        if (true) {
            Ajax.Callsync({
                url: Url.Action("GetSystemProperties", "Home"),
                success: (d) => {
                    SharedSession.CurrentEnvironment = JSON.parse(d.result) as SystemEnvironment;
                    if (DocumentActions.GetElementById<HTMLSpanElement>("SpanUserName") != null)
                        DocumentActions.GetElementById<HTMLSpanElement>("SpanUserName").innerText = SharedSession.CurrentEnvironment.UserCode;
                    App.AssignLoginInformation();
                }
            });
        }
        return sys;
    }
    else {

    }
}
function GetMAxImgSize(CompCode: Number, BranchCode: Number): Number {
    let sys: SystemTools = new SystemTools();
    let Cont: Number = 0;
    AjaxApi.CallsyncApi({
        type: "GET",
        url: sys.apiUrl("SystemTools", "GetMaxImagesize"),
        data: { comp: CompCode, bracode: BranchCode },
        success: (d) => {
            var result = d as BaseResponse;
            if (result.IsSuccess == true) {
                Cont = result.Response;
            }
        }
    })
    return Cont;

}
function GetSessiontimeout(CompCode: Number, BranchCode: Number): Number {
    let sys: SystemTools = new SystemTools();
    let Cont: Number = 0;
    AjaxApi.CallsyncApi({
        type: "GET",
        url: sys.apiUrl("SystemTools", "GetSessiontimeout"),
        data: { comp: CompCode, bracode: BranchCode },
        success: (d) => {
            var result = d as BaseResponse;
            if (result.IsSuccess == true) {
                Cont = result.Response;
            }
        }
    })
    return Cont;
}
