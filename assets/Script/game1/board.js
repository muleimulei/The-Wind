var emptyFunc = function (event) {
    event.stopPropagation();
};

cc.Class({
    extends: cc.Component,

    properties: {
        num: {
            default: null,
            type: cc.Prefab
        },
        del: {
            default: null,
            type: cc.Button
        },
        ok: {
            default: null,
            type: cc.Button
        },
        monster: {
            default: null,
            type: cc.Prefab
        },
        star:{
            default:null,
            type:cc.Node
        },
        back:{
            default:null,
            type:cc.Node
        },
        music:{
            default:null,
            url:cc.AudioClip
        }
    },

    // use this for initialization
    onLoad: function () {
        this.array = [];
        this.back.active = false;

        this.ball = cc.find('ball',this.node);

        this.score = cc.find('score',this.node);
        this.score.zIndex = 20;
        this.life = cc.find('life',this.node);
        this.life.zIndex = 20;
        this.life.getComponent('cc.Label').string= 'life: '+5;

        this.star = cc.find('star',this.node);
        this.star.getComponent('cc.ParticleSystem').playOnLoad = false;
        this.star.visible = false;
        console.log(this.star.getComponent('cc.ParticleSystem').file);
        this.answer = cc.find('text', this.node);
        this.answer.zIndex=20;
        this.answer.getComponent('cc.Label').string = '';
        //cc.log(this.answer);
        var board = cc.find('board', this.node);
        var nums = cc.find('number', board);
        //cc.log(nums);
        for (var i = 0; i <= 9; i++) {
            var num = cc.instantiate(this.num);
            num.getChildByName('Label').getComponent('cc.Label').string = i + '';
            num.parent = nums;

            num.on('click', function (e) {
                //cc.log(this.answer.getComponent('cc.Label').string);
                this.answer.getComponent('cc.Label').string += e.currentTarget.getChildByName('Label').getComponent('cc.Label').string;
            }, this);
        }
        this.del.node.on('click', function (e) {
            var len = this.answer.getComponent('cc.Label').string.length;
            this.answer.getComponent('cc.Label').string = this.answer.getComponent('cc.Label').string.slice(0, len - 1);
        }, this);

        var moveup = cc.moveBy(1, cc.p(0, 140));
        board.runAction(moveup);

        cc.director.getScheduler().schedule(this.addMonster, this, 1);

    },
    check:function (mon) {
       
        for (var i = 0; i < this.array.length; i++) {
            var item = this.array[i];
            if (cc.rectIntersectsRect(item.getBoundingBox(), mon.getBoundingBox())) {
                return false;
            }
        }
        return true;
    },

    addMonster : function (dt) {
        cc.log('addMonster');
        var i = parseFloat(cc.random0To1() * 5);
        if (i < 2.5) {
            var mon = cc.instantiate(this.monster);
            //console.log('asdas');
            var x = cc.randomMinus1To1() * (this.node.width / 2 - mon.width / 2);
            mon.setPosition(cc.p(x, this.node.height / 2 + 10));
            if (this.check(mon)) {
                mon.parent = this.ball;
                this.array.push(mon);
                return;
            }
            mon.destroy();
        }
    },
    update: function (dt) {
        var len = this.array.length;
        for(var i=len-1;i>=0;i--){
            var item = this.array[i];
            if(item.y<-15){
                this.array.splice(i,1);
                var life =parseInt(this.life.getComponent('cc.Label').string.split(':')[1]);
                life--;
                this.life.getComponent('cc.Label').string = 'Life: '+life;
               // console.log(life);
                item.destroy();
                if(life==0){
                    cc.game.pause();
                    this.back.active=true;
                    this.back.zIndex=1000;
                    this.back.on('touchstart',emptyFunc,this);
                    this.ball.removeAllChildren(true);

                    //cc.director.getScheduler().unschedule(this.addMonster,this);
                }
            }
        }
    },

    checkAnswer:function(e){
        // console.log(e);
        var a = this.answer.getComponent('cc.Label');
        var exp =parseInt(a.string);
        a.string='';

        var len = this.array.length;
        for(var i=len-1;i>=0;i--){
            var item = this.array[i];
            if(exp==item.answer){
                this.array.splice(i,1);

                var pos = cc.p(item.x,item.y);
                item.destroy();

                cc.audioEngine.playEffect(this.music,false);

                this.star.attr({
                    x:pos.x,
                    y:pos.y
                });
                this.star.visible = true;
                this.star.getComponent('cc.ParticleSystem').resetSystem();

                this.score.getComponent('cc.Label').string ='Score: '+ (parseInt(this.score.getComponent('cc.Label').string.split(':')[1])+2);
            }
        }
    },

    backToGame:function(e){
       // cc.director.getScheduler().schedule(this.addMonster, this, 1);
       cc.game.resume();
        this.back.active=false;

        this.back.off('touchstart',emptyFunc,this);
        console.log('back');
        this.score.getComponent('cc.Label').string ='Score: 0';
        this.life.getComponent('cc.Label').string='Life: 5';
        
        //cc.director.loadScene('title1');

    },

    exitGame:function(e){
        cc.director.loadScene('mainScene');
    }

});
