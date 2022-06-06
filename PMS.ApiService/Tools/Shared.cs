using PMS.ApiService.Models;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Data.Entity.Core.EntityClient;
using System.Data.Entity.Core.Objects;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.Configuration;
using System.Data.Entity;

namespace PMS.ApiService.Tools
{
    enum InvoiceModes
    {
        Package,
        Product,
        Service
    }
    public class Shared
    {
        public static SessionRecord Session = new SessionRecord();
        
        public const string SessionKey = "Session";
        public const string IdKey = "id";
        public const string IndexKey = "index";
        public const string EntityKey = "Entity";
        public const string FieldsKey = "Fields";
        public const string ConditionKey = "Condition";
        public const string MasterKey = "Master";
        public const string DetailsKey = "Details";

        private static PMSEntities db = new PMSEntities(BuildConnectionString());
        public static string BuildConnectionString()
        {
            SqlConnectionStringBuilder sqlBuilder = new SqlConnectionStringBuilder();
            EntityConnectionStringBuilder entityBuilder = new EntityConnectionStringBuilder();
            // Set the properties for the data source.
            sqlBuilder.DataSource = WebConfigurationManager.AppSettings["ServerName"];
            bool singleDb = Convert.ToBoolean(WebConfigurationManager.AppSettings["singleDb"]);

            if (singleDb == false)
                sqlBuilder.InitialCatalog = WebConfigurationManager.AppSettings["AbsoluteSysDbName"] + Shared.Session.SelectedYear;
            else
                sqlBuilder.InitialCatalog = WebConfigurationManager.AppSettings["AbsoluteSysDbName"];

            sqlBuilder.UserID = WebConfigurationManager.AppSettings["DbUserName"];
            sqlBuilder.Password = WebConfigurationManager.AppSettings["DbPassword"];
            sqlBuilder.IntegratedSecurity = Convert.ToBoolean(WebConfigurationManager.AppSettings["UseIntegratedSecurity"]);
            sqlBuilder.MultipleActiveResultSets = true;
            string providerString = sqlBuilder.ToString();
            entityBuilder.ProviderConnectionString = providerString;
            entityBuilder.Provider = "System.Data.SqlClient";
            entityBuilder.Metadata = @"res://*/Models.SysModel.csdl|res://*/Models.SysModel.ssdl|res://*/Models.SysModel.msl";

            return entityBuilder.ConnectionString;
        }

        //public int GetNewSerial(SessionRecord session, string tr_type,PMSEntities _db)
        //{
        //    int compCode = int.Parse(session.CompCode);
        //    int braCode = int.Parse(session.BranchCode);
        //    var result = from counter in _db.K_COUNTER
        //                 where counter.COMP_CODE == compCode
        //                 && counter.BRA_CODE == braCode
        //                 && counter.TR_TYPE == tr_type
        //                 select counter;
        //    int serial = 1;
        //    K_COUNTER i_counter = result.FirstOrDefault();
        //    if (i_counter != null)
        //    {

        //        serial = (int)i_counter.LAST_SERIAL + 1;
        //        i_counter.LAST_SERIAL = serial;
        //        _db.Entry(i_counter).State = System.Data.Entity.EntityState.Modified;
        //        _db.SaveChanges();

        //    }
        //    else
        //    {
        //        i_counter = new K_COUNTER();
        //        i_counter.BRA_CODE = braCode;
        //        i_counter.COMP_CODE = compCode;
        //        i_counter.LAST_SERIAL = 1;
        //        i_counter.REMARK = tr_type;
        //        i_counter.TR_TYPE = tr_type;
        //        _db.K_COUNTER.Add(i_counter);
        //        _db.SaveChanges();
        //    }

        //    return serial;
        //}


        public static bool IsValidDate(DateTime? date)
        {
            if (date == null)
                return false;
            return true;
        }



        public static ResponseResult InvTransactionProcess(SessionRecord session, int id, string type, PMSEntities _db)
        {

            ResponseResult result = new ResponseResult();
            try
            {
                int comp = int.Parse(session.CompCode); int branch = int.Parse(session.BranchCode);
                ObjectParameter objParameterOk = new ObjectParameter("ok", typeof(Int32));
                ObjectParameter objParameterTrNo = new ObjectParameter("trNo", typeof(Int32));
                var ok = _db.P_ProcessTrans(comp, branch, type, id, objParameterTrNo, objParameterOk);
                if ((int)objParameterOk.Value == 0)
                {
                    result.ResponseData = objParameterTrNo.Value;
                    result.ResponseState = true;
                }
                else if ((int)objParameterOk.Value == 1)
                {
                    result.ResponseState = false;
                    result.ResponseMessage = "Server Error, Code: DB Proc Error generating number";
                }
                else if ((int)objParameterOk.Value == 2)
                {
                    result.ResponseState = false;
                    result.ResponseMessage = "Server Error, Code: DB Proc Execution error";
                }
                else if ((int)objParameterOk.Value == 3)
                {
                    result.ResponseState = false;
                    result.ResponseMessage = "Server Error, Code: DB Proc Processing error";
                }
            }
            catch (Exception ex)
            {
                result.ResponseState = false;
                result.ResponseMessage = ex.Message;
            }
            return result;

        }
        //public static ResponseResult BeautyTransactionProcess(int id, string type, PMSEntities _db)
        //{
        //    ResponseResult result = new ResponseResult();

        //    try
        //    {
        //        ObjectParameter objParameter = new ObjectParameter("Ok", typeof(Int32));


        //        var ok = _db.B_ProcessTrans(type, id, objParameter);
        //        if ((int)objParameter.Value == 1)
        //            result.ResponseState = true;
        //        else
        //        {
        //            result.ResponseState = false;
        //            result.ResponseMessage = "Server Error, Code: DB Proc";
        //        }
        //    }
        //    catch (Exception ex)
        //    {
        //        result.ResponseState = false;
        //        result.ResponseMessage = ex.Message;
        //    }

        //    return result;
        //}

        //public static decimal LoyalitypointsBalance(int id,PMSEntities _db)
        //{
        //    ResponseResult result = new ResponseResult();

        //    ObjectParameter parameter = new ObjectParameter("PointsBalance", typeof(decimal));
        //    _db.B_GET_loyalitypointsBalance(id, parameter);
        //    return (decimal)parameter.Value;
        //}


        public static ResponseResult TransactionProcess(int CompCode, int BranchCode, int id, string type, PMSEntities _db)
        {

            ResponseResult result = new ResponseResult();
            try
            {
                ObjectParameter objParameterOk = new ObjectParameter("ok", typeof(Int32));
                ObjectParameter objParameterTrNo = new ObjectParameter("trNo", typeof(Int32));
                var ok = _db.P_ProcessTrans(CompCode, BranchCode, type, id, objParameterTrNo, objParameterOk);
                if ((int)objParameterOk.Value == 0)
                {
                    result.ResponseData = objParameterTrNo.Value;
                    result.ResponseState = true;
                }
                else if ((int)objParameterOk.Value == 1)
                {
                    result.ResponseState = false;
                    result.ResponseMessage = "Server Error, Code: DB Proc Error generating number";
                }
                else if ((int)objParameterOk.Value == 2)
                {
                    result.ResponseState = false;
                    result.ResponseMessage = "Server Error, Code: DB Proc Execution error";
                }
                else if ((int)objParameterOk.Value == 3)
                {
                    result.ResponseState = false;
                    result.ResponseMessage = "Server Error, Code: DB Proc Processing error";
                }
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