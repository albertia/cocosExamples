System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, EPhysics2DDrawFlags, Node, PhysicsSystem2D, RichText, _dec, _dec2, _dec3, _class, _class2, _descriptor, _descriptor2, _crd, ccclass, property, Game;

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
      EPhysics2DDrawFlags = _cc.EPhysics2DDrawFlags;
      Node = _cc.Node;
      PhysicsSystem2D = _cc.PhysicsSystem2D;
      RichText = _cc.RichText;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "da6d1dNqAFN+4uopv27Y727", "Game", undefined);

      __checkObsolete__(['_decorator', 'Component', 'EPhysics2DDrawFlags', 'Node', 'PhysicsSystem2D', 'RichText']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("Game", Game = (_dec = ccclass('Game'), _dec2 = property(Node), _dec3 = property(Node), _dec(_class = (_class2 = class Game extends Component {
        constructor() {
          super(...arguments);
          this.score = 0;

          _initializerDefineProperty(this, "hero", _descriptor, this);

          _initializerDefineProperty(this, "scoreNode", _descriptor2, this);
        }

        start() {
          PhysicsSystem2D.instance.debugDrawFlags = EPhysics2DDrawFlags.Aabb | EPhysics2DDrawFlags.Pair | EPhysics2DDrawFlags.CenterOfMass | EPhysics2DDrawFlags.Joint | EPhysics2DDrawFlags.Shape;
          this.score = 0;
          var scoreNodeComponent = this.scoreNode.getComponent(RichText);
          this.hero.on('score', () => {
            //audioEngine.play(this.sound);
            ++this.score;
            scoreNodeComponent.string = this.score.toString();
          });
        }

        update(deltaTime) {}

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "hero", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "scoreNode", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      })), _class2)) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=9edd6f07f9f090ddb8dd6b08f81510522220c307.js.map