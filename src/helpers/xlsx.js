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

    row = worksheet.getRow(3);
    for(let i=1; i<=data.length; i++)
        row.get(i+2) // 다시하기
};

export default exportXlsx;