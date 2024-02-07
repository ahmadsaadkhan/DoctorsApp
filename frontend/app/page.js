import Patients from '@/components/Patients';

export default function Home() {
  return (
    <main>
      <h1 className="text-4xl font-bold my-3 text-center">Patient Management App</h1>
      <Patients />
    </main>
  );
}
