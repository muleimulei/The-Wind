cc.Class({
    extends: cc.Component,

    properties: {
        
    },

    // use this for initialization
    onLoad: function () {

    },

    backToMain:function(){
        cc.audioEngine.stopAll();
        //cc.director.loadScene('MainScene');
        cc.game.end();
    },
    backToGame:function(){
        cc.director.loadScene('title2');
    },

});
