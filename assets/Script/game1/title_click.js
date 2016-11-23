cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //    default: null,      // The default value will be used only when the component attaching
        //                           to a node for the first time
        //    url: cc.Texture2D,  // optional, default is typeof default
        //    serializable: true, // optional, default is true
        //    visible: true,      // optional, default is true
        //    displayName: 'Foo', // optional
        //    readonly: false,    // optional, default is false
        // },
        // ...
    },

    // use this for initialization
    onLoad: function () {
        this.node.on(cc.Node.EventType.TOUCH_START, function (event) {
            var node = event.currentTarget;
            var title = node.getChildByName('title').getComponent('cc.Label').string;

            switch (title) {
                case 'Monster':
                    cc.director.loadScene('title1');
                    break;
                case 'Plane Wars':
                    cc.director.loadScene('title2');
                    break;
                default:
                    cc.director.loadScene('title1');
            }

        }, this.node);
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
