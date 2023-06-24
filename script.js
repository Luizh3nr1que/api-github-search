//seletores
const buttonSearch = document.querySelector('.procurar');
const respostaApi = document.querySelector('.respostaApi');
const inputSearch = document.querySelector('.input');
//fim seletores

//adiciona click ao botao de pesquisa
buttonSearch.addEventListener('click', () => {
    buscarUsuario();
});

//colocando pra poder puxar resultado com o enter
inputSearch.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        buscarUsuario();
    }
});


//funçao da api 
function buscarUsuario() {

    //mostra o container da resposta
    respostaApi.style.display = 'block';

    //pega valor do input e coloca na url da api
    const inputSearch = document.querySelector('.input').value;
    const url = `https://api.github.com/users/${inputSearch}`;

    //funçao basica do fetch ir busca na url
    fetch(url)
        .then(response => {
            if (response.status === 404) {
                erro();
            } else {
                noError();
                return response.json();
            }
        })
        .then(data => {
            //seletores do html pra exibir na tela
            const avatar = document.querySelector('#avatar');
            const nameGit = document.querySelector('#nameGit');
            const nameReal = document.querySelector('#nameReal');
            const bio = document.querySelector('#bio');
            const repositorioApi = document.querySelector('#repositorioApi');
            const followersApi = document.querySelector('#followersApi');
            const followindApi = document.querySelector('#followindApi');
            const localApi = document.querySelector('#localApi');
            const blogApi = document.querySelector('#blogApi');



            //exibindo o conteudo na tela
            avatar.src = data.avatar_url;
            nameGit.textContent = data.login;
            nameReal.textContent = data.name;
            bio.textContent = data.bio;
            repositorioApi.textContent = data.public_repos;
            followersApi.textContent = data.followers;
            followindApi.textContent = data.following;
            localApi.textContent = data.location;
            blogApi.textContent = data.blog;



            if (data.blog === '') {
                blogApi.textContent = 'Não Encontrado';
            }
            if (data.location === null) {
                localApi.textContent = 'Não Encontrado';
            }
            if (data.bio === null) {
                bio.textContent = 'Não Encontrado';
            }
        })
        .catch(error => {
            console.error(error);
        });
};

//function para tirar todos os elementos do container e mostrar so as mensagem
function erro() {
    const header = document.querySelector('.header').style.display = 'none';
    const descricao = document.querySelector('.descricao').style.display = 'none';
    const descPerfil = document.querySelector('.descPerfil').style.display = 'none';
    const erro = document.querySelector('.erro').style.display = 'block';
}

//function pra mostrar os elementos e tira o erro
function noError() {
    const header = document.querySelector('.header').style.display = 'flex';
    const descricao = document.querySelector('.descricao').style.display = 'flex';
    const descPerfil = document.querySelector('.descPerfil').style.display = 'flex';
    const erro = document.querySelector('.erro').style.display = 'none';
}

//function do botao clear limpando o input e a resposta
function clearConteudo() {
    inputSearch.value = '';
    respostaApi.style.display = 'none';
}
const clear = document.querySelector('.clear').addEventListener('click', clearConteudo);
