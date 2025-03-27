import CompleteRegistrationClient from './client';

// This is a Server Component that receives the params
export default function CompleteRegistrationPage({ params }: { params: { token: string } }) {
  return (
    <CompleteRegistrationClient token={params.token} />
  );
}