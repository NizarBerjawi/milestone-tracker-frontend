import { ValidationErrors } from '../common/types';

class Errors {
  errors: ValidationErrors;

  constructor(errors: ValidationErrors = {}) {
    this.errors = errors;
  }

  all(): ValidationErrors {
    return this.errors;
  }

  get(key: string): string[] {
    if (!this.has(key)) {
      return [];
    }

    return this.errors[key];
  }

  first(key: string): string {
    if (!this.get(key).length) {
      return;
    }

    return this.get(key)[0];
  }

  has(key: string): boolean {
    return Object.prototype.hasOwnProperty.call(this.errors, key);
  }

  clear(key: string): void {
    if (!this.has(key)) {
      return;
    }

    delete this.errors[key];
  }

  clearAll(): void {
    this.errors = {};
  }
}

export default Errors;
