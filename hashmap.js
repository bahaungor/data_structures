function hashMap(initialCapacity = 16, loadFactor = 0.75) {
  let capacity = initialCapacity;
  let bucketSize = capacity;
  let threshold = Math.floor(capacity * loadFactor);
  let size = 0;
  let bucket = new Array(bucketSize).fill(null);

  function hash(key) {
      let hashCode = 0;
      const primeNumber = 31;
      for (let i = 0; i < key.length; i++) {
          hashCode = primeNumber * hashCode + key.charCodeAt(i);
          hashCode %= bucketSize;
      }
      return hashCode;
  }

  function resize() {
      const newCapacity = capacity * 2;
      const newBucket = new Array(newCapacity).fill(null);
      for (let i = 0; i < bucketSize; i++) {
          let currentNode = bucket[i];
          while (currentNode !== null) {
              const hashCode = hash(currentNode.key) % newCapacity;
              if (newBucket[hashCode] === null) {
                  newBucket[hashCode] = currentNode;
              } else {
                  let newNode = newBucket[hashCode];
                  while (newNode.next !== null) {
                      newNode = newNode.next;
                  }
                  newNode.next = currentNode;
              }
              const nextNode = currentNode.next;
              currentNode.next = null;
              currentNode = nextNode;
          }
      }
      bucket = newBucket;
      capacity = newCapacity;
      bucketSize = capacity;
      threshold = Math.floor(capacity * loadFactor);
  }

  function set(key, value) {
      const hashCode = hash(key);

      if (bucket[hashCode] === null) {
          bucket[hashCode] = { key: key, value: value, next: null };
          size++;
          if (size >= threshold) {
              resize();
          }
      } else {
          let currentNode = bucket[hashCode];
          while (currentNode.next !== null && currentNode.key !== key) {
              currentNode = currentNode.next;
          }
          if (currentNode.key === key) {
              // Update the value if the key already exists
              currentNode.value = value;
          } else {
              // Otherwise, add a new node to the end of the linked list
              currentNode.next = { key: key, value: value, next: null };
              size++;
              if (size >= threshold) {
                  resize();
              }
          }
      }
  }

  return { set };
}

let deneme = hashMap();
deneme.set("Bahadır", 42);
console.log(deneme);
