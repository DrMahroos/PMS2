using PMS.ApiService.Models;
using PMS.ApiService.Tools;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Data.Entity.Core.Objects;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace PMS.ApiService.Controllers
{
    public class P_tol_GetMessageController : BaseController
    {
        [HttpPost]
        public object ExcuteProc(JObject data)
        {

            {

                ResponseResult result = new ResponseResult();
                try
                {
                    var objec= JObjectData<P_tol_GetMessage>(data).Entity;

                    ObjectParameter objParametermsgType = new ObjectParameter("msgType", typeof(Int32));
                    ObjectParameter objParameterHdMsg = new ObjectParameter("HdMsg", typeof(Int32));
                    ObjectParameter objParameterDetMsg = new ObjectParameter("DetMsg", typeof(Int32));

                    var ok = db.PProc_tol_GetMessage(objec.comp, objec.TrTyp,objec.memid,objec.trid, objParametermsgType, objParameterHdMsg, objParameterDetMsg);
                    var res=new P_tol_GetMessage();
                    res.HdMsg = objParameterHdMsg.Value.ToString();
                    res.MsgType =int.Parse(objParametermsgType.Value.ToString());
                    res.DetMsg = objParameterDetMsg.Value.ToString();

                    result.ResponseData = res;
                    result.ResponseState = true;
                }
                catch (Exception ex)
                {
                    result.ResponseState = false;
                    result.ResponseMessage = ex.Message;
                }
                return result;

            }
        }


    }
}
