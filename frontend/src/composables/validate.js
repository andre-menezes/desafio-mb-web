export default {
  field(field, data) {
    if (!data) return 'empty';
    if (!this[field](data)) return 'invalid';
    return true;
  },

  name(data) {
    const regex = /^[A-Za-z]{2,} [A-Za-z]{2,}( [A-Za-z]{1,})*$/;
    return regex.test(data);
  },

  email(data) {
    const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    return regex.test(data);
  },

  date(data) {
    return !isNaN(new Date(data).getTime());
  },

  cpf(data) {
    const regex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
    return regex.test(data);
  },

  cnpj(data) {
    const regex = /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/;
    return regex.test(data);
  },
  
  phone(data) {
    const regex = /^\(\d{2}\) \d{4,5}-\d{4}$/;
    return regex.test(data);
  }
}