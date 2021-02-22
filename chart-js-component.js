
//   ---------- Global variables to help when appending the information onto the DOM
let headers = document.querySelector('.main_headers')
let table_body = document.querySelector('.table_body')


// -------- Making a fetch request for the information --------------

// Holds all the information 
alldata = []

fetch(url)
.then(res => res.json())
.then(dataset => {
    alldata.push(dataset)
    let table_headers = (Object.keys(dataset[0]))

    // ------------- CREATING THE TABLE --------------------- 

        // ------ Building headers ---------------------
        table_headers.forEach(header => {
            let tableHeader = document.createElement('th')
                tableHeader.innerText = header
                headers.append(tableHeader)
        })

        // -------------- Building each row for the table ---------------------
        for (let i = 0; i < dataset.length; i++){
            let tableRow = document.createElement('tr')
                tableRow.className = i
                table_body.append(tableRow)
        
            let info = (Object.values(dataset[i]))
                info.forEach(data => {
                    let componentRow = document.createElement('td')
                        componentRow.innerText = data
                        tableRow.append(componentRow)
                })
        }
})


 // ----------DEFININGG THE X-AXIS OPTIONS -------- 
let rowid = []
let airlines = []
let avail_seat_km_per_week = []
let incidents_85_99 = []
let fatal_accidents_85_99 = []
let fatalities_85_99 = []
let incidents_00_14 = []
let fatal_accidents_00_14 = []
let fatalitites_00_14 = []
setTimeout(() => {

    // ----- set the numbers of all columns in the table ----------------
    let allColumns = Object.values(alldata[0][0]).length


    // ---I could try to use something like this to generate the variables for each column dynamically ----- 

        // let column = []
        // for (let n = 0; n < allColumns; n++){
        //     column['column_'+n] = []
        // }
    

    alldata.map(option => {
        let sizeOfColumns = Object.values(option).length

        // If I could create the variables using the loop, then I can loop through it, and push the data for each using a second loop 
            let sizeOfRows = Object.values(option[0]).length

            // As for this moment I am declaring the variables statically, and pushing the information onto it
        for (let i = 0; i < sizeOfColumns; i++){
            // for (let j = 0; j <sizeOfRows; j++){
                rowid.push(Object.values(option[i])[0])
                airlines.push(Object.values(option[i])[1])
                avail_seat_km_per_week.push(Object.values(option[i])[2])
                incidents_85_99.push(Object.values(option[i])[3])
                fatal_accidents_85_99.push(Object.values(option[i])[4])
                fatalities_85_99.push(Object.values(option[i])[5])
                incidents_00_14.push(Object.values(option[i])[6])
                fatal_accidents_00_14.push(Object.values(option[i])[7])
                fatalitites_00_14.push(Object.values(option[i])[8])

            // }
        }
    })


    
}, 100);

console.log(rowid)
console.log(airlines)
console.log(fatalitites_00_14)





var config = {
    type: 'line',
    data: {
      labels: ["June", "July", "August", "September", "October", "November", "December"],
      datasets: [{
        label: "company1",
        data: [2, 1, 2, 3, 4, 5, 6],
        fill: false,
        borderColor: "purple",
        backgroundColor: "purple"
      }]
    //   }, {
    //     label: "company2",
    //     data: [1, 2, 4, 8, 3, 2, 4],
    //     fill: false,
    //     borderColor: "green",
    //     backgroundColor: "green"
    //   }]
    },
    options: {
      responsive: true,
      
    }
  };
  
  var myChart;

  let line = document.getElementById('line')
  line.addEventListener('click', function() {change('line')})
  
  let bar = document.getElementById('bar')
  bar.addEventListener('click', function() {change('bar')})

  let scatter = document.getElementById('scatter')
  scatter.addEventListener('click', function() {change('scatter')})
  
 
  
  function change(newType) {
    var ctx = document.getElementById("canvas").getContext("2d");
  
    // Remove the old chart and all its event handles
    if (myChart) {
      myChart.destroy();
    }
  
    // Chart.js modifies the object you pass in. Pass a copy of the object so we can use the original object later
    var temp = config = (true, {}, config);
    temp.type = newType;
    myChart = new Chart(ctx, temp);
  };
  







