const http = require('http');
const fs = require('fs');
const qs = require('qs');

const sever = http.createServer((req, res) => {
    if (req.method === 'GET') {
        fs.readFile('./calculator.html', (err, data) => {
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.write(data);
            return res.end();
        });
    } else {
        let dataString = ''
        req.on('data', chunk => {
            dataString += chunk
        })
        req.on('end', () => {
            let userInfo = qs.parse(dataString);
            fs.readFile('./result.html', 'utf8', (err, data) => {
                if (err) {
                    console.log(err)
                }
                let result = eval(userInfo.number1 + userInfo.cal + userInfo.number2)

                data = data.replace('{number1}', userInfo.number1)
                data = data.replace('{number2}', userInfo.number2)
                data = data.replace('{cal}', userInfo.cal)
                data = data.replace('{result}', result)
                res.writeHead(200, {'Content-Type': 'text/html'})
                res.write(data);
                return res.end();
            })
        })
        req.on('error', () => {
            console.log('error')
        })
    }
})
sever.listen(8080, () => {
    console.log('calculator is running')
})