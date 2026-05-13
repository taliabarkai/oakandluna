import { CategoryBanner } from "../components/CategoryBanner";
import { CategoryPageLayout } from "../components/CategoryPageLayout";

export function CategoryPageView() {
  return (
    <>
      <CategoryBanner
        title="NECKLACES FOR WOMEN"
        description={
          <>
            Capture your unique personality effortlessly with pendants
            <br aria-hidden="true" />
            for women, as your jewelry should be just as unique as you are.
          </>
        }
      />
      <CategoryPageLayout />
    </>
  );
}
