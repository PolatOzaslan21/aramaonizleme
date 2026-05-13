const titleEl = document.getElementById('metaTitle');
const descEl = document.getElementById('metaDesc');
const urlEl = document.getElementById('metaUrl');
const previewTitle = document.getElementById('previewTitle');
const previewDesc = document.getElementById('previewDesc');
const previewUrl = document.getElementById('previewUrl');
const titleCount = document.getElementById('titleCount');
const descCount = document.getElementById('descCount');
const titleStatus = document.getElementById('titleStatus');
const descStatus = document.getElementById('descStatus');

function formatUrl(raw) {
  try {
    const u = new URL(raw);
    const parts = (u.hostname + u.pathname).replace(/\/+$/, '').split('/');
    return parts.join(' › ');
  } catch { return raw; }
}

function getStatusClass(len, min, max) {
  if (len === 0) return '';
  if (len < min) return 'warn';
  if (len > max) return 'bad';
  return 'ok';
}

function update() {
  const title = titleEl.value;
  const desc = descEl.value;
  const url = urlEl.value;

  previewTitle.textContent = title || 'Sayfa Başlığınız';
  previewDesc.textContent = desc || 'Sayfa açıklamanız burada görünecek...';
  previewUrl.textContent = url ? formatUrl(url) : 'orneksite.com › sayfa-basligi';

  titleCount.textContent = title.length + ' / 60';
  descCount.textContent = desc.length + ' / 160';

  const tc = getStatusClass(title.length, 30, 60);
  const dc = getStatusClass(desc.length, 120, 160);

  titleStatus.className = 'status-badge ' + tc;
  descStatus.className = 'status-badge ' + dc;

  const tLabel = {ok:'✅ Title ideal', warn:'⚠️ Title kısa', bad:'❌ Title uzun', '':—:'Title: —'};
  const dLabel = {ok:'✅ Desc ideal', warn:'⚠️ Desc kısa', bad:'❌ Desc uzun', '':—:'Desc: —'};

  titleStatus.textContent = tc === 'ok' ? '✅ Title ideal' : tc === 'warn' ? '⚠️ Title kısa' : tc === 'bad' ? '❌ Title uzun' : 'Title: —';
  descStatus.textContent = dc === 'ok' ? '✅ Desc ideal' : dc === 'warn' ? '⚠️ Desc kısa' : dc === 'bad' ? '❌ Desc uzun' : 'Desc: —';

  previewTitle.classList.toggle('too-long', title.length > 60);
  previewDesc.classList.toggle('too-long', desc.length > 160);
}

titleEl.addEventListener('input', update);
descEl.addEventListener('input', update);
urlEl.addEventListener('input', update);
update();