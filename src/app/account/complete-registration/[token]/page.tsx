import CompleteRegistrationClient from './client';

interface CompleteRegistrationPageProps {
  params: {
    token: string;
  };
}

export default function CompleteRegistrationPage({ params }: CompleteRegistrationPageProps) {
  return <CompleteRegistrationClient token={params.token} />;
}
