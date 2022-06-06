$(document).ready(() => {
    CalendarDefinition.InitalizeComponent();
});
namespace CalendarDefinition {
    const ControllerName: string = "CalendarDefinition";
    const TableName: string = "P_D_Calender";
    const FieldKey: string = "CalenderID";
    var Master: P_D_Calender = new P_D_Calender();
    var Details: P_D_CalenderDays = new P_D_CalenderDays();
    var DetailsArray: Array<P_D_CalenderDays> = new Array<P_D_CalenderDays>();
    var sys: SystemTools = new SystemTools();
    var Area: G_BRANCH = new G_BRANCH();

    var txtAreaId: HTMLInputElement;
    var txtAreaName: HTMLInputElement;
    var txtCalendercode: HTMLInputElement;
    var txtDescA: HTMLInputElement;
    var txtDescE: HTMLInputElement;
    var txtDailyWorkHours: HTMLInputElement;
    var txtBreakStart: HTMLInputElement;
    var txtStartTime: HTMLInputElement;
    var txtBreakEnd: HTMLInputElement;
    var chkSaturday: HTMLInputElement;
    var chkSunday: HTMLInputElement;
    var chkMonday: HTMLInputElement;
    var chkTuseday: HTMLInputElement;
    var chkWednsday: HTMLInputElement;
    var chkThursday: HTMLInputElement;
    var chkFriday: HTMLInputElement;
    var txtEndTime: HTMLInputElement;
    var chkShift: HTMLInputElement;
    var _ScreenLanguage: string;
    var _CompCode: string;
    var _BranchCode: string;

    export function InitalizeComponent() {
        SharedSession.CurrentPrivileges = GetPrivileges();
        SharedSession.CurrentEnvironment = GetSystemEnvironment();
        _ScreenLanguage = SharedSession.CurrentEnvironment.ScreenLanguage;
        _CompCode = SharedSession.CurrentEnvironment.CompCode;
        _BranchCode = SharedSession.CurrentEnvironment.BranchCode;

        InitalizeControls();
        InitalizeEvents();
        SharedSession.CurrentEnvironment.ScreenLanguage = ClientSharedWork.Session.Language;
        NavigatorComponent.InitalizeComponent();
        ClientSharedWork.OnNavigate = Navigate;
        ControlsButtons.AddAction(Add);
        ControlsButtons.UndoAction(() => { });
        ControlsButtons.SaveAction(() => {
            if (ClientSharedWork.CurrentMode == ScreenModes.Add)
                SaveNewData();
            else if (ClientSharedWork.CurrentMode == ScreenModes.Edit)
                UpdateData();
        });
        ControlsButtons.EditAction(Edit);
        let permission_stutas: boolean = SharedSession.CurrentPrivileges.CUSTOM1;
        if (permission_stutas == true) {
            $("#chkStatus").addClass("addable");
            $("#chkStatus").addClass("editable");
            $("#chkStatus").removeAttr('disabled');
        }
        else {
            $("#chkStatus").attr('disabled', 'disabled');
            $("#chkStatus").removeClass("addable");
            $("#chkStatus").removeClass("editable");
        }
        $("#ImageEditorButton").on("click", () => {
            sys.ImgPopup(_CompCode, _BranchCode, Modules.Prepare, Master.CalenderID.toString());
        });
    }

    function InitalizeControls() {
        // Initialize TextBoxs 
        txtAreaId = DocumentActions.GetElementById<HTMLInputElement>("txtAreaId");
        txtAreaName = DocumentActions.GetElementById<HTMLInputElement>("txtAreaName");
        txtCalendercode = DocumentActions.GetElementById<HTMLInputElement>("txtCalendercode");
        txtDescA = DocumentActions.GetElementById<HTMLInputElement>("txtDescA");
        txtDescE = DocumentActions.GetElementById<HTMLInputElement>("txtDescE");
        txtDailyWorkHours = DocumentActions.GetElementById<HTMLInputElement>("txtDailyWorkHours");
        txtBreakStart = DocumentActions.GetElementById<HTMLInputElement>("txtBreakStart");
        txtStartTime = DocumentActions.GetElementById<HTMLInputElement>("txtStartTime");
        txtBreakEnd = DocumentActions.GetElementById<HTMLInputElement>("txtBreakEnd");
        chkSaturday = DocumentActions.GetElementById<HTMLInputElement>("chkSaturday");
        chkSunday = DocumentActions.GetElementById<HTMLInputElement>("chkSunday");
        chkMonday = DocumentActions.GetElementById<HTMLInputElement>("chkMonday");
        chkTuseday = DocumentActions.GetElementById<HTMLInputElement>("chkTuseday");
        chkWednsday = DocumentActions.GetElementById<HTMLInputElement>("chkWednsday");
        chkThursday = DocumentActions.GetElementById<HTMLInputElement>("chkThursday");
        chkFriday = DocumentActions.GetElementById<HTMLInputElement>("chkFriday");
        txtEndTime = DocumentActions.GetElementById<HTMLInputElement>("txtEndTime");
        chkShift = DocumentActions.GetElementById<HTMLInputElement>("chkShift");
    }

    function InitalizeEvents() {
        txtStartTime.onkeyup = AddTime;
        txtDailyWorkHours.onkeyup = AddTime;
        txtBreakEnd.onkeyup = AddTime;
        txtBreakStart.onkeyup = AddTime;
        chkShift.onchange = Check;
    }

    function Check() {
        if (chkShift.checked == true) {
            $('#txtBreakEnd').attr('disabled', 'disabled');
            $('#txtBreakStart').attr('disabled', 'disabled');
        }
        else {
            $('#txtBreakEnd').removeAttr('disabled');
            $('#txtBreakStart').removeAttr('disabled');
        }
    }
    function Navigate() {
        Ajax.CallAsync({
            url: Url.Action("GetByIndex", ControllerName),
            success: (d) => {
                Master = d.result as P_D_Calender;
                Display();
            }
        })
    }

    function Display() {
        
        DocumentActions.RenderFromModel(Master);
        txtStartTime.value = HourFormat(Master.StartTime);
        
        if (Master.BreakStart == null && Master.BreakEnd == null) {
            txtBreakStart.value = null;
            txtBreakEnd.value = null;
            //  chkShift.checked = false;
        }
        else {
            txtBreakStart.value = HourFormat(Master.BreakStart);
            txtBreakEnd.value = HourFormat(Master.BreakEnd);
            // chkShift.checked = true;
        }

        txtEndTime.value = HourFormat(Master.EndTime);
        txtDailyWorkHours.value = HourFormatDaily(Master.DailyWorkHours.toString());
        DisplayDetails();
    }
    function HourFormatDaily(HourDay) {
        
        var splitHour = HourDay.split(".");
        var hh = parseInt(splitHour[0]);
        var mn = (HourDay - hh) * 60;
        if (mn <= 9 && hh <= 9) {
            return "0" + hh + ":" + mn + "0";

        }
        else if (hh <= 9) {
            return "0" + hh + ":" + mn;
        }
        else if (mn <= 9) {
            return hh + ":" + mn + "0";
        }
        else {
            return hh + ":" + mn
        }


    }
    function HourFormat(dateForm): string {
        try {
            

            var time = dateForm;
            var hh = time.Hours;
            var mn = time.Minutes;
            var startDate = "";

            if (mn <= 9 && hh <= 9) {
                startDate = "0" + hh + ":" + mn + "0";

            }
            else if (hh <= 9) {
                startDate = "0" + hh + ":" + mn;
            }
            else if (mn <= 9) {
                startDate = hh + ":" + mn + "0";
            }
            else {
                startDate = hh + ":" + mn;
            }
            let form_date = startDate;
            return form_date;
        } catch (e) {
            return DateFormat(new Date().toString());
        }
    }
    function AddTime() {
        var time1 = txtStartTime.value;
        var time2 = txtDailyWorkHours.value;
        var timeDay = new Date("01/01/2007 " + time2).getHours();
        var timeDayM = new Date("01/01/2007 " + time2).getMinutes();
        var timeSt = new Date("01/01/2007 " + time1).getHours();
        var timeStM = new Date("01/01/2007 " + time1).getMinutes();

        var hour = 0;
        var minute = 0;

        if (chkShift.checked == true) {

            minute = timeDayM + timeStM;
            hour = timeDay + timeSt;

            if (minute > 59) {
                minute = minute - 59;
                hour = hour + 1;
            }
            if (minute <= 9) {
                txtEndTime.value = hour + ":" + minute + '0';
            }
            else if (hour <= 9) {
                txtEndTime.value = "0" + hour + ":" + minute;
            }
            else if (hour <= 9 && minute <= 9) {
                txtEndTime.value = "0" + hour + ":" + minute + '0';
            }
            else {
                txtEndTime.value = hour + ":" + minute;
            }
        }
        else {

            var time3 = txtBreakStart.value;
            var time4 = txtBreakEnd.value;

            var valuestart = txtBreakStart.value;
            var valuestop = txtBreakEnd.value;

            //create date format          
            var timeStart = new Date("01/01/2007 " + valuestart).getHours();
            var timeEnd = new Date("01/01/2007 " + valuestop).getHours();
            var timeStartM = new Date("01/01/2007 " + valuestart).getMinutes();
            var timeEndM = new Date("01/01/2007 " + valuestop).getMinutes();
            if (timeEndM < timeStartM) {
                timeEnd = timeEnd - 1;
                timeEndM = timeEndM + 60;
            }
            var MinDiff = timeEndM - timeStartM;

            var hourDiff = timeEnd - timeStart;
            txtEndTime.value = hourDiff + ":" + MinDiff;

            minute = timeDayM + timeStM;
            hour = timeDay + timeSt;

            if (minute > 59) {
                minute = minute - 60;
                hour = hour + 1;
            }
            hour = hour + hourDiff;
            minute = minute + MinDiff;
            if (minute > 59) {
                minute = minute - 60;
                hour = hour + 1;
            }

            if (minute == 0) {
                txtEndTime.value = hour + ":" + minute + '0';
            }
            else {
                txtEndTime.value = hour + ":" + minute;
            }
        }
    }
    function InputHourDaily() {
        
        var hours = txtDailyWorkHours.value;
        var splitHour = hours.split(':');
        var hh = parseInt(splitHour[0]);
        var mm = (parseInt(splitHour[1])) / 60;
        return Number(hh + mm);
    }
    function DisplayDetails() {
        Ajax.CallAsync({
            url: Url.Action("LoadDetails", ControllerName),
            data: { id: Master.CalenderID },
            success: (d) => {

                let _Result = d.result as Array<P_D_CalenderDays>;

                _Result[0].WorkingDay == true ? chkSunday.checked = true : chkSunday.checked = false;
                _Result[1].WorkingDay == true ? chkMonday.checked = true : chkMonday.checked = false;
                _Result[2].WorkingDay == true ? chkTuseday.checked = true : chkTuseday.checked = false;
                _Result[3].WorkingDay == true ? chkWednsday.checked = true : chkWednsday.checked = false;
                _Result[4].WorkingDay == true ? chkThursday.checked = true : chkThursday.checked = false;
                _Result[5].WorkingDay == true ? chkFriday.checked = true : chkFriday.checked = false;
                _Result[6].WorkingDay == true ? chkSaturday.checked = true : chkSaturday.checked = false;

            }
        })
    }

    function Add() {
        chkSunday.checked = false;
        chkMonday.checked = false;
        chkTuseday.checked = false;
        chkWednsday.checked = false;
        chkThursday.checked = false;
        chkFriday.checked = false;
        chkSaturday.checked = false;
        //  chkShift.checked = false;
    }

    function SaveNewData() {


        Master = new P_D_Calender();
        AddTime();
        Assign();
        AssignDetails();
        
        Master.DailyWorkHours = InputHourDaily();

        Ajax.CallAsync({
            url: Url.Action("Insert", ControllerName),
            data: Master,
            success: (d) => {
                let result = d.result as ResponseResult;
                if (result.ResponseState == true) {
                    ClientSharedWork.SwitchModes(ScreenModes.Query);
                    let _Cal = result.ResponseData as number;
                    Master = GetMasterById(_Cal);
                    let msg: string = ReturnMsg("تم الحفظ برقم ", "Data Saved With NO. ") + Master.CalenderID.toString();
                    MessageBox.Show(msg, "Insert", () => {
                        let _Index = GetIndexByUseId(Master.CalenderID, TableName, FieldKey);
                        NavigateToSearchResultKey(Number(_Index), Navigate)
                    });
                }
                else
                    MessageBox.Show(result.ResponseMessage, "Insert");
            }
        });
    }

    function UpdateData() {

        AddTime();
        Assign();
        AssignDetails();
        Master.CalenderID = Master.CalenderID;
        Master.DailyWorkHours = InputHourDaily();

        Ajax.CallAsync({
            url: Url.Action("Update", ControllerName),
            data: Master,
            success: (d) => {
                let result = d.result as ResponseResult;
                if (result.ResponseState == true) {
                    ClientSharedWork.SwitchModes(ScreenModes.Query);
                    let _cal = result.ResponseData as number;
                    Master = GetMasterById(_cal);
                    let msg: string = ReturnMsg("تم التعديل برقم ", "Data Updated With. ") + Master.CalenderID.toString();
                    MessageBox.Show(msg, "Update", () => {
                        let _Index = GetIndexByUseId(Master.CalenderID, TableName, FieldKey);
                        NavigateToSearchResultKey(Number(_Index), Navigate)
                    });
                }
                else
                    MessageBox.Show(result.ResponseMessage, "Update");
            }
        });
    }

    function Undo() {
    }

    function Edit() {
    }



    function Assign() {
        DocumentActions.AssignToModel<P_D_Calender>(Master);
    }

    function AssignValues() {
        
        var myArray: HTMLInputElement[] = new Array(chkSunday, chkMonday, chkTuseday, chkWednsday, chkThursday, chkFriday, chkSaturday);
        for (var i = 0; i < 7; i++) {
            Details = new P_D_CalenderDays;
            if (myArray[i].checked == true) {
                Details.WorkingDay = myArray[i].checked;

            }
            Details.DayOfWeek = i + 1;
            if (myArray[i].checked == true) {
                Details.WorkHours = InputHourDaily();
            }
            else {
                Details.WorkHours = 0;
            }
            DetailsArray.push(Details);
        }
    }

    function AssignDetails(): boolean {
        AssignValues();
        let result: boolean = true;
        let index = DetailsArray.indexOf(DetailsArray.filter(f => f.CalenderID == null)[0]);
        if (index >= 0)
            DetailsArray.splice(index, 1);
        for (var row of DetailsArray) {
            result = Ajax.Call<boolean>({
                url: Url.Action("AssignDetails", ControllerName),
                data: row
            });
            if (result == false) {
                break;
            }
        }
        return result;
    }

    function GetMasterById(catID: number): P_D_Calender {
        let _Master = Ajax.Call<P_D_Calender>({
            url: Url.Action("GetByID", ControllerName),
            data: { catID: catID },
        });
        return _Master;
    }

}