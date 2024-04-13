function hashMap(){
  let bucketSize = 16
  let loadFactor = 0.99
  let size = 0
  
  let bucket = new Array(bucketSize)

  function hash(key) {
      let hashCode = 0;
          
      const primeNumber = 31;
      for (let i = 0; i < key.length; i++) {
        hashCode = primeNumber * hashCode + key.charCodeAt(i);
        hashCode %= bucketSize
      }
    
      return hashCode;
  }

  function resize(){
    
  }

  function set(key, value) {
    if (size/bucketSize > loadFactor) resize()
    const hashCode = hash(key)

    if (!bucket[hashCode] || !bucket[hashCode].length){
      bucket[hashCode].push({ key, value, next:null })
      size++
    } else {
        let currentNode = bucket[hashCode][0];

        while (currentNode.next !== null || currentNode.key === key){
          if (currentNode.key === key){
            currentNode.value = value
          } else {
            currentNode = currentNode.next
          }
        }

        currentNode.next = { key, value, next:null }
        size++
    }
  

  }
  return {set}
}

deneme = hashMap()
console.log(deneme.hash("Bahadır"))