"use client"

import { useEffect, useState } from 'react';

import { useParams } from 'next/navigation'
import { getPatient, fetchDiseases, fetchDoctors, saveVisit, getVisits, deleteVisit } from "@/services/ApiCalls";
import { Toast } from '@/components/Toast';

export default function Page() {
  const params = useParams()
  const { id } = params;
  const [patient, setPatient] = useState({});
  const [diseasesList, setDiseasesList] = useState();
  const [doctorsList, setDoctorsList] = useState();
  const [trigger, setTrigger] = useState();
  const [visits, setVisits] = useState([]);
  console.log(visits);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getPatient(id);
        setPatient(response.data);
        const patientPromise = getPatient(id);
        const diseasesPromise = fetchDiseases();
        const doctorPromise = fetchDoctors();
        const visitsPromise = getVisits(id);
        const [patientResponse, diseasesResponse, visitsResponse, doctorsResponse] = await Promise.all([patientPromise, diseasesPromise, visitsPromise, doctorPromise,]);
        setPatient(patientResponse.data);
        setDiseasesList(diseasesResponse.data);
        setDoctorsList(doctorsResponse.data);
        setVisits(visitsResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [id]);

  useEffect(() => {
    if (visits) {
      const fetchVisits = async () => {
        try {
          const response = await getVisits(id);
          setVisits(response.data);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
      fetchVisits();
    }
  }, [trigger]);

  const [newVisit, setNewVisit] = useState({
    patient_id: id,
    doctor_id: '',
    visit_time: '',
    disease_id: ''
  });


  const handleInputChange = e => {
    const { name, value } = e.target;
    setNewVisit({ ...newVisit, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await saveVisit(newVisit);
    console.log(response);
    if (response && response.success) {
      setTrigger(!trigger);
      Toast({ message: 'Visit added successfully.', type: 'success' });
    } else {
      Toast({ message: 'Visit did not added there is some problem.', type: 'error' });
    }
  };

  const handleDelete = async (id) => {
    const response = await deleteVisit(id);
    if (response) {
      setTrigger(!trigger);
      Toast({ message: 'Visit deleted successfully.', type: 'success' });
    }
  }

  return (
    <main>
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-4">{patient.patient_name}</h1>
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">Patient Information</h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">Details about the patient</p>
          </div>
          <div className="border-t border-gray-200">
            <dl>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Age</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">{patient.age}</dd>
              </div>
              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Gender</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">{patient.gender}</dd>
              </div>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Phone Number</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">{patient.phone_number}</dd>
              </div>
              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Address</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">{patient.address}</dd>
              </div>
              <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Status</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">{patient.status}</dd>
              </div>
              <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-500">Created At</dt>
                <dd className="mt-1 text-sm text-gray-900 sm:col-span-2">{new Date(patient.created_at).toLocaleString()}</dd>
              </div>
            </dl>
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Doctor Visits</h2>
          <ul className="divide-y divide-gray-200">
            {visits && visits.map(visit => (
              <li key={visit.id} className="py-4">
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    <svg className="h-8 w-8 text-indigo-500" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M3 10a7 7 0 1114 0 7 7 0 01-14 0zM10 1a9 9 0 100 18 9 9 0 000-18zm4 9a1 1 0 01-1 1h-3v3a1 1 0 11-2 0v-3H7a1 1 0 010-2h3V7a1 1 0 112 0v3h3a1 1 0 011 1z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">{visit.Doctor && visit.Doctor.name}</p>
                    <p className="text-sm text-gray-500">{visit.Disease && visit.Disease.name}</p>
                    <p className="text-sm text-gray-500">{new Date(visit.visit_time).toLocaleDateString()}</p>
                    <button onClick={() => handleDelete(visit.id)} className="text-sm text-red-500 focus:outline-none float-end">Delete</button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
        {/* Add Doctor Visit Form */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Add Doctor Visit</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="doctor_name" className="block text-sm font-medium text-gray-700">Doctor Name</label>
              <select
                id="doctor_id"
                name="doctor_id"
                value={newVisit.doctor_id}
                onChange={handleInputChange}
                className="mt-1 p-2 w-full border rounded-md"
                required
              >
                <option value="">Select</option>
                {doctorsList && doctorsList.map((doctor) => (
                  <option value={doctor.id}>{doctor.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="visit_time" className="block text-sm font-medium text-gray-700">Visit Date</label>
              <input type="date" id="visit_time" name="visit_time" value={newVisit.visit_time} onChange={handleInputChange} className="mt-1 p-2 w-full border rounded-md" required />
            </div>
            <div>
              <label htmlFor="diagnosis" className="block text-sm font-medium text-gray-700">Diagnosis</label>
              <select
                type="text"
                id="disease_id"
                name="disease_id"
                value={newVisit.disease_id}
                onChange={handleInputChange}
                className="mt-1 p-2 w-full border rounded-md"
                required
              >
                <option value="">Select</option>
                {diseasesList && diseasesList.map((disease) => (
                  <option value={disease.id}>{disease.name}</option>
                ))}
              </select>
            </div>
            <div>
              <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">Add Visit</button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}