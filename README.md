# babel-plugin-accuracy
用于项目容错

## 功能
### 解决浮点数的计算精度问题
### 全等号问题
当项目中===的不相等，但是双等相等时，会抛出警告，避免隐藏的类型变化造成的问题
### async函数中增加try catch
### promise 最后一个then后面增加catch


### 用法

npm install rbmyself/babel-plugin-accuracy --save-dev

## 添加rbmyself/babel-plugin-accuracy

.babelrc中
["rbmyse/babel-plugin-accuracy",options]
### option
checkCong：检查全等号
addAsyncTry：async函数中增加try catch
promiseCatch： promise 最后一个then后面增加catch
示例
```
{
	"plugins": [
        ["rbmyse/babel-plugin-accuracy",{checkCong:true}]
    ]
}
```
