const base: Intl.DateTimeFormatOptions = {
  timeZone: "Asia/Dhaka",
  day: "2-digit",
  month: "short",
  year: "numeric",
};

export const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-GB", base);

export const formatDateTime = (iso: string) =>
  new Date(iso).toLocaleString("en-GB", { ...base, hour: "numeric", minute: "2-digit", hour12: true });

export const isPast = (iso: string) => new Date(iso).getTime() < Date.now();

// value for <input type="datetime-local">
export const toInputValue = (iso: string) => {
  const d = new Date(iso);
  d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
  return d.toISOString().slice(0, 16);
};
export const nowInputValue = () => toInputValue(new Date().toISOString());