/**
 * making some assumptions about the size of the tournament
 * but there is no guarantee there will be 64 teams in 2021
 */

export type Region = 1 | 2 | 3 | 4;

export type Region1Favorite = 1 | 2 | 3;
export type Region1Sleeper = 4 | 5 | 6 | 7 | 8;
export type Region1Cinderella = 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16;

export type Region2Favorite = 17 | 18 | 19;
export type Region2Sleeper = 20 | 21 | 22 | 23 | 24;
export type Region2Cinderella = 25 | 26 | 27 | 28 | 29 | 30 | 31 | 32;

export type Region3Favorite = 33 | 34 | 35;
export type Region3Sleeper = 36 | 37 | 38 | 39 | 40;
export type Region3Cinderella = 41 | 42 | 43 | 44 | 45 | 46 | 47 | 48;

export type Region4Favorite = 49 | 50 | 51;
export type Region4Sleeper = 52 | 53 | 54 | 55 | 56;
export type Region4Cinderella = 57 | 58 | 59 | 60 | 61 | 62 | 63 | 64;

export type Region1 = Region1Favorite | Region1Sleeper | Region1Cinderella;
export type Region2 = Region2Favorite | Region2Sleeper | Region2Cinderella;
export type Region3 = Region3Favorite | Region3Sleeper | Region3Cinderella;
export type Region4 = Region4Favorite | Region4Sleeper | Region4Cinderella;

export type Favorite = Region1Favorite | Region2Favorite | Region3Favorite | Region4Favorite;
export type Sleeper = Region1Sleeper | Region2Sleeper | Region3Sleeper | Region4Sleeper;
export type Cinderella = Region1Cinderella | Region2Cinderella | Region3Cinderella | Region4Cinderella;

export type Team = Region1 | Region2 | Region3 | Region4;

export type OneSeed = 1 | 17 | 33 | 49;

// TODO: how to prevent duplicates in the bonus region with only type definition
export type Bracket = {
  readonly regional: {
    readonly region1Favorite: Region1Favorite;
    readonly region1Sleeper: Region1Sleeper;
    readonly region1Cinderella: Region1Cinderella;
    readonly region2Favorite: Region2Favorite;
    readonly region2Sleeper: Region2Sleeper;
    readonly region2Cinderella: Region2Cinderella;
    readonly region3Favorite: Region3Favorite;
    readonly region3Sleeper: Region3Sleeper;
    readonly region3Cinderella: Region3Cinderella;
    readonly region4Favorite: Region4Favorite;
    readonly region4Sleeper: Region4Sleeper;
    readonly region4Cinderella: Region4Cinderella;
    readonly bonusFavorite: Favorite;
    readonly bonusSleeper: Sleeper;
    readonly bonusCinderella: Cinderella;
  };
  readonly fastbreakTrio: {
    readonly favorite: Favorite;
    readonly sleeper: Sleeper;
    readonly cinderella: Cinderella;
  };
  readonly sweetSixteen: {
    readonly favorite: Favorite;
    readonly sleeper: Sleeper;
    readonly cinderella: Cinderella;
  };
  readonly finalFour: {
    readonly region1: Region1;
    readonly region2: Region2;
    readonly region3: Region3;
    readonly region4: Region4;
  };
  readonly graveyard: OneSeed;
  readonly tournamentChoice: Team;
  readonly totalPointsScored: number;
};

const favorites: Favorite[] = [1, 2, 3, 17, 18, 19, 33, 34, 35, 49, 50, 51];
export function isFavorite(team: Team): team is Favorite {
  return favorites.findIndex((x) => x === team) > -1;
}

const sleeper: Sleeper[] = [4, 5, 6, 7, 8, 20, 21, 22, 23, 24, 36, 37, 38, 39, 40, 52, 53, 54, 55, 56];
export function isSleeper(team: Team): team is Sleeper {
  return sleeper.findIndex((x) => x === team) > -1;
}

const cinderella: Cinderella[] = [
  9,
  10,
  11,
  12,
  13,
  14,
  15,
  16,
  25,
  26,
  27,
  28,
  29,
  30,
  31,
  32,
  41,
  42,
  43,
  44,
  45,
  46,
  47,
  48,
  57,
  58,
  59,
  60,
  61,
  62,
  63,
  64,
];
export function isCinderella(team: Team): team is Cinderella {
  return cinderella.findIndex((x) => x === team) > -1;
}
