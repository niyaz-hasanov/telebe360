import toast from "react-hot-toast";

const MAX = 2;
let active = [];
let inited = false;

function init() {
  if (inited) return;
  inited = true;

  toast.onChange((t) => {
    if (!t.visible) {
      active = active.filter((id) => id !== t.id);
    }
  });
}

function cap(id) {
  init();

  active = active.filter((x) => x !== id);
  active.push(id);

  while (active.length > MAX) {
    const oldest = active.shift();
    if (oldest) toast.dismiss(oldest);
  }

  return id;
}

export default {
  success: (msg, opts) => cap(toast.success(msg, opts)),
  error: (msg, opts) => cap(toast.error(msg, opts)),
  loading: (msg, opts) => cap(toast.loading(msg, opts)),
  custom: (renderer, opts) => cap(toast.custom(renderer, opts)),
  promise: (p, msgs, opts) => cap(toast.promise(p, msgs, opts)),
  dismiss: (id) => {
    if (id) active = active.filter((x) => x !== id);
    else active = [];
    return toast.dismiss(id);
  },
};
