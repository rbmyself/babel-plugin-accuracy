'calc polyfill'

function accAdd(arg1, arg2) {
    // 防止字符串拼接
    if((typeof (arg1 + arg2)) !== 'number' || isNaN((arg1 + arg2))||arg1===null || arg2 ===null){
        return arg1 + arg2;
    }
    arg1 =Number(arg1);
    arg2=Number(arg2)
    var r1, r2, m, c;
    try {
        r1 = arg1.toString().split(".")[1].length;
    }
    catch (e) {
        r1 = 0;
    }
    try {
        r2 = arg2.toString().split(".")[1].length;
    }
    catch (e) {
        r2 = 0;
    }
    c = Math.abs(r1 - r2);
    m = Math.pow(10, Math.max(r1, r2));
    if (c > 0) {
        var cm = Math.pow(10, c);
        if (r1 > r2) {
            arg1 = Number(arg1.toString().replace(".", ""));
            arg2 = Number(arg2.toString().replace(".", "")) * cm;
        } else {
            arg1 = Number(arg1.toString().replace(".", "")) * cm;
            arg2 = Number(arg2.toString().replace(".", ""));
        }
    } else {
        arg1 = Number(arg1.toString().replace(".", ""));
        arg2 = Number(arg2.toString().replace(".", ""));
    }
    return (arg1 + arg2) / m;
}

function accSub(arg1, arg2) {
    if((typeof (arg1 - arg2)) !== 'number' || isNaN((arg1 - arg2))||arg1===null || arg2 ===null){
        return arg1 - arg2;
    }
    arg1 =Number(arg1);
    arg2=Number(arg2)
    var r1, r2, m, n;
    try {
        r1 = arg1.toString().split(".")[1].length;
    }
    catch (e) {
        r1 = 0;
    }
    try {
        r2 = arg2.toString().split(".")[1].length;
    }
    catch (e) {
        r2 = 0;
    }
    m = Math.pow(10, Math.max(r1, r2)); 
    n = (r1 >= r2) ? r1 : r2;
    return Number(((arg1 * m - arg2 * m) / m).toFixed(n));
}

function accMul(arg1, arg2) {
    if((typeof (arg1 * arg2)) !== 'number' || isNaN((arg1 * arg2))||arg1===null || arg2 ===null){
        return arg1 * arg2;
    }
    arg1 =Number(arg1);
    arg2=Number(arg2)
    var m = 0, s1 = arg1.toString(), s2 = arg2.toString();
    try {
        m += s1.split(".")[1].length;
    }
    catch (e) {
    }
    try {
        m += s2.split(".")[1].length;
    }
    catch (e) {
    }
    return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m);
}

function accDiv(arg1, arg2) {
    if((typeof (arg1 / arg2)) !== 'number' || isNaN((arg1 / arg2))||arg1===null || arg2 ===null){
        return arg1 / arg2;
    }
    arg1 =Number(arg1);
    arg2=Number(arg2)
    var t1 = 0, t2 = 0, r1, r2;
    try {
        t1 = arg1.toString().split(".")[1].length;
    }
    catch (e) {
    }
    try {
        t2 = arg2.toString().split(".")[1].length;
    }
    catch (e) {
    }
    r1 = Number(arg1.toString().replace(".", ""));
    r2 = Number(arg2.toString().replace(".", ""));
    return (r1 / r2) * Math.pow(10, t2 - t1);
}
function accCong(arg1, arg2) {
  
    if(arg1 == arg2){
        console.error(`参数类型不一致，值为:${arg1}、${arg2}，类型为：${typeof arg1}、${typeof arg2}`)
       
    }
    return (arg1 === arg2);
}

module.exports = {
    accAdd:accAdd,
    accSub:accSub,
    accMul:accMul,
    accDiv:accDiv,
    accCong:accCong
}