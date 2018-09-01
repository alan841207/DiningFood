using DataManager;
using EntityManager;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace OrderingFoodSystem.Controllers
{
    public class CookingTypeController : Controller
    {
        // GET: CookingType
        [CheckLoginFilter]
        public ActionResult Index()
        {
            return View(new CookingTypeManager().GetAllCookingType());
        }

        // GET: CookingType/Details/5
        public ActionResult Details(int id)
        {
            return View();
        }

        // GET: CookingType/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: CookingType/Create
        [HttpPost]
        public ActionResult Create(FormCollection collection)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    DiningCookingType dcc = new DiningCookingType();
                    TryUpdateModel<DiningCookingType>(dcc, collection);
                    dcc.CREATEDATE = DateTime.Now;
                    dcc.CREATEUSER = Session["Username"].ToString();
                    // TODO: Add insert logic here
                    new CookingTypeManager().AddCookingClass(dcc);
                }
                return RedirectToAction("Index");
            }
            catch
            {
                return View();
            }
        }

        // GET: CookingType/Edit/5
        public ActionResult Edit(int id)
        {
            return View();
        }

        // POST: CookingType/Edit/5
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

        // GET: CookingType/Delete/5
        public ActionResult Delete(int id)
        {
            new CookingTypeManager().DelCookingType(id);
            return RedirectToAction("Index");
        }

        // POST: CookingType/Delete/5
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
        public JsonResult GetAllCookingType()
        {
            return Json(new CookingTypeManager().GetAllCookingType(), JsonRequestBehavior.AllowGet);
        }
    }
}
