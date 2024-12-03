declare module "react-rating" {
  import { ComponentType } from "react";

  interface RatingProps {
    emptySymbol?: React.ReactNode;
    fullSymbol?: React.ReactNode;
    initialRating?: number;
    readonly?: boolean;
    onChange?: (rating: number) => void;
  }

  const Rating: ComponentType<RatingProps>;

  export default Rating;
}
