import excel from "exceljs";
import fs from "fs";

const exportXlsx = async(filename, data, user) => {

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
    // console.log(`##`,data[0])
    for(let i=1; i<=data.length; i++){
        row.getCell(i*2).value = `글 번호: ${data[i-1].id}`;
    }//for

    row = worksheet.getRow(4);
    for(let i=1; i<=data.length; i++){
        row.getCell(i*2).value = `작성일: ${data[i-1].createdAt}`;
    }//for

    row = worksheet.getRow(5);
    for(let i=1; i<=data.length; i++){
        row.getCell(i*2).value = `메모: ${data[i-1].memo}`;
    }//for
    
    //make export folder
    if(!fs.existsSync("public"))
        fs.mkdirSync("public");

    if(!fs.existsSync(`public/exports`))
        fs.mkdirSync(`public/exports`);
    
    await workbook.xlsx.writeFile("public/exports/"+file);
    return file;
};

export default exportXlsx;