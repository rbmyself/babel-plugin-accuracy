
// require('source-map-support/register');
var  asyncWrap = require('./asyncWrap.js');
var wrap = asyncWrap.wrap
function pushCache(operation,state){
    var operationFun;
    switch(operation){
        case '+':
            operationFun = 'accAdd';
            break;
        case '-':
            operationFun = 'accSub';
            break;
        case '*':
            operationFun = 'accMul';
            break;
        case '/':
            operationFun = 'accDiv';
            break;
        case '+=':
            operationFun = 'accAdd';
            break;
        case '-=':
            operationFun = 'accSub';
            break;
        default: 
            operationFun = 'none';
    }
    if(state.opts && !!state.opts['checkCong'] &&(operation === '===')){
        operationFun = 'accCong'
    }
    if(needRequireCache.indexOf(operationFun)>=0) return operationFun;
    operationFun !== 'none' && needRequireCache.push(operationFun);
    return operationFun;
}
function alreadyWrapped (node,t) {
    let body = node.body.body;
    return body && body.length === 1 && t.isTryStatement(body[0]);
}
var needRequireCache = [];

function exactCal(babel){
    var t = babel.types;
    var template = babel.template;
    var preOperationAST = template('FUN_NAME(ARGS)');
    var requireAST = template('var PROPERTIES = require(SOURCE)');
    function preObjectExpressionAST(keys){
        var properties = keys.map(function(key){
            return t.objectProperty(t.identifier(key),t.identifier(key), false, true);
        });
        return t.ObjectPattern(properties);
    }

    return {
        visitor:{
            NewExpression:{
                exit:function(path){
                    var callee = path.node.callee
                    if(t.isIdentifier(callee)&&callee.name =="Date"&&path.node.arguments[0]&&path.node.arguments[0].value){
                        var replaceTem = template("LITERAL.replace(/-/g, '/')");
                       
                       var newpath =  t.newExpression(path.node.callee,[replaceTem({LITERAL: t.stringLiteral(path.node.arguments[0].value)} ).expression ])
                        path.replaceWith(newpath )
                    }
                }
            },
            CallExpression:{
                exit: function(path,state){
                    if(state.opts && !state.opts['promiseCatch'] ){
                        return 
                    }
                    var node  = path.node             
                    if(path.parentPath&&path.parentPath.parent&&t.isCallExpression(path.parentPath.parent)){                  
                        return
                    }                
                    var   memberExpression= t.memberExpression
                    var  callExpression= t.callExpression
                    var   blockStatement= t.blockStatement
                    var  arrowFunctionExpression= t.arrowFunctionExpression
                    var consoleerrTemp = template.ast('console.error(err)');               
                    if (t.isIdentifier(node.callee.property) &&node.callee.property.name === 'then') {
                        var arrowFunc = arrowFunctionExpression([t.identifier('err')], blockStatement([consoleerrTemp]))
                        var originFunc = callExpression(node.callee, node.arguments)
                        var newFunc = memberExpression(originFunc, t.identifier('catch'))
                        var newp = callExpression(newFunc,[arrowFunc])                     
                        path.replaceWith(newp)
                        path.skip() 
                    }
                }
            },
            Function(path,state) { 
                if(state.opts && !state.opts['addAsyncTry'] ){
                    return 
                }                
                var  node= path.node
                if (node.async && !alreadyWrapped(node,t)) {
                    node.body = wrap(node.body);
                }            
            },
            Program: {
                exit: function(path){
                    if(needRequireCache.length<=0) return;
                    var directives = path.node.directives;
                    if(directives[0] && directives[0].value.value=='calc polyfill'){
                        return;
                    }
                    path.unshiftContainer('body', requireAST({
                        PROPERTIES: preObjectExpressionAST(needRequireCache),
                        SOURCE: t.stringLiteral("babel-plugin-accuracy/src/calc.js")
                    }));
                    needRequireCache = [];
                }
            },
            BinaryExpression: {
                exit: function(path,state){
                    var Program = path.findParent(path => t.isProgram(path.node));
                    var directives = Program.node.directives;
                    var replaceOperator = pushCache(path.node.operator,state);
                    if(directives[0] && directives[0].value.value=='calc polyfill'){
                        return;
                    }
                    replaceOperator !== 'none' && path.replaceWith(
                        preOperationAST({
                            FUN_NAME: t.identifier(replaceOperator),
                            ARGS: [path.node.left, path.node.right]
                        })
                    );
                }
            },
            AssignmentExpression: {
                exit: function(path, state){
                    var Program = path.findParent(path => t.isProgram(path.node));
                    var directives = Program.node.directives;
                    var replaceOperator = pushCache(path.node.operator,state);
                    if(directives[0] && directives[0].value.value=='calc polyfill'){
                        return;
                    }
                    if(replaceOperator !== 'none'){
                        path.node.right = t.CallExpression(t.Identifier(replaceOperator), [path.node.left, path.node.right]);
                        path.node.operator = '=';
                    }
                }
            }
        }
    }
}

module.exports = exactCal;