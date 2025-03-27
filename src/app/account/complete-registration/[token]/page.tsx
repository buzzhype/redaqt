import CompleteRegistrationClient from './client';

interface PageProps {
  params: { token: string };
}

export default function CompleteRegistrationPage({ params }: PageProps) {
  return <CompleteRegistrationClient token={params.token} />;
}
