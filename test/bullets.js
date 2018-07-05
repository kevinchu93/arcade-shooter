const sinon = require('sinon');
const bullets = require('../components/bullets/index.js');
const red = require('../components/bullets/red.js');
const blue = require('../components/bullets/blue.js');
const purple = require('../components/bullets/purple.js');

const mockPlayer = {
  width: 10,
  height: 20,
  positionX: 30,
  positionY: 40,
  bulletType: 'white',
};

describe('bullets', () => {
  describe('canvasFill', () => {
    it('should call canvasFill with correct parameters for all bullets', () => {
      const mockBullet = {
        canvasFill() {},
        nextBullet: null,
      };
      const mockGameArea = {
        canvasContext: {
          fillText() {},
        },
      };
      bullets.head = mockBullet;
      sinon.stub(mockBullet, 'canvasFill');
      sinon.stub(mockGameArea.canvasContext, 'fillText');
      bullets.canvasFill(mockGameArea);
      sinon.assert.calledWithExactly(mockBullet.canvasFill, mockGameArea.canvasContext);
      mockBullet.canvasFill.restore();
      mockGameArea.canvasContext.fillText.restore();
    });
  });
  describe('update', () => {
    it('should call create with correct parameters if keyMap[13] === true', () => {
      const mockBullet = {
        update() {},
        nextBullet: null,
      };
      const mockComponents = {
        keyMap: [],
      };
      mockComponents.keyMap[13] = true;
      bullets.head = mockBullet;
      sinon.stub(bullets, 'create');
      sinon.stub(mockBullet, 'update');
      bullets.update('time', 'boundary', mockComponents, 'Bullet', 'canvas');
      sinon.assert.calledWithExactly(bullets.create, mockComponents, 'Bullet', 'canvas');
      bullets.create.restore();
      mockBullet.update.restore();
    });
    it('should call update with correct parameters for all bullets', () => {
      const mockBullet = {
        update() {},
        nextBullet: null,
      };
      const mockComponents = {
        keyMap: [],
      };
      mockComponents.keyMap[13] = false;
      bullets.head = mockBullet;
      sinon.stub(mockBullet, 'update');
      bullets.update('time', 'boundary', mockComponents, 'Bullet', 'canvas');
      sinon.assert.calledWithExactly(mockBullet.update, 'time', 'boundary', mockComponents, 'Bullet');
      mockBullet.update.restore();
    });
  });
  describe('create', () => {
    describe('case - white', () => {
      it('should call Bullet.Default with correct parameter', () => {
        const mockComponents = {
          player: mockPlayer,
        };
        const mockBulletConstructor = {
          Default: function Default() {},
        };
        mockComponents.player.bulletType = 'white';
        sinon.stub(mockBulletConstructor, 'Default');
        sinon.stub(bullets, 'appendList');
        bullets.create(mockComponents, mockBulletConstructor, 'canvas');
        sinon.assert.calledWithExactly(mockBulletConstructor.Default, mockPlayer);
        mockBulletConstructor.Default.restore();
        bullets.appendList.restore();
      });
      it('should call appendList with correct parameters', () => {
        const mockComponents = {
          player: mockPlayer,
        };
        const mockBulletConstructor = {
          Default: function Default() {
            this.value = 'mockBullet';
          },
        };
        mockComponents.player.bulletType = 'white';
        sinon.stub(bullets, 'appendList');
        bullets.create(mockComponents, mockBulletConstructor, 'canvas');
        sinon.assert.calledWithExactly(bullets.appendList, { value: 'mockBullet' }, mockComponents);
        bullets.appendList.restore();
      });
    });
    describe('case - orangered', () => {
      it('should call createRed correct parameters', () => {
        const mockComponents = {
          player: mockPlayer,
        };
        mockComponents.player.bulletType = 'orangered';
        sinon.stub(red, 'createRed').returns(['mockBullet']);
        sinon.stub(bullets, 'appendList');
        bullets.create(mockComponents, 'Bullet', 'canvas');
        sinon.assert.calledWithExactly(red.createRed, mockPlayer, 'Bullet', []);
        red.createRed.restore();
        bullets.appendList.restore();
      });
      it('should call appendList with correct parameters', () => {
        const mockComponents = {
          player: mockPlayer,
        };
        mockComponents.player.bulletType = 'orangered';
        sinon.stub(red, 'createRed').returns(['mockBullet']);
        sinon.stub(bullets, 'appendList');
        bullets.create(mockComponents, 'Bullet', 'canvas');
        sinon.assert.calledWithExactly(bullets.appendList, 'mockBullet', mockComponents);
        red.createRed.restore();
        bullets.appendList.restore();
      });
    });
    describe('case - deepskyblue', () => {
      it('should call createBlue correct parameters', () => {
        const mockComponents = {
          player: mockPlayer,
        };
        mockComponents.player.bulletType = 'deepskyblue';
        sinon.stub(blue, 'createBlue').returns('mockBullet');
        sinon.stub(bullets, 'appendList');
        bullets.create(mockComponents, 'Bullet', 'canvas');
        sinon.assert.calledWithExactly(blue.createBlue, mockPlayer, 'Bullet');
        blue.createBlue.restore();
        bullets.appendList.restore();
      });
      it('should call appendList with correct parameters', () => {
        const mockComponents = {
          player: mockPlayer,
        };
        mockComponents.player.bulletType = 'deepskyblue';
        sinon.stub(blue, 'createBlue').returns('mockBullet');
        sinon.stub(bullets, 'appendList');
        bullets.create(mockComponents, 'Bullet', 'canvas');
        sinon.assert.calledWithExactly(bullets.appendList, 'mockBullet', mockComponents);
        blue.createBlue.restore();
        bullets.appendList.restore();
      });
    });
    describe('case - mediumpurple', () => {
      it('should call createPurple correct parameters', () => {
        const mockComponents = {
          player: mockPlayer,
        };
        mockComponents.player.bulletType = 'mediumpurple';
        sinon.stub(purple, 'createPurple').returns('mockBullet');
        sinon.stub(bullets, 'appendList');
        bullets.create(mockComponents, 'Bullet', 'canvas');
        sinon.assert.calledWithExactly(purple.createPurple, mockComponents, 'Bullet', 'canvas');
        purple.createPurple.restore();
        bullets.appendList.restore();
      });
      it('should call appendList with correct parameters', () => {
        const mockComponents = {
          player: mockPlayer,
        };
        mockComponents.player.bulletType = 'mediumpurple';
        sinon.stub(purple, 'createPurple').returns('mockBullet');
        sinon.stub(bullets, 'appendList');
        bullets.create(mockComponents, 'Bullet', 'canvas');
        sinon.assert.calledWithExactly(bullets.appendList, 'mockBullet', mockComponents);
        purple.createPurple.restore();
        bullets.appendList.restore();
      });
    });
    describe('case - default', () => {
      it('should call Bullet.Default with correct parameter', () => {
        const mockComponents = {
          player: mockPlayer,
        };
        const mockBulletConstructor = {
          Default: function Default() {},
        };
        mockComponents.player.bulletType = 'default';
        sinon.stub(mockBulletConstructor, 'Default');
        sinon.stub(bullets, 'appendList');
        bullets.create(mockComponents, mockBulletConstructor, 'canvas');
        sinon.assert.calledWithExactly(mockBulletConstructor.Default, mockPlayer);
        mockBulletConstructor.Default.restore();
        bullets.appendList.restore();
      });
      it('should call appendList with correct parameters', () => {
        const mockComponents = {
          player: mockPlayer,
        };
        const mockBulletConstructor = {
          Default: function Default() {
            this.value = 'mockBullet';
          },
        };
        mockComponents.player.bulletType = 'default';
        sinon.stub(bullets, 'appendList');
        bullets.create(mockComponents, mockBulletConstructor, 'canvas');
        sinon.assert.calledWithExactly(bullets.appendList, { value: 'mockBullet' }, mockComponents);
        bullets.appendList.restore();
      });
    });
  });
  describe('appendList', () => {
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
      sinon.stub(mockBullet, 'append').returns('head');
      bullets.appendList(mockBullet, mockComponents);
      sinon.assert.calledWithExactly(mockBullet.append, 'head', { head: 'head' });
      mockBullet.append.restore();
    });
  });
});
