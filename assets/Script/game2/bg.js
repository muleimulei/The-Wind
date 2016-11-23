
cc.Class({
    extends: cc.Component,

    properties: {
        bg_pic: {
            url: cc.Texture2D,
            //type:cc.SpriteFrame,
            default: null
        },
        btn: {
            default: [],
            type: cc.Button
        },
        plane: {
            default: [],
            type: cc.SpriteFrame
        },
        bg_music: {
            default: null,
            url: cc.AudioClip
        }
    },

    // use this for initialization
    onLoad: function () {
        this.playId = cc.audioEngine.playMusic(this.bg_music, true, 0.3);
        
        //console.log(this.playId,this);
        var width = 124, height = 38;
        for (var j = 0; j < 3; j++) {
            var frame1 = new cc.SpriteFrame();

            frame1.setTexture(this.bg_pic, cc.rect(j * width, 0 * height, width, height));
            this.btn[j].normalSprite = frame1;

            var frame2 = new cc.SpriteFrame();

            frame2.setTexture(this.bg_pic, cc.rect(j * width, 1 * height, width, height));
            this.btn[j].hoverSprite = frame2;
            var frame3 = new cc.SpriteFrame();

            frame3.setTexture(this.bg_pic, cc.rect(j * width, 2 * height, width, height));
            this.btn[j].pressedSprite = frame3;

            this.btn[j].node.setScale(2, 2);

        }

        cc.director.getScheduler().schedule(this.addPlane, this, 2);

    },

    addPlane: function (dt) {
        var i = parseInt(cc.random0To1() * 5);
        if (i <= 1) {
            i = parseInt(cc.random0To1() * 4);
            var plane = new cc.Node();
            plane.zIndex = 5;
            var com = plane.addComponent('cc.Sprite');
            com.spriteFrame = this.plane[i];
            plane.attr({
                x: cc.randomMinus1To1() * 100,
                y: -420
            });
            // plane.attr({
            //     x:0,
            //     y:0
            // });
            var ch = parseInt(cc.random0To1() * 2);
            if (ch == 0) {
                var move1 = cc.moveBy(2, cc.p(100, 400));
                var scale1 = cc.scaleBy(2, 2, 2);

                var move2 = cc.moveBy(4, cc.p(-400, 400));
                var scale2 = cc.scaleBy(4, 0.5, 0.5);


                var callfunc = cc.callFunc(function () {
                    this.removeFromParent(true);
                }, plane);
                //plane.runAction(cc.sequence(cc.spawn(move1,scale1),cc.spawn(move2,scale2),callfunc));

                plane.runAction(cc.sequence(cc.spawn(move1, scale1), cc.spawn(move2, scale2), callfunc));
            } else {
                var move1 = cc.moveBy(3, cc.p(-100, 400));
                var scale1 = cc.scaleBy(3, 2, 2);

                var move2 = cc.moveBy(4, cc.p(300, 400));
                var scale2 = cc.scaleBy(4, 0.4, 0.4);


                var callfunc = cc.callFunc(function () {
                    this.removeFromParent(true);
                }, plane);
                //plane.runAction(cc.sequence(cc.spawn(move1,scale1),cc.spawn(move2,scale2),callfunc));

                plane.runAction(cc.sequence(cc.spawn(move1, scale1), cc.spawn(move2, scale2), callfunc));
            }

            plane.parent = this.node;
        }
    },

    changeScene: function () {
        //console.log(this);
        cc.audioEngine.stop(this.playId);
        this.node.runAction(cc.sequence(cc.fadeOut(1.0), cc.callFunc(
            function () {
                
                cc.director.loadScene('mainScene');
            })));
    },
    option:function(){
        var option = cc.find('Canvas/bg2');
        option.active = true;
    },
    detail:function(){
        var detail = cc.find('Canvas/bg3');
        detail.active = true;
    }
});
