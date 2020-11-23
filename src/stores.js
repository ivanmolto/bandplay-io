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
function createIconsStore() {
  const { subscribe, set } = writable('0');
  return {
    subscribe,
    apply: (filter) => set(filter),
  }
}
function createCurrentReleaseStore() {
  const { subscribe, set} = writable(' ');
  return {
    subscribe,
    apply: (filter) => set(filter),
  }
}
function createPreviousReleaseStore() {
  const { subscribe, set} = writable(' ');
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
export const iconsStore = createIconsStore();
export const volumeStore = writable(1.0);
export const pausedStore = writable(true);
export const currentReleaseStore = createCurrentReleaseStore();
export const previousReleaseStore = createPreviousReleaseStore();
export const releasesStore = writable([]);
export const tracksStore = writable([]);
export const tracksByArtistStore = writable([]);
export const myTipsStore = writable([]);
export const myFansStore = writable([]);
export const avatarStore = writable([]);
export const tracks = writable([]);
export const customTracksStore = {
  subscribe: tracks.subscribe,
  addTrack: trackData => {
    const newTrack = {
      ...trackData, id: Math.round((new Date()).getTime() / 1000)
    }
    tracks.update(items => {
      return [newTrack, ...items]
    })
  },
  reset: () => {
    tracks.update(items => { 
      return []
    })
  }
}
export const genres = writable([]);
export const customGenresStore = {
  subscribe: genres.subscribe,
  addGenre: trackGenres => {
    genres.update(items => {
      var gen = [trackGenres, ...items];
      var uniq = [...new Set(gen)];
      return uniq
    })
  },
  reset: () => {
    genres.update(items => { 
      return []
    })
  }
}
function createCount() {
  const { subscribe, set, update } = writable(0);

  return {
    subscribe,
    increment: () => update(n => n + 1),
    reset: () => set(0)
   };
}
export const count = createCount();
