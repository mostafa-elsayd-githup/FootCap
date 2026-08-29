export const dynamic = 'force-dynamic';
import EditProductPage from "./editProduct";
export default async function ProductPage({ searchParams }) {
  const resolvedSearchParams = await searchParams;
  const sectionType = resolvedSearchParams?.section;
  return <EditProductPage sectionType={sectionType} />;
}
