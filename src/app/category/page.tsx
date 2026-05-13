import type { Metadata } from "next";
import { CategoryPageView } from "@/views/CategoryPageView";

export const metadata: Metadata = {
  title: "Category — Oak and Luna",
};

export default function CategoryPage() {
  return <CategoryPageView />;
}
