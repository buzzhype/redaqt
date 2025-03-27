import CompleteRegistrationClient from './client';

export default function CompleteRegistrationPage({
  params,
}: {
  // Just inline the shape of `params`—do NOT extend or rely on `PageProps`.
  params: { token: string };
}) {
  return <CompleteRegistrationClient token={params.token} />;
}
