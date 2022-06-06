//Start class Sales Offers
class M_D_OfferDefDetails {
    public P_TR_SalesOffer: P_TR_SalesOffer;
    public P_Tr_SalesOfferStage: Array<P_Tr_SalesOfferStage>;
    public P_TR_SalesOfferResponsibility: Array<P_TR_SalesOfferResponsibility>;
    public P_Tr_SalesOfferPayment: Array<P_Tr_SalesOfferPayment>;
    public P_Tr_SalesOfferBilling: Array<P_Tr_SalesOfferBilling>;
}
class M_D_OfferDefDetailsView {
    public PQ_GetSlsOfferStage: Array<PQ_GetSlsOfferStage>;
    public PQ_GetSlsOfferResponsibility: Array<PQ_GetSlsOfferResponsibility>;
    public PQ_GetSlsOfferResponsibility2: Array<PQ_GetSlsOfferResponsibility>;
    public PQ_GetSlsOfferPayment: Array<PQ_GetSlsOfferPayment>;
}
//OfferSpecification
class M_D_OfferSpecificationView {
    public PQ_GetSalesOffer: PQ_GetSalesOffer;
    public PQ_GetSlsOfferStageItem: Array<PQ_GetSlsOfferStageItem>;
    public PQ_GetSlsOfferActivity: Array<PQ_GetSlsOfferActivity>;
}
class M_D_OfferSpecification {
    public P_TR_SalesOffer: P_TR_SalesOffer;
    public P_Tr_SalesOfferStageItem: Array<P_Tr_SalesOfferStageItem>;
    public P_Tr_SalesOfferStageItemActivity: Array<P_Tr_SalesOfferStageItemActivity>;
}

// Service Order
class M_D_SubContract {
    public sessionRecord: SessionRecord = new SessionRecord();
    public P_TR_SubContract: P_TR_SubContract;
    public P_TR_SubContractActivity: Array<P_TR_SubContractActivity>;
}
class M_D_ServiceOrder {
    public sessionRecord: SessionRecord = new SessionRecord();
    public P_TR_SubServiceOrder: P_TR_SubServiceOrder;
    public P_TR_SubServiceOrderActivity: Array<P_TR_SubServiceOrderActivity>;
}
class M_D_ProductionEntry {
    public sessionRecord: SessionRecord = new SessionRecord();
    public P_TR_SubProduction: P_TR_SubProduction;
    public P_TR_SubProductionActivity: Array<P_TR_SubProductionActivity>;
}
//End class Sales Offers

//Start class engproject
class M_D_EngDefDetails {
    public P_TR_EngProject: P_TR_EngProject;
    public P_TR_EngProjectPhase: Array<P_TR_EngProjectPhase>;
    public P_TR_EngProjectItem: Array<P_TR_EngProjectItem>;
    public P_TR_EngProjectActivity: Array<P_TR_EngProjectActivity>;
}
class M_D_EngProjectPhaseDetails {
    public P_TR_EngProject: P_TR_EngProject;
    public P_TR_EngProjectPhase: Array<P_TR_EngProjectPhase>;
    public P_TR_EngProjectItem: Array<P_TR_EngProjectItem>;
    public P_TR_EngProjectActivity: Array<P_TR_EngProjectActivity>;
}
class M_D_EngDefDetailsView {
    public PQ_GetEngProject: Array<PQ_GetEngProject>;
    public PQ_GetEngProjectPhase: Array<PQ_GetEngProjectPhase>;
    public PQ_GetEngProjectItem: Array<PQ_GetEngProjectItem>;
}

class M_D_IssueProduction {
    public sessionRecord: SessionRecord = new SessionRecord();
    public P_TR_SalesProduction: P_TR_SalesProduction = new P_TR_SalesProduction();
    public P_TR_SalesProductionDetail: Array<P_TR_SalesProductionDetail>;
}

//Start class engproject
class M_D_EngSpcDetails {
    public P_TR_EngProjectPhase: P_TR_EngProjectPhase;
    public P_TR_EngProjectItem: Array<P_TR_EngProjectItem>;
    public P_TR_EngProjectActivity: Array<P_TR_EngProjectActivity>;
}
class M_D_EngProjectPhase {
    public sessionRecord: SessionRecord = new SessionRecord();
    public P_TR_EngProjectPhase: P_TR_EngProjectPhase;
}
class M_D_EngSpcDetailsView {
    public PQ_GetEngProjectPhase: PQ_GetEngProjectPhase;
    public PQ_GetEngProjectItem: Array<PQ_GetEngProjectItem>;
    public PQ_GetEngProjectActivity: Array<PQ_GetEngProjectActivity>;
}
class M_D_SalesCustomer {
    public sessionRecord: SessionRecord = new SessionRecord();
    public P_D_SalesCustomer: P_D_SalesCustomer = new P_D_SalesCustomer();
    public P_D_SalesCustomerDoc: Array<P_D_SalesCustomerDoc>;
}

class M_D_CustomerBilling {
    public sessionRecord: SessionRecord = new SessionRecord();
    public P_TR_SalesInvoice: P_TR_SalesInvoice = new P_TR_SalesInvoice();
    public P_TR_SalesInvoiceDetail: Array<P_TR_SalesInvoiceDetail>;
}
class  M_D_CustomerBillingMasterDetail {
    public PQ_GetSalesInvoice: PQ_GetSalesInvoice = new PQ_GetSalesInvoice();
    public PQ_GetSalesInvoiceDetail: Array<PQ_GetSalesInvoiceDetail>;
}
class M_D_CustomerDbCr {
    public sessionRecord: SessionRecord = new SessionRecord();
    public P_TR_SalesDbCr: P_TR_SalesDbCr = new P_TR_SalesDbCr();
    public P_TR_SalesDbCrDetail: Array<P_TR_SalesDbCrDetail>;
}


class M_D_LaborRequest {

}

class M_D_ActivityPrice {
    public sessionRecord: SessionRecord = new SessionRecord();
    public P_Tr_SalesActivtyPrice: P_Tr_SalesActivtyPrice = new P_Tr_SalesActivtyPrice();
    public P_Tr_SalesActivtyPriceDetail: Array<P_Tr_SalesActivtyPriceDetail>;
}

class M_D_ItemPlan {
    public P_D_SalesItems: P_D_SalesItems = new P_D_SalesItems();
    public P_D_SalesItemsActivity: Array<P_D_SalesItemsActivity>;
}

class M_D_Period{
    public P_G_Period: P_G_Period = new P_G_Period();
    public P_G_PeriodDetail: Array<P_G_Period>;
}

class M_D_LaborAssign{
    public sessionRecord: SessionRecord = new SessionRecord();
    public P_Tr_ResRequestLabour: P_Tr_ResRequestLabour = new P_Tr_ResRequestLabour();
    public P_TR_EngScheduleLabor: Array<P_TR_EngScheduleLabor>;
}

class M_D_EquipAssign{
    public P_TR_ResRequestEquipment: P_TR_ResRequestEquipment = new P_TR_ResRequestEquipment();
    public P_TR_EngScheduleEquip: Array<P_TR_EngScheduleEquip>;
}
class M_D_ReqMaterial{
    public P_TR_ResRequestMaterial: P_TR_ResRequestMaterial = new P_TR_ResRequestMaterial();
    public P_TR_ResRequestMaterialDetail: Array<P_TR_ResRequestMaterialDetail>;
}
class M_D_EngVariation{
    public P_TR_EngVariation: P_TR_EngVariation = new P_TR_EngVariation();
    public P_TR_EngVariationItemDetail: Array<P_TR_EngVariationItem>;
    public P_TR_EngVariationActivityDetial: Array<P_TR_EngVariationActivity>;
    public sessionRecord: SessionRecord = new SessionRecord();
}
