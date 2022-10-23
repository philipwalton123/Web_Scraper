const axios = require('axios')
const cheerio = require('cheerio')


getImage()

async function getImageById(html, elementType, className) {

    const request2 = await axios.get(`https://www.imdb.com/name/nm0000158/?ref_=fn_al_nm_0`).then((data)=> {
    console.log("got actor page html")
    console.log(Object.keys(data))
    return data })

const actorPageHTML = request2.data

// ###################################

    const result = cheerio.load(actorPageHTML)
    const elements = []

    result("#name-poster").each((index, event)=>{
        console.log ("event: ", index)
        console.log(event.attribs.id)
        if (event.attribs.id == "name-poster") elements.push(event.attribs.src)
    })
    console.log(elements)
    return elements
}