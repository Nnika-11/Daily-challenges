/*
I have a page with a table of different data from sensors.
Some of the data need to be refreshed every 5 seconds. Without reloading the whole page.

example of the cell
<td  id="sensorID" style="color:${sensor_color};">${SENSOR_DATA}</td>

*/

//////////   First idea: AJAX + RegExp in JavaScript    //////////////////

//Refresh the whole body - bad practice if there are some inputs
function refreshBody(){
  //set interval to refresh page every 5 sec (,5000)
  setInterval(function refreshCells(){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        let str=this.responseText
        let regexpResult=str.match(/<body.*>([^]*)<\/body>/)[1];
        /*
        [^] - any simbol
        ([^]*) - The parentheses indicate that I want to capture/extract this portion of the regex,
        while ignoring the rest of it.
        Usually goes as match [1] element of the array
        */
        document.getElementsByTagName("body")[0].innerHTML= regexpResult;
      }
    };
      //just get the page content I am at
    xhttp.open("GET", "sensors.cgi", true);
    xhttp.send();
  },10000);
}

//refresh one cell
function refreshCell(){
    setInterval(function refreshCells(){
      //to more info about XMLHttpRequest ---> https://www.w3schools.com/js/js_ajax_http_response.asp
      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          var str=this.responseText
          //search for specific id in <td - refresh and get content of the cell
          var a = str.match(/<td.*sensorID[^>]+>([^<]+)</)[1];
          document.getElementById("sensorID").innerHTML = a;
        }
      };
      //just get the page content I am at
      xhttp.open("GET", "sensors.cgi", true);
      xhttp.send();
    },5000);

}

//array of cells
function refreshCell(cells, page){
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var str=this.responseText
      cells.forEach(function(cellId){
        //here was added var "cellId" to regexp
        var regexText = new RegExp('<td.*'+cellId+'[^>]+>([^<]+)<');
        //to get text color of the cell
        var regexColor = new RegExp('<td.*'+cellId+'.*color\:([^;]+)');
        document.getElementById(cellId).innerHTML = str.match(regexText)[1];
        document.getElementById(cellId).style.color = str.match(regexColor)[1];
      });
    }
  };
  xhttp.open("GET", page, true);
  xhttp.send();
}

//Any different ideas?
