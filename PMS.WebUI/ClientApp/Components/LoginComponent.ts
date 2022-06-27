$(document).ready(() => {

    LoginComponent.InitalizeComponent();

})
namespace LoginComponent {
    let sys: SystemTools = new SystemTools();
    var sysPar: SystemParameters = new SystemParameters();
    var cmbLanguage: HTMLSelectElement;
    var CompaniesUrl: string = "";
    var BranchsUrl: string = "";
    var LoginUrl: string = "";
    var OnLoggedUrl: string = "";
    var txtUserName: HTMLInputElement;
    var txtUserPassword: HTMLInputElement;
    var chkRemember: HTMLInputElement;
    var btnLogin: HTMLInputElement;
    var btnBack: HTMLInputElement;
    var txtYear: HTMLInputElement;
    var hLoggedName: HTMLHeadingElement;
    var spnLoggedYear: HTMLSpanElement;
    var cmbBranch: HTMLSelectElement;
    var cmbSubSys: HTMLSelectElement;
    var cmbCompany: HTMLSelectElement;
    var systemEnv: SystemEnvironment;

    export function InitalizeComponent() {
        
        txtUserName = document.getElementById("txtUserName") as HTMLInputElement;
        txtUserPassword = document.getElementById("txtUserPassword") as HTMLInputElement;
        chkRemember = document.getElementById("chkRemember") as HTMLInputElement;
        btnLogin = document.getElementById("btnLogin") as HTMLInputElement;
        btnBack = document.getElementById("btnBack") as HTMLInputElement;
        cmbLanguage = document.getElementById("cmbLanguage") as HTMLSelectElement;
        txtYear = document.getElementById("txtYear") as HTMLInputElement;
        hLoggedName = DocumentActions.GetElementById<HTMLHeadingElement>("hLoggedName");
        spnLoggedYear = DocumentActions.GetElementById<HTMLSpanElement>("spnLoggedYear");
        cmbCompany = document.getElementById("cmbCompany") as HTMLSelectElement;
        cmbBranch = document.getElementById("cmbBranch") as HTMLSelectElement;
        cmbSubSys = document.getElementById("cmbSubSys") as HTMLSelectElement;
         
        CompaniesUrl = $("#CompaniesUrl").val();
        LoginUrl = $("#LoginUrl").val();
        OnLoggedUrl = $("#OnLogged").val();
        btnBack.addEventListener("click", GoBack);
        btnLogin.addEventListener("click", Login);
        let loginData = localStorage.getItem("bse_sales_login_data");
        if (loginData != null) {
            let data = JSON.parse(loginData);
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
    function checkBrowser(): Boolean {
        //debugger;

        let userAgentString = navigator.userAgent;
        let chromeAgent = userAgentString.indexOf("Chrome") > -1;
        let IExplorerAgent = userAgentString.indexOf("MSIE") > -1 || userAgentString.indexOf("rv:") > -1;
        let firefoxAgent = userAgentString.indexOf("Firefox") > -1;
        let safariAgent = userAgentString.indexOf("Safari") > -1;
        let EdgeAgent = userAgentString.indexOf("Edge") > -1;
        if ((chromeAgent) && (safariAgent))
            safariAgent = false;
        let operaAgent = userAgentString.indexOf("OP") > -1;
        if ((chromeAgent) && (operaAgent))
            chromeAgent = false;
        if (safariAgent || IExplorerAgent || operaAgent || firefoxAgent || EdgeAgent) {
            // WorningMessage("الرجاء استكمال البيانات", "Please complete Data");
            //WorningMessage("يجب الدخول من متصفح جوجل كروم", "Please use Chrome browser");
            alert("يجب الدخول من متصفح جوجل كروم    Please use Chrome browser")
            return false;
           
            // MessageBox.Show(" ", "");
            //let mg = ClientSharedWork.Session.ScreenLanguage == "ar" ? "يجب الدخول من متصفح جوجل كروم" : "You must log in from Google Chrome";

        }
        else {
            return true;
            //InitalizeComponent();
        }

    }
    function GetSubSystem(user: string, sys: string) {
        //debugger
        Ajax.CallAsync({
            url: Url.Action("GetSubSystem", "Login"),
            data: { user: user, sys: sys },
            success: (d) => {
                //debugger;
                let result = d.result as Array<any>
                removeOptions(cmbSubSys);
                result.forEach((SubSys, index) => {
                    let text = SubSys.SUB_SYSTEM_CODE.toString() + "- " + ($("#cmbLanguage").val() == "en" ? SubSys.SUB_SYSTEM_DESCE : SubSys.SUB_SYSTEM_DESCA);
                    cmbSubSys.add(new Option(text, SubSys.SUB_SYSTEM_CODE.toString()));
                });
            }
        });
    }
    function Login() {
        let db: AjaxCaller = new AjaxCaller();
        let userName: string = txtUserName.value;
        let userPassword: string = txtUserPassword.value;
        let user: G_USERS = new G_USERS();
        let year = $("#txtYear").val();
        user.USER_CODE = userName;
        user.USER_PASSWORD = userPassword;
        txtUserName.style.borderColor = "";
        txtUserPassword.style.borderColor = "";
        ClientSharedWork.Session.CurrentYear = year;

        let lang: string = "ar";
        if (cmbLanguage.selectedIndex == 0)
            lang = "ar";
        else
            lang = "en";
        sessionStorage.setItem("temp_lang", lang);

        ClientSharedWork.Session.Language = lang;
        ClientSharedWork.Session.CurrentYear = txtYear.value;

        let systemEnv = new SystemEnvironment;
        systemEnv.ScreenLanguage = lang;
        systemEnv.CurrentYear = txtYear.value;
        systemEnv.UserCode = userName;
        document.cookie = "PMS_systemProperties=" + JSON.stringify(systemEnv).toString() + ";expires=Fri, 31 Dec 2030 23:59:59 GMT;path=/";
        if (checkBrowser()) {

            Ajax.CallAsync({
                url: Url.Action("LoginSubmit", "Login"),
                data: user,
                success: (d) => {
                    //debugger;
                    let result = d.result as Array<G_USERS>;
                    if (result.length > 0) {
                        $("#divLogin").css("display", "none");
                        $("#divCompanies").css("display", "block");
                        ClientSharedWork.Me = result[0];
                        ClientSharedWork.Session.UserCode = result[0].USER_CODE;

                        db.Url = CompaniesUrl;
                        let compData = db.Call<Array<SystemParameters>>();
                        removeOptions(cmbCompany);
                        compData.forEach((comp, index) => {
                            cmbCompany.add(new Option(comp.CompanyEnglishDescription.toString(), comp.CompanyCode.toString()));
                        });

                        let compCode: number = Number(cmbCompany.value);

                        Ajax.CallAsync({
                            url: Url.Action("GetBranchsUser", "Login"),
                            data: { compCode: compCode, userCode: ClientSharedWork.Session.UserCode },
                            success: (d) => {
                                let result = d.result as Array<GQ_GetUserBranch>
                                removeOptions(cmbBranch);
                                result.forEach((bra, index) => {
                                    let text = bra.BRA_CODE.toString() + "- " + ($("#cmbLanguage").val() == "en" ? bra.BRA_DESCE : bra.BRA_DESC);
                                    cmbBranch.add(new Option(text, bra.BRA_CODE.toString()));
                                });
                            }
                        });
                        //debugger;
                        var muser: string; 
                        if (result[0].LoginUrl == false || IsNullOrEmpty(result[0].ManagedBy)) {
                            muser = result[0].USER_CODE;
                           
                        } else {
                            muser = result[0].ManagedBy;
                        }

                        GetSubSystem(muser, "P");

                        if (chkRemember.checked == true) {
                            let loginData: {} = {
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
        (document.getElementById("btnOk") as HTMLInputElement).addEventListener("click", () => {
            let compCode = $("#cmbCompany").val();
            let braCode = $("#cmbBranch").val();
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
            success: (result) => {
                let obj = result.result;
                debugger
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
}

function removeOptions(selectbox) {
    for (var i = selectbox.options.length - 1; i >= 0; i--) {
        selectbox.remove(i);
    }
}