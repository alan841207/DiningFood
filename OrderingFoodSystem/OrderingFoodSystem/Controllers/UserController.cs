using DataManager;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace OrderingFoodSystem.Controllers
{
    public class UserController : Controller
    {
        // GET: User
        [CheckLoginFilter]
        public ActionResult Index()
        {
            return View(new UserManager().GetAllUser());
        }

        // GET: User/Details/5
        [CheckLoginFilter]
        public ActionResult Details(int id)
        {
            return View();
        }

        // GET: User/Create
        [CheckLoginFilter]
        public ActionResult Create()
        {
            return View();
        }

        // POST: User/Create
        [HttpPost]
        [CheckLoginFilter]
        public ActionResult Create(FormCollection collection)
        {
            try
            {
                // TODO: Add insert logic here

                return RedirectToAction("Index");
            }
            catch
            {
                return View();
            }
        }

        // GET: User/Edit/5
        [CheckLoginFilter]
        public ActionResult Edit(int id)
        {
            return View(new UserManager().GetUserById(id));
        }

        // POST: User/Edit/5
        [CheckLoginFilter]
        [HttpPost]
        public ActionResult Edit(int id, FormCollection collection)
        {
            try
            {
                // TODO: Add update logic here

                return RedirectToAction("Index");
            }
            catch
            {
                return View();
            }
        }

        // GET: User/Delete/5
        [CheckLoginFilter]
        public ActionResult Delete(int id)
        {
            return View();
        }

        // POST: User/Delete/5
        [HttpPost]
        [CheckLoginFilter]
        public ActionResult Delete(int id, FormCollection collection)
        {
            try
            {
                // TODO: Add delete logic here

                return RedirectToAction("Index");
            }
            catch
            {
                return View();
            }
        }
    }
}
