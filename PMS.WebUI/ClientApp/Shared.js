var ClientSharedWork = /** @class */ (function () {
    function ClientSharedWork() {
    }
    ClientSharedWork.SetClientSession = function (key, value) {
        var data = typeof value === "string" ? value : JSON.stringify(value);
        $.ajax({
            url: Url.Action("Set" + key, "Session"),
            data: { value: data },
            async: false
        });
    };
    ClientSharedWork.GetClientSession = function (key) {
        var value = $.ajax({
            url: Url.Action("Get" + key, "Session"),
            async: false
        }).responseJSON.result;
        return value;
    };
    ClientSharedWork.GetDescByCode = function (model, code) {
        var result = Ajax.Call({
            url: Url.Action("GetDescByCode", "ClientTools"),
            data: { typeName: model, code: code }
        });
        return result;
    };
    Object.defineProperty(ClientSharedWork, "Me", {
        get: function () {
            return this.GetClientSession("Me");
        },
        set: function (value) {
            this.SetClientSession("Me", value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClientSharedWork, "PageIndex", {
        get: function () {
            //
            //if (document.cookie.length > 0) {
            //    let data = document.cookie.split("pageIndex=");
            //}
            //let value: number = Number(getCookie("pageIndex").toString());
            var value2 = this.GetClientSession("PageIndex");
            return value2;
        },
        set: function (value) {
            //document.cookie = "pageIndex=" + value;
            this.SetClientSession("PageIndex", value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ClientSharedWork, "ModelCount", {
        get: function () {
            return this.GetClientSession("ModelCount");
        },
        set: function (value) {
            this.SetClientSession("ModelCount", value);
        },
        enumerable: true,
        configurable: true
    });
    ClientSharedWork.Render = function () {
        var _PageIndex = this.PageIndex;
        if (_PageIndex < 1) {
            $("#ModelPreview").val("");
        }
        else {
            $("#ModelPreview").val("1");
        }
        $("#txtNav").val(_PageIndex.toString() + "/" + this.ModelCount.toString());
        //$("#txtCount").val(this.ModelCount.toString());
    };
    ClientSharedWork.SwitchModes = function (mode) {
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
    };
    ClientSharedWork.Session = new SessionRecord();
    ClientSharedWork.UserFavorits = new Array();
    ClientSharedWork.OnNavigate = null;
    ClientSharedWork.OnSwitchModes = null;
    return ClientSharedWork;
}());
var SharedSession = /** @class */ (function () {
    function SharedSession() {
    }
    return SharedSession;
}());
var PropertiesPage = /** @class */ (function () {
    function PropertiesPage() {
    }
    PropertiesPage.Render = function () {
        if (this.PageIndex < 1) {
            $("#ModelPreview").val("");
        }
        else {
            $("#ModelPreview").val("1");
        }
        $("#txtNav").val(this.PageIndex.toString() + "/" + this.ModelCount.toString());
    };
    PropertiesPage.OnNavigate = null;
    return PropertiesPage;
}());
function getCookie(c_name) {
    if (document.cookie.length > 0) {
        var c_start = document.cookie.indexOf(c_name + "=");
        if (c_start != -1) {
            c_start = c_start + c_name.length + 1;
            var c_end = document.cookie.indexOf(";", c_start);
            if (c_end == -1) {
                c_end = document.cookie.length;
            }
            var data = document.cookie.substring(c_start, c_end);
            return data;
        }
    }
    return "";
}
function GetPrivileges() {
    if (document.cookie.length > 0) {
        var user = JSON.parse(JSON.parse(getCookie("PMS_Privilage")));
        SharedSession.CurrentPrivileges = user;
        return user;
    }
    else {
    }
}
function GetSystemEnvironment() {
    if (document.cookie.length > 0) {
        var sys = JSON.parse(getCookie("PMS_systemProperties"));
        SharedSession.CurrentEnvironment = sys;
        if (true) {
            Ajax.Callsync({
                url: Url.Action("GetSystemProperties", "Home"),
                success: function (d) {
                    SharedSession.CurrentEnvironment = JSON.parse(d.result);
                    if (DocumentActions.GetElementById("SpanUserName") != null)
                        DocumentActions.GetElementById("SpanUserName").innerText = SharedSession.CurrentEnvironment.UserCode;
                    App.AssignLoginInformation();
                }
            });
        }
        return sys;
    }
    else {
    }
}
function GetMAxImgSize(CompCode, BranchCode) {
    var sys = new SystemTools();
    var Cont = 0;
    AjaxApi.CallsyncApi({
        type: "GET",
        url: sys.apiUrl("SystemTools", "GetMaxImagesize"),
        data: { comp: CompCode, bracode: BranchCode },
        success: function (d) {
            var result = d;
            if (result.IsSuccess == true) {
                Cont = result.Response;
            }
        }
    });
    return Cont;
}
function GetSessiontimeout(CompCode, BranchCode) {
    var sys = new SystemTools();
    var Cont = 0;
    AjaxApi.CallsyncApi({
        type: "GET",
        url: sys.apiUrl("SystemTools", "GetSessiontimeout"),
        data: { comp: CompCode, bracode: BranchCode },
        success: function (d) {
            var result = d;
            if (result.IsSuccess == true) {
                Cont = result.Response;
            }
        }
    });
    return Cont;
}
//# sourceMappingURL=Shared.js.map