using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using PMS.ServiceConnector.Models;

namespace PMS.WebUI.Models.CustomModels
{
    public class M_D_Expenses
    {
        public P_TR_EngExpensesEntry P_TR_EngExpensesEntry { get; set; }
        public List<P_TR_EngExpensesEntryDetail> P_TR_EngExpensesEntryDetail { get; set; }

    }
}