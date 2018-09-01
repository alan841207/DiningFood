using OfficeOpenXml;
using OfficeOpenXml.Style;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Common
{
    public class ExcelExportHelper
    {
        public static string ExcelContentType
        {
            get
            {
                return "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
            }
        }

        /// <summary>
        /// List转DataTable
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="data"></param>
        /// <returns></returns>
        public static DataTable ListToDataTable<T>(List<T> data)
        {
            PropertyDescriptorCollection properties = TypeDescriptor.GetProperties(typeof(T));
            DataTable dataTable = new DataTable();
            for (int i = 0; i < properties.Count; i++)
            {
                PropertyDescriptor property = properties[i];
                dataTable.Columns.Add(property.Name, Nullable.GetUnderlyingType(property.PropertyType) ?? property.PropertyType);
            }
            object[] values = new object[properties.Count];
            foreach (T item in data)
            {
                for (int i = 0; i < values.Length; i++)
                {
                    values[i] = properties[i].GetValue(item);
                }

                dataTable.Rows.Add(values);
            }
            return dataTable;
        }

        /// <summary>
        /// 导出Excel
        /// </summary>
        /// <param name="dataTable">数据源</param>
        /// <param name="heading">工作簿Worksheet</param>
        /// <param name="showSrNo">//是否显示行编号</param>
        /// <param name="columnsToTake">要导出的列</param>
        /// <returns></returns>
        public static byte[] ExportExcel(DataTable dataTable, string heading = "", bool showSrNo = false, params string[] columnsToTake)
        {
            byte[] result = null;
            using (ExcelPackage package = new ExcelPackage())
            {
                ExcelWorksheet workSheet = package.Workbook.Worksheets.Add(string.Format("{0}Data", heading));
                //workSheet.DefaultColWidth = 20;
                workSheet.Column(2).Width = 15;
                workSheet.Column(3).Width = 20;
                workSheet.Column(4).Width = 20;
                workSheet.Column(9).Width = 20;
                workSheet.Column(10).Width = 20;
                workSheet.Column(11).Width = 20;

                int startRowFrom = string.IsNullOrEmpty(heading) ? 1 : 3;  //开始的行
                //是否显示行编号
                if (showSrNo)
                {
                    DataColumn dataColumn = dataTable.Columns.Add("#", typeof(int));
                    dataColumn.SetOrdinal(0);
                    int index = 1;
                    foreach (DataRow item in dataTable.Rows)
                    {
                        item[0] = index;
                        index++;
                    }
                }

                //Add Content Into the Excel File
                workSheet.Cells["A" + startRowFrom].LoadFromDataTable(dataTable, true);
                // autofit width of cells with small content  
                //int columnIndex = 1;
                //foreach (DataColumn item in dataTable.Columns)
                //{
                //    ExcelRange columnCells = workSheet.Cells[workSheet.Dimension.Start.Row, columnIndex, workSheet.Dimension.End.Row, columnIndex];
                //    int maxLength = columnCells.Max(cell => cell.Value.ToString().Count());
                //    if (maxLength < 150)
                //    {
                //        workSheet.Column(columnIndex).AutoFit();
                //    }
                //    columnIndex++;
                //}
                // format header - bold, yellow on black  
                using (ExcelRange r = workSheet.Cells[startRowFrom, 1, startRowFrom, dataTable.Columns.Count])
                {
                    r.Style.Font.Color.SetColor(System.Drawing.Color.White);
                    r.Style.Font.Bold = true;
                    r.Style.Fill.PatternType = OfficeOpenXml.Style.ExcelFillStyle.Solid;
                    r.Style.Fill.BackgroundColor.SetColor(System.Drawing.ColorTranslator.FromHtml("#1fb5ad"));
                    r[1, 1].Value = "序号";
                    r[1, 2].Value = "年月日";
                    r[1, 3].Value = "开始时间";
                    r[1, 4].Value = "结束时间";
                    r[1, 5].Value = "省耗工时(分钟)";
                    r[1, 6].Value = "工 单";
                    r[1, 7].Value = "用 户";
                    r[1, 8].Value = "机台号";
                    r[1, 9].Value = "品  目";
                    r[1, 10].Value = "制  番  号";
                    r[1, 11].Value = "模具编号";
                    r[1, 12].Value = "工  序";
                    r[1, 13].Value = "计划数";
                    r[1, 14].Value = "实际数";
                    r[1, 15].Value = "冲数";
                    r[1, 16].Value = "实际总数";
                    r[1, 17].Value = "完成率";
                }
                // format cells - add borders  
                using (ExcelRange r = workSheet.Cells[startRowFrom + 1, 1, startRowFrom + dataTable.Rows.Count, dataTable.Columns.Count])
                {
                    r[startRowFrom+1,3, startRowFrom + dataTable.Rows.Count,3].Style.Numberformat.Format = "yyyy-MM-dd hh:mm:ss";
                    r[startRowFrom + 1, 4, startRowFrom + dataTable.Rows.Count, 4].Style.Numberformat.Format = "yyyy-MM-dd hh:mm:ss";
                    //r.Style.Border.Top.Style = ExcelBorderStyle.Thin;
                    //r.Style.Border.Bottom.Style = ExcelBorderStyle.Thin;
                    //r.Style.Border.Left.Style = ExcelBorderStyle.Thin;
                    //r.Style.Border.Right.Style = ExcelBorderStyle.Thin;

                    //r.Style.Border.Top.Color.SetColor(System.Drawing.Color.Black);
                    //r.Style.Border.Bottom.Color.SetColor(System.Drawing.Color.Black);
                    //r.Style.Border.Left.Color.SetColor(System.Drawing.Color.Black);
                    //r.Style.Border.Right.Color.SetColor(System.Drawing.Color.Black);
                }

                // removed ignored columns  
                for (int i = dataTable.Columns.Count - 1; i >= 0; i--)
                {
                    if (i == 0 && showSrNo)
                    {
                        continue;
                    }
                    if (!columnsToTake.Contains(dataTable.Columns[i].ColumnName))
                    {
                        workSheet.DeleteColumn(i + 1);
                    }
                }

                if (!String.IsNullOrEmpty(heading))
                {
                    workSheet.Cells["A1"].Value = heading;
                    workSheet.Cells["A1"].Style.Font.Size = 20;

                    workSheet.InsertColumn(1, 1);
                    workSheet.InsertRow(1, 1);
                    workSheet.Column(1).Width = 5;
                }

                result = package.GetAsByteArray();

            }
            return result;
        }

        /// <summary>
        /// 导出Excel
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="data"></param>
        /// <param name="heading"></param>
        /// <param name="isShowSlNo"></param>
        /// <param name="ColumnsToTake"></param>
        /// <returns></returns>
        public static byte[] ExportExcel<T>(List<T> data, string heading = "", bool isShowSlNo = false, params string[] ColumnsToTake)
        {
            return ExportExcel(ListToDataTable<T>(data), heading, isShowSlNo, ColumnsToTake);
        }
    }
}
