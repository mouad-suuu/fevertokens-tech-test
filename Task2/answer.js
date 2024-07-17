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
