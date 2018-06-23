const sinon = require('sinon');
const Bullet = require('../bullet.js');
const Enemy = require('../enemy.js');
const { expect } = require('chai');

const mockBulletSpecDefault = {
  width: 10,
  height: 20,
  speed: 10,
  positionHorizontal: 100,
  positionVertical: 100,
  state: false,
  nextBullet: null,
};

const mockBulletSpecFarPosition = {
  width: 10,
  height: 20,
  speed: 10,
  positionHorizontal: 1000,
  positionVertical: 1000,
  state: false,
  nextBullet: null,
};

const mockEnemySpecDefault = {
  width: 10,
  height: 20,
  positionHorizontal: 100,
  positionVertical: 100,
  hitState: false,
};

describe('Bullet', () => {
  describe('constructor', () => {
    it('should create mockBullet with correct parameters', () => {
      const mockBullet = new Bullet(mockBulletSpecDefault);
      expect(mockBullet).to.deep.equal(mockBulletSpecDefault);
    });
  });
  describe('getDefaultSpec', () => {
    it('should return correct default property values', () => {
      expect(Bullet.getDefaultSpec()).to.deep.equal({
        width: 5,
        height: 10,
        speed: 20,
        positionHorizontal: undefined,
        positionVertical: undefined,
        state: true,
        nextBullet: null,
      });
    });
  });
  describe('movement', () => {
    it('should update speed accordingly using time input when state is true', () => {
      const mockBullet = new Bullet(mockBulletSpecDefault);
      mockBullet.state = true;
      mockBullet.movement(100);
      expect(mockBullet.positionVertical).to.equal(100 - (10 * (100 / (1000 / 60))));
    });
    it('should not update speed when state is not true', () => {
      const mockBullet = new Bullet(mockBulletSpecDefault);
      mockBullet.state = false;
      mockBullet.movement(100);
      expect(mockBullet.positionVertical).to.equal(100);
    });
  });
  describe('boundaryCheck', () => {
    it('should set state to false when positionVertical + height are within boundary input', () => {
      const mockBullet = new Bullet(mockBulletSpecDefault);
      mockBullet.state = true;
      mockBullet.boundaryCheck(130);
      expect(mockBullet.state).to.equal(false);
    });
    it('should not set state to false when positionVertical + height exceed boundary input', () => {
      const mockBullet = new Bullet(mockBulletSpecDefault);
      mockBullet.state = true;
      mockBullet.boundaryCheck(110);
      expect(mockBullet.state).to.equal(true);
    });
  });
  describe('update', () => {
    it('should call boundaryCheck(boundary) with correct parameters', () => {
      const mockBullet = new Bullet(mockBulletSpecDefault);
      const mockComponents = {
        enemies: {
          head: null,
        },
      };
      sinon.stub(mockBullet, 'movement');
      sinon.stub(mockBullet, 'boundaryCheck');
      sinon.stub(mockBullet, 'hitCheck');
      mockBullet.update(10, 20, mockComponents, mockBullet);
      sinon.assert.calledWithExactly(mockBullet.boundaryCheck, 20);
      mockBullet.movement.restore();
      mockBullet.boundaryCheck.restore();
      mockBullet.hitCheck.restore();
    });
    it('should call movement(timeElapsed) with correct parameters', () => {
      const mockBullet = new Bullet(mockBulletSpecDefault);
      const mockComponents = {
        enemies: {
          head: null,
        },
      };
      sinon.stub(mockBullet, 'movement');
      sinon.stub(mockBullet, 'boundaryCheck');
      sinon.stub(mockBullet, 'hitCheck');
      mockBullet.update(10, 20, mockComponents, mockBullet);
      sinon.assert.calledWithExactly(mockBullet.movement, 10);
      mockBullet.movement.restore();
      mockBullet.boundaryCheck.restore();
      mockBullet.hitCheck.restore();
    });
    it('should call remove(components.mockBullets.head) with correct parameters when hitCheck returns true', () => {
      const mockBullet = new Bullet(mockBulletSpecDefault);
      const mockComponents = {
        enemies: {
          head: null,
        },
        bullets: {
          head: mockBullet,
        },
        player: {
          score: 0,
        },
      };
      sinon.stub(mockBullet, 'movement');
      sinon.stub(mockBullet, 'boundaryCheck');
      sinon.stub(mockBullet, 'hitCheck').returns(true);
      sinon.stub(mockBullet, 'remove');
      mockBullet.update(10, 20, mockComponents, mockBullet);
      sinon.assert.calledWithExactly(mockBullet.remove, mockBullet);
      mockBullet.movement.restore();
      mockBullet.boundaryCheck.restore();
      mockBullet.hitCheck.restore();
      mockBullet.remove.restore();
    });
    it('should not call remove(components.mockBullets.head) when hitCheck returns false', () => {
      const mockBullet = new Bullet(mockBulletSpecDefault);
      const mockComponents = {
        enemies: {
          head: null,
        },
      };
      sinon.stub(mockBullet, 'movement');
      sinon.stub(mockBullet, 'boundaryCheck');
      sinon.stub(mockBullet, 'hitCheck').returns(false);
      sinon.stub(mockBullet, 'remove');
      mockBullet.update(10, 20, mockComponents, mockBullet);
      sinon.assert.notCalled(mockBullet.remove);
      mockBullet.movement.restore();
      mockBullet.boundaryCheck.restore();
      mockBullet.hitCheck.restore();
      mockBullet.remove.restore();
    });
    it('should increment score by 1 when hitCheck returns true', () => {
      const mockBullet = new Bullet(mockBulletSpecDefault);
      const mockComponents = {
        enemies: {
          head: null,
        },
        bullets: {
          head: mockBullet,
        },
        player: {
          score: 0,
        },
      };
      sinon.stub(mockBullet, 'movement');
      sinon.stub(mockBullet, 'boundaryCheck');
      sinon.stub(mockBullet, 'hitCheck').returns(true);
      sinon.stub(mockBullet, 'remove');
      mockBullet.update(10, 20, mockComponents, mockBullet);
      expect(mockComponents.player.score).to.equal(1);
      mockBullet.movement.restore();
      mockBullet.boundaryCheck.restore();
      mockBullet.hitCheck.restore();
      mockBullet.remove.restore();
    });
  });
  describe('canvasFill', () => {
    it('should call drawingContext.fillRect with correct parameters', () => {
      const mockBullet = new Bullet(mockBulletSpecDefault);
      const drawingContext = {
        fillRect() {},
      };
      sinon.stub(drawingContext, 'fillRect');
      mockBullet.canvasFill(drawingContext);
      sinon.assert.calledWithExactly(drawingContext.fillRect, 100, 100, 10, 20);
      drawingContext.fillRect.restore();
    });
  });
  describe('hitCheck', () => {
    it('should return true when bullet position within enemy position', () => {
      const mockBullet = new Bullet(mockBulletSpecDefault);
      const mockEnemy = new Enemy(mockEnemySpecDefault);
      const mockComponents = {
        enemies: {
          head: mockEnemy,
        },
        bullets: {
          head: mockBullet,
        },
        player: {
          score: 0,
        },
      };
      sinon.spy(mockComponents.bullets.head, 'hitCheck');
      mockComponents.bullets.head.hitCheck(mockComponents.enemies.head);
      expect((mockBullet.hitCheck).returned(true)).to.equal(true);
    });
    it('should set hitState to true when bullet position within enemy position', () => {
      const mockBullet = new Bullet(mockBulletSpecDefault);
      const mockEnemy = new Enemy(mockEnemySpecDefault);
      const mockComponents = {
        enemies: {
          head: mockEnemy,
        },
        bullets: {
          head: mockBullet,
        },
        player: {
          score: 0,
        },
      };
      sinon.spy(mockComponents.bullets.head, 'hitCheck');
      mockComponents.bullets.head.hitCheck(mockComponents.enemies.head);
      expect(mockComponents.enemies.head.hitState).to.equal(true);
    });
    it('should return false when bullet position exceeds enemy position', () => {
      const mockEnemy = new Enemy(mockEnemySpecDefault);
      const mockComponents = {
        enemies: {
          head: mockEnemy,
        },
        bullets: {
          head: new Bullet(mockBulletSpecFarPosition),
        },
        player: {
          score: 0,
        },
      };
      sinon.spy(mockComponents.bullets.head, 'hitCheck');
      mockComponents.bullets.head.hitCheck(mockComponents.enemies.head);
      expect((mockComponents.bullets.head.hitCheck).returned(false)).to.equal(true);
    });
    it('should not set hitState to true when bullet position exceeds enemy position', () => {
      const mockEnemy = new Enemy(mockEnemySpecDefault);
      const mockComponents = {
        enemies: {
          head: mockEnemy,
        },
        bullets: {
          head: new Bullet(mockBulletSpecFarPosition),
        },
        player: {
          score: 0,
        },
      };
      sinon.spy(mockComponents.bullets.head, 'hitCheck');
      mockComponents.bullets.head.hitCheck(mockComponents.enemies.head);
      expect(mockComponents.enemies.head.hitState).to.equal(false);
    });
  });
  describe('append', () => {
    it('should return mockBullet if head is null', () => {
      const mockBullet = new Bullet(mockBulletSpecDefault);
      expect(mockBullet.append(null)).to.equal(mockBullet);
    });
    it('should set firstBullet.nextBullet to equal mockBullet', () => {
      const mockBullet = new Bullet(mockBulletSpecDefault);
      const firstBullet = {
        nextBullet: null,
      };
      expect(mockBullet.append(firstBullet).nextBullet).to.equal(mockBullet);
    });
  });
  describe('remove', () => {
    it('should return firstBullet.nextBullet if firstBullet equals mockbullet', () => {
      const mockBullet = new Bullet(mockBulletSpecDefault);
      mockBullet.nextBullet = 'secondBullet';
      const firstBullet = mockBullet;
      expect(mockBullet.remove(firstBullet)).to.equal('secondBullet');
    });
    it('should return firstBullet and set firstBullet.nextBullet to equal mockBullet.nextBullet', () => {
      const mockBullet = new Bullet(mockBulletSpecDefault);
      mockBullet.nextBullet = 'thirdBullet';
      const firstBullet = {
        nextBullet: mockBullet,
      };
      expect(mockBullet.remove(firstBullet).nextBullet).to.equal('thirdBullet');
    });
  });
});
