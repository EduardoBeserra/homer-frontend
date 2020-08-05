import axios from 'axios'

const url_base = 'http://projetos01.datacoper.com.br/'

const base64 = Buffer.from('eduardo.silva:7394Ed1%5').toString('base64')
const config = {
    headers: {"Authorization": "Basic " + base64}
}
const projetos = [
    {id:70, name: 'Progress - Time 01'},
    {id:71, name: 'Progress - Time 02'},
    {id:72, name: 'Progress - Time 03'}
]

const project_tp = {
    id: 61,
    name: 'Time Progress'
}

export const getTarefas = async version => {
    let tarefas = []
    projetos.forEach(async projeto => {
        let issues = (await axios.get(`${url_base}issues.json?project_id=${projeto.id}&status_id=*&offset=0&limit=100`, config)).data
        tarefas = [ ...tarefas, issues]
    })
    return tarefas
}

export const getVersions = async () => {
    return (await axios.get(`${url_base}projects/${project_tp.id}/versions.json`, config)).data.versions
}