module.exports = class {
  constructor(obj) {
    this.width = obj.width;
    this.height = obj.height;
    this.positionHorizontal = obj.positionHorizontal;
    this.positionVertical = obj.positionVertical;
    this.speed = obj.speed;
    this.hitState = obj.hitState;
  }
  static getDefaultSpec() {
    return {
      width: 50,
      height: 30,
      positionHorizontal: 350,
      positionVertical: 75, // canvas height - height
      speed: 20,
      hitState: false,
    };
  }
  canvasFill(drawingContext) {
    drawingContext.fillRect(
      this.positionHorizontal,
      this.positionVertical,
      this.width,
      this.height,
    );
  }
  movement(timeElapsed) {
    this.positionHorizontal += this.speed * (timeElapsed / (1000 / 60));
  }
  boundaryCheck(boundaryLeft, boundaryRight) {
    if (this.positionHorizontal <= boundaryLeft ||
      (this.positionHorizontal + this.width) >= boundaryRight) {
      this.speed = -this.speed;
    }
  }
  update(timeElapsed, boundaryLeft, boundaryRight, components) {
    this.boundaryCheck(boundaryLeft, boundaryRight);
    this.movement(timeElapsed);
    this.hitCheck(components);
  }
  hitCheck(components) {
    if (this.hitState) {
      components.enemies.head = this.remove(components.enemies.head);
    }
  }
  append(head) {
    if (head == null) {
      head = this;
      return head;
    }
    for (let i = head; i != null; i = i.next) {
      if (i.next == null) {
        i.next = this;
        i = i.next;
      }
    }
    return head;
  }
  remove(head) {
    if (head == this) {
      return head.next;
    }
    for (let i = head; i.next != null; i = i.next) {
      if (i.next == this) {
        i.next = i.next.next;
      }
      if (i.next == null) {
        return head;
      }
    }
    return head;
  }
};
