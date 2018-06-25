const sinon = require('sinon');
const components = require('../components.js');

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
        components.bullets.update('timeElapsed', 'boundaryLeft', 'boundaryRight', 'components');
        sinon.assert.calledWithExactly(mockBullet1.update, 'timeElapsed', 'boundaryLeft', 'boundaryRight', 'components');
        sinon.assert.calledWithExactly(mockBullet2.update, 'timeElapsed', 'boundaryLeft', 'boundaryRight', 'components');
        sinon.assert.calledWithExactly(mockBullet3.update, 'timeElapsed', 'boundaryLeft', 'boundaryRight', 'components');
        mockBullet1.update.restore();
        mockBullet2.update.restore();
        mockBullet3.update.restore();
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
});
