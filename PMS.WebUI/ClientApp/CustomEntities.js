//Start class Sales Offers
var M_D_OfferDefDetails = /** @class */ (function () {
    function M_D_OfferDefDetails() {
    }
    return M_D_OfferDefDetails;
}());
var M_D_OfferDefDetailsView = /** @class */ (function () {
    function M_D_OfferDefDetailsView() {
    }
    return M_D_OfferDefDetailsView;
}());
//OfferSpecification
var M_D_OfferSpecificationView = /** @class */ (function () {
    function M_D_OfferSpecificationView() {
    }
    return M_D_OfferSpecificationView;
}());
var M_D_OfferSpecification = /** @class */ (function () {
    function M_D_OfferSpecification() {
    }
    return M_D_OfferSpecification;
}());
// Service Order
var M_D_SubContract = /** @class */ (function () {
    function M_D_SubContract() {
        this.sessionRecord = new SessionRecord();
    }
    return M_D_SubContract;
}());
var M_D_ServiceOrder = /** @class */ (function () {
    function M_D_ServiceOrder() {
        this.sessionRecord = new SessionRecord();
    }
    return M_D_ServiceOrder;
}());
var M_D_ProductionEntry = /** @class */ (function () {
    function M_D_ProductionEntry() {
        this.sessionRecord = new SessionRecord();
    }
    return M_D_ProductionEntry;
}());
//End class Sales Offers
//Start class engproject
var M_D_EngDefDetails = /** @class */ (function () {
    function M_D_EngDefDetails() {
    }
    return M_D_EngDefDetails;
}());
var M_D_EngProjectPhaseDetails = /** @class */ (function () {
    function M_D_EngProjectPhaseDetails() {
    }
    return M_D_EngProjectPhaseDetails;
}());
var M_D_EngDefDetailsView = /** @class */ (function () {
    function M_D_EngDefDetailsView() {
    }
    return M_D_EngDefDetailsView;
}());
var M_D_IssueProduction = /** @class */ (function () {
    function M_D_IssueProduction() {
        this.sessionRecord = new SessionRecord();
        this.P_TR_SalesProduction = new P_TR_SalesProduction();
    }
    return M_D_IssueProduction;
}());
//Start class engproject
var M_D_EngSpcDetails = /** @class */ (function () {
    function M_D_EngSpcDetails() {
    }
    return M_D_EngSpcDetails;
}());
var M_D_EngProjectPhase = /** @class */ (function () {
    function M_D_EngProjectPhase() {
        this.sessionRecord = new SessionRecord();
    }
    return M_D_EngProjectPhase;
}());
var M_D_EngSpcDetailsView = /** @class */ (function () {
    function M_D_EngSpcDetailsView() {
    }
    return M_D_EngSpcDetailsView;
}());
var M_D_SalesCustomer = /** @class */ (function () {
    function M_D_SalesCustomer() {
        this.sessionRecord = new SessionRecord();
        this.P_D_SalesCustomer = new P_D_SalesCustomer();
    }
    return M_D_SalesCustomer;
}());
var M_D_CustomerBilling = /** @class */ (function () {
    function M_D_CustomerBilling() {
        this.sessionRecord = new SessionRecord();
        this.P_TR_SalesInvoice = new P_TR_SalesInvoice();
    }
    return M_D_CustomerBilling;
}());
var M_D_CustomerBillingMasterDetail = /** @class */ (function () {
    function M_D_CustomerBillingMasterDetail() {
        this.PQ_GetSalesInvoice = new PQ_GetSalesInvoice();
    }
    return M_D_CustomerBillingMasterDetail;
}());
var M_D_CustomerDbCr = /** @class */ (function () {
    function M_D_CustomerDbCr() {
        this.sessionRecord = new SessionRecord();
        this.P_TR_SalesDbCr = new P_TR_SalesDbCr();
    }
    return M_D_CustomerDbCr;
}());
var M_D_LaborRequest = /** @class */ (function () {
    function M_D_LaborRequest() {
    }
    return M_D_LaborRequest;
}());
var M_D_ActivityPrice = /** @class */ (function () {
    function M_D_ActivityPrice() {
        this.sessionRecord = new SessionRecord();
        this.P_Tr_SalesActivtyPrice = new P_Tr_SalesActivtyPrice();
    }
    return M_D_ActivityPrice;
}());
var M_D_ItemPlan = /** @class */ (function () {
    function M_D_ItemPlan() {
        this.P_D_SalesItems = new P_D_SalesItems();
    }
    return M_D_ItemPlan;
}());
var M_D_Period = /** @class */ (function () {
    function M_D_Period() {
        this.P_G_Period = new P_G_Period();
    }
    return M_D_Period;
}());
var M_D_LaborAssign = /** @class */ (function () {
    function M_D_LaborAssign() {
        this.sessionRecord = new SessionRecord();
        this.P_Tr_ResRequestLabour = new P_Tr_ResRequestLabour();
    }
    return M_D_LaborAssign;
}());
var M_D_EquipAssign = /** @class */ (function () {
    function M_D_EquipAssign() {
        this.P_TR_ResRequestEquipment = new P_TR_ResRequestEquipment();
    }
    return M_D_EquipAssign;
}());
var M_D_ReqMaterial = /** @class */ (function () {
    function M_D_ReqMaterial() {
        this.P_TR_ResRequestMaterial = new P_TR_ResRequestMaterial();
    }
    return M_D_ReqMaterial;
}());
var M_D_EngVariation = /** @class */ (function () {
    function M_D_EngVariation() {
        this.P_TR_EngVariation = new P_TR_EngVariation();
        this.sessionRecord = new SessionRecord();
    }
    return M_D_EngVariation;
}());
//# sourceMappingURL=CustomEntities.js.map