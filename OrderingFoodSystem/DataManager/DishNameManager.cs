using EntityManager;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataManager
{
    public class DishNameManager:dbInstance
    {
        public List<DiningDishName> GetAllDishName()
        {
            return dbInstance.Context.From<DiningDishName>().ToList();
        }

        //新增
        public int AddDishName(DiningDishName ddn)
        {
            return dbInstance.Context.Insert<DiningDishName>(ddn);
        }

        public DiningDishName GetDishNameById(int id)
        {
            return dbInstance.Context.From<DiningDishName>().Where(DiningDishName._.ID == id).ToFirstDefault();
        }

        //更新
        public int ModifyDishName(DiningDishName ddn, int id)
        {
            return dbInstance.Context.Update<DiningDishName>(ddn, d => d.ID == id);
        }

        //删除
        public int DelDishNameById(int id)
        {
            return dbInstance.Context.Delete<DiningDishName>(DiningDishName._.ID == id);
        }
    }
}
