﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PMS.ServiceConnector.Models
{
    public class PQ_GetSlsOfferActivity
    {
        public int OfferStageItemActivityId { get; set; }
        public int OfferItemId { get; set; }
        public Nullable<int> OfferStageId { get; set; }
        public Nullable<int> OfferID { get; set; }
        public Nullable<int> ActivityID { get; set; }
        public Nullable<int> Serial { get; set; }
        public Nullable<decimal> Qty { get; set; }
        public Nullable<decimal> UnitPrice { get; set; }
        public Nullable<decimal> StdUnitPrice { get; set; }
        public Nullable<bool> ProductionIncluded { get; set; }
        public Nullable<decimal> ProductionPrc { get; set; }
        public string Remarks { get; set; }
        public Nullable<decimal> EstimatedMaterial { get; set; }
        public Nullable<decimal> EstimatedLabor { get; set; }
        public Nullable<decimal> EstimatedEquip { get; set; }
        public Nullable<decimal> EstimatedProfit { get; set; }
        public Nullable<decimal> EstimatedOH { get; set; }
        public Nullable<decimal> EstimatedPOH { get; set; }
        public string Act_ActivityCode { get; set; }
        public string Act_DescA { get; set; }
        public string Act_DescE { get; set; }
        public Nullable<decimal> UnitCost { get; set; }
        public string Uom_UomCode { get; set; }
        public string UOM_DescA { get; set; }
        public string Uom_DescE { get; set; }
    }
}
