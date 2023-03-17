export class ListNode {
  val: unknown;

  next: ListNode | null;

  prev: ListNode | null;

  constructor(val: unknown) {
    this.val = val;
    this.next = null;
    this.prev = null;
  }
}

export function linkedListMiddle(head: ListNode) {
  let slow: ListNode | null = head;
  let fast: ListNode | null = head;

  while (slow !== null && fast !== null && fast.next !== null) {
    slow = slow.next;
    fast = fast.next.next;
  }

  return slow;
}

export function linkedListCycled(head: ListNode) {
  let slow: ListNode | null = head;
  let fast: ListNode | null = head;

  while (slow !== null && fast !== null && fast.next !== null) {
    slow = slow.next;
    fast = fast.next.next;

    if (fast === slow) {
      return true;
    }
  }

  return false;
}

export function linkedListReverse(head: ListNode) {
  let slow: ListNode | null = head;
  let prev: ListNode | null = null;

  while (slow !== null) {
    slow.prev = prev;
    prev = slow;
    slow = slow.next;
  }

  // now slow is in the end and if we go .prev.prev... we traverse back

  const end = prev;
  slow = end;

  while (slow !== null) {
    console.log(slow.val);
    prev = slow;
    slow = slow.prev;
  }

  // back to start

  slow = prev;

  return slow;
}

// O(n)
export function useLinkedList() {
  const head = new ListNode(1);
  head.next = new ListNode(2);
  head.next.next = new ListNode(3);
  head.next.next.next = new ListNode(4);

  head.next.next.next.next = new ListNode(5);
  // head.next.next.next.next = head;

  console.log(linkedListCycled(head));
  console.log(linkedListMiddle(head));
  linkedListReverse(head);
}
