import { redirect } from 'next/navigation';

export default function SignupIndexPage() {
  // Direct default entry point to Step 1 of the 3-step signup
  redirect('/signup/step-1');
}
