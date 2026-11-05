# Fatto a Mano, catálogo digital

Catálogo folheável, estático, sem build. Abre direto na Vercel ou em qualquer servidor de arquivos.

As 9 páginas são as mesmas do PDF "Coleção masculina 2026": capa, Look Book, seis peças e a página final com Instagram e WhatsApp. No computador cada página é uma folha deitada, na proporção do PDF, que vira em 3D pela borda esquerda. No celular a mesma página se reorganiza em pé (foto do modelo, detalhes lado a lado, ficha embaixo) e rola por dentro; vira com o dedo para o lado. Setas, teclado (setas, Page Up/Down, Home, End) e a tira de miniaturas também navegam.

## Estrutura

| Caminho | O que é |
|---|---|
| `index.html` | A casca: topo com contador, mesa com o livro, base com setas e miniaturas |
| `css/estilo.css` | Visual (medidas tiradas do PDF, tipografia, virada 3D, efeitos, versão do celular) |
| `js/produtos.js` | **Dados do catálogo**: loja, as 6 peças (código, nome, descrição, cores, preço, tabela PACK), textos da capa, do Look Book e da página final |
| `js/catalogo.js` | Monta as páginas a partir dos dados, encaderna, folheia e cuida dos efeitos que precisam de script |
| `fotos/grande/` | Fotos grandes: modelo e dois detalhes por peça, capa (sem o texto) e o modelo do Look Book recortado |
| `fotos/media/` | As mesmas fotos menores, para o celular |
| `fotos/mini/` | Miniatura de cada página, para a tira de baixo |
| `fotos/marca/` | Logotipos (claro e escuro, com e sem o nome), símbolo e os dois QR codes |
| `vercel.json` | Cache de uma semana para as fotos |

## Efeitos

- Capa: a foto revela, as letras de FATTO A MANO entram uma a uma abrindo o espaçamento, uma luz varre o título e a foto acompanha o mouse.
- Look Book: LOOK entra pela esquerda e BOOK pela direita, o modelo sobe, a etiqueta pula e o texto do fundo se move com o mouse.
- Peças: a foto do modelo revela com zoom lento, os detalhes descem, a ficha sobe em sequência, o traço é costurado, os ícones se desenham, as bolinhas de cor pipocam, o preço conta até o valor e o PACK carimba célula a célula. Nas fotos de detalhe, uma lupa amplia o tecido (mouse no computador, segurar o dedo no celular) e a foto inclina em 3D com o mouse.
- Página final: os QR codes viram em 3D e a luz do fundo se move devagar.

Quem preferir menos movimento (opção do sistema) vê tudo parado.

## Tipografia

Bodoni Moda (títulos, preço e capa), EB Garamond (descrições), Poppins (rótulos) e Archivo largo (LOOK BOOK), todas do Google Fonts.

## O que ainda é provisório

Tudo marcado com `TROCAR` em `js/produtos.js`: o número do WhatsApp e o usuário do Instagram. Os QR codes vieram do PDF e não são legíveis por leitor de código; quando houver o usuário e o número certos, gere QR codes de verdade com o mesmo visual e troque os dois arquivos em `fotos/marca/`.

## Como trocar um texto, preço ou cor

Tudo em `js/produtos.js`. Preço é número (`118` vira "R$ 118,00"). Cada cor tem o tom da bolinha em `hex`. A tabela PACK tem as colunas (tamanhos) e as linhas; a linha com `total` mostra o total.

## Como incluir uma peça

1. Em `js/produtos.js`, copie um bloco de `PRODUTOS` e troque `id`, `ref`, `nome`, `descricao`, cores, preço e PACK.
2. Coloque três fotos com o `id` do bloco no nome: `fotos/grande/<id>-modelo.webp`, `fotos/grande/<id>-detalhe-1.webp`, `fotos/grande/<id>-detalhe-2.webp`, e as mesmas em `fotos/media/` (menores).
3. Gere a miniatura da página em `fotos/mini/` seguindo a numeração (a nova peça empurra as seguintes).

## Fotos

As páginas do PDF foram recortadas com `sharp` (Node): foto do modelo e detalhes por detecção dos vãos claros, capa com o texto apagado por interpolação da parede, Look Book com o modelo separado do fundo e os QR codes e o logotipo extraídos da página final.
