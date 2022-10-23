const axios = require('axios')
const cheerio = require('cheerio')
const fs = require('file-system')

async function getFilms(name) {
    name = formatName(name)
    
    const request1= await axios.get(`https://www.imdb.com/find?q=${name}`)

    const searchResultHTML = request1.data

    const resultLinkElements = getElementsByTypeAndClass(searchResultHTML, "a", ".result_text")

    const onlyActors = resultLinkElements.filter(element=> /name/.test(element.href))

    console.log(">>>>>>>>GETTING FILMS<<<<<<<<<<")
    
    const request2 = await axios.get(`https://www.imdb.com${onlyActors[0].href}`)

    const actorPageHTML = request2.data

    const titleElements = getElementsByTypeAndClass(actorPageHTML, "", ".filmo-row")

    const actorRoles = titleElements.filter(element=>{return /actor|actress/.test(element.id) === true})
    const producerRoles = titleElements.filter(element=>{return /producer/.test(element.id) === true})
    const directorRoles = titleElements.filter(element=>{return /director/.test(element.id) === true})

    const roles = {
        actor: actorRoles.map(element=>{return element.text}),
        producer: producerRoles.map(element=>{return element.text}),
        director: directorRoles.map(element=>{return element.text})
    }

    console.log(roles)

}

function formatName(name) {
    return name.replace(/\s/g, "+")
}

function getElementsByTypeAndClass(html, elementType, className) {
    const result = cheerio.load(html)
    const elements = []
    
    let selectorString;

    className ? selectorString = className + ' ' + elementType : selectorString = elementType

    result(selectorString).each((index, event)=>{
        
        let thisElement = {
            type: result(event)['0'].name,
            text: result(event).text().replace(/(\s+)/g, ' ')
        }

        let attributes = result(event).attr()
        for (let attribute in attributes) {
            thisElement[attribute] = attributes[attribute]
        }
       
        elements.push(thisElement)
    })
    
    return elements
}

getFilms("Helen Mirren").then(result=> {
    console.log("finished")
    console.log(result)
})