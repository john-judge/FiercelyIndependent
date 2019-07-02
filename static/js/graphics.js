

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
        this.nodeRadius = screenSize / 40;
        this.selectedNodes = [];

        this.greenColor = "#178A32";
        this.blueColor = "#0E17D8";
        this.blackColor = "#000000";
    }

    locToNodeIndex(loc) {
        // return node index if location is inside node. Else, return null
        for (var i = 0; i < this.nVertices; i++) {
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

    deselectNode(i) {
        for(var j = 0; j < this.selectedNodes.length; j++) {
            if(this.selectedNodes[j] == i) {
                this.selectedNodes.splice(j,1);
                i--;
            }
        }
    }

    isLegalSelection(node) {
        // is the node independent with the current THIS.SELECTEDNODES?
        for(var i = 0; i < this.selectedNodes.length; i++) {
            var nd = this.selectedNodes[i];
            console.log(nd);
            if(this.areAdjacent(nd,node)) {
                console.log("" + nd + " and " + node + " are adj");
                return false;
            }
        }
        return true;
    }

    async handleClick(clickPxLoc,button) {
        //console.log("pressed:" + button); // 0 is left, 2 is right
        var nd = this.locToNodeIndex(clickPxLoc);
        if (nd != null) {
            if(!this.selectedNodes.includes(nd)) {
                if(this.isLegalSelection(nd)) {
                    var ndLoc = this.nodeLocs[nd];
                    this.selectNode(nd);
                    console.log(nd + " is indep in selected set:" + this.selectedNodes);
                    this.printNode(ndLoc, this.blueColor);
                    if(this.isPuzzleSolved()) {
                        await sleep(30);
                        alert("puzzle is solved.");
                        this.clearCanvas();
                        startGame();
                    }
                }
            } else {
                var ndLoc = this.nodeLocs[nd];
                this.deselectNode(nd);
                this.printNode(ndLoc, this.greenColor);
            }
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

    clearCanvas() {
        var g  = document.getElementById('graph');
        const ctx = g.getContext('2d');
        ctx.clearRect(0,0,g.width,g.height);
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