using DataManager;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace OrderingFoodSystem.Controllers
{
    public class WebChatDataController : Controller
    {
        // GET: WebChatData
        /// <summary>
        /// 返回所有商品相关信息
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public JsonResult GetListData()
        {
            return Json(new DishNameManager().GetAllDishName(), JsonRequestBehavior.AllowGet);
        }
    }
}