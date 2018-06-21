module.exports = class bullet {
  constructor(obj) {
    this.width = obj.width;
    this.height = obj.height;
    this.speed = obj.speed;
    this.positionHorizontal = obj.positionHorizontal;
    this.positionVertical = obj.positionVertical;
    this.state = obj.state;
    this.nextBullet = null;
  }
  static getDefaultSpec() {
    return {
      width: 5,
      height: 10,
      speed: 20,
      positionHorizontal: undefined,
      positionVertical: undefined,   // canvas height - height
      state: true,
      nextBullet: null,
    };
  }
  movement(time) {
    if (this.state) {
      this.positionVertical -= this.speed * (time / (1000 / 60));
    }
  }

  boundaryCheck(boundary) {
    if (this.positionVertical + this.height <= boundary) {
      this.state = false;
    }
  }

  update(timeElapsed, boundary, components, Bullet) {
    this.boundaryCheck(boundary);
    this.movement(timeElapsed);
    if (this.hitCheck(components.enemy)) {
      components.bulletHead = this.remove(components.bulletHead);
      components.player.score += 1;
    }
  }

  canvasFill(drawingContext) {
    drawingContext.fillRect(
      this.positionHorizontal,
      this.positionVertical,
      this.width,
      this.height,
    );
  }
  hitCheck(enemy) {
    return (
      this.positionVertical <= enemy.positionVertical + enemy.height &&
      this.positionVertical >= enemy.positionVertical &&
      this.positionHorizontal >= enemy.positionHorizontal &&
      this.positionHorizontal <= enemy.positionHorizontal + enemy.width
    )
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
