using PMS.WebUI.Models.CustomModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Mvc;

namespace PMS.WebUI.Tools
{
    interface IMasterManyDetails<T>
    {
        JsonResult GetByIndex(int? index = null);
        JsonResult GetModelCount();
        JsonResult Insert(string JsonData);
        JsonResult Update(string JsonData);
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
