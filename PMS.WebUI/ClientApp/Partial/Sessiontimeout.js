$(document).ready(function () {
    Sessiontimeout.InitalizeComponent();
});
var Sessiontimeout;
(function (Sessiontimeout) {
    var sys = new SystemTools();
    var CompCode;
    var _BraCode;
    var SelectSession;
    function InitalizeComponent() {
        //debugger;
        var ModuleCode1 = SharedSession.CurrentPrivileges.MODULE_CODE;
        SharedSession.CurrentPrivileges = GetPrivileges();
        SharedSession.CurrentEnvironment = GetSystemEnvironment();
        //debugger
        var ModuleCode2 = SharedSession.CurrentPrivileges.MODULE_CODE;
        CompCode = SharedSession.CurrentEnvironment.CompCode;
        _BraCode = SharedSession.CurrentEnvironment.BranchCode;
        InitalizeControls();
        InitalizeEvents();
        var _CompCode = SharedSession.CurrentEnvironment.CompCode;
        var _BranchCode = SharedSession.CurrentEnvironment.BranchCode;
        var _DashBoardPeriodinSec = GetSessiontimeout(Number(CompCode), Number(_BranchCode));
        $('#idSession').val(_DashBoardPeriodinSec.toString());
        $('#SelectSession option[value=1]').prop('selected', 'selected').change();
        SelectSession = document.getElementById('SelectSession');
        SelectSession.onchange = OutSessionTimer;
    }
    Sessiontimeout.InitalizeComponent = InitalizeComponent;
    function InitalizeControls() {
    }
    function InitalizeEvents() {
    }
    function OutSessionTimer() {
        if (SelectSession.value == '2') {
            debugger;
            window.open(Url.Action("Logout", "Home"), "_self");
        }
    }
})(Sessiontimeout || (Sessiontimeout = {}));
//# sourceMappingURL=Sessiontimeout.js.map