var NavigatorComponent;
(function (NavigatorComponent) {
    var NextButton;
    var PreviousButton;
    var LastButton;
    var FirstButton;
    var txtNav;
    function InitalizeComponent() {
        NextButton = document.getElementById("btnNext");
        PreviousButton = document.getElementById("btnPrev");
        FirstButton = document.getElementById("btnFirst");
        LastButton = document.getElementById("btnLast");
        txtNav = DocumentActions.GetElementById("txtNav");
        SharedSession.CurrentPrivileges = GetPrivileges();
        //SharedSession.CurrentEnvironment = GetSystemEnvironment();
        if (SharedSession.CurrentPrivileges.VIEW == true) {
            SetOnFirst();
            SetOnLast();
            SetOnNext();
            SetOnPrevious();
        }
        else {
            NextButton.style.display = "none";
            PreviousButton.style.display = "none";
            FirstButton.style.display = "none";
            LastButton.style.display = "none";
            txtNav.style.display = "none";
        }
    }
    NavigatorComponent.InitalizeComponent = InitalizeComponent;
    function SetOnNext(action) {
        $("#" + NextButton.id).off("click");
        $("#" + NextButton.id).click(function () {
            //action();
            if (ClientSharedWork.PageIndex < ClientSharedWork.ModelCount) {
                ClientSharedWork.PageIndex += 1;
                ClientSharedWork.OnNavigate();
                ClientSharedWork.Render();
            }
        });
    }
    function SetOnPrevious(action) {
        $("#" + PreviousButton.id).off("click");
        $("#" + PreviousButton.id).click(function () {
            if (ClientSharedWork.PageIndex > 1) {
                ClientSharedWork.PageIndex -= 1;
                ClientSharedWork.OnNavigate();
                ClientSharedWork.Render();
            }
        });
    }
    function SetOnFirst(action) {
        $("#" + FirstButton.id).off("click");
        //FirstButton.addEventListener("click", action);
        $("#" + FirstButton.id).click(function () {
            ClientSharedWork.PageIndex = 1;
            ClientSharedWork.OnNavigate();
            ClientSharedWork.Render();
        });
    }
    function SetOnLast(action) {
        $("#" + LastButton.id).off("click");
        //LastButton.addEventListener("click", action);
        $("#" + LastButton.id).click(function () {
            ClientSharedWork.PageIndex = ClientSharedWork.ModelCount;
            ClientSharedWork.OnNavigate();
            ClientSharedWork.Render();
        });
    }
    //export function AssignActions() {
    //    LastButton.addEventListener("click", OnLast);
    //    FirstButton.addEventListener("click", OnFirst);
    //}
})(NavigatorComponent || (NavigatorComponent = {}));
//# sourceMappingURL=Navigator.js.map