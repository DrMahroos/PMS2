var JsGrid = /** @class */ (function () {
    function JsGrid() {
        this.ConfirmDeleteing = false;
        this.PageSize = 50;
        this.SwitchingLanguageEnabled = true;
        this.Width = "100%";
        this.Height = "150px";
        this.Heading = true;
        this.InsertionMode = JsGridInsertionMode.Internal;
        this.CancelInserting = false;
        this.IsCanceled = false;
    }
    JsGrid.prototype.CancelItemDeleteing = function () {
    };
    JsGrid.prototype.cancelItemDeleting = function (arg) {
        arg.cancel = true;
    };
    JsGrid.prototype.SwitchInsertingRow = function () {
        var value = $('#' + this.ElementName).jsGrid('option', 'inserting');
        $('#' + this.ElementName).jsGrid('option', 'inserting', !value);
    };
    JsGrid.prototype.SwitchEditing = function () {
        var value = $('#' + this.ElementName).jsGrid('option', 'editing');
        $('#' + this.ElementName).jsGrid('option', 'editing', !value);
    };
    JsGrid.prototype.GenerateColumns = function (objType) {
        this.Columns = new Array();
        var fields = Object.getOwnPropertyNames(objType);
        for (var _i = 0, fields_1 = fields; _i < fields_1.length; _i++) {
            var field = fields_1[_i];
            var col = {
                name: field,
                nameDesc: field,
                title: field,
                type: "label"
            };
            this.Columns.push(col);
        }
    };
    JsGrid.prototype.SwitchColumnsLanguage = function () {
        //for (var col of this.Columns) {
        //    col.title = Language.GetValueByKey(col.name);
        //}
    };
    JsGrid.prototype.Bind = function () {
        var _this = this;
        $(".jsgrid-grid-body").css("max-height", this.Height);
        $(".jsgrid-grid-body").css("height", this.Height);
        if (this.SwitchingLanguageEnabled == true) {
            this.SwitchColumnsLanguage();
        }
        $("#" + this.ElementName).jsGrid({
            width: this.Width,
            height: this.Height,
            heading: this.Heading,
            inserting: this.Inserting,
            editing: this.Editing,
            sorting: this.Sorting,
            paging: this.Paging,
            filtering: this.Filtering,
            autoLoad: true,
            pageSize: this.PageSize,
            data: this.DataSource,
            confirmDeleting: true,
            deleteConfirm: SharedSession.CurrentEnvironment.ScreenLanguage == "ar" ? "هل متأكد من الحذف" : "Are you sure ?",
            fields: this.Columns,
            //controller: {
            //    data : this.DataSource,
            //    loadData: function () {
            //        return data;
            //    }
            //},
            rowClick: function (e) {
                var row = e.event.currentTarget;
                $(".jsgrid-row").removeClass("SelectedRowF");
                $(".jsgrid-alt-row").removeClass("SelectedRowF");
                row.className += " SelectedRowF";
                _this.SelectedIndex = _this.DataSource.indexOf(e.item); // e.itemIndex;
                _this.SelectedItem = e.item;
                if (_this.OnRowSelected != null)
                    _this.OnRowSelected();
            },
            onDataLoaded: function () {
                if (_this.OnDataLoaded != null)
                    _this.OnDataLoaded();
            },
            onRefreshed: function () {
                if (_this.OnRefreshed != null)
                    _this.OnRefreshed();
            },
            rowDoubleClick: function (e) {
                _this.SelectedIndex = _this.DataSource.indexOf(e.item); // e.itemIndex;
                _this.SelectedItem = e.item;
                _this.SelectedKey = e.item[_this.PrimaryKey];
                if (_this.OnRowDoubleClicked != null)
                    _this.OnRowDoubleClicked();
                if ($("#Mod_Flag").val() != 1) {
                    $('#dir').removeClass('display_none');
                    $("#footer_1").animate({ "left": "-85%", });
                    $("#dir_11").fadeIn(3000);
                    $("#NewAdd_Falg").val(0);
                    $('#btnPrintTransaction').removeClass('display_none');
                    $('#btnUpdate').removeClass('display_none');
                    $('#btnBack').addClass('display_none');
                    $('#btnSave').addClass('display_none');
                    $('#Loading_Div').html('');
                }
            },
            onRefreshing: function (arg) {
            },
            onItemInserting: function (arg) {
                if (_this.OnItemInserting != null) {
                    if (_this.InsertionMode == JsGridInsertionMode.Binding)
                        arg.cancel = true;
                    var e = new JsGridInsertEventArgs();
                    e.Item = arg.item;
                    _this.OnItemInserting(e);
                }
            },
            onItemInserted: function (arg) {
                if (_this.OnItemInserted != null)
                    _this.OnItemInserted();
            },
            onItemUpdating: function (arg) {
                if (_this.OnItemUpdating != null) {
                    var e = new JsGridUpdateEventArgs();
                    e.Item = arg.item;
                    e.ItemIndex = arg.itemIndex;
                    e.PreviousItem = arg.previousItem;
                    e.Row = arg.row;
                    _this.OnItemUpdating(e);
                }
            },
            onItemEditing: function (arg) {
                if (_this.OnItemEditing != null) {
                    var e = new JsGridEditEventArgs();
                    e.Item = arg.item;
                    e.ItemIndex = arg.itemIndex;
                    e.Row = arg.row;
                    _this.OnItemEditing(e);
                }
            },
            onItemDeleting: function (arg) {
                if (_this.OnItemDeleting != null) {
                    var e = new JsGridDeleteEventArgs();
                    e.Item = arg.item;
                    e.ItemIndex = arg.itemIndex;
                    e.Row = arg.row;
                    //MessageBox.Ask("هل أنت متأكد", "حذف",
                    //    () => {
                    //        this.OnItemDeleting(e);
                    //    },
                    //    () => {
                    //        arg.Cancel = true;
                    //    });
                    _this.OnItemDeleting(e);
                }
                //else
                //    arg.cancel = true;
            },
            onItemDeleted: function (arg) {
            }
        });
    };
    JsGrid.prototype.InsertItem = function (sender, e) {
        if (e.Canel == true)
            return;
        $("#" + this.ElementName).jsGrid("insertItem", JSON.stringify(sender)).done(function () {
        });
    };
    JsGrid.prototype.AddFunctions = function () {
        var Functions = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            Functions[_i] = arguments[_i];
        }
        this._functions = Functions;
    };
    JsGrid.prototype.Refresh = function () {
        $("#" + this.ElementName).jsGrid("refresh");
    };
    return JsGrid;
}());
var JsGridInsertEventArgs = /** @class */ (function () {
    function JsGridInsertEventArgs() {
    }
    return JsGridInsertEventArgs;
}());
var JsGridDeleteEventArgs = /** @class */ (function () {
    function JsGridDeleteEventArgs() {
        this.Cancel = false;
    }
    return JsGridDeleteEventArgs;
}());
var JsGridUpdateEventArgs = /** @class */ (function () {
    function JsGridUpdateEventArgs() {
    }
    return JsGridUpdateEventArgs;
}());
var JsGridEditEventArgs = /** @class */ (function () {
    function JsGridEditEventArgs() {
    }
    return JsGridEditEventArgs;
}());
var JsGridInsertionMode;
(function (JsGridInsertionMode) {
    JsGridInsertionMode[JsGridInsertionMode["Internal"] = 0] = "Internal";
    JsGridInsertionMode[JsGridInsertionMode["Binding"] = 1] = "Binding";
})(JsGridInsertionMode || (JsGridInsertionMode = {}));
//# sourceMappingURL=JsGrid.js.map