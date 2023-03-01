class ListNode {
  val: unknown;

  next: ListNode | null;

  constructor(val: unknown) {
    this.val = val;
    this.next = null;
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

export function howTo() {
  const head = new ListNode(1);
  head.next = new ListNode(2);
  head.next.next = new ListNode(3);
  head.next.next.next = new ListNode(4);

  head.next.next.next.next = new ListNode(5);
  // head.next.next.next.next = head;

  console.log(linkedListCycled(head));
  console.log(linkedListMiddle(head));
}
