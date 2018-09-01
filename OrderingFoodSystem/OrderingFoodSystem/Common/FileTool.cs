using System;
using System.Collections.Generic;
using System.Configuration;
using System.IO;
using System.Linq;
using System.Web;

namespace OrderingFoodSystem
{
    public class FileTool
    {
        /// <summary>
        /// 文件类型
        /// </summary>
        private static readonly string fileType = ConfigurationManager.AppSettings["fileType"];

        public static FileInfo GetReleseFile()
        {
            List<FileInfo> files = new List<FileInfo>();
            foreach (var file in Directory.GetFiles(path))
            {
                files.Add(new FileInfo(file));
            }
            if (string.IsNullOrEmpty(fileType))
            {
                return files.OrderByDescending(t => t.LastWriteTime).First<FileInfo>();
            }
            return files.Where(p => p.Extension.ToString() == fileType).OrderByDescending(t => t.LastWriteTime).First<FileInfo>();
        }

        /// <summary>
        /// 从config中获取文件路径
        /// </summary>
        private static readonly string path = HttpContext.Current.Server.MapPath(ConfigurationManager.AppSettings["path"]);


        public FileTool()
        {

        }
        public FileTool(string fileType, string path)
        {
            //this.fileType = fileType;
            //this.path = path;
        }

        /// <summary>
        /// 获取文件夹内所有对应的文件
        /// </summary>
        /// <returns></returns>
        public static List<FileInfo> GetFileInfo()
        {
            List<FileInfo> files = new List<FileInfo>();
            foreach (var file in Directory.GetFiles(path))
            {
                files.Add(new FileInfo(file));
            }
            //linq
            var v = from c in files
                    group c by c.Extension into g
                    orderby g.Key
                    select g;
            //Lambda
            if (string.IsNullOrEmpty(fileType))
            {
                return files.OrderByDescending(t => t.LastWriteTime).ToList();
            }
            return files.Where(p => p.Extension.ToString() == fileType).OrderByDescending(t => t.LastWriteTime).ToList();
        }

    }
}