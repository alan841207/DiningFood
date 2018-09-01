using EntityManager;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataManager
{
    public class CookingTypeManager:dbInstance
    {
        public List<DiningCookingType> GetAllCookingType()
        {
            return dbInstance.Context.From<DiningCookingType>().ToList();
        }

        public void DelCookingType(int id)
        {
            dbInstance.Context.Delete<DiningCookingType>(DiningCookingType._.ID == id);
        }

        public void AddCookingClass(DiningCookingType dcc)
        {
            dbInstance.Context.Insert<DiningCookingType>(dcc);
        }
    }
}
