interface Head {
  item: any;
  next: any;
};

interface Tail {
  item: any;
  next: any;
};

export class Queue {
  public head: Head = null;
  public tail: Tail = null;

  public add = (item: any) => {
    const entry = { item: item, next: null };

    if (this.head) this.tail.next = entry;
    else this.head = entry;

    this.tail = entry;
  };

  public get = () => {
    const entry = this.head;

    if (entry) {
      this.head = entry.next;

      if (this.tail === entry) this.tail = null;

      return entry.item;
    }
  }
}