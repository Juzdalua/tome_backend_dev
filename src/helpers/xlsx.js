import excel from "exceljs";

const exportXlsx = (filename, data, user) => {

    let timestamp = new Date().getTime();
    const file = filename + '_' + timestamp + '.xlsx';
    
    const workbook = new excel.Workbook();

    let row = null;
    let worksheet = workbook.addWorksheet(filename+'_'+timestamp, {
        dateFormat: ['YYYY.MM.DD']
    });

    row = worksheet.getRow(1);
    row.getCell(1).value = `${user.username}님의 전체 메모목록`;
};

export default exportXlsx;