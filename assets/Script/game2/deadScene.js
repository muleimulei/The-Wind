cc.Class({
    extends: cc.Component,

    properties: {
        
    },

    // use this for initialization
    onLoad: function () {

    },

    backToMain:function(){
        cc.director.loadScene('MainScene');
    },
    backToGame:function(){
        cc.director.loadScene('title2');
    },

});
