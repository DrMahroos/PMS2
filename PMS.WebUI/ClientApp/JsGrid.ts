class JsGrid {
    public ElementName: string;
    public Inserting: boolean;
    public Editing: boolean;
    public Paging: boolean;
    public Sorting: boolean;
    public Filtering: boolean;
    public ConfirmDeleteing: boolean = false;
    public PageSize: number = 50;
    public SwitchingLanguageEnabled: boolean = true;
    public Width: string = "100%";
    public Height: string = "150px";
    public DataSource: Array<any>;
    public Columns: Array<IJsGridColumn>;
    public Heading: boolean = true;
    public SelectedItem: any;
    public SelectedIndex: number;
    public OnDataLoaded: () => void;
    public OnRefreshed: () => void;
    public OnRowSelected: () => void;
    public OnRowDoubleClicked: () => void;
    public InsertionMode: JsGridInsertionMode = JsGridInsertionMode.Internal;
    public OnItemInserting: (args: JsGridInsertEventArgs) => void;
    public OnItemInserted: () => void;
    public OnItemUpdating: (args: JsGridUpdateEventArgs) => void;
    public OnItemEditing: (args: JsGridEditEventArgs) => void;
    public OnItemDeleting: (args: JsGridDeleteEventArgs) => void;
    public CancelInserting: boolean = false;
    public CancelItemDeleteing(): void {

    }
    private cancelItemDeleting(arg): void {
        arg.cancel = true;
    }
    public PrimaryKey: string;
    public SelectedKey: string;
    public Controller: any;
    public IsCanceled: boolean = false;
    public SwitchInsertingRow() {
        let value: boolean = <boolean>$('#' + this.ElementName).jsGrid('option', 'inserting');

        $('#' + this.ElementName).jsGrid('option', 'inserting', !value);
    }
    public SwitchEditing() {
        let value: boolean = <boolean>$('#' + this.ElementName).jsGrid('option', 'editing');
        $('#' + this.ElementName).jsGrid('option', 'editing', !value);
    }
    public GenerateColumns(objType: any) {
        this.Columns = new Array<IJsGridColumn>();
        let fields = Object.getOwnPropertyNames(objType);
        for (var field of fields) {
            let col: IJsGridColumn = {
                name: field,
                nameDesc: field,
                title: field,
                type: "label"
            };
            this.Columns.push(col);
        }
    }
    public SwitchColumnsLanguage(): void {
        //for (var col of this.Columns) {
        //    col.title = Language.GetValueByKey(col.name);
        //}
    }
    public Bind() {
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
            confirmDeleting: true,//this.ConfirmDeleteing,
            deleteConfirm: SharedSession.CurrentEnvironment.ScreenLanguage == "ar" ? "هل متأكد من الحذف" : "Are you sure ?",
            fields: this.Columns,
            //controller: {
            //    data : this.DataSource,
            //    loadData: function () {
            //        return data;
            //    }
            //},

            rowClick: (e) => {
                let row = e.event.currentTarget as HTMLTableRowElement;
                $(".jsgrid-row").removeClass("SelectedRowF");
                $(".jsgrid-alt-row").removeClass("SelectedRowF");
                row.className += " SelectedRowF";
                this.SelectedIndex = this.DataSource.indexOf(e.item);// e.itemIndex;
                this.SelectedItem = e.item;
                if (this.OnRowSelected != null)
                    this.OnRowSelected();
            },
            onDataLoaded: () => {
                if (this.OnDataLoaded != null)
                    this.OnDataLoaded();
            },
            onRefreshed: () => {
                if (this.OnRefreshed != null)
                    this.OnRefreshed();
            },
            rowDoubleClick: (e) => {
                this.SelectedIndex = this.DataSource.indexOf(e.item);// e.itemIndex;
                this.SelectedItem = e.item;
                this.SelectedKey = e.item[this.PrimaryKey];
                if (this.OnRowDoubleClicked != null)
                    this.OnRowDoubleClicked();

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
            onRefreshing: (arg) => {
            },
            onItemInserting: (arg) => {
                if (this.OnItemInserting != null) {
                    if (this.InsertionMode == JsGridInsertionMode.Binding)
                        arg.cancel = true;
                    let e: JsGridInsertEventArgs = new JsGridInsertEventArgs();
                    e.Item = arg.item;
                    this.OnItemInserting(e);
                }
            },
            onItemInserted: (arg) => {
                if (this.OnItemInserted != null)
                    this.OnItemInserted();
            },
            onItemUpdating: (arg) => {
                if (this.OnItemUpdating != null) {
                    let e: JsGridUpdateEventArgs = new JsGridUpdateEventArgs();
                    e.Item = arg.item;
                    e.ItemIndex = arg.itemIndex;
                    e.PreviousItem = arg.previousItem;
                    e.Row = arg.row;
                    this.OnItemUpdating(e);
                }
            },
            onItemEditing: (arg) => {
                if (this.OnItemEditing != null) {
                    let e: JsGridEditEventArgs = new JsGridEditEventArgs();
                    e.Item = arg.item;
                    e.ItemIndex = arg.itemIndex;
                    e.Row = arg.row;
                    this.OnItemEditing(e);
                }
            },
            onItemDeleting: (arg) => {
                if (this.OnItemDeleting != null) {
                    let e: JsGridDeleteEventArgs = new JsGridDeleteEventArgs();
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
                    this.OnItemDeleting(e);

                }
                //else
                //    arg.cancel = true;
            },
            onItemDeleted: (arg) => {

            }
        });
    }
    public InsertItem(sender: any, e: JsGridInsertEventArgs) {
        if (e.Canel == true)
            return;
        $("#" + this.ElementName).jsGrid("insertItem", JSON.stringify(sender)).done(() => {

        });
    }
    private _functions: Array<() => void>;
    public AddFunctions(...Functions: Array<() => void>) {
        this._functions = Functions;
    }
    public Refresh(): void {
        $("#" + this.ElementName).jsGrid("refresh");
    }
}
class JsGridInsertEventArgs {
    Item: any;
    Canel: boolean;
}
class JsGridDeleteEventArgs {
    public Row: HTMLTableRowElement;                 // deleting row jQuery element
    public Item: any;                // deleting item
    public ItemIndex: number;
    public Cancel: boolean = false;
}
class JsGridUpdateEventArgs {

    public Row: HTMLTableRowElement;
    public Item: any;
    public ItemIndex: number;
    public PreviousItem: any;
}
class JsGridEditEventArgs {
    public Row: HTMLTableRowElement;
    public Item: any;
    public ItemIndex: number;
    public PreviousItem: any;
}

enum JsGridInsertionMode {
    Internal,
    Binding
}



