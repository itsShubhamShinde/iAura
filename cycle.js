console.log("Cycle in the Linked");
class Node {
    constructor(value) {
        this.value = value;
        this.next = null;
    }
}

function createLinkedList(values) {
    if (values.length === 0) return null;

    const head = new Node(values[0]);
    let current = head;
    let secondLastNode = null;

    for (let i = 1; i < values.length; i++) {
        current.next = new Node(values[i]);
        secondLastNode = current; 
        current = current.next;
    }

    if (values.length % 2 === 0) {
        current.next = secondLastNode; 
    } else {
        current.next = null; 
    }
    return head;
}

function hasCycle(head) {
    
    if (!head || !head.next) {
        return false;
    }
    console.log(head);
    
    let slow = head;
    let fast = head;
    
    while (fast !== null && fast.next !== null) {
        slow = slow.next;       
        fast = fast.next.next;  
        if (slow === fast) {
            return true;
        }
    }
    return false;
}
head=[20,30,40,60,80,90]
head1=[10,30,40,6,8]
list = createLinkedList(head)
list1 = createLinkedList(head1)
result = hasCycle(list)
result1 = hasCycle(list1)
console.log("Result",result);
console.log("Result",result1);
 