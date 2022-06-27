using PMS.ServiceConnector.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Inv.BLL.Services.StkDefCategory
{
   public interface IP_D_SalesCustomerService
    {
        P_D_SalesCustomerCategory GetById(int id);
        List<P_D_SalesCustomerCategory> GetAll();
        List<P_D_SalesCustomerCategory> GetAll(Expression<Func<P_D_SalesCustomerCategory, bool>> predicate);
        I_D_Category Insert(P_D_SalesCustomerCategory entity);
        I_D_Category Update(P_D_SalesCustomerCategory entity);
        void Delete(int id);
        void UpdateList(List<P_D_SalesCustomerCategory> Lstservice);
    }
}
