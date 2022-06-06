class SharedPMS {
    public static GetProjectNo(Id: number): string {
        return "";
    }

    public static GetPhaseNo(dateForm: number): string {
        return "";
    }
}

function GetLocationById(id: number): P_D_Location {
    let _Result: P_D_Location = new P_D_Location();
    _Result = Ajax.Call({ url: Url.Action("GetLoctionById", "OfferDefinition"), data: { id: id } }) as P_D_Location;
    return _Result;
}

function GetCustomersById(id: number): P_D_SalesCustomer {
    let _Result: P_D_SalesCustomer = new P_D_SalesCustomer();
    _Result = Ajax.Call({ url: Url.Action("GetByID", "Customers"), data: { id: id } }) as P_D_SalesCustomer;
    return _Result;
}

function GetSalesEgineerById(id: number): P_D_SalesEgineer {
    let _Result: P_D_SalesEgineer = new P_D_SalesEgineer();
    _Result = Ajax.Call({ url: Url.Action("GetByID", "SalesEngineer"), data: { id: id } }) as P_D_SalesEgineer;
    return _Result;
}

function OpenReportsPopup(moduleCode: string) {
    let opt: JQueryAjaxSettings = {
        url: Url.Action(moduleCode, "GeneralReports"),
        success: (d) => {
            let result = d as string;
            $("#ReportPopupBody").html(result);
            $("#ReportsPopupDialog").modal("show");
            $('#ReportsPopupDialog').modal({
                refresh: true
            });

            var val = $("#rpTitle").text();
            $("#TitleSpanRep").html(val);
        }
    };
    Ajax.CallAsync(opt);

}

function GetCostCenterById(Code: string): G_COST_CENTER {
    let _Result: G_COST_CENTER = new G_COST_CENTER();
    _Result = Ajax.Call({ url: Url.Action("GetCostCenterByID", "ProjectSpecification"), data: { Code: Code } }) as G_COST_CENTER;
    return _Result;
}
