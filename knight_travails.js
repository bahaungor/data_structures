// Define the knight's moves
const moves = [
    [-2, -1], [-2, 1], [2, -1], [2, 1],
    [-1, -2], [-1, 2], [1, -2], [1, 2]
];

// Function to check if a position is valid on the board
const isValidMove = (x, y) => {
    return x >= 0 && x < 8 && y >= 0 && y < 8;
};

// Function to find the shortest path using BFS
const knightMoves = (start, end) => {
    const queue = [[start]];
    const visited = new Set([start.toString()]);

    while (queue.length > 0) {
        const path = queue.shift();
        const [x, y] = path[path.length - 1];

        if (x === end[0] && y === end[1]) {
            return path;
        }

        for (const [dx, dy] of moves) {
            const newX = x + dx;
            const newY = y + dy;

            if (isValidMove(newX, newY)) {
                const newPath = [...path, [newX, newY]];
                const key = newPath.toString();

                if (!visited.has(key)) {
                    visited.add(key);
                    queue.push(newPath);
                }
            }
        }
    }

    return null; // If no path found
};

// Example usage:
const start = [0, 0];
const end = [3, 3];
const path = knightMoves(start, end);

if (path) {
    console.log(`You made it in ${path.length - 1} moves! Here's your path:`);
    path.forEach(pos => console.log(pos));
} else {
    console.log("No path found.");
}
