
import pluginTester from 'babel-plugin-tester'
import arithmeticOverload from '../src/index'

pluginTester({
	pluginName: 'arithmetic-overload',
    plugin: arithmeticOverload,
    pluginOptions:{
        addAsyncTry:true
    },
  
    tests: [
 
       { code:
        `
        async function printFile (filename) {   
            let contents = await fs.readFileAsync(filename, 'utf8');
            console.log(contents);    
        }
        async (filename)=>   {
            let contents = await fs.readFileAsync(filename, 'utf8');
            console.log(contents);    
        }
        `,output:
        `
        async function printFile(filename) {
          try {
            let contents = await fs.readFileAsync(filename, 'utf8');
            console.log(contents);
          } catch (error) {
            console.error(this, error);
          }
        }

        async filename => {
          try {
            let contents = await fs.readFileAsync(filename, 'utf8');
            console.log(contents);
          } catch (error) {
            console.error(this, error);
          }
        };
        `

        }, {code:
        `
        async function printFile(filename) {
            try {
              let contents = await fs.readFileAsync(filename, 'utf8');
              console.log(contents);
            } catch (error) {
              console.error(this, error);
            }
          }
        `,output:
        `
        async function printFile(filename) {
          try {
            let contents = await fs.readFileAsync(filename, 'utf8');
            console.log(contents);
          } catch (error) {
            console.error(this, error);
          }
        }
        `}
      ],
})