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
    if (n==0) return []
    if (n==1) return [0]
    if (n==2) return [0, 1]
    const prevArray =  fibs(n-1)
    prevArray.push(prevArray[prevArray.length - 1] + prevArray[prevArray.length - 2])
    return prevArray
}

console.log(fibsRec(9))
