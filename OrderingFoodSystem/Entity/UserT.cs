﻿//------------------------------------------------------------------------------
// <auto-generated>
//     此代码由工具生成。
//     运行时版本:4.0.30319.42000
//     Website: http://ITdos.com/Dos/ORM/Index.html
//     对此文件的更改可能会导致不正确的行为，并且如果
//     重新生成代码，这些更改将会丢失。
// </auto-generated>
//------------------------------------------------------------------------------

using System;
using Dos.ORM;
using System.ComponentModel.DataAnnotations;

namespace EntityManager
{
    /// <summary>
    /// 实体类UserT。(属性说明自动提取数据库字段的描述信息)
    /// </summary>
    [Table("UserT")]
    [Serializable]
    public partial class UserT :Entity
    {
        #region Model
		private int _id;
		private string _userName;
		private string _userPwd;
		private string _userGroup;
		private DateTime? _CreateTime;
        private string _desc;

		/// <summary>
		/// 
		/// </summary>
		[Field("id")]
		public int id
		{
			get{ return _id; }
			set
			{
				this.OnPropertyValueChange("id");
				this._id = value;
			}
		}
		/// <summary>
		/// 
		/// </summary>
		[Field("userName")]
        [Display(Name = "用户名")]
        [Required(AllowEmptyStrings = false, ErrorMessage = "用户名不能为空")]
        public string userName
		{
			get{ return _userName; }
			set
			{
				this.OnPropertyValueChange("userName");
				this._userName = value;
			}
		}
		/// <summary>
		/// 
		/// </summary>
		[Field("userPwd")]
        [Display(Name ="密码")]
        [Required(AllowEmptyStrings = false, ErrorMessage = "用户名不能为空")]
        public string userPwd
		{
			get{ return _userPwd; }
			set
			{
				this.OnPropertyValueChange("userPwd");
				this._userPwd = value;
			}
		}
        [Field("desc")]
        [Display(Name = "中文名")]
        [Required(AllowEmptyStrings = false, ErrorMessage = "中文名不能为空")]
        public string desc
        {
            get { return _desc; }
            set
            {
                this.OnPropertyValueChange("desc");
                this._desc = value;
            }
        }

        /// <summary>
        /// 
        /// </summary>
        [Field("userGroup")]
		public string userGroup
		{
			get{ return _userGroup; }
			set
			{
				this.OnPropertyValueChange("userGroup");
				this._userGroup = value;
			}
		}
		/// <summary>
		/// 
		/// </summary>
		[Field("CreateTime")]
        [Display(Name ="创建时间")]
        //[DisplayFormat(DataFormatString = "{0:yyyy-MM-dd}")]
        [Required(AllowEmptyStrings = false, ErrorMessage = "创建时间不能为空")]
        public DateTime? CreateTime
		{
			get{ return _CreateTime; }
			set
			{
				this.OnPropertyValueChange("CreateTime");
				this._CreateTime = value;
			}
		}
		#endregion

		#region Method
        /// <summary>
        /// 获取实体中的主键列
        /// </summary>
        public override Field[] GetPrimaryKeyFields()
        {
            return new Field[] {
				_.id,
			};
        }
		/// <summary>
        /// 获取实体中的标识列
        /// </summary>
        public override Field GetIdentityField()
        {
            return _.id;
        }
        /// <summary>
        /// 获取列信息
        /// </summary>
        public override Field[] GetFields()
        {
            return new Field[] {
				_.id,
				_.userName,
				_.userPwd,
				_.userGroup,
                _.desc,
				_.CreateTime,
			};
        }
        /// <summary>
        /// 获取值信息
        /// </summary>
        public override object[] GetValues()
        {
            return new object[] {
				this._id,
				this._userName,
				this._userPwd,
				this._userGroup,
                this._desc,
				this._CreateTime,
			};
        }
        /// <summary>
        /// 是否是v1.10.5.6及以上版本实体。
        /// </summary>
        /// <returns></returns>
        public override bool V1_10_5_6_Plus()
        {
            return true;
        }
        #endregion

		#region _Field
        /// <summary>
        /// 字段信息
        /// </summary>
        public class _
        {
			/// <summary>
			/// * 
			/// </summary>
			public readonly static Field All = new Field("*", "UserT");
            /// <summary>
			/// 
			/// </summary>
			public readonly static Field id = new Field("id", "UserT", "");
            /// <summary>
			/// 
			/// </summary>
			public readonly static Field userName = new Field("userName", "UserT", "");
            /// <summary>
			/// 
			/// </summary>
			public readonly static Field userPwd = new Field("userPwd", "UserT", "");
            /// <summary>
			/// 
			/// </summary>
			public readonly static Field userGroup = new Field("userGroup", "UserT", "");

            public readonly static Field desc = new Field("desc", "UserT", "");
            /// <summary>
			/// 
			/// </summary>
			public readonly static Field CreateTime = new Field("CreateTime", "UserT", "");
        }
        #endregion
	}
}