// app/store/[[...slug]]/page.tsx

export default async function StorePage({ 
  params 
}: { 
  params: Promise<{ slug?: string[] }> 
}) {
  const { slug } = await params;

  // 1. HOME: /store
  if (!slug || slug.length === 0) {
    const res = await fetch('https://fakestoreapi.com/products');
    const products = await res.json();
    return renderProductList("All Products", products);
  }

  const [mode, value] = slug;

  // 2. CATEGORY: /store/category/electronics
  if (mode === 'category' && value) {
    const res = await fetch(`https://fakestoreapi.com/products/category/${value}`);
    const products = await res.json();
    return renderProductList(`Category: ${value}`, products);
  }

  // 3. PRODUCT DETAIL: /store/product/1
  if (mode === 'product' && value) {
    const res = await fetch(`https://fakestoreapi.com/products/${value}`);
    const product = await res.json();
    return (
      <div style={{ padding: '20px' }}>
        <a href="/store">← Back</a>
        <h1>{product.title}</h1>
        <img src={product.image} width="150" alt={product.title} />
        <p>{product.description}</p>
      </div>
    );
  }

  return <div>404 - Page Not Found</div>;
}

// Helper function to keep the code clean
function renderProductList(title: string, products: any[]) {
  return (
    <div style={{ padding: '20px' }}>
      <h1>{title}</h1>
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <a href="/store/category/electronics">Electronics</a> | 
        <a href="/store/category/jewelery">Jewelery</a>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px' }}>
        {products.map((p) => (
          <div key={p.id} style={{ border: '1px solid #ddd', padding: '10px' }}>
            <p><strong>{p.title}</strong></p>
            <a href={`/store/product/${p.id}`}>View Product</a>
          </div>
        ))}
      </div>
    </div>
  );
}