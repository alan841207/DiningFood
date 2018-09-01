using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using EntityManager;

namespace DataManager
{
    public class CookingClassManager:dbInstance
    {
        public List<DiningCookingClass> GetAllCookingClass()
        {
            return dbInstance.Context.From<DiningCookingClass>().ToList<DiningCookingClass>();
        }

        //新增
        public void AddCookingClass(DiningCookingClass dcc)
        {
            dbInstance.Context.Insert<DiningCookingClass>(dcc);
        }

        public int DelCookingClass(int id)
        {
            return dbInstance.Context.Delete<DiningCookingClass>(DiningCookingClass._.ID == id);
        }
    }
}
