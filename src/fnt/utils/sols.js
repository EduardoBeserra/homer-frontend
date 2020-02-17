const URLBASE = 'http://projetos01.datacoper.com.br/issues.json'
import dados from '../dados'

const projetos = [
    {id:70, name: 'Progress - Time 01'},
    {id:71, name: 'Progress - Time 02'},
    {id:72, name: 'Progress - Time 03'}
]
const base64 = Buffer.from(`${dados.usuario}:${dados.senha}`).toString('base64')
const config = {
    headers: {"Authorization": "Basic " + base64}
}

export function carregarSols(tracker_id) {
    projetos.forEach(projeto => {
        let solicitacoes = []
        let paramTracker = tracker_id ? `tracker_id=${tracker_id}&` : ''
        let url = `${URLBASE}?project_id=${projeto.id}&${paramTracker}&offset=0&limit=100`
        console.log(url)
        axios.get(url, config).then(resp => {
            console.log(`Fim consulta (Projeto: ${projeto.name})`)
            Array.prototype.push.apply(solicitacoes, resp.data.issues)
            
        }).catch(err => {
            console.log(`Parece que deu erro. (Projeto: ${projeto.name})`)
            console.log(err)
        })
    })
}