(() => {
  'use strict';
  const target = document.getElementById('photo-map');
  if (!target || !window.L) return;
  const { places, albums, imageBase } = JSON.parse(document.getElementById('photo-map-data').textContent);
  const status = document.getElementById('photo-map-status');
  target.hidden = false;
  const map = L.map(target, { scrollWheelZoom: false });
  const tiles = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);
  tiles.on('tileerror', () => { status.textContent = '지도 배경을 불러오지 못했습니다. 장소 목록의 앨범 링크는 계속 이용할 수 있습니다.'; });
  const group = L.markerClusterGroup({
    maxClusterRadius: 40, showCoverageOnHover: false, animate: false,
    iconCreateFunction: cluster => L.divIcon({
      className: 'photo-map-marker photo-map-cluster',
      html: `<span>${cluster.getAllChildMarkers().reduce((sum, marker) => sum + marker.options.albumCount, 0)}</span>`,
      iconSize: [40, 40], iconAnchor: [20, 20]
    })
  }).addTo(map);
  const markers = {};
  const points = [];
  const node = (tag, text) => { const el = document.createElement(tag); if (text) el.textContent = text; return el; };
  Object.entries(places).forEach(([id, place]) => {
    const matching = albums.filter(album => album.place === id);
    if (!matching.length) return;
    const point = [place.lat, place.lng];
    points.push(point);
    const popup = node('div'); popup.className = 'photo-map-popup';
    popup.append(node('strong', place.name), node('p', place.detail));
    const preview = node('img'); preview.src = imageBase + matching[0].images[0]; preview.alt = matching[0].title; preview.loading = 'lazy';
    popup.append(preview);
    const list = node('ul');
    matching.forEach(album => { const item = node('li'); const a = node('a', `${album.date} · ${album.title} (${album.images.length}장)`); a.href = `#album-${album.date}`; item.append(a); list.append(item); });
    popup.append(list);
    const marker = L.marker(point, {
      albumCount: matching.length, title: `${place.name} · ${matching.length}개 앨범`, alt: `${place.name} 앨범 열기`,
      icon: L.divIcon({ className: 'photo-map-marker', html: `<span>${matching.length}</span>`, iconSize: [36, 36], iconAnchor: [18, 18] })
    }).addTo(group).bindPopup(popup, { maxWidth: 290, maxHeight: 340 });
    markers[id] = marker;
  });
  const fit = () => map.fitBounds(points, { padding: [35, 35], maxZoom: 14 });
  fit();
  document.getElementById('photo-map-reset').hidden = false;
  document.getElementById('photo-map-reset').addEventListener('click', () => { map.closePopup(); fit(); status.textContent = '전체 장소 · 핀의 숫자는 연결된 앨범 수입니다.'; });
  document.querySelectorAll('[data-photo-place]').forEach(control => {
    control.hidden = false;
    control.addEventListener('click', event => {
      const id = control.dataset.photoPlace;
      if (!markers[id]) return;
      event.preventDefault();
      document.getElementById('photo-atlas').scrollIntoView({ behavior: 'auto', block: 'start' });
      map.setView(markers[id].getLatLng(), places[id].zoom || 14, { animate: false });
      markers[id].openPopup();
      target.focus({ preventScroll: true });
      status.textContent = `${places[id].name} 선택됨 · 지도 팝업 또는 아래 목록에서 앨범을 열 수 있습니다.`;
    });
  });
})();
