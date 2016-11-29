cc.Class({
    extends: cc.Component,

    properties: {

        bullet: {
            default: null,
            type: cc.Prefab
        },
        frame: {
            default: null,
            type: cc.SpriteFrame
        }
    },

    // use this for initialization
    onLoad: function () {
        this.canmove = true;
        this.canfire = true;
        this.timer = 0;
        this.flag = true;
        this.bullets = [];
        cc.director.getScheduler().schedule(this.fire, this, 0.2);
    },

    move: function (dt) {
        if(!this.getComponent('enemy').canmove) 
            return;
        if(!this.hero.y||!this.hero.x||!this.x||!this.y) return;
        var dxy = cc.p(this.hero.x - this.x, this.hero.y - this.y);

        var dx = cc.random0To1() * dxy.x;
        var dy = cc.random0To1() * dxy.y;

        this.runAction(cc.moveBy(1, cc.p(dx, dy)));
    },
    fire: function (dt) {
        if(!this.canfire)
             return;
        this.timer += dt;
        if (this.timer > 5) {
            this.timer = 0;
            this.flag = !this.flag;
            // console.log('hello');
        }
        var pos = this.node.getPosition();

        if (this.flag) {

            var Left_bullet = cc.instantiate(this.bullet);
            // console.log(Left_bullet);
            Left_bullet.parent = this.node.parent;
            Left_bullet.getComponent('cc.Sprite').spriteFrame = this.frame;
            Left_bullet.attr({
                x: pos.x - 25,
                y: pos.y - 25,
                zIndex: 2,
                owner: 'enemy'
            });
            this.bullets.push(Left_bullet);
            //this.game.bullets.push(Left_bullet);
            //console.log(this);

            var Right_bullet = cc.instantiate(this.bullet);
            Right_bullet.parent = this.node.parent;
            Right_bullet.getComponent('cc.Sprite').spriteFrame = this.frame;
            Right_bullet.attr({
                x: pos.x + 25,
                y: pos.y - 25,
                zIndex: 2,
                owner: 'enemy'
            });
            this.bullets.push(Right_bullet);

            //Left_bullet.schedule(Left_bullet.getComponent('bullet').changePos,Left_bullet,1);
            //Right_bullet.schedule(Right_bullet.getComponent('bullet').changePos,Right_bullet,1);
            //cc.director.getScheduler().schedule(Left_bullet.getComponent('bullet').changePos,Left_bullet,0.017);
            //cc.director.getScheduler().schedule(Right_bullet.getComponent('bullet').changePos,Right_bullet,0.017);

        } else {
            var bullet = cc.instantiate(this.bullet);
            bullet.getComponent('cc.Sprite').spriteFrame = this.frame;
            bullet.parent = this.node.parent;
            bullet.attr({
                x: pos.x,
                y: pos.y - 25,
                zIndex: 2,
                owner: 'enemy'
            });
            this.bullets.push(bullet);

           // cc.director.getScheduler().scheduleUpdate(bullet, 10, false, bullet.getComponent('bullet').changePos);


        }
    },


    update: function (dt) {
        for (var i = this.bullets.length - 1; i >= 0; i--) {
            var bullet = this.bullets[i];
            
            if (bullet.y < -this.node.parent.height / 2) {
                this.bullets.splice(i, 1);
                console.log('销毁');
                bullet.destroy();
            }

            bullet.y-=10;
        }
        console.log('enemy',this.bullets.length);
    }

});
