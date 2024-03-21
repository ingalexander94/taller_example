import downloadIcon from "src/assets/icons/download.svg";
import loadingIco from "src/assets/icons/loading.svg";
import ExcelJS from "exceljs";
import {  useEffect, useState } from "react";

type Props = {
  service: ()=>{};
  title_sheet: string;
  table_headers: string[];
};

const DownloadExcel = ({
  service,
  table_headers,
  title_sheet,
}: Props) => {

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    setLoading(true);
    generateDataExcel()
    setLoading(false);
  }, [data]);

  const getDataToExcel = async () => {
    const res:any = await service();
    setData(res)
  };

  const generateDataExcel = async () => {

    if (data.length === 0) return;
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet(title_sheet);
    worksheet.addRow(table_headers);

    data.forEach((item, __) => {
      let row_temp: string[] = [];
      Object.values(item).forEach((value, _) => {
        row_temp.push(String(value));
      });
      worksheet.addRow(row_temp);
    });

    Array.from({ length: data.length }, (_, i) => i + 1).forEach((i: any) => {
      if (i == 1) {
        worksheet.getRow(i).font = {
          name: "Calibry",
          family: 4,
          size: 12,
          bold: true,
        };
        worksheet.getColumn(i).font = {
          name: "Calibry",
          family: 4,
          size: 12,
          bold: true,
        };
      }
      worksheet.getColumn(i).width = 30;
      worksheet.getColumn(i).alignment = {
        horizontal: "center",
        vertical: "middle",
      };
    });

    workbook.xlsx.writeBuffer().then((buffer) => {
      const blob = new Blob([buffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${title_sheet}.xlsx`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
    });
  };


  return (
    <button
      disabled={loading}
      type="button"
      onClick={getDataToExcel}
      className="btn_secondary"
    >
      <img src={loading ? loadingIco : downloadIcon} alt="Download icon" />
      Descargar
    </button>
  );
};

export default DownloadExcel;
