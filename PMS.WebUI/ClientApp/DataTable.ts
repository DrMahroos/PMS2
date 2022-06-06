class DataTable {
    public ElementName: string;
    public dataScr: Array<any> = new Array<any>();
    public Columns: Array<datatableColumn> = new Array<datatableColumn>();
    public column_defs: Array<datatableColumn> = new Array<datatableColumn>();
    public OnRowSlected: () => void;
    public OnDoubleClick: () => void;
    public SelectedIndex: number;
    public SelectedKey: any;
    public SelectedItem: any;
    public EnableSorting: boolean = false;
    public EnableFiltring: boolean = false;
    public EnablePaging: boolean = false;
    public PageSize: number = 50;
    public PrimaryKey: string;
    public OnFiltering: (evt, ui) => void;
    private Initalized: boolean = false;
    private InitalizeEvents(e: JQueryEventObject) {
        let row = $("#SearchDataTable tbody tr td").DataTable();
        let currentIndex: number = row.index;
        let index: number = 0;
        if (this.EnablePaging == true) {
            let currentPageIndex: number = $("#SearchDataTable").DataTable('option', 'currentPageIndex');
            let prevPagesCount: number = currentPageIndex - 1;
            index = (currentPageIndex * this.PageSize) + currentIndex;
        }
        else
            index = currentIndex;
        this.SelectedItem = this.dataScr[index];
        this.SelectedIndex = index;
        this.SelectedKey = row.id;
    }

    private Initalize() {

    }

    public Dispose() {
        $("#" + this.ElementName).off();
    }

    public Bind() {
        //debugger
        this.Initalize();
        var selectionCloumn: string = ClientSharedWork.SearchDataGrid.PrimaryKey;
        this.Columns = this.Columns.filter(row => row.hidden != true);
        for (var index = 0; index < this.Columns.length; index++) {
            
            let ss = this.Columns[index].key;
            if (ss.indexOf('Date') > -1 || ss.indexOf('date') > -1) {
                for (var itm of this.dataScr) {
                    itm[ss] = DateFormat(itm[ss]);
                }
            }


            var newColumn: datatableColumn = {
                "data": this.Columns[index].key,
                "title": this.Columns[index].headerText,
                "visible": !this.Columns[index].hidden,
                "width": this.Columns[index].width,
                "dataType":this.Columns[index].dataType,
            };
            this.column_defs.push(newColumn);
        }
        
        this.dataScr = this.dataScr.filter(row => row.hidden != true);

        //for (var i = 0; i < this.column_defs.length; i++) {
        //    let ss = this.column_defs[i].data;
        //    if (ss.indexOf('Date') > -1 || ss.indexOf('date') > -1) {
        //        for (var itm of this.dataScr) {
        //            itm[ss] = DateFormat(itm[ss]);
        //        }
        //    }
        //}
        
        var tableHeaders: string = "";
        this.column_defs.forEach(col => {
            //debugger
            var _width: string = "style = 'width: " + col.width + ";max-width: " + col.width + ";min-width: " + col.width + ";'";
            tableHeaders += "<th " + _width + ">" + col.title + "</th>";
        });

        $("#tableDiv").empty();
        $("#tableDiv").append('<table id="SearchDataTable" class="display" cellspacing="0" width="100%"><thead><tr>' + tableHeaders + '</tr></thead></table>');
        var table = $('#SearchDataTable').DataTable({
            "data": this.dataScr,
            "columns": this.column_defs,
            language:
            {
                "sProcessing": ReturnMsg("جارٍ التحميل...", "Loading..."),
                "sLengthMenu": ReturnMsg("أظهر _MENU_ مدخلات", " Show _MENU_ Records"),
                "sZeroRecords": ReturnMsg("لم يعثر على أية سجلات", "No records found"),
                "sInfo": ReturnMsg("إظهار _START_ إلى _END_ من أصل _TOTAL_ مدخل", "Show _START_ To _END_ Of Origin _TOTAL_ Records"),
                "sInfoEmpty": ReturnMsg("يعرض 0 إلى 0 من أصل 0 سجل", "Show 0 To 0 From Origin 0 Records"),
                "sInfoFiltered": "(منتقاة من مجموع _MAX_ مُدخل)",
                "sInfoPostFix": "",
                "sSearch": ReturnMsg("ابحث:", "Search :"),
                "sUrl": "",
                "oPaginate": {
                    "sFirst": ReturnMsg("الأول", "First"),
                    "sPrevious": ReturnMsg("السابق", "Previous"),
                    "sNext": ReturnMsg("التالي", "Next"),
                    "sLast": ReturnMsg("الأخير", "Last")
                }
            }
        });

        table.on('dblclick', 'tr', function () {
            //debugger;
            console.log(table.row(this).data());
            console.log("SelectedKey: " + ClientSharedWork.SearchDataGrid.PrimaryKey);
            console.log(ClientSharedWork.SearchDataGrid.SelectedKey);
            try {
                ClientSharedWork.SearchDataGrid.SelectedKey = table.row(this).data()[ClientSharedWork.SearchDataGrid.PrimaryKey];
                ClientSharedWork.SearchDataGrid.OnDoubleClick();
            } catch (e) {
            }
        });
    }

    public closeSearch() {
        $('#btnCloseSearch').click(function () {
            this.Initalize();
        });
    }
}


