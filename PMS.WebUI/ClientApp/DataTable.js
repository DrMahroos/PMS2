var DataTable = /** @class */ (function () {
    function DataTable() {
        this.dataScr = new Array();
        this.Columns = new Array();
        this.column_defs = new Array();
        this.EnableSorting = false;
        this.EnableFiltring = false;
        this.EnablePaging = false;
        this.PageSize = 50;
        this.Initalized = false;
    }
    DataTable.prototype.InitalizeEvents = function (e) {
        var row = $("#SearchDataTable tbody tr td").DataTable();
        var currentIndex = row.index;
        var index = 0;
        if (this.EnablePaging == true) {
            var currentPageIndex = $("#SearchDataTable").DataTable('option', 'currentPageIndex');
            var prevPagesCount = currentPageIndex - 1;
            index = (currentPageIndex * this.PageSize) + currentIndex;
        }
        else
            index = currentIndex;
        this.SelectedItem = this.dataScr[index];
        this.SelectedIndex = index;
        this.SelectedKey = row.id;
    };
    DataTable.prototype.Initalize = function () {
    };
    DataTable.prototype.Dispose = function () {
        $("#" + this.ElementName).off();
    };
    DataTable.prototype.Bind = function () {
        //debugger
        this.Initalize();
        var selectionCloumn = ClientSharedWork.SearchDataGrid.PrimaryKey;
        this.Columns = this.Columns.filter(function (row) { return row.hidden != true; });
        for (var index = 0; index < this.Columns.length; index++) {
            var ss = this.Columns[index].key;
            if (ss.indexOf('Date') > -1 || ss.indexOf('date') > -1) {
                for (var _i = 0, _a = this.dataScr; _i < _a.length; _i++) {
                    var itm = _a[_i];
                    itm[ss] = DateFormat(itm[ss]);
                }
            }
            var newColumn = {
                "data": this.Columns[index].key,
                "title": this.Columns[index].headerText,
                "visible": !this.Columns[index].hidden,
                "width": this.Columns[index].width,
                "dataType": this.Columns[index].dataType,
            };
            this.column_defs.push(newColumn);
        }
        this.dataScr = this.dataScr.filter(function (row) { return row.hidden != true; });
        //for (var i = 0; i < this.column_defs.length; i++) {
        //    let ss = this.column_defs[i].data;
        //    if (ss.indexOf('Date') > -1 || ss.indexOf('date') > -1) {
        //        for (var itm of this.dataScr) {
        //            itm[ss] = DateFormat(itm[ss]);
        //        }
        //    }
        //}
        var tableHeaders = "";
        this.column_defs.forEach(function (col) {
            //debugger
            var _width = "style = 'width: " + col.width + ";max-width: " + col.width + ";min-width: " + col.width + ";'";
            tableHeaders += "<th " + _width + ">" + col.title + "</th>";
        });
        $("#tableDiv").empty();
        $("#tableDiv").append('<table id="SearchDataTable" class="display" cellspacing="0" width="100%"><thead><tr>' + tableHeaders + '</tr></thead></table>');
        var table = $('#SearchDataTable').DataTable({
            "data": this.dataScr,
            "columns": this.column_defs,
            language: {
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
            }
            catch (e) {
            }
        });
    };
    DataTable.prototype.closeSearch = function () {
        $('#btnCloseSearch').click(function () {
            this.Initalize();
        });
    };
    return DataTable;
}());
//# sourceMappingURL=DataTable.js.map