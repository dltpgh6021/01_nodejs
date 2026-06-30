function displayA() {
    console.log("A");
}

function displayB() {   // 2초 후에 console.log("B") 실행
    setTimeout(() => {
        console.log("B");
    }, 2000);
}

function displayC() {
    console.log("C");
}

displayA();
displayB();
displayC();

/*결과
A
C
B
*/