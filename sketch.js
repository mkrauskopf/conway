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

        // for now, hardcoded initial status
        board.status[7][5] = 1;
        board.status[7][6] = 1;
        board.status[8][6] = 1;
        board.status[8][8] = 1;
        board.status[8][9] = 1;
        board.status[8][10] = 1;

        drawConfiguration();

        // temporary for easier debugging
        p.frameRate(3);
    };

    p.draw = function () {
        processToNextStep();
        drawConfiguration();
    };

    var processToNextStep = function () {
        var nextBoard = new Board(board.xLines, board.yLines);
        for (var x = 0; x < board.xLines; x++) {
            for (var y = 0; y < board.yLines; y++) {
                var nOfNeight = computeNeighbours(x, y);
                isLive = board.status[x][y] === 1;
                if (isLive && nOfNeight < 2) {
                    nextBoard.status[x][y] = 0;
                } else if (isLive && (nOfNeight === 2 || nOfNeight === 3)) {
                    nextBoard.status[x][y] = 1;
                } else if (isLive && nOfNeight > 3) {
                    nextBoard.status[x][y] = 0;
                } else if (!isLive && nOfNeight === 3) {
                    nextBoard.status[x][y] = 1;
                } else {
                    nextBoard.status[x][y] = board.status[x][y];
                }
            }
        }
        board = nextBoard;
    };

    var computeNeighbours = function (x, y) {
        return oneForAlive(x, y - 1)
            + oneForAlive(x + 1, y - 1)
            + oneForAlive(x + 1, y)
            + oneForAlive(x + 1, y + 1)
            + oneForAlive(x, y + 1)
            + oneForAlive(x - 1, y + 1)
            + oneForAlive(x - 1, y)
            + oneForAlive(x - 1, y - 1);
    };

    var oneForAlive = function (x, y) {
        if (x < 0 || y < 0 || x >= board.xLines || y >= board.yLines) {
            return 0;
        }
        return board.status[x][y];
    };

    var drawConfiguration = function () {
        for (var x = 0; x < board.xLines; x++) {
            for (var y = 0; y < board.yLines; y++) {
                if (board.status[x][y] === 1) {
                    drawCell(x, y);
                }
            }
        }
    };

    var drawCell = function (xCell, yCell) {
        var y = yCell * lineStep;
        var x = xCell * lineStep;
        p.fill('#4996fd');
        p.rect(x, y, lineStep, lineStep);
    };

};

var myp5 = new p5(sketch, "p5sketch");