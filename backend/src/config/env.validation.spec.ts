import { validateEnv } from './env.validation';

const STRONG_SECRET = 'a'.repeat(16) + 'B7#kq9Zx2mP4vL8w';
const prod = (extra: Record<string, string> = {}) => ({
  NODE_ENV: 'production',
  JWT_ACCESS_SECRET: STRONG_SECRET,
  SUPERADMIN_PASSWORD: 'Kuchli-Parol-2026',
  ...extra,
});

describe('validateEnv', () => {
  describe('development', () => {
    it("dev standart qiymatlari bilan ishlaydi", () => {
      expect(() =>
        validateEnv({
          NODE_ENV: 'development',
          JWT_ACCESS_SECRET: 'formo-dev-only-secret-change-in-production',
          SUPERADMIN_PASSWORD: 'admin123',
        }),
      ).not.toThrow();
    });

    it('JWT_ACCESS_SECRET umuman bo‘lmasa — xato', () => {
      expect(() => validateEnv({ NODE_ENV: 'development' })).toThrow(/JWT_ACCESS_SECRET berilmagan/);
    });
  });

  describe('production', () => {
    it('kuchli qiymatlar bilan ishlaydi', () => {
      expect(() => validateEnv(prod())).not.toThrow();
    });

    it.each(['change-me-access-secret', 'formo-dev-only-secret-change-in-production', 'test-access-secret-0123456789abcdef'])(
      'repodagi JWT secret rad etiladi: %s',
      (secret) => {
        expect(() => validateEnv(prod({ JWT_ACCESS_SECRET: secret }))).toThrow(/repodagi dev qiymati/);
      },
    );

    it('qisqa JWT secret rad etiladi', () => {
      expect(() => validateEnv(prod({ JWT_ACCESS_SECRET: 'short-secret' }))).toThrow(/kamida 32/);
    });

    it.each(['admin123', 'ADMIN123', 'operator123', 'tailor123'])('repodagi superadmin paroli rad etiladi: %s', (pw) => {
      expect(() => validateEnv(prod({ SUPERADMIN_PASSWORD: pw }))).toThrow(/dev paroli/);
    });

    it('qisqa superadmin paroli rad etiladi', () => {
      expect(() => validateEnv(prod({ SUPERADMIN_PASSWORD: 'Ab1!xyz' }))).toThrow(/kamida 10/);
    });

    it('superadmin allaqachon yaratilgan bo‘lsa, SUPERADMIN_PASSWORD bermaslik mumkin', () => {
      const { SUPERADMIN_PASSWORD: _, ...rest } = prod();
      expect(() => validateEnv(rest)).not.toThrow();
    });

    it('bir nechta xato birga ko‘rsatiladi', () => {
      expect(() =>
        validateEnv(prod({ JWT_ACCESS_SECRET: 'change-me-access-secret', SUPERADMIN_PASSWORD: 'admin123' })),
      ).toThrow(/JWT_ACCESS_SECRET[\s\S]*SUPERADMIN_PASSWORD/);
    });
  });
});
