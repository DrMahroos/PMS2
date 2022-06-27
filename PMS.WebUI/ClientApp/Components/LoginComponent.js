$(document).ready(function () {
    LoginComponent.InitalizeComponent();
});
var LoginComponent;
(function (LoginComponent) {
    var sys = new SystemTools();
    var sysPar = new SystemParameters();
    var cmbLanguage;
    var CompaniesUrl = "";
    var BranchsUrl = "";
    var LoginUrl = "";
    var OnLoggedUrl = "";
    var txtUserName;
    var txtUserPassword;
    var chkRemember;
    var btnLogin;
    var btnBack;
    var txtYear;
    var hLoggedName;
    var spnLoggedYear;
    var cmbBranch;
    var cmbSubSys;
    var cmbCompany;
    var systemEnv;
    function InitalizeComponent() {
        txtUserName = document.getElementById("txtUserName");
        txtUserPassword = document.getElementById("txtUserPassword");
        chkRemember = document.getElementById("chkRemember");
        btnLogin = document.getElementById("btnLogin");
        btnBack = document.getElementById("btnBack");
        cmbLanguage = document.getElementById("cmbLanguage");
        txtYear = document.getElementById("txtYear");
        hLoggedName = DocumentActions.GetElementById("hLoggedName");
        spnLoggedYear = DocumentActions.GetElementById("spnLoggedYear");
        cmbCompany = document.getElementById("cmbCompany");
        cmbBranch = document.getElementById("cmbBranch");
        cmbSubSys = document.getElementById("cmbSubSys");
        CompaniesUrl = $("#CompaniesUrl").val();
        LoginUrl = $("#LoginUrl").val();
        OnLoggedUrl = $("#OnLogged").val();
        btnBack.addEventListener("click", GoBack);
        btnLogin.addEventListener("click", Login);
        var loginData = localStorage.getItem("bse_sales_login_data");
        if (loginData != null) {
            var data = JSON.parse(loginData);
            txtUserName.value = data.USER_CODE;
            txtUserPassword.value = data.USER_PASSWORD;
            txtYear.value = data.Year;
            cmbLanguage.value = data.Language;
            chkRemember.checked = true;
        }
        else {
            txtYear.value = ClientSharedWork.Session.CurrentYear;
            cmbLanguage.value = ClientSharedWork.Session.Language;
        }
        $("#cmbLanguage").val("en");
        try {
            var OutUesr = localStorage.getItem("OutUesr");
            if (OutUesr == "1") {
                localStorage.setItem("OutUesr", "0");
                setTimeout(function () {
                    alert(" لقد استنفذت وقت الجلسة في شاشه اخري الرجاء تسجيل الدخول مره اخري");
                }, 700);
            }
        }
        catch (e) {
            localStorage.setItem("OutUesr", "");
        }
    }
    LoginComponent.InitalizeComponent = InitalizeComponent;
    function checkBrowser() {
        //debugger;
        var userAgentString = navigator.userAgent;
        var chromeAgent = userAgentString.indexOf("Chrome") > -1;
        var IExplorerAgent = userAgentString.indexOf("MSIE") > -1 || userAgentString.indexOf("rv:") > -1;
        var firefoxAgent = userAgentString.indexOf("Firefox") > -1;
        var safariAgent = userAgentString.indexOf("Safari") > -1;
        var EdgeAgent = userAgentString.indexOf("Edge") > -1;
        if ((chromeAgent) && (safariAgent))
            safariAgent = false;
        var operaAgent = userAgentString.indexOf("OP") > -1;
        if ((chromeAgent) && (operaAgent))
            chromeAgent = false;
        if (safariAgent || IExplorerAgent || operaAgent || firefoxAgent || EdgeAgent) {
            // WorningMessage("الرجاء استكمال البيانات", "Please complete Data");
            //WorningMessage("يجب الدخول من متصفح جوجل كروم", "Please use Chrome browser");
            alert("يجب الدخول من متصفح جوجل كروم    Please use Chrome browser");
            return false;
            // MessageBox.Show(" ", "");
            //let mg = ClientSharedWork.Session.ScreenLanguage == "ar" ? "يجب الدخول من متصفح جوجل كروم" : "You must log in from Google Chrome";
        }
        else {
            return true;
            //InitalizeComponent();
        }
    }
    function GetSubSystem(user, sys) {
        //debugger
        Ajax.CallAsync({
            url: Url.Action("GetSubSystem", "Login"),
            data: { user: user, sys: sys },
            success: function (d) {
                //debugger;
                var result = d.result;
                removeOptions(cmbSubSys);
                result.forEach(function (SubSys, index) {
                    var text = SubSys.SUB_SYSTEM_CODE.toString() + "- " + ($("#cmbLanguage").val() == "en" ? SubSys.SUB_SYSTEM_DESCE : SubSys.SUB_SYSTEM_DESCA);
                    cmbSubSys.add(new Option(text, SubSys.SUB_SYSTEM_CODE.toString()));
                });
            }
        });
    }
    function Login() {
        var db = new AjaxCaller();
        var userName = txtUserName.value;
        var userPassword = txtUserPassword.value;
        var user = new G_USERS();
        var year = $("#txtYear").val();
        user.USER_CODE = userName;
        user.USER_PASSWORD = userPassword;
        txtUserName.style.borderColor = "";
        txtUserPassword.style.borderColor = "";
        ClientSharedWork.Session.CurrentYear = year;
        var lang = "ar";
        if (cmbLanguage.selectedIndex == 0)
            lang = "ar";
        else
            lang = "en";
        sessionStorage.setItem("temp_lang", lang);
        ClientSharedWork.Session.Language = lang;
        ClientSharedWork.Session.CurrentYear = txtYear.value;
        var systemEnv = new SystemEnvironment;
        systemEnv.ScreenLanguage = lang;
        systemEnv.CurrentYear = txtYear.value;
        systemEnv.UserCode = userName;
        document.cookie = "PMS_systemProperties=" + JSON.stringify(systemEnv).toString() + ";expires=Fri, 31 Dec 2030 23:59:59 GMT;path=/";
        if (checkBrowser()) {
            Ajax.CallAsync({
                url: Url.Action("LoginSubmit", "Login"),
                data: user,
                success: function (d) {
                    //debugger;
                    var result = d.result;
                    if (result.length > 0) {
                        $("#divLogin").css("display", "none");
                        $("#divCompanies").css("display", "block");
                        ClientSharedWork.Me = result[0];
                        ClientSharedWork.Session.UserCode = result[0].USER_CODE;
                        db.Url = CompaniesUrl;
                        var compData = db.Call();
                        removeOptions(cmbCompany);
                        compData.forEach(function (comp, index) {
                            cmbCompany.add(new Option(comp.CompanyEnglishDescription.toString(), comp.CompanyCode.toString()));
                        });
                        var compCode = Number(cmbCompany.value);
                        Ajax.CallAsync({
                            url: Url.Action("GetBranchsUser", "Login"),
                            data: { compCode: compCode, userCode: ClientSharedWork.Session.UserCode },
                            success: function (d) {
                                var result = d.result;
                                removeOptions(cmbBranch);
                                result.forEach(function (bra, index) {
                                    var text = bra.BRA_CODE.toString() + "- " + ($("#cmbLanguage").val() == "en" ? bra.BRA_DESCE : bra.BRA_DESC);
                                    cmbBranch.add(new Option(text, bra.BRA_CODE.toString()));
                                });
                            }
                        });
                        //debugger;
                        var muser;
                        if (result[0].LoginUrl == false || IsNullOrEmpty(result[0].ManagedBy)) {
                            muser = result[0].USER_CODE;
                        }
                        else {
                            muser = result[0].ManagedBy;
                        }
                        GetSubSystem(muser, "P");
                        if (chkRemember.checked == true) {
                            var loginData = {
                                USER_CODE: userName,
                                USER_PASSWORD: userPassword,
                                Year: txtYear.value,
                                Language: cmbLanguage.value
                            };
                            localStorage.setItem("bse_sales_login_data", JSON.stringify(loginData));
                        }
                        hLoggedName.innerText = user.USER_CODE;
                        spnLoggedYear.innerText = txtYear.value;
                        GoToCompanySelect();
                    }
                    else {
                        txtUserName.style.borderColor = "red";
                        txtUserPassword.style.borderColor = "red";
                    }
                }
            });
        }
    }
    function GoToCompanySelect() {
        $("#tblLogin").css("display", "none");
        $("#tblCompany").css("display", "block");
        document.getElementById("btnOk").addEventListener("click", function () {
            var compCode = $("#cmbCompany").val();
            var braCode = $("#cmbBranch").val();
            ClientSharedWork.Session.CompCode = compCode;
            ClientSharedWork.Session.BranchCode = braCode;
            OnLogged();
        });
    }
    function OnLogged() {
        ClientSharedWork.Session.ScreenLanguage = ClientSharedWork.Session.Language;
        ClientSharedWork.Session.CurrentYear = $("#txtYear").val();
        $.ajax({
            url: OnLoggedUrl,
            success: function (result) {
                var obj = result.result;
                debugger;
                ClientSharedWork.Session.SystemCode = "P";
                ClientSharedWork.Session.SubSystemCode = $("#cmbSubSys").val();
                window.location.href = obj.url;
            }
        });
    }
    function GoBack() {
        $("#divLogin").css("display", "block");
        $("#divCompanies").css("display", "none");
    }
})(LoginComponent || (LoginComponent = {}));
function removeOptions(selectbox) {
    for (var i = selectbox.options.length - 1; i >= 0; i--) {
        selectbox.remove(i);
    }
}
//# sourceMappingURL=LoginComponent.js.map