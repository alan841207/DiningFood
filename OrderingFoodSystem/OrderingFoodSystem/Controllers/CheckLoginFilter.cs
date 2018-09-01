using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace OrderingFoodSystem
{
    public class CheckLoginFilter:FilterAttribute, IActionFilter
    {
        public void OnActionExecuted(ActionExecutedContext filterContext)
        {
            filterContext.HttpContext.Response.Buffer = true;
            filterContext.HttpContext.Response.ExpiresAbsolute = DateTime.Now.AddDays(-1);
            filterContext.HttpContext.Response.Cache.SetExpires(DateTime.Now.AddDays(-1));
            filterContext.HttpContext.Response.Expires = 0;
            filterContext.HttpContext.Response.CacheControl = "no-cache";
            filterContext.HttpContext.Response.Cache.SetNoStore();

            if (HttpContext.Current.Session["User"] == null)
            {
                filterContext.HttpContext.Response.Write("-1");
            }
        }

        public void OnActionExecuting(ActionExecutingContext filterContext)
        {
            //string user = HttpContext.Current.Session["User"].ToString();
            if (HttpContext.Current.Session["User"] == null)
            {
                try
                {
                    filterContext.Result = new RedirectResult("/Home/Index");
                }
                catch (Exception)
                {
                    filterContext.Result = new RedirectResult("/Error/Index");
                }
            }
        }
    }
}