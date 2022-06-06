//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace PMS.ServiceConnector.Models
{
    using System;
    using System.Collections.Generic;
    
    public partial class P_D_Equipment
    {
        public int EquimentID { get; set; }
        public Nullable<int> EquipClassId { get; set; }
        public string Equipcode { get; set; }
        public string DescA { get; set; }
        public string DescE { get; set; }
        public Nullable<decimal> PurchaseCost { get; set; }
        public Nullable<System.DateTime> PurchaseDate { get; set; }
        public string Model { get; set; }
        public string Make { get; set; }
        public string MakeType { get; set; }
        public string Waranty { get; set; }
        public string MaintNotes { get; set; }
        public string PlateNo { get; set; }
        public string ChasisNo { get; set; }
        public Nullable<bool> IsActive { get; set; }
        public Nullable<decimal> EffeciencyPrc { get; set; }
        public Nullable<System.DateTime> StartServiceDate { get; set; }
        public Nullable<System.DateTime> OutOFServiceDate { get; set; }
        public Nullable<decimal> HourDeprCost { get; set; }
        public Nullable<decimal> HourOprCost { get; set; }
        public Nullable<decimal> HourCost { get; set; }
        public Nullable<int> BraCode { get; set; }
        public string Remarks { get; set; }
        public Nullable<int> CompCode { get; set; }
        public Nullable<int> ProjectID { get; set; }
        public Nullable<int> PhaseId { get; set; }
    }
}
