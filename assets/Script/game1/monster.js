cc.Class({
    extends: cc.Component,

    properties: {

        exp: {
            default: null,
            type: cc.Label
        }
    },

    // use this for initialization
    onLoad: function () {
        //console.log(this.exp);
        // console.log('joijo');
        var r = parseInt(cc.random0To1() * 255);
        var g = parseInt(cc.random0To1() * 255);
        var b = parseInt(cc.random0To1() * 255);
        this.node.color = new cc.color(r, g, b);

        this.addExp();


    },
    addExp: function () {
        var num = parseInt(cc.random0To1() * 4);
        var num1 = parseInt(cc.random0To1() * 21);
        var num2 = parseInt(cc.random0To1() * 21);

        // console.log(num);

        switch (num) {
            case 0://+
                var answer = num1 + num2;
                this.exp.string = num1 + '+' + num2;
                this.node.attr({ answer: answer });
                break;
            case 1://-
                var answer = num1 + num2;
                this.exp.string = answer + '-' + num1;
                this.node.attr({ answer: num2 });
                break;
            case 2://*
                var answer = num1 * num2;
                this.exp.string = num1 + '*' + num2;
                this.node.attr({ answer: answer });
                break;
            case 3://
                num1 = parseInt(cc.random0To1() * 11);
                num2 = parseInt(cc.random0To1() * 11);
                var mul = num1 * num2;
                while(num1==0){
                    num1 = parseInt(cc.random0To1()*21);
                    mul = num1 * num2;
                }
                this.exp.string = mul + '/' + num1;
                this.node.attr({ answer: num2 });
                break;

        }
    },

    update: function (dt) {
        this.node.attr({
            y: this.node.y - 0.2
        });
    },
});
