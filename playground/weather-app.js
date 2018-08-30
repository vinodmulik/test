const request = require('request');

var getWeather = (address) => {

   return new Promise((resolve,reject) => {

    request({
        url:`https://api.darksky.net/forecast/ebdcd5d7e5d906c24975949dd76243d7/${address.Latitude},${address.Longitude}?units=si`,
        json:true
    },(err,resp,dat) => {
        if(!err && resp.statusCode === 200)
        {
            
            details = { 
                temp:dat.currently.temperature,
                desc:dat.currently.summary
            }
            //console.log(details.desc);
            resolve(details); 
        }
        else{
            reject('cannot fetch data due to connectivity issues');
        }
    });

   }) 
    
}

module.exports.getWeather = getWeather;