cc.Class({
    extends: cc.Component,

    properties: {
        clips: {
            default: [],
            type: cc.SpriteFrame
        },
        bullet: {
            default: null,
            type: cc.Prefab
        },

        map_frame: {
            default: [],
            type: cc.SpriteFrame
        }
    },

    // use this for initialization
    onLoad: function () {
        this.node.zIndex = 5;
        this.canfire = true;
        // this.life = 3;
        this.god = false;
        this.bullets = [];
        this.node.setScale(2, 2);
        var scale = cc.scaleBy(1, 0.5, 0.5);
        this.node.runAction(scale);

        this.node.on(cc.Node.EventType.TOUCH_MOVE, this.movePlane, this);
        // this.node.on(cc.Node.EventType.TOUCH_START,this.getLoc,this);


        var animationClips = cc.AnimationClip.createWithSpriteFrames(this.clips, 10);

        var animation = this.node.addComponent('cc.Animation');
        animation.addClip(animationClips, 'fires');
        var animState = animation.play('fires');

        animState.wrapeMode = cc.WrapMode.Loop;
        // 设置动画循环次数为无限次
        animState.repeatCount = Infinity;

        //背景图
        this.map = [];
        var width = this.node.parent.width;
        var height = this.node.parent.height;
        for (var i = 0; i < 6; i++) {
            var d = i % 4;
            var node = new cc.Node('map' + i);
            node.parent = this.node.parent;
            var com = node.addComponent('cc.Sprite');
            com.spriteFrame = this.map_frame[d];
            node.attr({
                x: cc.randomMinus1To1() * (width - 350),
                y: cc.randomMinus1To1() * height,
                zIndex: 0,
                width: cc.random0To1() * width/2,
                height: cc.random0To1() * (height - 300),
                anchorX: 0.5,
                anchorY: 0
            });

            this.map.push(node);
        }
        //console.log(this.map);
        //console.log(this.node.parent);


        cc.director.getScheduler().schedule(this.fire, this, 0.2);

    },
    movePlane: function (eventTouch) {
        // var pos = eventTouch.touch;
        //console.log(eventTouch.touch);
        var delta = eventTouch.getDelta();
        // console.log(delta);
        var pos = cc.p(delta.x + this.node.x, delta.y + this.node.y);
        //console.log(pos);
        var parent = this.node.parent;
        //console.log(parent.width,parent.height);
        //console.log(parent.width/2-this.node.width/2);
        if (Math.abs(pos.x) > parent.width / 2 - this.node.width / 2 - 10 || pos.y < -parent.height / 2 + this.node.height / 2) {
            return;
        }
        this.node.setPosition(pos);

    },

    fire: function (dt) {
        if (!this.canfire) return;
        //console.log('fire');
        var Left_bullet = cc.instantiate(this.bullet);
        var Right_bullet = cc.instantiate(this.bullet);
        Left_bullet.attr({
            owner: 'hero'
        });
        Right_bullet.attr({
            owner: 'hero'
        });


        cc.director
        this.bullets.push(Left_bullet);
        this.bullets.push(Right_bullet);
        Left_bullet.parent = this.node.parent;
        Right_bullet.parent = this.node.parent;

        Left_bullet.attr({
            x: this.node.x - 25,
            y: this.node.y + 25
        });

        Right_bullet.attr({
            x: this.node.x + 25,
            y: this.node.y + 25
        });

        cc.director.getScheduler().scheduleUpdate(Left_bullet, 10, false, Left_bullet.getComponent('bullet').changePos);
        cc.director.getScheduler().scheduleUpdate(Right_bullet, 10, false, Right_bullet.getComponent('bullet').changePos);


    },
    update: function (dt) {
        var len = this.bullets.length;
        var width = this.node.parent.width;
        var height = this.node.parent.height;
        for (var i = len - 1; i >= 0; i--) {
            var bullet = this.bullets[i];
            if (bullet.y > this.node.parent.height / 2) {
                this.bullets.splice(i, 1);
                // bullet.destroy();
                bullet.removeFromParent(true);
            }
        }

        for (var i = 0; i < this.map.length; i++) {
            var node = this.map[i];
            node.y -= 4;
            if (node.y < -height / 2-300) {
                node.attr({
                    x:  cc.randomMinus1To1() * (width - 350),
                    y: cc.randomMinus1To1() * height,
                    width:cc.random0To1() * width/2,
                    height:cc.random0To1() * (height - 300)
                });
            }

        }
    },
});
