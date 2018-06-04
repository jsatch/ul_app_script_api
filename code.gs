function doGet(request) {
  var startRow = 1;
  var startColumn = 0;
  var numRows = 2;
  var numColumns = 3;
  var spreadsheetId = '<ID_SPREADSHEET>';
  
  var spreadsheet = SpreadsheetApp.openById(spreadsheetId)
  var sheet = spreadsheet.getSheetByName("partidos");
  var dataRange = sheet.getRange(startRow + 1, startColumn + 1, numRows, numColumns)
  var data = dataRange.getValues();
  
  var response = [];
  for (i in data){
    var partidosJson = {
      codigo: data[i][0],
      equipo1: data[i][1],
      equipo2: data[i][2],
    }
    response.push(partidosJson);
  }
  
  return ContentService.createTextOutput(JSON.stringify(response)).setMimeType(ContentService.MimeType.JAVASCRIPT);
}

/*
* URL (ejemplo): http://<url>?usuario=20122323&idpartido=1&ganador=0&golesequipo1=1&golesequipo2=1
 */
function doPost(request) {
  var usuario = request.parameter.usuario;
  var idpartido = request.parameter.idpartido;
  var ganador = request.parameter.ganador; // 0: empate, 1: gana equipo1, 2: gana equipo2
  var golesEquipo1 = request.parameter.golesequipo1;
  var golesEquipo2 = request.parameter.golesequipo2;
  
  var spreadsheetId = '<ID_SPREADSHEET>';
  var sheet = SpreadsheetApp.openById(spreadsheetId).getSheetByName("apuestas");
  sheet.appendRow([usuario, idpartido, ganador, golesEquipo1, golesEquipo2])
  
  var response = {
    error : ""
  };
  return ContentService.createTextOutput(JSON.stringify(response)).setMimeType(ContentService.MimeType.JAVASCRIPT);
}

