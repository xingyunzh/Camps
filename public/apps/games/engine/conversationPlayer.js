/**
 * Created by admin on 26/04/17.
 */
app.service("conversationPlayer", ["$interval", function($interval){
    this.reset = function(){
        this.state = "ready";
        this.sceneData = null;
        this.frameAction = null;
        this.seq = 0;
        this.userData = {people:[], records:[], choice:[], quiz:[]};
        this.text = "Ready";
    };
//    this.timer = null;
//
//    this.play = function(scene, doFrame){
//        this.state = "playing";
//
//        this.sceneData = scene;
//        this.frameAction = doFrame;
//
//        createTimer();
//    };
//
//    this.stop = function(){
//        deleteTimer();
//        this.state = "ready";
//        this.sceneData = null;
//        this.frameAction = null;
//        this.seq = 0;
//    };
//
//
//    this.pause = function(){
//        deleteTimer(this);
//        this.state = "paused";
//    };
//
//    this.resume = function(){
//        createTimer(this);
//    };
//
//    function createTimer(that) {
//        that.timer = $interval(function () {
//            that.frameAction()
//        }, 2000);
//    }
//
//    function deleteTimer(that) {
//        $interval.cancel(that.timer);
//        that.timer = null;
//    }

    this.isEnd = function(){
        return this.seq > 999;
    };

    this.next = function(){
        if(this.seq == 0){
            this.seq = 1;
        }
        return eatSequence(this);
    };

    this.handleChoose = function(item){
        this.userData.choice.push({seq:this.req, item:item});
        this.seq = item.go;
        return eatSequence(this);
    };

    this.handleRecord = function() {
        if(this.userData.records.includes(this.seq)){
           return;
        }

        this.userData.records.push(this.seq);
    };

    function eatSequence(that){
        var seqs = that.sceneData.script;
        var sentence = null;

        console.log("seq = " + that.seq);
        for(var i = 0; i < seqs.length; i++){
            if(seqs[i].seq == that.seq) {
                sentence = seqs[i];
                break;
            }
        }

        if(sentence == null){
            console.log("user data = " + JSON.stringify(that.userData));
            var msg = "";
            if(that.seq == 999 || that.seq == 1000) {
                msg = "Game Over";
                that.seq = 1000;
            }
            else if (that.seq == 888 || that.seq == 1002) {
                msg = "Success End";
                that.seq = 1002;
            }
            else {
                assert(false, "seq is out of bounds");
            }

            return msg;
        }

        var ret = checker(sentence, that.userData);
        if(ret.go){
            that.seq = ret.go;
            var text = that.textFromItem(ret)
            if(text != null){
                return text;
            }
            else {
                return eatSequence.call(this, that);
            }
        }
        else if(angular.isArray(ret)){
            return ret; //options
        }
        else {
            if(sentence.end == 1){
                that.seq = 999;
            }
            else if (sentence.end == 8){
                that.seq = 888;
            }
            else {
                that.seq += 1;
            }
            return that.textFromItem(ret);
        }
    }

    function checker(sentence, userData){
        if (sentence.branch == "missing") {
            for(var i = 0; i < sentence.people.length; i++){
                var item = sentence.people[i];
                if(item.name == "default" || !userData.people.includes(item.name)) {
                    return item;
                }
            }

            assert(false);
        }
        else if (sentence.branch == "exist") {
            for(var i = 0; i < sentence.people.length; i++){
                var item = sentence.people[i];
                if(item.name == "default" || userData.people.includes(item.name)) {
                    return item;
                }
            }

            assert(false);
        }
        else if (sentence.branch == "choose"){
            return sentence.options;
        }
        else if (sentence.condition && sentence.condition.type == "people"){
            var contents = sentence.condition.contents;
            for(var i = 0; i < contents.length; i++){
                var item = contents[i];
                if(userData.people.includes(item.name)){
                    sentence.say += item.piece;
                }
            }

            return sentence;
        }
        else {
            return sentence;
        }
    }

    this.textFromItem = function(item){
        if(item.who && item.say){
            return item.who + ": " + item.say;
        }
        else {
            return null;
        }
    }

    this.reset();
}]);