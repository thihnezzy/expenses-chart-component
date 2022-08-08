

const getData = async () =>{
    try {
        const res = await fetch('./data.json');
        const data = await res.json();
        return data;        
    } catch (error) {
        console.error(error);
    }
}


const data = getData();


function financial(x) {
    return Number.parseFloat(x).toFixed(5);
  }

// const fullBarPercent = 100;
const fullBarPixel = 150;


const modifyDiv = (maxAmount,day) => {
    const ele = document.querySelector(`.${day['day']}`);
    ele.setAttribute('value',day['amount']);
    const height = day['amount'] / maxAmount * fullBarPixel;
    ele.style.height = `${height}px`;
    if (financial(day['amount']) == financial(maxAmount)){
        ele.classList.add('max');
        ele.style.backgroundColor = "hsl(186,34%,60%)";
    }

}

data.then((res)=>{
    const maxAmount = Math.max(...(res.map((obj) =>{
        return obj['amount'];
    })));
    for (let day of res){
        modifyDiv(maxAmount,day);
    }
});

const daySpending = document.querySelectorAll('.data');

for (day of daySpending){
    day.addEventListener('click', (e) =>{
        console.log(e);
    })
}
