export default {
  email(email) {
    const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    return regex.test(email);
  },

  document(document) {
    const regex = document.length <= 14 ? /^\d{3}\.\d{3}\.\d{3}-\d{2}$/ : /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/;
    return regex.test(document);
  }
}