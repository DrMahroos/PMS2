namespace PMS.ServiceConnector.Models.Entities
{
    using System;
    
    public partial class PProc_ResGetMaterialissueReturn_Result
    {
        public Nullable<int> ScheduleId { get; set; }
        public Nullable<int> SubServiceOrderId { get; set; }
        public Nullable<int> ReqTrNo { get; set; }
        public Nullable<System.DateTime> TrDate { get; set; }
        public string req_status { get; set; }
        public Nullable<int> Issue_no { get; set; }
        public Nullable<int> Ret_No { get; set; }
        public Nullable<System.DateTime> Tr_Date { get; set; }
        public string tr_status { get; set; }
    }
}
