function hashMap(){
  let bucketSize = 16;
  let loadFactor = 0.9;
  let size = 0;
  
  let bucket = Array(bucketSize).fill(null).map(() => []);

  function hash(key) {
      let hashCode = 0;
          
      const primeNumber = 31;
      for (let i = 0; i < key.length; i++) {
        hashCode = primeNumber * hashCode + key.charCodeAt(i);
        hashCode %= bucketSize;
      }
    
      return hashCode;
  }

  function resize(){
    bucketSize *= 2;
    let newBucket = new Array(bucketSize).fill(null).map(() => []);
    console.log(size)
    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i].length > 0){
        let currentNode = bucket[i][0];
        
        while(currentNode !== null){
          const hashCode = hash(currentNode.key)
          if (newBucket[hashCode].length === 0){
            newBucket[hashCode].push({ key:currentNode.key, value:currentNode.value, next:null })
          } else {
            currentNode.next = { key:currentNode.key, value:currentNode.value, next:null }
          }
          currentNode = currentNode.next;
        }
        
      }
    }

    return newBucket
  }

  function set(key, value) {
    if (size/bucketSize > loadFactor) {
      bucket = resize()
    }
    const hashCode = hash(key)

    if (!bucket[hashCode] || !bucket[hashCode].length){
      bucket[hashCode].push({ key, value, next:null });
      size++;
    } else {
        let currentNode = bucket[hashCode][0];

        while (currentNode.next !== null || currentNode.key === key){
          if (currentNode.key === key){
            currentNode.value = value;
            return;
          } else {
            currentNode = currentNode.next
          }
        }

        currentNode.next = { key, value, next:null }
        size++
    }
  }

  function get(key){
    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i].length > 0){
        let currentNode = bucket[i][0]
        while (currentNode !== null){
          if (currentNode.key === key) {
            return currentNode.value
          } else {
            currentNode = currentNode.next
          }
        }
      }
    }
    return null
  }

  function has(key){
    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i].length > 0){
        let currentNode = bucket[i][0]
        while (currentNode !== null){
          if (currentNode.key === key) {
            return true
          } else {
            currentNode = currentNode.next
          }
        }
      }
    }
    return false
  }

  return { set, get, has }
}

deneme = hashMap()
deneme.set("Bahadır", "Ungor")
deneme.set("asd", "qwe")
deneme.set("wererg", "ntyrtr")
deneme.set("vsfddw", "wervxc")
deneme.set("123123", "123123")
deneme.set("qewqe112", "12312dasda")
deneme.set("sdasqw", "vsvs32")
deneme.set("vsdfsfd", "adasdwww")
console.log(deneme.get("vsdfsfd"))
