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

export type Favorite =
  | Region1Favorite
  | Region2Favorite
  | Region3Favorite
  | Region4Favorite;
export type Sleeper =
  | Region1Sleeper
  | Region2Sleeper
  | Region3Sleeper
  | Region4Sleeper;
export type Cinderella =
  | Region1Cinderella
  | Region2Cinderella
  | Region3Cinderella
  | Region4Cinderella;

export type Team = Region1 | Region2 | Region3 | Region4;

export type OneSeed = 1 | 17 | 33 | 49;

// TODO: how to prevent duplicates in the bonus region with only export type definition
export type Bracket = {
  regional: {
    region1Favorite: Region1Favorite;
    region1Sleeper: Region1Sleeper;
    region1Cinderella: Region1Cinderella;
    region2Favorite: Region2Favorite;
    region2Sleeper: Region2Sleeper;
    region2Cinderella: Region2Cinderella;
    region3Favorite: Region3Favorite;
    region3Sleeper: Region3Sleeper;
    region3Cinderella: Region3Cinderella;
    region4Favorite: Region4Favorite;
    region4Sleeper: Region4Sleeper;
    region4Cinderella: Region4Cinderella;
    bonusFavorite: Favorite;
    bonusSleeper: Sleeper;
    bonusCinderella: Cinderella;
  };
  fastbreakTrio: {
    favorite: Favorite;
    sleeper: Sleeper;
    cinderella: Cinderella;
  };
  sweetSixteen: {
    favorite: Favorite;
    sleeper: Sleeper;
    cinderella: Cinderella;
  };
  finalFour: {
    region1: Region1;
    region2: Region2;
    region3: Region3;
    region4: Region4;
  };
  graveyard: OneSeed;
  tournamentChoice: Team;
  totalPointsScored: number;
};
