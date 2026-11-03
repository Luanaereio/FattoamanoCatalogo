// Fatto a Mano: dados do catalogo.
// Para incluir uma peca nova: acrescente um bloco em PRODUTOS e coloque as fotos com o mesmo padrao de nome:
//   fotos/recorte/<id>-<cor>-frente.webp   e  ...-costas.webp        (peca sem corpo, fundo transparente)
//   fotos/grande/<id>-<cor>-modelo-frente.webp e ...-modelo-costas.webp (no corpo, ate 1600 px)
//   fotos/media/  (mesmos nomes, ate 800 px, usados no celular)
// Tudo marcado com TROCAR ainda e provisorio.

window.LOJA = {
  nome: 'Fatto a Mano',
  edicao: '2026',                       // aparece na capa
  whatsapp: '5511900000000',            // TROCAR: numero com DDI e DDD, so digitos
  instagram: 'fattoamano',              // TROCAR: usuario do Instagram, sem @
  endereco: 'Endereço da loja, cidade', // TROCAR
  horario: 'Seg. a sáb., das 10h às 19h', // TROCAR
  loja: '',                             // TROCAR: endereco do e-commerce (ex. 'https://www.fattoamano.com.br'); vazio = botao "Comprar" nao aparece
  mensagem: 'Olá! Vi o catálogo da Fatto a Mano e quero saber mais sobre a {peca} na cor {cor} (ref. {ref}).',
};

window.PRODUTOS = [
  {
    id: 'social',
    ref: '01',
    tipo: 'Alfaiataria',
    nome: 'Calça de alfaiataria',
    frase: 'Corte reto, vinco marcado e caimento limpo. A base do guarda-roupa de trabalho.',
    tecido: 'Composição a confirmar', // TROCAR
    tamanhos: ['38', '40', '42', '44', '46', '48'], // TROCAR
    preco: 'Sob consulta', // TROCAR: ex. 'R$ 289'
    url: '',               // TROCAR: pagina do produto no e-commerce
    cores: [
      { id: 'marinho', nome: 'Marinho', hex: '#1f2a44', tom: '#1c2334' },
      { id: 'cinza',   nome: 'Cinza',   hex: '#9b9ea3', tom: '#2b2e33' },
      { id: 'preto',   nome: 'Preto',   hex: '#151515', tom: '#3b3e45' },
    ],
  },
  {
    id: 'chino',
    ref: '02',
    tipo: 'Casual',
    nome: 'Calça chino',
    frase: 'Bolso faca, perna mais ajustada e o conforto de todo dia. Do escritório ao fim de semana.',
    tecido: 'Composição a confirmar', // TROCAR
    tamanhos: ['38', '40', '42', '44', '46', '48'], // TROCAR
    preco: 'Sob consulta', // TROCAR
    url: '',               // TROCAR
    cores: [
      { id: 'creme',   nome: 'Creme',   hex: '#e6e1d4', tom: '#3a342b' },
      { id: 'grafite', nome: 'Grafite', hex: '#4b4d52', tom: '#26282c' },
      { id: 'preto',   nome: 'Preto',   hex: '#151515', tom: '#3b3e45' },
    ],
  },
];

// Paginas do lookbook, uma foto por pagina, na ordem.
window.LOOKBOOK = [
  { foto: 'social-marinho-modelo-frente', peca: 'Calça de alfaiataria', cor: 'Marinho', ref: '01' },
  { foto: 'chino-creme-modelo-frente',    peca: 'Calça chino',          cor: 'Creme',   ref: '02' },
  { foto: 'social-cinza-modelo-costas',   peca: 'Calça de alfaiataria', cor: 'Cinza',   ref: '01' },
  { foto: 'chino-grafite-modelo-frente',  peca: 'Calça chino',          cor: 'Grafite', ref: '02' },
  { foto: 'social-preto-modelo-frente',   peca: 'Calça de alfaiataria', cor: 'Preto',   ref: '01' },
  { foto: 'chino-preto-modelo-costas',    peca: 'Calça chino',          cor: 'Preto',   ref: '02' },
];

// Pagina "Em breve": o que ainda nao esta no catalogo.
window.EM_BREVE = {
  titulo: 'Camisas e polos',
  texto: 'Nas mesmas cores das calças. Em breve no catálogo; enquanto isso, pergunte pelo WhatsApp.', // TROCAR
  fotos: [
    { foto: 'composicao-mesa',  legenda: 'Camisas em branco, areia, cinza e preto' }, // TROCAR
    { foto: 'composicao-polos', legenda: 'Polos em azul, branco e preto' },           // TROCAR
  ],
};
