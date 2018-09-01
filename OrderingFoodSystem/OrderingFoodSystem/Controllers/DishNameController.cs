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
    public class DishNameController : Controller
    {
        // GET: DishName
        [CheckLoginFilter]
        public ActionResult Index()
        {
            return View(new DishNameManager().GetAllDishName());
        }

        // GET: DishName/Details/5
        public ActionResult Details(int id)
        {

            return View();
        }

        // GET: DishName/Create
        [CheckLoginFilter]
        public ActionResult Create()
        {
            return View();
        }

        // POST: DishName/Create
        [HttpPost]
        [CheckLoginFilter]
        public ViewResult Create(FormCollection collection)
        {
            try
            {
                if (collection["CookingClass"].Contains("请选择") || collection["CookingType"].Contains("请选择") )
                {
                    ModelState.AddModelError("", "请择选菜系和菜类");
                }
                if (string.IsNullOrEmpty(collection["DateType"]))
                {
                    ModelState.AddModelError("", "请择选班别");
                }

                if (ModelState.IsValid)
                {
                    DiningDishName ddn = new DiningDishName();
                    TryUpdateModel(ddn,collection);
                    ddn.CREATEUSER = Session["Username"].ToString();
                    ddn.CREATEDATE = DateTime.Now;

                    if (new DishNameManager().AddDishName(ddn) > 0)
                    {
                        ModelState.Clear();
                        //return RedirectToAction("Index");
                        ViewBag.Msg = "[" + ddn.DishName + "]  添加完成!!";
                        //return Content("["+ddn.DishName+"]  添加完成!!");
                    }
                    else
                    {
                        ModelState.AddModelError("", "添加菜名信息出错!!!");
                    }
                }

            }
            catch
            {
                return View();
            }
            return View();
        }

        // GET: DishName/Edit/5
        public ActionResult Edit(int id)
        {
            return View(new DishNameManager().GetDishNameById(id));
        }

        // POST: DishName/Edit/5
        [HttpPost]
        public ActionResult Edit(int id, FormCollection collection)
        {
            if (ModelState.IsValid)
            {
                DiningDishName ddn = new DiningDishName();
                TryUpdateModel(ddn, collection);
                ddn.MODIFYUSER = Session["Username"].ToString();
                ddn.MODIFYDATE = DateTime.Now;

                if (new DishNameManager().ModifyDishName(ddn,id) > 0)
                {
                    ModelState.Clear();
                    return RedirectToAction("Index");
                }
                else
                {
                    ModelState.AddModelError("", "修改菜名信息出错!!!");
                    return null;
                }
              }
                return View();
            }

        // GET: DishName/Delete/5
        public ActionResult Delete(int id)
        {
            new DishNameManager().DelDishNameById(id);
            return RedirectToAction("Index");
        }

        // POST: DishName/Delete/5
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

        [HttpPost]
        public JsonResult upload()
        {
            HttpFileCollection files = System.Web.HttpContext.Current.Request.Files;

            if (files.Count>0)
            {
                string oldfilename = files[0].FileName;
                string filename = files[0].FileName.Replace(".", "!" + Guid.NewGuid().ToString() + ".");//取得文件名字
                string path = Server.MapPath("~/DishesImg/" + filename);//获取存储的目标地址
                files[0].SaveAs(path);

                return Json(new { code = 0,msg= filename }, JsonRequestBehavior.AllowGet);
            }
            return Json("1", JsonRequestBehavior.AllowGet);
        }

    }

}
