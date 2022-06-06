using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PMS.ServiceConnector.Models.Entities
{
    public class GQ_GetUserSubsystem
    {
        public string USER_CODE { get; set; }
        public string SYSTEM_CODE { get; set; }
        public string SUB_SYSTEM_CODE { get; set; }
        public bool EXECUTE { get; set; }
        public string FILTER_STRING { get; set; }
        public string SUB_SYSTEM_DESCA { get; set; }
        public string SUB_SYSTEM_DESCE { get; set; }
    }
}
