const yargs = require('yargs');
const geoAddress = require('./geoAddress/geoAddress');

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

/* geoAddress.getAddress(argv.a,(error,data) => {
    if(error)
    {
        console.log(error);
    }
    else{
        console.log(JSON.stringify(data,undefined,2));
    }
}); */

geoAddress.getAddress(argv.a).then((data) => {

    console.log(JSON.stringify(data,undefined,2));
},(errorMessage) => {
    console.log(errorMessage);
}) 