# Formo Mobile

Formo — foydalanuvchi o‘z futbol formasini yaratadigan mobil ilova.

## Ishga tushirish

```bash
npm install
npx expo start
```

## Expo 57 va Metro cache

Agar `transformFile` xatosi chiqsa, avval eski Metro cache va ishlayotgan Expo serverini tozalang:

```bash
npm run start:clear
```

Agar xato davom etsa, `mobile` papkasida dependencylarni qayta o‘rnating:

```bash
Remove-Item -Recurse -Force node_modules, .expo -ErrorAction SilentlyContinue
npm ci
npm run start:clear
```

Expo SDK 57 uchun React `19.2.3`, React Native `0.86.3` va Metro `0.84.x` versiyalari lock faylda birga saqlangan. `npm run export:android` Metro bundlingni tekshirish uchun ishlatiladi.

## Arxitektura

- `src/screens/` — har bir asosiy ekran alohida modulda.
- `src/components/ui/` — qayta ishlatiladigan UI komponentlari.
- `src/navigation/` — ilova marshrutlari va ekranlar o‘rtasidagi o‘tishlar.
- `src/store/` — savat, sevimlilar va til holati.
- `src/i18n/` — o‘zbekcha (`uz`) asosiy til, ruscha (`ru`) va inglizcha (`en`) tarjimalar.
- `src/data/` — vaqtinchalik mock ma’lumotlar.
- `src/services/api.js` — backend ulanishi uchun yagona API adapter.
- `src/constants/` — ranglar, radiuslar va umumiy dizayn tokenlari.

## Backend ulash

`.env` fayliga quyidagini qo‘shing:

```env
EXPO_PUBLIC_API_URL=https://api.example.com
```

`src/services/api.js` dagi metodlar backend endpointlariga moslashtiriladi. Ekranlar API tafsilotlarini bilmaydi — ular faqat service qatlamidan ma’lumot oladi.

## Tilni almashtirish

Profil → Sozlamalar → Ilova tili bo‘limida o‘zbekcha, ruscha yoki inglizcha tanlanadi. Standart til — o‘zbekcha.

## Hozirgi funksiyalar

- katalog va model qidiruvi;
- mahsulot tafsilotlari;
- forma rangi, ism va raqamni tanlash;
- mahalliy savat;
- mock buyurtma va buyurtma holati;
- profil va til sozlamalari.

AR kamera, to‘lov va server autentifikatsiyasi keyingi backend/native integratsiya bosqichlari uchun ajratilgan.
