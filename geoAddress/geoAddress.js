const request = require('request');
var weather = require('../playground/weather-app');

var getAddress = (addressString) => {

var address = encodeURIComponent(addressString);
return new Promise ((resolve,reject) => {

    request(
        {
            url:`https://maps.googleapis.com/maps/api/geocode/json?address=${address}`,
            json:true
        },(error,response,body) => {
            if(error)
            {
                console.log(1);
                reject('Cannot fetch data from servers');
            }
            else if(body.status === 'ZERO_RESULTS')
            {
                console.log(2);
                reject('No address found');
            }
            else if(body.status === 'OK')
            {
                console.log(3);
                exactAddress = {
                    Address:body.results[0].formatted_address,
                    Latitude:body.results[0].geometry.location.lat,
                    Longitude:body.results[0].geometry.location.lng
                }            
                weather.getWeather(exactAddress).then((data) => {
                        //console.log(data);
                        resolve(data);
                }),(errorMessage)=>{
                    reject(errorMessage);
                }; 
            }
        });
    })
}

module.exports.getAddress = getAddress;