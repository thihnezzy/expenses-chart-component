

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
data.then((res)=>{
    console.log(res);
});
