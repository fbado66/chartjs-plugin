
//   ---------- Global variables to help when appending the information onto the DOM
let headers = document.querySelector('.main_headers')
let table_body = document.querySelector('.table_body')
let selectX_axis = document.querySelector('.selectX')
let selectY_axis = document.querySelector('.selectY')


// -------- Making a fetch request for the information --------------

// Holds all the information 
alldata = []
let titles_on_data = []

fetch(url)
.then(res => res.json())
.then(dataset => {
    alldata.push(dataset)
    let table_headers = (Object.keys(dataset[0]))
    titles_on_data.push(Object.keys(dataset[0]))

    // ------------- CREATING THE TABLE --------------------- 

        // ------ Building headers ---------------------
        table_headers.forEach(header => {
            let tableHeader = document.createElement('th')
                tableHeader.innerText = header
                headers.append(tableHeader)

                // Create the options for the select X axis on the graph
                let XaxisOption = document.createElement('option')
                    XaxisOption.value = header
                    XaxisOption.innerText = header
                    selectX_axis.append(XaxisOption)


                // Create the options for the select Y axis on the graph
                let YaxisOption = document.createElement('option')
                    YaxisOption.value = header
                    YaxisOption.innerText = header
                    selectY_axis.append(YaxisOption)

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


 // ----------DEFINING THE AXIS ARRAY OPTIONS -------- 
//  For this section, I wanted to create each one of them dinamically, with the use of a loop. But to avoid the use of Vanilla.Js and risking the chance of not getting the array populated with the information in time, I opted for this static approach 

let rowid = []
let airlines = []
let avail_seat_km_per_week = []
let incidents_85_99 = []
let fatal_accidents_85_99 = []
let fatalities_85_99 = []
let incidents_00_14 = []
let fatal_accidents_00_14 = []
let fatalitites_00_14 = []

// I am using a setTimeOUt function to ensure the program runs and populate the information prior calling on it

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

// console.log(titles_on_data)
// console.log(rowid)
// console.log(airlines)
// console.log(fatalitites_00_14)

//  with more time I would make this into a helper function, and re-use for both axis

// --- DYNAMICALLY CHANGE ON X AXIS --- 
let xSelector = document.querySelector('.selectX')
xSelector.addEventListener('change', (evt) => {
    let holdX_value = evt.target.value
    if (holdX_value == 'rowid') {
        config.data.labels = rowid
        config.options.scales.xAxes[0].scaleLabel.labelString = 'rowid'
    } else if(holdX_value == 'airline') {
        config.data.labels = airlines
        config.options.scales.xAxes[0].scaleLabel.labelString = 'airlines'
    } else if(holdX_value == 'avail_seat_km_per_week') {
        config.data.labels = avail_seat_km_per_week
        config.options.scales.xAxes[0].scaleLabel.labelString = 'vail_seat_km_per_week'
    } else if(holdX_value == 'incidents_85_99') {
        config.data.labels = incidents_85_99
        config.options.scales.xAxes[0].scaleLabel.labelString = 'incidents_85_99'
    } else if(holdX_value == 'fatal_accidents_85_99') {
        config.data.labels = fatal_accidents_85_99
        config.options.scales.xAxes[0].scaleLabel.labelString = 'fatal_accidents_85_99'
    } else if(holdX_value == 'fatalities_85_99') {
        config.data.labels = fatalities_85_99
        config.options.scales.xAxes[0].scaleLabel.labelString = 'fatalities_85_99'
    } else if(holdX_value == 'incidents_00_14') {
        config.data.labels = incidents_00_14
        config.options.scales.xAxes[0].scaleLabel.labelString = 'incidents_00_14'
    } else if(holdX_value == 'fatal_accidents_00_14') {
        config.data.labels = fatal_accidents_00_14
        config.options.scales.xAxes[0].scaleLabel.labelString = 'fatal_accidents_00_14'
    } else if(holdX_value == 'atalities_00_14') {
        config.data.labels = atalities_00_14
        config.options.scales.xAxes[0].scaleLabel.labelString = 'fatalities_00_14'
    }
    myChart.update()
})

// --- DYNAMICALLY CHANGE ON Y AXIS --- 
let ySelector = document.querySelector('.selectY')
ySelector.addEventListener('change', (evt) => {
    let holdY_value = evt.target.value
    if (holdY_value == 'rowid') {
        config.data.datasets[0].data = rowid
        config.options.scales.yAxes[0].scaleLabel.labelString = 'rowid'
    } else if(holdY_value == 'airline') {
        config.data.datasets[0].data = airlines
        config.options.scales.yAxes[0].scaleLabel.labelString = 'airlines'
    } else if(holdY_value == 'avail_seat_km_per_week') {
        config.data.datasets[0].data = avail_seat_km_per_week
        config.options.scales.yAxes[0].scaleLabel.labelString = 'vail_seat_km_per_week'
    } else if(holdY_value == 'incidents_85_99') {
        config.data.datasets[0].data = incidents_85_99
        config.options.scales.yAxes[0].scaleLabel.labelString = 'incidents_85_99'
    } else if(holdY_value == 'fatal_accidents_85_99') {
        config.data.datasets[0].data = fatal_accidents_85_99
        config.options.scales.yAxes[0].scaleLabel.labelString = 'fatal_accidents_85_99'
    } else if(holdY_value == 'fatalities_85_99') {
        config.data.datasets[0].data = fatalities_85_99
        config.options.scales.yAxes[0].scaleLabel.labelString = 'fatalities_85_99'
    } else if(holdY_value == 'incidents_00_14') {
        config.data.datasets[0].data = incidents_00_14
        config.options.scales.yAxes[0].scaleLabel.labelString = 'incidents_00_14'
    } else if(holdY_value == 'fatal_accidents_00_14') {
        config.data.datasets[0].data = fatal_accidents_00_14
        config.options.scales.yAxes[0].scaleLabel.labelString = 'fatal_accidents_00_14'
    } else if(holdY_value == 'atalities_00_14') {
        config.data.datasets[0].data = atalities_00_14
        config.options.scales.yAxes[0].scaleLabel.labelString = 'fatalities_00_14'
    }
    
    myChart.update()
})


// SETUP / CONFIGURATION OF THE CHART.JS COMPONENT

var config = {
    type: 'line',
    data: {
      labels: rowid,
      datasets: [{
        // ---- y axis -------
        data: rowid,
        fill: false,
        borderColor: "blue",
        backgroundColor: "blue"
      }]
    },
    options: {
        legend: {
            display: true,
            labels: {
                fontColor: 'rgb(225, 99, 132)'
            },
        },
        showLines: true,
        scales: {
            xAxes: [{
                scaleLabel: {
                    display: true,
                    labelString: 'rowid'
                },
                stacked: true
            }],
            yAxes: [{
                scaleLabel: {
                    display: true,
                    labelString: 'rowid'
                },
                stacked: true,
                type: 'linear',
                position: 'bottom',
                ticks: {
                    beginAtXZero: true
                },
            }]
        },
      responsive: true,
    }
  };
  
  var myChart;

//   ----- Change the chart type  ---------

  let line = document.getElementById('line')
  line.addEventListener('click', function() {
    config.options.showLines = true
    change('line')})
  
  let bar = document.getElementById('bar')
  bar.addEventListener('click', function() {
    config.options.showLines = true
    change('bar')})

  let scatter = document.getElementById('scatter')
  scatter.addEventListener('click', function() {
    config.options.showLines = !true
    change('scatter')})
  

  function change(newType) {

    var ctx = document.getElementById("canvas").getContext("2d");
  
// Remove the chart and the event listners 
    if (myChart) {
      myChart.destroy();
    }
  
    // Modify the Chart, pass a copy, with the new settings 
    var temp = config = (true, {}, config);
    temp.type = newType;
    myChart = new Chart(ctx, temp);
  };









