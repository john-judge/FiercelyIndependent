


class Loc {
    /* pixel location */

    constructor(i,j) {
        this.i = i;
        this.j = j;
    }

    loc_equals(loc2) {
        /* is LOC equivalent to arg LOC2? */
        return ((this.i == loc2.i) && (this.j == loc2.j));
    }
}



function get_click_location(canvas, event) {
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
    constructor(screenSize, adjacencyMatrix) {
        this.screenSize = screenSize
        this.adjMat = adjacencyMatrix
    }

    handleClick(clickPxLoc) {
    }


}
