// Declarando variáveis
const pixelsDoFogo = []
const larguraFogo = 60
const alturaFogo = 60
// Declarando as cores do fogo
const coresDoFogo = [{ "r": 7, "g": 7, "b": 7 }, { "r": 31, "g": 7, "b": 7 }, { "r": 47, "g": 15, "b": 7 }, { "r": 71, "g": 15, "b": 7 }, { "r": 87, "g": 23, "b": 7 }, { "r": 103, "g": 31, "b": 7 }, { "r": 119, "g": 31, "b": 7 }, { "r": 143, "g": 39, "b": 7 }, { "r": 159, "g": 47, "b": 7 }, { "r": 175, "g": 63, "b": 7 }, { "r": 191, "g": 71, "b": 7 }, { "r": 199, "g": 71, "b": 7 }, { "r": 223, "g": 79, "b": 7 }, { "r": 223, "g": 87, "b": 7 }, { "r": 223, "g": 87, "b": 7 }, { "r": 215, "g": 95, "b": 7 }, { "r": 215, "g": 95, "b": 7 }, { "r": 215, "g": 103, "b": 15 }, { "r": 207, "g": 111, "b": 15 }, { "r": 207, "g": 119, "b": 15 }, { "r": 207, "g": 127, "b": 15 }, { "r": 207, "g": 135, "b": 23 }, { "r": 199, "g": 135, "b": 23 }, { "r": 199, "g": 143, "b": 23 }, { "r": 199, "g": 151, "b": 31 }, { "r": 191, "g": 159, "b": 31 }, { "r": 191, "g": 159, "b": 31 }, { "r": 191, "g": 167, "b": 39 }, { "r": 191, "g": 167, "b": 39 }, { "r": 191, "g": 175, "b": 47 }, { "r": 183, "g": 175, "b": 47 }, { "r": 183, "g": 183, "b": 47 }, { "r": 183, "g": 183, "b": 55 }, { "r": 207, "g": 207, "b": 111 }, { "r": 223, "g": 223, "b": 159 }, { "r": 239, "g": 239, "b": 199 }, { "r": 255, "g": 255, "b": 255 }]

// Função de inicialização
function inicializa() {
    estruturaDoFogo()
    fonteDeFogo()
    renderizacaoDoFogo()

    // Animação do fogo roda infinitamente, com intervalo de 0,05 segundo
    setInterval(calculaProgacaoDoFogo, 50)
}

// Estrutura do fogo em pixels
function estruturaDoFogo() {
    const numeroDePixels = larguraFogo * alturaFogo

    for (let i = 0; i < numeroDePixels; i++) {
        pixelsDoFogo[i] = 0
    }
}

// Programação dos indexs do pixel
function calculaProgacaoDoFogo() {
    for (let coluna = 0; coluna < larguraFogo; coluna++) {
        for (let linha = 0; linha < alturaFogo; linha++) {
            const indexDoPixel = coluna + (larguraFogo * linha)

            atualizaIntesidadeDoFogo(indexDoPixel)
        }
    }

    renderizacaoDoFogo()
}

// Atualização da intesidade do fogo
function atualizaIntesidadeDoFogo(atualIndexDoPixel) {
    const pixelAbaixo = atualIndexDoPixel + larguraFogo

    if (pixelAbaixo >= larguraFogo * alturaFogo) {
        return // Não faz nada
    }

    // Da a sensação de movimento no fogo
    const declinioDoFogo = Math.floor(Math.random() * 3)
    const intensidadePixelAbaixo = pixelsDoFogo[pixelAbaixo]
    const novaIntesidadeFogo = intensidadePixelAbaixo - declinioDoFogo >= 0 ? intensidadePixelAbaixo - declinioDoFogo : 0

    // Da o efeito de vento e atauliza o pixel acima ou do lado (dando a sensação de vento)
    pixelsDoFogo[atualIndexDoPixel - declinioDoFogo] = novaIntesidadeFogo
}

// Renderiza o fogo na table
function renderizacaoDoFogo() {
    var debug = false
    var html = '<table cellpadding=0 cellspacing=0>'

    //Primeiro renderizar nas linhas e depois nas colunas
    for (let linha = 0; linha < alturaFogo; linha++) {
        html += '<tr>'

        for (let coluna = 0; coluna < larguraFogo; coluna++) {
            const indexDoPixel = coluna + (larguraFogo * linha)
            const intensidadeDoFogo = pixelsDoFogo[indexDoPixel]

            if (debug === true) {
                html += '<td>'
                html += `<div class="index-pixel">${indexDoPixel}</div>`
                html += intensidadeDoFogo
                html += '</td>'
            } else {
                const cor = coresDoFogo[intensidadeDoFogo]
                const corDeFundo = `${cor.r},${cor.g},${cor.b}`
                html += `<td class="cor-pixel" style="background-color: rgb(${corDeFundo})">`
                html += '</td>'
            }
        }

        html += '</tr>'
    }

    html += '</table>'

    document.querySelector('#fogo').innerHTML = html
}

// De onde começa o fogo
function fonteDeFogo() {
    for (let coluna = 0; coluna <= larguraFogo; coluna++) {
        // Acha o valor do último pixel
        const valorUltimoIndex = larguraFogo * alturaFogo
        const indexDoPixel = (valorUltimoIndex - larguraFogo) + coluna

        pixelsDoFogo[indexDoPixel] = 36
    }
}

// Coloca a maior quantidade de fogo
function maximoFogo() {
    for (let coluna = 0; coluna <= larguraFogo; coluna++) {
        const valorUltimoIndex = larguraFogo * alturaFogo
        const indexDoPixel = (valorUltimoIndex - larguraFogo) + coluna

        pixelsDoFogo[indexDoPixel] = 36
    }
}

// Apaga o fogo
function minimoFogo() {
    for (let coluna = 0; coluna <= larguraFogo; coluna++) {
        const valorUltimoIndex = larguraFogo * alturaFogo
        const indexDoPixel = (valorUltimoIndex - larguraFogo) + coluna

        pixelsDoFogo[indexDoPixel] = 0
    }
}

// Coloca um pouco mais de fogo
function maisFogo() {
    for (let coluna = 0; coluna <= larguraFogo; coluna++) {
        const valorUltimoIndex = larguraFogo * alturaFogo
        const indexDoPixel = (valorUltimoIndex - larguraFogo) + coluna
        const atualIndexDoPixel = pixelsDoFogo[indexDoPixel]

        if (atualIndexDoPixel < 36) {
            const incrementa = Math.floor(Math.random() * 15)
            const novaIntesidadeFogo = atualIndexDoPixel + incrementa >= 36 ? 36 : atualIndexDoPixel + incrementa

            pixelsDoFogo[indexDoPixel] = novaIntesidadeFogo
        }
    }
}

// Diminui um pouco do fogo
function menosFogo() {
    for (let coluna = 0; coluna <= larguraFogo; coluna++) {
        const valorUltimoIndex = larguraFogo * alturaFogo
        const indexDoPixel = (valorUltimoIndex - larguraFogo) + coluna
        const atualIndexDoPixel = pixelsDoFogo[indexDoPixel]

        if (atualIndexDoPixel > 0) {
            const declinioDoFogo = Math.floor(Math.random() * 15)
            const novaIntesidadeFogo = atualIndexDoPixel - declinioDoFogo >= 0 ? atualIndexDoPixel - declinioDoFogo : 0

            pixelsDoFogo[indexDoPixel] = novaIntesidadeFogo
        }
    }
}

// Inicializa o fogo
inicializa()