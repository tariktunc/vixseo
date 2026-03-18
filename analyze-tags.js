const fs = require('fs');
const raw = fs.readFileSync('C:/Users/tarkt/OneDrive/Desktop/Github/xmlBlog/sites/ibrahiminyeri/etiketler.json', 'utf8');
const data = JSON.parse(raw);
const tags = data.tags;

const keep = [];
const del = [];
const review = [];

function classify(tag) {
  const label = tag.label;
  const l = label.toLowerCase().trim();

  // ─── DELETE RULES ───

  // 1. Person names
  const personNames = [
    'faruk özlü', 'vahit kılıçarslan', 'nuri çolakoğlu', 'vahe kılıçarslan',
    'mustafa hamarat', 'osman boyraz', 'halil i̇brahim uygun', 'halil ibrahim uygun',
    'halil i̇brahim usta', 'halil ibrahim usta', 'düzce belediye başkanı',
    'mühendislik öğrencileri', 'ramazan i̇ftarı', 'ramazan iftarı',
    'silivrispor başkanı', 'halil i̇brahim uygun'
  ];
  if (personNames.some(p => l === p || l.includes(p))) {
    return { d: 'delete', r: 'Kişi adı veya alakasız kişi/olay etiketi' };
  }

  // 2. Question format patterns
  const questionPatterns = [
    'nasıl gidilir', 'nedir', 'kaç km', 'kaç saat', 'nasıl pişer',
    'ne zaman atılır', 'nasıl marine edilir', 'nasıl seçilir',
    'ne içerir', 'kaç gram', 'sağlıklı mı', 'nasıl yumuşak pişer',
    'nasıl hazırlanır', 'nasıl pişirilir'
  ];
  // Special: "nasıl yapılır" is question but also content
  const strictQPatterns = ['nasıl gidilir', 'nedir', 'kaç km', 'kaç saat', 'nasıl pişer',
    'ne zaman atılır', 'nasıl marine edilir', 'nasıl seçilir',
    'ne içerir', 'kaç gram', 'sağlıklı mı', 'nasıl yumuşak pişer',
    'nasıl hazırlanır', 'nasıl pişirilir'];
  if (strictQPatterns.some(p => l.includes(p))) {
    return { d: 'delete', r: 'Soru formatı — makale başlığı, etiket değil' };
  }

  // 3. Rafting / su sporları
  if (l.includes('rafting') || l.includes('su sporları') || (l.includes('doğa sporları'))) {
    return { d: 'delete', r: 'Alakasız konu: su sporları / rafting' };
  }

  // 4. Kayak sport
  if ((l.includes('kayak') && (l.includes('merkezi') || l.includes('pist') || l.includes('konaklama') || l === 'kayak' || l === 'kayak yolu' || l.includes('kayak yolu') || l.includes('kartepe kayak') || l.includes('kartalkaya kayak')))) {
    return { d: 'delete', r: 'Spor etiketi: kayak — sitenin konusu dışı' };
  }

  // 5. Kış lastiği, buzlanma, sürüş güvenliği
  if (l === 'kış lastiği' || l === 'buzlanma' || l === 'sürüş güvenliği') {
    return { d: 'delete', r: 'Alakasız: araç/sürüş güvenliği konusu' };
  }

  // 6. Sports teams / universities
  if (l.includes('silivrispor') || l === 'spor takımı' || l.includes('teknik üniversitesi') || l === 'i̇tü' || l === 'itü' || l.includes('mühendislik öğrencileri')) {
    return { d: 'delete', r: 'Alakasız: spor takımı / üniversite' };
  }

  // 7. Historical/antique unrelated
  if (l.includes('antik tiyatro') || l.includes('antik kent') || l.includes('roma dönemi') || l.includes('ceneviz kalesi') || l.includes('tarihi evler') || l === 'safran lokumu') {
    return { d: 'delete', r: 'Alakasız: tarihi/kültürel yer (sitenin konusu dışı)' };
  }

  // 8. Huzurevi iftarı
  if (l.includes('huzurevi')) {
    return { d: 'delete', r: 'Alakasız: huzurevi etkinliği' };
  }

  // 9. Birlik ve beraberlik
  if (l.includes('birlik ve beraberlik')) {
    return { d: 'delete', r: 'Jenerik sosyal etkinlik, SEO değeri yok' };
  }

  // 10. Far geography — cities far from service area
  const farCities = [
    'sinop', 'zonguldak', 'kastamonu', 'ilgaz', 'rize',
    'amasra', 'safranbolu', 'karabük', 'kırkpınar'
  ];
  if (farCities.some(c => l.includes(c))) {
    return { d: 'delete', r: 'Uzak coğrafya — sitenin hizmet alanı dışı' };
  }
  if (l === 'trabzon' || l === 'samsun') {
    return { d: 'delete', r: 'Uzak coğrafya şehri' };
  }

  // 11. Generic question tags
  if (l === 'kaç km' || l === 'kaç saat' || l === 'ulaşım') {
    return { d: 'delete', r: 'Soru parçası — etiket olarak anlamsız' };
  }

  // 12. Evde mangal / balkon / bahçe
  if (l === 'evde mangal' || l === 'balkon mangal' || l === 'bahçe mangal') {
    return { d: 'delete', r: 'Ev mangal — restoran sitenin odak dışı' };
  }

  // 13. Fotoğrafçılık
  if (l === 'fotoğrafçılık') {
    return { d: 'delete', r: 'Alakasız: fotoğrafçılık konusu' };
  }

  // 14. Otoban/otoyol single word
  if (l === 'otoban' || l === 'otoyol') {
    return { d: 'delete', r: 'Çok jenerik — navigasyon değeri yok' };
  }

  // 15. Doğa (single word)
  if (l === 'doğa') {
    return { d: 'delete', r: 'Çok jenerik tek kelime' };
  }

  // 16. Göl (single)
  if (l === 'göl') {
    return { d: 'delete', r: 'Çok jenerik tek kelime' };
  }

  // 17. Mutfak (single)
  if (l === 'mutfak') {
    return { d: 'delete', r: 'Çok jenerik tek kelime — SEO değeri yok' };
  }

  // 18. Nesiller arası sofra
  if (l.includes('nesiller arası')) {
    return { d: 'delete', r: 'Çok özgün/belirsiz — SEO değeri yok' };
  }

  // 19. Patron mutfakta
  if (l === 'patron mutfakta') {
    return { d: 'delete', r: 'Jenerik içerik etiketi, SEO değeri yok' };
  }

  // 20. Restoran sahibi, ziyaret, ünlü misafir
  if (l === 'restoran sahibi' || l === 'ziyaret' || l === 'ünlü misafir') {
    return { d: 'delete', r: 'Jenerik — navigasyon değeri yok' };
  }

  // 21. Bolu Dağı ünlü misafirler, ibrahiminyeri misafirler
  if (l.includes('ünlü misafirler') || l.includes('misafirler')) {
    return { d: 'delete', r: 'Jenerik misafir etiketi — SEO değeri yok' };
  }

  // 22. Kayak solo
  if (l === 'kayak') {
    return { d: 'delete', r: 'Spor etiketi — sitenin konusu dışı' };
  }

  // 23. Far road combinations (Sinop, Zonguldak, Karabük, etc)
  if (l.includes('ankara sinop') || l.includes('sinop yolu') || l.includes('sinop gezilecek') ||
      l.includes('ankara kastamonu') || l.includes('kastamonu gezi') || l.includes('kastamonu yolu') ||
      l.includes('ankara zonguldak') || l.includes('ankara bartın') || l.includes('bartın yol') ||
      l.includes('istanbul karabük') || l.includes('karabük yolu') || l.includes('safranbolu yolu') ||
      l.includes('istanbul safranbolu') || l.includes('istanbul rize') || l.includes('istanbul samsun') ||
      l.includes('istanbul trabzon') || l.includes('istanbul karadeniz') ||
      l.includes('karadeniz turu') || l.includes('karadeniz rotası') || l.includes('karadeniz gezilecek') ||
      l.includes('samsun yolu') || l.includes('trabzon yolu') || l.includes('istanbul trabzon kaç') ||
      l.includes('eskişehir bolu')) {
    return { d: 'delete', r: 'Uzak güzergah kombinasyonu — hizmet alanı dışı' };
  }

  // 24. Kırkpınar (Edirne)
  if (l.includes('kırkpınar')) {
    return { d: 'delete', r: 'Uzak coğrafya: Kırkpınar/Edirne' };
  }

  // 25. Question-like specific
  if (l === 'bakacak nerede' || l.includes('yedigöller giriş') || l.includes('yedigöller ulaşım') ||
      l.includes('abant giriş ücreti') || l.includes('ankara abant kaç') ||
      l.includes('i̇stanbul kartalkaya kaç') || l.includes('i̇stanbul abant mesafe') ||
      l.includes('i̇stanbul abant kaç') || l.includes('ankara bolu kaç') ||
      l.includes('ankara düzce kaç') || l.includes('bursa bolu kaç') ||
      l.includes('istanbul karabük kaç') || l.includes('istanbul trabzon kaç')) {
    return { d: 'delete', r: 'Mesafe/süre soru formatı' };
  }

  // 26. Kış çorbası terifi (typo)
  if (l === 'kış çorbası terifi') {
    return { d: 'delete', r: 'Yazım hatası içeren etiket (terifi → tarifi)' };
  }

  // 27. Mangal nasıl yakılır
  if (l === 'mangal nasıl yakılır') {
    return { d: 'delete', r: 'Soru formatı' };
  }

  // 28. Nasıl yapılır (various)
  if (l.includes('nasıl yapılır')) {
    return { d: 'delete', r: 'Soru formatı' };
  }

  // 29. Düzce doğa sporları
  if (l.includes('düzce doğa sporları') || l.includes('su sporları düzce')) {
    return { d: 'delete', r: 'Alakasız: su/doğa sporları' };
  }

  // 30. Istanbul Samsun yolu mola, Istanbul Samsun yolu
  if (l === 'i̇stanbul samsun yolu mola' || l === 'i̇stanbul samsun yolu' || l === 'i̇stanbul trabzon yolu') {
    return { d: 'delete', r: 'Uzak güzergah — hizmet alanı dışı' };
  }

  // 31. Kızılay Kaynaşlı (political/commercial brand - questionable)
  // Actually keep as it refers to Kaynaşlı area

  // 32. İTÜ, Mühendislik
  if (l.includes('i̇stanbul teknik') || l.includes('mühendislik')) {
    return { d: 'delete', r: 'Alakasız: üniversite/mühendislik' };
  }

  // 33. Osman Boyraz
  if (l.includes('osman boyraz')) {
    return { d: 'delete', r: 'Kişi adı' };
  }

  // 34. Mustafa Hamarat
  if (l.includes('mustafa hamarat')) {
    return { d: 'delete', r: 'Kişi adı' };
  }

  // 35. Vahe Kılıçarslan, Vahit Kılıçarslan
  if (l.includes('vahe kılıçarslan') || l.includes('vahit kılıçarslan')) {
    return { d: 'delete', r: 'Kişi adı' };
  }

  // 36. Halil ibrahim variants
  if (l.includes('halil i̇brahim uygun') || l.includes('halil ibrahim uygun') || l.includes('halil i̇brahim usta') || l.includes('halil ibrahim usta')) {
    return { d: 'delete', r: 'Kişi adı' };
  }

  // 37. Nuri Çolakoğlu
  if (l.includes('nuri çolakoğlu')) {
    return { d: 'delete', r: 'Kişi adı' };
  }

  // 38. Faruk Özlü
  if (l.includes('faruk özlü')) {
    return { d: 'delete', r: 'Kişi adı' };
  }

  // 39. Halil İbrahim Uygun
  if (l.includes('halil i̇brahim')) {
    return { d: 'delete', r: 'Kişi adı' };
  }

  // 40. Düzce belediye başkanı
  if (l.includes('belediye başkanı')) {
    return { d: 'delete', r: 'Kişi/politika etiketi — SEO değeri yok' };
  }

  // 41. Ramazan İftarı (event, not general)
  if (l === 'ramazan i̇ftarı' || l === 'ramazan iftarı') {
    return { d: 'delete', r: 'Spesifik etkinlik etiketi — navigasyon değeri yok' };
  }

  // 42. Antika/tarihi
  if (l.includes('i̇stanbul\'a en yakın antik') || l.includes('istanbul a en yakın antik')) {
    return { d: 'delete', r: 'Tarihi konu — alakasız' };
  }

  // ─── KEEP RULES ───

  // Core brand
  if (l.includes('ibrahiminyeri') || (l.includes('ibrahim') && l.includes('yeri'))) {
    return { d: 'keep', r: 'Core marka etiketi' };
  }

  // Et mangal (core topic)
  if (l.includes('et mangal') || l.includes('bolu dağı et mangal') || l.includes('bakacak et mangal')) {
    return { d: 'keep', r: 'Core konu: et mangal' };
  }

  // Bolu Dağı
  if (l.includes('bolu dağı') || l.includes('bolu-dağı')) {
    return { d: 'keep', r: 'Core lokasyon: Bolu Dağı' };
  }

  // Bakacak Mevkii
  if (l.includes('bakacak mevkii') || l.includes('bakacak köfte') || l.includes('bakacak pirzola') || l.includes('bolu dağı bakacak') || l === 'bakacak') {
    return { d: 'keep', r: 'Core lokasyon: Bakacak Mevkii' };
  }

  // Kuzu et (core product)
  if (l.includes('kuzu') && !l.includes('nasıl') && !l.includes('nedir')) {
    return { d: 'keep', r: 'Core ürün: kuzu et' };
  }

  // Mangal tarifleri/teknik
  if (l.includes('mangal') && !l.includes('nasıl yakılır') && !l.includes('nasıl yapılır') && !l.includes('evde') && !l.includes('balkon') && !l.includes('bahçe')) {
    return { d: 'keep', r: 'Mangal içerik konusu' };
  }

  // Meşe közü / kömür
  if (l.includes('meşe') || l.includes('kömür') || l.includes('briket') || l === 'odun kömürü') {
    return { d: 'keep', r: 'Core teknik: ateş/kömür konusu' };
  }

  // Bolu food/gezi
  if (l.includes('bolu')) {
    return { d: 'keep', r: 'Bolu bölge içeriği' };
  }

  // Düzce
  if (l.includes('düzce')) {
    return { d: 'keep', r: 'Düzce bölge içeriği' };
  }

  // Kahvaltı topics
  if (l.includes('kahvaltı')) {
    return { d: 'keep', r: 'Kahvaltı içerik konusu' };
  }

  // Çorba
  if (l.includes('çorba')) {
    return { d: 'keep', r: 'Çorba menü konusu' };
  }

  // Yumurta / menemen
  if (l.includes('yumurta') || l.includes('menemen') || l.includes('sahanda') || l.includes('tereyağında yumurta')) {
    return { d: 'keep', r: 'Kahvaltı menü konusu' };
  }

  // Sucuk
  if (l.includes('sucuk')) {
    return { d: 'keep', r: 'Menü ürünü: sucuk' };
  }

  // Muhlama / kuymak / mıhlama
  if (l.includes('muhlama') || l.includes('mıhlama') || l.includes('kuymak')) {
    return { d: 'keep', r: 'Yöresel menü konusu' };
  }

  // Pirzola
  if (l.includes('pirzola') && !l.includes('nedir')) {
    return { d: 'keep', r: 'Menü ürünü: pirzola' };
  }

  // Dana
  if (l.includes('dana')) {
    return { d: 'keep', r: 'Menü ürünü: dana et' };
  }

  // Şiş kebap / ciğer şiş
  if (l.includes('şiş') || l.includes('ciğer') || l.includes('kuşbaşı')) {
    return { d: 'keep', r: 'Menü ürünü: şiş/kebap çeşitleri' };
  }

  // Köfte
  if (l.includes('köfte') && !l.includes('kıyması') && !l.includes('dağılmayan')) {
    return { d: 'keep', r: 'Menü ürünü: köfte' };
  }

  // Yöresel yemekler
  if (l.includes('yöresel') || l.includes('yöresel lezzetler') || l.includes('yemek tarifleri') || l.includes('yemek kültürü')) {
    return { d: 'keep', r: 'Yöresel yemek kültürü konusu' };
  }

  // Marine / tarif
  if (l.includes('marine') || l.includes('marinasyon') || l.includes('tarif')) {
    return { d: 'keep', r: 'Tarif/marine içerik konusu' };
  }

  // D100 / TEM road
  if (l.includes('d100') || l === 'istanbul ankara yolu' || l.includes('istanbul ankara') || l.includes('ankara istanbul')) {
    return { d: 'keep', r: 'D100/İstanbul-Ankara güzergah konusu' };
  }

  // Mola noktası
  if (l.includes('mola')) {
    return { d: 'keep', r: 'Mola noktası içerik konusu' };
  }

  // Yol üzeri / yolda yemek
  if (l.includes('yol üzeri') || l.includes('yol üstü') || l.includes('yolda') || l.includes('yolcu') || l.includes('uzun yol') || l.includes('güzergah')) {
    return { d: 'keep', r: 'Yol/güzergah içerik konusu' };
  }

  // Gezi rehberi
  if (l.includes('gezi rehberi') || l.includes('gezi plan') || l === 'gezi rehberi') {
    return { d: 'keep', r: 'Gezi rehberi kategorisi' };
  }

  // Abant, yedigöller, gölcük, sapanca, akçakoca
  if (l.includes('abant') || l.includes('yedigöller') || l.includes('gölcük') || l.includes('sapanca') || l.includes('akçakoca')) {
    return { d: 'keep', r: 'Bölge gezi lokasyonu' };
  }

  // Göynük, mudurnu, seben, kaynaşlı, konuralp
  if (l.includes('göynük') || l.includes('mudurnu') || l.includes('seben') || l.includes('kaynaşlı') || l.includes('konuralp')) {
    return { d: 'keep', r: 'Bolu/Düzce bölgesi lokasyonu' };
  }

  // Sakarya / acarlar
  if (l.includes('sakarya') || l.includes('acarlar')) {
    return { d: 'keep', r: 'Sakarya bölge içeriği — güzergah üzeri' };
  }

  // Ramazan genel
  if (l === 'ramazan') {
    return { d: 'keep', r: 'Ramazan özel dönem içerik konusu' };
  }

  // İftar / sahur / oruç
  if (l === 'iftar' || l === 'sahur' || l === 'oruç mola') {
    return { d: 'keep', r: 'Ramazan/oruç dönem içeriği' };
  }

  // Bayram / kurban
  if (l.includes('bayram') || l.includes('kurban')) {
    return { d: 'keep', r: 'Bayram/özel gün içerik konusu' };
  }

  // Sevgililer günü / romantik
  if (l.includes('sevgililer') || l.includes('romantik') || l === '14 şubat') {
    return { d: 'keep', r: 'Özel gün/romantik mola içerik konusu' };
  }

  // Yılbaşı / kış tatili
  if (l.includes('yılbaşı') || l.includes('kış tatili') || l.includes('kış mangal') || l.includes('kış molası') || l.includes('kış lezzeti')) {
    return { d: 'keep', r: 'Kış/yılbaşı dönem içerik konusu' };
  }

  // 7/24
  if (l.includes('7/24') || l.includes('gece mola') || l.includes('gece mangal') || l.includes('gece et mangal') || l.includes('gece açık')) {
    return { d: 'keep', r: '7/24 hizmet özelliği — marka differentiator' };
  }

  // Et pişirme, et seçimi, et kalitesi
  if (l.includes('et pişirme') || l.includes('et seçimi') || l.includes('et kalitesi') || l.includes('mangal eti') || l.includes('taze et') || l.includes('yerel et') || l.includes('yerel çiftçi') || l.includes('taze kuzu')) {
    return { d: 'keep', r: 'Et kalitesi/kaynağı içerik konusu' };
  }

  // Kasap
  if (l.includes('kasap')) {
    return { d: 'keep', r: 'Et tedarik/kasap içerik konusu' };
  }

  // Yöresel tatlı, bolu tatlısı, mamursa, manda kaymağı, fındık
  if (l.includes('mamursa') || l.includes('manda kaymağı') || l.includes('bolu tatlısı') || l.includes('bolu fındık') || l.includes('fındık şekeri') || l.includes('bolu hediyelik') || l.includes('geleneksel tatlı') || l.includes('bolu yöresel tatlı')) {
    return { d: 'keep', r: 'Bolu yöresel tatlı/hediyelik konusu' };
  }

  // Karalahana, keşkek, mengen mantısı, mengen
  if (l.includes('karalahana') || l.includes('keşkek') || l.includes('mengen mantısı') || l === 'mengen' || l.includes('mengen festivali') || l.includes('aşçılar diyarı')) {
    return { d: 'keep', r: 'Bolu/Mengen yöresel kültür ve yemek' };
  }

  // Gerdan kavurma, kıvırcık gerdan
  if (l.includes('gerdan') || l.includes('kavurma') || l.includes('sakatat') || l.includes('böbrek')) {
    return { d: 'keep', r: 'Yöresel et/sakatat menü konusu' };
  }

  // Meze / yan yemekler
  if (l.includes('meze') || l.includes('garnitür') || l.includes('piyaz') || l.includes('cacık') || l.includes('haydari') || l.includes('çoban salatası') || l.includes('közlenmiş') || l.includes('bulgur') || l.includes('sumaklı soğan') || l.includes('köz patlıcan') || l.includes('acılı ezme') || l.includes('sos tarifi') || l.includes('yanına sos') || l.includes('yanına ne gider') || l.includes('yanına meze') || l.includes('yanına ezme')) {
    return { d: 'keep', r: 'Mangal meze/yan yemek konusu' };
  }

  // Ayran / şalgam / limonata (beverages)
  if (l === 'ayran' || l === 'şalgam' || l === 'limonata' || l.includes('mangal içecek') || l.includes('yanında içecek')) {
    return { d: 'keep', r: 'Mangal yanı içecek' };
  }

  // Piknik mangal
  if (l.includes('piknik') && !l.includes('güvenliği') && !l.includes('hijyen')) {
    return { d: 'keep', r: 'Piknik mangal içerik konusu' };
  }

  // Aile yemeği / sofra
  if (l.includes('aile') && !l.includes('ailecek yapılacaklar')) {
    return { d: 'keep', r: 'Aile konusu — mekan özelliği' };
  }
  if (l.includes('ailecek')) {
    return { d: 'keep', r: 'Aile gezi içerik konusu' };
  }
  if (l.includes('çocuklu') || l.includes('çocuk dostu') || l.includes('çocuk oyun')) {
    return { d: 'keep', r: 'Aile/çocuk dostu mekan özelliği' };
  }

  // Doğa yürüyüşü (in region context)
  if (l === 'doğa yürüyüşü') {
    return { d: 'keep', r: 'Bölge doğa aktivitesi' };
  }

  // Antrikot, bonfile (et kesim adları)
  if (l === 'antrikot' || l === 'biftek' || l === 'kuzu biftek' || l.includes('iç bonfile')) {
    return { d: 'keep', r: 'Et kesim çeşidi' };
  }

  // Kaya tuzu mangal, mangal tuzlama
  if (l.includes('kaya tuzu') || l.includes('tuzlama')) {
    return { d: 'keep', r: 'Mangal teknik içeriği' };
  }

  // Pişirme tekniği / medium rare / porsiyon
  if (l.includes('medium rare') || l.includes('pişirme tekniği') || l.includes('pişirme sırası') || l.includes('porsiyon')) {
    return { d: 'keep', r: 'Et pişirme/porsiyon içerik konusu' };
  }

  // Mangal kültürü, Bolu gastronomi
  if (l.includes('kültürü') || l.includes('gastronomi') || l.includes('yemek kültürü')) {
    return { d: 'keep', r: 'Kültürel içerik konusu' };
  }

  // Karadeniz güzergahı (route)
  if (l.includes('karadeniz güzergah')) {
    return { d: 'keep', r: 'Karadeniz güzergahı yol rehberi' };
  }

  // Istanbul Ankara Karadeniz turu (keep as route)
  if (l.includes('ankara karadeniz')) {
    return { d: 'keep', r: 'Ankara-Karadeniz güzergah içeriği' };
  }

  // Şömine
  if (l === 'şömine' || l.includes('şömine et mangal')) {
    return { d: 'keep', r: 'Mekan özelliği: şömine' };
  }

  // Cam teras
  if (l === 'cam teras' || l.includes('göynük cam teras')) {
    return { d: 'keep', r: 'Mekan özelliği: cam teras' };
  }

  // Şelale, kanyon
  if (l === 'şelale' || l === 'kanyon') {
    return { d: 'keep', r: 'Bölge doğa özelliği' };
  }

  // Kamp
  if (l === 'kamp' || l.includes('seben gölü kamp')) {
    return { d: 'keep', r: 'Bölge aktivite konusu' };
  }

  // Türk kahvaltısı / türk mutfağı
  if (l.includes('türk kahvaltısı') || l.includes('türk mutfağı')) {
    return { d: 'keep', r: 'Kültürel yemek konusu' };
  }

  // Düzce gezilecek yerler
  if (l.includes('düzce gezilecek') || l.includes('düzce gezi') || l.includes('düzce turizm') || l.includes('düzce tatil') || l.includes('düzce şelale') || l.includes('düzce mağara') || l.includes('düzce doğa') || l.includes('düzce ne yenir') || l.includes('düzce yöresel')) {
    return { d: 'keep', r: 'Düzce gezi/turizm içeriği' };
  }

  // Bursa Bolu güzergah
  if (l.includes('bursa bolu')) {
    return { d: 'keep', r: 'Bursa-Bolu güzergah içeriği' };
  }

  // Et lokantası
  if (l === 'et lokantası') {
    return { d: 'keep', r: 'Restoran kategori etiketi' };
  }

  // Yöresel lezzetler
  if (l === 'yöresel lezzetler') {
    return { d: 'keep', r: 'Yöresel lezzet kategorisi' };
  }

  // Tel tel et, yavaş pişirme (kaburga technique)
  if (l.includes('tel tel et') || l.includes('yavaş pişirme')) {
    return { d: 'keep', r: 'Kaburga/yavaş pişirme teknik içerik' };
  }

  // Maşukiye
  if (l.includes('maşukiye')) {
    return { d: 'keep', r: 'Sapanca/Maşukiye bölge içeriği' };
  }

  // Köy ekmeği, közde pide (mangal bread)
  if (l === 'köy ekmeği' || l === 'közde pide' || l.includes('mangalda lavaş') || l.includes('mangalda ekmek')) {
    return { d: 'keep', r: 'Mangal yan ekmek konusu' };
  }

  // Mangalda pizza (off-topic but borderline)
  // review

  // Köy peyniri, kaşarlı (breakfast items)
  if (l.includes('köy peynir') || l.includes('kaşarlı yumurta') || l.includes('sahanda peynir') || l.includes('peynirli yumurta') || l.includes('otlu yumurta') || l.includes('kıymalı yumurta') || l.includes('kavurmalı yumurta') || l.includes('otlu omlet')) {
    return { d: 'keep', r: 'Kahvaltı menü çeşidi' };
  }

  // Bolu da kavurma, düzce de kavurma
  if (l.includes('kavurma')) {
    return { d: 'keep', r: 'Yöresel kavurma menü konusu' };
  }

  // Fiyat
  if (l.includes('fiyat')) {
    return { d: 'keep', r: 'Fiyat bilgisi — kullanıcı intent' };
  }

  // Bolu Dağı restoran
  if (l.includes('bolu dağı restoran')) {
    return { d: 'keep', r: 'Spesifik lokasyon restoran araması' };
  }

  // Bolu seben, seben gölü
  if (l.includes('seben')) {
    return { d: 'keep', r: 'Bolu Seben ilçesi gezi içeriği' };
  }

  // Efteni gölü / eften gölü
  if (l.includes('efteni') || l.includes('eften gölü') || l === 'eften gölü') {
    return { d: 'keep', r: 'Düzce bölgesi doğal alan' };
  }

  // Düzce göl, düzce deniz
  if (l.includes('düzce göl') || l.includes('düzce deniz')) {
    return { d: 'keep', r: 'Düzce bölge doğası' };
  }

  // Akçakoca balık, plaj
  if (l.includes('akçakoca')) {
    return { d: 'keep', r: 'Düzce/Akçakoca ilçe konusu' };
  }

  // Ankara'ya en yakın deniz (border - Düzce region)
  if (l.includes("ankara'ya") || l.includes('ankara ya en yakın')) {
    return { d: 'keep', r: 'Ankara-Karadeniz rotası içeriği' };
  }

  // Karadeniz tatil (too general but region linked)
  if (l.includes('karadeniz tatil')) {
    return { d: 'review', r: 'Karadeniz tatil — çok geniş ama bölgeyle bağlantılı' };
  }

  // Gölcük Tabiat Parkı
  if (l.includes('gölcük tabiat parkı')) {
    return { d: 'keep', r: 'Bolu bölgesi doğal park' };
  }

  // Düzce rafting, Melen çayı rafting — already caught above (rafting)

  // Korugöl, konuralp, samandere, aydınpınar, güzeldere, pürenli yaylası
  if (l.includes('korugöl') || l.includes('samandere') || l.includes('aydınpınar') || l.includes('güzeldere') || l.includes('pürenli')) {
    return { d: 'keep', r: 'Düzce/Bolu bölgesi lokasyon' };
  }

  // Bolu yayla, bolu yaylası
  if (l.includes('yayla')) {
    return { d: 'keep', r: 'Bolu/Düzce yayla konusu' };
  }

  // Günübirlik gezi
  if (l === 'günübirlik gezi') {
    return { d: 'keep', r: 'Gezi kategorisi' };
  }

  // Hafta sonu kaçamağı
  if (l.includes('hafta sonu kaçamağı')) {
    return { d: 'keep', r: 'Hafta sonu gezi motivasyonu' };
  }

  // Hafta sonu (single word)
  if (l === 'hafta sonu') {
    return { d: 'review', r: 'Çok jenerik tek kelime' };
  }

  // Ulaşım rehberi
  if (l === 'ulaşım rehberi') {
    return { d: 'keep', r: 'Ulaşım rehberi içerik konusu' };
  }

  // Karadeniz gezi
  if (l.includes('karadeniz gezi')) {
    return { d: 'review', r: 'Karadeniz gezi — bölgeyle bağlantılı ama geniş' };
  }

  // Karadeniz (single)
  if (l === 'karadeniz' || l === 'karadeniz-1') {
    return { d: 'review', r: 'Tek kelime coğrafya — çok jenerik' };
  }

  // Bolu (single)
  if (l === 'bolu') {
    return { d: 'review', r: 'Tek kelime şehir — çok jenerik ama core' };
  }

  // Düzce (single)
  if (l === 'düzce') {
    return { d: 'review', r: 'Tek kelime şehir — çok jenerik ama core' };
  }

  // Trabzon, Samsun (already handled above as delete)

  // Mola (single word)
  if (l === 'mola') {
    return { d: 'review', r: 'Çok jenerik — daha spesifik etiketler var' };
  }

  // Mangal (single word)
  if (l === 'mangal') {
    return { d: 'review', r: 'Çok jenerik — daha spesifik mangal etiketleri var' };
  }

  // Izgara (generic)
  if (l === 'ızgara') {
    return { d: 'review', r: 'Jenerik — mangal ile benzer ama farklı intent' };
  }

  // Kartalkaya (Bolu ama kayak ağırlıklı)
  if (l.includes('kartalkaya')) {
    return { d: 'review', r: 'Kartalkaya — Bolu bölgesi ama kayak/kış tatili ağırlıklı' };
  }

  // Kış tatili / kartepe kış (kayak adjacent)
  if (l === 'kartepe kış' || l.includes('kartepe kayak') || l === 'kartepe yemek' || l === 'kartepe sucuk ekmek') {
    return { d: 'review', r: 'Kartepe — Sakarya bölgesi, kış tatili odaklı' };
  }

  // Mangal pizza, balık (off-brand)
  if (l.includes('mangalda pizza') || l.includes('mangalda balık') || l.includes('mangalda somon') || l.includes('közde çipura') || l.includes('ızgara balık')) {
    return { d: 'review', r: 'Balık/pizza — et mangal sitenin odağı dışı ama mangal içeriği' };
  }

  // Generic single words
  if (l === 'deniz' || l === 'plaj') {
    return { d: 'delete', r: 'Alakasız: deniz/plaj — et mangal restoran sitesi' };
  }

  // Milli park
  if (l === 'milli park') {
    return { d: 'review', r: 'Jenerik park etiketi' };
  }

  // Sonbahar, mevsim
  if (l === 'sonbahar') {
    return { d: 'review', r: 'Mevsim etiketi — çok jenerik' };
  }

  // Mangal duman kontrolü, güvenliği
  if (l === 'mangal duman kontrolü' || l === 'mangal güvenliği') {
    return { d: 'review', r: 'Mangal güvenlik içeriği — zayıf navigasyon değeri' };
  }

  // Piramit tekniği, dolaylı ısı
  if (l === 'piramit tekniği' || l === 'dolaylı ısı tekniği') {
    return { d: 'review', r: 'Mangal teknik terimi — zayıf navigasyon' };
  }

  // Şişe dizme tekniği, metal şiş
  if (l === 'şişe-dizme-tekniği' || l === 'şişe dizme tekniği' || l === 'metal şiş') {
    return { d: 'review', r: 'Mangal ekipman tekniği — zayıf navigasyon' };
  }

  // Piknik güvenliği, hijyen
  if (l === 'piknik güvenliği' || l.includes('piknik et mangal hijyen')) {
    return { d: 'review', r: 'Teknik piknik içerik — zayıf navigasyon' };
  }

  // Soğutucu çanta
  if (l.includes('soğutucu çanta')) {
    return { d: 'review', r: 'Piknik malzeme — zayıf navigasyon' };
  }

  // Köfte kıyması, dağılmayan köfte
  if (l === 'köfte kıyması' || l === 'dağılmayan köfte') {
    return { d: 'review', r: 'Teknik içerik — navigasyon değeri sınırlı' };
  }

  // Küş gözlemi
  if (l === 'kuş gözlemi') {
    return { d: 'review', r: 'Bölge aktivitesi ama sitenin odağından uzak' };
  }

  // Safranbolu gezi (already handled as delete above via includes)

  // Istanbul Sapanca günübirlik
  if (l.includes('i̇stanbul sapanca')) {
    return { d: 'keep', r: 'İstanbul-Sapanca gezi içeriği' };
  }

  // Bolu dağı yol durumu, kar, buzlanma (useful info but question-ish)
  if (l === 'bolu dağı yol durumu' || l === 'bolu dağı kar' || l === 'bolu dağı buzlanma') {
    return { d: 'review', r: 'Yol durumu info — faydalı ama soru formatına yakın' };
  }

  // Izar sebze
  if (l.includes('ızgara sebze') || l.includes('mangalda sebze') || l.includes('mangalda biber') || l.includes('mangalda patlıcan')) {
    return { d: 'keep', r: 'Mangal sebze/garnitür konusu' };
  }

  // Kıvırcık gerdan (already keep via gerdan)

  // French trim pirzola, pirzola çeşitleri, kalem pirzola nedir
  if (l === 'french trim pirzola' || l === 'pirzola çeşitleri' || l === 'kalem pirzola') {
    return { d: 'keep', r: 'Pirzola çeşidi içerik konusu' };
  }

  // İstanbul Ankara yolu mola (keep - core)
  if (l.includes('istanbul ankara yolu mola') || l.includes('i̇stanbul ankara yolu mola')) {
    return { d: 'keep', r: 'İstanbul-Ankara yol molası — core konu' };
  }

  // Mangalda balık (already in review above)

  // Sakarya doğa, sakarya gezilecek, sakarya doğal
  if (l.includes('sakarya')) {
    return { d: 'keep', r: 'Sakarya bölge içeriği — güzergah üzeri' };
  }

  // İstanbul Bolu
  if (l === 'istanbul bolu') {
    return { d: 'keep', r: 'İstanbul-Bolu güzergah içeriği' };
  }

  // Patlıcan közleme, közlenmiş patlıcan salatası
  if (l.includes('patlıcan közleme') || l.includes('közlenmiş patlıcan')) {
    return { d: 'keep', r: 'Mangal garnitür/meze konusu' };
  }

  // Kuru fasulye salatası, piyaz tarifi
  if (l === 'kuru fasulye salatası' || l === 'piyaz tarifi') {
    return { d: 'keep', r: 'Mangal yanı meze/salata tarifi' };
  }

  // Hasanpaşa köftesi
  if (l.includes('hasanpaşa') || l === 'türk köfte' || l === 'bolu köfte') {
    return { d: 'keep', r: 'Türk/Bolu köftesi tarif içeriği' };
  }

  // Mangalda mısır, közde mısır
  if (l.includes('mısır')) {
    return { d: 'keep', r: 'Mangal mısır yan yemek' };
  }

  // Nar ekşili marine, soğan sulu marine, yoğurtlu marine, sütlü marine
  // Already caught by marine rule above

  // Bolu usulü marine
  if (l.includes('bolu usulü')) {
    return { d: 'keep', r: 'Bolu usulü hazırlık tekniği' };
  }

  // Dana antrikot, mangalda antrikot
  if (l.includes('antrikot')) {
    return { d: 'keep', r: 'Dana antrikot menü konusu' };
  }

  // Bütün kuzu mangal
  if (l.includes('bütün kuzu')) {
    return { d: 'keep', r: 'Özel kuzu hazırlama konusu' };
  }

  // Mangal organizasyonu, mangal alışverişi
  if (l.includes('mangal organizasyon') || l.includes('mangal alışveriş')) {
    return { d: 'keep', r: 'Mangal planlama/organizasyon konusu' };
  }

  // Kişi başı et
  if (l.includes('kişi başı et') || l.includes('kişi başı')) {
    return { d: 'keep', r: 'Porsiyon hesabı içerik konusu' };
  }

  // Et mangal sağlıklı mı -- already delete via sağlıklı mı
  // Already caught

  // Mangal sağlık, sağlıklı mangal
  if (l.includes('mangal sağlık') || l.includes('sağlıklı mangal') || l.includes('mangal sağlıklı')) {
    return { d: 'keep', r: 'Mangal sağlık içerik konusu' };
  }

  // mangal pişirme sırası (already keep via pişirme)

  // Mangal ipuçları, hataları
  if (l.includes('mangal ipuçları') || l.includes('mangal hataları')) {
    return { d: 'keep', r: 'Mangal pratik ipucu içeriği' };
  }

  // Krater gölü
  if (l === 'krater gölü') {
    return { d: 'keep', r: 'Gölcük/Bolu bölgesi coğrafi özellik' };
  }

  // Bolu yayla
  if (l === 'bolu yayla') {
    return { d: 'keep', r: 'Bolu yayla turizmi' };
  }

  // Bolu Dağı aile, bolu dağı kış, bolu dağı bayram
  // Already caught by Bolu Dağı rule

  // Sürüş güvenliği already delete

  // Kış molası
  if (l === 'kış molası') {
    return { d: 'keep', r: 'Kış mola konusu' };
  }

  // Yerel çiftçi, taze et tedarik
  if (l === 'yerel çiftçi' || l.includes('taze et tedarik')) {
    return { d: 'keep', r: 'Et kaynağı/tedarik içerik konusu' };
  }

  // Bolu et mangal tarihi
  if (l.includes('et mangal tarihi')) {
    return { d: 'keep', r: 'Et mangal kültür tarihi içeriği' };
  }

  // Mangal piknik rehberi (already keep via piknik)

  // Mevsime göre et mangal
  if (l.includes('mevsime göre')) {
    return { d: 'keep', r: 'Mevsimsel mangal içerik konusu' };
  }

  // Kışın et mangal, yazın et mangal
  if (l.includes('kışın et mangal') || l.includes('yazın et mangal') || l === 'yaz mangalı' || l === 'kış mangalı') {
    return { d: 'keep', r: 'Mevsimsel mangal konusu' };
  }

  // Şömine et mangal
  if (l === 'şömine et mangal') {
    return { d: 'keep', r: 'Kış/şömine et mangal deneyimi' };
  }

  // Açık havada et mangal
  if (l === 'açık havada et mangal') {
    return { d: 'keep', r: 'Açık hava mangal konusu' };
  }

  // Piknikte mangal yapma, piknik malzeme listesi (already keep via piknik)

  // Halil ibrahim usta (kişi ama aynı zamanda marka referansı olabilir)
  // Already delete

  // Düzce Doğa Turizmi (already keep via düzce)

  // Rafting related in Düzce — already delete

  // Mevsimsel
  if (l === 'mevsimsel') {
    return { d: 'review', r: 'Jenerik mevsim etiketi' };
  }

  // Korugöl, efteni already handled

  // Default fallback
  return { d: 'review', r: 'Manuel inceleme gerekli — otomatik sınıflandırılamadı' };
}

for (const tag of tags) {
  const { d, r } = classify(tag);
  const entry = {
    id: tag.id,
    label: tag.label,
    slug: tag.slug,
    postCount: tag.postCount,
    reason: r
  };
  if (d === 'keep') keep.push(entry);
  else if (d === 'delete') del.push(entry);
  else review.push(entry);
}

const result = {
  summary: {
    total: tags.length,
    keep: keep.length,
    delete: del.length,
    review: review.length
  },
  keep,
  delete: del,
  review
};

fs.writeFileSync(
  'C:/Users/tarkt/OneDrive/Desktop/Github/xmlBlog/sites/ibrahiminyeri/etiket-analiz.json',
  JSON.stringify(result, null, 2),
  'utf8'
);

console.log('=== OZET ===');
console.log('Toplam:', result.summary.total);
console.log('KEEP  :', result.summary.keep);
console.log('DELETE:', result.summary.delete);
console.log('REVIEW:', result.summary.review);
console.log('Kontrol toplam:', result.summary.keep + result.summary.delete + result.summary.review);
