$(document).ready(function () {
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
    }
    catch (e) {
    }
});
var SysTool;
(function (SysTool) {
    function InitalizeComponent() {
    }
    SysTool.InitalizeComponent = InitalizeComponent;
})(SysTool || (SysTool = {}));
var SystemTools = /** @class */ (function () {
    function SystemTools() {
        this.orgCondition = "";
    }
    SystemTools.prototype.apiUrl = function (controller, action) {
        var apiUrl = $("#GetAPIUrl").val() + controller + "/" + action;
        //debugger
        return (apiUrl);
    };
    SystemTools.prototype.GetResourceByName = function (callbackfn) {
        var func = callbackfn.toString().split(".")[1].split(";")[0];
        var result = Ajax.Call({
            url: Url.Action("GetResourceByName", "ClientTools"),
            data: { key: func }
        });
        return result;
    };
    SystemTools.prototype.GetFavorites = function () {
        var _this = this;
        var data = {
            session: SharedSession.CurrentEnvironment
        };
        Ajax.CallAsync({
            url: Url.Action("GetFavorites", "ClientTools"),
            success: function (response) {
                var result = response.result;
                ClientSharedWork.UserFavorits = result;
                _this.SwitchFavoriteIcon();
                var div = DocumentActions.GetElementById("favourite_div"); // document.getElementById("favourite_div") as HTMLDivElement;
                div.innerHTML = "";
                for (var _i = 0, result_1 = result; _i < result_1.length; _i++) {
                    var fav = result_1[_i];
                    var li = DocumentActions.CreateElement("li");
                    var desc = "";
                    if (SharedSession.CurrentEnvironment.Language == "en")
                        desc = fav.MODULE_DESCE;
                    else
                        desc = fav.MODULE_DESCA;
                    li.innerHTML = "\n                <a href=\"#\" onclick=\"HomeComponent.OpenView('" + fav.MODULE_CODE + "','" + fav.MODULE_CODE + "');\">\n                    <strong>" + desc + "</strong>\n                </a>";
                    div.appendChild(li);
                }
            }
        });
    };
    SystemTools.prototype.SwitchUserFavorite = function () {
        var _this = this;
        var data = {
            session: SharedSession.CurrentEnvironment
        };
        $.ajax({
            url: Url.Action("SwitchUserFavorite", "ClientTools"),
            async: true,
            type: "POST",
            data: JSON.stringify(data),
            contentType: "application/json",
            dataType: "json",
            success: function (response) {
                _this.GetFavorites();
            }
        });
    };
    SystemTools.prototype.FindTree = function (moduleCode, _SearchControlName, Condition, ReturnLeaf) {
        if (ReturnLeaf === void 0) { ReturnLeaf = true; }
        var treeView = new TreeViwe();
        this.orgCondition = Condition;
        Ajax.CallAsync({
            url: Url.Action("FindTree", "ClientTools"),
            data: {
                moduleCode: moduleCode,
                Condition: Condition,
                controlName: _SearchControlName //$("#SearchControlName").val()
            },
            async: true,
            success: function (resp) {
                var response = resp.result;
                if (response == null) {
                    MessageBox.Show("Search not available, Please call your app administrator", "Search");
                    return;
                }
                var result = JSON.parse(response.DataResult);
                treeView.SearchTreeView(result, "treeViewElement", "selectedId", ReturnLeaf);
                var settings = response.Settings;
                try {
                    if (SharedSession.CurrentEnvironment.ScreenLanguage == "ar") {
                        document.getElementById("searchTitle").innerText = settings.SerachFormTitleA;
                    }
                    else if (SharedSession.CurrentEnvironment.ScreenLanguage == "en") {
                        document.getElementById("searchTitle").innerText = settings.SerachFormTitle;
                    }
                }
                catch (e) {
                    console.log('error in language... SystemTools');
                }
                $(".ui-igedit-input").keyup(function (e) {
                });
                $("#TreeModalForm").modal("show"); //.css("display", "");//
                $("#TreeModalForm").css("width", "100%");
                $("#TreeModalForm").css("height", "100%");
            }
        });
    };
    SystemTools.prototype.FindKey = function (moduleCode, _SearchControlName, Condition, OnSearchSelected) {
        this.orgCondition = Condition;
        //debugger
        Ajax.CallAsync({
            url: Url.Action("Find", "ClientTools"),
            data: {
                moduleCode: moduleCode,
                Condition: Condition,
                controlName: _SearchControlName //$("#SearchControlName").val()
            },
            async: true,
            success: function (resp) {
                var response = resp.result;
                if (response == null) {
                    MessageBox.Show("Search not available, Please call your app administrator", "Search");
                    return;
                }
                //debugger
                var columns = response.Columns;
                var result = JSON.parse(response.DataResult);
                var settings = response.Settings;
                var TableName = response.TableName;
                var Condition = response.Condition;
                ClientSharedWork.SearchDataGrid = new DataTable();
                ClientSharedWork.SearchDataGrid.Columns = columns;
                ClientSharedWork.SearchDataGrid.dataScr = result;
                ClientSharedWork.SearchDataGrid.ElementName = "SearchDataTable";
                ClientSharedWork.SearchDataGrid.PageSize = settings.PageSize < 50 ? 50 : settings.PageSize;
                ClientSharedWork.SearchDataGrid.PrimaryKey = settings.ReturnDataPropertyName; //"RowIndex";
                var boxWidth = settings.Width <= 100 ? "90%" : settings.Width.toString() + "px";
                var boxHeight = settings.Height <= 100 ? "80%" : settings.Height.toString() + "px";
                var boxLeft = settings.Left <= 50 ? "5%" : settings.Left.toString() + "px";
                var boxTop = settings.Top <= 50 ? "10%" : settings.Top.toString() + "px";
                $("#SearchBox").css("width", boxWidth);
                $("#SearchBox").css("height", boxHeight);
                $("#SearchBox").css("left", boxLeft);
                $("#SearchBox").css("top", boxTop);
                ClientSharedWork.SearchDataGrid.Bind();
                ClientSharedWork.SearchDataGrid.OnDoubleClick = function () {
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
                }
                catch (e) {
                    console.log('error in language...');
                }
                $(".ui-igedit-input").keyup(function (e) {
                });
                $("#SearchBox").modal("show");
                $("#SearchDataTable").css("width", "100%");
                $("#SearchDataTable").css("height", "100%");
            }
        });
    };
    SystemTools.prototype.SwitchFavoriteIcon = function () {
        //imgFavUrl
        if (SharedSession.CurrentPrivileges == null) {
            sessionStorage.setItem("imgFavUrl", "../images/favourit.gif");
            return;
        }
        var favs = ClientSharedWork.UserFavorits.filter(function (f) { return f.MODULE_CODE == SharedSession.CurrentPrivileges.MODULE_CODE; });
        var favImage = DocumentActions.GetElementById("favImage");
        if (favs.length > 0) { // This page is in favorite list
            favImage.src = "../images/favourit.gif";
            //$("#favImage").removeAttr("src")
            //$("#favImage").attr("src", "../images/favourit.gif")
        }
        else {
            favImage.src = "../images/favourit2.gif";
        }
    };
    SystemTools.prototype.GenerateFiltersKey = function (moduleCode, sh, columns, dataSource, onSuccess) {
        var _this = this;
        var SearchFilters = DocumentActions.GetElementById("SearchFilters");
        var sqlConditions = new Array();
        SearchFilters.innerHTML = "";
        var SearchFilterTypes = DocumentActions.GetElementById("SearchFilterTypes");
        SearchFilterTypes.innerHTML = "";
        for (var _i = 0, columns_1 = columns; _i < columns_1.length; _i++) {
            var column = columns_1[_i];
            if (column.hidden == true)
                continue;
            var txt = DocumentActions.CreateElement("input");
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
            txt.onkeyup = function (e) {
                var currentInput = e.currentTarget;
                var colIndex = currentInput.tabIndex;
                var columnKey = currentInput.id.replace("Filter_", "");
                if (currentInput.value != "" && currentInput.value != null)
                    sqlConditions[colIndex] = columnKey + $("#FType_" + columnKey).val().replace("{0}", currentInput.value);
                else
                    sqlConditions[colIndex] = "";
                var filter = "";
                var fltr = "";
                fltr = "";
                var cond = "";
                for (var _i = 0, sqlConditions_1 = sqlConditions; _i < sqlConditions_1.length; _i++) {
                    cond = sqlConditions_1[_i];
                    if (cond != "" && cond != undefined)
                        fltr += cond + " And ";
                }
                if (_this.orgCondition != "" && fltr != "") {
                    filter = fltr + _this.orgCondition;
                }
                else if (_this.orgCondition == "")
                    filter = fltr + "0 = 0";
                else
                    filter = _this.orgCondition;
                Ajax.CallAsync({
                    url: Url.Action("Refilter", "ClientTools"),
                    data: {
                        moduleCode: moduleCode,
                        Condition: filter,
                        controllerName: sh
                    },
                    success: function (d) {
                        onSuccess(d);
                    }
                });
            };
            var td = DocumentActions.CreateElement("td");
            td.appendChild(txt);
            SearchFilters.appendChild(td);
            var tdType = DocumentActions.CreateElement("td");
            tdType.appendChild(this.GenerateFilterTypes(column));
            SearchFilterTypes.appendChild(tdType);
        }
    };
    SystemTools.prototype.GenerateFilters = function (moduleCode, columns, dataSource, onSuccess) {
        var _this = this;
        var SearchFilters = DocumentActions.GetElementById("SearchFilters");
        var sqlConditions = new Array();
        SearchFilters.innerHTML = "";
        var SearchFilterTypes = DocumentActions.GetElementById("SearchFilterTypes");
        SearchFilterTypes.innerHTML = "";
        for (var _i = 0, columns_2 = columns; _i < columns_2.length; _i++) {
            var column = columns_2[_i];
            if (column.hidden == true)
                continue;
            var txt = DocumentActions.CreateElement("input");
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
            txt.onkeyup = function (e) {
                var currentInput = e.currentTarget;
                var colIndex = currentInput.tabIndex;
                var columnKey = currentInput.id.replace("Filter_", "");
                if (currentInput.value != "" && currentInput.value != null)
                    sqlConditions[colIndex] = columnKey + $("#FType_" + columnKey).val().replace("{0}", currentInput.value);
                else
                    sqlConditions[colIndex] = "";
                var filter = "";
                var fltr = "";
                fltr = "";
                var cond = "";
                for (var _i = 0, sqlConditions_2 = sqlConditions; _i < sqlConditions_2.length; _i++) {
                    cond = sqlConditions_2[_i];
                    if (cond != "" && cond != undefined)
                        fltr += cond + " And ";
                }
                if (_this.orgCondition != "" && fltr != "") {
                    filter = fltr + _this.orgCondition;
                }
                else if (_this.orgCondition == "")
                    filter = fltr + "0 = 0";
                else
                    filter = _this.orgCondition;
                Ajax.CallAsync({
                    url: Url.Action("Refilter", "ClientTools"),
                    data: {
                        moduleCode: moduleCode,
                        Condition: filter,
                        controllerName: $("#SearchControlName").val()
                    },
                    success: function (d) {
                        onSuccess(d);
                    }
                });
            };
            var td = DocumentActions.CreateElement("td");
            td.appendChild(txt);
            SearchFilters.appendChild(td);
            var tdType = DocumentActions.CreateElement("td");
            tdType.appendChild(this.GenerateFilterTypes(column));
            SearchFilterTypes.appendChild(tdType);
        }
    };
    SystemTools.prototype.GenerateFilterTypes = function (column) {
        var source = new Array();
        if (column.dataType == "number") {
            source.push({ Text: "Equal", Value: "= {0}" }, { Text: "Not Equal", Value: "<> {0}" }, { Text: "Larger Than", Value: "> {0}" }, { Text: "Larger Than Or Equal", Value: ">= {0}" }, { Text: "Less Than", Value: "<{0}" }, { Text: "Less Than Or Equal", Value: "< {0}" });
        }
        else {
            source.push({ Text: "Contains", Value: " Like '%{0}%'" }, { Text: "Equal", Value: "= '{0}'" }, { Text: "Starts With", Value: " Like '{0}%'" }, { Text: "Ends With", Value: " Like '%{0}'" });
        }
        var cmbo = DocumentActions.CreateElement("select");
        cmbo.className = "form-control";
        cmbo.id = "FType_" + column.key;
        DocumentActions.FillCombo(source, cmbo, "Value", "Text");
        return cmbo;
    };
    SystemTools.prototype.convertFilterToCondition = function (cond, filter) {
        if (cond.toLowerCase() == "contains")
            return " Like '%" + filter + "%'";
        else if (cond.toLowerCase() == "endsWith")
            return " Like '%" + filter + "'";
        if (cond.toLowerCase() == "startswith")
            return " Like '" + filter + "%'";
    };
    /////////////
    SystemTools.prototype.ImgPopup = function (CompCode, Branch, moduleCode, TrNo) {
        var opt = {
            url: Url.Action("GetPartialImg", "GeneralReports"),
            success: function (d) {
                var result = d;
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
    };
    return SystemTools;
}());
//# sourceMappingURL=SystemTools.js.map