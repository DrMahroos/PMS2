using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using Newtonsoft.Json;
using System.Linq.Expressions;
using System.Linq;
using PMS.ServiceConnector.Tools;

namespace PMS.ServiceConnector.Models
{
    /// <summary>
    /// RestClient implements methods for calling CRUD operations
    /// using HTTP.
    /// </summary>
    public class DataContext<T> : Tools.BaseRestClient
    {
        public DataContext(string url)
        {
            this.ServiceConnectorUrl = url;
        }
        LinqToSqlConverter.Convert linqSql = new LinqToSqlConverter.Convert();
        private void Dispose()
        {
            SqlStatment = "";
            Columns = "";
            Condition = "";
        }
        public ResponseResult ExcuteProcedure(T model)
        {
            var result = this.PostProc<T>(model);
            Dispose();
            result = this.ConvertResponseData(result);
            return result;
        }
        public async Task<ResponseResult> InsertEntityAsync(T entity)
        {
            var result = await this.PostAsync<T>(entity);
            Dispose();
            result = this.ConvertResponseData(result);
            return result;
        }
        public async Task<ResponseResult> InsertCollectionAsync(IEnumerable<T> entities)
        {
            var result = await this.PostCollectionAsync<T>(entities);
            Dispose();
            result = this.ConvertResponseData(result);
            return result;
        }
        public async Task<ResponseResult> UpdateEntityAsync(T entity)
        {
            var result = await this.PutAsync<T>(entity);
            Dispose();
            result = this.ConvertResponseData(result);
            return result;
        }
        public async Task<ResponseResult> DeleteEntityAsync(T entity)
        {
            var result = await DeleteAsync<T>(entity);
            Dispose();
            result = this.ConvertResponseData(result);
            return result;
        }
        public async Task<ResponseResult> DeleteCollectionAsync(IEnumerable<T> entities)
        {
            var result = await DeleteCollectionAsync<T>(entities);
            Dispose();
            result = this.ConvertResponseData(result);
            return result;
        }
        public async Task<IEnumerable<T>> ResultAsync()
        {
            string cols = string.Empty;
            if (Columns == "")
                cols = "*";
            else
                cols = Columns;

            string order = this.orderBy == "" ? "" :
               " ORDER BY " + this.orderBy;
            string desc = this.IsDescending == false ? "" : " DESC";
            SqlStatment = "SELECT " + cols + " FROM " + TableName + Condition + order + desc;

            var result = await this.GetAsync<T>(SqlStatment);
            Dispose();
            return result;
        }

        public ResponseResult InsertEntity(T entity)
        {
            var result = this.Post<T>(entity);
            Dispose();
            result = this.ConvertResponseData(result);
            return result;
        }
        public ResponseResult InsertCollection(IEnumerable<T> entities)
        {
            var result = this.PostCollection<T>(entities);
            Dispose();
            result = this.ConvertResponseData(result);
            return result;
        }
        public ResponseResult UpdateEntity(T entity)
        {
            var result = this.Put<T>(entity);
            Dispose();
            result = this.ConvertResponseData(result);
            return result;
        }
        public ResponseResult DeleteEntity(T entity)
        {
            var result = Delete<T>(entity);
            Dispose();
            result = this.ConvertResponseData(result);
            return result;
        }
        public ResponseResult DeleteCollection(IEnumerable<T> entities)
        {
            var result = DeleteCollection<T>(entities);
            Dispose();
            result = this.ConvertResponseData(result);
            return result;
        }
        public IEnumerable<T> Result()
        {
            string cols = string.Empty;
            if (Columns == "")
                cols = "*";
            else
                cols = Columns;

            string order = this.orderBy == "" ? "" :
                " ORDER BY " + this.orderBy;
            string desc = this.IsDescending == false ? "" : " DESC";
            SqlStatment = "SELECT " + cols + " FROM " + TableName + Condition + order + desc;

            var result = this.Get<T>(SqlStatment);
            Dispose();
            return result;
        }


        private string SqlStatment = string.Empty;
        private string Columns = string.Empty;
        private string orderBy = string.Empty;
        private bool IsDescending = false;
        private string Condition = string.Empty;

        private string TableName
        {
            get
            {
                return typeof(T).Name;
            }
        }



        private string GetScalarStatement(string statment)
        {
            string cols = string.Empty;
            if (Columns == "")
                cols = "*";
            else
                cols = Columns;

            string SumColumn = "(Convert(bigint," + cols + ",0))";
            SqlStatment =
                statment == "COUNT" ?
                "SELECT " + statment + "(" + cols + ") FROM " + TableName + Condition :
            "SELECT " + statment + SumColumn + " FROM " + TableName + Condition;

            var result = GetScalar(SqlStatment);
            Dispose();
            return result;
        }
        private async Task<string> GetScalarStatementAsync(string statment)
        {
            string cols = string.Empty;
            if (Columns == "")
                cols = "*";
            else
                cols = Columns;

            SqlStatment = "SELECT " + statment + "(" + cols + ") FROM " + TableName + Condition;
            var result = await GetScalarAsync(SqlStatment);
            Dispose();
            return result;
        }


        public async Task<int> CountAsync()
        {
            return int.Parse(await this.GetScalarStatementAsync("COUNT"));
        }
        public async Task<decimal?> MaxAsync()
        {
            string result = await this.GetScalarStatementAsync("MAX");
            if (result == "")
                return null;
            else
                return decimal.Parse(result);
        }
        public async Task<decimal?> SumAsync()
        {
            string result = await this.GetScalarStatementAsync("SUM");
            if (result == "")
                return null;
            else
                return decimal.Parse(result);
        }
        public async Task<IEnumerable<T>> TopAsync(int topCount)
        {
            string cols = string.Empty;
            if (Columns == "")
                cols = "*";
            else
                cols = Columns;

            string order = this.orderBy == "" ? "" :
            " ORDER BY " + this.orderBy;
            string desc = this.IsDescending == false ? "" : " DESC";

            SqlStatment = "SELECT Top " + topCount.ToString() + " " + cols + " FROM " + TableName + Condition + order + desc;
            var result = await GetAsync<T>(SqlStatment);// GetTopAsync<IEnumerable<T>>(SqlStatment);
            Dispose();
            return result;
        }

        public async Task<T> FirstAsync()
        {
            return (await this.TopAsync(1)).FirstOrDefault();
        }

        public int Count()
        {
            return int.Parse(this.GetScalarStatement("COUNT"));
        }
        public decimal? Max()
        {
            string result = this.GetScalarStatement("MAX");
            if (result == "")
                return null;
            else
                return decimal.Parse(result);
        }
        public decimal? Sum()
        {
            string result = this.GetScalarStatement("SUM");
            if (result == "")
                return null;
            else
                return decimal.Parse(result);
        }
        public IEnumerable<T> Top(int topCount)
        {
            string cols = string.Empty;
            if (Columns == "")
                cols = "*";
            else
                cols = Columns;

            string order = this.orderBy == "" ? "" :
              " ORDER BY " + this.orderBy;
            string desc = this.IsDescending == false ? "" : " DESC";

            SqlStatment = "SELECT Top " + topCount.ToString() + " " + cols + " FROM " + TableName + Condition + order + desc;
            var result = Get<T>(SqlStatment);
            Dispose();
            return result;
        }

        public T First()
        {
            return this.Top(1).FirstOrDefault();
        }
        public T ByIndex(int index)
        {
            string cols = string.Empty;
            if (Columns == "")
                cols = "*";
            else
                cols = Columns;
            string cond = Condition == "" ? " Where RowNum = " + index.ToString() :
                Condition + " And RowNum = " + index.ToString();
            SqlStatment = "Select * From (Select Row_Number() Over (Order By (select 0)) As RowNum, *  From " + TableName + " " + Condition + ") t2" + cond;

            var result = this.Get<T>(SqlStatment);
            return result.FirstOrDefault();
        }
        public T ByIndex(int index, string PrimeryKey)
        {
            string cols = string.Empty;
            if (Columns == "")
                cols = "*";
            else
                cols = Columns;
            string cond = Condition == "" ? " Where RowNum = " + index.ToString() :
                Condition + " And RowNum = " + index.ToString();
            SqlStatment = "Select * From (Select Row_Number() Over (Order By (" + PrimeryKey + ")) As RowNum, *  From " + TableName + " " + Condition + ") t2" + cond;

            var result = this.Get<T>(SqlStatment);
            return result.FirstOrDefault();
        }
        public string GetIndex(int id, string idField)
        {
            string cols = string.Empty;
            if (Columns == "")
                cols = "*";
            else
                cols = Columns;
            string cond = " Where " + idField + "  = " + id.ToString();
            SqlStatment = "Select top 1 RowNum  From (Select Row_Number() Over (Order By (select 0)) As RowNum ," + idField + " From " + TableName + " " + Condition + ") t2" + cond;

            string result = this.GetScalar(SqlStatment);

            return result;
        }
        public async Task<T> ByIndexAsync(int index)
        {
            string cols = string.Empty;
            if (Columns == "")
                cols = "*";
            else
                cols = Columns;
            string cond = Condition == "" ? " Where RowNum = " + index.ToString() :
                Condition + " And RowNum = " + index.ToString();
            SqlStatment = "Select * From (Select Row_Number() Over (Order By (select 0)) As RowNum, *  From " + TableName + " " + Condition + ") t2" + cond;

            var result = await this.GetAsync<T>(SqlStatment);
            return result.FirstOrDefault();
        }
        public DataContext<T> Select(Expression<Func<T, object>> columns)
        {
            this.Columns = this.linqSql.GetColumns<T>(columns);
            return this;
        }
        public DataContext<T> Where(Expression<Func<T, bool>> condition)
        {
            try
            {
                this.Condition = this.linqSql.GetCondition<T>(condition);
                return this;
            }
            catch
            {
            }
            return this;
        }

        public DataContext<T> OrderBy(Expression<Func<T, object>> column)
        {
            this.orderBy = this.linqSql.GetColumns<T>(column);
            return this;
        }
        public DataContext<T> Descending()
        {
            this.IsDescending = true;
            return this;
        }
        private ResponseResult ConvertResponseData(ResponseResult result)
        {
            object data = null;
            if (result.ResponseData != null)
                data = JsonConvert.DeserializeObject<T>(result.ResponseData.ToString());
            result.ResponseData = data;

            return result;
        }

        public ResponseResult InsertMasterDetails<TDetails>(T Master, IEnumerable<TDetails> Details)
        {
            var result = this.PostMasterDetails<T, TDetails>(Master, Details);
            return result;
        }
        //testMD
        public ResponseResult InsertMasterManyDetails<TDetails>(T Master, TDetails Details)
        {
            var result = this.PostMasterManyDetails<T, TDetails>(Master, Details);
            return result;
        }

        public ResponseResult UpdateMasterDetails<TDetails>(T Master, IEnumerable<TDetails> Details)
        {
            var result = this.PutMasterDetails<T, TDetails>(Master, Details);
            return result;
        }

        public ResponseResult UpdateMasterManyDetails<TDetails>(T Master, TDetails Details)
        {
            var result = this.PutMasterManyDetails<T, TDetails>(Master, Details);
            return result;
        }

        public ResponseResult UpdateMasterManyDetailsMasterPlan<TDetails>(T Master, TDetails Details,string ActionName)
        {
            var result = this.UpdateMasterManyDetailsMasterPlan<T, TDetails>(Master, Details,ActionName);
            return result;
        }

    }
}
