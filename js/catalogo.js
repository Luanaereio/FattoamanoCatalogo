/* Fatto a Mano: catalogo folheavel.
   Monta as 9 paginas a partir de js/produtos.js (capa, Look Book, 6 pecas, pagina final),
   encaderna uma pagina por folha e folheia com virada em 3D pela borda esquerda.
   No computador a pagina e deitada como no PDF; no celular o script marca <html class="cel"> e o CSS reorganiza em pe. */
(function () {
  'use strict';

  const $ = (s, r) => (r || document).querySelector(s);
  const $$ = (s, r) => Array.from((r || document).querySelectorAll(s));
  const reduzido = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const LOJA = window.LOJA, ATRIBUTOS = window.ATRIBUTOS, PRODUTOS = window.PRODUTOS;
  const CAPA = window.CAPA, LOOKBOOK = window.LOOKBOOK, FINAL = window.FINAL;
  const RAZAO = 4800 / 3150; // proporcao da pagina do PDF

  const esc = (s) => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const n2 = (i) => String(i).padStart(2, '0');
  const foto = (tam, nome) => 'fotos/' + tam + '/' + nome + '.webp';
  const zapLink = (texto) => 'https://wa.me/' + LOJA.whatsapp + '?text=' + encodeURIComponent(texto);
  const reais = (v) => Number(v).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  // imagem carregada so quando a pagina chega perto (data-src vira src em carregar())
  const img = (nome, alt, larguras, sizes, classe) =>
    '<img' + (classe ? ' class="' + classe + '"' : '') +
    ' data-src="' + foto('grande', nome) + '"' +
    ' data-srcset="' + foto('media', nome) + ' ' + larguras[0] + 'w, ' + foto('grande', nome) + ' ' + larguras[1] + 'w"' +
    ' data-sizes="' + sizes + '" alt="' + esc(alt) + '" decoding="async">';

  const SVG = (d) => '<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">' + d + '</svg>';
  const ICONES = {
    algodao: SVG('<path d="M7.2 11.2a2.6 2.6 0 0 1 4.8-2 2.6 2.6 0 0 1 4.8 2 2.7 2.7 0 0 1-1.4 5H8.6a2.7 2.7 0 0 1-1.4-5z"/><path d="M12 16.2V21"/><path d="M12 18.4l2.6-1.5M12 19.9l-2.6-1.5"/>'),
    diamante: SVG('<path d="M7 4h10l4 5.2L12 20 3 9.2z"/><path d="M3 9.2h18M9 4l3 5.2L15 4M12 9.2V20"/>'),
    camiseta: SVG('<path d="M8.2 4.2 12 5.6l3.8-1.4 4.6 2.8-1.9 3.6-2.1-1V20H7.6V9.6l-2.1 1-1.9-3.6z"/>'),
    tecido: SVG('<path d="M5 5h14v14H5z"/><path d="M9.7 5v14M14.3 5v14M5 9.7h14M5 14.3h14"/>'),
    camisa: SVG('<path d="M9 4h6l1 2 4.5 1.6-1.4 4.2-2.1-.6V20H7V11.2l-2.1.6L3.5 7.6 8 6z"/><path d="M9 4c0 2 1.3 3.2 3 3.2S15 6 15 4"/>'),
    camadas: SVG('<path d="M12 4l9 5-9 5-9-5z"/><path d="M3 13.5l9 5 9-5"/>'),
    zap: SVG('<path d="M12 3a9 9 0 0 0-7.8 13.5L3 21l4.6-1.2A9 9 0 1 0 12 3z"/><path d="M9 9.5c0 3 2.5 5.5 5.5 5.5l1.2-1.4-1.9-1-1 .8a4 4 0 0 1-2.2-2.2l.8-1-1-1.9L9 9.5z"/>'),
    instagram: SVG('<rect x="3.5" y="3.5" width="17" height="17" rx="4.5"/><circle cx="12" cy="12" r="4"/><circle cx="17.2" cy="6.8" r="0.9" fill="currentColor" stroke="none"/>'),
  };

  /* ---------- paginas ---------- */
  const paginas = [];
  function pagina(o) { o.indice = paginas.length; paginas.push(o); return o; }

  // capa
  pagina({
    classe: 'pg-capa', rotulo: 'Capa',
    html: () =>
      '<div class="capa-foto">' + img('capa', '', [1200, 2400], '100vw') + '</div>' +
      '<div class="capa-texto">' +
        '<img class="capa-simbolo" src="fotos/marca/simbolo-claro.png" alt="">' +
        '<p class="capa-assinatura"><span>' + esc(LOJA.assinatura) + '</span></p>' +
        '<p class="capa-frase">' + esc(CAPA.frase) + '</p>' +
        '<h1 class="capa-titulo" aria-label="' + esc(CAPA.titulo) + '">' +
          CAPA.titulo.split('').map((ch, k) => ch === ' ' ? '<span class="esp" aria-hidden="true"> </span>' : '<span aria-hidden="true" style="--i:' + k + '">' + esc(ch) + '</span>').join('') +
        '</h1>' +
        '<p class="capa-sub">' + esc(CAPA.subtitulo) + '</p>' +
        '<p class="capa-abrir">Abrir o catálogo</p>' +
      '</div>' +
      '<div class="capa-luz" aria-hidden="true"></div>',
  });

  // look book
  pagina({
    classe: 'pg-look', rotulo: 'Look Book',
    html: () =>
      '<div class="look-cantos">' +
        '<p class="look-canto look-esq">' + esc(LOOKBOOK.cantoEsquerdo) + '</p>' +
        '<p class="look-canto look-dir">' + esc(LOOKBOOK.cantoDireito).replace(/ (\d{4})$/, '<br><b>$1</b>').replace(' ', '<br>') + '</p>' +
      '</div>' +
      '<img class="look-logo" src="fotos/marca/lockup-escuro.png" alt="' + esc(LOJA.nome + ', ' + LOJA.assinatura) + '">' +
      '<div class="look-fantasma" aria-hidden="true"><span>' + LOOKBOOK.titulo.join(' ') + '</span><span>' + LOOKBOOK.titulo[1] + '</span></div>' +
      '<h2 class="look-titulo">' + LOOKBOOK.titulo.map(t => '<span>' + esc(t) + '</span>').join('') + '</h2>' +
      '<div class="look-cena">' +
        '<div class="look-etiqueta">' + esc(LOOKBOOK.etiqueta).replace(/ /g, '<br>') + '</div>' +
        '<div class="look-modelo">' + img('lookbook-modelo', 'Modelo sentado com polo marrom e calça areia', [520, 656], '(max-width: 899px) 82vw, 40vw') + '</div>' +
      '</div>' +
      '<ul class="look-destaques">' +
        LOOKBOOK.destaques.map((d, k) => '<li style="--i:' + k + '"><i>' + ICONES[d.icone] + '</i><div><b>' + esc(d.titulo) + '</b><p>' + esc(d.texto) + '</p></div></li>').join('') +
      '</ul>',
  });

  // pecas
  PRODUTOS.forEach(p => {
    p.pagina = pagina({
      classe: 'pg-peca', produto: p.id, rotulo: p.nome,
      html: () => fichaHtml(p),
    }).indice;
  });

  function fichaHtml(p) {
    const pk = p.pack;
    const cols = pk.colunas.length + 2;
    let n = 0; // ordem das celulas do PACK, para o carimbo uma a uma
    const cel = (tag, conteudo, extra) => '<' + tag + ' style="--i:' + (n++) + '"' + (extra || '') + '>' + conteudo + '</' + tag + '>';
    const dica = matchMedia('(pointer: fine)').matches ? 'Passe o mouse para ampliar' : 'Segure para ampliar';
    return '<figure class="peca-modelo">' + img(p.id + '-modelo', p.fotos.modelo, [749, 1348], '(max-width: 899px) 100vw, 46vw') + '</figure>' +
      '<div class="peca-detalhes">' +
        '<figure data-grande="' + foto('grande', p.id + '-detalhe-1') + '">' + img(p.id + '-detalhe-1', p.fotos.detalhe1, [429, 920], '(max-width: 899px) 50vw, 19vw') + '</figure>' +
        '<figure data-grande="' + foto('grande', p.id + '-detalhe-2') + '">' + img(p.id + '-detalhe-2', p.fotos.detalhe2, [429, 920], '(max-width: 899px) 50vw, 19vw') +
          '<span class="peca-dica" aria-hidden="true">' + dica + '</span></figure>' +
      '</div>' +
      '<div class="peca-ficha">' +
        '<p class="ficha-rotulo">Código</p>' +
        '<p class="ficha-codigo">' + esc(p.ref) + '</p>' +
        '<h2 class="ficha-titulo">' + esc(p.nome) + '</h2>' +
        '<span class="ficha-traco" aria-hidden="true"></span>' +
        '<p class="ficha-descricao">' + esc(p.descricao) + '</p>' +
        '<ul class="ficha-atributos">' +
          ATRIBUTOS.map((a, k) => '<li style="--i:' + k + '">' + ICONES[a.icone] + '<span>' + esc(a.texto).replace(' ', '<br>') + '</span></li>').join('') +
        '</ul>' +
        '<p class="ficha-rotulo ficha-cores-rotulo">Cores disponíveis</p>' +
        '<div class="ficha-cores' + (p.cores.length > 5 ? ' muitas' : '') + '" role="group" aria-label="Cores">' +
          p.cores.map((c, k) => '<button type="button" class="cor" data-cor="' + c.id + '" style="--hex:' + c.hex + ';--i:' + k + '" aria-pressed="' + (k === 0) + '"><i aria-hidden="true"></i>' + esc(c.nome) + '</button>').join('') +
        '</div>' +
        '<p class="ficha-atacado"><span>Preço atacado</span></p>' +
        '<p class="ficha-preco"><small>R$</small><b data-valor="' + p.preco + '">' + reais(p.preco) + '</b></p>' +
        '<p class="ficha-porpeca">por peça</p>' +
        '<table class="ficha-pack">' +
          '<thead><tr>' + cel('th', 'Pack', ' colspan="' + cols + '"') + '</tr>' +
          '<tr>' + cel('th', esc(pk.rotuloColunas)) + pk.colunas.map(c => cel('th', esc(c))).join('') + cel('th', 'Total') + '</tr></thead>' +
          '<tbody>' + pk.linhas.map(l =>
            '<tr>' + cel('th', esc(l.rotulo)) + l.valores.map(v => cel('td', esc(v))).join('') + cel('td', l.total != null ? esc(l.total) : '') + '</tr>'
          ).join('') + '</tbody>' +
        '</table>' +
        '<a class="ficha-zap" target="_blank" rel="noopener">' + ICONES.zap + '<span>Pedir pelo WhatsApp</span></a>' +
      '</div>';
  }

  // pagina final
  pagina({
    classe: 'pg-final', rotulo: 'Instagram e WhatsApp',
    html: () =>
      '<div class="final-luz" aria-hidden="true"></div>' +
      '<img class="final-logo" src="fotos/marca/lockup-escuro.png" alt="' + esc(LOJA.nome + ', ' + LOJA.assinatura) + '">' +
      '<h2 class="final-titulo">' + esc(FINAL.titulo) + '</h2>' +
      '<p class="final-texto">' + esc(FINAL.texto) + '</p>' +
      '<div class="final-qrs">' +
        FINAL.qr.map((q, k) =>
          (k ? '<span class="qr-divisor" aria-hidden="true"></span>' : '') +
          '<a class="qr" href="' + esc(q.link()) + '" target="_blank" rel="noopener" style="--i:' + k + '">' +
            '<span class="qr-card"><img src="' + esc(q.imagem) + '" alt="QR code do ' + esc(q.rotulo) + '" width="264" height="264" loading="lazy"></span>' +
            '<span class="qr-rotulo">' + (ICONES[q.rotulo.toLowerCase()] || '') + esc(q.rotulo) + '</span>' +
          '</a>'
        ).join('') +
      '</div>' +
      '<span class="final-traco" aria-hidden="true"></span>' +
      '<p class="final-marca">' + esc(LOJA.nome) + '<sup>&reg;</sup></p>' +
      '<div class="final-faixa" aria-hidden="true"></div>',
  });

  /* ---------- livro ---------- */
  const livro = $('.livro');
  const mesa = $('.mesa');
  const N = paginas.length;
  let atual = 0, folhas = [], celular = null;

  function dimensionar() {
    const cel = innerWidth < 900 || innerHeight > innerWidth * 1.05;
    document.documentElement.classList.toggle('cel', cel);
    const topo = 48, base = cel ? 72 : 76;
    document.documentElement.style.setProperty('--topo', topo + 'px');
    document.documentElement.style.setProperty('--base', base + 'px');
    const altura = innerHeight - topo - base;
    let pw, ph;
    if (cel) { pw = innerWidth; ph = altura; }
    else {
      const m = 18;
      ph = altura - 2 * m;
      pw = Math.round(ph * RAZAO);
      if (pw > innerWidth - 2 * m) { pw = innerWidth - 2 * m; ph = Math.round(pw / RAZAO); }
    }
    document.documentElement.style.setProperty('--pw', pw + 'px');
    document.documentElement.style.setProperty('--ph', ph + 'px');
    return cel;
  }

  function construir() {
    const cel = dimensionar();
    if (cel === celular && folhas.length) { ir(atual, true); return; }
    celular = cel;
    livro.innerHTML = '<div class="livro-sombra" aria-hidden="true"></div>';
    folhas = paginas.map(pg => {
      const f = document.createElement('div');
      f.className = 'folha';
      f.innerHTML =
        '<div class="lado frente" data-pagina="' + pg.indice + '"><div class="pg ' + pg.classe + '"' + (pg.produto ? ' data-produto="' + pg.produto + '"' : '') + '>' + pg.html() + '</div></div>' +
        '<div class="lado verso" aria-hidden="true"></div>';
      livro.appendChild(f);
      return f;
    });
    ligar();
    ir(atual, true);
  }

  function ir(s, imediato) {
    s = Math.max(0, Math.min(N - 1, s));
    const anterior = atual;
    atual = s;
    const parado = imediato || reduzido;
    folhas.forEach((f, j) => {
      const virada = j < s;
      const mudou = f.classList.contains('virada') !== virada;
      if (parado) {
        f.style.transition = 'none';
        f.style.transitionDelay = '';
        f.classList.toggle('oculta', virada);
        f.style.zIndex = virada ? (j + 1) : (2 * N - j);
      } else if (mudou) {
        f.style.transition = '';
        f.style.transitionDelay = (0.08 * (virada ? (j - anterior) : (anterior - 1 - j))) + 's';
        f.classList.remove('oculta');
        f.classList.add('virando');
        f.style.zIndex = 3 * N + (virada ? j : (N - j));
        f.addEventListener('transitionend', fimDaVirada, { once: true });
      }
      f.classList.toggle('virada', virada);
      if (parado) { void f.offsetWidth; f.style.transition = ''; }
    });
    atualizarCromo();
  }
  function fimDaVirada(e) {
    const f = e.currentTarget;
    const j = folhas.indexOf(f);
    const virada = f.classList.contains('virada');
    f.classList.remove('virando');
    f.classList.toggle('oculta', virada);
    f.style.transitionDelay = '';
    f.style.zIndex = virada ? (j + 1) : (2 * N - j);
  }

  function atualizarCromo() {
    $('.topo-contador').textContent = (atual === 0 ? 'Capa' : 'p. ' + n2(atual + 1)) + '  /  ' + n2(N);
    $$('.mini').forEach(m => m.classList.toggle('ativa', +m.dataset.pagina === atual));
    const ativa = $('.mini.ativa');
    if (ativa) ativa.scrollIntoView({ block: 'nearest', inline: 'center', behavior: reduzido ? 'auto' : 'smooth' });
    $('.seta-ant').disabled = atual === 0;
    $('.seta-prox').disabled = atual === N - 1;
    $$('.lado.frente').forEach(l => {
      const v = +l.dataset.pagina === atual;
      l.toggleAttribute('inert', !v);
      l.setAttribute('aria-hidden', String(!v));
      const era = l.classList.contains('ativa');
      l.classList.toggle('ativa', v);
      if (Math.abs(+l.dataset.pagina - atual) <= 1) carregar(l);
      if (v && !era) entrar(l);
    });
  }

  /* ---------- efeitos que precisam de script ---------- */
  const mouseFino = matchMedia('(pointer: fine)').matches;

  // ao entrar numa pagina de peca, o preco conta de zero ate o valor (junto com a animacao do CSS)
  function entrar(l) {
    const preco = $('.ficha-preco b[data-valor]', l);
    if (!preco) return;
    const alvo = Number(preco.dataset.valor);
    if (reduzido) { preco.textContent = reais(alvo); return; }
    preco.textContent = reais(0);
    const inicio = performance.now() + 1900, dur = 1300;
    (function passo(t) {
      if (!l.classList.contains('ativa')) { preco.textContent = reais(alvo); return; }
      if (t < inicio) { requestAnimationFrame(passo); return; }
      const k = Math.min(1, (t - inicio) / dur);
      const e = 1 - Math.pow(1 - k, 3);
      preco.textContent = reais(alvo * e);
      if (k < 1) requestAnimationFrame(passo); else preco.textContent = reais(alvo);
    })(performance.now());
  }

  // lupa (amplia o tecido) e inclinacao 3D nas fotos de detalhe
  function detalhes(pg) {
    $$('.peca-detalhes figure', pg).forEach(fig => {
      const im = $('img', fig);
      const dica = $('.peca-dica', pg);
      const lente = document.createElement('div');
      lente.className = 'lupa';
      lente.setAttribute('aria-hidden', 'true');
      pg.appendChild(lente);
      const ZOOM = 2.3;
      let aberta = false, segurando = null;
      function mover(e) {
        const r = fig.getBoundingClientRect(), pr = pg.getBoundingClientRect();
        const x = e.clientX - r.left, y = e.clientY - r.top;
        if (x < 0 || y < 0 || x > r.width || y > r.height) { fechar(); return; }
        if (!aberta) { aberta = true; lente.style.backgroundImage = 'url(' + fig.dataset.grande + ')'; lente.classList.add('aberta'); if (dica) dica.classList.add('some'); }
        const d = lente.offsetWidth;
        lente.style.left = (e.clientX - pr.left - d / 2) + 'px';
        lente.style.top = (e.clientY - pr.top + pg.scrollTop - d / 2) + 'px';
        // a foto esta em object-fit: cover; descobre o tamanho e o deslocamento com que ela esta desenhada
        const nat = (im.naturalWidth || 920) / (im.naturalHeight || 1500), fr = r.width / r.height;
        let iw, ih, ox, oy;
        if (nat > fr) { ih = r.height; iw = ih * nat; ox = (r.width - iw) / 2; oy = 0; } else { iw = r.width; ih = iw / nat; ox = 0; oy = (r.height - ih) / 2; }
        lente.style.backgroundSize = (iw * ZOOM) + 'px ' + (ih * ZOOM) + 'px';
        lente.style.backgroundPosition = (-((x - ox) * ZOOM - d / 2)) + 'px ' + (-((y - oy) * ZOOM - d / 2)) + 'px';
        if (mouseFino && !reduzido) {
          const px = x / r.width - 0.5, py = y / r.height - 0.5;
          fig.style.setProperty('--ry', (px * 9).toFixed(2) + 'deg');
          fig.style.setProperty('--rx', (-py * 9).toFixed(2) + 'deg');
          fig.style.setProperty('--sx', (x / r.width * 100).toFixed(1) + '%');
          fig.style.setProperty('--sy', (y / r.height * 100).toFixed(1) + '%');
          fig.classList.add('inclina');
        }
      }
      function fechar() {
        aberta = false;
        lente.classList.remove('aberta');
        fig.classList.remove('inclina');
        fig.style.removeProperty('--rx'); fig.style.removeProperty('--ry');
      }
      if (mouseFino) {
        fig.addEventListener('pointermove', mover);
        fig.addEventListener('pointerleave', fechar);
      } else {
        // no toque: segurar o dedo abre a lupa; soltar fecha
        fig.addEventListener('pointerdown', e => {
          clearTimeout(segurando);
          segurando = setTimeout(() => { try { fig.setPointerCapture(e.pointerId); } catch (x) {} mover(e); }, 220);
        });
        fig.addEventListener('pointermove', e => { if (aberta) { e.preventDefault(); mover(e); } });
        ['pointerup', 'pointercancel', 'lostpointercapture'].forEach(ev => fig.addEventListener(ev, () => { clearTimeout(segurando); fechar(); }));
        fig.addEventListener('contextmenu', e => e.preventDefault());
      }
    });
  }

  // paralaxe com o mouse na capa e no Look Book (--mx e --my entre -1 e 1)
  function paralaxe() {
    if (!mouseFino || reduzido) return;
    let alvo = null;
    mesa.addEventListener('pointermove', e => {
      const pg = livro.querySelector('.lado.frente.ativa .pg-capa, .lado.frente.ativa .pg-look');
      if (!pg) return;
      const r = pg.getBoundingClientRect();
      const mx = Math.max(-1, Math.min(1, ((e.clientX - r.left) / r.width - 0.5) * 2));
      const my = Math.max(-1, Math.min(1, ((e.clientY - r.top) / r.height - 0.5) * 2));
      pg.style.setProperty('--mx', mx.toFixed(3)); pg.style.setProperty('--my', my.toFixed(3));
      alvo = pg;
    });
    mesa.addEventListener('pointerleave', () => { if (alvo) { alvo.style.setProperty('--mx', '0'); alvo.style.setProperty('--my', '0'); } });
  }

  function carregar(l) {
    $$('img[data-src]', l).forEach(i => {
      i.srcset = i.dataset.srcset; i.sizes = i.dataset.sizes; i.src = i.dataset.src;
      i.removeAttribute('data-src'); i.removeAttribute('data-srcset'); i.removeAttribute('data-sizes');
    });
  }

  function montarMiniaturas() {
    const c = $('.miniaturas');
    paginas.forEach(p => {
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'mini';
      b.dataset.pagina = p.indice;
      b.setAttribute('aria-label', 'Ir para ' + p.rotulo);
      b.style.backgroundImage = 'url(fotos/mini/p' + n2(p.indice + 1) + '.webp)';
      b.addEventListener('click', () => ir(p.indice));
      c.appendChild(b);
    });
  }

  /* ---------- liga o que esta dentro das paginas ---------- */
  function ligar() {
    $$('.pg-capa', livro).forEach(c => c.addEventListener('click', () => ir(1)));
    PRODUTOS.forEach(p => {
      const pg = livro.querySelector('.pg-peca[data-produto="' + p.id + '"]');
      if (!pg) return;
      const zap = $('.ficha-zap', pg);
      const botoes = $$('.cor', pg);
      function escolher(id) {
        const c = p.cores.find(x => x.id === id) || p.cores[0];
        botoes.forEach(b => b.setAttribute('aria-pressed', String(b.dataset.cor === c.id)));
        zap.href = zapLink(LOJA.mensagem.replace('{peca}', p.nome).replace('{ref}', p.ref).replace('{cor}', c.nome));
        zap.setAttribute('aria-label', 'Pedir ' + p.nome + ' na cor ' + c.nome + ' pelo WhatsApp');
        $('span', zap).textContent = 'Pedir pelo WhatsApp · ' + c.nome;
      }
      botoes.forEach(b => b.addEventListener('click', () => escolher(b.dataset.cor)));
      escolher(p.cores[0].id);
      detalhes(pg);
    });
  }

  /* ---------- navegacao ---------- */
  $('.seta-prox').addEventListener('click', () => ir(atual + 1));
  $('.seta-ant').addEventListener('click', () => ir(atual - 1));
  document.addEventListener('keydown', function (e) {
    if (e.target.closest && e.target.closest('input, textarea')) return;
    if (e.key === 'ArrowRight' || e.key === 'PageDown') ir(atual + 1);
    else if (e.key === 'ArrowLeft' || e.key === 'PageUp') ir(atual - 1);
    else if (e.key === 'Home') ir(0);
    else if (e.key === 'End') ir(N - 1);
  });
  let x0 = null, y0 = 0;
  mesa.addEventListener('pointerdown', function (e) {
    if (e.target.closest('button, a')) { x0 = null; return; }
    x0 = e.clientX; y0 = e.clientY;
  });
  mesa.addEventListener('pointerup', function (e) {
    if (x0 === null) return;
    const dx = e.clientX - x0, dy = e.clientY - y0;
    x0 = null;
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.5) ir(atual + (dx < 0 ? 1 : -1));
  });
  let tempoResize = null;
  addEventListener('resize', function () { clearTimeout(tempoResize); tempoResize = setTimeout(construir, 160); });

  montarMiniaturas();
  construir();
  paralaxe();

  // depois de um tempo, carrega o resto das paginas em segundo plano
  function carregarTudo() { $$('.lado.frente', livro).forEach(carregar); }
  if ('requestIdleCallback' in window) requestIdleCallback(carregarTudo, { timeout: 5000 }); else setTimeout(carregarTudo, 3000);
})();
