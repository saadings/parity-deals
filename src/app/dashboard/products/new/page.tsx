import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import PageWithBackButton from "../../_components/PageWithBackButton";
import HasPermission from "@/components/HasPermission";
import ProductDetailsForm from "../../_components/forms/ProductDetailsForm";
import { canCreateProduct } from "@/server/permissions";

const NewProductPage = () => {
  return (
    <PageWithBackButton
      pageTitle="Create Product"
      backButtonHref="/dashboard/products"
    >
      <HasPermission
        permission={canCreateProduct}
        renderFallback
        fallbackText="You have already created the maximum number of products. Try upgrading your account to create more."
      >
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Product Details</CardTitle>
          </CardHeader>
          <CardContent>
            <ProductDetailsForm />
          </CardContent>
        </Card>
      </HasPermission>
    </PageWithBackButton>
  );
};

export default NewProductPage;
