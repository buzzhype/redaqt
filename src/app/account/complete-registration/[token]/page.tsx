import CompleteRegistrationClient from './client';

export default function CompleteRegistrationPage({
  params,
}: {
  params: { token: string };
}) {
  return <CompleteRegistrationClient token={params.token} />;
}
