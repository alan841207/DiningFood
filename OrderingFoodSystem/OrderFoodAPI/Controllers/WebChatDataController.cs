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
    public class WebChatDataController : ApiController
    {
        // GET: api/WebChatData
        /// <summary>
        /// 返回所有商品信息
        /// </summary>
        /// <returns></returns>
        public IEnumerable<InventoryList> GetAllInventoryList()
        {
            return new WebChatDataManager().GetAllInventory();
        }

        /// <summary>
        /// 根据条件返回商品信息
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public IEnumerable<DiningDishName> GetAllInventoryListById(string id)
        {
            return new WebChatDataManager().GetAllInventoryById(id);
        }

    }

    public class WebChatCookingTypeController : ApiController
    {
        public IEnumerable<DiningCookingType> GetAllCookingType()
        {
            return new WebChatDataManager().GetAllCookingType();
        }

    }




}
