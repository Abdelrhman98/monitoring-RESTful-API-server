
const axios = require('axios')
async function getMovieTitles(substr) {
    const url = "https://jsonmock.hackerrank.com/api/moviesdata/search/?Title="+substr
    let totalPages=1
    allData= []
    axios.get(url).then((data)=>{
        totalPages=data.data.total_pages
        data.data.data.forEach(element => {
            allData.push(element.Title)
        });
        
        if(totalPages>1){
            for(let i=2;i<=totalPages;i++){
                let urlPage = `${url}&page=${i}`
                axios.get(urlPage).then((data)=>{
                    data.data.data.forEach(element => {
                        allData.push(element.title)
                    });
                })
            }
        }
        
        allData.sort((a, b)=>{
            return a.localeCompare(b)
        })
        console.log(allData);
    })
}

getMovieTitles("spiderman")