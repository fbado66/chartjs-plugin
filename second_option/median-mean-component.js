//   ---------- Global variables to help when appending the information onto the DOM
let headers = document.querySelector('.main_headers')
let table_body = document.querySelector('.table_body')
let slapFinalResultOnDom = document.querySelector('.result')
let slapMeanOnDom = document.querySelector('.mean')

let removeRowid = document.querySelector('.removeRowid')
let closeOption = document.createElement('div')

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

            if (header === 'rowid'|| header === 'Appearances' || header === 'Year' || header === 'Years since joining') {
            
                // let medianMean = document.createElement('div')
                //     medianMean.className = 'median_mean'
                //     headers.append(medianMean)

            
                let median = document.createElement('btn')
                    median.className = header
                    median.innerHTML = 'Median'
                    headers.append(median)

            
                let mean = document.createElement('btn')
                    mean.id = header
                    mean.innerHTML = 'Mean'
                    headers.append(mean)
                
            }

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


let arrayOfIntsValues = []
let arrayOfrowIds = []
let arrayOfAppearances = []
let arrayOfYear = []
let arrayOfYearsSinceJoining = []


setTimeout(() => {

    alldata.map(option => {

        // To generate each array that holds int information where I can use median and Mean operations, I would create two loops as follow 

        // let sizeOfColumns = Object.values(option)[0]
        // for (let i = 0; i < Object.keys(sizeOfColumns).length; i++){
        //         if (Object.values(sizeOfColumns)[i] === parseInt(Object.values(sizeOfColumns)[i], 10)){
        //             let keyOnColumn = Object.keys(sizeOfColumns)[i]
        //             for (let j = 0; j < Object.values(option).length; j++ ){
        //                 console.log(Object.values(option)[j].keyOnColumn)
        //             }
        //     }
        // }

        // --- INSTEAD I AM GOING WITH A MORE STATIC APPROACH -----------
        let sizeOfColumns = Object.values(option)[0]
        for (let i = 0; i < Object.keys(sizeOfColumns).length; i++){
                if (Object.values(sizeOfColumns)[i] === parseInt(Object.values(sizeOfColumns)[i], 10)){
                    arrayOfIntsValues.push(Object.keys(sizeOfColumns)[i])
                }
        }

        // ---------- Populating the data into each array --------------------
        let dataArraySize = Object.keys(option).length
        for (let j = 0; j < dataArraySize; j++){
            arrayOfrowIds.push(Object.values(option)[j].rowid)
            arrayOfAppearances.push(Object.values(option)[j].Appearances)
            arrayOfYear.push(Object.values(option)[j].Year)
            arrayOfYearsSinceJoining.push(Object.values(option)[j]['Years since joining'])  
        }

    })
   
},100)


// ADDING EVENT LISTENERS FOR ACTION ON MEDIAN 
setTimeout(() => {
    let rowid = document.querySelector('.rowid')
        rowid.addEventListener('click', () => {
            // let closeOption = document.createElement('div')
                closeOption.innerText = 'X'
                closeOption.className = 'removeRowid'
                slapFinalResultOnDom.append(closeOption)
                median(arrayOfrowIds)


                // I am struggling here to remove the event, I want to create the elements dynamically, but then when I need to specify which one is the one to target to remove the msContentScript, I am struggling 
                
                // Remove Event
                closeOption.addEventListener('click', (evt) => {
                    console.log(evt)
                    closeOption.innerText = ''
                    
                })
            },
            {once : true}   
            
        )

    let apperances = document.querySelector('.Appearances')
        apperances.addEventListener('click', () => {
            closeOption.innerText = 'X'
                closeOption.className = 'Appearances'
                slapFinalResultOnDom.append(closeOption)
                median(arrayOfAppearances)
            },
            {once : true}
        )

    let year = document.querySelector('.Year')
        year.addEventListener('click', () => {
                median(arrayOfYear)
            },
            {once : true}
        )

    let yearsJoining = document.querySelector('.Years')
        yearsJoining.addEventListener('click', () => {
                median(arrayOfYearsSinceJoining)
            },
            {once : true}
        )
}, 150);



// ADDING EVENT LISTENERS FOR ACTION ON MEAN 
setTimeout(() => {
    let rowidmean = document.querySelector('#rowid')
    console.log(rowidmean)
        rowidmean.addEventListener('click', () => {
                mean(arrayOfrowIds)
            },
            {once : true}   
        )

    let apperancesmean = document.querySelector('#Appearances')
        apperancesmean.addEventListener('click', () => {
                mean(arrayOfAppearances)
            },
            {once : true}
        )

    let yearmean = document.querySelector('#Year')
        yearmean.addEventListener('click', () => {
                mean(arrayOfYear)
            },
            {once : true}
        )

    let yearsJoiningmean = document.querySelector('#Years\\ since\\ joining')
        yearsJoiningmean.addEventListener('click', () => {
                mean(arrayOfYearsSinceJoining)
            },
            {once : true}
        )

}, 150);




let finalResult = 0


// ------------ MEDIAN FUNCTION ----------------------
const median = array => {
    let middle = Math.floor(array.length / 2)
    let nums = [...array].sort((a, b) => a - b)
    let final = array.length % 2 !== 0 ? nums[middle] : Math.floor((nums[middle -1] + nums[middle]) / 2)
    finalResult = final
        
        function checkValue(value) {
            return value == finalResult
        }

        let slapArrayOnDom = array.filter(checkValue)
        // check for cases where the value is not included on the array 
            if (!slapArrayOnDom.length > 0) {
                let finalresult = document.createElement('p')
                    finalresult.innerText = finalResult
                    slapFinalResultOnDom.append(finalresult)
            }

        slapArrayOnDom.forEach(el => {
            let finalresult = document.createElement('p')
            finalresult.className = el
            finalresult.innerText = 'median is' + ' ' + el
            slapFinalResultOnDom.append(finalresult)
        })
    return final
}


// ----------- MEAN FUNCTION -------------------
const mean = array => {
    let totalSum = 0
    for (let num in array) {
            totalSum += array[num]
    }
    let numsCnt = array.length
    let meanFinal = totalSum / numsCnt

    let meanResult = document.createElement('p')
        meanResult.id = meanFinal
        meanResult.innerText = `mean is` + ' ' + meanFinal
        slapMeanOnDom.append(meanResult)

        return meanFinal
}











