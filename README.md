# Fatto a Mano, catálogo digital

Site de uma página, estático, sem build. Abre direto na Vercel ou em qualquer servidor de arquivos.

## Estrutura

| Caminho | O que é |
|---|---|
| `index.html` | A página |
| `css/estilo.css` | Visual (paleta, tipografia, palco 3D, celular) |
| `js/produtos.js` | **Dados do catálogo**: loja, peças, cores, lookbook e coleção |
| `js/catalogo.js` | Monta a vitrine e cuida do giradouro, do lookbook e das animações |
| `fotos/recorte/` | Peças sem corpo com fundo transparente (usadas no palco) |
| `fotos/grande/` | Fotos até 1600 px (modelo e composições) |
| `fotos/media/` | As mesmas fotos até 800 px (celular) |
| `fotos/marca/` | Logo claro, logo escuro e símbolo |

## O que ainda é provisório

Tudo marcado com `TROCAR` em `js/produtos.js`:

- número do WhatsApp, usuário do Instagram, endereço e horário da loja;
- tecido, tamanhos e preço de cada peça;
- as legendas da seção Coleção;
- o texto da seção "A marca" em `index.html` precisa de confirmação da loja.

## Como incluir uma peça

1. Em `js/produtos.js`, copie um bloco de `PRODUTOS` e troque `id`, `numero`, `nome`, `frase`, cores etc.
2. Coloque as fotos seguindo o padrão de nome, onde `<id>` e `<cor>` são os mesmos do bloco:
   - `fotos/recorte/<id>-<cor>-frente.webp` e `fotos/recorte/<id>-<cor>-costas.webp`
   - `fotos/grande/<id>-<cor>-modelo-frente.webp` e `fotos/grande/<id>-<cor>-modelo-costas.webp`
   - `fotos/media/<id>-<cor>-modelo-frente.webp` e `fotos/media/<id>-<cor>-modelo-costas.webp`
3. Se quiser a peça no lookbook, acrescente as fotos em `LOOKBOOK`.

## Fotos

As fotos originais ficam fora do repositório. A conversão para WebP e o recorte do fundo branco foram feitos com `sharp` (Node), por preenchimento a partir das bordas: só o branco ligado ao contorno vira transparente. Peça nova sem corpo precisa ser fotografada sobre fundo branco liso.
