import toast from "react-hot-toast";

const MAX = 2;
let queue = []; // toast id'leri

function push(id) {
  // aynı id varsa çıkarıp sona ekle
  queue = queue.filter((x) => x !== id);
  queue.push(id);

  // limit aşılırsa en eskisini kapat
  while (queue.length > MAX) {
    const oldest = queue.shift();
    if (oldest) toast.dismiss(oldest);
  }

  return id;
}

export default {
  success: (msg, opts) => push(toast.success(msg, opts)),
  error: (msg, opts) => push(toast.error(msg, opts)),
  loading: (msg, opts) => push(toast.loading(msg, opts)),
  custom: (renderer, opts) => push(toast.custom(renderer, opts)),
  promise: (p, msgs, opts) => push(toast.promise(p, msgs, opts)),

  dismiss: (id) => {
    if (id) queue = queue.filter((x) => x !== id);
    else queue = [];
    return toast.dismiss(id);
  },
  remove: (id) => {
    if (id) queue = queue.filter((x) => x !== id);
    else queue = [];
    return toast.remove(id);
  },
};
