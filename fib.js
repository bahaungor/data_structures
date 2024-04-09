function fibs(n){
    let arr = [0]
    if(n>=1) arr.push(1)
    for (let i = 1; i < n; i++) {
        arr.push(arr[i-1]+arr[i])
    } 
    return arr
}

console.log(fibs(6))

function fibsRec(n) {
    if (n === 0) return [0];
    if (n === 1) return [0, 1];
    let arr = fibsRec(n - 1);
    arr.push(arr[arr.length - 1] + arr[arr.length - 2]);
    return arr;
}

console.log(fibsRec(6));
