const request = require('request');

getAddress = (addressString,callBack) => {

var address = encodeURIComponent(addressString);

request(
    {
        url:`https://maps.googleapis.com/maps/api/geocode/json?address=${address}`,
        json:true
    },(error,response,body) => {
        //console.log(JSON.stringify(body,undefined,2));
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
            //console.log(exactAddress.Address);
            request({
                url:`https://api.darksky.net/forecast/ebdcd5d7e5d906c24975949dd76243d7/${exactAddress.Latitude},${exactAddress.Longitude}?units=si`,
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
    });
}

module.exports.getAddress = getAddress;