var MessageBox;
(function (MessageBox) {
    var MessageBoxDialog;
    var MessageBoxTitle;
    var MessageBoxMessage;
    var MessageBoxOk;
    var MessageBoxCancel;
    var Initalized = false;
    function InitalizeComponent() {
        MessageBoxDialog = document.getElementById("MessageBoxDialog");
        MessageBoxTitle = document.getElementById("MessageBoxTitle");
        MessageBoxMessage = document.getElementById("MessageBoxMessage");
        MessageBoxOk = document.getElementById("MessageBoxOk");
        MessageBoxCancel = document.getElementById("MessageBoxCancel");
        Initalized = true;
    }
    var MessageBoxStyles;
    (function (MessageBoxStyles) {
        MessageBoxStyles[MessageBoxStyles["Danger"] = 0] = "Danger";
        MessageBoxStyles[MessageBoxStyles["Warning"] = 1] = "Warning";
        MessageBoxStyles[MessageBoxStyles["Info"] = 2] = "Info";
    })(MessageBoxStyles = MessageBox.MessageBoxStyles || (MessageBox.MessageBoxStyles = {}));
    function Show(Message, Title, OnOk) {
        if (Initalized == false)
            InitalizeComponent();
        MessageBoxTitle.innerText = Title;
        MessageBoxMessage.innerText = Message;
        MessageBoxCancel.style.display = "none";
        $("#" + MessageBoxOk.id).off("click");
        $("#" + MessageBoxDialog.id).modal("show");
        $("#" + MessageBoxDialog.id).css("z-index", "999999999");
        $("#" + MessageBoxOk.id).click(function () {
            $("#" + MessageBoxDialog.id).modal("hide");
            if (OnOk != null)
                OnOk();
        });
    }
    MessageBox.Show = Show;
    function Ask(Message, Title, OnOk, OnCancel) {
        if (Initalized == false)
            InitalizeComponent();
        MessageBoxTitle.innerText = Title;
        MessageBoxMessage.innerText = Message;
        MessageBoxCancel.style.display = "";
        $("#" + MessageBoxOk.id).off("click");
        $("#" + MessageBoxCancel.id).off("click");
        $("#" + MessageBoxDialog.id).modal("show");
        $("#" + MessageBoxOk.id).click(function () {
            $("#" + MessageBoxDialog.id).modal("hide");
            if (OnOk != null)
                OnOk();
        });
        $("#" + MessageBoxCancel.id).click(function () {
            $("#" + MessageBoxDialog.id).modal("hide");
            if (OnCancel != null)
                OnCancel();
        });
    }
    MessageBox.Ask = Ask;
})(MessageBox || (MessageBox = {}));
//# sourceMappingURL=MessageBox.js.map