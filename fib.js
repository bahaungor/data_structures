function fibs(n){
    let arr = [0]
    if(n>=1) arr.push(1)
    for (let i = 1; i < n; i++) {
        arr.push(arr[i-1]+arr[i])
    } 
    return arr
}

console.log(fibs(6))

function fibsRec(n){
    if (n == 0) return [0]
    if (n == 1) return [0, 1]
    const arr = fibsRec(n - 1)
    return [...arr, arr[n-1] + arr[n-2]]
}

console.log(fibsRec(5))
