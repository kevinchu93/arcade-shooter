const sinon = require('sinon');
const components = require('../components.js');
const Bullet = require('../bullet.js');
const { expect } = require('chai');

const mockBulletSpecDefault = {
  width: 5,
  height: 10,
  speed: 20,
  positionHorizontal: 100,
  positionVertical: 100,
  state: true,
  nextBullet: null,
};

describe('components', () => {
  describe('bullets', () => {
    describe('canvasFill', () => {
      it('should call canvasFill with correct parameters for all bullets', () => {
        let mockBullet1 = {};
        let mockBullet2 = {};
        let mockBullet3 = {};
        mockBullet1 = {
          canvasFill() {},
          nextBullet: mockBullet2 = {
            canvasFill() {},
            nextBullet: mockBullet3 = {
              canvasFill() {},
              nextBullet: null,
            },
          },
        };
        const mockGameArea = {
          canvasElementDrawingContext: null,
        };
        components.bullets.head = mockBullet1;
        sinon.stub(mockBullet1, 'canvasFill');
        sinon.stub(mockBullet2, 'canvasFill');
        sinon.stub(mockBullet3, 'canvasFill');
        components.bullets.canvasFill(mockGameArea);
        sinon.assert.calledWithExactly(
          mockBullet1.canvasFill,
          mockGameArea.canvasElementDrawingContext,
        );
        sinon.assert.calledWithExactly(
          mockBullet2.canvasFill,
          mockGameArea.canvasElementDrawingContext,
        );
        sinon.assert.calledWithExactly(
          mockBullet3.canvasFill,
          mockGameArea.canvasElementDrawingContext,
        );
        mockBullet1.canvasFill.restore();
        mockBullet2.canvasFill.restore();
        mockBullet3.canvasFill.restore();
      });
    });
    describe('update', () => {
      it('should call update with correct parameters for all bullets', () => {
        let mockBullet1 = {};
        let mockBullet2 = {};
        let mockBullet3 = {};
        mockBullet1 = {
          update() {},
          nextBullet: mockBullet2 = {
            update() {},
            nextBullet: mockBullet3 = {
              update() {},
              nextBullet: null,
            },
          },
        };
        components.bullets.head = mockBullet1;
        sinon.stub(mockBullet1, 'update');
        sinon.stub(mockBullet2, 'update');
        sinon.stub(mockBullet3, 'update');
        components.bullets.update('timeElapsed', 'boundary', 'components', 'Bullet', 'keyMap');
        sinon.assert.calledWithExactly(mockBullet1.update, 'timeElapsed', 'boundary', 'components', 'Bullet');
        sinon.assert.calledWithExactly(mockBullet2.update, 'timeElapsed', 'boundary', 'components', 'Bullet');
        sinon.assert.calledWithExactly(mockBullet3.update, 'timeElapsed', 'boundary', 'components', 'Bullet');
        mockBullet1.update.restore();
        mockBullet2.update.restore();
        mockBullet3.update.restore();
      });
      it('should call createNew with correct parameters if keyMap[13] === true', () => {
        const keyMap = [];
        keyMap[13] = true;
        const mockBullet = new Bullet(mockBulletSpecDefault);
        sinon.stub(components.bullets, 'createNew').returns(mockBullet);
        sinon.stub(components.bullets, 'appendNewBullet');
        components.bullets.update('timeElapsed', 'boundary', 'components', 'Bullet', keyMap);
        sinon.assert.calledWithExactly(components.bullets.createNew, 'components', 'Bullet');
        components.bullets.createNew.restore();
        components.bullets.appendNewBullet.restore();
      });
      it('should call appendNewBullet with correct parameters if keyMap[13] === true', () => {
        const keyMap = [];
        keyMap[13] = true;
        const mockBullet = new Bullet(mockBulletSpecDefault);
        sinon.stub(components.bullets, 'createNew').returns(mockBullet);
        sinon.stub(components.bullets, 'appendNewBullet');
        components.bullets.update('timeElapsed', 'boundary', 'components', 'Bullet', keyMap);
        sinon.assert.calledWithExactly(components.bullets.appendNewBullet, mockBullet, 'components');
        components.bullets.createNew.restore();
        components.bullets.appendNewBullet.restore();
      });
    });
    describe('createNew', () => {
      it('should return new Bullet with player position values', () => {
        const mockComponents = {
          player: {
            positionHorizontal: 10,
            positionVertical: 20,
            width: 10,
          },
        };
        const mockBullet = new Bullet(mockBulletSpecDefault);
        mockBullet.positionHorizontal = 12.5;
        mockBullet.positionVertical = 20;
        expect(components.bullets.createNew(mockComponents, Bullet)).to.deep.equal(mockBullet);
      });
    });
    describe('appendNewBullet', () => {
      it('should called bullet append with correct parameter', () => {
        const mockBullet = new Bullet(mockBulletSpecDefault);
        const mockComponents = {
          bullets: {
            head: 'head',
          },
        };
        sinon.stub(mockBullet, 'append');
        components.bullets.appendNewBullet(mockBullet, mockComponents);
        sinon.assert.calledWithExactly(mockBullet.append, 'head');
      });
    });
  });
  describe('enemies', () => {
    describe('canvasFill', () => {
      it('should call canvasFill with correct parameters for all enemies', () => {
        let mockEnemy1 = {};
        let mockEnemy2 = {};
        let mockEnemy3 = {};
        mockEnemy1 = {
          canvasFill() {},
          nextEnemy: mockEnemy2 = {
            canvasFill() {},
            nextEnemy: mockEnemy3 = {
              canvasFill() {},
              nextEnemy: null,
            },
          },
        };
        const mockGameArea = {
          canvasElementDrawingContext: null,
        };
        components.enemies.head = mockEnemy1;
        sinon.stub(mockEnemy1, 'canvasFill');
        sinon.stub(mockEnemy2, 'canvasFill');
        sinon.stub(mockEnemy3, 'canvasFill');
        components.enemies.canvasFill(mockGameArea);
        sinon.assert.calledWithExactly(
          mockEnemy1.canvasFill,
          mockGameArea.canvasElementDrawingContext,
        );
        sinon.assert.calledWithExactly(
          mockEnemy2.canvasFill,
          mockGameArea.canvasElementDrawingContext,
        );
        sinon.assert.calledWithExactly(
          mockEnemy3.canvasFill,
          mockGameArea.canvasElementDrawingContext,
        );
        mockEnemy1.canvasFill.restore();
        mockEnemy2.canvasFill.restore();
        mockEnemy3.canvasFill.restore();
      });
    });
    describe('update', () => {
      it('should call update with correct parameters for all enemies', () => {
        let mockEnemy1 = {};
        let mockEnemy2 = {};
        let mockEnemy3 = {};
        mockEnemy1 = {
          update() {},
          nextEnemy: mockEnemy2 = {
            update() {},
            nextEnemy: mockEnemy3 = {
              update() {},
              nextEnemy: null,
            },
          },
        };
        components.enemies.head = mockEnemy1;
        sinon.stub(mockEnemy1, 'update');
        sinon.stub(mockEnemy2, 'update');
        sinon.stub(mockEnemy3, 'update');
        components.enemies.update('timeElapsed', 'boundaryLeft', 'boundaryRight', 'components');
        sinon.assert.calledWithExactly(mockEnemy1.update, 'timeElapsed', 'boundaryLeft', 'boundaryRight', 'components');
        sinon.assert.calledWithExactly(mockEnemy2.update, 'timeElapsed', 'boundaryLeft', 'boundaryRight', 'components');
        sinon.assert.calledWithExactly(mockEnemy3.update, 'timeElapsed', 'boundaryLeft', 'boundaryRight', 'components');
        mockEnemy1.update.restore();
        mockEnemy2.update.restore();
        mockEnemy3.update.restore();
      });
    });
  });
  describe('powerUps', () => {
    describe('canvasFill', () => {
      it('should call canvasFill with correct parameters for all powerUps', () => {
        let mockPowerUp1 = {};
        let mockPowerUp2 = {};
        let mockPowerUp3 = {};
        mockPowerUp1 = {
          canvasFill() {},
          nextPowerUp: mockPowerUp2 = {
            canvasFill() {},
            nextPowerUp: mockPowerUp3 = {
              canvasFill() {},
              nextPowerUp: null,
            },
          },
        };
        const mockGameArea = {
          canvasElementDrawingContext: null,
        };
        components.powerUps.head = mockPowerUp1;
        sinon.stub(mockPowerUp1, 'canvasFill');
        sinon.stub(mockPowerUp2, 'canvasFill');
        sinon.stub(mockPowerUp3, 'canvasFill');
        components.powerUps.canvasFill(mockGameArea);
        sinon.assert.calledWithExactly(
          mockPowerUp1.canvasFill,
          mockGameArea.canvasElementDrawingContext,
        );
        sinon.assert.calledWithExactly(
          mockPowerUp2.canvasFill,
          mockGameArea.canvasElementDrawingContext,
        );
        sinon.assert.calledWithExactly(
          mockPowerUp3.canvasFill,
          mockGameArea.canvasElementDrawingContext,
        );
        mockPowerUp1.canvasFill.restore();
        mockPowerUp2.canvasFill.restore();
        mockPowerUp3.canvasFill.restore();
      });
    });
    describe('update', () => {
      it('should call update with correct parameters for all enemies', () => {
        let mockPowerUp1 = {};
        let mockPowerUp2 = {};
        let mockPowerUp3 = {};
        mockPowerUp1 = {
          update() {},
          nextPowerUp: mockPowerUp2 = {
            update() {},
            nextPowerUp: mockPowerUp3 = {
              update() {},
              nextPowerUp: null,
            },
          },
        };
        components.powerUps.head = mockPowerUp1;
        sinon.stub(mockPowerUp1, 'update');
        sinon.stub(mockPowerUp2, 'update');
        sinon.stub(mockPowerUp3, 'update');
        components.powerUps.update('timeElapsed');
        sinon.assert.calledWithExactly(mockPowerUp1.update, 'timeElapsed');
        sinon.assert.calledWithExactly(mockPowerUp2.update, 'timeElapsed');
        sinon.assert.calledWithExactly(mockPowerUp3.update, 'timeElapsed');
        mockPowerUp1.update.restore();
        mockPowerUp2.update.restore();
        mockPowerUp3.update.restore();
      });
    });
  });
});
