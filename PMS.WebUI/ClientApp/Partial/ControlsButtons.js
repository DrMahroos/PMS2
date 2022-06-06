var ControlsButtons;
(function (ControlsButtons) {
    function GetModelCountUrl() { return $("#GetModelCountUrl").val(); }
    ControlsButtons.GetModelCountUrl = GetModelCountUrl;
    function NextUrl() { return $("#NextUrl").val(); }
    ControlsButtons.NextUrl = NextUrl;
    function PreviousUrl() { return $("#PreviousUrl").val(); }
    ControlsButtons.PreviousUrl = PreviousUrl;
    function FirstUrl() { return $("#FirstUrl").val(); }
    ControlsButtons.FirstUrl = FirstUrl;
    function LastUrl() { return $("#LastUrl").val(); }
    ControlsButtons.LastUrl = LastUrl;
    function FindUrl() { return $("#FindUrl").val(); }
    ControlsButtons.FindUrl = FindUrl;
    function UndoUrl() { return $("#UndoUrl").val(); }
    ControlsButtons.UndoUrl = UndoUrl;
    function PrintUrl() { return $("#PrintUrl").val(); }
    ControlsButtons.PrintUrl = PrintUrl;
    function OnSearchSelectUrl() { return $("#OnSearchSelectUrl").val(); }
    ControlsButtons.OnSearchSelectUrl = OnSearchSelectUrl;
    function AddUrl() { return $("#AddUrl").val(); }
    ControlsButtons.AddUrl = AddUrl;
    function InsertUrl() { return $("#InsertUrl").val(); }
    ControlsButtons.InsertUrl = InsertUrl;
    function UpdateUrl() { return $("#UpdateUrl").val(); }
    ControlsButtons.UpdateUrl = UpdateUrl;
    function DeleteUrl() { return $("#DeleteUrl").val(); }
    ControlsButtons.DeleteUrl = DeleteUrl;
    function AddRowUrl() { return $("#AddRowUrl").val(); }
    ControlsButtons.AddRowUrl = AddRowUrl;
    function EditRowUrl() { return $("#EditRowUrl").val(); }
    ControlsButtons.EditRowUrl = EditRowUrl;
    function RemoveRowUrl() { return $("#RemoveRowUrl").val(); }
    ControlsButtons.RemoveRowUrl = RemoveRowUrl;
    SharedSession.CurrentPrivileges = GetPrivileges();
    function OnLoad() {
        //SharedSession.CurrentPrivileges = GetPrivileges();
        //SharedSession.CurrentEnvironment = GetSystemEnvironment();
        InitalizeComponent();
        if (ClientSharedWork.Session["DisableMenu"] == "True") {
            ClientSharedWork.SwitchModes(ScreenModes.DisableMenu);
        }
        else {
            ClientSharedWork.SwitchModes(ScreenModes.Query);
        }
        btnScreenHelp.onclick = ScreenHelp;
    }
    ControlsButtons.OnLoad = OnLoad;
    function InitalizeComponent() {
        ControlsButtons.AddButton = document.getElementById("AddButton");
        ControlsButtons.SaveButton = document.getElementById("SaveButton");
        ControlsButtons.EditButton = document.getElementById("EditButton");
        ControlsButtons.UndoButton = document.getElementById("UndoButton");
        ControlsButtons.ImageEditorButton = document.getElementById("ImageEditorButton");
        ControlsButtons.PrintButton = document.getElementById("PrintButton");
        ControlsButtons.DeleteButton = document.getElementById("DeleteButton");
        btnScreenHelp = document.getElementById("btnScreenHelp");
        ModuleEffects();
    }
    ControlsButtons.InitalizeComponent = InitalizeComponent;
    ControlsButtons.AddButton = null;
    function AddAction(action) {
        InitalizeComponent();
        $("#" + ControlsButtons.AddButton.id).off("click");
        if (SharedSession.CurrentPrivileges.AddNew == true) {
            $("#" + ControlsButtons.AddButton.id).on("click", function () {
                ClientSharedWork.PageIndex = 0;
                ClientSharedWork.SwitchModes(ScreenModes.Add);
                $(".addable").val("");
                $(".clearable").val("");
                $(".Dateable").val(DateFormat(new Date().toString()));
                action();
            });
        }
    }
    ControlsButtons.AddAction = AddAction;
    ControlsButtons.SaveButton = null;
    function SaveAction(action) {
        $("#" + ControlsButtons.SaveButton.id).off("click");
        $("#" + ControlsButtons.SaveButton.id).on("click", function () {
            var val = DocumentActions.ValidateRequired();
            if (val == true) {
                action();
            }
        });
    }
    ControlsButtons.SaveAction = SaveAction;
    ControlsButtons.EditButton = null;
    function EditAction(action) {
        if (SharedSession.CurrentPrivileges.EDIT == true) {
            $("#" + ControlsButtons.EditButton.id).on("click", function () {
                if ($("#ModelPreview").val() == "") {
                    WorningMessage("أختر بيانات ليتم التعديل", "Select Data To Edit", "تعديل", "Edit");
                }
                else {
                    ClientSharedWork.SwitchModes(ScreenModes.Edit);
                }
                action();
            });
        }
    }
    ControlsButtons.EditAction = EditAction;
    ControlsButtons.DeleteButton = null;
    function DeleteAction(action) {
        $("#" + ControlsButtons.DeleteButton.id).off("click");
        if (SharedSession.CurrentPrivileges.Remove == true) {
            $("#" + ControlsButtons.DeleteButton.id).on("click", function () {
                if ($("#ModelPreview").val() == "") {
                    WorningMessage("أختر بيانات ليتم الحذف", "Select Data To delete", "حذف", "delete");
                }
                else {
                    if (ClientSharedWork.Session.ScreenLanguage == "ar") {
                        MessageBox.Ask("هل أنت متأكد من حذف البيان", "حذف", function () {
                            action();
                        }, function () { });
                    }
                    else {
                        MessageBox.Ask("Are You Sure Delete This Item", "Delete", function () {
                            action();
                        }, function () { });
                    }
                }
            });
        }
    }
    ControlsButtons.DeleteAction = DeleteAction;
    ControlsButtons.UndoButton = null;
    function UndoAction(action) {
        InitalizeComponent();
        $("#" + ControlsButtons.UndoButton.id).off("click");
        var message = SharedSession.CurrentEnvironment.ScreenLanguage == "ar" ? "هل متأكد من التراجع" : "Are you sure ?";
        var title = SharedSession.CurrentEnvironment.ScreenLanguage == "ar" ? "تراجع" : "Undo";
        $("#" + ControlsButtons.UndoButton.id).on("click", function () {
            MessageBox.Ask(message, title, function () {
                if (ClientSharedWork.CurrentMode == ScreenModes.Edit)
                    ClientSharedWork.OnNavigate();
                else {
                    $(".addable").val("");
                    $(".editable").val("");
                }
                ClientSharedWork.SwitchModes(ScreenModes.Query);
                action();
            });
        });
    }
    ControlsButtons.UndoAction = UndoAction;
    ControlsButtons.ImageEditorButton = null;
    function ImageEditorAction(action) {
        $("#" + ControlsButtons.ImageEditorButton.id).on("click", function () {
            debugger;
            //let _ArchivePath: string = "D:/PMSImage";
            //let _CompCode: string = "1";
            //let _BranchCode: string = "1";
            //let _ModuleCode: string = "1";
            //let _Id: string = "1";
            //let _CountItems: number = 1;
            //let _Path: string = _ArchivePath + "/" + _CompCode + "/" + _BranchCode + "/" + _ModuleCode + "/" + _Id + "_" + _CountItems.toString() + ".jpg"
            //window.open("http://localhost:56817/Forms/ImageEditor.aspx", "_blank");
        });
    }
    ControlsButtons.ImageEditorAction = ImageEditorAction;
    ControlsButtons.PrintButton = null;
    function PrintAction(action) {
        $("#" + ControlsButtons.PrintButton.id).off("click");
        if (SharedSession.CurrentPrivileges.PrintOut == true) {
            $("#" + ControlsButtons.PrintButton.id).on("click", action);
        }
    }
    ControlsButtons.PrintAction = PrintAction;
    function ClearActions() {
        ClientSharedWork.ModelCount = 0;
        ClientSharedWork.PageIndex = 0;
        ClientSharedWork.OnNavigate = null;
        $("#" + ControlsButtons.AddButton.id).off("click");
        $("#" + ControlsButtons.SaveButton.id).off("click");
        $("#" + ControlsButtons.EditButton.id).off("click");
        $("#" + ControlsButtons.DeleteButton.id).off("click");
        $("#" + ControlsButtons.UndoButton.id).off("click");
        $("#" + ControlsButtons.ImageEditorButton.id).off("click");
        $("#" + ControlsButtons.PrintButton.id).off("click");
    }
    function ModuleEffects() {
        if (SharedSession.CurrentPrivileges == null) {
            return;
        }
        if (SharedSession.CurrentPrivileges.AddNew == false) {
            ControlsButtons.AddButton.disabled = true;
            ControlsButtons.AddButton.style.opacity = "0.8";
        }
        else
            ControlsButtons.AddButton.style.opacity = "1";
        if (SharedSession.CurrentPrivileges.EDIT == false) {
            ControlsButtons.EditButton.disabled = true;
            ControlsButtons.EditButton.style.opacity = "0.8";
        }
        else
            ControlsButtons.EditButton.style.opacity = "1";
        if (SharedSession.CurrentPrivileges.Remove == false) {
            ControlsButtons.DeleteButton.disabled = true;
            ControlsButtons.DeleteButton.style.opacity = "0.8";
        }
        else
            ControlsButtons.DeleteButton.style.opacity = "1";
        if (SharedSession.CurrentPrivileges.PrintOut == false) {
            ControlsButtons.PrintButton.disabled = true;
            ControlsButtons.PrintButton.style.opacity = "0.8";
        }
        else
            ControlsButtons.PrintButton.style.opacity = "1";
        if (SharedSession.CurrentPrivileges.ViewImages == false) {
            //debugger
            ControlsButtons.ImageEditorButton.style.display = "none";
        }
        //if (SharedSession.CurrentPrivileges.EditImages == false) {
        //    ImageEditorButton.disabled = true;
        //    ImageEditorButton.style.opacity = "0.8";
        //}
        //else
        //    ImageEditorButton.style.opacity = "1";
    }
    ControlsButtons.ModuleEffects = ModuleEffects;
    var btnScreenHelp = null;
    function ScreenHelp() {
        debugger;
        var ModuleCode = SharedSession.CurrentPrivileges.MODULE_CODE;
        Ajax.CallAsync({
            url: Url.Action("GetHelp", "Help"),
            data: { ModuleCode: ModuleCode },
            success: function (d) {
                var res = d.result;
                if (res != null) {
                    if (SharedSession.CurrentEnvironment.ScreenLanguage == "ar") {
                        $("#modalHelp").html("<div style=\"direction:rtl\" >" + res.HelpBody_Ar + "</div>");
                    }
                    else {
                        $("#modalHelp").html("<div style=\"direction:ltr\" >" + res.HelpBody_En + "</div>");
                    }
                }
            }
        });
    }
})(ControlsButtons || (ControlsButtons = {}));
//# sourceMappingURL=ControlsButtons.js.map