
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
        new Date('1982-12-2')
        `,output:
        `
        new Date("1982-12-2".replace(/-/g, '/'));
        `

        }, 
      ],
})