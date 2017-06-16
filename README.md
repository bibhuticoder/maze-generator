# maze-generator
Maze generator using Recursive Backtracking algorithm. Yet another time-pass project.

## demo
https://bibhuticoder.github.io/maze-generator

## how it works
- Initially choose a random starting point.
- Go to the to the adjacent cell(horizontal or vertical), but only if the adjacent cell has not been visited yet. This becomes the new current cell. Push it onto an stack.
- If all adjacent cells have been visited, pop a cell from the stack and start from it recursively.
- The algorithm ends when the process has backed all the way up to the starting point.
