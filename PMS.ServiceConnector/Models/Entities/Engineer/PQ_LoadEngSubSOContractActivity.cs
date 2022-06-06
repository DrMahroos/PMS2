﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PMS.ServiceConnector.Models.Entities
{
    public class PQ_LoadEngSubSOContractActivity
    {
        public int SubContractId { get; set; }
        public int SubServiceOrderId { get; set; }
        public Nullable<int> ActivityId { get; set; }
        public int ProjectPhaseItemActivId { get; set; }
        public int SubContractActivityId { get; set; }
        public Nullable<decimal> UnitPrice { get; set; }
        public Nullable<decimal> ProjQty { get; set; }
        public Nullable<decimal> ContQty { get; set; }
        public Nullable<decimal> Qty { get; set; }
        public string ActivityCode { get; set; }
        public string DescA { get; set; }
        public string DescE { get; set; }
        public string Uom_Code { get; set; }
        public string Uom_DescA { get; set; }
        public string Uom_DescE { get; set; }
    }
}
