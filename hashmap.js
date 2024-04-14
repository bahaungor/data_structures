function hashMap(){
  let bucketSize = 8;
  let loadFactor = 0.7;
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
    console.log("set called")
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
  return { set }
}

deneme = hashMap()
let we = deneme.set("Bahadır", "Ungor")
we =deneme.set("asd", "qwe")
we =deneme.set("wererg", "ntyrtr")
we =deneme.set("vsfddw", "wervxc")
we =deneme.set("123123", "123123")
we =deneme.set("qewqe112", "12312dasda")
we =deneme.set("sdasqw", "vsvs32")
we =deneme.set("vsdfsfd", "adasdwww")

console.log(we)