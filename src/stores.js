import { writable } from 'svelte/store';
function createSearchStore() {
  const { subscribe, set } = writable('');
  return {
    subscribe,
    apply: (term) => set(term)
  };
}
function createGenresStore() {
  const { subscribe, set } = writable('All');
  return {
    subscribe,
    apply: (filter) => set(filter)
  };
}
function createBadgesStore() {
  const { subscribe, set } = writable('All');
  return {
    subscribe,
    apply: (filter) => set(filter)
  };
}
function createLocationsStore() {
  const { subscribe, set } = writable('All');
  return {
    subscribe,
    apply: (filter) => set(filter)
  };
}
function createBootlegsStore() {
  const { subscribe, set } = writable('All');
  return {
    subscribe,
    apply: (filter) => set(filter),
  }
}
export const genresStore = createGenresStore();
export const badgesStore = createBadgesStore();
export const locationsStore = createLocationsStore();
export const bootlegsStore = createBootlegsStore();
export const searchStore = createSearchStore();
export const tracksStore = writable([]);
export const tracksByArtistStore = writable([]);
export const myTipsStore = writable([]);
export const myFansStore = writable([]);
export const avatarStore = writable([]);
