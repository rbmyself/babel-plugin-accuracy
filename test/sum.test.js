// import {accAdd, accSub, accMul, accDiv} from '../src/calc.js'
// // 2.59999
// test('adds 1.2 + 1.4 to equal 2.6', () => {
//     expect(accAdd(1.2,1.4)).toBe(2.6);
// });
// // 字符串 1.2加1.4
// test('adds 1.2 + 1.4 to equal 2.6', () => {
//     expect(accAdd('1.2','1.4')).toBe(2.6);
// });
// // 
// test('adds null + 1.4 to equal 2.6', () => {
//     expect(accAdd(null,1.4)).toBe(1.4);
// });
import pluginTester from 'babel-plugin-tester'
import arithmeticOverload from '../src/index'

pluginTester({
	pluginName: 'arithmetic-overload',
    plugin: arithmeticOverload,
    pluginOptions:{
        checkCong:true
    },
    // snapshot: true,
    tests: [
        // {code: '"hello";', snapshot: false},
        // {
        //   code: 'var hello = "hi";',
        //   output: 'var olleh = "hi";',
        // },
       { code:`
        function a(b,c){
            console.log(0.1+0.2)
            if(b===c){
                return 0
            }
        }
        `,

    //     output:`
    //     function asyncError (error) {
    //         console.error('error:', error);
    //     }
        
       
    // `,
    snapshot: false,}, 
      ],
})