using EntityManager;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataManager
{
    public class WebChatDataManager:dbInstance
    {
        public IEnumerable<InventoryList> GetAllInventory()
        {
            List<InventoryList> itI= new List<InventoryList>();
            var v = dbInstance.Context.From<DiningCookingType>().ToList();
            foreach (var item in v)
            {
                var cookTypeList=dbInstance.Context.From<DiningDishName>().Where(DiningDishName._.CookingType == item.CookingType).ToList();
                itI.Add(new InventoryList(item.ID, item.CookingType, cookTypeList));
            }
            return itI;
        }


        public IEnumerable<DiningDishName> GetAllInventoryById(string id)
        {
            return dbInstance.Context.From<DiningDishName>().Where(DiningDishName._.CookingType == id).ToList();
        }

        public IEnumerable<DiningCookingType> GetAllCookingType()
        {
            return dbInstance.Context.From<DiningCookingType>().ToList();
        }
    }

    public class InventoryList
    {
        public int? Id { get; set; }

        public string CookType { get; set; }

        public IEnumerable<DiningDishName> DdnList { get; set; }

        public InventoryList(int? Id,string CookType,IEnumerable<DiningDishName> DdnList)
        {
            this.Id = Id;
            this.CookType = CookType;
            this.DdnList = DdnList;
        }
    }
}
