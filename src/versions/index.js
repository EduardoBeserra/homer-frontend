import React, { useEffect, useState } from 'react'

import { getVersions } from '../util/tarefas'

import './styles.css'

export default () => {
    const [versions, setVersions] = useState([])

    useEffect(() => {
        async function getVersoes() {
            setVersions(await getVersions())
        }
        getVersoes()
    }, [])

    const listarVersions = () => {
        console.log(versions)
        return versions.map(v => {
            return <li key={v.id}>{v.id} - {v.name}</li>
        })
    }

    return (
        <div>
            <h1>Versões</h1>
            <ul>
                {listarVersions()}
            </ul>
        </div>
    )
}