const fetch = require('node-fetch');
const formatJson = require('json-format');
const dateFormat = require('date-fns');

async function fetchList() {
    const data = await fetch('https://merolagani.com/handlers/AutoSuggestHandler.ashx?type=Company', {
        method: 'post'
    })
    .then(res => res.json())
    .then(list => {
        return list.map(item => ({
            id: item.v,
            code: item.d,
            name: item.l.split('(')[1].replace(')', '')
        }))
    });

    return formatJson({ list: data }, { type: 'space', size: 2 });
}

async function fetchData(code) {
    try {
        const raw = await fetch(`https://merolagani.com/handlers/TechnicalChartHandler.ashx?type=get_advanced_chart&symbol=${code.toUpperCase()}&resolution=1D&rangeStartDate=631152000&rangeEndDate=${Math.floor(Date.now()/1000)}&from=&isAdjust=1&currencyCode=NPR`)
            .then(res => res.json())
        
        let data = [];
        for (let i=0; i<raw.t.length; i++) data.push({ t: raw.t[i], o: raw.o[i], c: raw.c[i], h: raw.h[i], l: raw.l[i], v: raw.v[i] })
        data = data.sort((a,b) => b.t - a.t)

        const formatted = data
        .sort((a,b) => a.t - b.t)
        .map(item => [
            item.t * 1000,
            item.o,
            item.h,
            item.l,
            item.c,
            item.v
        ])

        const csvFormatted = ['Date,Open,High,Low,Close,Volume']
        for (const item of data) {
            const date = dateFormat.format(item.t * 1000, 'yyyy-MM-dd')
            csvFormatted.push(`${date},${item.o},${item.h},${item.l},${item.c},${item.v}`)
        }

        return {
            json: formatJson({ id: code.toUpperCase(), data: formatted }, { type: 'space', size: 2 }),
            text: csvFormatted.join('\n')
        };
    } catch(err) {
        console.log(err)
        throw new Error('Seems like there is some issue fetching company\'s share data. Make sure internet is stable and company code is correct')
    }
}

module.exports = {
    fetchList,
    fetchData
}
