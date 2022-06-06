using PMS.ServiceConnector.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace PMS.WebUI.Models.CustomModels
{
    public class M_D_WorkSchdule
    {
        public P_TR_EngSchedule P_TR_EngSchedule { get; set; }
        public List<P_TR_EngScheduleActiv> P_TR_EngScheduleActiv { get; set; }
        public List<P_TR_EngScheduleLaborClass> P_TR_EngScheduleLaborClass { get; set; }
        public List<P_TR_EngScheduleEquipClass> P_TR_EngScheduleEquipClass { get; set; }
        public List<P_TR_EngScheduleLabor> P_TR_EngScheduleLabor { get; set; }
        public List<P_TR_EngScheduleEquip> P_TR_EngScheduleEquip { get; set; }
    }
}