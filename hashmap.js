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

  function remove(key){
    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i].length > 0){
        let currentNode = bucket[i][0]
        while (currentNode !== null){
          if(currentNode.key === key) {
            currentNode = currentNode.next;
            size--;
            bucket[i] = []
            if (currentNode !== null) bucket[i].push(currentNode)
            return true
          } else {
            currentNode = currentNode.next
          }
        }
      }
    }
    return false
  }

  const length = () => size

  function clear(){
    bucket = null
    bucket = Array(bucketSize).fill(null).map(() => []);
  }

  function keys(){
    let keys = []
    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i].length > 0){
        let currentNode = bucket[i][0]
        while (currentNode !== null){
          keys.push(currentNode.key)
          currentNode = currentNode.next;
        }
      }
    }
    return keys;
  }

  function values(){
    let values = []
    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i].length > 0){
        let currentNode = bucket[i][0]
        while (currentNode !== null){
          values.push(currentNode.value)
          currentNode = currentNode.next;
        }
      }
    }
    return values;
  }

  function entries(){
    let entries = []
    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i].length > 0){
        let currentNode = bucket[i][0]
        while (currentNode !== null){
          entries.push([currentNode.key, currentNode.value])
          currentNode = currentNode.next;
        }
      }
    }
    return entries;
  }

  return { set, get, has, remove, length, clear, keys, values, entries }
}

deneme = hashMap()
deneme.set("Bahadır", "Ungor")
deneme.set("asd", "qwe")
deneme.set("wererg", "ntyrtr")
deneme.set("vsfddw", "wervxc")
deneme.set("123123", "123123")
deneme.set("qewqe112", "12312dasda")
deneme.set("sdasqw", "vsvs32")
deneme.set("aliveli", "adasdwww")
console.log(deneme.remove("aliveli"))
console.log(deneme.length())
console.log(deneme.entries())