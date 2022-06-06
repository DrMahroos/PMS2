using PMS.ServiceConnector.Tools;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;


namespace PMS.ServiceConnector.Models
{
    public class ServerTransactions : BaseRestClient
    {
        public ServerTransactions()
        {
            ServiceConnectorUrl = DbEntities.ServiceUrl;
        }
        DbEntities db = new DbEntities();

        //public ResponseResult InsertUpdateItem(I_Item Item,List<I_ItemSpecsValue> ItemSpecsValue)
        //{
        //    var obj = new
        //    {
        //        Item = Item,
        //        ItemSpecsValue = ItemSpecsValue,
        //        Session=SessionManager.SessionRecord
        //    };
        //    var json = JsonConvert.SerializeObject(obj);
        //    HttpContent httpContent = new StringContent(json);
        //    httpContent.Headers.ContentType = new MediaTypeHeaderValue(ContentType);

        //    var result = httpClient.PostAsync(ServiceConnectorUrl + ServerTransactionsName + "/InsertUpdateItem", httpContent).Result;
        //    var jsonResult = JsonConvert.DeserializeObject<ResponseResult>(result.Content.ReadAsStringAsync().Result);

        //    return jsonResult;

        //}

        public ResponseResult InsertMasterDetails<TMaster, TDetails>(TMaster master, IEnumerable<TDetails> details, string PrimaryKey)
        {
            var obj = new
            {
                Entity = master,
                MasterType = typeof(TMaster).Name,
                Collection = details,
                DetailsType = typeof(TDetails).Name,
                PK = PrimaryKey,
                Session = SessionManager.SessionRecord
            };
            var json = JsonConvert.SerializeObject(obj);
            HttpContent httpContent = new StringContent(json);
            httpContent.Headers.ContentType = new MediaTypeHeaderValue(ContentType);

            var result = httpClient.PostAsync(ServiceConnectorUrl + ServerTransactionsName + "/InsertMasterDetails", httpContent).Result;
            var jsonResult = JsonConvert.DeserializeObject<ResponseResult>(result.Content.ReadAsStringAsync().Result);
            return jsonResult;

        }

        public IEnumerable<ItemUnitsModel> GetItemUnits(int id)
        {
            httpClient = new HttpClient();
            var result = httpClient.GetStringAsync(ServiceConnectorUrl + ServerTransactionsName + "/GetItemUnits?id=" + id).Result;
            var obj = result.ToJsonObject<IEnumerable<ItemUnitsModel>>();
            return obj;

        }


        public async Task<MemberStatisticsModel> GetMemberStatisticsByYear(int MemberID)
        {

            httpClient = new HttpClient();
            var json = new
            {
                Session = SessionManager.SessionRecord,
                MemberID = MemberID
            };
            HttpContent httpContent = new StringContent(json.ToJsonString());
            httpContent.Headers.ContentType = new MediaTypeHeaderValue(ContentType);
            var result = await httpClient.PostAsync(ServiceConnectorUrl + ServerTransactionsName + "/GetMemberStatisticsByYear", httpContent);
            string jsonContent = await result.Content.ReadAsStringAsync();
            var obj = jsonContent.ToJsonObject<IEnumerable<MemberStatisticsModel>>();
            return obj.FirstOrDefault();
        }
        public MemberStatisticsModel GetMemberStatistics(int MemberID)
        {
            httpClient = new HttpClient();
            var json = new
            {
                Session = SessionManager.SessionRecord,
                MemberID = MemberID
            };
            HttpContent httpContent = new StringContent(json.ToJsonString());

            var result = httpClient.PostAsync(ServiceConnectorUrl + ServerTransactionsName + "/GetMemberStatistics", httpContent);
            var obj = result.Result.Content.ReadAsStringAsync().Result.ToJsonObject<IEnumerable<MemberStatisticsModel>>();
            return obj.FirstOrDefault();
        }
    }
}
