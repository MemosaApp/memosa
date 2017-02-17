/**
 * Everything is optional!
 */
const track = (meta = {
  location: '',
  namespace: '',
  action: '',
}) => {
  if (window.ga) {
    window.ga('send', 'event', meta.namespace, meta.action, meta.location);
  }
};

export default track;
