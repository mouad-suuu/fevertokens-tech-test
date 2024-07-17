#include <stdio.h>

int main() {
    for (int i = 1; i <= 100; i++) {
        if (i % 3 == 0 && i % 5 == 0 && i % 7 == 0) {
            printf("Hello World Yoo\n");
        } else if (i % 3 == 0 && i % 5 == 0) {
            printf("Hello World\n");
        } else if (i % 3 == 0 && i % 7 == 0) {
            printf("Hello Yoo\n");
        } else if (i % 5 == 0 && i % 7 == 0) {
            printf("World Yoo\n");
        } else if (i % 3 == 0) {
            printf("Hello\n");
        } else if (i % 5 == 0) {
            printf("World\n");
        } else if (i % 7 == 0) {
            printf("Yoo\n");
        } else {
            printf("%d\n", i);
        }
    }
    return 0;
}
