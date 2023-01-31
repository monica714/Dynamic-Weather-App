const http = require('http');
const fs = require('fs');
var requests = require('requests');



const homeFile = fs.readFileSync('home.html', 'utf-8');

const replaceVal=(tempVal,orgVal)=>{
 let temperature=tempVal.replace("{%tempval%}",orgVal.main.temp);
 temperature=temperature.replace("{%tempmin%}",orgVal.main.temp_min);
 temperature=temperature.replace("{%tempmax%}",orgVal.main.temp_max);
 temperature=temperature.replace("{%location%}",orgVal.name);
 temperature=temperature.replace("{%country%}",orgVal.sys.country);
 temperature=temperature.replace("{%tempstatus%}",orgVal.weather[0].main);
 
 return temperature;
}

const server = http.createServer((req, res) => {
    if (req.url = '/') {
        requests('https://api.openweathermap.org/data/2.5/weather?q=Vadodara&appid=f3c4708b8f7864c54edcfa1df0b17886&lang=PT&units=metric')
            .on('data', (chunk)=> { 
                const objData=JSON.parse(chunk);``
               
                const arrData=[objData];
                const realTimeVal=arrData.map((val)=>{
                return replaceVal(homeFile,val); 
                
                    
                }).join(" ");
                res.writeHead(200, {'Content-Type': 'text/html'});
           
                res.write(realTimeVal);
                res.end();

                
                
                
              
                
            })
            .on('end', (err)=> {
                if (err) return console.log('connection closed due to errors', err);
             
            });

   
        
    }
    else{
        res.end('file not found');
    }
});
server.listen(8080,'127.0.0.1');