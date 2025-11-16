import { describe, it, expect } from 'vitest';
import { calculateSavings, formatCurrency, getRevenueLabel, getEmployeeLabel } from './calculator';

describe('Calculator Utility', () => {
  describe('calculateSavings', () => {
    it('calculates correct savings for startup revenue ($0-50k)', () => {
      const result = calculateSavings('0-50k', '0', 'ON');
      expect(result.savings).toBeGreaterThan(0);
      expect(result.savings).toBeLessThan(3000); // Base tier savings
      expect(result.reason).toBeTruthy();
    });

    it('calculates correct savings for established business ($100k-250k)', () => {
      const result = calculateSavings('100k-250k', '1-5', 'ON');
      expect(result.savings).toBeGreaterThanOrEqual(8000);
      expect(result.savings).toBeLessThan(15000);
      expect(result.reason).toBeTruthy();
      expect(result.reason.length).toBeGreaterThan(20);
    });

    it('calculates correct savings for scaling business ($250k-500k)', () => {
      const result = calculateSavings('250k-500k', '6-15', 'ON');
      expect(result.savings).toBeGreaterThan(15000);
      expect(result.reason).toBeTruthy();
    });

    it('applies employee multiplier correctly (1-5 employees)', () => {
      const withoutEmployees = calculateSavings('100k-250k', '0', 'ON');
      const withEmployees = calculateSavings('100k-250k', '1-5', 'ON');

      expect(withEmployees.savings).toBeGreaterThan(withoutEmployees.savings);
    });

    it('applies province adjustments correctly (Quebec +15%)', () => {
      const ontario = calculateSavings('100k-250k', '1-5', 'ON');
      const quebec = calculateSavings('100k-250k', '1-5', 'QC');

      // Quebec should have higher savings due to +15% multiplier
      expect(quebec.savings).toBeGreaterThan(ontario.savings);
    });

    it('applies province adjustments correctly (Alberta -10%)', () => {
      const ontario = calculateSavings('100k-250k', '1-5', 'ON');
      const alberta = calculateSavings('100k-250k', '1-5', 'AB');

      // Alberta should have lower savings due to 0.9 multiplier
      expect(alberta.savings).toBeLessThan(ontario.savings);
    });

    it('handles edge case: null revenue', () => {
      const result = calculateSavings(null, '0', 'ON');
      expect(result.savings).toBe(0);
      expect(result.reason).toContain('Invalid');
    });

    it('handles edge case: invalid province', () => {
      const result = calculateSavings('100k-250k', '1-5', 'XX');
      // Should still calculate with default multiplier
      expect(result.savings).toBeGreaterThan(0);
    });

    it('handles enterprise tier ($500k+)', () => {
      const result = calculateSavings('500k+', '51+', 'ON');
      expect(result.savings).toBeGreaterThan(30000);
      expect(result.reason).toBeTruthy();
    });

    it('provides breakdown with revenue, employees, and province components', () => {
      const result = calculateSavings('100k-250k', '1-5', 'QC');
      expect(result.breakdown).toBeDefined();
      expect(result.breakdown.revenue).toBeGreaterThan(0);
      expect(result.breakdown.employees).toBeGreaterThan(0);
    });

    it('generates appropriate tax strategy reasons', () => {
      const startup = calculateSavings('0-50k', '0', 'ON');
      const established = calculateSavings('100k-250k', '6-15', 'ON');

      expect(startup.reason).toBeTruthy();
      expect(established.reason).toBeTruthy();
      // Different strategies for different tiers
      expect(startup.reason).not.toBe(established.reason);
    });
  });

  describe('formatCurrency', () => {
    it('formats currency correctly in CAD format', () => {
      expect(formatCurrency(1000)).toBe('$1,000');
      expect(formatCurrency(10000)).toBe('$10,000');
      expect(formatCurrency(100000)).toBe('$100,000');
    });

    it('handles zero correctly', () => {
      expect(formatCurrency(0)).toBe('$0');
    });

    it('rounds to nearest dollar (no cents)', () => {
      expect(formatCurrency(1234.56)).toBe('$1,235');
      expect(formatCurrency(1234.12)).toBe('$1,234');
    });

    it('handles large numbers', () => {
      expect(formatCurrency(1000000)).toBe('$1,000,000');
    });

    it('handles negative numbers (edge case)', () => {
      const result = formatCurrency(-1000);
      expect(result).toContain('1,000');
    });
  });

  describe('getRevenueLabel', () => {
    it('returns correct English labels', () => {
      expect(getRevenueLabel('0-50k', 'en')).toBe('Under $50K');
      expect(getRevenueLabel('100k-250k', 'en')).toBe('$100K - $250K');
      expect(getRevenueLabel('500k+', 'en')).toBe('Over $500K');
    });

    it('returns correct French labels', () => {
      expect(getRevenueLabel('0-50k', 'fr')).toBe('Moins de 50 K$');
      expect(getRevenueLabel('100k-250k', 'fr')).toBe('100 K$ - 250 K$');
      expect(getRevenueLabel('500k+', 'fr')).toBe('Plus de 500 K$');
    });

    it('defaults to English if language not specified', () => {
      expect(getRevenueLabel('100k-250k')).toContain('$100K');
    });

    it('returns range if not found', () => {
      expect(getRevenueLabel('invalid-range', 'en')).toBe('invalid-range');
    });
  });

  describe('getEmployeeLabel', () => {
    it('returns correct English labels', () => {
      expect(getEmployeeLabel('0', 'en')).toBe('Sole Proprietor');
      expect(getEmployeeLabel('1-5', 'en')).toBe('1-5 Employees');
      expect(getEmployeeLabel('51+', 'en')).toBe('51+ Employees');
    });

    it('returns correct French labels', () => {
      expect(getEmployeeLabel('0', 'fr')).toBe('Travailleur autonome');
      expect(getEmployeeLabel('1-5', 'fr')).toBe('1-5 Employés');
      expect(getEmployeeLabel('51+', 'fr')).toBe('51+ Employés');
    });

    it('defaults to English if language not specified', () => {
      expect(getEmployeeLabel('0')).toBe('Sole Proprietor');
    });
  });

  // Security tests
  describe('Security: Input Validation', () => {
    it('does not execute code in revenue parameter', () => {
      const result = calculateSavings('<script>alert("XSS")</script>', '0', 'ON');
      expect(result.savings).toBe(0);
      expect(result.reason).not.toContain('<script>');
    });

    it('handles SQL injection attempts safely', () => {
      const result = calculateSavings("' OR '1'='1", '0', 'ON');
      expect(result.savings).toBe(0);
    });

    it('handles extremely large numbers safely', () => {
      const result = calculateSavings('999999999999', '999999', 'ON');
      expect(result.savings).toBe(0);
    });
  });
});
