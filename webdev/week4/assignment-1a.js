//? Create a custom nodejs CLI

const fs = require('fs')

function countLines(filename) {
    fs.readFile(filename, 'utf-8', function(err, data) {
        let total = 0;
        for (let i=0; i<data.length; i++) {
            if (data[i] === " ") {
                total++
            }
        }
        console.log(`The file has ${total} lines`)
    })
}


function countWords(filename) {
    fs.readFile(filename, 'utf-8', function(err, data) {
        data = data.split(" ")
        let total = data.length;
        data.forEach((word) => {
            if (word.includes("\n")) {
                total++
            }
        })
        console.log(`The file has ${total} words`)
    })
}

function main() {
    if (process.argv[2] === '-h') {
        console.log('Usage: node assignment-1a.js [command] [filename]')
        console.log('Commands:')
        console.log('  count-lines: count the number of lines in a file')
        console.log('  count-words: count the number of words in a file')
    }

    if (process.argv[2] === 'count-lines') {
        countLines(process.argv[3])
        return
    }
    
    if (process.argv[2] === 'count-words') {
        countWords(process.argv[3])
        return
    }

    console.log('Invalid command')
}

main()