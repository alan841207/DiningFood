using EntityManager;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataManager
{
    public class LoginManager:dbInstance
    {

        public static bool Login(UserT user)
        {
            return dbInstance.Context.From<UserT>().Where(p1 => p1.userName == user.userName).Where(p2 => p2.userPwd == user.userPwd).Count() > 0 ? true : false;
        }
    }
}
