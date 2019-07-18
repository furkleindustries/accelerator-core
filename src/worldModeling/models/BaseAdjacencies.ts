export type BaseAdjacencies =
  CardinalDirections |
    IntercardinalDirections |
    SecondaryIntercardinalDirections |
    HandednessDirections |
    typeof AngularDirections |
    ElevationDirections;

export enum CardinalDirections {
  North = 'North',
  East = 'East',
  South = 'South',
  West = 'West',
}

export enum IntercardinalDirections {
  Northeast = 'Northeast',
  Southeast = 'Southeast',
  Southwest = 'Southwest',
  Northwest = 'Northwest',
}

export enum SecondaryIntercardinalDirections {
  NorthNortheast = 'NorthNortheast',
  EastNortheast = 'EastNortheast',
  EastSoutheast = 'EastSoutheast',
  SouthSoutheast = 'SouthSoutheast',
  SouthSouthwest = 'SouthSouthwest',
  WestSouthwest = 'WestSouthwest',
  WestNorthwest = 'WestNorthwest',
  NorthNorthwest = 'NorthNorthwest',
}

export enum HandednessDirections {
  Left = 'Left',
  Right = 'Right',
}

let tempAngularDirections: Record<string | number, string> = {};
' '.repeat(360).split('').forEach((unused, index) => {
  tempAngularDirections[index] = `${index}deg`;
  tempAngularDirections[String(index)] = `${index}deg`;
  tempAngularDirections[`${index}deg`] = `${index}deg`;
});

export const AngularDirections = Object.freeze(tempAngularDirections);

export enum ElevationDirections {
  Above = 'Above',
  Below = 'Below',
}

export type ReverseBaseDirections =
  ReverseCardinalDirections |
    ReverseIntercardinalDirections |
    ReverseSecondaryIntercardinalDirections |
    ReverseHandednessDirections |
    typeof ReverseAngularDirections |
    ReverseElevationDirections;

export enum ReverseCardinalDirections {
  North = CardinalDirections.South,
  East = CardinalDirections.West,
  South = CardinalDirections.North,
  West = CardinalDirections.East,
}

export enum ReverseIntercardinalDirections {
  Northeast = IntercardinalDirections.Southwest,
  Southeast = IntercardinalDirections.Northwest,
  Southwest = IntercardinalDirections.Northeast,
  Northwest = IntercardinalDirections.Southeast,
}

export enum ReverseSecondaryIntercardinalDirections {
  NorthNortheast = SecondaryIntercardinalDirections.SouthSouthwest,
  EastNortheast = SecondaryIntercardinalDirections.WestSouthwest,
  EastSoutheast = SecondaryIntercardinalDirections.WestNorthwest,
  SouthSoutheast = SecondaryIntercardinalDirections.NorthNorthwest,
  SouthSouthwest = SecondaryIntercardinalDirections.NorthNortheast,
  WestSouthwest = SecondaryIntercardinalDirections.EastNortheast,
  WestNorthwest = SecondaryIntercardinalDirections.EastSoutheast,
  NorthNorthwest = SecondaryIntercardinalDirections.SouthSoutheast,
}

export enum ReverseHandednessDirections {
  Left = HandednessDirections.Right,
  Right = HandednessDirections.Left,
}

let tempReverseAngularDirections: Record<string | number, string> = {};
' '.repeat(360).split('').forEach((unused, index) => {
  const reverseIndex = 360 - index;
  tempAngularDirections[reverseIndex] = `${reverseIndex}deg`;
  tempAngularDirections[String(reverseIndex)] = `${reverseIndex}deg`;
  tempAngularDirections[`${reverseIndex}deg`] = `${reverseIndex}deg`;
});

export const ReverseAngularDirections = Object.freeze(
  tempReverseAngularDirections,
);

export enum ReverseElevationDirections {
  Above = ElevationDirections.Below,
  Below = ElevationDirections.Above,
}

const CardinalKeys = Object.keys(CardinalDirections);
const IntercardinalKeys = Object.keys(IntercardinalDirections);
const SecondaryIntercardinalKeys = Object.keys(SecondaryIntercardinalDirections);
const HandednessKeys = Object.keys(HandednessDirections);
const AngularKeys = Object.keys(AngularDirections);
const ElevationKeys = Object.keys(ElevationDirections);

export const getDirection = (direction: any) => {
  if (CardinalKeys.includes(direction)) {
    return CardinalDirections[direction];
  } else if (IntercardinalKeys.includes(direction)) {
    return IntercardinalDirections[direction];
  } else if (SecondaryIntercardinalKeys.includes(direction)) {
    return SecondaryIntercardinalDirections[direction];
  } else if (HandednessKeys.includes(direction)) {
    return HandednessDirections[direction];
  } else if (AngularKeys.includes(direction)) {
    return AngularDirections[direction];
  } else if (ElevationKeys.includes(direction)) {
    return ElevationDirections[direction];
  }

  throw new Error('The direction could not be found.');
};

export const getReverseDirection = (direction: any) => {
  if (CardinalKeys.includes(direction)) {
    return ReverseCardinalDirections[direction];
  } else if (IntercardinalKeys.includes(direction)) {
    return ReverseIntercardinalDirections[direction];
  } else if (SecondaryIntercardinalKeys.includes(direction)) {
    return ReverseSecondaryIntercardinalDirections[direction];
  } else if (HandednessKeys.includes(direction)) {
    return ReverseHandednessDirections[direction];
  } else if (AngularKeys.includes(direction)) {
    return ReverseAngularDirections[direction];
  } else if (ElevationKeys.includes(direction)) {
    return ReverseElevationDirections[direction];  
  }

  throw new Error('The reverse direction could not be found.');
};
