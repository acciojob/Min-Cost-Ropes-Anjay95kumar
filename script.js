function mincost(arr) {
    if (arr.length <= 1) return 0;

    // Helper function to maintain the min-heap property
    function heapify(arr, n, i) {
        let smallest = i;
        let left = 2 * i + 1;
        let right = 2 * i + 2;

        if (left < n && arr[left] < arr[smallest]) smallest = left;
        if (right < n && arr[right] < arr[smallest]) smallest = right;
        
        if (smallest !== i) {
            [arr[i], arr[smallest]] = [arr[smallest], arr[i]];
            heapify(arr, n, smallest);
        }
    }

    // Function to build the heap
    function buildHeap(arr) {
        let n = arr.length;
        for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
            heapify(arr, n, i);
        }
    }

    // Insert new element in the heap
    function insertHeap(arr, value) {
        arr.push(value);
        let i = arr.length - 1;
        while (i !== 0 && arr[Math.floor((i - 1) / 2)] > arr[i]) {
            [arr[i], arr[Math.floor((i - 1) / 2)]] = [arr[Math.floor((i - 1) / 2)], arr[i]];
            i = Math.floor((i - 1) / 2);
        }
    }

    // Remove and return the minimum element from the heap
    function extractMin(arr) {
        let n = arr.length;
        if (n === 0) return Number.MAX_VALUE;
        if (n === 1) return arr.pop();

        let root = arr[0];
        arr[0] = arr.pop();
        heapify(arr, arr.length, 0);
        return root;
    }

    buildHeap(arr);

    let totalCost = 0;

    while (arr.length > 1) {
        let first = extractMin(arr);
        let second = extractMin(arr);

        let cost = first + second;
        totalCost += cost;

        insertHeap(arr, cost);
    }

    return totalCost;
}

// Examples
console.log(mincost([4, 3, 2, 6])); // Output: 29
console.log(mincost([1, 2, 3, 4, 5])); // Output: 33


module.exports=mincost;
