// app/user/[id]/page.tsx

// 1. Make the function 'async'
export default async function Page({ 
  params 
}: { 
  params: Promise<{ slug: string[] }> // 2. Define params as a Promise
}) {
  
  // 3. Await the params before using them
  const { slug } = await params;
  return (
    <div>
     
      <h1>Category: {slug[0]}</h1>
      <p>Sub-category: {slug[1]}</p>
    </div>
  );
}