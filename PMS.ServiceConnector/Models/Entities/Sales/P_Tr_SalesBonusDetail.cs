using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PMS.ServiceConnector.Models.Entities
{
    public class P_Tr_SalesBonusDetail
    {
        public int SalesBonusDetailId { get; set; }
        public int SalesBonusId { get; set; }
        public Nullable<int> SalesEngineerId { get; set; }
        public Nullable<int> SalesEngCategoryId { get; set; }
        public Nullable<decimal> Salary { get; set; }
        public Nullable<decimal> OpenBasket { get; set; }
        public Nullable<decimal> OpenSales { get; set; }
        public Nullable<decimal> CurrentSales { get; set; }
        public Nullable<decimal> AddToBusket { get; set; }
        public Nullable<decimal> CurrentBasket { get; set; }
        public Nullable<decimal> CurrentInvoices { get; set; }
        public Nullable<decimal> BonusAmount { get; set; }
    }
}
