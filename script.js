const fs = require('fs')

console.log("Json-to-Csv");

const dataToWrite = JSON.stringify([{name: 'max'}])

fs.writeFile('./customers.csv', dataToWrite, (err)=>{
    if(err) return console.log('error occurred', err)
    console.log('data was successfully saved')
})