import React, { useState, useEffect } from "react";
import axios from 'axios'

import BasesCheckBox from './basesCheckBox'
import Select from '../common/select'
import Resumo from '../resumo/resumo'

import { bases as basesArq } from "../arq/bases";

import './styles.css'

//const URL_DUMP = 'http://prg01.datacoper.com.br:40580/Homer/rest/'

export default () => {

    let [bases, setBases] = useState([])
    let [baseMain, setBaseMain] = useState('')
    //let [tabelas, setTabelas] = useState('')

    useEffect(() => {
        let bases = basesArq.map(b => { return {...b, status: ''} })
        console.log(bases)
        setBases(bases)
        setBaseMain('main')
        //setTabelas('est001')
    }, [])

    const changeItem = (base) => {
        base.selected = !base.selected

        let newBases = bases.map(b => {
            if (b.name === base.name)
                return base
            else
                return b
        })
        setBases(newBases)
    }

    const setBaseStatus = (base, status) => {
        let newBases = bases.map(b => {
            if (b.name === base.name)
                return { ...b, status }
            else
                return b
        })
        setBases(newBases)
    }

    /*
    const execDiff = baseMain => {
        bases.filter(base => {
            return base.selected
        }).forEach(base => {
            let baseDestino = base.name
            let url = `${URL_DUMP}diff?baseMain=${baseMain}&baseDestino=${baseDestino}&tabelas=${tabelas}`
            axios.get(url).then(resp => {
                console.log(resp.data)
                setBaseStatus(base, 'CONCLUIDO')
            }).catch(err => {
                setBaseStatus(base, 'ERRO')
                console.log(`Erro base ${baseDestino}`)
                console.log(err)
            })
        })
    }
    */

    const executar = () => {
        let basesSel = bases.filter(b => b.selected)
        basesSel.forEach(b => {
            axios.get('http://prg01.datacoper.com.br:40580/IntegradorProgress/rest/Properties').then(resp => {
                setBaseStatus(b, 'CONCLUIDO')
            }).catch(err => {
                setBaseStatus(b, 'CONCLUIDO')
            })
        })
        /*
        let { baseMain, tabelas } = this.state
        let url = `${URL_DUMP}dump/filename?base=${baseMain}&tabelas=${tabelas}`
        axios.get(url).then(resp => {
            this.execDiff(`file=${resp.data}`)
        }).catch(err => {
            this.addNotification({
                title: 'Erro ao executar!',
                message: err.toString(),
                type: 'danger'
            })
        })
        */
    }

    /*
    function wait(time) {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve();
            }, time);
        });
    }
    */

    const setMain = (evt) => {
        setBaseMain(evt.target.value)
    }

    return (
        <>
            <div className="cb-titulo">Atualização</div>
            <div className="cb-content form-flex">
                <div className="cb-panel-left">
                    <div className="campo">
                        <label>Base Main</label>
                        <Select list={bases} chave="name" valor="name"
                            onChange={setMain} default={baseMain}
                            className="cb-select-form" />
                    </div>
                    <BasesCheckBox list={bases} changeItem={changeItem} />
                </div>

                <Resumo className="cb-panel-right" execute={executar} />
            </div>
        </>
    )
}