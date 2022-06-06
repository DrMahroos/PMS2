using Newtonsoft.Json.Linq;
using PMS.ApiService.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PMS.ApiService.Tools
{
    public enum ActionTypes
    {
        Insert,
        Update,
        Delete,
        InsertCollection,
        DeleteCollection,

        InsertMasterDetails
    }
    interface IBaseController
    {
        object SelectEntity(string SqlStatement);
        ResponseResult InsertEntity(JObject data);
        ResponseResult DeleteEntity(JObject data);
        ResponseResult UpdateEntity(JObject data);
        ResponseResult InsertCollection(JObject data);

        ResponseResult Validation(ActionTypes actionType, JObject data);
        ResponseResult Process(ActionTypes actionType, JObject data);


    }


    interface IMasterDetailsController<TMaster, TDetails>
    {
        ResponseResult InsertMasterDetails(JObject data);
        ResponseResult MasterDetailsValidation(TMaster Master, IEnumerable<TDetails> Details, SessionRecord Session);// JObject data);
        //ResponseResult MasterDetailsProcess(TMaster Master, IEnumerable<TDetails> Details, SessionRecord Session);//JObject data);
        ResponseResult UpdateMasterDetails(JObject data);
    }

    interface IMasterDetailsoBJController<TMaster, TDetails>
    {
        ResponseResult InsertMasterDetails(JObject data);
        ResponseResult MasterDetailsValidation(TMaster Master, TDetails DetailsObj, SessionRecord Session);
        ResponseResult UpdateMasterDetails(JObject data);
    }
}
