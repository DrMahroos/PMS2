using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Mvc;

namespace PMS.WebUI.Tools
{
    interface IController<T>
    {
        //JsonResult Next();
        //JsonResult Previous();
        //JsonResult Last();
        //JsonResult First();
        JsonResult GetByIndex(int? index = null);
        //JsonResult GetByID(int id);
        JsonResult GetModelCount();

        JsonResult Insert(T entity);
        JsonResult Update(T entity);
        JsonResult Delete(T entity);

        JsonResult Add();
        void Edit();
        JsonResult Undo();

        JsonResult Find();
        JsonResult OnSearchSelect(string id);

        JsonResult InsertAll(T master, string json);
        JsonResult DeleteAll(string json);
    }


    
}
