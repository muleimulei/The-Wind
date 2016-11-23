var titles=[
    'Monster','Plane Wars','title3','title4','title5','title6','title7','title8'
];

cc.Class({
    extends: cc.Component,

    properties: {
        title:{
            type:cc.Prefab,
            default:null
        }
    },

    // use this for initialization
    onLoad: function () {
        this.scrollview = this.node.getComponent('cc.ScrollView');
        var ltr = cc.moveBy(2,cc.p(100,0)).easing(cc.easeCubicActionOut());
        var rtl = cc.moveBy(2,cc.p(-100,0)).easing(cc.easeCubicActionOut());

        for(let i=0;i<titles.length;i++){
            let t = cc.instantiate(this.title);
            var child = t.getChildByName('title');
            cc.log(child);
            child.getComponent('cc.Label').string=titles[i];
            if(i%2==0){
                var ll = ltr.clone();
                t.attr({
                    x:-100,
                    y:-(i*45+50)
                });
                t.runAction(ll);
            }else{
                var rr = rtl.clone();
                t.attr({
                    x:100,
                    y:-(i*45+50)
                });
                t.runAction(rr);
            }
            t.parent = this.scrollview.content;
            
        }
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
    exit:function(){
        cc.game.end();
    }
});
