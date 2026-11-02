// Fatto a Mano: dados do catalogo.
// Para incluir uma peca nova: acrescente um bloco em PRODUTOS e coloque as fotos com o mesmo padrao de nome:
//   fotos/recorte/<id>-<cor>-frente.webp   e  ...-costas.webp        (peca sem corpo, fundo transparente)
//   fotos/grande/<id>-<cor>-modelo-frente.webp e ...-modelo-costas.webp (no corpo, ate 1600 px)
//   fotos/media/  (mesmos nomes, ate 800 px, usados no celular)
// Tudo marcado com TROCAR ainda e provisorio.

window.LOJA = {
  nome: 'Fatto a Mano',
  whatsapp: '5511900000000',            // TROCAR: numero com DDI e DDD, so digitos
  instagram: 'fattoamano',              // TROCAR: usuario do Instagram, sem @
  endereco: 'Endereço da loja, cidade', // TROCAR
  horario: 'Seg. a sáb., das 10h às 19h', // TROCAR
  mensagem: 'Olá! Vi o catálogo da Fatto a Mano e quero saber mais sobre a {peca} na cor {cor}.',
};

window.PRODUTOS = [
  {
    id: 'social',
    numero: '01',
    tipo: 'Alfaiataria',
    nome: 'Calça de alfaiataria',
    frase: 'Corte reto, vinco marcado e caimento limpo. A base do guarda-roupa de trabalho.',
    tecido: 'Composição do tecido a confirmar', // TROCAR
    tamanhos: ['38', '40', '42', '44', '46', '48'], // TROCAR
    preco: 'Sob consulta', // TROCAR: ex. 'R$ 289'
    cores: [
      { id: 'marinho', nome: 'Marinho', hex: '#1f2a44', tom: '#1c2334' },
      { id: 'cinza',   nome: 'Cinza',   hex: '#9b9ea3', tom: '#2b2e33' },
      { id: 'preto',   nome: 'Preto',   hex: '#151515', tom: '#0e0f11' },
    ],
  },
  {
    id: 'chino',
    numero: '02',
    tipo: 'Casual',
    nome: 'Calça chino',
    frase: 'Bolso faca, perna mais ajustada e o conforto de todo dia. Do escritório ao fim de semana.',
    tecido: 'Composição do tecido a confirmar', // TROCAR
    tamanhos: ['38', '40', '42', '44', '46', '48'], // TROCAR
    preco: 'Sob consulta', // TROCAR
    cores: [
      { id: 'creme',   nome: 'Creme',   hex: '#e6e1d4', tom: '#3a342b' },
      { id: 'grafite', nome: 'Grafite', hex: '#4b4d52', tom: '#26282c' },
      { id: 'preto',   nome: 'Preto',   hex: '#151515', tom: '#0e0f11' },
    ],
  },
];

// Fotos no modelo que entram no lookbook, na ordem de exibicao.
window.LOOKBOOK = [
  { foto: 'social-marinho-modelo-frente', peca: 'Calça de alfaiataria', cor: 'Marinho' },
  { foto: 'chino-creme-modelo-frente',    peca: 'Calça chino',          cor: 'Creme' },
  { foto: 'social-cinza-modelo-costas',   peca: 'Calça de alfaiataria', cor: 'Cinza' },
  { foto: 'chino-grafite-modelo-frente',  peca: 'Calça chino',          cor: 'Grafite' },
  { foto: 'social-preto-modelo-frente',   peca: 'Calça de alfaiataria', cor: 'Preto' },
  { foto: 'chino-preto-modelo-costas',    peca: 'Calça chino',          cor: 'Preto' },
  { foto: 'social-cinza-modelo-frente',   peca: 'Calça de alfaiataria', cor: 'Cinza' },
  { foto: 'chino-creme-modelo-costas',    peca: 'Calça chino',          cor: 'Creme' },
  { foto: 'social-marinho-modelo-costas', peca: 'Calça de alfaiataria', cor: 'Marinho' },
  { foto: 'chino-grafite-modelo-costas',  peca: 'Calça chino',          cor: 'Grafite' },
  { foto: 'social-preto-modelo-costas',   peca: 'Calça de alfaiataria', cor: 'Preto' },
  { foto: 'chino-preto-modelo-frente',    peca: 'Calça chino',          cor: 'Preto' },
];

// Composicoes da secao Colecao. "nota" e o texto pequeno sob o titulo.
window.COLECAO = [
  { foto: 'composicao-mesa',         titulo: 'Camisas',           nota: 'Branco, areia, cinza e preto', grande: true }, // TROCAR
  { foto: 'composicao-polos',        titulo: 'Polos',             nota: 'Em breve no catálogo' },          // TROCAR
  { foto: 'composicao-pilha',        titulo: 'Chinos',            nota: 'Creme, grafite e preto' },
  { foto: 'composicao-camisa-calca', titulo: 'Conjunto de trabalho', nota: 'Camisa e calça de alfaiataria' },
];
