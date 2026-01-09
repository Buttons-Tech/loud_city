// app/user/[id]/page.tsx

export default function Page({ params }: { params: { id: string } }) {
  // In Next.js 15+, params is a Promise and should be awaited
  // For Next.js 13/14, you can use it directly:
  const id = params.id;

  return (
    <div>
      Hello! Your user ID is: {id}
    </div>
  );
}