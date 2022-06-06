using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PMS.ServiceConnector.Models
{
    public class MemberStatisticsModel
    {
        public int InvoicesCount { get; set; }
        public int ServicesCount { get; set; }
        public decimal? TotalValue { get; set; }
    }
}
