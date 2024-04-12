const newNode = (data) => {
    return { data, next: null };
}

const linkedList = () => {
    let head = null;
    let size = 0;
    
    // Add node at the beginning of linked list
    const prepend = (value) => {
        const newNodeInstance = newNode(value);
        if (!head) {
            head = newNodeInstance;
        } else {
            newNodeInstance.next = head;
            head = newNodeInstance;
        }
        size++;
    };
    
    // Add node at the end of linked list
    const append = (value) => {
        const newNodeInstance = newNode(value);
        if (!head) {
            head = newNodeInstance;
        } else {
            let current = head;
            while (current.next !== null) {
                current = current.next;
            }
            current.next = newNodeInstance;
        }
        size++;
    };

    const getSize = () => {
        return size;
    };
    
    const clear = () => {
        head = null;
        size = 0;
    }
    
    const tail = () => {
        if (!head) {
            return null; // If the list is empty, return null
        }
        let current = head;
        while (current.next !== null) {
            current = current.next;
        }
        return current.data;
    }
    
    const at = (index) => {
        if (index >= size) return "Index bigger than list size"
        let current = head;
        for (let i = 0; i<index; i++) {
            current = current.next
        }
        return current.data
    }
    
    const pop = () => {
        if (!head) {
            return null; // If the list is empty, return null
        } else if (!head.next) {
            // If there is only one element in the list
            head = null;
            size = 0;
            return;
        } else {
            let current = head;
            let previous = null;
            while (current.next !== null) {
                previous = current;
                current = current.next;
            }
            previous.next = null;
            size--;
        }
    }
    
    const contains = (value) => {
        let current = head
        while (current !== null){
            if (current.data === value) return true
            current = current.next;
        }
        return false;
    }
    
    const find = (value) => {
        if (!head) return "No element in the list"
        let current = head
        for (let i = 0; i<size; i++) {
            if (current.data === value) return i
            current = current.next
        }
        return "Not in the list"
    }

    // Return an object with closures to access private variables
    return {
        append,
        prepend,
        getSize,
        clear,
        size: () => size,
        toString : () => head,
        head: () => (head ? head.data : null),
        tail,
        at,
        pop,
        contains,
        find,
    }
}

const deneme = linkedList();
deneme.prepend(9)

deneme.append(5);
deneme.append(2);
deneme.pop()
console.log(deneme.tail());
console.log(deneme.toString());
console.log(deneme.find(4));
