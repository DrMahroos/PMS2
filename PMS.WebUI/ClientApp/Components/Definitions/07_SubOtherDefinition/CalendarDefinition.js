$(document).ready(function () {
    CalendarDefinition.InitalizeComponent();
});
var CalendarDefinition;
(function (CalendarDefinition) {
    var ControllerName = "CalendarDefinition";
    var TableName = "P_D_Calender";
    var FieldKey = "CalenderID";
    var Master = new P_D_Calender();
    var Details = new P_D_CalenderDays();
    var DetailsArray = new Array();
    var sys = new SystemTools();
    var Area = new G_BRANCH();
    var txtAreaId;
    var txtAreaName;
    var txtCalendercode;
    var txtDescA;
    var txtDescE;
    var txtDailyWorkHours;
    var txtBreakStart;
    var txtStartTime;
    var txtBreakEnd;
    var chkSaturday;
    var chkSunday;
    var chkMonday;
    var chkTuseday;
    var chkWednsday;
    var chkThursday;
    var chkFriday;
    var txtEndTime;
    var chkShift;
    var _ScreenLanguage;
    var _CompCode;
    var _BranchCode;
    function InitalizeComponent() {
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
        ControlsButtons.UndoAction(function () { });
        ControlsButtons.SaveAction(function () {
            if (ClientSharedWork.CurrentMode == ScreenModes.Add)
                SaveNewData();
            else if (ClientSharedWork.CurrentMode == ScreenModes.Edit)
                UpdateData();
        });
        ControlsButtons.EditAction(Edit);
        var permission_stutas = SharedSession.CurrentPrivileges.CUSTOM1;
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
        $("#ImageEditorButton").on("click", function () {
            sys.ImgPopup(_CompCode, _BranchCode, Modules.Prepare, Master.CalenderID.toString());
        });
    }
    CalendarDefinition.InitalizeComponent = InitalizeComponent;
    function InitalizeControls() {
        // Initialize TextBoxs 
        txtAreaId = DocumentActions.GetElementById("txtAreaId");
        txtAreaName = DocumentActions.GetElementById("txtAreaName");
        txtCalendercode = DocumentActions.GetElementById("txtCalendercode");
        txtDescA = DocumentActions.GetElementById("txtDescA");
        txtDescE = DocumentActions.GetElementById("txtDescE");
        txtDailyWorkHours = DocumentActions.GetElementById("txtDailyWorkHours");
        txtBreakStart = DocumentActions.GetElementById("txtBreakStart");
        txtStartTime = DocumentActions.GetElementById("txtStartTime");
        txtBreakEnd = DocumentActions.GetElementById("txtBreakEnd");
        chkSaturday = DocumentActions.GetElementById("chkSaturday");
        chkSunday = DocumentActions.GetElementById("chkSunday");
        chkMonday = DocumentActions.GetElementById("chkMonday");
        chkTuseday = DocumentActions.GetElementById("chkTuseday");
        chkWednsday = DocumentActions.GetElementById("chkWednsday");
        chkThursday = DocumentActions.GetElementById("chkThursday");
        chkFriday = DocumentActions.GetElementById("chkFriday");
        txtEndTime = DocumentActions.GetElementById("txtEndTime");
        chkShift = DocumentActions.GetElementById("chkShift");
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
            success: function (d) {
                Master = d.result;
                Display();
            }
        });
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
            return hh + ":" + mn;
        }
    }
    function HourFormat(dateForm) {
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
            var form_date = startDate;
            return form_date;
        }
        catch (e) {
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
            success: function (d) {
                var _Result = d.result;
                _Result[0].WorkingDay == true ? chkSunday.checked = true : chkSunday.checked = false;
                _Result[1].WorkingDay == true ? chkMonday.checked = true : chkMonday.checked = false;
                _Result[2].WorkingDay == true ? chkTuseday.checked = true : chkTuseday.checked = false;
                _Result[3].WorkingDay == true ? chkWednsday.checked = true : chkWednsday.checked = false;
                _Result[4].WorkingDay == true ? chkThursday.checked = true : chkThursday.checked = false;
                _Result[5].WorkingDay == true ? chkFriday.checked = true : chkFriday.checked = false;
                _Result[6].WorkingDay == true ? chkSaturday.checked = true : chkSaturday.checked = false;
            }
        });
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
            success: function (d) {
                var result = d.result;
                if (result.ResponseState == true) {
                    ClientSharedWork.SwitchModes(ScreenModes.Query);
                    var _Cal = result.ResponseData;
                    Master = GetMasterById(_Cal);
                    var msg = ReturnMsg("تم الحفظ برقم ", "Data Saved With NO. ") + Master.CalenderID.toString();
                    MessageBox.Show(msg, "Insert", function () {
                        var _Index = GetIndexByUseId(Master.CalenderID, TableName, FieldKey);
                        NavigateToSearchResultKey(Number(_Index), Navigate);
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
            success: function (d) {
                var result = d.result;
                if (result.ResponseState == true) {
                    ClientSharedWork.SwitchModes(ScreenModes.Query);
                    var _cal = result.ResponseData;
                    Master = GetMasterById(_cal);
                    var msg = ReturnMsg("تم التعديل برقم ", "Data Updated With. ") + Master.CalenderID.toString();
                    MessageBox.Show(msg, "Update", function () {
                        var _Index = GetIndexByUseId(Master.CalenderID, TableName, FieldKey);
                        NavigateToSearchResultKey(Number(_Index), Navigate);
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
        DocumentActions.AssignToModel(Master);
    }
    function AssignValues() {
        var myArray = new Array(chkSunday, chkMonday, chkTuseday, chkWednsday, chkThursday, chkFriday, chkSaturday);
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
    function AssignDetails() {
        AssignValues();
        var result = true;
        var index = DetailsArray.indexOf(DetailsArray.filter(function (f) { return f.CalenderID == null; })[0]);
        if (index >= 0)
            DetailsArray.splice(index, 1);
        for (var _i = 0, DetailsArray_1 = DetailsArray; _i < DetailsArray_1.length; _i++) {
            var row = DetailsArray_1[_i];
            result = Ajax.Call({
                url: Url.Action("AssignDetails", ControllerName),
                data: row
            });
            if (result == false) {
                break;
            }
        }
        return result;
    }
    function GetMasterById(catID) {
        var _Master = Ajax.Call({
            url: Url.Action("GetByID", ControllerName),
            data: { catID: catID },
        });
        return _Master;
    }
})(CalendarDefinition || (CalendarDefinition = {}));
//# sourceMappingURL=CalendarDefinition.js.map