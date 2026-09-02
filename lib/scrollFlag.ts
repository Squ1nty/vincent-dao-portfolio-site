let isProgrammaticScroll = false;

export function setProgrammaticScroll(value: boolean) {
  isProgrammaticScroll = value;
}

export function getProgrammaticScroll() {
  return isProgrammaticScroll;
}