namespace ControlsButtons {

    export function GetModelCountUrl(): string { return $("#GetModelCountUrl").val(); }
    export function NextUrl(): string { return $("#NextUrl").val(); }
    export function PreviousUrl(): string { return $("#PreviousUrl").val(); }
    export function FirstUrl(): string { return $("#FirstUrl").val(); }
    export function LastUrl(): string { return $("#LastUrl").val(); }
    export function FindUrl(): string { return $("#FindUrl").val(); }
    export function UndoUrl(): string { return $("#UndoUrl").val(); }
    export function PrintUrl(): string { return $("#PrintUrl").val(); }

    export function OnSearchSelectUrl(): string { return $("#OnSearchSelectUrl").val(); }

    export function AddUrl(): string { return $("#AddUrl").val(); }
    export function InsertUrl(): string { return $("#InsertUrl").val(); }
    export function UpdateUrl(): string { return $("#UpdateUrl").val(); }
    export function DeleteUrl(): string { return $("#DeleteUrl").val(); }

    export function AddRowUrl(): string { return $("#AddRowUrl").val(); }
    export function EditRowUrl(): string { return $("#EditRowUrl").val(); }
    export function RemoveRowUrl(): string { return $("#RemoveRowUrl").val(); }

    SharedSession.CurrentPrivileges = GetPrivileges();

    export function OnLoad() {
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
    export function InitalizeComponent() {
        AddButton = document.getElementById("AddButton") as HTMLInputElement;
        SaveButton = document.getElementById("SaveButton") as HTMLInputElement;
        EditButton = document.getElementById("EditButton") as HTMLInputElement;
        UndoButton = document.getElementById("UndoButton") as HTMLInputElement;
        ImageEditorButton = document.getElementById("ImageEditorButton") as HTMLInputElement;
        PrintButton = document.getElementById("PrintButton") as HTMLInputElement;
        DeleteButton = document.getElementById("DeleteButton") as HTMLInputElement;
        btnScreenHelp = document.getElementById("btnScreenHelp") as HTMLInputElement;
        ModuleEffects();
    }



    export var AddButton: HTMLButtonElement = null;
    export function AddAction(action: () => void) {
        InitalizeComponent();
        $("#" + AddButton.id).off("click");
        if (SharedSession.CurrentPrivileges.AddNew == true) {
            $("#" + AddButton.id).on("click", () => {
                ClientSharedWork.PageIndex = 0;
                ClientSharedWork.SwitchModes(ScreenModes.Add);
                $(".addable").val("");
                $(".clearable").val("");
                $(".Dateable").val(DateFormat(new Date().toString()));
                action();

            });
        }
    }

    export var SaveButton: HTMLButtonElement = null;
    export function SaveAction(action: () => void) {
        $("#" + SaveButton.id).off("click")
        $("#" + SaveButton.id).on("click", () => {
            let val = DocumentActions.ValidateRequired();
            if (val == true) {
                action();
            }
        });
    }

    export var EditButton: HTMLButtonElement = null;
    export function EditAction(action: () => void) {
       
        if (SharedSession.CurrentPrivileges.EDIT == true) {
            $("#" + EditButton.id).on("click", () => {
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

    export var DeleteButton: HTMLButtonElement = null;
    export function DeleteAction(action: () => void) {
        $("#" + DeleteButton.id).off("click")
        if (SharedSession.CurrentPrivileges.Remove == true) {
            $("#" + DeleteButton.id).on("click", () => {
                if ($("#ModelPreview").val() == "") {
                    WorningMessage("أختر بيانات ليتم الحذف", "Select Data To delete", "حذف", "delete");
                } else {
                    if (ClientSharedWork.Session.ScreenLanguage == "ar") {
                        MessageBox.Ask("هل أنت متأكد من حذف البيان", "حذف", () => {
                            action();
                        },
                            () => { });
                    }
                    else {
                        MessageBox.Ask("Are You Sure Delete This Item", "Delete", () => {
                            action();
                        },
                            () => { });
                    }

                }
            });


        }
    }

    export var UndoButton: HTMLButtonElement = null;
    export function UndoAction(action: () => void) {
        InitalizeComponent();
        $("#" + UndoButton.id).off("click");
        let message = SharedSession.CurrentEnvironment.ScreenLanguage == "ar" ? "هل متأكد من التراجع" : "Are you sure ?";
        let title = SharedSession.CurrentEnvironment.ScreenLanguage == "ar" ? "تراجع" : "Undo";
        $("#" + UndoButton.id).on("click", () => {
            MessageBox.Ask(message, title, () => {

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

    export var ImageEditorButton: HTMLButtonElement = null;
    export function ImageEditorAction(action: () => void) {
        $("#" + ImageEditorButton.id).on("click", () => {
            debugger
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

    export var PrintButton: HTMLButtonElement = null;
    export function PrintAction(action: () => void) {
        $("#" + PrintButton.id).off("click");
        if (SharedSession.CurrentPrivileges.PrintOut == true) {
            $("#" + PrintButton.id).on("click", action);

        }
    }

    export var AssignLanguageAction: () => void;

    function ClearActions(): void {
        ClientSharedWork.ModelCount = 0;
        ClientSharedWork.PageIndex = 0;
        ClientSharedWork.OnNavigate = null;

        $("#" + AddButton.id).off("click");
        $("#" + SaveButton.id).off("click");
        $("#" + EditButton.id).off("click");
        $("#" + DeleteButton.id).off("click");
        $("#" + UndoButton.id).off("click");
        $("#" + ImageEditorButton.id).off("click");
        $("#" + PrintButton.id).off("click");
    }

    export function ModuleEffects() {
        if (SharedSession.CurrentPrivileges == null) {
            return;
        }
        if (SharedSession.CurrentPrivileges.AddNew == false) {
            AddButton.disabled = true;
            AddButton.style.opacity = "0.8";
        }
        else
            AddButton.style.opacity = "1";

        if (SharedSession.CurrentPrivileges.EDIT == false) {
            EditButton.disabled = true;
            EditButton.style.opacity = "0.8";
        }
        else
            EditButton.style.opacity = "1";

        if (SharedSession.CurrentPrivileges.Remove == false) {
            DeleteButton.disabled = true;
            DeleteButton.style.opacity = "0.8";
        }
        else
            DeleteButton.style.opacity = "1";

        if (SharedSession.CurrentPrivileges.PrintOut == false) {
            PrintButton.disabled = true;
            PrintButton.style.opacity = "0.8";
        }
        else
            PrintButton.style.opacity = "1";

        if (SharedSession.CurrentPrivileges.ViewImages == false) {
            //debugger
            ImageEditorButton.style.display = "none";
        }

        //if (SharedSession.CurrentPrivileges.EditImages == false) {
        //    ImageEditorButton.disabled = true;
        //    ImageEditorButton.style.opacity = "0.8";
        //}
        //else
        //    ImageEditorButton.style.opacity = "1";

    }

    var btnScreenHelp: HTMLButtonElement = null;

    function ScreenHelp() {
        debugger
        let ModuleCode = SharedSession.CurrentPrivileges.MODULE_CODE;
        Ajax.CallAsync(
            {
                url: Url.Action("GetHelp", "Help"),
                data: { ModuleCode: ModuleCode },
                success: (d) => {
                    let res = d.result as G_ModuleHelp;
                    if (res != null) {
                        if (SharedSession.CurrentEnvironment.ScreenLanguage == "ar") {
                            $("#modalHelp").html(`<div style="direction:rtl" >` + res.HelpBody_Ar + `</div>`);
                        }
                        else {
                            $("#modalHelp").html(`<div style="direction:ltr" >` + res.HelpBody_En + `</div>`);
                        }
                    }
                }
            }
        );
    }
}







