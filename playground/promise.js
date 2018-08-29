const func = new Promise((resolve,reject) => {
    setTimeout(() => {
        //resolve('Hello promise');
        reject('Sorry , promise failed');
    },2500);
});

func.then((message) => {
    console.log(`Success: ${message}`);
},(errorMessage) => {
    console.log(`Failure: ${errorMessage} `);
});