# 02 자바스크립트 기초 문법과 모듈
## 02-1 자바스크립트 기초 문법

### 템플릿 리터럴
문자열과 변수, 식을 섞어서 하나의 문자열을 만드는 표현 방식. 
백틱(`)기호를 써서 문자열을 만든다. 

### 여러 형태의 함수
1. 기본 방법
 함수를 사용하는 가장 기본적인 방법은 함수를 선언하고 필요할 때 호출하는 것. 
 구성된 함수를 만드는 것을 '함수를 선언한다' 라고 함.
 만들어진 함수를 실행하는 것을 '함수를 호출한다'고 함. 
 ```js
 function 함수명 {...}
 function 함수명(매개변수) {...}
 ```

2. 함수 표현식
 함수 생성시 기본적으로 함수 이름을 붙이지만, 한번만 실행하고 끝나는 함수라면 굳이 이름을 붙이지 않고 필요한 명령만 묶을 수 있음. 
 ```js
 function(매개변수) {...}
 ```
 위와 같은 함수를 **함수 표현식** 이라고 함. 
 
 이름 없는 함수는 변수에 할당하여 변수 이름을 함수처럼 사용할 수 있다. 
 함수를 값으로 가지는 변수는 한번 만들면 바뀌지 않으므로 const 예약어를 사용한다. 

3. 즉시 실행 함수
 비동기 처리 방법으로 함수 안에 또 다른 함수를 넣어서 실행할 수 있다. 
 이런 경우 따로 변수를 거치지 않고 함수를 선언하는 동시에 실행할 수 있다. 이런 함수를 **즉시 실행 함수** 라고 한다. 

4. 화살표 함수
 화살표 함수는 function이라는 예약어를 사용하지 않고 함수 이름도 없다. 
 ```js
 () => {...}
 (매개변수) => {...}
 ```

 화살표 함수에서 실행할 명령어가 한 줄이라면 중괄호 생략 가능.
 또한 return문이 포함되어 있다면 return도 생략 가능. 

## 02-2 자바스크립트 비동기 처리

node 프로그램은 서버에서 실행하므로 대부분의 명령을 비동기 처리해야 함 -> 비동기 개념을 확실히 잡아야 함. 

### 동기 처리와 비동기 처리

**동기 처리**: 프로그램 코드를 작성한 순서대로 처리하는 방식

`sync.js`
```js
function displayA() {
    console.log("A");
}

function displayB() {
    console.log("B");
}

function displayC() {
    console.log("C");
}

displayA();
displayB();
displayC();

/*
A
B
C
*/
```

**비동기 처리**: 시간이 걸리는 함수와 빨리 처리할 수 있는 함수가 뒤섞여 있을 때 함수들을 원하는 처리 순서에 맞게 프로그래밍하는 것

비동기를 연습할 때, setTimeout 함수를 사용하기도 함. 이 함수는 괄호 안에 있는 명령을 특정한 시간이 지난 후에 실행함. 

```js
setTimeout(() => {
    console.log("B");
}, 2000);
```


`async-1.js` 
```js
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
```

callback 함수를 통하여 순서를 고정할 수 있음 

`async-2.js`
```js
function displayA() {
    console.log("A");
}
function displayB(callback) {
    setTimeout(() => {
        console.log("B");
        callback();
    }, 2000)
}
function displayC() {
    console.log("C");
}

displayA();
displayB(displayC);

/* 결과
A
B
C
*/
```

자바 스크립트에서 비동기 처리 시 사용하는 방법에는 3가지가 있음. 

#### 1. 콜백 함수

callback function: 다른 함수의 매개변수로 사용하는 함수

`callback.js`

```js
const order = (coffee, callback) => {
    console.log(`${coffee} 주문 접수`);
    setTimeout(() => {
        callback(coffee);
    }, 3000)
}

const display = (result) => {
    console.log(`${result} 완료!`)
}

order('아메리카노', display);
/*결과
아메리카노 주문 접수
아메리카노 완료!
*/
```


**익명으로 콜백 함수 작성하기**

콜백 함수를 사용할 때, 한 번만 실행하고 끝날 경우에는 함수 안에 익명 함수로 직접 작성한다. 
예를 들어, A를 표시한 후 1초 마다 B-> C -> D -> stop! 순서대로 표시한다면 다음과 같이 작성 가능하다. 


`callback-2.js`
```js
function displayLetter() {
    console.log("A");
    setTimeout( () => {
        console.log("B");
        setTimeout( () => {
            console.log("C");
            setTimeout( () => {
                console.log("D");
                setTimeout( () => {
                    console.log("stop!");
                }, 1000);
            }, 1000);
        }, 1000);
    }, 1000);
}

displayLetter()

/*결과
A
B
C
D
stop!
*/
```

위와 같은 코드는 복잡한 기능이 아니지만, 콜백 함수 내에 다른 콜백 함수가 연속으로 들어가게 되어 읽기 어려워진다. 이렇게 콜백이 계속 반복되는 상태를 **콜백 지옥(callback hell)** 이라고 한다. 이를 방지하기 위해 프라미스가 등장한다. 

#### 2. 프라미스

프라미스(Promise) 객체란? 처리에 성공했을 때와 성공하지 않았을 때의 반환 결과를 미리 약속해 둔 것. 

`promise.js`
```js
let likePizza = true;
const pizza = new Promise((resolve, reject) => {
    if(likePizza)
        resolve('피자를 주문합니다. ');
    else
        reject('피자를 주문하지 않습니다. ');
});
```
likePizza의 결과에 따라 true라면 resolve의 '피자를 주문합니다. '를 반환하고, false라면 reject 함수 내에 있는 '피자를 주문하지 않습니다. '를 반환하게 된다. 

즉, 성공이나 실패에 따라 반환할 값만 있을 뿐, 성공하거나 실패했을 때 실행할 명령을 갖고 있는 것은 아님. 

프라미스 객체에서는 처리에 성공했는지 실패했는지에 대한 판단한 함. 

**프라미스를 실행하는 then과 catch 함수**

프라미스에서는 성공과 실패를 판단하고 결괏값을 반환한다. 이 결괏값을 받아서 처리하는 부분을 직접 작성해야 하는데 이때 사용하는 함수가 then, catch이다. 

then함수는 성공했을 때, catch 함수는 실패했을 때 넘겨받은 결과값을 사용해서 실행할 명령을 지정한다. 

```js
    then()      // 성공했을 때 실행할 내용
    catch()     // 실패했을 때 실행할 내용
```

`promise.js`
```js
let likePizza = true;
const pizza = new Promise((resolve, reject) => {
    if(likePizza)
        resolve('피자를 주문합니다. ');
    else
        reject('피자를 주문하지 않습니다. ');
});

pizza
.then(result => console.log(result))
.catch(err => console.log(err));
```

#### 3. async/await

프라미스는 콜백 지옥이 생기지 않도록 코드를 읽기 쉽게 바꾼다. 그런데, 프라미스 역시 체이닝을 사용해서 계속 연결하여 사용하면, 코드가 복잡해질 수 있음. 이를 막기 위하여 async와 await 예약어가 등장함. 

함수 선언 시 async를 붙여서 선언하면 그 함수 안에는 await를 붙여서 비동기 처리를 할 수 있음. 

```js
async function init() {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    const users = await response.json();
    console.log(users);
}

init();
```

init 함수 안에서 비동기 처리를 할 것이므로 init 함수 선언 앞부분에 async를 붙인다. 

fetch 함수는 네트워크를 통하여 서버의 자료를 가져온다. 
await를 붙임으로써 시간이 얼마나 걸리든, 자료 가져오기가 끝난 후에 다음 코드로 넘어가게 만듦. 

response.json 함수는 서버에서 가져온 프라미스 객체를 프로그램에서 사용할 수 있는 객체로 변환한다. 