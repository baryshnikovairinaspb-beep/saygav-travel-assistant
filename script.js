const themeLink = document.createElement('link');
const journeyOsScript = document.createElement('script');
journeyOsScript.src = 'journey-os.js?v=2';
journeyOsScript.defer = true;
document.head.appendChild(journeyOsScript);
const experienceCss=document.createElement('link');experienceCss.rel='stylesheet';experienceCss.href='experience.css?v=1';document.head.appendChild(experienceCss);
journeyOsScript.addEventListener('load',()=>{const s=document.createElement('script');s.src='experience.js?v=1';document.body.appendChild(s)});
themeLink.rel = 'stylesheet';
themeLink.href = 'theme.css';
document.head.appendChild(themeLink);
const cropFix = document.createElement('link');
cropFix.rel = 'stylesheet';
cropFix.href = 'crop-fix.css';
document.head.appendChild(cropFix);
const interactiveStyles = document.createElement('link');
interactiveStyles.rel = 'stylesheet';
interactiveStyles.href = 'interactive.css';
document.head.appendChild(interactiveStyles);
document.querySelector('.hero > img').src = 'assets/saygav-hero-v2.png';

const photoStory = document.createElement('section');
photoStory.className = 'photo-story';
photoStory.setAttribute('aria-label', 'История SAYGAV');
photoStory.innerHTML = `
  <figure class="photo-large"><img src="assets/saygav-park.png" alt="Мужчина отдыхает со служебной собакой в городском парке"><figcaption><b>После прилёта</b><span>Находим спокойные маршруты и места для прогулки</span></figcaption></figure>
  <figure class="photo-small"><img src="assets/saygav-documents.png" alt="Документы и амуниция для поездки со служебной собакой"><figcaption><b>До вылета</b><span>Собираем документы в понятном порядке</span></figcaption></figure>`;
document.querySelector('.manifesto').after(photoStory);

const resources = document.createElement('section');
resources.className = 'resources';
resources.innerHTML = `<div class="resources-head"><div><p class="chapter">ПОЛЕЗНЫЕ ССЫЛКИ</p><h2>Проверяйте информацию<br>в первоисточнике</h2></div><p>Официальные сервисы для подготовки путешествия со служебной собакой.</p></div><div class="resource-grid">
<a href="https://europa.eu/youreurope/citizens/travel/carry/pets-and-other-animals/index_en.htm" target="_blank" rel="noopener"><span>01</span><b>Европейский союз</b><small>Правила поездок с животными</small><i>↗</i></a>
<a href="https://www.gov.uk/bring-pet-to-great-britain/guide-dogs" target="_blank" rel="noopener"><span>02</span><b>GOV.UK</b><small>Въезд с собакой-помощником</small><i>↗</i></a>
<a href="https://www.cdc.gov/importation/dogs/index.html" target="_blank" rel="noopener"><span>03</span><b>CDC USA</b><small>Официальные правила ввоза</small><i>↗</i></a>
<a href="https://www.bmel.de/EN/topics/animals/pets-and-zoo-animals/pets-entry-regulation.html" target="_blank" rel="noopener"><span>04</span><b>Германия</b><small>Требования министерства</small><i>↗</i></a>
<a href="https://assistancedogsinternational.org/resources/travel-resources/" target="_blank" rel="noopener"><span>05</span><b>ADI Travel</b><small>Ресурсы для assistance dogs</small><i>↗</i></a>
<a href="https://www.google.com/maps/search/dog+friendly+parks" target="_blank" rel="noopener"><span>06</span><b>Google Maps</b><small>Парки и места для прогулок</small><i>↗</i></a>
</div></section>`;
photoStory.after(resources);

const countryData = {
  greece:{name:'Греция',code:'ATH',items:['Проверить ISO-микрочип и его номер','Проверить действующую вакцинацию от бешенства','Подготовить EU Pet Passport или ветеринарный сертификат','Получить подтверждение статуса служебной собаки','Согласовать перевозку с транспортной компанией'],parks:'Для Афин начните с поиска National Garden, Pedion tou Areos и ближайших открытых зон. Всегда проверяйте местные правила поводка.'},
  germany:{name:'Германия',code:'BER',items:['Проверить ISO-микрочип и вакцинацию от бешенства','Подготовить EU Pet Passport или ветеринарный сертификат','Проверить правила для пород с ограничениями','Подготовить документы о специальной подготовке собаки','Заранее уведомить перевозчика'],parks:'В Берлине ищите обозначенные Hundeauslaufgebiet — специальные зоны свободного выгула. Условия зависят от района.'},
  uk:{name:'Великобритания',code:'LHR',items:['Проверить разрешённый маршрут и одобренного перевозчика','Проверить микрочип до вакцинации от бешенства','Подготовить ветеринарный сертификат или допустимый pet passport','Проверить обработку от ленточных червей и сроки','Подготовить доказательства статуса assistance dog','Получить письменное подтверждение от перевозчика'],parks:'В Лондоне изучите правила Royal Parks и городских парков рядом с местом проживания. Для отдельных зон действуют ограничения.'},
  usa:{name:'США',code:'JFK',items:['Проверить требования CDC по стране происхождения собаки','Проверить микрочип и форму вакцинации от бешенства','Заполнить требуемые формы ввоза до вылета','Проверить правила штата назначения','Подготовить форму авиакомпании для service animal','Подтвердить перевозку минимум за 48 часов'],parks:'В США правила dog parks устанавливают города. Ищите официальные off-leash dog parks рядом с адресом проживания.'}
};
const destination=document.querySelector('#destination'),city=document.querySelector('#city'),result=document.querySelector('#result'),checklist=document.querySelector('#checklist'),bar=document.querySelector('#progress-bar'),label=document.querySelector('#progress-label');
destination.addEventListener('change',()=>{const examples={greece:'Афины',germany:'Берлин',uk:'Лондон',usa:'Нью-Йорк'};city.value=examples[destination.value]});
document.querySelector('#build-plan').addEventListener('click',()=>{const data=countryData[destination.value];document.querySelector('#hero-code').textContent=data.code;document.querySelector('#route-title').textContent=`${document.querySelector('#origin').value} → ${data.name}`;document.querySelector('#parks-title').textContent=`Где гулять: ${city.value}`;document.querySelector('#parks-copy').textContent=data.parks;document.querySelector('#maps-link').href=`https://www.google.com/maps/search/dog+friendly+parks+${encodeURIComponent(city.value)}`;checklist.innerHTML=data.items.map((item,i)=>`<label><input type="checkbox" data-index="${i}"><span><i>${String(i+1).padStart(2,'0')}</i>${item}</span></label>`).join('');result.hidden=false;updateProgress();result.scrollIntoView({behavior:'smooth',block:'nearest'})});
function updateProgress(){const boxes=[...checklist.querySelectorAll('input')],done=boxes.filter(x=>x.checked).length,total=boxes.length;label.textContent=`${done}/${total} готово`;bar.style.width=total?`${done/total*100}%`:'0%'}
checklist.addEventListener('change',updateProgress);

const officialLinks = {
  greece: 'https://europa.eu/youreurope/citizens/travel/carry/pets-and-other-animals/index_en.htm',
  germany: 'https://www.bmel.de/EN/topics/animals/pets-and-zoo-animals/pets-entry-regulation.html',
  uk: 'https://www.gov.uk/bring-pet-to-great-britain/guide-dogs',
  usa: 'https://www.cdc.gov/importation/dogs/index.html'
};

document.querySelector('#build-plan').addEventListener('click', () => {
  let quickLinks = result.querySelector('.quick-links');
  if (!quickLinks) {
    quickLinks = document.createElement('div');
    quickLinks.className = 'quick-links';
    result.querySelector('.print-link').before(quickLinks);
  }
  const destinationKey = destination.value;
  const cityName = city.value;
  quickLinks.innerHTML = `
    <a href="${officialLinks[destinationKey]}" target="_blank" rel="noopener"><b>Официальные правила</b><span>Открыть сайт страны ↗</span></a>
    <a href="https://www.google.com/maps/search/dog+friendly+parks+${encodeURIComponent(cityName)}" target="_blank" rel="noopener"><b>Парки на Google Maps</b><span>Построить маршрут ↗</span></a>
    <a href="https://ru.wikipedia.org/wiki/${encodeURIComponent(cityName)}" target="_blank" rel="noopener"><b>${cityName} в Wikipedia</b><span>Узнать о городе ↗</span></a>
    <a href="https://assistancedogsinternational.org/resources/travel-resources/" target="_blank" rel="noopener"><b>ADI Travel Resources</b><span>Советы для assistance dogs ↗</span></a>`;
});
