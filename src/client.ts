import axios from 'axios'

export function getApi(options: APIOptions) {
    return axios.create({
        baseURL: `https://api.propublica.org/congress/${options.apiVersion}/${options.congressNumber}/`,
        headers: { 'X-API-Key': options.apiKey },
    })
}
