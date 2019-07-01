


/*
function printReadout(message) {
    var readout = document.getElementById('readout');
    readout.innerHTML = message;
}*/

class Graph {

    constructor(screenSize, nVertices, density) {
        this.screenSize = screenSize;
        this.nVertices = nVertices;
        this.density = density;

        this.generateRandomAdjacencyMatrix();
        this.validateAdjacencyMatrix();
        this.printAdjacencyMatrix();

        this.nodeLocs = this.initNodeLocations();
        this.indepNum = this.getIndependenceNumber();
        this.nodeRadius = screenSize / (10 * nVertices);
        this.selectedNodes = [];
    }

    generateRandomAdjacencyMatrix() {
        this.adjMat = [];
        for(var i = 0; i < this.nVertices; i++) {
            this.adjMat.push([]);
            for(var j = 0; j < this.nVertices; j++) {
                if (i > j) {
                    this.adjMat[i].push(this.adjMat[j][i]);
                } else {
                    if (i == j) {
                        this.adjMat[i].push(0);
                    } else if (Math.random() > this.density) {
                        this.adjMat[i].push(1);
                    } else {
                        this.adjMat[i].push(0);
                    }
                }
            }
        }
    }

    validateAdjacencyMatrix() {
        // is the adj matrix simple and undirected?
        for(var i = 0; i < this.nVertices; i++) {
            for(var j = 0; j < this.nVertices; j++) {
                if(i == j) {
                    if (this.adjMat[i][i] != 0) {
                        throw "diagonals of adj mat must be 0";
                    }
                }
                if (this.adjMat[i][j] != this.adjMat[j][i]) {
                    throw "asymmetric adj mat";
                }
            }
        }
    }

    printAdjacencyMatrix() {
        for(var i = 0; i < this.nVertices; i++) {
            console.log(this.adjMat[i]);
        }
    }

    areAdjacent(i,j) {
        // are i and j adjacent nodes?
        return this.adjMat[i][j] == 1;
    }

    isIndependentSet(nodes) {
        // is the array of node indices of an independent set?
        var n = nodes.length;
        for(var i = 0; i < n; i++) {
            for(var j = i+1; j < n; j++) {
                var nd1 = nodes[i];
                var nd2 = nodes[j];
                if(this.areAdjacent(nd1,nd2)) {
                    return false;
                }
            }
        }
        return true;
    }

    isPuzzleSolved() {
        return isIndepedentSet(this.selectedNodes)
                && this.selectedNodes.length == this.indepNum;
    }


    getIndependenceNumber() {
        this.internalIndepNum([],this.nVertices-1,0);
    }

    internalIndepNum(fixedList,upTo,currMax) {
        /* returns independence number (naive brute force, NP-hard)
            by checking all 2^n possible independent sets */
        if(upTo == 0) {
            if(this.isIndependentSet(fixedList)) {
                return Math.max(fixedList.length,currMax);
            } else {
                return currMax;
            }
        }
        var nextUpTo = upTo - 1;
        var maxWithout = this.internalIndepNum(fixedList,nextUpTo,currMax);
        fixedList.push(nextUpTo);
        var maxWith = this.internalIndepNum(fixedList,nextUpTo,currMax);
        return Math.max(maxWithout,maxWith,currMax);
    }
}







