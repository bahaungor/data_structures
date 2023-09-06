function fibs(n){
    if (n==0) return []
    if (n==1) return [0]
    if (n==2) return [0, 1]
    const prevArray =  fibs(n-1)
    prevArray.push(prevArray[prevArray.length - 1] + prevArray[prevArray.length - 2])
    return prevArray
}

console.log(fibs(9))