
function locDistance(loc1,loc2) {
    var i2 = Math.pow((loc1.i - loc2.i), 2);
    var j2 = Math.pow((loc1.j - loc2.j), 2);
    return Math.sqrt(i2 + j2);
}



class GraphGraphics extends Graph {

    constructor(screenSize, nVertices, density) {

        super(nVertices, density);

        this.screenSize = screenSize;
        this.nodeLocs = this.initNodeLocations();
        this.nodeRadius = screenSize / (10 * nVertices);
        this.selectedNodes = [];

        this.greenColor = "#178A32";
        this.blueColor = "#0E17D8";
        this.blackColor = "#000000";
    }

    locToNodeIndex(loc) {
        // return node index if location is inside node. Else, return null
        console.log("searching for nearby nodes");
        for (var i = 0; i < this.nVertices; i++) {
            console.log(this.nodeLocs[i]);
            var distance = locDistance(loc,this.nodeLocs[i]);
            if(distance <= this.nodeRadius) {
                return i;
            }
        }
        return null;
    }

    selectNode(i) {
        if (i != null) {
            this.selectedNodes.push(i);
        }
    }

    handleClick(clickPxLoc,button) {
        console.log(clickPxLoc);
        //console.log("pressed:" + button); // 0 is left, 2 is right
        var nd = this.locToNodeIndex(clickPxLoc);
        if (nd != null) {
            var ndLoc = this.nodeLocs[nd];
            this.selectNode(nd);
            this.printNode(ndLoc, this.blueColor);
        }
    }


    initNodeLocations() {
        var nodeLcs = [];
        var partAngle = (2 * Math.PI / this.nVertices);
        var half = this.screenSize / 2;
        for(var i = 0; i < this.nVertices; i++) {
            // arrange in a circle by default
            var radius = this.screenSize / 3;
            var theta = i * partAngle;
            var x = radius * Math.cos(theta) + half;
            var y = radius * Math.sin(theta) + half;
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
        var i = loc.i;
        var j = loc.j;
        ctx.arc(i,j,this.nodeRadius,0, 2 * Math.PI);
        ctx.fill();
        ctx.fillStyle = this.blackColor;
        ctx.arc(i,j,this.nodeRadius + 1,0, 2 * Math.PI);
        ctx.stroke();
    }

    printEdge(i,j,color) {
        var loc0 = this.nodeLocs[i];
        var loc1 = this.nodeLocs[j];
        var b = document.getElementById('graph');
        var ctx = b.getContext('2d');
        ctx.beginPath();
        ctx.fillStyle = color;
        var ix = loc0.i;
        var iy = loc0.j;
        var jx = loc1.i;
        var jy = loc1.j;
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
            this.printNode(this.nodeLocs[i],this.greenColor);
        }
    }


}