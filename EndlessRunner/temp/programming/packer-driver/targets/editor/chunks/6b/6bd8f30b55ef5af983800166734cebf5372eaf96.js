System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, Vec3, Sprite, UITransform, BoxCollider2D, _dec, _class, _class2, _descriptor, _crd, ccclass, property, Diamond;

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
      Sprite = _cc.Sprite;
      UITransform = _cc.UITransform;
      BoxCollider2D = _cc.BoxCollider2D;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "130e0uQIZFItbOBHjyVJta4", "Diamond", undefined);

      __checkObsolete__(['_decorator', 'Component', 'Node', 'Vec3', 'Prefab', 'instantiate', 'Sprite', 'UITransform', 'BoxCollider2D']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("Diamond", Diamond = (_dec = ccclass('Diamond'), _dec(_class = (_class2 = class Diamond extends Component {
        constructor(...args) {
          super(...args);

          _initializerDefineProperty(this, "createPosition", _descriptor, this);

          this.diamondSpeed = 150;
          this.totalWidth = 0;
        }

        start() {
          this.totalWidth = this.node.getComponent(Sprite).node.getComponent(UITransform).width;
          var collider = this.node.getComponent(BoxCollider2D);
          collider.name = 'diamond';
          collider.sensor = true;
          collider.apply();
        }

        update(deltaTime) {
          this.node.position = new Vec3(this.node.position.x - deltaTime * this.diamondSpeed, this.node.position.y, 0);

          if (this.node.position.x < -this.diamondSpeed * 4) {
            // Destroy after 4 seconds after going through the center of the screen
            setTimeout(function () {
              this.node.destroy();
            }.bind(this), 1);
          }
        }

        init() {
          this.node.position = this.createPosition;
        }

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "createPosition", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return new Vec3(0.0, 0.0, 0.0);
        }
      })), _class2)) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=6bd8f30b55ef5af983800166734cebf5372eaf96.js.map