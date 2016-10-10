//1급함수와 명령형 프로그래밍 VS 함수형 프로그래밍의 차이
(()=>{
    //1) 숫자를 변수에 저장하듯 함수를 변수에 저장할 수 있다.
    const fortytwo =_=> 42;
    fortytwo(); //42

    //2) 숫자를 배열에 저장하듯이 함수를 배열에 저장할 수 있다.
    const fortytwos = [ 42, _=>42 ];
    fortytwos[1](); //42

    //3) 숫자를 객체에 저장하듯이 함수를 객체에 저장할 수 있다.
    const fortytwoss = { number: 42, fun: _=>42 }
    fortytwoss.fun(); //42

    //4) 언제든 숫자를 만들 수 있듯, 필요할 때 함수를 만들 수 있다. (IIFE)
    42 + (_=>42)(); //84

    //아래는 특히 고계(고차원)함수라고 한다. (high-order function)
    //5) 함수에 숫자를 전달할 수 있듯, 함수에 함수를 전달할 수 있다.
    const weirdAdd = (n, f) => n + f();
    weirdAdd(42, _=>42); //84

    //6) 함수가 숫자를 반환할 수 있듯이 함수가 함수를 반환할 수 있다.
    (v=> v=> v)()(["something"]); //["something"]


    //명령형 프로그래밍 스타일 (Imperative programming)
    let lyrics = [];
    for(let bottles = 99; bottles > 0; bottles--){
        lyrics.push(`${bottles} bottles of beer on the wall`);
        lyrics.push(`${bottles} bottles of beer`);
        lyrics.push(`Take one down, pass it around`);
        if( bottles > 1 ){
            lyrics.push(`${bottles - 1} bottles of beer on the wall.`);
        } else {
            lyrics.push(`No more bottles of beer on the wall!`);
        }
    }

    //위에서 생성된 lyrics 배열 해체하며 콘솔에 출력
    for( let l of lyrics ) {
        console.log( `명령형 : ${l}` );
    }

    console.log(`\n--------------------------------------------------------------\n\n`);

    //함수형 프로그래밍 스타일 (Fucntional programming)
    //숫자를 입력받으면 해당 숫자에 알맞는 가사를 생성한 뒤 배열로 돌려주는 함수 lyricSegment 선언
    const lyricSegment = (n) => _.chain([])
        .push(`${n} bottles of beer on the wall`)
        .push(`${n} bottles of beer`)
        .push(`Take one down, pass it around`)
        .tap((lyrics) => {
            if(n>1) lyrics.push(`${n - 1} bottles of beer on the wall.`);
            else lyrics.push(`No more bottles of beer on the wall!`);
        })
        .value();

    //시작번호, 끝번호, 함수를 받아 온전한 가사를 만들어주는 함수 song 선언
    const song = (start, end, lyricGen, fn) =>
    _.reduce(_.range(start, end, -1), (acc, n)=>fn(acc, n, lyricGen), []); //2번째 함수를 커스터마이징

    const songToConsole = (acc, n, lyricGen) => { lyricGen(n).forEach((v)=>console.log(`함수형 : ${v}`)); return acc.concat(lyricGen(n)); };
    const songToHTML = (acc, n, lyricGen) => { lyricGen(n).forEach( (v)=>{
        const functionalStyle = document.getElementById("functionalStyle").innerHTML;
        document.getElementById("functionalStyle").innerHTML = `${functionalStyle} ${v}<br>`;
    } ); return acc.concat(lyricGen(n)); };

    //함수형 패러다임으로 작성한 함수 song 호출
    song(99, 0, lyricSegment, songToConsole); //콘솔에 출력하도록

    console.log(`\n--------------------------------------------------------------\n\n`);

    //HTML에 각각 방식으로 출력
    //명령형
    for( let l of lyrics ) {
        const imperativeStyle = document.getElementById("imperativeStyle").innerHTML;
        document.getElementById("imperativeStyle").innerHTML = `${imperativeStyle} ${l}<br>`;
    }

    //함수형
    song(99, 0, lyricSegment, songToHTML);

})();
