# State & Focus-Ring Token System

Minimal Modern Blog Theme'nin Component State ve Focus-Ring Token sistemi, tüm interaktif UI componentlerinde tutarlı ve erişilebilir davranışlar sağlar.

## 🎯 Genel Bakış

State token sistemi şunları içerir:
- **Component States**: Button, input, card, badge ve link için tüm state tanımları
- **Focus-Ring**: Klavye navigasyonu için erişilebilir focus göstergeleri
- **Dark Mode**: Tüm state'ler için otomatik dark mode desteği
- **Accessibility**: WCAG AA standartlarına uygun kontrast oranları
- **Touch Optimization**: Dokunmatik cihazlar için optimize edilmiş davranışlar

## 📁 Dosya Yapısı

```
blog-theme/
├── src/styles/
│   ├── tokens/
│   │   └── states.json          # State token tanımları
│   └── tailwind.css             # State utility class'ları
├── scripts/
│   └── validate-states.js       # State validasyon scripti
└── tailwind.config.js           # Tailwind konfigürasyonu
```

## 🎨 Focus-Ring Sistemi

### Temel Konfigürasyon

Focus-ring sadece **klavye navigasyonunda** (`:focus-visible`) görünür, mouse tıklamalarında görünmez.

```json
{
  "focusRing": {
    "width": "2px",
    "offset": "2px",
    "color": {
      "light": "#91b3d1",
      "dark": "#7895ba"
    }
  }
}
```

### Focus-Ring Utility Class'ları

```html
<!-- Varsayılan focus-ring (primary-300) -->
<button class="focus-ring">
  Button with Focus Ring
</button>

<!-- Primary renk focus-ring -->
<button class="focus-ring-primary">
  Primary Focus
</button>

<!-- Error context focus-ring -->
<input type="text" class="focus-ring-error">

<!-- Success context focus-ring -->
<button class="focus-ring-success">
  Success Action
</button>

<!-- Focus-ring'i devre dışı bırak -->
<div class="focus-ring-none">
  No Focus Ring
</div>
```

### Otomatik Focus-Visible Davranışı

Tüm elementler otomatik olarak focus outline'larını gizler ve focus-visible kullanır:

```css
/* tailwind.css içinde otomatik uygulanır */
*:focus {
  outline: none;
}

*:focus-visible {
  ring: 2px;
  ring-color: state-focus-ring;
  ring-offset: 2px;
}
```

## 🔘 Button States

### State Tanımları

- **default**: Normal görünüm
- **hover**: Mouse üzerindeyken
- **active**: Tıklama anında
- **disabled**: Devre dışı durum
- **loading**: Yükleme durumu

### Kullanım

```html
<!-- Temel button -->
<button class="btn px-6 py-3 bg-primary-500 text-white rounded-md">
  Click Me
</button>

<!-- Disabled button -->
<button disabled class="btn px-6 py-3 bg-primary-500 text-white rounded-md">
  Disabled
</button>

<!-- Loading button -->
<button class="btn loading px-6 py-3 bg-primary-500 text-white rounded-md">
  Loading...
</button>

<!-- Success button -->
<button class="btn px-6 py-3 bg-success text-white rounded-md">
  Success Action
</button>
```

### Button State Davranışları

```css
.btn {
  /* Otomatik transition ve focus-ring */
  @apply transition-all duration-fast ease-default;
  @apply focus-visible:ring-2 focus-visible:ring-state-focus-ring;
}

.btn:hover:not(:disabled) {
  @apply shadow-md scale-[1.02];
}

.btn:active:not(:disabled) {
  @apply scale-[0.98];
}

.btn:disabled {
  @apply opacity-50 cursor-not-allowed;
}
```

## 📝 Input States

### State Tanımları

- **default**: Normal görünüm
- **hover**: Mouse üzerindeyken
- **focus**: Input odaklandığında
- **disabled**: Devre dışı durum
- **error**: Hata durumu
- **success**: Başarılı durum

### Kullanım

```html
<!-- Varsayılan input -->
<input type="text" 
  placeholder="Type something..." 
  class="input w-full px-4 py-3 border border-surface-border rounded-md">

<!-- Error state -->
<input type="email" 
  class="input input-error w-full px-4 py-3 border rounded-md">
<p class="text-body-sm text-error mt-1">Invalid email address</p>

<!-- Success state -->
<input type="email" 
  value="user@example.com"
  class="input input-success w-full px-4 py-3 border rounded-md">
<p class="text-body-sm text-success mt-1">Email is valid</p>

<!-- Disabled input -->
<input type="text" 
  disabled
  placeholder="Disabled" 
  class="input w-full px-4 py-3 border border-surface-border rounded-md">
```

## 🎴 Card States

### State Tanımları

- **default**: Normal görünüm
- **hover**: Mouse üzerindeyken
- **active**: Tıklama anında

### Kullanım

```html
<!-- Static card -->
<div class="bg-surface-card border border-surface-border rounded-lg p-6 shadow-sm">
  <h3 class="text-h5 font-heading mb-2">Static Card</h3>
  <p class="text-body">Card content...</p>
</div>

<!-- Interactive card (button) -->
<button class="card-interactive text-left bg-surface-card border border-surface-border rounded-lg p-6 shadow-sm">
  <h3 class="text-h5 font-heading mb-2">Clickable Card</h3>
  <p class="text-body">Click me!</p>
</button>

<!-- Interactive card (link) -->
<a href="#" class="card-interactive block bg-surface-card border border-surface-border rounded-lg p-6 shadow-sm">
  <h3 class="text-h5 font-heading mb-2">Link Card</h3>
  <p class="text-body">Navigate to...</p>
</a>
```

### Card State Davranışları

```css
.card-interactive {
  @apply transition-all duration-fast ease-default;
  @apply focus-visible:ring-2 focus-visible:ring-state-focus-ring;
}

.card-interactive:hover {
  @apply shadow-lg border-primary-300 scale-[1.02];
}

.card-interactive:active {
  @apply scale-100;
}
```

## 🏷️ Badge States

### State Tanımları

- **default**: Normal badge
- **hover**: Tıklanabilir badge'ler için
- **success**: Başarı göstergesi
- **error**: Hata göstergesi
- **warning**: Uyarı göstergesi
- **info**: Bilgi göstergesi

### Kullanım

```html
<!-- Varsayılan badge -->
<span class="badge inline-flex items-center px-3 py-1 rounded-full text-body-sm bg-primary-100 text-primary-700 border border-primary-200">
  Default
</span>

<!-- Clickable badge -->
<button class="badge badge-interactive inline-flex items-center px-3 py-1 rounded-full text-body-sm bg-primary-100 text-primary-700 border border-primary-200">
  Clickable
</button>

<!-- Semantic badges -->
<span class="badge inline-flex items-center px-3 py-1 rounded-full text-body-sm bg-success-light text-success-dark border border-success">
  Success
</span>

<span class="badge inline-flex items-center px-3 py-1 rounded-full text-body-sm bg-error-light text-error-dark border border-error">
  Error
</span>

<span class="badge inline-flex items-center px-3 py-1 rounded-full text-body-sm bg-warning-light text-warning-dark border border-warning">
  Warning
</span>

<span class="badge inline-flex items-center px-3 py-1 rounded-full text-body-sm bg-info-light text-info-dark border border-info">
  Info
</span>
```

## 🔗 Link States

### State Tanımları

- **default**: Normal link
- **hover**: Mouse üzerindeyken
- **active**: Tıklama anında
- **visited**: Ziyaret edilmiş

### Kullanım

```html
<p class="text-body">
  Bu metin içinde <a href="#" class="link text-primary-500">bir link</a> var.
</p>

<!-- Custom focus-ring ile link -->
<a href="#" class="link focus-ring-error text-error">
  Error context link
</a>

<!-- Visited state -->
<a href="#visited" class="link text-primary-500 visited:text-secondary-700">
  Visited link
</a>
```

## 🎛️ State Utility Classes

Genel amaçlı state modifier'ları:

```html
<!-- Varsayılan state -->
<div class="state-default">Normal element</div>

<!-- Hover efekti -->
<div class="state-hover">Hover me</div>

<!-- Active efekti -->
<button class="state-active">Click me</button>

<!-- Disabled state -->
<div class="state-disabled">Disabled element</div>

<!-- Loading state -->
<button class="state-loading">Loading...</button>
```

## 🌓 Dark Mode Desteği

Tüm state'ler otomatik olarak dark mode'u destekler. CSS değişkenleri kullanılarak light/dark mode arasında geçiş yapılır:

```css
:root {
  --state-focus-ring: 145 179 209; /* Light mode */
}

.dark {
  --state-focus-ring: 120 149 186; /* Dark mode */
}
```

HTML'de dark mode:

```html
<!-- Dark mode aktif -->
<html class="dark">
  <!-- Tüm state'ler otomatik olarak dark mode renklerini kullanır -->
</html>

<!-- Toggle button -->
<button onclick="document.documentElement.classList.toggle('dark')">
  Toggle Dark Mode
</button>
```

## 📱 Touch Device Optimization

Dokunmatik cihazlarda hover efektleri otomatik olarak devre dışı bırakılır:

```css
@media (hover: none) and (pointer: coarse) {
  .btn:hover:not(:disabled),
  .card-interactive:hover,
  .badge-interactive:hover {
    transform: none;
    box-shadow: none;
  }
}
```

## ♿ Erişilebilirlik

### WCAG AA Kontrast

Tüm state color kombinasyonları (disabled hariç) WCAG AA kontrast standartlarını (4.5:1) karşılar.

### Klavye Navigasyonu

- `Tab` tuşu ile tüm interaktif elementler arasında gezinebilirsiniz
- Focus-ring sadece klavye navigasyonunda görünür (`:focus-visible`)
- `Enter` ve `Space` tuşları ile butonlar aktive edilir

### Screen Reader Desteği

State değişiklikleri için ARIA öznitelikleri:

```html
<!-- Loading state -->
<button class="btn loading" aria-busy="true">
  Loading...
</button>

<!-- Disabled state -->
<button class="btn" disabled aria-disabled="true">
  Disabled
</button>

<!-- Error state -->
<input type="text" class="input input-error" aria-invalid="true" aria-describedby="error-msg">
<p id="error-msg" role="alert">Invalid input</p>

<!-- Success state -->
<input type="text" class="input input-success" aria-invalid="false">
```

## 🧪 Validasyon

State token'larını validate etmek için:

```bash
# Sadece state validasyonu
npm run validate:states

# Tüm token validasyonları
npm run validate:all
```

Validasyon scripti şunları kontrol eder:
- Focus-ring konfigürasyonu (2px width, 2px offset)
- Tüm component'lar için gerekli state'lerin varlığı
- HEX renk formatı geçerliliği
- WCAG AA kontrast oranları
- Light/dark mode variant'ları

## 🎨 Test Sayfası

State ve focus-ring davranışlarını test etmek için:

```bash
# Development server
npm run dev
```

Ardından `states-test.html` sayfasını ziyaret edin:
- Tüm component state'leri görsel örnekler
- Klavye navigasyonu ile focus-ring testi
- Dark mode toggle
- Interactive örnekler

## 💡 Best Practices

### DO ✅

- Tüm interaktif elementlerde state utility class'larını kullanın
- Klavye navigasyonunu her zaman test edin
- Dark mode'da contrast oranlarını kontrol edin
- Touch cihazlarda test edin
- State değişikliklerini ARIA ile bildirin

### DON'T ❌

- Hardcoded renk değerleri kullanmayın
- Focus outline'ları tamamen silmeyin
- Disabled element'lere tıklanabilir davranışlar eklemeyin
- Hover efektlerini touch cihazlarda zorunlu tutmayın
- State transition'larını atlayın (her zaman transition ekleyin)

## 🔄 Güncelleme

State token'larını güncellemek için:

1. `src/styles/tokens/states.json` dosyasını düzenleyin
2. Validasyonu çalıştırın: `npm run validate:states`
3. Build edin: `npm run build`
4. Test sayfasında kontrol edin: `npm run dev`

## 📚 İlgili Dökümanlar

- [COLOR_TOKENS.md](./COLOR_TOKENS.md) - Renk token sistemi
- [TYPOGRAPHY_TOKENS.md](./TYPOGRAPHY_TOKENS.md) - Tipografi token sistemi
- [ANIMATION_TOKENS.md](./ANIMATION_TOKENS.md) - Animasyon token sistemi
- [TOKENS.md](./TOKENS.md) - Genel token sistemi

## 🐛 Sorun Giderme

### Focus-ring görünmüyor

**Neden**: Mouse ile tıklama yapıyorsunuz.
**Çözüm**: Tab tuşu ile klavye navigasyonu kullanın.

### State renkleri dark mode'da çalışmıyor

**Neden**: HTML elementinde `dark` class'ı yok.
**Çözüm**: `<html class="dark">` ekleyin.

### Hover efekti touch cihazda çalışıyor

**Neden**: Normal davranış - CSS spec'e göre touch cihazlar hover'ı destekler.
**Çözüm**: Media query ile optimize edilmiştir: `@media (hover: none)`.

### Disabled button hala tıklanabiliyor

**Neden**: `disabled` attribute'u eksik.
**Çözüm**: `<button disabled class="btn">` şeklinde kullanın.

---

**Not**: Bu döküman, state ve focus-ring token sisteminin tam referansıdır. Örnekler için `src/pages/states-test.html` sayfasına bakın.
