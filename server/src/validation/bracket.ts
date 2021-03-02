import * as D from 'io-ts/Decoder';

/**
 * this is almost a straight copy of the bracket type def
 * dont love that, but also dont like relying on io-ts for
 * all type definitions
 */

const Region1Favorite = D.union(D.literal(1), D.literal(2), D.literal(3));
const Region1Sleeper = D.union(D.literal(4), D.literal(5), D.literal(6), D.literal(7), D.literal(8));
const Region1Cinderella = D.union(
  D.literal(9),
  D.literal(10),
  D.literal(11),
  D.literal(12),
  D.literal(13),
  D.literal(14),
  D.literal(15),
  D.literal(16)
);

const Region2Favorite = D.union(D.literal(17), D.literal(18), D.literal(19));
const Region2Sleeper = D.union(D.literal(20), D.literal(21), D.literal(22), D.literal(23), D.literal(24));
const Region2Cinderella = D.union(
  D.literal(25),
  D.literal(26),
  D.literal(27),
  D.literal(28),
  D.literal(29),
  D.literal(30),
  D.literal(31),
  D.literal(32)
);

const Region3Favorite = D.union(D.literal(33), D.literal(34), D.literal(35));
const Region3Sleeper = D.union(D.literal(36), D.literal(37), D.literal(38), D.literal(39), D.literal(40));
const Region3Cinderella = D.union(
  D.literal(41),
  D.literal(42),
  D.literal(43),
  D.literal(44),
  D.literal(45),
  D.literal(46),
  D.literal(47),
  D.literal(48)
);

const Region4Favorite = D.union(D.literal(49), D.literal(50), D.literal(51));
const Region4Sleeper = D.union(D.literal(52), D.literal(53), D.literal(54), D.literal(55), D.literal(56));
const Region4Cinderella = D.union(
  D.literal(57),
  D.literal(58),
  D.literal(59),
  D.literal(60),
  D.literal(61),
  D.literal(62),
  D.literal(63),
  D.literal(64)
);

const Region1 = D.union(Region1Favorite, Region1Sleeper, Region1Cinderella);
const Region2 = D.union(Region2Favorite, Region2Sleeper, Region2Cinderella);
const Region3 = D.union(Region3Favorite, Region3Sleeper, Region3Cinderella);
const Region4 = D.union(Region4Favorite, Region4Sleeper, Region4Cinderella);

const Favorite = D.union(Region1Favorite, Region2Favorite, Region3Favorite, Region4Favorite);
const Sleeper = D.union(Region1Sleeper, Region2Sleeper, Region3Sleeper, Region4Sleeper);
const Cinderella = D.union(Region1Cinderella, Region2Cinderella, Region3Cinderella, Region4Cinderella);

const Team = D.union(Region1, Region2, Region3, Region4);

const OneSeed = D.union(D.literal(1), D.literal(17), D.literal(33), D.literal(49));

export const Bracket = D.type({
  regional: D.type({
    region1Favorite: Region1Favorite,
    region1Sleeper: Region1Sleeper,
    region1Cinderella: Region1Cinderella,
    region2Favorite: Region2Favorite,
    region2Sleeper: Region2Sleeper,
    region2Cinderella: Region2Cinderella,
    region3Favorite: Region3Favorite,
    region3Sleeper: Region3Sleeper,
    region3Cinderella: Region3Cinderella,
    region4Favorite: Region4Favorite,
    region4Sleeper: Region4Sleeper,
    region4Cinderella: Region4Cinderella,
    bonusFavorite: Favorite,
    bonusSleeper: Sleeper,
    bonusCinderella: Cinderella,
  }),
  fastbreakTrio: D.type({
    favorite: Favorite,
    sleeper: Sleeper,
    cinderella: Cinderella,
  }),
  sweetSixteen: D.type({
    favorite: Favorite,
    sleeper: Sleeper,
    cinderella: Cinderella,
  }),
  finalFour: D.type({
    region1: Region1,
    region2: Region2,
    region3: Region3,
    region4: Region4,
  }),
  graveyard: OneSeed,
  tournamentChoice: Team,
  totalPointsScored: D.number,
});

export const BracketEntry = D.type({
  name: D.string,
  bracket: Bracket,
});
