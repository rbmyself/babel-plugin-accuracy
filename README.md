# babel-plugin-accuracy
用于项目容错

## Contents
1.  解决浮点数的计算精度问题
2. 全等号问题
当项目中===的不相等，但是双等相等时，会抛出警告，避免隐藏的类型变化造成的问题
3. async函数中增加try catch
4. promise 最后一个then后面增加catch


## Installation and Usage
```
npm install rbmyself/babel-plugin-accuracy --save-dev
```
## 添加rbmyself/babel-plugin-accuracy

.babelrc  
["rbmyself/babel-plugin-accuracy",options]
## option
1. checkCong：检查全等号
2. addAsyncTry：async函数中增加try catch
3. promiseCatch： promise 最后一个then后面增加catch

## example
```
{
	"plugins": [
        ["rbmyse/babel-plugin-accuracy",{checkCong:true}]
    ]
}
```
