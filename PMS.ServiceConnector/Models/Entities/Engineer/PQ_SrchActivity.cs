

namespace PMS.ServiceConnector.Models
{
    using System;
    using System.Collections.Generic;

    public partial class PQ_SrchActivity
    {
        public int ActivityID { get; set; }
        public string ActivityCode { get; set; }
        public string DescA { get; set; }
        public string DescE { get; set; }
        public Nullable<int> UomID { get; set; }
        public Nullable<decimal> HourProduction { get; set; }
        public Nullable<decimal> LaborProdRate { get; set; }
        public Nullable<decimal> UnitPrice { get; set; }
        public Nullable<int> ParentActivityID { get; set; }
        public Nullable<int> ActivityLevel { get; set; }
        public Nullable<bool> IsDetail { get; set; }
        public string Remarks { get; set; }
        public Nullable<int> CompCode { get; set; }
        public string Uom_Code { get; set; }
        public string Uom_DescA { get; set; }
        public string Uom_DescE { get; set; }
    }
}
