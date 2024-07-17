# Task 1

It's using the latest version of Next.js with TypeScript and ShadcnUI

## You can find a live version of the app here:

https://fevertokens-tech-test-rho.vercel.app/

Otherwise if ou want to check for yourself read below :

## Getting Started

- run in the cli: pnpm install
- then run ( pnpm run build ) to build a production ready version for the project
- run ( pnpm run start --port=8000 ) to see the version of the production ready version

Open [http://localhost:8000](http://localhost:8000) with your browser to see the result.

# Task 2

code:

for (let i = 1; i <= 100; i++) {
if (i % 3 === 0 && i % 5 === 0 && i % 7 === 0) {
process.stdout.write("Hello World Yoo");
} else if (i % 3 === 0 && i % 5 === 0) {
process.stdout.write("Hello World");
} else if (i % 3 === 0 && i % 7 === 0) {
process.stdout.write("Hello Yoo");
} else if (i % 5 === 0 && i % 7 === 0) {
process.stdout.write("World Yoo");
} else if (i % 3 === 0) {
process.stdout.write("Hello");
} else if (i % 5 === 0) {
process.stdout.write("World");
} else if (i % 7 === 0) {
process.stdout.write("Yoo");
} else {
process.stdout.write(i.toString());
}
if (i < 100) {
process.stdout.write(", ");
}
}

task2Function();

PS C:\Users\User\Documents\GitHub\fevertokens-tech-test\Task2> node .\answer.js
1, 2, Hello, 4, World, Hello, Yoo, 8, Hello, World, 11, Hello, 13, Yoo, Hello World, 16, 17, Hello, 19, World, Hello Yoo, 22, 23, Hello, World, 26, Hello, Yoo, 29, Hello World, 31, 32, Hello, 34, World Yoo, Hello, 37, 38, Hello, World, 41, Hello Yoo, 43, 44, Hello World, 46, 47, Hello, Yoo, World, Hello, 52, 53, Hello, World, Yoo, Hello, 58, 59, Hello World, 61, 62, Hello Yoo, 64, World, Hello, 67, 68, Hello, World Yoo, 71, Hello, 73, 74, Hello World, 76, Yoo, Hello, 79, World, Hello, 82, 83, Hello Yoo, World, 86, Hello, 88, 89, Hello World, Yoo, 92, Hello, 94, World, Hello, 97, Yoo, Hello, World

# Task 3

To find your friend's broken-down car on an infinite highway, start by driving a set distance \( d \) in one direction (e.g., east), then return to your starting point and drive the same distance \( d \) in the opposite direction (west). If you haven't found your friend, double the search distance to \( 2d \), drive east for \( 2d \), return to the starting point, and then drive west for \( 2d \). Continue this process, doubling the search distance each time (i.e., \( d, 2d, 4d, 8d, \ldots \)) until you locate your friend's car. This method ensures you systematically cover both directions, guaranteeing that you will find your friend's car in a finite amount of time.
