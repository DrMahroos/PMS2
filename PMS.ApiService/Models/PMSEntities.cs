using System;
using System.Collections.Generic;
using System.Data.Entity.Core.EntityClient;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace PMS.ApiService.Models
{
    public partial class PMSEntities
    {
        public PMSEntities(string ConnectionString)
       : base(ConnectionString)
        {
        }

    }
}