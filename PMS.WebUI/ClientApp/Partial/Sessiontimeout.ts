$(document).ready(() => {
    Sessiontimeout.InitalizeComponent();
});
namespace Sessiontimeout { 
    var sys: SystemTools = new SystemTools();

    var CompCode: string;
    var _BraCode: string;
    var SelectSession: HTMLSelectElement;

     export function InitalizeComponent() {
        //debugger;
        let ModuleCode1 = SharedSession.CurrentPrivileges.MODULE_CODE;
        SharedSession.CurrentPrivileges = GetPrivileges();
        SharedSession.CurrentEnvironment = GetSystemEnvironment();
        //debugger
        let ModuleCode2 = SharedSession.CurrentPrivileges.MODULE_CODE;
       
        CompCode = SharedSession.CurrentEnvironment.CompCode;
        _BraCode = SharedSession.CurrentEnvironment.BranchCode;
        
        InitalizeControls();
         InitalizeEvents();
         let _CompCode = SharedSession.CurrentEnvironment.CompCode;
         let _BranchCode = SharedSession.CurrentEnvironment.BranchCode;

         let _DashBoardPeriodinSec = GetSessiontimeout(Number(CompCode), Number(_BranchCode));
          $('#idSession').val(_DashBoardPeriodinSec.toString());
         $('#SelectSession option[value=1]').prop('selected', 'selected').change();
         SelectSession = document.getElementById('SelectSession') as HTMLSelectElement;
         SelectSession.onchange = OutSessionTimer;

    }

    function InitalizeControls() {
         
    }

    function InitalizeEvents() {
        
    }

    function OutSessionTimer() {
        if (SelectSession.value == '2') {
             debugger
            window.open(Url.Action("Logout", "Home"), "_self");
        }
    }

 

 

 


 }