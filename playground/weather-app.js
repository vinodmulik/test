const request = require('request');

var getWeather = (address,callBack) => {
    request({
        url:`https://api.darksky.net/forecast/ebdcd5d7e5d906c24975949dd76243d7/${address.Latitude},${address.Longitude}?units=si`,
        json:true
    },(err,resp,data) => {
        if(!err && resp.statusCode === 200)
        {
            details = { 
                temp:data.currently.temperature,
                desc:data.currently.summary
            }
            callBack(undefined,details);
        }
        else{
            callBack('cannot fetch data due to connectivity issues');
        }
    });
}

module.exports.getWeather = getWeather;