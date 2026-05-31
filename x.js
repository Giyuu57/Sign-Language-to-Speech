const winax = require('winax');

const pptPath = "C:\\Users\\YourName\\skillsXchange_Presentation.pptx";
const pdfPath = "C:\\Users\\YourName\\skillsXchange_Presentation.pdf";

const powerpoint = new winax.Object("PowerPoint.Application");
powerpoint.Visible = true;

const presentation = powerpoint.Presentations.Open(pptPath, false, false, false);

// 32 = PDF format
presentation.SaveAs(pdfPath, 32);

presentation.Close();
powerpoint.Quit();

console.log("PDF CREATED");