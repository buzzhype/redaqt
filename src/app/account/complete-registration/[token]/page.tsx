import CompleteRegistrationClient from './client'; // ✅ Import the client component

// This is a Server Component that receives the params
export default function CompleteRegistrationPage({
  params,
}: {
  params: { token: string };
}) {
  return <CompleteRegistrationClient token={params.token} />;
}
