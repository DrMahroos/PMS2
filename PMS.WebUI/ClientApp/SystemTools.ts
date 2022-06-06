$(document).ready(() => {
    try {
        switch (ClientSharedWork.Session.SubSystemCode) {
            case "DEF":
                $("#AppNameSpan").text("Definition");
                break;
            case "SLS":
                $("#AppNameSpan").text("Sales");
                break;
            case "ENG":
                $("#AppNameSpan").text("Engineer");
                break;
            case "RES":
                $("#AppNameSpan").text("Resource Management");
                break;
        }
    } catch (e) {
    }
});

namespace SysTool {
    export function InitalizeComponent() {

    }
}

class SystemTools {
    constructor() {
        this.orgCondition = "";
    }
    public orgCondition: string;
    public apiUrl(controller: string, action: string) {
        var apiUrl = $("#GetAPIUrl").val() + controller + "/" + action;
        //debugger
        return (apiUrl);
    }
    public GetResourceByName<T>(callbackfn: (value: T, index: number, array: T[]) => any): string {
        let func: string = callbackfn.toString().split(".")[1].split(";")[0];
        let result = Ajax.Call<string>({
            url: Url.Action("GetResourceByName", "ClientTools"),
            data: { key: func }
        });
        return result;
    }
    public GetFavorites() {
        var data = {
            session: SharedSession.CurrentEnvironment
        };

        Ajax.CallAsync({
            url: Url.Action("GetFavorites", "ClientTools"),
            success: (response) => {
                let result = response.result as Array<FavModules>;
                ClientSharedWork.UserFavorits = result;
                this.SwitchFavoriteIcon();
                let div = DocumentActions.GetElementById<HTMLUListElement>("favourite_div");// document.getElementById("favourite_div") as HTMLDivElement;
                div.innerHTML = "";
                for (var fav of result) {
                    let li: HTMLLIElement = DocumentActions.CreateElement<HTMLLIElement>("li");
                    let desc: string = "";
                    if (SharedSession.CurrentEnvironment.Language == "en")
                        desc = fav.MODULE_DESCE;
                    else
                        desc = fav.MODULE_DESCA;
                    li.innerHTML = `
                <a href="#" onclick="HomeComponent.OpenView('`+ fav.MODULE_CODE + `','` + fav.MODULE_CODE + `');">
                    <strong>`+ desc + `</strong>
                </a>`;
                    div.appendChild(li);
                }
            }
        });
    }
    public SwitchUserFavorite() {
        var data = {
            session: SharedSession.CurrentEnvironment
        };
        $.ajax({
            url: Url.Action("SwitchUserFavorite", "ClientTools"),//?name=" + key,// + "&user=" + SharedValues.Me.USER_CODE,
            async: true,
            type: "POST",
            data: JSON.stringify(data),
            contentType: "application/json",
            dataType: "json",
            success: (response) => {
                this.GetFavorites();
            }
        });

    }
    public FindTree(moduleCode: string, _SearchControlName: string, Condition: string, ReturnLeaf: boolean = true) {
        let treeView: TreeViwe = new TreeViwe();
        this.orgCondition = Condition;
        Ajax.CallAsync({
            url: Url.Action("FindTree", "ClientTools"),
            data: {
                moduleCode: moduleCode,
                Condition: Condition,
                controlName: _SearchControlName//$("#SearchControlName").val()
            },
            async: true,
            success: (resp) => {
                var response = resp.result;
                if (response == null) {
                    MessageBox.Show("Search not available, Please call your app administrator", "Search");
                    return;
                }
                let result = JSON.parse(response.DataResult);
                treeView.SearchTreeView(result, "treeViewElement", "selectedId", ReturnLeaf);
                let settings = response.Settings as G_SearchForm;
                try {
                    if (SharedSession.CurrentEnvironment.ScreenLanguage == "ar") {
                        document.getElementById("searchTitle").innerText = settings.SerachFormTitleA;
                    }
                    else if (SharedSession.CurrentEnvironment.ScreenLanguage == "en") {
                        document.getElementById("searchTitle").innerText = settings.SerachFormTitle;
                    }
                } catch (e) {
                    console.log('error in language... SystemTools');
                }
                $(".ui-igedit-input").keyup((e) => {

                });
                $("#TreeModalForm").modal("show");//.css("display", "");//
                $("#TreeModalForm").css("width", "100%");
                $("#TreeModalForm").css("height", "100%");
            }
        });
    }
    public FindKey(moduleCode: string, _SearchControlName: string, Condition: string, OnSearchSelected: () => void) {
        this.orgCondition = Condition;
        //debugger
        Ajax.CallAsync({
            url: Url.Action("Find", "ClientTools"),
            data: {
                moduleCode: moduleCode,
                Condition: Condition,
                controlName: _SearchControlName//$("#SearchControlName").val()
            },
            async: true,
            success: (resp) => {
                var response = resp.result;
                if (response == null) {
                    MessageBox.Show("Search not available, Please call your app administrator", "Search");
                    return;
                }
                //debugger
                let columns = response.Columns as Array<datatableColumn>;
                let result = JSON.parse(response.DataResult);
                let settings = response.Settings as G_SearchForm;
                let TableName = response.TableName as string;
                let Condition = response.Condition as string;
                ClientSharedWork.SearchDataGrid = new DataTable();
                ClientSharedWork.SearchDataGrid.Columns = columns;
                ClientSharedWork.SearchDataGrid.dataScr = result;
                ClientSharedWork.SearchDataGrid.ElementName = "SearchDataTable";
                ClientSharedWork.SearchDataGrid.PageSize = settings.PageSize < 50 ? 50 : settings.PageSize;
                ClientSharedWork.SearchDataGrid.PrimaryKey = settings.ReturnDataPropertyName; //"RowIndex";
                let boxWidth: string = settings.Width <= 100 ? "90%" : settings.Width.toString() + "px";
                let boxHeight: string = settings.Height <= 100 ? "80%" : settings.Height.toString() + "px";
                let boxLeft: string = settings.Left <= 50 ? "5%" : settings.Left.toString() + "px";
                let boxTop: string = settings.Top <= 50 ? "10%" : settings.Top.toString() + "px";
                $("#SearchBox").css("width", boxWidth);
                $("#SearchBox").css("height", boxHeight);
                $("#SearchBox").css("left", boxLeft);
                $("#SearchBox").css("top", boxTop);
                ClientSharedWork.SearchDataGrid.Bind();
                ClientSharedWork.SearchDataGrid.OnDoubleClick = () => {
                    console.log(ClientSharedWork.SearchDataGrid.SelectedKey);
                    $("#SearchBox").modal("hide");
                    OnSearchSelected();
                };

                try {
                    if (SharedSession.CurrentEnvironment.ScreenLanguage == "ar") {
                        document.getElementById("searchTitle").innerText = settings.SerachFormTitleA;

                    }
                    else if (SharedSession.CurrentEnvironment.ScreenLanguage == "en") {
                        document.getElementById("searchTitle").innerText = settings.SerachFormTitle;
                    }
                } catch (e) {
                    console.log('error in language...');
                }

                $(".ui-igedit-input").keyup((e) => {

                });

                $("#SearchBox").modal("show");
                $("#SearchDataTable").css("width", "100%");
                $("#SearchDataTable").css("height", "100%");
            }
        });
    }
    private SwitchFavoriteIcon() {
        //imgFavUrl
        if (SharedSession.CurrentPrivileges == null) {
            sessionStorage.setItem("imgFavUrl", "../images/favourit.gif");
            return;
        }
        let favs = ClientSharedWork.UserFavorits.filter(f => f.MODULE_CODE == SharedSession.CurrentPrivileges.MODULE_CODE);

        let favImage = DocumentActions.GetElementById<HTMLImageElement>("favImage");
        if (favs.length > 0) { // This page is in favorite list
            favImage.src = "../images/favourit.gif";
            //$("#favImage").removeAttr("src")
            //$("#favImage").attr("src", "../images/favourit.gif")
        }
        else {
            favImage.src = "../images/favourit2.gif";
        }
    }
    private GenerateFiltersKey(moduleCode: string, sh: string, columns: Array<datatableColumn>, dataSource: Array<any>, onSuccess: (dd) => void) {
        let SearchFilters = DocumentActions.GetElementById<HTMLTableRowElement>("SearchFilters");
        let sqlConditions: Array<string> = new Array<string>();
        SearchFilters.innerHTML = "";
        let SearchFilterTypes = DocumentActions.GetElementById<HTMLTableRowElement>("SearchFilterTypes");
        SearchFilterTypes.innerHTML = "";
        for (var column of columns) {
            if (column.hidden == true)
                continue;
            let txt: HTMLInputElement = DocumentActions.CreateElement<HTMLInputElement>("input");
            if (column.dataType == "number")
                txt.type = "number";
            else if (column.dataType == "date")
                txt.type = "date";
            else
                txt.type = "text";
            txt.placeholder = column.headerText;
            txt.className = "form-control";
            txt.tabIndex = columns.indexOf(column);
            txt.id = "Filter_" + column.key;
            sqlConditions.push("");
            txt.onkeyup = (e) => {
                let currentInput = (e.currentTarget as HTMLInputElement) as HTMLInputElement;
                let colIndex = currentInput.tabIndex;
                let columnKey: string = currentInput.id.replace("Filter_", "");
                if (currentInput.value != "" && currentInput.value != null)
                    sqlConditions[colIndex] = columnKey + $("#FType_" + columnKey).val().replace("{0}", currentInput.value);
                else
                    sqlConditions[colIndex] = "";

                let filter: string = "";
                let fltr: string = "";
                fltr = "";
                let cond: string = "";
                for (cond of sqlConditions) {
                    if (cond != "" && cond != undefined)
                        fltr += cond + " And ";
                }

                if (this.orgCondition != "" && fltr != "") {
                    filter = fltr + this.orgCondition
                }
                else
                    if (this.orgCondition == "")
                        filter = fltr + "0 = 0";
                    else
                        filter = this.orgCondition;

                Ajax.CallAsync({
                    url: Url.Action("Refilter", "ClientTools"),
                    data: {
                        moduleCode: moduleCode,
                        Condition: filter,
                        controllerName: sh
                    },
                    success: (d) => {
                        onSuccess(d);
                    }
                })
            };

            let td: HTMLTableCellElement = DocumentActions.CreateElement<HTMLTableCellElement>("td");
            td.appendChild(txt);
            SearchFilters.appendChild(td);
            let tdType: HTMLTableCellElement = DocumentActions.CreateElement<HTMLTableCellElement>("td");
            tdType.appendChild(this.GenerateFilterTypes(column));
            SearchFilterTypes.appendChild(tdType);
        }
    }
    private GenerateFilters(moduleCode: string, columns: Array<datatableColumn>, dataSource: Array<any>, onSuccess: (dd) => void) {
        let SearchFilters = DocumentActions.GetElementById<HTMLTableRowElement>("SearchFilters");
        let sqlConditions: Array<string> = new Array<string>();
        SearchFilters.innerHTML = "";
        let SearchFilterTypes = DocumentActions.GetElementById<HTMLTableRowElement>("SearchFilterTypes");
        SearchFilterTypes.innerHTML = "";
        for (var column of columns) {
            if (column.hidden == true)
                continue;
            let txt: HTMLInputElement = DocumentActions.CreateElement<HTMLInputElement>("input");
            if (column.dataType == "number")
                txt.type = "number";
            else if (column.dataType == "date")
                txt.type = "date";
            else
                txt.type = "text";
            txt.placeholder = column.headerText;
            txt.className = "form-control";
            txt.tabIndex = columns.indexOf(column);
            txt.id = "Filter_" + column.key;
            sqlConditions.push("");
            txt.onkeyup = (e) => {
                let currentInput = (e.currentTarget as HTMLInputElement) as HTMLInputElement;
                let colIndex = currentInput.tabIndex;
                let columnKey: string = currentInput.id.replace("Filter_", "");
                if (currentInput.value != "" && currentInput.value != null)
                    sqlConditions[colIndex] = columnKey + $("#FType_" + columnKey).val().replace("{0}", currentInput.value);
                else
                    sqlConditions[colIndex] = "";

                let filter: string = "";
                let fltr: string = "";
                fltr = "";
                let cond: string = "";
                for (cond of sqlConditions) {
                    if (cond != "" && cond != undefined)
                        fltr += cond + " And ";
                }

                if (this.orgCondition != "" && fltr != "") {
                    filter = fltr + this.orgCondition
                }
                else
                    if (this.orgCondition == "")
                        filter = fltr + "0 = 0";
                    else
                        filter = this.orgCondition;

                Ajax.CallAsync({
                    url: Url.Action("Refilter", "ClientTools"),
                    data: {
                        moduleCode: moduleCode,
                        Condition: filter,
                        controllerName: $("#SearchControlName").val()
                    },
                    success: (d) => {
                        onSuccess(d);
                    }
                })
            };


            let td: HTMLTableCellElement = DocumentActions.CreateElement<HTMLTableCellElement>("td");
            td.appendChild(txt);
            SearchFilters.appendChild(td);

            let tdType: HTMLTableCellElement = DocumentActions.CreateElement<HTMLTableCellElement>("td");
            tdType.appendChild(this.GenerateFilterTypes(column));
            SearchFilterTypes.appendChild(tdType);
        }
    }
    private GenerateFilterTypes(column: datatableColumn): HTMLSelectElement {
        let source: Array<SelectItem> = new Array<SelectItem>();
        if (column.dataType == "number") {
            source.push({ Text: "Equal", Value: "= {0}" },
                { Text: "Not Equal", Value: "<> {0}" },
                { Text: "Larger Than", Value: "> {0}" },
                { Text: "Larger Than Or Equal", Value: ">= {0}" },
                { Text: "Less Than", Value: "<{0}" },
                { Text: "Less Than Or Equal", Value: "< {0}" });
        }
        else {
            source.push(
                { Text: "Contains", Value: " Like '%{0}%'" },
                { Text: "Equal", Value: "= '{0}'" },
                { Text: "Starts With", Value: " Like '{0}%'" },
                { Text: "Ends With", Value: " Like '%{0}'" });
        }

        let cmbo: HTMLSelectElement = DocumentActions.CreateElement<HTMLSelectElement>("select");
        cmbo.className = "form-control";
        cmbo.id = "FType_" + column.key;
        DocumentActions.FillCombo(source, cmbo, "Value", "Text");
        return cmbo;
    }
    private convertFilterToCondition(cond: string, filter: string) {
        if (cond.toLowerCase() == "contains")
            return " Like '%" + filter + "%'";
        else if (cond.toLowerCase() == "endsWith")
            return " Like '%" + filter + "'";
        if (cond.toLowerCase() == "startswith")
            return " Like '" + filter + "%'";
    }

    /////////////
    public ImgPopup(CompCode: string, Branch: string, moduleCode: string, TrNo: string) {
        let opt: JQueryAjaxSettings = {
            url: Url.Action("GetPartialImg", "GeneralReports"),
            success: (d) => {
                let result = d as string;
                
      
                $("#btnImgBody").html(result);
                $("#exampleModal2").modal("show");
                $('#exampleModal2').modal({
                    refresh: true
                });

                $("#btnCompCode").val(CompCode);
                $("#btnBranch").val(Branch);
                $("#btnmoduleCode").val(moduleCode);
                $("#btnTrNo").val(TrNo);
                
                //systemEnv.ScreenLanguage = sessionStorage.getItem("temp_lang");
                //var val = $("#rpTitle").text();
                //$("#TitleSpan").html(val);
            }
        };
        Ajax.CallAsync(opt);


    }
}
