# Fatto a Mano, catálogo digital

Catálogo folheável, estático, sem build. Abre direto na Vercel ou em qualquer servidor de arquivos.

As 10 páginas são as mesmas do PDF "Catálogo Atacado 2026": Look Book (abertura), sete peças, a página dos seis modelos e o contato com WhatsApp e e-mail. No computador cada página é uma folha deitada, na proporção do PDF, que vira em 3D pela borda esquerda. No celular a mesma página se reorganiza em pé (foto do modelo, detalhes lado a lado, ficha embaixo) e rola por dentro; a folha vira como papel, girando pela borda esquerda e acompanhando o dedo. Setas, teclado (setas, Page Up/Down, Home, End) e a tira de miniaturas também navegam.

Tocar ou clicar numa foto (modelo, detalhes, os seis modelos) abre ela ampliada em tela cheia; tocar de novo aproxima, e dá para passear pela foto com o dedo. O X, a tecla Esc e o botão voltar do aparelho fecham.

## Estrutura

| Caminho | O que é |
|---|---|
| `index.html` | A casca: topo com contador, mesa com o livro, base com setas e miniaturas |
| `css/estilo.css` | Visual (medidas tiradas do PDF, tipografia, virada 3D, efeitos, versão do celular) |
| `js/produtos.js` | **Dados do catálogo**: loja (WhatsApp e e-mail), as 7 peças (código, nome, linhas do título, descrição, cores, preço, tabela PACK) e os textos do Look Book e do contato |
| `js/catalogo.js` | Monta as páginas a partir dos dados, encaderna, folheia e cuida dos efeitos que precisam de script |
| `fotos/grande/` | Fotos grandes: modelo e dois detalhes por peça (nome começa pelo código), o modelo do Look Book recortado e a foto dos seis modelos |
| `fotos/media/` | As mesmas fotos menores, para o celular |
| `fotos/zoom/` | Fotos em alta resolução usadas só na foto ampliada (modelo de cada peça e os seis modelos); carregam quando a pessoa abre |
| `fotos/mini/` | Miniatura de cada página, para a tira de baixo |
| `fotos/marca/` | Logotipos e símbolo |
| `vercel.json` | Cache de uma semana para as fotos |

## Como trocar um texto, preço ou cor

Tudo em `js/produtos.js`. Preço é número (`99.90` vira "R$ 99,90"). Cada cor tem o tom da bolinha em `hex`. `linhas` é o nome da peça quebrado como no PDF (no computador o título quebra exatamente ali; no celular corre solto). A tabela PACK tem as colunas (tamanhos) e as linhas; a linha com `total` mostra o total.

## Como trocar uma foto

As fotos ficam uma semana guardadas no navegador de quem já abriu o catálogo. Por isso, ao trocar uma foto, **troque também o nome do arquivo** (e o nome correspondente no código ou nos dados). Com o mesmo nome, quem já visitou continua vendo a foto antiga.

## Como incluir uma peça

1. Em `js/produtos.js`, copie um bloco de `PRODUTOS` e troque `id`, `ref`, `nome`, `linhas`, `descricao`, cores, preço e PACK.
2. Coloque três fotos com o `id` do bloco no nome: `fotos/grande/<id>-modelo.webp`, `fotos/grande/<id>-detalhe-1.webp`, `fotos/grande/<id>-detalhe-2.webp`, as mesmas em `fotos/media/` (menores) e a do modelo em alta resolução em `fotos/zoom/<id>-modelo.webp`.
3. Gere a miniatura da página em `fotos/mini/` seguindo a numeração (a nova peça empurra as seguintes).

## Efeitos

- Look Book: LOOK entra pela esquerda e BOOK pela direita, o modelo sobe e o texto do fundo se move com o mouse.
- Peças: a foto do modelo revela com zoom lento, os detalhes descem, a ficha sobe em sequência, o traço é costurado, os ícones se desenham, as bolinhas de cor pipocam, o preço conta até o valor e o PACK carimba célula a célula. A ficha só se anima quando está à vista: no celular, quando a pessoa rola até ela. No computador, nas fotos de detalhe, uma lupa segue o mouse e a foto inclina em 3D.
- Celular: um aviso "Preço e cores" no alto da página da peça mostra que ela continua para baixo e some ao rolar; o pedido pelo WhatsApp é um botão da largura da ficha.
- Seis modelos: a foto chega de leve e uma luz passa pelo título.
- Contato: os dois contatos chegam em sequência e a luz do fundo se move devagar.

Quem preferir menos movimento (opção do sistema) vê tudo parado.

## Cuidado ao mexer no livro

O verso de cada folha só fica visível enquanto ela vira, e no celular não existe. No celular a folha só tem 3D enquanto vira (classe `girando`); a página parada na tela fica sem transform nenhum. Se o verso ficar presente em repouso, o navegador do celular passa a entregar o toque a ele e a página deixa de rolar com o dedo, mesmo com tudo parecendo certo na tela. Qualquer mudança na virada precisa ser testada rolando com toque de verdade, não só no computador.

No celular, a rolagem para cima e para baixo é do navegador e o arrasto para o lado é do script. Duas coisas garantem isso no aparelho de verdade: `touch-action: pan-y` na própria página que rola (`.pg`), porque a regra posta só na mesa é anulada por quem tem rolagem, e a leitura do dedo por eventos de toque com `preventDefault` quando o gesto é de lado. Nenhuma letra do celular fica abaixo de 11 px.

## Tipografia

Bodoni Moda (títulos e preço), EB Garamond (descrições), Poppins (rótulos) e Archivo largo (LOOK BOOK), todas do Google Fonts.

## Fotos

As páginas do PDF foram transformadas em imagem e recortadas com `pdfjs` e `sharp` (Node): foto do modelo e detalhes por detecção dos vãos claros; no Look Book, o modelo foi separado do fundo e o bloco verde reconstruído pela cor.
