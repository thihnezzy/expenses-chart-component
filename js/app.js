let globalData;
const getData = async () =>{
    try {
        const res = await fetch('./data.json');
        const data = await res.json();
        globalData = data;
        return data;        
    } catch (error) {
        console.error(error);
    }
}

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

const data = getData();
data.then((res)=>{
    const maxAmount = Math.max(...(res.map((obj) => obj['amount'])));
    for (let day of res){
        modifyDiv(maxAmount,day);
    }
});

const spendingChart = document.querySelector('.spending-chart');

spendingChart.addEventListener('click', (e) => {
    if (e.target instanceof HTMLDivElement){
        if (e.target.classList.contains('max')){   
            e.target.classList.toggle("data-max");
        }else
        {
            e.target.classList.toggle("data-normal");
        }
    const overlayDiv = document.getElementById(e.target.classList[1]);
    if (overlayDiv.style.display === "none"){
        let dataDay;
        for (let day of globalData)
            if (day.day === e.target.classList[1]){
                dataDay = day.amount;
            }
        const title = `$${dataDay}`;
        overlayDiv.style.display = "flex";
        overlayDiv.textContent = title;
        }
    else {
        overlayDiv.style.display = "none";
    }}
})
