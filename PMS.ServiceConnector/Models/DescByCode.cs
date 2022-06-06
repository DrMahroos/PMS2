using PMS.ServiceConnector.Tools;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PMS.ServiceConnector.Models
{
    public class DescByCode
    {

        DbEntities db = new DbEntities();
        private int CompCode
        {
            get
            {
                return int.Parse(SessionManager.SessionRecord.CompCode);
            }
        }
        private string Language
        {
            get
            {
                return SessionManager.SessionRecord.ScreenLanguage;
            }
        }

        //public string I_D_Category(string code)
        //{
        //    var model = db.
        //        I_D_Category
        //        .Where(f => f.CatCode == code && f.CompCode == CompCode)
        //        .Select(f => new { f.DescA, f.DescL })
        //        .Result().First();

        //    if (Language == "ar")
        //        return model.DescA;
        //    else
        //        return model.DescL;
        //}

        //public string I_D_UnitGroup(string code)
        //{
        //    var model = db
        //        .I_D_UnitGroup
        //        .Where(f => f.UnitGrpCode == code && f.CompCode == CompCode)
        //        .Select(f => new { f.DescA, f.DescE })
        //        .First();

        //    if (Language == "ar")
        //        return model.DescA;
        //    else
        //        return model.DescE;

        //}
    }
}
