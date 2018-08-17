const request = require('request');
const yargs = require('yargs');

const argv = yargs.options(
    {
        a:{
            demand:true,
            describe:'Address to be fetched',
            alias:'address',
            string:true
        }
    }).help()
    .alias('help','h')
    .argv;

const address = encodeURIComponent(argv.a);


request(
    {
        url:`https://maps.googleapis.com/maps/api/geocode/json?address=${address}`,
        json:true
    },(error,response,body) => {
        //console.log(JSON.stringify(body,undefined,2));
        console.log(body.results[0].formatted_address);
        console.log(`Latitude : ${body.results[0].geometry.location.lat}`);
        console.log(`Longitude : ${body.results[0].geometry.location.lng}`);
    });