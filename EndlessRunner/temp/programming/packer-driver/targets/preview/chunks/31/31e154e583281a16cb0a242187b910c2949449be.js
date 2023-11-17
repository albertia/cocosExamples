System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, input, Input, Collider2D, Contact2DType, KeyCode, Vec2, RigidBody2D, Sprite, Animation, _dec, _dec2, _class, _class2, _descriptor, _descriptor2, _descriptor3, _crd, ccclass, property, Hero;

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
      input = _cc.input;
      Input = _cc.Input;
      Collider2D = _cc.Collider2D;
      Contact2DType = _cc.Contact2DType;
      KeyCode = _cc.KeyCode;
      Vec2 = _cc.Vec2;
      RigidBody2D = _cc.RigidBody2D;
      Sprite = _cc.Sprite;
      Animation = _cc.Animation;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "b7bc23O4YhCV7oTDPLnc1iF", "Hero", undefined);

      __checkObsolete__(['_decorator', 'Component', 'input', 'Input', 'EventKeyboard', 'EventTouch', 'Collider2D', 'Contact2DType', 'IPhysics2DContact', 'PhysicsSystem2D', 'KeyCode', 'Node', 'Vec2', 'RigidBody', 'RigidBody2D', 'Vec3', 'Sprite', 'Animation']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("Hero", Hero = (_dec = ccclass('Hero'), _dec2 = property(Sprite), _dec(_class = (_class2 = class Hero extends Component {
        constructor() {
          super(...arguments);
          this.isJumping = false;
          this.jumpKeyPressed = false;
          this.touchingGround = false;
          this.jumpFinished = false;
          this.startJumpY = 0.0;
          this.animation = void 0;

          _initializerDefineProperty(this, "jumpSpeed", _descriptor, this);

          _initializerDefineProperty(this, "jumpMaxHeight", _descriptor2, this);

          _initializerDefineProperty(this, "jumpSprite", _descriptor3, this);

          this.body = void 0;
        }

        onLoad() {
          input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this);
          input.on(Input.EventType.KEY_UP, this.onKeyUp, this);
          input.on(Input.EventType.TOUCH_START, this.onTouchStart, this);
          input.on(Input.EventType.TOUCH_END, this.onTouchEnd, this); // Registering callback functions for a single collider

          var collider = this.getComponent(Collider2D);

          if (collider) {
            collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
            collider.on(Contact2DType.END_CONTACT, this.onEndContact, this);
          } // Registering global contact callback functions
          //if (PhysicsSystem2D.instance) {
          //    PhysicsSystem2D.instance.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
          //}

        }

        onKeyDown(event) {
          switch (event.keyCode) {
            case KeyCode.SPACE:
              this.jumpKeyPressed = true;
              break;
          }
        }

        onKeyUp(event) {
          switch (event.keyCode) {
            case KeyCode.SPACE:
              this.isJumping = false;
              this.jumpKeyPressed = false;
              break;
          }
        }

        onTouchStart(event) {
          this.jumpKeyPressed = true;
        }

        onTouchEnd(event) {
          this.isJumping = false;
          this.jumpKeyPressed = false;
        }

        start() {
          this.isJumping = false;
          this.jumpKeyPressed = false;
          this.touchingGround = false;
          this.body = this.getComponent(RigidBody2D);
          this.animation = this.node.getComponent(Animation);
        }

        update(deltaTime) {
          if (this.jumpKeyPressed) {
            this.jump(deltaTime);
          }

          this.animate();
        }

        onBeginContact(selfCollider, otherCollider, contact) {
          // will be called once when two colliders begin to contact
          if (otherCollider.name == 'platform') {
            this.touchingGround = true;
          }

          if (otherCollider.name == 'diamond') {
            setTimeout(() => {
              otherCollider.node.destroy();
            }, 1);
            this.node.emit('score');
          }
        }

        onEndContact(selfCollider, otherCollider, contact) {
          // will be called once when two colliders begin to contact
          if (otherCollider.name == 'platform') {
            this.touchingGround = false;
          }
        }

        jump(deltaTime) {
          if (this.touchingGround) {
            this.startJumpY = this.node.position.y;
            this.isJumping = true;
            this.jumpFinished = false;
            this.body.linearVelocity = this.jumpSpeed;
          } else if (this.isJumping && !this.jumpFinished) {
            if (this.node.position.y < this.startJumpY + this.jumpMaxHeight) {
              this.body.linearVelocity = this.jumpSpeed;
            } else {
              this.jumpFinished = true;
            }
          }
        }

        animate() {
          if (this.touchingGround) {
            // hero is running on the platform
            if (!this.animation.getState("walkjing").isPlaying) {
              this.animation.getState("walkjing").play();
            }
          } else {
            // the hero is jumping
            if (this.animation.getState("walkjing").isPlaying) {
              this.animation.getState("walkjing").stop();
              this.getComponent(Sprite).spriteFrame = this.jumpSprite.spriteFrame;
            }
          }
        }

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "jumpSpeed", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return new Vec2(0.0, 300.0);
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "jumpMaxHeight", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 300;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "jumpSprite", [_dec2], {
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
//# sourceMappingURL=31e154e583281a16cb0a242187b910c2949449be.js.map