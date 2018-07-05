const sinon = require('sinon');
const Bullet = require('../objects/bullet/default.js');
const { expect } = require('chai');

const mockPlayer = {
  width: 10,
  height: 20,
  positionX: 30,
  positionY: 40,
  bulletType: 'white',
};

const mockBulletSpecs = {
  width: 5,
  height: 10,
  speed: 20,
  positionX: 32.5,
  positionY: 30,
  type: 'white',
  nextBullet: null,
};

describe('Bullet', () => {
  describe('constructor', () => {
    it('should create mockBullet with correct parameters', () => {
      expect(new Bullet(mockPlayer)).to.deep.equal(mockBulletSpecs);
    });
  });
  describe('movement', () => {
    it('should update positionY using time input', () => {
      const mockBullet = new Bullet(mockPlayer);
      mockBullet.movement(100);
      expect(mockBullet.positionY)
        .to.equal(mockBulletSpecs.positionY - (mockBulletSpecs.speed * (100 / (1000 / 60))));
    });
  });
  describe('boundaryCheck', () => {
    it('should call remove when positionVertical + height are not within boundary input', () => {
      const mockBullet = new Bullet(mockPlayer);
      const components = {
        bullets: {
          head: 'head',
        },
      };
      sinon.stub(mockBullet, 'remove');
      mockBullet.boundaryCheck(100, components);
      sinon.assert.calledWithExactly(mockBullet.remove, 'head');
      mockBullet.remove.restore();
    });
  });
  describe('update', () => {
    it('should call boundaryCheck with correct parameters', () => {
      const mockBullet = new Bullet(mockPlayer);
      const mockComponents = {
        enemies: {
          head: null,
        },
      };
      sinon.stub(mockBullet, 'boundaryCheck');
      sinon.stub(mockBullet, 'movement');
      sinon.stub(mockBullet, 'hitCheck').returns(false);
      mockBullet.update('time', 'boundary', mockComponents);
      sinon.assert.calledWithExactly(mockBullet.boundaryCheck, 'boundary', mockComponents);
      mockBullet.movement.restore();
      mockBullet.boundaryCheck.restore();
      mockBullet.hitCheck.restore();
    });
    it('should call movement with correct parameters', () => {
      const mockBullet = new Bullet(mockPlayer);
      const mockComponents = {
        enemies: {
          head: null,
        },
      };
      sinon.stub(mockBullet, 'boundaryCheck');
      sinon.stub(mockBullet, 'movement');
      sinon.stub(mockBullet, 'hitCheck').returns(false);
      mockBullet.update('time', 'boundary', mockComponents);
      sinon.assert.calledWithExactly(mockBullet.movement, 'time');
      mockBullet.movement.restore();
      mockBullet.boundaryCheck.restore();
      mockBullet.hitCheck.restore();
    });
    it('should call remove with correct parameters when hitCheck returns true', () => {
      const mockBullet = new Bullet(mockPlayer);
      const mockComponents = {
        enemies: {
          head: null,
        },
        bullets: {
          head: 'bulletHead',
        },
        player: {
          score: 0,
        },
      };
      sinon.stub(mockBullet, 'movement');
      sinon.stub(mockBullet, 'boundaryCheck');
      sinon.stub(mockBullet, 'hitCheck').returns(true);
      sinon.stub(mockBullet, 'remove');
      mockBullet.update('time', 'boundary', mockComponents);
      sinon.assert.calledWithExactly(mockBullet.remove, 'bulletHead');
      mockBullet.movement.restore();
      mockBullet.boundaryCheck.restore();
      mockBullet.hitCheck.restore();
      mockBullet.remove.restore();
    });
    it('should not call remove with correct parameters when hitCheck returns false', () => {
      const mockBullet = new Bullet(mockPlayer);
      const mockComponents = {
        enemies: {
          head: null,
        },
        bullets: {
          head: 'bulletHead',
        },
        player: {
          score: 0,
        },
      };
      sinon.stub(mockBullet, 'movement');
      sinon.stub(mockBullet, 'boundaryCheck');
      sinon.stub(mockBullet, 'hitCheck').returns(false);
      sinon.stub(mockBullet, 'remove');
      mockBullet.update('time', 'boundary', mockComponents);
      sinon.assert.notCalled(mockBullet.remove);
      mockBullet.movement.restore();
      mockBullet.boundaryCheck.restore();
      mockBullet.hitCheck.restore();
      mockBullet.remove.restore();
    });
    it('should increment player.score by 1 when hitCheck returns true', () => {
      const mockBullet = new Bullet(mockPlayer);
      const mockComponents = {
        enemies: {
          head: null,
        },
        bullets: {
          head: 'bulletHead',
        },
        player: {
          score: 0,
        },
      };
      sinon.stub(mockBullet, 'movement');
      sinon.stub(mockBullet, 'boundaryCheck');
      sinon.stub(mockBullet, 'hitCheck').returns(true);
      sinon.stub(mockBullet, 'remove');
      mockBullet.update('time', 'boundary', mockComponents);
      expect(mockComponents.player.score).to.equal(1);
      mockBullet.movement.restore();
      mockBullet.boundaryCheck.restore();
      mockBullet.hitCheck.restore();
      mockBullet.remove.restore();
    });
    it('should not increment player.score by 1 when hitCheck returns false', () => {
      const mockBullet = new Bullet(mockPlayer);
      const mockComponents = {
        enemies: {
          head: null,
        },
        bullets: {
          head: 'bulletHead',
        },
        player: {
          score: 0,
        },
      };
      sinon.stub(mockBullet, 'movement');
      sinon.stub(mockBullet, 'boundaryCheck');
      sinon.stub(mockBullet, 'hitCheck').returns(false);
      sinon.stub(mockBullet, 'remove');
      mockBullet.update('time', 'boundary', mockComponents);
      expect(mockComponents.player.score).to.equal(0);
      mockBullet.movement.restore();
      mockBullet.boundaryCheck.restore();
      mockBullet.hitCheck.restore();
      mockBullet.remove.restore();
    });
  });
  describe('canvasFill', () => {
    it('should set fillStyle to equal type', () => {
      const mockBullet = new Bullet(mockPlayer);
      const context = {
        fillStyle: null,
        fillRect() {},
      };
      sinon.stub(context, 'fillRect');
      mockBullet.canvasFill(context);
      expect(context.fillStyle).to.equal(mockBulletSpecs.type);
      context.fillRect.restore();
    });
    it('should call context.fillRect with correct parameters', () => {
      const mockBullet = new Bullet(mockPlayer);
      const context = {
        fillStyle: null,
        fillRect() {},
      };
      sinon.stub(context, 'fillRect');
      mockBullet.canvasFill(context);
      sinon.assert.calledWithExactly(
        context.fillRect,
        mockBulletSpecs.positionX,
        mockBulletSpecs.positionY,
        mockBulletSpecs.width,
        mockBulletSpecs.height,
      );
      context.fillRect.restore();
    });
  });
  describe('hitCheck', () => {
    it('should call rectangleCollision with correct parameters when stateHit is false', () => {
      const mockBullet = new Bullet(mockPlayer);
      const mockComponents = {
        enemies: {
          head: {
            width: 'width',
            height: 'height',
            positionX: 'X',
            positionY: 'Y',
            stateHit: false,
          },
        },
        bullets: {
          head: mockBullet,
        },
      };
      sinon.stub(mockBullet.constructor, 'rectangleCollision');
      mockComponents.bullets.head.hitCheck(mockComponents.enemies.head);
      sinon.assert.calledWithExactly(
        mockBullet.constructor.rectangleCollision,
        mockBulletSpecs.positionX,
        mockBulletSpecs.positionX + mockBulletSpecs.width,
        mockBulletSpecs.positionY,
        mockBulletSpecs.positionY + mockBulletSpecs.height,
        'X',
        'Xwidth',
        'Y',
        'Yheight',
      );
      mockBullet.constructor.rectangleCollision.restore();
    });
    it('should set stateHit to true when stateHit is false and rectangleCollision returns true', () => {
      const mockBullet = new Bullet(mockPlayer);
      const mockComponents = {
        enemies: {
          head: {
            width: 'width',
            height: 'height',
            positionX: 'X',
            positionY: 'Y',
            stateHit: false,
          },
        },
        bullets: {
          head: mockBullet,
        },
      };
      sinon.stub(mockBullet.constructor, 'rectangleCollision').returns(true);
      mockComponents.bullets.head.hitCheck(mockComponents.enemies.head);
      expect(mockComponents.enemies.head.stateHit).to.equal(true);
      mockBullet.constructor.rectangleCollision.restore();
    });
    it('should return true when stateHit is false and rectangleCollision returns true', () => {
      const mockBullet = new Bullet(mockPlayer);
      const mockComponents = {
        enemies: {
          head: {
            width: 'width',
            height: 'height',
            positionX: 'X',
            positionY: 'Y',
            stateHit: false,
          },
        },
        bullets: {
          head: mockBullet,
        },
      };
      sinon.stub(mockBullet.constructor, 'rectangleCollision').returns(true);
      expect(mockComponents.bullets.head.hitCheck(mockComponents.enemies.head)).to.equal(true);
      mockBullet.constructor.rectangleCollision.restore();
    });
    it('should return false when rectangleCollision returns false', () => {
      const mockBullet = new Bullet(mockPlayer);
      const mockComponents = {
        enemies: {
          head: {
            width: 'width',
            height: 'height',
            positionX: 'X',
            positionY: 'Y',
            stateHit: false,
          },
        },
        bullets: {
          head: mockBullet,
        },
      };
      sinon.stub(mockBullet.constructor, 'rectangleCollision').returns(false);
      expect(mockComponents.bullets.head.hitCheck(mockComponents.enemies.head)).to.equal(false);
      mockBullet.constructor.rectangleCollision.restore();
    });
  });
  describe('rectangleCollision', () => {
    it('should return true if coordinates of A and B overlap', () => {
      const A = [0, 2, 0, 2];
      const B = [1, 3, 1, 3];
      expect(Bullet.rectangleCollision(
        A[0], A[1], A[2], A[3],
        B[0], B[1], B[2], B[3],
      )).to.equal(true);
    });
    it('should return false if coordinates of A and B do not overlap', () => {
      const A = [0, 2, 0, 2];
      const B = [3, 5, 3, 5];
      expect(Bullet.rectangleCollision(
        A[0], A[1], A[2], A[3],
        B[0], B[1], B[2], B[3],
      )).to.equal(false);
    });
  });
  describe('append', () => {
    it('should return mockBullet if head is null', () => {
      const mockBullet = new Bullet(mockPlayer);
      expect(mockBullet.append(null)).to.equal(mockBullet);
    });
    it('should set firstBullet.nextBullet to equal mockBullet', () => {
      const mockBullet = new Bullet(mockPlayer);
      const firstBullet = {
        nextBullet: null,
      };
      expect(mockBullet.append(firstBullet).nextBullet).to.equal(mockBullet);
    });
  });
  describe('remove', () => {
    it('should return firstBullet.nextBullet if firstBullet equals mockbullet', () => {
      const mockBullet = new Bullet(mockPlayer);
      mockBullet.nextBullet = 'secondBullet';
      const firstBullet = mockBullet;
      expect(mockBullet.remove(firstBullet)).to.equal('secondBullet');
    });
    it('should return firstBullet and set firstBullet.nextBullet to equal mockBullet.nextBullet', () => {
      const mockBullet = new Bullet(mockPlayer);
      mockBullet.nextBullet = 'thirdBullet';
      const firstBullet = {
        nextBullet: mockBullet,
      };
      expect(mockBullet.remove(firstBullet).nextBullet).to.equal('thirdBullet');
    });
  });
});
