const getModulo = sol => {
    let cfModulo = []
    if(sol.custom_fields) {
        cfModulo = sol.custom_fields.filter(cf => {
            return cf.id === 72
        })
    }
    if(cfModulo.length > 0)
        return cfModulo[0].value
    return ''
}

module.exports = { getModulo }