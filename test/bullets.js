const sinon = require('sinon');
const { expect } = require('chai');
const bullets = require('../components/bullets/index.js');

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
      bullets.head = mockBullet1;
      sinon.stub(mockBullet1, 'canvasFill');
      sinon.stub(mockBullet2, 'canvasFill');
      sinon.stub(mockBullet3, 'canvasFill');
      bullets.canvasFill(mockGameArea);
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
      bullets.head = mockBullet1;
      sinon.stub(mockBullet1, 'update');
      sinon.stub(mockBullet2, 'update');
      sinon.stub(mockBullet3, 'update');
      bullets.update('timeElapsed', 'boundary', 'components', 'Bullet', 'keyMap');
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
      const mockBullet = 'mockBullet';
      sinon.stub(bullets, 'createNew').returns(mockBullet);
      sinon.stub(bullets, 'appendNewBullet');
      bullets.update('timeElapsed', 'boundary', 'components', 'Bullet', keyMap);
      sinon.assert.calledWithExactly(bullets.createNew, 'components', 'Bullet');
      bullets.createNew.restore();
      bullets.appendNewBullet.restore();
    });
    it('should call appendNewBullet with correct parameters if keyMap[13] === true', () => {
      const keyMap = [];
      keyMap[13] = true;
      const mockBullet = 'mockBullet';
      sinon.stub(bullets, 'createNew').returns(mockBullet);
      sinon.stub(bullets, 'appendNewBullet');
      bullets.update('timeElapsed', 'boundary', 'components', 'Bullet', keyMap);
      sinon.assert.calledWithExactly(bullets.appendNewBullet, 'mockBullet', 'components');
      bullets.createNew.restore();
      bullets.appendNewBullet.restore();
    });
  });
  describe('createNew', () => {
    it('should call Bullet constructor with correct parameter', () => {
      const mockComponents = {
        player: {
          positionHorizontal: 10,
          positionVertical: 20,
          width: 10,
        },
      };
      const namespace = {
        Bullet() {
        },
      };
      namespace.Bullet.getDefaultSpec = function getDefaultSpec() {
        return {
          value: 'mockBullet',
        };
      };
      sinon.stub(namespace, 'Bullet');
      bullets.createNew(mockComponents, namespace.Bullet);
      sinon.assert.calledWithExactly(namespace.Bullet, { value: 'mockBullet' });
      namespace.Bullet.restore();
    });
    it('should return bullet with correct properties', () => {
      const mockComponents = {
        player: {
          positionHorizontal: 10,
          positionVertical: 20,
          width: 15,
        },
      };
      const namespace = {
        Bullet(obj) {
          this.width = obj.width;
        },
      };
      namespace.Bullet.getDefaultSpec = function getDefaultSpec() {
        return {
          width: 5,
        };
      };
      sinon.spy(namespace, 'Bullet');
      expect(bullets.createNew(mockComponents, namespace.Bullet)).to.deep.equal({
        positionHorizontal: 15,
        positionVertical: 20,
        width: 5,
      });
      namespace.Bullet.restore();
    });
  });
  describe('appendNewBullet', () => {
    it('should called bullet append with correct parameter', () => {
      const mockBullet = {
        append() {
        },
      };
      const mockComponents = {
        bullets: {
          head: 'head',
        },
      };
      sinon.stub(mockBullet, 'append');
      bullets.appendNewBullet(mockBullet, mockComponents);
      sinon.assert.calledWithExactly(mockBullet.append, 'head');
      mockBullet.append.restore();
    });
  });
});
