


class Loc {
    /* pixel location */

    constructor(i,j) {
        this.i = i;
        this.j = j;
    }

    locEquals(loc2) {
        /* is LOC equivalent to arg LOC2? */
        return ((this.i == loc2.i) && (this.j == loc2.j));
    }
}



function getClickLocation(canvas, event) {
    var bounds = canvas.getBoundingClientRect();
    var x = event.clientX - bounds.left;
    var y = event.clientY - bounds.top;
    var loc = new Loc(x,y);
    return loc;
}

/*
function printReadout(message) {
    var readout = document.getElementById('readout');
    readout.innerHTML = message;
}*/

class Graph {
    constructor(screenSize, adjacencyMatrix, nVertices) {
        this.screenSize = screenSize;
        this.adjMat = adjacencyMatrix;
        this.nVertices = nVertices;
        this.nodeLocs = this.initNodeLocations();
        this.indepNum = this.initIndependenceNumber();
        this.nodeRadius = screenSize / (10 * nVertices);
    }

    handleClick(clickPxLoc) {
        console.log(clickPxLoc);

    }

    isValidAdjacencyMatrix() {
        // is the adj matrix simple and undirected?
        for(var i = 0; i < this.nVertices; i++) {
            for(var j = 0; j < this.nVertices; j++) {
                if(i == j) {
                    if (this.adjMat[i][i] != 0) {
                        return false;
                    }
                }
                if (this.adjMat[i][j] != this.adjMat[j][i]) {
                    return false;
                }
            }
        }
        return true;
    }

    areAdjacent(i,j) {
        // are i and j adjacent nodes?
        return this.adjMat[i][j]
    }

    isIndependentSet(nodes) {
        // is the array NODES a list of indices of an independent set?
        var n = nodes.length;
        for(var i = 0; i < n; i++) {
            for(var j = 0; j < n; j++) {

            }

        }
    }

    initIndependenceNumber() {
        /* returns independence number (naive brute force, NP-hard)
            by checking every possible independent set */
    }

    initNodeLocations() {
        var nodeLcs = [];
        var partAngle = (360 / this.nVertices);
        var center = new Loc(this.screenSize / 2, this.screenSize / 2);
        for(var i = 0; i < this.nVertices; i++) {
            // arrange in a circle by default
            var radius = this.screenSize / 3;
            var theta = i * partAngle;
            var nodeLc = new Loc(radius * Math.cos(theta),radius * Math.sin(theta));
            nodeLcs.push(nodeLc)
        }
        return nodeLcs;
    }

    printNode(loc) {
        var b = document.getElementById('graph');
    }

    initPrintEdges() {

    }

    initPrintNodes() {

    }


}
