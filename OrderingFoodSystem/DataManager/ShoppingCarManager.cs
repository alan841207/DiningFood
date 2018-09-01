using EntityManager;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataManager
{
    public class ShoppingCarManager:dbInstance
    {
        //添加商品到购物车
        public int Add(DiningShoppingCar shoppingCar)
        {
            return dbInstance.Context.Insert<DiningShoppingCar>(shoppingCar);
        }
    }
}
