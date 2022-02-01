
// Your web app's Firebase configuration
  var Config = {
    apiKey: "AIzaSyCUh_sieojiCZOlQ7ko10gNLKgiK4l7KLk",
    authDomain: "cscode-28965.firebaseapp.com",
    databaseURL: "https://cscode-28965.firebaseio.com",
    projectId: "cscode-28965",
    storageBucket: "cscode-28965.appspot.com",
    messagingSenderId: "519439487949",
    appId: "1:519439487949:web:2c82b2aa684def71e4aa84",
    measurementId: "G-QW7L39Q3H7"
  };
  // Initialize Firebase
    firebase.initializeApp(Config);

// Create the connection to the specific 'table'
    var myDBConn1 = firebase.database().ref('BOB').child("TEMPERRRRRR");

    //var rootRef = firebase.database().ref().child('feedback');

// Lists to hold data that will come from Firebase
var yearTemp = [];
var tempValue= [];
var chartchoice;
var select;
var choice;




// Search Results from the database stored in a JSON format
var SearchResults = "";
// Function that retrieves data from Firebase when new data is added
 myDBConn1.on("child_added",function(data, prevChildKey){
        console.log(data.val());

        // The data returned from the branch is put into a variable, dataPoint
        var dataPoint = data.val();

        // Populate the Years lists with the various data from the Firebase
        yearTemp.push(dataPoint["Year"]);
        tempValue.push(dataPoint["LandAverageTemperature"]);
   
  
        //create a new select option for every starting year
        var x1 = document.getElementById("Year1A");
        var option1 = document.createElement("option");
        option1.text = dataPoint["Year"];
        option1.value = dataPoint["Year"];
        x1.add(option1);

        //create a new select option for every ending year  
        var x2 = document.getElementById("Year2A");
        var option2 = document.createElement("option");
        option2.text = dataPoint["Year"];
        option2.value = dataPoint["Year"];
        option2.selected = true; //makes the last one selected
        x2.add(option2);
      
});

  // Function to begin the process of creating graphs
function generategraph(){
  console.log("generategraph");
  SearchResults = "";
  var i=0;
  
  // Get the user selected option from the HTML drop down box
  var SearchID1 = document.getElementById("Year1A");
  var SearchID2 = document.getElementById("Year2A");
  
  var startYearFound, endYearFound = false;

  // Loop around the counties list until we match the user search with the counties list
  for(i=0; i<yearTemp.length; i++){
    
    if(yearTemp[i]==SearchID1.value){      
      startYearFound = true;
    }
    
     if (startYearFound && !endYearFound) {
        SearchResults += ',' + 
          ' {"label":"'+yearTemp[i]+
          '","value":"'+tempValue[i]+
          '"}';     
    }
    
    if(yearTemp[i]==SearchID2.value){      
      endYearFound = true;
    }
  }
  // Remove the leading comma...
  SearchResults = SearchResults.substring(1);
  
  // Add some square brackets to the string to make it JSON compatible...
  SearchResults = "[" + SearchResults + "]";
  
  // Convert the string into a JSON format
  SearchResults = JSON.parse(SearchResults);
  
  // Call the function that translates the results to a graph
  FusionChartCreate(1);
}

  
  // Call the function that translates the results to a graph

// Function that creates the actual graph 
// I don't yet fully understand how I've got this function formatted - bound to be a simpler way that I'll look into. 
function FusionChartCreate(number){  
  chartchoice = document.getElementById("chartchoice").value; 
  FusionCharts.ready(function(){ 
        var fusioncharts = new FusionCharts({
          // Specifics of graph type
          type: chartchoice, 
          renderAt: "chart-container"+number,
          width: '60%',
          height: '90%',
          dataFormat: 'json',
          // More specifics
          dataSource: {
            // Chart Configuration
            "chart": {
              "borderColor": "#4169e1",
              "borderThickness": "4",
              "borderAlpha": "80",
              "yAxisNameFont": "Arial",
              "yAxisNameFontSize": "19",
              "yAxisNameFontColor": "#993300",
              "yAxisNameFontBold": "1",
              "yAxisNameFontItalic": "1",
              "xAxisNameFont": "Arial",
              "xAxisNameFontSize": "19",
              "xAxisNameFontColor": "#993300",
              "xAxisNameFontBold": "1",
              "xAxisNameFontItalic": "1",
              "rotateLabels": "0",
              "labelDisplay": "wrap",
              "showBorder": "10",
              "caption": "Global Temperature Rise Analysis",
              "captionFontSize": "25",
              "captionFontColor": "#00000",
              "subCaption": "-Climate Change-",
              "xAxisName": "Years",
              "yAxisName": "Global Temperature (°F)",
              "theme": "fusion",
              "labelStep" :"10",
              "color": "#e44a00",
                
              
            },
            // Chart Data set to be the Results from Firebase
            "data": SearchResults,
            "trendlines": [
              
                {
                  
                    "line": [
                        {
                            "startvalue": "1.51",
                            "color": "#e44a00",
                            "displayvalue": "Average Land Temperature",
                            "valueOnRight": "1",
                            "thickness": "4",
                        }
                    ]
                }
            ]
         }      
        });

        // Render the charts
        fusioncharts.render();
    });
  
}

function myFunctionincrease() {
  document.getElementById('sizechange').style.fontSize = '1.6em';
}

function myFunctiondecrease() {
  document.getElementById('sizechange').style.fontSize = '1.2em';
}
function myFunctionincrease2() {
  document.getElementById('sizechange1').style.fontSize = '1.6em';
}

function myFunctiondecrease2() {
  document.getElementById('sizechange1').style.fontSize = '1.2em';
}
function myFunctionincrease3() {
  document.getElementById('sizechange2').style.fontSize = '1.6em';
}

function myFunctiondecrease3() {
  document.getElementById('sizechange2').style.fontSize = '1.2em';
}
function myShowinfo() {
  document.getElementById("sealeveltxt").innerHTML = "As we can see from the Graph the Temperature is rising due to the constant use of carbon emissons and fossil fuels etc,conveying that we are undergoing Global Warming. Which will lead to massive floods if the Antartica ice caps melt."
}

