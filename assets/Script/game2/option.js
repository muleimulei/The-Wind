cc.Class({
    extends: cc.Component,

    properties: {
        music:{
            url:cc.AudioClip,
            default:null
        }
    },

    // use this for initialization
    onLoad: function () {
       
    },
    close: function () {
        this.node.active = false;
    },
    musicClick: function () {
        //console.log(this);
        var music = cc.find('c1', this.node).getComponent('cc.Toggle');
        if (music.isChecked) {
            //console.log('check');
            cc.audioEngine.playMusic(this.music);
        } else {
            //console.log('uncheck');
           cc.audioEngine.stopMusic(this.music);
        }
    }

});
