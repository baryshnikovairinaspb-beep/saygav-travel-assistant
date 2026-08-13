(() => {
  const css = document.createElement('link');
  css.rel = 'stylesheet';
  css.href = 'journey-os.css';
  document.head.appendChild(css);

  const modeSwitch = document.createElement('div');
  modeSwitch.className = 'mode-switch';
  modeSwitch.innerHTML = `<span>Вид страницы</span><button class="active" data-mode="journey">Journey</button><button data-mode="expert">Expert</button>`;
  document.body.appendChild(modeSwitch);
  modeSwitch.addEventListener('click', (e) => {
    const button = e.target.closest('button');
    if (!button) return;
    modeSwitch.querySelectorAll('button').forEach((b) => b.classList.toggle('active', b === button));
    document.body.classList.toggle('expert-mode', button.dataset.mode === 'expert');
    localStorage.setItem('saygav-mode', button.dataset.mode);
  });
  if (localStorage.getItem('saygav-mode') === 'expert') modeSwitch.querySelector('[data-mode="expert"]').click();

  const os = document.createElement('section');
  os.className = 'journey-os';
  os.id = 'journey-os';
  os.innerHTML = `
    <div class="os-intro">
      <p class="chapter">SAYGAV JOURNEY OS</p>
      <h2>Ваша поездка.<br><span>Под полным контролем.</span></h2>
      <p>Пройдите быструю проверку готовности, получите персональный цифровой паспорт поездки и сформируйте чек-лист.</p>
      <div class="os-points"><span>01 — Аудит готовности</span><span>02 — Travel passport</span><span>03 — Чек-лист PDF</span></div>
    </div>
    <div class="audit-card">
      <div class="audit-top"><span>AI-АУДИТ МАРШРУТА</span><b>5 вопросов</b></div>
      <label>Дата поездки<input type="date" id="audit-date"></label>
      <div class="audit-checks">
        <label><input type="checkbox" data-audit="chip"><i></i><span><b>Микрочип</b><small>Номер читается и внесён в документы</small></span></label>
        <label><input type="checkbox" data-audit="rabies"><i></i><span><b>Вакцинация</b><small>Прививка от бешенства действует</small></span></label>
        <label><input type="checkbox" data-audit="passport"><i></i><span><b>Паспорт / сертификат</b><small>Документ подготовлен для маршрута</small></span></label>
        <label><input type="checkbox" data-audit="status"><i></i><span><b>Статус собаки</b><small>Есть подтверждение подготовки</small></span></label>
        <label><input type="checkbox" data-audit="carrier"><i></i><span><b>Перевозчик</b><small>Перевозка письменно подтверждена</small></span></label>
      </div>
      <button class="audit-button" id="run-audit">Оценить готовность <span>↗</span></button>
    </div>`;
  document.querySelector('.planner').before(os);

  const modal = document.createElement('div');
  modal.className = 'os-modal';
  modal.hidden = true;
  modal.innerHTML = `<div class="modal-backdrop" data-close></div><article class="modal-panel"><button class="modal-close" data-close>×</button><div id="audit-output"></div></article>`;
  document.body.appendChild(modal);
  modal.addEventListener('click', (e) => { if (e.target.closest('[data-close]')) closeModal(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });

  const openModal = () => { modal.hidden = false; document.body.classList.add('modal-open'); };
  const closeModal = () => { modal.hidden = true; document.body.classList.remove('modal-open'); };
  const labels = {chip:'Микрочип',rabies:'Вакцинация от бешенства',passport:'Паспорт или сертификат',status:'Подтверждение статуса собаки',carrier:'Согласование с перевозчиком'};

  document.querySelector('#run-audit').addEventListener('click', () => {
    const checked = [...document.querySelectorAll('[data-audit]')].filter(x => x.checked).map(x => x.dataset.audit);
    const missing = Object.keys(labels).filter(k => !checked.includes(k));
    const score = checked.length * 20;
    const level = score >= 80 ? 'Высокая готовность' : score >= 40 ? 'Нужна подготовка' : 'Есть критичные пробелы';
    const city = document.querySelector('#city')?.value || 'город назначения';
    const country = document.querySelector('#destination')?.selectedOptions[0]?.text || 'страна назначения';
    const date = document.querySelector('#audit-date').value || 'дата не указана';
    document.querySelector('#audit-output').innerHTML = `
      <p class="chapter">РЕЗУЛЬТАТ AI-АУДИТА</p>
      <div class="score-ring" style="--score:${score}"><strong>${score}%</strong><span>${level}</span></div>
      <h2>${country} · ${city}</h2><p class="audit-date">Дата поездки: ${date}</p>
      <div class="risk-box"><b>${missing.length ? 'Что необходимо проверить' : 'Основные пункты готовы'}</b>${missing.length ? `<ul>${missing.map(k=>`<li>${labels[k]}</li>`).join('')}</ul>` : '<p>Перед вылетом всё равно сверьте требования с официальным источником.</p>'}</div>
      <div class="passport-preview"><span>SAYGAV / TRAVEL PASSPORT</span><div><b>LCA</b><i>— ✈ —</i><b>${document.querySelector('#hero-code')?.textContent || 'ATH'}</b></div><small>SERVICE DOG · ${score}% READY</small></div>
      <button class="make-checklist" id="make-checklist">Сформировать чек-лист <span>→</span></button>`;
    openModal();
    document.querySelector('#make-checklist').addEventListener('click', () => { closeModal(); document.querySelector('#planner').scrollIntoView({behavior:'smooth'}); setTimeout(()=>document.querySelector('#build-plan').click(),500); });
  });

  const formats = document.createElement('div');
  formats.className = 'checklist-formats';
  formats.innerHTML = `<span>Формат чек-листа:</span><button class="active" data-format="short">Краткий</button><button data-format="full">Подробный</button><button data-format="flight">День вылета</button>`;
  const observer = new MutationObserver(() => {
    const result = document.querySelector('#result');
    if (result && !result.hidden && !result.querySelector('.checklist-formats')) result.querySelector('.result-head').after(formats);
  });
  observer.observe(document.querySelector('#result'), {attributes:true, attributeFilter:['hidden']});
  formats.addEventListener('click', (e) => {
    const b = e.target.closest('button'); if (!b) return;
    formats.querySelectorAll('button').forEach(x=>x.classList.toggle('active',x===b));
    document.querySelector('#result').dataset.format = b.dataset.format;
    const title = document.querySelector('#route-title');
    if (b.dataset.format === 'flight') title.dataset.note = 'Компактная проверка непосредственно перед отправлением';
    else if (b.dataset.format === 'full') title.dataset.note = 'Документы, пояснения и полезные ссылки';
    else title.dataset.note = 'Только обязательные шаги';
  });
})();
