cc.Class({
    extends: cc.Component,

    properties: {
        frame: {
            default: [],
            type: cc.SpriteFrame
        },
        enemy: {
            type: cc.Prefab,
            default: null
        },
        particle: {
            default: null,
            type: cc.ParticleSystem
        },
        Life: {
            default: null,
            type: cc.Label
        },
        music: {
            default: null,
            url: cc.AudioClip
        }
    },

    onLoad: function () {
        //console.log(Global.music_id);
        this.playId = cc.audioEngine.play(this.music, true, 0.3);
        this.particle.node.zIndex = 1;
        this.Life.node.zIndex = 1;
        this.enemys = [];
        this.hero = cc.find('hero', this.node);
        cc.director.getScheduler().schedule(this.addEnemyPlane, this, 1);
    },

    update: function (dt) {
        //玩家子弹与敌机检测碰撞
        if (this.enemys.length == 0) return;
        var bullets = this.hero.getComponent('plane').bullets;
        var len1 = bullets.length;
        for (var i = len1 - 1; i >= 0; i--) {
            var bullet = bullets[i];
            var len2 = this.enemys.length;
            for (var j = len2 - 1; j >= 0; j--) {
                var enemy = this.enemys[j];
                if (cc.rectIntersectsRect(bullet.getBoundingBox(), enemy.getBoundingBox())) {
                    bullets.splice(i, 1);
                    // bullet.destroy();
                    bullet.removeFromParent(true);

                    var pos = enemy.getPosition();
                    this.particle.node.attr({
                        x: pos.x,
                        y: pos.y
                    });
                    this.particle.resetSystem();
                    enemy.removeFromParent(true);
                    //enemy.destroy();
                    this.enemys.splice(j, 1);
                    //break;
                }
            }
        }

        // var p = this.hero.getComponent('plane');
        //console.log(p.life);

        // 检测敌机与玩家飞机
        if (this.hero.getComponent('plane').god)
            return;

        //检测敌机子弹与玩家飞机碰撞
        for (var i = 0; i < this.enemys.length; i++) {
            var enemy = this.enemys[i];
            var list = enemy.getComponent('enemy').bullets;
            //console.log('hello');
            for (var j = list.length - 1; j >= 0; j--) {
                var bullet = list[j];
                if (cc.rectIntersectsRect(bullet.getBoundingBox(), this.hero.getBoundingBox())) {
                    ///console.log('world');
                    list.splice(j, 1);
                    bullet.removeFromParent(true);
                    this.collide();
                }
            }
        }


    },

    collide: function () {
        this.hero.getComponent('plane').canfire = false;

        this.Life.string = 'Life:' + (parseInt(this.Life.string.split(':')[1]) - 1).toString();
        if (parseInt(this.Life.string.split(':')[1]) <= 0) {

            //cc.director.getScheduler().unscheduleUpdate(this);
            this.hero.getComponent('cc.Animation').play('dead_bomb');
            //cc.audioEngine.stop(this.playId);
            cc.director.loadScene("deadScene");

        } else {
            // this.hero.getComponent('plane').life = 3;
            this.hero.getComponent('plane').god = true;
            this.hero.attr({
                x: 0,
                y: -400
            });
            var blink = cc.blink(3, 10);
            this.enemyFireAndMove(false);
            this.hero.runAction(cc.sequence(blink, cc.callFunc(function () {
                this.getComponent('plane').god = false;
                this.getComponent('plane').canfire = true;
                this.parent.getComponent('EnemyPlane').enemyFireAndMove(true);
            }, this.hero)));
        }
    },
    enemyFireAndMove: function (flag) {
        for (var i = 0; i < this.enemys.length; i++) {
            var enemy = this.enemys[i];
           
            enemy.getComponent('enemy').canmove = flag;
            enemy.getComponent('enemy').canfire = flag;
        }
    },
    addEnemyPlane: function (dt) {
        ///console.log('addEnemyPlane');

        var p = parseInt(cc.random0To1() * 4);
        if (p > 2) return;
        var enemy = cc.instantiate(this.enemy);
        enemy.hero = this.hero;

        cc.director.getScheduler().schedule(enemy.getComponent('enemy').move, enemy, 1);
        //enemy.hero = this.hero;
        enemy.attr({
            x: cc.randomMinus1To1() * (this.node.width - enemy.width - 300),
            y: 200 + cc.randomMinus1To1() * 80,
            zIndex: 2
        });
        var i = parseInt(cc.random0To1() * this.frame.length);
        enemy.getComponent('cc.Sprite').spriteFrame = this.frame[i];
        if (i == 1 || i == 2) {
            enemy.setRotation(180);
        }
        enemy.parent = this.node;
        this.enemys.push(enemy);
    }
});
