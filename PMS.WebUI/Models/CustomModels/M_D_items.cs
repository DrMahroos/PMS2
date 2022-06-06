using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using PMS.ServiceConnector.Models;

namespace PMS.WebUI.Models.CustomModels
{
    public class M_D_items
    {
        public I_D_Category I_D_Category { get; set; }
        public List<I_Item> I_Item { get; set; }
    }
}