// DSA used Circular Doubly Linked List and Stack
// Node class
class Node {
  constructor(length, id, name, image, artists, path) {
    this.musicNode = {
      id: id,
      name: name,
      image: image,
      artists: artists,
      length: length,
      path: path,
    };
    this.next = null;
    this.prev = null;
    this.capacity = 0;
  }
}

// Circular Doubly Linked List class
class CDLL {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
    this.tempPos = null;
  }

  // copy of CDLL dll_copy = dll.copy()
  copy() {
    let copyCDLL = new CDLL();
    let temp = this.head;
    for (let i = 0; i < this.length; i++) {
      copyCDLL.push(
        temp.musicNode.length,
        temp.musicNode.id,
        temp.musicNode.name,
        temp.musicNode.image,
        temp.musicNode.artists,
        temp.musicNode.path
      );
      temp = temp.next;
    }
    return copyCDLL;
  }

  push(length, id, name, image, artists, path) {
    const newNode = new Node(length, id, name, image, artists, path);
    if (this.length === 0) {
      this.head = newNode;
      this.tail = newNode;
      newNode.next = this.head;
      newNode.prev = this.tail;
    } else {
      newNode.next = this.head;
      newNode.prev = this.tail;
      this.head.prev = newNode;
      this.tail.next = newNode;
      this.head = newNode;
    }
    this.length++;
  }

  // set position of current node
  // default is pointer of head node
  setDefaulltPointer() {
    this.tempPos = this.head;
  }

  // get length of CDLL
  getCapacity() {
    return this.capacity;
  }

  traverse(direction) {
    // forward direction
    if (direction === 1) {
      if (this.tempPos.next != null) {
        this.tempPos = this.tempPos.next;
        return this.tempPos.musicNode;
      } else if (this.tempPos.next == null) {
        this.tempPos = this.head;
        return this.tempPos.musicNode;
      } else {
        return 0;
      }
    } else if (direction === -1) {
      //backward direction
      if (this.tempPos.prev != null) {
        this.tempPos = this.tempPos.prev;
        return this.tempPos.musicNode;
      } else if (this.tempPos.prev == null) {
        this.tempPos = this.tail;
        return this.tempPos.musicNode;
      }
    } else {
      return 0;
    }
  }

  // check for position of node
  nodePosition() {
    if (this.tempPos.next == null) {
      return 0; // last pos
    } else if (this.tempPos.prev == null) {
      return 0; // first pos
    } else {
      return 0; // middle pos
    }
  }

  // delete node from position from CDLL
  deleteNode(position) {
    if (position === 0) {
      // delete first node
      this.head = this.head.next;
      this.head.prev = this.tail;
      this.tail.next = this.head;
    } else if (position === this.length - 1) {
      // delete last node
      this.tail = this.tail.prev;
      this.tail.next = this.head;
      this.head.prev = this.tail;
    } else {
      // delete middle node
      let temp = this.head;
      for (let i = 0; i < position; i++) {
        temp = temp.next;
      }
      temp.prev.next = temp.next;
      temp.next.prev = temp.prev;
    }
    this.length--;
  }

  // search song using name of song and return song obj
  searchSong(name) {
    let temp = this.head;
    for (let i = 0; i < this.length; i++) {
      if (temp.musicNode.name === name) {
        return temp.musicNode;
      }
      temp = temp.next;
    }
    return 0;
  }

  // search song using binary search and return song obj
  binarySearch(name) {
    let start = 0;
    let end = this.length - 1;
    while (start <= end) {
      let mid = Math.floor((start + end) / 2);
      let temp = this.head;
      for (let i = 0; i < mid; i++) {
        temp = temp.next;
      }
      if (temp.musicNode.name === name) {
        return temp.musicNode;
      } else if (temp.musicNode.name < name) {
        start = mid + 1;
      } else {
        end = mid - 1;
      }
    }
    return 0;
  }

  sortbyName() {
    let temp = this.head;
    for (let i = 0; i < this.length; i++) {
      let temp2 = temp.next;
      for (let j = i + 1; j < this.length; j++) {
        if (temp.musicNode.name > temp2.musicNode.name) {
          let temp3 = temp.musicNode;
          temp.musicNode = temp2.musicNode;
          temp2.musicNode = temp3;
        }
        temp2 = temp2.next;
      }
      temp = temp.next;
    }
  }

  // display CDLL
  display() {
    let temp = this.head;
    for (let i = 0; i < this.length; i++) {
      console.log(temp.musicNode);
      temp = temp.next;
    }
  }
}

// creating circular double liked list obj and pointer
// const dll = new CDLL();

// dll.push(
//   "Shipping Lanes",
//   "",
//   "Ali Zain",
//   1,
//   "https://files.freemusicarchive.org/storage-freemusicarchive-org/music/WFMU/Broke_For_Free/Directionless_EP/Broke_For_Free_-_01_-_Night_Owl.mp3"
// );
// dll.push(
//   "Enthusiast",
//   2,
//   "https://files.freemusicarchive.org/storage-freemusicarchive-org/music/no_curator/Tours/Enthusiast/Tours_-_01_-_Enthusiast.mp3"
// );
// dll.push(
//   "Night Owl",
//   3,
//   "https://files.freemusicarchive.org/storage-freemusicarchive-org/music/ccCommunity/Chad_Crouch/Arps/Chad_Crouch_-_Shipping_Lanes.mp3"
// );

// dll.push(
//   "Manike",
//   4,
//   "https://firebasestorage.googleapis.com/v0/b/spotifyclone-b0b66.appspot.com/o/Manike.mp3?alt=media&token=b0a81a0e-f275-4440-95db-21e9b64c5621"
// );

// dll.push(
//   "I'm Good",
//   5,
//   "https://firebasestorage.googleapis.com/v0/b/spotifyclone-b0b66.appspot.com/o/song.wav?alt=media&token=b11e8ff9-8618-4d32-9185-ce288f2376fe"
// );
//dll.deleteNode(2);
//dll.deleteNode(1);
//dll.setDefaulltPointer();
//console.log(dll.searchSong("Enthusiast"));
//console.log(dll.binarySearch("Manike"));
// console.log(dll.traverse(1));

//dll.display();

// console.log("copy dll");
// new_dll = dll.copy();
// new_dll.sort();
// new_dll.display();

export default CDLL;
