
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




function getClickLocation(canvas, event, screenSize) {
    var bounds = canvas.getBoundingClientRect();
    var x = event.clientX - bounds.left;
    var y = event.clientY - bounds.top;
    var loc = new Loc(x,y);
    return loc;
}
