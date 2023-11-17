System.register(["__unresolved_0", "cc", "__unresolved_1", "__unresolved_2"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, Prefab, instantiate, Vec3, randomRangeInt, Platform, Diamond, _dec, _dec2, _dec3, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _crd, ccclass, property, PlatformGenerator;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'transform-class-properties is enabled and runs after the decorators transform.'); }

  function _reportPossibleCrUseOfPlatform(extras) {
    _reporterNs.report("Platform", "./Platform", _context.meta, extras);
  }

  function _reportPossibleCrUseOfDiamond(extras) {
    _reporterNs.report("Diamond", "./Diamond", _context.meta, extras);
  }

  return {
    setters: [function (_unresolved_) {
      _reporterNs = _unresolved_;
    }, function (_cc) {
      _cclegacy = _cc.cclegacy;
      __checkObsolete__ = _cc.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc.__checkObsoleteInNamespace__;
      _decorator = _cc._decorator;
      Component = _cc.Component;
      Prefab = _cc.Prefab;
      instantiate = _cc.instantiate;
      Vec3 = _cc.Vec3;
      randomRangeInt = _cc.randomRangeInt;
    }, function (_unresolved_2) {
      Platform = _unresolved_2.Platform;
    }, function (_unresolved_3) {
      Diamond = _unresolved_3.Diamond;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "bdd39XVy7hBK7LpRo6jPUBE", "PlatformGenerator", undefined);

      __checkObsolete__(['_decorator', 'Component', 'Node', 'Prefab', 'instantiate', 'Vec3', 'randomRangeInt', 'Sprite', 'UITransform']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("PlatformGenerator", PlatformGenerator = (_dec = ccclass('PlatformGenerator'), _dec2 = property(Prefab), _dec3 = property(Prefab), _dec(_class = (_class2 = class PlatformGenerator extends Component {
        constructor() {
          super(...arguments);

          _initializerDefineProperty(this, "platform", _descriptor, this);

          _initializerDefineProperty(this, "diamond", _descriptor2, this);

          _initializerDefineProperty(this, "generateEvery", _descriptor3, this);

          _initializerDefineProperty(this, "generateAtDistance", _descriptor4, this);

          _initializerDefineProperty(this, "generateAtHeightMin", _descriptor5, this);

          _initializerDefineProperty(this, "generateAtHeightMax", _descriptor6, this);

          _initializerDefineProperty(this, "maxPlatformsInArray", _descriptor7, this);

          _initializerDefineProperty(this, "percentToGenerateDiamondsInEachTile", _descriptor8, this);

          _initializerDefineProperty(this, "movementSpeed", _descriptor9, this);

          this.timer = 1;
          this.platformIndex = 0;
          this.platforms = [];
        }

        start() {
          if (this.maxPlatformsInArray < 4) {
            this.maxPlatformsInArray = 4;
          }

          this.createPlatform(0, 0, 3);
          this.createPlatform(300, randomRangeInt(this.generateAtHeightMin, this.generateAtHeightMax), 4);
          this.createPlatform(600, randomRangeInt(this.generateAtHeightMin, this.generateAtHeightMax), randomRangeInt(3, 5));
        }

        update(deltaTime) {
          this.timer -= deltaTime;

          if (this.timer < 0) {
            this.timer = this.generateEvery;
            this.createPlatform(900, randomRangeInt(this.generateAtHeightMin, this.generateAtHeightMax), randomRangeInt(4, 6));
          }
        }

        createPlatform(x, y, tiles) {
          if (this.platforms.length < this.maxPlatformsInArray) {
            var platform = instantiate(this.platform);
            platform.getComponent(_crd && Platform === void 0 ? (_reportPossibleCrUseOfPlatform({
              error: Error()
            }), Platform) : Platform).createPosition = new Vec3(x, y, 0);
            platform.getComponent(_crd && Platform === void 0 ? (_reportPossibleCrUseOfPlatform({
              error: Error()
            }), Platform) : Platform).tilesCount = tiles;
            platform.getComponent(_crd && Platform === void 0 ? (_reportPossibleCrUseOfPlatform({
              error: Error()
            }), Platform) : Platform).platformSpeed = this.movementSpeed;
            platform.getComponent(_crd && Platform === void 0 ? (_reportPossibleCrUseOfPlatform({
              error: Error()
            }), Platform) : Platform).init();
            this.node.addChild(platform);
            this.platforms[this.platformIndex] = platform;
          } else {
            this.platforms[this.platformIndex].position = new Vec3(x, y, 0);
          }

          for (var i = 0; i < this.platforms[this.platformIndex].getComponent(_crd && Platform === void 0 ? (_reportPossibleCrUseOfPlatform({
            error: Error()
          }), Platform) : Platform).tilesCount; ++i) {
            if (randomRangeInt(0, 100) > this.percentToGenerateDiamondsInEachTile) {
              var tile = this.platforms[this.platformIndex].getComponent(_crd && Platform === void 0 ? (_reportPossibleCrUseOfPlatform({
                error: Error()
              }), Platform) : Platform).node.children[i];
              var diamond = instantiate(this.diamond);
              diamond.getComponent(_crd && Diamond === void 0 ? (_reportPossibleCrUseOfDiamond({
                error: Error()
              }), Diamond) : Diamond).diamondSpeed = this.movementSpeed;
              diamond.getComponent(_crd && Diamond === void 0 ? (_reportPossibleCrUseOfDiamond({
                error: Error()
              }), Diamond) : Diamond).createPosition = new Vec3(x + tile.position.x, y + tile.position.y + this.platforms[this.platformIndex].getComponent(_crd && Platform === void 0 ? (_reportPossibleCrUseOfPlatform({
                error: Error()
              }), Platform) : Platform).totalHeight, 0);
              diamond.getComponent(_crd && Diamond === void 0 ? (_reportPossibleCrUseOfDiamond({
                error: Error()
              }), Diamond) : Diamond).init();
              this.node.addChild(diamond);
            }
          }

          this.platformIndex = (1 + this.platformIndex) % this.maxPlatformsInArray;
        }

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "platform", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "diamond", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "generateEvery", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 1;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "generateAtDistance", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 200;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "generateAtHeightMin", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return -100;
        }
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "generateAtHeightMax", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 100;
        }
      }), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "maxPlatformsInArray", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 6;
        }
      }), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "percentToGenerateDiamondsInEachTile", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 50;
        }
      }), _descriptor9 = _applyDecoratedDescriptor(_class2.prototype, "movementSpeed", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 150;
        }
      })), _class2)) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=80fda1044984750357a2fe2062d8f3bfca3d4963.js.map