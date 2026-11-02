/* Fatto a Mano: catalogo digital.
   Monta a vitrine a partir de js/produtos.js, cuida do giradouro 3D (arrastar, inercia, troca de cor girando),
   da abertura em profundidade, do lookbook arrastavel e da entrada em cena na rolagem. */
(function () {
  'use strict';

  const $ = (s, r) => (r || document).querySelector(s);
  const $$ = (s, r) => Array.from((r || document).querySelectorAll(s));
  const reduzido = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const mouseFino = matchMedia('(pointer: fine)').matches;
  const LOJA = window.LOJA, PRODUTOS = window.PRODUTOS, LOOKBOOK = window.LOOKBOOK, COLECAO = window.COLECAO;

  const ICONE_ZAP = '<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a9 9 0 0 0-7.8 13.5L3 21l4.6-1.2A9 9 0 1 0 12 3z"/><path d="M9 9.5c0 3 2.5 5.5 5.5 5.5l1.2-1.4-1.9-1-1 .8a4 4 0 0 1-2.2-2.2l.8-1-1-1.9L9 9.5z"/></svg>';

  const foto = (tam, nome) => 'fotos/' + tam + '/' + nome + '.webp';
  const srcset = (nome) => foto('media', nome) + ' 800w, ' + foto('grande', nome) + ' 1200w';
  const zapLink = (texto) => 'https://wa.me/' + LOJA.whatsapp + '?text=' + encodeURIComponent(texto);
  const zapPeca = (peca, cor) => zapLink(LOJA.mensagem.replace('{peca}', peca).replace('{cor}', cor));

  /* ---------- barra, menu do celular, links da loja ---------- */
  const barra = $('.barra');
  const zapFixo = $('.zap-fixo');
  function aoRolar() {
    barra.classList.toggle('rolada', scrollY > 40);
    zapFixo.classList.toggle('visivel', scrollY > innerHeight * 0.7);
  }
  addEventListener('scroll', aoRolar, { passive: true });
  aoRolar();

  const hamb = $('.barra-hamb');
  hamb.addEventListener('click', function () {
    const aberto = document.body.classList.toggle('menu-aberto');
    hamb.setAttribute('aria-expanded', String(aberto));
    hamb.setAttribute('aria-label', aberto ? 'Fechar menu' : 'Abrir menu');
  });
  $$('.painel a').forEach(a => a.addEventListener('click', function () {
    document.body.classList.remove('menu-aberto');
    hamb.setAttribute('aria-expanded', 'false');
  }));

  $$('.zap').forEach(a => { a.href = zapLink('Olá! Vi o catálogo da Fatto a Mano e quero saber mais.'); });
  $('.contato-whats').textContent = '+' + LOJA.whatsapp.replace(/^(\d{2})(\d{2})(\d{4,5})(\d{4})$/, '$1 $2 $3-$4');
  const ig = $('.contato-insta');
  ig.textContent = '@' + LOJA.instagram;
  ig.href = 'https://instagram.com/' + LOJA.instagram;
  $('.contato-endereco').textContent = LOJA.endereco;
  $('.contato-horario').textContent = LOJA.horario;
  $('.rodape-ano').textContent = String(new Date().getFullYear());

  /* ---------- abertura: foto em profundidade seguindo o mouse ---------- */
  const abertura = $('.abertura');
  const cena = $('.abertura-cena');
  const texto = $('.abertura-texto');
  if (!reduzido && mouseFino) {
    abertura.addEventListener('pointermove', function (e) {
      const r = abertura.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      cena.style.setProperty('--ry', (x * 7).toFixed(2) + 'deg');
      cena.style.setProperty('--rx', (-y * 5).toFixed(2) + 'deg');
      texto.style.transform = 'translate(' + (x * -16).toFixed(1) + 'px, ' + (y * -10).toFixed(1) + 'px)';
    });
    abertura.addEventListener('pointerleave', function () {
      cena.style.setProperty('--ry', '0deg');
      cena.style.setProperty('--rx', '0deg');
      texto.style.transform = '';
    });
  }

  /* ---------- vitrine ---------- */
  const lista = $('.pecas-lista');
  const preCarregar = [];

  function montarPeca(p) {
    const sec = document.createElement('section');
    sec.className = 'peca-secao';
    sec.id = 'peca-' + p.id;
    sec.style.setProperty('--tom', p.cores[0].tom);
    sec.innerHTML =
      '<div class="peca-info">' +
        '<span class="peca-num">' + p.numero + '</span>' +
        '<h3 class="peca-nome">' + p.nome + '<span class="peca-cor-atual"></span></h3>' +
        '<p class="peca-frase">' + p.frase + '</p>' +
        '<div class="cores" role="group" aria-label="Cores de ' + p.nome + '"></div>' +
        '<div class="modo" role="group" aria-label="Modo de visualização">' +
          '<button type="button" data-modo="peca" aria-pressed="true">Peça</button>' +
          '<button type="button" data-modo="corpo" aria-pressed="false">No corpo</button>' +
        '</div>' +
        '<dl class="peca-linha">' +
          '<dt>Tecido</dt><dd>' + p.tecido + '</dd>' +
          '<dt>Tamanhos</dt><dd><div class="tamanhos">' + p.tamanhos.map(t => '<span>' + t + '</span>').join('') + '</div></dd>' +
          '<dt>Preço</dt><dd>' + p.preco + '</dd>' +
        '</dl>' +
        '<div class="peca-acoes"><a class="botao botao-latao peca-zap" target="_blank" rel="noopener">' + ICONE_ZAP + 'Quero essa</a></div>' +
      '</div>' +
      '<div class="palco" tabindex="0" role="img" aria-label="' + p.nome + '. Arraste ou use as setas do teclado para girar.">' +
        '<div class="palco-cena">' +
          '<div class="flutua">' +
            '<div class="peca"><img class="face face-frente" alt=""><img class="face face-costas" alt=""></div>' +
            '<div class="reflexo" aria-hidden="true"><div class="peca"><img class="face face-frente" alt=""><img class="face face-costas" alt=""></div></div>' +
            '<div class="sombra"></div>' +
          '</div>' +
        '</div>' +
        '<span class="palco-cor"></span>' +
        '<div class="palco-dica"><span>&larr;</span>Arraste para girar<span>&rarr;</span></div>' +
      '</div>';
    lista.appendChild(sec);
    giradouro(sec, p);
  }

  function giradouro(sec, p) {
    const palco = $('.palco', sec);
    const flutua = $('.flutua', sec);
    const sombra = $('.sombra', sec);
    const dica = $('.palco-dica', sec);
    const frentes = $$('.face-frente', sec);
    const costas = $$('.face-costas', sec);
    const estado = { cor: p.cores[0], modo: 'peca' };
    let ang = 0, vel = 0, alvo = null, tilt = 0;
    let arrastando = false, girando = false, ultimoX = 0, ultimoT = 0;

    function aplicar() {
      flutua.style.setProperty('--ang', ang.toFixed(2) + 'deg');
      flutua.style.setProperty('--tilt', tilt.toFixed(2) + 'deg');
      const c = Math.abs(Math.cos(ang * Math.PI / 180));
      sombra.style.setProperty('--sx', (0.4 + 0.6 * c).toFixed(3));
    }

    function nomes(c, m) {
      const base = p.id + '-' + c.id;
      return m === 'peca'
        ? { frente: foto('recorte', base + '-frente'), costas: foto('recorte', base + '-costas'), set: null }
        : { frente: foto('grande', base + '-modelo-frente'), costas: foto('grande', base + '-modelo-costas'), set: base + '-modelo-' };
    }

    function fontes(c, m) {
      const n = nomes(c, m);
      const tamanhos = '(max-width: 860px) 70vw, 36vw';
      frentes.forEach(i => { i.srcset = n.set ? srcset(n.set + 'frente') : ''; i.sizes = n.set ? tamanhos : ''; i.src = n.frente; });
      costas.forEach(i => { i.srcset = n.set ? srcset(n.set + 'costas') : ''; i.sizes = n.set ? tamanhos : ''; i.src = n.costas; });
      flutua.classList.toggle('no-corpo', m === 'corpo');
    }

    function textos() {
      $('.peca-cor-atual', sec).textContent = estado.cor.nome;
      $('.palco-cor', sec).textContent = estado.cor.nome;
      $('.peca-zap', sec).href = zapPeca(p.nome, estado.cor.nome);
      $('.peca-zap', sec).setAttribute('aria-label', 'Quero a ' + p.nome + ' na cor ' + estado.cor.nome + ', pelo WhatsApp');
    }

    // gira uma volta inteira e troca a imagem quando a peca esta de perfil (invisivel)
    function girarTrocando(trocar) {
      if (reduzido || girando) { trocar(); aplicar(); return; }
      girando = true; alvo = null; vel = 0;
      const inicio = ang, dur = 1150, t0 = performance.now();
      let trocou = false;
      function passo(t) {
        const k = Math.min(1, (t - t0) / dur);
        const e = k < 0.5 ? 4 * k * k * k : 1 - Math.pow(-2 * k + 2, 3) / 2;
        ang = inicio + 360 * e;
        if (!trocou && 360 * e >= 90) { trocar(); trocou = true; }
        aplicar();
        if (k < 1) requestAnimationFrame(passo);
        else { ang = inicio; girando = false; aplicar(); }
      }
      requestAnimationFrame(passo);
    }

    function escolherCor(c) {
      if (c === estado.cor) return;
      estado.cor = c;
      $$('.cor', sec).forEach((b, i) => b.setAttribute('aria-pressed', String(p.cores[i] === c)));
      sec.style.setProperty('--tom', c.tom);
      textos();
      girarTrocando(() => fontes(c, estado.modo));
    }

    function escolherModo(m) {
      if (m === estado.modo) return;
      estado.modo = m;
      $$('.modo button', sec).forEach(b => b.setAttribute('aria-pressed', String(b.dataset.modo === m)));
      girarTrocando(() => fontes(estado.cor, m));
    }

    // botoes de cor
    const cores = $('.cores', sec);
    p.cores.forEach((c, i) => {
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'cor';
      b.style.setProperty('--hex', c.hex);
      b.setAttribute('aria-pressed', String(i === 0));
      b.innerHTML = '<i aria-hidden="true"></i>' + c.nome;
      b.addEventListener('click', () => escolherCor(c));
      cores.appendChild(b);
    });
    $$('.modo button', sec).forEach(b => b.addEventListener('click', () => escolherModo(b.dataset.modo)));

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
      e.preventDefault();
      if (girando) return;
      vel = 0;
      alvo = Math.round(ang / 180) * 180 + (e.key === 'ArrowRight' ? 180 : -180);
      dica.classList.add('some');
    });

    // inercia e encaixe em frente ou costas
    function laco() {
      if (!arrastando && !girando) {
        if (Math.abs(vel) > 0.3) {
          ang += vel; vel *= 0.95; aplicar();
        } else if (vel !== 0) {
          vel = 0; alvo = Math.round(ang / 180) * 180;
        }
        if (alvo !== null) {
          const d = alvo - ang;
          if (Math.abs(d) < 0.05) { ang = alvo; alvo = null; } else { ang += d * 0.1; }
          aplicar();
        }
      }
      requestAnimationFrame(laco);
    }

    fontes(estado.cor, estado.modo);
    textos();
    aplicar();
    if (!reduzido) requestAnimationFrame(laco);

    p.cores.forEach(c => { ['peca', 'corpo'].forEach(m => { const n = nomes(c, m); preCarregar.push(n.frente, n.costas); }); });
  }

  PRODUTOS.forEach(montarPeca);

  // pre-carrega as outras cores depois que a pagina assentou, para a troca nao piscar
  function preCarregarTudo() { preCarregar.forEach(u => { const i = new Image(); i.src = u; }); }
  if ('requestIdleCallback' in window) requestIdleCallback(preCarregarTudo, { timeout: 4000 }); else setTimeout(preCarregarTudo, 2500);

  /* ---------- lookbook ---------- */
  const trilha = $('.trilha');
  LOOKBOOK.forEach((l, i) => {
    trilha.insertAdjacentHTML('beforeend',
      '<article class="look revela" style="--d:' + (i % 4) * 0.08 + 's"><figure>' +
        '<div class="look-foto"><img loading="lazy" decoding="async" src="' + foto('grande', l.foto) + '" srcset="' + srcset(l.foto) + '" sizes="(max-width: 860px) 72vw, 24vw" alt="' + l.peca + ' ' + l.cor + ', no modelo"></div>' +
        '<figcaption><b>' + l.peca + '</b><span>' + l.cor + '</span></figcaption>' +
      '</figure></article>');
  });
  let arrTrilha = false, x0 = 0, s0 = 0, moveuTrilha = false;
  trilha.addEventListener('pointerdown', function (e) {
    if (e.pointerType !== 'mouse') return;
    arrTrilha = true; moveuTrilha = false; x0 = e.clientX; s0 = trilha.scrollLeft;
    trilha.classList.add('arrastando');
    trilha.setPointerCapture(e.pointerId);
  });
  trilha.addEventListener('pointermove', function (e) {
    if (!arrTrilha) return;
    const d = e.clientX - x0;
    if (Math.abs(d) > 3) moveuTrilha = true;
    trilha.scrollLeft = s0 - d;
  });
  function fimTrilha() { arrTrilha = false; trilha.classList.remove('arrastando'); }
  trilha.addEventListener('pointerup', fimTrilha);
  trilha.addEventListener('pointercancel', fimTrilha);
  trilha.addEventListener('click', function (e) { if (moveuTrilha) e.preventDefault(); }, true);

  /* ---------- colecao ---------- */
  const grade = $('.colecao-grade');
  COLECAO.forEach((c, i) => {
    const classe = c.grande ? ' grande' : (i === COLECAO.length - 1 ? ' larga' : '');
    grade.insertAdjacentHTML('beforeend',
      '<figure class="colecao-item revela' + classe + '" style="--d:' + i * 0.1 + 's">' +
        '<img loading="lazy" decoding="async" src="' + foto('grande', c.foto) + '" srcset="' + srcset(c.foto) + '" sizes="(max-width: 860px) 100vw, 60vw" alt="' + c.titulo + '">' +
        '<figcaption><b>' + c.titulo + '</b><small>' + c.nota + '</small></figcaption>' +
      '</figure>');
  });

  /* ---------- entrada em cena ---------- */
  const io = new IntersectionObserver(function (entradas) {
    entradas.forEach(en => { if (en.isIntersecting) { en.target.classList.add('visto'); io.unobserve(en.target); } });
  }, { threshold: 0.12 });
  $$('.revela').forEach(el => io.observe(el));

  // o botao fixo do WhatsApp some quando o contato (que ja tem o botao) esta na tela
  const ioFim = new IntersectionObserver(function (entradas) {
    entradas.forEach(en => document.body.classList.toggle('no-fim', en.isIntersecting));
  }, { threshold: 0.25 });
  ioFim.observe($('.contato'));
})();
