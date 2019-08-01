export function download (dados, filename) {
    let nomearq = filename || 'diferenca.df'
    let binaryData = []
    binaryData.push(dados)
    var a = document.createElement("a");
    a.href = window.URL.createObjectURL(new Blob(binaryData))
    a.setAttribute('download', nomearq);
    document.body.appendChild(a)
    a.click()
}
