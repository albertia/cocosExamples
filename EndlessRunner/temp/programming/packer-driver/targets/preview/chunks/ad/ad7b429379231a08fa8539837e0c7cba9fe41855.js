System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, Vec3, Prefab, instantiate, Sprite, UITransform, BoxCollider2D, _dec, _dec2, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _crd, ccclass, property, Platform;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'transform-class-properties is enabled and runs after the decorators transform.'); }

  return {
    setters: [function (_cc) {
      _cclegacy = _cc.cclegacy;
      __checkObsolete__ = _cc.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc.__checkObsoleteInNamespace__;
      _decorator = _cc._decorator;
      Component = _cc.Component;
      Vec3 = _cc.Vec3;
      Prefab = _cc.Prefab;
      instantiate = _cc.instantiate;
      Sprite = _cc.Sprite;
      UITransform = _cc.UITransform;
      BoxCollider2D = _cc.BoxCollider2D;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "130e0uQIZFItbOBHjyVJta4", "Platform-001", undefined);

      __checkObsolete__(['_decorator', 'Component', 'Node', 'Vec3', 'Prefab', 'instantiate', 'Sprite', 'UITransform', 'BoxCollider2D']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("Platform", Platform = (_dec = ccclass('Platform'), _dec2 = property(Prefab), _dec(_class = (_class2 = class Platform extends Component {
        constructor() {
          super(...arguments);

          _initializerDefineProperty(this, "tile", _descriptor, this);

          _initializerDefineProperty(this, "createPosition", _descriptor2, this);

          _initializerDefineProperty(this, "tilesCount", _descriptor3, this);

          _initializerDefineProperty(this, "platformSpeed", _descriptor4, this);
        }

        start() {}

        update(deltaTime) {
          this.node.position = new Vec3(this.node.position.x - deltaTime * this.platformSpeed, this.node.position.y, 0);
        }

        init() {
          this.node.position = this.createPosition;
          var totalWidth = 0;
          var width = 0;
          var height = 0;

          for (var i = 0; i < this.tilesCount; ++i) {
            var tile = instantiate(this.tile);
            this.node.addChild(tile);
            width = tile.getComponent(Sprite).node.getComponent(UITransform).width;
            height = tile.getComponent(Sprite).node.getComponent(UITransform).height;
            tile.position = new Vec3(i * width, 0, 0);
            totalWidth += width;
          }

          var collider = this.node.getComponent(BoxCollider2D);
          collider.size.x = totalWidth;
          collider.size.y = height;
          collider.offset.x = totalWidth / 2 - width / 2;
          collider.name = 'platform';
          collider.apply();
        }

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "tile", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "createPosition", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return new Vec3(0.0, 0.0, 0.0);
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "tilesCount", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 3;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "platformSpeed", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 175;
        }
      })), _class2)) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=ad7b429379231a08fa8539837e0c7cba9fe41855.js.map