class GameOfLife {
    constructor(theme) {
        this.theme = theme;
        this.colors = this.theme === "dark" 
            ? { alive: "#665c54", dead: "#504945" } 
            : { alive: "#ebdbb2", dead: "#d5c4a1" };
    }

    init(turns, width, height) {
        this.width = width;
        this.height = height;
        this.turns = turns;
        this.board = Array.from({ length: height }, () => 
            Array.from({ length: width }, () => Math.round(Math.random()))
        );
        this.boardNext = Array.from({ length: height }, () => new Array(width).fill(0));
    }

    nextGen() {
        const { width, height, board, boardNext } = this;

        for (let x = 0; x < height; x++) {
            for (let y = 0; y < width; y++) {
                let n = 0;
                for (let dx = -1; dx <= 1; dx++) {
                    for (let dy = -1; dy <= 1; dy++) {
                        if ((dx || dy) &&
                            board[x + dx] &&
                            board[x + dx][y + dy]) n++;
                    }
                }

                boardNext[x][y] = (board[x][y] && (n === 2 || n === 3)) || (!board[x][y] && n === 3) ? 1 : 0;
            }
        }

        // Swap boards instead of copying
        [this.board, this.boardNext] = [this.boardNext, this.board];
    }

    print(ctx, cellW = 8, cellH = 8) {
        for (let x = 0; x < this.height; x++) {
            for (let y = 0; y < this.width; y++) {
                ctx.fillStyle = this.board[x][y] ? this.colors.alive : this.colors.dead;
                ctx.fillRect(y * cellW, x * cellH, cellW, cellH);
            }
        }
    }
}

function getCurrentTheme() {
    const saved = localStorage.getItem('theme');
    return saved ? saved.split('-')[0] : (window.matchMedia("(prefers-color-scheme: dark)").matches ? 'dark' : 'light');
}

function GameOfLifeInit() {
    const cellSize = 12;
    const canvas = document.getElementById('random');
    const ctx = canvas.getContext('2d');

    let game = new GameOfLife(getCurrentTheme());

    const resizeBoard = () => {
        const cols = Math.floor(window.innerWidth / cellSize);
        const rows = Math.floor(window.innerHeight / cellSize);
        game.init(null, cols, rows);

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    };

    resizeBoard();

    let lastUpdate = 0;
    const speed = 250;

    const animate = (timestamp) => {
        if (!lastUpdate) lastUpdate = timestamp;
        const elapsed = timestamp - lastUpdate;

        if (elapsed > speed) {
            game.nextGen();
            game.print(ctx, cellSize, cellSize);
            lastUpdate = timestamp;
        }

        requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);

    window.addEventListener("resize", resizeBoard);

    document.getElementById('theme-toggle').addEventListener('click', () => {
        game = new GameOfLife(getCurrentTheme());
        resizeBoard();
    });
}
