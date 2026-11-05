// Fatto a Mano: dados do catalogo (iguais ao PDF "Coleção Masculina 2026").
// Para trocar preco, cor ou texto, e so mexer aqui. Fotos de cada peca, por convencao de nome:
//   fotos/grande/<id>-modelo.webp      foto grande do modelo (coluna da esquerda)
//   fotos/grande/<id>-detalhe-1.webp   detalhe de cima (coluna do meio)
//   fotos/grande/<id>-detalhe-2.webp   detalhe de baixo
//   fotos/media/  (mesmos nomes, menores, usados no celular)
// Tudo marcado com TROCAR ainda e provisorio.

window.LOJA = {
  nome: 'Fatto a Mano',
  assinatura: 'Alfaiataria contemporânea',
  colecao: 'Coleção masculina',
  ano: '2026',
  whatsapp: '5511900000000',            // TROCAR: numero com DDI e DDD, so digitos
  instagram: 'fattoamano',              // TROCAR: usuario do Instagram, sem @
  mensagem: 'Olá! Vi o catálogo da Fatto a Mano e tenho interesse na peça {peca} (código {ref}), cor {cor}.',
  mensagemGeral: 'Olá! Vi o catálogo da Fatto a Mano e quero saber mais sobre a coleção.',
};

// Os tres atributos que aparecem em toda ficha (icones: algodao, diamante, camiseta).
window.ATRIBUTOS = [
  { icone: 'algodao',  texto: 'Conforto natural' },
  { icone: 'diamante', texto: 'Alta durabilidade' },
  { icone: 'camiseta', texto: 'Caimento impecável' },
];

// Tabelas PACK: `rotuloColunas` e o texto da primeira celula do cabecalho, `colunas` os tamanhos,
// `linhas` as linhas abaixo (a que tiver `total` mostra o total na ultima coluna).
const PACK_POLO = {
  rotuloColunas: 'Sizes', colunas: ['P', 'M', 'G', 'GG', 'EXG'],
  linhas: [{ rotulo: 'Ratio', valores: [3, 4, 4, 3, 1], total: 15 }],
};
const PACK_CALCA = {
  rotuloColunas: 'Sizes', colunas: ['38', '40', '42', '44', '46', '48', '50'],
  linhas: [{ rotulo: 'Pack', valores: [1, 2, 2, 3, 3, 3, 1], total: 15 }],
};

window.PRODUTOS = [
  {
    id: 'polo-algodao',
    ref: '2601102',
    nome: 'Polo 95% algodão',
    descricao: 'Malha 95% algodão de alta qualidade, toque macio e caimento slim perfeito. Elegância e conforto do dia a dia.',
    preco: 118,
    cores: [
      { id: 'marrom',       nome: 'Marrom',       hex: '#8a5a3b' },
      { id: 'azul-marinho', nome: 'Azul Marinho', hex: '#1b2a4b' },
      { id: 'cinza-mescla', nome: 'Cinza Mescla', hex: '#c5c4c2' },
      { id: 'branco',       nome: 'Branco',       hex: '#f7f6f3' },
      { id: 'preto',        nome: 'Preto',        hex: '#171717' },
    ],
    pack: PACK_POLO,
    fotos: { modelo: 'Polo marrom no modelo', detalhe1: 'Gola e botões da polo cinza mescla', detalhe2: 'Manga da polo marrom' },
  },
  {
    id: 'polo-poliamida',
    ref: '2601101',
    nome: 'Polo poliamida com elastano',
    descricao: 'Poliamida com elastano de alta qualidade, toque macio e caimento slim perfeito. Elegância e conforto do dia a dia.',
    preco: 118,
    cores: [
      { id: 'preto',        nome: 'Preto',        hex: '#171a1f' },
      { id: 'azul-marinho', nome: 'Azul Marinho', hex: '#1f2a3d' },
    ],
    pack: PACK_POLO,
    fotos: { modelo: 'Polo azul-marinho no modelo', detalhe1: 'Gola da polo preta com a etiqueta Fatto a Mano', detalhe2: 'Botão gravado Fatto a Mano' },
  },
  {
    id: 'calca-algodao',
    ref: '2601401',
    nome: 'Calça algodão com elastano bolso face',
    descricao: 'Algodão com elastano de alta qualidade, bolso face e caimento slim perfeito. Elegância e conforto do dia a dia.',
    preco: 218,
    cores: [
      { id: 'preto', nome: 'Preto', hex: '#171717' },
      { id: 'areia', nome: 'Areia', hex: '#d9d3c5' },
      { id: 'cinza', nome: 'Cinza', hex: '#4b4f5a' },
    ],
    pack: PACK_CALCA,
    fotos: { modelo: 'Calça areia com polo branca no modelo', detalhe1: 'Cós e bolso face da calça areia', detalhe2: 'Tecido da calça cinza' },
  },
  {
    id: 'calca-poliamida',
    ref: '2601400',
    nome: 'Calça poliamida com elastano e ajuste',
    descricao: 'Poliamida com elastano de alta qualidade, ajuste lateral e caimento slim perfeito. Elegância e conforto do dia a dia.',
    preco: 218,
    cores: [
      { id: 'preto',        nome: 'Preto',        hex: '#171717' },
      { id: 'azul-marinho', nome: 'Azul Marinho', hex: '#1b2a4b' },
      { id: 'bege',         nome: 'Bege',         hex: '#d8c3ad' },
    ],
    pack: PACK_CALCA,
    fotos: { modelo: 'Calça preta com camisa branca no modelo', detalhe1: 'Botão gravado Fatto a Mano na calça bege', detalhe2: 'Ajuste lateral da calça bege' },
  },
  {
    id: 'costume',
    ref: '2601105',
    nome: 'Costume PV com elastano',
    descricao: 'Tecido PV com elastano de alta qualidade, toque macio e caimento slim perfeito. Elegância e conforto do dia a dia.',
    preco: 560,
    cores: [
      { id: 'preto', nome: 'Preto', hex: '#15181d' },
      { id: 'azul',  nome: 'Azul',  hex: '#1d2f4f' },
      { id: 'cinza', nome: 'Cinza', hex: '#5b5e64' },
    ],
    pack: {
      rotuloColunas: 'Costume', colunas: ['46', '48', '50', '52', '54', '56', '58'],
      linhas: [
        { rotulo: 'Calça', valores: ['40', '42', '44', '46', '48', '52', '54'] },
        { rotulo: 'Pack',  valores: [1, 2, 3, 3, 3, 2, 1], total: 15 },
      ],
    },
    fotos: { modelo: 'Costume azul no modelo', detalhe1: 'Lapela e forro do paletó cinza', detalhe2: 'Botões da manga do paletó azul' },
  },
  {
    id: 'camisa-social',
    ref: '2601200',
    nome: 'Camisa social algodão com elastano',
    descricao: 'Algodão com elastano de alta qualidade, toque macio e caimento slim perfeito. Elegância e conforto do dia a dia.',
    preco: 150,
    cores: [
      { id: 'branco',       nome: 'Branco',       hex: '#f7f6f3' },
      { id: 'preto',        nome: 'Preto',        hex: '#171717' },
      { id: 'azul-marinho', nome: 'Azul Marinho', hex: '#1b2a4b' },
      { id: 'cinza',        nome: 'Cinza',        hex: '#6a6762' },
      { id: 'bege',         nome: 'Bege',         hex: '#d9bb9a' },
      { id: 'azul-medio',   nome: 'Azul Médio',   hex: '#c8dcf4' },
    ],
    pack: {
      rotuloColunas: 'Sizes', colunas: ['2', '3', '4', '5', '6'],
      linhas: [{ rotulo: 'Ratio', valores: [2, 4, 4, 4, 2], total: 16 }],
    },
    fotos: { modelo: 'Camisa social azul médio no modelo', detalhe1: 'Colarinho da camisa azul médio', detalhe2: 'Punho da camisa branca' },
  },
];

// Capa
window.CAPA = {
  frase: 'Elegância em cada detalhe.',
  titulo: 'Fatto a Mano',
  subtitulo: 'Feito à mão. Feito para você.',
};

// Pagina Look Book
window.LOOKBOOK = {
  cantoEsquerdo: 'Estilo e qualidade em cada peça.',
  cantoDireito: 'Coleção masculina 2026',
  titulo: ['Look', 'Book'],
  etiqueta: 'Coleção masculina 2026',
  destaques: [
    { icone: 'tecido',   titulo: 'Tecido premium',      texto: 'Conforto, durabilidade e caimento impecável.' },
    { icone: 'camisa',   titulo: 'Alfaiataria moderna', texto: 'Design essencial para o seu dia a dia.' },
    { icone: 'camadas',  titulo: 'Versatilidade',       texto: 'Peças que combinam com qualquer ocasião.' },
  ],
};

// Pagina final
window.FINAL = {
  titulo: 'Acompanhe a Fatto a Mano',
  texto: 'E fique por dentro das novidades, lançamentos e coleções exclusivas.',
  // Os QR codes do PDF nao sao legiveis (foram desenhados); quando houver o usuario e o numero certos, gere QR reais com o mesmo visual.
  qr: [
    { imagem: 'fotos/marca/qr-instagram.png', rotulo: 'Instagram', link: () => 'https://instagram.com/' + window.LOJA.instagram },
    { imagem: 'fotos/marca/qr-whatsapp.png',  rotulo: 'WhatsApp',  link: () => 'https://wa.me/' + window.LOJA.whatsapp + '?text=' + encodeURIComponent(window.LOJA.mensagemGeral) },
  ],
};
