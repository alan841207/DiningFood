using DataManager;
using EntityManager;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace OrderFoodAPI.Controllers
{
    public class ShoppingCarController : ApiController
    {

        // GET: api/ShoppingCar/5
        [HttpGet]
        public string AddShoppingCar(string id, string user)
        {
            DiningShoppingCar shoppingCar = new DiningShoppingCar()
            {
                DishID = int.Parse(id),
                UserID = user,
                CREATEDATE = DateTime.Now,
                CREATEUSER = user,
                Num = 1
            };
            return new ShoppingCarManager().Add(shoppingCar) > 0 ? "Pass" : "False";          
        }

        [HttpGet]
        public string AddTest(string id,string user)
        {
            DiningShoppingCar shoppingCar = new DiningShoppingCar()
            {
                DishID = int.Parse(id),
                UserID = user,
                CREATEDATE = DateTime.Now,
                CREATEUSER = user,
                Num = 1
            };
            return new ShoppingCarManager().Add(shoppingCar) > 0 ? "Pass" : "False";
        }

    }
}
