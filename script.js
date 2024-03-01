const bdy = document.querySelector('.body');
const tech = document.querySelector('.tech');
const buss = document.querySelector('.buss');
const global = document.querySelector('.global');
const home = document.querySelector('.home-btn');
const sch_box = document.querySelector('.sch-box');
const sch_btn = document.querySelector('.sch-btn');

const getNews = async (str) => {
    let res
    if (str.length == 0)
        res = await fetch(`https://newsapi.org/v2/top-headlines?country=in&apiKey=${key}`);
    else if (str == 'us')
        res = await fetch(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${key}`);
    else
        res = await fetch(`https://newsapi.org/v2/everything?q=${str}&apiKey=${key}`);

    let data = await res.json();
    let news = data.articles;
    return news;
};

const main = async (str) => {
    let news = await getNews(str);
    for (let i = 0; i < news.length - 3; i += 3) {
        let row = document.createElement('div');
        row.className = 'row';
        for (let j = i; j < i + 3; j++) {
            let date = news[j].publishedAt.split('T')[0];
            let x = news[j].publishedAt.split('T')[1];
            let time = x.split(':')[0] + ':' + x.split(':')[1];

            let box = document.createElement('div');
            box.className = 'box';
            box.innerHTML = `
            <div class="box-img">
                <img src="${news[j].urlToImage}" alt="news-image">
            </div>
            <div class="box-txt">
                <div class="title">${news[j].title}</div>
                <div class="dt">
                    <div>${date}</div>
                    <div>${time}</div>
                </div>
            </div>`;

            let link = news[j].url;
            box.addEventListener('click', () => {
                location.href = link;
            })
            row.append(box);
        }
        bdy.append(row);
    }
};

main("");

home.addEventListener('click', () => {
    bdy.innerHTML = "";
    main("");
})

tech.addEventListener('click', () => {
    bdy.innerHTML = "";
    main('technology');
})

buss.addEventListener('click', () => {
    bdy.innerHTML = "";
    main('business');
})

global.addEventListener('click', () => {
    bdy.innerHTML = "";
    main('global');
})

sch_box.addEventListener('focus', () => {
    sch_box.style.outline = "none";
})

sch_btn.addEventListener('click', () => {
    let topic = sch_box.value;
    if (topic == "")
        alert('Enter someting to search');
    else {
        bdy.innerHTML = "";
        main(topic);
    }
})
