namespace MessageBox {
    var MessageBoxDialog: HTMLDivElement;
    var MessageBoxTitle: HTMLHeadingElement;
    var MessageBoxMessage: HTMLHeadingElement;
    var MessageBoxOk: HTMLButtonElement;
    var MessageBoxCancel: HTMLButtonElement;
    var Initalized: boolean = false;
     
 
   

   

    function InitalizeComponent() {
        MessageBoxDialog = document.getElementById("MessageBoxDialog") as HTMLDivElement;
        MessageBoxTitle = document.getElementById("MessageBoxTitle") as HTMLHeadingElement;
        MessageBoxMessage = document.getElementById("MessageBoxMessage") as HTMLHeadingElement;
        MessageBoxOk = document.getElementById("MessageBoxOk") as HTMLButtonElement;
        MessageBoxCancel = document.getElementById("MessageBoxCancel") as HTMLButtonElement;
        Initalized = true;
    }
    export enum MessageBoxStyles {
        Danger,
        Warning,
        Info
    }
    export function Show(Message: string, Title: string, OnOk?: () => void) {
        if (Initalized == false)
            InitalizeComponent();
        MessageBoxTitle.innerText = Title;
        MessageBoxMessage.innerText = Message;
        MessageBoxCancel.style.display = "none";
        $("#" + MessageBoxOk.id).off("click");
        $("#" + MessageBoxDialog.id).modal("show");
        $("#" + MessageBoxDialog.id).css("z-index", "999999999");
        $("#" + MessageBoxOk.id).click(() => {
            $("#" + MessageBoxDialog.id).modal("hide");
            if (OnOk != null)
                OnOk();
        });
    }
    export function Ask(Message: string, Title: string, OnOk?: () => void, OnCancel?: () => void) {
        if (Initalized == false)
            InitalizeComponent();
        MessageBoxTitle.innerText = Title;
        MessageBoxMessage.innerText = Message;
        MessageBoxCancel.style.display = "";
        $("#" + MessageBoxOk.id).off("click");
        $("#" + MessageBoxCancel.id).off("click");
        $("#" + MessageBoxDialog.id).modal("show");
        $("#" + MessageBoxOk.id).click(() => {
            $("#" + MessageBoxDialog.id).modal("hide");
            if (OnOk != null)
                OnOk();
        });
        $("#" + MessageBoxCancel.id).click(() => {
            $("#" + MessageBoxDialog.id).modal("hide");
            if (OnCancel != null)
                OnCancel();
        });
    }
}