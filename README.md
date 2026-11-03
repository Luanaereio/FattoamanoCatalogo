# Fatto a Mano, catálogo digital

Catálogo folheável, estático, sem build. Abre direto na Vercel ou em qualquer servidor de arquivos.

No computador o livro abre em página dupla e a folha da direita vira em 3D; no celular, uma página por tela, folheando com o dedo. Setas, teclado (setas, Page Up/Down, Home, End) e a tira de miniaturas também navegam.

## Estrutura

| Caminho | O que é |
|---|---|
| `index.html` | A casca: topo com contador, mesa com o livro, base com setas e miniaturas |
| `css/estilo.css` | Visual (papel, tipografia, livro e virada 3D, palco da peça, celular) |
| `js/produtos.js` | **Dados do catálogo**: loja, peças, cores, lookbook e "em breve" |
| `js/catalogo.js` | Monta as páginas, encaderna em folhas, folheia e cuida do giradouro da peça |
| `fotos/recorte/` | Peças sem corpo com fundo transparente (usadas no palco) |
| `fotos/grande/` | Fotos até 1600 px (modelo e composições) |
| `fotos/media/` | As mesmas fotos até 800 px (celular e miniaturas) |
| `fotos/marca/` | Logo claro, logo escuro e símbolo |

## Ordem das páginas

Capa · Índice · Apresentação · uma página dupla por peça (foto com giro à esquerda, ficha à direita) · Lookbook (uma foto por página) · Em breve · Contracapa com contato.

A numeração e o índice são calculados sozinhos: peça nova empurra o resto.

## O que ainda é provisório

Tudo marcado com `TROCAR` em `js/produtos.js`:

- número do WhatsApp, usuário do Instagram, endereço e horário da loja;
- endereço do e-commerce (`LOJA.loja`) e a página de cada peça na loja (`url`); enquanto vazios, o botão "Comprar na loja" não aparece;
- tecido, tamanhos e preço de cada peça;
- textos e legendas da página "Em breve";
- o texto da página de apresentação, em `js/catalogo.js`, precisa de confirmação da loja.

## Como incluir uma peça

1. Em `js/produtos.js`, copie um bloco de `PRODUTOS` e troque `id`, `ref`, `nome`, `frase`, cores etc.
2. Coloque as fotos seguindo o padrão de nome, onde `<id>` e `<cor>` são os mesmos do bloco:
   - `fotos/recorte/<id>-<cor>-frente.webp` e `fotos/recorte/<id>-<cor>-costas.webp`
   - `fotos/grande/<id>-<cor>-modelo-frente.webp` e `fotos/grande/<id>-<cor>-modelo-costas.webp`
   - `fotos/media/<id>-<cor>-modelo-frente.webp` e `fotos/media/<id>-<cor>-modelo-costas.webp`
3. Para a peça aparecer no lookbook, acrescente uma linha em `LOOKBOOK` com a mesma `ref`.

## Fotos

As fotos originais ficam fora do repositório. A conversão para WebP e o recorte do fundo branco foram feitos com `sharp` (Node), por preenchimento a partir das bordas: só o branco ligado ao contorno vira transparente, e a borda recebe a cor de dentro da peça para não ficar um fio claro. Peça nova sem corpo precisa ser fotografada sobre fundo branco liso.
