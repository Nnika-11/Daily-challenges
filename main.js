/*
I have a page with a table of different data from sensors.
Some of the data need to be refreshed every 5 seconds. Without reloading the whole page.
*/


//First idea: AJAX + RegExp in JavaScript


function refreshCell(){
//set interval to refresh page every 5 sec (,5000)
    setInterval(function refreshCells(){
      //to more info about XMLHttpRequest ---> https://www.w3schools.com/js/js_ajax_http_response.asp
      var xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          var str=this.responseText
          //search for specific id - refresh and get content of the cell
          var a = str.match(/<td.*refresh[^>]+>([^<]+)</)[1];
          /*
          ([^<]+) - The parentheses indicate that I want to capture/extract this portion of the regex,
          while ignoring the rest of it.
          Usually goes as match [1] element of the array
          */
          document.getElementById("refresh").innerHTML = a;
        }
      };
      //just get the page content I am at
      xhttp.open("GET", "/cgi/sensors.cgi", true);
      xhttp.send();
    },5000);

</script>
}
