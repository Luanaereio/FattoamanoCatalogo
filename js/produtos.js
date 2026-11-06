// Fatto a Mano: dados do catalogo, iguais ao PDF "Catalogo Atacado 2026" (10 paginas).
// Para trocar preco, cor ou texto, e so mexer aqui. Fotos de cada peca, pelo codigo:
//   fotos/grande/<codigo>-modelo.webp      foto grande do modelo
//   fotos/grande/<codigo>-detalhe-1.webp   detalhe de cima
//   fotos/grande/<codigo>-detalhe-2.webp   detalhe de baixo
//   fotos/media/  (mesmos nomes, menores, usados no celular)
// As fotos ficam uma semana guardadas no navegador de quem ja abriu: ao trocar uma foto, troque tambem o NOME do arquivo.

window.LOJA = {
  nome: 'Fatto a Mano',
  assinatura: 'Alfaiataria contemporânea',
  whatsapp: '5511920526328',                     // so digitos, com 55 e DDD
  whatsappTexto: '+55 11 92052-6328',            // como aparece na pagina de contato
  email: 'fattoamanomarketplaces@gmail.com',
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
const PACK_CAMISA = {
  rotuloColunas: 'Sizes', colunas: ['2', '3', '4', '5', '6'],
  linhas: [{ rotulo: 'Ratio', valores: [2, 4, 4, 4, 2], total: 16 }],
};
const PACK_CALCA = {
  rotuloColunas: 'Sizes', colunas: ['38', '40', '42', '44', '46', '48', '50'],
  linhas: [{ rotulo: 'Pack', valores: [1, 2, 2, 3, 3, 3, 1], total: 15 }],
};

// As pecas, na ordem do PDF. `id` e o codigo (e o comeco do nome dos arquivos de foto).
window.PRODUTOS = [
  {
    id: '2601102', ref: '2601102',
    nome: 'Polo 95% algodão',
    linhas: ['Polo 95%', 'algodão'], // como o nome quebra no PDF
    descricao: 'Malha 95% algodão de alta qualidade, toque macio e caimento slim perfeito. Elegância e conforto do dia a dia.',
    preco: 99.90,
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
    id: '2601101', ref: '2601101',
    nome: 'Polo poliamida com elastano',
    linhas: ['Polo poliamida', 'com elastano'], // como o nome quebra no PDF
    descricao: 'Poliamida com elastano de alta qualidade, toque macio e caimento slim perfeito. Elegância e conforto do dia a dia.',
    preco: 89.90,
    cores: [
      { id: 'preto',        nome: 'Preto',        hex: '#171a1f' },
      { id: 'azul-marinho', nome: 'Azul Marinho', hex: '#1f2a3d' },
    ],
    pack: PACK_POLO,
    fotos: { modelo: 'Polo azul-marinho no modelo', detalhe1: 'Gola da polo preta com a etiqueta Fatto a Mano', detalhe2: 'Botão gravado Fatto a Mano' },
  },
  {
    id: '2601105', ref: '2601105',
    nome: 'Costume PV com elastano',
    linhas: ['Costume PV', 'com elastano'], // como o nome quebra no PDF
    descricao: 'Tecido PV com elastano de alta qualidade, toque macio e caimento slim perfeito. Elegância e conforto do dia a dia.',
    preco: 489.90,
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
    id: '2601200', ref: '2601200',
    nome: 'Camisa social algodão com elastano',
    linhas: ['Camisa social', 'algodão com', 'elastano'], // como o nome quebra no PDF
    descricao: 'Algodão com elastano de alta qualidade, toque macio e caimento slim perfeito. Elegância e conforto do dia a dia.',
    preco: 139.90,
    cores: [
      { id: 'branco',       nome: 'Branco',       hex: '#f7f6f3' },
      { id: 'preto',        nome: 'Preto',        hex: '#171717' },
      { id: 'azul-marinho', nome: 'Azul Marinho', hex: '#1b2a4b' },
      { id: 'cinza',        nome: 'Cinza',        hex: '#6a6762' },
      { id: 'bege',         nome: 'Bege',         hex: '#d9bb9a' },
      { id: 'azul-medio',   nome: 'Azul Médio',   hex: '#c8dcf4' },
    ],
    pack: PACK_CAMISA,
    fotos: { modelo: 'Camisa social azul médio no modelo', detalhe1: 'Colarinho da camisa azul médio', detalhe2: 'Punho da camisa branca' },
  },
  {
    id: '2601201', ref: '2601201',
    nome: 'Camisa 100% algodão',
    linhas: ['Camisa', '100% algodão'], // como o nome quebra no PDF
    descricao: 'Algodão 100% de alta qualidade, toque macio e caimento slim perfeito. Elegância e conforto do dia a dia.',
    preco: 149.90,
    cores: [
      { id: 'branco',       nome: 'Branco',       hex: '#f3f2f1' },
      { id: 'azul-marinho', nome: 'Azul Marinho', hex: '#1b2a4b' },
      { id: 'bege',         nome: 'Bege',         hex: '#d8c3a4' },
      { id: 'cinza-escuro', nome: 'Cinza Escuro', hex: '#6b655b' },
      { id: 'azul-escuro',  nome: 'Azul Escuro',  hex: '#23396d' },
      { id: 'vinho',        nome: 'Vinho',        hex: '#7b1414' },
    ],
    pack: PACK_CAMISA,
    fotos: { modelo: 'Camisa azul-marinho no modelo', detalhe1: 'Punho da camisa branca com botões gravados', detalhe2: 'Punho da camisa bege no modelo' },
  },
  {
    id: '2601401', ref: '2601401',
    nome: 'Calça poliamida com elastano bolso faca',
    linhas: ['Calça poliamida', 'com elastano', 'bolso faca'], // como o nome quebra no PDF
    descricao: 'Poliamida com elastano de alta qualidade, bolso faca e caimento slim perfeito. Elegância e conforto do dia a dia.',
    preco: 159.90,
    cores: [
      { id: 'preto',        nome: 'Preto',        hex: '#171717' },
      { id: 'areia',        nome: 'Areia',        hex: '#d9d3c5' },
      { id: 'cinza-escuro', nome: 'Cinza Escuro', hex: '#4b4f5a' },
    ],
    pack: PACK_CALCA,
    fotos: { modelo: 'Calça areia com polo branca no modelo', detalhe1: 'Botão gravado Fatto a Mano na calça preta', detalhe2: 'Bolso faca da calça cinza escuro' },
  },
  {
    id: '2601400', ref: '2601400',
    nome: 'Calça algodão com elastano bolso faca com ajuste',
    linhas: ['Calça algodão', 'com elastano', 'bolso faca', 'com ajuste'], // como o nome quebra no PDF
    descricao: 'Algodão com elastano de alta qualidade, ajuste lateral e caimento slim perfeito. Elegância e conforto do dia a dia.',
    preco: 169.90,
    cores: [
      { id: 'preto',        nome: 'Preto',        hex: '#171717' },
      { id: 'azul-marinho', nome: 'Azul Marinho', hex: '#1b2a4b' },
      { id: 'kaki',         nome: 'Kaki',         hex: '#dccbb3' },
    ],
    pack: PACK_CALCA,
    fotos: { modelo: 'Calça preta com camisa branca no modelo', detalhe1: 'Botão gravado Fatto a Mano na calça kaki', detalhe2: 'Ajuste lateral da calça azul-marinho' },
  },
];

// Pagina 1, Look Book (abre o catalogo)
window.LOOKBOOK = {
  cantoEsquerdo: ['Estilo e', 'qualidade', 'em cada peça.'], // tres linhas, como no PDF
  titulo: ['Look', 'Book'],
  destaques: [
    { icone: 'tecido',  titulo: 'Tecido premium',      texto: 'Conforto, durabilidade e caimento impecável.' },
    { icone: 'camisa',  titulo: 'Alfaiataria moderna', texto: 'Design essencial para o seu dia a dia.' },
    { icone: 'camadas', titulo: 'Versatilidade',       texto: 'Peças que combinam com qualquer ocasião.' },
  ],
};

// Pagina 9, os seis modelos (imagem inteira; o titulo fica atras das cabecas e vai gravado na foto)
window.SEIS = {
  foto: 'seis-modelos',
  descricao: 'Fatto a Mano, alfaiataria contemporânea. Elegância em cada detalhe. Seis modelos com peças da coleção.',
};

// Pagina 10, contato
window.FINAL = {
  titulo: 'Acompanhe a Fatto a Mano',
  texto: 'E fique por dentro das novidades, lançamentos e coleções exclusivas.',
};
