namespace NavigatorComponent {

    var NextButton: HTMLInputElement;
    var PreviousButton: HTMLInputElement;
    var LastButton: HTMLInputElement;
    var FirstButton: HTMLInputElement;
    var txtNav: HTMLInputElement;


    export function InitalizeComponent() {

        NextButton = document.getElementById("btnNext") as HTMLInputElement;
        PreviousButton = document.getElementById("btnPrev") as HTMLInputElement;
        FirstButton = document.getElementById("btnFirst") as HTMLInputElement;
        LastButton = document.getElementById("btnLast") as HTMLInputElement;
        txtNav = DocumentActions.GetElementById<HTMLInputElement>("txtNav");

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

    function SetOnNext(action?: () => void): void {

        $("#" + NextButton.id).off("click");
        $("#" + NextButton.id).click(() => {
            //action();
            if (ClientSharedWork.PageIndex < ClientSharedWork.ModelCount) {
                ClientSharedWork.PageIndex += 1;
                ClientSharedWork.OnNavigate();
                ClientSharedWork.Render();
            }
        });
    }
    function SetOnPrevious(action?: () => void) {

        $("#" + PreviousButton.id).off("click");

        $("#" + PreviousButton.id).click(() => {
            if (ClientSharedWork.PageIndex > 1) {
                ClientSharedWork.PageIndex -= 1;
                ClientSharedWork.OnNavigate();
                ClientSharedWork.Render();
            }
        });
    }

    function SetOnFirst(action?: () => void) {

        $("#" + FirstButton.id).off("click");
        //FirstButton.addEventListener("click", action);
        $("#" + FirstButton.id).click(() => {
            ClientSharedWork.PageIndex = 1;
            ClientSharedWork.OnNavigate();
            ClientSharedWork.Render();
        });
    }
    function SetOnLast(action?: () => void) {

        $("#" + LastButton.id).off("click");
        //LastButton.addEventListener("click", action);
        $("#" + LastButton.id).click(() => {
            ClientSharedWork.PageIndex = ClientSharedWork.ModelCount;
            ClientSharedWork.OnNavigate();
            ClientSharedWork.Render();
        });
    }

    //export function AssignActions() {
    //    LastButton.addEventListener("click", OnLast);
    //    FirstButton.addEventListener("click", OnFirst);
    //}
}