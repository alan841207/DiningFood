using DataManager;
using EntityManager;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace OrderingFoodSystem.Controllers
{
    [CheckLoginFilter]
    public class CookingClassController : Controller
    {
        // GET: CookingClass
        [CheckLoginFilter]
        public ActionResult Index()
        {
            return View(new CookingClassManager().GetAllCookingClass());
        }

        // GET: CookingClass/Details/5
        [CheckLoginFilter]
        public ActionResult Details(int id)
        {
            return View();
        }

        // GET: CookingClass/Create
        [CheckLoginFilter]
        public ActionResult Create()
        {
            return View();
        }

        // POST: CookingClass/Create
        [HttpPost]
        [CheckLoginFilter]
        public ActionResult Create(FormCollection collection)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    DiningCookingClass dcc = new DiningCookingClass();
                    TryUpdateModel<DiningCookingClass>(dcc,collection);
                    dcc.CREATEDATE = DateTime.Now;
                    dcc.CREATEUSER = Session["Username"].ToString();
                    // TODO: Add insert logic here
                    new CookingClassManager().AddCookingClass(dcc);
                }
                return RedirectToAction("Index");
            }
            catch
            {
                return View();
            }
        }

        // GET: CookingClass/Edit/5
        public ActionResult Edit(int id)
        {
            return View();
        }

        // POST: CookingClass/Edit/5
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

        // GET: CookingClass/Delete/5
        [CheckLoginFilter]
        public ActionResult Delete(int id)
        {
            new CookingClassManager().DelCookingClass(id);
            return RedirectToAction("Index");
        }
        
        //public JsonResult Delete(int id)
        //{
        //    return Json((new CookingClassManager().DelCookingClass(id) > 0 ) ? "OK" : "NG", JsonRequestBehavior.AllowGet);
        //}

        // POST: CookingClass/Delete/5
        [HttpPost]
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

        [HttpGet]
        [CheckLoginFilter]
        public JsonResult GetAllCookingClass()
        {
            return Json(new CookingClassManager().GetAllCookingClass(), JsonRequestBehavior.AllowGet);
        }

    }
}
