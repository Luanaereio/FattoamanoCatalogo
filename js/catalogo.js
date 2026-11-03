/* Fatto a Mano: catalogo folheavel.
   Monta as paginas a partir de js/produtos.js, encaderna em folhas (dupla no computador, simples no celular),
   folheia com virada em 3D e cuida do giradouro da peca (arrastar, inercia, troca de cor girando). */
(function () {
  'use strict';

  const $ = (s, r) => (r || document).querySelector(s);
  const $$ = (s, r) => Array.from((r || document).querySelectorAll(s));
  const reduzido = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const mouseFino = matchMedia('(pointer: fine)').matches;
  const LOJA = window.LOJA, PRODUTOS = window.PRODUTOS, LOOKBOOK = window.LOOKBOOK, EM_BREVE = window.EM_BREVE;

  const ICONE_ZAP = '<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a9 9 0 0 0-7.8 13.5L3 21l4.6-1.2A9 9 0 1 0 12 3z"/><path d="M9 9.5c0 3 2.5 5.5 5.5 5.5l1.2-1.4-1.9-1-1 .8a4 4 0 0 1-2.2-2.2l.8-1-1-1.9L9 9.5z"/></svg>';
  const ICONE_SACOLA = '<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M5 8h14l-1 12H6L5 8z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/></svg>';

  const foto = (tam, nome) => 'fotos/' + tam + '/' + nome + '.webp';
  const srcset = (nome) => foto('media', nome) + ' 800w, ' + foto('grande', nome) + ' 1200w';
  const zapLink = (texto) => 'https://wa.me/' + LOJA.whatsapp + '?text=' + encodeURIComponent(texto);
  const n2 = (i) => String(i).padStart(2, '0');
  const esc = (s) => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

  /* ---------- paginas ---------- */
  const paginas = [];
  function pagina(o) { o.indice = paginas.length; paginas.push(o); return o; }
  const pe = (i) => '<div class="pg-pe"><span>' + esc(LOJA.nome) + '</span><span>' + n2(i) + '</span></div>';
  const cab = (esq, dir) => '<div class="pg-cab"><span>' + esq + '</span><span>' + dir + '</span></div>';

  // capa
  pagina({
    classe: 'pg-capa', rotulo: 'Capa', mini: foto('media', 'composicao-mesa'),
    html: () =>
      '<div class="capa-foto"></div><div class="capa-veu"></div>' +
      '<div class="capa-texto">' +
        '<img src="fotos/marca/logo-claro.png" alt="' + esc(LOJA.nome) + '" width="325" height="39">' +
        '<div class="capa-titulo">' +
          '<p class="rotulo">Alfaiataria masculina</p>' +
          '<h1>Catálogo<br><em>' + esc(LOJA.edicao) + '</em></h1>' +
          '<p class="capa-abrir">Abrir o catálogo</p>' +
        '</div>' +
      '</div>',
  });

  // indice (preenchido depois, quando as outras paginas existirem)
  const pIndice = pagina({ classe: 'indice', rotulo: 'Índice', mini: null, html: () => '' });

  // abertura
  pagina({
    classe: 'abertura', rotulo: 'Apresentação', mini: foto('media', 'composicao-polos'),
    html: (i) =>
      '<div class="abertura-foto"></div>' +
      '<p class="abertura-texto"><em>Fatto a mano</em> quer dizer feito à mão. Peças essenciais do guarda-roupa masculino, em cores que combinam entre si.</p>' +
      '<p class="abertura-nota">Escolha a cor, gire a peça e fale com a loja.</p>' +
      pe(i),
  });

  // pecas: pagina da foto (palco) e pagina da ficha
  PRODUTOS.forEach(p => {
    p.paginaFoto = pagina({
      classe: 'pg-foto', produto: p.id, rotulo: p.nome + ', foto', mini: foto('media', p.id + '-' + p.cores[0].id + '-modelo-frente'),
      html: (i) =>
        cab('Ref. ' + esc(p.ref), esc(p.tipo)) +
        '<div class="palco" tabindex="0" role="img" aria-label="' + esc(p.nome) + '. Arraste ou use as setas do teclado para girar.">' +
          '<div class="palco-cena"><div class="pe"><div class="flutua">' +
            '<div class="peca"><img class="peca-lado peca-frente" alt=""><img class="peca-lado peca-costas" alt=""></div>' +
            '<div class="reflexo" aria-hidden="true"><div class="peca"><img class="peca-lado peca-frente" alt=""><img class="peca-lado peca-costas" alt=""></div></div>' +
            '<div class="sombra"></div>' +
          '</div></div></div>' +
          '<span class="palco-rotulo"></span>' +
          '<span class="palco-ref">' + esc(p.nome) + '</span>' +
          '<div class="palco-dica"><span>&larr;</span>Arraste para girar<span>&rarr;</span></div>' +
        '</div>' +
        '<div class="bolinhas" role="group" aria-label="Cores">' +
          p.cores.map((c, k) => '<button type="button" class="bolinha" data-cor="' + c.id + '" style="--hex:' + c.hex + '" aria-pressed="' + (k === 0) + '" aria-label="' + esc(c.nome) + '"></button>').join('') +
        '</div>' +
        pe(i),
    }).indice;
    p.paginaFicha = pagina({
      classe: 'pg-ficha', produto: p.id, rotulo: p.nome + ', ficha', mini: null,
      html: (i) =>
        cab(esc(p.tipo), 'Ref. ' + esc(p.ref)) +
        '<div class="ficha-num">' + esc(p.ref) + '</div>' +
        '<h2 class="ficha-nome">' + esc(p.nome) + '<span class="ficha-cor"></span></h2>' +
        '<p class="ficha-frase">' + esc(p.frase) + '</p>' +
        '<div class="cores" role="group" aria-label="Cores">' +
          p.cores.map((c, k) => '<button type="button" class="cor" data-cor="' + c.id + '" style="--hex:' + c.hex + '" aria-pressed="' + (k === 0) + '"><i aria-hidden="true"></i>' + esc(c.nome) + '</button>').join('') +
        '</div>' +
        '<div class="modo" role="group" aria-label="Modo de visualização">' +
          '<button type="button" data-modo="peca" aria-pressed="true">Peça</button>' +
          '<button type="button" data-modo="corpo" aria-pressed="false">No corpo</button>' +
        '</div>' +
        '<dl class="ficha-dl">' +
          '<dt>Tecido</dt><dd>' + esc(p.tecido) + '</dd>' +
          '<dt>Tamanhos</dt><dd><div class="tamanhos">' + p.tamanhos.map(t => '<span>' + esc(t) + '</span>').join('') + '</div></dd>' +
          '<dt>Preço</dt><dd>' + esc(p.preco) + '</dd>' +
        '</dl>' +
        '<div class="ficha-acoes">' +
          '<a class="botao botao-latao peca-zap" target="_blank" rel="noopener">' + ICONE_ZAP + 'Pedir pelo WhatsApp</a>' +
          (p.url || LOJA.loja ? '<a class="botao" href="' + esc(p.url || LOJA.loja) + '" target="_blank" rel="noopener">' + ICONE_SACOLA + 'Comprar na loja</a>' : '') +
        '</div>' +
        '<p class="ficha-ver">No corpo: veja o lookbook, <a href="#" data-ir="' + lookDaPeca(p) + '">p. ' + n2(lookDaPeca(p)) + '</a>.</p>' +
        pe(i),
    }).indice;
  });

  // lookbook
  const primeiraLook = paginas.length;
  function lookDaPeca(p) {
    const k = LOOKBOOK.findIndex(l => l.ref === p.ref);
    return primeiraLook + (k < 0 ? 0 : k);
  }
  LOOKBOOK.forEach(l => {
    pagina({
      classe: 'pg-look', rotulo: 'Lookbook, ' + l.peca + ' ' + l.cor, mini: foto('media', l.foto),
      html: (i) =>
        '<img src="' + foto('grande', l.foto) + '" srcset="' + srcset(l.foto) + '" sizes="(max-width: 899px) 100vw, 45vw" alt="' + esc(l.peca + ' ' + l.cor + ', no modelo') + '" loading="lazy" decoding="async">' +
        '<div class="look-legenda"><b>' + esc(l.peca) + '</b>' + esc(l.cor) + ' · Ref. ' + esc(l.ref) + '</div>' +
        '<div class="pg-pe"><span>Lookbook</span><span>' + n2(i) + '</span></div>',
    });
  });

  // em breve
  const pEmBreve = pagina({
    classe: 'embreve', rotulo: EM_BREVE.titulo, mini: foto('media', EM_BREVE.fotos[0].foto),
    html: (i) =>
      cab('Em breve', 'Ref. a definir') +
      '<h2 class="titulo-pg">' + esc(EM_BREVE.titulo).replace(' e ', ' <em>e</em> ') + '</h2>' +
      '<p class="embreve-texto">' + esc(EM_BREVE.texto) + '</p>' +
      '<div class="embreve-fotos">' +
        EM_BREVE.fotos.map(f => '<figure><img src="' + foto('grande', f.foto) + '" srcset="' + srcset(f.foto) + '" sizes="(max-width: 899px) 100vw, 45vw" alt="' + esc(f.legenda) + '" loading="lazy" decoding="async"><figcaption>' + esc(f.legenda) + '</figcaption></figure>').join('') +
      '</div>' +
      pe(i),
  });

  // contracapa
  const pContra = pagina({
    classe: 'contra', rotulo: 'Contato', mini: null, escura: true,
    html: (i) =>
      '<img src="fotos/marca/logo-claro.png" alt="' + esc(LOJA.nome) + '" width="325" height="39">' +
      '<h2>Escolheu?<br><em>Fale com a loja.</em></h2>' +
      '<ul>' +
        '<li><span class="rotulo">WhatsApp</span><a class="zap" target="_blank" rel="noopener">' + esc(telefoneBonito(LOJA.whatsapp)) + '</a></li>' +
        '<li><span class="rotulo">Instagram</span><a href="https://instagram.com/' + esc(LOJA.instagram) + '" target="_blank" rel="noopener">@' + esc(LOJA.instagram) + '</a></li>' +
        '<li><span class="rotulo">Loja</span><span>' + esc(LOJA.endereco) + '</span></li>' +
        '<li><span class="rotulo">Horário</span><span>' + esc(LOJA.horario) + '</span></li>' +
      '</ul>' +
      '<div class="ficha-acoes">' +
        '<a class="botao botao-latao zap" target="_blank" rel="noopener">' + ICONE_ZAP + 'Chamar no WhatsApp</a>' +
        (LOJA.loja ? '<a class="botao" href="' + esc(LOJA.loja) + '" target="_blank" rel="noopener">' + ICONE_SACOLA + 'Loja on-line</a>' : '') +
      '</div>' +
      '<div class="pg-pe"><span>Catálogo digital · ' + esc(LOJA.edicao) + '</span><span>' + n2(i) + '</span></div>',
  });

  function telefoneBonito(d) {
    const m = String(d).match(/^(\d{2})(\d{2})(\d{4,5})(\d{4})$/);
    return m ? '+' + m[1] + ' ' + m[2] + ' ' + m[3] + '-' + m[4] : '+' + d;
  }

  // indice, agora que todas as paginas existem
  pIndice.html = (i) => {
    const itens = PRODUTOS.map(p => ({ n: p.ref, titulo: p.nome, sub: p.tipo + ' · ' + p.cores.map(c => c.nome).join(', '), pg: p.paginaFoto }))
      .concat([
        { n: '', titulo: 'Lookbook', sub: 'As peças no corpo', pg: primeiraLook },
        { n: '', titulo: EM_BREVE.titulo, sub: 'Em breve', pg: pEmBreve.indice },
        { n: '', titulo: 'Contato', sub: 'WhatsApp, Instagram e endereço', pg: pContra.indice },
      ]);
    return cab(esc(LOJA.nome), 'Catálogo ' + esc(LOJA.edicao)) +
      '<h2>Índ<em>ice</em></h2>' +
      '<ol>' + itens.map(it =>
        '<li><a href="#" data-ir="' + it.pg + '"><span class="n">' + (it.n ? esc(it.n) : '&middot;') + '</span><span>' + esc(it.titulo) + '</span><span class="pontos"></span><span class="p">' + n2(it.pg) + '</span></a><small>' + esc(it.sub) + '</small></li>'
      ).join('') + '</ol>' +
      pe(i);
  };

  /* ---------- livro ---------- */
  const livro = $('.livro');
  const mesa = $('.mesa');
  let porFolha = 0, atual = 0, folhas = [], N = 0;
  const maxS = () => spreadDaPagina(paginas.length - 1);
  const spreadDaPagina = (i) => porFolha === 2 ? Math.ceil(i / 2) : i;
  function paginasDoSpread(s) {
    if (porFolha === 1) return [s];
    if (s === 0) return [0];
    return [2 * s - 1, 2 * s].filter(i => i < paginas.length);
  }

  function dimensionar() {
    const cel = innerWidth < 900;
    const topo = cel ? 50 : 56, base = cel ? 76 : 88;
    const altura = innerHeight - topo - base;
    let pw, ph;
    if (cel) { pw = innerWidth; ph = altura; }
    else {
      ph = Math.min(altura - 32, 940);
      pw = Math.round(ph * 0.72);
      const maxPw = Math.floor((innerWidth - 150) / 2);
      if (pw > maxPw) { pw = maxPw; ph = Math.round(pw / 0.72); }
    }
    document.documentElement.style.setProperty('--pw', pw + 'px');
    document.documentElement.style.setProperty('--ph', ph + 'px');
    return cel ? 1 : 2;
  }

  function lado(tipo, pg) {
    if (!pg) return '<div class="lado ' + tipo + ' branco" aria-hidden="true"></div>';
    return '<div class="lado ' + tipo + (pg.escura ? ' escuro' : '') + '" data-pagina="' + pg.indice + '">' +
      '<div class="pg ' + pg.classe + '"' + (pg.produto ? ' data-produto="' + pg.produto + '"' : '') + '>' + pg.html(pg.indice) + '</div></div>';
  }

  function construir() {
    const novo = dimensionar();
    if (novo === porFolha && folhas.length) { ir(atual, true); return; }
    const paginaVisivel = folhas.length ? paginasDoSpread(atual)[0] : 0;
    porFolha = novo;
    livro.innerHTML = '<div class="livro-sombra" aria-hidden="true"></div>';
    folhas = [];
    N = Math.ceil(paginas.length / porFolha);
    for (let j = 0; j < N; j++) {
      const f = document.createElement('div');
      f.className = 'folha';
      const frente = paginas[j * porFolha];
      const verso = porFolha === 2 ? paginas[j * 2 + 1] : null;
      f.innerHTML = lado('frente', frente) + lado('verso', verso);
      livro.appendChild(f);
      folhas.push(f);
    }
    ligar();
    $$('.mini').forEach((m, i) => m.classList.toggle('par-dir', porFolha === 2 && i > 0 && i % 2 === 0));
    atual = spreadDaPagina(paginaVisivel);
    ir(atual, true);
  }

  function ir(s, imediato) {
    s = Math.max(0, Math.min(maxS(), s));
    const anterior = atual;
    atual = s;
    const parado = imediato || reduzido;
    folhas.forEach((f, j) => {
      const virada = j < s;
      const mudou = f.classList.contains('virada') !== virada;
      if (parado) {
        f.style.transition = 'none';
        f.style.transitionDelay = '';
        f.style.zIndex = virada ? (j + 1) : (2 * N - j);
      } else if (mudou) {
        f.style.transition = '';
        f.style.transitionDelay = (0.09 * (virada ? (j - anterior) : (anterior - 1 - j))) + 's';
        f.classList.add('virando');
        f.style.zIndex = 3 * N;
        f.addEventListener('transitionend', fimDaVirada, { once: true });
      }
      f.classList.toggle('virada', virada);
      if (parado) { void f.offsetWidth; f.style.transition = ''; }
    });
    livro.classList.toggle('fechado', porFolha === 2 && s === 0);
    atualizarCromo();
  }
  function fimDaVirada(e) {
    const f = e.currentTarget;
    const j = folhas.indexOf(f);
    f.classList.remove('virando');
    f.style.transitionDelay = '';
    f.style.zIndex = f.classList.contains('virada') ? (j + 1) : (2 * N - j);
  }

  function atualizarCromo() {
    const vis = paginasDoSpread(atual);
    $('.topo-contador').textContent = (vis[0] === 0 ? 'Capa' : 'p. ' + vis.map(n2).join(' · ')) + '  /  ' + n2(paginas.length - 1);
    $$('.mini').forEach(m => m.classList.toggle('ativa', vis.includes(+m.dataset.pagina)));
    const ativa = $('.mini.ativa');
    if (ativa) ativa.scrollIntoView({ block: 'nearest', inline: 'center', behavior: reduzido ? 'auto' : 'smooth' });
    $('.seta-ant').disabled = atual === 0;
    $('.seta-prox').disabled = atual === maxS();
    $$('.lado[data-pagina]').forEach(l => {
      const v = vis.includes(+l.dataset.pagina);
      l.toggleAttribute('inert', !v);
      l.setAttribute('aria-hidden', String(!v));
    });
  }

  function montarMiniaturas() {
    const c = $('.miniaturas');
    paginas.forEach(p => {
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'mini' + (p.escura ? ' escura' : '');
      b.dataset.pagina = p.indice;
      b.setAttribute('aria-label', 'Ir para ' + p.rotulo);
      if (p.mini) b.style.backgroundImage = 'url(' + p.mini + ')';
      b.addEventListener('click', () => ir(spreadDaPagina(p.indice)));
      c.appendChild(b);
    });
  }

  /* ---------- liga o que esta dentro das paginas ---------- */
  function ligar() {
    $$('a.zap', livro).forEach(a => { a.href = zapLink('Olá! Vi o catálogo da Fatto a Mano e quero saber mais.'); });
    $$('[data-ir]', livro).forEach(a => a.addEventListener('click', e => { e.preventDefault(); ir(spreadDaPagina(+a.dataset.ir)); }));
    $$('.pg-capa', livro).forEach(c => c.addEventListener('click', () => ir(1)));
    PRODUTOS.forEach(giradouro);
  }

  const preCarregar = [];
  function giradouro(p) {
    const raiz = $$('[data-produto="' + p.id + '"]', livro);
    if (!raiz.length) return;
    const palco = $('.palco', livro.querySelector('.pg-foto[data-produto="' + p.id + '"]'));
    const flutua = $('.flutua', palco);
    const sombra = $('.sombra', palco);
    const dica = $('.palco-dica', palco);
    const frentes = $$('.peca-frente', palco);
    const costas = $$('.peca-costas', palco);
    const secoes = raiz.map(r => r.closest('.lado'));
    const estado = { cor: p.cores[0], modo: 'peca' };
    let ang = 0, vel = 0, alvo = null, tilt = 0;
    let arrastando = false, girando = false, ultimoX = 0, ultimoT = 0;

    function aplicar() {
      flutua.style.setProperty('--ang', ang.toFixed(2) + 'deg');
      flutua.style.setProperty('--tilt', tilt.toFixed(2) + 'deg');
      sombra.style.setProperty('--sx', (0.4 + 0.6 * Math.abs(Math.cos(ang * Math.PI / 180))).toFixed(3));
    }
    function nomes(c, m) {
      const base = p.id + '-' + c.id;
      return m === 'peca'
        ? { frente: foto('recorte', base + '-frente'), costas: foto('recorte', base + '-costas'), set: null }
        : { frente: foto('grande', base + '-modelo-frente'), costas: foto('grande', base + '-modelo-costas'), set: base + '-modelo-' };
    }
    function fontes(c, m) {
      const n = nomes(c, m);
      const tamanhos = '(max-width: 899px) 70vw, 30vw';
      frentes.forEach(i => { i.srcset = n.set ? srcset(n.set + 'frente') : ''; i.sizes = n.set ? tamanhos : ''; i.src = n.frente; });
      costas.forEach(i => { i.srcset = n.set ? srcset(n.set + 'costas') : ''; i.sizes = n.set ? tamanhos : ''; i.src = n.costas; });
      flutua.classList.toggle('no-corpo', m === 'corpo');
    }
    function textos() {
      raiz.forEach(r => {
        const fc = $('.ficha-cor', r); if (fc) fc.textContent = estado.cor.nome;
        const pr = $('.palco-rotulo', r); if (pr) pr.textContent = estado.cor.nome;
        const z = $('.peca-zap', r);
        if (z) {
          z.href = zapLink(LOJA.mensagem.replace('{peca}', p.nome).replace('{cor}', estado.cor.nome).replace('{ref}', p.ref));
          z.setAttribute('aria-label', 'Pedir a ' + p.nome + ' na cor ' + estado.cor.nome + ' pelo WhatsApp');
        }
        $$('.cor, .bolinha', r).forEach(b => b.setAttribute('aria-pressed', String(b.dataset.cor === estado.cor.id)));
        $$('.modo button', r).forEach(b => b.setAttribute('aria-pressed', String(b.dataset.modo === estado.modo)));
      });
      secoes.forEach(s => s.style.setProperty('--tom', estado.cor.tom));
    }
    function girarTrocando(trocar) {
      if (reduzido || girando) { trocar(); aplicar(); return; }
      girando = true; alvo = null; vel = 0;
      const inicio = ang, dur = 1150, t0 = performance.now();
      let trocou = false;
      (function passo(t) {
        const k = Math.min(1, (t - t0) / dur);
        const e = k < 0.5 ? 4 * k * k * k : 1 - Math.pow(-2 * k + 2, 3) / 2;
        ang = inicio + 360 * e;
        if (!trocou && 360 * e >= 90) { trocar(); trocou = true; }
        aplicar();
        if (k < 1) requestAnimationFrame(passo); else { ang = inicio; girando = false; aplicar(); }
      })(t0);
    }
    function escolherCor(id) {
      const c = p.cores.find(x => x.id === id);
      if (!c || c === estado.cor) return;
      estado.cor = c;
      textos();
      girarTrocando(() => fontes(c, estado.modo));
    }
    function escolherModo(m) {
      if (m === estado.modo) return;
      estado.modo = m;
      textos();
      girarTrocando(() => fontes(estado.cor, m));
    }
    raiz.forEach(r => {
      $$('.cor, .bolinha', r).forEach(b => b.addEventListener('click', () => escolherCor(b.dataset.cor)));
      $$('.modo button', r).forEach(b => b.addEventListener('click', () => escolherModo(b.dataset.modo)));
    });

    // arrastar para girar
    palco.addEventListener('pointerdown', function (e) {
      if (girando) return;
      arrastando = true; vel = 0; alvo = null;
      ultimoX = e.clientX; ultimoT = e.timeStamp;
      palco.setPointerCapture(e.pointerId);
      palco.classList.add('arrastando');
    });
    palco.addEventListener('pointermove', function (e) {
      if (arrastando) {
        const dx = e.clientX - ultimoX;
        const dt = Math.max(8, e.timeStamp - ultimoT);
        ang += dx * 0.5;
        vel = (dx * 0.5 / dt) * 16;
        ultimoX = e.clientX; ultimoT = e.timeStamp;
        if (Math.abs(dx) > 2) dica.classList.add('some');
      } else if (!girando && mouseFino) {
        const r = palco.getBoundingClientRect();
        tilt = -((e.clientY - r.top) / r.height - 0.5) * 8;
      }
      aplicar();
    });
    function soltar() {
      if (!arrastando) return;
      arrastando = false;
      palco.classList.remove('arrastando');
      if (Math.abs(vel) < 0.3) { vel = 0; alvo = Math.round(ang / 180) * 180; }
    }
    palco.addEventListener('pointerup', soltar);
    palco.addEventListener('pointercancel', soltar);
    palco.addEventListener('lostpointercapture', soltar);
    palco.addEventListener('pointerleave', function () { tilt = 0; aplicar(); });
    palco.addEventListener('keydown', function (e) {
      if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return;
      e.preventDefault(); e.stopPropagation();
      if (girando) return;
      vel = 0;
      alvo = Math.round(ang / 180) * 180 + (e.key === 'ArrowRight' ? 180 : -180);
      dica.classList.add('some');
    });
    (function laco() {
      if (!arrastando && !girando) {
        if (Math.abs(vel) > 0.3) { ang += vel; vel *= 0.95; aplicar(); }
        else if (vel !== 0) { vel = 0; alvo = Math.round(ang / 180) * 180; }
        if (alvo !== null) {
          const d = alvo - ang;
          if (Math.abs(d) < 0.05) { ang = alvo; alvo = null; } else { ang += d * 0.1; }
          aplicar();
        }
      }
      if (!reduzido) requestAnimationFrame(laco);
    })();

    fontes(estado.cor, estado.modo);
    textos();
    aplicar();
    p.cores.forEach(c => ['peca', 'corpo'].forEach(m => { const n = nomes(c, m); preCarregar.push(n.frente, n.costas); }));
  }

  /* ---------- navegacao ---------- */
  $('.seta-prox').addEventListener('click', () => ir(atual + 1));
  $('.seta-ant').addEventListener('click', () => ir(atual - 1));
  document.addEventListener('keydown', function (e) {
    if (e.target.closest && e.target.closest('.palco, input, textarea')) return;
    if (e.key === 'ArrowRight' || e.key === 'PageDown') ir(atual + 1);
    else if (e.key === 'ArrowLeft' || e.key === 'PageUp') ir(atual - 1);
    else if (e.key === 'Home') ir(0);
    else if (e.key === 'End') ir(maxS());
  });
  let x0 = null, y0 = 0;
  mesa.addEventListener('pointerdown', function (e) {
    if (e.target.closest('.palco, button, a, .modo')) { x0 = null; return; }
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

  function preCarregarTudo() { preCarregar.forEach(u => { const i = new Image(); i.src = u; }); }
  if ('requestIdleCallback' in window) requestIdleCallback(preCarregarTudo, { timeout: 4000 }); else setTimeout(preCarregarTudo, 2500);
})();
