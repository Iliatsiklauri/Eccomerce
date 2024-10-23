export type Address = {
  name: string;
  additionalInfo: string;
  street: string;
  map: {
    lat: number;
    lng: number;
  };
};
