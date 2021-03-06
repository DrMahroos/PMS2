using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PMS.ServiceConnector.Models.Entities
{
    public class PQ_GetSalesManBonus
    {
        public int SalesBonusId { get; set; }
        public Nullable<int> TrNo { get; set; }
        public Nullable<System.DateTime> TrDate { get; set; }
        public Nullable<int> Fyear { get; set; }
        public Nullable<int> Qrtr { get; set; }
        public Nullable<System.DateTime> FromDate { get; set; }
        public Nullable<System.DateTime> ToDate { get; set; }
        public Nullable<byte> Status { get; set; }
        public string Remarks { get; set; }
        public Nullable<int> BraCode { get; set; }
        public Nullable<int> CompCode { get; set; }
        public string CreatedBy { get; set; }
        public Nullable<System.DateTime> CreatedAt { get; set; }
        public string UpdatedBy { get; set; }
        public Nullable<System.DateTime> UpdatedAt { get; set; }
        public Nullable<int> SalesBonusDetailId { get; set; }
        public Nullable<int> D_SalesBonusId { get; set; }
        public Nullable<int> SalesEngineerId { get; set; }
        public Nullable<int> D_SalesEngCategoryId { get; set; }
        public Nullable<decimal> Salary { get; set; }
        public Nullable<decimal> OpenBasket { get; set; }
        public Nullable<decimal> OpenSales { get; set; }
        public Nullable<decimal> CurrentSales { get; set; }
        public Nullable<decimal> AddToBusket { get; set; }
        public Nullable<decimal> CurrentBasket { get; set; }
        public Nullable<decimal> CurrentInvoices { get; set; }
        public Nullable<decimal> BonusAmount { get; set; }
        public int SlsEng_SalesEngineerId { get; set; }
        public string EngCode { get; set; }
        public string DeacA { get; set; }
        public int SalesEngCategoryId { get; set; }
        public string CategCode { get; set; }
        public string SlsCat_DescA { get; set; }
        public string SlsCat_DescE { get; set; }
    }
}
