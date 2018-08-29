const request = require('request');
var weather = require('../playground/weather-app');

getAddress = (addressString,callBack) => {

var address = encodeURIComponent(addressString);

request(
    {
        url:`https://maps.googleapis.com/maps/api/geocode/json?address=${address}`,
        json:true
    },(error,response,body) => {
        if(error)
        {
            callBack('Cannot fetch data from servers');
        }
        else if(body.status === 'ZERO_RESULTS')
        {
            callBack('No address found');
        }
        else if(body.status === 'OK')
        {
            exactAddress = {
                Address:body.results[0].formatted_address,
                Latitude:body.results[0].geometry.location.lat,
                Longitude:body.results[0].geometry.location.lng
            }            
            weather.getWeather(exactAddress,(error,data) => {
                if(error)
                {
                    callBack(error);
                }
                else{
                    callBack(undefined,data);
                }
            });
            
        }
    });
}

module.exports.getAddress = getAddress;