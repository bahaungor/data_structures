function mergeSort(arr){
    if (arr.length < 2){
        return arr
    }

    const left = arr.slice(0, arr.length / 2);
    const right = arr.slice(arr.length / 2);

    return merge(mergeSort(left), mergeSort(right));
}

function merge(left, right) {
    let result = [];
    let leftIndex = 0;
    let rightIndex = 0;
  
    // Compare elements from the left and right arrays
    while (leftIndex < left.length && rightIndex < right.length) {
      if (left[leftIndex] < right[rightIndex]) {
        result.push(left[leftIndex]);
        leftIndex++;
      } else {
        result.push(right[rightIndex]);
        rightIndex++;
      }
    }
  
    // Concatenate any remaining elements
    return result.concat(left.slice(leftIndex), right.slice(rightIndex));
}