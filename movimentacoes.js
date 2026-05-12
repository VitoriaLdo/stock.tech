const container = document.getElementById("cardsContainer");
const pesquisa = document.getElementById("pesquisa");
const filtroTipo = document.getElementById("filtroTipo");
const btnLimpar = document.getElementById("btnLimpar");

let movimentacoes = [];

/* =========================================================
   CARREGAR JSON
========================================================= */

fetch("movimentacoes.json")
    .then(response => response.json())
    .then(data => {
        movimentacoes = data;
        renderizarCards(movimentacoes);
    });

/* =========================================================
   RENDERIZAR CARDS
========================================================= */

function renderizarCards(lista) {

    container.innerHTML = "";

    lista.forEach(item => {

        const card = document.createElement("div");
        card.classList.add("mov-card");

        card.innerHTML = `
            <div class="mov-left">

                <div class="mov-info">
                    <span class="mov-nome">${item.nome}</span>

                    <span class="badge ${item.tipo}">
                        ${formatarTipo(item.tipo)}
                    </span>
                </div>

            </div>

            <div class="mov-right">

                <span class="produto-id">
                    ID: ${item.id}
                </span>

                <div class="acoes-card">
                    <i class="fa-solid fa-pen-to-square"></i>
                    <i class="fa-solid fa-trash"></i>
                </div>

            </div>
        `;

        container.appendChild(card);

    });

}

/* =========================================================
   FORMATAR TIPO
========================================================= */

function formatarTipo(tipo) {

    if (tipo === "entrada") return "Entrada";
    if (tipo === "venda") return "Venda";
    if (tipo === "devolucao") return "Devolução";

    return tipo;

}

/* =========================================================
   FILTROS
========================================================= */

function aplicarFiltros() {

    const termo = pesquisa.value.toLowerCase();
    const tipo = filtroTipo.value;

    const filtrados = movimentacoes.filter(item => {

        const nomeMatch = item.nome.toLowerCase().includes(termo);

        const tipoMatch =
            tipo === "todos" || item.tipo === tipo;

        return nomeMatch && tipoMatch;

    });

    renderizarCards(filtrados);

}

pesquisa.addEventListener("input", aplicarFiltros);
filtroTipo.addEventListener("change", aplicarFiltros);

/* =========================================================
   LIMPAR FILTROS
========================================================= */

btnLimpar.addEventListener("click", () => {

    pesquisa.value = "";
    filtroTipo.value = "todos";

    renderizarCards(movimentacoes);

});