using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

using DataManager;
using EntityManager;

namespace OrderingFoodSystem
{
    public class LoginController : Controller
    {
        // GET: Login
        [CheckLoginFilter]
        public ActionResult Index()
        {
            return View(new UserManager().GetAllUser());
        }

        [CheckLoginFilter]
        [HttpGet]
        public ActionResult AdddicUser()
        {
            return View();
        }



        [CheckLoginFilter]
        public ActionResult Edit(int id)
        {
            return View(new UserManager().GetUserById(id));
        }

        /// <summary>
        /// 帐号验证
        /// </summary>
        /// <param name="userID"></param>
        /// <param name="pwd"></param>
        /// <returns></returns>
        [HttpPost]
        public ActionResult CheckLogin(string userID, string pwd)
        {
            string msg = string.Empty;
            DiningUSER user = new UserManager().GetUser(userID, pwd);
            if (!string.IsNullOrEmpty(user.USER))
            {
                msg = "OK";
                ViewBag.UName = user.USER;
                Session["User"] = user;
                Session["UserName"] = user.NAME;
                Session["Username"] = user.USER;
            }
            return Content(msg);
        }

        //登出
        public ActionResult Login()
        {
            Session.Clear();
            return RedirectToAction("Index", "Login");
            //return new RedirectResult("/Login/Index?LogOut=true");
        }

        [HttpGet]
       public JsonResult GetUser()
        {
            return Json(new UserManager().GetAllUser(),JsonRequestBehavior.AllowGet);
           //return Json(new UserKpiManager().GetKpiUser(), JsonRequestBehavior.AllowGet);
        }
    }

}