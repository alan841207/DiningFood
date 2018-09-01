using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using EntityManager;
using Common;

namespace DataManager
{
    /// <summary>
    /// 用户管理类
    /// </summary>
    public class UserManager: dbInstance
    {

        public DiningUSER GetUser(string name, string pwd)
        {
            pwd = DEncrypt.Encrypt(pwd); //加密
            return dbInstance.Context.From<DiningUSER>().Where(p => p.USER == name && p.PWD == pwd).ToFirstDefault();
        }

        #region 
        //public DICUSER GetUser(string name,string pwd)
        //{
        //    pwd = DEncrypt.Encrypt(pwd); //加密
        //    return dbInstance.Context.From<DICUSER>().Where(p => p.USER == name && p.PWD == pwd).ToFirstDefault();
        //}

        public List<DiningUSER> GetAllUser()
        {
            return dbInstance.Context.From<DiningUSER>().Where(DiningUSER._.USER!="admin" && DiningUSER._.ISENABLE==0).ToList();
        }

        /// <summary>
        /// 新增用户
        /// </summary>
        /// <param name="user"></param>
        /// <returns></returns>
        //public bool SaveUser(DICUSER user)
        //{
        //   user.PWD = DEncrypt.Encrypt(user.PWD); //加密
        //   return dbInstance.Context.Insert<DICUSER>(user)>0 ? true:false;
        //}

        public DiningUSER GetUserById(int id)
        {
            return dbInstance.Context.From<DiningUSER>().Where(p => p.ID == id).ToFirstDefault();
        }

        /// <summary>
        /// 检查用户是否存在
        /// </summary>
        /// <param name="user"></param>
        /// <returns></returns>
        //public bool CheckUser(DICUSER user)
        //{
        //    if((dbInstance.Context.From<DICUSER>().Where(p => p.USER == user.USER).Count())>0)
        //    {
        //        return true;
        //    }
        //    return false;
        //}

        //public bool UpdateUser(DICUSER user,int id)
        //{
        //    user.PWD = DEncrypt.Encrypt(user.PWD); //加密
        //    return dbInstance.Context.Update<DICUSER>(user,p=>p.ID==id) > 0 ? true : false;
        //}
    }
    #endregion 
}
