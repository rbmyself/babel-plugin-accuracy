
import pluginTester from 'babel-plugin-tester'
import arithmeticOverload from '../src/index'

pluginTester({
	pluginName: 'arithmetic-overload',
    plugin: arithmeticOverload,
    pluginOptions:{
        promiseCatch:true,
        
    },
  
    tests: [
 
       { code:
        `
        a.then(function(resolve){
            resolve()
        })
        `,output:
        `
        a.then(function (resolve) {
          resolve();
        }).catch(err => {
          console.error(err);
        });
        `

        }, {
            code:`
            a.then(function(resolve){
                resolve()
            }).then(()=>{
                return 0
            })
            `,output:
            `
            a.then(function (resolve) {
              resolve();
            }).then(() => {
              return 0;
            }).catch(err => {
              console.error(err);
            });
            `
        }, { code:
            `
            a.then(function (resolve) {
              resolve();
            }).catch(err => {
              console.error(err);
            });
            `,output:
            `
            a.then(function (resolve) {
              resolve();
            }).catch(err => {
              console.error(err);
            });
            `
    
            },
      ],
})