using PMS.ServiceConnector.Tools;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PMS.ServiceConnector.Models
{
    public class Reports:Tools.BaseRestClient
    {
        public Reports()
        {
            ServiceConnectorUrl = DbEntities.ServiceUrl;
            this._parameters.Clear();
        }

        private Dictionary<string, object> _parameters = new Dictionary<string, object>();

        public void AddParameter<T>(string Key,T Value)
        {
            Type typeOfValue = Value.GetType();
            if (typeOfValue == typeof(ReportParameters))
            {
                _parameters[Key] = Value.ToJsonString();
            }
            else
            {
                this._parameters[Key] = Value;
            }
        }

        public string GetReportUrl(string ReportName)
        {
            string pars = string.Empty;
            foreach (string key in _parameters.Keys)
            {
                pars += "&" + key + "=" + _parameters[key];
            }
            //pars = pars.Substring(1);
            var sessionObject = new
            {
                SessionManager.SessionRecord.CompCode,
                SessionManager.SessionRecord.ScreenLanguage
            };
            
            string ses = "" + SessionManager.SessionRecord.ToJsonString();
            string url = this.ServiceConnectorUrl + "Forms/ReportsForm.aspx?ses=" + ses + "&rpt=" + ReportName + pars;
            return url;
        }

        //public void CallAction(string controllerName,string action)
    }
}
