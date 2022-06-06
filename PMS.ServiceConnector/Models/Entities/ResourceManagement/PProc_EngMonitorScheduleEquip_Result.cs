using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PMS.ServiceConnector.Models.Entities
{
    public class PProc_EngMonitorScheduleEquip_Result
    {
        public string eclass_calsscode { get; set; }
        public string eclass_desca { get; set; }
        public string eclass_desce { get; set; }
        public string equipcode { get; set; }
        public string desca { get; set; }
        public string desce { get; set; }
        public Nullable<int> schno { get; set; }
        public Nullable<System.DateTime> assignedate { get; set; }
        public Nullable<System.DateTime> leavedate { get; set; }
        public Nullable<System.DateTime> expleavedate { get; set; }
        public Nullable<int> status { get; set; }
        public string projectphasecode { get; set; }
        public string projectcode { get; set; }
        public string stat_desc { get; set; }
    }
}
