function Board(xLines, yLines) {

    console.log("xLines, yLines = ", xLines, yLines);

    this.xLines = xLines;
    this.yLines = yLines;

    // xLines * yLines array
    this.status = _.range(xLines).map(function () {
        return _.range(yLines).map(function () {
            return 0;
        });
    });

    // for now, hardcoded initial status
    this.status[7][5] = 1;
    this.status[7][6] = 1;
    this.status[8][6] = 1;

}


var sketch = function (p) {

    var board;

    var canvasW = 640;
    var canvasH = 480;
    var lineStep = 20;

    p.setup = function () {
        p.createCanvas(canvasW + 1, canvasH + 1);
        p.background(215);

        // draw grid
        p.stroke(40);
        for (var x = 0; x <= canvasW; x += lineStep) {
            p.line(x, 0, x, canvasH);
        }
        for (var y = 0; y <= canvasH; y += lineStep) {
            p.line(0, y, canvasW, y);
        }

        board = new Board(canvasW / lineStep, canvasH / lineStep);

        drawInitialConfiguration();
    };

    p.draw = function () {

    };

    var drawInitialConfiguration = function () {
        for (var x = 0; x < board.xLines; x++) {
            for (var y = 0; y < board.yLines; y++) {
                if (board.status[x][y] === 1) {
                    drawCell(x, y);
                }
            }
        }
    }

    var drawCell = function (xCell, yCell) {
        var y = yCell * lineStep;
        var x = xCell * lineStep;
        p.fill('#4996fd');
        p.rect(x, y, lineStep, lineStep);
    };

};

var myp5 = new p5(sketch, "p5sketch");