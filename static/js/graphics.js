



class GraphGraphics extends Graph {

    constructor(screenSize, nVertices, density) {

        super(screenSize, nVertices, density);

        this.greenColor = "#178A32";
        this.blueColor = "#0E17D8";
        this.blackColor = "#000000";
    }

    handleClick(clickPxLoc,button) {
        console.log(clickPxLoc);
        console.log("pressed:" + button); // 0 is left, 2 is right

    }


    initNodeLocations() {
        var nodeLcs = [];
        var partAngle = (2 * Math.PI / this.nVertices);
        var center = new Loc(this.screenSize / 2, this.screenSize / 2);
        for(var i = 0; i < this.nVertices; i++) {
            // arrange in a circle by default
            var radius = this.screenSize / 3;
            var theta = i * partAngle;
            var x = radius * Math.cos(theta);
            var y = radius * Math.sin(theta);
            var nodeLc = new Loc(x,y);
            nodeLcs.push(nodeLc);
        }
        return nodeLcs;
    }

    printNode(loc,color) {
        var b = document.getElementById('graph');
        var ctx = b.getContext('2d');
        ctx.beginPath();
        ctx.fillStyle = color;
        var i = loc.i + this.screenSize / 2;
        var j = loc.j + this.screenSize / 2;
        ctx.arc(i,j,this.nodeRadius,0, 2 * Math.PI);
        ctx.fill();
        ctx.fillStyle = this.blackColor;
        ctx.arc(i,j,this.nodeRadius + 1,0, 2 * Math.PI);
        ctx.stroke();
    }

    printEdge(i,j,color) {
        console.log("try to print edge");
        var loc0 = this.nodeLocs[i];
        var loc1 = this.nodeLocs[j];
        var b = document.getElementById('graph');
        var ctx = b.getContext('2d');
        ctx.beginPath();
        ctx.fillStyle = color;
        var ix = loc0.i + this.screenSize / 2;
        var iy = loc0.j + this.screenSize / 2;
        var jx = loc1.i + this.screenSize / 2;
        var jy = loc1.j + this.screenSize / 2;
        ctx.moveTo(ix, iy);
        ctx.lineTo(jx, jy);
        ctx.stroke();

    }

    initPrint() {
        this.initPrintEdges();
        this.initPrintNodes();
    }

    initPrintEdges() {
        for(var i = 0; i < this.nVertices; i++) {
            for(var j = i + 1; j < this.nVertices; j++) {
                if(this.areAdjacent(i,j)) {
                    this.printEdge(i,j);
                }
            }
        }

    }

    initPrintNodes() {
        for(var i = 0; i < this.nVertices; i++) {
            console.log("try to print node  at " + this.nodeLocs[i]);
            this.printNode(this.nodeLocs[i],this.greenColor);
        }

    }


}