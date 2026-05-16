"use strict";

const $ = id => document.getElementById(id);

window.onload = () => {
    aplicarConfiguracoesIniciais();
};

/* =======================================================================
   SISTEMA DE CONFIGURAÇÕES (LOCALSTORAGE)
   ======================================================================= */
function aplicarConfiguracoesIniciais() {
    // Puxa as informações que você salvar, ou usa o padrão
    const nome = localStorage.getItem("st_nome") || "Vitória";
    const email = localStorage.getItem("st_email") || "vitoria@stocktech.com";
    const cargo = localStorage.getItem("st_cargo") || "Analista de Estoque";
    const tema = localStorage.getItem("st_tema") || "light";

    // Altera os nomes na Topbar e no Dropdown do Perfil
    $("nav-name").innerText = nome.split(" ")[0];
    $("nav-avatar").innerText = nome.substring(0, 2).toUpperCase();
    $("drop-name").innerText = nome;
    $("drop-email").innerText = email;
    $("drop-cargo").innerText = cargo;

    // Altera os valores dos inputs lá dentro do Modal
    $("cfg-nome").value = nome;
    $("cfg-email").value = email;
    $("cfg-cargo").value = cargo;
    $("cfg-tema").value = tema;

    // Mágica do Dark Mode Original
    if (tema === "dark") {
        document.body.setAttribute("data-theme", "dark");
    } else {
        document.body.removeAttribute("data-theme");
    }
}

/* =======================================================================
   CONTROLE DO MODAL DE CONFIGURAÇÕES
   ======================================================================= */
// Botão da engrenagem abre o modal
$("btn-config").addEventListener("click", () => {
    $("modal-config").classList.add("open");
});

// Funções para fechar o modal
function fecharModalConfig() {
    $("modal-config").classList.remove("open");
}
$("btn-fechar-config").addEventListener("click", fecharModalConfig);
$("btn-cancelar-config").addEventListener("click", fecharModalConfig);

// Salvar Mudanças
$("btn-salvar-config").addEventListener("click", () => {
    localStorage.setItem("st_nome", $("cfg-nome").value);
    localStorage.setItem("st_email", $("cfg-email").value);
    localStorage.setItem("st_cargo", $("cfg-cargo").value);
    localStorage.setItem("st_tema", $("cfg-tema").value);

    aplicarConfiguracoesIniciais();
    fecharModalConfig();
    mostrarToast("Configurações salvas com sucesso!");
});

/* =======================================================================
   NAVEGAÇÃO POR ABAS DENTRO DO MODAL
   ======================================================================= */
document.querySelectorAll('.config-tab').forEach(botao => {
    botao.addEventListener('click', () => {
        // Esconde tudo
        document.querySelectorAll('.config-tab').forEach(b => b.classList.remove('active'));
        document.querySelectorAll('.config-pane').forEach(p => p.style.display = 'none');

        // Ativa só o que foi clicado
        botao.classList.add('active');
        $(botao.getAttribute('data-tab')).style.display = 'block';
    });
});

/* =======================================================================
   TOAST (AVISOS NA TELA)
   ======================================================================= */
function mostrarToast(msg) {
    const container = $("toast-container");
    const div = document.createElement("div");
    div.className = "toast";
    div.innerHTML = `<i class="fa-solid fa-check"></i> ${msg}`;
    container.appendChild(div);
    setTimeout(() => div.remove(), 3000);
}