export type Listing = {
    id: string;
    owner: string;
    title: string;
    description?: string;
    images: string[];
    price: number;
    availability: boolean;
    location?: string;
    type: 'borrow' | 'lean' | 'rent' | 'sell';
  }